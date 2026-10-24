// Traduções dos livros (inglês, francês, espanhol...): o português continua sendo o original,
// em <livro>/parte-N.html; cada tradução fica em <livro>/traducoes/parte-N.<idioma>.js.
//
//   npm run exportar:traducoes   gera docs/traducao/fonte-<livro>-parte-N.json, a lista do que traduzir
//                                (texto das páginas, legendas, cartões, falas), com o `hash` de cada página
//   npm run conferir:traducoes   confere as traduções: páginas, palavras-chave, sílabas, textos que faltam
//                                e páginas desatualizadas (o `hash` do português mudou desde a tradução)
//
// Formato do arquivo de tradução: ver AGENTS.md §2.8.
import { readFileSync, writeFileSync, mkdirSync, globSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const Texto = require('../assets/js/texto.js');
const hash = (t) => createHash('sha1').update(t).digest('hex').slice(0, 10);
const PALAVRA = /\{\{([^|}]+)\|([^|}]+)\|([^}]+)\}\}/g;

function carregarLivro(arquivo) {
    const html = readFileSync(arquivo, 'utf8');
    const bloco = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(c => c.includes('window.LIVRO'));
    const contexto = { window: {} };
    vm.runInNewContext(bloco, contexto);
    return { livro: contexto.window.LIVRO, fonte: bloco };
}

/* Hash do que o tradutor traduziu numa página: muda quando o português muda */
function hashDaPagina(pagina) {
    return hash(JSON.stringify([pagina.capitulo || '', pagina.titulo || '', pagina.texto || '', pagina.etiqueta || '']));
}

/* Textos soltos da página (legendas, cartões, falas...), traduzidos por dicionário: português → idioma */
function textosDoLivro(livro, fonte) {
    const textos = new Map();
    const add = (t, onde) => {
        if (typeof t !== 'string' || !t.trim()) return;
        if (!textos.has(t)) textos.set(t, new Set());
        textos.get(t).add(onde);
    };
    livro.paginas.forEach((pagina, i) => {
        const cena = pagina.cena || {};
        const c = cena.cartoes || {};
        const onde = (o) => `página ${i}: ${o}`;
        add(cena.alt, onde('descrição da ilustração (leitor de tela)'));
        add(cena.legendaReal, onde('selo da Lente da Realidade'));
        add(cena.legendaImag, onde('selo da Lente da Imaginação'));
        (c.legendas || []).forEach(l => add(l, onde('selo da cena, a cada etapa')));
        add(c.legendaTodas, onde('selo da cena, ao usar todos os cartões'));
        Object.values(c.variantes || {}).forEach(v => add(v.legenda, onde('selo da cena, ao tocar num cartão')));
        (c.falas || []).forEach(f => add(f, onde('fala da voz a cada toque no cartão')));
        add(c.faixaVazia, onde('faixa onde as palavras são escritas'));
        if (c.tipo !== 'ordem') (c.itens || []).forEach(item => add(item.palavra, onde('cartão (MAIÚSCULAS, curto)')));
        (cena.hotspots || []).forEach(h => add(h.titulo || h.palavra, onde('dica ao passar o dedo na cena')));
    });
    // Legendas escritas dentro de funções (realCena): `legenda: '...'`
    for (const m of fonte.matchAll(/legenda:\s*(?:[^'"]*?\?\s*)?(['"])((?:(?!\1).)+)\1/g)) add(m[2], 'selo da cena (calculado pelo estado)');
    for (const m of fonte.matchAll(/\?\s*(['"])(👓[^'"]+|✨[^'"]+)\1/g)) add(m[2], 'selo da cena (calculado pelo estado)');
    for (const m of fonte.matchAll(/:\s*(['"])(👓[^'"]+|✨[^'"]+)\1/g)) add(m[2], 'selo da cena');
    add(livro.fim?.mensagem, 'mensagem do fim da parte');
    add(livro.fim?.proximaRotulo, 'botão para a próxima parte');
    return [...textos].map(([texto, onde]) => ({ texto, onde: [...onde] }));
}

function exportar() {
    mkdirSync('docs/traducao', { recursive: true });
    for (const arquivo of globSync('*/parte-*.html').sort()) {
        const { livro, fonte } = carregarLivro(arquivo);
        const pasta = arquivo.split(/[\\/]/)[0];
        const paginas = livro.paginas.map((pagina, i) => {
            const c = (pagina.cena || {}).cartoes || {};
            const p = { indice: i, hash: hashDaPagina(pagina) };
            if (pagina.capa) p.capa = true;
            if (pagina.capitulo) p.capitulo = pagina.capitulo;
            p.titulo = pagina.titulo;
            if (pagina.etiqueta) p.etiqueta = pagina.etiqueta;
            p.texto = pagina.texto.trim().split(/\n\s*\n/).map(par => par.trim().replace(/\s*\n\s*/g, ' ')).join('\n\n');
            if (c.tipo === 'ordem') p.cartoes = { tipo: 'ordem', ordem: c.ordem, itens: c.itens.map(({ id, palavra, emoji }) => ({ id, palavra, emoji })) };
            return p;
        });
        const destino = `docs/traducao/fonte-${pasta}-parte-${livro.parte}.json`;
        writeFileSync(destino, JSON.stringify({
            obra: livro.obra,
            autor: livro.autor,
            parte: livro.parte,
            traducao: `${pasta}/traducoes/parte-${livro.parte}.<idioma>.js`,
            paginas,
            textos: textosDoLivro(livro, fonte)
        }, null, 2) + '\n');
        console.log(`${destino}: ${paginas.length} páginas`);
    }
}

function normalizarPalavra(t) {
    return t.normalize('NFC').replace(/[\s•·\-‑]/g, '').toUpperCase();
}

function conferir() {
    let erros = 0;
    let avisos = 0;
    const erro = (m) => { erros++; console.log(`  ❌ ${m}`); };
    const aviso = (m) => { avisos++; console.log(`  ⚠️  ${m}`); };
    for (const arquivo of globSync('*/parte-*.html').sort()) {
        const { livro, fonte } = carregarLivro(arquivo);
        const pasta = arquivo.split(/[\\/]/)[0];
        const textos = textosDoLivro(livro, fonte).map(t => t.texto);
        const traducoes = globSync(`${pasta}/traducoes/parte-${livro.parte}.*.js`).sort();
        for (const arqTraducao of traducoes) {
            const idioma = arqTraducao.match(/\.([a-z]{2}(?:-[A-Z]{2})?)\.js$/)[1];
            console.log(`${arqTraducao}`);
            const errosAntes = erros;
            const contexto = { window: {} };
            try {
                vm.runInNewContext(readFileSync(arqTraducao, 'utf8'), contexto);
            } catch (e) {
                erro(`não abre: ${e.message}`);
                continue;
            }
            const t = (contexto.window.TRADUCOES || {})[idioma];
            if (!t) { erro(`não define window.TRADUCOES['${idioma}']`); continue; }
            if (!t.obra) erro('falta `obra`');
            if ((t.paginas || []).length !== livro.paginas.length) erro(`${(t.paginas || []).length} páginas, o original tem ${livro.paginas.length}`);
            livro.paginas.forEach((original, i) => {
                const p = (t.paginas || [])[i];
                if (!p) return;
                const onde = `página ${i}`;
                if (!p.titulo) erro(`${onde}: falta \`titulo\``);
                if (original.capitulo && !p.capitulo) erro(`${onde}: falta \`capitulo\``);
                if (!p.texto) { erro(`${onde}: falta \`texto\``); return; }
                if (p.hash !== hashDaPagina(original)) aviso(`${onde}: desatualizada (o português mudou depois da tradução; hash ${p.hash} ≠ ${hashDaPagina(original)})`);
                const abertas = (p.texto.match(/\{\{/g) || []).length;
                const palavras = [...p.texto.matchAll(PALAVRA)];
                if (abertas !== palavras.length) erro(`${onde}: palavra-chave mal formada (use {{PALAVRA|SÍ • LA • BAS|emoji}})`);
                const originais = (original.texto.match(PALAVRA) || []).length;
                if (palavras.length !== originais) aviso(`${onde}: ${palavras.length} palavras-chave, o original tem ${originais}`);
                palavras.forEach(([, palavra, silabas]) => {
                    if (palavra !== palavra.toLocaleUpperCase(idioma)) erro(`${onde}: palavra-chave fora de MAIÚSCULAS: ${palavra}`);
                    if (normalizarPalavra(palavra) !== normalizarPalavra(silabas)) erro(`${onde}: as sílabas "${silabas}" não formam "${palavra}"`);
                });
                try { Texto.paginaParaHtml(p.texto, i); } catch (e) { erro(`${onde}: ${e.message}`); }
                const c = (original.cena || {}).cartoes || {};
                if (c.tipo === 'ordem') {
                    const tc = p.cartoes || {};
                    const ids = new Set((tc.itens || []).map(item => item.id));
                    if (!tc.itens || !tc.ordem) erro(`${onde}: cartões em ordem precisam de \`cartoes: { ordem, itens }\` no idioma`);
                    else if (tc.ordem.length !== ids.size || !tc.ordem.every(id => ids.has(id))) erro(`${onde}: \`cartoes.ordem\` e \`cartoes.itens\` não batem (ids únicos, um por palavra)`);
                }
            });
            const dic = t.textos || {};
            const faltam = textos.filter(x => !(x in dic));
            if (faltam.length) erro(`faltam ${faltam.length} textos soltos: ${faltam.slice(0, 5).map(x => JSON.stringify(x)).join(', ')}${faltam.length > 5 ? '…' : ''}`);
            const sobram = Object.keys(dic).filter(x => !textos.includes(x));
            if (sobram.length) aviso(`${sobram.length} textos que o original não usa mais: ${sobram.slice(0, 3).map(x => JSON.stringify(x)).join(', ')}${sobram.length > 3 ? '…' : ''}`);
            if (erros === errosAntes) console.log('  ✅ ok');
        }
    }
    console.log(`\n${erros} erro(s), ${avisos} aviso(s)`);
    if (erros) process.exit(1);
}

if (process.argv[2] === 'exportar') exportar();
else conferir();
