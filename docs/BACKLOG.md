# 📋 Backlog — Correções e Melhorias

Levantado na inspeção completa do sprint 1 (2026-10): código, ilustrações e capturas em tablet retrato (800 × 1280) e paisagem (1280 × 800). Itens que dependem de arte nova citam a tarefa correspondente em [`TODO-NANO-BANANA.md`](TODO-NANO-BANANA.md) (`NB-n`).

---

## ✅ Entregue no sprint 1

- **Offline de verdade**: Tailwind compilado (`assets/css/tailwind.css`), fontes Fredoka e Nunito locais e ícones Phosphor como máscaras SVG (só os 12 usados). Nenhuma requisição externa.
- **Leveza**: ilustrações em WebP (22 MB → 4,9 MB) e fim das cópias duplicadas (`biblioteca/cenarios`, `biblioteca/objetos` e `referencias/itens` repetidos). O peso das imagens que o livro carrega caiu ~78%.
- **PWA**: `manifest.webmanifest` + `sw.js` (gerado com hash de versão) para instalar no tablet e ler sem internet.
- **Leitura guiada frase a frase**, com destaque sincronizado e rolagem automática até a frase. As palavras-chave passaram a ser faladas em minúsculas, para a voz não soletrar como sigla. A leitura em frases curtas também contorna o corte de falas longas no Chrome Android.
- **Bug da armadura (página 3)**: a imagem era escolhida pela *quantidade* de itens, não pelo item tocado. As ilustrações são cumulativas, então agora os itens seguem a ordem do texto (ARMADURA → BACIA → ESCUDO → LANÇA): o próximo item brilha, os seguintes ficam esmaecidos e um toque fora de ordem dá uma dica gentil, sem trocar a cena. O mesmo bug existia no Rocinante (página 4) e foi corrigido igual (MAÇÃ → CENOURA → ESCOVA).
- **Feedback instantâneo de carregamento**: ao tocar em item ou lente, a cena escurece com um spinner na hora. Os controles da página ficam travados até a nova ilustração estar decodificada e entram com um *fade*. Toques repetidos são ignorados. As imagens da página atual e da seguinte são pré-carregadas.
- **Lente coerente**: usar um item da bandeja com a Lente da Imaginação ativa volta corretamente para a realidade. A legenda da realidade passou a refletir o progresso (antes voltava ao texto genérico).
- **Layout paisagem**: o topo da coluna de texto (rótulo do capítulo) era cortado e inalcançável pela rolagem (`items-center` em contêiner rolável). No retrato, páginas com texto curto ganhavam um vão enorme entre a cena e o texto.
- **Arrastar × virar página**: arrastar um cartão na horizontal também disparava o swipe de troca de página.
- **Código morto removido**: `handleCeremonyDrop` e o estado da cerimônia (cartões banidos da página 6).
- Biblioteca: contagem corrigida para "8 Páginas Interativas" e descrição da Parte 1 completada.
- Imagens renomeadas para `pN = índice da página` (`p6a` → `p6`, `p6` → `p7`).

---

## ✅ Entregue no sprint 2

- **Biblioteca simplificada** (`index.html`): estante lúdica, só com a capa grande de Dom Quixote (▶ pulsando) e as Partes 2–4 com cadeado, quase sem texto. Os detalhes para adultos foram para a nova `sobre.html` (botão ⓘ "Para adultos").
- **Cartão de alfabetização**: abre **centralizado** na tela, com as sílabas em blocos coloridos, e **só fecha com um toque fora** (ou Esc). Tocar no cartão repete a pronúncia. Fecha ao trocar de página, e as setas do teclado não viram a página com ele aberto.
- **Camadas × colagem** esclarecido no `AGENTS.md` (§4.1 e §4.2: modelo híbrido, regras de integração, pasta `imagens/camadas/`). `TODO-NANO-BANANA.md` reescrito: NB-1, NB-2 e NB-6 agora usam camadas.

## ✅ Entregue no sprint 3

- **Livro aberto**: ilustração numa folha e texto na outra, as duas sempre visíveis. Em paisagem ficam lado a lado; em retrato, empilhadas. Papel, lombada e bordas das folhas sobre capa de couro.
- **Rolagem independente do texto**: a ilustração não sai da tela durante a leitura. Esmaecido + seta ⬇ quando há mais texto, e a leitura guiada rola só o texto. Resolve o antigo A-4 (texto que não cabia em paisagem).
- **Virada de página animada** em 3D, em torno da lombada (paisagem) ou da borda (retrato), com sombreamento. Respeita `prefers-reduced-motion` e bloqueia cliques repetidos durante a virada.

## ✅ Entregue no sprint 4

- **Partes 2, 3 e 4 escritas** (8 páginas cada, caps. 8–28), com palavras-chave silábicas e 10 interações planejadas pelo crivo do §3.3. Decisões em `docs/PLANO-PARTES-2-4.md`.
- **Motor único** `assets/js/livro.js` + `assets/css/livro.css` (antigo A-5): cada parte virou só configuração (`window.LIVRO`). A Parte 1 foi convertida e passou em todos os testes.
- **Motor de camadas** (antigo A-6), com novos tipos de cartão: `camadas`, `contagem` e `ordem`.
- **Arte ausente não quebra o livro**: "Ilustração a caminho" nas cenas e emojis provisórios nas camadas.
- **Eventos delegados**, sem `onclick` embutido (antigo B-2).
- **Biblioteca** com as 4 partes na prateleira; `sobre.html` com o acervo completo.
- **Arte das Partes 2–4** detalhada para o Gemini em `docs/TODO-NANO-BANANA-PARTES-2-4.md`. O aviso de fim da Parte 1 foi alinhado com o conteúdo real da Parte 2 (antigo B-7).

## ✅ Entregue no sprint 5 (ciclo Claude ↔ Gemini, `docs/fila/`)

- **A-1, moinhos**: cenário sem pás (`p7-real-sem-pas`) + pás em aquarela (`camadas/p7-pas-moinho`) sobre os cubos, paradas na Realidade e girando com o VENTO. Fim das pás vetoriais duplicadas.
- **A-2, pousada em camadas**: fundo limpo + pastor (parado/tocando), porquinhos dançando, notas flutuando e estalajadeiro (acenando/servindo sopa). TROMBETA e SOPA funcionam em qualquer ordem, ou juntas, e a sopa agora aparece de verdade. Retoque das bordas das camadas pedido em P-003.

## ✅ Entregue no sprint 6 (vozes)

- **Painel "Voz"**: vozes pt do aparelho ordenadas da mais natural, com amostra, etiquetas offline/internet e velocidade normal/devagar (antigo M-3), lembradas no tablet. Aviso para instalar a voz pt-BR quando não houver nenhuma (antigo M-2).
- **Fala mais natural**: sem travessões lidos, pausas nos diálogos, onomatopeias ("tac, tac") e palavras-chave em minúsculas.
- **Narração gravada pronta para receber áudio**: tocador frase a frase com a voz do aparelho como reserva, voz offline quando a online falha, MP3 guardado sob demanda pelo service worker.
- **Segmentação canônica** (`assets/js/texto.js`) e exportação das 214 frases e 105 palavras-chave (`docs/narracao/`) para o Gemini gravar (P-006, agora com o Claude: `docs/TODO-NARRACAO.md`). Conversor WAV/PCM → MP3 sem dependências nativas (`npm run build:audio`).

## ✅ Entregue no sprint 9 (arte da Parte 2 pela API, tarde de 2026-10-24)

- **Parte 2 com toda a arte**: páginas 4 a 8 (`-real`, `-imag` e as camadas da poeira, do balão, da cabra e dos martelos) geradas pelo Claude com o Nano Banana 2 pela API, em modo Batch, por autorização pontual do humano. US$ 0,57. Ferramentas novas: `npm run gerar:imagens` e `tools/recortar-camada.py` (fundo magenta → alfa, sem halo). Método: `docs/ARTE-PELA-API.md`.
- **Animação `martelar`** (camada que gira em torno do eixo do alto): os martelos do amanhecer batem no pano.

## ✅ Entregue no sprint 8 (Partes 2–4 narradas, madrugada de 2026-10-24)

- **Narração gravada das Partes 2, 3 e 4** (antigo A-9): páginas inteiras com títulos, elenco de personagens (pastor, barbeiro, padre, Doroteia, estalajadeiro, Teresa, Sanchica, os velhos do tribunal) e todas as palavras-chave. Flex (metade do preço), cache de blocos e palavras em grupo por causa do limite de 100 pedidos/dia.
- **Textos das Partes 2–4 revisados** para a narração; Parte 2 com o capítulo novo do tombo nos moinhos (9 páginas).
- **Camadas das Partes 2–4 em `.webp`** (antes apontavam para `.png` e não carregavam).

## ✅ Entregue no sprint 9 (leitura autônoma e idiomas, 2026-10-24)

- **Botão Aa / AA** no topo: o texto todo em LETRAS MAIÚSCULAS (letra de forma, para a criança ler sozinha), lembrado no tablet. A dica da capa passa a falar das "palavras amarelas".
- **Tocar numa frase para ouvi-la** (antigo M-4): a narração começa pela frase tocada e segue até o fim da página. Com a página gravada inteira, o MP3 é guardado na memória (blob) e pula para o tempo da frase, o que funciona também com o service worker (que não responde trechos 206).
- **Quatro idiomas** (bandeirinhas 🇧🇷 🇬🇧 🇫🇷 🇪🇸): traduções literárias das quatro partes em `dom-quixote/traducoes/` (o espanhol com os nomes e fórmulas de Cervantes), interface traduzida, vozes do aparelho no idioma escolhido. Narração gravada só em português por enquanto (M-11). Ferramentas `npm run exportar:traducoes` e `npm run conferir:traducoes` (AGENTS.md §2.8).

## ✅ Entregue no sprint 7 (narração gravada da Parte 1)

- **Parte 1 completa com narração gravada** (`dom-quixote/audio/narracao/`): narradora `pt-br-storyteller-9`, **Dom Quixote** `pt-br-concierge-3` e **Sancho** `pt-br-storyteller-2`, mais as 30 palavras-chave. Na primeira visita, vira a voz padrão.
- **Página inteira num pedido só** (o padrão, aprovado de ouvido), com blocos de narradora + 1 personagem e marcação das frases pelos tempos das palavras (Whisper local). O motor toca um MP3 por página e destaca a frase pelo tempo.
- **Título do capítulo lido** antes do texto (a "frase 0", `pN-s0`).
- **Economia**: a API paga só produz as vozes. A conferência é local e gratuita (`tools/transcrever.py`), e o gasto fica registrado em `docs/narracao/gastos.csv`.
- **Livros da página 2 da Parte 1 com transformação** (antigo A-3): cada livro abre a sua cena (castelos, dragões, cavaleiros), em qualquer ordem. E a nuvem do sonho de Sancho flutua sobre ele na Imaginação (arte NB-6).
- **Service worker**: os MP3 e as marcas vêm da rede primeiro (regravações chegam ao tablet), inteiros (o 206 não podia ser guardado), num cache próprio.

## 🔴 Prioridade alta

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| A-7 | **Arte das Partes 3–4** (a Parte 2 está completa) | 33 cenas + 10 camadas em `TODO-NANO-BANANA-PARTES-2-4.md` (Gemini no Antigravity, a partir de 29/10; ou o Claude pela API, se o humano autorizar: ~US$ 1,65, `ARTE-PELA-API.md` §5). Depois de cada entrega: conferir posições das camadas nas duas orientações e ajustar `x/y/w` no `parte-N.html`. |
| A-8 | **Revisão humana do texto das Partes 2–4** | Ler em voz alta com a voz do tablet; decidir "vinho tinto" × "suco de uva" (Parte 3, cap. 20); validar a dificuldade da `ordem` (5 palavras) e da contagem com crianças. Ver `PLANO-PARTES-2-4.md` §5. |

## 🟡 Prioridade média

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| M-1 | **Pronúncia silábica de fato** (encaminhado: gravações em `audio/palavras/`, P-006) | O §3.2 promete pronúncia **pausada por sílabas**, mas `speakWord` fala a palavra inteira (só o balão mostra `I • MA • GI • NA • ÇÃO`). Proposta: falar as sílabas com pausas (destacando cada uma no balão) e depois a palavra inteira. Testar a qualidade das sílabas isoladas nas vozes pt-BR do Android, porque algumas soam estranhas sozinhas ("ÇÃO"). |
| M-11 | **Narração gravada em inglês, francês e espanhol** | Hoje esses idiomas usam a voz do aparelho. Gravar com o mesmo fluxo do português (roteiro → elenco → `--pagina-inteira` → palavras-chave), com vozes nativas, **só com autorização do humano** (AGENTS.md §2.7). O motor precisa aceitar a narração por idioma (`<voz>/<idioma>/parte-N/`, `vozes.js` com `idioma`) e o `exportar-frases` precisa exportar os textos traduzidos. |
| M-12 | **Revisão nativa das traduções** | Traduções feitas por agentes especialistas (Claude). Pedir a leitores nativos (de preferência professores de alfabetização) que leiam em voz alta, conferindo ritmo, divisão silábica das palavras-chave e as palavras dos cartões. Avisos de "página desatualizada" em `npm run conferir:traducoes` indicam páginas cujo português mudou depois da tradução. Dúvidas abertas pelos tradutores: Pandafilando "de la Fosca Vista" (en: *of the Gloomy Glare*; fr: mantido em espanhol); sílabas orais × escritas no francês (ROS • SI • NANTE); no espanhol, pequenos acréscimos literais de Cervantes (o livro de palha e cevada do vendeiro, "tuyo y mío", Diego Pérez de Vargas, "el doctor Pedro Recio", "desnudo nací", "el Alígero", "Alonso Quijano el Bueno") e a lança de **encina** (azinheira), como em Cervantes, em vez de carvalho. |
| M-10 | **Páginas 1 e 2 da Parte 1 gravadas inteiras** | Foram gravadas frase por frase, antes de a página inteira virar o padrão (os títulos entraram como gravações avulsas). Regravar inteiras para o livro ficar uniforme: ~2 min de áudio, ~US$ 0,03. Só se o humano quiser. |
| M-5 | **"Ler de Novo" não reinicia** | Volta à capa, mas mantém lentes ativadas, armadura vestida e cartões verdes. Decidir: reiniciar tudo (recomendado: nova leitura, nova descoberta). |
| M-6 | **Continuar de onde parou** | Lembrar a última página lida (`localStorage`, com `try/catch`) e oferecer "Continuar" na capa e na biblioteca. |
| M-7 | **Consistência das ilustrações** | NB-4 (escala do herói dourado e rosto na etapa 1), NB-5 (enquadramento do estábulo), NB-6 (imaginação de Sancho gerada de verdade, em vez da capa com recorte achatado). Substituições diretas, sem código. |
| M-8 | **Teste automatizado multiplataforma** | O protocolo do AGENTS.md §5 é só Windows/Chrome. Criar `npm test` com Playwright (retrato + paisagem, páginas 0–7, ambas as lentes, ordem da armadura, bloqueio de duplo toque, offline) gerando capturas em `test-results/`. |
| M-11 | **Retoques da arte da Parte 2 (API)** | Sem retrabalho urgente. (1) A poeira da pág. 4 ainda tem fiapos levemente rosados nas pontas (quase invisíveis sobre a planície). (2) Na pág. 5, Dom Quixote parece mais alegre que "abatido". (3) Na pág. 8 da Imaginação, o elmo flutua logo acima das mãos. Só refazer se o humano pedir. |
| M-9 | **Aviso de atualização do PWA** | Com o service worker, uma versão nova só aparece na visita seguinte. Mostrar "Livro atualizado ✨" ao ativar uma versão nova. |

## 🟢 Prioridade baixa

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| B-1 | **Acessibilidade** | Cartões e hotspots são `<div onclick>`, sem `role="button"`, `tabindex` ou `aria-label`. Botões só de ícone têm `title`, mas não `aria-label`. `maximum-scale=1, user-scalable=no` impede o zoom de quem precisa. |
| B-3 | **Ícone definitivo do app** | NB-7. |
| B-4 | **Leão Guardião em aquarela** | NB-8 (referência ainda em SVG). |
| B-5 | **GitHub Pages** | Confirmar que o Pages está ativo na `main`: o service worker exige HTTPS. Pelo `file://`, o livro funciona offline, mas sem instalação nem cache. |
| B-6 | **Indicador de páginas no retrato** | As bolinhas de página só aparecem em telas ≥ 1024 px. No retrato existe apenas o "Página N de 8". |
