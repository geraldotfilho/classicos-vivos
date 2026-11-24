# QA da narração em espanhol — Parte 7

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma es --parte 7 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-es/elenco.json`, escolhido pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português e **sem escuta**): mayordomo `podcaster-5` (a voz da condesa Trifaldi), labrador `advisor-9`, sastre `advisor-2`, doctor Pedro Recio `advisor-8`, aldeano `assistant-4`, viejo del bastón `training-3`, viajero `concierge-4`, paje `training-9`, Sanchica `concierge-3`. Os demais (Quixote, Sancho, Teresa, Sansón, padre, mestre Nicolau, duque, duquesa, povo) são os das partes anteriores. Roteiro: `narracao-es/parte-7/roteiro.json`, derivado do português, com os mesmos falantes em todas as 375 frases.

## Situação
- **Páginas 11/11 e palavras-chave 35/35**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 7 --idiomas es`). **Ativada** (`partes: [1, …, 7]` em `narracao-es`, `dom-quixote/audio/vozes.js`).
- A voz do mordomo foi trocada no meio da gravação (decisão do humano); as páginas em que ele fala (`p2`, `p3`, `p7`, `p8`) foram gravadas com a voz nova.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| Mayordomo (`p2`, `p3`, `p7`, `p8`) | voz da condesa, com estilo de homem sério e grave (decisão do humano) | se convence como homem e como "a mesma voz" da Trifaldi |
| `p7-s19` e `p9-s25` rebuzno "IIIH-AAA" | Whisper: "y ah", "y ya"; o reparo de `p7-s19` também saiu assim | o zurro |
| `p3-s17`, `p6-s35` | Whisper só ouviu "tuave eh", "fa que" (falas curtas) | se estão inteiras |
| `p10-s2`, `p10-s17` | 1 palavra diferente cada | — |
| *Tirteafuera* | sem aviso | a pronúncia |
