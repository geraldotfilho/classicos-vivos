# 🔁 Retomada — onde o trabalho parou (2026-10-26, Eliminação Espectral de Ruído Branco nas Pausas)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote, primeiro volume (Partes 1 a 4) completo e publicado em 4 idiomas**:
  - Partes 1, 2, 3 e 4: totalmente ilustradas, narradas em português e traduzidas com rigor literário para **Inglês, Espanhol e Francês** (`parte-4.en.js`, `parte-4.es.js`, `parte-4.fr.js` concluídos com 0 erros e 0 avisos em `tools/traducoes.mjs`).
  - **Parte 4**: 12 páginas (caps. 23 a 33), atividades interativas de ordenação (BACIELMO, AMIGO, SANCHO GOVERNADOR) e piquenique com pegadinhas sonoras adaptadas a cada língua. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
- **Áudio e Narração (Pausa Cristalina e Zero Hiss)**:
  - Todo o acervo sonoro (294 faixas MP3) passou por limpeza espectral com `tools/audio_gate.py`.
  - Ruído residual de difusão neural (4–12 kHz) nas pausas internas foi atenuado em até -82 dB, mantendo 100% da integridade da voz e sincronismo milimétrico em `pN.mp3`.
- **Home e Biblioteca (`index.html`)**:
  - **UX da Coleção Aprimorada**: Capa do boxset limpa (sem o botão flutuante central), com perspectiva 3D das 3 camadas de volumes empilhados atrás.
  - **Abertura Lateral Contida na Prateleira**: Ao tocar para abrir, os livros alinham-se horizontalmente sobre a madeira da prateleira (`quixote-parts-shelf`), crescendo na medida certa para exibir o badge com o número da parte e o título, com botão de recolher.
  - **Gerenciador de Armazenamento Offline (`assets/js/offline-manager.js`)**: Botão explícito "Baixar" em volumes disponíveis, indicador verde "Offline" e lixeira em volumes baixados, e botão de destaque "Atualizar" (`ph-arrows-clockwise`) para novas edições ou correções. Efeitos sonoros procedurais Web Audio API e suporte multilíngue em pt-BR, en, fr e es.
- **Página de Adultos (`sobre.html`)**:
  - Transparência total na receita e no fluxo passo a passo de criação com IA (Fases 0 a 7, modelos envolvidos, leitura do rascunho pelo autor a solas na Fase 3 e leitura ilustrada com o filho de 6 anos na Fase 5). Licença totalmente livre CC BY 4.0 (sem restrição a escolas).
- **PWA & Offline**:
  - `sw.js` e `offline-manager.js` sincronizados via `tools/build-sw.mjs` (161 arquivos em cache).
- **Gasto da API em outubro**: ~US$ 5,12 (≈ R$ 28 de R$ 30). **A verba de outubro acabou**: a próxima produção paga fica para novembro.

## 2. Próximas sessões (escolha do humano)

1. **Fase 8 da Parte 4** (retrospectiva do primeiro volume concluído).
2. **Parte 5** (segundo volume, 1615): fases 0 a 2, pelo plano `docs/PLANO-DOM-QUIXOTE-PARTES-4-7.md` (o leão guardião, o cavaleiro dos espelhos, etc.).
3. **Narração em en/fr/es da Parte 4** (quando houver cota/verba de API em novembro).

Prompt de abertura sugerido:
> Vamos iniciar o segundo volume de Dom Quixote: Parte 5 (fases 0 a 2), seguindo docs/PLANO-DOM-QUIXOTE-PARTES-4-7.md e docs/RECEITA-CLASSICO-VIVO.md.

## 3. Frentes paradas (sem urgência)

- **Narração em en/fr/es das Partes 2 e 3**: espera o humano ouvir a Parte 1 nesses idiomas e autorizar (BACKLOG M-11).
- **Escuta do humano** das vozes novas das Partes 2–3 (pontos em `docs/narracao/qa-parte-N.md`).
- Demais pendências: [`BACKLOG.md`](BACKLOG.md). O que já foi feito: [`HISTORICO.md`](HISTORICO.md).
