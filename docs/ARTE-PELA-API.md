# 🖼️ Arte pela API do Gemini (Nano Banana 2, modo Batch)

Caminho de reserva para as ilustrações quando a cota do Antigravity acaba. **Só com autorização do humano no prompt inicial da sessão** (AGENTS.md §2.7) e só para o que ele autorizou. Primeiro uso: 2026-10-24, Parte 2, páginas 4 a 8 (10 cenas + 5 camadas), **US$ 0,57** no total.

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
- **Camadas sobre magenta puro (#FF00FF), nunca sobre branco.** O modelo não entrega transparência. Recortar fundo branco come as partes claras (o avental da pousada) e deixa "chão" claro (P-003/P-005). O magenta saiu uniforme e o `recortar-camada.py` tira o fundo, desmistura as bordas (sem halo rosa) e corta justo.
- **Poeira, fumaça e fiapos**: o modelo pinta fiapos rosados misturados ao magenta. Para desenhos sem rosa nenhum (poeira, madeira), use `--sem-rosa`.
- **Diga o que NÃO pintar quando há camada por cima**: "Do NOT paint the hammers… the space stays clear" funcionou (galpão vazio + camada de martelos). Áreas livres pedidas em % ("the upper right part… must be EMPTY") também.
- **A edição da `-real` mantém câmera e personagens**, mas pode mudar poses e acrescentar objetos. Repita no prompt o que não pode mudar ("Keep his pose EXACTLY: both arms raised…", "single oak-branch lance, do not add any other lance").
- **Monstros**: "never monstrous" não bastou (veio um gigante de olhos em brasa e rachaduras de lava). Descreva o rosto: "gentle bearded face, kind ordinary eyes, no glowing eyes, no frown", e mande um gigante já aprovado como referência.
- **Referências**: uma cena da mesma parte com Dom Quixote e Sancho de perto (`parte-2/p3-real`) segura rosto, roupa e traço; uma segunda dá a luz ou o cenário.
- **Sem texto legível**: "only golden swirls, absolutely no letters or words" funcionou no livro do sábio.

## 5. Estimativa para as próximas partes
Custo médio real: **~US$ 0,038 por imagem aceita** (já com as refeitas).
| Parte | Cenas | Camadas | Estimativa |
| :--- | :--- | :--- | :--- |
| 3 | 17 | 5 | ~US$ 0,85 |
| 4 | 16 | 5 | ~US$ 0,80 |
