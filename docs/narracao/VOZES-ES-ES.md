# Vozes da Espanha (castelhano) da biblioteca do Gemini TTS

Lista de `GET /v1beta/voices?language_code=es-ES` (2026-10-24, uma única listagem, gratuita), traduzida. São 22 vozes, todas marcadas com sotaque "Castilian Spanish" (castelhano da Espanha), sem sotaque regional; o código `es-ES` trouxe vozes, então não foi preciso tentar o `es` geral. A idade e a profissão são a persona que o Google atribui à voz (dica de timbre, não regra). Serve para escolher a narradora e o elenco da narração em espanhol (`dom-quixote/audio/narracao-es/elenco.json`).

## Femininas

| Voz | Idade | Tom | Persona | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `es-es-commercial-3` | 30 | média | influenciador(a) | calorosa e envolvente |
| `es-es-commercial-7` | 30 | média | influenciador(a) | rápida, articulada e enérgica |
| `es-es-concierge-3` | 24 | média | secretária(o) executiva | de quem acalma alguém aflito |
| `es-es-csagent-5` | 34 | média | atendente | segura e clara |
| `es-es-csagent-6` | 56 | grave | atendente | profissional, mas próxima |
| `es-es-podcaster-5` | 56 | grave | radialista | ressonante e espirituosa |
| `es-es-techagent-5` | 29 | média | suporte técnico | muito próxima |
| `es-es-training-12` | 47 | aguda | apresentador(a) de vídeo-aula | clara e simpática |
| `es-es-tutor-12` | 41 | média | terapeuta (persona "Storyteller & Narrator") | íntima, de programa de entrevistas |

## Masculinas

| Voz | Idade | Tom | Persona | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `es-es-advisor-2` | 38 | grave | advogada(o) | de igual para igual, curiosa |
| `es-es-advisor-9` | 44 | grave | advogada(o) | segura e clara |
| `es-es-assistant-3` | 59 | grave | irmã(o) | ressonante e espirituosa |
| `es-es-assistant-4` | 54 | grave | irmã(o) | clara e simpática |
| `es-es-concierge-12` | 27 | grave | guia de turismo | objetiva e direta |
| `es-es-concierge-4` | 35 | grave | guia de turismo | tranquila, segura e colaborativa |
| `es-es-csagent-3` | 32 | grave | vendedor(a) | envolvente e empática |
| `es-es-podcaster-7` | 51 | grave | radialista | objetiva e direta |
| `es-es-techagent-4` | 50 | grave | suporte técnico | calorosa e envolvente |
| `es-es-training-11` | 31 | grave | apresentador(a) de culinária | natural e clara |
| `es-es-training-3` | 44 | grave | apresentador(a) de culinária | calorosa e envolvente |
| `es-es-training-9` | 23 | grave | apresentador(a) de vídeo-aula | segura e clara |

## Neutra

| Voz | Idade | Tom | Persona | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `es-es-advisor-8` | 46 | grave | advogada(o) | de quem acalma alguém aflito |

## Elenco escolhido para a Parte 1 (Claude, 2026-10-24)

| Papel | Voz | Por quê |
| :--- | :--- | :--- |
| Narradora | `es-es-tutor-12` | a única voz feminina com a persona "Storyteller & Narrator"; 41 anos, tom médio, íntima e próxima: a que mais lembra uma contadora de histórias lendo para crianças (como a `pt-br-storyteller-9` do português) |
| Don Quijote | `es-es-assistant-3` | o homem mais velho da lista (59), grave, "ressonante e espirituosa": a mesma descrição da voz do Dom Quixote em português (`pt-br-concierge-3`); dá nobreza sem soar ridículo |
| Sancho Panza | `es-es-techagent-4` | 50 anos, grave, "calorosa e envolvente": um homem de meia-idade bonachão e simples, mais novo e mais leve que o Quixote e bem diferente da narradora |
