# 🎧 QA da Narração — *Robin Hood*, Parte 1 (pt-BR)

- **Data**: 2026-11-27
- **Modelo**: `gemini-3.8-flash-tts` (Flex / Batch)
- **Elenco**: `robin-hood/audio/narracao/elenco.json` (Narradora `pt-br-storyteller-9`, Robin `pt-br-storyteller-6`, Mariana `pt-br-tutor-11`, João Pequeno `pt-br-podcaster-3`, Grilo `pt-br-techagent-4`, Mestre Tomé `pt-br-assistant-2`, Xerife `pt-br-advisor-6`, Rei Ricardo `pt-br-podcaster-1`, Vizinhos `pt-br-csagent-8`)
- **Cobertura**: 12/12 páginas inteiras (`p0.mp3`..`p11.mp3`), palavras-chave da Parte 1 e falas das atividades.
- **Conferência local**: Whisper `large-v3-turbo` (CUDA/GPU) + `audio_gate.py --verificar` (0 rajadas de ruído).

## Pontos para escuta do humano (avisos do Whisper)

Todos os 12 avisos do Whisper na Parte 1 correspondem a **nomes próprios** (o Whisper tende a transcrever *Xervedo* como "Sherwood" e *Nortigão* como "Nottingham") ou **onomatopeias**; nenhuma frase apresentou falta de áudio ou corte incorreto:

| Página | Frase | O que o Whisper ouviu / motivo | Ação recomendada |
| :--- | :--- | :--- | :--- |
| `p0` | `p0-s0`, `p0-s1` | "sherwood" no lugar de *Xervedo* | Conferir pronúncia de *Xervedo* de ouvido |
| `p2` | `p2-s1` | "sherved" no lugar de *Xervedo* | Conferir pronúncia de *Xervedo* |
| `p3` | `p3-s13` | "nottingham" no lugar de *Nortigão* | Conferir pronúncia de *Nortigão* |
| `p4` | `p4-s6` | "sherwood" no lugar de *Xervedo* | Conferir pronúncia de *Xervedo* |
| `p4` | `p4-s11` | "tu tu tu" (onomatopeia da corneta; reparo tentado e mantido original) | Ouvir a corneta (*túúú! túúú! túúú!*) |
| `p6` | `p6-s1` | "toque taque toque" (onomatopeia do bastão; reparo tentado e mantido original) | Ouvir o som dos bastões |
| `p7` | `p7-s9` | "toque" (onomatopeia de bater o bastão no chão) | Sem defeito esperado |
| `p9` | `p9-s13` | "claque" (onomatopeia da chave na cela) | Sem defeito esperado |
| `p10` | `p10-s18` | "sherwood" no lugar de *Xervedo* | Conferir pronúncia de *Xervedo* |
| `p11` | `p11-s8` | "tchim tchim" (onomatopeia das canecas) | Sem defeito esperado |
| `p11` | `p11-s9` | "nortingham" no lugar de *Nortigão* | Conferir pronúncia de *Nortigão* |
