# QA da narração — Parte 4

Gerado pelo Claude. Narradora `pt-br-storyteller-9` e vozes dos personagens (elenco em `tools/gravar-narracao.mjs`), modelo `gemini-3.8-flash-tts` no nível Flex. Páginas inteiras, marcadas e conferidas pelo Whisper local. Palavras-chave em grupos, cortadas pela palavra inteira.

## 2026-10-24 — parte completa
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| Páginas `p0` a `p7` (8 páginas, com títulos) | ✅ todas as frases bateram com o texto | as vozes novas: **Teresa** e **Sanchica** (`p2`), os dois **velhos do tribunal** (`p5`) e o vovô Alonso no fim (`p7`) |
| Sanchica | ⚠️ a API **bloqueia** voz infantil criada por descrição; ela usa a voz feminina mais jovem da biblioteca (`concierge-6`, 22 anos) com estilo de menininha | soa como criança? |
| palavras-chave (22) | ✅ todas conferidas; `branca-lua`, `clavilenho`, `venda` e `leitores` regravadas num grupo menor (o primeiro corte ficou errado e foi barrado pela conferência) | `clavilenho`, `branca-lua` |
