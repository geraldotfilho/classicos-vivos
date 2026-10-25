# 🔁 Retomada — onde o trabalho parou (2026-10-25, tarde)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote**:
  - Partes 1, 2 e 3 **publicadas e aprovadas** pelo humano, que leu a série com o filho de 6 anos: ilustradas, narradas em português e traduzidas (en, fr, es).
  - **Parte 4 antiga arquivada** em `dom-quixote/imagens/acervo/parte-4-v1/` e [dom-quixote/parte-4.html](dom-quixote/parte-4.html) continua no ar até a nova ser publicada.
  - **Nova Parte 4 em Rascunho**: Fases 0, 1 e 2 **concluídas e revisadas** na branch `main`!
    - Arquivo: [dom-quixote/parte-4-rascunho.html](dom-quixote/parte-4-rascunho.html) (`rascunho: true`).
    - Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
    - 10 capítulos (Capítulos 23 a 32) + Capa = 11 páginas, cobrindo com calma e riqueza narrativa o retorno e o fim do volume de 1605.
    - **Quadro de atividades separado (`.quadro-atividade`)**: comandos de atividade desvinculados do texto narrativo, com botão 🔊 próprio (leitura opcional; a narração automática da página não os lê).
    - 5 atividades ricas e variadas sem repetição: sílabas (`BACIELMO`), descoberta da palavra secreta sem spoilers (Cap. 25), vocabulário do piquenique (`PÃO`, `QUEIJO`, `ÁGUA`), contagem poética dos tesouros do lago e ordem de frase (`SANCHO GOVERNADOR DA ILHA`).
    - Narrativa aprofundada: a lógica de Sancho e a palavra de honra de Dom Quixote (Cap. 26); a lenda do Lago de Cristal (Cap. 28); o humor da cabrinha Manchadinha (Cap. 29); a romaria dos lavradores da terra sem chuva mágica e com respeito à labuta do campo (Cap. 30); o diálogo clássico de Teresa Pança e a cobrança da ilha (Cap. 31); e o fechamento nobre e emocionante de Cervantes com o fidalgo em seu leito sereno (Cap. 32).
    - Testado em Playwright (Chromium) nas duas orientações (800×1280 e 1280×800) com zero erros de script e de carregamento.
- **Gasto da API nesta sessão**: **US$ 0,00** (sem uso de API paga). Gasto acumulado de outubro: **US$ 3,64** (≈ R$ 20).

## 2. Próxima sessão: 🛑 Parada 3 (Revisão Humana) ➔ Sessão B (Fase 4: Arte e Atividades)

1. **Parada 🛑 Fase 3**: O humano lê o rascunho em [dom-quixote/parte-4-rascunho.html](dom-quixote/parte-4-rascunho.html) no tablet com o filho de 6 anos (aberto pela página `sobre.html` → "Mostrar os rascunhos", ou via `?page=N`), ouvindo na voz do aparelho em português, com o roteiro de observação da receita geral §7.3.
2. **Sessão B (Arte e Atividades)**:
   - Registrar no caderno as notas da revisão humana e fazer os ajustes finos de texto.
   - Fase 4: gerar as ilustrações (6 cenas novas: capa, despedida de Micomicona, bacielmo, piquenique, cabrinha fujona e quarto/janela; reaproveitando a jaula e a chegada à aldeia da v1).
   - Gemini no Antigravity: pode gerar direto na cota do plano Pro; ou Claude pela API paga com autorização expressa no prompt da sessão.

Prompt de abertura sugerido para a Sessão B:
> Fase 4 da Parte 4 (caderno docs/cadernos/dom-quixote-parte-4.md). Minhas notas da revisão da fase 3: <...>. Sem API paga nesta sessão (gerar direto no Antigravity sob cota Pro) [OU: Autorizo a API paga do Gemini para gerar as ilustrações da Parte 4 (Batch), até US$ 0,60].

## 3. Frentes paradas (sem urgência)

- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
