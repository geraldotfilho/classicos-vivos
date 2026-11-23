# QA da narração em francês — Parte 6

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma fr --parte 6 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Elenco da Parte 6 escolhido em 2026-11-22 (§11 do caderno da Parte 6), **sem escuta humana ainda**.

## Situação
- **Páginas 10/10 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 6 --idiomas fr`). **Ativada** (`partes: [1, …, 6]` em `narracao-fr`, `dom-quixote/audio/vozes.js`).
- Ficou parada algumas horas no teto de gasto mensal do projeto no AI Studio (429 "monthly spending cap"); com o teto ampliado pelo humano, as p1, p3 e p4 foram gravadas no mesmo dia, a partir do cache.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p9-s8` *Clavilègne* | Whisper: "clindigne" | a pronúncia do nome |
| `p6-s9`, `p6-s23`, `p7-s28` | 1 palavra diferente cada (provável Whisper) | — |
| Palavra `palais` (gravada hoje) | Whisper: "Palais, Palais, Palais" | o corte em sílabas |
| `p1-s12` e `p4-s24` (reparadas) | o bloco tinha pulado palavras; reparo cirúrgico emendado | as emendas |
| `p4-s22` | Whisper: "chez jota" | — |
| `p4-s25` "Ta-ta-ta…" | onomatopeia (Whisper: "ta") | — |
