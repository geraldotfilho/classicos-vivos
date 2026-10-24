// Grava a narração dos livros pela API de voz (TTS) do Gemini, frase por frase, com controle de qualidade.
// Passo a passo e decisões: docs/TODO-NARRACAO.md (seção 8).
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
//   npm run gravar:narracao -- --voz narracao --parte 1 --paginas 2 --pagina-inteira
//       # a página inteira num pedido só (entonação mais contínua) + marcação das frases depois,
//       # em parte-N/paginas.json (o livro toca um MP3 por página e destaca a frase pelo tempo)
//
// Para cada frase: gera o WAV, transcreve com um modelo de texto e compara com o campo `fala` (até 3
// tentativas; se nenhuma bater, guarda a mais próxima e avisa), converte para MP3 (tools/otimizar-audio.mjs)
// e registra o hash em indice.json. Frases com o
// mesmo hash já gravado são puladas: pode rodar de novo depois de uma queda ou do fim da cota.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://generativelanguage.googleapis.com/v1beta';
const MODELO_TTS = 'gemini-3.8-flash-tts';
const MODELO_QA = 'gemini-3.5-flash';
const AMOSTRA = 'Olá! Eu vou ler esta história com você. Vire a página quando quiser!';

const ESTILO_NARRADORA = 'warm, gentle storyteller reading aloud to young children; calm, clear pace; expressive but not theatrical';
const ESTILO_PALAVRAS = 'literacy teacher: each syllable slowly and clearly separated with short pauses, then the whole word joyfully';

// Pasta de saída (dom-quixote/audio/<id>) → voz da API (e o modelo, se não for o MODELO_TTS).
// `narracao` é a narração do livro: a narradora, escolhida de ouvido pelo humano em 2026-10-24.
// As falas dos personagens terão vozes próprias (elenco a escolher com o humano; ver TODO-NARRACAO §3).
const NARRADORA = 'pt-br-storyteller-9';
const VOZES = {
    narracao: { voz: NARRADORA, estilo: ESTILO_NARRADORA },
    palavras: { voz: NARRADORA, estilo: ESTILO_PALAVRAS }
};

function opcoes(argv) {
    const o = { livro: 'dom-quixote' };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i].replace(/^--/, '');
        if (['seco', 'forcar', 'amostra', 'sem-qa', 'pagina-inteira'].includes(a)) o[a] = true;
        else o[a] = argv[++i];
    }
    return o;
}

const o = opcoes(process.argv.slice(2));
const cfg = VOZES[o.voz] && { modelo: MODELO_TTS, ...VOZES[o.voz] };
if (!cfg) {
    console.error(`Use --voz com uma destas: ${Object.keys(VOZES).join(', ')}`);
    process.exit(1);
}
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
async function sintetizar(texto, estilo) {
    const j = await postar(`${API}/interactions`, {
        model: cfg.modelo,
        input: [{ type: 'user_input', content: [{ type: 'text', text: texto, annotations: [{ type: 'speech_metadata', style: estilo }] }] }],
        response_format: { type: 'audio' },
        generation_config: { speech_config: [{ voice: cfg.voz }] }
    });
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

async function transcrever(wav) {
    const j = await postar(`${API}/models/${MODELO_QA}:generateContent`, {
        contents: [{ parts: [
            { inlineData: { mimeType: 'audio/wav', data: wav.toString('base64') } },
            { text: 'Transcreva exatamente o que é falado, em português, com os números escritos por extenso. Responda só com a transcrição.' }
        ] }]
    });
    return (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
}

/* Compara palavra por palavra, sem acento, pontuação nem caixa ("es... tre... las" vira "es tre las") */
const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/* Duração da fala sem o silêncio das pontas (o mesmo corte do tools/otimizar-audio.mjs, que gera o MP3) */
function duracao(wav) {
    const a = new Int16Array(wav.buffer.slice(wav.byteOffset + 44, wav.byteOffset + wav.length - ((wav.length - 44) % 2)));
    let ini = 0, fim = a.length - 1;
    while (ini < fim && Math.abs(a[ini]) < 500) ini++;
    while (fim > ini && Math.abs(a[fim]) < 500) fim--;
    return (fim - ini) / 24000;
}

/* Palavras do esperado que faltam no ouvido e vice-versa (distância de edição por palavra) */
function diferenca(esperado, ouvido) {
    const a = normalizar(esperado).split(' '), b = normalizar(ouvido).split(' ');
    let ant = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
        const lin = [i];
        for (let j = 1; j <= b.length; j++) lin[j] = Math.min(ant[j] + 1, lin[j - 1] + 1, ant[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        ant = lin;
    }
    return ant[b.length];
}

/* Até 3 tentativas. Se nenhuma bater 100%, guarda a de menor diferença e devolve o aviso para a revisão humana
   (cada pedido conta na cota: não jogamos áudio fora) */
async function gravar(item, destinoWav, faixa) {
    let melhor = null;
    for (let tentativa = 1; tentativa <= 3; tentativa++) {
        const wav = await sintetizar(item.fala, cfg.estilo);
        const s = duracao(wav);
        let erros = s >= faixa[0] && s <= faixa[1] ? 0 : 99, motivo = erros ? `duração ${s.toFixed(1)} s` : '';
        if (!erros && !o['sem-qa']) {
            const ouvido = await transcrever(wav);
            erros = diferenca(item.fala, ouvido);
            if (erros) motivo = `${erros} palavra(s) diferente(s): "${ouvido}"`;
        }
        if (!melhor || erros < melhor.erros) melhor = { wav, s, erros, motivo, tentativas: tentativa };
        if (!erros) break;
        console.log(`  ↻ ${item.id} tentativa ${tentativa}: ${motivo}`);
    }
    if (melhor.erros >= 99) throw new Error(`não passou na QA (${melhor.motivo})`);
    writeFileSync(destinoWav, melhor.wav);
    return { tentativas: melhor.tentativas, segundos: melhor.s, aviso: melhor.erros ? melhor.motivo : '' };
}

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
    const total = frases.reduce((t, f) => t + f.fala.length, 0);
    const media = (vozFim - vozIni) / frases.length;
    let acc = 0;
    const esperado = frases.slice(0, -1).map(f => vozIni + (vozFim - vozIni) * (acc += f.fala.length) / total);
    const custo = (k, g) => ((gaps[g].meio - esperado[k]) / media) ** 2 * 4 - gaps[g].s / 0.3;
    const K = esperado.length, G = gaps.length;
    if (G < K) return null;
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

/* Uma tentativa: gera, marca e confere cada trecho por transcrição */
async function tentarPagina(frases) {
    const texto = [...new Set(frases.map(f => f.paragrafo))]
        .map(k => frases.filter(f => f.paragrafo === k).map(f => f.fala).join(' ')).join('\n\n');
    const a = amostrasDe(await sintetizar(texto, cfg.estilo));
    let vozIni = 0, vozFim = a.length - 1;
    while (vozIni < vozFim && Math.abs(a[vozIni]) < 500) vozIni++;
    while (vozFim > vozIni && Math.abs(a[vozFim]) < 500) vozFim--;
    const escolha = fronteiras(frases, pausas(a, vozIni, vozFim), vozIni, vozFim);
    if (!escolha) return { erros: 999, motivo: 'pausas de menos para separar as frases' };

    // Corte das pontas (80 ms de margem, como o otimizar-audio.mjs, que assim não corta de novo)
    const margem = Math.round(TAXA * 0.08);
    const ini = Math.max(0, vozIni - margem), fim = Math.min(a.length, vozFim + margem);
    const cortes = [ini, ...escolha.map(e => Math.round(e.meio)), fim];
    const marcas = [], avisos = [];
    let erros = 0;
    for (let k = 0; k < frases.length; k++) {
        const trecho = a.subarray(cortes[k], cortes[k + 1]);
        let dif = 0;
        if (!o['sem-qa']) {
            const ouvido = await transcrever(wavDe(trecho));
            dif = diferenca(frases[k].fala, ouvido);
            if (dif) avisos.push(`${frases[k].id}: ${dif} palavra(s) diferente(s): "${ouvido}"`);
        }
        erros += dif;
        marcas.push({ id: frases[k].id, ini: +((cortes[k] - ini) / TAXA).toFixed(2), fim: +((cortes[k + 1] - ini) / TAXA).toFixed(2) });
    }
    marcas[marcas.length - 1].fim = +((fim - ini) / TAXA).toFixed(2);
    return { erros, avisos, marcas, wav: wavDe(a.subarray(ini, fim)), segundos: (fim - ini) / TAXA, motivo: avisos.join('; ') };
}

async function gravarPaginas(fonte, pasta, paginas) {
    const arqPaginas = join(pasta, 'paginas.json');
    const registro = lerJson(arqPaginas, {});
    const numeros = [...new Set(fonte.frases.map(f => f.pagina))].filter(n => !paginas || paginas.has(n));
    const falhas = [];
    for (const n of numeros) {
        const frases = fonte.frases.filter(f => f.pagina === n);
        const hash = createHash('sha1').update(frases.map(f => f.hash).join()).digest('hex').slice(0, 10);
        const id = `p${n}`;
        if (!o.forcar && registro[id]?.hash === hash && existsSync(join(pasta, `${id}.mp3`))) continue;
        console.log(`${id} (${frases.length} frases, página inteira)${o.seco ? ' [seco]' : ''}`);
        if (o.seco) continue;
        let melhor = null;
        for (let tentativa = 1; tentativa <= 3; tentativa++) {
            const r = await tentarPagina(frases);
            r.tentativas = tentativa;
            if (!melhor || r.erros < melhor.erros) melhor = r;
            if (!r.erros) break;
            console.log(`  ↻ ${id} tentativa ${tentativa}: ${r.motivo}`);
        }
        if (melhor.erros >= 999) { falhas.push(`${id}: ${melhor.motivo}`); continue; }
        writeFileSync(join(pasta, `${id}.wav`), melhor.wav);
        execFileSync('node', [join(RAIZ, 'tools', 'otimizar-audio.mjs'), join(pasta, `${id}.wav`)], { stdio: 'ignore' });
        registro[id] = { arquivo: `${id}.mp3`, hash, frases: melhor.marcas };
        Object.assign(registro, { modelo: cfg.modelo, voz: cfg.voz, estilo: cfg.estilo, qa: o['sem-qa'] ? 'sem' : MODELO_QA });
        writeFileSync(arqPaginas, JSON.stringify(registro, null, 2) + '\n');
        console.log(`  ✓ ${id} (${melhor.segundos.toFixed(1)} s${melhor.tentativas > 1 ? `, ${melhor.tentativas} tentativas` : ''})`);
        melhor.marcas.forEach(m => console.log(`      ${m.id}: ${m.ini.toFixed(2)}–${m.fim.toFixed(2)} s`));
        if (melhor.erros) falhas.push(`${id}: gravada, mas revise de ouvido (${melhor.motivo})`);
    }
    if (falhas.length) {
        console.log(`\n${falhas.length} página(s) com problema:\n  ${falhas.join('\n  ')}`);
        process.exitCode = 1;
    }
}

async function main() {
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
        if (o['pagina-inteira']) return gravarPaginas(fonte, pasta, paginas);
        const itens = o.voz === 'palavras'
            ? fonte.palavras.map(p => ({ ...p, id: p.slug }))
            : fonte.frases.filter(f => !paginas || paginas.has(f.pagina));
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
    for (const p of pendentes) {
        try {
            const r = await gravar(p.item, p.wav, p.faixa);
            execFileSync('node', [join(RAIZ, 'tools', 'otimizar-audio.mjs'), p.wav], { stdio: 'ignore' });
            indice.frases[p.item.id] = p.item.hash;
            Object.assign(indice, { modelo: cfg.modelo, voz: cfg.voz, estilo: cfg.estilo, qa: o['sem-qa'] ? 'sem' : MODELO_QA });
            writeFileSync(indiceArq, JSON.stringify(indice, null, 2) + '\n');
            console.log(`  ✓ ${p.item.id} (${r.segundos.toFixed(1)} s${r.tentativas > 1 ? `, ${r.tentativas} tentativas` : ''})`);
            if (r.aviso) falhas.push(`${p.item.id}: gravada, mas revise de ouvido (${r.aviso})`);
        } catch (e) {
            falhas.push(`${p.item.id}: ${e.message}`);
            console.log(`  ✗ ${p.item.id}: ${e.message}`);
            if (/cota esgotada/.test(e.message)) break;
        }
    }
    if (falhas.length) {
        console.log(`\n${falhas.length} frase(s) com problema (anote em docs/narracao/qa-parte-N.md):\n  ${falhas.join('\n  ')}`);
        process.exitCode = 1;
    }
}

main().catch(e => { console.error(e.message); process.exit(1); });
