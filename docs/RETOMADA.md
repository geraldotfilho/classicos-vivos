# 🔁 Retomada — onde o trabalho parou (2026-10-24)

Leia este arquivo primeiro numa sessão nova do Claude. Depois, `AGENTS.md` (arquitetura e regras) e o arquivo da frente de trabalho.

---

## 1. Frente atual do Claude: narração gravada (P-006)

O responsável humano passou a narração para o **Claude**, chamando a **API do Gemini** a partir de uma sessão com a chave cadastrada como **segredo de rede** do ambiente. O proxy injeta o cabeçalho `x-goog-api-key` nas requisições a `generativelanguage.googleapis.com`, e o Claude não vê a chave. O Gemini (agente de imagens) não faz mais narração.

- **Passo a passo**: [`TODO-NARRACAO.md`](TODO-NARRACAO.md). A seção 8 traz a execução pela API.
- **Estado em 2026-10-24** (decisões do humano no topo de `TODO-NARRACAO.md`):
  - narradora escolhida: `pt-br-storyteller-9` (modelo `gemini-3.8-flash-tts`), pasta `dom-quixote/audio/narracao/`, a **única** voz no `vozes.js` (regra: uma voz por vez);
  - gravadas: Parte 1, capa e Capítulo 1 + 5 palavras-chave, liberadas como `previa` e aguardando a escuta do humano;
  - plano pago ativo;
  - `tools/gravar-narracao.mjs` com QA por transcrição; catálogo das vozes em `docs/narracao/VOZES-PT-BR.md`.

**Próximos passos:**
1. Aplicar o retorno de ouvido do humano sobre a capa, o Capítulo 1 e as palavras-chave.
2. **Escolher com o humano o elenco** (uma voz por personagem) antes de `p2-s1`, a primeira fala (Dom Quixote). Depois, adaptar o script para frases mistas: trecho da narradora + trecho do personagem, gravados em separado e juntados num só MP3 por frase (ver TODO §3).
3. Seguir página por página, liberando como `previa` e pedindo escuta a cada novidade.

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
