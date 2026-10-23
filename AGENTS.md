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

## 3. Diretrizes Pedagógicas, UX e Crítica à Gamificação

### 3.1 A Dupla Lente da Imaginação
- Cada página oferece dois pontos de vista alternáveis pelo botão de lente:
  1. **Lente da Realidade**: O mundo como ele é (Alonso Quixano idoso em sua poltrona; bacia de latão na cabeça; camponesa Aldonza; moinhos de vento na colina).
  2. **Lente da Imaginação**: Como Dom Quixote enxerga com seus olhos poéticos (O rei em seu trono com dragões e o **leão guardião**; armadura dourada reluzente; Princesa Dulcineia do Toboso; gigantes descomunais agitando braços de vento).
- **Consistência Textual**: O texto literário principal **não** é alterado ao trocar de lente; a cena visual é que se metamorfoseia, ensinando à criança a magia de ler e imaginar.

### 3.2 Fronteira Rígida da Pronúncia Silábica (`speakWord`)
- **Regra de Ouro**: A pronúncia silábica pausada (ex: `I-MA-GI-NA-ÇÃO`, `CA-VA-LEI-ROS`, `DRAGÕES`) aplica-se **exclusivamente** às palavras destacadas em caixa alta dentro do bloco de texto narrativo.
- **Proibição de Poluição Visual**: **NUNCA** adicionar cartões com leitura silábica ou balões de fala extensos dentro do quadro da cena interativa ou nas áreas de drop. O quadro da cena deve permanecer limpo, focado na arte e na atmosfera visual.

### 3.3 Postura Crítica contra o Excesso de Gamificação
- **Aviso Mandatório**: Os agentes devem ser **sempre rigorosamente críticos** quanto a possíveis excessos de gamificação ao longo da narrativa.
- A interatividade **nunca deve competir com a leitura nem quebrar o ritmo poético do livro**.
- **Regra Prática**: Botões ou cartões arrastáveis que não geram transformação tangível e divertida na cena são ruído pedagógico e devem ser banidos.
  - *Exemplo real (Página 6)*: Na cena da sagração de cavaleiro, havia cartões para arrastar "LUA CHEIA" e "ESPADA" que apenas faziam a imagem tremer sem alterar a ilustração. Foram eliminados para manter o quadro limpo, preservando a interatividade das palavras apenas no texto da história.

---

## 4. Pipeline de Ilustração: Nano-Banana, Desacoplamento e Banco de Referências

### 4.1 Uso Obrigatório do Nano-Banana
- **Regra Indiscutível**: Todas as ilustrações, cenários, personagens e adereços visuais do projeto devem ser produzidos **exclusivamente através do Nano-Banana** (`image-generator`).
- **Proibição de Gambiarras Gráficas**: É terminantemente proibido tentar montar ilustrações por colagem vetorial SVG externa ou composições manuais quando o usuário pedir arte. O Nano-Banana possui sensibilidade única para aquarela infantil, guache caloroso e contornos suaves de lápis de cor.

### 4.2 Arquitetura Desacoplada: Cenário Separado de Personagens (Layered Scene)
Para possibilitar ricas experiências interativas sem perder a fidelidade artística do livro ilustrado:
1. **Cenário de Fundo (Background)**:
   - Produzido **limpo**, em proporção 16:9 (`aspect-[16/9]`, `object-contain`), sem personagens fixados diretamente no desenho.
   - Serve como palco imersivo permanente.
2. **Personagens e Adereços em Camadas (Transparent Sprites)**:
   - Produzidos com **fundo transparente (PNG com canal alfa)** ou fundo branco puro isolado para recorte de precisão.
   - Sobrepostos ao cenário através de posicionamento absoluto/relativo no DOM.
3. **Mecânica Progressiva (Página 3 / Capítulo 2 - A Armadura Feita em Casa)**:
   - O sótão começa com o fundo de madeira vazio e ensolarado.
   - Alonso Quixano surge inicialmente em roupas cotidianas simples (sem armadura).
   - À medida que o leitor arrasta cada item da bandeja (`ARMADURA`, `BACIA`, `ESCUDO`, `LANÇA`), o personagem veste progressivamente os adereços banais do cotidiano.
   - Ao final, ou ao clicar na **Lente da Imaginação**, a composição se transfigura no deslumbrante Cavaleiro de Ouro reluzente.

### 4.3 Banco de Personagens e Itens de Referência
Foi criada a estrutura padronizada para armazenamento e contexto de prompts:
```text
classicos-vivos/
└── dom-quixote/
    └── biblioteca/
        └── referencias/
            ├── personagens/                 # Sprites com canal alfa (Alonso simples, armadurado, dourado, etc.)
            ├── cenarios/                    # Cenários vazios 16:9 (sótão, sala de leitura, estábulo, etc.)
            └── itens/                       # Adereços isolados transparentes (bacia, elmo, peitoral, lanças)
```
- **Uso como Contexto**: Ao solicitar novas cenas ao Nano-Banana, os caminhos desses ativos de referência devem ser informados no prompt para que a IA mantenha total continuidade de design, proporção, tons de pele e vestimentas ao longo de toda a coleção.

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
