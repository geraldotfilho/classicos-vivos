// Confere os desafios (segunda camada, docs/DESAFIOS.md) de todos os livros: <livro>/desafios/parte-*.js.
// Erros (o motor não funcionaria ou a etapa ficaria impossível) fazem o script sair com código 1;
// avisos (limites de tamanho, recomendações do crivo) só aparecem na tela.
// Rode com: npm run conferir:desafios
import { readFileSync, existsSync, globSync } from 'node:fs';
import vm from 'node:vm';

const TIPOS = ['quiz', 'ordenar', 'classificar', 'lacunas', 'ligar', 'enigma', 'erro'];
let erros = 0;
let avisos = 0;

function livroDoHtml(arquivo) {
    const html = readFileSync(arquivo, 'utf8');
    const bloco = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(c => c.includes('window.LIVRO'));
    if (!bloco) return null;
    const contexto = { window: {} };
    vm.runInNewContext(bloco, contexto);
    return contexto.window.LIVRO;
}

function carregarDesafios(arquivo) {
    const contexto = { window: {} };
    vm.runInNewContext(readFileSync(arquivo, 'utf8'), contexto, { filename: arquivo });
    return contexto.window.DESAFIOS;
}

const tam = (s) => Array.from(String(s ?? '')).length;
const texto = (v) => typeof v === 'string' && v.trim().length > 0;
const maiusc = (s) => String(s ?? '').toLocaleUpperCase('pt-BR');

for (const arquivo of globSync('*/desafios/parte-*.js').sort()) {
    // parte-N.<idioma>.js: tradução futura, mesmo formato (o HTML é o da parte-N)
    const nome = arquivo.split(/[\\/]/).pop().replace(/\.js$/, '');
    const base = nome.replace(/\.[a-z]{2}(-[A-Z]{2})?$/, '');
    const pasta = arquivo.split(/[\\/]/)[0];
    const html = `${pasta}/${base}.html`;
    const problemas = [];
    const erro = (onde, msg) => { problemas.push(`  ❌ ${onde}: ${msg}`); erros++; };
    const aviso = (onde, msg) => { problemas.push(`  ⚠️  ${onde}: ${msg}`); avisos++; };

    let d;
    try { d = carregarDesafios(arquivo); } catch (e) { erro('arquivo', `não roda (${e.message})`); }
    let livro = null;
    if (!existsSync(html)) erro('arquivo', `não existe ${html} para este arquivo de desafios`);
    else {
        try { livro = livroDoHtml(html); } catch (e) { erro('arquivo', `não consegui ler o window.LIVRO de ${html} (${e.message})`); }
    }

    if (d !== undefined && (!d || typeof d !== 'object' || !d.paginas || typeof d.paginas !== 'object')) {
        erro('arquivo', 'precisa definir window.DESAFIOS = { livro, parte, paginas: { ... } }');
        d = null;
    }
    if (d) {
        if (!texto(d.livro)) aviso('arquivo', 'falta `livro` (ex.: "dom-quixote")');
        else if (d.livro !== pasta) aviso('arquivo', `livro: '${d.livro}' é diferente da pasta '${pasta}'`);
        if (livro && d.parte != null && Number(d.parte) !== Number(livro.parte)) aviso('arquivo', `parte: ${d.parte}, mas ${html} é a parte ${livro.parte}`);
        const tiposUsados = new Set();
        const chaves = Object.keys(d.paginas);
        if (!chaves.length) aviso('arquivo', 'nenhuma página com desafio');
        let duplaAnterior = null;

        for (const chave of chaves.sort((a, b) => a - b)) {
            const onde = `página ${chave}`;
            const i = Number(chave);
            const p = d.paginas[chave];
            if (!Number.isInteger(i) || i < 0) { erro(onde, 'a chave precisa ser o índice da página (0, 1, 2...)'); continue; }
            if (livro) {
                if (i >= livro.paginas.length) erro(onde, `${html} só tem as páginas 0 a ${livro.paginas.length - 1}`);
                else if (livro.paginas[i].capa) erro(onde, 'a capa não tem desafio');
            }
            if (!p || typeof p !== 'object') { erro(onde, 'precisa ser um objeto'); continue; }
            if (!texto(p.titulo)) erro(onde, 'falta `titulo`');
            else if (tam(p.titulo) > 35) aviso(onde, `título com ${tam(p.titulo)} caracteres (até ~35)`);
            if (!texto(p.selo)) erro(onde, 'falta `selo` (um emoji)');
            if (!texto(p.convite)) erro(onde, 'falta `convite`');
            if (!texto(p.sabia)) erro(onde, 'falta `sabia` (o "Você sabia?")');
            if (!Array.isArray(p.etapas) || !p.etapas.length) { erro(onde, 'precisa de 1 a 3 etapas em `etapas`'); continue; }
            if (p.etapas.length > 3) erro(onde, `${p.etapas.length} etapas (no máximo 3)`);
            if (p.etapas.length < 2) aviso(onde, 'só 1 etapa (o recomendado é 2 ou 3; vale na recapitulação)');
            const tiposDaPagina = p.etapas.map(e => e && e.tipo);
            if (new Set(tiposDaPagina).size < tiposDaPagina.length) aviso(onde, 'etapas do mesmo tipo na mesma página');
            const dupla = [...tiposDaPagina].sort().join('+');
            if (duplaAnterior && dupla === duplaAnterior && p.etapas.length > 1) aviso(onde, `mesma combinação de tipos da página anterior (${dupla})`);
            duplaAnterior = dupla;

            p.etapas.forEach((e, k) => {
                const w = `${onde}, etapa ${k + 1}${e && e.tipo ? ` (${e.tipo})` : ''}`;
                if (!e || typeof e !== 'object') { erro(w, 'precisa ser um objeto'); return; }
                if (!TIPOS.includes(e.tipo)) { erro(w, `tipo inválido '${e.tipo}' (${TIPOS.join(', ')})`); return; }
                tiposUsados.add(e.tipo);
                if (!texto(e.pergunta)) erro(w, 'falta `pergunta`');
                else if (tam(e.pergunta) > 160) aviso(w, `pergunta com ${tam(e.pergunta)} caracteres (até ~160)`);
                if (!texto(e.dica)) erro(w, 'falta `dica`');
                if (e.porque != null && !texto(e.porque)) aviso(w, '`porque` vazio');

                if (e.tipo === 'quiz') {
                    if (!Array.isArray(e.opcoes) || e.opcoes.length < 2 || !e.opcoes.every(texto)) erro(w, '`opcoes` precisa ser uma lista de textos');
                    else {
                        if (e.opcoes.length < 3 || e.opcoes.length > 4) aviso(w, `${e.opcoes.length} opções (o recomendado é 3 ou 4)`);
                        if (!Number.isInteger(e.certa) || e.certa < 0 || e.certa >= e.opcoes.length) erro(w, `certa: ${e.certa} fora de 0..${e.opcoes.length - 1}`);
                        if (new Set(e.opcoes.map(o => o.trim())).size < e.opcoes.length) erro(w, 'opções repetidas');
                        e.opcoes.forEach(o => { if (tam(o) > 70) aviso(w, `opção com ${tam(o)} caracteres (até ~70): "${o.slice(0, 40)}..."`); });
                    }
                } else if (e.tipo === 'ordenar') {
                    if (!Array.isArray(e.itens) || !e.itens.every(texto)) erro(w, '`itens` precisa ser uma lista de textos');
                    else {
                        if (e.itens.length < 3 || e.itens.length > 5) aviso(w, `${e.itens.length} itens (de 3 a 5)`);
                        if (e.itens.length < 2) erro(w, 'precisa de pelo menos 2 itens');
                        if (new Set(e.itens.map(o => o.trim())).size < e.itens.length) erro(w, 'itens repetidos: a ordem ficaria ambígua');
                        e.itens.forEach(o => { if (tam(o) > 80) aviso(w, `item com ${tam(o)} caracteres (até ~80)`); });
                    }
                } else if (e.tipo === 'classificar') {
                    const g = e.grupos;
                    if (!Array.isArray(g) || g.length < 2 || g.length > 3 || !g.every(texto)) erro(w, '`grupos` precisa ter 2 ou 3 nomes');
                    if (!Array.isArray(e.itens) || !e.itens.length) erro(w, 'falta `itens`');
                    else {
                        if (e.itens.length < 4 || e.itens.length > 6) aviso(w, `${e.itens.length} itens (de 4 a 6)`);
                        e.itens.forEach((it, n) => {
                            if (!it || !texto(it.texto)) erro(w, `item ${n + 1} sem \`texto\``);
                            else if (tam(it.texto) > 70) aviso(w, `item com ${tam(it.texto)} caracteres (até ~70)`);
                            if (!it || !Number.isInteger(it.grupo) || !Array.isArray(g) || it.grupo < 0 || it.grupo >= g.length) erro(w, `item ${n + 1}: grupo ${it && it.grupo} inválido`);
                        });
                        if (Array.isArray(g)) g.forEach((nome, n) => { if (!e.itens.some(it => it && it.grupo === n)) aviso(w, `nenhum item no grupo "${nome}"`); });
                    }
                } else if (e.tipo === 'lacunas') {
                    if (!texto(e.texto)) erro(w, 'falta `texto`');
                    else {
                        const n = e.texto.split('___').length - 1;
                        if (!n) erro(w, 'o texto não tem nenhuma lacuna (___)');
                        if (!Array.isArray(e.respostas) || !e.respostas.every(texto)) erro(w, '`respostas` precisa ser uma lista de palavras');
                        else if (e.respostas.length !== n) erro(w, `${n} lacuna(s) e ${e.respostas.length} resposta(s)`);
                        if (e.distratores != null && (!Array.isArray(e.distratores) || !e.distratores.every(texto))) erro(w, '`distratores` precisa ser uma lista de palavras');
                        if (Array.isArray(e.respostas) && Array.isArray(e.distratores)) {
                            const resp = new Set(e.respostas.map(r => maiusc(r.trim())));
                            e.distratores.forEach(x => { if (resp.has(maiusc(String(x).trim()))) aviso(w, `o distrator "${x}" também é resposta`); });
                        }
                        if (tam(e.texto) > 260) aviso(w, `texto com ${tam(e.texto)} caracteres (até ~260)`);
                    }
                } else if (e.tipo === 'ligar') {
                    if (!Array.isArray(e.pares) || !e.pares.every(par => Array.isArray(par) && par.length === 2 && par.every(texto))) erro(w, '`pares` precisa ser uma lista de [esquerda, direita]');
                    else {
                        if (e.pares.length < 3 || e.pares.length > 5) aviso(w, `${e.pares.length} pares (de 3 a 5)`);
                        if (new Set(e.pares.map(p => p[0].trim())).size < e.pares.length || new Set(e.pares.map(p => p[1].trim())).size < e.pares.length) erro(w, 'lados repetidos: um par ficaria ambíguo');
                        e.pares.flat().forEach(s => { if (tam(s) > 45) aviso(w, `lado com ${tam(s)} caracteres (até ~45): "${s.slice(0, 40)}"`); });
                    }
                } else if (e.tipo === 'enigma') {
                    if (!texto(e.resposta)) erro(w, 'falta `resposta`');
                    else {
                        if (e.resposta !== maiusc(e.resposta)) aviso(w, '`resposta` deveria estar em maiúsculas');
                        const letras = Array.from(maiusc(e.resposta).replace(/\s+/g, ''));
                        if (letras.length > 12) aviso(w, `resposta com ${letras.length} letras (até 12)`);
                        if (e.extras != null && typeof e.extras !== 'string') erro(w, '`extras` precisa ser um texto (ex.: "XR")');
                        if (e.cifra != null) {
                            const c = e.cifra;
                            if (!c || !texto(c.mensagem)) erro(w, '`cifra.mensagem` faltando');
                            if (!c || !Array.isArray(c.chave) || !c.chave.every(p => Array.isArray(p) && p.length === 2 && texto(p[0]) && texto(p[1]))) erro(w, '`cifra.chave` precisa ser uma lista de [símbolo, letra]');
                            else {
                                const daChave = new Set(c.chave.map(p => maiusc(p[1])));
                                const faltam = [...new Set(letras)].filter(l => !daChave.has(l));
                                if (faltam.length) erro(w, `a chave não tem as letras ${faltam.join(', ')} da resposta`);
                                // A mensagem, decifrada pela chave, deveria dar a resposta
                                let msg = String(c.mensagem);
                                const simbolos = [...c.chave].sort((a, b) => b[0].length - a[0].length);
                                let decifrada = '';
                                while (msg.length) {
                                    const s = simbolos.find(p => msg.startsWith(p[0]));
                                    if (s) { decifrada += maiusc(s[1]); msg = msg.slice(s[0].length); }
                                    else { const ch = Array.from(msg)[0]; decifrada += /\s/.test(ch) ? ' ' : '?'; msg = msg.slice(ch.length); }
                                }
                                if (decifrada.replace(/\s+/g, '') !== letras.join('')) aviso(w, `a mensagem decifrada dá "${decifrada}", e a resposta é "${maiusc(e.resposta)}"`);
                            }
                        }
                    }
                } else if (e.tipo === 'erro') {
                    if (!texto(e.texto)) erro(w, 'falta `texto`');
                    else {
                        const marcas = [...e.texto.matchAll(/\[\[([^|\]]+)\|([^\]]+)\]\]/g)];
                        const sobras = e.texto.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '');
                        if (/\[\[|\]\]/.test(sobras)) erro(w, 'marca [[errado|certo]] mal formada');
                        if (marcas.length < 2 || marcas.length > 4) (marcas.length ? aviso : erro)(w, `${marcas.length} erro(s) marcados (de 2 a 4)`);
                        marcas.forEach(m => { if (m[1].trim() === m[2].trim()) erro(w, `"${m[1]}" errado e certo são iguais`); });
                        const visivel = e.texto.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$1');
                        if (tam(visivel) > 260) aviso(w, `texto com ${tam(visivel)} caracteres (até ~260)`);
                    }
                }
            });
        }
        const faltam = TIPOS.filter(t => !tiposUsados.has(t));
        if (faltam.length && chaves.length >= 4) aviso('arquivo', `tipos ainda não usados nesta parte: ${faltam.join(', ')}`);
    }

    console.log(`${problemas.some(p => p.includes('❌')) ? '❌' : '✅'} ${arquivo}${d ? ` (${Object.keys(d.paginas).length} páginas)` : ''}`);
    problemas.forEach(p => console.log(p));
}

if (!globSync('*/desafios/parte-*.js').length) console.log('Nenhum arquivo de desafios encontrado (<livro>/desafios/parte-N.js).');
console.log(`\n${erros} erro(s), ${avisos} aviso(s).`);
process.exit(erros ? 1 : 0);
