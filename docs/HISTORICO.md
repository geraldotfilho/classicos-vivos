# 🗂️ Histórico de entregas

O que já foi entregue, sprint a sprint, em ordem cronológica (o mais antigo primeiro). As pendências ficam em [`BACKLOG.md`](BACKLOG.md); o estado atual e a próxima sessão, em [`RETOMADA.md`](RETOMADA.md). Nos sprints antigos, o Claude escrevia e o Gemini desenhava; hoje qualquer agente pode receber qualquer tarefa (`AGENTS.md` §0.3).

---

## ✅ Sprint 1 (inspeção e offline, 2026-10)

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

## ✅ Sprint 2 (biblioteca e cartão de alfabetização)

- **Biblioteca simplificada** (`index.html`): estante lúdica, só com a capa grande de Dom Quixote (▶ pulsando) e as Partes 2–4 com cadeado, quase sem texto. Os detalhes para adultos foram para a nova `sobre.html` (botão ⓘ "Para adultos").
- **Cartão de alfabetização**: abre **centralizado** na tela, com as sílabas em blocos coloridos, e **só fecha com um toque fora** (ou Esc). Tocar no cartão repete a pronúncia. Fecha ao trocar de página, e as setas do teclado não viram a página com ele aberto.
- **Camadas × colagem** esclarecido no `AGENTS.md` (§4.1 e §4.2: modelo híbrido, regras de integração, pasta `imagens/camadas/`). `TODO-NANO-BANANA.md` reescrito: NB-1, NB-2 e NB-6 agora usam camadas.

## ✅ Sprint 3 (livro aberto e virada de página)

- **Livro aberto**: ilustração numa folha e texto na outra, as duas sempre visíveis. Em paisagem ficam lado a lado; em retrato, empilhadas. Papel, lombada e bordas das folhas sobre capa de couro.
- **Rolagem independente do texto**: a ilustração não sai da tela durante a leitura. Esmaecido + seta ⬇ quando há mais texto, e a leitura guiada rola só o texto. Resolve o antigo A-4 (texto que não cabia em paisagem).
- **Virada de página animada** em 3D, em torno da lombada (paisagem) ou da borda (retrato), com sombreamento. Respeita `prefers-reduced-motion` e bloqueia cliques repetidos durante a virada.

## ✅ Sprint 4 (Partes 2–4 escritas e motor único)

- **Partes 2, 3 e 4 escritas** (8 páginas cada, caps. 8–28), com palavras-chave silábicas e 10 interações planejadas pelo crivo do §3.3. Decisões em `docs/PLANO-PARTES-2-4.md`.
- **Motor único** `assets/js/livro.js` + `assets/css/livro.css` (antigo A-5): cada parte virou só configuração (`window.LIVRO`). A Parte 1 foi convertida e passou em todos os testes.
- **Motor de camadas** (antigo A-6), com novos tipos de cartão: `camadas`, `contagem` e `ordem`.
- **Arte ausente não quebra o livro**: "Ilustração a caminho" nas cenas e emojis provisórios nas camadas.
- **Eventos delegados**, sem `onclick` embutido (antigo B-2).
- **Biblioteca** com as 4 partes na prateleira; `sobre.html` com o acervo completo.
- **Arte das Partes 2–4** detalhada para o Gemini em `docs/TODO-NANO-BANANA-PARTES-2-4.md`. O aviso de fim da Parte 1 foi alinhado com o conteúdo real da Parte 2 (antigo B-7).

## ✅ Sprint 5 (ciclo Claude ↔ Gemini, `docs/fila/`)

- **A-1, moinhos**: cenário sem pás (`p7-real-sem-pas`) + pás em aquarela (`camadas/p7-pas-moinho`) sobre os cubos, paradas na Realidade e girando com o VENTO. Fim das pás vetoriais duplicadas.
- **A-2, pousada em camadas**: fundo limpo + pastor (parado/tocando), porquinhos dançando, notas flutuando e estalajadeiro (acenando/servindo sopa). TROMBETA e SOPA funcionam em qualquer ordem, ou juntas, e a sopa agora aparece de verdade. Retoque das bordas das camadas pedido em P-003.

## ✅ Sprint 6 (vozes)

- **Painel "Voz"**: vozes pt do aparelho ordenadas da mais natural, com amostra, etiquetas offline/internet e velocidade normal/devagar (antigo M-3), lembradas no tablet. Aviso para instalar a voz pt-BR quando não houver nenhuma (antigo M-2).
- **Fala mais natural**: sem travessões lidos, pausas nos diálogos, onomatopeias ("tac, tac") e palavras-chave em minúsculas.
- **Narração gravada pronta para receber áudio**: tocador frase a frase com a voz do aparelho como reserva, voz offline quando a online falha, MP3 guardado sob demanda pelo service worker.
- **Segmentação canônica** (`assets/js/texto.js`) e exportação das 214 frases e 105 palavras-chave (`docs/narracao/`) para o Gemini gravar (P-006, agora com o Claude: `docs/TODO-NARRACAO.md`). Conversor WAV/PCM → MP3 sem dependências nativas (`npm run build:audio`).

## ✅ Sprint 7 (narração gravada da Parte 1, 2026-10-24)

- **Parte 1 completa com narração gravada** (`dom-quixote/audio/narracao/`): narradora `pt-br-storyteller-9`, **Dom Quixote** `pt-br-concierge-3` e **Sancho** `pt-br-storyteller-2`, mais as 30 palavras-chave. Na primeira visita, vira a voz padrão.
- **Página inteira num pedido só** (o padrão, aprovado de ouvido), com blocos de narradora + 1 personagem e marcação das frases pelos tempos das palavras (Whisper local). O motor toca um MP3 por página e destaca a frase pelo tempo.
- **Título do capítulo lido** antes do texto (a "frase 0", `pN-s0`).
- **Economia**: a API paga só produz as vozes. A conferência é local e gratuita (`tools/transcrever.py`), e o gasto fica registrado em `docs/narracao/gastos.csv`.
- **Livros da página 2 da Parte 1 com transformação** (antigo A-3): cada livro abre a sua cena (castelos, dragões, cavaleiros), em qualquer ordem. E a nuvem do sonho de Sancho flutua sobre ele na Imaginação (arte NB-6).
- **Service worker**: os MP3 e as marcas vêm da rede primeiro (regravações chegam ao tablet), inteiros (o 206 não podia ser guardado), num cache próprio.

## ✅ Sprint 8 (Partes 2–4 narradas, madrugada de 2026-10-24)

- **Narração gravada das Partes 2, 3 e 4** (antigo A-9): páginas inteiras com títulos, elenco de personagens (pastor, barbeiro, padre, Doroteia, estalajadeiro, Teresa, Sanchica, os velhos do tribunal) e todas as palavras-chave. Flex (metade do preço), cache de blocos e palavras em grupo por causa do limite de 100 pedidos/dia.
- **Textos das Partes 2–4 revisados** para a narração; Parte 2 com o capítulo novo do tombo nos moinhos (9 páginas).
- **Camadas das Partes 2–4 em `.webp`** (antes apontavam para `.png` e não carregavam).

## ✅ Sprint 9 (leitura autônoma e idiomas, 2026-10-24)

- **Botão Aa / AA** no topo: o texto todo em LETRAS MAIÚSCULAS (letra de forma, para a criança ler sozinha), lembrado no tablet. A dica da capa passa a falar das "palavras amarelas".
- **Tocar numa frase para ouvi-la** (antigo M-4): a narração começa pela frase tocada e segue até o fim da página. Com a página gravada inteira, o MP3 é guardado na memória (blob) e pula para o tempo da frase, o que funciona também com o service worker (que não responde trechos 206).
- **Quatro idiomas** (bandeirinhas 🇧🇷 🇬🇧 🇫🇷 🇪🇸): traduções literárias das quatro partes em `dom-quixote/traducoes/` (o espanhol com os nomes e fórmulas de Cervantes), interface traduzida, vozes do aparelho no idioma escolhido. Narração gravada só em português por enquanto (M-11). Ferramentas `npm run exportar:traducoes` e `npm run conferir:traducoes` (AGENTS.md §2.8).

## ✅ Sprint 10 (arte da Parte 2 pela API, tarde de 2026-10-24)

- **Parte 2 com toda a arte**: páginas 4 a 8 (`-real`, `-imag` e as camadas da poeira, do balão, da cabra e dos martelos) geradas pelo Claude com o Nano Banana 2 pela API, em modo Batch, por autorização pontual do humano. US$ 0,57. Ferramentas novas: `npm run gerar:imagens` e `tools/recortar-camada.py` (fundo magenta → alfa, sem halo). Método: `docs/ARTE-PELA-API.md`.
- **Animação `martelar`** (camada que gira em torno do eixo do alto): os martelos do amanhecer batem no pano.
- **As 9 Imaginações da Parte 2 refeitas** (pedido do humano): transformam de verdade a cena e os personagens (cavaleiro dourado, corcel branco, Sancho escudeiro), com a bíblia da Imaginação (`ARTE-PELA-API.md` §4.1). US$ 0,42. Total da Parte 2 pela API: US$ 0,99.

## ✅ Sprint 11 (arte das Partes 3 e 4 pela API, noite de 2026-10-24)

- **Dom Quixote todo ilustrado** (antigo A-7): as Partes 3 e 4 inteiras (33 cenas + 10 camadas) pelo Claude, pela API (Nano Banana 2, Batch), com a bíblia da Imaginação desde o início. US$ 1,60. Camadas posicionadas pela arte; todas as interações testadas (moedas, caderno, cambalhota, assinatura, espada, fole, tocha, bengala). A estante já mostra as quatro capas.
- `recortar-camada.py --sem-contorno` (tira o contorno branco de "adesivo"); cache das imagens separado por lista.

## ✅ Sprint 12 (fluxos de leitura, PWA e portal multilíngue, 2026-10-24)

- **Fluxos de Leitura ("Ler de Novo" e "Continuar")**:
  - **M-5**: "Ler de Novo" ao final do livro reinicia completamente todos os cartões, lentes, camadas e volta à capa inicial.
  - **M-6**: "Continuar de onde parou" lembra a última página lida (guardada em `localStorage`) e oferece o botão destacado "Continuar da Página X" tanto na capa do livro quanto na estante da biblioteca (`index.html`).
  - **Botão 🔄 Recomeçar (pedido do leitor)**: cada página de leitura inclui agora um botão direto ao lado da lente para reiniciar apenas a página atual de volta ao seu estado inicial (limpa cartões, zera progresso e restaura a Realidade).
- **Aviso de atualização do PWA (M-9)**:
  - Notificação sutil (`✨ Versão nova disponível`) ao detectar nova versão em cache pelo Service Worker nos livros e no portal, com botão "Atualizar" para recarregar instantaneamente.
- **Portal e menus multilíngues fora dos livros**:
  - `assets/js/i18n-site.js` adiciona seletor de bandeiras (🇧🇷 🇬🇧 🇫🇷 🇪🇸) no topo de `index.html` e `sobre.html`, sincronizado com a preferência dos livros (`cv-idioma`). Títulos, prateleiras, descrições do acervo e instruções traduzidos nos 4 idiomas.

## ✅ Sprint 13 (texto para 6 anos, 2026-10-25)

- **Partes 2, 3 e 4 reescritas em linguagem mais simples** (pedido do humano depois de ler a Parte 2 com o filho): frases mais curtas, palavras do dia a dia do Brasil (pousada, moça, "o senhor", estilingue) e menos arcaísmos (vossa mercê, estalagem, donzela, desventurada, sonâmbulo, carmesim, azinheiras, távola), sem perder as imagens e o humor. Palavras difíceis que fazem parte da história ficaram, com uma explicação curta no próprio texto (odres, bolotas, elmo, fole). Palavras-chave, cartões e interações sem mudança. Regra registrada em AGENTS.md §3.5.
- **Traduções (en, fr, es) das Partes 2–4 refeitas** no mesmo tom, por agentes, uma por idioma.
- Roteiros de vozes (`roteiro.json`) das Partes 2–4 refeitos para o texto novo e conferidos com `--seco`.
- **Narração em português das Partes 2–4 regravada** no texto novo (autorizado pelo humano): 25 páginas inteiras, com o mesmo elenco, conferidas no Whisper local (3 páginas precisaram de uma segunda tentativa). US$ 0,24 (Flex).

## ✅ Sprint 14 (correção de rumo, 2026-10-25)

- **Revisão humana das Partes 1–3 (antigo A-8)**: o humano leu a série inteira com o filho de 6 anos. As Partes 1, 2 e 3 foram aprovadas como estão; a assinatura da carta (`ordem`, Parte 3) foi a melhor atividade ("nota 10"). A Parte 4 foi reprovada: apressada, mal encadeada, com eventos mal explicados.
- **Paralelo com Cervantes e plano da correção de rumo**: [`PLANO-DOM-QUIXOTE-PARTES-4-7.md`](PLANO-DOM-QUIXOTE-PARTES-4-7.md) (nova Parte 4 fechando o volume de 1605; Partes 5–7 para o volume de 1615, na prateleira de baixo).
- **Receita de um clássico vivo**: [`RECEITA-CLASSICO-VIVO.md`](RECEITA-CLASSICO-VIVO.md), com as fases, as paradas para o humano, o crivo e o cardápio das atividades e o diário de lições.
- **Estante e rascunhos**: os cadeados de "próximos clássicos" saíram da estante (decisão do humano); a prateleira de baixo mostra o segundo volume de Dom Quixote (Partes 5–7) como capas-teaser com cadeado e um aviso gentil ao tocar. Lista única das obras em produção em `assets/js/acervo.js`. Em `sobre.html`, a seção "Livros em produção" com a chave "Mostrar os rascunhos". No motor, o modo rascunho (`rascunho: true`).
- **Receita geral × receitas específicas**: `RECEITA-CLASSICO-VIVO.md` passou a valer para qualquer obra e tipo de adaptação; o que só vale para Dom Quixote (condensação e lentes) foi para `receitas/DOM-QUIXOTE.md`. Revisão de todos os documentos e do `AGENTS.md` (nova §0: como trabalhar, para qualquer agente).
- **Concluídos de vez** (estavam no backlog): consistência das ilustrações da Parte 1 (antigo M-7: NB-4, NB-5, NB-6 aprovados), ícone definitivo do app (antigo B-3, NB-7) e Leão Guardião em aquarela (antigo B-4, NB-8).

## ✅ Sprint 15 (nova Parte 4 ilustrada, 2026-10-25)

- **Fase 3 aprovada** pelo humano e **fase 4 feita** pelo Claude pela API paga (autorizada no prompt): 23 ilustrações novas e 6 camadas para o rascunho da nova Parte 4 (`dom-quixote/parte-4-rascunho.html`, caps. 23 a 32), em 3 rodadas Batch, **US$ 0,90**. A chegada à aldeia reaproveita a arte da Parte 4 antiga.
- Atividades com arte: o piquenique (pão, queijo e moringa sobre a toalha) e a contagem dos tesouros do lago (concha, pérolas e peixinhos no balão da história). Áreas de toque medidas na arte de cada página.
- Lição de arte: lençol branco + capuz pontudo vira imagem de ódio (Ku Klux Klan); fantasia de "mago" pede chapéu de papelão e cabeça descoberta (`ARTE-PELA-API.md` §4.2, receita geral §6.3).

## ✅ Sprint 16 (fase 5 da nova Parte 4: notas da 1ª leitura, 2026-10-25)

- O humano leu o livro ilustrado com o filho e mandou 8 notas; todas aplicadas (caderno da Parte 4, §5). Texto dos caps. 27 a 33 reescrito; o cap. 30 virou dois (12 páginas, caps. 23 a 33); o cap. 28 conta a história de Cervantes (o Cavaleiro do Lago) dentro do balão; o fim troca o teaser pelo "de boca em boca".
- **Motor**: a Lente da Imaginação virou **recompensa** (trancada até a criança acertar a atividade, em todos os livros); tipo novo **`pedido`** com pegadinhas que recomeçam o jogo; páginas sem `imag` não mostram a chave. `conferir:traducoes` cobra as pegadinhas de cada idioma.
- Depois: saiu a contagem dos tesouros do cap. 28 ("muito bestinha"); o cap. 28 ganhou uma lição melhor sobre o medo (ele protege; o exagerado inventa monstros) e o cap. 32 perdeu o "Ilha se come?". **Fase 5 aprovada em 2026-10-26; texto congelado.**
- **Arte** (API Batch, autorizada): 9 imagens aceitas em 11, **US$ 0,38**. Método novo de continuidade (recortes da arte aprovada como referência + edições), registrado em `ARTE-PELA-API.md` §4.3.

---

## ✅ Interface: ilustração maior e botões que se escondem (2026-10-25)

- **Ilustração maximizada**: a cena fica com todo o espaço livre da folha (antes reservava 150 px fixos e era espremida quando a atividade tinha mais cartões). Selo da lente + botão grande + "Recomeçar" viraram **uma barra estreita** logo abaixo da cena: chave deslizante 👓 Realidade ↔ ✨ Imaginação, legenda curta e 🔄. Bandeja de cartões mais compacta, numa fileira só até 5 cartões e com altura máxima.
- **Paisagem**: a folha da arte cresce até 60% da largura quando sobra altura; a virada de página foi ajustada para folhas de larguras diferentes.
- **Barras compactas**: botões de 40 px; o "Ouvir Página" só mostra o texto a partir de 1024 px.
- **Modo "esconder os botões"** (👁 no topo, lembrado no aparelho): as barras somem sozinhas e voltam com um toque nos controles flutuantes dos cantinhos de cima e de baixo.
- **Contador no cantinho**: com os botões escondidos, o número da página e o % do livro lido aparecem discretos no canto inferior direito (pedido do humano).
- Testado no Playwright em 1280 × 800, 800 × 1280 e 1865 × 892 (Partes 1, 3 e rascunho da 4; português e inglês).
