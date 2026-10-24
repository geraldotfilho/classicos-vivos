// Grava a narração dos livros pela API de voz (TTS) do Gemini, frase por frase, com controle de qualidade.
// Passo a passo e decisões: docs/TODO-NARRACAO.md (seção 8).
//
// ⚠️ REGRA DO HUMANO (2026-10-24): a API paga é usada SÓ para produzir as vozes da leitura, sempre do jeito
// mais econômico, e SÓ quando ele autorizou no prompt inicial da sessão. Por isso o script não chama a API
// sem `--autorizado` (e `--seco` nunca chama). Nada de testes, transcrições ou avaliações pela API.
//
// A chave NÃO passa por aqui: o proxy do ambiente injeta o cabeçalho x-goog-api-key nas requisições a
// generativelanguage.googleapis.com. Se existir $GEMINI_API_KEY, ela é enviada no cabeçalho (nunca na URL
// nem impressa).
//
// Uso:
//   npm run gravar:narracao -- --voz narracao --parte 1                 # todas as frases da Parte 1
//   npm run gravar:narracao -- --voz narracao --parte 1 --paginas 0,1   # só algumas páginas
//   npm run gravar:narracao -- --voz narracao --parte 1 --ids p2-s5     # regravar frases específicas
//   npm run gravar:narracao -- --voz narracao --amostra                 # amostra.mp3 do painel "Voz"
//   npm run gravar:narracao -- --voz palavras --parte 1                  # palavras-chave (sílabas)
//   ... --seco                                                            # mostra o que faria, sem chamar a API
//   ... --forcar                                                          # regrava mesmo com o hash igual
//   ... --sem-qa                                                          # pula a transcrição de conferência
//   ... --paralelo N                                                      # pedidos ao mesmo tempo (padrão 4)
//   ... --agrupar N                                                       # palavras-chave por pedido (até 10; 1 = uma por pedido)
//   ... --autorizado                                                      # obrigatório para chamar a API (ver a regra acima)
//   ... --standard                                                        # nível Standard (o padrão é o Flex: metade do preço, resposta em minutos)
//   npm run gravar:narracao -- --criar-voz SANCHICA --descricao "..." --autorizado   # cria uma voz por descrição (voice design)
//   npm run gravar:narracao -- --voz narracao --parte 1 --paginas 2 --pagina-inteira
//       # a página inteira num pedido só (entonação mais contínua) + marcação das frases depois,
//       # em parte-N/paginas.json (o livro toca um MP3 por página e destaca a frase pelo tempo)
//
// Para cada frase: gera o WAV, transcreve LOCALMENTE (Whisper, tools/transcrever.py, de graça) e compara com o campo `fala` (até 2
// tentativas; se nenhuma bater, guarda a mais próxima e avisa), converte para MP3 (tools/otimizar-audio.mjs)
// e registra o hash em indice.json. Frases com o
// mesmo hash já gravado são puladas: pode rodar de novo depois de uma queda ou do fim da cota.
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setGlobalDispatcher, EnvHttpProxyAgent } from 'undici';

// O Flex pode levar até ~15 min para responder: sem isto, o fetch do Node desiste do cabeçalho em 300 s
setGlobalDispatcher(new EnvHttpProxyAgent({ headersTimeout: 20 * 60e3, bodyTimeout: 20 * 60e3 }));

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://generativelanguage.googleapis.com/v1beta';
const MODELO_TTS = 'gemini-3.8-flash-tts';
// Conferência: sempre LOCAL e gratuita (Whisper, tools/transcrever.py). A API paga só produz as vozes
// (decisão do humano, 2026-10-24). `--sem-qa` desliga a conferência.
const AMOSTRA = 'Olá! Eu vou ler esta história com você. Vire a página quando quiser!';

const ESTILO_NARRADORA = 'warm, gentle storyteller reading aloud to young children; calm, clear pace; expressive but not theatrical';
const ESTILO_PALAVRAS = 'literacy teacher: each syllable slowly and clearly separated with short pauses, then the whole word joyfully';

// Elenco: quem fala nas frases com diálogo (roteiro em <livro>/audio/narracao/parte-N/roteiro.json).
// Vozes da biblioteca pt-BR (docs/narracao/VOZES-PT-BR.md), escolhidas pelo Claude a pedido do humano (2026-10-24).
// O estilo é só o jeito de falar; idade e timbre vêm da voz.
// Vozes criadas por descrição (voice_...) não entram em diálogo de 2 vozes: o script grava as falas uma a uma.
const ELENCO = {
    NARRADORA: { voz: 'pt-br-storyteller-9', estilo: ESTILO_NARRADORA },
    QUIXOTE: { voz: 'pt-br-concierge-3', estilo: 'noble, solemn and dreamy, speaking with heartfelt conviction; never mocking' },
    SANCHO: { voz: 'pt-br-storyteller-2', estilo: 'simple, warm and good-humored, plain and practical' },
    // Parte 2
    PASTOR: { voz: 'pt-br-podcaster-5', estilo: 'old goatherd, warm, welcoming and generous' },
    BARBEIRO: { voz: 'pt-br-techagent-4', estilo: 'frightened, shouting for help while running away, comic' },
    // Parte 3
    PADRE: { voz: 'pt-br-podcaster-9', estilo: 'kind village priest, gentle, cheerful and clever' },
    DOROTEIA: { voz: 'pt-br-concierge-4', estilo: 'clever young woman playing a princess in distress, dramatic and graceful' },
    ESTALAJADEIRO: { voz: 'pt-br-csagent-10', estilo: 'innkeeper in comic despair over his spilled wine' },
    // Parte 4
    TERESA: { voz: 'pt-br-advisor-1', estilo: 'warm-hearted wife, eager and affectionate' },
    SANCHICA: { voz: 'pt-br-concierge-6', estilo: 'excited little girl, bouncing with joy, playful' },
    CREDOR: { voz: 'pt-br-techagent-5', estilo: 'old man complaining indignantly' },
    DEVEDOR: { voz: 'pt-br-concierge-10', estilo: 'old man swearing solemnly, a little too calm' }
};

// Pasta de saída (dom-quixote/audio/<id>) → voz da API (e o modelo, se não for o MODELO_TTS).
// `narracao` é a narração do livro: a narradora, escolhida de ouvido pelo humano em 2026-10-24.
// As falas dos personagens terão vozes próprias (elenco a escolher com o humano; ver TODO-NARRACAO §3).
const NARRADORA = ELENCO.NARRADORA.voz;
const VOZES = {
    narracao: { voz: NARRADORA, estilo: ESTILO_NARRADORA },
    palavras: { voz: NARRADORA, estilo: ESTILO_PALAVRAS }
};

function opcoes(argv) {
    const o = { livro: 'dom-quixote' };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i].replace(/^--/, '');
        if (['seco', 'forcar', 'amostra', 'sem-qa', 'pagina-inteira', 'autorizado', 'standard'].includes(a)) o[a] = true;
        else o[a] = argv[++i];
    }
    return o;
}

const o = opcoes(process.argv.slice(2));
const flex = !o.standard;   // Flex é o padrão (decisão do humano, 2026-10-24)
const cfg = VOZES[o.voz] && { modelo: MODELO_TTS, ...VOZES[o.voz] };
if (!cfg && !o['criar-voz']) {
    console.error(`Use --voz com uma destas: ${Object.keys(VOZES).join(', ')}`);
    process.exit(1);
}
// Gasto estimado (preços de 2026 por milhão de tokens; ver TODO-NARRACAO §8.4). Fica em docs/narracao/gastos.csv.
// gemini-3.8-flash-tts no nível Standard até 31/12/2026 (dobra em 2027); o Flex (padrão) custa a metade.
const PRECO = { ttsSaida: 9, ttsEntrada: 0.5 };
const gasto = { tts: 0, ttsEntrada: 0, pedidos: 0, ttsStandard: 0 };
const dolares = () => ((gasto.tts - gasto.ttsStandard) * (flex ? 0.5 : 1) + gasto.ttsStandard) * PRECO.ttsSaida / 1e6 + gasto.ttsEntrada * PRECO.ttsEntrada / 1e6;

const cabecalhos = { 'Content-Type': 'application/json', ...(process.env.GEMINI_API_KEY ? { 'x-goog-api-key': process.env.GEMINI_API_KEY } : {}) };
const espera = (ms) => new Promise(r => setTimeout(r, ms));

/* POST com novas tentativas: 429 respeita o retryDelay; 5xx e falha de rede, até 4 vezes com recuo */
async function postar(url, corpo) {
    for (let tentativa = 0; ; tentativa++) {
        let r, j;
        try {
            r = await fetch(url, { method: 'POST', headers: cabecalhos, body: JSON.stringify(corpo) });
            j = await r.json().catch(() => ({}));
        } catch (e) {
            if (tentativa >= 4) throw e;
            await espera(2000 * 2 ** tentativa);
            continue;
        }
        if (r.ok) return j;
        const msg = j.error ? `${r.status} ${j.error.status || ''}: ${j.error.message}` : `HTTP ${r.status}`;
        if (r.status === 429) {
            const atraso = JSON.stringify(j).match(/"retryDelay":\s*"(\d+)/);
            if (/per.?day|daily/i.test(msg) || tentativa >= 6) throw new Error(`cota esgotada: ${msg}`);
            const s = atraso ? Number(atraso[1]) + 1 : 15 * 2 ** tentativa;
            console.log(`  ⏳ 429, esperando ${s} s`);
            await espera(s * 1000);
        } else if (r.status >= 500 && tentativa < 4) {
            await espera(2000 * 2 ** tentativa);
        } else {
            throw new Error(msg);
        }
    }
}

/* Uma fala → WAV (PCM 16 bits, 24 kHz, mono, com cabeçalho). O texto vai literal: o estilo vai em speech_metadata */
async function sintetizar(texto, estilo, voz = cfg.voz) {
    return pedirAudio({
        model: cfg.modelo,
        input: [{ type: 'user_input', content: [{ type: 'text', text: texto, annotations: [{ type: 'speech_metadata', style: estilo }] }] }],
        response_format: { type: 'audio' },
        generation_config: { speech_config: [{ voice: voz }] }
    });
}

/* Diálogo (narradora + no máximo 1 personagem, limite da API): um item por fala, cada um com a sua voz */
async function sintetizarDialogo(falas) {
    const falantes = [...new Set(falas.map(f => f.falante))];
    return pedirAudio({
        model: cfg.modelo,
        input: [{ type: 'user_input', content: falas.map(f => ({ type: 'text', text: f.texto, annotations: [{ type: 'speech_metadata', speaker: f.falante, style: ELENCO[f.falante].estilo }] })) }],
        response_format: { type: 'audio' },
        generation_config: { speech_config: { speakers: falantes.map(f => ({ speaker: f, voice: ELENCO[f].voz })) } }
    });
}

async function pedirAudio(corpo) {
    if (!o.autorizado) throw new Error('sem --autorizado: a API paga só pode ser chamada com autorização do humano no prompt inicial da sessão');
    let j, standard = !flex;
    try {
        j = await postar(`${API}/interactions`, flex ? { ...corpo, service_tier: 'flex' } : corpo);
    } catch (e) {
        if (!flex || /cota esgotada/.test(e.message) || (/^4\d\d/.test(e.message) && !/tier|flex/i.test(e.message))) throw e;
        // Flex é "best-effort": se falhar de vez, este pedido vai no Standard (o dobro do preço) para não parar a produção
        console.log(`  ⚠️ Flex falhou (${e.message.slice(0, 120)}); este pedido vai no Standard`);
        j = await postar(`${API}/interactions`, corpo);
        standard = true;
    }
    gasto.pedidos++;
    gasto.tts += j.usage?.total_output_tokens || 0;
    if (standard && flex) gasto.ttsStandard += j.usage?.total_output_tokens || 0;
    gasto.ttsEntrada += j.usage?.total_input_tokens || 0;
    const audio = (j.steps || []).filter(s => s.type === 'model_output').flatMap(s => s.content || []).filter(c => c.type === 'audio').pop();
    if (!audio) throw new Error('resposta sem áudio');
    const buf = Buffer.from(audio.data, 'base64');
    return buf.toString('ascii', 0, 4) === 'RIFF' ? buf : comCabecalhoWav(buf);
}

function comCabecalhoWav(pcm) {
    const h = Buffer.alloc(44);
    h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8);
    h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
    h.writeUInt32LE(24000, 24); h.writeUInt32LE(48000, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
    h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
    return Buffer.concat([h, pcm]);
}

/* Transcrição local: um processo Python com o Whisper carregado, um arquivo por linha */
let whisper = null;
function transcritorLocal() {
    if (whisper) return whisper;
    const proc = spawn('python3', ['-I', join(RAIZ, 'tools', 'transcrever.py')], { stdio: ['pipe', 'pipe', 'inherit'] });
    const fila = [];
    let resto = '', pronto;
    const carregou = new Promise((ok, falha) => { pronto = ok; proc.on('error', falha); proc.on('exit', c => falha(new Error(`transcrever.py saiu (${c}); instale com: pip install faster-whisper`))); });
    proc.stdout.on('data', d => {
        resto += d;
        let n;
        while ((n = resto.indexOf('\n')) >= 0) {
            const r = JSON.parse(resto.slice(0, n));
            resto = resto.slice(n + 1);
            if (r.pronto) pronto();
            else fila.shift()(r);
        }
    });
    whisper = {
        transcrever: async (arquivo) => {
            await carregou;
            const r = await new Promise(ok => { fila.push(ok); proc.stdin.write(arquivo + '\n'); });
            if (r.erro) throw new Error(r.erro);
            return r;
        },
        fechar: () => proc.stdin.end()
    };
    return whisper;
}

let tmpN = 0;
async function transcrever(wav, comPalavras = false) {
    const arq = join(resolve(tmpdir()), `cv-qa-${process.pid}-${tmpN++}.wav`);
    writeFileSync(arq, wav);
    const r = await transcritorLocal().transcrever(arq);
    unlinkSync(arq);
    return comPalavras ? r : r.texto;
}

/* Algarismos por extenso (a transcrição escreve "30 ou 40"; o livro, "trinta ou quarenta") */
function porExtenso(n) {
    const u = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const d = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const c = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
    if (n < 20) return u[n];
    if (n < 100) return d[Math.floor(n / 10)] + (n % 10 ? ` e ${u[n % 10]}` : '');
    if (n === 100) return 'cem';
    if (n < 1000) return c[Math.floor(n / 100)] + (n % 100 ? ` e ${porExtenso(n % 100)}` : '');
    if (n < 1e6) return (n < 2000 ? 'mil' : `${porExtenso(Math.floor(n / 1000))} mil`) + (n % 1000 ? ` e ${porExtenso(n % 1000)}` : '');
    return String(n);
}
const normalizar = (s) => s.replace(/\d+/g, m => porExtenso(Number(m))).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/* Duração da fala sem o silêncio das pontas (o mesmo corte do tools/otimizar-audio.mjs, que gera o MP3) */
function duracao(wav) {
    const a = new Int16Array(wav.buffer.slice(wav.byteOffset + 44, wav.byteOffset + wav.length - ((wav.length - 44) % 2)));
    let ini = 0, fim = a.length - 1;
    while (ini < fim && Math.abs(a[ini]) < 500) ini++;
    while (fim > ini && Math.abs(a[fim]) < 500) fim--;
    return (fim - ini) / 24000;
}

/* Distância de edição genérica (por letra ou por palavra) */
function edicao(a, b, igual = (x, y) => x === y) {
    let ant = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
        const lin = [i];
        for (let j = 1; j <= b.length; j++) lin[j] = Math.min(ant[j] + 1, lin[j - 1] + 1, ant[j - 1] + (igual(a[i - 1], b[j - 1]) ? 0 : 1));
        ant = lin;
    }
    return ant[b.length];
}

/* Quase igual: 1 letra de diferença em palavras de 4+ letras (2 em 8+). A transcrição erra nomes
   ("Toborso", "Dulcinea") muito mais que a voz: regravar por isso só gasta dinheiro. */
const parecidas = (x, y) => x === y || (Math.min(x.length, y.length) >= 4 && edicao(x, y) <= (x.length >= 8 ? 2 : 1));

/* Palavras do esperado que faltam no ouvido e vice-versa (distância de edição por palavra) */
function diferenca(esperado, ouvido) {
    const a = normalizar(esperado), b = normalizar(ouvido);
    const d = edicao(a.split(' '), b.split(' '), parecidas);
    // Palavra junta ou separada ("superimaginação", "do cineia"): sem os espaços, quase igual → conta como certo
    if (d && edicao(a.replace(/ /g, ''), b.replace(/ /g, '')) <= Math.max(2, Math.round(a.length * 0.03))) return 0;
    return d;
}

/* Economia (limite de gasto do humano): até 2 tentativas, e 1 palavra diferente não regrava: fica o aviso
   para a revisão de ouvido (quase sempre é nome próprio ou "esta"/"essa"). Nunca joga áudio fora. */
const TENTATIVAS = 2;
const TOLERANCIA = 1;

async function gravar(item, destinoWav, faixa) {
    let melhor = null;
    for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
        const wav = await sintetizar(item.fala, cfg.estilo);
        const s = duracao(wav);
        let erros = s >= faixa[0] && s <= faixa[1] ? 0 : 99, motivo = erros ? `duração ${s.toFixed(1)} s` : '';
        if (!erros && !o['sem-qa']) {
            const ouvido = await transcrever(wav);
            erros = diferenca(item.fala, ouvido);
            if (erros) motivo = `${erros} palavra(s) diferente(s): "${ouvido}"`;
        }
        if (!melhor || erros < melhor.erros) melhor = { wav, s, erros, motivo, tentativas: tentativa };
        if (erros <= TOLERANCIA) break;
        console.log(`  ↻ ${item.id} tentativa ${tentativa}: ${motivo}`);
    }
    if (melhor.erros >= 99) throw new Error(`não passou na QA (${melhor.motivo})`);
    writeFileSync(destinoWav, melhor.wav);
    return { tentativas: melhor.tentativas, segundos: melhor.s, aviso: melhor.erros ? melhor.motivo : '' };
}

/* Roda `tarefa` para cada item com até `n` ao mesmo tempo (o Flex demora minutos: os pedidos esperam juntos) */
async function emParalelo(itens, n, tarefa) {
    let prox = 0, parar = false;
    const trabalhador = async () => {
        while (!parar && prox < itens.length) {
            const item = itens[prox++];
            if ((await tarefa(item)) === 'parar') parar = true;
        }
    };
    await Promise.all(Array.from({ length: Math.min(n, itens.length) }, trabalhador));
}
const PARALELO = Number(o.paralelo || 4);

function lerJson(arq, padrao) {
    return existsSync(arq) ? JSON.parse(readFileSync(arq, 'utf8')) : padrao;
}

/* =====================================================================
   PÁGINA INTEIRA: um pedido com o texto todo da página; depois, as pausas
   do áudio dizem onde cada frase começa (marcação a posteriori)
   ===================================================================== */
const TAXA = 24000;
const QUADRO = 240;           // 10 ms
const PAUSA_MINIMA = 12;      // quadros (120 ms)
const LIMIAR_RMS = 250;

const amostrasDe = (wav) => new Int16Array(wav.buffer.slice(wav.byteOffset + 44, wav.byteOffset + wav.length - ((wav.length - 44) % 2)));
const wavDe = (a) => comCabecalhoWav(Buffer.from(a.buffer, a.byteOffset, a.byteLength));

/* Trechos de pelo menos 120 ms com energia baixa, dentro da fala: [{ ini, fim, meio, s }] em amostras */
function pausas(a, vozIni, vozFim) {
    const lista = [];
    const n = Math.floor(a.length / QUADRO);
    let inicio = -1;
    for (let q = 0; q <= n; q++) {
        let silencio = false;
        if (q < n) {
            let soma = 0;
            for (let i = q * QUADRO; i < (q + 1) * QUADRO; i++) soma += a[i] * a[i];
            silencio = Math.sqrt(soma / QUADRO) < LIMIAR_RMS;
        }
        if (silencio && inicio < 0) inicio = q;
        if (!silencio && inicio >= 0) {
            const ini = inicio * QUADRO, fim = q * QUADRO;
            if (q - inicio >= PAUSA_MINIMA && ini > vozIni && fim < vozFim) lista.push({ ini, fim, meio: (ini + fim) / 2, s: (fim - ini) / TAXA });
            inicio = -1;
        }
    }
    return lista;
}

/* Escolhe uma pausa para cada fronteira entre frases (programação dinâmica): perto de onde a proporção
   de letras diz que a frase acaba, e preferindo pausas longas (fim de frase pausa mais que vírgula) */
function fronteiras(frases, gaps, vozIni, vozFim) {
    const K = frases.length - 1, G = gaps.length;
    if (K === 0) return [];
    if (G < K) return null;
    const total = frases.reduce((t, f) => t + f.fala.length, 0);
    const media = (vozFim - vozIni) / frases.length;
    let acc = 0;
    const esperado = frases.slice(0, -1).map(f => vozIni + (vozFim - vozIni) * (acc += f.fala.length) / total);
    const custo = (k, g) => ((gaps[g].meio - esperado[k]) / media) ** 2 * 4 - gaps[g].s / 0.3;
    const melhor = Array.from({ length: K }, () => new Array(G).fill(Infinity));
    const de = Array.from({ length: K }, () => new Array(G).fill(-1));
    for (let g = 0; g < G; g++) melhor[0][g] = custo(0, g);
    for (let k = 1; k < K; k++) {
        for (let g = k; g < G; g++) {
            for (let h = k - 1; h < g; h++) {
                const c = melhor[k - 1][h] + custo(k, g);
                if (c < melhor[k][g]) { melhor[k][g] = c; de[k][g] = h; }
            }
        }
    }
    let g = melhor[K - 1].indexOf(Math.min(...melhor[K - 1]));
    const escolha = [];
    for (let k = K - 1; k >= 0; k--) { escolha.unshift(gaps[g]); g = de[k][g]; }
    return escolha;
}

/* Quem fala cada trecho da frase (roteiro.json); fora do roteiro, é tudo da narradora */
function trechosDe(frase, roteiro) {
    const trechos = (roteiro[frase.id] || [['NARRADORA', frase.fala]]).map(([falante, texto]) => ({ falante, texto }));
    if (normalizar(trechos.map(t => t.texto).join(' ')) !== normalizar(frase.fala)) throw new Error(`${frase.id}: o roteiro não bate com o texto da frase (rode o exportar:frases e refaça o roteiro)`);
    for (const t of trechos) if (!ELENCO[t.falante]) throw new Error(`${frase.id}: falante "${t.falante}" fora do ELENCO`);
    return trechos;
}

/* Blocos de uma página: a API aceita no máximo 2 vozes por pedido, então cada bloco tem a narradora
   e no máximo 1 personagem. Um bloco novo começa quando entra um segundo personagem. */
function blocosDe(frases, roteiro) {
    const blocos = [];
    let atual = null;
    for (const f of frases) {
        const personagens = new Set(trechosDe(f, roteiro).map(t => t.falante).filter(x => x !== 'NARRADORA'));
        if (personagens.size > 1) throw new Error(`${f.id}: dois personagens na mesma frase; divida no roteiro`);
        const [p] = personagens;
        if (!atual || (p && atual.personagem && p !== atual.personagem)) blocos.push(atual = { frases: [], personagem: null });
        atual.frases.push(f);
        if (p) atual.personagem = p;
    }
    return blocos;
}

/* Gera um bloco: só a narradora → um texto (parágrafos separados por linha em branco);
   com personagem → um item por fala (falas seguidas da mesma voz ficam num item só) */
async function sintetizarBloco(frases, roteiro, personagem, estilo = ELENCO.NARRADORA.estilo) {
    const juntar = (anterior, f) => (anterior && anterior.paragrafo !== f.paragrafo ? '\n\n' : ' ');
    if (!personagem) {
        return sintetizar(frases.map((f, k) => (k ? juntar(frases[k - 1], f) : '') + f.fala).join(''), estilo, ELENCO.NARRADORA.voz);
    }
    const falas = [];
    frases.forEach((f, k) => trechosDe(f, roteiro).forEach((t, n) => {
        const ultima = falas[falas.length - 1];
        const sep = n ? ' ' : (k ? juntar(frases[k - 1], f) : '');
        if (ultima && ultima.falante === t.falante) ultima.texto += sep + t.texto;
        else falas.push({ falante: t.falante, texto: t.texto });
    }));
    if (!ELENCO[personagem].voz.startsWith('voice_')) return sintetizarDialogo(falas);
    // Voz criada por descrição não entra em diálogo: cada fala é gravada sozinha e as falas são emendadas
    const partes = [];
    for (const f of falas) {
        const a = amostrasDe(await sintetizar(f.texto, ELENCO[f.falante].estilo, ELENCO[f.falante].voz));
        let ini = 0, fim = a.length - 1;
        while (ini < fim && Math.abs(a[ini]) < 500) ini++;
        while (fim > ini && Math.abs(a[fim]) < 500) fim--;
        partes.push(a.subarray(Math.max(0, ini - 1920), Math.min(a.length, fim + 1920)), new Int16Array(Math.round(TAXA * 0.15)));
    }
    const tudo = new Int16Array(partes.reduce((t, a) => t + a.length, 0));
    let pos = 0;
    for (const a of partes) { tudo.set(a, pos); pos += a.length; }
    return wavDe(tudo);
}

/* Alinha as palavras esperadas (texto das frases) com as reconhecidas pelo Whisper (distância de edição)
   e devolve, para cada frase, o tempo da primeira e da última palavra dita, e o que foi ouvido nela */
function alinharFrases(frases, reconhecidas) {
    const esp = frases.flatMap((f, k) => normalizar(f.fala).split(' ').filter(Boolean).map(p => ({ p, k })));
    const rec = reconhecidas.flatMap(([w, ini, fim]) => normalizar(w).split(' ').filter(Boolean).map(p => ({ p, ini, fim })));
    const n = esp.length, m = rec.length;
    const d = Array.from({ length: n + 1 }, (_, i) => Int32Array.from({ length: m + 1 }, (_, j) => (i ? (j ? 0 : i) : j)));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (esp[i - 1].p === rec[j - 1].p ? 0 : 1));
    const dono = new Array(m).fill(-1);   // frase de cada palavra reconhecida
    for (let i = n, j = m; i > 0 || j > 0;) {
        if (i && j && d[i][j] === d[i - 1][j - 1] + (esp[i - 1].p === rec[j - 1].p ? 0 : 1)) { dono[j - 1] = esp[i - 1].k; i--; j--; }
        else if (i && d[i][j] === d[i - 1][j] + 1) i--;
        else { dono[j - 1] = i ? esp[i - 1].k : 0; j--; }   // palavra a mais: fica com a frase vizinha
    }
    return frases.map((f, k) => {
        const minhas = rec.filter((_, j) => dono[j] === k);
        return minhas.length ? { ini: minhas[0].ini, fim: minhas[minhas.length - 1].fim, ouvido: minhas.map(r => r.p).join(' ') } : null;
    });
}

/* Uma tentativa de um bloco: gera, transcreve localmente com o tempo de cada palavra, marca onde cada
   frase começa (no meio da pausa entre a última palavra de uma e a primeira da outra) e confere o texto.
   Sem a conferência (--sem-qa), a marcação cai para o método das pausas.
   Devolve as amostras sem o silêncio das pontas (80 ms de margem) e as marcas relativas a elas. */
async function tentarBloco(bloco, roteiro) {
    const frases = bloco.frases;
    const wav = await sintetizarBloco(frases, roteiro, bloco.personagem, bloco.estilo);
    const a = amostrasDe(wav);
    let vozIni = 0, vozFim = a.length - 1;
    while (vozIni < vozFim && Math.abs(a[vozIni]) < 500) vozIni++;
    while (vozFim > vozIni && Math.abs(a[vozFim]) < 500) vozFim--;
    const margem = Math.round(TAXA * 0.08);
    const ini = Math.max(0, vozIni - margem), fim = Math.min(a.length, vozFim + margem);
    if (bloco.palavras) return { erros: 0, pior: 0, avisos: [], marcas: [], amostras: a.subarray(ini, fim), motivo: '' };

    let cortes, ouvidos = null;
    if (!o['sem-qa']) {
        const r = await transcrever(wav, true);
        const al = alinharFrases(frases, r.palavras);
        if (al.some(x => !x)) return { erros: 999, motivo: `frase sem nenhuma palavra reconhecida: "${r.texto}"` };
        const gaps = pausas(a, vozIni, vozFim);
        cortes = [ini, ...al.slice(1).map((x, k) => {
            const ant = al[k].fim * TAXA, prox = x.ini * TAXA;
            // de preferência, no meio da pausa que fica entre as duas palavras
            const pausa = gaps.filter(g => g.fim > ant - 0.15 * TAXA && g.ini < prox + 0.15 * TAXA).sort((p, q) => q.s - p.s)[0];
            return Math.round(pausa ? pausa.meio : (ant + prox) / 2);
        }), fim];
        ouvidos = al.map(x => x.ouvido);
    } else {
        const escolha = fronteiras(frases, pausas(a, vozIni, vozFim), vozIni, vozFim);
        if (!escolha) return { erros: 999, motivo: 'pausas de menos para separar as frases' };
        cortes = [ini, ...escolha.map(e => Math.round(e.meio)), fim];
    }

    const marcas = [], avisos = [];
    let erros = 0, pior = 0;
    for (let k = 0; k < frases.length; k++) {
        let dif = 0;
        if (!o['sem-qa']) {
            const ouvido = ouvidos ? ouvidos[k] : await transcrever(wavDe(a.subarray(cortes[k], cortes[k + 1])));
            dif = diferenca(frases[k].fala, ouvido);
            if (dif) avisos.push(`${frases[k].id}: ${dif} palavra(s) diferente(s): "${ouvido}"`);
        }
        erros += dif;
        pior = Math.max(pior, dif);
        marcas.push({ id: frases[k].id, ini: (cortes[k] - ini) / TAXA, fim: (cortes[k + 1] - ini) / TAXA });
    }
    return { erros, pior, avisos, marcas, amostras: a.subarray(ini, fim), motivo: avisos.join('; ') };
}

/* Cache de blocos (fora do git): um bloco pago nunca é pedido de novo, mesmo que outro bloco da mesma
   página falhe ou a cota diária acabe no meio (o plano pago tem limite de 100 pedidos por dia) */
const CACHE = join(RAIZ, '.cache-narracao');
function chaveBloco(bloco, roteiro) {
    const vozes = [...new Set(bloco.frases.flatMap(f => (roteiro[f.id] || [['NARRADORA']]).map(t => t[0])))].map(f => ELENCO[f]);
    return createHash('sha1').update(JSON.stringify([MODELO_TTS, bloco.estilo || null, vozes, bloco.frases.map(f => [f.id, f.fala, f.paragrafo ?? null, roteiro[f.id] || null])])).digest('hex').slice(0, 16);
}

/* Bloco com até 2 tentativas: regrava só se alguma frase tiver mais que TOLERANCIA palavras diferentes */
async function gravarBloco(bloco, roteiro, rotulo) {
    const chave = chaveBloco(bloco, roteiro);
    const arqCache = join(CACHE, `${chave}.json`);
    if (!o.forcar && existsSync(arqCache)) {
        const c = JSON.parse(readFileSync(arqCache, 'utf8'));
        const raw = readFileSync(join(CACHE, `${chave}.pcm`));
        console.log(`  ♻️  ${rotulo}: do cache (sem pedido novo)`);
        return { ...c, amostras: new Int16Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.length)) };
    }
    let melhor = null;
    for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
        const r = await tentarBloco(bloco, roteiro);
        r.tentativas = tentativa;
        if (!melhor || r.erros < melhor.erros) melhor = r;
        if (r.erros < 999 && r.pior <= TOLERANCIA) break;
        console.log(`  ↻ ${rotulo} tentativa ${tentativa}: ${r.motivo}`);
    }
    if (melhor.erros < 999) {
        mkdirSync(CACHE, { recursive: true });
        const { amostras, ...resto } = melhor;
        writeFileSync(join(CACHE, `${chave}.pcm`), Buffer.from(amostras.buffer, amostras.byteOffset, amostras.byteLength));
        writeFileSync(arqCache, JSON.stringify(resto));
    }
    return melhor;
}

/* Junta os blocos de uma página num áudio só, com uma pausa natural entre eles */
const PAUSA_ENTRE_BLOCOS = Math.round(TAXA * 0.3);
function juntarBlocos(resultados) {
    const partes = [], marcas = [];
    let pos = 0;
    resultados.forEach((r, k) => {
        if (k) {
            partes.push(new Int16Array(PAUSA_ENTRE_BLOCOS));
            marcas[marcas.length - 1].fim += PAUSA_ENTRE_BLOCOS / TAXA;   // a frase anterior vai até o bloco novo
            pos += PAUSA_ENTRE_BLOCOS;
        }
        r.marcas.forEach(m => marcas.push({ id: m.id, ini: m.ini + pos / TAXA, fim: m.fim + pos / TAXA }));
        partes.push(r.amostras);
        pos += r.amostras.length;
    });
    const tudo = new Int16Array(pos);
    let p = 0;
    for (const a of partes) { tudo.set(a, p); p += a.length; }
    return { amostras: tudo, marcas: marcas.map(m => ({ id: m.id, ini: +m.ini.toFixed(2), fim: +m.fim.toFixed(2) })) };
}

function salvarMp3(amostras, destino) {
    const wav = destino.replace(/\.mp3$/, '.wav');
    writeFileSync(wav, wavDe(amostras));
    execFileSync('node', [join(RAIZ, 'tools', 'otimizar-audio.mjs'), wav], { stdio: 'ignore' });
}

async function gravarPaginas(fonte, pasta, paginas, ids) {
    const arqPaginas = join(pasta, 'paginas.json');
    const registro = lerJson(arqPaginas, {});
    const roteiro = lerJson(join(pasta, 'roteiro.json'), {});
    const elenco = (frases) => JSON.stringify([...new Set(frases.flatMap(f => trechosDe(f, roteiro).map(t => t.falante)))].map(f => [f, ELENCO[f]]));
    const numeros = [...new Set(fonte.frases.map(f => f.pagina))].filter(n => !paginas || paginas.has(n));
    const falhas = [];
    await emParalelo(numeros, PARALELO, async (n) => {
        let frases = fonte.frases.filter(f => f.pagina === n);
        const id = `p${n}`;
        // --ids: grava só essas frases, como trecho avulso (parte-N/avulsas/), para emendar numa página já gravada
        if (ids) frases = frases.filter(f => ids.has(f.id));
        if (!frases.length) return;
        const hash = createHash('sha1').update(frases.map(f => f.hash).join() + JSON.stringify(frases.map(f => roteiro[f.id] || null)) + elenco(frases)).digest('hex').slice(0, 10);
        if (!ids && !o.forcar && registro[id]?.hash === hash && existsSync(join(pasta, `${id}.mp3`))) return;
        const blocos = blocosDe(frases, roteiro);
        console.log(`${id}${ids ? ` (avulsa: ${frases.map(f => f.id).join(', ')})` : ''}: ${frases.length} frases em ${blocos.length} bloco(s) ${blocos.map(b => `[${['NARRADORA', b.personagem].filter(Boolean).join(' + ')}]`).join(' ')}${o.seco ? ' [seco]' : ''}`);
        if (o.seco) return;
        const resultados = [];
        for (const [k, b] of blocos.entries()) resultados.push(await gravarBloco(b, roteiro, `${id} bloco ${k + 1}`));
        const ruim = resultados.find(r => r.erros >= 999);
        if (ruim) { falhas.push(`${id}: ${ruim.motivo}`); return; }
        const { amostras, marcas } = juntarBlocos(resultados);
        const segundos = amostras.length / TAXA;
        if (ids) {
            mkdirSync(join(pasta, 'avulsas'), { recursive: true });
            const nome = `avulsas/${frases[0].id}_${frases[frases.length - 1].id}.mp3`;
            salvarMp3(amostras, join(pasta, nome));
            console.log(`  ✓ ${nome} (${segundos.toFixed(1)} s)`);
        } else {
            salvarMp3(amostras, join(pasta, `${id}.mp3`));
            Object.assign(registro, lerJson(arqPaginas, {}));   // outras páginas gravadas em paralelo
            registro[id] = { arquivo: `${id}.mp3`, hash, frases: marcas };
            Object.assign(registro, { modelo: cfg.modelo, elenco: ELENCO, qa: o['sem-qa'] ? 'sem' : 'whisper-large-v3-turbo (local)' });
            delete registro.voz; delete registro.estilo;
            writeFileSync(arqPaginas, JSON.stringify(registro, null, 2) + '\n');
            console.log(`  ✓ ${id}.mp3 (${segundos.toFixed(1)} s)`);
        }
        marcas.forEach(m => console.log(`      ${m.id}: ${m.ini.toFixed(2)}–${m.fim.toFixed(2)} s`));
        resultados.filter(r => r.erros).forEach(r => falhas.push(`${id}: gravada, mas revise de ouvido (${r.motivo})`));
    });
    if (falhas.length) {
        console.log(`\n${falhas.length} aviso(s):\n  ${falhas.join('\n  ')}`);
        process.exitCode = 1;
    }
}

/* Voice design: cria uma voz por descrição (quando nenhuma da biblioteca serve, ex.: uma criança).
   Guarda a amostra em docs/narracao/vozes-criadas/<NOME>.mp3 para o humano ouvir, e imprime o id para o ELENCO. */
async function criarVoz() {
    if (!o.autorizado) throw new Error('sem --autorizado: a API paga só pode ser chamada com autorização do humano no prompt inicial da sessão');
    const j = await postar(`${API}/voices`, {
        store: true,
        voice: { model: MODELO_TTS, type: 'prompted', display_name: `classicos-vivos-${o['criar-voz'].toLowerCase()}`, gender: o.genero || 'female', language_code: 'pt-BR', prompted: { input: o.descricao } }
    });
    gasto.pedidos++;
    console.log(`voz criada: ${j.id || j.name || JSON.stringify(j).slice(0, 200)}`);
    if (j.sample_audio?.data) {
        const dir = join(RAIZ, 'docs', 'narracao', 'vozes-criadas');
        mkdirSync(dir, { recursive: true });
        const wav = Buffer.from(j.sample_audio.data, 'base64');
        const destino = join(dir, `${o['criar-voz'].toLowerCase()}.wav`);
        writeFileSync(destino, wav.toString('ascii', 0, 4) === 'RIFF' ? wav : comCabecalhoWav(wav));
        execFileSync('node', [join(RAIZ, 'tools', 'otimizar-audio.mjs'), destino], { stdio: 'ignore' });
        console.log(`amostra: ${destino.replace(/\.wav$/, '.mp3')}`);
    }
}

/* Palavras-chave em grupos (até 10 por pedido): o mesmo áudio custa o mesmo, mas gasta até 10 vezes menos pedidos
   do limite diário. Cada grupo é gravado como uma lista (uma palavra por parágrafo) e cortado pelos tempos do Whisper. */
/* Corta um grupo de palavras-chave gravado de uma vez. Âncora: o fim da PALAVRA INTEIRA de cada item
   ("…jaula!"), que o Whisper reconhece bem (as sílabas soltas ele escreve de jeitos imprevisíveis); o corte
   fica no meio da primeira pausa depois dela. Conferência: cada trecho tem a sua palavra e nenhuma das outras.
   Item sem âncora não é salvo (fica pendente para a próxima rodada), exceto o último, que vai até o fim. */
async function cortarPalavras(grupo, amostras) {
    const r = await transcrever(wavDe(amostras), true);
    const tokens = r.palavras.flatMap(([w, ini, fim]) => normalizar(w).split(' ').filter(Boolean).map(t => ({ t, ini, fim })));
    const casa = (j, alvo) => {
        // a palavra inteira começa em tokens[j]? (aceita junta/separada e quase igual)
        for (let n = 1; n <= alvo.length + 1 && j + n <= tokens.length; n++) {
            const ouvido = tokens.slice(j, j + n).map(x => x.t).join('');
            const esperado = alvo.join('');
            if (ouvido === esperado || (esperado.length >= 4 && edicao(ouvido, esperado) <= (esperado.length >= 8 ? 2 : 1))) return n;
        }
        return 0;
    };
    const alvos = grupo.map(g => normalizar(g.palavra).split(' '));
    const fimDe = [];   // índice do último token da palavra inteira de cada item
    let pos = 0;
    for (let k = 0; k < grupo.length; k++) {
        let achou = -1, n = 0;
        for (let j = pos; j < tokens.length; j++) {
            const m = casa(j, alvos[k]);
            if (!m) continue;
            // a sílaba solta pode soar como a palavra: fica a ÚLTIMA ocorrência antes da próxima palavra do grupo
            const proxima = k + 1 < grupo.length ? tokens.findIndex((_, i) => i > j && casa(i, alvos[k + 1])) : -1;
            achou = j; n = m;
            for (let i = j + m; i < tokens.length && (proxima < 0 || i < proxima); i++) {
                const m2 = casa(i, alvos[k]);
                if (m2) { achou = i; n = m2; }
            }
            break;
        }
        fimDe.push(achou < 0 ? null : achou + n - 1);
        if (achou >= 0) pos = achou + n;
    }
    let vozFim = amostras.length - 1;
    while (vozFim > 0 && Math.abs(amostras[vozFim]) < 500) vozFim--;
    const gaps = pausas(amostras, 0, vozFim);
    const corteDepois = (seg) => {
        const g = gaps.find(x => x.fim > (seg - 0.15) * TAXA && x.s >= 0.2);
        return Math.round(g ? g.meio : Math.min(amostras.length, (seg + 0.3) * TAXA));
    };
    const marcas = [], avisos = [];
    let inicio = 0;
    for (let k = 0; k < grupo.length; k++) {
        const ultimo = k === grupo.length - 1;
        if (fimDe[k] === null && !ultimo) {
            avisos.push(`${grupo[k].id}: palavra inteira não encontrada no áudio do grupo; fica para a próxima rodada`);
            continue;
        }
        const fim = ultimo ? amostras.length : corteDepois(tokens[fimDe[k]].fim);
        marcas.push({ id: grupo[k].id, ini: inicio / TAXA, fim: fim / TAXA });
        inicio = fim;
    }
    // Conferência de cada trecho: a própria palavra presente e nenhuma das outras do grupo
    const boas = [];
    for (const m of marcas) {
        const ouvido = normalizar(await transcrever(wavDe(amostras.subarray(Math.round(m.ini * TAXA), Math.round(m.fim * TAXA)))));
        const tem = (palavra) => { const a = normalizar(palavra).replace(/ /g, ''); const b = ouvido.replace(/ /g, ''); return b.includes(a) || [...Array(Math.max(0, b.length - a.length + 1)).keys()].some(i => edicao(b.slice(i, i + a.length), a) <= (a.length >= 8 ? 2 : 1)); };
        const item = grupo.find(g => g.id === m.id);
        const intrusas = grupo.filter(g => g !== item && normalizar(g.palavra).replace(/ /g, '').length >= 4 && tem(g.palavra)).map(g => g.id);
        if (intrusas.length) { avisos.push(`${m.id}: o trecho tem outra palavra (${intrusas.join(', ')}): "${ouvido}"; não foi salvo`); continue; }
        if (!tem(item.palavra)) {
            // a última do grupo vai até o fim do áudio: não tem como invadir outra palavra (ex.: onomatopeias, que o Whisper escreve de mil jeitos)
            if (m !== marcas[marcas.length - 1] || m.id !== grupo[grupo.length - 1].id) { avisos.push(`${m.id}: a palavra inteira não está no trecho ("${ouvido}"), corte errado; não foi salvo`); continue; }
            avisos.push(`${m.id}: salva (última do grupo), mas o Whisper ouviu "${ouvido}"; revise de ouvido`);
        }
        boas.push(m);
    }
    return { marcas: boas, avisos };
}

async function gravarPalavrasAgrupadas(itens, pasta, indiceArq, ids) {
    const indice = lerJson(indiceArq, { frases: {} });
    const pendentes = itens.filter(i => (!ids || ids.has(i.id)) && (o.forcar || indice.frases[i.id] !== i.hash || !existsSync(join(pasta, `${i.id}.mp3`))))
        .sort((a, b) => a.palavra.includes('-') - b.palavra.includes('-'));   // onomatopeias por último (não servem de âncora)
    // Grupos equilibrados de no máximo `agrupar` palavras (17 → 9 + 8, e não 8 + 8 + 1)
    const G = Math.ceil(pendentes.length / Math.ceil(pendentes.length / Number(o.agrupar ?? 10)));
    const grupos = [];
    for (let k = 0; k < pendentes.length; k += G) grupos.push(pendentes.slice(k, k + G).map((p, n) => ({ ...p, paragrafo: n })));
    console.log(`palavras (${MODELO_TTS} / ${ELENCO.NARRADORA.voz}): ${pendentes.length} em ${grupos.length} pedido(s)${o.seco ? ' [seco]' : ''}`);
    if (o.seco) { grupos.forEach((g, k) => console.log(`  grupo ${k + 1}: ${g.map(p => p.id).join(', ')}`)); return; }
    const falhas = [];
    await emParalelo(grupos, PARALELO, async (grupo) => {
        const rotulo = `grupo ${grupo[0].id}…${grupo[grupo.length - 1].id}`;
        try {
            const r = await gravarBloco({ frases: grupo, personagem: null, estilo: ESTILO_PALAVRAS, palavras: true }, {}, rotulo);
            if (r.erros >= 999) { falhas.push(`${rotulo}: ${r.motivo}`); return; }
            const { marcas, avisos } = await cortarPalavras(grupo, r.amostras);
            r.avisos = avisos;
            for (const m of marcas) {
                const trecho = r.amostras.subarray(Math.round(m.ini * TAXA), Math.round(m.fim * TAXA));
                salvarMp3(trecho, join(pasta, `${m.id}.mp3`));
                const item = grupo.find(g => g.id === m.id);
                const atual = lerJson(indiceArq, { frases: {} });
                atual.frases[m.id] = item.hash;
                Object.assign(atual, { modelo: MODELO_TTS, voz: ELENCO.NARRADORA.voz, estilo: ESTILO_PALAVRAS, qa: o['sem-qa'] ? 'sem' : 'whisper-large-v3-turbo (local)' });
                writeFileSync(indiceArq, JSON.stringify(atual, null, 2) + '\n');
                console.log(`  ✓ ${m.id} (${(m.fim - m.ini).toFixed(1)} s)`);
            }
            r.avisos.forEach(a => falhas.push(`${a} → revise de ouvido`));
        } catch (e) {
            falhas.push(`${rotulo}: ${e.message}`);
            console.log(`  ✗ ${rotulo}: ${e.message}`);
            if (/cota esgotada/.test(e.message)) return 'parar';
        }
    });
    if (falhas.length) {
        console.log(`\n${falhas.length} aviso(s):\n  ${falhas.join('\n  ')}`);
        process.exitCode = 1;
    }
}

async function main() {
    if (o['criar-voz']) return criarVoz();
    const base = join(RAIZ, o.livro, 'audio', o.voz);
    const pendentes = [];   // { item, wav, chave, faixa }
    let indiceArq, indice;

    if (o.amostra) {
        mkdirSync(base, { recursive: true });
        indiceArq = join(base, 'indice-amostra.json');
        indice = lerJson(indiceArq, { frases: {} });
        pendentes.push({ item: { id: 'amostra', fala: AMOSTRA, hash: 'amostra' }, wav: join(base, 'amostra.wav'), faixa: [1, 25] });
    } else {
        if (!o.parte) throw new Error('informe --parte N (ou --amostra)');
        const fonte = lerJson(join(RAIZ, 'docs', 'narracao', `frases-${o.livro}-parte-${o.parte}.json`));
        const pasta = o.voz === 'palavras' ? base : join(base, `parte-${o.parte}`);
        mkdirSync(pasta, { recursive: true });
        indiceArq = join(pasta, 'indice.json');
        indice = lerJson(indiceArq, { frases: {} });
        const ids = o.ids ? new Set(o.ids.split(',')) : null;
        const paginas = o.paginas ? new Set(o.paginas.split(',').map(Number)) : null;
        if (o['pagina-inteira']) return gravarPaginas(fonte, pasta, paginas, ids);
        const itens = o.voz === 'palavras'
            ? fonte.palavras.map(p => ({ ...p, id: p.slug }))
            : fonte.frases.filter(f => !paginas || paginas.has(f.pagina));
        if (o.voz === 'palavras' && Number(o.agrupar ?? 10) > 1) return gravarPalavrasAgrupadas(itens, pasta, indiceArq, ids);
        for (const item of itens) {
            if (ids && !ids.has(item.id)) continue;
            const mp3 = join(pasta, `${item.id}.mp3`);
            if (!o.forcar && indice.frases[item.id] === item.hash && existsSync(mp3)) continue;
            pendentes.push({ item, wav: join(pasta, `${item.id}.wav`), faixa: o.voz === 'palavras' ? [1, 12] : [0.5, 25] });
        }
    }

    console.log(`${o.voz} (${cfg.modelo} / ${cfg.voz}): ${pendentes.length} a gravar${o.seco ? ' [seco]' : ''}`);
    if (o.seco) {
        pendentes.forEach(p => console.log(`  ${p.item.id}: ${p.item.fala}`));
        return;
    }

    const falhas = [];
    await emParalelo(pendentes, PARALELO, async (p) => {
        try {
            const r = await gravar(p.item, p.wav, p.faixa);
            execFileSync('node', [join(RAIZ, 'tools', 'otimizar-audio.mjs'), p.wav], { stdio: 'ignore' });
            indice.frases = { ...lerJson(indiceArq, { frases: {} }).frases, ...indice.frases, [p.item.id]: p.item.hash };
            Object.assign(indice, { modelo: cfg.modelo, voz: cfg.voz, estilo: cfg.estilo, qa: o['sem-qa'] ? 'sem' : 'whisper-large-v3-turbo (local)' });
            writeFileSync(indiceArq, JSON.stringify(indice, null, 2) + '\n');
            console.log(`  ✓ ${p.item.id} (${r.segundos.toFixed(1)} s${r.tentativas > 1 ? `, ${r.tentativas} tentativas` : ''})`);
            if (r.aviso) falhas.push(`${p.item.id}: gravada, mas revise de ouvido (${r.aviso})`);
        } catch (e) {
            falhas.push(`${p.item.id}: ${e.message}`);
            console.log(`  ✗ ${p.item.id}: ${e.message}`);
            if (/cota esgotada/.test(e.message)) return 'parar';
        }
    });
    if (falhas.length) {
        console.log(`\n${falhas.length} frase(s) com problema (anote em docs/narracao/qa-parte-N.md):\n  ${falhas.join('\n  ')}`);
        process.exitCode = 1;
    }
}

function registrarGasto() {
    if (!gasto.pedidos) return;
    const usd = dolares();
    console.log(`\n💰 ${gasto.pedidos} pedido(s) de voz, ${gasto.tts} tokens de áudio: ~US$ ${usd.toFixed(4)} (estimativa${flex ? `, Flex${gasto.ttsStandard ? `; ${gasto.ttsStandard} tokens caíram no Standard` : ''}` : ', Standard'})`);
    const arq = join(RAIZ, 'docs', 'narracao', 'gastos.csv');
    if (!existsSync(arq)) writeFileSync(arq, 'data,comando,pedidos_voz,tokens_audio,tokens_qa,usd_estimado\n');
    const linha = [new Date().toISOString().slice(0, 16), `"${process.argv.slice(2).join(' ')}"`, gasto.pedidos, gasto.tts, 0, usd.toFixed(4)].join(',');
    writeFileSync(arq, readFileSync(arq, 'utf8') + linha + '\n');
}

main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => { whisper?.fechar(); registrarGasto(); });
