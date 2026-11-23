# QA da narração em francês — Parte 6 (prévia)

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma fr --parte 6 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Elenco da Parte 6 escolhido em 2026-11-22 (§11 do caderno da Parte 6), **sem escuta humana ainda**.

## Situação
- **Páginas 7/10** (faltam **p1, p3 e p4**) e palavras-chave 29/29, sem rajadas de ruído. Liberada como **prévia** (`previa: [6]` em `narracao-fr`, `dom-quixote/audio/vozes.js`): as páginas que faltam usam a voz do aparelho, e a voz gravada não vira a padrão (o leitor a escolhe no painel 🗣️).
- **Parou no teto de gasto mensal do projeto no AI Studio** (429 "exceeded its monthly spending cap", nas duas chaves). Faltam poucos pedidos (en 1, es 2, fr 4); o resto já está pago e guardado no cache local. Para terminar, depois que o humano subir o teto ou o mês virar: o mesmo comando acima e, com tudo completo, trocar `previa: [6]` por `6` em `partes`.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p9-s8` *Clavilègne* | Whisper: "clindigne" | a pronúncia do nome |
| `p6-s9`, `p6-s23`, `p7-s28` | 1 palavra diferente cada (provável Whisper) | — |
| Palavra `palais` (gravada hoje) | Whisper: "Palais, Palais, Palais" | o corte em sílabas |
