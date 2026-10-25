# 🔁 Retomada — onde o trabalho parou (2026-10-24, manhã)

Leia este arquivo primeiro numa sessão nova do Claude. Depois, `AGENTS.md` (arquitetura e regras) e o arquivo da frente de trabalho.

> 💰 **API paga do Gemini (AGENTS.md §2.7)**: use **só para produzir as vozes da leitura**, **sempre de forma econômica** e **só se o humano autorizou no prompt inicial desta sessão**. Sem essa autorização, não chame a API para nada (nem teste). Limite: R$ 30/mês (desde 2026-10-24). Opções mais baratas em `TODO-NARRACAO.md` §8.4 (o Flex corta o preço pela metade, mas falta a aprovação do humano). **Imagens** pela API: só com autorização pontual do humano (`docs/ARTE-PELA-API.md`).

---

## 0. Atualização de 2026-10-25: texto mais simples nas Partes 2–4
- A pedido do humano (leu a Parte 2 com o filho de 6 anos), o Claude reescreveu as Partes 2, 3 e 4 em linguagem mais simples (regra em AGENTS.md §3.5), e agentes refizeram as traduções en/fr/es no mesmo tom.
- Com autorização do humano, a narração em português das Partes 2–4 foi **regravada no texto novo** (US$ 0,24). As narrações en/fr/es das Partes 2–4 ainda não existem (só a Parte 1).

## Atualização de 2026-10-24, noite: Dom Quixote todo ilustrado
- Com autorização do humano, o Claude gerou pela API **as Partes 3 e 4 inteiras** (33 cenas + 10 camadas, US$ 1,60), com a bíblia da Imaginação desde o início. Método e lições: `ARTE-PELA-API.md` §5. **Não falta nenhuma ilustração em Dom Quixote.**
- Gasto da API no mês (2026-10-24): imagens US$ 2,59 + narração ~US$ 0,79 ≈ **US$ 3,38** (teto R$ 30).
- **Gemini (Antigravity)**: P-002 está concluído. Ao voltar da cota (29/10), o que resta para ele é P-005 (acabamento da pousada, Parte 1), que pode ser reaberto, e os próximos livros.
- Pendências de arte (sem urgência): BACKLOG M-13.

## Atualização anterior (2026-10-24, tarde): arte da Parte 2 pela API
- Com a cota do Antigravity esgotada até 29/10, o humano autorizou o Claude a gerar **só as imagens que faltavam da Parte 2**. Feito com `npm run gerar:imagens` (Nano Banana 2, Batch): páginas 4 a 8 (10 cenas + 5 camadas), integradas e testadas. **Gasto: US$ 0,57** (`docs/arte/gastos.csv`). **A Parte 2 está completa.**
- **Imaginações da Parte 2 refeitas** (as 9, pedido do humano): agora transformam de verdade (cavaleiro dourado, corcel branco, Sancho escudeiro). Mais US$ 0,42. Regra para as próximas partes: `ARTE-PELA-API.md` §4.1.
- **Teto da API: R$ 30/mês** (o humano aumentou em 2026-10-24). Gasto no mês até aqui: narração ~US$ 0,65 + imagens US$ 0,99 ≈ **US$ 1,64**.
- (Feito à noite: Partes 3 e 4, ver acima.) Partes 3 (~US$ 0,85) e 4 (~US$ 0,80), já com a bíblia da Imaginação, com o mesmo método: escrever `tools/arte/dom-quixote-parte-N.mjs` a partir do TODO, rodar `--seco`, e seguir as rodadas de `docs/ARTE-PELA-API.md` §3. Sem autorização, o Gemini retoma a Parte 3 no Antigravity em 29/10.

## 1. Frente atual do Claude: narração gravada (P-006)

O responsável humano passou a narração para o **Claude**, chamando a **API do Gemini** a partir de uma sessão com a chave cadastrada como **segredo de rede** do ambiente. O proxy injeta o cabeçalho `x-goog-api-key` nas requisições a `generativelanguage.googleapis.com`, e o Claude não vê a chave. O Gemini (agente de imagens) não faz mais narração.

- **Passo a passo**: [`TODO-NARRACAO.md`](TODO-NARRACAO.md). A seção 8 traz a execução pela API.
- **Estado em 2026-10-24, manhã** (decisões do humano no topo de `TODO-NARRACAO.md`, leia antes de gravar):
  - **as quatro partes de Dom Quixote estão gravadas** (`partes: [1, 2, 3, 4]`): páginas inteiras com títulos, narradora + vozes dos personagens (elenco em `ELENCO`) e todas as palavras-chave. QA em `docs/narracao/qa-parte-N.md`, com o que vale ouvir;
  - textos das Partes 2–4 revisados pelo agente de texto do humano e pelo Claude (falas diretas, português brasileiro); roteiros em `narracao/parte-N/roteiro.json`;
  - Flex é o padrão; limite de **100 pedidos/dia** (Tier 1) e de **R$ 30/mês**; o gasto fica em `docs/narracao/gastos.csv`;
  - a conferência é local (Whisper): num contêiner novo, `pip install faster-whisper`.

**Próximos passos:**
1. Retorno de ouvido do humano: vozes novas (pastor, barbeiro, padre, Doroteia, estalajadeiro, Teresa, Sanchica, os velhos do tribunal) e os pontos de cada `qa-parte-N.md`.
2. Se o texto de uma frase mudar: `npm run exportar:frases` e regrave só a página (o `hash` mostra qual); avulsas com `--ids` + emenda (TODO §8.5).
3. Opcional (BACKLOG M-10): regravar inteiras as páginas 1 e 2 da Parte 1.
4. Novos livros: mesmo fluxo (texto → roteiro → elenco → `--pagina-inteira` → palavras em grupo), sempre com autorização do humano (AGENTS.md §2.7).

## 2. Ciclo com o Gemini (arte): revisão **pausada**

- O agendamento de revisão de hora em hora ("Revisar entregas do Gemini") foi **desativado** a pedido do humano. Ele disparava na sessão antiga.
- O Gemini continua trabalhando sozinho. Ao abrir uma sessão nova, ou quando o humano pedir, revise as entregas:
  1. `git fetch origin main`;
  2. compare `docs/fila/ENTREGAS.md` com a última revisão registrada em `docs/fila/PEDIDOS.md`;
  3. olhe as imagens;
  4. abra as páginas no Chromium headless (800×1280 e 1280×800, nas duas lentes) e confira posição e **escala** das camadas;
  5. registre o veredito em `PEDIDOS.md`.
- **Regra de prioridade do humano**: primeiro **terminar a arte dos quatro livros** (P-001 e P-002). Acabamentos de sombra, borda e halo ficam adiados (P-005 `⏸️ ADIADO`). Só peça ajuste imediato quando a entrega impedir o uso: nome ou pasta errados, conteúdo que contradiz o texto, personagem irreconhecível, texto legível na imagem, colagem achatada ou camada inutilizável.
- **Último estado conhecido do Gemini**:
  - esperava o reset da cota do Nano-Banana (2026-10-24, 01:22 UTC);
  - a próxima tarefa era NB-3, os livros dos dragões e dos cavaleiros;
  - depois vêm NB-4 a NB-8 e P-002 (arte das Partes 2–4).
- **Integrações de código que a arte destrava**:
  - **A-3** (BACKLOG): quando existirem os três `p1-real-livro-*.webp`, cada livro da página 2 da Parte 1 troca a cena via `setSceneImage`, em qualquer ordem;
  - **camadas das Partes 2–4**: ajustar `x/y/w` em `parte-N.html` conforme a arte chegar.
- **Feedback do humano sobre escala**: ele achou pequenas as primeiras camadas da pousada. Ao integrar, prefira personagens com tamanho proporcional à perspectiva da cena.

## 3. Como entregar

Use a branch designada pela sessão (a última foi `claude/optimistic-hamilton-xyoicy`). Se ela já foi mesclada, recrie-a a partir de `origin/main`. Antes de entregar:
- rode `npm run build`;
- teste no Chromium headless (Playwright já instalado; sirva com `python3 -m http.server`).

Depois abra o PR e faça o merge na `main` pelas ferramentas do GitHub (MCP). O humano autoriza o merge direto. Nunca edite arquivos cujo dono é o Gemini (tabela em `docs/fila/PEDIDOS.md`).
