/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa todos os livros (HTML, estilos, fontes e ilustrações) para leitura offline.
   - Páginas HTML: rede primeiro (recebe correções), cache quando estiver sem internet.
   - Demais arquivos: cache primeiro (abre instantâneo no tablet); a narração gravada é
     guardada sob demanda, na primeira vez que toca. */
const CACHE = 'classicos-vivos-0fc7e0169141';
const FILES = [
    "./assets/css/fonts.css",
    "./assets/css/icons.css",
    "./assets/css/livro.css",
    "./assets/css/tailwind.css",
    "./assets/fonts/fredoka-latin-400-normal.woff2",
    "./assets/fonts/fredoka-latin-500-normal.woff2",
    "./assets/fonts/fredoka-latin-600-normal.woff2",
    "./assets/fonts/fredoka-latin-700-normal.woff2",
    "./assets/fonts/nunito-latin-400-normal.woff2",
    "./assets/fonts/nunito-latin-600-normal.woff2",
    "./assets/fonts/nunito-latin-700-normal.woff2",
    "./assets/fonts/nunito-latin-800-normal.woff2",
    "./assets/fonts/nunito-latin-900-normal.woff2",
    "./assets/icones/icone-192.png",
    "./assets/js/livro.js",
    "./assets/js/texto.js",
    "./dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.webp",
    "./dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.webp",
    "./dom-quixote/imagens/camadas/p4-notas-musicais.webp",
    "./dom-quixote/imagens/camadas/p4-pastor-parado.webp",
    "./dom-quixote/imagens/camadas/p4-pastor-tocando.webp",
    "./dom-quixote/imagens/camadas/p4-porquinhos.webp",
    "./dom-quixote/imagens/camadas/p7-pas-moinho.webp",
    "./dom-quixote/imagens/objetos/armadura-peitoral.svg",
    "./dom-quixote/imagens/objetos/bacia-elmo.svg",
    "./dom-quixote/imagens/objetos/cenoura.svg",
    "./dom-quixote/imagens/objetos/escova.svg",
    "./dom-quixote/imagens/objetos/escudo-panelao.svg",
    "./dom-quixote/imagens/objetos/lanca-bandeirola.svg",
    "./dom-quixote/imagens/objetos/livro-castelos.svg",
    "./dom-quixote/imagens/objetos/livro-cavaleiros.svg",
    "./dom-quixote/imagens/objetos/livro-dragoes.svg",
    "./dom-quixote/imagens/objetos/maca.svg",
    "./dom-quixote/imagens/objetos/sopa-banquete.svg",
    "./dom-quixote/imagens/objetos/trombeta-flauta.svg",
    "./dom-quixote/imagens/objetos/vento-sopro.svg",
    "./dom-quixote/imagens/p0-imag.webp",
    "./dom-quixote/imagens/p0-real.webp",
    "./dom-quixote/imagens/p1-imag.webp",
    "./dom-quixote/imagens/p1-real-livro-castelos.webp",
    "./dom-quixote/imagens/p1-real.webp",
    "./dom-quixote/imagens/p2-imag.webp",
    "./dom-quixote/imagens/p2-real-stage-0.webp",
    "./dom-quixote/imagens/p2-real-stage-1.webp",
    "./dom-quixote/imagens/p2-real-stage-2.webp",
    "./dom-quixote/imagens/p2-real-stage-3.webp",
    "./dom-quixote/imagens/p2-real-stage-4.webp",
    "./dom-quixote/imagens/p3-imag.webp",
    "./dom-quixote/imagens/p3-real-stage-1.webp",
    "./dom-quixote/imagens/p3-real-stage-2.webp",
    "./dom-quixote/imagens/p3-real-stage-3.webp",
    "./dom-quixote/imagens/p3-real.webp",
    "./dom-quixote/imagens/p4-imag.webp",
    "./dom-quixote/imagens/p4-real-fundo.webp",
    "./dom-quixote/imagens/p5-imag.webp",
    "./dom-quixote/imagens/p5-real.webp",
    "./dom-quixote/imagens/p6-imag.webp",
    "./dom-quixote/imagens/p6-real.webp",
    "./dom-quixote/imagens/p7-imag.webp",
    "./dom-quixote/imagens/p7-real-sem-pas.webp",
    "./dom-quixote/parte-1.html",
    "./dom-quixote/parte-2.html",
    "./dom-quixote/parte-3.html",
    "./dom-quixote/parte-4.html",
    "./index.html",
    "./manifest.webmanifest",
    "./sobre.html"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k.startsWith('classicos-vivos-') && k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    // Páginas HTML e a lista de narrações gravadas (vozes.js): rede primeiro, para receber atualizações
    const isPage = req.mode === 'navigate' || req.destination === 'document' || /\/audio\/vozes\.js$/.test(new URL(req.url).pathname);
    if (isPage) {
        event.respondWith(
            fetch(req)
                .then(res => {
                    const copy = res.clone();
                    if (res.ok) caches.open(CACHE).then(c => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match(req, { ignoreSearch: true }))
        );
        return;
    }

    // Demais arquivos: cache primeiro. O que não foi pré-baixado (ex.: a narração gravada,
    // que é grande) fica guardado na primeira vez que tocar e depois funciona offline.
    event.respondWith(
        caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
            if (res.ok && res.status === 200) {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put(req, copy));
            }
            return res;
        }))
    );
});
