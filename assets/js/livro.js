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

/* Cartões da página; uma tradução pode trocar as palavras de um cartão do tipo 'ordem' (a assinatura
   tem outra quantidade de palavras em cada idioma) ou 'pedido' (as pegadinhas mudam com o idioma) */
function cartoesDe(i) {
    const c = cenaDe(i).cartoes || null;
    const p = c && traducaoDaPagina(i);
    return p && p.cartoes ? { ...c, ...p.cartoes } : c;
}

function escapeHtml(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* =====================================================================
   IDIOMAS: o português é o original (window.LIVRO); as traduções ficam em
   <livro>/traducoes/parte-N.<idioma>.js (window.TRADUCOES, ver AGENTS.md §2.8).
   Cada idioma pode ter a sua narração gravada (vozes.js, `idioma`); sem ela, lê a voz do aparelho.
   ===================================================================== */
const PT = 'pt-BR';
const PREF_IDIOMA = 'cv-idioma';
const PREF_MAIUSCULAS = 'cv-maiusculas';

/* Rascunho (`rascunho: true` no LIVRO): livro em produção, aberto só pela lista de rascunhos de sobre.html.
   Mostra o selo "Rascunho", lê só com a voz do aparelho em português (a narração gravada e as traduções
   da parte publicada seriam de outro texto; `?narracao=1` libera a gravação para a escuta da fase 6) e
   guarda o progresso à parte, sem mexer no "Continuar lendo" da estante. */
const RASCUNHO = !!LIVRO.rascunho;
const NARRACAO_NO_RASCUNHO = RASCUNHO && new URLSearchParams(window.location.search).get('narracao') === '1';

function chaveProgressoLivro() {
    const id = LIVRO.id || `${LIVRO.obra || 'livro'}-parte-${LIVRO.parte || 1}`;
    return 'cv-progresso-' + id.toLowerCase().replace(/[^a-z0-9]+/g, '-') + (RASCUNHO ? '-rascunho' : '');
}
const ICONES = LIVRO.icones || '../assets/icones/';

const IDIOMAS = {
    'pt-BR': {
        nome: 'Português', bandeira: 'br', lang: 'pt-BR', voz: 'pt-BR', vozesBoas: /luciana|francisca|thalita|felipe|antonio|daniel/,
        ui: {
            lerNesteIdioma: 'Ler em português',
            rascunho: '📝 Rascunho', biblioteca: 'Voltar à biblioteca', bibliotecaTitulo: 'Voltar à Biblioteca Clássicos Vivos',
            parte: (n, total) => `Parte ${n} de ${total}`,
            ouvirPagina: 'Ouvir Página', pararVoz: 'Parar Voz', ouvirTitulo: 'Ouvir a página inteira', ouvirParagrafo: 'Ouvir este parágrafo', pausarParagrafo: 'Pausar a leitura',
            maiusculas: 'Mostrar o texto todo em LETRAS MAIÚSCULAS', minusculas: 'Mostrar o texto com letras normais',
            vozTitulo: 'Escolher a voz e a velocidade da leitura', vozAria: 'Escolher a voz',
            sfxTitulo: 'Ativar/Desativar Efeitos Sonoros', sfxAria: 'Efeitos sonoros',
            telaCheiaTitulo: 'Modo Tela Cheia para Tablet', telaCheiaAria: 'Tela cheia',
            anterior: 'Anterior', proxima: 'Próxima',
            pagina: (n, total) => `Página ${n} de ${total}`, secaoPagina: (n) => `Página ${n}`, irParaPagina: (n) => `Ir para página ${n}`,
            abrirLivro: 'Abrir o Livro!', lerDeNovo: 'Ler de Novo', bibliotecaBotao: 'Biblioteca', continuarHistoria: 'Continuar a história', fim: '🎉 Fim!',
            comecarDoInicio: 'Começar do início', continuarPagina: (n) => `Continuar da Página ${n}`,
            reiniciarPagina: 'Recomeçar', reiniciarPaginaTitulo: 'Recomeçar as brincadeiras desta página',
            livroAtualizado: 'Livro atualizado! ✨', atualizarBtn: 'Atualizar',
            etiqueta: '✨ Toque nas PALAVRAS MAIÚSCULAS para ouvir!', etiquetaMaiusculas: '✨ Toque nas PALAVRAS AMARELAS para ouvir!',
            lenteImag: 'Usar Lente da Imaginação!', lenteReal: 'Voltar para a Lente da Realidade',
            lenteCurtaReal: 'Realidade', lenteCurtaImag: 'Imaginação',
            barrasAuto: 'Esconder os botões (voltam com um toque nos cantinhos)', barrasFixas: 'Deixar os botões sempre à vista',
            mostrarTopo: 'Mostrar os botões de cima', mostrarBase: 'Mostrar os botões de baixo',
            ilustracaoACaminho: 'Ilustração a caminho', faixaVazia: 'Toque nas palavras na ordem certa',
            continuarLendo: 'Continuar lendo', ouvirPalavra: 'Ouvir a palavra de novo', silabas: 'Sílabas',
            vozDaLeitura: '🗣️ Voz da leitura', fechar: 'Fechar',
            narracaoGravada: '🎙️ Narração gravada', vozesDoAparelho: '📱 Vozes deste aparelho', velocidade: '⏱️ Velocidade',
            normal: '🐇 Normal', devagar: '🐢 Devagar',
            semVoz: 'Nenhuma voz em português foi encontrada neste aparelho. Peça a um adulto para instalar a voz <strong>Português (Brasil)</strong> nas configurações de "Texto para fala" do tablet.',
            gravadaEmBreve: '',
            semTraducao: '🌍 Esta parte ainda não foi traduzida. Por enquanto, ela fica em português.',
            recomendada: '⭐ recomendada', offline: 'funciona offline', online: 'precisa de internet', gravada: 'gravada', maisNatural: 'mais natural',
            previa: '(prévia: só algumas páginas)', emProducao: '(em produção para esta parte)',
            amostraDe: (nome) => `Ouvir amostra de ${nome}`, amostra: 'Olá! Eu vou ler esta história com você.',
            atividadeRotulo: 'Atividade', ouvirInstrucao: 'Ouvir instrução da atividade', atividadeOpcional: 'Atividade opcional',
            lenteTrancada: '🔒 Termine a atividade para abrir a Imaginação!', pedidoRotulo: 'Pedido:'
        }
    },
    en: {
        nome: 'English', bandeira: 'gb', lang: 'en-GB', voz: 'en-GB', vozesBoas: /libby|sonia|ryan|maisie|serena|daniel|kate|arthur/,
        ui: {
            lerNesteIdioma: 'Read in English',
            rascunho: '📝 Draft', biblioteca: 'Back to the library', bibliotecaTitulo: 'Back to the Clássicos Vivos Library',
            parte: (n, total) => `Part ${n} of ${total}`,
            ouvirPagina: 'Listen', pararVoz: 'Stop', ouvirTitulo: 'Listen to the whole page', ouvirParagrafo: 'Listen to this paragraph', pausarParagrafo: 'Pause reading',
            maiusculas: 'Show all the text in CAPITAL LETTERS', minusculas: 'Show the text in normal letters',
            vozTitulo: 'Choose the reading voice and speed', vozAria: 'Choose the voice',
            sfxTitulo: 'Sound effects on/off', sfxAria: 'Sound effects',
            telaCheiaTitulo: 'Full screen for tablets', telaCheiaAria: 'Full screen',
            anterior: 'Back', proxima: 'Next',
            pagina: (n, total) => `Page ${n} of ${total}`, secaoPagina: (n) => `Page ${n}`, irParaPagina: (n) => `Go to page ${n}`,
            abrirLivro: 'Open the Book!', lerDeNovo: 'Read Again', bibliotecaBotao: 'Library', continuarHistoria: 'Continue the story', fim: '🎉 The End!',
            comecarDoInicio: 'Start from the beginning', continuarPagina: (n) => `Continue from Page ${n}`,
            reiniciarPagina: 'Restart', reiniciarPaginaTitulo: 'Reset activities on this page',
            livroAtualizado: 'Book updated! ✨', atualizarBtn: 'Update',
            etiqueta: '✨ Tap the CAPITAL WORDS to hear them!', etiquetaMaiusculas: '✨ Tap the YELLOW WORDS to hear them!',
            lenteImag: 'Use the Imagination Lens!', lenteReal: 'Back to the Reality Lens',
            lenteCurtaReal: 'Reality', lenteCurtaImag: 'Imagination',
            barrasAuto: 'Hide the buttons (tap a corner to bring them back)', barrasFixas: 'Keep the buttons always visible',
            mostrarTopo: 'Show the top buttons', mostrarBase: 'Show the bottom buttons',
            ilustracaoACaminho: 'Picture on its way', faixaVazia: 'Tap the words in the right order',
            continuarLendo: 'Keep reading', ouvirPalavra: 'Hear the word again', silabas: 'Syllables',
            vozDaLeitura: '🗣️ Reading voice', fechar: 'Close',
            narracaoGravada: '🎙️ Recorded narration', vozesDoAparelho: '📱 Voices on this device', velocidade: '⏱️ Speed',
            normal: '🐇 Normal', devagar: '🐢 Slow',
            semVoz: 'No English voice was found on this device. Ask a grown-up to install an <strong>English</strong> voice in the tablet\'s "Text-to-speech" settings.',
            gravadaEmBreve: '🎙️ A recorded narration in English is coming soon. For now, the device\'s voice reads the story.',
            semTraducao: '🌍 This part has not been translated into English yet. For now, it stays in Portuguese.',
            recomendada: '⭐ recommended', offline: 'works offline', online: 'needs internet', gravada: 'recorded', maisNatural: 'most natural',
            previa: '(preview: only some pages)', emProducao: '(in production for this part)',
            amostraDe: (nome) => `Hear a sample of ${nome}`, amostra: 'Hello! I am going to read this story with you.',
            atividadeRotulo: 'Activity', ouvirInstrucao: 'Listen to activity instructions', atividadeOpcional: 'Optional activity',
            lenteTrancada: '🔒 Finish the activity to open the Imagination!', pedidoRotulo: 'Wants:'
        }
    },
    fr: {
        nome: 'Français', bandeira: 'fr', lang: 'fr-FR', voz: 'fr-FR', vozesBoas: /denise|henri|eloise|vivienne|remy|thomas|amelie|audrey/,
        ui: {
            lerNesteIdioma: 'Lire en français',
            rascunho: '📝 Brouillon', biblioteca: 'Retour à la bibliothèque', bibliotecaTitulo: 'Retour à la bibliothèque Clássicos Vivos',
            parte: (n, total) => `Partie ${n} sur ${total}`,
            ouvirPagina: 'Écouter', pararVoz: 'Arrêter', ouvirTitulo: 'Écouter toute la page', ouvirParagrafo: 'Écouter ce paragraphe', pausarParagrafo: 'Mettre la lecture en pause',
            maiusculas: 'Afficher tout le texte en LETTRES MAJUSCULES', minusculas: 'Afficher le texte en lettres normales',
            vozTitulo: 'Choisir la voix et la vitesse de lecture', vozAria: 'Choisir la voix',
            sfxTitulo: 'Activer/désactiver les effets sonores', sfxAria: 'Effets sonores',
            telaCheiaTitulo: 'Plein écran pour tablette', telaCheiaAria: 'Plein écran',
            anterior: 'Précédente', proxima: 'Suivante',
            pagina: (n, total) => `Page ${n} sur ${total}`, secaoPagina: (n) => `Page ${n}`, irParaPagina: (n) => `Aller à la page ${n}`,
            abrirLivro: 'Ouvrir le livre !', lerDeNovo: 'Relire', bibliotecaBotao: 'Bibliothèque', continuarHistoria: 'Continuer l’histoire', fim: '🎉 Fin !',
            comecarDoInicio: 'Recommencer depuis le début', continuarPagina: (n) => `Continuer à la page ${n}`,
            reiniciarPagina: 'Recommencer', reiniciarPaginaTitulo: 'Réinitialiser les activités de cette page',
            livroAtualizado: 'Livre mis à jour ! ✨', atualizarBtn: 'Mettre à jour',
            etiqueta: '✨ Touche les MOTS EN MAJUSCULES pour les écouter !', etiquetaMaiusculas: '✨ Touche les MOTS JAUNES pour les écouter !',
            lenteImag: 'Utiliser la Lentille de l’Imagination !', lenteReal: 'Revenir à la Lentille de la Réalité',
            lenteCurtaReal: 'Réalité', lenteCurtaImag: 'Imagination',
            barrasAuto: 'Cacher les boutons (touchez un coin pour les revoir)', barrasFixas: 'Garder les boutons toujours visibles',
            mostrarTopo: 'Afficher les boutons du haut', mostrarBase: 'Afficher les boutons du bas',
            ilustracaoACaminho: 'Illustration en route', faixaVazia: 'Touche les mots dans le bon ordre',
            continuarLendo: 'Continuer la lecture', ouvirPalavra: 'Réécouter le mot', silabas: 'Syllabes',
            vozDaLeitura: '🗣️ Voix de lecture', fechar: 'Fermer',
            narracaoGravada: '🎙️ Narration enregistrée', vozesDoAparelho: '📱 Voix de cet appareil', velocidade: '⏱️ Vitesse',
            normal: '🐇 Normale', devagar: '🐢 Lente',
            semVoz: 'Aucune voix française n’a été trouvée sur cet appareil. Demande à un adulte d’installer une voix <strong>Français</strong> dans les réglages « Synthèse vocale » de la tablette.',
            gravadaEmBreve: '🎙️ Une narration enregistrée en français arrive bientôt. Pour l’instant, c’est la voix de l’appareil qui lit l’histoire.',
            semTraducao: '🌍 Cette partie n’est pas encore traduite en français. Pour l’instant, elle reste en portugais.',
            recomendada: '⭐ recommandée', offline: 'fonctionne hors ligne', online: 'besoin d’internet', gravada: 'enregistrée', maisNatural: 'plus naturelle',
            previa: '(aperçu : quelques pages)', emProducao: '(en préparation pour cette partie)',
            amostraDe: (nome) => `Écouter un extrait de ${nome}`, amostra: 'Bonjour ! Je vais lire cette histoire avec toi.',
            atividadeRotulo: 'Activité', ouvirInstrucao: "Écouter l'instruction de l'activité", atividadeOpcional: 'Activité facultative',
            lenteTrancada: '🔒 Termine l’activité pour ouvrir l’Imagination !', pedidoRotulo: 'Demande :'
        }
    },
    es: {
        nome: 'Español', bandeira: 'es', lang: 'es-ES', voz: 'es-ES', vozesBoas: /elvira|alvaro|ximena|monica|jorge|lucia|pablo|helena/,
        ui: {
            lerNesteIdioma: 'Leer en español',
            rascunho: '📝 Borrador', biblioteca: 'Volver a la biblioteca', bibliotecaTitulo: 'Volver a la Biblioteca Clássicos Vivos',
            parte: (n, total) => `Parte ${n} de ${total}`,
            ouvirPagina: 'Escuchar', pararVoz: 'Parar', ouvirTitulo: 'Escuchar toda la página', ouvirParagrafo: 'Escuchar este párrafo', pausarParagrafo: 'Pausar la lectura',
            maiusculas: 'Mostrar todo el texto en LETRAS MAYÚSCULAS', minusculas: 'Mostrar el texto con letras normales',
            vozTitulo: 'Elegir la voz y la velocidad de lectura', vozAria: 'Elegir la voz',
            sfxTitulo: 'Activar/desactivar los efectos de sonido', sfxAria: 'Efectos de sonido',
            telaCheiaTitulo: 'Pantalla completa para tableta', telaCheiaAria: 'Pantalla completa',
            anterior: 'Anterior', proxima: 'Siguiente',
            pagina: (n, total) => `Página ${n} de ${total}`, secaoPagina: (n) => `Página ${n}`, irParaPagina: (n) => `Ir a la página ${n}`,
            abrirLivro: '¡Abrir el libro!', lerDeNovo: 'Leer otra vez', bibliotecaBotao: 'Biblioteca', continuarHistoria: 'Seguir la historia', fim: '🎉 ¡Fin!',
            comecarDoInicio: 'Empezar desde el inicio', continuarPagina: (n) => `Continuar desde la página ${n}`,
            reiniciarPagina: 'Reiniciar', reiniciarPaginaTitulo: 'Reiniciar las actividades de esta página',
            livroAtualizado: '¡Libro actualizado! ✨', atualizarBtn: 'Actualizar',
            etiqueta: '✨ ¡Toca las PALABRAS EN MAYÚSCULAS para oírlas!', etiquetaMaiusculas: '✨ ¡Toca las PALABRAS AMARILLAS para oírlas!',
            lenteImag: '¡Usar la Lente de la Imaginación!', lenteReal: 'Volver a la Lente de la Realidad',
            lenteCurtaReal: 'Realidad', lenteCurtaImag: 'Imaginación',
            barrasAuto: 'Ocultar los botones (toca una esquina para volver a verlos)', barrasFixas: 'Dejar los botones siempre a la vista',
            mostrarTopo: 'Mostrar los botones de arriba', mostrarBase: 'Mostrar los botones de abajo',
            ilustracaoACaminho: 'Ilustración en camino', faixaVazia: 'Toca las palabras en el orden correcto',
            continuarLendo: 'Seguir leyendo', ouvirPalavra: 'Oír la palabra otra vez', silabas: 'Sílabas',
            vozDaLeitura: '🗣️ Voz de lectura', fechar: 'Cerrar',
            narracaoGravada: '🎙️ Narración grabada', vozesDoAparelho: '📱 Voces de este aparato', velocidade: '⏱️ Velocidad',
            normal: '🐇 Normal', devagar: '🐢 Despacio',
            semVoz: 'No se encontró ninguna voz en español en este aparato. Pide a un adulto que instale una voz <strong>Español</strong> en los ajustes de «Texto a voz» de la tableta.',
            gravadaEmBreve: '🎙️ Pronto habrá una narración grabada en español. Por ahora, la voz del aparato lee la historia.',
            semTraducao: '🌍 Esta parte todavía no está traducida al español. Por ahora, se queda en portugués.',
            recomendada: '⭐ recomendada', offline: 'funciona sin internet', online: 'necesita internet', gravada: 'grabada', maisNatural: 'más natural',
            previa: '(avance: solo algunas páginas)', emProducao: '(en producción para esta parte)',
            amostraDe: (nome) => `Oír una muestra de ${nome}`, amostra: '¡Hola! Voy a leer esta historia contigo.',
            atividadeRotulo: 'Actividad', ouvirInstrucao: 'Escuchar la instrucción de la actividad', atividadeOpcional: 'Actividad opcional',
            lenteTrancada: '🔒 ¡Termina la actividad para abrir la Imaginación!', pedidoRotulo: 'Pide:'
        }
    }
};

let idioma = PT;
let textoMaiusculo = lerPreferencia(PREF_MAIUSCULAS) === '1';

/* Texto da interface no idioma atual (chave de IDIOMAS[...].ui; funções recebem os argumentos) */
function ui(chave, ...args) {
    const v = IDIOMAS[idioma].ui[chave] ?? IDIOMAS[PT].ui[chave];
    return typeof v === 'function' ? v(...args) : v;
}

function traducao() {
    return idioma === PT ? null : ((window.TRADUCOES || {})[idioma] || null);
}

function traducaoDaPagina(i) {
    const tr = traducao();
    return tr && tr.paginas ? tr.paginas[i] || null : null;
}

/* Textos soltos (legendas, cartões, falas): dicionário português → idioma; sem tradução, fica o original */
function t(texto) {
    const tr = traducao();
    return (tr && tr.textos && typeof texto === 'string' && tr.textos[texto]) || texto;
}

function obraNoIdioma() {
    return (traducao() || {}).obra || LIVRO.obra;
}

/* Página no idioma atual: capítulo, título e texto traduzidos; a cena é a mesma */
function paginaNoIdioma(i) {
    const pagina = LIVRO.paginas[i];
    const p = traducaoDaPagina(i);
    if (!p) return pagina;
    return { ...pagina, capitulo: p.capitulo || pagina.capitulo, titulo: p.titulo || pagina.titulo, texto: p.texto || pagina.texto, etiqueta: p.etiqueta || pagina.etiqueta };
}

/* Carrega <livro>/traducoes/parte-N.<idioma>.js (uma tag <script>: funciona até em file://) */
const traducoesCarregando = {};
function carregarTraducao(codigo) {
    if (codigo === PT || (window.TRADUCOES || {})[codigo]) return Promise.resolve();
    if (RASCUNHO) return Promise.reject(new Error('rascunho: só em português'));
    if (!traducoesCarregando[codigo]) {
        traducoesCarregando[codigo] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${LIVRO.traducoes || './traducoes/'}parte-${LIVRO.parte}.${codigo}.js`;
            script.onload = () => ((window.TRADUCOES || {})[codigo] ? resolve() : reject(new Error('tradução vazia')));
            script.onerror = () => { script.remove(); reject(new Error('sem tradução')); };
            document.head.appendChild(script);
        }).catch((e) => { delete traducoesCarregando[codigo]; throw e; });
    }
    return traducoesCarregando[codigo];
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
    (c.itens || []).forEach(item => { if (item.figura) srcs.push(item.figura); });
    (cena.camadas || []).forEach(l => { if (l.src) srcs.push(l.src); });
    (cena.precarregar || []).forEach(src => srcs.push(src));
    return srcs.filter(Boolean).map(img);
}

/* =====================================================================
   MONTAGEM DO LIVRO A PARTIR DA CONFIGURAÇÃO
   ===================================================================== */
/* Barra da lente (logo abaixo da ilustração): chave deslizante Realidade ↔ Imaginação + legenda da cena */
const LENS_BTN_REAL = "lens-toggle-btn chave-lente btn-chunky";
const LENS_BTN_IMAG = "lens-toggle-btn chave-lente btn-chunky lente-imag";
const GRID_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' };

/* Texto falado de cada frase, por página (montado a partir do texto canônico de assets/js/texto.js) */
const FALAS = {};

function montarHotspots(i, cena) {
    return (cena.hotspots || []).map((h, k) => {
        const lente = h.lente ? ` hotspot-${h.lente}${h.lente === 'imag' ? ' hidden' : ''}` : '';
        return `<div class="scene-hotspot${lente}" data-hotspot="${k}" style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%;" title="${escapeHtml(t(h.titulo || h.palavra || ''))}"></div>`;
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

function montarCartoes(i) {
    const c = cartoesDe(i);
    if (!c || !c.itens || !c.itens.length) return '';
    // Uma fileira só sempre que couber (até 5 cartões); mais que isso, duas fileiras
    const n = c.itens.length;
    const cols = GRID_COLS[c.colunas || (n <= 5 ? n : Math.min(Math.ceil(n / 2), 6))];
    const faixa = c.tipo === 'ordem'
        ? `<div id="faixa-${i}" class="faixa-palavras" aria-live="polite"><span class="faixa-vazia">${escapeHtml(t(c.faixaVazia) || ui('faixaVazia'))}</span></div>`
        : c.tipo === 'pedido'
            ? `<div id="pedido-${i}" class="faixa-pedido" aria-live="polite"></div>`
            : '';
    // Nos cartões de ler (ordem, pedido), o emoji entregaria a resposta: só a palavra
    const cards = c.itens.map(item => {
        const domId = item.domId || `card-${i}-${item.id}`;
        const icone = item.icone
            ? `<img src="${escapeHtml(img(item.icone))}" alt="" class="w-7 h-7 sm:w-8 sm:h-8 shrink-0 pointer-events-none" />`
            : (item.emoji && c.tipo !== 'ordem' && c.tipo !== 'pedido' ? `<span class="text-xl sm:text-2xl leading-none pointer-events-none" aria-hidden="true">${item.emoji}</span>` : '');
        return `
            <div id="${escapeHtml(domId)}" data-drop-target="drop-zone-${i}" data-id="${escapeHtml(item.id)}"
                 data-word="${escapeHtml(t(item.palavra))}" data-emoji="${escapeHtml(item.emoji || '✨')}"
                 class="draggable-card bg-white border-2 ${item.borda || 'border-amber-500'} rounded-xl px-1.5 py-1 flex items-center justify-center gap-1.5 min-h-[48px] min-w-0">
                ${icone}
                <span class="font-display font-bold text-xs text-amber-950 uppercase truncate">${escapeHtml(t(item.palavra))}</span>
            </div>`;
    }).join('');
    return `${faixa}<div class="w-full grid ${cols} gap-1.5 z-20">${cards}</div>`;
}

/* Legenda da cena sem o nome da lente ("👓 Lente da Realidade: A Pousada" → "A Pousada"):
   a chave da lente já mostra em qual mundo a criança está */
function legendaCurta(texto) {
    const k = texto.indexOf(':');
    return k > 0 && k < texto.length - 1 ? texto.slice(k + 1).trim() : texto;
}

/* Folha da ilustração: a cena ocupa todo o espaço que sobrar; embaixo, a barra estreita da lente
   (chave deslizante, legenda e 🔄) e, se houver, a bandeja de cartões, com altura máxima limitada */
function montarPaginaArte(i, pagina) {
    const cena = pagina.cena;
    const inicial = sceneFor(i);
    const legenda = t(inicial.badge || '');
    return `
        <div class="book-page page-art">
            <div id="frame-${i}" class="art-plate relative w-full">
                <div class="cena-caixa">
                    <div id="drop-zone-${i}" class="drop-zone-target relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-slate-900 flex items-center justify-center">
                        <img id="scene-bg-${i}" src="${escapeHtml(inicial.src)}" alt="${escapeHtml(t(cena.alt) || paginaNoIdioma(i).titulo || '')}" class="w-full h-full object-contain scene-img" />
                        <div class="scene-placeholder" aria-hidden="true"><span class="ph-emoji">${cena.emoji || '🎨'}</span><span data-ui="ilustracaoACaminho">${escapeHtml(ui('ilustracaoACaminho'))}</span></div>
                        ${montarCamadas(i, cena)}
                        ${cena.extra || ''}
                        ${montarHotspots(i, cena)}
                        <div class="scene-busy-overlay"><div class="scene-spinner"></div></div>
                    </div>
                </div>
                <div class="barra-lente z-20">
                    ${temImaginacao(i) ? `<button type="button" id="lens-btn-${i}" data-lente="${i}" class="${LENS_BTN_REAL}" role="switch" aria-checked="false" aria-label="${escapeHtml(ui('lenteImag'))}" title="${escapeHtml(ui('lenteImag'))}">
                        <span class="chave-lente-lado chave-lente-real" aria-hidden="true">👓 <span data-ui="lenteCurtaReal">${escapeHtml(ui('lenteCurtaReal'))}</span></span>
                        <span class="chave-lente-lado chave-lente-imag" aria-hidden="true">✨ <span data-ui="lenteCurtaImag">${escapeHtml(ui('lenteCurtaImag'))}</span></span>
                    </button>` : ''}
                    <span id="lens-badge-${i}" class="legenda-lente" title="${escapeHtml(legenda)}">${escapeHtml(legendaCurta(legenda))}</span>
                    ${!pagina.capa ? `
                    <button type="button" data-reiniciar-pagina="${i}" class="btn-chunky btn-reiniciar shrink-0 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 border-2 border-amber-400 flex items-center justify-center" title="${escapeHtml(ui('reiniciarPaginaTitulo'))}" aria-label="${escapeHtml(ui('reiniciarPagina'))}">
                        <i class="ph-bold ph-arrow-counter-clockwise"></i>
                    </button>` : ''}
                </div>
                <div id="cartoes-${i}" class="cartoes-area">${montarCartoes(i)}</div>
            </div>
        </div>`;
}

/* Conteúdo da folha de texto no idioma atual (refeito ao trocar de idioma) */
/* Autofalante no início de cada parágrafo: único jeito de comandar a narração pelo texto
   (tocar nas frases não faz nada, para evitar leituras acidentais) */
function botaoParagrafo(idPrimeiraFrase) {
    const rotulo = escapeHtml(ui('ouvirParagrafo'));
    return `<button type="button" class="btn-par-falar" data-ler-par="${idPrimeiraFrase}" data-ui-aria="ouvirParagrafo" data-ui-title="ouvirParagrafo" aria-label="${rotulo}" title="${rotulo}"><i class="ph-fill ph-speaker-high"></i></button>`;
}

function montarConteudoDoTexto(i) {
    const pagina = paginaNoIdioma(i);
    const ultima = i === totalPages - 1;
    const fim = LIVRO.fim || {};
    const titulo = Texto.tituloDaPagina(pagina, i, obraNoIdioma());
    let topo;
    if (pagina.capa) {
        topo = `
            <div class="inline-flex items-center gap-2 bg-amber-200 text-amber-950 font-display font-bold px-3.5 py-1 rounded-full text-xs sm:text-sm border-2 border-amber-400">
                <span data-etiqueta>${escapeHtml(etiquetaDaCapa(pagina))}</span>
            </div>
            <h2 class="sentence text-2xl sm:text-4xl font-display font-bold text-amber-950 leading-tight" data-frase="${titulo.id}">
                ${escapeHtml(obraNoIdioma())}
                <span class="block text-base sm:text-2xl text-amber-700 mt-1">${escapeHtml(pagina.titulo)}</span>
            </h2>`;
    } else {
        // O título é a "frase 0" da leitura guiada (p{i}-s0): capítulo + título
        topo = `
            <div class="sentence space-y-3" data-frase="${titulo.id}">
                <div class="inline-flex items-center gap-2 ${pagina.corCapitulo || 'text-amber-700'} font-display font-bold text-xs sm:text-sm uppercase">
                    <span>${escapeHtml(pagina.capitulo)}</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-display font-bold text-amber-950">${escapeHtml(pagina.titulo)}</h2>
            </div>`;
    }
    let abrir;
    if (pagina.capa) {
        const salvo = Number(lerPreferencia(chaveProgressoLivro()));
        if (salvo > 0 && salvo < totalPages) {
            abrir = `
                <div class="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                    <button type="button" data-continuar-progresso="${salvo}" class="btn-chunky w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-display font-bold text-base sm:text-lg px-6 py-3 rounded-3xl border-4 border-rose-700 flex items-center justify-center gap-2.5 shadow-md">
                        <i class="ph-fill ph-play text-xl sm:text-2xl text-amber-200"></i>
                        <span>${escapeHtml(ui('continuarPagina', salvo + 1))}</span>
                    </button>
                    <button type="button" data-nav="1" class="btn-chunky w-full sm:w-auto bg-amber-200 hover:bg-amber-300 text-amber-950 font-display font-bold text-sm sm:text-base px-5 py-2.5 rounded-3xl border-2 border-amber-500 flex items-center justify-center gap-2">
                        <span>${escapeHtml(ui('comecarDoInicio'))}</span>
                    </button>
                </div>`;
        } else {
            abrir = `
                <button type="button" data-nav="next" class="btn-chunky w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-display font-bold text-lg sm:text-xl px-7 py-3 rounded-3xl border-4 border-rose-700 flex items-center justify-center gap-3">
                    <span>${escapeHtml(ui('abrirLivro'))}</span>
                    <i class="ph-bold ph-arrow-right text-2xl"></i>
                </button>`;
        }
    } else {
        abrir = '';
    }
    const final = ultima ? `
        <div class="fim-parte space-y-2">
            <p class="font-display font-bold text-amber-950 text-sm sm:text-base">${escapeHtml(t(fim.mensagem) || ui('fim'))}</p>
            <div class="flex flex-wrap items-center justify-center gap-2">
                <button type="button" data-acao="ler-de-novo" class="btn-chunky bg-amber-300 hover:bg-amber-400 text-amber-950 font-display font-bold py-2 px-4 rounded-2xl border-2 border-amber-600 flex items-center justify-center gap-2 text-sm">
                    <i class="ph-bold ph-arrow-counter-clockwise text-lg"></i><span>${escapeHtml(ui('lerDeNovo'))}</span>
                </button>
                ${fim.proxima ? `
                <a href="${escapeHtml(fim.proxima)}" class="btn-chunky bg-rose-500 hover:bg-rose-600 text-white font-display font-bold py-2 px-4 rounded-2xl border-2 border-rose-700 flex items-center justify-center gap-2 text-sm">
                    <span>${escapeHtml(t(fim.proximaRotulo) || ui('continuarHistoria'))}</span><i class="ph-bold ph-arrow-right text-lg"></i>
                </a>` : `
                <a href="../index.html" class="btn-chunky bg-white hover:bg-amber-50 text-amber-950 font-display font-bold py-2 px-4 rounded-2xl border-2 border-amber-500 flex items-center justify-center gap-2 text-sm">
                    <i class="ph-bold ph-books text-lg"></i><span>${escapeHtml(ui('bibliotecaBotao'))}</span>
                </a>`}
            </div>
        </div>` : '';
    const comando = pagina.comandoAtividade || (pagina.cena && pagina.cena.cartoes && pagina.cena.cartoes.comando);
    const quadroAtividade = comando ? `
        <aside class="quadro-atividade mt-2 flex items-center gap-2.5" aria-label="${escapeHtml(ui('atividadeOpcional'))}">
            <button type="button" class="btn-ouvir-comando shrink-0 w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 border-2 border-amber-600 text-amber-950 flex items-center justify-center transition shadow-sm" data-ouvir-comando="${escapeHtml(t(comando))}" aria-label="${escapeHtml(ui('ouvirInstrucao'))}" title="${escapeHtml(ui('ouvirInstrucao'))}">
                <i class="ph-fill ph-speaker-high text-base pointer-events-none" aria-hidden="true"></i>
            </button>
            <div class="text-xs sm:text-sm font-display font-bold text-amber-950 leading-snug">
                <span class="block text-[10px] uppercase tracking-wider text-amber-700 font-extrabold mb-0.5">🎮 ${escapeHtml(ui('atividadeRotulo'))}</span>
                <span>${escapeHtml(t(comando))}</span>
            </div>
        </aside>` : '';
    const alinhamento = pagina.capa ? 'items-center lg:items-start text-center lg:text-left' : '';
    return `
                <div class="page-text-inner flex flex-col ${alinhamento} space-y-3">
                    ${topo}
                    <p id="page-text-${i}" class="text-base sm:text-lg text-slate-800 font-bold leading-relaxed">${Texto.paginaParaHtml(pagina.texto, i, botaoParagrafo)}</p>
                    ${quadroAtividade}
                    ${abrir}
                    ${final}
                </div>`;
}

/* Dica da capa: no modo MAIÚSCULAS, as palavras-chave se destacam pela cor, não pelas letras */
function etiquetaDaCapa(pagina) {
    if (pagina.etiqueta) return pagina.etiqueta;
    return ui(textoMaiusculo ? 'etiquetaMaiusculas' : 'etiqueta');
}

function montarPaginaTexto(i) {
    return `
        <div class="book-page page-text">
            <div class="page-text-scroll">${montarConteudoDoTexto(i)}
            </div>
        </div>`;
}

/* Texto falado de cada frase da página, no idioma atual */
function montarFalas(i) {
    const pagina = paginaNoIdioma(i);
    FALAS[i] = Texto.falasDaPagina(pagina.texto, i, Texto.tituloDaPagina(pagina, i, obraNoIdioma()));
}

function rotuloDaParte() {
    return LIVRO.parte ? ui('parte', LIVRO.parte, LIVRO.totalPartes || LIVRO.parte) : '';
}

/* Bandeirinhas dos idiomas e o botão Aa / AA (texto todo em maiúsculas) */
function montarIdiomas() {
    const bandeiras = Object.entries(IDIOMAS).map(([codigo, def]) => `
        <button type="button" class="btn-idioma" data-idioma="${codigo}" lang="${def.lang}" title="${escapeHtml(def.ui.lerNesteIdioma)}" aria-label="${escapeHtml(def.ui.lerNesteIdioma)}" aria-pressed="false">
            <img src="${ICONES}bandeiras/${def.bandeira}.svg" alt="" draggable="false">
        </button>`).join('');
    return `
            <div class="barra-leitura order-last sm:order-none w-full sm:w-auto flex items-center justify-center gap-1 shrink-0">
                <button type="button" id="btn-maiusculas" class="btn-chunky btn-maiusculas btn-barra rounded-xl flex items-center justify-center border-2 font-display font-bold text-sm" aria-pressed="false">
                    <span id="maiusculas-label">Aa</span>
                </button>
                <div class="grupo-idiomas flex items-center gap-0.5 bg-white/90 rounded-xl border-2 border-amber-300 p-0.5" role="group">${bandeiras}
                </div>
            </div>`;
}

function montarLivro() {
    LIVRO.paginas.forEach((pagina, i) => montarFalas(i));
    const secoes = LIVRO.paginas.map((pagina, i) => `
        <section id="page-${i}" class="page-slide${i ? ' page-hidden' : ''} spread" aria-label="${escapeHtml(ui('secaoPagina', i + 1))}">
            ${montarPaginaArte(i, pagina)}
            ${montarPaginaTexto(i)}
        </section>`).join('');

    document.body.insertAdjacentHTML('afterbegin', `
    <div id="phonics-modal" class="phonics-backdrop" role="dialog" aria-modal="true" aria-labelledby="phonics-word" aria-hidden="true">
        <button id="phonics-card" type="button" class="phonics-card" data-ui-aria="ouvirPalavra" aria-label="${escapeHtml(ui('ouvirPalavra'))}">
            <span id="phonics-emoji" class="block text-6xl sm:text-7xl leading-none" aria-hidden="true">📖</span>
            <span id="phonics-word" class="block font-display font-bold text-3xl sm:text-5xl text-amber-950 tracking-wider uppercase leading-tight break-words mt-3"></span>
            <span id="phonics-syllables" class="flex flex-wrap items-center justify-center gap-2 mt-4" data-ui-aria="silabas" aria-label="${escapeHtml(ui('silabas'))}"></span>
            <span class="phonics-replay mt-5 mx-auto w-16 h-16 rounded-full bg-emerald-500 border-4 border-emerald-700 text-white text-3xl flex items-center justify-center" aria-hidden="true">
                <i class="ph-fill ph-speaker-high"></i>
            </span>
        </button>
    </div>

    <div id="painel-voz" class="phonics-backdrop" role="dialog" aria-modal="true" aria-labelledby="painel-voz-titulo" aria-hidden="true">
        <div class="painel-voz-card">
            <div class="flex items-center justify-between gap-2 mb-3">
                <h2 id="painel-voz-titulo" class="font-display font-bold text-2xl text-amber-950" data-ui="vozDaLeitura">${escapeHtml(ui('vozDaLeitura'))}</h2>
                <button type="button" data-fechar-voz class="btn-chunky w-12 h-12 shrink-0 rounded-2xl bg-amber-400 border-2 border-amber-600 text-amber-950 text-xl flex items-center justify-center" data-ui-aria="fechar" aria-label="${escapeHtml(ui('fechar'))}"><i class="ph-bold ph-x"></i></button>
            </div>
            <div id="painel-voz-corpo" class="space-y-3"></div>
        </div>
    </div>

    <main id="book-container" class="storybook-frame relative w-full max-w-6xl rounded-[24px] sm:rounded-[30px] flex flex-col justify-between overflow-hidden">
        <header id="barra-topo" class="barra-moldura w-full bg-amber-100/95 border-b-4 border-amber-300 px-2 py-1 sm:px-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-1.5 gap-y-1 z-30 shrink-0">
            <div class="flex-1 flex items-center gap-1.5 min-w-0">
                <a href="../index.html" class="btn-chunky btn-barra shrink-0 rounded-xl bg-white hover:bg-amber-50 text-amber-900 flex items-center justify-center border-2 border-amber-500" data-ui-title="bibliotecaTitulo" title="${escapeHtml(ui('bibliotecaTitulo'))}" data-ui-aria="biblioteca" aria-label="${escapeHtml(ui('biblioteca'))}">
                    <i class="ph-bold ph-books"></i>
                </a>
                <div class="min-w-0">
                    <div class="flex items-center gap-1 min-w-0 overflow-hidden">
                        <span id="parte-rotulo" class="text-[10px] font-extrabold uppercase tracking-wider bg-amber-300 text-amber-950 px-1.5 rounded-full shrink-0">${escapeHtml(rotuloDaParte())}</span>
                        ${RASCUNHO ? `<span class="text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white px-1.5 rounded-full shrink-0" data-ui="rascunho">${escapeHtml(ui('rascunho'))}</span>` : ''}
                        <span class="hidden xl:inline text-[11px] font-bold text-amber-800 truncate">${escapeHtml(LIVRO.autor || '')}</span>
                    </div>
                    <h1 id="titulo-obra" class="text-xs sm:text-base font-display font-bold text-amber-950 leading-tight truncate">${escapeHtml(obraNoIdioma())}</h1>
                </div>
            </div>
            <div id="page-dots" class="hidden xl:flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full border-2 border-amber-300"></div>
            ${montarIdiomas()}
            <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button type="button" id="btn-tts" class="btn-chunky btn-barra flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-semibold px-2 lg:px-3 rounded-xl text-xs sm:text-sm border-2 border-emerald-700" data-ui-title="ouvirTitulo" title="${escapeHtml(ui('ouvirTitulo'))}">
                    <i id="tts-icon" class="ph-fill ph-speaker-high"></i>
                    <span id="tts-label" class="hidden lg:inline">${escapeHtml(ui('ouvirPagina'))}</span>
                </button>
                <button type="button" id="btn-voz" class="btn-chunky btn-barra rounded-xl bg-white hover:bg-amber-50 text-emerald-700 flex items-center justify-center border-2 border-emerald-600" data-ui-title="vozTitulo" title="${escapeHtml(ui('vozTitulo'))}" data-ui-aria="vozAria" aria-label="${escapeHtml(ui('vozAria'))}">
                    <i class="ph-bold ph-user-sound"></i>
                </button>
                <button type="button" id="btn-sfx" class="btn-chunky btn-barra rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 flex items-center justify-center border-2 border-amber-600" data-ui-title="sfxTitulo" title="${escapeHtml(ui('sfxTitulo'))}" data-ui-aria="sfxAria" aria-label="${escapeHtml(ui('sfxAria'))}">
                    <i id="sfx-icon" class="ph-fill ph-music-notes"></i>
                </button>
                <button type="button" id="btn-barras" class="btn-chunky btn-barra rounded-xl bg-white hover:bg-amber-50 text-amber-800 flex items-center justify-center border-2 border-amber-500" aria-pressed="false">
                    <i id="barras-icon" class="ph-bold ph-eye-slash"></i>
                </button>
                <button type="button" id="btn-fullscreen" class="btn-chunky btn-barra rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center border-2 border-indigo-700" data-ui-title="telaCheiaTitulo" title="${escapeHtml(ui('telaCheiaTitulo'))}" data-ui-aria="telaCheiaAria" aria-label="${escapeHtml(ui('telaCheiaAria'))}">
                    <i id="fullscreen-icon" class="ph-bold ph-corners-out"></i>
                </button>
            </div>
        </header>

        <div id="pages-viewport" class="book-viewport">${secoes}</div>

        <footer id="barra-base" class="barra-moldura w-full bg-amber-100/95 border-t-4 border-amber-300 px-2 py-1 sm:px-4 flex items-center justify-between z-30 shrink-0">
            <button type="button" id="btn-prev" class="btn-chunky btn-barra flex items-center gap-1.5 bg-white hover:bg-amber-50 text-amber-950 font-display font-bold px-3 sm:px-4 rounded-xl border-2 border-amber-500 text-xs sm:text-sm disabled:opacity-40 disabled:pointer-events-none">
                <i class="ph-bold ph-arrow-left text-base"></i>
                <span data-ui="anterior">${escapeHtml(ui('anterior'))}</span>
            </button>
            <span id="page-counter-text" class="font-display font-bold text-amber-950 text-xs sm:text-sm bg-amber-200 px-3 py-0.5 rounded-full border-2 border-amber-400">${escapeHtml(ui('pagina', 1, totalPages))}</span>
            <button type="button" id="btn-next" class="btn-chunky btn-barra flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-display font-bold px-3 sm:px-4 rounded-xl border-2 border-amber-700 text-xs sm:text-sm disabled:opacity-40 disabled:pointer-events-none">
                <span data-ui="proxima">${escapeHtml(ui('proxima'))}</span>
                <i class="ph-bold ph-arrow-right text-base"></i>
            </button>
        </footer>

        <span id="contador-canto" class="contador-canto" aria-live="polite"></span>

        <!-- Com os botões escondidos, eles voltam por estes controles flutuantes nos cantinhos -->
        <button type="button" id="alca-topo" class="alca-barra alca-topo" data-ui-title="mostrarTopo" title="${escapeHtml(ui('mostrarTopo'))}" data-ui-aria="mostrarTopo" aria-label="${escapeHtml(ui('mostrarTopo'))}">
            <i class="ph-bold ph-caret-down"></i>
        </button>
        <!-- Com os botões escondidos, setas pequenas e discretas para virar a página -->
        <button type="button" id="nav-flut-prev" class="nav-flutuante nav-flut-prev" data-ui-title="anterior" title="${escapeHtml(ui('anterior'))}" data-ui-aria="anterior" aria-label="${escapeHtml(ui('anterior'))}">
            <i class="ph-bold ph-caret-left"></i>
        </button>
        <button type="button" id="nav-flut-next" class="nav-flutuante nav-flut-next" data-ui-title="proxima" title="${escapeHtml(ui('proxima'))}" data-ui-aria="proxima" aria-label="${escapeHtml(ui('proxima'))}">
            <i class="ph-bold ph-caret-right"></i>
        </button>
        <button type="button" id="alca-base" class="alca-barra alca-base" data-ui-title="mostrarBase" title="${escapeHtml(ui('mostrarBase'))}" data-ui-aria="mostrarBase" aria-label="${escapeHtml(ui('mostrarBase'))}">
            <i class="ph-bold ph-caret-up"></i>
        </button>
    </main>`);
}


/* =====================================================================
   VOZES DA LEITURA
   Duas fontes, escolhidas no painel "Voz":
   - narração GRAVADA (vozes neurais geradas pelo Gemini, frase por frase,
     em <livro>/audio/<voz>/parte-N/<id>.mp3; lista em <livro>/audio/vozes.js);
   - VOZ DO APARELHO (Web Speech API), reserva automática para qualquer
     frase que ainda não tenha gravação.
   ===================================================================== */
const AUDIO_BASE = LIVRO.audio || './audio/';
const PREF_VOZ = 'cv-voz';               // 'gravada:<id>' ou 'aparelho:<voiceURI>' (nos outros idiomas: cv-voz-<idioma>)
const PREF_VELOCIDADE = 'cv-velocidade'; // 'normal' ou 'devagar'
const VELOCIDADES = { normal: { aparelho: 0.92, gravada: 1 }, devagar: { aparelho: 0.72, gravada: 0.8 } };

let vozDoAparelho = null;
let vozesAparelho = [];
let vozEscolhida = '';
let velocidade = lerPreferencia(PREF_VELOCIDADE) === 'devagar' ? 'devagar' : 'normal';
const narrador = new Audio();
narrador.preload = 'auto';

function lerPreferencia(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
}

function salvarPreferencia(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento: vale só nesta visita */ }
}

function chavePrefVoz() {
    return idioma === PT ? PREF_VOZ : `${PREF_VOZ}-${idioma}`;
}

/* Vozes melhores primeiro: neurais/"naturais" > aprimoradas > Google > demais; a variante da bandeira
   (pt-BR, en-GB, fr-FR, es-ES) antes das outras do mesmo idioma */
function pontuarVoz(v) {
    const nome = v.name.toLowerCase();
    const lang = v.lang.replace('_', '-').toLowerCase();
    let pontos = lang === IDIOMAS[idioma].voz.toLowerCase() ? 100 : 40;
    if (/natural|neural|online/.test(nome)) pontos += 30;
    if (/enhanced|premium|aprimorad|melhorad/.test(nome)) pontos += 25;
    if (/google/.test(nome)) pontos += 15;
    if (IDIOMAS[idioma].vozesBoas.test(nome)) pontos += 5;
    if (v.localService) pontos += 3;   // funciona sem internet
    return pontos;
}

function nomeAmigavel(v) {
    return v.name.replace(/^(Microsoft|Google|Apple)\s+/i, '').replace(/\s*\(.*?\)\s*/g, ' ')
        .replace(/\s*-\s*(Portuguese|English|French|Spanish).*$/i, '').replace(/(português|english|français|español).*$/i, '').trim() || v.name;
}

/* Vozes do aparelho no idioma atual (a lista chega aos poucos em alguns navegadores) */
function carregarVozesDoAparelho() {
    if (!('speechSynthesis' in window)) return;
    const prefixo = IDIOMAS[idioma].voz.slice(0, 2);
    const todas = window.speechSynthesis.getVoices() || [];
    vozesAparelho = todas.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(prefixo))
        .sort((a, b) => pontuarVoz(b) - pontuarVoz(a));
    const salva = vozEscolhida.startsWith('aparelho:') ? vozEscolhida.slice(9) : null;
    vozDoAparelho = (salva && vozesAparelho.find(v => v.voiceURI === salva)) || vozesAparelho[0] || null;
    if (document.getElementById('painel-voz')?.classList.contains('is-open')) renderPainelVoz();
}

if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = carregarVozesDoAparelho;
}

/* Narrações gravadas declaradas em <livro>/audio/vozes.js (window.VOZES_GRAVADAS), só as do idioma atual
   (`idioma` no vozes.js; sem ele, português) */
function vozesGravadas() {
    if (RASCUNHO && !NARRACAO_NO_RASCUNHO) return [];
    return (Array.isArray(window.VOZES_GRAVADAS) ? window.VOZES_GRAVADAS : []).filter(v => (v.idioma || PT) === idioma);
}

/* Completa: todas as frases da parte gravadas. Prévia (`previa` no vozes.js): só algumas, para o
   humano ouvir no livro enquanto a gravação avança; as demais frases usam a voz do aparelho. */
function gravadaCompleta(voz) {
    return !!voz && (voz.partes || []).includes(LIVRO.parte);
}

function gravadaDisponivel(voz) {
    return gravadaCompleta(voz) || (!!voz && (voz.previa || []).includes(LIVRO.parte));
}

/* Narração gravada do idioma atual; sem ela, a voz do aparelho */
function vozGravadaAtiva() {
    // Primeira visita (nada escolhido): se a narração gravada desta parte estiver pronta, ela é a voz padrão
    if (!vozEscolhida) return vozesGravadas().find(gravadaCompleta) || null;
    if (!vozEscolhida.startsWith('gravada:')) return null;
    const voz = vozesGravadas().find(v => v.id === vozEscolhida.slice(8));
    return gravadaDisponivel(voz) ? voz : null;
}

function carregarVozesGravadas() {
    const script = document.createElement('script');
    script.src = `${AUDIO_BASE}vozes.js`;
    document.head.appendChild(script);
}

/* Pasta da parte dentro de cada voz: parte-N. A versão nova de uma parte publicada grava à parte
   (`pastaAudio: 'parte-4-rascunho'` no LIVRO), para não misturar com a narração que está no ar */
const PASTA_AUDIO = LIVRO.pastaAudio || `parte-${LIVRO.parte}`;

function urlFrase(voz, id) {
    return `${AUDIO_BASE}${voz.id}/${PASTA_AUDIO}/${id}.mp3`;
}

/* Páginas gravadas inteiras (um MP3 por página, entonação contínua), com o tempo de cada frase:
   <voz>/parte-N/paginas.json = { "p2": { arquivo: "p2.mp3", frases: [{ id, ini, fim }] } } */
const paginasGravadas = {};
function paginasDaVoz(voz) {
    if (!paginasGravadas[voz.id]) {
        paginasGravadas[voz.id] = fetch(`${AUDIO_BASE}${voz.id}/${PASTA_AUDIO}/paginas.json`)
            .then(r => (r.ok ? r.json() : {})).catch(() => ({}));
    }
    return paginasGravadas[voz.id];
}

/* Palavras-chave gravadas: palavras/ (português) ou palavras-<idioma>/ */
function urlPalavra(slugPalavra) {
    return `${AUDIO_BASE}palavras${idioma === PT ? '' : `-${idioma}`}/${slugPalavra}.mp3`;
}

/* Toca um áudio gravado (a partir de `inicio` segundos); rejeita se o arquivo não existir (aí entra a voz do aparelho) */
function tocarGravacao(src, inicio = 0) {
    pararGravacao();
    return new Promise((resolve, reject) => {
        narrador.onended = () => {
            pararGravacao();
            resolve();
        };
        narrador.onerror = () => {
            pararGravacao();
            reject(new Error('sem gravação'));
        };
        narrador.onloadedmetadata = inicio ? () => { narrador.currentTime = inicio; } : null;
        narrador.src = src;
        narrador.playbackRate = VELOCIDADES[velocidade].gravada;
        const tentativa = narrador.play();
        if (tentativa && tentativa.catch) {
            tentativa.catch(e => {
                pararGravacao();
                reject(e);
            });
        }
    });
}

function pararGravacao() {
    narrador.onended = null;
    narrador.onerror = null;
    narrador.onloadedmetadata = null;
    try {
        narrador.pause();
    } catch (e) {}
}

/* Fala um texto com a voz do aparelho; resolve ao terminar.
   Se uma voz "online" falhar (tablet sem internet), tenta de novo com a melhor voz offline. */
function falarComAparelho(texto, { taxa, voz } = {}) {
    return new Promise((resolve, reject) => {
        if (!('speechSynthesis' in window)) {
            reject(new Error('sem voz'));
            return;
        }
        const usar = voz || vozDoAparelho;
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = usar ? usar.lang : IDIOMAS[idioma].voz;
        if (usar) utterance.voice = usar;
        utterance.rate = taxa || VELOCIDADES[velocidade].aparelho;
        utterance.pitch = 1.03;
        utterance.onend = () => resolve();
        utterance.onerror = (e) => {
            const interrompida = e && (e.error === 'interrupted' || e.error === 'canceled');
            const offline = vozesAparelho.find(v => v.localService);
            if (!interrompida && usar && !usar.localService && offline) {
                if (usar === vozDoAparelho) vozDoAparelho = offline;   // até recarregar: não insiste na voz sem internet
                falarComAparelho(texto, { taxa, voz: offline }).then(resolve, reject);
            } else {
                reject(e);
            }
        };
        window.speechSynthesis.speak(utterance);
    });
}

function calarTudo() {
    pararGravacao();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

/* =====================================================================
   PAINEL "VOZ": escolher a voz e a velocidade (fica lembrado no tablet)
   ===================================================================== */
function abrirPainelVoz() {
    stopReadingPage();
    renderPainelVoz();
    const painel = document.getElementById('painel-voz');
    painel.classList.add('is-open');
    painel.setAttribute('aria-hidden', 'false');
}

function fecharPainelVoz() {
    const painel = document.getElementById('painel-voz');
    if (!painel.classList.contains('is-open')) return;
    calarTudo();
    painel.classList.remove('is-open');
    painel.setAttribute('aria-hidden', 'true');
}

function opcaoVoz(valor, titulo, detalhe, { ativa, desativada, tags = [] }) {
    return `
        <div class="opcao-voz${ativa ? ' opcao-voz-ativa' : ''}${desativada ? ' opcao-voz-off' : ''}">
            <button type="button" class="flex-1 min-w-0 text-left" data-escolher-voz="${escapeHtml(valor)}" ${desativada ? 'disabled' : ''}>
                <span class="block font-display font-bold text-amber-950 text-base leading-tight">${ativa ? '✅ ' : ''}${escapeHtml(titulo)}</span>
                <span class="block text-xs font-semibold text-slate-600">${escapeHtml(detalhe)}</span>
                ${tags.length ? `<span class="flex flex-wrap gap-1 mt-1">${tags.map(t => `<span class="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-full">${escapeHtml(t)}</span>`).join('')}</span>` : ''}
            </button>
            ${desativada ? '' : `<button type="button" class="btn-chunky shrink-0 w-12 h-12 rounded-full bg-emerald-500 border-2 border-emerald-700 text-white text-xl flex items-center justify-center" data-testar-voz="${escapeHtml(valor)}" aria-label="${escapeHtml(ui('amostraDe', titulo))}"><i class="ph-fill ph-play"></i></button>`}
        </div>`;
}

function renderPainelVoz() {
    const corpo = document.getElementById('painel-voz-corpo');
    const gravadaAtual = vozGravadaAtiva();
    // Narrações gravadas do idioma atual (nome e descrição vêm do vozes.js, já no idioma)
    const gravadas = vozesGravadas().map(v => opcaoVoz(
        `gravada:${v.id}`, v.nome,
        gravadaCompleta(v) ? v.descricao : gravadaDisponivel(v) ? `${v.descricao} ${ui('previa')}` : `${v.descricao} ${ui('emProducao')}`,
        { ativa: gravadaAtual && gravadaAtual.id === v.id, desativada: !gravadaDisponivel(v), tags: [ui('gravada'), ui('maisNatural')] }
    )).join('');

    const aparelhoAtiva = !gravadaAtual;
    const doAparelho = vozesAparelho.map((v, k) => opcaoVoz(
        `aparelho:${v.voiceURI}`, nomeAmigavel(v), v.lang.replace('_', '-'),
        {
            ativa: aparelhoAtiva && vozDoAparelho && vozDoAparelho.voiceURI === v.voiceURI,
            tags: [k === 0 ? ui('recomendada') : null, v.localService ? ui('offline') : ui('online')].filter(Boolean)
        }
    )).join('');

    const aviso = (html) => `<p class="text-sm font-semibold text-slate-700 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">${html}</p>`;
    corpo.innerHTML = `
        ${gravadas ? `<h3 class="font-display font-bold text-amber-800 text-sm uppercase tracking-wider">${escapeHtml(ui('narracaoGravada'))}</h3>
        <div class="space-y-2">${gravadas}</div>` : ''}
        ${!gravadas && ui('gravadaEmBreve') ? aviso(escapeHtml(ui('gravadaEmBreve'))) : ''}
        <h3 class="font-display font-bold text-amber-800 text-sm uppercase tracking-wider">${escapeHtml(ui('vozesDoAparelho'))}</h3>
        <div class="space-y-2">${doAparelho || aviso(ui('semVoz'))}</div>
        <h3 class="font-display font-bold text-amber-800 text-sm uppercase tracking-wider">${escapeHtml(ui('velocidade'))}</h3>
        <div class="grid grid-cols-2 gap-2">
            <button type="button" data-velocidade="normal" class="btn-chunky rounded-2xl border-2 px-3 py-2 font-display font-bold ${velocidade === 'normal' ? 'bg-amber-400 border-amber-600 text-amber-950' : 'bg-white border-amber-300 text-amber-900'}">${escapeHtml(ui('normal'))}</button>
            <button type="button" data-velocidade="devagar" class="btn-chunky rounded-2xl border-2 px-3 py-2 font-display font-bold ${velocidade === 'devagar' ? 'bg-amber-400 border-amber-600 text-amber-950' : 'bg-white border-amber-300 text-amber-900'}">${escapeHtml(ui('devagar'))}</button>
        </div>`;
}

function testarVoz(valor) {
    calarTudo();
    if (valor.startsWith('gravada:')) {
        const voz = vozesGravadas().find(v => v.id === valor.slice(8));
        if (voz) tocarGravacao(`${AUDIO_BASE}${voz.id}/${voz.amostra || 'amostra.mp3'}`).catch(() => {});
        return;
    }
    const v = vozesAparelho.find(x => x.voiceURI === valor.slice(9));
    falarComAparelho(ui('amostra'), { voz: v || vozDoAparelho }).catch(() => {});
}

function escolherVoz(valor) {
    vozEscolhida = valor;
    salvarPreferencia(chavePrefVoz(), valor);
    if (valor.startsWith('aparelho:')) {
        vozDoAparelho = vozesAparelho.find(v => v.voiceURI === valor.slice(9)) || vozDoAparelho;
    }
    playSound('wordPop');
    renderPainelVoz();
    testarVoz(valor);
}

function escolherVelocidade(valor) {
    velocidade = valor === 'devagar' ? 'devagar' : 'normal';
    salvarPreferencia(PREF_VELOCIDADE, velocidade);
    playSound('wordPop');
    renderPainelVoz();
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
   BOTÕES QUE SE ESCONDEM (mais espaço para o livro)
   Ligado pelo 👁 do topo e lembrado no aparelho (cv-barras-auto). As barras de cima e de baixo
   passam a flutuar sobre o livro e somem sozinhas; voltam com um toque no controle do cantinho
   (alca-topo / alca-base) e somem de novo depois de alguns segundos sem uso.
   ===================================================================== */
const BARRAS_PREF = 'cv-barras-auto';
const BARRAS_ESPERA_MS = 4000;
let barrasAuto = false;
const barrasTimer = {};

/* Contador da barra de baixo e o discreto do cantinho (visível com os botões escondidos):
   número da página e quanto do livro já foi lido (capa = 0%, última página = 100%) */
function atualizarContadores() {
    document.getElementById('page-counter-text').textContent = ui('pagina', currentPage + 1, totalPages);
    const pct = totalPages > 1 ? Math.round(currentPage / (totalPages - 1) * 100) : 100;
    const canto = document.getElementById('contador-canto');
    canto.textContent = `${currentPage + 1}/${totalPages} · ${pct}%`;
    canto.setAttribute('aria-label', `${ui('pagina', currentPage + 1, totalPages)} (${pct}%)`);
}

function barraEl(qual) {
    return document.getElementById(qual === 'topo' ? 'barra-topo' : 'barra-base');
}

function esconderBarra(qual) {
    clearTimeout(barrasTimer[qual]);
    barraEl(qual).classList.remove('barra-visivel');
}

/* Mostra a barra e agenda o sumiço (só no modo "esconder") */
function mostrarBarra(qual, espera = BARRAS_ESPERA_MS) {
    if (!barrasAuto) return;
    barraEl(qual).classList.add('barra-visivel');
    clearTimeout(barrasTimer[qual]);
    barrasTimer[qual] = setTimeout(() => esconderBarra(qual), espera);
}

function atualizarBotaoBarras() {
    const btn = document.getElementById('btn-barras');
    if (!btn) return;
    const rotulo = ui(barrasAuto ? 'barrasFixas' : 'barrasAuto');
    btn.title = rotulo;
    btn.setAttribute('aria-label', rotulo);
    btn.setAttribute('aria-pressed', String(barrasAuto));
    document.getElementById('barras-icon').className = barrasAuto ? 'ph-bold ph-eye' : 'ph-bold ph-eye-slash';
}

function definirBarrasAuto(ligado, espera = 1200) {
    barrasAuto = ligado;
    document.body.classList.toggle('barras-auto', ligado);
    ['topo', 'base'].forEach(qual => {
        if (ligado) mostrarBarra(qual, espera);
        else esconderBarra(qual);
    });
    atualizarBotaoBarras();
}

function initBarras() {
    document.getElementById('btn-barras').addEventListener('click', () => {
        playSound('wordPop');
        definirBarrasAuto(!barrasAuto);
        salvarPreferencia(BARRAS_PREF, barrasAuto ? '1' : '0');
    });
    document.getElementById('alca-topo').addEventListener('click', () => { playSound('wordPop'); mostrarBarra('topo'); });
    document.getElementById('alca-base').addEventListener('click', () => { playSound('wordPop'); mostrarBarra('base'); });
    // Enquanto a criança usa uma barra, ela não some
    ['topo', 'base'].forEach(qual => {
        barraEl(qual).addEventListener('pointerdown', () => {
            if (barrasAuto && barraEl(qual).classList.contains('barra-visivel')) mostrarBarra(qual);
        });
    });
    // Ao abrir o livro, os botões aparecem um pouco antes de sumir, para a criança saber que existem
    definirBarrasAuto(lerPreferencia(BARRAS_PREF) === '1', 2500);
}

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

    openPhonicsCard(wordText, syllablesText, emoji, element && element.dataset.slug);
    stopReadingPage();
    pronounceWord(wordText, element && element.dataset.slug);
}

let phonicsCurrentWord = '';
let phonicsCurrentSlug = '';

/* Palavra-chave: tenta a gravação pausada (sílabas + palavra, nos idiomas com narração gravada) e, se não houver,
   usa a voz do aparelho */
function pronounceWord(wordText, slugPalavra) {
    calarTudo();
    const aparelho = () => falarComAparelho(wordText.toLocaleLowerCase(IDIOMAS[idioma].lang), { taxa: VELOCIDADES[velocidade].aparelho * 0.92 }).catch(() => {});
    if (!vozesGravadas().some(gravadaDisponivel)) {
        aparelho();
        return;
    }
    tocarGravacao(urlPalavra(slugPalavra || Texto.slug(wordText))).catch(aparelho);
}

/* Texto livre (contagens, palavras ordenadas): sempre com a voz do aparelho */
function falar(texto) {
    calarTudo();
    falarComAparelho(texto).catch(() => {});
}

function openPhonicsCard(wordText, syllablesText, emoji, slugPalavra) {
    phonicsCurrentWord = wordText;
    phonicsCurrentSlug = slugPalavra || '';
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
    calarTudo();
}

function replayPhonicsWord() {
    playSound('wordPop');
    pronounceWord(phonicsCurrentWord, phonicsCurrentSlug);
}


/* =====================================================================
   LEITURA GUIADA: NARRAÇÃO FRASE A FRASE COM DESTAQUE SINCRONIZADO
   ===================================================================== */
let readingSession = 0;

// Texto falado da frase (de assets/js/texto.js): sem travessões, palavras-chave em minúsculas, etc.
function speechTextOf(el) {
    const falas = FALAS[pageIndexOf(el)] || {};
    return falas[el.dataset.frase] || el.textContent.replace(/\s+/g, ' ').trim();
}

function clearSentenceHighlight() {
    document.querySelectorAll('.sentence-reading').forEach(el => el.classList.remove('sentence-reading'));
}

/* Frases do parágrafo que o autofalante `btn` abre (até o próximo autofalante) */
function frasesDoParagrafo(btn) {
    const frases = [];
    for (let n = btn.nextElementSibling; n && !n.matches('.btn-par-falar'); n = n.nextElementSibling) {
        if (n.matches('.sentence')) frases.push(n);
    }
    return frases;
}

/* O autofalante do parágrafo em leitura vira ⏸ (os outros ficam 🔊) */
function sincronizarBotoesParagrafo(lendo) {
    let ativo = null;
    for (let n = lendo && lendo.previousElementSibling; n; n = n.previousElementSibling) {
        if (n.matches('.btn-par-falar')) { ativo = n; break; }
    }
    document.querySelectorAll('.btn-par-falar').forEach(b => {
        const pausa = b === ativo;
        b.classList.toggle('par-lendo', pausa);
        b.querySelector('i').className = pausa ? 'ph-fill ph-pause' : 'ph-fill ph-speaker-high';
        const rotulo = ui(pausa ? 'pausarParagrafo' : 'ouvirParagrafo');
        b.dataset.uiAria = b.dataset.uiTitle = pausa ? 'pausarParagrafo' : 'ouvirParagrafo';
        b.setAttribute('aria-label', rotulo);
        b.title = rotulo;
    });
}

function destacarFrase(el) {
    el.classList.add('sentence-reading');
    sincronizarBotoesParagrafo(el);
    scrollTextToSentence(el);
}

/* Autofalante do parágrafo: ouve (a partir do parágrafo, até o fim da página) ou pausa.
   Depois de uma pausa, o mesmo autofalante retoma da frase em que parou. */
let pausaDaLeitura = null;
function comandarParagrafo(btn) {
    if (btn.classList.contains('par-lendo')) {
        const atual = document.querySelector('.sentence-reading');
        pausaDaLeitura = atual ? { pagina: currentPage, frase: atual.dataset.frase } : null;
        stopReadingPage();
        return;
    }
    const frases = frasesDoParagrafo(btn);
    if (!frases.length) return;
    let inicio = frases[0];
    if (pausaDaLeitura && pausaDaLeitura.pagina === currentPage) {
        const parada = frases.find(f => f.dataset.frase === pausaDaLeitura.frase);
        if (parada) inicio = parada;
    }
    pausaDaLeitura = null;
    lerAPartirDaFrase(inicio);
}

function stopReadingPage() {
    readingSession++;
    calarTudo();
    clearSentenceHighlight();
    setReadingPageUI(false);
}

/* Botão "Ouvir Página": lê a página inteira (ou para a leitura em andamento) */
function toggleReadPageAloud() {
    if (isReadingPage) {
        stopReadingPage();
        return;
    }
    lerPagina(0);
}

/* Toque numa frase: a narração começa por ela e segue até o fim da página */
function lerAPartirDaFrase(frase) {
    const sentences = frasesDaPaginaAtual();
    const inicio = sentences.indexOf(frase);
    if (inicio < 0) return;
    stopReadingPage();
    lerPagina(inicio);
}

// Começa pelo título (frase 0, fora do parágrafo) e segue pelo texto
function frasesDaPaginaAtual() {
    const textEl = document.getElementById(`page-text-${currentPage}`);
    return textEl ? Array.from(textEl.closest('.page-text-inner').querySelectorAll('.sentence')) : [];
}

/* Leitura guiada a partir da frase `inicio`: frase por frase, com a narração gravada quando houver
   e a voz do aparelho como reserva */
function lerPagina(inicio = 0) {
    const sentences = frasesDaPaginaAtual();
    if (!sentences.length) return;

    calarTudo();
    const session = ++readingSession;
    const voz = vozGravadaAtiva();
    setReadingPageUI(true);

    const falhou = () => { if (session === readingSession) stopReadingPage(); };
    // Pequena pausa entre as frases para respeitar o ritmo da leitura
    const proxima = (i) => () => {
        if (session === readingSession) {
            pararGravacao();
            setTimeout(() => speakSentence(i + 1), voz ? 150 : 250);
        }
    };

    const speakSentence = (i) => {
        if (session !== readingSession) return;
        clearSentenceHighlight();
        if (i >= sentences.length) {
            pararGravacao();
            setReadingPageUI(false);
            return;
        }
        const sentence = sentences[i];
        const text = speechTextOf(sentence);
        if (!text) {
            speakSentence(i + 1);
            return;
        }
        destacarFrase(sentence);

        const comAparelho = () => falarComAparelho(text).then(proxima(i), falhou);
        if (voz) {
            tocarGravacao(urlFrase(voz, sentence.dataset.frase)).then(proxima(i), () => {
                if (session === readingSession) comAparelho();
            });
        } else {
            comAparelho();
        }
    };

    if (!voz) {
        speakSentence(inicio);
        return;
    }
    const pagina = currentPage;
    paginasDaVoz(voz).then(paginas => {
        if (session !== readingSession) return;
        const gravada = paginas[`p${pagina}`];
        if (gravada) lerPaginaInteira(voz, gravada, sentences, session, inicio, () => speakSentence(inicio));
        else speakSentence(inicio);
    });
}

/* Áudio da página inteira guardado na memória (blob): aceita salto no tempo mesmo quando vem do
   service worker, que não responde trechos (Range). Usado só para começar no meio da página. */
const audiosComSalto = {};
function audioComSalto(src) {
    if (!audiosComSalto[src]) {
        audiosComSalto[src] = fetch(src)
            .then(r => { if (!r.ok) throw new Error('sem gravação'); return r.blob(); })
            .then(blob => URL.createObjectURL(blob))
            .catch((e) => { delete audiosComSalto[src]; throw e; });
    }
    return audiosComSalto[src];
}

/* Página gravada inteira: um só áudio, e o destaque segue o tempo de cada frase (vale também no 🐢).
   Começando na frase `inicio`, o áudio pula para o tempo dela. */
function lerPaginaInteira(voz, gravada, sentences, session, inicio, reserva) {
    const porId = new Map(sentences.map(el => [el.dataset.frase, el]));
    const marcaInicial = inicio > 0 ? gravada.frases.find(f => f.id === sentences[inicio].dataset.frase) : null;
    if (inicio > 0 && !marcaInicial) {
        reserva();   // a frase não está nas marcas da gravação: frase por frase
        return;
    }
    const desde = marcaInicial ? marcaInicial.ini : 0;
    let atual = null;
    let quadro = 0;
    const acompanhar = () => {
        if (session !== readingSession) return;
        const t = narrador.currentTime;
        // Antes de o salto acontecer, o áudio ainda marca 0 s: não destaca o título por engano
        const marca = t >= desde - 0.05 && gravada.frases.find(f => t >= f.ini && t < f.fim);
        const el = marca && porId.get(marca.id);
        if (el && el !== atual) {
            clearSentenceHighlight();
            destacarFrase(el);
            atual = el;
        }
        quadro = requestAnimationFrame(acompanhar);
    };
    const src = `${AUDIO_BASE}${voz.id}/${PASTA_AUDIO}/${gravada.arquivo}`;
    const tocar = desde > 0
        ? audioComSalto(src).then(url => (session === readingSession ? tocarGravacao(url, desde) : null))
        : tocarGravacao(src);
    if (desde > 0) {
        destacarFrase(sentences[inicio]);
        atual = sentences[inicio];
    }
    tocar.then(() => {
        cancelAnimationFrame(quadro);
        if (session !== readingSession) return;
        pararGravacao();
        clearSentenceHighlight();
        setReadingPageUI(false);
    }, () => {
        cancelAnimationFrame(quadro);
        if (session === readingSession) reserva();   // sem o arquivo: frase por frase (e a voz do aparelho)
    });
    quadro = requestAnimationFrame(acompanhar);
}

function setReadingPageUI(reading) {
    isReadingPage = reading;
    if (!reading) sincronizarBotoesParagrafo(null);
    const btn = document.getElementById('btn-tts');
    const label = document.getElementById('tts-label');
    const icon = document.getElementById('tts-icon');
    if (reading) {
        btn.classList.replace('bg-emerald-500', 'bg-rose-500');
        btn.classList.replace('border-emerald-700', 'border-rose-700');
        label.textContent = ui('pararVoz');
        icon.className = 'ph-fill ph-stop-circle text-base sm:text-lg animate-pulse';
    } else {
        btn.classList.replace('bg-rose-500', 'bg-emerald-500');
        btn.classList.replace('border-rose-700', 'border-emerald-700');
        label.textContent = ui('ouvirPagina');
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

/* Selo da cena e rótulo do botão da lente, no idioma atual */
function atualizarRotulosDaLente(pageIdx, badgeText) {
    const isImag = lensImaginationState[pageIdx];
    const badge = document.getElementById(`lens-badge-${pageIdx}`);
    const legenda = t(badgeText || '');
    badge.textContent = legendaCurta(legenda);
    badge.title = legenda;
    const btn = document.getElementById(`lens-btn-${pageIdx}`);
    if (!btn) return;
    btn.title = !isImag && lenteTrancada(pageIdx) ? ui('lenteTrancada') : ui(isImag ? 'lenteReal' : 'lenteImag');
    btn.setAttribute('aria-label', btn.title);
    btn.setAttribute('aria-checked', String(isImag));
}

function updateLensUI(pageIdx, badgeText) {
    const isImag = lensImaginationState[pageIdx];
    const btn = document.getElementById(`lens-btn-${pageIdx}`);
    atualizarRotulosDaLente(pageIdx, badgeText);
    if (btn) btn.className = isImag ? LENS_BTN_IMAG : LENS_BTN_REAL;
    atualizarTrava(pageIdx);

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
        btn.classList.remove('convite-lente');
        void btn.offsetWidth;
        btn.classList.add('convite-lente');
        setTimeout(() => btn.classList.remove('convite-lente'), 1600);
    }
}

/* =====================================================================
   3. LENTE DA REALIDADE ↔ LENTE DA IMAGINAÇÃO
   ===================================================================== */
/* Páginas sem Imaginação (ex.: uma história contada, que já é toda imaginação) não têm a chave */
function temImaginacao(i) {
    return !!cenaDe(i).imag;
}

/* A atividade da página está concluída? (cada tipo de cartão tem o seu "acertou") */
function atividadeConcluida(i) {
    const c = cartoesDe(i);
    if (!c || !c.itens || !c.itens.length) return true;
    const st = pageState[i];
    if (st.concluida) return true;
    switch (c.tipo) {
        case 'progressivo':
        case 'ordem': return st.usados.size >= c.ordem.length;
        case 'contagem': return st.usados.size >= c.sequencia.length;
        case 'pedido': return st.usados.size >= c.pedidos.length;
        default: return todosUsados(i);
    }
}

/* A Imaginação é a recompensa: nas páginas com atividade, a chave só abre depois que a criança acerta
   (regra do humano, 2026-10-25). Voltar para a Realidade nunca é bloqueado. */
function lenteTrancada(i) {
    return temImaginacao(i) && !atividadeConcluida(i);
}

/* Cadeado na chave da lente enquanto a atividade não termina */
function atualizarTrava(i) {
    const btn = document.getElementById(`lens-btn-${i}`);
    if (!btn) return;
    // Só o caminho de ida é trancado: da Imaginação (ex.: aberta por ?imag=1) sempre se volta
    const trancada = lenteTrancada(i) && !lensImaginationState[i];
    btn.classList.toggle('lente-trancada', trancada);
    btn.setAttribute('aria-disabled', String(trancada));
    atualizarRotulosDaLente(i, sceneFor(i).badge);
}

const avisoLente = {};
function avisarLenteTrancada(i) {
    playSound('hint');
    nudge(document.getElementById(`lens-btn-${i}`));
    nudge(document.querySelector(`#cartoes-${i} .draggable-card:not(.card-completed)`));
    const badge = document.getElementById(`lens-badge-${i}`);
    if (!badge) return;
    badge.textContent = ui('lenteTrancada');
    badge.classList.add('legenda-aviso');
    clearTimeout(avisoLente[i]);
    avisoLente[i] = setTimeout(() => {
        badge.classList.remove('legenda-aviso');
        atualizarRotulosDaLente(i, sceneFor(i).badge);
    }, 2600);
}

function toggleLens(pageIdx, event, forceState = null) {
    if (sceneBusy[pageIdx]) return;
    if (!temImaginacao(pageIdx) && forceState !== false) return;
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
        definirLente: (imag) => {
            if (imag) pageState[i].concluida = true;
            toggleLens(i, null, imag);
        },
        renderizar: () => renderScene(i),
        efeito: (camadaId, efeito) => dispararEfeito(i, camadaId, efeito),
        convidarImaginacao: () => inviteImagination(i),
        elemento: (seletor) => document.querySelector(`#page-${i} ${seletor}`),
        som: playSound,
        falar,
        faiscas: spawnSparkles
    };
}


/* =====================================================================
   4. MOTOR UNIFICADO DE DRAG-AND-DROP PARA TABLET ANDROID
   ===================================================================== */
function initDraggableCards(raiz = document) {
    const cards = raiz.querySelectorAll('.draggable-card');
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
        case 'pedido':
            handlePedido(i, card, coords);
            break;
        case 'variante': {
            // Itens independentes, em qualquer ordem: a cena mostra a variante do último item
            completeCard(card, coords);
            st.usados.add(id);
            st.ultimo = id;
            playSound(item.som || 'wordPop');
            lensImaginationState[i] = false;
            renderScene(i).then(() => {
                if (todosUsados(i)) {
                    playSound('fanfare');
                    inviteImagination(i);
                }
            });
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
            st.usados.add(id);
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
    atualizarTrava(i);
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
    if (card.classList.contains('card-completed')) return;

    // Palavras repetidas (THE … THE) valem em qualquer um dos cartões iguais
    const expected = c.ordem[st.usados.size];
    const palavraDe = (itemId) => (c.itens.find(item => item.id === itemId) || {}).palavra;
    if (id !== expected && palavraDe(id) !== palavraDe(expected)) {
        playSound('hint');
        nudge(card);
        return;
    }

    st.usados.add(expected);
    completeCard(card, coords);
    falar(card.dataset.word.toLocaleLowerCase(IDIOMAS[idioma].lang));
    escreverNaFaixa(pageIdx);

    if (st.usados.size === c.ordem.length) {
        st.completo = true;
        setTimeout(() => playSound('fanfare'), 600);
        lensImaginationState[pageIdx] = false;
        renderScene(pageIdx).then(() => inviteImagination(pageIdx));
    } else {
        playSound('wordPop');
    }
}

/* Faixa das palavras em ordem: as já acertadas, no idioma atual */
function escreverNaFaixa(pageIdx) {
    const c = cartoesDe(pageIdx);
    const faixa = document.getElementById(`faixa-${pageIdx}`);
    if (!faixa) return;
    const usados = c.ordem.filter(id => pageState[pageIdx].usados.has(id));
    if (!usados.length) {
        faixa.innerHTML = `<span class="faixa-vazia">${escapeHtml(t(c.faixaVazia) || ui('faixaVazia'))}</span>`;
        return;
    }
    faixa.replaceChildren(...usados.map(id => {
        const escrita = document.createElement('span');
        escrita.className = 'palavra-escrita';
        escrita.textContent = t(itemDe(pageIdx, id).palavra);
        return escrita;
    }));
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
    if (c.falas && c.falas[n]) falar(t(c.falas[n]));
    if (st.usados.size === c.sequencia.length) {
        card.classList.add('card-completed');
        setTimeout(() => { playSound('fanfare'); inviteImagination(pageIdx); }, 900);
    } else {
        playSound('wordPop');
    }
}


// Pedido (ex.: o lanche de Sancho): a figura mostra o que o personagem quer, e a criança acha a palavra
// que se escreve assim. As pegadinhas (palavras parecidas que não servem: PIÃO, QUEIXO, ÁGUIA) bagunçam
// tudo com uma fala engraçada, e a brincadeira recomeça (pedido do humano, 2026-10-25)
function handlePedido(pageIdx, card, coords) {
    const c = cartoesDe(pageIdx);
    const st = pageState[pageIdx];
    const id = card.dataset.id;
    const item = itemDe(pageIdx, id) || {};
    if (st.bagunca || card.classList.contains('card-completed')) return;

    if (item.pegadinha) {
        st.bagunca = true;
        playSound('hint');
        nudge(card);
        const zona = document.getElementById(`drop-zone-${pageIdx}`).getBoundingClientRect();
        spawnSparkles(zona.left + zona.width / 2, zona.top + zona.height * 0.65, item.emoji || '🌀');
        falar(t(item.pegadinha));
        const recomecar = () => {
            if (sceneBusy[pageIdx]) return setTimeout(recomecar, 300);
            reiniciarPagina(pageIdx);
        };
        setTimeout(recomecar, 1600);
        return;
    }

    const esperado = c.pedidos[st.usados.size];
    if (id !== esperado) {
        // Comida certa na hora errada: dica gentil, a figura do pedido balança
        playSound('hint');
        nudge(card);
        nudge(document.querySelector(`#pedido-${pageIdx} .pedido-agora`));
        return;
    }

    st.usados.add(id);
    st.ultimo = id;
    completeCard(card, coords);
    falar(card.dataset.word.toLocaleLowerCase(IDIOMAS[idioma].lang));
    mostrarPedido(pageIdx);
    lensImaginationState[pageIdx] = false;
    if (st.usados.size === c.pedidos.length) {
        setTimeout(() => playSound('fanfare'), 600);
        renderScene(pageIdx).then(() => inviteImagination(pageIdx));
    } else {
        playSound('wordPop');
        renderScene(pageIdx);
    }
}

/* Faixa do pedido: as figuras do que o personagem quer; a da vez brilha, as servidas ganham ✔ */
function mostrarPedido(pageIdx) {
    const c = cartoesDe(pageIdx);
    const faixa = document.getElementById(`pedido-${pageIdx}`);
    if (!c || !faixa) return;
    const st = pageState[pageIdx];
    const daVez = c.pedidos[st.usados.size];
    const figuras = c.pedidos.map(id => {
        const item = itemDe(pageIdx, id) || {};
        const estado = st.usados.has(id) ? 'pedido-servido' : id === daVez ? 'pedido-agora' : 'pedido-depois';
        const arte = item.figura
            ? `<img src="${escapeHtml(img(item.figura))}" alt="" draggable="false">`
            : `<span aria-hidden="true">${item.emoji || '❓'}</span>`;
        return `<span class="pedido-figura ${estado}">${arte}</span>`;
    }).join('');
    faixa.innerHTML = `<span class="pedido-rotulo">${escapeHtml(t(c.rotulo) || ui('pedidoRotulo'))}</span>${figuras}`;
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
        dot.setAttribute('aria-label', ui('irParaPagina', i + 1));
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
        more.setAttribute('aria-label', ui('continuarLendo'));
        more.dataset.uiAria = 'continuarLendo';
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
    // Na paisagem as duas folhas podem ter larguras diferentes (a da ilustração cresce):
    // o verso da folha que gira ganha a largura da folha onde ela vai pousar
    const versoRect = twoPages ? (forward ? rects.art : rects.text) : null;
    [[front, 'turn-front'], [back, 'turn-back']].forEach(([content, cls]) => {
        const face = document.createElement('div');
        face.className = `turn-face ${cls}`;
        if (versoRect && cls === 'turn-back') {
            face.style.width = `${versoRect.width}px`;
            face.style.right = 'auto';
            face.style.left = forward ? '0px' : `${leafRect.width - versoRect.width}px`;
        }
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



/* =====================================================================
   REINICIAR PÁGINA (pedido do leitor) E REINICIAR LIVRO (M-5)
   ===================================================================== */
function reiniciarPagina(i, opcoes = {}) {
    if (sceneBusy[i]) return;
    lensImaginationState[i] = false;
    pageState[i] = { usados: new Set(), ultimo: null };
    const area = document.getElementById(`cartoes-${i}`);
    if (area) {
        area.innerHTML = montarCartoes(i);
        initDraggableCards(area);
    }
    const c = cartoesDe(i);
    if (c && c.tipo === 'progressivo') updateProgressHints(i);
    if (c && c.tipo === 'ordem') escreverNaFaixa(i);
    if (c && c.tipo === 'pedido') mostrarPedido(i);
    renderScene(i);
    if (!opcoes.silencioso) {
        playSound('wordPop');
        const frame = document.getElementById(`frame-${i}`);
        if (frame) {
            const ripple = document.createElement('div');
            ripple.className = 'lens-ripple';
            frame.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    }
}

function reiniciarLivro() {
    stopReadingPage();
    closePhonicsCard();
    for (let i = 0; i < totalPages; i++) {
        reiniciarPagina(i, { silencioso: true });
    }
    salvarPreferencia(chaveProgressoLivro(), '0');
    if (!RASCUNHO) try {
        const ultRaw = localStorage.getItem('cv-ultimo-livro');
        if (ultRaw) {
            const ult = JSON.parse(ultRaw);
            if (ult.parte === LIVRO.parte) {
                ult.pagina = 0;
                localStorage.setItem('cv-ultimo-livro', JSON.stringify(ult));
            }
        }
    } catch (e) {}
    goToPage(0);
    playSound('fanfare');
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
    if (index > 0) {
        salvarPreferencia(chaveProgressoLivro(), String(index));
        if (!RASCUNHO) try {
            const ultimo = {
                obra: LIVRO.obra,
                parte: LIVRO.parte,
                totalPartes: LIVRO.totalPartes,
                pagina: index,
                totalPaginas: totalPages,
                url: window.location.pathname,
                data: Date.now()
            };
            localStorage.setItem('cv-ultimo-livro', JSON.stringify(ultimo));
        } catch (e) {}
    }
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
    document.getElementById('nav-flut-prev').disabled = currentPage === 0;
    document.getElementById('nav-flut-next').disabled = currentPage === totalPages - 1;
    atualizarContadores();

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
   IDIOMA E LETRAS MAIÚSCULAS (barra do topo)
   ===================================================================== */

/* Textos fixos da moldura: data-ui (texto), data-ui-title e data-ui-aria */
function traduzirInterface() {
    document.querySelectorAll('[data-ui]').forEach(el => { el.textContent = ui(el.dataset.ui); });
    document.querySelectorAll('[data-ui-title]').forEach(el => { el.title = ui(el.dataset.uiTitle); });
    document.querySelectorAll('[data-ui-aria]').forEach(el => el.setAttribute('aria-label', ui(el.dataset.uiAria)));
    document.getElementById('parte-rotulo').textContent = rotuloDaParte();
    document.getElementById('titulo-obra').textContent = obraNoIdioma();
    atualizarContadores();
    document.querySelectorAll('[data-idioma]').forEach(btn => {
        const ativo = btn.dataset.idioma === idioma;
        btn.classList.toggle('idioma-ativo', ativo);
        btn.setAttribute('aria-pressed', String(ativo));
    });
    setReadingPageUI(isReadingPage);
    renderPaginationDots();
    atualizarBotaoMaiusculas();
    atualizarBotaoBarras();
}

/* Cartões da página no idioma atual. Se a tradução troca as palavras (cartões em ordem), a bandeja
   é refeita e a brincadeira daquela página recomeça. */
function traduzirCartoes(i) {
    const c = cartoesDe(i);
    const area = document.getElementById(`cartoes-${i}`);
    if (!c || !area) return;
    const ids = Array.from(area.querySelectorAll('.draggable-card')).map(card => card.dataset.id).sort().join('|');
    if (ids !== c.itens.map(item => item.id).sort().join('|')) {
        pageState[i] = { usados: new Set(), ultimo: null };
        area.innerHTML = montarCartoes(i);
        initDraggableCards(area);
        if (c.tipo === 'progressivo') updateProgressHints(i);
        if (c.tipo === 'pedido') mostrarPedido(i);
        renderScene(i);
        return;
    }
    area.querySelectorAll('.draggable-card').forEach(card => {
        const item = itemDe(i, card.dataset.id);
        if (!item) return;
        card.dataset.word = t(item.palavra);
        const rotulo = card.querySelector('span.font-display');
        if (rotulo) rotulo.textContent = t(item.palavra);
    });
    if (c.tipo === 'ordem') escreverNaFaixa(i);
    if (c.tipo === 'pedido') mostrarPedido(i);
}

/* Refaz os textos de uma página no idioma atual (a cena e o progresso continuam como estão) */
function traduzirPagina(i) {
    const page = document.getElementById(`page-${i}`);
    const cena = cenaDe(i);
    montarFalas(i);
    page.querySelector('.page-text-inner').outerHTML = montarConteudoDoTexto(i);
    page.setAttribute('aria-label', ui('secaoPagina', i + 1));
    document.getElementById(`scene-bg-${i}`).alt = t(cena.alt) || paginaNoIdioma(i).titulo || '';
    page.querySelectorAll('.scene-hotspot').forEach(h => {
        const def = (cena.hotspots || [])[Number(h.dataset.hotspot)];
        if (def) h.title = t(def.titulo || def.palavra || '');
    });
    traduzirCartoes(i);
    const btnRe = page.querySelector(`[data-reiniciar-pagina="${i}"]`);
    if (btnRe) {
        btnRe.title = ui('reiniciarPaginaTitulo');
        btnRe.setAttribute('aria-label', ui('reiniciarPagina'));
    }
    atualizarRotulosDaLente(i, sceneFor(i).badge);
}

function aplicarIdioma() {
    const def = IDIOMAS[idioma];
    document.documentElement.lang = def.lang;
    vozEscolhida = lerPreferencia(chavePrefVoz()) || '';
    carregarVozesDoAparelho();
}

/* Toque numa bandeirinha: carrega a tradução da parte e troca os textos sem sair da página */
function trocarIdioma(codigo, botao) {
    if (!IDIOMAS[codigo] || codigo === idioma) return;
    carregarTraducao(codigo).then(() => {
        closePhonicsCard();
        stopReadingPage();
        idioma = codigo;
        salvarPreferencia(PREF_IDIOMA, codigo);
        aplicarIdioma();
        for (let i = 0; i < totalPages; i++) traduzirPagina(i);
        traduzirInterface();
        updateScrollHint(currentPage);
        playSound('wordPop');
    }, () => {
        // Esta parte ainda não tem tradução neste idioma
        playSound('hint');
        nudge(botao);
        avisarSemTraducao(codigo);
    });
}

/* Aviso gentil, no idioma escolhido, de que esta parte ainda está só em português (pedido do humano,
   2026-10-26). A escolha do idioma continua guardada: as outras partes abrem traduzidas. */
function avisarSemTraducao(codigo) {
    const texto = IDIOMAS[codigo] && IDIOMAS[codigo].ui.semTraducao;
    if (!texto || RASCUNHO) return;
    document.getElementById('aviso-sem-traducao')?.remove();
    const aviso = document.createElement('div');
    aviso.id = 'aviso-sem-traducao';
    aviso.setAttribute('role', 'status');
    aviso.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] bg-amber-950/95 text-amber-100 border-2 border-amber-400 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 backdrop-blur-sm';
    aviso.innerHTML = `
        <span class="font-display font-semibold text-xs sm:text-sm">${escapeHtml(texto)}</span>
        <button type="button" class="text-amber-300 hover:text-white p-1 text-sm leading-none" aria-label="OK">✕</button>
    `;
    aviso.querySelector('button').addEventListener('click', () => aviso.remove());
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 8000);
}

function atualizarBotaoMaiusculas() {
    const btn = document.getElementById('btn-maiusculas');
    btn.setAttribute('aria-pressed', String(textoMaiusculo));
    btn.classList.toggle('maiusculas-ativo', textoMaiusculo);
    btn.title = ui(textoMaiusculo ? 'minusculas' : 'maiusculas');
    btn.setAttribute('aria-label', btn.title);
    document.getElementById('maiusculas-label').textContent = textoMaiusculo ? 'AA' : 'Aa';
}

/* Texto todo em MAIÚSCULAS: as letras de forma ajudam quem está começando a ler sozinho */
function aplicarMaiusculas() {
    document.body.classList.toggle('texto-maiusculo', textoMaiusculo);
    document.querySelectorAll('[data-etiqueta]').forEach(el => {
        el.textContent = etiquetaDaCapa(paginaNoIdioma(pageIndexOf(el)));
    });
    atualizarBotaoMaiusculas();
}

function alternarMaiusculas() {
    textoMaiusculo = !textoMaiusculo;
    salvarPreferencia(PREF_MAIUSCULAS, textoMaiusculo ? '1' : '0');
    aplicarMaiusculas();
    playSound('wordPop');
    updateScrollHint(currentPage);
}

/* =====================================================================
   EVENTOS (delegados: o HTML montado não tem onclick embutido)
   ===================================================================== */
function initEventos() {
    document.addEventListener('click', (e) => {
        const btnComando = e.target.closest('[data-ouvir-comando]');
        if (btnComando) {
            falar(btnComando.dataset.ouvirComando);
            return;
        }
        const palavra = e.target.closest('.literacy-word');
        if (palavra) {
            speakWord(palavra, palavra.dataset.palavra, palavra.dataset.silabas, palavra.dataset.emoji);
            return;
        }
        const autofalante = e.target.closest('.btn-par-falar');
        if (autofalante) {
            comandarParagrafo(autofalante);
            return;
        }
        const bandeira = e.target.closest('[data-idioma]');
        if (bandeira) {
            trocarIdioma(bandeira.dataset.idioma, bandeira);
            return;
        }
        const lente = e.target.closest('[data-lente]');
        if (lente) {
            const i = Number(lente.dataset.lente);
            if (!lensImaginationState[i] && lenteTrancada(i)) avisarLenteTrancada(i);
            else toggleLens(i, e);
            return;
        }
        const hotspot = e.target.closest('.scene-hotspot');
        if (hotspot) {
            tapHotspot(hotspot, e);
            return;
        }
        const escolher = e.target.closest('[data-escolher-voz]');
        if (escolher) {
            escolherVoz(escolher.dataset.escolherVoz);
            return;
        }
        const testar = e.target.closest('[data-testar-voz]');
        if (testar) {
            testarVoz(testar.dataset.testarVoz);
            return;
        }
        const vel = e.target.closest('[data-velocidade]');
        if (vel) {
            escolherVelocidade(vel.dataset.velocidade);
            return;
        }
        if (e.target.closest('[data-fechar-voz]') || e.target.id === 'painel-voz') {
            fecharPainelVoz();
            return;
        }
        const reiniciarBtn = e.target.closest('[data-reiniciar-pagina]');
        if (reiniciarBtn) {
            reiniciarPagina(Number(reiniciarBtn.dataset.reiniciarPagina));
            return;
        }
        const lerDeNovo = e.target.closest('[data-acao="ler-de-novo"]');
        if (lerDeNovo) {
            reiniciarLivro();
            return;
        }
        const continuarProg = e.target.closest('[data-continuar-progresso]');
        if (continuarProg) {
            goToPage(Number(continuarProg.dataset.continuarProgresso));
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
    document.getElementById('nav-flut-prev').addEventListener('click', prevPage);
    document.getElementById('nav-flut-next').addEventListener('click', nextPage);
    document.getElementById('btn-tts').addEventListener('click', toggleReadPageAloud);
    document.getElementById('btn-voz').addEventListener('click', abrirPainelVoz);
    document.getElementById('btn-sfx').addEventListener('click', toggleSoundEffects);
    document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
    initBarras();
    document.getElementById('btn-maiusculas').addEventListener('click', alternarMaiusculas);
    document.getElementById('phonics-card').addEventListener('click', replayPhonicsWord);

    // Cartão de alfabetização: fecha só com toque FORA do cartão (no fundo escurecido) ou com Esc
    document.getElementById('phonics-modal').addEventListener('click', (e) => {
        if (e.target.id === 'phonics-modal') closePhonicsCard();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePhonicsCard();
            fecharPainelVoz();
        }
        if (document.querySelector('.phonics-backdrop.is-open')) return;
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
    });

    /* Swipe para virar páginas no tablet, de acordo com o desenho do livro aberto:
       paisagem (folhas lado a lado) → arrastar para os lados; retrato (folhas empilhadas, lombada
       horizontal) → arrastar para cima avança e para baixo volta. No retrato, o texto rola na vertical:
       o gesto só vira a página se começou fora de uma área rolável ou se ela já estava no limite. */
    let touchStartX = 0, touchStartY = 0, swipeFromCard = false;
    let rolavelNoTopo = true, rolavelNoFim = true;
    const viewportEl = document.getElementById('pages-viewport');

    // Estado de rolagem da área rolável mais próxima do toque (se não houver, vale como "nos dois limites")
    const limitesDeRolagem = (alvo) => {
        for (let n = alvo; n && n !== viewportEl; n = n.parentElement) {
            const oy = getComputedStyle(n).overflowY;
            if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 1) {
                return { topo: n.scrollTop <= 1, fim: n.scrollTop + n.clientHeight >= n.scrollHeight - 1 };
            }
        }
        return { topo: true, fim: true };
    };

    viewportEl.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            // Arrastar um cartão até a cena não pode virar a página
            swipeFromCard = !!e.target.closest('.draggable-card');
            const lim = limitesDeRolagem(e.target);
            rolavelNoTopo = lim.topo;
            rolavelNoFim = lim.fim;
        }
    }, { passive: true });

    viewportEl.addEventListener('touchend', (e) => {
        if (e.changedTouches.length !== 1 || swipeFromCard) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (window.matchMedia('(orientation: landscape)').matches) {
            if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.8) {
                if (dx < 0) nextPage();
                else prevPage();
            }
        } else if (Math.abs(dy) > 75 && Math.abs(dy) > Math.abs(dx) * 1.8) {
            if (dy < 0 && rolavelNoFim) nextPage();
            else if (dy > 0 && rolavelNoTopo) prevPage();
        }
    }, { passive: true });
}

/* =====================================================================
   INICIALIZAÇÃO
   ===================================================================== */

/* =====================================================================
   AVISO DE ATUALIZAÇÃO DO PWA (M-9)
   ===================================================================== */
function monitorarAtualizacoesSW(reg) {
    if (!reg) return;

    function exibirAviso() {
        if (document.getElementById('sw-update-toast')) return;
        const toast = document.createElement('div');
        toast.id = 'sw-update-toast';
        toast.className = 'fixed bottom-4 right-4 z-50 bg-amber-950/95 text-amber-100 border-2 border-amber-400 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 backdrop-blur-sm';
        toast.innerHTML = `
            <span class="font-display font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <span class="text-base">✨</span>
                <span>${escapeHtml(ui('livroAtualizado'))}</span>
            </span>
            <button type="button" class="btn-chunky bg-amber-400 hover:bg-amber-300 text-amber-950 font-display font-bold text-xs sm:text-sm px-3 py-1 rounded-xl border border-amber-600 flex items-center gap-1">
                <i class="ph-bold ph-arrow-counter-clockwise"></i>
                <span>${escapeHtml(ui('atualizarBtn'))}</span>
            </button>
            <button type="button" class="text-amber-300 hover:text-white p-1 text-sm leading-none" aria-label="Fechar">✕</button>
        `;
        const btnAtualizar = toast.querySelector('button');
        btnAtualizar.addEventListener('click', () => {
            if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        });
        const btnFechar = toast.querySelectorAll('button')[1];
        btnFechar.addEventListener('click', () => toast.remove());
        document.body.appendChild(toast);
    }

    if (reg.waiting && navigator.serviceWorker.controller) {
        exibirAviso();
    }

    reg.addEventListener('updatefound', () => {
        const novo = reg.installing;
        if (!novo) return;
        novo.addEventListener('statechange', () => {
            if (novo.state === 'installed' && navigator.serviceWorker.controller) {
                exibirAviso();
            }
        });
    });
}

function iniciarLivro() {
    aplicarIdioma();
    montarLivro();
    traduzirInterface();
    aplicarMaiusculas();
    initEventos();
    carregarVozesGravadas();
    initArtFallbacks();
    renderPaginationDots();
    initDraggableCards();
    document.getElementById('btn-prev').disabled = true;

    for (let i = 0; i < totalPages; i++) {
        const c = cartoesDe(i);
        if (c && c.tipo === 'progressivo') updateProgressHints(i);
        if (c && c.tipo === 'pedido') mostrarPedido(i);
        renderCamadas(i);
        atualizarTrava(i);
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
        navigator.serviceWorker.register(LIVRO.serviceWorker || '../sw.js').then(reg => monitorarAtualizacoesSW(reg)).catch(() => {});
    }
}

/* Idioma da leitura: ?lang=en (testes) ou o último escolhido no tablet; a tradução carrega antes de montar o livro */
function prepararIdioma() {
    const pedido = new URLSearchParams(window.location.search).get('lang') || lerPreferencia(PREF_IDIOMA) || PT;
    const codigo = IDIOMAS[pedido] ? pedido : PT;
    return carregarTraducao(codigo).then(() => { idioma = codigo; }, () => {
        idioma = PT;
        if (codigo !== PT) domPronto.then(() => setTimeout(() => avisarSemTraducao(codigo), 600));
    });
}

const domPronto = new Promise(resolve => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', resolve);
    else resolve();
});
Promise.all([prepararIdioma(), domPronto]).then(iniciarLivro);
