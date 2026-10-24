// Grava a narração dos livros pela API de voz (TTS) do Gemini, frase por frase, com controle de qualidade.
// Passo a passo e decisões: docs/TODO-NARRACAO.md (seção 8).
//
// A chave NÃO passa por aqui: o proxy do ambiente injeta o cabeçalho x-goog-api-key nas requisições a
// generativelanguage.googleapis.com. Se existir $GEMINI_API_KEY, ela é enviada no cabeçalho (nunca na URL
// nem impressa).
//
// Uso:
//   npm run gravar:narracao -- --voz narradora --parte 1                 # todas as frases da Parte 1
//   npm run gravar:narracao -- --voz narradora --parte 1 --paginas 0,1   # só algumas páginas
//   npm run gravar:narracao -- --voz narradora --parte 1 --ids p2-s5     # regravar frases específicas
//   npm run gravar:narracao -- --voz narradora --amostra                 # amostra.mp3 do painel "Voz"
//   npm run gravar:narracao -- --voz palavras --parte 1                  # palavras-chave (sílabas)
//   ... --seco                                                            # mostra o que faria, sem chamar a API
//   ... --forcar                                                          # regrava mesmo com o hash igual
//   ... --sem-qa                                                          # pula a transcrição de conferência
//
// Para cada frase: gera o WAV, transcreve com um modelo de texto e compara com o campo `fala` (até 3
// tentativas; se nenhuma bater, guarda a mais próxima e avisa), converte para MP3 (tools/otimizar-audio.mjs)
// e registra o hash em indice.json. Frases com o
// mesmo hash já gravado são puladas: pode rodar de novo depois de uma queda ou do fim da cota.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
// As "narradora-*" são candidatas em teste: a escolhida pelo humano vira `narradora` (renomear a pasta).
const VOZES = {
    'narradora-a': { voz: 'pt-br-storyteller-9', estilo: ESTILO_NARRADORA },
    'narradora-b': { voz: 'pt-br-tutor-5', estilo: ESTILO_NARRADORA, modelo: 'gemini-3.8-flash-lite-tts' },
    'narradora-c': { voz: 'pt-br-assistant-6', estilo: ESTILO_NARRADORA, modelo: 'gemini-3.8-flash-lite-tts' },
    'narradora-d': { voz: 'Sulafat', estilo: ESTILO_NARRADORA, modelo: 'gemini-3.8-flash-lite-tts' },
    palavras: { voz: 'pt-br-storyteller-9', estilo: ESTILO_PALAVRAS }
};

function opcoes(argv) {
    const o = { livro: 'dom-quixote' };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i].replace(/^--/, '');
        if (['seco', 'forcar', 'amostra', 'sem-qa'].includes(a)) o[a] = true;
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

function duracao(wav) {
    return (wav.length - 44) / 48000;
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
        const itens = o.voz === 'palavras'
            ? fonte.palavras.map(p => ({ ...p, id: p.slug }))
            : fonte.frases.filter(f => !paginas || paginas.has(f.pagina));
        for (const item of itens) {
            if (ids && !ids.has(item.id)) continue;
            const mp3 = join(pasta, `${item.id}.mp3`);
            if (!o.forcar && indice.frases[item.id] === item.hash && existsSync(mp3)) continue;
            pendentes.push({ item, wav: join(pasta, `${item.id}.wav`), faixa: o.voz === 'palavras' ? [1, 8] : [0.5, 25] });
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
