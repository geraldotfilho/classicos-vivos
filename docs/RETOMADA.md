# 🔁 Retomada — onde o trabalho parou (2026-11-10, Parte 5 de Dom Quixote em rascunho, esperando o humano)

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

> **2026-11-10 — sessão autônoma do segundo volume de Dom Quixote (sem API paga).** O volume de 1615 foi dividido em **quatro partes (5 a 8)**: [`PLANO-DOM-QUIXOTE-VOLUME-2.md`](PLANO-DOM-QUIXOTE-VOLUME-2.md). As regras, numa página só, para qualquer agente ou subagente: [`DIRETRIZES_VOL2.md`](DIRETRIZES_VOL2.md). A **Parte 5** (*O Livro Famoso e o Cavaleiro dos Leões*, caps. 34–42) está escrita em rascunho, com as 3 atividades funcionando e sem ilustrações: `dom-quixote/parte-5.html` (em `sobre.html` → Livros em produção → "Mostrar os rascunhos"). Caderno: [`cadernos/dom-quixote-parte-5.md`](cadernos/dom-quixote-parte-5.md).

1. 🛑 **Fase 3 da Parte 5**: o humano lê o rascunho no tablet (sozinho, na voz do aparelho) e manda as notas. Depois: ajustes + fase 4 (arte pela API, ~23 imagens, ~US$ 0,90, só com autorização).
2. **Parte 6** (*O Teatrinho, o Barco e o Cavalo Voador*, II-18 a 41): fases 1 e 2 no mesmo método, se o humano aprovar o resultado e o consumo da Parte 5.
3. **Fase 8 da Parte 4** (retrospectiva do primeiro volume).
4. **Escuta humana das vozes novas** dos personagens das Partes 2 a 4 nos três idiomas (`docs/narracao/qa-partes-2-4-traducoes.md`).
5. **Viagem ao Centro da Terra no Século XXI, fase 0**: o humano lê o argumento da Parte 1 em [`cadernos/viagem-parte-1.md`](cadernos/viagem-parte-1.md). *Robin Hood* segue na fila.

Prompts de abertura sugeridos:
> Fase 3 da Parte 5 de Dom Quixote: leia docs/RETOMADA.md, docs/DIRETRIZES_VOL2.md e docs/cadernos/dom-quixote-parte-5.md. Minhas notas da revisão: … (Se for gerar a arte: "Autorizo a API paga do Gemini para as ilustrações da Parte 5, até US$ 1,20.")

> Parte 6 de Dom Quixote, fases 1 e 2, no mesmo método da Parte 5 (docs/DIRETRIZES_VOL2.md e docs/PLANO-DOM-QUIXOTE-VOLUME-2.md). Sem API paga.

## 3. Frentes paradas (sem urgência)

- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
