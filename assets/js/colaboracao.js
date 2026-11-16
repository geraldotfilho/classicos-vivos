/* =========================================================================
   Clássicos Vivos — Colaboração, Revisões do Autor e Avaliações (0–5 estrelas)
   Carregado sob demanda pelo motor (livro.js) e opcionalmente em sobre.html.
   Comunica com a ponte Vercel + Supabase + GitHub Issues. Funciona offline
   enfileirando anotações do autor em localStorage até a próxima conexão.
   ========================================================================= */
(function () {
    'use strict';

    const API_BASE_PADRAO = 'https://classicos-vivos-api.vercel.app/api';
    const PREF_API_BASE = 'cv-api-base';
    const PREF_AUTOR_CHAVE = 'cv-autor-chave';
    const PREF_DEVICE_ID = 'cv-device-id';
    const PREF_FILA_REVISOES = 'cv-revisoes-fila';
    const PREF_AVALIADO = 'cv-avaliado-';

    const STRINGS = {
        'pt-BR': {
            btnAnotar: 'Anotar revisão ou sugestão',
            travaDica: 'Toque de novo para confirmar (adulto)',
            modalTituloAutor: 'Revisão do Autor',
            modalTituloLeitor: 'Enviar sugestão de melhoria',
            dicaDitado: 'Dica: no tablet ou celular, toque no microfone do teclado para ditar em áudio.',
            placeholderTexto: 'Escreva o que notou nesta página (texto, arte, áudio, botão...)',
            enviarRevisao: 'Enviar revisão',
            enviarSugestao: 'Enviar sugestão',
            enviando: 'Enviando...',
            fechar: 'Fechar',
            modoAutorAtivo: 'Modo Autor ativo (entra como revisão prioritária)',
            modoAutorSair: 'Sair do Modo Autor',
            souAutor: 'Sou o autor (entrar com chave)',
            chavePlaceholder: 'Digite sua chave secreta de autor',
            entrarAutor: 'Ativar',
            chaveInvalida: 'Chave inválida. Confira a senha configurada na Vercel.',
            autorAtivado: 'Modo Autor ativado neste aparelho!',
            enviadoAutorOk: (n) => `Revisão registrada no GitHub (Issue #${n}).`,
            enviadoLeitorOk: (n) => `Obrigado! Sua sugestão foi enviada para análise (Issue #${n}).`,
            salvoOffline: 'Sem conexão agora: anotação salva na fila e será enviada assim que conectar.',
            filaPendente: (n) => `${n} anotação(ões) na fila aguardando conexão.`,
            sincronizarAgora: 'Enviar fila agora',
            erroEnvio: 'Não foi possível enviar agora.',
            lenteReal: 'Realidade',
            lenteImag: 'Imaginação',
            paginaLabel: (p, t) => `Pág. ${p}/${t}`,
            avaliarTitulo: 'O que achou desta parte?',
            semAvaliacoes: 'Ainda sem avaliações. Seja a primeira família a avaliar!',
            resumoNotas: (m, t) => `${m.toFixed(1).replace('.', ',')} / 5 · ${t} ${t === 1 ? 'avaliação' : 'avaliações'}`,
            abrirAvaliacao: 'Avaliar (0 a 5 ★)',
            notaSelecionada: (n) => `Nota escolhida: ${n} de 5 estrelas`,
            zeroEstrelas: '0 ★',
            nomePlaceholder: 'Seu nome (opcional)',
            comentarioPlaceholder: 'Comentário opcional (passará por moderação antes de aparecer aqui)',
            emailPlaceholder: 'E-mail opcional (privado — só se quiser retorno)',
            enviarAvaliacao: 'Enviar avaliação',
            avaliacaoSalva: 'Avaliação salva! Obrigado por participar.',
            comentarioEmModeracao: 'Avaliação salva! Seu comentário foi enviado para moderação antes de ficar público.',
            comentariosTitulo: 'Comentários de quem já leu',
            suaNotaSalva: (n) => `Sua nota atual: ${n} ★`
        },
        en: {
            btnAnotar: 'Add review note or suggestion',
            travaDica: 'Tap again to confirm (grown-up)',
            modalTituloAutor: 'Author Review Note',
            modalTituloLeitor: 'Send a suggestion',
            dicaDitado: 'Tip: on a tablet or phone, tap the keyboard microphone to dictate.',
            placeholderTexto: 'Write what you noticed on this page (text, art, audio, button...)',
            enviarRevisao: 'Send review',
            enviarSugestao: 'Send suggestion',
            enviando: 'Sending...',
            fechar: 'Close',
            modoAutorAtivo: 'Author Mode active (priority review)',
            modoAutorSair: 'Exit Author Mode',
            souAutor: 'I am the author (enter key)',
            chavePlaceholder: 'Enter your secret author key',
            entrarAutor: 'Activate',
            chaveInvalida: 'Invalid key.',
            autorAtivado: 'Author Mode activated on this device!',
            enviadoAutorOk: (n) => `Review saved to GitHub (Issue #${n}).`,
            enviadoLeitorOk: (n) => `Thank you! Your suggestion was sent (Issue #${n}).`,
            salvoOffline: 'Offline right now: note queued and will sync when back online.',
            filaPendente: (n) => `${n} queued note(s) waiting for connection.`,
            sincronizarAgora: 'Sync queue now',
            erroEnvio: 'Could not send right now.',
            lenteReal: 'Reality',
            lenteImag: 'Imagination',
            paginaLabel: (p, t) => `Page ${p}/${t}`,
            avaliarTitulo: 'How did you like this part?',
            semAvaliacoes: 'No ratings yet. Be the first family to rate!',
            resumoNotas: (m, t) => `${m.toFixed(1)} / 5 · ${t} ${t === 1 ? 'rating' : 'ratings'}`,
            abrirAvaliacao: 'Rate (0 to 5 ★)',
            notaSelecionada: (n) => `Selected: ${n} out of 5 stars`,
            zeroEstrelas: '0 ★',
            nomePlaceholder: 'Your name (optional)',
            comentarioPlaceholder: 'Optional comment (reviewed before appearing publicly)',
            emailPlaceholder: 'Optional email (private — never shown publicly)',
            enviarAvaliacao: 'Submit rating',
            avaliacaoSalva: 'Rating saved! Thank you.',
            comentarioEmModeracao: 'Rating saved! Your comment is awaiting moderation before appearing here.',
            comentariosTitulo: 'Reader comments',
            suaNotaSalva: (n) => `Your rating: ${n} ★`
        },
        fr: {
            btnAnotar: 'Noter une révision ou suggestion',
            travaDica: 'Appuyez encore pour confirmer (adulte)',
            modalTituloAutor: 'Note de révision (Auteur)',
            modalTituloLeitor: 'Envoyer une suggestion',
            dicaDitado: 'Astuce : sur tablette, utilisez le micro du clavier pour dicter.',
            placeholderTexto: 'Écrivez ce que vous avez remarqué sur cette page...',
            enviarRevisao: 'Envoyer la révision',
            enviarSugestao: 'Envoyer la suggestion',
            enviando: 'Envoi...',
            fechar: 'Fermer',
            modoAutorAtivo: 'Mode Auteur actif',
            modoAutorSair: 'Quitter le Mode Auteur',
            souAutor: 'Je suis l’auteur (entrer la clé)',
            chavePlaceholder: 'Entrez votre clé secrète',
            entrarAutor: 'Activer',
            chaveInvalida: 'Clé invalide.',
            autorAtivado: 'Mode Auteur activé sur cet appareil !',
            enviadoAutorOk: (n) => `Révision enregistrée sur GitHub (Issue #${n}).`,
            enviadoLeitorOk: (n) => `Merci ! Votre suggestion a été envoyée (Issue #${n}).`,
            salvoOffline: 'Hors ligne : note enregistrée dans la file d’attente.',
            filaPendente: (n) => `${n} note(s) en attente de connexion.`,
            sincronizarAgora: 'Synchroniser maintenant',
            erroEnvio: 'Impossible d’envoyer pour le moment.',
            lenteReal: 'Réalité',
            lenteImag: 'Imagination',
            paginaLabel: (p, t) => `Page ${p}/${t}`,
            avaliarTitulo: 'Qu’avez-vous pensé de cette partie ?',
            semAvaliacoes: 'Pas encore d’avis. Soyez les premiers à noter !',
            resumoNotas: (m, t) => `${m.toFixed(1)} / 5 · ${t} avis`,
            abrirAvaliacao: 'Noter (0 à 5 ★)',
            notaSelecionada: (n) => `Note choisie : ${n} sur 5 étoiles`,
            zeroEstrelas: '0 ★',
            nomePlaceholder: 'Votre nom (facultatif)',
            comentarioPlaceholder: 'Commentaire facultatif (modéré avant publication)',
            emailPlaceholder: 'E-mail facultatif (privé — jamais affiché)',
            enviarAvaliacao: 'Envoyer l’avis',
            avaliacaoSalva: 'Avis enregistré ! Merci.',
            comentarioEmModeracao: 'Avis enregistré ! Votre commentaire attend la modération.',
            comentariosTitulo: 'Commentaires des lecteurs',
            suaNotaSalva: (n) => `Votre note : ${n} ★`
        },
        es: {
            btnAnotar: 'Anotar revisión o sugerencia',
            travaDica: 'Toca de nuevo para confirmar (adulto)',
            modalTituloAutor: 'Revisión del Autor',
            modalTituloLeitor: 'Enviar sugerencia de mejora',
            dicaDitado: 'Consejo: en la tableta, usa el micrófono del teclado para dictar.',
            placeholderTexto: 'Escribe lo que notaste en esta página (texto, arte, audio, botón...)',
            enviarRevisao: 'Enviar revisión',
            enviarSugestao: 'Enviar sugerencia',
            enviando: 'Enviando...',
            fechar: 'Cerrar',
            modoAutorAtivo: 'Modo Autor activo',
            modoAutorSair: 'Salir del Modo Autor',
            souAutor: 'Soy el autor (ingresar clave)',
            chavePlaceholder: 'Ingresa tu clave secreta',
            entrarAutor: 'Activar',
            chaveInvalida: 'Clave inválida.',
            autorAtivado: '¡Modo Autor activado en este aparato!',
            enviadoAutorOk: (n) => `Revisión guardada en GitHub (Issue #${n}).`,
            enviadoLeitorOk: (n) => `¡Gracias! Tu sugerencia fue enviada (Issue #${n}).`,
            salvoOffline: 'Sin conexión ahora: nota guardada en la cola hasta reconectar.',
            filaPendente: (n) => `${n} nota(s) en cola esperando conexión.`,
            sincronizarAgora: 'Sincronizar ahora',
            erroEnvio: 'No se pudo enviar ahora.',
            lenteReal: 'Realidad',
            lenteImag: 'Imaginación',
            paginaLabel: (p, t) => `Pág. ${p}/${t}`,
            avaliarTitulo: '¿Qué te pareció esta parte?',
            semAvaliacoes: 'Aún sin valoraciones. ¡Sé la primera familia en opinar!',
            resumoNotas: (m, t) => `${m.toFixed(1)} / 5 · ${t} ${t === 1 ? 'valoración' : 'valoraciones'}`,
            abrirAvaliacao: 'Valorar (0 a 5 ★)',
            notaSelecionada: (n) => `Nota elegida: ${n} de 5 estrellas`,
            zeroEstrelas: '0 ★',
            nomePlaceholder: 'Tu nombre (opcional)',
            comentarioPlaceholder: 'Comentario opcional (pasa por moderación antes de aparecer)',
            emailPlaceholder: 'Correo opcional (privado — nunca se muestra)',
            enviarAvaliacao: 'Enviar valoración',
            avaliacaoSalva: '¡Valoración guardada! Gracias.',
            comentarioEmModeracao: '¡Valoración guardada! Tu comentario espera moderación antes de publicarse.',
            comentariosTitulo: 'Comentarios de lectores',
            suaNotaSalva: (n) => `Tu nota actual: ${n} ★`
        }
    };

    function lsGet(k) {
        try { return localStorage.getItem(k) || ''; } catch { return ''; }
    }
    function lsSet(k, v) {
        try {
            if (v === null || v === undefined || v === '') localStorage.removeItem(k);
            else localStorage.setItem(k, String(v));
        } catch {}
    }

    function esc(s) {
        return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function langAtual() {
        const l = document.documentElement.lang || 'pt-BR';
        return STRINGS[l] ? l : 'pt-BR';
    }
    function txt(chave, ...args) {
        const dic = STRINGS[langAtual()] || STRINGS['pt-BR'];
        const v = dic[chave] !== undefined ? dic[chave] : STRINGS['pt-BR'][chave];
        return typeof v === 'function' ? v(...args) : v;
    }

    function obterApiBase() {
        const param = new URLSearchParams(window.location.search).get('api');
        if (param && /^https?:\/\//.test(param)) {
            const limpa = param.replace(/\/+$/, '');
            lsSet(PREF_API_BASE, limpa);
            return limpa;
        }
        return (lsGet(PREF_API_BASE) || window.CV_API_BASE || API_BASE_PADRAO).replace(/\/+$/, '');
    }

    function obterDeviceId() {
        let id = lsGet(PREF_DEVICE_ID);
        if (!id) {
            id = (crypto && crypto.randomUUID)
                ? crypto.randomUUID()
                : 'cv-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
            lsSet(PREF_DEVICE_ID, id);
        }
        return id;
    }

    function chaveAutor() {
        return lsGet(PREF_AUTOR_CHAVE).trim();
    }
    function autorAtivo() {
        return Boolean(chaveAutor());
    }

    function lerFila() {
        try {
            const raw = lsGet(PREF_FILA_REVISOES);
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch { return []; }
    }
    function salvarFila(arr) {
        lsSet(PREF_FILA_REVISOES, arr && arr.length ? JSON.stringify(arr) : '');
        atualizarIndicadorBotao();
    }

    /* Trava infantil simples: no Modo Autor abre com 1 toque; para leitores comuns,
       exige 2 toques seguidos (em até 3s) ou segurar por ~750ms. */
    function vincularTravaAdulto(btn, aoDesbloquear) {
        if (!btn || btn.dataset.travaVinculada) return;
        btn.dataset.travaVinculada = '1';
        let timerArmado = 0;
        let timerSegurar = 0;
        let abriuPorSegurar = false;

        const desarmar = () => {
            clearTimeout(timerArmado);
            btn.removeAttribute('data-armado');
            removerAvisoTrava();
        };

        btn.addEventListener('pointerdown', () => {
            abriuPorSegurar = false;
            if (autorAtivo()) return;
            clearTimeout(timerSegurar);
            timerSegurar = setTimeout(() => {
                abriuPorSegurar = true;
                desarmar();
                aoDesbloquear();
            }, 750);
        });
        const cancelarSegurar = () => clearTimeout(timerSegurar);
        btn.addEventListener('pointerup', cancelarSegurar);
        btn.addEventListener('pointercancel', cancelarSegurar);
        btn.addEventListener('pointerleave', cancelarSegurar);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (abriuPorSegurar) { abriuPorSegurar = false; return; }
            if (autorAtivo()) { aoDesbloquear(); return; }
            if (btn.dataset.armado === '1') {
                desarmar();
                aoDesbloquear();
                return;
            }
            btn.dataset.armado = '1';
            mostrarAvisoTrava(btn);
            clearTimeout(timerArmado);
            timerArmado = setTimeout(desarmar, 3000);
        });
    }

    function removerAvisoTrava() {
        document.getElementById('cv-trava-dica')?.remove();
    }

    function mostrarAvisoTrava(alvo) {
        removerAvisoTrava();
        const tip = document.createElement('div');
        tip.id = 'cv-trava-dica';
        tip.setAttribute('role', 'status');
        tip.className = 'cv-trava-dica';
        tip.textContent = txt('travaDica');
        document.body.appendChild(tip);
        const r = alvo.getBoundingClientRect();
        const w = tip.offsetWidth || 220;
        const left = Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2));
        const top = Math.max(12, r.top - (tip.offsetHeight || 36) - 8);
        tip.style.left = `${left}px`;
        tip.style.top = `${top}px`;
        setTimeout(() => tip.remove(), 3000);
    }

    /* ---------------------------------------------------------------------
       ENVIAR ANOTAÇÃO / SINCRONIZAR FILA OFFLINE
       --------------------------------------------------------------------- */
    async function enviarRevisaoApi(payload) {
        const res = await fetch(`${obterApiBase()}/revisoes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const dados = await res.json().catch(() => ({}));
        if (!res.ok) {
            const err = new Error(dados.erro || txt('erroEnvio'));
            err.status = res.status;
            throw err;
        }
        return dados;
    }

    async function sincronizarFila() {
        const fila = lerFila();
        if (!fila.length || !navigator.onLine) return { enviados: 0, restantes: fila.length };
        const restantes = [];
        let enviados = 0;
        for (const item of fila) {
            try {
                await enviarRevisaoApi({ ...item, chaveAutor: item.chaveAutor || chaveAutor() });
                enviados++;
            } catch (err) {
                // Erro de rede mantém na fila; erro 4xx definitivo descarta após registro
                if (!err.status || err.status >= 500) restantes.push(item);
            }
        }
        salvarFila(restantes);
        return { enviados, restantes: restantes.length };
    }

    /* ---------------------------------------------------------------------
       MODAL DE ANOTAÇÃO (POR PÁGINA)
       --------------------------------------------------------------------- */
    let modalEl = null;

    function garantirModal() {
        if (modalEl) return modalEl;
        document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-colaboracao" class="phonics-backdrop" role="dialog" aria-modal="true" aria-labelledby="colab-titulo" aria-hidden="true">
            <div class="colab-card">
                <div class="flex items-center justify-between gap-2 mb-2">
                    <h2 id="colab-titulo" class="font-display font-bold text-lg sm:text-xl text-amber-950 flex items-center gap-2"></h2>
                    <button type="button" id="colab-fechar" class="btn-chunky w-10 h-10 shrink-0 rounded-xl bg-amber-300 border-2 border-amber-600 text-amber-950 flex items-center justify-center">
                        <i class="ph-bold ph-x"></i>
                    </button>
                </div>
                <div id="colab-contexto" class="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 rounded-xl px-3 py-1.5 mb-2"></div>
                <form id="colab-form" class="space-y-2.5">
                    <textarea id="colab-texto" rows="4" class="colab-input w-full rounded-xl border-2 border-amber-300 bg-white p-3 text-sm sm:text-base text-slate-800 focus:outline-none focus:border-amber-600" required></textarea>
                    <p id="colab-dica-ditado" class="text-[11px] font-semibold text-amber-800"></p>
                    <div id="colab-status" class="hidden text-xs sm:text-sm font-bold rounded-xl px-3 py-2"></div>
                    <div class="flex items-center justify-end gap-2">
                        <button type="submit" id="colab-enviar" class="btn-chunky bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-sm px-4 py-2.5 rounded-xl border-2 border-emerald-700 flex items-center gap-2">
                            <i class="ph-bold ph-paper-plane-tilt"></i>
                            <span id="colab-enviar-label"></span>
                        </button>
                    </div>
                </form>
                <div id="colab-rodape-autor" class="mt-3 pt-2.5 border-t border-amber-200 text-xs"></div>
            </div>
        </div>`);

        modalEl = document.getElementById('modal-colaboracao');
        document.getElementById('colab-fechar').addEventListener('click', fecharModal);
        modalEl.addEventListener('click', (e) => { if (e.target === modalEl) fecharModal(); });
        document.getElementById('colab-form').addEventListener('submit', aoEnviarNota);
        return modalEl;
    }

    function renderRodapeAutor() {
        const box = document.getElementById('colab-rodape-autor');
        if (!box) return;
        const fila = lerFila();
        const filaHtml = fila.length
            ? `<div class="mb-2 flex flex-wrap items-center justify-between gap-2 bg-amber-100 rounded-lg px-2.5 py-1.5 text-amber-950 font-semibold">
                   <span>${esc(txt('filaPendente', fila.length))}</span>
                   <button type="button" id="colab-sync-fila" class="underline font-bold">${esc(txt('sincronizarAgora'))}</button>
               </div>`
            : '';

        if (autorAtivo()) {
            box.innerHTML = `${filaHtml}
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 font-bold text-emerald-800">
                        <i class="ph-fill ph-key"></i> ${esc(txt('modoAutorAtivo'))}
                    </span>
                    <button type="button" id="colab-sair-autor" class="text-amber-800 hover:text-amber-950 underline font-semibold">${esc(txt('modoAutorSair'))}</button>
                </div>`;
            document.getElementById('colab-sair-autor').addEventListener('click', () => {
                lsSet(PREF_AUTOR_CHAVE, '');
                atualizarIndicadorBotao();
                atualizarConteudoModal();
            });
        } else {
            box.innerHTML = `${filaHtml}
                <button type="button" id="colab-toggle-login" class="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-semibold underline">
                    <i class="ph-bold ph-key"></i> ${esc(txt('souAutor'))}
                </button>
                <div id="colab-login-box" class="hidden mt-2 flex gap-1.5">
                    <input id="colab-chave-input" type="password" class="colab-input flex-1 rounded-xl border-2 border-amber-300 bg-white px-2.5 py-1.5 text-xs" placeholder="${esc(txt('chavePlaceholder'))}">
                    <button type="button" id="colab-chave-btn" class="btn-chunky bg-amber-500 text-white font-display font-bold px-3 py-1.5 rounded-xl border-2 border-amber-700 text-xs">${esc(txt('entrarAutor'))}</button>
                </div>`;
            document.getElementById('colab-toggle-login').addEventListener('click', () => {
                document.getElementById('colab-login-box').classList.toggle('hidden');
                document.getElementById('colab-chave-input').focus();
            });
            document.getElementById('colab-chave-btn').addEventListener('click', aoAtivarAutorNoModal);
        }

        const btnSync = document.getElementById('colab-sync-fila');
        if (btnSync) {
            btnSync.addEventListener('click', async () => {
                const r = await sincronizarFila();
                mostrarStatusModal(r.restantes === 0 ? `✓ ${r.enviados} enviada(s)!` : txt('filaPendente', r.restantes), r.restantes === 0);
                renderRodapeAutor();
            });
        }
    }

    async function aoAtivarAutorNoModal() {
        const input = document.getElementById('colab-chave-input');
        const chave = (input?.value || '').trim();
        if (!chave) return;
        const btn = document.getElementById('colab-chave-btn');
        btn.disabled = true;
        try {
            await enviarRevisaoApi({ verificar: true, chaveAutor: chave });
            lsSet(PREF_AUTOR_CHAVE, chave);
            atualizarIndicadorBotao();
            atualizarConteudoModal();
            mostrarStatusModal(txt('autorAtivado'), true);
        } catch (err) {
            mostrarStatusModal(err.status === 401 ? txt('chaveInvalida') : (err.message || txt('erroEnvio')), false);
        } finally {
            btn.disabled = false;
        }
    }

    function mostrarStatusModal(mensagem, sucesso) {
        const el = document.getElementById('colab-status');
        if (!el) return;
        el.textContent = mensagem;
        el.className = `text-xs sm:text-sm font-bold rounded-xl px-3 py-2 ${sucesso ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'}`;
        el.classList.remove('hidden');
    }

    function contextoAtual() {
        if (typeof window.CVContexto === 'function') return window.CVContexto();
        return {
            obra: 'Clássicos Vivos',
            parte: 1,
            pagina: 0,
            paginaTotal: 1,
            capitulo: '',
            tituloPagina: document.title,
            lente: 'real',
            idioma: langAtual(),
            rascunho: false,
            arquivo: location.pathname.replace(/^\/classicos-vivos\//, '').replace(/^\//, ''),
            urlPagina: location.href
        };
    }

    function atualizarConteudoModal() {
        const ctx = contextoAtual();
        const ehAutor = autorAtivo();
        document.getElementById('colab-titulo').innerHTML = ehAutor
            ? `<i class="ph-fill ph-key text-emerald-700"></i><span>${esc(txt('modalTituloAutor'))}</span>`
            : `<i class="ph-bold ph-note-pencil text-amber-700"></i><span>${esc(txt('modalTituloLeitor'))}</span>`;
        const lenteTxt = ctx.lente === 'imag' ? `✨ ${txt('lenteImag')}` : `👓 ${txt('lenteReal')}`;
        const pagTxt = txt('paginaLabel', ctx.pagina + 1, ctx.paginaTotal);
        document.getElementById('colab-contexto').textContent =
            `${ctx.obra} · Parte ${ctx.parte} · ${pagTxt}${ctx.tituloPagina ? ' · ' + ctx.tituloPagina : ''} · ${lenteTxt}`;
        document.getElementById('colab-texto').placeholder = txt('placeholderTexto');
        document.getElementById('colab-dica-ditado').textContent = txt('dicaDitado');
        document.getElementById('colab-enviar-label').textContent = ehAutor ? txt('enviarRevisao') : txt('enviarSugestao');
        document.getElementById('colab-fechar').setAttribute('aria-label', txt('fechar'));
        renderRodapeAutor();
    }

    function abrirModal() {
        garantirModal();
        const st = document.getElementById('colab-status');
        if (st) st.classList.add('hidden');
        atualizarConteudoModal();
        modalEl.classList.add('is-open');
        modalEl.setAttribute('aria-hidden', 'false');
        setTimeout(() => document.getElementById('colab-texto')?.focus(), 80);
    }

    function fecharModal() {
        if (!modalEl) return;
        modalEl.classList.remove('is-open');
        modalEl.setAttribute('aria-hidden', 'true');
    }

    async function aoEnviarNota(e) {
        e.preventDefault();
        const ta = document.getElementById('colab-texto');
        const texto = (ta?.value || '').trim();
        if (texto.length < 3) return;

        const btn = document.getElementById('colab-enviar');
        const lbl = document.getElementById('colab-enviar-label');
        btn.disabled = true;
        lbl.textContent = txt('enviando');

        const ctx = contextoAtual();
        const payload = { ...ctx, texto, chaveAutor: chaveAutor() };

        try {
            if (!navigator.onLine) throw new Error('OFFLINE');
            const resp = await enviarRevisaoApi(payload);
            ta.value = '';
            mostrarStatusModal(resp.ehAutor ? txt('enviadoAutorOk', resp.issueNumber) : txt('enviadoLeitorOk', resp.issueNumber), true);
            sincronizarFila();
        } catch (err) {
            if (err.status && err.status < 500) {
                mostrarStatusModal(err.message, false);
            } else {
                // Guarda na fila offline (útil para leitura sem internet no tablet)
                const fila = lerFila();
                fila.push({ ...ctx, texto, criadoEm: new Date().toISOString() });
                salvarFila(fila);
                ta.value = '';
                mostrarStatusModal(txt('salvoOffline'), true);
                renderRodapeAutor();
            }
        } finally {
            btn.disabled = false;
            lbl.textContent = autorAtivo() ? txt('enviarRevisao') : txt('enviarSugestao');
        }
    }

    function atualizarIndicadorBotao() {
        const btn = document.getElementById('btn-anotar');
        if (!btn) return;
        const autor = autorAtivo();
        const pendentes = lerFila().length;
        btn.classList.toggle('btn-anotar-autor', autor);
        btn.title = txt('btnAnotar');
        btn.setAttribute('aria-label', txt('btnAnotar'));
        let badge = btn.querySelector('.colab-badge-fila');
        if (pendentes > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'colab-badge-fila';
                btn.appendChild(badge);
            }
            badge.textContent = String(pendentes);
        } else if (badge) {
            badge.remove();
        }
    }

    /* ---------------------------------------------------------------------
       AVALIAÇÃO (0 A 5 ESTRELAS) E COMENTÁRIOS MODERADOS NO FIM DA PARTE
       --------------------------------------------------------------------- */
    let resumoCache = null;

    function slugAtual() {
        const ctx = contextoAtual();
        if (ctx.slug) return ctx.slug;
        const obraSlug = String(ctx.obra || 'livro').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
        return `${obraSlug}-parte-${ctx.parte || 1}`;
    }

    async function carregarAvaliacoes() {
        const container = document.getElementById('avaliacao-fim');
        if (!container) return;
        try {
            const res = await fetch(`${obterApiBase()}/avaliacoes?slug=${encodeURIComponent(slugAtual())}`);
            if (!res.ok) return;
            resumoCache = await res.json();
            renderAvaliacoes(container);
        } catch {
            // Sem conexão: mostra apenas se já havia algo ou mantém discreto sem erro
            renderAvaliacoes(container);
        }
    }

    function estrelasTexto(n) {
        const val = Math.max(0, Math.min(5, Number(n) || 0));
        return '★'.repeat(val) + '☆'.repeat(5 - val);
    }

    function renderAvaliacoes(container) {
        if (!container) return;
        const slug = slugAtual();
        const notaSalvaLocal = lsGet(PREF_AVALIADO + slug);
        const total = resumoCache ? resumoCache.total : 0;
        const media = resumoCache ? resumoCache.media : 0;
        const comentarios = resumoCache && Array.isArray(resumoCache.comentarios) ? resumoCache.comentarios : [];

        const resumoHtml = total > 0
            ? `<span class="text-amber-500 text-base leading-none">★</span> <span>${esc(txt('resumoNotas', media, total))}</span>`
            : `<span>${esc(txt('semAvaliacoes'))}</span>`;

        const notaAtualHtml = notaSalvaLocal !== ''
            ? `<span class="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">${esc(txt('suaNotaSalva', notaSalvaLocal))}</span>`
            : '';

        const comentariosHtml = comentarios.length ? `
            <div class="mt-3 pt-2.5 border-t border-amber-200/80 text-left space-y-2">
                <p class="font-display font-bold text-xs text-amber-900">${esc(txt('comentariosTitulo'))}</p>
                ${comentarios.map(c => {
                    const data = new Date(c.criado_em).toLocaleDateString(langAtual());
                    return `
                    <div class="bg-white/85 border border-amber-200 rounded-xl px-3 py-2 text-xs">
                        <div class="flex items-center justify-between gap-2 text-amber-900 font-bold mb-0.5">
                            <span>${esc(c.nome || 'Leitor(a)')} · <span class="text-amber-500">${estrelasTexto(c.estrelas)}</span></span>
                            <span class="text-[10px] font-semibold text-amber-700">${esc(data)}</span>
                        </div>
                        <p class="text-slate-700 font-semibold whitespace-pre-wrap">${esc(c.comentario)}</p>
                    </div>`;
                }).join('')}
            </div>` : '';

        container.innerHTML = `
            <div class="avaliacao-caixa mt-3 pt-3 border-t border-amber-300/70 space-y-2 text-center">
                <p class="font-display font-bold text-xs sm:text-sm text-amber-950">${esc(txt('avaliarTitulo'))}</p>
                <div class="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-amber-900">
                    <span class="inline-flex items-center gap-1">${resumoHtml}</span>
                    ${notaAtualHtml}
                </div>
                <div>
                    <button type="button" id="btn-avaliar-abrir" class="btn-chunky inline-flex items-center gap-1.5 bg-white hover:bg-amber-50 text-amber-950 font-display font-bold text-xs px-3.5 py-1.5 rounded-xl border-2 border-amber-400">
                        <i class="ph-fill ph-star text-amber-500"></i>
                        <span>${esc(txt('abrirAvaliacao'))}</span>
                    </button>
                </div>
                <form id="form-avaliacao" class="hidden text-left bg-white/95 border-2 border-amber-300 rounded-2xl p-3 space-y-2.5 mt-2">
                    <div class="flex flex-wrap items-center justify-center gap-1.5" role="radiogroup" aria-label="0 a 5 estrelas">
                        <button type="button" class="btn-estrela-zero" data-estrela="0">${esc(txt('zeroEstrelas'))}</button>
                        ${[1, 2, 3, 4, 5].map(n => `
                            <button type="button" class="btn-estrela" data-estrela="${n}" aria-label="${n} ★"><i class="ph-fill ph-star pointer-events-none"></i></button>
                        `).join('')}
                    </div>
                    <p id="aval-nota-label" class="text-center text-xs font-bold text-amber-900"></p>
                    <input id="aval-nome" type="text" maxlength="60" class="colab-input w-full rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-800" placeholder="${esc(txt('nomePlaceholder'))}">
                    <textarea id="aval-comentario" rows="2" maxlength="1500" class="colab-input w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs sm:text-sm text-slate-800" placeholder="${esc(txt('comentarioPlaceholder'))}"></textarea>
                    <input id="aval-email" type="email" maxlength="120" class="colab-input w-full rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-800" placeholder="${esc(txt('emailPlaceholder'))}">
                    <div id="aval-status" class="hidden text-xs font-bold rounded-xl px-3 py-1.5"></div>
                    <div class="flex justify-end">
                        <button type="submit" id="aval-enviar" class="btn-chunky bg-amber-500 hover:bg-amber-600 text-white font-display font-bold text-xs sm:text-sm px-4 py-2 rounded-xl border-2 border-amber-700">
                            ${esc(txt('enviarAvaliacao'))}
                        </button>
                    </div>
                </form>
                ${comentariosHtml}
            </div>`;

        let estrelasSelecionadas = notaSalvaLocal !== '' ? Number(notaSalvaLocal) : 5;
        const form = document.getElementById('form-avaliacao');
        const btnAbrir = document.getElementById('btn-avaliar-abrir');

        const atualizarEstrelas = (valor) => {
            estrelasSelecionadas = valor;
            form.querySelectorAll('[data-estrela]').forEach(b => {
                const n = Number(b.dataset.estrela);
                if (n === 0) b.classList.toggle('ativo', valor === 0);
                else b.classList.toggle('ativo', n <= valor);
            });
            document.getElementById('aval-nota-label').textContent = txt('notaSelecionada', valor);
        };
        atualizarEstrelas(estrelasSelecionadas);

        form.addEventListener('click', (e) => {
            const b = e.target.closest('[data-estrela]');
            if (b) atualizarEstrelas(Number(b.dataset.estrela));
        });

        vincularTravaAdulto(btnAbrir, () => {
            form.classList.toggle('hidden');
            if (!form.classList.contains('hidden')) {
                btnAbrir.classList.add('hidden');
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const ctx = contextoAtual();
            const btnEnv = document.getElementById('aval-enviar');
            const st = document.getElementById('aval-status');
            btnEnv.disabled = true;
            st.classList.add('hidden');

            try {
                const res = await fetch(`${obterApiBase()}/avaliacoes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slug,
                        obra: ctx.obra,
                        parte: ctx.parte,
                        deviceId: obterDeviceId(),
                        estrelas: estrelasSelecionadas,
                        nome: document.getElementById('aval-nome').value.trim(),
                        comentario: document.getElementById('aval-comentario').value.trim(),
                        email: document.getElementById('aval-email').value.trim()
                    })
                });
                const dados = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(dados.erro || txt('erroEnvio'));

                lsSet(PREF_AVALIADO + slug, String(estrelasSelecionadas));
                resumoCache = { media: dados.media, total: dados.total, comentarios: dados.comentarios || [] };
                renderAvaliacoes(container);
                const aviso = document.createElement('p');
                aviso.className = 'text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-xl px-3 py-1.5';
                aviso.textContent = dados.comentarioPendente ? txt('comentarioEmModeracao') : txt('avaliacaoSalva');
                container.querySelector('.avaliacao-caixa')?.appendChild(aviso);
            } catch (err) {
                st.textContent = err.message || txt('erroEnvio');
                st.className = 'text-xs font-bold rounded-xl px-3 py-1.5 bg-rose-100 text-rose-900 border border-rose-300';
                st.classList.remove('hidden');
                btnEnv.disabled = false;
            }
        });
    }

    /* ---------------------------------------------------------------------
       INICIALIZAÇÃO NO LIVRO E NA PÁGINA SOBRE
       --------------------------------------------------------------------- */
    function iniciarNoLivro() {
        const btn = document.getElementById('btn-anotar');
        if (btn) {
            atualizarIndicadorBotao();
            vincularTravaAdulto(btn, abrirModal);
        }
        const avalEl = document.getElementById('avaliacao-fim');
        if (avalEl) carregarAvaliacoes();
        sincronizarFila();
    }

    function aoMudarIdioma() {
        atualizarIndicadorBotao();
        if (modalEl && modalEl.classList.contains('is-open')) atualizarConteudoModal();
        const avalEl = document.getElementById('avaliacao-fim');
        if (avalEl) renderAvaliacoes(avalEl);
    }

    /* Painel simples na página sobre.html para ativar/desativar Modo Autor */
    async function verificarChaveAutor(chave) {
        await enviarRevisaoApi({ verificar: true, chaveAutor: chave });
        lsSet(PREF_AUTOR_CHAVE, chave);
        atualizarIndicadorBotao();
    }

    window.CVColaboracao = {
        iniciarNoLivro,
        aoMudarIdioma,
        abrirModal,
        fecharModal,
        autorAtivo,
        sairAutor: () => { lsSet(PREF_AUTOR_CHAVE, ''); atualizarIndicadorBotao(); },
        verificarChaveAutor,
        sincronizarFila,
        contarFila: () => lerFila().length,
        obterApiBase
    };

    window.addEventListener('online', () => { sincronizarFila(); });

    if (document.getElementById('btn-anotar') || document.getElementById('avaliacao-fim')) {
        iniciarNoLivro();
    }
})();
