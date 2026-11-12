// Gera sw.js (service worker) com a lista de arquivos de todos os livros para leitura offline.
// A versão do cache é um hash do conteúdo: qualquer alteração em HTML, CSS, fonte ou imagem
// gera uma versão nova e o tablet baixa a atualização na próxima visita com internet.
// Rode com: npm run build:sw  (já incluído em `npm run build`)
import { readFileSync, writeFileSync, globSync } from 'node:fs';
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
    // imagens/acervo/: arte aposentada (ex.: a Parte 4 antiga), guardada só como registro: não vai para o tablet
    ...globSync('*/imagens/**/*.{webp,svg,png}').filter(f => !/[\\/]acervo[\\/]/.test(f))
].sort();

const hash = createHash('sha256');
// Exclui offline-manager.js do cálculo do hash para poder injetar a versão nele de forma determinística
for (const f of files.filter(f => !f.replace(/\\/g, '/').endsWith('offline-manager.js'))) {
    hash.update(f).update(readFileSync(f));
}
const version = hash.digest('hex').slice(0, 12);

const template = readFileSync('tools/sw.template.js', 'utf8');
const sw = template
    .replace('__VERSION__', version)
    .replace('__FILES__', JSON.stringify(files.map(f => `./${f.replace(/\\/g, '/')}`), null, 4).replace(/\n/g, '\n'));
writeFileSync('sw.js', sw);

// Atualiza também VERSAO_ATUAL em offline-manager.js e a lista de arquivos de cada parte publicada
// (botão "Baixar" da estante). A Parte 1 guarda a lista própria (as imagens dela ficam na raiz de imagens/);
// as Partes 2 em diante são refeitas aqui: os arquivos comuns + imagens/parte-N/ + o HTML + as traduções.
// Rascunhos (`rascunho: true` no window.LIVRO) ficam de fora.
try {
    const offPath = 'assets/js/offline-manager.js';
    let offContent = readFileSync(offPath, 'utf8');
    offContent = offContent.replace(/const VERSAO_ATUAL = '[^']+';/, `const VERSAO_ATUAL = '${version}';`);
    const ini = offContent.indexOf('const ARQUIVOS_PARTE = ') + 'const ARQUIVOS_PARTE = '.length;
    const fim = offContent.indexOf('\n};', ini) + 2;
    const atual = JSON.parse(offContent.slice(ini, fim));
    const comuns = atual['1'].filter(f => f.startsWith('./assets/'));
    const novo = { '1': atual['1'] };
    for (const html of globSync('dom-quixote/parte-*.html').sort()) {
        const n = (html.match(/parte-(\d+)\.html$/) || [])[1];
        if (!n || n === '1' || /rascunho:\s*true/.test(readFileSync(html, 'utf8'))) continue;
        novo[n] = [
            ...comuns,
            ...globSync(`dom-quixote/imagens/parte-${n}/**/*.{webp,svg,png}`).sort(),
            html,
            ...globSync(`dom-quixote/traducoes/parte-${n}.*.js`).sort()
        ].map(f => f.startsWith('./') ? f : `./${f.replace(/\\/g, '/')}`);
    }
    const ordenado = Object.fromEntries(Object.entries(novo).sort((a, b) => a[0] - b[0]));
    offContent = offContent.slice(0, ini) + JSON.stringify(ordenado, null, 4) + offContent.slice(fim);
    writeFileSync(offPath, offContent);
} catch (e) { console.warn('offline-manager.js não atualizado:', e.message); }

console.log(`sw.js gerado: versão ${version}, ${files.length} arquivos`);
