# 🔁 Retomada — onde o trabalho parou (2026-11-12, Parte 5 de Dom Quixote ilustrada e publicada; Partes 6 a 8 em rascunho de texto)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 50/mês** (subiu em 2026-10-27). Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

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

> **2026-11-12 (tarde) — a Parte 5 está publicada** na estante principal, dentro do boxset do segundo volume (que agora abre; as Partes 6 a 8 aparecem com cadeado). Ilustrada pela API (22 imagens, US$ 1,11, três subagentes em paralelo; caderno §6), só em português e com a voz do aparelho. A fase 5 (revisão final) foi pulada a pedido do humano. Pontos para o olho do humano: caderno da Parte 5, §6 (Tomé loiro de gorro, nariz de Sansão pouco achatado, escudos em vez de bandeiras na carroça do leão, Dom Quixote com duas espadas na pág. 9). Faltam a **narração (fase 6)** e as **traduções (fase 7)** da Parte 5.

> **2026-11-12 — o segundo volume de Dom Quixote (1615) está inteiro em rascunho de texto**, em quatro partes, sem nenhuma API paga:
> | Parte | Título | Capítulos | Arquivo | Caderno |
> | :--- | :--- | :--- | :--- | :--- |
> | 5 | O Livro Famoso e o Cavaleiro dos Leões | 34–42 | `dom-quixote/parte-5.html` | [`cadernos/dom-quixote-parte-5.md`](cadernos/dom-quixote-parte-5.md) |
> | 6 | O Teatrinho, o Barco e o Cavalo Voador | 43–51 | `parte-6.html` | [`cadernos/dom-quixote-parte-6.md`](cadernos/dom-quixote-parte-6.md) |
> | 7 | Sancho, Governador da Ilha | 52–60 | `parte-7.html` | [`cadernos/dom-quixote-parte-7.md`](cadernos/dom-quixote-parte-7.md) |
> | 8 | O Cavaleiro da Branca Lua | 61–69 | `parte-8.html` | [`cadernos/dom-quixote-parte-8.md`](cadernos/dom-quixote-parte-8.md) |
>
> Todas com `rascunho: true`, três atividades funcionando, auditadas por um crítico de contexto limpo e polidas. Abrem em `sobre.html` → Livros em produção → "Mostrar os rascunhos"; o fim de cada uma leva à seguinte. A Parte 5 já recebeu duas rodadas de notas do humano (humor e mistério; Sansão, a governanta e o duelo), e as Partes 6 a 8 foram escritas com essas notas como regra. Plano: [`PLANO-DOM-QUIXOTE-VOLUME-2.md`](PLANO-DOM-QUIXOTE-VOLUME-2.md). Regras em uma página: [`DIRETRIZES_VOL2.md`](DIRETRIZES_VOL2.md).
>
> **Entrega**: sempre na `main`, por merge, ao fim de cada entrega (`AGENTS.md` §0.4): é pelo site que o humano lê.

1. 🛑 **Fase 3 das Partes 6 a 8** (e notas da Parte 5 já publicada): o humano lê os rascunhos e manda as notas de cada uma. Os pontos de decisão estão no §3 e no §5 de cada caderno.
2. **Fase 4 (arte pela API, só com autorização)**, uma parte por vez (a Parte 5 já foi: modelo de três subagentes em paralelo, um por grupo de páginas, em `tools/arte/dom-quixote-parte-5-*.mjs`): Parte 6 ~18 (~US$ 0,70); Parte 7 ~9 (~US$ 0,35); Parte 8 ~15 (~US$ 0,60). As Partes 6, 7 e 8 já mostram as cenas reaproveitadas da Parte 4 antiga (Clavilenho, conselhos, bengala, burrico, lareira). Antes: escrever `tools/arte/dom-quixote-parte-N.mjs` a partir da tabela "Visual" do caderno e as fichas dos personagens novos.
3. **Fase 8 da Parte 4** (retrospectiva do primeiro volume) e **escuta das vozes** das Partes 2 a 4 nos três idiomas (`docs/narracao/qa-partes-2-4-traducoes.md`).
4. **Viagem ao Centro da Terra no Século XXI, fase 0**: o humano lê o argumento da Parte 1 em [`cadernos/viagem-parte-1.md`](cadernos/viagem-parte-1.md). *Robin Hood* segue na fila.

Prompts de abertura sugeridos:
> Fase 3 da Parte N de Dom Quixote: leia docs/RETOMADA.md, docs/DIRETRIZES_VOL2.md e docs/cadernos/dom-quixote-parte-N.md. Minhas notas da revisão: …

> Fase 4 da Parte 5 de Dom Quixote. Autorizo a API paga do Gemini para as ilustrações da Parte 5 (Nano Banana 2, Batch), até US$ 1,20.

## 3. Frentes paradas (sem urgência)

- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
