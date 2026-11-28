// Situação da narração gravada: para cada idioma e parte, quantas páginas e palavras-chave já estão gravadas
// (com o mesmo hash do texto atual) e o que falta. Também confere se algum pN.mp3 ainda tem a rajada de ruído do TTS
// (o "arranhão" entre frases, AGENTS.md §2.6) com tools/audio_gate.py --verificar. Não chama nenhuma API.
// Também mostra se cada parte está ligada no <livro>/audio/vozes.js (partes / prévia / fora) e avisa nos desencontros:
// parte toda gravada que ainda não está em `partes` (nem as palavras-chave tocam) e parte em `partes` com algo faltando.
// Com --fim, confere também de ouvido (Whisper local, tools/conferir-fim.py) se a ÚLTIMA palavra de cada página está
// no MP3 final: o gate antigo cortava o fim das páginas (Issues #75, #76, #79 de 2026-11-28; docs/TODO-NARRACAO.md §20).
// Uso: node tools/conferir-narracao.mjs [--livro dom-quixote] [--partes 1,2,3] [--idiomas pt,en,fr,es] [--fim]
//      (sem --partes: todas as partes que têm docs/narracao/frases-<livro>-parte-N.json)
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, t) => (v.startsWith('--') ? [...a, [v.slice(2), t[i + 1] && !t[i + 1].startsWith('--') ? t[i + 1] : true]] : a), []));
const livro = args.livro || 'dom-quixote';
// Sem --partes: descobre todas as partes que têm a lista de frases exportada
const partes = args.partes ? args.partes.split(',') : [...new Set(readdirSync(join(RAIZ, 'docs', 'narracao'))
    .map(f => f.match(new RegExp(`^frases-${livro}-parte-(\\d+)(?:-[a-z]{2})?\\.json$`))?.[1]).filter(Boolean))].sort((a, b) => a - b);
const idiomas = (args.idiomas || 'pt,en,fr,es').split(',');
const lerJson = (arq, padrao) => (existsSync(arq) ? JSON.parse(readFileSync(arq, 'utf8')) : padrao);

// Vozes ligadas no livro (o mesmo arquivo que o leitor carrega): { 'narracao-en': { partes: [...], previa: [...] } }
const vozesLigadas = (() => {
    const arq = join(RAIZ, livro, 'audio', 'vozes.js');
    if (!existsSync(arq)) return {};
    const window = {};
    try { new Function('window', readFileSync(arq, 'utf8'))(window); } catch (e) { console.error(`⚠️  Não deu para ler ${arq}: ${e.message}`); }
    return Object.fromEntries((window.VOZES_GRAVADAS || []).map(v => [v.id, v]));
})();
const avisos = [];

for (const idioma of idiomas) {
    const sufixo = idioma === 'pt' ? '' : `-${idioma}`;
    for (const parte of partes) {
        const fonte = lerJson(join(RAIZ, 'docs', 'narracao', `frases-${livro}-parte-${parte}${sufixo}.json`), null);
        if (!fonte) continue;
        const pasta = join(RAIZ, livro, 'audio', `narracao${sufixo}`, `parte-${parte}`);
        const roteiro = lerJson(join(pasta, 'roteiro.json'), {});
        // Páginas gravadas frase a frase (ex.: P1 p0 e p1 em português) também valem: o leitor toca pN-sK.mp3
        const indiceFrases = lerJson(join(pasta, 'indice.json'), { frases: {} }).frases || {};
        const registro = lerJson(join(pasta, 'paginas.json'), {});
        const elenco = registro.elenco || {};
        const paginas = [...new Set(fonte.frases.map(f => f.pagina))];
        // a mesma conta do gravar-narracao.mjs: hash das frases + roteiro + elenco que fala na página
        const pendentesPag = paginas.filter(n => {
            const frases = fonte.frases.filter(f => f.pagina === n);
            if (frases.every(f => indiceFrases[f.id] === f.hash && existsSync(join(pasta, `${f.id}.mp3`)))) return false;
            const falantes = [...new Set(frases.flatMap(f => (roteiro[f.id] || [['NARRADORA']]).map(t => t[0])))];
            const hash = createHash('sha1').update(frases.map(f => f.hash).join() + JSON.stringify(frases.map(f => roteiro[f.id] || null)) + JSON.stringify(falantes.map(q => [q, elenco[q]]))).digest('hex').slice(0, 10);
            return !(registro[`p${n}`]?.hash === hash && existsSync(join(pasta, `p${n}.mp3`)));
        });
        const indice = lerJson(join(RAIZ, livro, 'audio', `palavras${sufixo}`, 'indice.json'), { frases: {} }).frases;
        const faltam = (fonte.palavras || []).filter(w => !(indice[w.slug] === w.hash && existsSync(join(RAIZ, livro, 'audio', `palavras${sufixo}`, `${w.slug}.mp3`)))).map(w => w.slug);
        const voz = vozesLigadas[`narracao${sufixo}`] || {};
        const n = Number(parte);
        const ligada = (voz.partes || []).includes(n) ? 'ligada' : (voz.previa || []).includes(n) ? 'prévia' : 'fora';
        const completa = !pendentesPag.length && !faltam.length;
        if (completa && ligada !== 'ligada') avisos.push(`${idioma} parte ${parte}: toda gravada, mas está ${ligada === 'prévia' ? 'em `previa`' : 'fora'} do vozes.js; ponha ${parte} em \`partes\` da voz narracao${sufixo}`);
        if (!completa && ligada === 'ligada') avisos.push(`${idioma} parte ${parte}: está em \`partes\` no vozes.js, mas ainda falta gravar (o que falta sai na voz do aparelho)`);
        console.log(`${idioma} parte ${parte}: páginas ${paginas.length - pendentesPag.length}/${paginas.length}${pendentesPag.length ? ` (faltam p${pendentesPag.join(', p')})` : ''}; palavras ${(fonte.palavras || []).length - faltam.length}/${(fonte.palavras || []).length}${faltam.length ? ` (faltam ${faltam.join(', ')})` : ''}; vozes.js: ${ligada}`);
    }
}

if (avisos.length) console.log(`\n⚠️  ${avisos.length} desencontro(s) com o vozes.js:\n  ${avisos.join('\n  ')}\n`);

// Rajadas de ruído do TTS (o "arranhão de agulha" entre frases): nenhum pN.mp3 pode ter
const mp3s = [];
for (const idioma of idiomas) {
    const sufixo = idioma === 'pt' ? '' : `-${idioma}`;
    for (const parte of partes) {
        const pasta = join(RAIZ, livro, 'audio', `narracao${sufixo}`, `parte-${parte}`);
        if (existsSync(pasta)) for (const f of readdirSync(pasta)) if (/^p\d+\.mp3$/.test(f)) mp3s.push(join(pasta, f));
    }
}
if (mp3s.length) {
    let r = null;
    for (const py of ['python3', 'python']) {
        r = spawnSync(py, [join(RAIZ, 'tools', 'audio_gate.py'), '--verificar', ...mp3s], { encoding: 'utf8' });
        if (!r.error && /Rajadas:/.test(r.stdout || '')) break;
        r = null;
    }
    if (!r) console.error('⚠️  Não deu para conferir as rajadas (precisa de python3 com numpy e do ffmpeg).');
    else if (r.status) { console.error((r.stdout || '').trim()); console.error('❌ Há rajadas: rode python3 tools/audio_gate.py --so-rajadas <arquivos> e confira de novo.'); process.exitCode = 1; }
    else console.log(`✅ Sem rajadas de ruído nas ${mp3s.length} páginas gravadas.`);
}

// Fim das páginas (--fim): a última palavra tem de estar no MP3 final, depois do gate (tools/conferir-fim.py)
if (args.fim) {
    let r = null;
    const extra = ['--livro', livro, '--idiomas', idiomas.join(','), ...(args.partes ? ['--partes', args.partes] : [])];
    for (const py of [process.env.CV_PYTHON, 'python3', 'python'].filter(Boolean)) {
        r = spawnSync(py, [join(RAIZ, 'tools', 'conferir-fim.py'), ...extra], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
        if (!r.error && /Fim das páginas:/.test(r.stdout || '')) break;
        r = null;
    }
    if (!r) console.error('⚠️  Não deu para conferir o fim das páginas (precisa de python3 com faster-whisper; ver tools/transcrever.py).');
    else {
        console.log((r.stdout || '').split('\n').filter(l => !l.startsWith('OK')).join('\n').trim());
        if (r.status) { console.error('❌ Página com o fim cortado (ou nome próprio a conferir de ouvido): veja docs/TODO-NARRACAO.md §20.'); process.exitCode = 1; }
    }
}
