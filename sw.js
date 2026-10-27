/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa todos os livros (HTML, estilos, fontes e ilustrações) para leitura offline.
   - Páginas HTML: rede primeiro (recebe correções), cache quando estiver sem internet.
   - Narração gravada (*.mp3 e as marcas *.json em audio/): rede primeiro, para frases regravadas chegarem ao tablet;
     cada arquivo fica num cache próprio (que sobrevive às novas versões) e toca offline depois.
   - Demais arquivos: cache primeiro (abre instantâneo no tablet). */
const CACHE = 'classicos-vivos-1c2823f203b6';
const CACHE_AUDIO = 'cv-narracao';
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
    "./assets/icones/bandeiras/br.svg",
    "./assets/icones/bandeiras/es.svg",
    "./assets/icones/bandeiras/fr.svg",
    "./assets/icones/bandeiras/gb.svg",
    "./assets/icones/icone-192.png",
    "./assets/js/acervo.js",
    "./assets/js/contador.js",
    "./assets/js/i18n-site.js",
    "./assets/js/livro.js",
    "./assets/js/offline-manager.js",
    "./assets/js/texto.js",
    "./dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.webp",
    "./dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.webp",
    "./dom-quixote/imagens/camadas/p4-notas-musicais.webp",
    "./dom-quixote/imagens/camadas/p4-pastor-parado.webp",
    "./dom-quixote/imagens/camadas/p4-pastor-tocando.webp",
    "./dom-quixote/imagens/camadas/p4-porquinhos.webp",
    "./dom-quixote/imagens/camadas/p6-nuvem-ilha.webp",
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
    "./dom-quixote/imagens/p1-real-livro-cavaleiros.webp",
    "./dom-quixote/imagens/p1-real-livro-dragoes.webp",
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
    "./dom-quixote/imagens/parte-2/camadas/p3-bolotas.webp",
    "./dom-quixote/imagens/parte-2/camadas/p3-leite.webp",
    "./dom-quixote/imagens/parte-2/camadas/p3-queijo.webp",
    "./dom-quixote/imagens/parte-2/camadas/p4-poeira-direita.webp",
    "./dom-quixote/imagens/parte-2/camadas/p4-poeira-esquerda.webp",
    "./dom-quixote/imagens/parte-2/camadas/p6-balao-historia.webp",
    "./dom-quixote/imagens/parte-2/camadas/p6-cabra.webp",
    "./dom-quixote/imagens/parte-2/camadas/p7-martelos.webp",
    "./dom-quixote/imagens/parte-2/p0-imag.webp",
    "./dom-quixote/imagens/parte-2/p0-real.webp",
    "./dom-quixote/imagens/parte-2/p1-imag.webp",
    "./dom-quixote/imagens/parte-2/p1-real.webp",
    "./dom-quixote/imagens/parte-2/p2-imag.webp",
    "./dom-quixote/imagens/parte-2/p2-real.webp",
    "./dom-quixote/imagens/parte-2/p3-imag.webp",
    "./dom-quixote/imagens/parte-2/p3-real.webp",
    "./dom-quixote/imagens/parte-2/p4-imag.webp",
    "./dom-quixote/imagens/parte-2/p4-real.webp",
    "./dom-quixote/imagens/parte-2/p5-imag.webp",
    "./dom-quixote/imagens/parte-2/p5-real.webp",
    "./dom-quixote/imagens/parte-2/p6-imag.webp",
    "./dom-quixote/imagens/parte-2/p6-real.webp",
    "./dom-quixote/imagens/parte-2/p7-imag.webp",
    "./dom-quixote/imagens/parte-2/p7-real.webp",
    "./dom-quixote/imagens/parte-2/p8-imag.webp",
    "./dom-quixote/imagens/parte-2/p8-real.webp",
    "./dom-quixote/imagens/parte-3/camadas/p1-caderno.webp",
    "./dom-quixote/imagens/parte-3/camadas/p1-moedas.webp",
    "./dom-quixote/imagens/parte-3/camadas/p2-quixote-camisolao.webp",
    "./dom-quixote/imagens/parte-3/camadas/p6-odre.webp",
    "./dom-quixote/imagens/parte-3/camadas/p6-respingo.webp",
    "./dom-quixote/imagens/parte-3/p0-imag.webp",
    "./dom-quixote/imagens/parte-3/p0-real.webp",
    "./dom-quixote/imagens/parte-3/p1-imag.webp",
    "./dom-quixote/imagens/parte-3/p1-real.webp",
    "./dom-quixote/imagens/parte-3/p2-imag.webp",
    "./dom-quixote/imagens/parte-3/p2-real.webp",
    "./dom-quixote/imagens/parte-3/p3-imag.webp",
    "./dom-quixote/imagens/parte-3/p3-real-lembrou.webp",
    "./dom-quixote/imagens/parte-3/p3-real.webp",
    "./dom-quixote/imagens/parte-3/p4-imag.webp",
    "./dom-quixote/imagens/parte-3/p4-real.webp",
    "./dom-quixote/imagens/parte-3/p5-imag.webp",
    "./dom-quixote/imagens/parte-3/p5-real.webp",
    "./dom-quixote/imagens/parte-3/p6-imag.webp",
    "./dom-quixote/imagens/parte-3/p6-real.webp",
    "./dom-quixote/imagens/parte-3/p7-imag.webp",
    "./dom-quixote/imagens/parte-3/p7-real.webp",
    "./dom-quixote/imagens/parte-4/camadas/p5-agua.webp",
    "./dom-quixote/imagens/parte-4/camadas/p5-pao.webp",
    "./dom-quixote/imagens/parte-4/camadas/p5-queijo.webp",
    "./dom-quixote/imagens/parte-4/p0-imag.webp",
    "./dom-quixote/imagens/parte-4/p0-real.webp",
    "./dom-quixote/imagens/parte-4/p1-imag.webp",
    "./dom-quixote/imagens/parte-4/p1-real.webp",
    "./dom-quixote/imagens/parte-4/p10-imag.webp",
    "./dom-quixote/imagens/parte-4/p10-real.webp",
    "./dom-quixote/imagens/parte-4/p11-imag.webp",
    "./dom-quixote/imagens/parte-4/p11-real.webp",
    "./dom-quixote/imagens/parte-4/p2-imag.webp",
    "./dom-quixote/imagens/parte-4/p2-real.webp",
    "./dom-quixote/imagens/parte-4/p3-imag.webp",
    "./dom-quixote/imagens/parte-4/p3-real.webp",
    "./dom-quixote/imagens/parte-4/p4-imag.webp",
    "./dom-quixote/imagens/parte-4/p4-real.webp",
    "./dom-quixote/imagens/parte-4/p5-imag.webp",
    "./dom-quixote/imagens/parte-4/p5-real.webp",
    "./dom-quixote/imagens/parte-4/p6-real.webp",
    "./dom-quixote/imagens/parte-4/p7-real.webp",
    "./dom-quixote/imagens/parte-4/p8-imag.webp",
    "./dom-quixote/imagens/parte-4/p8-real.webp",
    "./dom-quixote/imagens/parte-4/p9-real.webp",
    "./dom-quixote/parte-1.html",
    "./dom-quixote/parte-2.html",
    "./dom-quixote/parte-3.html",
    "./dom-quixote/parte-4.html",
    "./dom-quixote/traducoes/parte-1.en.js",
    "./dom-quixote/traducoes/parte-1.es.js",
    "./dom-quixote/traducoes/parte-1.fr.js",
    "./dom-quixote/traducoes/parte-2.en.js",
    "./dom-quixote/traducoes/parte-2.es.js",
    "./dom-quixote/traducoes/parte-2.fr.js",
    "./dom-quixote/traducoes/parte-3.en.js",
    "./dom-quixote/traducoes/parte-3.es.js",
    "./dom-quixote/traducoes/parte-3.fr.js",
    "./dom-quixote/traducoes/parte-4.en.js",
    "./dom-quixote/traducoes/parte-4.es.js",
    "./dom-quixote/traducoes/parte-4.fr.js",
    "./index.html",
    "./manifest.webmanifest",
    "./sobre.html"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
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

    // Narração: o <audio> pede trechos (Range → 206), que não dá para guardar. Pedimos o arquivo
    // inteiro (200), que o navegador aceita como resposta e que fica guardado para tocar offline.
    if (/\/audio\/.+\.(mp3|json)$/.test(new URL(req.url).pathname)) {
        event.respondWith(
            fetch(req.url)
                .then(res => {
                    if (res.ok && res.status === 200) {
                        const copy = res.clone();
                        caches.open(CACHE_AUDIO).then(c => c.put(req.url, copy));
                    }
                    return res;
                })
                .catch(() => caches.open(CACHE_AUDIO).then(c => c.match(req.url)).then(hit => hit || Response.error()))
        );
        return;
    }

    // Demais arquivos: cache primeiro; o que não foi pré-baixado fica guardado na primeira vez.
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
