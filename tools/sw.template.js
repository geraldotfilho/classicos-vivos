/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa todos os livros (HTML, estilos, fontes e ilustrações) para leitura offline.
   - Páginas HTML: rede primeiro (recebe correções), cache quando estiver sem internet.
   - Demais arquivos: cache primeiro (abre instantâneo no tablet); a narração gravada é
     guardada sob demanda, na primeira vez que toca. */
const CACHE = 'classicos-vivos-__VERSION__';
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
