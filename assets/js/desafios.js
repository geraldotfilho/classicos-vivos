/* =========================================================================
   Clássicos Vivos — MODO DESAFIO (segunda camada, leitores de ~8 a 10 anos)

   Carregado SOB DEMANDA por livro.js, só quando o modo é ligado (botão 🧩 do topo, cv-nivel = '2').
   O livro.js é um script clássico: as funções e constantes de topo dele (ui, idioma, PT, LIVRO,
   escapeHtml, playSound, falar, calarTudo, stopReadingPage, closePhonicsCard, nudge, carregarRecurso,
   lerPreferencia, salvarPreferencia, updateScrollHint, currentPage, totalPages, RASCUNHO,
   spawnSparkles, modoDesafio) são visíveis aqui.

   Os dados ficam em <livro>/desafios/parte-N.js (window.DESAFIOS; formato em docs/DESAFIOS.md §2–3).
   Este arquivo monta:
     - o QUADRO de cada página com desafio (fim da folha de texto, depois do quadro de atividade);
     - o CADERNO (camada modal sobre o livro): as etapas, a dica, o "porquê" e a tela de conquista;
     - os 7 tipos de etapa (quiz, ordenar, classificar, lacunas, ligar, enigma, erro), todos por toque.
   Sem relógio, pontos ou vidas: errar só balança e, depois de 2 erros na etapa, mostra a dica.
   Progresso (selos ganhos) em localStorage: cv-desafios-<livro>-<parte-N>[-rascunho].
   ========================================================================= */
(function () {
    'use strict';

    const PARAMS = new URLSearchParams(window.location.search);
    const caminho = window.location.pathname.split('/');
    // parte-5.html → parte-5 (o arquivo de desafios tem o mesmo nome do HTML)
    const NOME_PARTE = (caminho[caminho.length - 1] || '').replace(/\.html?$/i, '') || `parte-${LIVRO.parte || 1}`;
    const PASTA_LIVRO = decodeURIComponent(caminho[caminho.length - 2] || 'livro');
    const URL_DADOS = LIVRO.desafios || `./desafios/${NOME_PARTE}.js`;

    let dados = null;          // window.DESAFIOS da parte (null: a parte ainda não tem desafios)
    let carga = null;          // promessa do carregamento dos dados
    let ausente = false;       // o arquivo de desafios não existe (ou veio vazio)
    let abriuPelaUrl = false;  // ?desafio=1 abre o caderno uma vez só

    /* ------------------------------------------------------------------
       Utilidades
       ------------------------------------------------------------------ */
    const esc = escapeHtml;
    const maiusc = (s) => String(s ?? '').toLocaleUpperCase('pt-BR');
    const normal = (s) => maiusc(String(s ?? '').trim());

    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto != null) e.textContent = texto;
        return e;
    }

    function botao(classe, texto, aria) {
        const b = el('button', 'dz-btn ' + (classe || ''), texto);
        b.type = 'button';
        if (aria) b.setAttribute('aria-label', aria);
        return b;
    }

    /* Embaralha; com `diferente`, garante que a ordem final não é a original (se houver 2+ itens distintos) */
    function embaralhar(lista, diferente) {
        const orig = lista.slice();
        let a = orig.slice();
        const mesmo = (x) => x.every((v, k) => v === orig[k]);
        for (let tentativa = 0; tentativa < 30; tentativa++) {
            for (let k = a.length - 1; k > 0; k--) {
                const j = Math.floor(Math.random() * (k + 1));
                [a[k], a[j]] = [a[j], a[k]];
            }
            if (!diferente || a.length < 2 || !mesmo(a)) return a;
        }
        if (a.length > 1) a = orig.slice(1).concat(orig[0]);   // último recurso: gira um
        return a;
    }

    function balancar(alvo) {
        if (alvo) nudge(alvo);
    }

    /* ------------------------------------------------------------------
       Dados e progresso
       ------------------------------------------------------------------ */
    function carregarDados() {
        if (!carga) {
            carga = carregarRecurso(URL_DADOS, 'js').then(() => {
                const d = window.DESAFIOS;
                if (d && d.paginas && typeof d.paginas === 'object') dados = d;
                else ausente = true;
            }, () => { ausente = true; });
        }
        return carga;
    }

    function chaveProgresso() {
        const livro = String((dados && dados.livro) || PASTA_LIVRO).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const parte = NOME_PARTE.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const sufixo = RASCUNHO && !/-rascunho$/.test(parte) ? '-rascunho' : '';
        return `cv-desafios-${livro}-${parte}${sufixo}`;
    }

    function concluidos() {
        try {
            const lista = JSON.parse(lerPreferencia(chaveProgresso()) || '[]');
            return new Set(Array.isArray(lista) ? lista.map(Number) : []);
        } catch (e) { return new Set(); }
    }

    function marcarConcluido(i) {
        const feitos = concluidos();
        feitos.add(i);
        salvarPreferencia(chaveProgresso(), JSON.stringify([...feitos].sort((a, b) => a - b)));
    }

    /* O desafio da página i (só em português, nunca na capa) */
    function desafioDe(i) {
        if (!dados || idioma !== PT) return null;
        const d = dados.paginas[i] || dados.paginas[String(i)];
        if (!d || !Array.isArray(d.etapas) || !d.etapas.length) return null;
        if (!LIVRO.paginas[i] || LIVRO.paginas[i].capa) return null;
        return d;
    }

    function paginasComDesafio() {
        if (!dados) return [];
        return Object.keys(dados.paginas).map(Number)
            .filter(i => Number.isInteger(i) && desafioDe(i)).sort((a, b) => a - b);
    }

    /* ------------------------------------------------------------------
       Quadro no fim da folha de texto
       ------------------------------------------------------------------ */
    function quadro(i) {
        const d = desafioDe(i);
        if (!d) return '';
        const feito = concluidos().has(i);
        const selo = feito ? `<span class="qd-selo" title="${esc(ui('seloGanho'))}"><span class="qd-selo-emoji" aria-hidden="true">${esc(d.selo || '🏅')}</span>${esc(ui('seloGanho'))}</span>` : '';
        return `
        <aside class="quadro-desafio${feito ? ' qd-feito' : ''}" data-quadro-desafio="${i}" aria-label="${esc(ui('desafioRotulo'))}">
            <div class="qd-topo">
                <span class="qd-rotulo">🧩 ${esc(ui('desafioRotulo'))}</span>
                ${selo}
            </div>
            <p class="qd-titulo">${esc(d.titulo || '')}</p>
            ${d.convite ? `<p class="qd-convite">${esc(d.convite)}</p>` : ''}
            <button type="button" class="qd-abrir" data-abrir-desafio="${i}">
                <i class="ph-bold ${feito ? 'ph-arrow-counter-clockwise' : 'ph-puzzle-piece'}" aria-hidden="true"></i>
                <span>${esc(ui(feito ? 'jogarDeNovo' : 'abrirDesafio'))}</span>
            </button>
        </aside>`;
    }

    /* Põe (ou tira) o quadro de cada página, sem refazer o texto */
    function atualizarQuadros() {
        for (let i = 0; i < totalPages; i++) {
            const inner = document.querySelector(`#page-${i} .page-text-inner`);
            if (!inner) continue;
            inner.querySelectorAll('.quadro-desafio').forEach(q => q.remove());
            const html = modoDesafio ? quadro(i) : '';
            if (!html) continue;
            const ancora = inner.querySelector('.quadro-atividade') || document.getElementById(`page-text-${i}`);
            if (ancora) ancora.insertAdjacentHTML('afterend', html);
        }
        updateScrollHint(currentPage);
    }

    /* ------------------------------------------------------------------
       Aviso curto (toast)
       ------------------------------------------------------------------ */
    function avisar(texto) {
        document.getElementById('desafio-aviso')?.remove();
        if (!texto) return;
        const aviso = el('div', 'desafio-aviso');
        aviso.id = 'desafio-aviso';
        aviso.setAttribute('role', 'status');
        const span = el('span', '', texto);
        const fechar = botao('desafio-aviso-fechar', '✕', ui('fechar'));
        fechar.addEventListener('click', () => aviso.remove());
        aviso.append(span, fechar);
        document.body.appendChild(aviso);
        setTimeout(() => aviso.remove(), 6000);
    }

    /* ------------------------------------------------------------------
       Caderno (camada modal)
       ------------------------------------------------------------------ */
    let st = null;   // { i, d, k (etapa), erros, resolvida }
    let raiz = null;
    const R = {};    // pedaços do caderno

    function montarCaderno() {
        if (raiz) return;
        raiz = el('div', 'phonics-backdrop desafio-backdrop');
        raiz.id = 'caderno-desafio';
        raiz.setAttribute('role', 'dialog');
        raiz.setAttribute('aria-modal', 'true');
        raiz.setAttribute('aria-labelledby', 'desafio-titulo');
        raiz.setAttribute('aria-hidden', 'true');
        raiz.innerHTML = `
            <div class="desafio-card">
                <header class="dz-topo">
                    <span class="dz-selo-mini" aria-hidden="true"></span>
                    <div class="dz-topo-textos">
                        <span class="dz-rotulo">🧩 <span data-dz="rotulo"></span></span>
                        <h2 id="desafio-titulo" class="dz-titulo"></h2>
                    </div>
                    <ol class="dz-passos"></ol>
                    <button type="button" class="dz-fechar"><i class="ph-bold ph-x" aria-hidden="true"></i></button>
                </header>
                <div class="dz-corpo"></div>
                <footer class="dz-rodape">
                    <p class="dz-feedback" role="status" aria-live="polite"></p>
                    <div class="dz-dica" hidden></div>
                    <div class="dz-porque" hidden></div>
                    <button type="button" class="dz-btn dz-proxima" hidden></button>
                </footer>
            </div>`;
        document.body.appendChild(raiz);
        R.card = raiz.querySelector('.desafio-card');
        R.selo = raiz.querySelector('.dz-selo-mini');
        R.rotulo = raiz.querySelector('[data-dz="rotulo"]');
        R.titulo = raiz.querySelector('.dz-titulo');
        R.passos = raiz.querySelector('.dz-passos');
        R.fechar = raiz.querySelector('.dz-fechar');
        R.corpo = raiz.querySelector('.dz-corpo');
        R.rodape = raiz.querySelector('.dz-rodape');
        R.feedback = raiz.querySelector('.dz-feedback');
        R.dica = raiz.querySelector('.dz-dica');
        R.porque = raiz.querySelector('.dz-porque');
        R.proxima = raiz.querySelector('.dz-proxima');

        R.fechar.addEventListener('click', fechar);
        R.proxima.addEventListener('click', proximaEtapa);
        // Fecha com um toque FORA do cartão (no fundo escurecido)
        raiz.addEventListener('click', (e) => { if (e.target === raiz) fechar(); });
    }

    /* Etapa em que a criança parou em cada página (para poder fechar, reler e voltar) */
    const etapaEm = {};

    function abrir(i) {
        const d = desafioDe(i);
        if (!d) return;
        montarCaderno();
        stopReadingPage();
        closePhonicsCard();
        // Fechar o caderno para reler o texto não faz perder as etapas já vencidas (só na memória, até recarregar)
        const k = Math.min(etapaEm[i] || 0, d.etapas.length - 1);
        st = { i, d, k, erros: 0, resolvida: false };
        R.selo.textContent = d.selo || '🏅';
        R.rotulo.textContent = ui('desafioRotulo');
        R.titulo.textContent = d.titulo || '';
        R.fechar.setAttribute('aria-label', ui('fecharCaderno'));
        R.fechar.title = ui('fecharCaderno');
        raiz.setAttribute('aria-label', ui('cadernoDesafio'));
        renderEtapa();
        R.card.style.animation = 'none';
        void R.card.offsetWidth;
        R.card.style.animation = '';
        raiz.classList.add('is-open');
        raiz.setAttribute('aria-hidden', 'false');
        playSound('wordPop');
        R.fechar.focus({ preventScroll: true });
    }

    function fechar() {
        if (!raiz || !raiz.classList.contains('is-open')) return;
        raiz.classList.remove('is-open');
        raiz.setAttribute('aria-hidden', 'true');
        calarTudo();
        const volta = st && document.querySelector(`[data-abrir-desafio="${st.i}"]`);
        st = null;
        if (volta) volta.focus({ preventScroll: true });
    }

    /* Bolinhas das etapas (a última, a do selo) */
    function renderPassos(conquista) {
        const total = st.d.etapas.length;
        R.passos.replaceChildren();
        R.passos.setAttribute('aria-label', conquista ? ui('desafioVencido') : ui('etapaDe', st.k + 1, total));
        for (let j = 0; j < total; j++) {
            const li = el('li', 'dz-passo');
            if (conquista || j < st.k) li.classList.add('dz-passo-feito');
            else if (j === st.k) li.classList.add('dz-passo-atual');
            R.passos.appendChild(li);
        }
    }

    function limparRodape() {
        R.rodape.hidden = false;
        R.feedback.textContent = '';
        R.feedback.className = 'dz-feedback';
        R.dica.hidden = true;
        R.porque.hidden = true;
        R.proxima.hidden = true;
        atualizarRodape();
    }

    /* O rodapé só aparece quando tem algo a mostrar (aviso, dica, "porquê" ou o botão de seguir) */
    function atualizarRodape() {
        const vazio = !R.feedback.textContent && R.dica.hidden && R.porque.hidden && R.proxima.hidden;
        R.rodape.classList.toggle('dz-rodape-vazio', vazio);
    }

    function renderEtapa() {
        const etapa = st.d.etapas[st.k];
        st.erros = 0;
        st.resolvida = false;
        renderPassos(false);
        limparRodape();
        R.dica.innerHTML = etapa.dica ? `<span class="dz-dica-rotulo">💡 ${esc(ui('dicaRotulo'))}:</span> ${esc(etapa.dica)}` : '';

        R.corpo.replaceChildren();
        R.corpo.scrollTop = 0;
        const topo = el('div', 'dz-pergunta');
        const ouvir = botao('dz-ouvir', '', ui('ouvirPergunta'));
        ouvir.title = ui('ouvirPergunta');
        ouvir.innerHTML = '<i class="ph-fill ph-speaker-high" aria-hidden="true"></i>';
        ouvir.addEventListener('click', () => falar(etapa.pergunta));
        const textos = el('div', 'dz-pergunta-textos');
        textos.append(el('span', 'dz-etapa-num', ui('etapaDe', st.k + 1, st.d.etapas.length)), el('p', 'dz-pergunta-txt', etapa.pergunta || ''));
        topo.append(ouvir, textos);
        const area = el('div', `dz-etapa dz-tipo-${etapa.tipo}`);
        R.corpo.append(topo, area);
        const montar = TIPOS[etapa.tipo];
        if (montar) montar(etapa, area);
        else area.textContent = '⚠️ ' + etapa.tipo;
    }

    /* Um erro: balanço, som de dica e, depois do 2º erro da etapa, a dica (nunca bloqueia) */
    function errar(alvo) {
        if (!st || st.resolvida) return;
        st.erros++;
        playSound('hint');
        balancar(alvo);
        R.feedback.textContent = ui('tenteDeNovo');
        R.feedback.className = 'dz-feedback dz-feedback-erro';
        if (st.erros >= 2 && st.d.etapas[st.k].dica) R.dica.hidden = false;
        atualizarRodape();
    }

    /* Um acerto no meio da etapa (um par ligado, uma lacuna preenchida...) */
    function acertoParcial(alvo) {
        playSound('wordPop');
        R.feedback.textContent = '';
        atualizarRodape();
        if (alvo) {
            const r = alvo.getBoundingClientRect();
            spawnSparkles(r.left + r.width / 2, r.top, '✨');
        }
    }

    /* A etapa toda certa: mostra o "porquê" e o botão de seguir */
    function resolver() {
        if (!st || st.resolvida) return;
        st.resolvida = true;
        const etapa = st.d.etapas[st.k];
        playSound('lensMagic');
        R.corpo.querySelector('.dz-etapa')?.classList.add('dz-etapa-resolvida');
        R.feedback.textContent = '🎉 ' + ui('acertou');
        R.feedback.className = 'dz-feedback dz-feedback-certo';
        R.dica.hidden = true;
        if (etapa.porque) {
            R.porque.textContent = etapa.porque;
            R.porque.hidden = false;
        }
        const ultima = st.k === st.d.etapas.length - 1;
        R.proxima.innerHTML = `<span>${esc(ui(ultima ? 'ganharSelo' : 'proximaEtapa'))}</span> <i class="ph-bold ph-arrow-right" aria-hidden="true"></i>`;
        R.proxima.hidden = false;
        atualizarRodape();
        R.proxima.focus({ preventScroll: true });
    }

    function proximaEtapa() {
        if (!st || !st.resolvida) return;
        if (st.k < st.d.etapas.length - 1) {
            st.k++;
            etapaEm[st.i] = st.k;
            playSound('pageFlip');
            renderEtapa();
        } else {
            concluir();
        }
    }

    /* Tela de conquista: o selo grande, o "Você sabia?" e, na última página, os selos da parte */
    function concluir() {
        const i = st.i;
        etapaEm[i] = 0;
        marcarConcluido(i);
        playSound('fanfare');
        renderPassos(true);
        R.rodape.hidden = true;
        R.corpo.replaceChildren();
        R.corpo.scrollTop = 0;

        const tela = el('div', 'dz-conquista');
        tela.append(el('div', 'dz-selo-grande', st.d.selo || '🏅'), el('p', 'dz-conquista-titulo', ui('desafioVencido')));
        if (st.d.sabia) {
            const sabia = el('div', 'dz-sabia');
            sabia.append(el('p', 'dz-sabia-titulo', '💡 ' + ui('voceSabia')), el('p', 'dz-sabia-texto', st.d.sabia));
            tela.appendChild(sabia);
        }
        if (i === totalPages - 1) {
            const paginas = paginasComDesafio();
            const feitos = concluidos();
            const ganhos = paginas.filter(p => feitos.has(p)).length;
            const selos = el('div', 'dz-selos-parte');
            const fileira = el('div', 'dz-selos-fileira');
            paginas.forEach(p => {
                const d = desafioDe(p);
                const s = el('span', 'dz-selo-parte' + (feitos.has(p) ? ' dz-selo-ganho' : ''), d.selo || '🏅');
                s.title = d.titulo || '';
                s.setAttribute('aria-label', `${d.titulo || ''}${feitos.has(p) ? ' ✓' : ''}`);
                fileira.appendChild(s);
            });
            selos.append(fileira, el('p', 'dz-selos-contagem', ui('selosDaParte', ganhos, paginas.length)));
            tela.appendChild(selos);
        }
        const acoes = el('div', 'dz-conquista-acoes');
        const deNovo = botao('dz-btn-secundario', '', ui('jogarDeNovo'));
        deNovo.innerHTML = `<i class="ph-bold ph-arrow-counter-clockwise" aria-hidden="true"></i><span>${esc(ui('jogarDeNovo'))}</span>`;
        deNovo.addEventListener('click', () => { st.k = 0; renderEtapa(); });
        const voltar = botao('dz-btn-primario', '', ui('voltarAoLivro'));
        voltar.innerHTML = `<i class="ph-bold ph-books" aria-hidden="true"></i><span>${esc(ui('voltarAoLivro'))}</span>`;
        voltar.addEventListener('click', fechar);
        acoes.append(deNovo, voltar);
        tela.appendChild(acoes);
        R.corpo.appendChild(tela);
        const r = tela.querySelector('.dz-selo-grande').getBoundingClientRect();
        spawnSparkles(r.left + r.width / 2, r.top + r.height / 2, '⭐');
        atualizarQuadros();
        voltar.focus({ preventScroll: true });
    }

    /* ------------------------------------------------------------------
       Os sete tipos de etapa (docs/DESAFIOS.md §3), todos por toque
       ------------------------------------------------------------------ */
    const TIPOS = {
        /* Escolhe 1 entre 3 ou 4: errada balança e fica esmaecida; certa fica verde */
        quiz(etapa, area) {
            const lista = el('div', 'dz-opcoes');
            embaralhar(etapa.opcoes.map((texto, idx) => ({ texto, idx }))).forEach(op => {
                const b = botao('dz-opcao', op.texto);
                b.addEventListener('click', () => {
                    if (st.resolvida || b.classList.contains('dz-errada')) return;
                    if (op.idx === Number(etapa.certa)) {
                        b.classList.add('dz-certa');
                        lista.querySelectorAll('.dz-opcao').forEach(o => { if (o !== b) o.disabled = true; });
                        resolver();
                    } else {
                        b.classList.add('dz-errada');
                        b.setAttribute('aria-disabled', 'true');
                        errar(b);
                    }
                });
                lista.appendChild(b);
            });
            area.appendChild(lista);
        },

        /* Banco embaralhado + lista numerada; "Conferir" devolve ao banco só os que estão fora do lugar */
        ordenar(etapa, area) {
            const n = etapa.itens.length;
            const vagas = new Array(n).fill(null);   // índice do item em cada vaga
            const travada = new Array(n).fill(false);
            const lista = el('ol', 'dz-lista');
            const banco = el('div', 'dz-banco');
            const chips = {};
            const conferir = botao('dz-btn-primario dz-conferir', ui('conferir'));

            const vagasEls = etapa.itens.map((_, j) => {
                const li = el('li', 'dz-lista-item');
                const num = el('span', 'dz-num', String(j + 1));
                num.setAttribute('aria-hidden', 'true');
                const vaga = botao('dz-vaga');
                vaga.addEventListener('click', () => {
                    if (st.resolvida || travada[j] || vagas[j] == null) return;
                    devolver(j);
                    playSound('pageFlip');
                    atualizar();
                });
                li.append(num, vaga);
                lista.appendChild(li);
                return vaga;
            });

            function devolver(j) {
                const idx = vagas[j];
                vagas[j] = null;
                const c = chips[idx];
                c.classList.remove('dz-usado');
                c.disabled = false;
                return c;
            }

            function atualizar() {
                vagasEls.forEach((v, j) => {
                    const idx = vagas[j];
                    v.textContent = idx == null ? '' : etapa.itens[idx];
                    v.classList.toggle('dz-vaga-cheia', idx != null);
                    v.classList.toggle('dz-travada', travada[j]);
                    v.disabled = travada[j];
                    v.setAttribute('aria-label', idx == null ? `${j + 1}: ${ui('vagaVazia')}` : `${j + 1}: ${etapa.itens[idx]}${travada[j] ? ' ✓' : ' (' + ui('devolver') + ')'}`);
                });
                conferir.disabled = vagas.some(v => v == null) || st.resolvida;
            }

            embaralhar(etapa.itens.map((_, idx) => idx), true).forEach(idx => {
                const c = botao('dz-chip', etapa.itens[idx]);
                chips[idx] = c;
                c.addEventListener('click', () => {
                    if (st.resolvida || c.classList.contains('dz-usado')) return;
                    const j = vagas.indexOf(null);
                    if (j < 0) return;
                    vagas[j] = idx;
                    c.classList.add('dz-usado');
                    c.disabled = true;
                    playSound('wordPop');
                    atualizar();
                });
                banco.appendChild(c);
            });

            conferir.addEventListener('click', () => {
                if (st.resolvida || vagas.some(v => v == null)) return;
                const erradas = [];
                vagas.forEach((idx, j) => { if (idx === j) travada[j] = true; else erradas.push(j); });
                if (!erradas.length) {
                    atualizar();
                    resolver();
                    conferir.disabled = true;
                    return;
                }
                const voltaram = erradas.map(devolver);
                atualizar();
                voltaram.forEach(balancar);
                errar(conferir);
            });

            area.append(lista, banco, conferir);
            atualizar();
        },

        /* Um item por vez; botões dos grupos embaixo; no fim, o resumo dos grupos */
        classificar(etapa, area) {
            const fila = embaralhar(etapa.itens.map((_, idx) => idx));
            let pos = 0;
            const progresso = el('p', 'dz-progresso');
            const cartao = el('div', 'dz-item-atual');
            cartao.setAttribute('aria-live', 'polite');
            const grupos = el('div', 'dz-grupos');

            function mostrar() {
                progresso.textContent = ui('progressoItens', pos + 1, fila.length);
                cartao.textContent = etapa.itens[fila[pos]].texto;
                cartao.classList.remove('dz-entra');
                void cartao.offsetWidth;
                cartao.classList.add('dz-entra');
            }

            function resumo() {
                area.replaceChildren();
                const colunas = el('div', 'dz-resumo');
                etapa.grupos.forEach((nome, g) => {
                    const col = el('div', 'dz-resumo-grupo');
                    col.appendChild(el('p', 'dz-resumo-nome', nome));
                    const ul = el('ul');
                    etapa.itens.filter(it => Number(it.grupo) === g).forEach(it => ul.appendChild(el('li', '', it.texto)));
                    col.appendChild(ul);
                    colunas.appendChild(col);
                });
                area.appendChild(colunas);
            }

            etapa.grupos.forEach((nome, g) => {
                const b = botao('dz-grupo dz-grupo-' + g, nome);
                b.addEventListener('click', () => {
                    if (st.resolvida) return;
                    if (Number(etapa.itens[fila[pos]].grupo) === g) {
                        acertoParcial(b);
                        pos++;
                        if (pos >= fila.length) {
                            resumo();
                            resolver();
                        } else {
                            mostrar();
                        }
                    } else {
                        errar(cartao);
                    }
                });
                grupos.appendChild(b);
            });
            if (etapa.grupos.length === 3) grupos.classList.add('dz-grupos-3');
            area.append(progresso, cartao, grupos);
            mostrar();
        },

        /* Texto com lacunas; tocar numa palavra preenche a PRÓXIMA lacuna vazia, se for a certa */
        lacunas(etapa, area) {
            const pedacos = String(etapa.texto).split('___');
            const respostas = etapa.respostas || [];
            let prox = 0;
            const frase = el('p', 'dz-frase-lacunas');
            const lacunas = [];
            pedacos.forEach((p, k) => {
                frase.appendChild(document.createTextNode(p));
                if (k < pedacos.length - 1) {
                    const l = el('span', 'dz-lacuna', '');
                    l.setAttribute('aria-label', `${ui('vagaVazia')} ${k + 1}`);
                    lacunas.push(l);
                    frase.appendChild(l);
                }
            });
            const marcar = () => lacunas.forEach((l, k) => l.classList.toggle('dz-lacuna-atual', k === prox && !st.resolvida));

            const banco = el('div', 'dz-banco');
            embaralhar([...respostas, ...(etapa.distratores || [])], true).forEach(palavra => {
                const c = botao('dz-chip', palavra);
                c.addEventListener('click', () => {
                    if (st.resolvida || c.classList.contains('dz-usado') || prox >= lacunas.length) return;
                    if (normal(palavra) === normal(respostas[prox])) {
                        const l = lacunas[prox];
                        l.textContent = respostas[prox];
                        l.classList.add('dz-lacuna-cheia');
                        l.removeAttribute('aria-label');
                        c.classList.add('dz-usado');
                        c.disabled = true;
                        prox++;
                        acertoParcial(l);
                        marcar();
                        if (prox >= lacunas.length) resolver();
                    } else {
                        errar(c);
                    }
                });
                banco.appendChild(c);
            });
            area.append(frase, banco);
            marcar();
        },

        /* Duas colunas (a direita embaralhada): toca de um lado e do outro; par certo trava com a mesma cor */
        ligar(etapa, area) {
            const pares = etapa.pares;
            let sel = null;     // { lado, idx, b }
            let feitos = 0;
            const grade = el('div', 'dz-ligar');
            const colE = el('div', 'dz-coluna');
            const colD = el('div', 'dz-coluna');

            function tocar(lado, idx, b) {
                if (st.resolvida || b.classList.contains('dz-ligado')) return;
                if (!sel || sel.lado === lado) {
                    if (sel) sel.b.classList.remove('dz-selecionado');
                    if (sel && sel.b === b) { sel = null; return; }
                    sel = { lado, idx, b };
                    b.classList.add('dz-selecionado');
                    playSound('pageFlip');
                    return;
                }
                if (sel.idx === idx) {
                    const cor = 'dz-cor-' + (feitos % 5);
                    [sel.b, b].forEach(x => {
                        x.classList.remove('dz-selecionado');
                        x.classList.add('dz-ligado', cor);
                        x.setAttribute('aria-disabled', 'true');
                    });
                    sel = null;
                    feitos++;
                    acertoParcial(b);
                    if (feitos >= pares.length) resolver();
                } else {
                    errar(b);
                }
            }

            pares.forEach((par, idx) => {
                const b = botao('dz-ponta', par[0]);
                b.addEventListener('click', () => tocar('e', idx, b));
                colE.appendChild(b);
            });
            embaralhar(pares.map((_, idx) => idx), true).forEach(idx => {
                const b = botao('dz-ponta dz-ponta-dir', pares[idx][1]);
                b.addEventListener('click', () => tocar('d', idx, b));
                colD.appendChild(b);
            });
            grade.append(colE, colD);
            area.appendChild(grade);
        },

        /* Monta a resposta com letras embaralhadas (com código e chave, se houver `cifra`) */
        enigma(etapa, area) {
            const resposta = maiusc(etapa.resposta).trim();
            const esperadas = Array.from(resposta.replace(/\s+/g, ''));
            const pecas = [...esperadas, ...Array.from(maiusc(etapa.extras || '').replace(/\s+/g, ''))]
                .map((ch, id) => ({ ch, id }));
            const vagas = new Array(esperadas.length).fill(null);   // id da peça em cada vaga
            let travado = false;

            if (etapa.cifra) {
                const caixa = el('div', 'dz-cifra');
                caixa.append(el('p', 'dz-cifra-rotulo', '🔐 ' + ui('mensagemSecreta')), el('p', 'dz-cifra-msg', etapa.cifra.mensagem || ''));
                if (Array.isArray(etapa.cifra.chave) && etapa.cifra.chave.length) {
                    caixa.appendChild(el('p', 'dz-cifra-rotulo', '🗝️ ' + ui('chaveCodigo')));
                    const chave = el('div', 'dz-chave');
                    etapa.cifra.chave.forEach(([simbolo, letra]) => {
                        const par = el('span', 'dz-chave-par');
                        par.append(el('span', 'dz-chave-simbolo', simbolo), el('span', 'dz-chave-igual', '='), el('span', 'dz-chave-letra', maiusc(letra)));
                        chave.appendChild(par);
                    });
                    caixa.appendChild(chave);
                }
                area.appendChild(caixa);
            }

            const linha = el('div', 'dz-resposta');
            const vagasEls = [];
            let j = 0;
            resposta.split(/\s+/).forEach(palavra => {
                const grupo = el('span', 'dz-resposta-palavra');
                Array.from(palavra).forEach(() => {
                    const pos = j++;
                    const v = botao('dz-letra-vaga');
                    v.addEventListener('click', () => {
                        if (st.resolvida || travado || vagas[pos] == null) return;
                        devolver(pos);
                        playSound('pageFlip');
                        atualizar();
                    });
                    vagasEls.push(v);
                    grupo.appendChild(v);
                });
                linha.appendChild(grupo);
            });

            const banco = el('div', 'dz-banco dz-banco-letras');
            const tiles = {};
            const ordem = embaralhar(pecas.map(p => p.id), true);
            // Se as letras repetidas deixaram a palavra igual à resposta, embaralha de novo
            for (let t = 0; t < 10 && ordem.length > 1 && ordem.map(id => pecas[id].ch).join('') === pecas.map(p => p.ch).join(''); t++) {
                ordem.splice(0, ordem.length, ...embaralhar(pecas.map(p => p.id), true));
            }
            ordem.forEach(id => {
                const c = botao('dz-letra', pecas[id].ch);
                tiles[id] = c;
                c.addEventListener('click', () => {
                    if (st.resolvida || travado || c.classList.contains('dz-usado')) return;
                    const pos = vagas.indexOf(null);
                    if (pos < 0) return;
                    vagas[pos] = id;
                    c.classList.add('dz-usado');
                    c.disabled = true;
                    playSound('wordPop');
                    atualizar();
                    if (!vagas.includes(null)) conferir();
                });
                banco.appendChild(c);
            });

            function devolver(pos) {
                const t = tiles[vagas[pos]];
                vagas[pos] = null;
                t.classList.remove('dz-usado');
                t.disabled = false;
                return t;
            }

            function atualizar() {
                vagasEls.forEach((v, pos) => {
                    const id = vagas[pos];
                    v.textContent = id == null ? '' : pecas[id].ch;
                    v.classList.toggle('dz-vaga-cheia', id != null);
                    v.setAttribute('aria-label', id == null ? `${pos + 1}: ${ui('vagaVazia')}` : `${pos + 1}: ${pecas[id].ch} (${ui('devolver')})`);
                });
                const prox = vagas.indexOf(null);
                vagasEls.forEach((v, pos) => v.classList.toggle('dz-vaga-atual', pos === prox && !travado));
            }

            function conferir() {
                const erradas = [];
                vagas.forEach((id, pos) => { if (pecas[id].ch !== esperadas[pos]) erradas.push(pos); });
                if (!erradas.length) {
                    travado = true;
                    vagasEls.forEach(v => { v.classList.add('dz-travada'); v.disabled = true; });
                    atualizar();
                    resolver();
                    return;
                }
                travado = true;   // um instante, para a criança ver o balanço antes das letras voltarem
                balancar(linha);
                errar(linha);
                setTimeout(() => {
                    travado = false;
                    if (!st || st.resolvida) return;
                    erradas.forEach(devolver);
                    atualizar();
                }, 650);
            }

            area.append(linha, banco);
            atualizar();
        },

        /* Reconto com erros: toca nas palavras erradas ([[errado|certo]]) e elas se corrigem */
        erro(etapa, area) {
            const texto = String(etapa.texto);
            const re = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
            const p = el('p', 'dz-reconto');
            let total = 0;
            let achados = 0;
            const contador = el('p', 'dz-progresso');

            function palavrasNormais(trecho) {
                trecho.split(/(\s+)/).forEach(pedaco => {
                    if (!pedaco) return;
                    if (/^\s+$/.test(pedaco) || !/[\p{L}\p{N}]/u.test(pedaco)) {
                        p.appendChild(document.createTextNode(pedaco));
                        return;
                    }
                    const b = botao('dz-palavra', pedaco);
                    b.addEventListener('click', () => {
                        if (st.resolvida) return;
                        errar(b);
                    });
                    p.appendChild(b);
                });
            }

            let ultimo = 0;
            let m;
            while ((m = re.exec(texto))) {
                palavrasNormais(texto.slice(ultimo, m.index));
                const [, errado, certo] = m;
                total++;
                const b = botao('dz-palavra', errado);
                b.addEventListener('click', () => {
                    if (st.resolvida || b.classList.contains('dz-corrigida')) return;
                    b.classList.add('dz-corrigida');
                    b.setAttribute('aria-disabled', 'true');
                    b.setAttribute('aria-label', `${errado} → ${certo}`);
                    b.innerHTML = `<s>${esc(errado)}</s> <span class="dz-certo">${esc(certo)}</span>`;
                    achados++;
                    contador.textContent = ui('errosAchados', achados, total);
                    acertoParcial(b);
                    if (achados >= total) resolver();
                });
                p.appendChild(b);
                ultimo = re.lastIndex;
            }
            palavrasNormais(texto.slice(ultimo));
            contador.textContent = ui('errosAchados', 0, total);
            area.append(contador, p);
        }
    };

    /* ------------------------------------------------------------------
       Ganchos chamados por livro.js
       ------------------------------------------------------------------ */
    document.addEventListener('click', (e) => {
        const b = e.target.closest && e.target.closest('[data-abrir-desafio]');
        if (b) abrir(Number(b.dataset.abrirDesafio));
    });

    window.CamadaDesafios = {
        quadro,
        abrir,
        fechar,
        /* Modo ligado: carrega os dados da parte, põe os quadros e avisa o que faltar */
        ligar({ doUsuario } = {}) {
            return carregarDados().then(() => {
                if (!modoDesafio) return;
                atualizarQuadros();
                if (ausente) avisar(ui('desafiosPreparando'));
                else if (idioma !== PT) avisar(ui('desafiosSoPortugues'));
                else if (doUsuario) avisar(ui('desafioLigado'));
                if (!abriuPelaUrl && PARAMS.get('desafio') === '1') {
                    abriuPelaUrl = true;
                    abrir(currentPage);
                }
            });
        },
        desligar() {
            fechar();
            avisar(null);
            atualizarQuadros();
        },
        /* Os quadros já foram refeitos (traduzirPagina); fora do português, só um aviso */
        aoTrocarIdioma() {
            carregarDados().then(() => {
                if (!modoDesafio) return;
                atualizarQuadros();
                if (!ausente && idioma !== PT) avisar(ui('desafiosSoPortugues'));
                else if (!ausente) avisar(null);
            });
        }
    };
})();
