# QA da narração em espanhol — Parte 6

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma es --parte 6 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Elenco da Parte 6 escolhido em 2026-11-22 (§11 do caderno da Parte 6), **sem escuta humana ainda**.

## Situação
- **Páginas 10/10 e palavras-chave 29/29**, sem rajadas de ruído (`node tools/conferir-narracao.mjs --partes 6 --idiomas es`). **Ativada** (`partes: [1, …, 6]` em `narracao-es`, `dom-quixote/audio/vozes.js`).
- Ficou parada algumas horas no teto de gasto mensal do projeto no AI Studio (429 "monthly spending cap"); com o teto ampliado pelo humano, a p3 foi gravada no mesmo dia, a partir do cache.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p9-s22` "¡PUM!" | ficou sem marca própria (colado na frase vizinha) | se o estrondo está lá |
| `p4-s25` "¡Tatatatatá!" | o Whisper não reconheceu (onomatopeia) | se está no áudio |
| `p4-s14` | 1 palavra diferente (provável Whisper) | — |
| Palavra `olla` (gravada hoje) | ✅ | — |
| `p3-s30` (reparada) | o bloco tinha pulado palavras; reparo cirúrgico emendado | a emenda |
| `p3-s15` | Whisper ouviu só "va" | se a frase está inteira |
