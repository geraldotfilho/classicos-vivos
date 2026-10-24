# QA da narração em espanhol — Parte 1

Gerado pelo Claude (diretor da narração em espanhol) com `npm run gravar:narracao -- --idioma es`. Conferência local pelo Whisper (`whisper-large-v3-turbo`, idioma `es`, com os nomes próprios do `elenco.json` como dica). Lista só o que precisa de atenção.

Voz: `narracao-es` = narradora `es-es-tutor-12`, Don Quijote `es-es-assistant-3`, Sancho `es-es-techagent-4`, modelo `gemini-3.8-flash-tts` (Flex). Catálogo e motivos: [`VOZES-ES-ES.md`](VOZES-ES-ES.md).

## Elenco e por quê
| Papel | Voz | Motivo |
| :--- | :--- | :--- |
| Narradora | `es-es-tutor-12` (41, média) | a única voz feminina com persona "Storyteller & Narrator"; próxima e íntima, boa para ler em voz alta para crianças de 5 a 8 anos |
| Don Quijote | `es-es-assistant-3` (59, grave) | o homem mais velho do catálogo, "ressonante e espirituosa", a mesma descrição da voz do Quixote em português; nobre e sonhador, sem caricatura |
| Sancho | `es-es-techagent-4` (50, grave) | "calorosa e envolvente": meia-idade, bonachão e simples; mais novo e mais leve que o Quixote |

Só Don Quijote e Sancho falam na Parte 1 em espanhol (o ventero não tem fala direta), como no português. O roteiro está em `dom-quixote/audio/narracao-es/parte-1/roteiro.json`.

## 2026-10-24 — páginas inteiras (`p0` … `p7`)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| `p0` … `p7` (51 frases, 9 blocos) | ✅ todas na 1ª tentativa, sem nenhum aviso da conferência; marcação das frases em `paginas.json` | ritmo e calor da narradora; o sotaque castelhano (o "z/c" interdental em "corazón", "Mancha", "zanahoria") |
| `p2-s1`, `p6-s2`, `p6-s3` | ✅ falas de **Don Quijote** no mesmo pedido da narradora | a primeira fala do Quixote: a voz combina com um fidalgo velho e sonhador? |
| `p7` (2 blocos: Quixote, depois Sancho) | ✅ | a passagem entre os blocos (antes de "¿Qué gigantes, mi señor?"); "desaforados gigantes" e "vuestra merced" com o sabor clássico |
| `p7-s4`, `p7-s5`, `p7-s7` | ✅, mas curtas (2,1 s, 2,6 s e 1,9 s) | se o destaque da frase acompanha bem |
| Nomes próprios (`Alonso Quijano`, `Dulcinea del Toboso`, `Aldonza Lorenzo`, `Montiel`, `Campo de Criptana`) | ✅ a transcrição bateu | pronúncia de "Criptana" e "Toboso" |
| Fórmulas de Cervantes (`p1-s1` "En un lugar de la Mancha…", `p5-s4` "La del alba sería…", `p0-s3` "desfacer agravios y enderezar entuertos") | ✅ | se soam naturais e calorosas, não declamadas |

## 2026-10-24 — palavras-chave e amostra (incompleto: cota diária esgotada)
| Item | Situação | Para o humano ouvir |
| :--- | :--- | :--- |
| grupo 1 (10): `imaginacion`, `rocinante`, `caballeros`, `libros`, `leon-guardian`, `don-quijote`, `armadura`, `bacia`, `escudo`, `lanza` | ✅ todas cortadas e conferidas | `imaginacion` tem 9,3 s (5 sílabas pausadas + a palavra): lenta demais? |
| grupo 2 (10): `yelmo-de-oro` … `sopa` | ⏳ **pendente**: `429 cota esgotada` (100 pedidos/dia do Tier 1) | — |
| grupo 3 (10): `luna-llena` … `gigantes` | ⏳ **pendente**: mesmo motivo | — |
| `amostra.mp3` (painel "Voz") | ⏳ **pendente**: não foi pedida depois da cota esgotada | — |

Para terminar (depois das 07:00 UTC, quando a cota renova), 3 pedidos:
```bash
npm run gravar:narracao -- --voz palavras --idioma es --parte 1 --autorizado    # só os 20 pendentes (o hash pula os 10 prontos)
npm run gravar:narracao -- --voz narracao --idioma es --amostra --autorizado
```

## Observação técnica
- No modo agrupado das palavras-chave, o script usa a constante `ESTILO_PALAVRAS` (`tools/gravar-narracao.mjs`, linhas ~787 e ~797) e **não** o `elenco.PALAVRAS.estilo` do `elenco.json`. Assim, o estilo "kind literacy teacher in Castilian Spanish from Spain…" não foi enviado; foi o estilo padrão em inglês sem sotaque. A voz é `es-es` e as 10 palavras passaram na conferência, então não há prejuízo audível esperado, mas vale corrigir no script (dono: o coordenador).
