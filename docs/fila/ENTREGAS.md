# 📦 Fila de Trabalho — ENTREGAS (escrito só pelo Gemini)

Registro das entregas de ilustração. Regras do canal em [`PEDIDOS.md`](PEDIDOS.md).

Uma linha por entrega (uma tarefa NB ou uma página das Partes 2–4), **acrescentada no mesmo commit** que entrega as imagens:

| Data (UTC) | Pedido | Tarefa | Arquivos entregues | Commit | Observações (posição de camada, dúvidas, pendências) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-23 20:26 | P-001 | NB-1 | `dom-quixote/imagens/p7-real-sem-pas.webp`, `dom-quixote/imagens/camadas/p7-pas-moinho.webp` | `f2971a0` | Fundo sem pás idêntico à base; camada de pás em cruz X isolada com canal alfa limpo e cubo centralizado no pixel 512,512. |
| 2026-10-23 20:35 | P-001 | NB-2 | `dom-quixote/imagens/p4-real-fundo.webp`, `dom-quixote/imagens/camadas/p4-pastor-parado.webp`, `dom-quixote/imagens/camadas/p4-pastor-tocando.webp`, `dom-quixote/imagens/camadas/p4-porquinhos.webp`, `dom-quixote/imagens/camadas/p4-notas-musicais.webp`, `dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.webp`, `dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.webp` | `5965b15` | Cenário de fundo limpo 16:9 e 6 camadas transparentes com canal alfa limpo e sombra de contato sob os pés. Mesma escala e apoio entre as poses do pastor e do estalajadeiro. |
| 2026-10-23 20:38 | P-001 | NB-3 (parcial) | `dom-quixote/imagens/p1-real-livro-castelos.webp` | `c8f09c7` | Livro dos Castelos (capa azul, silhueta do castelo) entregue. Dragões e Cavaleiros aguardam reset da cota do modelo Nano-Banana (429 RESOURCE_EXHAUSTED no gemini-3.1-flash-image, reseta em 2026-10-24 01:22:03 UTC / ~4h40m). |
| 2026-10-23 21:28 | P-003 | NB-2 (ajuste) | `dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.webp`, `dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.webp`, `dom-quixote/imagens/camadas/p4-porquinhos.webp`, `dom-quixote/imagens/camadas/p4-pastor-parado.webp`, `dom-quixote/imagens/camadas/p4-pastor-tocando.webp`, `dom-quixote/imagens/camadas/p4-notas-musicais.webp` | `d479365` | Ajustes atendidos mantendo o mesmo canvas: avental 100% opaco, sombras escuras suaves sem mancha branca; pastor sem tapete de grama com sombra suave; notas sem halo branco com brilho dourado. Testado contra magenta. |
| 2026-10-23 21:30 | P-004 | limpeza | removidos: `p4-real.webp`, `p4-real-flauta.webp`, `p4-real-sopa.webp`, `p7-real.webp`, `moinho-pas.svg` | `dfc0b2d` | Arquivos descontinuados após migração para camadas removidos com sucesso. CATALOGO.md atualizado; sw.js regenerado (versão fcc6031a9e15, 66 arquivos). |

## Status atual
Ciente da diretriz prioritária: P-005 adiado pelo responsável humano para após P-001 e P-002. Foco total em completar as ilustrações dos quatro livros: aguardando reset da cota de imagem às 01:22 UTC para retomar imediatamente NB-3 (dragões e cavaleiros) e prosseguir para NB-4…NB-8 e P-002. Monitoramento contínuo ativo a cada 10 minutos.
