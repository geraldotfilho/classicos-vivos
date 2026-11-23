# QA da narração em inglês — Parte 7

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma en --parte 7 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-en/elenco.json`, escolhido pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português e **sem escuta**): mordomo `podcaster-2` (a voz da condessa Trifaldi), lavrador `advisor-3`, alfaiate `assistant-8`, doutor Pedro Recio `podcaster-9`, aldeão `assistant-5`, velho da bengala `training-11`, viajante `training-8`, pajem `csagent-13`, Sanchica `csagent-8`. Os demais (Quixote, Sancho, Teresa, Sansón, padre, mestre Nicolau, duque, duquesa, povo) são os das partes anteriores. Roteiro: `narracao-en/parte-7/roteiro.json`, derivado do português, com os mesmos falantes em todas as 375 frases.

## Situação
- **Páginas 11/11 e palavras-chave 35/35**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 7 --idiomas en`). **Ativada** (`partes: [1, …, 7]` em `narracao-en`, `dom-quixote/audio/vozes.js`).
- A voz do mordomo foi trocada no meio da gravação (decisão do humano); as páginas em que ele fala (`p2`, `p3`, `p7`, `p8`) foram gravadas com a voz nova.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| Mordomo (`p2`, `p3`, `p7`, `p8`) | voz da condessa, com estilo de homem sério e grave (decisão do humano) | se convence como homem e como "a mesma voz" da Trifaldi |
| `p1-s23` "like hens when you open the henhouse" | o bloco e o reparo saíram com 4 palavras diferentes no Whisper ("ends", "me mouth") | se a frase está inteira |
| `p3-s31`, `p3-s32` *of Takeaway* | Whisper confirma "Pedro Recio of Takeaway" | a piada do nome |
| `p7-s19` zurro "HEE-HAAAW" | Whisper: "hee ha" | o zurro |
| `p3-s10`, `p10-s11`, `p10-s27`, `p10-s34`, `p9-s6` | 1 palavra diferente cada (provável Whisper) | — |
| `p2.mp3` | tinha 1 rajada de ruído (113,99 s), tirada com `audio_gate.py --so-rajadas` | o ponto em ~114 s |
