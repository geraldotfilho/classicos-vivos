# QA da narração em inglês — Parte 1

Gravada pelo Claude em 2026-10-24 com `npm run gravar:narracao -- --idioma en` (página inteira, Flex, conferência local pelo Whisper com `CV_IDIOMA=en` e os nomes próprios do `elenco.json`). Esta lista traz só o que precisou de atenção. O resto passou na conferência na primeira tentativa.

Voz: `narracao-en` = narradora `en-gb-storyteller-2`, Dom Quixote `en-gb-storyteller-4`, Sancho `en-gb-advisor-2`, modelo `gemini-3.8-flash-tts`. Catálogo traduzido: `docs/narracao/VOZES-EN-GB.md`.

## Elenco e motivo
Todas as vozes são da biblioteca `en-GB` (117 vozes, todas com sotaque regional britânico). Nenhuma foi criada por descrição.

| Papel | Voz | Por quê |
| :--- | :--- | :--- |
| Narradora | `en-gb-storyteller-2` (51 anos, aguda, Winchester) | É a única voz feminina com persona "Storyteller & Narrator" no sotaque de Winchester, o inglês do sul da Inglaterra, o mais próximo do padrão dos audiolivros infantis britânicos. A descrição é "ressonante e espirituosa", boa para ler em voz alta com expressão. Corresponde à `pt-br-storyteller-9` do português. |
| Dom Quixote | `en-gb-storyteller-4` (56 anos, grave, Bristol) | É um homem mais velho, de voz "grave, aveludada e sem pressa", com persona de narrador: soa nobre e sonhador, nunca ridículo. Contrasta com a narradora, que é aguda. |
| Sancho | `en-gb-advisor-2` (44 anos, média, Manchester) | É de meia-idade e "muito próxima", também com persona de contador de histórias. O tom médio e o sotaque do norte da Inglaterra (caloroso e simples) o separam de Dom Quixote, que é grave e vem do sudoeste. |

O estilo de cada um está em `dom-quixote/audio/narracao-en/elenco.json`. Na Parte 1 em inglês, só Dom Quixote e Sancho falam, como no português (`p2-s1`, `p6-s2`, `p6-s3`, `p7-s4` a `p7-s6` são de Dom Quixote; `p7-s7` e `p7-s8`, de Sancho). Roteiro: `narracao-en/parte-1/roteiro.json`.

## 2026-10-24 — Parte 1 completa (páginas inteiras, palavras-chave, amostra)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p0` … `p6` (49,7 a 65,9 s) | ✅ 1ª tentativa, 1 bloco cada. `p2` e `p6` têm Dom Quixote | o sotaque da narradora; nomes: "Alonso Quixano", "Miguel de Cervantes", "Aldonza Lorenzo", "Dulcinea of El Toboso", "Montiel" |
| `p7` (67,7 s, 2 blocos) | ✅ O bloco 1 (narradora + Quixote) foi para a 2ª tentativa: o Whisper ouviu "the **jewel** of the windmills" no título (`p7-s0`). Provavelmente era falso alarme ("duel"), mas a 2ª passou limpa | o título "The Duel of the Windmills!" (diz *duel*?); a passagem entre os blocos (pausa de 0,3 s); "Campo de Criptana" |
| `p2-s1`, `p6-s2` | ✅ falas de Dom Quixote emendadas na narração ("thought the gentleman…", "said the knight,") | a troca de voz no meio da frase soa natural? |
| `p7-s7`, `p7-s8` | ✅ Sancho ("What giants, my lord?") | Sancho soa claramente diferente de Dom Quixote? |
| palavras-chave (31) | ✅ 26 na 1ª rodada (4 pedidos) e 5 na rodada extra (1 pedido): `windmills`, `basin`, `castle`, `trumpets`, `knights` | — |
| `windmills`, `knights` (1ª rodada) | ⚠️ recusadas porque o trecho continha outra palavra-chave do mesmo grupo: "windmills" contém "wind", e "knights" contém "knight". **É uma limitação da conferência do script** (ver abaixo), não da voz. Na rodada extra elas ficaram num grupo sem `wind`/`knight` e passaram | — |
| `basin`, `castle`, `trumpets` (1ª rodada) | ⚠️ corte errado ("bay sin", "cass", "tall castle trumpets"); regravadas e cortadas certo na rodada extra | `basin`: "BAY-sin" está certo |
| `armour` | ⚠️ salva por ser a última do grupo, mas o Whisper ouviu "amor amor". No inglês britânico, sem o R, "armour" soa "AH-muh", e o Whisper confunde | confira se diz "ar… mour… armour" completo, sem cortar a sílaba |
| `rocinante`, `dulcinea`, `don-quixote`, `sancho-panza` | ✅ | pronúncia inglesa dos nomes espanhóis ("Don Ki-HO-tee" ou "Don KWIX-ote"?); para o livro, qualquer uma serve, desde que seja a mesma da narração |
| `amostra` | ✅ 1ª tentativa (7,6 s): "Hello! I'm going to read this story with you. Turn the page whenever you like!" | — |

## Gasto (linhas de `gastos.csv` com `--idioma en`)
| Rodada | Pedidos | Tokens de áudio | US$ |
| :--- | :--- | :--- | :--- |
| páginas (8 páginas, 9 blocos + 1 regravação) | 10 | 13 497 | 0,0614 |
| palavras-chave | 4 | 3 332 | 0,0151 |
| palavras-chave pendentes | 1 | 529 | 0,0024 |
| amostra | 1 | 194 | 0,0009 |
| **Total** | **16** | **17 552** | **~0,080** |

## Defeitos do script notados (não corrigidos: `tools/` é compartilhado)
1. **Conferência das palavras agrupadas** (`cortarPalavras`): o teste de "intrusa" procura cada outra palavra do grupo como **substring** do trecho. Por isso, uma palavra-chave que contém outra (`windmills` ⊃ `wind`, `knights` ⊃ `knight`) é sempre recusada quando as duas caem no mesmo grupo. Isso custa uma rodada extra. Correção sugerida: ignorar como intrusa uma palavra que seja substring da própria palavra do item, ou separar essas palavras em grupos diferentes.
2. **O estilo `PALAVRAS` do `elenco.json` não é usado nas palavras agrupadas**: `gravarPalavrasAgrupadas` passa a constante `ESTILO_PALAVRAS` em vez de `cfg.estilo` (que lê `ELENCO.PALAVRAS.estilo`). No inglês, o efeito é só a ausência de "British English" no estilo. A voz já é britânica e o resultado ficou bom.
