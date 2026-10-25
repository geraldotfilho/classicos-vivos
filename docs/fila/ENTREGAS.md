# 📦 Fila de Trabalho — ENTREGAS (escrito só pelo Gemini)

> 🛑 **Fila encerrada em 2026-10-25.** Fica como registro das entregas do Gemini. Ver o aviso no topo de `PEDIDOS.md`.

Canal entre o **Claude** e o **Gemini**. O Gemini registra aqui cada entrega que fizer, com o commit correspondente, para o Claude saber o que revisar.

---

## Entregas realizadas

Uma linha por entrega (uma tarefa NB ou uma página das Partes 2–4), **acrescentada ao final**:

| Data (UTC) | Pedido | Tarefa | Arquivos entregues | Commit | Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-23 20:30 | P-001 | NB-1 | `dom-quixote/imagens/p7-real-sem-pas.webp`, `dom-quixote/imagens/camadas/p7-pas-moinho.webp` | `f2971a0` | Cena sem as pás desenhadas; camada com 4 pás em cruz sobre fundo transparente, cubo cinza escuro centralizado em 100x100. Posição no livro: x 73.5%, y 26.7%, w 26.5%. |
| 2026-10-23 20:37 | P-001 | NB-2 | `dom-quixote/imagens/p4-real-fundo.webp`, `dom-quixote/imagens/camadas/p4-*.webp` (6 camadas) | `5965b15` | Fundo limpo sem personagens; sprites isolados com canal alfa para pastor (parado e tocando flauta), porquinhos, notas musicais douradas e estalajadeiro (acenando e com sopa). |
| 2026-10-23 21:28 | P-003 | Pousada camadas (ajuste) | `dom-quixote/imagens/camadas/p4-*.webp` (6 camadas regeradas) | `d479365` | Avental do estalajadeiro 100% opaco; notas musicais sem halo branco; sombras escuras suaves translúcidas adicionadas. |
| 2026-10-23 21:30 | P-004 | Limpeza de arquivos obsoletos | Remoção de 4 WebP antigos e 1 SVG não mais utilizados | `dfc0b2d` | Limpeza completa de arquivos legados da pousada e do moinho após introdução das camadas dinâmicas. CATALOGO.md e sw.js atualizados. |
| 2026-10-23 21:38 | P-001 | NB-3 (parcial) | `dom-quixote/imagens/p1-real-livro-castelos.webp` | `c8f09c7` | Livro dos castelos entregue; as outras 2 variantes aguardam término de cota do modelo (429 RESOURCE_EXHAUSTED). |
| 2026-10-24 01:25 | P-001 | NB-3 | `dom-quixote/imagens/p1-real-livro-dragoes.webp`, `dom-quixote/imagens/p1-real-livro-cavaleiros.webp` | `56622ef` | Três variantes do livro de Dom Quixote concluídas. Mantém exatamente a mesma sala, poltrona e gato de p1-real.webp, mudando apenas a capa e ilustração do livro aberto. |
| 2026-10-24 01:27 | P-001 | NB-4 | `dom-quixote/imagens/p2-imag.webp`, `dom-quixote/imagens/p2-real-stage-1.webp` | `c167bb5` | p2-imag: herói dourado alinhado na mesma escala, posição e pose exatas de stage-4, sem saltos ao alternar lentes. p2-real-stage-1: bacia removida, revelando o cabelo branco volumoso e traços idênticos a stage-0. |
| 2026-10-24 01:30 | P-001 | NB-5 | `dom-quixote/imagens/p3-real.webp`, `dom-quixote/imagens/p3-real-stage-3.webp` | `24d23fa` | p3-real: enquadramento do estábulo perfeitamente alinhado a stage-1, com cocho vazio e Rocinante faminto no estado inicial. p3-real-stage-3: crina e rabo escovados e sedosos com brilho, escova de cavalo sobre o cocho e Aldonza aplaudindo encantada. |
| 2026-10-24 01:33 | P-001 | NB-6 | `dom-quixote/imagens/p6-imag.webp`, `dom-quixote/imagens/camadas/p6-nuvem-ilha.webp` | `f3d1860` | p6-imag: cena 16:9 gerada de verdade mantendo estrada e posições de p6-real, com Dom Quixote dourado e Sancho governador em seu burrico, céu livre. Camada p6-nuvem-ilha: sprite com alfa limpo da nuvem de sonho da ilha. Elimina a colagem achatada da capa antiga. |
| 2026-10-24 01:35 | P-001 | NB-7 | `assets/icones/icone-1024.png`, `icone-512.png`, `icone-192.png`, `icone-180.png` | `9a05c96` | Ícone oficial do aplicativo em 1024x1024 (quadrado, sem transparência) com Alonso Quixano sorrindo com a bacia e livro aberto brilhante sobre círculo pergaminho quente. Redimensionamentos gerados para o PWA/tablet. |
| 2026-10-24 01:35 | P-001 | NB-8 | `dom-quixote/biblioteca/referencias/personagens/leao-guardiao.png` | `9a05c96` | Leão Guardião em aquarela com canal alfa limpo, deitado serenamente com coroa dourada, substituindo o leao-guardiao.svg vetorial no banco de referências. |
| 2026-10-24 01:38 | P-002 | Parte 2 - Capa (P2-0) | `dom-quixote/imagens/parte-2/p0-real.webp`, `dom-quixote/imagens/parte-2/p0-imag.webp` | `3c5b9ed` | Capa da Parte 2 entregue completa: p0-real (Quixote com lança de carvalho e bacia amassada e Sancho no burrico na estrada ao pôr do sol, poeira de ovelhas ao longe); p0-imag (bacia vira elmo de ouro radiante e poeira vira dois exércitos de cavaleiros com estandartes coloridos). |
| 2026-10-24 06:25 | P-007 | Parte 2 - Pág 1 (P2-1) | `dom-quixote/imagens/parte-2/p1-real.webp`, `dom-quixote/imagens/parte-2/p1-imag.webp` | `fc31227` | Página 1 nova completa: p1-real (tombo cômico nos moinhos, Quixote e Rocinante na relva com pernas para o ar, lança partida e Sancho aflito no burrico); p1-imag (moinho transformado em gigante de pedra viva e musgo, e mago Frestón soprando vendaval no céu). Aprovado pelo Claude. |
| 2026-10-24 06:25 | P-007 | Parte 2 - Pág 2 (P2-2) | `dom-quixote/imagens/parte-2/p2-imag.webp` | `fc31227` | Página 2 (a lança de carvalho) concluída: p2-imag (carvalho com folhas douradas resplandecentes, lança encantada com flâmula vermelha, constelação de Dulcineia sorrindo serenamente entre as estrelas e Sancho com estrelinhas de sonho). Aprovado pelo Claude. |
| 2026-10-24 06:25 | P-007 | Parte 2 - Pág 3 (P2-3) | `dom-quixote/imagens/parte-2/p3-imag.webp`, `dom-quixote/imagens/parte-2/camadas/p3-bolotas.webp`, `p3-queijo.webp`, `p3-leite.webp` | `fc31227` | Página 3 (os pastores) concluída: p3-imag (A Idade de Ouro no prado florido, riacho e mesa farta); 3 camadas com canal alfa limpo e sombra de contato suave marrom-acinzentada (bolotas, queijo de cabra cortado, jarra de leite) testadas para a pele de ovelha. Aprovado pelo Claude e integrado no código. |

## Status atual
P-001 concluído. P-007 concluído (Parte 2 renumerada). Parte 2: Páginas 0 (Capa), 1 (Tombo nos moinhos), 2 (Lança de carvalho) e 3 (Pastores e Idade de Ouro) 100% concluídas com todas as cenas e camadas aprovadas pelo Claude.
Às 11:10 UTC (08:10 BRT), nova tentativa de geração para a Página 4 (P2-4) encontrou esgotamento da capacidade semanal do modelo gemini-3.1-flash-image (429 RESOURCE_EXHAUSTED: quotaResetTimeStamp `2026-10-29T22:05:39Z` / ~130h55m).
Por determinação do responsável humano (2026-10-24), a narração segue com outro agente (Claude), e o Gemini fica dedicado exclusivamente à produção visual, acordando no horário previsto de renovação da cota de imagens (29/10 às 22:05 UTC / 19:05 BRT) para retomar a produção de ilustrações a partir de P2-4. P-005 segue adiado até a conclusão da arte dos 4 livros.
