// Exporta todas as frases e palavras-chave dos livros para a narração gravada (Gemini).
// Gera docs/narracao/frases-<livro>-parte-N.json (e frases-<livro>-parte-N-<idioma>.json para cada tradução,
// AGENTS.md §2.8) com, para cada frase:
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

/* Traduções da parte (<livro>/traducoes/parte-N.<idioma>.js): o livro no idioma, como o motor monta */
function traducoesDe(pasta, livro) {
    return globSync(`${pasta}/traducoes/parte-${livro.parte}.*.js`).sort().map(arq => {
        const idioma = arq.match(/\.([a-z]{2}(?:-[A-Z]{2})?)\.js$/)[1];
        const contexto = { window: {} };
        vm.runInNewContext(readFileSync(arq, 'utf8'), contexto);
        const t = contexto.window.TRADUCOES[idioma];
        return {
            idioma,
            t: (texto) => (typeof texto === 'string' && (t.textos || {})[texto]) || texto,
            cartoes: (t.paginas || []).map(p => (p && p.cartoes) || null),
            livro: {
                ...livro,
                obra: t.obra || livro.obra,
                paginas: livro.paginas.map((pagina, i) => {
                    const p = (t.paginas || [])[i] || {};
                    return { ...pagina, capitulo: p.capitulo || pagina.capitulo, titulo: p.titulo || pagina.titulo, texto: p.texto || pagina.texto };
                })
            }
        };
    });
}

// Código das minúsculas dos cartões (o mesmo de IDIOMAS[idioma].lang no motor)
const LANG = { en: 'en-GB', fr: 'fr-FR', es: 'es-ES' };

/* Falas das atividades (AGENTS.md §2.6): comandos 🎮, cartões falados, pegadinhas e falas da contagem, com o texto
   exatamente como o motor passa para falar() (Texto.falasDaAtividade, a mesma lista que o motor pré-carrega).
   `id`: nome do arquivo (falas<-idioma>/<id>.mp3), estável enquanto o texto não muda; `fala`: o que a voz grava
   (letra isolada: o nome da letra); `hash`: muda quando a fala muda (pede regravação). */
function falasDe(livro, idioma, traducao) {
    const t = traducao ? traducao.t : (x) => x;
    const lang = idioma ? LANG[idioma] || idioma : 'pt-BR';
    const falas = [];
    livro.paginas.forEach((pagina, i) => {
        const original = (pagina.cena && pagina.cena.cartoes) || null;
        const troca = traducao && traducao.cartoes[i];
        const cartoes = original && troca ? { ...original, ...troca } : original;
        Texto.falasDaAtividade(pagina, cartoes, t, lang).forEach(f => {
            const ja = falas.find(x => x.chave === f.chave);
            if (ja) { ja.paginas.push(i); return; }
            const fala = f.tipo === 'letra' ? Texto.nomeDaLetra(f.texto, idioma || 'pt')
                : f.tipo === 'cartao' || f.tipo === 'silaba' ? f.texto
                : Texto.prepararFala(f.texto);
            const id = `${Texto.slug(f.tipo === 'letra' ? `letra-${f.texto}` : f.texto).slice(0, 32).replace(/-$/, '')}-${hash(f.chave).slice(0, 6)}`;
            falas.push({ id, tipo: f.tipo, chave: f.chave, texto: f.texto, fala, hash: hash(`${f.tipo}|${fala}`), paginas: [i] });
        });
    });
    return falas;
}

function exportar(livro, pasta, idioma, traducao) {
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

    // Português: frases-<livro>-parte-N.json, na pasta `narracao`. Outros idiomas: ...-parte-N-<idioma>.json, `narracao-<idioma>`
    // A versão nova de uma parte publicada tem a sua pasta (`pastaAudio`, ex.: parte-4-rascunho): `--parte 4-rascunho` na gravação
    const falas = falasDe(livro, idioma, traducao);
    const sufixo = idioma ? `-${idioma}` : '';
    const pastaAudio = livro.pastaAudio || `parte-${livro.parte}`;
    const destino = `docs/narracao/frases-${pasta}-${pastaAudio}${sufixo}.json`;
    writeFileSync(destino, JSON.stringify({
        obra: livro.obra,
        parte: livro.parte,
        ...(idioma ? { idioma } : {}),
        audio: `${pasta}/audio/<voz>${sufixo}/${pastaAudio}/<id>.mp3`,
        audioPalavras: `${pasta}/audio/palavras${sufixo}/<slug>.mp3`,
        frases,
        palavras: [...palavras.values()],
        audioFalas: `${pasta}/audio/falas${sufixo}/<id>.mp3`,
        falas
    }, null, 2) + '\n');
    console.log(`${destino}: ${frases.length} frases, ${palavras.size} palavras-chave, ${falas.length} falas de atividade`);
}

mkdirSync('docs/narracao', { recursive: true });
for (const arquivo of globSync('*/parte-*.html').sort()) {
    const html = readFileSync(arquivo, 'utf8');
    const bloco = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(c => c.includes('window.LIVRO'));
    const contexto = { window: {} };
    vm.runInNewContext(bloco, contexto);
    const livro = contexto.window.LIVRO;
    const pasta = arquivo.split(/[\\/]/)[0];
    exportar(livro, pasta, null);
    // Rascunho não carrega traduções (AGENTS §2.5): as de parte-N.<idioma>.js são da versão publicada
    if (!livro.rascunho) traducoesDe(pasta, livro).forEach(t => exportar(t.livro, pasta, t.idioma, t));
}
