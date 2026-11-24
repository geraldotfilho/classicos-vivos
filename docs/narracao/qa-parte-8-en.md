# QA da narração em inglês — Parte 8

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma en --parte 8 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-en/elenco.json`, pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português, **sem escuta**): pastora `csagent-6`, vaqueiros (= povo) `csagent-10`, viajante 1 `tutor-14`, viajante 2 `storyteller-1`, Dom Antônio `concierge-12`, cabeça encantada `assistant-2`, homem de avental (impressor) `csagent-14`, Cavaleiro da Branca Lua (= Sansón) `assistant-10`, crianças (= Sanchica) `csagent-8`. Como no português, o Cavaleiro da Branca Lua é a voz de Sansón (abafada pelo elmo), os vaqueiros a do povo e as crianças a de Sanchica. Roteiro: `narracao-en/parte-8/roteiro.json`, derivado do português, com os mesmos falantes em todas as 355 frases.

## Situação
- **Páginas 11/11 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 8 --idiomas en`). **Ativada** (`partes: [1, …, 8]` em `narracao-en`, `dom-quixote/audio/vozes.js`): Dom Quixote inteiro narrado neste idioma.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p8-s32` *the shepherd Quixotiz* | Whisper: "Chiozis" | o nome de pastor |
| `p4-s22` "Ah." + `p4-s23` | o "Ah." ficou sem marca própria; Whisper ouviu "ha they’re the donkeys of the sea" | a piada |
| `p4-s6` | 1 palavra diferente | — |
| *PANZINO* (p8) e a cabeça encantada (p5) | sem aviso | a voz "de cano" e o nome |
