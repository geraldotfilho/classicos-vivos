# 🎧 QA da Narração — *Robin Hood*, Parte 2 (pt-BR)

- **Data**: 2026-11-27
- **Modelo**: `gemini-3.8-flash-tts` (Flex / Batch)
- **Elenco**: `robin-hood/audio/narracao/elenco.json` (Narradora + Robin, Mariana, João Pequeno, Grilo, Mestre Tomé, Clara `pt-br-csagent-12`, Xerife, Guarda da Praça `pt-br-tutor-7`, Vizinha Feirante `pt-br-tutor-5`, Guarda da Torre `pt-br-training-1`, Vovó `pt-br-training-11`, Menininho `pt-br-training-7`, Vizinho da Varanda `pt-br-csagent-9`)
- **Cobertura**: 14/14 páginas inteiras (`p0.mp3`..`p13.mp3`), palavras-chave da Parte 2 e falas das atividades.
- **Conferência local**: Whisper `large-v3-turbo` (CUDA/GPU) + `audio_gate.py --verificar` (0 rajadas de ruído).

## Pontos para escuta do humano (avisos do Whisper)

Os avisos do Whisper na Parte 2 concentram-se em **nomes próprios** (*Xervedo* / *Nortigão*), **numerais romanos** (`Capítulo 19` → `xix`) e **onomatopeias** (bocejo, tosse, tambor, passos, ronco, espirro, brinde). Todas as marcas de tempo foram verificadas e têm duração compatível com o texto falado:

| Página | Frase | O que o Whisper ouviu / motivo | Ação recomendada |
| :--- | :--- | :--- | :--- |
| `p1` | `p1-s1` | "sherwood" (*Xervedo*) | Conferir pronúncia de *Xervedo* |
| `p3` | `p3-s3`, `p3-s7`, `p3-s14` | "bau" / "sherwood" / "nottingham" | Conferir nomes próprios |
| `p4` | `p4-s1`, `p4-s13` | "nottingham" e "tom tom tom" (tambor; reparado em emenda) | Ouvir o rufar do tambor |
| `p5` | `p5-s2`, `p5-s9`, `p5-s16` | `p5-s9` é `"Aaa… aaa…"` (1,90 s no áudio; Whisper transcreveu vazio); `p5-s16` é onomatopeia "craque" | Ouvir `p5-s9` (*Aaa… aaa…*) |
| `p6` | `p6-s7`, `p6-s9`, `p6-s11`, `p6-s16` | `p6-s11` é `"Cof, cof, cof!"` (1,37 s no áudio; Whisper transcreveu vazio); "sherwood" | Ouvir `p6-s11` (tosse da farinha) |
| `p7` | `p7-s6`, `p7-s16` | "nortingham" e "toque toque toque" (`toc, toc, toc` dos guardas) | Ouvir os passos dos guardas |
| `p8` | `p8-s0` | "capitulo xix" (numeral romano transcrito pelo Whisper) | Sem defeito esperado |
| `p10` | `p10-s10` | "rrronc, pfff, rrronc!" omitido na transcrição do Whisper (5,68 s de áudio) | Ouvir o ronco do guarda |
| `p11` | `p11-s1`, `p11-s4`, `p11-s14` | Ronco (`rrronc, pfff!`), espirro (`Atchinf!`, 10,11 s) e "shervinswood" (*Xervedo*) | Ouvir espirro do Guarda da Torre e *Xervedo* |
| `p13` | `p13-s7` | "tchim tchim" (canecas brindando) | Sem defeito esperado |
