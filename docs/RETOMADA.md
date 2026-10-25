# 🔁 Retomada — onde o trabalho parou (2026-10-25, fim da noite)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote**:
  - Partes 1, 2 e 3 **publicadas e aprovadas** pelo humano, que leu a série com o filho de 6 anos: ilustradas, narradas em português e traduzidas (en, fr, es).
  - **Parte 4 antiga** continua no ar ([dom-quixote/parte-4.html](../dom-quixote/parte-4.html), arte em `dom-quixote/imagens/acervo/parte-4-v1/`) até a nova ser publicada.
  - **Nova Parte 4 em rascunho, ILUSTRADA**: [dom-quixote/parte-4-rascunho.html](../dom-quixote/parte-4-rascunho.html) (`rascunho: true`), agora com **11 capítulos (23 a 33) + capa = 12 páginas**. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
    - Fases 3 e 4 feitas e aprovadas.
    - **Fase 5, 1ª leitura do humano com o filho: as 8 notas foram aplicadas** (caderno §5): caps. 27 a 33 reescritos; cap. 28 com a história de Cervantes (o Cavaleiro do Lago) dentro do balão, sem lente; cap. 29 com o padre de volta e sem lente; o cap. 30 virou dois (a romaria de longe, com lentes; o encontro de perto, com a santa refeita); Sancho carinhoso com Teresa e a família abraçando o burrico; o fim sem teaser no texto (as aventuras correm de boca em boca). Gravura do cap. 26 refeita (fantasias dos magos iguais às da pág. 3, um cavalo para cada um).
- **Motor (vale para todos os livros)**: a **Imaginação virou recompensa**: nas páginas com atividade, a chave da lente fica trancada 🔒 até a criança acertar. Tipo de atividade novo **`pedido`** (o lanche de Sancho: a figura do que ele quer e a palavra certa entre pegadinhas quase iguais, PÃO × PIÃO, QUEIJO × QUEIXO, ÁGUA × ÁGUIA, que recomeçam o jogo). Páginas sem `imag` não mostram a chave. Detalhes em `AGENTS.md` §2.5.
- **Interface (2026-10-25)**: ilustração maximizada, barra estreita da lente (chave deslizante) e botões que se escondem (👁 no topo). Vale para todas as partes (motor único). Detalhes em `HISTORICO.md`.
- **Gasto da API nesta sessão**: **US$ 0,38** (11 imagens, 9 aceitas, Batch). Acumulado de outubro: **US$ 4,92** (≈ R$ 27 de R$ 30).

## 2. Próxima sessão: 🛑 Parada 5 (2ª leitura) ➔ Fase 6 (Narração)

1. **🛑 Fase 5, 2ª leitura**: o humano relê o livro (ainda rascunho, voz do aparelho) com o filho, pela página `sobre.html` → "Mostrar os rascunhos", com atenção aos caps. 26 a 33, ao piquenique novo e à chave trancada nas páginas com atividade (também nas Partes 1 a 3). Ajustes pequenos entram na mesma sessão; depois do "aprovado", o texto congela.
2. **Fase 6**: roteiro de vozes e narração em português da nova Parte 4 (`npm run gravar:narracao`, Flex, só com autorização), escuta do humano 🛑 e **publicação** (trocar `parte-4.html` pela nova, receita geral §4).
   - Atenção ao teto: em outubro sobram ~R$ 3 (a narração de uma parte custa ~US$ 0,08–0,10).
   - Na fase 7 (traduções), o piquenique precisa de pegadinhas próprias em cada idioma (`cartoes: { pedidos, itens }` na tradução; o `conferir:traducoes` cobra).

Prompt de abertura sugerido:
> Fase 5 da nova Parte 4 (caderno docs/cadernos/dom-quixote-parte-4.md). Minhas notas da leitura com meu filho: <...>. [Aprovado: autorizo a API paga para a narração em português (Flex).]

## 3. Frentes paradas (sem urgência)

- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
