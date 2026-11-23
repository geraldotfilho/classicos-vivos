# QA da narração em francês — Parte 5

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma fr --parte 5 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco: o das Partes 1–4 (narradora `fr-fr-tutor-4`, Quichotte `fr-fr-assistant-4`, Sancho `fr-fr-training-2`) e o novo da Parte 5 (§8.1 do caderno da Parte 5): gouvernante `csagent-11`, Sansón e o Chevalier aux Miroirs `concierge-2`, Tomé `tutor-3`, diablotin `assistant-10`, gardien des lions `concierge-8`, don Diego `concierge-4`. **Sem escuta humana ainda.**

## Situação
- **Páginas 10/10 e palavras-chave 36/36** (faltavam `lion`, `balai`, `secret`, `nez`, `coucha`, gravadas hoje com `--agrupar 1`), sem rajadas de ruído. Ativada em `dom-quixote/audio/vozes.js`.
- 75 pedidos de voz em 6 rodadas, ~US$ 0,20.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p3-s34` "Cling... cling..." (fim da página 3) | o Whisper não ouviu nada e a marca ficou vazia: a voz pode ter pulado o *cling* | o fim da `p3` |
| `p5-s11` (Sancho de boca cheia) | embolado de propósito ("Bon baître de be dodde…"); o reparo também | se tem graça e se entende |
| `p5-s20` "Entendu !" | o Whisper não reconheceu (1,5 s de áudio) | — |
| `p3-s27`, `p7-s0`, `p7-s32`, `p8-s6` *bacielmo*, *fromage frais* | Whisper: "batial mot", "sans chaud"… | a pronúncia de *bacielmo* |
| `p4-s12` "Don Quichotte regarda bien" | Whisper ouviu "Richard regarda bien" | o nome |
| `p1-s37` *Sansón Carrasco* | Whisper ouviu "Sancho Carrasco" | o nome |
| `p6-s25`, `p7-s1` *heaume* | Whisper: "home" | — |
| `p7-s11` "J’obéis, gémit le chevalier" | 3 palavras diferentes | se a fala está inteira |
| Palavras `balai`, `nez`, `coucha` | Whisper: "Ba, Le, Ballet", "Nee", "Ku, Sha" | o corte das sílabas |
