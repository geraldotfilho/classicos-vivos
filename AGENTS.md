# AGENTS.md — Memória de Arquitetura, UX e Protocolos Operacionais
## Coleção Clássicos Vivos: Livros Interativos Infantis para Tablet

Este documento consolida a memória arquitetural, os princípios pedagógicos, as regras de design de interface, o fluxo de ativos visuais e os protocolos de automação do projeto **Clássicos Vivos**. Ele serve como guia definitivo para agentes de IA (Claude, Gemini, Codex, Cursor ou qualquer outro) e desenvolvedores que assumirem o projeto em sessões futuras.

---

## 0. Como trabalhar neste projeto (leia primeiro, vale para qualquer agente)

### 0.1 Filosofia em cinco linhas
1. **Para quem**: crianças de 5 a 8 anos, lendo no tablet com um adulto. O leitor de referência é uma criança de **6 anos** (§3.5).
2. **O quê**: clássicos da literatura adaptados com fidelidade ao espírito e **proteção da infância**, com ilustração em aquarela, narração e interações que **nascem da história e alfabetizam** (§3.3).
3. **Como**: livros como configuração de um **motor único**, offline, sem build para quem lê (§2).
4. **Ritmo**: **uma parte por vez**, com **paradas para o humano** ler com o filho e aprovar. Nada é publicado sem esse "aprovado".
5. **Economia**: a API paga só com autorização do humano no prompt da sessão, sempre no modo mais barato e com o gasto registrado (§2.7).

### 0.2 Ordem de leitura numa sessão nova
1. `docs/RETOMADA.md`: onde o trabalho parou e qual é a próxima sessão.
2. Este `AGENTS.md`: arquitetura e regras.
3. `docs/RECEITA-CLASSICO-VIVO.md`: a **receita geral** (fases, paradas, crivos, modelos), que vale para qualquer obra.
4. A **receita específica** da obra (`docs/receitas/<OBRA>.md`, ex.: `docs/receitas/DOM-QUIXOTE.md`): o que vale só para aquela obra ou tipo de adaptação.
5. O **plano** do livro (`docs/PLANO-*.md`) e o **caderno** da parte em produção (`docs/cadernos/<livro>-parte-N.md`).
6. Só então, os documentos da frente de trabalho: `ARTE-PELA-API.md`, `TODO-NARRACAO.md`, `docs/fila/` etc.

### 0.3 Papéis
| Papel | Quem é hoje | O que faz |
| :--- | :--- | :--- |
| **Humano** (responsável) | o autor do projeto, que lê os livros com o filho | aprova as paradas 🛑, autoriza a API paga e define o teto de gasto |
| **Agente principal** | Claude Code (nos documentos, "o Claude") | adaptação e texto, plano de interações, código, testes, narração e, com autorização, arte pela API; escreve os documentos de plano, cadernos, receitas e `docs/fila/PEDIDOS.md` |
| **Agente de arte** | Gemini no Google Antigravity (nos documentos, "o Gemini") | ilustrações na cota do plano Pro do humano, pela fila `docs/fila/`; escreve só `ENTREGAS.md` e os arquivos de arte que são dele |

Outro agente pode assumir um papel: nesse caso, ele segue as mesmas regras e é dono dos mesmos arquivos (tabela de donos em `docs/fila/PEDIDOS.md`). As regras da API paga (§2.7) valem para todos.

### 0.4 Regras de convivência
- **Português do Brasil** em tudo (código comentado, documentos, commits).
- **Nunca quebre o que está publicado**: obra nova ou versão nova nasce como **rascunho** (§2.5, §3.4).
- **Trabalhe numa branch** e entregue por PR (§6); o humano autoriza o merge direto na `main`. Se o ambiente da sessão define uma branch, use-a.
- **Feche a sessão** com o `npm run build` (se mexeu em HTML, classes, ícones ou imagens), os testes, o PR, o caderno e a `docs/RETOMADA.md` atualizados e, se houve gasto, quanto foi.
- **Documente o que aprendeu**: regra geral → receita geral; regra de uma obra → receita específica; arquitetura → este arquivo; pendência → `docs/BACKLOG.md`; entrega → `docs/HISTORICO.md`.

---

## 1. Visão Geral e Propósito

- **Público-Alvo**: Crianças em fase de alfabetização e letramento (5 a 8 anos).
- **Proposta Pedagógica**: Aproximar as crianças das maiores obras-primas da literatura universal através de uma experiência interativa, sensorial, visualmente rica e de toque acolhedor.
- **Tipos de adaptação** (receita geral §2): **condensação** de obras longas (resumir e escolher, como em Dom Quixote) e **adequação/ampliação** de obras curtas (atualizar para hoje e para a idade, às vezes ficando maior que o original; receita ainda a escrever). As decisões de cada obra ficam na receita específica dela, em `docs/receitas/`.
- **Obra Piloto**: *Dom Quixote de La Mancha*, adaptado diretamente da obra de Miguel de Cervantes, em **dois volumes, como o original**:
  - **Primeiro volume (1605), Partes 1 a 4**, na prateleira de cima (capítulos numerados em sequência: 1–7, 8–15, 16–22, 23–29; Parte 2 com 9 páginas ao abrir com o tombo nos moinhos). Parte 1: *O Cavaleiro da Super Imaginação*; Parte 2: *Exércitos de Lã e o Elmo Encantado*; Parte 3: *Serra Morena e a Princesa Micomicona*. Decisões de adaptação e o mapa de interações das Partes 2–3 estão em `docs/PLANO-PARTES-2-4.md`.
  - **Correção de rumo (2026-10-25)**: a Parte 4 atual (*A Jaula Encantada e a Ilha de Sancho*) resumia 81 capítulos em 7 páginas e ficou apressada. Ela será **refeita para fechar o primeiro volume**, e o **segundo volume (1615)** vira pelo menos **três partes novas (5 a 7)**, na prateleira de baixo. Plano, escaletas e andamento: `docs/PLANO-DOM-QUIXOTE-PARTES-4-7.md`. O que vale só para Dom Quixote (a condensação e as lentes): `docs/receitas/DOM-QUIXOTE.md`.
- **Diretriz de Dispositivo**: **Tablet-First** (iPad, Samsung Galaxy Tab). Dimensões alvo prioritárias:
  - **Tablet Retrato (Portrait)**: 800 × 1280 px
  - **Tablet Paisagem (Landscape)**: 1280 × 800 px
  - Áreas mínimas de toque (touch targets): **≥ 48 × 48 px** (idealmente 56–64 px com cantos arredondados).

---

## 2. Arquitetura Técnica & Frontend

O projeto adota uma filosofia **Zero-Build para o leitor**: cada livro é um HTML autocontido que abre direto no navegador, sem servidor, e **funciona 100% offline**. Não existe nenhuma dependência de CDN. Os poucos arquivos gerados (CSS, fontes, ícones, service worker) ficam **versionados no repositório**. O `npm` é só ferramenta de desenvolvimento, nunca é exigido de quem lê.

### 2.1 Tecnologias Utilizadas
- **HTML5 & CSS3 Moderno**: Estrutura semântica e layouts fluidos com CSS Grid e Flexbox.
- **Tailwind CSS compilado** (`assets/css/tailwind.css`): contém só as classes usadas nos HTMLs. **Proibido voltar ao `cdn.tailwindcss.com`**, que exige internet e é feito para protótipo, não para produção.
- **Fontes locais** (`assets/fonts/`, `assets/css/fonts.css`): Fredoka (títulos) e Nunito (texto), subconjunto latin (cobre todo o português).
- **Ícones Phosphor locais** (`assets/css/icons.css`): cada ícone usado vira uma máscara SVG embutida, com as mesmas classes (`ph-bold ph-arrow-left`, `ph-fill ...`). O JS pode trocar `className` normalmente.
- **Ilustrações em WebP** (1376 × 768, qualidade 80, ~150–230 KB cada).
- **PWA**: `manifest.webmanifest` + `sw.js` na raiz. O service worker baixa todos os livros na primeira visita via HTTPS (GitHub Pages). HTML segue a estratégia rede-primeiro; o resto, cache-primeiro.
- **Web Audio API Procedural**: Todos os efeitos sonoros (fanfarras de cavaleiro, arpeggios mágicos, cliques táteis de cartões de leitura, pops lúdicos) são sintetizados matematicamente via código (`AudioContext`), dispensando dependências de arquivos MP3/WAV externos pesados.
- **Narração**: gravada (vozes neurais da API de voz do Gemini, produzidas pelo agente principal, um MP3 por página com o tempo de cada frase) com a **Web Speech API** do aparelho como reserva automática. Ver §2.6.
- **Pointer Events**: Eventos unificados (`pointerdown`, `pointermove`, `pointerup`) para drag-and-drop fluido compatível tanto com touchscreen/caneta quanto com mouse. O swipe de troca de página ignora toques iniciados em `.draggable-card`.

### 2.1.1 Ferramentas de Desenvolvimento (`npm run build`)
```bash
npm install          # uma vez (Tailwind, fontes e ícones como devDependencies)
npm run build        # fontes + ícones + Tailwind + service worker
npm run build:images # converte novos JPG/PNG de <livro>/imagens/ para WebP
npm run build:audio  # converte a narração WAV/PCM de <livro>/audio/ para MP3 (corta silêncios)
npm run exportar:frases # lista de frases e palavras-chave para gravar (docs/narracao/, já incluso no build)
npm run exportar:traducoes # o que traduzir, parte por parte (docs/traducao/, já incluso no build)
npm run conferir:traducoes # confere as traduções (páginas, palavras-chave, sílabas, textos soltos, páginas desatualizadas)
npm run gravar:narracao -- --voz narracao --parte 1 --pagina-inteira --autorizado # grava pela API de voz do Gemini (§2.7: só com autorização do humano)
npm run gerar:imagens -- --lista tools/arte/dom-quixote-parte-2.mjs --seco   # ilustrações pela API (Batch), só com autorização pontual (§2.7, docs/ARTE-PELA-API.md)
```
**Rode `npm run build` sempre que** usar uma classe Tailwind nova, um ícone Phosphor novo, ou adicionar/alterar qualquer HTML ou imagem. O `sw.js` precisa da lista atualizada e de uma nova versão de cache, senão os tablets não recebem a mudança. Os scripts ficam em `tools/`, e `sw.js` é gerado a partir de `tools/sw.template.js` (nunca edite `sw.js` à mão).

### 2.2 Isolamento de Páginas e Navegação
- **Eliminação de Ghosting/Bleed-Through**: Para alternar entre as páginas do livro, as páginas inativas devem **obrigatoriamente** receber a regra:
  ```css
  .page-hidden {
      display: none !important;
  }
  ```
  *Nota*: O uso exclusivo de `opacity: 0` ou transições com `position: absolute` causa sangramento visual em capturas de tela e acionamento acidental de elementos ocultos.
- **Parâmetros de URL para Testes e Navegação**:
  O aplicativo suporta parâmetros de query na URL para inicialização direta em qualquer página e modo de lente:
  ```text
  ?page=N&imag=1
  ```
  - `page`: índice da página, de `0` (a capa) ao número de páginas menos 1 (ex.: na Parte 1, `?page=3` para o Capítulo 3, `?page=6` para Sancho Pança, `?page=7` para os Moinhos).
  - `imag=1` ou `imag=true`: Ativa imediatamente a **Lente da Imaginação** daquela página.
- **Convenção de nomes das ilustrações**: `pN` = **índice da página** (`?page=N`). Exemplos: `p2-real-stage-3.webp`, `p6-imag.webp` (Sancho), `p7-real.webp` (Moinhos).

### 2.2.1 Motor de Cenas (estado → ilustração)
- A ilustração de cada página é **derivada do estado** (lente + progresso) por `sceneFor(pageIdx)` / `realSceneFor(pageIdx)` e desenhada por `renderScene(pageIdx)`. Nunca atribua `img.src` direto num handler: altere o estado e chame `renderScene`.
- **Toda troca de ilustração passa por `setSceneImage`**, que:
  1. mostra **na hora** o spinner sobre a cena (`.scene-loading`) e trava os cartões e o botão da lente da página (`.page-busy`);
  2. só troca a imagem depois de decodificada (`img.decode()`, limite de 8 s) e com no mínimo 280 ms, entrando com *fade* (`.scene-enter`);
  3. ignora toques repetidos enquanto `sceneBusy[pageIdx]` estiver ativo.
  Isso evita que a criança toque duas vezes achando que a tela travou.
- `goToPage` pré-carrega todas as ilustrações da página atual e da seguinte (`allSceneSrcs`).

### 2.2.2 Leitura Guiada Frase a Frase
- A divisão em frases é **canônica** e fica em `assets/js/texto.js`, usado pelo motor e pela exportação (`tools/exportar-frases.mjs`). Cada frase vira `<span class="sentence" data-frase="pN-sK">` (página N, frase K), e esse ID é o nome do arquivo da narração gravada. Não há quebra antes de minúscula, então falas com travessão ("bravura! — pensou o fidalgo") ficam numa frase só. **Mudou a regra de corte ou o texto?** Rode `npm run exportar:frases`: o `hash` de cada frase mostra o que precisa ser regravado.
- **O título também é lido**: capítulo + título (na capa, obra + título da parte) são a "frase 0" da página, `pN-s0` (`Texto.tituloDaPagina`), no cabeçalho com `class="sentence"`. A leitura guiada começa por ele.
- "Ouvir Página" narra frase por frase (`.sentence-reading` destaca e rola até a frase). **Tocar numa frase** (`lerAPartirDaFrase`) começa a leitura por ela e segue até o fim da página; o toque numa palavra-chave continua abrindo o cartão de alfabetização. Com a página gravada inteira, o MP3 vira um blob na memória (`audioComSalto`) para poder pular no tempo da frase.
- **Botão Aa / AA** (topo): o texto da folha todo em MAIÚSCULAS (`body.texto-maiusculo`, só CSS `text-transform`; a fala não muda). Lembrado em `localStorage` (`cv-maiusculas`). Frases curtas também evitam o corte de falas longas do Chrome Android.
- O texto falado (`prepararFala`) converte as palavras-chave para minúsculas (a voz não soletra "IMAGINAÇÃO" como sigla), tira o travessão que abre a fala, troca o travessão do meio por uma pausa curta e lê onomatopeias ("TAC-TAC" → "tac, tac"). Para interromper a leitura, use sempre `stopReadingPage()` (cala a gravação e a voz do aparelho).

### 2.3 Responsividade & Regras de Layout do Reader Frame
Para garantir que o texto narrativo nunca seja cortado ou coberto pela barra de navegação inferior:
- **Tablet Retrato**:
  ```css
  .storybook-frame {
      height: calc(100vh - 10px);
      height: calc(100dvh - 10px);
      max-height: 100%; /* Permite expansão vertical no formato retrato */
  }
  ```
- **Tablet Paisagem**:
  ```css
  @media (min-width: 1024px) and (orientation: landscape) {
      .storybook-frame {
          max-height: 900px; /* Mantém proporção harmônica no formato paisagem */
      }
  }
  ```
- **Nunca centralize verticalmente um contêiner rolável com `align-items: center`**: quando o conteúdo é mais alto que a área, o topo fica cortado e inalcançável. Para centralizar conteúdo que pode crescer, use um filho com `min-height: 100%` + `justify-content: center` (como `.page-text-inner`).

### 2.4 Layout de Livro Aberto (spread)
Cada `section.page-slide.spread` é um **livro aberto** com duas folhas de papel sobre a capa de couro (`.book-viewport`):
- **`.page-art`**: ilustração (com lente, bandeja de cartões e badge). **`.page-text`**: capítulo, título e texto.
- **Paisagem** (`orientation: landscape`): folhas **lado a lado**, lombada vertical no meio. **Retrato**: folhas **empilhadas** (ilustração em cima, texto embaixo), lombada horizontal. As sombras da lombada e as bordas das folhas empilhadas são só CSS.
- **Só o texto rola** (`.page-text-scroll`, `overscroll-behavior: contain`): a ilustração fica sempre à vista durante a leitura. O `#pages-viewport` **não rola** (`overflow: clip`). Quando há mais texto abaixo, aparecem um esmaecido e a seta ⬇ "Continuar lendo" (`updateScrollHint`). A leitura guiada rola só a coluna de texto (`scrollTextToSentence`); não use `scrollIntoView`, que pode deslocar contêineres com `overflow: hidden`.
- A ilustração ocupa a largura da folha, mas encolhe para caber na altura (`.art-plate` com `container-type: size` e unidades `cqh`).
- **Virada de página** (`animateTurn`): a página real troca na hora (`.page-hidden` continua obrigatório) e, por cima, uma camada `.turn-layer` com **cópias inertes** (`inertClone`: sem `id`, `pointer-events: none`) monta uma folha 3D que gira em torno da lombada em 750 ms, com sombreamento:
  - paisagem, avançar: a folha da direita (texto antigo → ilustração nova no verso) gira para a esquerda; voltar: o espelho;
  - retrato: a folha inteira gira pela borda esquerda, como num leitor de uma página.
  Durante a virada, `isTurning` ignora novos comandos de navegação. Com `prefers-reduced-motion`, a troca é instantânea. Abrir por `?page=N` não anima.

### 2.5 Motor Único e Livros como Configuração (`assets/js/livro.js`)
Todas as partes usam **o mesmo motor** (`assets/js/livro.js` + `assets/css/livro.css`). Cada `parte-N.html` só tem o `<head>` padrão, um `<script>` com `window.LIVRO = {...}` e `<script src="../assets/js/livro.js">`. O motor monta a moldura, o livro aberto, as lentes, os cartões, as camadas, a leitura guiada, o cartão de alfabetização e a virada de página. **Nunca copie o motor para dentro de um livro**: melhorias no motor valem para todas as partes de uma vez.
```js
window.LIVRO = {
  obra, autor, parte, totalPartes,
  rascunho?: true,                        // obra em produção (ver abaixo); some ao publicar
  imagens: './imagens/parte-2/',          // nomes simples de imagem são relativos a esta pasta
  fim: { mensagem, proxima: './parte-3.html', proximaRotulo },   // bloco final da última página
  paginas: [{
    capa: true | capitulo: '🌳 Capítulo 8 • ...', corCapitulo: 'text-emerald-700',
    titulo: '...',
    texto: `Parágrafos separados por linha em branco. Palavras-chave: {{CARVALHO|CAR • VA • LHO|🌳}}`,
    cena: {
      real, imag, alt, emoji /* do aviso "ilustração a caminho" */, legendaReal, legendaImag,
      hotspots: [{ x, y, w, h, palavra, emoji, emojiImag?, lente?: 'real'|'imag', acao? }],
      camadas: [{ id, src | fundo /* véu CSS */, x, y, w, h?, z?, anim?, lente?, item?, ate?, emoji }],
      cartoes: { tipo, itens: [{ id, palavra, emoji, icone?, borda?, som?, animar?, efeito?, acao?, domId? }], ... },
      realCena?: (estado) => ({ src, legenda }) | null,   // variação da Realidade calculada pelo estado
      extra?, precarregar?, aoTrocarLente?
    }
  }],
  acoes: { nome: (livro, contexto) => {} }   // ações personalizadas (ex.: o VENTO da Parte 1)
};
```
- **Tipos de cartão** (`cena.cartoes.tipo`):
  | Tipo | Comportamento | Exemplo |
  | :--- | :--- | :--- |
  | `progressivo` | ilustrações **cumulativas** (`etapas`, `legendas`) numa **ordem fixa** (`ordem`) | vestir o cavaleiro |
  | `variante` | itens independentes: a cena mostra a variante do último (`variantes`, `legendaTodas`) | pousada da Parte 1 |
  | `camadas` | cada item mostra/esconde camadas (`item`/`ate`) e pode disparar um `efeito`; qualquer ordem | mesa dos pastores, bengala |
  | `contagem` | um cartão; cada toque revela a próxima camada de `sequencia` e fala `falas[n]` | cabras no barco |
  | `ordem` | palavras na ordem certa, escritas numa faixa e lidas em voz alta | assinatura da carta |
  | `acao` | chama `LIVRO.acoes[item.acao]` com a API da página | vento nos moinhos |
  | `livre` | só celebra. **Evite** (§3.3) | (provisório) |
- **Arte ausente não quebra nada**: cena sem arquivo mostra "🎨 Ilustração a caminho"; camada sem arquivo mostra o `emoji` dela. Assim o texto e as interações podem ser escritos e testados **antes** da arte do Nano-Banana.
- **Rascunho** (`rascunho: true`): o livro mostra o selo "📝 Rascunho", lê só com a voz do aparelho em português (a narração gravada e as traduções seriam de outro texto; `?narracao=1` libera a gravação para a escuta da fase 6), não carrega traduções e guarda o progresso numa chave à parte (`cv-progresso-…-rascunho`), sem mexer no "Continuar lendo" da estante. A obra em produção também tem uma entrada em `assets/js/acervo.js` (§3.4). Uma versão nova de uma parte já publicada nasce num arquivo à parte (ex.: `parte-4-rascunho.html`).
- **Eventos delegados** (sem `onclick` no HTML): palavras-chave (`data-palavra`), lente (`data-lente`), hotspots (`data-hotspot`) e navegação (`data-nav`).

### 2.6 Vozes e Narração Gravada
- **Painel "Voz"** (botão 🗣️ no topo do livro): lista as **narrações gravadas** (`<livro>/audio/vozes.js`) e as **vozes em português do aparelho**, ordenadas da mais natural para a menos (neurais/"Natural" > aprimoradas > Google > demais; pt-BR antes de pt-PT). Cada uma tem um ▶ de amostra e as etiquetas "funciona offline"/"precisa de internet". Também tem **velocidade** 🐇 normal / 🐢 devagar. A escolha fica no `localStorage` (com `try/catch`).
- **Narração gravada**: **uma voz por vez** no livro (decisão do humano): a pasta `narracao`, com a narradora e vozes próprias para as falas dos personagens. Arquivos em `<livro>/audio/<voz>/parte-N/<id-da-frase>.mp3`; palavras-chave em `<livro>/audio/palavras/<slug>.mp3` (sílabas pausadas + palavra inteira). A voz só aparece como completa quando o número da parte está em `partes` no `vozes.js` (as Partes 1 a 4 de Dom Quixote já estão).
- **Reserva em cascata, nunca silêncio**: frase sem gravação → voz do aparelho; voz "online" sem internet → melhor voz offline do aparelho (até recarregar a página). Na primeira visita, se houver narração gravada pronta para a parte, ela vira a voz padrão.
- **Offline**: o service worker **não** pré-baixa os áudios (são grandes). Os MP3 seguem **rede primeiro** (uma frase regravada com o mesmo nome chega ao tablet) e ficam num cache próprio (`cv-narracao`, que sobrevive às novas versões), para tocar offline depois da primeira vez. O SW pede o arquivo inteiro (200) em vez do trecho (Range/206) que o `<audio>` pede, senão nada seria guardado. O `vozes.js` também é buscado na rede primeiro.
- **Página inteira** (o padrão): `<voz>/parte-N/paginas.json` lista as páginas gravadas num áudio só (`pN.mp3`) e o tempo de cada frase (`ini`/`fim`). "Ouvir Página" toca esse MP3 e destaca a frase pelo `currentTime` (`lerPaginaInteira`). As páginas fora dele seguem frase a frase. O áudio que vem do service worker **não aceita salto no tempo** (`seekable` vazio); por isso, para começar numa frase do meio, o MP3 da página vira um blob na memória (`audioComSalto`, §2.2.2).
- **Vozes dos personagens**: o roteiro (`narracao/parte-N/roteiro.json`) diz quem fala cada trecho, e o elenco fica em `ELENCO` (`tools/gravar-narracao.mjs`). **Economia** (limite de R$ 30/mês do humano): a API paga só produz vozes; a conferência é local (`tools/transcrever.py`, Whisper).
- **Prévia**: uma voz com a parte em `previa` (no `vozes.js`) aparece no painel com só algumas frases gravadas (as demais usam a voz do aparelho) e nunca vira a voz padrão. Serve para o humano ouvir no livro antes de a produção seguir.
- Produção das gravações: `docs/TODO-NARRACAO.md` e `npm run gravar:narracao` (Claude, via API do Gemini `gemini-3.8-flash-tts` com a chave como segredo de rede do ambiente, injetada pelo proxy; ela **nunca** é impressa nem versionada). **Regras de uso da API: §2.7.** Lista do que gravar: `docs/narracao/frases-<livro>-parte-N.json`.

### 2.7 Uso da API paga do Gemini (regra do humano, 2026-10-24)
A API é paga pelo humano, num projeto de hobby com **limite de R$ 30/mês** (era R$ 10 até 2026-10-24), e a verba precisa render para **muitos livros e, quem sabe, novas vozes**. Por isso:
1. **Só para produzir as vozes da leitura** (narração e palavras-chave). **Nada mais**: nem testes de acesso, nem transcrição, nem avaliação de áudio, nem texto, nem imagens, nem listar ou criar vozes "para ver".
2. **Só com autorização explícita do humano no prompt inicial da sessão.** Sem ela, a API não é chamada (nem para "um teste rápido"). O `tools/gravar-narracao.mjs` recusa sem `--autorizado`; passe a opção só quando o humano tiver autorizado aquela produção.
3. **Sempre do jeito mais econômico**: planeje com `--seco` (de graça), grave a página inteira num pedido só, não regrave o que já está bom (o `hash` evita), no máximo 2 tentativas, a conferência é **local e gratuita** (Whisper, `tools/transcrever.py`), e prefira o nível mais barato aprovado pelo humano (opções e preços em `docs/TODO-NARRACAO.md` §8.4).
4. **Registre o gasto**: cada rodada vai para `docs/narracao/gastos.csv` (o script faz isso). Ao fim do trabalho, diga ao humano quanto foi gasto.
5. **As imagens, por padrão, não usam a API paga** (decisão do humano, 2026-10-24): continuam com o agente Gemini no **Google Antigravity**, na cota do plano Pro do humano (com as pausas por cota). **Exceção pontual**: quando o humano autoriza (ex.: 2026-10-24, com a cota do Antigravity esgotada, as páginas 4–8 da Parte 2 e depois as Partes 3 e 4 inteiras), o Claude gera pela API com `npm run gerar:imagens` (Nano Banana 2, **Batch**, ~US$ 0,038 por imagem aceita), **só** o que foi autorizado. Método, preços e lições: `docs/ARTE-PELA-API.md` (§4.1: a **Lente da Imaginação transforma** personagens e cena, nunca só um detalhe).

### 2.8 Idiomas (bandeirinhas no topo do livro)
- O **português é o original** (`window.LIVRO` em `parte-N.html`). Cada tradução fica em `<livro>/traducoes/parte-N.<idioma>.js` (`en`, `fr`, `es`) e é carregada por `<script>` só quando o idioma é escolhido (funciona em `file://` e offline: o SW pré-baixa as traduções).
  ```js
  (window.TRADUCOES = window.TRADUCOES || {})['en'] = {
    obra: 'Don Quixote of La Mancha',
    paginas: [{ hash, capitulo?, titulo, texto, cartoes?: { ordem, itens } }],  // uma por página, na mesma ordem
    textos: { '👓 Lente da Realidade: ...': '👓 Reality Lens: ...', 'ARMADURA': 'ARMOUR' }  // dicionário pt → idioma
  };
  ```
  - `paginas[i]`: capítulo, título e texto (com as palavras-chave `{{WORD|SYL • LA • BLES|emoji}}` silabadas no idioma). `cartoes` só para os cartões do tipo `ordem` (a assinatura tem outra quantidade de palavras em cada idioma; palavras repetidas valem em qualquer um dos cartões iguais).
  - `textos`: legendas da cena, palavras dos cartões, falas da contagem, dicas dos hotspots, mensagem do fim. O motor traduz qualquer texto solto por `t(texto)`; o que faltar fica em português.
  - `hash`: copiado de `docs/traducao/fonte-<livro>-parte-N.json` (`npm run exportar:traducoes`). Mudou o português? `npm run conferir:traducoes` avisa quais páginas traduzir de novo.
- A **interface** (botões, painel de voz, dicas) fica em `IDIOMAS` no motor, com a bandeira (`assets/icones/bandeiras/*.svg`) e a variante de voz preferida (`pt-BR`, `en-GB`, `fr-FR`, `es-ES`). Idioma novo: uma entrada em `IDIOMAS` + os arquivos de tradução.
- Trocar de idioma refaz só os textos (`traduzirPagina`): a página, a lente e o progresso dos cartões continuam. A escolha fica em `cv-idioma` e vale para todas as partes; `?lang=en` abre direto num idioma (testes).
- **Narração**: cada idioma pode ter a sua narração gravada, com o mesmo fluxo do português (`npm run gravar:narracao -- --idioma en ...`, só com autorização do humano, §2.7):
  - pastas `<livro>/audio/narracao-<idioma>/` (com `elenco.json`: vozes, estilo, frase de amostra e nomes para o Whisper; e `parte-N/roteiro.json`) e `palavras-<idioma>/`;
  - frases em `docs/narracao/frases-<livro>-parte-N-<idioma>.json` (`npm run exportar:frases` exporta também as traduções);
  - no `vozes.js`, a voz leva `idioma: 'en'` (sem ele, é português); o painel só mostra as gravações do idioma atual;
  - sem gravação, a voz do aparelho naquele idioma (a escolha de voz é guardada por idioma: `cv-voz-en` etc.), inclusive nas palavras-chave.
- A segmentação de frases (`texto.js`) aceita o « » francês com espaço antes do fecho. Nas traduções, evite abreviações com ponto (Mr., Sr.), que cortariam a frase.
- **Portal e Menus Multilíngues**: `assets/js/i18n-site.js` estende o funcionamento multilíngue para fora dos livros (estante da biblioteca `index.html` e página explicativa `sobre.html`), com seletor de bandeiras sincronizado via `cv-idioma`.

---

## 3. Diretrizes Pedagógicas, UX e Crítica à Gamificação

### 3.1 A Dupla Lente da Imaginação (recurso próprio de Dom Quixote)
> O motor oferece as duas lentes a qualquer livro, mas elas nasceram do tema de *Dom Quixote* (o choque entre o real e o imaginado). Um livro novo só usa esse recurso, ou cria o seu, se o mapa da obra pedir (receita geral §3). Regras da Imaginação em Dom Quixote: `docs/receitas/DOM-QUIXOTE.md` §3.

- Cada página oferece dois pontos de vista alternáveis pelo botão de lente:
  1. **Lente da Realidade**: O mundo como ele é (Alonso Quixano idoso em sua poltrona; bacia de latão na cabeça; camponesa Aldonza; moinhos de vento na colina).
  2. **Lente da Imaginação**: Como Dom Quixote enxerga com seus olhos poéticos (O rei em seu trono com dragões e o **leão guardião**; armadura dourada reluzente; Princesa Dulcineia do Toboso; gigantes descomunais agitando braços de vento).
- **Consistência Textual**: O texto literário principal **não** é alterado ao trocar de lente; a cena visual é que se metamorfoseia, ensinando à criança a magia de ler e imaginar.

### 3.2 Fronteira Rígida da Pronúncia Silábica (`speakWord`)
- **Regra de Ouro**: A pronúncia silábica pausada (ex: `I-MA-GI-NA-ÇÃO`, `CA-VA-LEI-ROS`, `DRAGÕES`) aplica-se **exclusivamente** às palavras destacadas em caixa alta dentro do bloco de texto narrativo.
- **Proibição de Poluição Visual**: **NUNCA** adicionar cartões com leitura silábica ou balões de fala extensos dentro do quadro da cena interativa ou nas áreas de drop. O quadro da cena deve permanecer limpo, focado na arte e na atmosfera visual.
- **Cartão de Alfabetização** (`#phonics-modal`): ao tocar numa palavra-chave, abre-se um cartão **centralizado na tela** (vertical e horizontal), sobre um fundo escurecido, com o emoji, a palavra e as **sílabas em blocos de cores alternadas** (rosa, azul, amarelo, verde), para a criança ver onde cada sílaba começa e termina. O cartão **permanece aberto até um toque fora dele** (ou Esc), sem temporizador: a criança lê no próprio ritmo. Tocar no cartão repete a pronúncia. Ele fecha sozinho ao trocar de página. É uma camada sobre o livro inteiro, nunca um elemento dentro do quadro da cena.

### 3.3 Postura Crítica contra o Excesso de Gamificação
- **Aviso Mandatório**: Os agentes devem ser **sempre rigorosamente críticos** quanto a possíveis excessos de gamificação ao longo da narrativa.
- A interatividade **nunca deve competir com a leitura nem quebrar o ritmo poético do livro**.
- **Regra Prática**: Botões ou cartões arrastáveis que não geram transformação tangível e divertida na cena são ruído pedagógico e devem ser banidos.
  - *Exemplo real (Página 6)*: Na cena da sagração de cavaleiro, havia cartões para arrastar "LUA CHEIA" e "ESPADA" que apenas faziam a imagem tremer sem alterar a ilustração. Foram eliminados para manter o quadro limpo, preservando a interatividade das palavras apenas no texto da história.
  - *Exemplo de boa interatividade (Página 8, `?page=7`)*: O botão "VENTO" não é decorativo; ele dispara fisicamente a rotação acelerada das pás dos moinhos com som sintetizado de rajada e partículas `💨`, até culminar na transformação mágica dos moinhos nos gigantes de Cervantes.
- **Padrão ouro** (nota 10 do humano): a assinatura da carta (Dom Quixote, Parte 3, cap. 18), em que a criança ajuda Sancho a lembrar as palavras na ordem certa. O crivo de cinco perguntas e o cardápio de atividades alfabetizadoras estão na receita geral (`docs/RECEITA-CLASSICO-VIVO.md` §6.2).

### 3.4 Biblioteca para Crianças, Detalhes para Adultos
- `index.html` é uma **estante lúdica**: livros como capas grandes e tocáveis numa prateleira de madeira, com botão ▶. **Quanto menos texto, melhor**: nada de descrições, pilares, faixas etárias ou títulos de capítulos.
  - **Prateleira de cima**: as 4 partes do primeiro volume de Dom Quixote, publicadas (a capa de cada uma é o `p0-real` da parte, fixa no HTML).
  - **Prateleira de baixo**: o segundo volume de Dom Quixote (Partes 5–7), por enquanto só como **capas-teaser com cadeado** 🔒. Ao tocar numa delas, um aviso gentil diz que o livro ainda está sendo feito e será liberado em breve.
- **Obras em produção** (`assets/js/acervo.js`, lista única lida pela estante e pela página dos adultos): cada entrada tem `situacao` (`'fila'` ou `'rascunho'`), a `estante` onde aparece a capa-teaser (ou `null`, para uma versão nova de uma parte já publicada) e o `href` do rascunho. **Só entra ali o que já é rascunho ou está na fila para virar rascunho em breve** (decisão do humano, 2026-10-25): nada de cadeados de "próximos clássicos" sem obra definida.
- Tudo que é informação para adultos (proposta pedagógica, acervo detalhado, instruções de instalação e voz, licença) fica em `sobre.html`, acessível por um botão discreto "Para adultos" (ícone ⓘ). Lá fica também a seção **Livros em produção**, com a chave **"Mostrar os rascunhos"** (lembrada no aparelho em `cv-rascunhos`): ligada, lista as obras do `acervo.js`, e os rascunhos se abrem por ali. Na estante, nunca.
- **Publicar uma obra**: tirar `rascunho` do `window.LIVRO`, tirar a entrada do `acervo.js`, pôr a capa fixa na prateleira certa do `index.html` e a descrição no "Acervo" de `sobre.html` (textos traduzidos em `assets/js/i18n-site.js`). Livro novo: uma prateleira nova para ele.
- **Fluxos de Leitura ("Continuar", "Ler de Novo" e "Recomeçar Página")**:
  - `Continuar de onde parou`: guarda o progresso da leitura em `localStorage` (`cv-progresso-<livro>` e `cv-ultimo-livro`), oferecendo atalho destacado "Continuar da Página X" tanto na capa do livro quanto na estante da biblioteca (`index.html`).
  - `Ler de Novo`: na última página, limpa e reinicia o estado de todas as páginas (cartões, lentes, camadas) e retorna à capa.
  - `Botão 🔄 Recomeçar`: presente nas páginas de leitura ao lado do botão de lente, permite à criança reiniciar apenas as interações daquela página atual de volta ao estado inicial para brincar de novo à vontade.
- **Notificação de Atualização do PWA**: Quando o service worker detecta uma nova versão em cache, um aviso sutil (`✨ Nova versão disponível`) convida o usuário a atualizar com um toque.

### 3.5 Linguagem: simples sem perder a beleza
- **Leitor de referência: uma criança de 6 anos ouvindo (ou lendo junto com) um adulto.** Retorno do humano (2026-10-25): o texto das Partes 2–4 estava rebuscado demais, com construções complexas e palavras arcaicas, longe da realidade brasileira.
- **Faça**: frases curtas (uma ideia por frase), ordem direta, palavras do dia a dia do Brasil (pousada, moça, "o senhor", estilingue, "tremendo que nem gelatina"), verbos concretos e imagens vivas (o vinho "como um rio vermelho"). Diminutivos e expressões afetivas cabem.
- **Evite**: "vossa mercê", "donzela", "estalagem", "aposento", "desventurada", "sonâmbulo", "carmesim", ênclises e mesóclises rebuscadas, adjetivos empilhados ("vívido", "colossal", "engenhoso" na mesma frase) e palavras que só aparecem em livro antigo.
- **Palavras difíceis que fazem parte da história** (odre, elmo, bolota, fole, fidalgo) podem ficar, com uma explicação curta no próprio texto: "os odres: grandes sacos de couro, cheios de vinho". Nomes de Cervantes (Pandafilando da Fosca Vista, Alifanfarrão) ficam: são divertidos.
- Vale também para as traduções (§2.8), cada uma no dia a dia de uma criança daquele idioma.

### 3.6 Proteção da infância
- Muitos clássicos foram escritos quando a ideia de proteger a criança não existia como hoje. Adaptar é também trazer a obra para os valores de agora: sem violência como eixo, sem humilhação como piada, sem conteúdo adulto, sem medo gratuito, sem preconceito, sem castigo cruel apresentado como justo. O conflito, o perigo e a emoção que a história precisa ficam; muda a forma.
- Cada decisão é registrada com o motivo (no mapa da obra, receita geral §3). Exemplo: os cortes de Dom Quixote em `docs/receitas/DOM-QUIXOTE.md` §1.3.

## 4. Pipeline de Ilustração: Nano-Banana, Desacoplamento e Banco de Referências

### 4.1 Uso Obrigatório do Nano-Banana
- **Regra Indiscutível**: Todas as ilustrações, cenários, personagens e adereços visuais do projeto devem ser produzidos **exclusivamente através do Nano-Banana** (`image-generator`).
- **Proibição de Gambiarras Gráficas**: É terminantemente proibido tentar montar ilustrações por colagem vetorial SVG externa ou composições manuais quando o usuário pedir arte. O Nano-Banana possui sensibilidade única para aquarela infantil, guache caloroso e contornos suaves de lápis de cor.
- **Camada ≠ colagem achatada.** A distinção é importante:
  - ✅ **Permitido e incentivado (§4.2)**: o Nano-Banana gera o cenário limpo e, separadamente, personagens e adereços com fundo transparente, que o **livro** sobrepõe no HTML. Cada camada continua independente, animável e reutilizável.
  - ❌ **Proibido**: abrir uma ilustração pronta (com personagens) num editor, colar um recorte por cima e salvar o resultado como uma nova cena "achatada". Exemplo real: a antiga `p6-imag` era a capa (`p0-imag`) com Sancho na ilha colado dentro do arquivo. Perde-se a vantagem das camadas (nada se move), o fundo não é um cenário limpo e a cena não corresponde à da Lente da Realidade. Se a cena precisa de um elemento a mais, ele vira uma **camada no DOM** ou a cena é **gerada de novo inteira** pelo Nano-Banana.

### 4.2 Arquitetura Desacoplada: Cenário Separado de Personagens (Layered Scene)
Para possibilitar ricas experiências interativas sem perder a fidelidade artística do livro ilustrado:
1. **Cenário de Fundo (Background)**:
   - Produzido **limpo**, em proporção 16:9 (`aspect-[16/9]`, `object-contain`), sem personagens fixados diretamente no desenho.
   - Serve como palco imersivo permanente.
2. **Personagens e Adereços em Camadas (Transparent Sprites)**:
   - Produzidos com **fundo transparente (PNG com canal alfa)** ou fundo branco puro isolado para recorte de precisão.
   - Sobrepostos ao cenário através de posicionamento absoluto/relativo no DOM.
   - **Fundo para recorte: magenta puro `#FF00FF`, nunca branco** (o branco come as partes claras e deixa "chão"; ver P-003/P-005). `tools/recortar-camada.py` tira o magenta, desmistura as bordas e corta justo.
   - Camadas que o livro carrega ficam em `<livro>/imagens/camadas/` (WebP com alfa, gerado por `npm run build:images`). No `parte-N.html`, o `src` da camada aponta para o **`.webp`** (o motor não troca a extensão; um `.png` no código não carrega e cai no emoji). Recortes usados só como referência de prompt ficam em `biblioteca/referencias/`.
   - **Quando usar camada × ilustração inteira** (modelo híbrido):
     | Use **camada** quando o elemento… | Use **ilustração inteira** quando… |
     | :--- | :--- |
     | se move ou é animado (pás girando, porquinhos dançando, burrico andando, notas musicais) | é a grande transformação da **Lente da Imaginação** (a pintura integrada pesa mais que a animação) |
     | aparece/some com uma interação **independente** das outras (flauta, sopa): aceita **qualquer ordem** e combinações sem gerar uma imagem por combinação | personagens se **tocam ou interagem fisicamente** (escudo na mão, lança no punho, abraço): recortes separados não casam com a pose |
     | se repete em várias cenas (o mesmo Sancho, o mesmo Rocinante) | a luz, sombra ou atmosfera da cena inteira muda |
   - **Regras de integração das camadas** (para não parecer "colado"):
     1. Mesma **direção de luz**, paleta e espessura de traço do cenário. Gere a camada usando o cenário como imagem de referência.
     2. **Sombra de contato pintada no próprio sprite** (uma mancha suave sob os pés/cascos), para o personagem "pisar" no chão.
     3. Mesma **escala e perspectiva**: posicione e dimensione em `%` do quadro 16:9, ancorando pela base (pés), e confira nas duas orientações.
     4. Recorte limpo, **sem halo branco** nas bordas. Se o Nano-Banana entregar fundo branco, faça o recorte antes de versionar.
     5. Cada variação de pose (pastor parado × tocando) é um sprite próprio com **o mesmo enquadramento e tamanho de tela**, para trocar sem "pular".
   - **Motor de camadas implementado** (§2.5): `cena.camadas` com posição em % (`x`, `y` = base, `w`), visibilidade pelo estado (`item`: aparece depois que o item é usado; `ate`: some quando o item é usado), animação contínua (`anim`: `balanco`, `flutuar`, `girar`, `pulsar`, `martelar`) e efeitos de um toque (`efeito`: `cambalhota`, `pulo`, `estouro`, `atravessar`). Véus sem arte (ex.: a escuridão da noite) usam `fundo` com um gradiente CSS. Todas as partes de Dom Quixote já usam camadas (na Parte 1, as pás dos moinhos e a pousada).
3. **Mecânica Progressiva (Páginas 3, 4 e 5)**:
   - **Página 3 (`?page=2`, Capítulo 2 - A Armadura do Bisavô)**: Cada clique ou drop de um item da bandeja (`ARMADURA`, `BACIA`, `ESCUDO`, `LANÇA`) revela uma nova ilustração do personagem se vestindo progressivamente (`p2-real-stage-1.webp` a `p2-real-stage-4.webp`).
   - **Página 4 (`?page=3`, Capítulo 3 - O Cuidado com Rocinante)**: Cada clique ou drop de carinho (`MAÇÃ`, `CENOURA`, `ESCOVA`) revela uma nova ilustração do cavalo se alimentando alegremente, ganhando energia e com as crinas penteadas com esmero (`p3-real-stage-1.webp` a `p3-real-stage-3.webp`).
   - **Página 5 (`?page=4`, Capítulo 4 - O Acolhimento na Pousada)**: Os botões de `TROMBETA` e `SOPA` mostram, em camadas independentes e em qualquer ordem, o pastor tocando flauta com os porquinhos dançando e o estalajadeiro servindo a sopa (`camadas/p4-*.webp`; as antigas ilustrações inteiras `p4-real-flauta`/`p4-real-sopa` foram aposentadas).
   - **Regra das ilustrações cumulativas**: quando cada etapa **contém** as anteriores (a etapa 2 já mostra o peitoral da etapa 1), os itens **precisam seguir uma ordem fixa**, a mesma do texto, declarada em `cena.cartoes.ordem` (tipo `progressivo`). O próximo item brilha (`.card-next`), os seguintes ficam esmaecidos (`.card-waiting`) e um toque fora de ordem só dá uma dica gentil (som `hint` + balanço do cartão certo), **sem trocar a cena**. Nunca escolha a etapa pela *quantidade* de itens usados: esse foi o bug "toco na bacia e ele veste o peitoral". Se a interação precisar aceitar qualquer ordem, use **camadas independentes** por item (ver acima) ou ilustrações independentes por item (não cumulativas).
   - Usar um item com a Lente da Imaginação ativa volta para a Lente da Realidade (vestir e cuidar acontecem no mundo real).
   - **Tempo de Contemplação do Leitor**: É terminantemente proibido forçar auto-toggle, transições automáticas precipitadas ou piscamentos relâmpagos para a imaginação. O leitor infantil deve contemplar a cena real concluída pelo tempo que desejar. O botão da Lente da Imaginação apenas pulsa suavemente para convidar a criança à transformação deliberada.

### 4.3 Estrutura de Ativos (sem duplicatas) e Banco de Referências
```text
classicos-vivos/
├── assets/                              # Compartilhado por todos os livros
│   ├── js/  livro.js                    # O MOTOR dos livros (editado à mão)
│   ├── js/  texto.js                    # frases, HTML e texto falado (motor + exportação)
│   ├── js/  acervo.js                   # obras em produção (fila/rascunho): teasers da estante e lista para adultos
│   ├── js/  i18n-site.js                # idiomas e interações da estante (index) e de sobre.html
│   ├── css/ livro.css                   # estilo dos livros (editado à mão)
│   ├── css/  tailwind.css · fonts.css · icons.css
│   ├── fonts/                           # woff2 locais
│   └── icones/                          # ícones do app (PWA)
├── tools/                               # scripts de build (fontes, ícones, Tailwind, WebP, service worker)
├── docs/  RETOMADA.md (comece por aqui numa sessão nova) · RECEITA-CLASSICO-VIVO.md (receita geral) · PLANO-DOM-QUIXOTE-PARTES-4-7.md · BACKLOG.md (pendências) · HISTORICO.md (entregas) · TODO-NANO-BANANA.md · TODO-NANO-BANANA-PARTES-2-4.md · PLANO-PARTES-2-4.md · TODO-NARRACAO.md · ARTE-PELA-API.md
│   ├── receitas/                        # receitas específicas por obra ou tipo de adaptação (DOM-QUIXOTE.md)
│   ├── cadernos/                        # um caderno por parte em produção (fases, decisões, notas do humano)
│   ├── arquivo/                         # versões aposentadas guardadas para reaproveitar (ex.: traduções antigas)
│   ├── fila/                            # canal Claude ↔ Gemini (PEDIDOS.md, ENTREGAS.md)
│   ├── narracao/                        # frases e palavras-chave a gravar (gerado)
│   └── traducao/                        # o que traduzir, parte por parte (gerado)
├── index.html                           # Biblioteca das crianças (estante de livros, quase sem texto)
├── sobre.html                           # Detalhes para adultos (proposta, acervo, uso no tablet, licença)
├── sw.js · manifest.webmanifest
└── dom-quixote/
    ├── parte-1.html … parte-N.html      # só conteúdo (window.LIVRO), ver §2.5; rascunhos com `rascunho: true`
    ├── audio/                           # narração gravada: vozes.js, <voz>/parte-N/<id>.mp3, palavras/
    ├── traducoes/                       # parte-N.<idioma>.js (en, fr, es), ver §2.8
    ├── imagens/                         # FONTE ÚNICA do que o livro carrega (cenas pN-*.webp)
    │   ├── parte-2/ parte-3/ parte-4/   # cenas de cada parte (a Parte 1 fica na raiz de imagens/)
    │   │   └── camadas/                 # sprites com alfa daquela parte (WebP)
    │   ├── camadas/                     # sprites com alfa da Parte 1
    │   └── objetos/                     # ícones SVG das bandejas
    └── biblioteca/
        ├── CATALOGO.md
        └── referencias/                 # NÃO carregado pelo livro: contexto para o Nano-Banana
            ├── personagens/             # Sprites com canal alfa (Alonso simples, armadurado, dourado, etc.)
            ├── cenarios/                # Cenários vazios 16:9 (sótão, etc.)
            └── itens/                   # Adereços isolados (bacia, escudo, cocho...)
```
- **Nunca copie** uma ilustração de `imagens/` para `biblioteca/`. Cenas finalizadas já servem de referência: aponte o caminho original.
- Ilustração nova: salve o PNG/JPG em `imagens/`, rode `npm run build:images` (converte para WebP e apaga o original) e depois `npm run build:sw`.
- **Uso como Contexto**: Ao solicitar novas cenas ao Nano-Banana, os caminhos desses ativos de referência devem ser informados no prompt para que a IA mantenha total continuidade de design, proporção, tons de pele e vestimentas ao longo de toda a coleção.

### 4.4 Coerência Mitológica e Literária dos Monstros e Transformações
- **Proibição de Monstros Estilo Alien / Cartoon Genérico**: As transformações imaginárias devem respeitar a atmosfera clássica da literatura de Cervantes.
- *Caso dos Moinhos (Página 8 / `?page=7` / Capítulo 7)*: Os gigantes não podem ser aliens ou "blobs" coloridos sem nexo. Devem ser titãs mitológicos de pedra, terra e musgo cujos braços giratórios são as próprias vigas dos moinhos girando no vendaval, com Dom Quixote investindo heroicamente de lança em punho e Sancho Pança abismado sobre o burrico.

---

## 5. Protocolo de Testes Automatizados no Tablet

Para validar a integridade da interface em tablets sem intervenção manual, use um navegador headless nas resoluções padronizadas. **Linux/macOS (contêineres de agentes)**: Chromium + Playwright (`require('playwright')`, `chromium.launch()`), servindo a raiz com `python3 -m http.server`, viewports 800 × 1280 e 1280 × 800, nas duas lentes, clicando nas atividades com `locator.click()` (o motor usa *pointer events*). **Windows (máquina do humano)**: os comandos abaixo, com o Google Chrome. Para testar o service worker (PWA offline), sirva por HTTP (`python -m http.server` na raiz) em vez de `file://`. Em Linux/macOS, o mesmo vale com Chromium/Playwright (`--window-size=800,1280` e `1280,800`). Um `npm test` multiplataforma está no backlog (M-8).

### 5.1 Teste em Tablet Retrato (Portrait: 800 × 1280)
```powershell
cmd /c '"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --screenshot="C:\Users\geral\Projetos\classicos_infantis_para_tablet\test-portrait.png" --window-size=800,1280 --hide-scrollbars "file:///C:/Users/geral/Projetos/classicos_infantis_para_tablet/classicos-vivos/dom-quixote/parte-1.html?page=1&imag=1"'
```

### 5.2 Teste em Tablet Paisagem (Landscape: 1280 × 800)
```powershell
cmd /c '"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --screenshot="C:\Users\geral\Projetos\classicos_infantis_para_tablet\test-landscape.png" --window-size=1280,800 --hide-scrollbars "file:///C:/Users/geral/Projetos/classicos_infantis_para_tablet/classicos-vivos/dom-quixote/parte-1.html?page=1&imag=1"'
```

---

## 6. Procedimento Operacional de Entrega (Git & Deploy)

O repositório oficial é hospedado em:
`https://github.com/geraldotfilho/classicos-vivos.git` (Branch: `main`, publicada no GitHub Pages).

O trabalho é feito numa **branch** (a que o ambiente da sessão definir, ou uma nova a partir da `main`) e entregue por **PR**; o humano autoriza o merge direto na `main` pelas ferramentas do GitHub. Se a branch da sessão já foi mesclada, recomece-a a partir da `main` atual.

Ao finalizar qualquer ciclo de desenvolvimento:
1. **Regenerar os arquivos gerados**: `npm run build` (obrigatório se mudou HTML, classes, ícones ou imagens).
   > A antiga cópia avulsa `dom_quixote_parte_1_livro_interativo_infantil.html` foi descontinuada: o livro depende de `assets/` e `imagens/`, então distribua a pasta do repositório inteira (ou o link do GitHub Pages).
2. **Atualizar `AGENTS.md`** caso novos padrões arquiteturais tenham sido introduzidos, e **`docs/BACKLOG.md`** (o que falta; o que foi entregue vai para **`docs/HISTORICO.md`**). Ao fechar uma parte, a retrospectiva leva as lições novas para o diário da receita geral (`docs/RECEITA-CLASSICO-VIVO.md` §8) ou da receita específica (`docs/receitas/`). Pedidos de arte para o agente de arte vão para `docs/fila/PEDIDOS.md`, com arquivo, referências, prompt e critério de aceite (os `TODO-NANO-BANANA*.md` antigos já foram concluídos).
   > **Trabalho entre agentes (agente principal ↔ agente de arte, hoje Claude ↔ Gemini)**: a coordenação assíncrona passa por `docs/fila/`. Em `PEDIDOS.md` (só o agente principal escreve) ficam os pedidos, as revisões e a linha `ESTADO: ATIVO|PARAR`; em `ENTREGAS.md` (só o agente de arte escreve), as entregas e o status. Cada arquivo tem **um único dono** (tabela em `PEDIDOS.md`) para não haver conflito de merge. Conflito em `sw.js`: regenere com `npm run build:sw`, nunca resolva à mão.
3. **Verificar Estado no Diretório Git**:
   ```powershell
   cd classicos-vivos
   git status
   ```
4. **Adicionar, commitar, enviar e abrir o PR**:
   ```bash
   git add .
   git commit -m "feat/fix/docs/arte/narração: descrição clara e concisa"
   git push -u origin <branch>
   ```
   Depois, o PR para a `main` e o merge. Mensagens de commit em português, com o tipo na frente (`feat`, `fix`, `docs`, `texto`, `arte`, `narração`, `traducao`, `chore`).
