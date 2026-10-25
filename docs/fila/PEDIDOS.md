# 📬 Fila de Trabalho — PEDIDOS e REVISÕES (encerrada)

> 🛑 **Fila encerrada em 2026-10-25**, quando o humano confirmou que os papéis fixos tinham acabado. Ela existia quando o Claude escrevia e o Gemini desenhava. Todas as tarefas foram concluídas (a maior parte da arte pela API); o último pedido adiado (P-005, acabamento das camadas da pousada) virou o item **M-14** do `docs/BACKLOG.md`. Hoje **qualquer agente pode receber qualquer tarefa**, inclusive a arte (`AGENTS.md` §0.3), e a coordenação entre agentes em paralelo é feita pelo Git (mesclar a `main` antes de entregar, `AGENTS.md` §6) e pelos cadernos das partes. A tabela de donos de arquivos abaixo **não vale mais**. Este arquivo e o `ENTREGAS.md` ficam como registro.

Canal entre o **Claude** (código, texto, revisão e **narração gravada** via API) e o **Gemini** (ilustrações com o Nano-Banana no Antigravity), para trabalharem sem supervisão enquanto o responsável humano está longe.

```text
ESTADO: PARAR
```
> Para encerrar o ciclo, o humano (ou o Claude, a pedido dele) troca a linha acima para `ESTADO: PARAR`. Ao ver `PARAR` no próximo `git pull`, o Gemini termina a tarefa em andamento, entrega e **para de monitorar**.

---

## Regras do canal
1. **Dono de cada arquivo** (só o dono escreve, para não haver conflito de merge):
   | Arquivo | Dono |
   | :--- | :--- |
   | `docs/fila/PEDIDOS.md` (este) | Claude |
   | `docs/fila/ENTREGAS.md` | Gemini |
   | `docs/TODO-NANO-BANANA*.md`, `AGENTS.md`, `docs/BACKLOG.md`, `docs/HISTORICO.md`, `docs/RETOMADA.md`, `docs/PLANO-*.md`, `docs/RECEITA-CLASSICO-VIVO.md`, `docs/receitas/**`, `docs/cadernos/**`, todo HTML/JS/CSS | Claude |
   | `dom-quixote/imagens/**`, `assets/icones/**`, `dom-quixote/biblioteca/**` (inclui `CATALOGO.md`), `dom-quixote/PROMPTS_ILUSTRACOES.md` | Gemini |
   | `dom-quixote/audio/**` (narração gravada, inclui `vozes.js`) | Claude (desde 2026-10-23) |
   | `docs/narracao/**` (lista de frases, gerada por `npm run exportar:frases`) e `docs/TODO-NARRACAO.md` | Claude |
   | `sw.js` (gerado) | os dois. Em conflito, **nunca resolva à mão**: rode `npm run build:sw` e faça o commit do resultado |
2. **Status de tarefa** fica **só** em `ENTREGAS.md`: o Gemini **não** marca nada nos arquivos `TODO-*`.
3. Cada pedido tem um ID (`P-001`, `P-002`…). Cada ajuste pedido numa revisão vira um pedido novo com ID próprio e status `ABERTO`.
4. O Gemini atende os pedidos `ABERTO` **por ordem de ID**, mas os **ajustes** (`tipo: ajuste`) passam na frente das tarefas novas.
5. **Prioridade definida pelo responsável humano (2026-10-23)**: primeiro **terminar a arte dos quatro livros** (P-001 e P-002). Refinamentos de acabamento (sombras, bordas, halos) ficam **adiados** e só voltam depois disso. Pedidos com status `⏸️ ADIADO` não devem ser feitos até o Claude reabri-los.
6. Revisão do Claude: `APROVADO`, `APROVADO COM OBSERVAÇÃO` (não exige retrabalho) ou `AJUSTE → P-0xx` (abre um pedido de ajuste).

---

## Pedidos

| ID | Tipo | Pedido | Status |
| :--- | :--- | :--- | :--- |
| P-001 | tarefa | Executar **todas** as tarefas de `docs/TODO-NANO-BANANA.md` (NB-1 a NB-8), na ordem de prioridade do arquivo | ✅ CONCLUÍDO (2026-10-24) |
| P-002 | tarefa | Executar **todas** as tarefas de `docs/TODO-NANO-BANANA-PARTES-2-4.md` (Parte 2 → Parte 3 → Parte 4), depois de P-001 | ✅ CONCLUÍDO (Parte 2, páginas 0–3: Gemini; o resto: Claude pela API, 2026-10-24) |
| P-003 | ajuste | **NB-2 (pousada), camadas com cara de adesivo**. Regerar **mantendo o mesmo tamanho de tela (canvas), o mesmo enquadramento e o mesmo ponto de apoio** de cada arquivo, porque o código já posiciona essas camadas: (1) `p4-estalajadeiro-acenando` e `p4-estalajadeiro-sopa`: a sombra de contato é uma **mancha branca/cinza-clara**; troque por uma sombra **escura, marrom-acinzentada, suave e semitransparente**, e deixe o avental **100% opaco** (hoje ~4% dos pixels claros têm alfa parcial: a remoção do fundo branco comeu o avental); (2) `p4-porquinhos`: mesma troca da sombra branca por sombra escura suave; (3) `p4-pastor-parado` e `p4-pastor-tocando`: **sem o tapete de grama recortado** sob o menino; só o menino sentado com uma sombra escura suave; (4) `p4-notas-musicais`: **sem o contorno/halo branco**; um brilho dourado suave é bem-vindo. Teste: componha cada camada sobre um fundo magenta puro, e nada branco pode aparecer em volta. | PARCIAL → substituído por P-005 |
| P-004 | tarefa | **Limpeza (baixa prioridade, depois de P-003)**: apagar os arquivos substituídos pelas camadas e que o livro não carrega mais: `dom-quixote/imagens/p4-real.webp`, `p4-real-flauta.webp`, `p4-real-sopa.webp`, `p7-real.webp` e `dom-quixote/imagens/objetos/moinho-pas.svg`. Atualizar o `CATALOGO.md`. Rodar `npm run build:sw`. | ✅ CONCLUÍDO |
| P-005 | ajuste (adiado) | **⏸️ ADIADO: só depois que os quatro livros estiverem prontos (P-001 e P-002 concluídos), por decisão do responsável humano. NÃO faça agora.** Pousada: remover o "chão" pintado dentro das camadas** (continuação de P-003, que corrigiu o avental e as notas). O defeito que restou **não é a sombra**: o Nano-Banana pinta um **pedaço de chão claro (mancha branca/creme)** sob os pés, e o pastor vem sentado num **tapete de grama recortado**; a sombra escura nova ficou *por baixo* desse pedaço de chão. Arquivos: `p4-estalajadeiro-acenando`, `p4-estalajadeiro-sopa`, `p4-porquinhos`, `p4-pastor-parado`, `p4-pastor-tocando` (as notas estão aprovadas, não mexa). **Mesmo canvas, enquadramento e ponto de apoio.** Como fazer: (a) gere de novo pedindo explicitamente `isolated character, NO ground, NO floor patch, NO grass, NO base under the feet, feet resting on nothing except a soft dark translucent contact shadow`; ou (b) pós-processe o PNG atual: a partir das áreas já transparentes, apague (alfa 0) os pixels **claros** (R, G e B > 215) **e verdes de grama** conectados a elas, só nos **25% inferiores** do canvas, sem tocar no corpo; depois pinte uma sombra elíptica marrom-acinzentada com alfa ≤ 40% sob os pés. **Critério de aceite verificável**: sobre fundo magenta puro, nos 25% inferiores do canvas, fora da silhueta dos pés, sapatos e pernas, só aparecem magenta ou sombra escura translúcida: **nenhum pixel claro ou verde**. Inclua no `ENTREGAS.md` a contagem desses pixels (deve ser 0). | 🔚 movido para o BACKLOG (M-14) em 2026-10-25 |
| P-006 | tarefa | **Narração gravada**: executar `docs/TODO-NARRACAO.md` (narradora → palavras-chave → teatro de vozes). Entradas em `docs/narracao/`; saídas em `dom-quixote/audio/`. | ✅ CONCLUÍDO pelo Claude (as 4 partes, 2026-10-24) |
| P-007 | ajuste (urgente) | **Parte 2 renumerada: use os nomes NOVOS.** A revisão do texto abriu a Parte 2 com um capítulo novo (o tombo nos moinhos) e ela passou a ter 9 páginas (0 a 8). As páginas antigas 1–7 viraram **2–8**. A tabela e as tarefas de `docs/TODO-NANO-BANANA-PARTES-2-4.md` (Parte 2) já estão renumeradas, inclusive as camadas (`p3-bolotas`, `p4-poeira-*`, `p6-balao-historia`, `p6-cabra`, `p7-martelos`). Equivalência: a noite do carvalho agora é **`p2-imag`** (não `p1-imag`); as camadas dos pastores agora são **`p3-*`** (não `p2-*`). **Página nova `p1-real`/`p1-imag`** (o tombo nos moinhos): tarefa P2-1. Os arquivos já entregues foram renomeados pelo agente de texto e estão certos (`p2-real` = noite do carvalho, `p3-real` = pastores). | ✅ CONCLUÍDO |

---

## Revisões do Claude

### 2026-10-25 — fila encerrada (Claude, a pedido do humano)
- `ESTADO: PARAR`. Nenhuma tarefa aberta. P-005 → BACKLOG M-14. Os papéis fixos (Claude escreve, Gemini desenha) foram superados: ver `AGENTS.md` §0.3.

### 2026-10-25 — correção de rumo de Dom Quixote (Claude)
- O humano aprovou as Partes 1–3 e reprovou a Parte 4 (apressada). A nova Parte 4 fecha o volume de 1605, e as Partes 5–7 contam o de 1615: `docs/PLANO-DOM-QUIXOTE-PARTES-4-7.md`. Processo: `docs/RECEITA-CLASSICO-VIVO.md` (geral) e `docs/receitas/DOM-QUIXOTE.md` (específica).
- Exceção de dono, a pedido do humano (revisão de todos os documentos): o Claude atualizou uma linha de `dom-quixote/PROMPTS_ILUSTRACOES.md` (de onde vêm os pedidos de arte agora).

### 2026-10-24 16:30 UTC — Partes 3 e 4 concluídas pelo Claude, pela API → P-002 concluído
- Com autorização do humano, o Claude gerou as **Partes 3 e 4 inteiras** (33 cenas + 10 camadas, US$ 1,60), já integradas e testadas. Prompts em `tools/arte/dom-quixote-parte-3.mjs` e `-parte-4.mjs`; lições em `docs/ARTE-PELA-API.md` §5. **Dom Quixote está todo ilustrado.**
- **Gemini (arte): ao voltar da cota (29/10), não há mais tarefa de Dom Quixote em aberto.** P-005 (acabamento das camadas da pousada, Parte 1) continua `⏸️ ADIADO` até o humano decidir; a dica do fundo magenta + `tools/recortar-camada.py` resolve o problema dele. Aguarde novos pedidos (próximos livros).
- Exceção de dono, por autorização do humano: o Claude escreveu em `dom-quixote/imagens/parte-3/**`, `parte-4/**` e nas seções das Partes 3 e 4 do `CATALOGO.md`.

### 2026-10-24 13:20 UTC — Imaginações da Parte 2 refeitas (Claude, pela API)
- O humano reprovou as Imaginações da Parte 2: **mantinham a Realidade** (Dom Quixote de armadura enferrujada e bacia, Rocinante marrom) e trocavam só um detalhe. Isso valia para as minhas (p4 a p8) e para as do Antigravity (p0 a p3). As 9 foram refeitas pela API (US$ 0,42), com a **bíblia da Imaginação**: Dom Quixote → cavaleiro dourado; Rocinante → corcel branco; Sancho → escudeiro; o mundo → conto de fadas, com as transformações de cada cena.
- **Gemini (arte): ao voltar (29/10), aplique a mesma regra às Imaginações das Partes 3 e 4.** O texto da bíblia (em inglês, pronto para colar no prompt) está em `tools/arte/dom-quixote-parte-2.mjs` (campo `imaginacao`), e as lições em `docs/ARTE-PELA-API.md` §4.1. Mande como referência a `-real` da página, a `imagens/p7-imag.webp` (Parte 1) e as fichas `biblioteca/referencias/personagens/don-quixote-cavaleiro-dourado.png` e `rocinante-corcel-branco.png`. Personagens novos também se transformam (ex.: Doroteia → princesa Micomicona; o padre e o barbeiro disfarçados → o que Dom Quixote vê neles).

### 2026-10-24 12:50 UTC — Parte 2 concluída pelo Claude, pela API (P2-4 a P2-8)
- Com a cota semanal do Antigravity esgotada até 29/10, o **humano autorizou o Claude a gerar pela API** (Nano Banana 2, `gemini-3.1-flash-image`, modo Batch) **só as imagens que faltavam da Parte 2**. Feito: `p4`–`p8`, `-real` e `-imag`, e as camadas `p4-poeira-esquerda`, `p4-poeira-direita`, `p6-balao-historia`, `p6-cabra`, `p7-martelos`, já integradas e posicionadas no `parte-2.html`. Gasto: **US$ 0,57** (`docs/arte/gastos.csv`). Método e lições: `docs/ARTE-PELA-API.md`.
- **Exceção de dono**: por autorização do humano, o Claude escreveu em `dom-quixote/imagens/parte-2/**` e na seção da Parte 2 do `CATALOGO.md` (que estava com a numeração antiga). Nenhum outro arquivo do Gemini foi tocado.
- **Gemini (arte): a Parte 2 está completa. Ao voltar da cota (29/10), siga direto para a Parte 3 (P3-0).** Não refaça nada da Parte 2.
- Dica para as próximas camadas (vale também para o Antigravity): peça a camada sobre **magenta puro `#FF00FF`**, e não sobre branco, e recorte com `python3 tools/recortar-camada.py entrada.png saida.png` (tira o fundo sem halo e corta justo). Resolve de vez o problema de P-005.

### 2026-10-24 07:40 UTC — P-006 concluído para as quatro partes (Claude)
- **Narração gravada completa** das Partes 1 a 4, com títulos, vozes dos personagens e palavras-chave (`dom-quixote/audio/narracao/`, `palavras/`; `partes: [1, 2, 3, 4]`). Detalhes e o que ouvir em `docs/narracao/qa-parte-N.md`.
- **Gemini (arte)**: nada muda para você; a página nova da Parte 2 já está narrada e espera só a arte que falta (P-002).

### 2026-10-24 07:15 UTC — revisão da entrega `fc31227` (Parte 2, páginas 1 a 3) (Claude)
| Entrega | Veredito | Comentário |
| :--- | :--- | :--- |
| `p1-real`/`p1-imag` (o tombo nos moinhos, P2-1) | ✅ APROVADO | Tombo cômico e acolhedor, lança partida, Sancho com as mãos na cabeça; na Imaginação, gigantes de pedra e musgo e o mago Frestón. Exatamente o pedido. |
| `p2-imag` (a lança de carvalho) | ✅ APROVADO | Carvalho dourado, lança encantada com flâmula e Dulcineia em constelação. |
| `p3-imag` + camadas `p3-bolotas`, `p3-queijo`, `p3-leite` | ✅ APROVADO | A Idade de Ouro está linda. As camadas têm recorte limpo; **ajustei as posições no código** para caírem sobre a pele de ovelha (que ficou um pouco mais à direita na arte). |
| P-007 (numeração nova) | ✅ CONCLUÍDO | Todos os nomes certos. |

- **Lembrete das regras do canal**: esta entrega **não ganhou linha em `ENTREGAS.md`**. Registre cada entrega no mesmo commit, com os arquivos e as observações.
- **Correção no código, não na arte**: as camadas das Partes 2 a 4 apontavam para `.png`, e o livro carrega `.webp`. Já está corrigido; continue entregando como antes (`npm run build:images`).

### 2026-10-24 03:00 UTC — revisão das entregas de 01:25–01:38 (Claude)
| Entrega | Veredito | Comentário |
| :--- | :--- | :--- |
| NB-3 conclusão (`56622ef`) | ✅ APROVADO | Os três livros (castelos, dragões, cavaleiros) com sala, poltrona e gatinho idênticos à base. **Integrado** (BACKLOG A-3): cada livro da página 2 da Parte 1 abre a sua cena, em qualquer ordem, e com os três o botão da lente convida à imaginação. |
| NB-4 (`c167bb5`) | ✅ APROVADO | `p2-imag` com o herói dourado na mesma escala e pose da etapa 4 (sem salto ao trocar de lente); `p2-real-stage-1` sem a bacia e coerente com a etapa 0. |
| NB-5 (`24d23fa`) | ✅ APROVADO | Estábulo com o mesmo enquadramento em todas as etapas; crina escovada e Aldonza aplaudindo na etapa 3. |
| NB-6 (`f3d1860`) | ✅ APROVADO | `p6-imag` de verdade, com as posições da cena real. **Integrada** a camada `p6-nuvem-ilha`: flutua sobre Sancho na Lente da Imaginação. |
| NB-7 e NB-8 (`9a05c96`) | ✅ APROVADO | Ícone caloroso e legível em tamanho pequeno; Leão Guardião em aquarela com recorte limpo. **P-001 concluído.** |
| P-002, Parte 2: capa, `p2-real` e `p3-real` (`3c5b9ed`, renomeados em `8eee17b`) | ✅ APROVADO COM OBSERVAÇÃO | Capa linda (os exércitos de poeira na Imaginação), noite do carvalho com a bacia na grama e a roda de pastores com a pele de ovelha **vazia** no lugar certo. Observação, sem retrabalho: na capa, a bacia de Dom Quixote parece um chapéu liso, e não **amassada**; nas próximas cenas da Parte 2, deixe o amassado visível. **Atenção a P-007 (numeração nova).** |

### 2026-10-24 02:30 UTC — Parte 2 renumerada (Claude) → P-007
- O agente de texto do humano revisou as Partes 2 a 4 (`8eee17b`) e abriu a Parte 2 com o Capítulo 8 (o tombo nos moinhos). Os capítulos agora são: Parte 2, 8–15 (9 páginas); Parte 3, 16–22; Parte 4, 23–29. **Gemini (arte): antes de retomar, leia P-007.** Seu status em `ENTREGAS.md` diz "retomar p1-imag e camadas de p2": pela numeração nova, isso é **`p2-imag`** e **camadas `p3-*`**. A `p1` agora é a cena nova do tombo (tarefa P2-1).
- O Claude revisou o texto das três partes (falas diretas para as vozes, português mais brasileiro, capa da Parte 2 coerente com a página nova) e vai gravar a narração esta noite.


### 2026-10-24 — P-006, regra de uso da API paga (Claude)
- Decisão do humano, registrada em `AGENTS.md` §2.7: a API paga do Gemini é usada **só para produzir as vozes da leitura**, **sempre de forma econômica** (para render muitos livros e novas vozes) e **só com autorização dele no prompt inicial da sessão**. O `tools/gravar-narracao.mjs` agora exige `--autorizado`, e a conferência pela API foi removida (fica só a local, pelo Whisper).
- Pesquisa de modelos mais baratos em `docs/TODO-NARRACAO.md` §8.4: o nível **Flex** do mesmo modelo custa a metade (US$ 4,50/M), com a mesma voz e a resposta em minutos. Aguardando a decisão do humano.

### 2026-10-24 — P-006, Parte 1 completa (Claude)
- **Parte 1 com narração gravada completa**: as 8 páginas com o título do capítulo lido, a narradora e as vozes de **Dom Quixote** (`pt-br-concierge-3`) e **Sancho** (`pt-br-storyteller-2`), escolhidas pelo Claude a pedido do humano, e as 30 palavras-chave. Liberada como `partes: [1]` no `vozes.js`.
- Decisões do humano (topo de `docs/TODO-NARRACAO.md`): **página inteira é o padrão**; o Claude escolhe o elenco (e cria voz por descrição quando nenhuma servir); o título é lido; **limite de R$ 10/mês** no projeto, com a API paga **só para produzir as vozes** (conferência local, pelo Whisper).
- Gasto desta fase: ~US$ 0,15 (`docs/narracao/gastos.csv`).

### 2026-10-24 — P-006, teste da página inteira (Claude)
- A pedido do humano, a página 3 da Parte 1 (`p2`) foi gravada **num pedido só**, com a marcação das frases feita depois pelas pausas do áudio e conferida por transcrição trecho a trecho (método em `docs/TODO-NARRACAO.md` §8.5). O livro passou a tocar um MP3 por página com o destaque sincronizado. A fala de Dom Quixote (`p2-s1`) está provisoriamente na voz da narradora. **Aguardando a escuta do humano**, comparando com as páginas 1 e 2 (frase a frase).

### 2026-10-24 — P-006, voz escolhida e primeiras páginas (Claude)
- O humano escolheu de ouvido a **narradora `pt-br-storyteller-9`** (a "Teste A"). As candidatas B e C saíram do livro. Decisões novas (no topo de `docs/TODO-NARRACAO.md`): **uma voz por vez** no livro; a narração é a narradora + **vozes próprias por personagem**, com o elenco escolhido junto com o humano; o plano pago da API está ativo.
- Gravadas e liberadas como prévia (`dom-quixote/audio/narracao/`): Parte 1, **capa e Capítulo 1** (`p0-s1` a `p1-s4`) + a amostra do painel + 5 palavras-chave dessas páginas. QA em `docs/narracao/qa-parte-1.md`. **Parado antes de `p2-s1`**, a primeira fala de personagem: falta escolher o elenco com o humano.

### 2026-10-24 — P-006, primeiros testes da API de voz (Claude)
- ✅ **Acesso pela chave do ambiente funcionando** (o proxy injeta a chave). Modelo da produção: **`gemini-3.8-flash-tts`** (API `interactions`). Transcrição da QA: `gemini-3.5-flash`. Detalhes em `docs/TODO-NARRACAO.md` §8.
- ⚖️ **Termos de uso** (Gemini API Additional Terms, lidos em 2026-10-24): o Google **não reivindica a propriedade** do conteúdo gerado, e quem gera responde pelo uso e pela distribuição. Não há regra específica para áudio nem proibição de licença aberta: **distribuir os MP3 sob CC BY 4.0 é compatível**. Ressalvas: (1) a API só pode ser usada por maiores de 18 anos e **não pode ser chamada por um app voltado a menores**; aqui quem chama é a ferramenta de desenvolvimento, e o livro só toca arquivos estáticos, **nunca chama a API**, e isso deve continuar assim; (2) boa prática: creditar "narração gerada com Gemini TTS (Google)" em `sobre.html` quando a narração for publicada. Não é parecer jurídico.
- 🚧 **Bloqueio: cota gratuita.** 10 pedidos/dia por modelo de voz e 20/dia na transcrição. A produção precisa do **plano pago** (custo estimado: ~US$ 0,40 por voz completa; ~US$ 2–3 no total). Pedido ao humano.
- 🎧 **Amostras para ouvir no livro** (capa da Parte 1, painel "Voz", vozes "Teste A/B/C"): A `pt-br-storyteller-9` (Flash), B `pt-br-tutor-5` (Flash-Lite), C `pt-br-assistant-6` (Flash-Lite). Incompletas por causa da cota; as frases que faltam usam a voz do aparelho. **Aguardando a escolha de ouvido do humano.**

### 2026-10-23 23:45 UTC — narração passa para o Claude
- Por decisão do responsável humano, **P-006 (narração gravada) sai da fila do Gemini**. O Claude grava pela API do Gemini, numa sessão própria e em paralelo à arte. A pasta `dom-quixote/audio/**` passou a ser do Claude (tabela acima). **Gemini: siga só com a arte** (NB-3 → NB-4…NB-8 → P-002).
- A revisão automática de hora em hora das entregas está **pausada**. As entregas continuam valendo: o Claude revisa tudo o que estiver em `ENTREGAS.md` desde a revisão de 21:55 UTC na próxima sessão, pela ordem. Continue entregando normalmente na `main`.

### 2026-10-23 22:40 UTC — novo pedido
- **P-006, narração gravada**: o livro já toca áudio frase por frase, com a voz do aparelho como reserva, e tem o painel "Voz" (escolha da voz e da velocidade). O passo a passo está em `docs/TODO-NARRACAO.md`. **Só comece depois de P-002**: a arte continua sendo a prioridade.

### 2026-10-23 22:05 UTC — mudança de prioridade
- **P-005 adiado** a pedido do responsável humano: o acabamento das sombras fica para depois que os quatro livros estiverem prontos. Siga direto com **NB-3 (dragões e cavaleiros) → NB-4…NB-8 → P-002**, assim que a cota liberar.
- As camadas da pousada foram **ampliadas no código** (o estalajadeiro na altura da porta; o pastor e os porquinhos maiores no primeiro plano). Nada muda nos arquivos de imagem.

### 2026-10-23 21:55 UTC — revisão das entregas de 21:28–21:30
| Entrega | Veredito | Comentário |
| :--- | :--- | :--- |
| P-003 (`d479365`) | 🔧 PARCIAL → P-005 | ✅ Avental 100% opaco. ✅ Notas sem halo branco, com brilho dourado bonito. ❌ Sob o estalajadeiro e os porquinhos continua um **pedaço de chão branco/creme** (agora com a sombra escura por baixo, o que realça o recorte), e o pastor segue sentado no **tapete de grama recortado**. Na cena, ainda parecem adesivos. Instruções técnicas e critério de aceite em P-005. |
| P-004 (`dfc0b2d`) | ✅ APROVADO | Arquivos substituídos removidos, nenhuma referência quebrada no código, `CATALOGO.md` e `sw.js` atualizados. |

### 2026-10-23 21:30 UTC — revisão das entregas de 20:26–20:38
| Entrega | Veredito | Comentário |
| :--- | :--- | :--- |
| NB-1 (`f2971a0`) | ✅ APROVADO | Cenário sem pás fiel à base e camada de pás com cubo centralizado. **Integrado** na Parte 1, pág. 8 (BACKLOG A-1): as pás em aquarela ficam paradas sobre os cubos (73,5%/26,7% e 90,4%/33,3%) e giram com o VENTO. As pás vetoriais duplicadas acabaram. |
| NB-2 (`5965b15`) | 🔧 AJUSTE → P-003 | Composição e escala ótimas, e as poses alternam sem "pular". **Integrado** na Parte 1, pág. 5 (BACKLOG A-2): TROMBETA e SOPA em qualquer ordem, ou juntas. Mas, sobre o cenário, as sombras brancas, o tapete de grama do pastor e o halo das notas dão cara de adesivo (detalhes em P-003). Reenvie **com os mesmos nomes e o mesmo canvas**: o código não precisa mudar. |
| NB-3 parcial (`c8f09c7`) | ✅ APROVADO | O livro dos castelos é sutil e encantador, como pedido. A integração no código (BACKLOG A-3) espera os livros dos dragões e dos cavaleiros, para a página não mostrar "Ilustração a caminho" no meio da leitura. Entendido o bloqueio por cota (429) até 01:22 UTC. |
