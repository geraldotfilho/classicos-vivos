// Rascunho do roteiro de uma TRADUÇÃO (quem fala cada trecho), a partir do roteiro em português e dos
// sinais de diálogo do texto traduzido (aspas “ ” no inglês, « » no francês, travessão — no espanhol).
// Uso: node tools/derivar-roteiro.mjs --idioma en --parte 2 [--livro dom-quixote]
//
// O roteiro em português (<livro>/audio/narracao/parte-N/roteiro.json) diz, frase por frase, a sequência
// de falantes. A tradução tem quase sempre as mesmas frases, na mesma ordem: então cada trecho de diálogo
// da tradução herda o falante do trecho correspondente. O que não bater (frases a mais ou a menos na
// página, narrador sem marca no francês...) é listado como pendência para escrever à mão. A saída é um
// rascunho: o `gravar-narracao.mjs --seco` confere se cada roteiro bate com o texto, e a leitura de olho
// é obrigatória (nada aqui chama a API).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const Texto = createRequire(import.meta.url)(join(RAIZ, 'assets', 'js', 'texto.js'));
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, t) => (v.startsWith('--') ? [...a, [v.slice(2), t[i + 1]]] : a), []));
const livro = args.livro || 'dom-quixote', idioma = args.idioma, parte = args.parte;
if (!idioma || !parte) { console.error('Use --idioma en|fr|es --parte N'); process.exit(1); }

const lerJson = (arq, padrao) => (existsSync(arq) ? JSON.parse(readFileSync(arq, 'utf8')) : padrao);
const ptRoteiro = lerJson(join(RAIZ, livro, 'audio', 'narracao', `parte-${parte}`, 'roteiro.json'), {});
const ptFrases = lerJson(join(RAIZ, 'docs', 'narracao', `frases-${livro}-parte-${parte}.json`)).frases;
const trFrases = lerJson(join(RAIZ, 'docs', 'narracao', `frases-${livro}-parte-${parte}-${idioma}.json`)).frases;
const pasta = join(RAIZ, livro, 'audio', `narracao-${idioma}`, `parte-${parte}`);
const arqSaida = join(pasta, 'roteiro.json');
const saida = lerJson(arqSaida, {});
const SOBRE = `Quem fala cada trecho das frases com fala de personagem (texto no formato do campo \`fala\` de docs/narracao/frases-${livro}-parte-${parte}-${idioma}.json, sem mudar palavras). Frases fora daqui são da NARRADORA. Elenco em ../elenco.json.`;

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const minusculas = (t) => t.replace(/[\p{Lu}]{2,}(?:-[\p{Lu}]{2,})*/gu, (m) => m.toLowerCase());
const limpar = (t) => Texto.prepararFala(minusculas(t)).replace(/^[\s,;—–-]+/, '').replace(/[\s—–-]+$/, '').trim();

/* Verbos de fala do francês, que ficam SEM marca no meio da fala («  Mais, dit-il, ... ») */
const VERBO_FR = /^(?:[\p{L}’'-]+-(?:t-)?(?:il|elle|on)\s|\p{L}+\s)?(?:dit|demanda|répondit|répliqua|s’écria|s’exclama|cria|ajouta|murmura|soupira|expliqua|poursuivit|reprit|lança|annonça|chuchota|déclara|gémit|gronda|bégaya|appela|proposa|rit|souffla|rappela|continua|insista|supplia|implora|protesta|observa|conclut|se plaignit|hurla|fit|pensa|répéta|avertit|prévint|rassura|promit|jura|affirma|rétorqua|lui dit|leur dit|commanda|ordonna|admit|avoua|se moqua|plaisanta|sourit|s’étonna|s’inquiéta|se rappela|ricana|haleta|balbutia)\b/u;
const VERBO_FR_INVERSE = /^(?:dit|demanda|répondit|répliqua|s’écria|reprit|ajouta|murmura|soupira|expliqua|cria|fit|lança|annonça|poursuivit|déclara|gémit|gronda|bégaya|appela)-(?:t-)?(?:il|elle|on)\b/u;

/* Quebra o texto de uma frase em trechos { d: diálogo?, t } pelas marcas do idioma; `estado` = estava dentro de uma fala? */
function trechos(texto, estado) {
    const marcas = idioma === 'en' ? /[“”]/g : idioma === 'fr' ? /[«»“”]/g : /[—–]/g;
    const pecas = [];
    let d = estado, atual = '';
    for (const ch of texto) {
        if (ch.match(marcas)) {
            if (idioma === 'es') {
                // travessão: abre a fala no começo; no meio, alterna narrador ↔ fala
                if (!atual.trim() && pecas.length === 0) { d = true; atual = ''; continue; }
                if (!d) { pecas.push({ d, t: atual }); d = true; atual = ''; continue; }
                pecas.push({ d, t: atual }); d = !d; atual = '';
            } else {
                pecas.push({ d, t: atual });
                d = /[«“]/.test(ch); atual = '';
            }
        } else atual += ch;
    }
    pecas.push({ d, t: atual });
    return { pecas, estadoFinal: d };
}

/* Francês: fala sem marca no meio ("« Mais, mon seigneur, demanda Sancho en se grattant le menton, comment... »") */
function dividirFalaFr(peca, padrao) {
    const blocos = peca.t.split(/(?<=[,!?…])\s+/);
    for (let i = 0; i < blocos.length; i++) {
        const b = blocos[i].replace(/^[«\s]+/, '');
        if (i > 0 && (VERBO_FR.test(b) || VERBO_FR_INVERSE.test(b))) {
            const antes = blocos.slice(0, i).join(' '), meio = b.replace(/,\s*$/, ''), depois = blocos.slice(i + 1).join(' ');
            const lista = [{ d: true, t: antes }, { d: false, t: meio + (depois ? '' : '') }];
            if (depois) lista.push({ d: true, t: depois });
            return lista;
        }
    }
    return null;
}

const porPagina = (frases) => frases.reduce((m, f) => ((m[f.pagina] ||= []).push(f), m), {});
const ptPag = porPagina(ptFrases), trPag = porPagina(trFrases);
const pendencias = [];
let estado = false, novos = 0, antesD = false;

for (const pag of Object.keys(trPag).map(Number)) {
    const tr = trPag[pag], pt = ptPag[pag] || [];
    estado = false;
    let paragrafo = null;
    const alinhadas = tr.length === pt.length;
    if (!alinhadas) {
        // A tradução cortou as frases de outro jeito: não dá para saber só pelas marcas quem fala o quê
        // (no espanhol, a fala que continua não tem marca nenhuma). Escrever à mão.
        if (pt.some(f => ptRoteiro[f.id]) && !tr.some(f => saida[f.id])) pendencias.push(`página ${pag}: ${tr.length} frases na tradução e ${pt.length} no português; escreva à mão (${tr.map(f => f.id).join(' ')})`);
        continue;
    }
    const pecasPag = tr.map((f, k) => {
        if (f.paragrafo !== paragrafo) estado = false;   // a fala não atravessa parágrafos
        paragrafo = f.paragrafo;
        // com as frases alinhadas, o português diz como a frase começa (fala que continua ou narração)
        if (alinhadas && ptRoteiro[pt[k].id]) estado = ptRoteiro[pt[k].id][0][0] !== 'NARRADORA';
        else if (alinhadas) estado = false;
        let { pecas, estadoFinal } = trechos(f.texto, estado);
        estado = estadoFinal;
        pecas = pecas.map(p => ({ d: p.d, t: limpar(p.t) })).filter(p => p.t && /[\p{L}\p{N}]/u.test(p.t));
        // junta pedaços vizinhos do mesmo tipo (pontuação solta virou parte do anterior)
        pecas = pecas.reduce((a, p) => (a.length && a[a.length - 1].d === p.d ? (a[a.length - 1].t += ' ' + p.t, a) : [...a, p]), []);
        return { f, pecas, padrao: alinhadas ? (ptRoteiro[pt[k].id] || [['NARRADORA']]).map(([q]) => q !== 'NARRADORA') : null };
    });
    for (const { f, pecas, padrao } of pecasPag) {
        let lista = pecas;
        if (padrao && idioma === 'fr' && lista.length < padrao.length) {
            // procura uma fala que precise ser dividida
            const i = lista.findIndex(p => p.d);
            const nova = i >= 0 && dividirFalaFr(lista[i], padrao);
            if (nova) lista = [...lista.slice(0, i), ...nova, ...lista.slice(i + 1)];
        }
        const temDialogo = lista.some(p => p.d);
        if (!temDialogo) {
            antesD = false;
            if (padrao && padrao.some(Boolean)) pendencias.push(`${f.id}: o português tem fala, mas a tradução não marca nenhuma\n     ${f.texto}`);
            continue;
        }
        if (saida[f.id]) continue;   // já escrito à mão
        const falantes = [];
        let ok = true;
        if (padrao) {
            ok = padrao.length === lista.length && padrao.every((d, n) => d === lista[n].d);
            if (ok) {
                // falantes da frase do português na mesma posição da página
                const ptf = pt[tr.indexOf(f)];
                lista.forEach((p, n) => falantes.push(p.d ? (ptRoteiro[ptf.id][n][0]) : 'NARRADORA'));
            }
        }
        const esperado = norm(f.fala), obtido = norm(lista.map(p => p.t).join(' '));
        if (!ok || esperado !== obtido) {
            pendencias.push(`${f.id}: não consegui dividir${padrao ? ` (português: ${padrao.map(d => (d ? 'FALA' : 'narr')).join(' / ')})` : ' (página com frases diferentes do português)'}\n     ${f.texto}${esperado !== obtido ? `\n     [texto difere: ${obtido}]` : ''}`);
            continue;
        }
        saida[f.id] = lista.map((p, n) => [falantes[n], p.t]);
        novos++;
    }
}

// Frases só da narradora e fora do roteiro não entram. Escreve o rascunho com a ordem natural das frases.
const ordenado = { _sobre: SOBRE };
for (const f of trFrases) if (saida[f.id]) ordenado[f.id] = saida[f.id];
mkdirSync(pasta, { recursive: true });
writeFileSync(arqSaida, '{\n' + Object.entries(ordenado).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n');
console.log(`${idioma} parte ${parte}: ${novos} frase(s) novas no roteiro; ${Object.keys(ordenado).length - 1} no total; ${pendencias.length} pendência(s)`);
pendencias.forEach(p => console.log('  ✗ ' + p));
