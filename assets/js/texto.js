/* =========================================================================
   Clássicos Vivos — texto dos livros: frases, HTML e texto falado.

   Segmentação CANÔNICA usada em dois lugares, para que o ID de cada frase
   (ex.: "p3-s4" = página 3, frase 4) seja idêntico em ambos:
   - no navegador, pelo motor (assets/js/livro.js), para destacar e narrar;
   - no Node, por tools/exportar-frases.mjs, que gera a lista de frases que o
     Gemini grava (docs/narracao/frases-parte-N.json).
   Se mudar a regra de corte das frases, rode `npm run exportar:frases` e
   regrave as frases cujo `hash` mudou.
   ========================================================================= */
(function (raiz) {
    // Palavra-chave no texto: {{PALAVRA|SÍ • LA • BAS|emoji}}
    const PALAVRA = /\{\{([^|}]+)\|([^|}]+)\|([^}]+)\}\}/g;
    // Fim de frase: pontuação + espaço, exceto antes de minúscula
    // ("bravura! — pensou o fidalgo" continua sendo uma frase só).
    // O "»" pode vir depois de um espaço, como no francês: « Bonjour ! »
    const FIM_DE_FRASE = /([.!?…]+(?:[\s\u00A0\u202F]?»|[”"])?)(\s+)(?!(?:[—–]\s*)?[a-zà-ÿ]|»)/g;

    function escapeHtml(texto) {
        return String(texto ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function slug(palavra) {
        return palavra.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    /* Texto da página → parágrafos → frases → partes (texto ou palavra-chave) */
    function segmentarTexto(texto) {
        return texto.trim().split(/\n\s*\n/).map(paragrafo => {
            const par = paragrafo.trim().replace(/\s*\n\s*/g, ' ');
            const frases = [];
            let atual = null;
            const abrir = () => {
                if (!atual) {
                    atual = { partes: [] };
                    frases.push(atual);
                }
                return atual;
            };
            const addTexto = (t) => {
                if (!atual) t = t.replace(/^\s+/, '');
                if (t) abrir().partes.push({ tipo: 'texto', texto: t });
            };

            const pedacos = [];
            let ultimo = 0;
            let m;
            PALAVRA.lastIndex = 0;
            while ((m = PALAVRA.exec(par)) !== null) {
                pedacos.push({ tipo: 'texto', texto: par.slice(ultimo, m.index) });
                pedacos.push({ tipo: 'palavra', palavra: m[1], silabas: m[2], emoji: m[3], slug: slug(m[1]) });
                ultimo = m.index + m[0].length;
            }
            pedacos.push({ tipo: 'texto', texto: par.slice(ultimo) });

            pedacos.forEach(p => {
                if (p.tipo === 'palavra') {
                    abrir().partes.push(p);
                    return;
                }
                let inicio = 0;
                let b;
                FIM_DE_FRASE.lastIndex = 0;
                while ((b = FIM_DE_FRASE.exec(p.texto)) !== null) {
                    addTexto(p.texto.slice(inicio, b.index + b[1].length));
                    atual = null;
                    inicio = b.index + b[0].length;
                }
                addTexto(p.texto.slice(inicio));
            });
            return frases;
        });
    }

    /* Texto que a voz deve falar: natural, sem soletrar siglas nem ler travessões */
    function prepararFala(texto) {
        return texto
            .replace(/[“”"«»]/g, '')
            .replace(/^\s*[—–]\s*/, '')                       // travessão que abre a fala
            .replace(/\s*[—–]\s*/g, ', ')                     // travessão no meio vira pausa curta
            .replace(/\b([a-zà-ÿ]+)-\1\b/gi, (_, s) => `${s.toLowerCase()}, ${s.toLowerCase()}`)   // onomatopeia: "TAC-TAC" → "tac, tac"
            .replace(/([.!?…:;])\s*,/g, '$1')                 // "bravura!, pensou" → "bravura! pensou"; "cabeça:, Valha" → "cabeça: Valha"
            .replace(/,\s*,/g, ',')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function falaDaFrase(frase) {
        return prepararFala(frase.partes.map(p => p.tipo === 'palavra' ? p.palavra.toLowerCase() : p.texto).join(''));
    }

    function textoDaFrase(frase) {
        return frase.partes.map(p => p.tipo === 'palavra' ? p.palavra : p.texto).join('').replace(/\s+/g, ' ').trim();
    }

    /* Pronúncia pausada de uma palavra-chave: sílabas devagar e depois a palavra inteira */
    function falaSilabica(palavra, silabas) {
        const partes = silabas.split('•').map(s => s.trim().toLowerCase());
        return `${partes.join('... ')}... ${palavra.toLowerCase()}!`;
    }

    /* Lista de frases de uma página com IDs estáveis (p{página}-s{n}) */
    function frasesDaPagina(texto, pagina) {
        let n = 0;
        return segmentarTexto(texto).map(frases => frases.map(frase => ({
            id: `p${pagina}-s${++n}`,
            frase
        })));
    }

    /* HTML do texto da página: cada frase num <span class="sentence" data-frase="pX-sY"> */
    function paginaParaHtml(texto, pagina) {
        return frasesDaPagina(texto, pagina).map(frases => frases.map(({ id, frase }) => {
            const html = frase.partes.map(p => p.tipo === 'palavra'
                ? `<span class="literacy-word" data-palavra="${escapeHtml(p.palavra)}" data-silabas="${escapeHtml(p.silabas)}" data-emoji="${escapeHtml(p.emoji)}" data-slug="${escapeHtml(p.slug)}">${escapeHtml(p.palavra)}</span>`
                : p.texto).join('');
            return `<span class="sentence" data-frase="${id}">${html}</span>`;
        }).join(' ')).join('\n<br><br>\n');
    }

    /* Título lido no começo da página: a "frase 0" (p{página}-s0).
       Capa: obra + título da parte. Demais: "Capítulo 1. O Fidalgo Leitor." + título. Sem emojis. */
    function tituloDaPagina(pagina, indice, obra) {
        const limpar = (t) => String(t || '').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s*•\s*/g, '. ').replace(/\s+/g, ' ').trim();
        const ponto = (t) => (t && !/[.!?…:]$/.test(t) ? `${t}.` : t);
        const partes = pagina.capa ? [obra, pagina.titulo] : [pagina.capitulo, pagina.titulo];
        const texto = partes.map(limpar).filter(Boolean).map((t, k, todas) => (k < todas.length - 1 ? ponto(t) : t)).join(' ');
        return texto ? { id: `p${indice}-s0`, texto, fala: prepararFala(texto) } : null;
    }

    /* Mapa id → texto falado (o motor usa para a voz do aparelho) */
    function falasDaPagina(texto, pagina, titulo) {
        const falas = {};
        if (titulo) falas[titulo.id] = titulo.fala;
        frasesDaPagina(texto, pagina).flat().forEach(({ id, frase }) => { falas[id] = falaDaFrase(frase); });
        return falas;
    }

    const api = { segmentarTexto, frasesDaPagina, paginaParaHtml, falasDaPagina, tituloDaPagina, falaDaFrase, textoDaFrase, falaSilabica, prepararFala, slug, escapeHtml };
    if (typeof module === 'object' && module.exports) module.exports = api;
    else raiz.Texto = api;
})(typeof window !== 'undefined' ? window : globalThis);
