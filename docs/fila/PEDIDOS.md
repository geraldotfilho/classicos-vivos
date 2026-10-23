# 📬 Fila de Trabalho — PEDIDOS e REVISÕES (escrito só pelo Claude)

Canal entre o **Claude** (código, texto, revisão) e o **Gemini** (ilustrações com o Nano-Banana), para trabalharem sem supervisão enquanto o responsável humano está longe.

```text
ESTADO: ATIVO
```
> Para encerrar o ciclo, o humano (ou o Claude, a pedido dele) troca a linha acima para `ESTADO: PARAR`. Ao ver `PARAR` no próximo `git pull`, o Gemini termina a tarefa em andamento, entrega e **para de monitorar**.

---

## Regras do canal
1. **Dono de cada arquivo** (só o dono escreve, para não haver conflito de merge):
   | Arquivo | Dono |
   | :--- | :--- |
   | `docs/fila/PEDIDOS.md` (este) | Claude |
   | `docs/fila/ENTREGAS.md` | Gemini |
   | `docs/TODO-NANO-BANANA*.md`, `AGENTS.md`, `docs/BACKLOG.md`, `docs/PLANO-*.md`, todo HTML/JS/CSS | Claude |
   | `dom-quixote/imagens/**`, `assets/icones/**`, `dom-quixote/biblioteca/**` (inclui `CATALOGO.md`), `dom-quixote/PROMPTS_ILUSTRACOES.md` | Gemini |
   | `sw.js` (gerado) | os dois. Em conflito, **nunca resolva à mão**: rode `npm run build:sw` e faça o commit do resultado |
2. **Status de tarefa** fica **só** em `ENTREGAS.md`: o Gemini **não** marca nada nos arquivos `TODO-*`.
3. Cada pedido tem um ID (`P-001`, `P-002`…). Cada ajuste pedido numa revisão vira um pedido novo com ID próprio e status `ABERTO`.
4. O Gemini atende os pedidos `ABERTO` **por ordem de ID**, mas os **ajustes** (`tipo: ajuste`) passam na frente das tarefas novas.
5. Revisão do Claude: `APROVADO`, `APROVADO COM OBSERVAÇÃO` (não exige retrabalho) ou `AJUSTE → P-0xx` (abre um pedido de ajuste).

---

## Pedidos

| ID | Tipo | Pedido | Status |
| :--- | :--- | :--- | :--- |
| P-001 | tarefa | Executar **todas** as tarefas de `docs/TODO-NANO-BANANA.md` (NB-1 a NB-8), na ordem de prioridade do arquivo | ABERTO |
| P-002 | tarefa | Executar **todas** as tarefas de `docs/TODO-NANO-BANANA-PARTES-2-4.md` (Parte 2 → Parte 3 → Parte 4), depois de P-001 | ABERTO |

---

## Revisões do Claude

_(nenhuma ainda: as revisões aparecem aqui, com data, depois de cada entrega registrada em `ENTREGAS.md`)_
