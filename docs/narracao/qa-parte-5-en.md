# QA da narração em inglês — Parte 5

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma en --parte 5 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco: o das Partes 1–4 (narradora `en-gb-storyteller-2`, Quixote `en-gb-storyteller-4`, Sancho `en-gb-advisor-2`) e o novo da Parte 5, escolhido em 2026-11-22 (§8.1 do caderno da Parte 5): governanta `concierge-7`, Sansón e o Cavaleiro dos Espelhos `assistant-10`, Tomé e o narigudo `podcaster-4`, diabinho `csagent-7`, tratador `advisor-8`, Don Diego `tutor-8`. **Nenhuma dessas vozes foi ouvida por gente ainda.**

## Situação
- **Páginas 10/10 e palavras-chave 36/36** (`node tools/conferir-narracao.mjs --partes 5 --idiomas en`), sem rajadas de ruído. Ativada em `dom-quixote/audio/vozes.js` (`partes: [1, …, 5]`).
- 76 pedidos de voz em 6 rodadas + 2 para refazer a `p6` (abaixo); ~US$ 0,21.

## Defeito encontrado e corrigido: `p6` sem as 10 primeiras frases
O bloco 43 (`p5-s26…p6-s9`) voltou só com a fala de Sancho que fecha a página 5 (2,3 s): a voz parou antes do título do capítulo 39. O reparo pediu as mesmas 11 frases (contexto + defeito = o bloco inteiro), e o lote devolveu o mesmo áudio; a página foi salva assim mesmo (103 s, frases `p6-s0`…`p6-s9` sem som). Corrigido apagando o WAV do lote e o bloco do cache e pedindo de novo: `p6.mp3` tem agora 164,7 s, com todas as frases. O script ganhou uma trava para não salvar página com texto sem áudio (`tools/gravar-narracao.mjs`, `finalizar`; `docs/TODO-NARRACAO.md` §8.7).

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p6` inteira | refeita (acima) | se a emenda entre os blocos ficou natural |
| `p5-s11` ("By baster ody gives be…", de boca cheia) | embolada de propósito; o Whisper ouviu "my masteroni…" e o reparo também saiu assim | se ainda se entende e se tem graça |
| `p5-s26` | "so that that nose": um "that" a mais? | — |
| `p1-s30` "ATISHOO!" | o espirro ("tissue" no Whisper) | se soa como espirro |
| `p2-s10` "more than twelve thousand copies" | Whisper ouviu "twelve zero" | o número |
| `p3-s17` | o choro de Sancho ("whoa") | — |
| Vozes novas da Parte 5 | escolhidas pelo catálogo, sem escuta | governanta, Sansón, Tomé narigudo, diabinho, tratador, Don Diego |
