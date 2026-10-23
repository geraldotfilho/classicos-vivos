# AGENTS.md — Memória de Arquitetura, UX e Protocolos Operacionais
## Coleção Clássicos Vivos: Livros Interativos Infantis para Tablet

Este documento consolida a memória arquitetural, os princípios pedagógicos, as regras de design de interface, o fluxo de ativos visuais e os protocolos de automação do projeto **Clássicos Vivos**. Ele serve como guia definitivo para agentes de IA e desenvolvedores que assumirem o projeto em sessões futuras.

---

## 1. Visão Geral e Propósito

- **Público-Alvo**: Crianças em fase de alfabetização e letramento (5 a 8 anos).
- **Proposta Pedagógica**: Aproximar as crianças das maiores obras-primas da literatura universal através de uma experiência interativa, sensorial, visualmente rica e de toque acolhedor.
- **Obra Piloto**: *Dom Quixote de La Mancha - Parte 1: O Cavaleiro da Super Imaginação*, adaptado diretamente da obra de Miguel de Cervantes.
- **Diretriz de Dispositivo**: **Tablet-First** (iPad, Samsung Galaxy Tab). Dimensões alvo prioritárias:
  - **Tablet Retrato (Portrait)**: 800 × 1280 px
  - **Tablet Paisagem (Landscape)**: 1280 × 800 px
  - Áreas mínimas de toque (touch targets): **≥ 48 × 48 px** (idealmente 56–64 px com cantos arredondados).

---

## 2. Arquitetura Técnica & Frontend

O projeto adota uma filosofia **Zero-Build / Single-File Web App**, garantindo máxima portabilidade, carregamento ultrarrápido em dispositivos móveis e execução off-line instantânea.

### 2.1 Tecnologias Utilizadas
- **HTML5 & CSS3 Moderno**: Estrutura semântica e layouts fluidos com CSS Grid e Flexbox.
- **Tailwind CSS (via CDN)**: Utility-first para estilização ágil, responsiva e consistente.
- **Phosphor Icons (via CDN)**: Iconografia amigável, legível e suave para botões infantis.
- **Web Audio API Procedural**: Todos os efeitos sonoros (fanfarras de cavaleiro, arpeggios mágicos, cliques táteis de cartões de leitura, pops lúdicos) são sintetizados matematicamente via código (`AudioContext`), dispensando dependências de arquivos MP3/WAV externos pesados.
- **Web Speech API (`pt-BR`)**: Síntese de voz nativa para leitura da página completa e para a pronúncia silábica pausada das palavras-chave em destaque.
- **Pointer Events**: Eventos unificados (`pointerdown`, `pointermove`, `pointerup`) para drag-and-drop fluido compatível tanto com touchscreen/caneta quanto com mouse.

### 2.2 Isolamento de Páginas e Navegação
- **Eliminação de Ghosting/Bleed-Through**: Para alternar entre as 7 páginas do livro, as páginas inativas devem **obrigatoriamente** receber a regra:
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
  - `page`: Índice da página de `0` a `6` (ex: `?page=1` para Capítulo 1).
  - `imag=1` ou `imag=true`: Ativa imediatamente a **Lente da Imaginação** daquela página.

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

---

## 3. Diretrizes Pedagógicas e Limites de UX

### 3.1 A Dupla Lente da Imaginação
- Cada página oferece dois pontos de vista alternáveis pelo botão de lente:
  1. **Lente da Realidade**: O mundo como ele é (Alonso Quixano idoso em sua poltrona; bacia de latão na cabeça; camponesa Aldonza; moinhos de vento na colina).
  2. **Lente da Imaginação**: Como Dom Quixote enxerga com seus olhos poéticos (O rei em seu trono com dragões e um **leão guardião**; armadura dourada reluzente; Princesa Dulcineia do Toboso; gigantes descomunais agitando braços de vento).
- **Consistência Textual**: O texto literário principal **não** é alterado ao trocar de lente; a cena visual é que se metamorfoseia, ensinando à criança a magia de ler e imaginar.

### 3.2 Fronteira Rígida da Pronúncia Silábica (`speakWord`)
- **Regra de Ouro**: A pronúncia silábica pausada (ex: `I-MA-GI-NA-ÇÃO`, `CA-VA-LEI-ROS`, `DRAGÕES`) aplica-se **exclusivamente** às palavras destacadas em caixa alta dentro do bloco de texto narrativo.
- **Proibição de Poluição Visual**: **NUNCA** adicionar cartões com leitura silábica ou balões de fala extensos dentro do quadro da cena interativa ou nas áreas de drop. O quadro da cena deve permanecer limpo, focado na arte e na atmosfera visual.

### 3.3 Interações na Cena (Hotspots)
- Os toques em elementos da cena (personagens e animais) devem gerar feedback imediato:
  - Som procedural sintetizado (Web Audio API).
  - Erupção de partículas emoji flutuantes (`🐱`, `🦁`, `✨`, `⚔️`, `🌾`, `👸`).
  - Badge dinâmico de identificação lúdica no topo da cena.

---

## 4. Padrões de Ilustração e Gestão de Ativos

### 4.1 Especificações Visuais das Imagens
- **Proporção**: **16:9 estrita** (`aspect-[16/9]`, `object-contain`).
- **Resolução Nativa**: 1376 × 768 px ou 1280 × 720 px.
- **Formato de Entrega**: JPEG otimizado (~90-92% de qualidade) para carregamento instantâneo em tablets escolares.
- **Estilo de Arte**: Aquarela e guache infantil caloroso, contornos suaves a lápis de cor, paleta inspirada na luz dourada da Espanha (Castela/La Mancha), atmosfera acolhedora e amigável.
- **Texto nas Imagens**: **Zero texto impresso**. Nenhuma palavra em espanhol, inglês ou português deve vir embutida nas ilustrações. Todo texto deve ser renderizado em HTML para acessibilidade e síntese de voz.

### 4.2 Âncoras Visuais dos Personagens
- **Alonso Quixano / Dom Quixote**: Vovô bondoso de 60 anos, esguio e alto, pele bronzeada acolhedora, bochechas rosadas, olhos alegres e expressivos, bigode branco comprido e curvado, pequeno cavanhaque branco.
  - *Realidade*: Armadura cinza remendada com pequenos pontos de ferrugem, bacia de latão dourado virada na cabeça como elmo.
  - *Imaginação*: Armadura completa de ouro puro com brasão de leão no peito, elmo dourado com pluma carmesim esvoaçante, capa real de veludo vermelho.
- **Rocinante**:
  - *Realidade*: Cavalo marrom claro muito magricela e ossudo, cara meiga e doce, crina levemente bagunçada.
  - *Imaginação*: Majestoso corcel de guerra branco como a neve, musculoso, crina dourada reluzente e sela real de veludo.
- **Sancho Pança**: Camponês baixinho, rechonchudo, bochechas rosadas, sorriso afetuoso de orelha a orelha, túnica marrom simples e chapéu de palha, montado em um burrico cinza simpático.
- **O Gatinho / Leão Guardião (Página 2 / Cap. 1)**:
  - *Realidade*: Gatinho laranja fofo dormindo enroladinho no tapete vermelho e amarelo.
  - *Imaginação*: Nobre **filhote de leão guardião dourado**, com juba farta em camadas, pequena coroa real e patinhas descansadas, personificando a passagem de Cervantes: *"até o gatinho da sala parecia um leão guardião!"*.

### 4.3 Estrutura de Arquivos
```text
classicos-vivos/
├── dom-quixote/
│   ├── parte-1.html                        # Código-fonte principal do livro interativo
│   ├── imagens/                            # Imagens 16:9 em produção (p0-real.jpg a p6-imag.jpg)
│   ├── biblioteca/
│   │   ├── cenarios/                       # Cenas espelhadas para carregamento modular
│   │   ├── personagens/                    # SVGs de personagens (ex: leao-guardiao.svg)
│   │   └── objetos/                        # SVGs de adereços (armadura, bacia, livros)
│   └── PROMPTS_ILUSTRACOES.md              # Registro completo dos prompts de geração de imagem
├── index.html                              # Hub inicial da coleção Clássicos Vivos
├── AGENTS.md                               # Este documento de referência
└── README.md                               # Documentação pública do repositório
```
- **Arquivo Espelho na Raiz**: O arquivo `dom_quixote_parte_1_livro_interativo_infantil.html` na raiz do workspace deve ser mantido sempre em sincronia idêntica com `classicos-vivos/dom-quixote/parte-1.html`.

### 4.4 Resiliência contra Limites de Cotas de IA (429 Rate Limits)
Quando modelos de geração de imagem por IA apresentarem `RESOURCE_EXHAUSTED (429)`, a estratégia comprovada é:
1. Criar o elemento vetorial modular com SVG de alta fidelidade estilizado em aquarela/sombras na pasta `biblioteca/personagens/`.
2. Fazer a composição na resolução exata de 1376 × 768 via headless Chrome e converter para JPEG 92%.
3. Essa técnica garante independência de cotas externas e controle milimétrico da composição visual.

---

## 5. Protocolo de Testes Automatizados no Tablet

Para validar a integridade da interface em tablets sem intervenção manual, utilize o comando headless do Google Chrome com as resoluções padronizadas.

### 5.1 Teste em Tablet Retrato (Portrait: 800 × 1280)
```powershell
cmd /c '"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --screenshot="C:\Users\geral\Projetos\classicos_infantis_para_tablet\test-portrait.png" --window-size=800,1280 --hide-scrollbars "file:///C:/Users/geral/Projetos/classicos_infantis_para_tablet/classicos-vivos/dom-quixote/parte-1.html?page=1&imag=1"'
```

### 5.2 Teste em Tablet Paisagem (Landscape: 1280 × 800)
```powershell
cmd /c '"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --screenshot="C:\Users\geral\Projetos\classicos_infantis_para_tablet\test-landscape.png" --window-size=1280,800 --hide-scrollbars "file:///C:/Users/geral/Projetos/classicos_infantis_para_tablet/classicos-vivos/dom-quixote/parte-1.html?page=1&imag=1"'
```

### 5.3 Checklist de Inspeção Visual Automatizada
- [ ] O cabeçalho com título e botão de áudio/música está alinhado e legível.
- [ ] A cena em proporção 16:9 está centralizada sem distorção ou corte (`object-contain`).
- [ ] O texto narrativo possui margem confortável e não é sobreposto pela barra de navegação inferior.
- [ ] A barra de rodapé (Anterior, Paginação, Próxima) está fixada e com botões clicáveis.
- [ ] O leão guardião e os efeitos mágicos estão nítidos na Lente da Imaginação da Página 2.

---

## 6. Procedimento Operacional de Entrega (Git & Deploy)

O repositório oficial é hospedado em:
`https://github.com/geraldotfilho/classicos-vivos.git` (Branch: `main`).

Ao finalizar qualquer ciclo de desenvolvimento:
1. **Sincronizar Arquivo Raiz**:
   ```powershell
   Copy-Item -Path classicos-vivos/dom-quixote/parte-1.html -Destination dom_quixote_parte_1_livro_interativo_infantil.html -Force
   ```
2. **Atualizar `AGENTS.md`** caso novos padrões arquiteturais tenham sido introduzidos.
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
