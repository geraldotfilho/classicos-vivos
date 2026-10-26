# 🔁 Retomada — onde o trabalho parou (2026-10-26, fase 6 da nova Parte 4)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote**:
  - Partes 1, 2 e 3 **publicadas e aprovadas** pelo humano, que leu a série com o filho de 6 anos: ilustradas, narradas em português e traduzidas (en, fr, es).
  - **Parte 4 antiga** continua no ar ([dom-quixote/parte-4.html](../dom-quixote/parte-4.html), arte em `dom-quixote/imagens/acervo/parte-4-v1/`, narração em `audio/narracao/parte-4/`) até a nova ser publicada.
  - **Nova Parte 4 em rascunho, ILUSTRADA e NARRADA**: [dom-quixote/parte-4-rascunho.html](../dom-quixote/parte-4-rascunho.html) (`rascunho: true`), 11 capítulos (23 a 33) + capa = 12 páginas. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
    - Fases 3, 4 e 5 aprovadas; o texto está congelado.
    - **Fase 6 gravada (2026-10-26)**: 12 páginas inteiras com as vozes dos personagens (elenco novo: mestre Nicolau, barbeiro da bacia, Eugênio, velhinho, sobrinha, povo) e 34 palavras-chave. A narração fica numa pasta própria, `audio/narracao/parte-4-rascunho/` (`pastaAudio` no `window.LIVRO`), para não mexer na da parte publicada. **🛑 Esperando a escuta do humano**: abrir o rascunho com `?narracao=1`; o que ouvir está em [docs/narracao/qa-parte-4-rascunho.md](narracao/qa-parte-4-rascunho.md).
- **Motor (vale para todos os livros)**: a Imaginação é recompensa (lente trancada 🔒 até a criança acertar), tipo de atividade `pedido`, páginas sem `imag` sem a chave, e agora `pastaAudio` (`AGENTS.md` §2.5).
- **Gasto da API nesta sessão**: **US$ 0,20** (narração, Flex, 63 pedidos). Acumulado de outubro: **~US$ 5,12** (≈ R$ 28 de R$ 30): **a verba de outubro acabou**; a próxima produção paga fica para novembro.

## 2. Próxima sessão: escuta 🛑 ➔ publicação da nova Parte 4 ➔ fase 7

1. **Escuta do humano** (`?narracao=1`). Ajustes de voz ou entonação: regravar só a página ou o trecho (`--paginas N` ou `--ids ... --pagina-inteira`), com autorização.
2. **Publicação** (receita geral §4), sem API:
   - arquivar a Parte 4 antiga: `parte-4.html` → `docs/arquivo/` ou `imagens/acervo/`, e `audio/narracao/parte-4/` → `audio/narracao/acervo/parte-4-v1/` (ou só o histórico do Git); as traduções antigas `traducoes/parte-4.*.js` saem (as frases `docs/narracao/frases-dom-quixote-parte-4-*.json` também);
   - `parte-4-rascunho.html` vira `parte-4.html`, sem `rascunho` e sem `pastaAudio`; `audio/narracao/parte-4-rascunho/` vira `parte-4/`; rodar `npm run exportar:frases` e conferir que os `hash` do `paginas.json` batem (a gravação não é refeita);
   - tirar a entrada do `acervo.js`, atualizar a capa da estante (`index.html`) e o "Acervo" de `sobre.html` (com `i18n-site.js`); `npm run build` e o teste no Playwright.
   - Enquanto a Parte 4 nova não tiver tradução, os idiomas en/fr/es caem no português nessa parte (ou se mostra um aviso): decidir com o humano.
3. **Fase 7** (só com autorização e verba de novembro): traduções (o piquenique precisa de pegadinhas próprias em cada idioma: `cartoes: { pedidos, itens }`; o `conferir:traducoes` cobra) e a narração delas.

Prompt de abertura sugerido:
> Ouvi a narração da nova Parte 4: <notas>. Pode publicar a nova Parte 4 no lugar da antiga (receita geral §4). Sem API paga nesta sessão.

## 3. Frentes paradas (sem urgência)

- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
