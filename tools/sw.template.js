/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa todos os livros (HTML, estilos, fontes e ilustrações) para leitura offline.
   - Páginas HTML: rede primeiro (recebe correções), cache quando estiver sem internet.
   - Narração gravada (*.mp3 em audio/): rede primeiro, para frases regravadas chegarem ao tablet;
     cada arquivo fica num cache próprio (que sobrevive às novas versões) e toca offline depois.
   - Demais arquivos: cache primeiro (abre instantâneo no tablet). */
const CACHE = 'classicos-vivos-__VERSION__';
const CACHE_AUDIO = 'cv-narracao';
const FILES = __FILES__;

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

    // Narração: o <audio> pede trechos (Range → 206), que não dá para guardar. Pedimos o arquivo
    // inteiro (200), que o navegador aceita como resposta e que fica guardado para tocar offline.
    if (/\/audio\/.+\.mp3$/.test(new URL(req.url).pathname)) {
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
