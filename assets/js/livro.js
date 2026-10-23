/* =========================================================================
   Clássicos Vivos — motor dos livros interativos (sem build, sem CDN).

   Cada livro (ex.: dom-quixote/parte-1.html) só declara o conteúdo em
   `window.LIVRO` e carrega este arquivo. O motor monta a moldura, o livro
   aberto (ilustração | texto), as lentes, os cartões, as camadas, a leitura
   guiada, o cartão de alfabetização e a virada de página.
   Formato da configuração: ver AGENTS.md §2.5.
   ========================================================================= */

/* =====================================================================
   ESTADO GLOBAL
   ===================================================================== */
const LIVRO = window.LIVRO;
const totalPages = LIVRO.paginas.length;
let currentPage = 0;
let soundEnabled = true;
let isReadingPage = false;
let ptVoice = null;

// Lente por página (false = Realidade, true = Imaginação) e progresso das interações
const lensImaginationState = LIVRO.paginas.map(() => false);
const pageState = LIVRO.paginas.map(() => ({ usados: new Set(), ultimo: null }));

const IMG_BASE = LIVRO.imagens || './imagens/';

/* Caminho de imagem: nomes simples são relativos à pasta de imagens da parte */
function img(path) {
    if (!path) return '';
    return /^(\.|\/|https?:)/.test(path) ? path : IMG_BASE + path;
}

function cenaDe(i) {
    return LIVRO.paginas[i].cena || {};
}

function cartoesDe(i) {
    return cenaDe(i).cartoes || null;
}

function escapeHtml(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* =====================================================================
   CENA = f(lente, progresso)
   ===================================================================== */
function realSceneFor(i) {
    const cena = cenaDe(i);
    const st = pageState[i];
    const c = cena.cartoes;

    if (cena.realCena) {
        const r = cena.realCena(st);
        if (r) return { src: img(r.src), badge: r.legenda || cena.legendaReal };
    }
    if (c && c.tipo === 'progressivo') {
        const n = st.usados.size;
        return { src: img(c.etapas[n]), badge: (c.legendas && c.legendas[n]) || cena.legendaReal };
    }
    if (c && c.tipo === 'variante' && st.ultimo) {
        const v = c.variantes[st.ultimo];
        const todas = st.usados.size >= c.itens.length;
        return { src: img(v.src), badge: todas && c.legendaTodas ? c.legendaTodas : v.legenda };
    }
    return { src: img(cena.real), badge: cena.legendaReal };
}

function sceneFor(i) {
    if (lensImaginationState[i]) {
        const cena = cenaDe(i);
        return { src: img(cena.imag), badge: cena.legendaImag };
    }
    return realSceneFor(i);
}

/* Todas as imagens que uma página pode exibir (para pré-carregar e para o service worker) */
function allSceneSrcs(i) {
    const cena = cenaDe(i);
    const c = cena.cartoes || {};
    const srcs = [cena.real, cena.imag];
    if (c.etapas) srcs.push(...c.etapas);
    if (c.variantes) Object.values(c.variantes).forEach(v => srcs.push(v.src));
    (cena.camadas || []).forEach(l => { if (l.src) srcs.push(l.src); });
    (cena.precarregar || []).forEach(src => srcs.push(src));
    return srcs.filter(Boolean).map(img);
}

/* =====================================================================
   MONTAGEM DO LIVRO A PARTIR DA CONFIGURAÇÃO
   ===================================================================== */
const BADGE_REAL = "bg-slate-900/85 text-white font-display font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full shadow";
const BADGE_IMAG = "bg-purple-700 text-amber-200 font-display font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full shadow border border-amber-300";
const LENS_BTN_REAL = "lens-toggle-btn bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 text-white font-display font-bold text-xs sm:text-sm px-5 py-1.5 rounded-2xl border-2 border-white flex items-center gap-2";
const LENS_BTN_IMAG = "lens-toggle-btn bg-gradient-to-r from-slate-800 to-slate-700 text-amber-300 font-display font-bold text-xs sm:text-sm px-5 py-1.5 rounded-2xl border-2 border-amber-400 flex items-center gap-2";
const GRID_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5' };

/* Texto do livro: parágrafos separados por linha em branco e palavras-chave
   no formato {{PALAVRA|SÍ • LA • BAS|emoji}} */
function textoParaHtml(texto) {
    return texto.trim().split(/\n\s*\n/).map(par => par.trim().replace(/\s*\n\s*/g, ' ').replace(
        /\{\{([^|}]+)\|([^|}]+)\|([^}]+)\}\}/g,
        (m, palavra, silabas, emoji) =>
            `<span class="literacy-word" data-palavra="${escapeHtml(palavra)}" data-silabas="${escapeHtml(silabas)}" data-emoji="${escapeHtml(emoji)}">${escapeHtml(palavra)}</span>`
    )).join('\n<br><br>\n');
}

function montarHotspots(i, cena) {
    return (cena.hotspots || []).map((h, k) => {
        const lente = h.lente ? ` hotspot-${h.lente}${h.lente === 'imag' ? ' hidden' : ''}` : '';
        return `<div class="scene-hotspot${lente}" data-hotspot="${k}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%;" title="${escapeHtml(h.titulo || h.palavra || '')}"></div>`;
    }).join('');
}

/* Camada: arte com alfa (src) ou um véu pintado em CSS (fundo), ex.: a escuridão antes do amanhecer.
   x/y = ponto de apoio (base, centro) e w/h = tamanho, tudo em % do quadro 16:9. */
function montarCamadas(i, cena) {
    return (cena.camadas || []).map(l => {
        const arte = l.fundo
            ? `<div class="camada-arte" style="height:100%;background:${l.fundo};"></div>`
            : `<div class="camada-arte"><img src="${escapeHtml(img(l.src))}" alt="" draggable="false"></div>`;
        return `
        <div class="camada${l.anim ? ` anim-${l.anim}` : ''}" data-camada="${escapeHtml(l.id)}" data-emoji="${escapeHtml(l.emoji || '✨')}"
             style="left:${l.x}%;top:${l.y}%;width:${l.w}%;${l.h ? `height:${l.h}%;` : ''}${l.z ? `z-index:${l.z};` : ''}">
            ${arte}
        </div>`;
    }).join('');
}

function montarCartoes(i, cena) {
    const c = cena.cartoes;
    if (!c || !c.itens || !c.itens.length) return '';
    const cols = GRID_COLS[c.colunas || Math.min(c.itens.length, 4)];
    const faixa = c.tipo === 'ordem'
        ? `<div id="faixa-${i}" class="faixa-palavras mt-2" aria-live="polite"><span class="faixa-vazia">${escapeHtml(c.faixaVazia || 'Toque nas palavras na ordem certa')}</span></div>`
        : '';
    const cards = c.itens.map(item => {
        const domId = item.domId || `card-${i}-${item.id}`;
        const icone = item.icone
            ? `<img src="${escapeHtml(img(item.icone))}" alt="" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 pointer-events-none" />`
            : (item.emoji && c.tipo !== 'ordem' ? `<span class="text-2xl sm:text-3xl leading-none pointer-events-none" aria-hidden="true">${item.emoji}</span>` : '');
        return `
            <div id="${escapeHtml(domId)}" data-drop-target="drop-zone-${i}" data-id="${escapeHtml(item.id)}"
                 data-word="${escapeHtml(item.palavra)}" data-emoji="${escapeHtml(item.emoji || '✨')}"
                 class="draggable-card bg-white border-2 ${item.borda || 'border-amber-500'} rounded-2xl p-1.5 flex items-center justify-center gap-2 min-h-[48px]">
                ${icone}
                <span class="font-display font-bold text-xs sm:text-sm text-amber-950 uppercase truncate">${escapeHtml(item.palavra)}</span>
            </div>`;
    }).join('');
    return `${faixa}<div class="w-full grid ${cols} gap-2 z-20 mt-2">${cards}</div>`;
}

function montarPaginaArte(i, pagina) {
    const cena = pagina.cena;
    const inicial = sceneFor(i);
    return `
        <div class="book-page page-art">
            <div id="frame-${i}" class="art-plate relative w-full flex flex-col justify-center">
                <div class="flex items-center justify-between gap-2 z-20 mb-1">
                    <span id="lens-badge-${i}" class="${BADGE_REAL}">${escapeHtml(inicial.badge)}</span>
                </div>
                <div id="drop-zone-${i}" class="drop-zone-target relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-slate-900 flex items-center justify-center">
                    <img id="scene-bg-${i}" src="${escapeHtml(inicial.src)}" alt="${escapeHtml(cena.alt || pagina.titulo || '')}" class="w-full h-full object-contain scene-img" />
                    <div class="scene-placeholder" aria-hidden="true"><span class="ph-emoji">${cena.emoji || '🎨'}</span><span>Ilustração a caminho</span></div>
                    ${montarCamadas(i, cena)}
                    ${cena.extra || ''}
                    ${montarHotspots(i, cena)}
                    <div class="scene-busy-overlay"><div class="scene-spinner"></div></div>
                </div>
                ${montarCartoes(i, cena)}
                <div class="flex items-center justify-center z-20 mt-2">
                    <button type="button" id="lens-btn-${i}" data-lente="${i}" class="${LENS_BTN_REAL}">
                        <span class="text-base">✨</span>
                        <span id="lens-btn-label-${i}">Usar Lente da Imaginação!</span>
                    </button>
                </div>
            </div>
        </div>`;
}

function montarPaginaTexto(i, pagina) {
    const ultima = i === totalPages - 1;
    const fim = LIVRO.fim || {};
    let topo;
    if (pagina.capa) {
        topo = `
            <div class="inline-flex items-center gap-2 bg-amber-200 text-amber-950 font-display font-bold px-3.5 py-1 rounded-full text-xs sm:text-sm border-2 border-amber-400">
                <span>${escapeHtml(pagina.etiqueta || '✨ Toque nas PALAVRAS MAIÚSCULAS para ouvir!')}</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-display font-bold text-amber-950 leading-tight">
                ${escapeHtml(LIVRO.obra)}
                <span class="block text-base sm:text-2xl text-amber-700 mt-1">${escapeHtml(pagina.titulo)}</span>
            </h2>`;
    } else {
        topo = `
            <div class="inline-flex items-center gap-2 ${pagina.corCapitulo || 'text-amber-700'} font-display font-bold text-xs sm:text-sm uppercase">
                <span>${escapeHtml(pagina.capitulo)}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-amber-950">${escapeHtml(pagina.titulo)}</h2>`;
    }
    const abrir = pagina.capa ? `
        <button type="button" data-nav="next" class="btn-chunky w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-display font-bold text-lg sm:text-xl px-7 py-3 rounded-3xl border-4 border-rose-700 flex items-center justify-center gap-3">
            <span>Abrir o Livro!</span>
            <i class="ph-bold ph-arrow-right text-2xl"></i>
        </button>` : '';
    const final = ultima ? `
        <div class="fim-parte space-y-2">
            <p class="font-display font-bold text-amber-950 text-sm sm:text-base">${escapeHtml(fim.mensagem || '🎉 Fim!')}</p>
            <div class="flex flex-wrap items-center justify-center gap-2">
                <button type="button" data-nav="0" class="btn-chunky bg-amber-300 hover:bg-amber-400 text-amber-950 font-display font-bold py-2 px-4 rounded-2xl border-2 border-amber-600 flex items-center justify-center gap-2 text-sm">
                    <i class="ph-bold ph-arrow-counter-clockwise text-lg"></i><span>Ler de Novo</span>
                </button>
                ${fim.proxima ? `
                <a href="${escapeHtml(fim.proxima)}" class="btn-chunky bg-rose-500 hover:bg-rose-600 text-white font-display font-bold py-2 px-4 rounded-2xl border-2 border-rose-700 flex items-center justify-center gap-2 text-sm">
                    <span>${escapeHtml(fim.proximaRotulo || 'Continuar a história')}</span><i class="ph-bold ph-arrow-right text-lg"></i>
                </a>` : `
                <a href="../index.html" class="btn-chunky bg-white hover:bg-amber-50 text-amber-950 font-display font-bold py-2 px-4 rounded-2xl border-2 border-amber-500 flex items-center justify-center gap-2 text-sm">
                    <i class="ph-bold ph-books text-lg"></i><span>Biblioteca</span>
                </a>`}
            </div>
        </div>` : '';
    const alinhamento = pagina.capa ? 'items-center lg:items-start text-center lg:text-left' : '';
    return `
        <div class="book-page page-text">
            <div class="page-text-scroll">
                <div class="page-text-inner flex flex-col ${alinhamento} space-y-3">
                    ${topo}
                    <p id="page-text-${i}" class="text-base sm:text-lg text-slate-800 font-bold leading-relaxed">${textoParaHtml(pagina.texto)}</p>
                    ${abrir}
                    ${final}
                </div>
            </div>
        </div>`;
}

function montarLivro() {
    const parteRotulo = LIVRO.parte ? `Parte ${LIVRO.parte} de ${LIVRO.totalPartes || LIVRO.parte}` : '';
    const secoes = LIVRO.paginas.map((pagina, i) => `
        <section id="page-${i}" class="page-slide${i ? ' page-hidden' : ''} spread" aria-label="Página ${i + 1}">
            ${montarPaginaArte(i, pagina)}
            ${montarPaginaTexto(i, pagina)}
        </section>`).join('');

    document.body.insertAdjacentHTML('afterbegin', `
    <div id="phonics-modal" class="phonics-backdrop" role="dialog" aria-modal="true" aria-labelledby="phonics-word" aria-hidden="true">
        <button id="phonics-card" type="button" class="phonics-card" aria-label="Ouvir a palavra de novo">
            <span id="phonics-emoji" class="block text-6xl sm:text-7xl leading-none" aria-hidden="true">📖</span>
            <span id="phonics-word" class="block font-display font-bold text-3xl sm:text-5xl text-amber-950 tracking-wider uppercase leading-tight break-words mt-3"></span>
            <span id="phonics-syllables" class="flex flex-wrap items-center justify-center gap-2 mt-4" aria-label="Sílabas"></span>
            <span class="phonics-replay mt-5 mx-auto w-16 h-16 rounded-full bg-emerald-500 border-4 border-emerald-700 text-white text-3xl flex items-center justify-center" aria-hidden="true">
                <i class="ph-fill ph-speaker-high"></i>
            </span>
        </button>
    </div>

    <main id="book-container" class="storybook-frame relative w-full max-w-6xl rounded-[24px] sm:rounded-[30px] flex flex-col justify-between overflow-hidden">
        <header class="w-full bg-amber-100/95 border-b-4 border-amber-300 px-2.5 py-1.5 sm:px-5 sm:py-2 flex items-center justify-between gap-2 z-30 shrink-0">
            <div class="flex items-center gap-2 min-w-0">
                <a href="../index.html" class="btn-chunky w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 flex items-center justify-center border-2 border-amber-500 text-lg" title="Voltar à Biblioteca Clássicos Vivos" aria-label="Voltar à biblioteca">
                    <i class="ph-bold ph-books"></i>
                </a>
                <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                        <span class="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full shrink-0">${escapeHtml(parteRotulo)}</span>
                        <span class="hidden md:inline text-xs font-bold text-amber-800 truncate">${escapeHtml(LIVRO.autor || '')}</span>
                    </div>
                    <h1 class="text-xs sm:text-lg font-display font-bold text-amber-950 leading-tight truncate">${escapeHtml(LIVRO.obra)}</h1>
                </div>
            </div>
            <div id="page-dots" class="hidden lg:flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border-2 border-amber-300"></div>
            <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button type="button" id="btn-tts" class="btn-chunky flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-semibold px-3 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm border-2 border-emerald-700" title="Ouvir a página inteira">
                    <i id="tts-icon" class="ph-fill ph-speaker-high text-base sm:text-lg"></i>
                    <span id="tts-label" class="hidden sm:inline">Ouvir Página</span>
                </button>
                <button type="button" id="btn-sfx" class="btn-chunky w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center border-2 border-amber-600 text-base sm:text-lg" title="Ativar/Desativar Efeitos Sonoros" aria-label="Efeitos sonoros">
                    <i id="sfx-icon" class="ph-fill ph-music-notes"></i>
                </button>
                <button type="button" id="btn-fullscreen" class="btn-chunky w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center border-2 border-indigo-700 text-base sm:text-lg" title="Modo Tela Cheia para Tablet" aria-label="Tela cheia">
                    <i id="fullscreen-icon" class="ph-bold ph-corners-out"></i>
                </button>
            </div>
        </header>

        <div id="pages-viewport" class="book-viewport">${secoes}</div>

        <footer class="w-full bg-amber-100/95 border-t-4 border-amber-300 px-3 py-2 sm:px-6 sm:py-2 flex items-center justify-between z-30 shrink-0">
            <button type="button" id="btn-prev" class="btn-chunky flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-950 font-display font-bold px-4 py-1.5 sm:px-6 sm:py-2 rounded-2xl border-2 border-amber-500 text-xs sm:text-base disabled:opacity-40 disabled:pointer-events-none">
                <i class="ph-bold ph-arrow-left text-base sm:text-lg"></i>
                <span>Anterior</span>
            </button>
            <span id="page-counter-text" class="font-display font-bold text-amber-950 text-xs sm:text-base bg-amber-200 px-3.5 py-1 rounded-full border-2 border-amber-400">Página 1 de ${totalPages}</span>
            <button type="button" id="btn-next" class="btn-chunky flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-display font-bold px-4 py-1.5 sm:px-6 sm:py-2 rounded-2xl border-2 border-amber-700 text-xs sm:text-base disabled:opacity-40 disabled:pointer-events-none">
                <span>Próxima</span>
                <i class="ph-bold ph-arrow-right text-base sm:text-lg"></i>
            </button>
        </footer>
    </main>`);
}


/* =====================================================================
   INICIALIZAÇÃO DE VOZ PT-BR (ANDROID CHROME / WEB SPEECH API)
   ===================================================================== */
function loadPortugueseVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    ptVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase() === 'pt-br' && (v.name.includes('Google') || v.name.includes('Luciana') || v.name.includes('Francisca')))
           || voices.find(v => v.lang.replace('_', '-').toLowerCase() === 'pt-br')
           || voices.find(v => v.lang.toLowerCase().startsWith('pt'));
}

if ('speechSynthesis' in window) {
    loadPortugueseVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadPortugueseVoice;
    }
}

/* =====================================================================
   MODO TELA CHEIA PARA TABLET ANDROID
   ===================================================================== */
function toggleFullscreen() {
    playSound('wordPop');
    const docEl = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen;
        if (req) {
            req.call(docEl).catch(() => {});
        }
    } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) {
            exit.call(document).catch(() => {});
        }
    }
}

document.addEventListener('fullscreenchange', () => {
    const icon = document.getElementById('fullscreen-icon');
    if (icon) {
        icon.className = document.fullscreenElement ? 'ph-bold ph-corners-in' : 'ph-bold ph-corners-out';
    }
});

/* =====================================================================
   SINTETIZADOR DE EFEITOS SONOROS (Web Audio API)
   ===================================================================== */
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        if (type === 'wordPop') {
            const notes = [523.25, 659.25, 783.99];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.045);
                gain.gain.setValueAtTime(0.14, now + i * 0.045);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.18);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.045);
                osc.stop(now + i * 0.045 + 0.18);
            });
        } else if (type === 'crunch') {
            const notes = [260, 340, 290, 420];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0.12, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.09);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.09);
            });
        } else if (type === 'lensMagic') {
            const notes = [440, 554.37, 659.25, 880, 1108.73];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.055);
                gain.gain.setValueAtTime(0.15, now + idx * 0.055);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.055);
                osc.stop(now + idx * 0.055 + 0.35);
            });
        } else if (type === 'fanfare') {
            const notes = [392.00, 523.25, 659.25, 783.99];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                const start = now + (i === 3 ? 0.33 : i * 0.1);
                const dur = i === 3 ? 0.45 : 0.1;
                osc.frequency.setValueAtTime(freq, start);
                gain.gain.setValueAtTime(0.18, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + dur);
            });
        } else if (type === 'hint') {
            // Dica suave (não é "erro"): duas notas descendentes e baixinhas
            [659.25, 523.25].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.12);
                gain.gain.setValueAtTime(0.08, now + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.2);
            });
        } else if (type === 'pageFlip') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(560, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'windGust') {
            // Síntese procedural de sopro e rajada de vento
            const bufferSize = Math.floor(ctx.sampleRate * 1.6);
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            let lastOut = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(160, now);
            filter.frequency.exponentialRampToValueAtTime(1100, now + 0.7);
            filter.frequency.exponentialRampToValueAtTime(220, now + 1.6);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(0.24, now + 0.6);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
        }
    } catch (e) {}
}

function toggleSoundEffects() {
    soundEnabled = !soundEnabled;
    const icon = document.getElementById('sfx-icon');
    icon.className = soundEnabled ? 'ph-fill ph-music-notes' : 'ph-fill ph-speaker-slash';
    if (soundEnabled) playSound('wordPop');
}



/* =====================================================================
   1. ALFABETIZAÇÃO: APENAS NAS PALAVRAS DESTACADAS DO TEXTO
   ===================================================================== */
function speakWord(element, wordText, syllablesText, emoji) {
    playSound('wordPop');

    document.querySelectorAll('.literacy-word').forEach(el => el.classList.remove('word-speaking'));
    if (element) {
        element.classList.add('word-speaking');
        setTimeout(() => element.classList.remove('word-speaking'), 1100);
        const rect = element.getBoundingClientRect();
        spawnSparkles(rect.left + rect.width / 2, rect.top, emoji || '✨');
    }

    openPhonicsCard(wordText, syllablesText, emoji);
    stopReadingPage();
    pronounceWord(wordText);
}

let phonicsCurrentWord = '';

function pronounceWord(wordText) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordText.toLowerCase());
    utterance.lang = 'pt-BR';
    if (ptVoice) utterance.voice = ptVoice;
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
}

function openPhonicsCard(wordText, syllablesText, emoji) {
    phonicsCurrentWord = wordText;
    document.getElementById('phonics-emoji').textContent = emoji || '📖';
    document.getElementById('phonics-word').textContent = wordText;

    const syllablesEl = document.getElementById('phonics-syllables');
    syllablesEl.replaceChildren(...syllablesText.split('•').map(part => {
        const chip = document.createElement('span');
        chip.className = 'syllable-chip';
        chip.textContent = part.trim();
        return chip;
    }));

    const modal = document.getElementById('phonics-modal');
    const card = document.getElementById('phonics-card');
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}

function closePhonicsCard() {
    const modal = document.getElementById('phonics-modal');
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function replayPhonicsWord() {
    playSound('wordPop');
    pronounceWord(phonicsCurrentWord);
}


/* =====================================================================
   LEITURA GUIADA: NARRAÇÃO FRASE A FRASE COM DESTAQUE SINCRONIZADO
   ===================================================================== */
let readingSession = 0;

// Envolve cada frase do texto em <span class="sentence"> preservando as palavras interativas.
// Não quebra antes de minúscula: "bravura! — pensou o fidalgo" continua sendo uma frase só.
function splitPageTextIntoSentences(textEl) {
    const frag = document.createDocumentFragment();
    let current = null;
    const openSentence = () => {
        if (!current) {
            current = document.createElement('span');
            current.className = 'sentence';
            frag.appendChild(current);
        }
        return current;
    };
    const appendText = (text) => {
        if (!text) return;
        if (!current && !text.trim()) {
            frag.appendChild(document.createTextNode(text));
            return;
        }
        openSentence().appendChild(document.createTextNode(text));
    };

    Array.from(textEl.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const boundary = /([.!?…]+[”"»]?)(\s+)(?!(?:[—–]\s*)?[a-zà-ÿ])/g;
            let last = 0;
            let m;
            while ((m = boundary.exec(text)) !== null) {
                appendText(text.slice(last, m.index + m[1].length));
                current = null;
                frag.appendChild(document.createTextNode(m[2]));
                last = m.index + m[0].length;
            }
            appendText(text.slice(last));
        } else if (node.nodeName === 'BR') {
            current = null;
            frag.appendChild(node);
        } else {
            openSentence().appendChild(node);
        }
    });
    textEl.replaceChildren(frag);
}

// Texto falado: palavras-chave em minúsculas para a voz não soletrar "IMAGINAÇÃO" como sigla
function speechTextOf(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.literacy-word').forEach(w => { w.textContent = w.textContent.toLowerCase(); });
    return clone.textContent.replace(/\s+/g, ' ').trim();
}

function clearSentenceHighlight() {
    document.querySelectorAll('.sentence-reading').forEach(el => el.classList.remove('sentence-reading'));
}

function stopReadingPage() {
    readingSession++;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    clearSentenceHighlight();
    setReadingPageUI(false);
}

function toggleReadPageAloud() {
    if (!('speechSynthesis' in window)) return;

    if (isReadingPage) {
        stopReadingPage();
        return;
    }

    const textEl = document.getElementById(`page-text-${currentPage}`);
    if (!textEl) return;
    const sentences = Array.from(textEl.querySelectorAll('.sentence'));

    window.speechSynthesis.cancel();
    const session = ++readingSession;
    setReadingPageUI(true);

    const speakSentence = (i) => {
        if (session !== readingSession) return;
        clearSentenceHighlight();
        if (i >= sentences.length) {
            setReadingPageUI(false);
            return;
        }
        const sentence = sentences[i];
        const text = speechTextOf(sentence);
        if (!text) {
            speakSentence(i + 1);
            return;
        }
        sentence.classList.add('sentence-reading');
        scrollTextToSentence(sentence);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        if (ptVoice) utterance.voice = ptVoice;
        utterance.rate = 0.92;
        utterance.pitch = 1.05;
        // Pequena pausa entre as frases para respeitar o ritmo da leitura
        utterance.onend = () => setTimeout(() => speakSentence(i + 1), 250);
        utterance.onerror = () => {
            if (session === readingSession) stopReadingPage();
        };
        window.speechSynthesis.speak(utterance);
    };
    speakSentence(0);
}

function setReadingPageUI(reading) {
    isReadingPage = reading;
    const btn = document.getElementById('btn-tts');
    const label = document.getElementById('tts-label');
    const icon = document.getElementById('tts-icon');
    if (reading) {
        btn.classList.replace('bg-emerald-500', 'bg-rose-500');
        btn.classList.replace('border-emerald-700', 'border-rose-700');
        label.textContent = 'Parar Voz';
        icon.className = 'ph-fill ph-stop-circle text-base sm:text-lg animate-pulse';
    } else {
        btn.classList.replace('bg-rose-500', 'bg-emerald-500');
        btn.classList.replace('border-rose-700', 'border-emerald-700');
        label.textContent = 'Ouvir Página';
        icon.className = 'ph-fill ph-speaker-high text-base sm:text-lg';
    }
}



/* =====================================================================
   2. TROCA DE ILUSTRAÇÃO COM FEEDBACK INSTANTÂNEO DE CARREGAMENTO
   ===================================================================== */
const sceneBusy = {};
const SCENE_MIN_BUSY_MS = 280;   // curto o bastante para não cansar, longo o bastante para ser percebido
const SCENE_MAX_WAIT_MS = 8000;  // rede lenta: troca mesmo assim em vez de travar a página

function decodeImage(src) {
    const image = new Image();
    image.src = src;
    const ready = image.decode
        ? image.decode().catch(() => {})
        : new Promise(resolve => { image.onload = image.onerror = resolve; });
    return Promise.race([ready, new Promise(resolve => setTimeout(resolve, SCENE_MAX_WAIT_MS))]);
}

function warmImages(srcs) {
    srcs.forEach(src => { new Image().src = src; });
}

function setSceneImage(pageIdx, src) {
    const sceneImg = document.getElementById(`scene-bg-${pageIdx}`);
    if (!sceneImg || sceneImg.getAttribute('src') === src) return Promise.resolve();

    const stage = sceneImg.parentElement;
    const page = document.getElementById(`page-${pageIdx}`);
    sceneBusy[pageIdx] = true;
    stage.classList.add('scene-loading');
    stage.setAttribute('aria-busy', 'true');
    page.classList.add('page-busy');

    const minDelay = new Promise(resolve => setTimeout(resolve, SCENE_MIN_BUSY_MS));
    return Promise.all([decodeImage(src), minDelay]).then(() => {
        stage.classList.remove('scene-missing');
        sceneImg.src = src;
        sceneImg.classList.remove('scene-enter', 'character-joy', 'horse-happy');
        void sceneImg.offsetWidth;
        sceneImg.classList.add('scene-enter');
        stage.classList.remove('scene-loading');
        stage.removeAttribute('aria-busy');
        page.classList.remove('page-busy');
        sceneBusy[pageIdx] = false;
    });
}

/* Arte ainda não entregue: a cena mostra um aviso e as camadas mostram o emoji provisório,
   para o livro continuar navegável e testável enquanto o Nano-Banana trabalha */
function initArtFallbacks() {
    document.querySelectorAll('.scene-img').forEach(sceneImg => {
        const marcar = () => sceneImg.parentElement.classList.add('scene-missing');
        sceneImg.addEventListener('error', marcar);
        sceneImg.addEventListener('load', () => sceneImg.parentElement.classList.remove('scene-missing'));
        if (sceneImg.complete && sceneImg.naturalWidth === 0) marcar();
    });
    document.querySelectorAll('.camada img').forEach(layerImg => {
        const camada = layerImg.closest('.camada');
        const marcar = () => camada.classList.add('sem-arte');
        layerImg.addEventListener('error', marcar);
        if (layerImg.complete && layerImg.naturalWidth === 0) marcar();
    });
}

/* =====================================================================
   CAMADAS: visibilidade derivada do estado da página
   ===================================================================== */
function camadaVisivel(i, camada) {
    const st = pageState[i];
    const imag = lensImaginationState[i];
    const lente = camada.lente || 'real';
    if (lente === 'real' && imag) return false;
    if (lente === 'imag' && !imag) return false;
    if (camada.item && !st.usados.has(camada.item)) return false;
    if (camada.ate && st.usados.has(camada.ate)) return false;
    if (camada.quando && !camada.quando(st)) return false;
    return true;
}

function camadaEl(i, id) {
    return document.querySelector(`#page-${i} .camada[data-camada="${id}"]`);
}

function renderCamadas(i) {
    (cenaDe(i).camadas || []).forEach(camada => {
        const el = camadaEl(i, camada.id);
        if (!el) return;
        const visivel = camadaVisivel(i, camada);
        const estava = el.classList.contains('camada-visivel');
        el.classList.toggle('camada-visivel', visivel);
        if (visivel && !estava) {
            el.classList.remove('camada-entrou');
            void el.offsetWidth;
            el.classList.add('camada-entrou');
        }
    });
}

/* Animação de uma vez numa camada (cambalhota, pulo, estouro, atravessar) */
function dispararEfeito(i, id, efeito) {
    const el = camadaEl(i, id);
    if (!el) return;
    el.classList.remove(`efeito-${efeito}`);
    void el.offsetWidth;
    el.classList.add(`efeito-${efeito}`);
}

function updateLensUI(pageIdx, badgeText) {
    const isImag = lensImaginationState[pageIdx];
    const badge = document.getElementById(`lens-badge-${pageIdx}`);
    const btn = document.getElementById(`lens-btn-${pageIdx}`);
    const btnLabel = document.getElementById(`lens-btn-label-${pageIdx}`);

    badge.textContent = badgeText;
    badge.className = isImag ? BADGE_IMAG : BADGE_REAL;
    btnLabel.textContent = isImag ? "Voltar para a Lente da Realidade" : "Usar Lente da Imaginação!";
    btn.className = isImag ? LENS_BTN_IMAG : LENS_BTN_REAL;

    document.querySelectorAll(`#page-${pageIdx} .hotspot-real`).forEach(h => h.classList.toggle('hidden', isImag));
    document.querySelectorAll(`#page-${pageIdx} .hotspot-imag`).forEach(h => h.classList.toggle('hidden', !isImag));

    const cena = cenaDe(pageIdx);
    if (cena.aoTrocarLente) cena.aoTrocarLente(apiDaPagina(pageIdx));
}

/* Redesenha a cena da página a partir do estado (lente + progresso) */
function renderScene(pageIdx) {
    const scene = sceneFor(pageIdx);
    updateLensUI(pageIdx, scene.badge);
    renderCamadas(pageIdx);
    return setSceneImage(pageIdx, scene.src);
}

function inviteImagination(pageIdx) {
    // O leitor contempla a cena pelo tempo que quiser; o botão apenas convida à imaginação
    const btn = document.getElementById(`lens-btn-${pageIdx}`);
    if (btn) {
        btn.classList.add('animate-bounce');
        setTimeout(() => btn.classList.remove('animate-bounce'), 1400);
    }
}

/* =====================================================================
   3. LENTE DA REALIDADE ↔ LENTE DA IMAGINAÇÃO
   ===================================================================== */
function toggleLens(pageIdx, event, forceState = null) {
    if (sceneBusy[pageIdx]) return;
    lensImaginationState[pageIdx] = forceState !== null ? forceState : !lensImaginationState[pageIdx];
    const isImag = lensImaginationState[pageIdx];

    playSound(isImag ? 'lensMagic' : 'wordPop');

    const frame = document.getElementById(`frame-${pageIdx}`);
    const ripple = document.createElement('div');
    ripple.className = 'lens-ripple';
    frame.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    const coords = getEventCoords(event);
    if (coords) {
        spawnSparkles(coords.x, coords.y, isImag ? '✨' : '👓');
    }

    renderScene(pageIdx);
}

/* API entregue às ações personalizadas de cada livro (LIVRO.acoes, cena.aoTrocarLente) */
function apiDaPagina(i) {
    return {
        pagina: i,
        estado: pageState[i],
        ocupada: () => !!sceneBusy[i],
        lenteImaginacao: () => lensImaginationState[i],
        definirLente: (imag) => toggleLens(i, null, imag),
        renderizar: () => renderScene(i),
        efeito: (camadaId, efeito) => dispararEfeito(i, camadaId, efeito),
        convidarImaginacao: () => inviteImagination(i),
        elemento: (seletor) => document.querySelector(`#page-${i} ${seletor}`),
        som: playSound,
        falar: pronounceWord,
        faiscas: spawnSparkles
    };
}


/* =====================================================================
   4. MOTOR UNIFICADO DE DRAG-AND-DROP PARA TABLET ANDROID
   ===================================================================== */
function initDraggableCards() {
    const cards = document.querySelectorAll('.draggable-card');
    cards.forEach(card => {
        let startX = 0, startY = 0;
        let isDragging = false;
        let ghostEl = null;
        const targetZoneId = card.dataset.dropTarget;

        card.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            startY = e.clientY;
            isDragging = false;
            playSound('wordPop');

            const onPointerMove = (moveEv) => {
                const dx = moveEv.clientX - startX;
                const dy = moveEv.clientY - startY;

                if (!isDragging && Math.hypot(dx, dy) > 8) {
                    isDragging = true;
                    ghostEl = card.cloneNode(true);
                    ghostEl.style.position = 'fixed';
                    ghostEl.style.left = `${moveEv.clientX - card.offsetWidth / 2}px`;
                    ghostEl.style.top = `${moveEv.clientY - card.offsetHeight / 2}px`;
                    ghostEl.style.width = `${card.offsetWidth}px`;
                    ghostEl.style.zIndex = '9999';
                    ghostEl.style.pointerEvents = 'none';
                    ghostEl.style.transform = 'scale(1.1) rotate(-3deg)';
                    ghostEl.style.opacity = '0.92';
                    document.body.appendChild(ghostEl);
                }

                if (isDragging && ghostEl) {
                    ghostEl.style.left = `${moveEv.clientX - card.offsetWidth / 2}px`;
                    ghostEl.style.top = `${moveEv.clientY - card.offsetHeight / 2}px`;

                    const dropZone = document.getElementById(targetZoneId);
                    if (dropZone) {
                        const r = dropZone.getBoundingClientRect();
                        const inside = moveEv.clientX >= r.left && moveEv.clientX <= r.right &&
                                       moveEv.clientY >= r.top && moveEv.clientY <= r.bottom;
                        dropZone.classList.toggle('drop-hover', inside);
                    }
                }
            };

            const onPointerUp = (upEv) => {
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('pointercancel', onPointerUp);

                const dropZone = document.getElementById(targetZoneId);
                if (dropZone) dropZone.classList.remove('drop-hover');

                if (ghostEl) {
                    ghostEl.remove();
                    ghostEl = null;
                }

                if (isDragging && dropZone) {
                    const r = dropZone.getBoundingClientRect();
                    const droppedInside = upEv.clientX >= r.left && upEv.clientX <= r.right &&
                                          upEv.clientY >= r.top && upEv.clientY <= r.bottom;
                    if (droppedInside) {
                        triggerCardInteraction(card, { x: upEv.clientX, y: upEv.clientY });
                    }
                } else if (!isDragging) {
                    const r = dropZone ? dropZone.getBoundingClientRect() : card.getBoundingClientRect();
                    triggerCardInteraction(card, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
                }
            };

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        });
    });
}


function pageIndexOf(el) {
    const page = el.closest('.page-slide');
    return page ? parseInt(page.id.replace('page-', ''), 10) : currentPage;
}

function completeCard(card, coords) {
    card.classList.add('card-completed');
    if (coords) spawnSparkles(coords.x, coords.y, card.dataset.emoji || '✨');
}

function itemDe(i, id) {
    const c = cartoesDe(i);
    return c && c.itens.find(item => item.id === id);
}

function todosUsados(i) {
    const c = cartoesDe(i);
    return c && pageState[i].usados.size >= c.itens.length;
}

function triggerCardInteraction(card, coords) {
    const i = pageIndexOf(card);
    // Uma troca de ilustração já está em andamento: ignora o toque repetido
    if (sceneBusy[i]) return;

    const c = cartoesDe(i);
    const id = card.dataset.id;
    const item = itemDe(i, id) || {};
    const st = pageState[i];

    switch (c.tipo) {
        case 'progressivo':
            handleProgressiveDrop(i, card, coords);
            break;
        case 'ordem':
            handleOrdemPalavra(i, card, coords);
            break;
        case 'contagem':
            handleContagem(i, card, coords);
            break;
        case 'variante': {
            // Itens independentes, em qualquer ordem: a cena mostra a variante do último item
            completeCard(card, coords);
            st.usados.add(id);
            st.ultimo = id;
            playSound(item.som || 'wordPop');
            lensImaginationState[i] = false;
            renderScene(i).then(() => { if (todosUsados(i)) inviteImagination(i); });
            break;
        }
        case 'camadas': {
            // Cada item mostra/esconde camadas e pode disparar uma animação; qualquer ordem
            const primeiraVez = !st.usados.has(id);
            completeCard(card, coords);
            st.usados.add(id);
            st.ultimo = id;
            playSound(item.som || 'lensMagic');
            if (lensImaginationState[i]) lensImaginationState[i] = false;
            renderScene(i);
            if (item.animar) dispararEfeito(i, item.animar, item.efeito || 'pulo');
            if (primeiraVez && todosUsados(i)) {
                setTimeout(() => { playSound('fanfare'); inviteImagination(i); }, 500);
            }
            break;
        }
        case 'acao': {
            completeCard(card, coords);
            const acao = LIVRO.acoes && LIVRO.acoes[item.acao];
            if (acao) acao(apiDaPagina(i), { card, coords, item });
            break;
        }
        default: {
            // 'livre': só celebra; use com parcimônia (AGENTS §3.3)
            completeCard(card, coords);
            st.usados.add(id);
            const sceneImg = document.getElementById(`scene-bg-${i}`);
            sceneImg.classList.remove('character-joy', 'scene-enter');
            void sceneImg.offsetWidth;
            sceneImg.classList.add('character-joy');
            if (todosUsados(i)) {
                playSound('fanfare');
                inviteImagination(i);
            }
        }
    }
}

/* =====================================================================
   5. LÓGICA DAS INTERAÇÕES VISUAIS
   ===================================================================== */
function tapHotspot(hotspotEl, event) {
    const i = pageIndexOf(hotspotEl);
    const def = (cenaDe(i).hotspots || [])[Number(hotspotEl.dataset.hotspot)];
    if (!def) return;
    const coords = getEventCoords(event);
    if (def.acao && LIVRO.acoes && LIVRO.acoes[def.acao]) {
        LIVRO.acoes[def.acao](apiDaPagina(i), { coords, hotspot: def });
        return;
    }
    playSound('wordPop');
    const imag = lensImaginationState[i];
    if (coords) spawnSparkles(coords.x, coords.y, (imag && def.emojiImag) || def.emoji || '✨');
}

function progressCard(pageIdx, itemId) {
    return document.querySelector(`#page-${pageIdx} .draggable-card[data-id="${itemId}"]`);
}


function nudge(el) {
    if (!el) return;
    el.classList.remove('card-nudge');
    void el.offsetWidth;
    el.classList.add('card-nudge');
}

/* Destaca o próximo item da sequência e esmaece os que ainda vão chegar */


/* Destaca o próximo item da sequência e esmaece os que ainda vão chegar */
function updateProgressHints(pageIdx) {
    const c = cartoesDe(pageIdx);
    const st = pageState[pageIdx];
    const expected = c.ordem[st.usados.size];
    c.ordem.forEach(id => {
        const card = progressCard(pageIdx, id);
        if (!card) return;
        card.classList.toggle('card-next', id === expected);
        card.classList.toggle('card-waiting', !st.usados.has(id) && id !== expected);
    });
}

// Ilustrações cumulativas (vestir o cavaleiro, cuidar do Rocinante): os itens seguem a ordem do texto
function handleProgressiveDrop(pageIdx, card, coords) {
    const c = cartoesDe(pageIdx);
    const st = pageState[pageIdx];
    const itemId = card.dataset.id;

    if (st.usados.has(itemId)) {
        if (coords) spawnSparkles(coords.x, coords.y, card.dataset.emoji || '✨');
        return;
    }

    const expected = c.ordem[st.usados.size];
    if (itemId !== expected) {
        // Fora de ordem: dica gentil apontando o item certo, sem trocar a ilustração
        playSound('hint');
        nudge(card);
        nudge(progressCard(pageIdx, expected));
        return;
    }

    st.usados.add(itemId);
    completeCard(card, coords);
    updateProgressHints(pageIdx);

    const finished = st.usados.size === c.ordem.length;
    playSound(finished ? 'fanfare' : (c.som || 'wordPop'));

    // Vestir e cuidar acontecem no mundo real: volta para a Lente da Realidade se preciso
    lensImaginationState[pageIdx] = false;
    renderScene(pageIdx).then(() => {
        if (finished) inviteImagination(pageIdx);
    });
}

// Palavras na ordem certa (ex.: a carta que Sancho esqueceu): cada acerto é lido em voz alta
function handleOrdemPalavra(pageIdx, card, coords) {
    const c = cartoesDe(pageIdx);
    const st = pageState[pageIdx];
    const id = card.dataset.id;
    if (st.usados.has(id)) return;

    const expected = c.ordem[st.usados.size];
    if (id !== expected) {
        playSound('hint');
        nudge(card);
        return;
    }

    st.usados.add(id);
    completeCard(card, coords);
    pronounceWord(card.dataset.word);

    const faixa = document.getElementById(`faixa-${pageIdx}`);
    const vazia = faixa.querySelector('.faixa-vazia');
    if (vazia) vazia.remove();
    const escrita = document.createElement('span');
    escrita.className = 'palavra-escrita';
    escrita.textContent = card.dataset.word;
    faixa.appendChild(escrita);

    if (st.usados.size === c.ordem.length) {
        setTimeout(() => playSound('fanfare'), 600);
        lensImaginationState[pageIdx] = false;
        renderScene(pageIdx).then(() => inviteImagination(pageIdx));
    } else {
        playSound('wordPop');
    }
}

// Contagem (ex.: as cabras atravessando o rio): cada toque traz a próxima camada e fala o número
function handleContagem(pageIdx, card, coords) {
    const c = cartoesDe(pageIdx);
    const st = pageState[pageIdx];
    const n = st.usados.size;
    if (n >= c.sequencia.length) {
        if (coords) spawnSparkles(coords.x, coords.y, card.dataset.emoji || '✨');
        return;
    }
    const id = c.sequencia[n];
    st.usados.add(id);
    if (coords) spawnSparkles(coords.x, coords.y, card.dataset.emoji || '✨');
    if (lensImaginationState[pageIdx]) lensImaginationState[pageIdx] = false;
    renderScene(pageIdx);
    dispararEfeito(pageIdx, id, c.efeito || 'atravessar');
    if (c.falas && c.falas[n]) pronounceWord(c.falas[n]);
    if (st.usados.size === c.sequencia.length) {
        card.classList.add('card-completed');
        setTimeout(() => { playSound('fanfare'); inviteImagination(pageIdx); }, 900);
    } else {
        playSound('wordPop');
    }
}


/* =====================================================================
   PARTÍCULAS VISUAIS, NAVEGAÇÃO DE PÁGINAS E SWIPE PARA TABLET
   ===================================================================== */
function getEventCoords(event) {
    if (!event) return null;
    if (event.clientX && event.clientY) {
        return { x: event.clientX, y: event.clientY };
    }
    if (event.touches && event.touches[0]) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    return null;
}

function spawnSparkles(x, y, emoji = '✨') {
    for (let i = 0; i < 6; i++) {
        const el = document.createElement('div');
        el.className = 'tap-sparkle text-2xl';
        el.textContent = emoji;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        const angle = (Math.PI * 2 * i) / 6;
        const dist = 40 + Math.random() * 30;
        el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        el.style.setProperty('--ty', `${Math.sin(angle) * dist - 16}px`);
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 850);
    }
}

function renderPaginationDots() {
    const container = document.getElementById('page-dots');
    container.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.onclick = () => goToPage(i);
        dot.className = i === currentPage
            ? 'w-7 h-3 rounded-full bg-amber-500 transition-all'
            : 'w-3 h-3 rounded-full bg-amber-300 hover:bg-amber-400 transition-all';
        dot.setAttribute('aria-label', `Ir para página ${i + 1}`);
        container.appendChild(dot);
    }
}

/* =====================================================================
   ROLAGEM INDEPENDENTE DO TEXTO
   ===================================================================== */
function textScrollerOf(pageIdx) {
    return document.querySelector(`#page-${pageIdx} .page-text-scroll`);
}

// Mostra o esmaecido e a seta "continua" quando ainda há texto abaixo
function updateScrollHint(pageIdx) {
    const scroller = textScrollerOf(pageIdx);
    if (!scroller) return;
    const more = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight > 12;
    scroller.parentElement.classList.toggle('has-more', more);
}

function scrollTextToSentence(sentence) {
    const scroller = sentence.closest('.page-text-scroll');
    if (!scroller) return;
    const s = sentence.getBoundingClientRect();
    const c = scroller.getBoundingClientRect();
    const margin = 32;
    if (s.top < c.top + margin || s.bottom > c.bottom - margin) {
        scroller.scrollBy({ top: s.top - c.top - c.height / 3, behavior: 'smooth' });
    }
}

function initTextScrolling() {
    document.querySelectorAll('.page-text').forEach(pageText => {
        const scroller = pageText.querySelector('.page-text-scroll');
        const fade = document.createElement('div');
        fade.className = 'page-text-fade';
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'scroll-more';
        more.setAttribute('aria-label', 'Continuar lendo');
        more.innerHTML = '<i class="ph-bold ph-arrow-down"></i>';
        more.addEventListener('click', () => {
            playSound('wordPop');
            scroller.scrollBy({ top: scroller.clientHeight * 0.7, behavior: 'smooth' });
        });
        pageText.append(fade, more);
        scroller.addEventListener('scroll', () => updateScrollHint(pageIndexOf(scroller)), { passive: true });
    });
    window.addEventListener('resize', () => updateScrollHint(currentPage));
}

/* =====================================================================
   VIRADA DE PÁGINA ANIMADA
   Cópias inertes (sem ids) das páginas antiga e nova formam uma folha 3D
   que gira em torno da lombada; a página real já trocou por baixo.
   ===================================================================== */
const TURN_MS = 750;
let isTurning = false;

function inertClone(el) {
    const clone = el.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
    clone.classList.remove('page-hidden');
    return clone;
}

function rectIn(el, container) {
    const r = el.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    return { left: r.left - c.left, top: r.top - c.top, width: r.width, height: r.height };
}

function placeBox(box, rect) {
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
}

function copyTextScroll(fromPage, clone) {
    const src = fromPage.querySelector('.page-text-scroll');
    const dst = clone.querySelector('.page-text-scroll') || (clone.classList.contains('page-text-scroll') ? clone : null);
    if (src && dst) dst.scrollTop = src.scrollTop;
}

function animateTurn(oldSection, newSection, forward, showNew) {
    const viewport = document.getElementById('pages-viewport');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !viewport.animate) {
        showNew();
        return Promise.resolve();
    }

    const twoPages = window.matchMedia('(orientation: landscape)').matches;
    const oldArt = oldSection.querySelector('.page-art');
    const oldText = oldSection.querySelector('.page-text');
    const rects = {
        art: rectIn(oldArt, viewport),
        text: rectIn(oldText, viewport),
        spread: rectIn(oldSection, viewport)
    };
    const oldClones = { art: inertClone(oldArt), text: inertClone(oldText), spread: inertClone(oldSection) };

    showNew();

    const newClones = {
        art: inertClone(newSection.querySelector('.page-art')),
        text: inertClone(newSection.querySelector('.page-text')),
        spread: inertClone(newSection)
    };
    const blank = () => { const b = document.createElement('div'); b.className = 'turn-blank'; return b; };

    // Paisagem: só a folha da direita (avançar) ou da esquerda (voltar) gira.
    // Retrato: a folha inteira gira pela borda esquerda, como num leitor de uma página.
    let statics, leafRect, origin, front, back, from, to;
    if (twoPages) {
        if (forward) {
            statics = [[oldClones.art, rects.art]];
            leafRect = rects.text; origin = 'left center';
            front = oldClones.text; back = newClones.art; from = 0; to = -180;
        } else {
            statics = [[oldClones.text, rects.text]];
            leafRect = rects.art; origin = 'right center';
            front = oldClones.art; back = newClones.text; from = 0; to = 180;
        }
    } else if (forward) {
        statics = [];
        leafRect = rects.spread; origin = 'left center';
        front = oldClones.spread; back = blank(); from = 0; to = -180;
    } else {
        statics = [[oldClones.spread, rects.spread]];
        leafRect = rects.spread; origin = 'left center';
        front = newClones.spread; back = blank(); from = -180; to = 0;
    }

    const layer = document.createElement('div');
    layer.className = 'turn-layer';
    statics.forEach(([clone, rect]) => {
        const box = document.createElement('div');
        box.className = 'turn-static';
        placeBox(box, rect);
        box.appendChild(clone);
        layer.appendChild(box);
    });

    const leaf = document.createElement('div');
    leaf.className = 'turn-leaf';
    placeBox(leaf, leafRect);
    leaf.style.transformOrigin = origin;
    leaf.style.transform = `rotateY(${from}deg)`;
    const shades = [];
    [[front, 'turn-front'], [back, 'turn-back']].forEach(([content, cls]) => {
        const face = document.createElement('div');
        face.className = `turn-face ${cls}`;
        face.appendChild(content);
        const shade = document.createElement('div');
        shade.className = 'turn-shade';
        shade.style.background = cls === 'turn-front'
            ? 'linear-gradient(to left, rgba(0,0,0,0.35), rgba(0,0,0,0.05))'
            : 'linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05))';
        face.appendChild(shade);
        shades.push(shade);
        leaf.appendChild(face);
    });
    layer.appendChild(leaf);
    viewport.appendChild(layer);

    // Preserva a posição de rolagem do texto nas cópias
    [oldClones.text, oldClones.spread].forEach(c => copyTextScroll(oldSection, c));

    const easing = 'cubic-bezier(0.45, 0.05, 0.35, 1)';
    const turn = leaf.animate(
        [
            { transform: `rotateY(${from}deg)` },
            { transform: `rotateY(${(from + to) / 2}deg) translateZ(30px)`, offset: 0.5 },
            { transform: `rotateY(${to}deg)` }
        ],
        { duration: TURN_MS, easing, fill: 'forwards' }
    );
    shades.forEach(shade => shade.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }],
        { duration: TURN_MS, easing, fill: 'forwards' }
    ));

    return turn.finished.catch(() => {}).then(() => layer.remove());
}


function goToPage(index, options = {}) {
    if (index < 0 || index >= totalPages || index === currentPage || isTurning) return;
    closePhonicsCard();
    stopReadingPage();

    const animate = options.animate !== false;
    if (animate) playSound('pageFlip');

    const oldSection = document.getElementById(`page-${currentPage}`);
    const newSection = document.getElementById(`page-${index}`);
    const forward = index > currentPage;
    const showNew = () => {
        oldSection.classList.add('page-hidden');
        newSection.classList.remove('page-hidden');
        const scroller = newSection.querySelector('.page-text-scroll');
        if (scroller) scroller.scrollTop = 0;
    };

    currentPage = index;
    if (animate) {
        isTurning = true;
        animateTurn(oldSection, newSection, forward, showNew).then(() => {
            isTurning = false;
            updateScrollHint(currentPage);
        });
    } else {
        showNew();
    }
    updateScrollHint(currentPage);

    document.getElementById('btn-prev').disabled = currentPage === 0;
    document.getElementById('btn-next').disabled = currentPage === totalPages - 1;
    document.getElementById('page-counter-text').textContent = `Página ${currentPage + 1} de ${totalPages}`;

    renderPaginationDots();

    // Aquece o cache com todas as ilustrações desta página e da próxima
    warmImages(allSceneSrcs(currentPage));
    if (currentPage + 1 < totalPages) warmImages(allSceneSrcs(currentPage + 1));
}

function nextPage() {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
}

function prevPage() {
    if (currentPage > 0) goToPage(currentPage - 1);
}

/* =====================================================================
   EVENTOS (delegados: o HTML montado não tem onclick embutido)
   ===================================================================== */
function initEventos() {
    document.addEventListener('click', (e) => {
        const palavra = e.target.closest('.literacy-word');
        if (palavra) {
            speakWord(palavra, palavra.dataset.palavra, palavra.dataset.silabas, palavra.dataset.emoji);
            return;
        }
        const lente = e.target.closest('[data-lente]');
        if (lente) {
            toggleLens(Number(lente.dataset.lente), e);
            return;
        }
        const hotspot = e.target.closest('.scene-hotspot');
        if (hotspot) {
            tapHotspot(hotspot, e);
            return;
        }
        const nav = e.target.closest('[data-nav]');
        if (nav) {
            if (nav.dataset.nav === 'next') nextPage();
            else goToPage(Number(nav.dataset.nav));
        }
    });

    document.getElementById('btn-prev').addEventListener('click', prevPage);
    document.getElementById('btn-next').addEventListener('click', nextPage);
    document.getElementById('btn-tts').addEventListener('click', toggleReadPageAloud);
    document.getElementById('btn-sfx').addEventListener('click', toggleSoundEffects);
    document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
    document.getElementById('phonics-card').addEventListener('click', replayPhonicsWord);

    // Cartão de alfabetização: fecha só com toque FORA do cartão (no fundo escurecido) ou com Esc
    document.getElementById('phonics-modal').addEventListener('click', (e) => {
        if (e.target.id === 'phonics-modal') closePhonicsCard();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePhonicsCard();
        if (document.getElementById('phonics-modal').classList.contains('is-open')) return;
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
    });

    // Swipe para virar páginas no tablet
    let touchStartX = 0, touchStartY = 0, swipeFromCard = false;
    const viewportEl = document.getElementById('pages-viewport');
    viewportEl.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            // Arrastar um cartão até a cena não pode virar a página
            swipeFromCard = !!e.target.closest('.draggable-card');
        }
    }, { passive: true });

    viewportEl.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1 && !swipeFromCard) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.8) {
                if (dx < 0) nextPage();
                else prevPage();
            }
        }
    }, { passive: true });
}

/* =====================================================================
   INICIALIZAÇÃO
   ===================================================================== */
function iniciarLivro() {
    montarLivro();
    initEventos();
    initArtFallbacks();
    renderPaginationDots();
    initDraggableCards();
    document.getElementById('btn-prev').disabled = true;

    for (let i = 0; i < totalPages; i++) {
        const textEl = document.getElementById(`page-text-${i}`);
        if (textEl) splitPageTextIntoSentences(textEl);
        const c = cartoesDe(i);
        if (c && c.tipo === 'progressivo') updateProgressHints(i);
        renderCamadas(i);
    }
    initTextScrolling();
    updateScrollHint(currentPage);
    warmImages(allSceneSrcs(0).concat(totalPages > 1 ? allSceneSrcs(1) : []));

    // Navegação direta e testes automatizados (?page=1&imag=1)
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page'));
    if (!isNaN(p) && p >= 0 && p < totalPages) {
        goToPage(p, { animate: false });
        if (params.get('imag') === '1' || params.get('imag') === 'true') {
            toggleLens(p, null, true);
        }
    }

    // Leitura offline: registra o service worker quando servido por http(s) (ex.: GitHub Pages)
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
        navigator.serviceWorker.register(LIVRO.serviceWorker || '../sw.js').catch(() => {});
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarLivro);
} else {
    iniciarLivro();
}
