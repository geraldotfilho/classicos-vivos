/* Service worker dos Clássicos Vivos — GERADO por tools/build-sw.mjs. Não editar sw.js à mão:
   edite tools/sw.template.js e rode `npm run build:sw`.
   Estratégia:
   - Na instalação, baixa só o núcleo leve (HTMLs, estilos, fontes, scripts) e reaproveita por hash
     tudo o que não mudou do cache anterior (sem baixar ~24 MB de imagens a cada atualização).
   - As ilustrações não presentes em cache são aquecidas em segundo plano em lotes pequenos após ativar.
   - Páginas HTML e vozes.js: rede primeiro com limite de 2,5 s (se a rede estiver lenta, abre do cache na hora).
   - Narração gravada (*.mp3 e *.json): rede primeiro com limite de 2,5 s, cache próprio (cv-narracao).
   - Demais arquivos: cache primeiro (abre instantâneo no tablet). */
const CACHE = 'classicos-vivos-__VERSION__';
const CACHE_AUDIO = 'cv-narracao';
const CACHE_META = 'cv-meta';
const FILES = __FILES__;

const ehImagemLivro = (url) => /\/imagens\//.test(url);

async function lerHashesAntigos() {
    try {
        const meta = await caches.open(CACHE_META);
        const res = await meta.match('hashes');
        return res ? await res.json() : {};
    } catch { return {}; }
}

async function salvarHashesAtuais() {
    try {
        const meta = await caches.open(CACHE_META);
        const mapa = {};
        for (const [url, h] of FILES) mapa[url] = h;
        await meta.put('hashes', new Response(JSON.stringify(mapa), {
            headers: { 'Content-Type': 'application/json' }
        }));
    } catch {}
}

async function abrirCachesAntigos() {
    const keys = await caches.keys();
    const antigos = keys.filter(k => k.startsWith('classicos-vivos-') && k !== CACHE);
    return Promise.all(antigos.map(k => caches.open(k)));
}

async function buscarEmCaches(cachesLista, url) {
    for (const c of cachesLista) {
        const hit = await c.match(url, { ignoreSearch: true });
        if (hit) return hit;
    }
    return null;
}

async function executarEmLotes(itens, concorrencia, fn) {
    let idx = 0;
    const workers = Array.from({ length: Math.min(concorrencia, itens.length) }, async () => {
        while (idx < itens.length) {
            const item = itens[idx++];
            await fn(item);
        }
    });
    await Promise.all(workers);
}

async function instalarNucleo() {
    const [newCache, oldHashes, oldCaches] = await Promise.all([
        caches.open(CACHE),
        lerHashesAntigos(),
        abrirCachesAntigos()
    ]);

    const core = [];
    const imagens = [];
    for (const entry of FILES) {
        if (ehImagemLivro(entry[0])) imagens.push(entry);
        else core.push(entry);
    }

    // 1. Copia imagens inalteradas direto do cache antigo (0 rede, ~ms)
    if (oldCaches.length) {
        await executarEmLotes(imagens, 16, async ([url, hash]) => {
            if (oldHashes[url] !== hash) return;
            const hit = await buscarEmCaches(oldCaches, url);
            if (hit) await newCache.put(url, hit.clone());
        });
    }

    // 2. Instala o núcleo (HTML, CSS, JS, fontes): reaproveita por hash e baixa só o que mudou (4 por vez)
    await executarEmLotes(core, 4, async ([url, hash]) => {
        if (oldHashes[url] === hash && oldCaches.length) {
            const hit = await buscarEmCaches(oldCaches, url);
            if (hit) { await newCache.put(url, hit.clone()); return; }
        }
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (res.ok && res.status === 200) await newCache.put(url, res);
    });
}

async function aquecerImagensFaltantes(oldHashes) {
    try {
        const cache = await caches.open(CACHE);
        const faltantes = [];
        for (const [url, hash] of FILES) {
            if (!ehImagemLivro(url)) continue;
            const jaTem = await cache.match(url, { ignoreSearch: true });
            if (!jaTem) faltantes.push([url, hash]);
        }
        if (!faltantes.length) return;
        await executarEmLotes(faltantes, 2, async ([url, hash]) => {
            try {
                const mudou = oldHashes[url] && oldHashes[url] !== hash;
                const req = mudou ? new Request(url, { cache: 'reload' }) : new Request(url);
                const res = await fetch(req);
                if (res.ok && res.status === 200) await cache.put(url, res);
            } catch {}
            await new Promise(r => setTimeout(r, 80));
        });
    } catch {}
}

/* Rede primeiro com limite de espera quando já existe cópia em cache (evita travar o livro em Wi-Fi lento) */
async function redeComReservaCache(event, cacheName, req, { buscarEmTodos = false, timeoutMs = 2500 } = {}) {
    const cache = await caches.open(cacheName);
    let cached = await cache.match(req, { ignoreSearch: true });
    if (!cached && buscarEmTodos) {
        cached = await caches.match(req, { ignoreSearch: true });
    }

    const netPromise = fetch(req).then(res => {
        if (res.ok && res.status === 200) cache.put(req, res.clone());
        return res;
    });

    if (!cached) return netPromise;

    let timer;
    const timeout = new Promise(resolve => { timer = setTimeout(() => resolve(null), timeoutMs); });
    const netRes = await Promise.race([netPromise.catch(() => null), timeout]);
    clearTimeout(timer);
    if (netRes && netRes.ok) return netRes;

    event.waitUntil(netPromise.catch(() => {}));
    return cached;
}

self.addEventListener('install', (event) => {
    event.waitUntil(instalarNucleo().then(() => self.skipWaiting()));
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const oldHashes = await lerHashesAntigos();
        const keys = await caches.keys();
        await Promise.all(
            keys.filter(k => k.startsWith('classicos-vivos-') && k !== CACHE).map(k => caches.delete(k))
        );
        await salvarHashesAtuais();
        await self.clients.claim();
        // Aquece imagens faltantes em segundo plano (2 por vez) sem bloquear a navegação
        aquecerImagensFaltantes(oldHashes);
    })());
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    // Páginas HTML e a lista de narrações gravadas (vozes.js): rede primeiro (máx. 2,5 s se já houver cache)
    const isPage = req.mode === 'navigate' || req.destination === 'document' || /\/audio\/vozes\.js$/.test(new URL(req.url).pathname);
    if (isPage) {
        event.respondWith(redeComReservaCache(event, CACHE, req, { buscarEmTodos: true, timeoutMs: 2500 }));
        return;
    }

    // Narração: o <audio> pede trechos (Range → 206), que não dá para guardar. Pedimos o arquivo
    // inteiro (200), que o navegador aceita como resposta e que fica guardado para tocar offline.
    if (/\/audio\/.+\.(mp3|json)$/.test(new URL(req.url).pathname)) {
        event.respondWith(redeComReservaCache(event, CACHE_AUDIO, new Request(req.url), { buscarEmTodos: false, timeoutMs: 2500 }));
        return;
    }

    // Demais arquivos: cache DESTA versão primeiro; o que não foi pré-baixado vem da rede e fica guardado.
    // Nunca procurar primeiro em todos os caches (caches.match): os volumes baixados pelo botão "Baixar"
    // (cv-volume-quixote-N) guardam o livro.js e o livro.css da época do download e, por serem mais antigos,
    // ganhavam da versão nova: o tablet que baixou partes ficava preso no motor velho (bug de 2026-11-14).
    // Eles só servem de reserva sem internet.
    event.respondWith(
        caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true })).then(hit => hit || fetch(req).then(res => {
            if (res.ok && res.status === 200) {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put(req, copy));
            }
            return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }).then(velho => velho || Response.error())))
    );
});
