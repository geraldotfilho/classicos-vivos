/* =====================================================================
   Clássicos Vivos — Gerenciador de Armazenamento e Leitura Offline por Volume
   Permite baixar, atualizar e excluir volumes individuais do tablet/dispositivo.
   ===================================================================== */
(function() {
    'use strict';

    const VERSAO_ATUAL = 'b59211162736';
    const PREFIXO_CACHE = 'cv-volume-quixote-';
    const PREFIXO_STORAGE = 'cv-offline-quixote-';

    const ARQUIVOS_PARTE = {
    "1": [
        "./assets/icones/icone-192.png",
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
        "./assets/js/acervo.js",
        "./assets/js/i18n-site.js",
        "./assets/js/livro.js",
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
        "./dom-quixote/parte-1.html",
        "./dom-quixote/traducoes/parte-1.en.js",
        "./dom-quixote/traducoes/parte-1.es.js",
        "./dom-quixote/traducoes/parte-1.fr.js"
    ],
    "2": [
        "./assets/icones/icone-192.png",
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
        "./assets/js/acervo.js",
        "./assets/js/i18n-site.js",
        "./assets/js/livro.js",
        "./assets/js/texto.js",
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
        "./dom-quixote/parte-2.html",
        "./dom-quixote/traducoes/parte-2.en.js",
        "./dom-quixote/traducoes/parte-2.es.js",
        "./dom-quixote/traducoes/parte-2.fr.js"
    ],
    "3": [
        "./assets/icones/icone-192.png",
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
        "./assets/js/acervo.js",
        "./assets/js/i18n-site.js",
        "./assets/js/livro.js",
        "./assets/js/texto.js",
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
        "./dom-quixote/parte-3.html",
        "./dom-quixote/traducoes/parte-3.en.js",
        "./dom-quixote/traducoes/parte-3.es.js",
        "./dom-quixote/traducoes/parte-3.fr.js"
    ],
    "4": [
        "./assets/icones/icone-192.png",
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
        "./assets/js/acervo.js",
        "./assets/js/i18n-site.js",
        "./assets/js/livro.js",
        "./assets/js/texto.js",
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
        "./dom-quixote/parte-4.html",
        "./dom-quixote/traducoes/parte-4.en.js",
        "./dom-quixote/traducoes/parte-4.es.js",
        "./dom-quixote/traducoes/parte-4.fr.js"
    ]
};

    const listeners = new Set();
    const estadoDownload = {}; // { [parte]: { baixando: boolean, atual: 0, total: 0 } }

    function notificar(parte) {
        listeners.forEach(cb => {
            try { cb(parte); } catch (e) {}
        });
    }

    const OfflineManager = {
        versaoAtual: VERSAO_ATUAL,

        obterInfo(parte) {
            try {
                const raw = localStorage.getItem(PREFIXO_STORAGE + parte);
                if (raw) return JSON.parse(raw);
            } catch (e) {}
            return null;
        },

        obterStatus(parte) {
            if (estadoDownload[parte]?.baixando) {
                return {
                    status: 'baixando',
                    atual: estadoDownload[parte].atual,
                    total: estadoDownload[parte].total,
                    porcentagem: Math.round((estadoDownload[parte].atual / (estadoDownload[parte].total || 1)) * 100)
                };
            }
            const info = this.obterInfo(parte);
            if (info) {
                if (info.versao === VERSAO_ATUAL) {
                    return { status: 'baixado', info };
                } else {
                    return { status: 'atualizacao', info, versaoAtual: VERSAO_ATUAL };
                }
            }
            return { status: 'disponivel' };
        },

        async verificarCachesExistentes() {
            if (!('caches' in window)) return;
            for (let n = 1; n <= 4; n++) {
                if (localStorage.getItem(PREFIXO_STORAGE + n)) continue;
                try {
                    const cacheName = PREFIXO_CACHE + n;
                    const existe = await caches.has(cacheName);
                    if (existe) {
                        localStorage.setItem(PREFIXO_STORAGE + n, JSON.stringify({
                            versao: VERSAO_ATUAL,
                            baixadoEm: Date.now(),
                            total: ARQUIVOS_PARTE[n]?.length || 0
                        }));
                        notificar(n);
                    } else {
                        // Verifica se o Service Worker já cacheou a página
                        const hit = await caches.match('./dom-quixote/parte-' + n + '.html', { ignoreSearch: true });
                        if (hit) {
                            localStorage.setItem(PREFIXO_STORAGE + n, JSON.stringify({
                                versao: VERSAO_ATUAL,
                                baixadoEm: Date.now(),
                                total: ARQUIVOS_PARTE[n]?.length || 0
                            }));
                            notificar(n);
                        }
                    }
                } catch (e) {}
            }
        },

        async baixarVolume(parte, onProgresso) {
            if (!('caches' in window)) {
                alert('Seu navegador não suporta armazenamento offline.');
                return false;
            }

            const arquivos = ARQUIVOS_PARTE[parte] || [];
            if (!arquivos.length) return false;

            estadoDownload[parte] = { baixando: true, atual: 0, total: arquivos.length };
            notificar(parte);

            try {
                const cacheName = PREFIXO_CACHE + parte;
                const cache = await caches.open(cacheName);

                for (let i = 0; i < arquivos.length; i++) {
                    const url = arquivos[i];
                    try {
                        const res = await fetch(url, { cache: 'no-cache' });
                        if (res.ok && (res.status === 200 || res.status === 0)) {
                            await cache.put(url, res);
                        }
                    } catch (err) {
                        // Se falhar algum arquivo opcional, prossegue
                    }
                    estadoDownload[parte].atual = i + 1;
                    if (typeof onProgresso === 'function') {
                        onProgresso(estadoDownload[parte]);
                    }
                    notificar(parte);
                }

                localStorage.setItem(PREFIXO_STORAGE + parte, JSON.stringify({
                    versao: VERSAO_ATUAL,
                    baixadoEm: Date.now(),
                    total: arquivos.length
                }));

                delete estadoDownload[parte];
                notificar(parte);
                return true;
            } catch (err) {
                delete estadoDownload[parte];
                notificar(parte);
                throw err;
            }
        },

        async excluirVolume(parte) {
            try {
                const cacheName = PREFIXO_CACHE + parte;
                if ('caches' in window) {
                    await caches.delete(cacheName);
                }
                localStorage.removeItem(PREFIXO_STORAGE + parte);
                delete estadoDownload[parte];
                notificar(parte);
                return true;
            } catch (err) {
                return false;
            }
        },

        async atualizarVolume(parte, onProgresso) {
            return this.baixarVolume(parte, onProgresso);
        },

        adicionarListener(callback) {
            if (typeof callback === 'function') listeners.add(callback);
        },

        removerListener(callback) {
            listeners.delete(callback);
        }
    };

    window.CV_OFFLINE = OfflineManager;

    // Inicializa verificação ao carregar a página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => OfflineManager.verificarCachesExistentes());
    } else {
        OfflineManager.verificarCachesExistentes();
    }
})();
