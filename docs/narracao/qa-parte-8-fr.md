# QA da narração em francês — Parte 8

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma fr --parte 8 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-fr/elenco.json`, pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português, **sem escuta**): pastora `concierge-5`, vaqueiros (= povo) `concierge-6`, viajante 1 `assistant-7`, viajante 2 `podcaster-8`, Dom Antônio `podcaster-4`, cabeça encantada `training-4`, homem de avental (impressor) `csagent-4`, Cavaleiro da Branca Lua (= Sansón) `concierge-2`, crianças (= Sanchica) `concierge-12`. Como no português, o Cavaleiro da Branca Lua é a voz de Sansón (abafada pelo elmo), os vaqueiros a do povo e as crianças a de Sanchica. Roteiro: `narracao-fr/parte-8/roteiro.json`, derivado do português, com os mesmos falantes em todas as 355 frases.

## Situação
- **Páginas 11/11 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 8 --idiomas fr`). **Ativada** (`partes: [1, …, 8]` em `narracao-fr`, `dom-quixote/audio/vozes.js`): Dom Quixote inteiro narrado neste idioma.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p7-s1` *bacielmo* | Whisper: "bas ciel mot"; o reparo também | a palavra |
| `p8-s32` *le berger Quichottiz* | Whisper: "Quichotise" | o nome |
| `p0-s6` "Ou bien sera-ce un commencement ?" | Whisper: "cherasse" | a frase |
| `p7-s6` *heaume* | Whisper: "home" | — |
| `p2-s1`, `p3-s17`, `p5-s13`, `p8-s27`, `p10-s21` | 1 palavra diferente cada | — |
