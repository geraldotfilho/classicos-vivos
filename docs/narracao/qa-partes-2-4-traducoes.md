# QA da narração em inglês, francês e espanhol — Partes 2 a 4

Gravada pelo Claude em 2026-10-27, com autorização do humano (teto de R$ 50/mês), por `tools/gravar-fila-traducoes.sh` (`npm run gravar:narracao -- --idioma en|fr|es`): páginas inteiras, Flex, conferência local pelo Whisper (`CV_IDIOMA` e os nomes próprios do `elenco.json` de cada idioma). Estado de cada parte e idioma: `node tools/conferir-narracao.mjs`. Decisões e método: `docs/TODO-NARRACAO.md` (itens 17 a 19) e `docs/RECEITA-CLASSICO-VIVO.md` §6.4.

**Quem fala** (`narracao-<idioma>/parte-N/roteiro.json`): derivado do roteiro em português por `tools/derivar-roteiro.mjs` e escrito à mão onde a tradução cortou as frases de outro jeito (o francês quase não marca o narrador no meio da fala; o espanhol não marca a fala que continua na frase seguinte). Como no português, o "méééé" da cabra e as falas dentro da história do lago ficam com a narradora e com Dom Quixote.

### Elenco em inglês (en-GB)

| Papel | Voz | Idade · tom · persona |
| :--- | :--- | :--- |
| Narradora | `en-gb-storyteller-2` | 51 · aguda · narrador(a) de documentário de natureza |
| Dom Quixote | `en-gb-storyteller-4` | 56 · grave · narrador(a) de documentário de natureza |
| Sancho | `en-gb-advisor-2` | 44 · média · advogada(o) · contador(a) de histórias |
| Pastor (Parte 2) | `en-gb-csagent-3` | 62 · média · atendente |
| Barbeiro de Mambrino (Parte 2) | `en-gb-training-12` | 41 · grave · apresentador(a) de vídeos didáticos |
| Padre (Partes 3 e 4) | `en-gb-tutor-9` | 46 · grave · conselheira(o) · contador(a) de histórias |
| Doroteia / Micomicona (Partes 3 e 4) | `en-gb-commercial-9` | 25 · média · influenciador(a) |
| Estalajadeiro (Parte 3) | `en-gb-advisor-9` | 50 · grave · advogada(o) |
| Barbeiro da bacia (Parte 4; mesma voz do barbeiro, indignado) | `en-gb-training-12` | 41 · grave · apresentador(a) de vídeos didáticos |
| Mestre Nicolau (Parte 4) | `en-gb-tutor-2` | 42 · média · personal trainer · contador(a) de histórias |
| Mestre Nicolau mago (Parte 4; mesma voz, teatral) | `en-gb-tutor-2` | 42 · média · personal trainer · contador(a) de histórias |
| Pastor Eugênio (Parte 4) | `en-gb-commercial-7` | 27 · grave · influenciador(a) |
| Velhinho da romaria (Parte 4) | `en-gb-concierge-10` | 64 · grave · concierge de hotel |
| Sobrinha Antônia (Parte 4) | `en-gb-commercial-1` | 23 · aguda · influenciador(a) |
| Teresa Pança (Parte 4) | `en-gb-assistant-7` | 47 · grave · mãe/pai |
| Povo (Parte 4) | `en-gb-csagent-10` | 47 · média · atendente |

### Elenco em francês (fr-FR)

| Papel | Voz | Idade · tom · persona |
| :--- | :--- | :--- |
| Narradora | `fr-fr-tutor-4` | 41 · média · terapeuta |
| Dom Quixote | `fr-fr-assistant-4` | 61 · grave · irmã(o) |
| Sancho | `fr-fr-training-2` | 49 · grave · apresentador(a) de culinária |
| Pastor (Parte 2) | `fr-fr-tutor-6` | 59 · grave · professor(a) |
| Barbeiro de Mambrino (Parte 2) | `fr-fr-csagent-2` | 28 · grave · atendente |
| Padre (Partes 3 e 4) | `fr-fr-podcaster-12` | 55 · grave · entrevistador(a) de podcast |
| Doroteia / Micomicona (Partes 3 e 4) | `fr-fr-advisor-9` | 29 · média · consultor(a) financeiro |
| Estalajadeiro (Parte 3) | `fr-fr-podcaster-4` | 51 · grave · radialista |
| Barbeiro da bacia (Parte 4; mesma voz do barbeiro, indignado) | `fr-fr-csagent-2` | 28 · grave · atendente |
| Mestre Nicolau (Parte 4) | `fr-fr-tutor-1` | 42 · grave · personal trainer |
| Mestre Nicolau mago (Parte 4; mesma voz, teatral) | `fr-fr-tutor-1` | 42 · grave · personal trainer |
| Pastor Eugênio (Parte 4) | `fr-fr-podcaster-8` | 28 · grave · entrevistador(a) de podcast |
| Velhinho da romaria (Parte 4) | `fr-fr-tutor-7` | 61 · grave · professor(a) |
| Sobrinha Antônia (Parte 4) | `fr-fr-assistant-12` | 22 · aguda · melhor amiga(o) |
| Teresa Pança (Parte 4) | `fr-fr-csagent-6` | 35 · aguda · atendente |
| Povo (Parte 4) | `fr-fr-concierge-6` | 42 · média · concierge de hotel |

### Elenco em espanhol (es-ES)

| Papel | Voz | Idade · tom · persona |
| :--- | :--- | :--- |
| Narradora | `es-es-tutor-12` | 41 · média · terapeuta (persona "Storyteller & Narrator") |
| Dom Quixote | `es-es-assistant-3` | 59 · grave · irmã(o) |
| Sancho | `es-es-techagent-4` | 50 · grave · suporte técnico |
| Pastor (Parte 2) | `es-es-podcaster-7` | 51 · grave · radialista |
| Barbeiro de Mambrino (Parte 2) | `es-es-training-11` | 31 · grave · apresentador(a) de culinária |
| Padre (Partes 3 e 4) | `es-es-training-3` | 44 · grave · apresentador(a) de culinária |
| Doroteia / Micomicona (Partes 3 e 4) | `es-es-commercial-3` | 30 · média · influenciador(a) |
| Estalajadeiro (Parte 3) | `es-es-advisor-9` | 44 · grave · advogada(o) |
| Barbeiro da bacia (Parte 4; mesma voz do barbeiro, indignado) | `es-es-training-11` | 31 · grave · apresentador(a) de culinária |
| Mestre Nicolau (Parte 4) | `es-es-advisor-2` | 38 · grave · advogada(o) |
| Mestre Nicolau mago (Parte 4; mesma voz, teatral) | `es-es-advisor-2` | 38 · grave · advogada(o) |
| Pastor Eugênio (Parte 4) | `es-es-concierge-12` | 27 · grave · guia de turismo |
| Velhinho da romaria (Parte 4) | `es-es-assistant-4` | 54 · grave · irmã(o) |
| Sobrinha Antônia (Parte 4) | `es-es-techagent-5` | 29 · média · suporte técnico |
| Teresa Pança (Parte 4) | `es-es-training-12` | 47 · aguda · apresentador(a) de vídeo-aula |
| Povo (Parte 4) | `es-es-commercial-7` | 30 · média · influenciador(a) |


Voz nova ≠ aprovada: **o humano ainda não ouviu estas vozes**. Todas são da biblioteca de cada idioma (nenhuma criada por descrição). Na ordem de importância para a escuta: a narradora e os dois protagonistas já foram aprovados na Parte 1; os personagens novos (pastor, barbeiro, padre, Doroteia, estalajadeiro, Nicolau, Eugênio, velhinho, sobrinha, Teresa, povo) são escolha do Claude pelas descrições do catálogo.

## Parte 2 (2026-10-27) — completa nos três idiomas
| Idioma | Pedidos de voz (narração) | Observações para a escuta |
| :--- | :--- | :--- |
| en | 12 + 1 reparo | a voz pulou a frase longa `p7-s8` ("When he saw that he had been scared for nothing, Sancho couldn't help it…"): foi pedida de novo sozinha e emendada (reparo cirúrgico); confira a emenda no meio da página 8 do livro (o capítulo 14) |
| fr | 12 + 4 (+1 reparo) | o bloco 5 teve a primeira frase pulada duas vezes (instrução "Aide à mettre la table des chevriers !"), antes de existir o reparo: foi regravado só o que faltava. Confira `p3-s7` e `p4-s6` ("Mais, mon seigneur…": o Whisper ouviu "ouais" na primeira passada, que gerou um reparo) |
| es | 10 | `p4-s6`: uma palavra diferente na conferência ("…solo un montón de…", provavelmente o "méééé" da cabra) |
Títulos de capítulo ("Chapitre xi", "Chapter 14"): o Whisper escreve numerais romanos e algarismos de outro jeito que o texto; não é erro de voz.

## Parte 3 (2026-10-27) — completa nos três idiomas
| Idioma | Pedidos de voz | Observações para a escuta |
| :--- | :--- | :--- |
| en | 6 (as páginas 2 a 4 já estavam; um bloco teve 3 frases seguidas puladas e foi reparado) | `p4` (o começo do capítulo 19, depois do bloco de Sancho): confira a emenda do título e das duas primeiras frases |
| fr | 11 | sem defeitos além dos numerais romanos dos títulos |
| es | 11 | sem avisos |
Vozes novas da Parte 3: Padre, Doroteia/Micomicona e Estalajadeiro (tabelas acima).

## Palavras-chave (Partes 2 a 4 juntas, 25 por pedido)
4 pedidos por idioma + repescagens. Algumas pronúncias o Whisper escreve de outro jeito ("dew ty" para *duty*, "hunga" para *hunger*, "fay mus" para *famous*): o corte foi aceito porque a forma (sílabas + palavra inteira) confere, mas **vale ouvir**: en `duty`, `battle`, `hunger`, `famous`; fr `laiton`, `mages`, `bâton`, `paysans`, `village`, `fou-rire`, `armes`, `glands`; es `tac-tac`.

Sem gravação (ficam com a voz do aparelho, que fala só a palavra inteira): **fr** `armees` (Parte 2), `heaume` e `faim` (Parte 4); **es** `cayado` e `flores` (Parte 4). Para tentar de novo, uma por pedido: `npm run gravar:narracao -- --voz palavras --idioma fr --parte 2,3,4 --agrupar 1 --autorizado`.

## Gasto (linhas de `docs/narracao/gastos.csv` de 2026-10-27)
Ver o fim do arquivo; o total é atualizado a cada parte entregue (abaixo).

