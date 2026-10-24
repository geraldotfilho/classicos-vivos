// Exporta todas as frases e palavras-chave dos livros para a narração gravada (Gemini).
// Gera docs/narracao/frases-<livro>-parte-N.json com, para cada frase:
//   id    — "p3-s4" (página 3, frase 4): o nome do arquivo de áudio (<id>.mp3); paragrafo — índice na página
//   texto — como aparece no livro;  fala — o texto já preparado para ser falado
//   hash  — muda quando o texto da frase muda: indica que a gravação precisa ser refeita
// A segmentação é a MESMA do livro (assets/js/texto.js). Rode `npm run exportar:frases`
// sempre que o texto de um livro mudar.
import { readFileSync, writeFileSync, mkdirSync, globSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const Texto = require('../assets/js/texto.js');
const hash = (t) => createHash('sha1').update(t).digest('hex').slice(0, 10);

mkdirSync('docs/narracao', { recursive: true });
for (const arquivo of globSync('*/parte-*.html').sort()) {
    const html = readFileSync(arquivo, 'utf8');
    const bloco = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(c => c.includes('window.LIVRO'));
    const contexto = { window: {} };
    vm.runInNewContext(bloco, contexto);
    const livro = contexto.window.LIVRO;
    const pasta = arquivo.split('/')[0];

    const frases = [];
    const palavras = new Map();
    livro.paginas.forEach((pagina, i) => {
        const titulo = Texto.tituloDaPagina(pagina, i, livro.obra);   // "frase 0": lida antes do texto
        if (titulo) frases.push({ id: titulo.id, pagina: i, paragrafo: -1, titulo: true, texto: titulo.texto, fala: titulo.fala, hash: hash(titulo.fala) });
        Texto.frasesDaPagina(pagina.texto, i).forEach((paragrafo, k) => paragrafo.forEach(({ id, frase }) => {
            const fala = Texto.falaDaFrase(frase);
            frases.push({ id, pagina: i, paragrafo: k, texto: Texto.textoDaFrase(frase), fala, hash: hash(fala) });
            frase.partes.filter(p => p.tipo === 'palavra').forEach(p => {
                if (!palavras.has(p.slug)) {
                    const fala = Texto.falaSilabica(p.palavra, p.silabas);
                    palavras.set(p.slug, { slug: p.slug, palavra: p.palavra, silabas: p.silabas, fala, hash: hash(fala) });
                }
            });
        }));
    });

    const destino = `docs/narracao/frases-${pasta}-parte-${livro.parte}.json`;
    writeFileSync(destino, JSON.stringify({
        obra: livro.obra,
        parte: livro.parte,
        audio: `${pasta}/audio/<voz>/parte-${livro.parte}/<id>.mp3`,
        audioPalavras: `${pasta}/audio/palavras/<slug>.mp3`,
        frases,
        palavras: [...palavras.values()]
    }, null, 2) + '\n');
    console.log(`${destino}: ${frases.length} frases, ${palavras.size} palavras-chave`);
}
