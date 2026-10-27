# 📋 Backlog — o que falta

Pendências abertas, por prioridade. O que já foi entregue está em [`HISTORICO.md`](HISTORICO.md); a frente atual e a próxima sessão, em [`RETOMADA.md`](RETOMADA.md). Ao entregar um item, mova-o para o histórico (no sprint da entrega) e registre aqui o que foi descoberto.

---

## 🔴 Prioridade alta

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| A-10 | **Correção de rumo de Dom Quixote** | Refazer a Parte 4 (fecha o volume de 1605) e criar as Partes 5–7 (volume de 1615), uma por vez, pelas fases da receita. Receitas: [`RECEITA-CLASSICO-VIVO.md`](RECEITA-CLASSICO-VIVO.md) (geral) e [`receitas/DOM-QUIXOTE.md`](receitas/DOM-QUIXOTE.md). Fase 0: modo rascunho no motor e estante com o segundo volume ✅ (2026-10-25); **nova Parte 4 publicada** em 2026-10-26, ilustrada e narrada em português (caderno `cadernos/dom-quixote-parte-4.md`); **na fila: a fase 7 dela** (traduções en/fr/es e a narração delas, com autorização e verba; até lá, o livro avisa que a parte está só em português). Próximas: Partes 5–7. Andamento no §7 do [plano](PLANO-DOM-QUIXOTE-PARTES-4-7.md). |

## 🟡 Prioridade média

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| M-1 | **Pronúncia silábica com a voz do aparelho** | Com a palavra-chave gravada (`audio/palavras/`), a criança já ouve as sílabas pausadas e a palavra inteira. Sem gravação (palavra nova, idioma sem narração), a voz do aparelho fala só a palavra inteira (o cartão mostra as sílabas). Proposta: falar as sílabas com pausas, destacando cada uma no cartão. Testar a qualidade das sílabas isoladas nas vozes do Android ("ÇÃO" sozinha soa estranho). |
| M-11 | **Narração gravada em inglês, francês e espanhol** | **Partes 1 e 2 completas nos três idiomas** (Parte 2 entregue em 2026-10-27). Partes 3 e 4: gravação em andamento pela fila `tools/gravar-fila-traducoes.sh` (limite de 100 pedidos por dia; retomada automática depois das 07:00 UTC). Situação: `node tools/conferir-narracao.mjs`. Elencos em `dom-quixote/audio/narracao-<idioma>/elenco.json`, notas e pontos para escuta em `docs/narracao/qa-partes-2-4-traducoes.md`. Palavras sem gravação (voz do aparelho): fr `armees`, `heaume`, `faim`; es `cayado`, `flores`. **O humano ainda precisa ouvir as vozes novas** dos personagens das Partes 2–4 nos três idiomas. |
| M-12 | **Revisão nativa das traduções** | Traduções feitas por agentes. Pedir a leitores nativos (de preferência professores de alfabetização) que leiam em voz alta, conferindo ritmo, divisão silábica das palavras-chave e as palavras dos cartões. Avisos de "página desatualizada" em `npm run conferir:traducoes` indicam páginas cujo português mudou depois da tradução. Dúvidas abertas pelos tradutores: Pandafilando "de la Fosca Vista" (en: *of the Gloomy Glare*; fr: mantido em espanhol); sílabas orais × escritas no francês (ROS • SI • NANTE); no espanhol, pequenos acréscimos literais de Cervantes (o livro de palha e cevada do vendeiro, "tuyo y mío", Diego Pérez de Vargas, "el doctor Pedro Recio", "desnudo nací", "el Alígero", "Alonso Quijano el Bueno") e a lança de **encina** (azinheira), como em Cervantes, em vez de carvalho. |
| M-10 | **Páginas 1 e 2 da Parte 1 gravadas inteiras** | Foram gravadas frase por frase, antes de a página inteira virar o padrão (os títulos entraram como gravações avulsas). Regravar inteiras para o livro ficar uniforme: ~2 min de áudio, ~US$ 0,03. Só se o humano quiser. |
| M-8 | **Teste automatizado multiplataforma** | Hoje cada sessão escreve o seu teste com Playwright (AGENTS.md §5). Criar um `npm test` reutilizável (retrato + paisagem, todas as páginas de todas as partes, ambas as lentes, ordem da armadura, bloqueio de duplo toque, offline) gerando capturas em `test-results/`. |
| M-14 | **Acabamento das camadas da pousada (Parte 1)** | Antigo pedido P-005 da fila (encerrada). O estalajadeiro, os porquinhos e o pastor ainda trazem um pedaço de chão claro pintado sob os pés (e o pastor, um tapete de grama recortado), o que dá cara de adesivo. Refazer sobre fundo **magenta** e recortar com `tools/recortar-camada.py`, **mantendo o mesmo tamanho de tela, enquadramento e ponto de apoio** de cada arquivo (o código já posiciona essas camadas). Critério: sobre magenta, nos 25% de baixo do quadro, fora da silhueta, nenhum pixel claro ou verde. Arquivos: `p4-estalajadeiro-acenando`, `p4-estalajadeiro-sopa`, `p4-porquinhos`, `p4-pastor-parado`, `p4-pastor-tocando` (as notas estão aprovadas). Pela API (com autorização) ou no Antigravity. |
| M-13 | **Retoques da arte da Parte 2 (API)** | Sem retrabalho urgente. (1) A poeira da pág. 4 ainda tem fiapos levemente rosados nas pontas (quase invisíveis sobre a planície). (2) Na pág. 5 (Realidade), Dom Quixote parece mais alegre que "abatido". (3) Na pág. 6 da Imaginação, o cavaleiro está em pé (na Realidade, sentado na pedra), coerente com "empunhou a lança". O elmo flutuante da pág. 8 e as Imaginações que não transformavam já foram corrigidos. |

## 🟢 Prioridade baixa

| ID | Item | Detalhes |
| :--- | :--- | :--- |
| B-1 | **Acessibilidade** | Cartões e hotspots são `<div>` (com eventos delegados), sem `role="button"`, `tabindex` ou `aria-label`. Botões só de ícone têm `title`, mas não `aria-label`. `maximum-scale=1, user-scalable=no` impede o zoom de quem precisa. |
| B-5 | **GitHub Pages** | Confirmar que o Pages está ativo na `main`: o service worker exige HTTPS. Pelo `file://`, o livro funciona offline, mas sem instalação nem cache. |
| B-6 | **Indicador de páginas no retrato** | As bolinhas de página só aparecem em telas ≥ 1024 px. No retrato existe apenas o "Página N de M". |
