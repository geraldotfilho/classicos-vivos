# 🖼️ Arte pela API do Gemini (Nano Banana 2, modo Batch)

> Regras gerais de ilustração (valem para qualquer obra e qualquer agente): receita geral, `docs/RECEITA-CLASSICO-VIVO.md` §6.3. As regras da Imaginação de Dom Quixote (§4.1 abaixo) estão resumidas em `docs/receitas/DOM-QUIXOTE.md` §3.

Caminho de reserva para as ilustrações quando a cota do Antigravity acaba. **Só com autorização do humano no prompt inicial da sessão** (AGENTS.md §2.7) e só para o que ele autorizou. Primeiro uso: 2026-10-24, Parte 2, páginas 4 a 8 (10 cenas + 5 camadas), **US$ 0,57**. Na mesma tarde, a pedido do humano, as **9 Imaginações da Parte 2 foram refeitas** com a bíblia da Imaginação (§4.1): **US$ 0,42**. Total da Parte 2: **US$ 0,99**. À noite, com autorização do humano, as **Partes 3 e 4 inteiras** (33 cenas + 10 camadas): **US$ 1,60** (§5). **Dom Quixote está todo ilustrado.**

## 1. Modelo e preço (página de preços do Gemini, 2026-10-24)
| Modelo | ID | Imagem 1K Standard | **Batch** | 512 px Batch |
| :--- | :--- | :--- | :--- | :--- |
| **Nano Banana 2** (o do Antigravity, o usado) | `gemini-3.1-flash-image` | US$ 0,067 | **US$ 0,034** | US$ 0,022 |
| Nano Banana 2.1 (mais novo) | `gemini-nano-banana-2.1` | US$ 0,034 | US$ 0,017 | — |
| Nano Banana Pro | `gemini-3-pro-image` | US$ 0,134 | US$ 0,067 | — |

- **Batch = metade do preço**, e na prática cada lote voltou em **2 a 4 minutos** (a meta oficial é 24 h). O Flex não existe para o Nano Banana 2. Use Standard (`--standard`) só se o Batch travar.
- O 16:9 em 1K sai exatamente em **1376 × 768**, o tamanho do livro. Não peça 2K.
- As imagens de referência quase não custam (~300 tokens cada, a US$ 0,25/milhão no Batch): mande 1 ou 2 por pedido sem medo. O raciocínio do modelo (~400 tokens por imagem) também é desprezível.
- O Nano Banana 2.1 custaria a metade, mas **mudaria o traço** em relação às cenas já feitas no Antigravity. Só trocar com a aprovação do humano, de preferência no começo de um livro novo.

## 2. Como rodar
```bash
npm run gerar:imagens -- --lista tools/arte/dom-quixote-parte-2.mjs --seco                 # pedidos e custo, sem chamar a API
npm run gerar:imagens -- --lista tools/arte/dom-quixote-parte-2.mjs --ids p4-real,p5-real --autorizado
npm run gerar:imagens -- --lista ... --lote batches/<id>                                   # retoma um lote enviado
python3 tools/recortar-camada.py .cache-arte/<id>/<data>.png dom-quixote/imagens/parte-2/camadas/<id>.png [--sem-rosa]
npm run build:images && npm run build
```
- A lista (`tools/arte/<livro>-parte-N.mjs`) tem o estilo-mestre, as fichas dos personagens (`[QUIXOTE]`, `[SANCHO]`…, inseridas só quando o prompt as cita) e os pedidos (`id`, `destino`, `refs`, `proporcao`, `tamanho`, `camada`, `prompt`).
- As imagens recebidas ficam em `.cache-arte/<id>/` (fora do Git). O Claude olha cada uma e copia a escolhida para o `destino`. O gasto vai para `docs/arte/gastos.csv`.

## 3. Fluxo em rodadas (o que funcionou)
1. **Rodada 1**: todas as cenas `-real` + as camadas que não dependem de cena (no exemplo, o balão e a cabra), num lote só.
2. Olhar, aceitar, converter (`.webp`), **medir as posições reais** (personagens, áreas livres) na arte entregue.
3. **Rodada 2**: as `-imag` como **edição** da `-real` aceita (a `-real` é a 1ª referência; "keep the camera… exactly") + as camadas que usam a cena como referência.
4. **Rodada 3**: só o que falhou, com o prompt corrigido. Foram 2 refeitas em 15 (13%).
5. Posicionar as camadas no `parte-N.html` **pela arte**, e não pelo plano: o modelo segue a composição pedida só aproximadamente (a poeira, o balão e as cabras mudaram de lugar em relação ao TODO).

## 4. Lições aprendidas

### 4.1 A Lente da Imaginação precisa TRANSFORMAR (a lição mais importante)
- ❌ **Errado** (primeira rodada): "Edit the reference image keeping everything exactly, only change X". O modelo obedece demais: Dom Quixote continua de armadura enferrujada e bacia de latão, Rocinante continua marrom, e só um detalhe muda. O humano reprovou: "mantiveram os elementos da realidade, sem verdadeiramente transformar a cena e os personagens".
- ✅ **Certo**: a lista tem uma **bíblia da Imaginação** (`imaginacao` em `tools/arte/<livro>-parte-N.mjs`), que entra em todo pedido com `imaginacao: true`:
  1. "Da Realidade, mantenha **só** a câmera, o layout e o lugar, o tamanho e a pose de cada personagem. **Transforme todo o resto.**"
  2. As transformações obrigatórias dos personagens fixos: Dom Quixote → **cavaleiro dourado** (armadura de ouro com filigrana, elmo de viseira aberta e pluma vermelha, capa carmim, lança de ouro com flâmula, o mesmo rosto); Rocinante → **corcel branco** (crina prateada, manta carmim e ouro); Sancho → **escudeiro orgulhoso**, reconhecível (túnica azul-celeste com ouro, escudinho nas costas), e o burrico com manta de festa.
  3. O que **não pode sobrar** ("NO rusty armour, NO brass basin, NO skinny brown horse").
  4. O mundo vira conto de fadas (ouro, violeta, rosa, turquesa, brilhos), e cada página diz **as suas** transformações, tiradas do texto de Cervantes (o barbeiro → cavaleiro em fuga, e o burrinho dele → corcel malhado; as cordas de Rocinante → fitas encantadas; os cabreiros → pastores da Idade de Ouro).
- **Referências da Imaginação**, nesta ordem: (1) a `-real` da página (layout); (2) uma Imaginação aprovada com o cavaleiro dourado e Sancho (`imagens/p7-imag.webp`, da Parte 1); (3) uma ficha do banco (`biblioteca/referencias/personagens/don-quixote-cavaleiro-dourado.png`, `dom-quixote-heroi-dourado.png`, `rocinante-corcel-branco.png`); (4) a Imaginação anterior da página, quando tinha elementos bons (gigante, mago, sábio, exércitos), citada no prompt como "like the last reference image". Não use `gigantes-moinhos.png` (estilo cartoon vetado, AGENTS §4.4).
- **Escala e lugar**: o corcel branco com manta tende a sair **maior** e a ir para o centro. Quando o lugar importa (troca de lente sem "pulo"), diga o tamanho em relação à Realidade ("no taller than half the picture height, exactly the size of the brown horse in the reality version, standing still") e troque a ficha do cavaleiro grande por uma cena com cavaleiros pequenos.
- **Objetos nas mãos**: "gripping its rim firmly with BOTH hands (his hands touch the helmet; it does not float)". Sem isso, o objeto mágico flutua.
- **Animais a mais**: o modelo acrescenta o burrico de Sancho em toda cena. Quando ele não está na página, diga "it is the ONLY animal on the road".

### 4.2 Camadas e demais lições
- **Camadas sobre magenta puro (#FF00FF), nunca sobre branco.** O modelo não entrega transparência. Recortar fundo branco come as partes claras (o avental da pousada) e deixa "chão" claro (P-003/P-005). O magenta saiu uniforme e o `recortar-camada.py` tira o fundo, desmistura as bordas (sem halo rosa) e corta justo.
- **Poeira, fumaça e fiapos**: o modelo pinta fiapos rosados misturados ao magenta. Para desenhos sem rosa nenhum (poeira, madeira), use `--sem-rosa`.
- **Diga o que NÃO pintar quando há camada por cima**: "Do NOT paint the hammers… the space stays clear" funcionou (galpão vazio + camada de martelos). Áreas livres pedidas em % ("the upper right part… must be EMPTY") também.
- **A edição da `-real` mantém câmera e personagens**, mas pode mudar poses e acrescentar objetos. Repita no prompt o que não pode mudar ("Keep his pose EXACTLY: both arms raised…", "single oak-branch lance, do not add any other lance").
- **Monstros**: "never monstrous" não bastou (veio um gigante de olhos em brasa e rachaduras de lava). Descreva o rosto: "gentle bearded face, kind ordinary eyes, no glowing eyes, no frown", e mande um gigante já aprovado como referência.
- **Referências**: uma cena da mesma parte com Dom Quixote e Sancho de perto (`parte-2/p3-real`) segura rosto, roupa e traço; uma segunda dá a luz ou o cenário.
- **Sem texto legível**: "only golden swirls, absolutely no letters or words" funcionou no livro do sábio.

- **Contorno branco de "adesivo"**: às vezes o modelo pinta um contorno branco em volta da camada (o Clavilenho veio assim duas vezes, mesmo com "NO white outline" no pedido). Não pague outra geração: `recortar-camada.py --sem-contorno` descasca, a partir do fundo, os pixels claros (pela cor já desmisturada do magenta) até o traço de lápis do desenho.
- **Objeto que pendura**: em vez de depender de ganchos pintados no cenário (o modelo os pôs num cabideiro fora do lugar), a camada traz **o próprio gancho** no alto (`p6-odre` da Parte 3) e pendura em qualquer ponto da parede.
- **Teste das interações**: o motor usa *pointer events*; no Playwright, clique com `locator.click()` (um `element.click()` dentro de `evaluate` não aciona os cartões).

## 5. Partes 3 e 4 (2026-10-24, noite): o que mudou no método
- **Módulo comum** `tools/arte/dom-quixote-comum.mjs`: estilo, fichas de todos os personagens (Realidade) e a bíblia da Imaginação, importados por `dom-quixote-parte-3.mjs` e `-parte-4.mjs`. O cache fica separado por lista (`.cache-arte/<lista>/<id>/`), porque os ids (`p0-real`...) se repetem entre as partes.
- **A bíblia ganhou uma regra**: "só aparecem os personagens e animais que estão na Realidade". Sem ela, o modelo punha o burrico de Sancho dentro do salão do castelo e o cavaleiro dourado em cenas em que ele não estava.
- **Exceções por página** ("EXCEPTION for this page: ..."): nas páginas do governo, Sancho é o governador sábio (não o escudeiro); na liberdade, ele é ele mesmo e o cenário muda inteiro; no final, Alonso continua o velho contador de histórias, e a imaginação é a das crianças.
- **Personagens novos em cadeia**: o padre e o barbeiro nascem na P3 p4 e servem de referência para a P3 p5 e p7 e para a P4 p1; Doroteia nasce na P3 p5. Isso define as rodadas: (1) Realidades sem dependência + camadas soltas; (2) Realidades com personagens já criados, Imaginações e camadas da cena; (3) refeitas; (4) o que depende da rodada 3.
- **Resultado**: 47 imagens geradas, 43 aceitas (4 refeitas: 3 Imaginações que acrescentavam personagens ou não mudavam o cenário e o Clavilenho), **US$ 1,60** para as duas partes (~US$ 0,037 por imagem aceita). Cada lote voltou em 2 a 4 minutos.

## 6. Custo de referência para um livro novo
Custo médio real: **~US$ 0,037 por imagem aceita** (já com as refeitas). Um livro de 4 partes como Dom Quixote (~85 imagens entre cenas e camadas) sai por cerca de **US$ 3,20**.
