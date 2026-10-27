// Situação da narração gravada: para cada idioma e parte, quantas páginas e palavras-chave já estão gravadas
// (com o mesmo hash do texto atual) e o que falta. Não chama nenhuma API.
// Uso: node tools/conferir-narracao.mjs [--livro dom-quixote] [--partes 1,2,3,4] [--idiomas pt,en,fr,es]
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, t) => (v.startsWith('--') ? [...a, [v.slice(2), t[i + 1]]] : a), []));
const livro = args.livro || 'dom-quixote';
const partes = (args.partes || '1,2,3,4').split(',');
const idiomas = (args.idiomas || 'pt,en,fr,es').split(',');
const lerJson = (arq, padrao) => (existsSync(arq) ? JSON.parse(readFileSync(arq, 'utf8')) : padrao);

for (const idioma of idiomas) {
    const sufixo = idioma === 'pt' ? '' : `-${idioma}`;
    for (const parte of partes) {
        const fonte = lerJson(join(RAIZ, 'docs', 'narracao', `frases-${livro}-parte-${parte}${sufixo}.json`), null);
        if (!fonte) continue;
        const pasta = join(RAIZ, livro, 'audio', `narracao${sufixo}`, `parte-${parte}`);
        const roteiro = lerJson(join(pasta, 'roteiro.json'), {});
        const registro = lerJson(join(pasta, 'paginas.json'), {});
        const elenco = registro.elenco || {};
        const paginas = [...new Set(fonte.frases.map(f => f.pagina))];
        // a mesma conta do gravar-narracao.mjs: hash das frases + roteiro + elenco que fala na página
        const pendentesPag = paginas.filter(n => {
            const frases = fonte.frases.filter(f => f.pagina === n);
            const falantes = [...new Set(frases.flatMap(f => (roteiro[f.id] || [['NARRADORA']]).map(t => t[0])))];
            const hash = createHash('sha1').update(frases.map(f => f.hash).join() + JSON.stringify(frases.map(f => roteiro[f.id] || null)) + JSON.stringify(falantes.map(q => [q, elenco[q]]))).digest('hex').slice(0, 10);
            return !(registro[`p${n}`]?.hash === hash && existsSync(join(pasta, `p${n}.mp3`)));
        });
        const indice = lerJson(join(RAIZ, livro, 'audio', `palavras${sufixo}`, 'indice.json'), { frases: {} }).frases;
        const faltam = (fonte.palavras || []).filter(w => !(indice[w.slug] === w.hash && existsSync(join(RAIZ, livro, 'audio', `palavras${sufixo}`, `${w.slug}.mp3`)))).map(w => w.slug);
        console.log(`${idioma} parte ${parte}: páginas ${paginas.length - pendentesPag.length}/${paginas.length}${pendentesPag.length ? ` (faltam p${pendentesPag.join(', p')})` : ''}; palavras ${(fonte.palavras || []).length - faltam.length}/${(fonte.palavras || []).length}${faltam.length ? ` (faltam ${faltam.join(', ')})` : ''}`);
    }
}
