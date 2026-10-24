# QA da narração em francês (fr-FR) — Parte 1

Gerado pelo Claude (diretor da narração em francês) com `npm run gravar:narracao -- --idioma fr`. Conferência local pelo Whisper (`whisper-large-v3-turbo`, de graça). Lista o que precisa de atenção; o resto passou na primeira tentativa.

Voz: `narracao-fr` = narradora `fr-fr-tutor-4`, Dom Quixote `fr-fr-assistant-4`, Sancho `fr-fr-training-2`, modelo `gemini-3.8-flash-tts`, nível Flex. Catálogo: `docs/narracao/VOZES-FR-FR.md` (81 vozes, todas "Paris French").

## Elenco e motivo
| Papel | Voz | Persona do catálogo | Por quê |
| :--- | :--- | :--- | :--- |
| Narradora | `fr-fr-tutor-4` | 41 anos, tom médio, terapeuta/coach, "calorosa e envolvente" | Calorosa e calma, tom médio (nem aguda nem grave), na mesma idade e espírito da narradora do português (`pt-br-storyteller-9`, 50, "calorosa e envolvente"). As vozes com persona "Storyteller" do francês são "enérgicas, coloridas e rápidas" (`assistant-6`, `training-5`) ou de apresentadora de culinária, rápidas demais para crianças de 5 a 8 anos. |
| Dom Quixote | `fr-fr-assistant-4` | homem, 61 anos, grave, "segura e clara" | A voz masculina mais velha da biblioteca, grave e firme: dá o tom nobre e convicto das proclamações ("Voici que se dressent là-bas de démesurés géants…") sem cair no ridículo. |
| Sancho | `fr-fr-training-2` | homem, 49 anos, grave, "ressonante e espirituosa" | Meia-idade e bem-humorado, como o Sancho do português (`pt-br-storyteller-2`, 49, humorista). Doze anos mais novo que o Quixote, com outra cor de voz. |
| Palavras-chave | `fr-fr-tutor-4` (a narradora) | estilo "professora alfabetizadora" | Como no português: a mesma voz que lê a história ensina as sílabas. |

Os estilos (em `dom-quixote/audio/narracao-fr/elenco.json`) citam "French from France". Frase de amostra: « Bonjour ! Je vais lire cette histoire avec toi. Tourne la page quand tu veux ! »

## Roteiro (`narracao-fr/parte-1/roteiro.json`)
Só Dom Quixote e Sancho falam na Parte 1 francesa, como no português. As falas intercaladas dentro dos guillemets são da narradora: « Mon fidèle ami, *dit le chevalier*, viens avec moi… » (`p6-s2`), « …de bravoure ! » *pensa le gentilhomme* (`p2-s1`), « Quels géants, mon seigneur ? *avertit Sancho* » (`p7-s7`). As falas que continuam sem guillemets até o fecho (`p6-s3`, `p7-s5`, `p7-s6`, `p7-s8`) seguem com o personagem. `p3-s4` (« Donne-lui une douce pomme… ») fala com a criança: fica com a narradora, como no português.

## 2026-10-24 — páginas inteiras (`p0` a `p7`)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p0.mp3` … `p7.mp3` (8 páginas, 9 pedidos; `p7` em 2 blocos) | ✅ todas na 1ª tentativa, sem aviso: os trechos de cada frase, transcritos em separado, bateram com o texto e as marcas foram para `paginas.json` | ritmo e calor da narradora |
| `p2-s1`, `p6-s2`, `p6-s3`, `p7-s4`…`p7-s6` | ✅ vozes de **Dom Quixote** | o Quixote soa nobre, e não velho cansado? A troca para "dit le chevalier" no meio da fala (`p6-s2`) ficou natural? |
| `p7-s7`, `p7-s8` | ✅ voz de **Sancho** | Sancho soa diferente do Quixote? A passagem entre os dois blocos da `p7` |
| nomes próprios | ✅ passaram pelo Whisper (com dica de nomes) | conferir de ouvido: "Quichano" (ki-cha-NO), "Rossinante", "Dulcinée du Toboso", "Montiel", "Campo de Criptana", "Sancho Pança" (o ç: "pan-SSA") |
| `p0-s0` | título com "Partie 1 :" | — |

## 2026-10-24 — palavras-chave (30 no total)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| 23 palavras (1ª rodada, 3 pedidos) | ✅ | `imagination` tem 10,6 s (5 sílabas pausadas): lenta demais? |
| `pleine-lune`, `ane` (rodada extra, grupos de 4) | ✅ | — |
| `pomme`, `ile` | ❌ **pendentes**. O corte falhou nas duas rodadas: o Whisper ouve "pum pum"/"bam bam" e "il" em vez de "pomme" e "île". Provavelmente a voz está certa e o Whisper erra palavras de uma sílaba sozinhas; a regra `parecidas` só tolera 1 letra de diferença em palavras de 4+ letras, então "île"→"il" reprova | — |
| `moulins`, `vent`, `geants` | ❌ **pendentes**: o grupo da rodada extra bateu na cota diária (429, 100 pedidos/dia) | — |

## 2026-10-24 — amostra do painel
| Item | Situação |
| :--- | :--- |
| `narracao-fr/amostra.mp3` | ❌ **pendente**: cota diária esgotada (429) |

## Pendências para a próxima rodada (cota renova às 07:00 UTC)
1. `npm run gravar:narracao -- --voz narracao --idioma fr --amostra --autorizado` (1 pedido).
2. `npm run gravar:narracao -- --voz palavras --idioma fr --parte 1 --autorizado` grava só as 5 que faltam (`pomme`, `ile`, `moulins`, `vent`, `geants`). A rodada extra permitida já foi usada: a decisão de gastar mais 1–2 pedidos é do coordenador/humano. Para `pomme` e `ile`, o problema é a conferência de palavras de uma sílaba, e não a voz: regravar sem mexer na conferência deve falhar de novo.
