# QA da narração — Parte 1

Gerado pelo Claude a cada lote de `npm run gravar:narracao`. Lista só o que precisou de atenção. O resto passou na conferência por transcrição na primeira tentativa (no começo, pela API; desde a página 4, pelo Whisper local).

Voz: `narracao` = narradora `pt-br-storyteller-9`, Dom Quixote `pt-br-concierge-3`, Sancho `pt-br-storyteller-2`, modelo `gemini-3.8-flash-tts`.

## 2026-10-24 — capa e Capítulo 1 (páginas 0 e 1) + palavras-chave dessas páginas
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p0-s1` … `p1-s4` (9 frases) | ✅ todas bateram com o texto, incluindo "Alonso Quixano" e "La Mancha" | ritmo e entonação |
| `amostra` | ✅ na 2ª tentativa (a 1ª disse "essa" em vez de "esta") | — |
| `palavras/rocinante` | ⚠️ guardada a melhor de 3. A transcrição ouviu "ho ci nan te Hocinante": provavelmente o R inicial brasileiro (som de H), que está certo | confira se soa "ro-ci-NAN-te" e não "ro-chi-…" |
| `palavras/imaginacao` | ✅, mas tem 10,6 s (5 sílabas bem pausadas + a palavra) | está lenta demais? |
| `palavras/leao-guardiao` | ✅ na 2ª tentativa (a 1ª pulou as sílabas) | — |

## 2026-10-24 — página 3 (`p2`, Capítulo 2) em teste: página inteira num pedido só
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p2.mp3` (54 s, 6 frases) | ✅ 1ª tentativa: os 6 trechos, transcritos em separado, bateram com as frases (texto e marcação certos) | a cadência ficou mais natural que nas páginas frase a frase? |
| `p2-s1` | ✅ regravada com a voz de **Dom Quixote** e emendada (ver abaixo) | — |

## 2026-10-24 — Parte 1 completa (páginas inteiras, títulos, elenco, palavras-chave)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p0-s0`, `p1-s0` (títulos da capa e do Cap. 1) | ✅ avulsas, frase por frase, como o resto dessas páginas | — |
| `p2` (Cap. 2) | ✅ título + fala de **Dom Quixote** gravados avulsos e emendados no início do áudio já aprovado, sem recodificar. Marcas conferidas pelo Whisper | a 1ª fala do Quixote: a voz combina? |
| `p3` … `p7` (Caps. 3 a 7) | ✅ páginas inteiras com título. `p6` tem Dom Quixote; `p7`, Dom Quixote e Sancho (2 blocos) | as vozes de Dom Quixote e Sancho; a passagem entre os dois blocos da `p7` (pausa de 0,3 s) |
| `p3`, `p7` | ↻ uma regravação cada, por falso alarme da conferência ("Dulcinea del Toborso", "30 ou 40"). A comparação já foi corrigida | — |
| palavras-chave (25 novas, 30 no total) | ✅ `corcel`, `dulcineia` e `burrico` na 2ª tentativa (a 1ª pulou sílabas) | "cor-séu": o L final soa como U, o que é o certo no Brasil |
