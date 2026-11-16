// Gera sw.js (service worker) com a lista de arquivos e hash individual de cada arquivo.
// Com o hash por arquivo, uma atualização baixa só o que mudou (em vez de baixar 24+ MB de novo).
// Rode com: npm run build:sw  (já incluído em `npm run build`)
import { readFileSync, writeFileSync, existsSync, globSync } from 'node:fs';
import { createHash } from 'node:crypto';

const files = [
    ...globSync('*.html'),
    'manifest.webmanifest',
    ...globSync('assets/css/*.css'),
    ...globSync('assets/js/*.js'),
    ...globSync('assets/fonts/*.woff2'),
    'assets/icones/icone-192.png',
    ...globSync('assets/icones/bandeiras/*.svg'),
    ...globSync('*/parte-*.html'),
    ...globSync('*/traducoes/*.js'),
    // Modo Desafio (segunda camada, docs/DESAFIOS.md): os dados de cada parte; o motor já entra por assets/
    ...globSync('*/desafios/*.js'),
    // imagens/acervo/: arte aposentada (ex.: a Parte 4 antiga), guardada só como registro: não vai para o tablet
    ...globSync('*/imagens/**/*.{webp,svg,png}').filter(f => !/[\\/]acervo[\\/]/.test(f))
].sort();

const hash = createHash('sha256');
const entries = [];
// Exclui offline-manager.js do cálculo do hash para poder injetar a versão nele de forma determinística
for (const f of files) {
    const buf = readFileSync(f);
    const norm = f.replace(/\\/g, '/');
    const fileHash = createHash('sha256').update(buf).digest('hex').slice(0, 8);
    entries.push([`./${norm}`, fileHash]);
    if (!norm.endsWith('offline-manager.js')) {
        hash.update(f).update(buf);
    }
}
const version = hash.digest('hex').slice(0, 12);

const template = readFileSync('tools/sw.template.js', 'utf8');
const sw = template
    .replace('__VERSION__', version)
    .replace('__FILES__', JSON.stringify(entries, null, 4).replace(/\n/g, '\n'));
writeFileSync('sw.js', sw);

// Atualiza também VERSAO_ATUAL em offline-manager.js e a lista de arquivos de cada parte publicada
// (botão "Baixar" da estante). A Parte 1 guarda a lista própria (as imagens dela ficam na raiz de imagens/);
// as Partes 2 em diante são refeitas aqui: os arquivos comuns + imagens/parte-N/ + o HTML + as traduções
// + os desafios (desafios/parte-N.js e as traduções futuras deles, parte-N.<idioma>.js). O motor do modo
// Desafio (assets/js/desafios.js e assets/css/desafios.css) entra nos arquivos comuns, inclusive na Parte 1.
// Rascunhos (`rascunho: true` no window.LIVRO) ficam de fora.
try {
    const offPath = 'assets/js/offline-manager.js';
    let offContent = readFileSync(offPath, 'utf8');
    offContent = offContent.replace(/const VERSAO_ATUAL = '[^']+';/, `const VERSAO_ATUAL = '${version}';`);
    const ini = offContent.indexOf('const ARQUIVOS_PARTE = ') + 'const ARQUIVOS_PARTE = '.length;
    const fim = offContent.indexOf('\n};', ini) + 2;
    const atual = JSON.parse(offContent.slice(ini, fim));
    const desafiosDe = (n) => [...globSync(`dom-quixote/desafios/parte-${n}.js`), ...globSync(`dom-quixote/desafios/parte-${n}.*.js`)].sort();
    const ehDesafio = (f) => /\/desafios(\/|\.(js|css)$)/.test(f);
    const motorDesafios = ['assets/js/desafios.js', 'assets/css/desafios.css'].filter(f => existsSync(f)).map(f => `./${f}`);
    const parte1 = atual['1'].filter(f => !ehDesafio(f));
    const comuns = [...parte1.filter(f => f.startsWith('./assets/')), ...motorDesafios];
    const novo = { '1': [...parte1, ...motorDesafios, ...desafiosDe(1).map(f => `./${f.replace(/\\/g, '/')}`)] };
    for (const html of globSync('dom-quixote/parte-*.html').sort()) {
        const n = (html.match(/parte-(\d+)\.html$/) || [])[1];
        if (!n || n === '1' || /rascunho:\s*true/.test(readFileSync(html, 'utf8'))) continue;
        novo[n] = [
            ...comuns,
            ...globSync(`dom-quixote/imagens/parte-${n}/**/*.{webp,svg,png}`).sort(),
            html,
            ...globSync(`dom-quixote/traducoes/parte-${n}.*.js`).sort(),
            ...desafiosDe(n)
        ].map(f => f.startsWith('./') ? f : `./${f.replace(/\\/g, '/')}`);
    }
    const ordenado = Object.fromEntries(Object.entries(novo).sort((a, b) => a[0] - b[0]));
    offContent = offContent.slice(0, ini) + JSON.stringify(ordenado, null, 4) + offContent.slice(fim);
    writeFileSync(offPath, offContent);
} catch (e) { console.warn('offline-manager.js não atualizado:', e.message); }

console.log(`sw.js gerado: versão ${version}, ${files.length} arquivos`);
