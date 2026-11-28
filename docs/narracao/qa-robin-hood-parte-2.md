# 🎧 QA da Narração — *Robin Hood*, Parte 2 (pt-BR)

- **Data**: 2026-11-27
- **Modelo**: `gemini-3.8-flash-tts` (Flex / Batch)
- **Elenco**: `robin-hood/audio/narracao/elenco.json` (Narradora + Robin, Mariana, João Pequeno, Grilo, Mestre Tomé, Clara `pt-br-csagent-12`, Xerife, Guarda da Praça `pt-br-tutor-7`, Vizinha Feirante `pt-br-tutor-5`, Guarda da Torre `pt-br-training-1`, Vovó `pt-br-training-11`, Menininho `pt-br-training-7`, Vizinho da Varanda `pt-br-csagent-9`)
- **Cobertura**: 14/14 páginas inteiras (`p0.mp3`..`p13.mp3`), palavras-chave da Parte 2 e falas das atividades.
- **Renumeração (2026-11-28, Issues #80 e #81)**: entrou o Cap. 17 (desempate) como pág. 6; as págs. 6 a 13 viraram 7 a 14 (MP3 e ids renomeados; a tabela abaixo já usa os números novos). As págs. 5 e 6 estão na voz do aparelho; a Parte 2 inteira aguarda regravação (caderno §4.5).
- **Conferência local**: Whisper `large-v3-turbo` (CUDA/GPU) + `audio_gate.py --verificar` (0 rajadas de ruído).

## Pontos para escuta do humano (avisos do Whisper)

Os avisos do Whisper na Parte 2 concentram-se em **nomes próprios** (*Xervedo* / *Nortigão*), **numerais romanos** (`Capítulo 19` → `xix`) e **onomatopeias** (bocejo, tosse, tambor, passos, ronco, espirro, brinde). Todas as marcas de tempo foram verificadas e têm duração compatível com o texto falado:

| Página | Frase | O que o Whisper ouviu / motivo | Ação recomendada |
| :--- | :--- | :--- | :--- |
| `p1` | `p1-s1` | "sherwood" (*Xervedo*) | Conferir pronúncia de *Xervedo* |
| `p3` | `p3-s3`, `p3-s7`, `p3-s14` | "bau" / "sherwood" / "nottingham" | Conferir nomes próprios |
| `p4` | `p4-s1`, `p4-s13` | "nottingham" e "tom tom tom" (tambor; reparado em emenda) | Ouvir o rufar do tambor |
| `p5` | `p5-s2`, `p5-s9`, `p5-s16` | `p5-s9` é `"Aaa… aaa…"` (1,90 s no áudio; Whisper transcreveu vazio); `p5-s16` é onomatopeia "craque" | **Áudio apagado em 2026-11-28**: o texto mudou (empate) e o "Aaa… aaa…" de Robin, sozinho num bloco longo, puxou a página para a voz dele (Issue #80; `TODO-NARRACAO.md` §11) |
| `p7` | `p7-s7`, `p7-s9`, `p7-s11`, `p7-s16` | `p7-s11` é `"Cof, cof, cof!"` (1,37 s no áudio; Whisper transcreveu vazio); "sherwood" | Ouvir `p7-s11` (tosse da farinha) |
| `p8` | `p8-s6`, `p8-s16` | "nortingham" e "toque toque toque" (`toc, toc, toc` dos guardas) | Áudio retirado em 2026-11-28 (texto novo, Issue #82) |
| `p9` | `p9-s0` | "capitulo xix" (numeral romano transcrito pelo Whisper) | Sem defeito esperado |
| `p11` | `p11-s10` | "rrronc, pfff, rrronc!" omitido na transcrição do Whisper (5,68 s de áudio) | Ouvir o ronco do guarda |
| `p12` | `p12-s1`, `p12-s4`, `p12-s14` | Ronco (`rrronc, pfff!`), espirro (`Atchinf!`, 10,11 s) e "shervinswood" (*Xervedo*) | Ouvir espirro do Guarda da Torre e *Xervedo* |
| `p14` | `p14-s7` | "tchim tchim" (canecas brindando) | Sem defeito esperado |
