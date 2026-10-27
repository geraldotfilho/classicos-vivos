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

## ✅ Sprint 17 (nova Parte 4: narração em português e publicação, 2026-10-26)

- **Narração gravada** pelo Claude pela API paga (autorizada no prompt, Flex): 12 páginas inteiras (220 frases, ~24 min) com a narradora e as vozes dos personagens, e 34 palavras-chave novas, conferidas no Whisper local. **US$ 0,20** (63 pedidos). QA: `docs/narracao/qa-parte-4-rascunho.md`.
- **Elenco novo**: mestre Nicolau (também fantasiado de mago), o barbeiro da bacia (a voz da Parte 2), o pastor Eugênio, o velhinho da romaria, a sobrinha Antônia e o povo em coro.
- **Motor e ferramentas**: `pastaAudio` no `window.LIVRO` deixa a versão nova de uma parte publicada gravar numa pasta própria (`narracao/parte-4-rascunho/`), sem mexer na narração que está no ar; o `exportar:frases` gera `frases-dom-quixote-parte-4-rascunho.json` (antes, o rascunho e a parte publicada escreviam o mesmo arquivo) e não exporta mais traduções de rascunho.
- A cota diária da API (100 pedidos) acabou no meio; a gravação foi retomada sozinha na manhã seguinte, com os blocos já pagos vindos do cache.
- **Publicação** (escuta aprovada pelo humano): a nova Parte 4 substituiu a antiga, que foi para `docs/arquivo/dom-quixote-parte-4-v1/`. Capa nova na estante, descrição nova em `sobre.html` (4 idiomas) e o fim da Parte 3 anunciando a nova Parte 4. **Aviso de parte sem tradução**: em inglês, francês ou espanhol, a Parte 4 abre em português com um aviso no idioma escolhido (as outras partes continuam traduzidas). A arte aposentada (`imagens/acervo/`) saiu do service worker. Traduções da Parte 4: na fila (fase 7).

---

## ✅ Interface: ilustração maior e botões que se escondem (2026-10-25)

- **Ilustração maximizada**: a cena fica com todo o espaço livre da folha (antes reservava 150 px fixos e era espremida quando a atividade tinha mais cartões). Selo da lente + botão grande + "Recomeçar" viraram **uma barra estreita** logo abaixo da cena: chave deslizante 👓 Realidade ↔ ✨ Imaginação, legenda curta e 🔄. Bandeja de cartões mais compacta, numa fileira só até 5 cartões e com altura máxima.
- **Paisagem**: a folha da arte cresce até 60% da largura quando sobra altura; a virada de página foi ajustada para folhas de larguras diferentes.
- **Barras compactas**: botões de 40 px; o "Ouvir Página" só mostra o texto a partir de 1024 px.
- **Modo "esconder os botões"** (👁 no topo, lembrado no aparelho): as barras somem sozinhas e voltam com um toque nos controles flutuantes dos cantinhos de cima e de baixo.
- **Contador no cantinho**: com os botões escondidos, o número da página e o % do livro lido aparecem discretos no canto inferior direito (pedido do humano).
- Testado no Playwright em 1280 × 800, 800 × 1280 e 1865 × 892 (Partes 1, 3 e rascunho da 4; português e inglês).


## ✅ Sprint 18 (Coleção expandida, abas e chiado de áudio resolvido, 2026-10-26)

- **Lente da Imaginação como recompensa nas Partes 1 a 3 (Tarefa 1)**:
  - Todas as páginas com atividades das Partes 1 a 3 ganharam o quadro com `comandoAtividade` e botão 🔊 para instrução audível da atividade.
  - No motor (`assets/js/livro.js`), o tipo `variante` agora toca `playSound('fanfare')` ao concluir todos os itens antes de convidar à Imaginação (`inviteImagination`).
  - As novas instruções foram traduzidas e validadas nos 9 arquivos de tradução (`traducoes/parte-{1,2,3}.{en,es,fr}.js`), passando com 0 erros no validador.
- **Home page (`index.html`) e Sobre (`sobre.html`) (Tarefa 2)**:
  - **Prateleira 1 com Coleção 3D Expandida**: substituída a antiga disparidade de livro gigante por uma caixa/boxset tridimensional elegante de Dom Quixote Volume 1 (1605). Ao tocar, expande-se suavemente em 4 capas com proporções 3/4 equilibradas, capas em aquarela, badges (Partes 1 a 4) e botão play, com botão para recolher e áudio procedural via Web Audio API.
  - **Página de Adultos (`sobre.html`) estruturada em 4 abas**: Proposta & Como Funciona, A Nossa Receita de Adaptação, Acervo & Em Produção, Quem Faz & Contato.
  - **Transparência de Adaptação e Idiomas**: receita generalista explicada; transparência de que os textos são criados em português, aprovados pelo autor e traduzidos com suporte de IA, com convite caloroso para leitura prévia por nativos e reporte de inconsistências.
  - **Apresentação e Contato**: perfil de Geraldo Travassos com canal preferencial no GitHub (Issues) e e-mail pessoal. `i18n-site.js` atualizado nos 4 idiomas.
- **Eliminação de Chiados e Estalos entre Frases (Tarefa 3)**:
  - Chamada rigorosa de `pararGravacao()` ao término de cada frase, durante a pausa de 150/250 ms e no final da leitura no motor (`assets/js/livro.js`), eliminando vazamentos de ruído de buffer e estalos de DAC.
  - Inclusão de rampas de atenuação Hann suaves (10 ms) em `tools/otimizar-audio.mjs` e `tools/gravar-narracao.mjs` nas bordas de corte e concatenação com silêncio.
  - Suavização de 62 arquivos MP3 com corte abrupto no acervo. **Nenhum texto narrado foi alterado e o custo foi de US$ 0,00**.

---

## ✅ Sprint 19 (Traduções da Parte 4, título localizado e lições de áudio, 2026-10-26)

- **Traduções da Parte 4 completas em 3 idiomas (Fase 7)**:
  - Criados os arquivos `dom-quixote/traducoes/parte-4.en.js` (Inglês Britânico), `parte-4.es.js` (Espanhol) e `parte-4.fr.js` (Francês).
  - 12 páginas em cada idioma, com hashes coincidentes, contagem idêntica de palavras-chave alfabetizadoras em MAIÚSCULAS com pontos medianos (`{{PALAVRA|SÍ • LA • BAS|emoji}}`).
  - Atividades interativas adaptadas culturalmente para cada idioma:
    - **Cap. 24 (pág. 2)**: ordenação silábica do *bacielmo* (*BASIN-HELMET*, *BACIELMO*).
    - **Cap. 25 (pág. 3)**: soletrar da palavra mágica de amizade (*FRIEND*, *AMIGO*, *AMI*).
    - **Cap. 27 (pág. 5)**: piquenique com pegadinhas sonoras/visuais próprias (*bread/thread/bees/chin*, *pan/flan/queso/hueso/águila*, *pain/bain/fromage/orage/menton*).
    - **Cap. 32 (pág. 10)**: ordenação do título sonhado por Sancho (*SANCHO GOVERNOR OF THE ISLAND*, *SANCHO GOBERNADOR DE LA ISLA*, *SANCHO GOUVERNEUR DE L'ÎLE*).
  - Validador oficial `tools/traducoes.mjs` executado: **0 erro(s), 0 aviso(s)** em todas as partes e idiomas.
- **Título do projeto localizado na Home Page (`index.html`)**:
  - Traduções refinadas para manter o sentido e as nuances de cada língua:
    - Português: **Clássicos Vivos**
    - Inglês: **Living Classics**
    - Espanhol: **Clásicos Vivos**
    - Francês: **Classiques Vivants**
  - Configurado `data-i18n="nomeApp"` no `<h1>` de `index.html` e integrado aos dicionários de `assets/js/i18n-site.js` juntamente com `tituloIndex`, `tituloSobre` e `sobreTituloPrincipal`.
- **Registro da Lição Aprendida sobre Áudio**:
  - Incorporada em `docs/RECEITA-CLASSICO-VIVO.md` (§6.4 e diário §8) e `AGENTS.md` (§2.6) a obrigatoriedade do ciclo de pausa do DAC via `pararGravacao()` e da atenuação com rampa Hann de 10 ms em cortes e uniões de blocos neurais em ferramentas de áudio.
- **PWA e Service Worker**:
  - `tools/build-sw.mjs` executado, atualizando `sw.js` com 160 arquivos cacheados offline.
- **Custo zero e respeito aos textos**: nenhum texto narrado em português alterado, custo financeiro US$ 0,00.


---

## ✅ Sprint 20 (Transparência do Fluxo de Criação com IA e Licença Livre Total, 2026-10-26)

- **Transparência Total na Receita de Adaptação (`sobre.html` e `assets/js/i18n-site.js`)**:
  - **Reenquadramento das Metas Pedagógicas**: Os 5 pilares fundamentais (Fidelidade ao espírito, Proteção da infância, Ritmo para 6 anos, Gamificação com propósito e Paradas de aprovação) foram clarificados como os objetivos inegociáveis e critérios de qualidade que cada livro deve cumprir.
  - **Fluxo de Trabalho Passo a Passo**: Detalhamento exato de como uma obra ganha vida (Fases 0 a 7), especificando para cada etapa:
    - *O que acontece* na narrativa e na tecnologia;
    - *Modelos de IA envolvidos*: Claude Opus 5.5 ou superior (arquitetura e mapeamento estrutural da obra), Claude / Gemini (assistência literária e código), Google Imagen 3 / Nano Banana 2 (pinturas em aquarela e camadas táteis), Gemini Voice TTS neural (`gemini-3.8-flash-tts` com vozes expressivas como Aoede, Puck, Fenrir e Kore) e Whisper local para conferência;
    - *Intervenções humanas & Paradas críticas*: Aprovação do mapa da obra, lapidação artesanal do texto em português, e especialmente as **duas paradas humanas inegociáveis**:
      - **Parada 1 (Fase 3)**: o autor lê o rascunho funcional no tablet **a solas (sem a criança)**, conferindo ritmo, clareza e mecânica antes de gerar imagens;
      - **Parada 2 (Fase 5)**: **o filho entra na obra já ilustrada!** O pai lê com a criança no tablet, conferindo encantamento, humor e reações reais antes de congelar o texto em português para gravação e tradução.
  - **Filosofia sobre o Uso de IA**: Inclusão de seção dedicada evidenciando que a IA atua como um estúdio de amplificação criativa, mas o discernimento pedagógico, a proteção infantil, a curadoria estética e o afeto pertencem exclusivamente à sensibilidade humana.
  - **Suporte Multilíngue Completo**: As novas seções foram traduzidas e integradas com rigor aos 4 idiomas suportados no portal (Português, Inglês, Francês e Espanhol) via `assets/js/i18n-site.js`.
- **Licença Livre Total — Livre como em Liberdade**:
  - Removida qualquer menção restritiva que limitava a liberação a "escolas" em `sobre.html`, `assets/js/i18n-site.js` (em pt-BR, en, fr, es) e no `README.md`.
  - O projeto explicita agora que textos e ilustrações sob CC BY 4.0 são **completamente livres para usar, reproduzir, copiar, compartilhar, distribuir e readaptar para qualquer fim (livre como em liberdade!)**, bastando citar o projeto Clássicos Vivos.
- **PWA & Validação**:
  - Service worker atualizado via `tools/build-sw.mjs` (versão `f67a1cc6719b`).
  - Sintaxe e testes de tradução validados (`tools/traducoes.mjs`: 0 erros, 0 avisos).
  - Testes visuais em tablet paisagem e retrato confirmados com sucesso via Playwright e Chrome.


---

## ✅ Sprint 21 (UX da Biblioteca na Home: Abertura Lateral na Prateleira e Gerenciador Offline por Volume, 2026-10-26)

- **Aprimoramento da UX da Biblioteca (`index.html`)**:
  - **Capa da Coleção Limpa e Elegante**: Removido o botão circular pulsante central que flutuava sobre o boxset. A capa da série brilha com a aquarela original de Dom Quixote e Sancho Pança, mantendo em destaque as 3 camadas em perspectiva 3D dos volumes empilhados atrás da capa frontal (`.boxset-layer-1`, `.boxset-layer-2`, `.boxset-layer-3`).
  - **Abertura Lateral na Prateleira (`#quixote-parts-shelf`)**: Ao clicar para abrir a coleção, os livros não explodem mais numa grade enorme vertical. Em vez disso, abrem-se **lateralmente ao longo da tábua de madeira da prateleira**, com proporção compacta (`w-36` a `w-44`, `aspect-[3/4]`), crescendo estritamente o suficiente para exibir o número da parte (`badge-parte-N`), a gravura e o título da parte (`titulo-parte-N`). Incluído botão compacto de "Recolher" (`btn-fechar-colecao`) no topo.
  - **Controle de Leitura Offline por Volume (`assets/js/offline-manager.js`)**:
    - **Botão explícito "Baixar"**: Cada volume que ainda não está salvo no tablet exibe um botão dourado claro com ícone `ph-download-simple` e rótulo "Baixar" (com alvos de toque $\ge$ 44-48px).
    - **Indicador "Offline" e Lixeira**: Nos volumes já armazenados no tablet, surge a etiqueta verde de confirmação "Offline" (`ph-check-circle`) acompanhada de um botão de lixeira discreto (`ph-trash`) para remover os arquivos locais e liberar espaço no dispositivo, com diálogo de confirmação.
    - **Notificação e Destaque de Atualização ("Atualizar")**: Caso uma nova edição ou correção do livro seja detectada (divergência entre a versão armazenada e a versão corrente do service worker), o volume exibe em destaque vibrante o botão "Atualizar" (`ph-arrows-clockwise`, gradiente solar e brilho pulsante) para baixar a versão revista com um único toque.
    - **Feedback tátil e sonoro procedural**: Síntese sonora via Web Audio API para início de download, fanfarra triunfal ao concluir, estalo suave na exclusão e toast flutuante (`#cv-toast`) confirmando o estado.
    - **Internacionalização completa**: Todos os rótulos, avisos, títulos e atributos `aria-label` dos controles offline integrados a `assets/js/i18n-site.js` em Português, Inglês, Francês e Espanhol, com atualização em tempo real ao alternar o seletor de idiomas.
  - **Automação do Service Worker (`tools/build-sw.mjs`)**:
    - `tools/build-sw.mjs` atualizado para injetar a versão calculada do cache diretamente em `assets/js/offline-manager.js` de forma determinística, mantendo `sw.js` e `CV_OFFLINE` perfeitamente sincronizados a cada build.
- **Validação e Testes**:
  - Testes visuais e de interação ponta a ponta executados com Playwright (Google Chrome) em modo tablet paisagem (1280 × 800) e retrato (800 × 1280), validando a remoção do ícone flutuante, abertura lateral contida, transição de estados offline, exclusão via lixeira, recolhimento da estante e troca de idiomas com 100% de aprovação.


---

## ✅ Sprint 22 (Honestidade Radical e Humildade: IA como Co-Autora, 2026-10-26)

- **Revisão Honesta e Humilde da Filosofia sobre Inteligência Artificial (`sobre.html` e `assets/js/i18n-site.js`)**:
  - **Humildade e despretensão**: Removida qualquer pretensão de equiparação ou comparação com grandes editoras profissionais. O projeto explicita com total simplicidade que nasce do esforço independente e artesanal de um pai dedicado a aproximar crianças das grandes histórias, sem qualquer pretensão comercial.
  - **Reconhecimento da IA como Co-Autora**: Ajustada a definição para reconhecer com honestidade cristalina a inteligência artificial como **co-autora**. O autor humano é o cérebro criativo por trás de tudo, com a sensibilidade pedagógica, a curadoria do afeto e a proteção inegociável da infância guiando cada linha; contudo, a IA é parceira e co-autora indispensável, sem a qual seria humanamente impossível encontrar tempo e fôlego para produzir tais obras em meio à rotina corrida do dia a dia.
  - **Tradução completa nos 4 idiomas**: Texto reformulado e integrado em Português (`pt-BR`), Inglês (`en`), Francês (`fr`) e Espanhol (`es`).

---

## ✅ Sprint 23 (Eliminação de Rajada de Fim de Arquivo e Limpeza Espectral em Todo o Acervo, 2026-10-26)

- **Investigação Cirúrgica a partir do Exemplo da Página 2 da Parte 2**:
  - **Identificação da causa-raiz real**: O ruído relatado pelo humano ("logo após a última frase, parece que o ruído surge na hora que o áudio desliga") foi isolado e comprovado no sinal de áudio. Não se tratava de falha do reprodutor web nem da navegação entre frases. O Gemini TTS deixava um pacote de dados espúrio nos últimos 150 a 200 ms dos arquivos MP3 de página inteira (`pN.mp3`), com **pico em 32.768** (saturação máxima em 16 bits) e RMS superior a 11.000.
  - **Por que parecia o áudio "desligando"**: Na página 2 da Parte 2 (`p2.mp3`), a narradora termina de falar a última frase em 83,95 s. Há 300 ms de silêncio, e nos últimos 150 ms (84,30 s a 84,47 s) ocorre uma explosão de ruído branco a volume máximo. Imediatamente após a explosão, o arquivo atinge o fim (`ended`), pausando o reprodutor e alternando o botão para verde ("Ouvir Página"). Ao ouvido humano, a rajada soava como se o próprio reprodutor estivesse estalando/chiando ao desligar.
  - **Por que ocorria "às vezes sim, às vezes não"**: O ruído ocorria de forma sistemática em todas as narrações de página inteira (`pN.mp3`, onde as páginas tocam um arquivo contínuo), mas não em palavras curtas ou páginas antigas com frases fragmentadas.
  - **Por que o gate inicial não pegou**: O gate espectral anterior usava limiar de amplitude para fala; como a rajada atingia RMS de até 16.000, o filtro a interpretava como voz alta.
- **Aprimoramento do `tools/audio_gate.py` (Filtro de Rajada / Tail Burst)**:
  - **Detecção de anomalia de cauda**: Analisa os últimos 800 ms do áudio. Se houver pico de energia nos últimos 250 ms precedido por intervalo de silêncio ($\ge 40$ ms), o pico é classificado como artefato e zerado com rampa Hann suave de 30 ms a partir do ponto onde a fala real terminou.
  - **Preservação de duração rigorosa (`preserve_length: True`)**: Para todas as páginas completas (`pN.mp3`), a duração e a contagem total de amostras foram mantidas 100% idênticas, preservando a validade milimétrica dos tempos de `paginas.json`.
  - **Gate espectral interno**: Mantida a filtragem de ruído estático (4–12 kHz) nas pausas intermediárias com margem de segurança de 50 ms para consoantes.
- **Resultados de Antes e Depois Comprovados**:
  - `dom-quixote/audio/narracao/parte-2/p2.mp3` (últimos 200 ms):
    - *Antes*: RMS = 11.043,1 \| Pico = 32.768 (estouro de volume)
    - *Depois*: **RMS = 0,0 \| Pico = 0 (silêncio digital cristalino)**
  - `dom-quixote/audio/narracao/parte-2/p1.mp3`: Antes RMS = 13.584,6 \| Depois RMS = 0,0
  - `dom-quixote/audio/narracao/parte-1/p2.mp3`: Antes RMS = 10.784,3 \| Depois RMS = 0,0
  - 100% das páginas narradas (`pN.mp3`) agora encerram em silêncio puro, sem nenhum clique, estalo ou chiado ao desligar.
- **Processamento de 100% do Acervo**:
  - 291 arquivos foram tratados e regravados com a nova lógica.
- **Custo zero e respeito aos textos**: Nenhum texto narrado em português foi alterado, US$ 0,00 de custo financeiro de API.


---

## ✅ Preparação para a divulgação (2026-10-26): aviso do adulto, aviso aos pais e contato

- **Aviso do adulto na primeira abertura** (`livro.js`, `abrirPortao`): na primeira vez que uma obra é aberta no aparelho, um aviso pede que um adulto leia a história antes (ou junto), fala dos cuidados da adaptação, do uso de IA e de que as traduções ainda não foram revisadas por falantes nativos. O adulto libera resolvendo uma conta que muda a cada vez (ex.: `14 × 6 − 29`) e escolhe **só o português** ou **todos os idiomas**. Um idioma não liberado pede o aviso de novo ao tocar na bandeirinha. Vale para todas as partes da obra (`cv-adulto-v1-<obra>`). É ciência informada, não segurança.
- **Aviso aos pais e responsáveis** em `sobre.html` (4 idiomas): leitura com adulto, IA e traduções não revisadas, projeto gratuito sem garantias, nenhum dado coletado, versão oficial no GitHub Pages.
- **Contato simples para famílias**: botão "Avisar sobre um problema" (e-mail com assunto pronto) em `sobre.html` e o e-mail no próprio aviso do livro; o GitHub ficou como alternativa.

- **Divulgação (2026-10-27)**: prévia do link no WhatsApp e nas redes (Open Graph, `assets/icones/compartilhar.jpg`), `sitemap.xml` e verificação no Google Search Console, e contador de visitas anônimo (GoatCounter, `assets/js/contador.js`). O aviso aos pais passou a dizer que só contamos visitas de forma anônima, sem cookies nem dados pessoais.

---

## ✅ Narração em en/fr/es das Partes 2–4 (2026-10-27)
- **Partes 2 e 3 narradas nos três idiomas** (elenco de personagens por idioma, palavras-chave), entregues na `main`; Parte 4 em andamento (BACKLOG M-11).
- **Menos pedidos por dia**: palavras-chave de várias partes juntas (25 por pedido), blocos de narração que atravessam as páginas, reparo cirúrgico (só a frase com defeito) em vez de regravar o bloco, e parada limpa quando a cota diária acaba (`tools/gravar-fila-traducoes.sh`, código 75).
- **Roteiros das traduções** derivados do roteiro em português (`tools/derivar-roteiro.mjs`); situação da narração: `tools/conferir-narracao.mjs`.

- **Ambiente Antigravity no Windows e palavras-chave (2026-10-27)**:
  - Suporte completo a geração de áudio no Windows: fallback do `imageio_ffmpeg` para ffmpeg em `tools/transcrever.py` e comunicação com Python via pipe unbuffered (`-u` e `readline()`) em `tools/gravar-narracao.mjs`.
  - Gravadas palavras-chave pendentes: `fr` Parte 2 (`armees`), `fr` Parte 4 (`heaume`) e `es` Parte 4 (`flores`). Todas as palavras de todas as partes em PT, EN e FR estão 100% completas; em ES restou apenas `cayado` (42/43) para renovação da cota diária de 100 pedidos. Gasto adicional: ~US$ 0,0021.
