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

## 🔴 Prioridade alta

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| A-1 | **Pás do moinho duplicadas** (pág. 8) | O SVG das pás gira **por cima** das pás pintadas e o estilo vetorial destoa. Após NB-1: usar `p7-real-sem-pas.webp` como fundo durante o vento, trocar `moinho-pas.svg` por `moinho-pas-aquarela.png` e recalibrar `left/top/width` dos dois `windmill-blades-*` sobre os cubos dos moinhos. |
| A-2 | **SOPA sem sopa / pousada incoerente** (pág. 5) | Após NB-2: em `realSceneFor(4)`, exibir `p4-real-completa.webp` quando `innItemsSet.size >= 2`. Os outros três arquivos são substituições diretas. |
| A-3 | **Livros sem transformação** (pág. 2) | Viola o §3.3 do AGENTS.md (cartão que só faz a imagem tremer). Após NB-3: cada livro troca a cena para `p1-real-livro-<tema>.webp` via `setSceneImage`, em qualquer ordem. Ao completar os três, o botão da lente convida à imaginação (já existe). |
| A-4 | **Texto não cabe no tablet em paisagem** | Em 1280 × 800, 6 das 8 páginas exigem rolar a página inteira para ler o fim do texto, e o aviso "Fim da Parte 1" fica escondido. Proposta: em paisagem, rolagem **só na coluna de texto** (a cena fica fixa), com uma sombra/indicador "continua ↓". Avaliar `text-base` em paisagem < 900 px de altura. |
| A-5 | **Extrair o motor do livro para `assets/js/livro.js`** | O `parte-1.html` tem cerca de 1.900 linhas, com áudio, voz, lentes, arrastar e navegação embutidos. Antes da Parte 2, separar o motor (sem build: um `<script src>` comum) e deixar no HTML só o conteúdo e a configuração das cenas (`lensMetadata`, `progressiveScenes`). Evita copiar e colar bugs entre livros. |

## 🟡 Prioridade média

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| M-1 | **Pronúncia silábica de fato** | O §3.2 promete pronúncia **pausada por sílabas**, mas `speakWord` fala a palavra inteira (só o balão mostra `I • MA • GI • NA • ÇÃO`). Proposta: falar as sílabas com pausas (destacando cada uma no balão) e depois a palavra inteira. Testar a qualidade das sílabas isoladas nas vozes pt-BR do Android, porque algumas soam estranhas sozinhas ("ÇÃO"). |
| M-2 | **Sem voz pt-BR instalada** | Se o tablet não tiver voz em português, o leitor fala com sotaque estrangeiro ou fica mudo. Mostrar um aviso discreto para o adulto, com instruções para instalar a voz. |
| M-3 | **Velocidade da narração** | Botão com 2 velocidades (normal / devagar ≈ 0,75) para leitores iniciantes. |
| M-4 | **Tocar numa frase para ouvi-la** | Hoje só a página inteira ou as palavras-chave. Útil para reler um trecho. Cuidar para não conflitar com o toque nas palavras-chave. |
| M-5 | **"Ler de Novo" não reinicia** | Volta à capa, mas mantém lentes ativadas, armadura vestida e cartões verdes. Decidir: reiniciar tudo (recomendado: nova leitura, nova descoberta). |
| M-6 | **Continuar de onde parou** | Lembrar a última página lida (`localStorage`, com `try/catch`) e oferecer "Continuar" na capa e na biblioteca. |
| M-7 | **Consistência das ilustrações** | NB-4 (escala do herói dourado e rosto na etapa 1), NB-5 (enquadramento do estábulo), NB-6 (imaginação de Sancho sem colagem). Substituições diretas, sem código. |
| M-8 | **Teste automatizado multiplataforma** | O protocolo do AGENTS.md §5 é só Windows/Chrome. Criar `npm test` com Playwright (retrato + paisagem, páginas 0–7, ambas as lentes, ordem da armadura, bloqueio de duplo toque, offline) gerando capturas em `test-results/`. |
| M-9 | **Aviso de atualização do PWA** | Com o service worker, uma versão nova só aparece na visita seguinte. Mostrar "Livro atualizado ✨" ao ativar uma versão nova. |

## 🟢 Prioridade baixa

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| B-1 | **Acessibilidade** | Cartões e hotspots são `<div onclick>`, sem `role="button"`, `tabindex` ou `aria-label`. Botões só de ícone têm `title`, mas não `aria-label`. `maximum-scale=1, user-scalable=no` impede o zoom de quem precisa. |
| B-2 | **Handlers inline** | `onclick="..."` espalhados pelo HTML. Migrar para `data-*` + `addEventListener` junto com A-5. |
| B-3 | **Ícone definitivo do app** | NB-7. |
| B-4 | **Leão Guardião em aquarela** | NB-8 (referência ainda em SVG). |
| B-5 | **GitHub Pages** | Confirmar que o Pages está ativo na `main`: o service worker exige HTTPS. Pelo `file://`, o livro funciona offline, mas sem instalação nem cache. |
| B-7 | **Títulos das próximas partes na biblioteca** | `index.html` anuncia "Parte 2: O Duelo contra os Moinhos de Vento", mas o duelo já fecha a Parte 1, que por sua vez promete "Na Parte 2: A Batalha das Ovelhas" (anunciada na biblioteca como Parte 3). A biblioteca também diz "6+ anos", enquanto o AGENTS.md define 5 a 8 anos. Decisão editorial: alinhar o plano das Partes 2–4. |
| B-6 | **Indicador de páginas no retrato** | As bolinhas de página só aparecem em telas ≥ 1024 px. No retrato existe apenas o "Página N de 8". |
