// Gera ilustrações pela API do Gemini (Nano Banana 2, `gemini-3.1-flash-image`), no modo Batch (metade do preço).
// Passo a passo e lições aprendidas: docs/ARTE-PELA-API.md.
//
// ⚠️ REGRA DO HUMANO (AGENTS.md §2.7): as imagens normalmente saem do Antigravity (cota do plano Pro). A API paga
// só é usada para imagens quando o humano autoriza no prompt inicial da sessão, e só para o que ele autorizou
// (ex.: 2026-10-24, "as imagens que faltam da Parte 2"). Sem `--autorizado`, o script não chama a API.
//
// A chave NÃO passa por aqui: o proxy do ambiente injeta x-goog-api-key nas requisições a
// generativelanguage.googleapis.com (como na narração, docs/TODO-NARRACAO.md §8.1).
//
// Uso:
//   npm run gerar:imagens -- --lista tools/arte/dom-quixote-parte-2.mjs --seco                  # mostra os pedidos e o custo
//   npm run gerar:imagens -- --lista tools/arte/dom-quixote-parte-2.mjs --ids p4-real,p5-real --autorizado
//   npm run gerar:imagens -- --lista ... --lote batches/abc123                                  # retoma um lote já enviado
//   ... --standard     # pedidos diretos, na hora (o dobro do preço do Batch); só quando o Batch travar
//
// Cada imagem recebida vai para .cache-arte/<lista>/<id>/<data>.png (fora do Git). O Claude olha, escolhe e copia a boa
// para o destino (`destino` na lista); camadas passam antes por tools/recortar-camada.py (fundo magenta → alfa).
// O gasto de cada rodada vai para docs/arte/gastos.csv.
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { dirname, join, resolve, extname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setGlobalDispatcher, EnvHttpProxyAgent } from 'undici';

setGlobalDispatcher(new EnvHttpProxyAgent({ headersTimeout: 10 * 60e3, bodyTimeout: 10 * 60e3 }));

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://generativelanguage.googleapis.com/v1beta';
const CACHE = join(RAIZ, '.cache-arte');
const GASTOS = join(RAIZ, 'docs/arte/gastos.csv');

// Preços por milhão de tokens (página de preços do Gemini, 2026-10-24). Batch = metade do Standard.
// Imagem 1K = 1.120 tokens (US$ 0,067 Standard, US$ 0,034 Batch); 512 px = 747 tokens.
const PRECO = {
    'gemini-3.1-flash-image': { entrada: 0.5, texto: 3, imagem: 60 },
    'gemini-nano-banana-2.1': { entrada: 1.5, texto: 7.5, imagem: 30 }
};
const TOKENS_IMAGEM = { '512': 747, '1K': 1120, '2K': 1680 };

function opcoes(argv) {
    const o = {};
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i].replace(/^--/, '');
        if (['seco', 'autorizado', 'standard'].includes(a)) o[a] = true;
        else o[a] = argv[++i];
    }
    return o;
}

const o = opcoes(process.argv.slice(2));
if (!o.lista) {
    console.error('Use --lista <arquivo .mjs com os pedidos> (ex.: tools/arte/dom-quixote-parte-2.mjs)');
    process.exit(1);
}
const lista = (await import(pathToFileURL(resolve(RAIZ, o.lista)).href)).default;
const NOME_LISTA = basename(o.lista, '.mjs');   // cache separado por lista: os ids (p0-real...) se repetem entre as partes
const modelo = o.modelo || lista.modelo;
const preco = PRECO[modelo];
const fator = o.standard ? 1 : 0.5;
const ids = o.ids ? o.ids.split(',') : lista.pedidos.map(p => p.id);
const pedidos = ids.map(id => {
    const p = lista.pedidos.find(x => x.id === id);
    if (!p) throw new Error(`pedido desconhecido: ${id}`);
    return p;
});

const cabecalhos = { 'Content-Type': 'application/json', ...(process.env.GEMINI_API_KEY ? { 'x-goog-api-key': process.env.GEMINI_API_KEY } : {}) };
const espera = (ms) => new Promise(r => setTimeout(r, ms));
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

/* O texto final do pedido: estilo-mestre (+ bíblia da Imaginação nas cenas -imag) + descrição dos personagens
   citados + o prompt da imagem */
function textoDoPedido(p) {
    const estilo = p.camada ? lista.estiloCamada : p.imaginacao ? `${lista.estilo}\n\n${lista.imaginacao}` : lista.estilo;
    const fichas = Object.entries(lista.personagens)
        .filter(([nome]) => p.prompt.includes(`[${nome}]`))
        .map(([nome, desc]) => `[${nome}] = ${desc}`);
    return [estilo, fichas.length ? `Characters (keep them exactly as in the reference images):\n${fichas.join('\n')}` : '', p.prompt]
        .filter(Boolean).join('\n\n');
}

function corpoDoPedido(p) {
    const partes = [];
    for (const ref of p.refs || []) {
        const caminho = join(RAIZ, ref);
        if (!existsSync(caminho)) throw new Error(`${p.id}: referência ausente: ${ref}`);
        partes.push({ inline_data: { mime_type: MIME[extname(ref).toLowerCase()], data: readFileSync(caminho).toString('base64') } });
    }
    partes.push({ text: textoDoPedido(p) });
    return {
        contents: [{ role: 'user', parts: partes }],
        generation_config: {
            response_modalities: ['IMAGE'],
            image_config: { aspect_ratio: p.proporcao || '16:9', image_size: p.tamanho || '1K' }
        }
    };
}

function estimar(p) {
    const refs = (p.refs || []).length;
    const entrada = refs * 1120 + 600;   // estimativa grosseira por imagem de referência + texto
    return (entrada * preco.entrada + TOKENS_IMAGEM[p.tamanho || '1K'] * preco.imagem + 300 * preco.texto) * fator / 1e6;
}

async function chamar(metodo, url, corpo) {
    for (let tentativa = 0; ; tentativa++) {
        let r, j;
        try {
            r = await fetch(url, { method: metodo, headers: cabecalhos, body: corpo && JSON.stringify(corpo) });
            j = await r.json().catch(() => ({}));
        } catch (e) {
            if (tentativa >= 4) throw e;
            await espera(2000 * 2 ** tentativa);
            continue;
        }
        if (r.ok) return j;
        const msg = j.error ? `${r.status} ${j.error.status || ''}: ${j.error.message}` : `HTTP ${r.status}`;
        if ((r.status === 429 || r.status >= 500) && tentativa < 4) {
            console.log(`  ⏳ ${msg.slice(0, 160)}; nova tentativa`);
            await espera(15000 * 2 ** tentativa);
            continue;
        }
        throw new Error(msg);
    }
}

/* Salva as imagens de uma resposta e devolve o uso de tokens */
function guardar(id, resposta) {
    const partes = resposta?.candidates?.[0]?.content?.parts || [];
    const imagens = partes.filter(x => (x.inlineData || x.inline_data)?.data);
    const pasta = join(CACHE, NOME_LISTA, id);
    mkdirSync(pasta, { recursive: true });
    const carimbo = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    imagens.forEach((x, n) => {
        const d = x.inlineData || x.inline_data;
        const arq = join(pasta, `${carimbo}${n ? '-' + n : ''}.png`);
        writeFileSync(arq, Buffer.from(d.data, 'base64'));
        console.log(`  ✅ ${id} → ${arq.replace(RAIZ + '/', '')}`);
    });
    if (!imagens.length) {
        const motivo = resposta?.candidates?.[0]?.finishReason || resposta?.promptFeedback?.blockReason || 'sem imagem';
        console.log(`  ❌ ${id}: ${motivo}`);
    }
    const u = resposta?.usageMetadata || {};
    const imagemTok = (u.candidatesTokensDetails || []).filter(d => d.modality === 'IMAGE').reduce((s, d) => s + d.tokenCount, 0);
    return {
        entrada: u.promptTokenCount || 0,
        imagem: imagemTok,
        texto: (u.candidatesTokenCount || 0) - imagemTok + (u.thoughtsTokenCount || 0),
        ok: imagens.length > 0
    };
}

function registrarGasto(uso, comando) {
    const usd = (uso.entrada * preco.entrada + uso.imagem * preco.imagem + uso.texto * preco.texto) * fator / 1e6;
    if (!existsSync(GASTOS)) {
        mkdirSync(dirname(GASTOS), { recursive: true });
        writeFileSync(GASTOS, 'data,modelo,nivel,comando,pedidos,imagens_ok,tokens_entrada,tokens_imagem,tokens_texto,usd_estimado\n');
    }
    appendFileSync(GASTOS, `${new Date().toISOString().slice(0, 16)},${modelo},${o.standard ? 'standard' : 'batch'},"${comando}",${uso.pedidos},${uso.ok},${uso.entrada},${uso.imagem},${uso.texto},${usd.toFixed(4)}\n`);
    console.log(`\n💰 ${uso.ok}/${uso.pedidos} imagens; tokens: entrada ${uso.entrada}, imagem ${uso.imagem}, texto/raciocínio ${uso.texto}; ≈ US$ ${usd.toFixed(4)}`);
}

/* Procura a lista de respostas no lote (a documentação mostra caminhos diferentes) */
function respostasDoLote(lote) {
    const achar = (x) => {
        if (!x || typeof x !== 'object') return null;
        if (Array.isArray(x.inlinedResponses)) return x.inlinedResponses;
        for (const v of Object.values(x)) {
            const r = achar(v);
            if (r) return r;
        }
        return null;
    };
    return achar(lote) || [];
}

const estado = (lote) => lote.metadata?.state || lote.state || lote.response?.state || '';

// ---------------------------------------------------------------------------------------------------------
const comando = process.argv.slice(2).filter(a => a !== '--autorizado').join(' ');
const total = pedidos.reduce((s, p) => s + estimar(p), 0);
console.log(`${modelo} (${o.standard ? 'Standard' : 'Batch'}): ${pedidos.length} pedido(s), ≈ US$ ${total.toFixed(3)}`);
for (const p of pedidos) console.log(`  · ${p.id} (${p.proporcao || '16:9'}, ${p.tamanho || '1K'}, ${(p.refs || []).length} ref.) → ${p.destino}`);
if (o.seco) {
    if (o.mostrar) console.log('\n' + textoDoPedido(pedidos.find(p => p.id === o.mostrar)));
    process.exit(0);
}
if (!o.autorizado) {
    console.error('\n⛔ Sem --autorizado: a API paga só é chamada com autorização do humano (AGENTS.md §2.7).');
    process.exit(1);
}

const uso = { pedidos: 0, ok: 0, entrada: 0, imagem: 0, texto: 0 };
const somar = (u) => { uso.pedidos++; uso.ok += u.ok ? 1 : 0; uso.entrada += u.entrada; uso.imagem += u.imagem; uso.texto += u.texto; };

if (o.standard) {
    await Promise.all(pedidos.map(async p => {
        try {
            somar(guardar(p.id, await chamar('POST', `${API}/models/${modelo}:generateContent`, corpoDoPedido(p))));
        } catch (e) {
            console.log(`  ❌ ${p.id}: ${e.message}`);
        }
    }));
} else {
    let nome = o.lote;
    if (!nome) {
        const lote = await chamar('POST', `${API}/models/${modelo}:batchGenerateContent`, {
            batch: {
                display_name: `classicos-vivos ${ids.join(' ')}`.slice(0, 120),
                input_config: { requests: { requests: pedidos.map(p => ({ request: corpoDoPedido(p), metadata: { key: p.id } })) } }
            }
        });
        nome = lote.name;
        mkdirSync(CACHE, { recursive: true });
        appendFileSync(join(CACHE, 'lotes.txt'), `${new Date().toISOString()} ${nome} ${ids.join(',')}\n`);
        console.log(`📦 lote enviado: ${nome} (para retomar: --lote ${nome})`);
    }
    let lote;
    const inicio = Date.now();
    for (;;) {
        lote = await chamar('GET', `${API}/${nome}`);
        const st = estado(lote);
        if (/SUCCEEDED|FAILED|CANCELLED|EXPIRED/.test(st) || lote.done) break;
        console.log(`  … ${st || 'aguardando'} (${Math.round((Date.now() - inicio) / 1000)} s)`);
        await espera(30000);
    }
    console.log(`📦 ${nome}: ${estado(lote)}`);
    const respostas = respostasDoLote(lote);
    respostas.forEach((r, n) => {
        const id = r.metadata?.key || ids[n];
        if (r.error) {
            console.log(`  ❌ ${id}: ${r.error.message}`);
            uso.pedidos++;
        } else somar(guardar(id, r.response));
    });
    if (!respostas.length) console.log(JSON.stringify(lote).slice(0, 2000));
}
registrarGasto(uso, comando);
