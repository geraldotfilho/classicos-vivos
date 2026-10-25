# 🔁 Retomada — onde o trabalho parou (2026-10-25, noite)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote**:
  - Partes 1, 2 e 3 **publicadas e aprovadas** pelo humano, que leu a série com o filho de 6 anos: ilustradas, narradas em português e traduzidas (en, fr, es). Narração nos outros idiomas só na Parte 1.
  - **Parte 4 reprovada** (apressada, mal encadeada: resumia 81 capítulos de Cervantes em 7 páginas). Continua no ar até a nova ser publicada.
  - **Correção de rumo** em andamento: a nova Parte 4 fecha o volume de 1605, e as Partes 5–7 contam o de 1615. Plano: [`PLANO-DOM-QUIXOTE-PARTES-4-7.md`](PLANO-DOM-QUIXOTE-PARTES-4-7.md) (quadro de andamento no §7).
- **Processo**: [`RECEITA-CLASSICO-VIVO.md`](RECEITA-CLASSICO-VIVO.md) é a **receita geral** (qualquer obra, qualquer tipo de adaptação). O que vale só para Dom Quixote (a condensação de uma obra enorme e as lentes) está em [`receitas/DOM-QUIXOTE.md`](receitas/DOM-QUIXOTE.md).
- **Estante** (feito em 2026-10-25): na prateleira de baixo, as Partes 5–7 aparecem como capas-teaser com cadeado e um aviso ao tocar. Os cadeados de "próximos clássicos" saíram. As obras em produção ficam em `assets/js/acervo.js`. O humano abre os rascunhos em `sobre.html` → Livros em produção → "Mostrar os rascunhos".
- **Motor**: modo rascunho pronto (`rascunho: true`, `AGENTS.md` §2.5).
- **Gasto da API em outubro** (até 2026-10-25): arte US$ 2,59 + narração US$ 1,04 ≈ **US$ 3,64** (≈ R$ 20). Antes de usar a API, some os dois `gastos.csv` do mês.

## 2. Próxima sessão (A): terminar a fase 0 e fazer as fases 1 e 2 da nova Parte 4, sem API paga

1. **Fase 0 (o que falta)**: arquivar a arte da Parte 4 atual em `dom-quixote/imagens/acervo/parte-4-v1/` sem quebrar o livro publicado; criar `dom-quixote/parte-4-rascunho.html` (`rascunho: true`) e passar a entrada `dom-quixote-parte-4-nova` do `acervo.js` para `situacao: 'rascunho'` (plano §6).
2. **Fase 1**: criar o caderno `docs/cadernos/dom-quixote-parte-4.md`; **ler antes o texto final das Partes 1 a 3, com atenção ao fim da Parte 3** (receita geral, fase 1.0; `receitas/DOM-QUIXOTE.md` §1.4); **mostrar a escaleta ao humano antes de escrever o texto**; escrever o texto no rascunho.
3. **Fase 2**: plano de atividades e lentes no caderno.
4. Parar na 🛑 da fase 3: o humano lê o rascunho no tablet com o filho.

Prompt de abertura sugerido (plano §8):
> Leia AGENTS.md e docs/RETOMADA.md e siga docs/PLANO-DOM-QUIXOTE-PARTES-4-7.md, docs/RECEITA-CLASSICO-VIVO.md e docs/receitas/DOM-QUIXOTE.md. Termine a fase 0 e faça as fases 1 e 2 da Parte 4. Leia antes o texto final das Partes 1 a 3, com atenção ao fim da Parte 3. Mostre-me a escaleta antes de escrever o texto. Sem API paga nesta sessão.

## 3. Frentes paradas (sem urgência)

- **Fila de arte Claude ↔ Gemini (`docs/fila/`)**: **encerrada** em 2026-10-25. Todas as tarefas foram concluídas (a maior parte pela API); o único pedido que sobrava, o acabamento das camadas da pousada da Parte 1, virou o item M-14 do backlog. Hoje qualquer agente pode receber qualquer tarefa, inclusive a arte (`AGENTS.md` §0.3).
- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).

## 4. Notas do ambiente (contêineres de agentes)

- **Chave da API do Gemini** (ambiente do Claude): segredo de rede do ambiente; o proxy injeta o cabeçalho `x-goog-api-key` nas requisições a `generativelanguage.googleapis.com`. O agente nunca vê, imprime ou versiona a chave.
- **Whisper local** (conferência da narração): num contêiner novo, `pip install faster-whisper`.
- **Testes**: o Chromium e o Playwright já vêm instalados no contêiner; sirva a raiz com `python3 -m http.server` e abra as páginas nos dois tamanhos de tablet (`AGENTS.md` §5).
- No **Antigravity** (Gemini), a arte pode ser gerada direto, na cota do plano Pro; a API só com autorização expressa do humano e a chave fornecida por ele.

## 5. Como entregar

Trabalhe na branch definida pela sessão (se ela já foi mesclada, recomece-a da `main`). Ao terminar, **outro agente pode ter entregado algo em paralelo**: mescle a `main` do remoto na sua branch (`git fetch origin main && git merge origin/main`), resolva os conflitos preservando o trabalho dos dois lados (arquivos gerados, como o `sw.js`, se regeneram com `npm run build`), rode o build e os testes e só então entregue na `main`. Se um conflito não tiver solução que não destrua o trabalho de alguém, pergunte ao humano. Atualize este arquivo dizendo qual é a próxima sessão. Detalhes: `AGENTS.md` §6.
