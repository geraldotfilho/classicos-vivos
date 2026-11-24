# QA da narração em espanhol — Parte 8

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma es --parte 8 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-es/elenco.json`, pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português, **sem escuta**): pastora `techagent-5`, vaqueiros (= povo) `commercial-7`, viajante 1 `training-11`, viajante 2 `concierge-12`, Dom Antônio `podcaster-7`, cabeça encantada `concierge-12`, homem de avental (impressor) `assistant-4`, Cavaleiro da Branca Lua (= Sansón) `csagent-3`, crianças (= Sanchica) `concierge-3`. Como no português, o Cavaleiro da Branca Lua é a voz de Sansón (abafada pelo elmo), os vaqueiros a do povo e as crianças a de Sanchica. Roteiro: `narracao-es/parte-8/roteiro.json`, derivado do português, com os mesmos falantes em todas as 355 frases.

## Situação
- **Páginas 11/11 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 8 --idiomas es`). **Ativada** (`partes: [1, …, 8]` em `narracao-es`, `dom-quixote/audio/vozes.js`): Dom Quixote inteiro narrado neste idioma.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p6-s6`, `p8-s7` | 1 palavra diferente cada (provável Whisper) | — |
| *Quijotiz*, *Pancino*, la cabeza encantada | sem aviso | os nomes e a voz "de cano" |
