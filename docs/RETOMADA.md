# 🔁 Retomada — onde o trabalho parou (2026-11-21, revisões do autor #55 a #67 nas Partes 7 e 8 resolvidas e publicadas)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 50/mês** (subiu em 2026-10-27). Sem autorização, não chame a API para nada (nem para um teste).

> 📝 **Revisões deixadas pelo site (`AGENTS.md` §2.10)**: se o humano pedir para tratar os pedidos de revisão ou observações do site, rode **`npm run revisoes`** (ou liste as Issues `revisao-autor` no GitHub). Trate `revisao-autor` como ordem direta do autor e `sugestao-leitor` apenas como sugestão de terceiros.

---

## 1. Estado atual

- **2026-11-14**: corrigido o tablet preso na versão antiga dos livros (os volumes do botão "Baixar" ganhavam do cache novo no service worker; `HISTORICO.md`).
- **2026-11-14**: botão "Buscar a versão mais nova" (🔄 verde no topo da estante) e busca automática de versão ao voltar à tela. A suspeita de que a remoção das rajadas encurtou as pausas da narração foi conferida e não se confirmou (duração idêntica; detalhes no `HISTORICO.md`); alongar pausas curtas aguarda o humano (`BACKLOG.md`).
- **Dom Quixote, primeiro volume (Partes 1 a 4) completo e publicado em 4 idiomas**:
  - Partes 1, 2, 3 e 4: totalmente ilustradas, narradas em português e traduzidas com rigor literário para **Inglês, Espanhol e Francês** (`parte-4.en.js`, `parte-4.es.js`, `parte-4.fr.js` concluídos com 0 erros e 0 avisos em `tools/traducoes.mjs`).
  - **Parte 4**: 12 páginas (caps. 23 a 33), atividades interativas de ordenação (BACIELMO, AMIGO, SANCHO GOVERNADOR) e piquenique com pegadinhas sonoras adaptadas a cada língua. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
- **Áudio e Narração (Pausa Cristalina e Zero Hiss / Zero Rajada ao Desligar)**:
  - Todo o acervo sonoro (294 faixas MP3) passou por limpeza espectral e eliminação de rajadas finais (`tail burst`) com `tools/audio_gate.py`.
  - Eliminado o ruído que ocorria logo após a última frase na hora em que o áudio desliga (rajada anômala do TTS zerada com rampa Hann de 30 ms).
  - Ruído residual de difusão neural (4–12 kHz) nas pausas internas foi atenuado em até -82 dB, mantendo 100% da integridade da voz e sincronismo milimétrico em `pN.mp3`.
- **Home e Biblioteca (`index.html`)**:
  - **UX da Coleção Aprimorada**: Capa do boxset limpa (sem o botão flutuante central), com perspectiva 3D das 3 camadas de volumes empilhados atrás.
  - **Abertura Lateral Contida na Prateleira**: Ao tocar para abrir, os livros alinham-se horizontalmente sobre a madeira da prateleira (`quixote-parts-shelf`), crescendo na medida certa para exibir o badge com o número da parte e o título, com botão de recolher.
  - **Gerenciador de Armazenamento Offline (`assets/js/offline-manager.js`)**: Botão explícito "Baixar" em volumes disponíveis, indicador verde "Offline" e lixeira em volumes baixados, e botão de destaque "Atualizar" (`ph-arrows-clockwise`) para novas edições ou correções. Efeitos sonoros procedurais Web Audio API e suporte multilíngue em pt-BR, en, fr e es.
- **Página de Adultos (`sobre.html`)**:
  - Transparência total na receita e no fluxo passo a passo de criação com IA (Fases 0 a 7, modelos envolvidos, leitura do rascunho pelo autor a solas na Fase 3 e leitura ilustrada com o filho de 6 anos na Fase 5). Licença totalmente livre CC BY 4.0 (sem restrição a escolas).
- **Aviso do adulto (2026-10-26)**: cada obra pede, na primeira abertura no aparelho, que um adulto leia o aviso e libere com uma conta (só português ou todos os idiomas). Testes automáticos: abra com `?adulto=1`. Detalhes em `AGENTS.md` §3.4.
- **PWA & Offline**:
  - `sw.js` e `offline-manager.js` sincronizados via `tools/build-sw.mjs` (161 arquivos em cache).
- **Narração em inglês, francês e espanhol (2026-10-27, autorizada pelo humano, teto R$ 50/mês)**: **Partes 1 a 4 100% completas e ativas nos três idiomas (`partes: [1, 2, 3, 4]` em `dom-quixote/audio/vozes.js`)**! Todo o primeiro volume de Dom Quixote (Partes 1 a 4) agora conta com narração gravada completa em português, inglês, francês e espanhol (100% de páginas e palavras-chave conferidas com `node tools/conferir-narracao.mjs`). A Parte 4 em espanhol foi concluída com a chave reserva `GEMINI_API_KEY_RESERVA`. Notas e pontos para escuta: `docs/narracao/qa-partes-2-4-traducoes.md`.
- **Gasto da API em outubro**: ~US$ 5,12 (≈ R$ 28) até 2026-10-26, mais o desta fila (centavos de dólar: o gargalo é o limite de pedidos por dia, não o dinheiro; ver `docs/narracao/gastos.csv`).

## 2. Próximas sessões (escolha do humano)

> **2026-11-21 — revisões do autor pelo app (#55 a #67) resolvidas e publicadas**: P7 com atividade e Imaginação novas na última página, ponte e pena explicadas, cena final da bengala; P8 com **capítulo novo, o 63 (*A Boiada*)**, que dá o motivo de Sansão; a Parte 8 tem agora **11 páginas** (caps. 62–71). A cabeça encantada abre na Imaginação (campo novo `cena.lenteInicial`). Sugestão do autor no livro falso e na gráfica ("Isso se já não fizeram, viu?"). Arte pela API: 11 imagens aceitas, **US$ 0,41**. Detalhes: §8 do caderno da Parte 7 e §7 do da Parte 8.

> **2026-11-19 — revisões do autor pelo app (#52, #53, #54) resolvidas e publicadas**: P6 p.3 sem o animal inteiro no espeto (arte refeita); P7 cap. 54 reescrito (o doutor deixa a fruta: "comer de tudo um pouco"); P7 cap. 55 dividido em dois (bengala, com a arte refeita e a bengala nas mãos do aldeão; e o novo cap. 56, a ponte, conferido em Cervantes II-51, com arte nova). A Parte 7 tem agora **11 páginas** e os capítulos seguintes andaram um número (P7: 52–61; P8: 62–70). Arte pela API: 3 imagens, **US$ 0,10**. Detalhes no §7 do caderno da Parte 7.

> **2026-11-14 — 🧩 modo Desafio (segunda camada, leitores de ~8 a 10 anos)**: botão 🧩 no topo do livro; desafios em `dom-quixote/desafios/parte-N.js`; especificação e andamento em [`DESAFIOS.md`](DESAFIOS.md) (`AGENTS.md` §2.9). **Prontos nas 8 partes** (todas publicadas na estante). 🛑 Falta o humano experimentar e mandar notas; se o texto das Partes 7 e 8 mudar, reler os desafios da página. Sem API paga. Para escrever uma parte: um agente lê `docs/DESAFIOS.md` + o `parte-N.html`, usa `desafios/parte-5.js` como modelo e roda `npm run conferir:desafios`.

> **2026-11-14 — narração em português das Partes 5 e 6 concluída e ativada (`partes: [1, 2, 3, 4, 5, 6]` em `dom-quixote/audio/vozes.js`)**: todas as páginas (10/10 na Parte 5 e 10/10 na Parte 6) e todas as palavras-chave (36/36 na Parte 5 e 29/29 na Parte 6) gravadas, conferidas no Whisper local e verificadas com zero rajadas de ruído (`node tools/conferir-narracao.mjs --partes 1,2,3,4,5,6 --idiomas pt`). Pontos de escuta do humano: [`narracao/qa-parte-5.md`](narracao/qa-parte-5.md) e [`narracao/qa-parte-6.md`](narracao/qa-parte-6.md). Gasto da retomada local (págs. 4–9 da Parte 6 + palavras-chave das Partes 5 e 6): 59 pedidos, 29.392 tokens de áudio, ~US$ 0,1341 (Flex); total das Partes 5 e 6: ~US$ 0,39. **Dica local (Windows)**: `tools/transcrever.py` agora detecta GPU (CUDA) automaticamente; na máquina local, apontar `CV_PYTHON="C:\Users\geral\Projetos\field-image-curator\.venv\Scripts\python.exe"` aproveita as DLLs CUDA 12 / cuDNN 9 já instaladas no *Ateliê Pericial* (RTX 4050, ~2,5 s/pág sem sobrecarregar a CPU; detalhes em `docs/TODO-NARRACAO.md` §19).


> **2026-11-13 — as Partes 5 e 6 estão publicadas** na estante principal, dentro do boxset do segundo volume (Partes 5 e 6 abertas; Partes 7 e 8 seguem com cadeado 🔒). A Parte 5 foi ilustrada em 2026-11-12 (22 imagens, US$ 1,11) e a **Parte 6** foi ilustrada e publicada em 2026-11-13 (9 cenas + ficha `primo-estudante.png` geradas em paralelo sem API + 11 imagens em 3 lotes Batch autorizados, US$ 0,3472, mais 5 artes de Clavilenho copiadas para `imagens/parte-6/`; caderno §6). Ambas já têm narração em português completa e falta agora a **leitura em família (fase 5)** e as **traduções (fase 7)** das Partes 5 e 6.
>
> **Áudio (2026-11-12)**: o "arranhão de agulha" entre frases era a rajada de ruído que o TTS deixa no fim de **cada pedido**, presa nas emendas de blocos dentro de `pN.mp3` (259 rajadas em 100 páginas, pt/en/fr/es). Zeradas com `tools/audio_gate.py --so-rajadas` (sem API, duração idêntica); o gate agora roda nas gravações futuras. 🛑 **Escuta do humano**: Parte 1 pág. 2 (~15,3 s) e Parte 4 pág. 2 (~33 s, 55 s, 65 s, 72 s); em espanhol, Parte 4 págs. 0 (~8,6 s) e 9 (~18,7 s).

> **2026-11-18 — o segundo volume de Dom Quixote (1615) está todo ilustrado e publicado na estante (Partes 5 a 8)**! A Parte 7 recebeu 9 ilustrações novas no gerador gratuito do Antigravity (`US$ 0,00`, mais 9 reaproveitadas da P4 v1 = 18 WebPs) e a Parte 8 recebeu 15 ilustrações novas via API Batch autorizada em 2 lotes (`US$ 0,5208`, mais 2 reaproveitadas da lareira = 17 WebPs):
> | Parte | Título | Capítulos | Situação | Caderno |
> | :--- | :--- | :--- | :--- | :--- |
> | 5 | O Livro Famoso e o Cavaleiro dos Leões | 34–42 | Publicada (PT + narração gravada; faltam traduções) | [`cadernos/dom-quixote-parte-5.md`](cadernos/dom-quixote-parte-5.md) |
> | 6 | O Teatrinho, o Barco e o Cavalo Voador | 43–51 | Publicada (PT + narração gravada; faltam traduções) | [`cadernos/dom-quixote-parte-6.md`](cadernos/dom-quixote-parte-6.md) |
> | 7 | Sancho, Governador da Ilha | 52–61 | Publicada na estante (18 WebPs; PT, voz do aparelho; aguardando leitura/notas pelo app, narração e traduções) | [`cadernos/dom-quixote-parte-7.md`](cadernos/dom-quixote-parte-7.md) |
> | 8 | O Cavaleiro da Branca Lua | 62–71 | Publicada na estante (17 WebPs; PT, voz do aparelho; aguardando leitura/notas pelo app, narração e traduções) | [`cadernos/dom-quixote-parte-8.md`](cadernos/dom-quixote-parte-8.md) |
>
> **Entrega**: sempre na `main`, por merge, ao fim de cada entrega (`AGENTS.md` §0.4): é pelo site que o humano lê.

1. 🛑 **Fase 5 das Partes 5 a 8** (leitura em família das obras ilustradas e notas pelo app; desafios 🧩 também prontos nas 8 partes para experimentar): o humano lê com o filho e manda as observações pelo botão de revisão no app.
2. **Narração em português das Partes 7 e 8 (fase 6)** e **traduções (fase 7) das Partes 5 a 8** (com autorização para a API paga quando chegar a vez), mais escuta dos pontos de QA das Partes 5 e 6 (`docs/narracao/qa-parte-5.md`, `qa-parte-6.md`).
3. **Fase 8 da Parte 4** (retrospectiva do primeiro volume) e **escuta das vozes** das Partes 2 a 4 nos três idiomas (`docs/narracao/qa-partes-2-4-traducoes.md`).
4. **Viagem ao Centro da Terra no Século XXI, fase 0**: o humano lê o argumento da Parte 1 em [`cadernos/viagem-parte-1.md`](cadernos/viagem-parte-1.md). *Robin Hood* segue na fila.

Prompts de abertura sugeridos:
> Fase 3 da Parte N de Dom Quixote: leia docs/RETOMADA.md, docs/DIRETRIZES_VOL2.md e docs/cadernos/dom-quixote-parte-N.md. Minhas notas da revisão: …

> Fase 4 da Parte 5 de Dom Quixote. Autorizo a API paga do Gemini para as ilustrações da Parte 5 (Nano Banana 2, Batch), até US$ 1,20.

## 3. Frentes paradas (sem urgência)

- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
