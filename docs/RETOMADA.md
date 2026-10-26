# 🔁 Retomada — onde o trabalho parou (2026-10-26, Transparência total da receita/fluxo IA e Licença Livre)

**Leia este arquivo primeiro numa sessão nova**, seja qual for o agente. Depois, siga a ordem de leitura do `AGENTS.md` §0.2 (AGENTS → receita geral → receita específica → plano → caderno da parte).

> 💰 **API paga do Gemini (`AGENTS.md` §2.7)**: só com **autorização do humano no prompt inicial da sessão**, só para o que ele autorizou, sempre no modo mais barato (Flex na narração, Batch nas imagens) e com o gasto registrado em `docs/narracao/gastos.csv` e `docs/arte/gastos.csv`. Teto: **R$ 30/mês**. Sem autorização, não chame a API para nada (nem para um teste).

---

## 1. Estado atual

- **Dom Quixote, primeiro volume (Partes 1 a 4) completo e publicado em 4 idiomas**:
  - Partes 1, 2, 3 e 4: totalmente ilustradas, narradas em português e traduzidas com rigor literário para **Inglês, Espanhol e Francês** (`parte-4.en.js`, `parte-4.es.js`, `parte-4.fr.js` concluídos com 0 erros e 0 avisos em `tools/traducoes.mjs`).
  - **Parte 4**: 12 páginas (caps. 23 a 33), atividades interativas de ordenação (BACIELMO / BASIN-HELMET, FRIEND / AMIGO / AMI, SANCHO GOVERNOR...) e piquenique com pegadinhas sonoras adaptadas a cada língua. Caderno: [docs/cadernos/dom-quixote-parte-4.md](cadernos/dom-quixote-parte-4.md).
- **Home e Portal (`index.html` e `sobre.html`)**:
  - **Página de Adultos (`sobre.html`) e motor multilíngue (`assets/js/i18n-site.js`)**:
    - **Aba "A Nossa Receita"**: Reestruturada com transparência total. Os 5 pilares fundamentais foram enquadrados como **Metas e Critérios de Qualidade inegociáveis**; foi adicionada a seção **Fluxo de Trabalho Passo a Passo** (Fases 0 a 7), detalhando o processo criativo, os modelos de IA envolvidos (Claude 3.7 Sonnet, Gemini 3.8 Pro, Google Imagen 3 / Nano Banana 2, Gemini Voice TTS `gemini-3.8-flash-tts` e Whisper local) e as intervenções humanas em cada etapa, com destaque às **duas paradas humanas críticas de leitura no tablet com o filho de 6 anos**; e a nova seção sobre a **Filosofia do uso de IA** (IA como amplificador de capacidade sob autoria, sensibilidade e curadoria humana). Sincronizado e testado nos 4 idiomas (pt-BR, en, fr, es).
    - **Licença Livre ("Livre como em Liberdade")**: Eliminada a antiga restrição a escolas em `sobre.html`, `README.md` e em todos os idiomas de `i18n-site.js`. O projeto é 100% livre e aberto para usar, reproduzir, copiar, compartilhar, distribuir e readaptar para qualquer fim pessoal, educacional ou comercial, mantendo o crédito ao Clássicos Vivos.
- **PWA & Offline**:
  - `sw.js` gerado e atualizado (versão `f67a1cc6719b`, 160 arquivos em cache).
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
