# QA da narração — Parte 4 (nova, publicada em 2026-10-26)

> ✅ Escuta aprovada pelo humano em 2026-10-26. A pasta virou `narracao/parte-4/` na publicação; abaixo, o registro da produção (quando ainda era rascunho).

Gerado pelo Claude em 2026-10-26 (fase 6). Narradora `pt-br-storyteller-9` e vozes dos personagens (elenco em `tools/gravar-narracao.mjs`), modelo `gemini-3.8-flash-tts` no nível Flex. Páginas inteiras, marcadas e conferidas pelo Whisper local. Arquivos em `dom-quixote/audio/narracao/parte-4-rascunho/` (a Parte 4 publicada continua com a sua, em `parte-4/`).

**Como ouvir**: Para adultos → Livros em produção → "Mostrar os rascunhos" → nova Parte 4, e acrescente **`?narracao=1`** ao endereço (ex.: `dom-quixote/parte-4-rascunho.html?narracao=1`). Sem ele, o rascunho lê com a voz do aparelho.

## 2026-10-26 — parte completa
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| Páginas `p0` a `p11` (12 páginas, 220 frases, com títulos; ~24 min) | ✅ todas as frases marcadas e conferidas | as **vozes novas** (abaixo) e as páginas com muita troca de voz: `p4` (cap. 26, 9 trechos Sancho ↔ Dom Quixote ↔ padre) e `p2` (cap. 24, 6 trechos) |
| `p5-s15` (fim do cap. 27) | ⚠️ a voz disse "hum, hum, hum" em vez de "hum-hum" | serve; só confira se não soa estranho |
| `p7` (cap. 29) | ↻ na 1ª tentativa, a voz pulou quatro frases do meio; a 2ª veio completa (a conferida) | ouça a página inteira, com a cabra ("méééé", na voz da narradora) |
| palavras-chave novas (34) | ✅ conferidas | `sede` e `reverencia` (o Whisper ouviu "C, D, sede" e só "reverência": provavelmente certas, mas confira as sílabas), `lanche` (2 tentativas) |

### Vozes novas (escolhidas pelo Claude no catálogo, `docs/narracao/VOZES-PT-BR.md`)
| Personagem | Voz | Onde ouvir |
| :--- | :--- | :--- |
| Mestre Nicolau | `storyteller-4` (47, humorista) | `p2` ("Vamos votar, minha gente!") |
| Mestre Nicolau fantasiado de mago | a mesma, lenta e teatral | `p3` (a profecia em versos) |
| Barbeiro da bacia | `techagent-4` (a mesma voz da Parte 2) | `p2` |
| Pastor Eugênio | `storyteller-6` (27) | `p7` |
| Velhinho da romaria | `tutor-8` (65) | `p9` ("Ora, se não é o Seu Alonso…") |
| Sobrinha Antônia | `podcaster-4` (26) | `p10` |
| Povo (viajantes da pousada e vizinhos da aldeia) | `csagent-8` (45, enérgica) | `p2` ("É um elmo!") e `p10` ("Olha quem chegou!") |

Doroteia, padre, Teresa, Dom Quixote e Sancho mantêm as vozes de sempre. A voz das fadas dentro da história do cap. 28 é a de Dom Quixote, que está contando a história.

## Gasto
| Rodada | Pedidos | US$ (Flex) |
| :--- | :--- | :--- |
| Páginas, 1ª rodada (parou na cota diária de 100 pedidos) | 33 | 0,1130 |
| Páginas, 2ª rodada (os blocos já pagos vieram do cache) | 18 | 0,0575 |
| Palavras-chave em grupos | 4 | 0,0195 |
| Palavras-chave uma a uma (fome, sede, honra, lanche, reverência) | 8 | 0,0058 |
| **Total** | **63** | **~0,20** |
