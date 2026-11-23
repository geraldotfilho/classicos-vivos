# QA da narração em espanhol — Parte 5

Gravada em 2026-11-23 pelo **modo lote** (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma es --parte 5 --pagina-inteira`), modelo `gemini-3.8-flash-tts`, conferência local pelo Whisper (`large-v3-turbo`). Lista só o que precisa de atenção.

Elenco: o das Partes 1–4 (narradora `es-es-tutor-12`, Quijote `es-es-assistant-3`, Sancho `es-es-techagent-4`) e o novo da Parte 5 (§8.1 do caderno da Parte 5): governanta `csagent-6`, Sansón e o Caballero de los Espejos `csagent-3`, Tomé `training-9`, diablillo `concierge-4`, leonero `training-11`, don Diego `assistant-4`. **Sem escuta humana ainda.**

## Situação
- **Páginas 10/10 e palavras-chave 36/36** (faltava `leones`, gravada hoje com `--agrupar 1`), sem rajadas de ruído. Ativada em `dom-quixote/audio/vozes.js`.
- 73 pedidos de voz em 6 rodadas, ~US$ 0,20.

## Para o humano ouvir
| Item | Situação | Ouvir |
| :--- | :--- | :--- |
| `p1-s29` "¡A... a..." + `p1-s30` "¡ACHÍS!" | o começo do espirro ficou sem marca própria (a frase destacada pula direto para o "¡ACHÍS!") | se o espirro está inteiro |
| `p3-s22` "un saco que hacía tlin y brillaba…" | Whisper ouviu "que hacía y brillaba": o *tlin* pode ter sumido | o tlin-tlin |
| `p7-s7` "el tlin-tlin" | Whisper ouviu "clink clink" | se a voz disse *tlin* |
| `p7-s30` *bacielmo* | Whisper: "vacillelmo" (palavra inventada, falso alarme provável) | a pronúncia de *bacielmo* |
| `p7-s33`, `p8-s23` | 1 palavra diferente cada (provável Whisper) | — |
| Palavra `leones` | ✅ | — |
