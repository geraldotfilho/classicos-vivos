# 🔁 Retomada — onde o trabalho parou (2026-10-25, noite)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote**:
  - Partes 1, 2 e 3 **publicadas e aprovadas** pelo humano, que leu a série com o filho de 6 anos: ilustradas, narradas em português e traduzidas (en, fr, es).
  - **Parte 4 antiga** continua no ar ([dom-quixote/parte-4.html](../dom-quixote/parte-4.html), arte em `dom-quixote/imagens/acervo/parte-4-v1/`) até a nova ser publicada.
  - **Nova Parte 4 em rascunho, agora ILUSTRADA**: [dom-quixote/parte-4-rascunho.html](../dom-quixote/parte-4-rascunho.html) (`rascunho: true`), 10 capítulos (23 a 32) + capa. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
    - Fase 3 **aprovada** pelo humano (2026-10-25).
    - Fase 4 **feita** (Claude, API Batch autorizada): 23 cenas novas + 6 camadas (pão, queijo, moringa; concha, pérolas, peixinhos), a chegada à aldeia reaproveitada da v1; áreas de toque medidas na arte; testado no Playwright nas duas orientações. Detalhes, refeitas e ressalvas no caderno, §6.
- **Gasto da API nesta sessão**: **US$ 0,90** (imagens). Acumulado de outubro: **US$ 4,54** (≈ R$ 25 de R$ 30).

## 2. Próxima sessão: 🛑 Parada 5 (Revisão final) ➔ Fase 6 (Narração)

1. **🛑 Fase 5**: o humano lê o livro ilustrado (ainda rascunho, voz do aparelho) com o filho, pela página `sobre.html` → "Mostrar os rascunhos". Ajustes pequenos de texto ou arte entram na mesma sessão; depois do "aprovado", o texto congela.
2. **Fase 6**: roteiro de vozes e narração em português da nova Parte 4 (`npm run gravar:narracao`, Flex, só com autorização), escuta do humano 🛑 e **publicação** (trocar `parte-4.html` pela nova, receita geral §4).
   - Atenção ao teto: em outubro sobram ~R$ 5 (a narração de uma parte custa ~US$ 0,08–0,10).

Prompt de abertura sugerido:
> Fase 5 da nova Parte 4 (caderno docs/cadernos/dom-quixote-parte-4.md). Minhas notas da leitura com meu filho: <...>. [Aprovado: autorizo a API paga para a narração em português (Flex).]

## 3. Frentes paradas (sem urgência)

- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
