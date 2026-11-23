# QA da narração em francês — Parte 7

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma fr --parte 7 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco novo (`dom-quixote/audio/narracao-fr/elenco.json`, escolhido pelo catálogo `docs/narracao/VOZES-*.md` com o mesmo perfil do português e **sem escuta**): majordome `csagent-12` (a voz da comtesse Trifaldi), laboureur `advisor-4`, tailleur `tutor-1`, docteur Pedro Recio `tutor-8`, villageois `csagent-4`, vieux au bâton `tutor-7`, voyageur `concierge-8`, page `concierge-11`, Sanchica `concierge-12`. Os demais (Quixote, Sancho, Teresa, Sansón, padre, mestre Nicolau, duque, duquesa, povo) são os das partes anteriores. Roteiro: `narracao-fr/parte-7/roteiro.json`, derivado do português, com os mesmos falantes em todas as 375 frases.

## Situação
- **Páginas 11/11 e palavras-chave 35/35**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 7 --idiomas fr`). **Ativada** (`partes: [1, …, 7]` em `narracao-fr`, `dom-quixote/audio/vozes.js`).
- A voz do mordomo foi trocada no meio da gravação (decisão do humano); as páginas em que ele fala (`p2`, `p3`, `p7`, `p8`) foram gravadas com a voz nova.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| Majordome (`p2`, `p3`, `p7`, `p8`) | voz da comtesse, com estilo de homem sério e grave (decisão do humano) | se convence como homem e como "a mesma voz" da Trifaldi |
| `p3-s0` *le docteur Ôte-Assiette* | Whisper: "haute assiette" | o título |
| `p7-s19`, `p9-s25` braiment "HIII-HAAAN" | Whisper: "brement", "ion ion" | o zurro |
| `p9-s19` | Whisper só ouviu "son chuponsa" | se a fala está inteira |
| `p2-s36` "n’a rien d’un nigaud" | Whisper: "d’un ego" | a palavra |
| `p2-s12`, `p2-s19`, `p2-s34`, `p3-s33`, `p6-s30` | 1 palavra diferente cada | — |
