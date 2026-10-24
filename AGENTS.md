# AGENTS.md — Memória de Arquitetura, UX e Protocolos Operacionais
## Coleção Clássicos Vivos: Livros Interativos Infantis para Tablet

Este documento consolida a memória arquitetural, os princípios pedagógicos, as regras de design de interface, o fluxo de ativos visuais e os protocolos de automação do projeto **Clássicos Vivos**. Ele serve como guia definitivo para agentes de IA e desenvolvedores que assumirem o projeto em sessões futuras.

---

## 1. Visão Geral e Propósito

- **Público-Alvo**: Crianças em fase de alfabetização e letramento (5 a 8 anos).
- **Proposta Pedagógica**: Aproximar as crianças das maiores obras-primas da literatura universal através de uma experiência interativa, sensorial, visualmente rica e de toque acolhedor.
- **Obra Piloto**: *Dom Quixote de La Mancha*, adaptado diretamente da obra de Miguel de Cervantes, em **4 partes de 8 páginas** (capítulos numerados em sequência: 1–7, 8–14, 15–21, 22–28). Parte 1: *O Cavaleiro da Super Imaginação*; Parte 2: *Exércitos de Lã e o Elmo Encantado*; Parte 3: *Serra Morena e a Princesa Micomicona*; Parte 4: *A Jaula Encantada e a Ilha de Sancho*. Decisões de adaptação e o mapa de interações estão em `docs/PLANO-PARTES-2-4.md`.
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
- **Narração**: gravada (vozes neurais da API de voz do Gemini, chamada pelo Claude, MP3 frase por frase) com a **Web Speech API (`pt-BR`)** do aparelho como reserva automática. Ver §2.6.
- **Pointer Events**: Eventos unificados (`pointerdown`, `pointermove`, `pointerup`) para drag-and-drop fluido compatível tanto com touchscreen/caneta quanto com mouse. O swipe de troca de página ignora toques iniciados em `.draggable-card`.

### 2.1.1 Ferramentas de Desenvolvimento (`npm run build`)
```bash
npm install          # uma vez (Tailwind, fontes e ícones como devDependencies)
npm run build        # fontes + ícones + Tailwind + service worker
npm run build:images # converte novos JPG/PNG de <livro>/imagens/ para WebP
npm run build:audio  # converte a narração WAV/PCM de <livro>/audio/ para MP3 (corta silêncios)
npm run exportar:frases # lista de frases e palavras-chave para gravar (docs/narracao/, já incluso no build)
npm run gravar:narracao -- --voz narradora --parte 1 # grava pela API de voz do Gemini, com QA (docs/TODO-NARRACAO.md §8)
```
**Rode `npm run build` sempre que** usar uma classe Tailwind nova, um ícone Phosphor novo, ou adicionar/alterar qualquer HTML ou imagem. O `sw.js` precisa da lista atualizada e de uma nova versão de cache, senão os tablets não recebem a mudança. Os scripts ficam em `tools/`, e `sw.js` é gerado a partir de `tools/sw.template.js` (nunca edite `sw.js` à mão).

### 2.2 Isolamento de Páginas e Navegação
- **Eliminação de Ghosting/Bleed-Through**: Para alternar entre as 8 páginas do livro, as páginas inativas devem **obrigatoriamente** receber a regra:
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
  - `page`: Índice da página de `0` a `7` (ex: `?page=3` para Capítulo 3, `?page=6` para Sancho Pança, `?page=7` para os Moinhos).
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
- "Ouvir Página" narra frase por frase (`.sentence-reading` destaca e rola até a frase). Frases curtas também evitam o corte de falas longas do Chrome Android.
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
- **Eventos delegados** (sem `onclick` no HTML): palavras-chave (`data-palavra`), lente (`data-lente`), hotspots (`data-hotspot`) e navegação (`data-nav`).

### 2.6 Vozes e Narração Gravada
- **Painel "Voz"** (botão 🗣️ no topo do livro): lista as **narrações gravadas** (`<livro>/audio/vozes.js`) e as **vozes em português do aparelho**, ordenadas da mais natural para a menos (neurais/"Natural" > aprimoradas > Google > demais; pt-BR antes de pt-PT). Cada uma tem um ▶ de amostra e as etiquetas "funciona offline"/"precisa de internet". Também tem **velocidade** 🐇 normal / 🐢 devagar. A escolha fica no `localStorage` (com `try/catch`).
- **Narração gravada**: **uma voz por vez** no livro (decisão do humano): a pasta `narracao`, com a narradora e vozes próprias para as falas dos personagens. Arquivos em `<livro>/audio/<voz>/parte-N/<id-da-frase>.mp3`; palavras-chave em `<livro>/audio/palavras/<slug>.mp3` (sílabas pausadas + palavra inteira). A voz só aparece como completa quando o número da parte está em `partes` no `vozes.js` (a Parte 1 já está).
- **Reserva em cascata, nunca silêncio**: frase sem gravação → voz do aparelho; voz "online" sem internet → melhor voz offline do aparelho (até recarregar a página). Na primeira visita, se houver narração gravada pronta para a parte, ela vira a voz padrão.
- **Offline**: o service worker **não** pré-baixa os áudios (são grandes). Os MP3 seguem **rede primeiro** (uma frase regravada com o mesmo nome chega ao tablet) e ficam num cache próprio (`cv-narracao`, que sobrevive às novas versões), para tocar offline depois da primeira vez. O SW pede o arquivo inteiro (200) em vez do trecho (Range/206) que o `<audio>` pede, senão nada seria guardado. O `vozes.js` também é buscado na rede primeiro.
- **Página inteira** (o padrão): `<voz>/parte-N/paginas.json` lista as páginas gravadas num áudio só (`pN.mp3`) e o tempo de cada frase (`ini`/`fim`). "Ouvir Página" toca esse MP3 e destaca a frase pelo `currentTime` (`lerPaginaInteira`). As páginas fora dele seguem frase a frase. O áudio que vem do service worker **não aceita salto no tempo** (`seekable` vazio); para tocar uma frase solta de uma página inteira, ver BACKLOG M-4.
- **Vozes dos personagens**: o roteiro (`narracao/parte-N/roteiro.json`) diz quem fala cada trecho, e o elenco fica em `ELENCO` (`tools/gravar-narracao.mjs`). **Economia** (limite de R$ 10/mês do humano): a API paga só produz vozes; a conferência é local (`tools/transcrever.py`, Whisper).
- **Prévia**: uma voz com a parte em `previa` (no `vozes.js`) aparece no painel com só algumas frases gravadas (as demais usam a voz do aparelho) e nunca vira a voz padrão. Serve para o humano ouvir no livro antes de a produção seguir.
- Produção das gravações: `docs/TODO-NARRACAO.md` e `npm run gravar:narracao` (Claude, via API do Gemini `gemini-3.8-flash-tts` com a chave como segredo de rede do ambiente, injetada pelo proxy; ela **nunca** é impressa nem versionada). Lista do que gravar: `docs/narracao/frases-<livro>-parte-N.json`.

---

## 3. Diretrizes Pedagógicas, UX e Crítica à Gamificação

### 3.1 A Dupla Lente da Imaginação
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

---

### 3.4 Biblioteca para Crianças, Detalhes para Adultos
- `index.html` é uma **estante lúdica**: livros como capas grandes e tocáveis numa prateleira de madeira, com botão ▶. Na prateleira de cima ficam as 4 partes de Dom Quixote (a capa de cada uma é o `p0-real` da parte, com cor e emoji provisórios enquanto a arte não chega); na de baixo, os próximos clássicos com 🔒 "Em breve". **Quanto menos texto, melhor**: nada de descrições, pilares, faixas etárias ou títulos de capítulos.
- Tudo que é informação para adultos (proposta pedagógica, acervo detalhado, instruções de instalação e voz, licença) fica em `sobre.html`, acessível por um botão discreto "Para adultos" (ícone ⓘ).
- Livro novo: uma capa nova na prateleira de cima e uma entrada no "Acervo" de `sobre.html`.

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
   - Camadas que o livro carrega ficam em `<livro>/imagens/camadas/` (WebP com alfa, gerado por `npm run build:images`). Recortes usados só como referência de prompt ficam em `biblioteca/referencias/`.
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
   - **Motor de camadas implementado** (§2.5): `cena.camadas` com posição em % (`x`, `y` = base, `w`), visibilidade pelo estado (`item`: aparece depois que o item é usado; `ate`: some quando o item é usado), animação contínua (`anim`: `balanco`, `flutuar`, `girar`, `pulsar`) e efeitos de um toque (`efeito`: `cambalhota`, `pulo`, `estouro`, `atravessar`). Véus sem arte (ex.: a escuridão da noite) usam `fundo` com um gradiente CSS. As Partes 2–4 já usam camadas; na Parte 1, o moinho (NB-1) e a pousada (NB-2) vão migrar quando a arte chegar.
3. **Mecânica Progressiva (Páginas 3, 4 e 5)**:
   - **Página 3 (`?page=2`, Capítulo 2 - A Armadura do Bisavô)**: Cada clique ou drop de um item da bandeja (`ARMADURA`, `BACIA`, `ESCUDO`, `LANÇA`) revela uma nova ilustração do personagem se vestindo progressivamente (`p2-real-stage-1.webp` a `p2-real-stage-4.webp`).
   - **Página 4 (`?page=3`, Capítulo 3 - O Cuidado com Rocinante)**: Cada clique ou drop de carinho (`MAÇÃ`, `CENOURA`, `ESCOVA`) revela uma nova ilustração do cavalo se alimentando alegremente, ganhando energia e com as crinas penteadas com esmero (`p3-real-stage-1.webp` a `p3-real-stage-3.webp`).
   - **Página 5 (`?page=4`, Capítulo 4 - O Acolhimento na Pousada)**: Os botões de `TROMBETA` e `SOPA` revelam o pastor tocando flauta rústica com porquinhos dançarinos (`p4-real-flauta.webp`) e o estalajadeiro servindo a sopa fumegante (`p4-real-sopa.webp`).
   - **Regra das ilustrações cumulativas**: quando cada etapa **contém** as anteriores (a etapa 2 já mostra o peitoral da etapa 1), os itens **precisam seguir uma ordem fixa**, a mesma do texto, declarada em `cena.cartoes.ordem` (tipo `progressivo`). O próximo item brilha (`.card-next`), os seguintes ficam esmaecidos (`.card-waiting`) e um toque fora de ordem só dá uma dica gentil (som `hint` + balanço do cartão certo), **sem trocar a cena**. Nunca escolha a etapa pela *quantidade* de itens usados: esse foi o bug "toco na bacia e ele veste o peitoral". Se a interação precisar aceitar qualquer ordem, use **camadas independentes** por item (ver acima) ou ilustrações independentes por item (não cumulativas).
   - Usar um item com a Lente da Imaginação ativa volta para a Lente da Realidade (vestir e cuidar acontecem no mundo real).
   - **Tempo de Contemplação do Leitor**: É terminantemente proibido forçar auto-toggle, transições automáticas precipitadas ou piscamentos relâmpagos para a imaginação. O leitor infantil deve contemplar a cena real concluída pelo tempo que desejar. O botão da Lente da Imaginação apenas pulsa suavemente para convidar a criança à transformação deliberada.

### 4.3 Estrutura de Ativos (sem duplicatas) e Banco de Referências
```text
classicos-vivos/
├── assets/                              # Compartilhado por todos os livros
│   ├── js/  livro.js                    # O MOTOR dos livros (editado à mão)
│   ├── js/  texto.js                    # frases, HTML e texto falado (motor + exportação)
│   ├── css/ livro.css                   # estilo dos livros (editado à mão)
│   ├── css/  tailwind.css · fonts.css · icons.css
│   ├── fonts/                           # woff2 locais
│   └── icones/                          # ícones do app (PWA)
├── tools/                               # scripts de build (fontes, ícones, Tailwind, WebP, service worker)
├── docs/  RETOMADA.md (comece por aqui numa sessão nova) · BACKLOG.md · TODO-NANO-BANANA.md · TODO-NANO-BANANA-PARTES-2-4.md · PLANO-PARTES-2-4.md · TODO-NARRACAO.md
│   ├── fila/                            # canal Claude ↔ Gemini (PEDIDOS.md, ENTREGAS.md)
│   └── narracao/                        # frases e palavras-chave a gravar (gerado)
├── index.html                           # Biblioteca das crianças (estante de livros, quase sem texto)
├── sobre.html                           # Detalhes para adultos (proposta, acervo, uso no tablet, licença)
├── sw.js · manifest.webmanifest
└── dom-quixote/
    ├── parte-1.html … parte-4.html      # só conteúdo (window.LIVRO), ver §2.5
    ├── audio/                           # narração gravada: vozes.js, <voz>/parte-N/<id>.mp3, palavras/
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

Para validar a integridade da interface em tablets sem intervenção manual, utilize o comando headless do Google Chrome com as resoluções padronizadas. Para testar o service worker (PWA offline), sirva por HTTP (`python -m http.server` na raiz) em vez de `file://`. Em Linux/macOS, o mesmo vale com Chromium/Playwright (`--window-size=800,1280` e `1280,800`). Um `npm test` multiplataforma está no backlog (M-8).

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
`https://github.com/geraldotfilho/classicos-vivos.git` (Branch: `main`).

Ao finalizar qualquer ciclo de desenvolvimento:
1. **Regenerar os arquivos gerados**: `npm run build` (obrigatório se mudou HTML, classes, ícones ou imagens).
   > A antiga cópia avulsa `dom_quixote_parte_1_livro_interativo_infantil.html` foi descontinuada: o livro depende de `assets/` e `imagens/`, então distribua a pasta do repositório inteira (ou o link do GitHub Pages).
2. **Atualizar `AGENTS.md`** caso novos padrões arquiteturais tenham sido introduzidos, e **`docs/BACKLOG.md`** (mover o que foi entregue, registrar o que foi descoberto). Pedidos de arte nova vão para **`docs/TODO-NANO-BANANA.md`**, com arquivo, referências, prompt e critério de aceite.
   > **Trabalho entre agentes (Claude ↔ Gemini)**: a coordenação assíncrona passa por `docs/fila/`. Em `PEDIDOS.md` (só o Claude escreve) ficam os pedidos, as revisões e a linha `ESTADO: ATIVO|PARAR`; em `ENTREGAS.md` (só o Gemini escreve), as entregas e o status. Cada arquivo tem **um único dono** (tabela em `PEDIDOS.md`) para não haver conflito de merge. Conflito em `sw.js`: regenere com `npm run build:sw`, nunca resolva à mão.
3. **Verificar Estado no Diretório Git**:
   ```powershell
   cd classicos-vivos
   git status
   ```
4. **Adicionar, Commitar e Enviar**:
   ```powershell
   git add .
   git commit -m "feat/fix: descrição clara e concisa das melhorias realizadas"
   git push origin main
   ```
