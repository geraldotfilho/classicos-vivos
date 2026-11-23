# QA da narração em inglês — Parte 6

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma en --parte 6 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Elenco da Parte 6 escolhido em 2026-11-22 (§11 do caderno da Parte 6), **sem escuta humana ainda**.

## Situação
- **Páginas 10/10 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 6 --idiomas en`). **Ativada** (`partes: [1, …, 6]` em `narracao-en`, `dom-quixote/audio/vozes.js`).
- Ficou parada algumas horas no teto de gasto mensal do projeto no AI Studio (429 "monthly spending cap"); com o teto ampliado pelo humano, a p3 foi gravada no mesmo dia, a partir do cache.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p5-s25` *Don Gaiferos* | Whisper: "Don Guy Farrows" | a pronúncia do nome |
| `p6-s23` *Rocinante* | Whisper: "Rossinanti" | — |
| `p6-s30` | 2 palavras diferentes ("you're gonna hit the wheel") | se a fala está inteira |
| `p4-s12`, `p6-s13`, `p8-s28` | 1 palavra diferente cada (provável Whisper) | — |
| `p3-s32` | 1 palavra diferente ("archered": *answered*?) | — |
