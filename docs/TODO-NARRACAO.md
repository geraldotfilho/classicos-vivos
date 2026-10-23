# 🎙️ TODO — Narração Gravada dos Livros (agente Gemini + modelo de voz)

O livro já sabe tocar narração gravada **frase por frase**, com o destaque da frase lida sincronizado e a **voz do aparelho como reserva** para qualquer frase ainda não gravada. Falta gravar. Este documento diz exatamente o quê, com qual voz e onde salvar.

> ⏳ **Quando fazer**: só depois de terminar a arte (P-001 e P-002 em `docs/fila/PEDIDOS.md`). Este trabalho é o pedido **P-006**.

---

## 0. Visão geral

| Narração | ID (pasta) | O que é |
| :--- | :--- | :--- |
| **Contadora de histórias** | `narradora` | Uma única voz feminina, calorosa, narra todo o texto (inclusive as falas dos personagens, com leve mudança de tom) |
| **Teatro de vozes** | `teatro` | A mesma narradora para a narração + **uma voz para cada personagem** nas falas com travessão |
| **Palavras-chave** | `palavras` | A pronúncia pausada de cada palavra em destaque (sílabas devagar e depois a palavra inteira), com a voz da narradora. Serve para as duas narrações |

**Entradas** (geradas pelo Claude, não edite): `docs/narracao/frases-dom-quixote-parte-N.json`, uma por parte. Cada frase traz:
```json
{ "id": "p2-s5", "pagina": 2, "texto": "como aparece no livro", "fala": "texto já preparado para falar", "hash": "6b19fbdf98" }
```
e cada palavra-chave traz:
```json
{ "slug": "estrelas", "palavra": "ESTRELAS", "silabas": "ES • TRE • LAS", "fala": "es... tre... las... estrelas!", "hash": "..." }
```

**Saídas** (você é o dono de `dom-quixote/audio/**`):
```text
dom-quixote/audio/
├── vozes.js                          # você acrescenta a parte em `partes` quando ela estiver completa
├── narradora/amostra.mp3             # amostra curta (FRASE DE AMOSTRA abaixo), usada no botão ▶ do painel
├── narradora/parte-N/<id>.mp3        # uma frase por arquivo: p0-s1.mp3, p0-s2.mp3, ...
├── narradora/parte-N/indice.json     # { "<id>": "<hash da frase gravada>" }
├── teatro/amostra.mp3
├── teatro/parte-N/<id>.mp3 + indice.json + roteiro.json
└── palavras/<slug>.mp3 + indice.json
```

---

## 1. Ferramenta e formato
- Use o **modelo de voz (TTS) mais recente do Gemini** com suporte a português do Brasil, a instruções de estilo e a **vários falantes** (até 2 por pedido). Registre em `ENTREGAS.md` o nome exato do modelo e das vozes usadas.
- **Antes de produzir em massa, confirme** que os termos de uso permitem distribuir os áudios num projeto aberto (CC BY 4.0) e anote a conclusão em `ENTREGAS.md`. Se não permitirem, pare e registre o bloqueio.
- O modelo devolve PCM 16 bits, 24 kHz, mono. Salve como **`.wav`** (com cabeçalho) ou **`.pcm`** (bruto) **com o nome final** (`p2-s5.wav`). Depois rode:
  ```bash
  npm run build:audio   # converte para MP3 (48 kbps mono), corta o silêncio das pontas e apaga os originais
  npm run build:sw
  ```
- **Uma frase por pedido ao modelo**, mas envie junto, como contexto (não para ler), as frases vizinhas da mesma página, para a entoação acompanhar a cena.

## 2. Voz da narradora (`narradora` e a parte narrada do `teatro`)
- **Voz sugerida**: uma voz pré-pronta feminina e calorosa (ex.: `Sulafat`, "warm", ou `Vindemiatrix`, "gentle"). Teste 2 ou 3, escolha a mais natural em português e **use sempre a mesma** em tudo.
- **Instrução de estilo** (envie em todo pedido):
  > Leia em português do Brasil, como uma contadora de histórias calorosa lendo em voz alta para crianças de 5 a 8 anos. Ritmo calmo e claro, com pausas naturais na pontuação. Entonação expressiva que acompanha a emoção da cena: alegria, suspense, humor e ternura, sem exagero teatral. Perguntas soam como perguntas; exclamações, com entusiasmo. Nas falas dos personagens, mude levemente o tom, sem imitar vozes.
- **Texto a enviar**: o campo `fala` da frase. Ele já vem limpo (sem travessões e com as palavras-chave em minúsculas). Não acrescente nem tire palavras.
- **FRASE DE AMOSTRA** (`amostra.mp3`): "Olá! Eu vou ler esta história com você. Vire a página quando quiser!"

## 3. Teatro de vozes (`teatro`)
1. **Roteiro primeiro**: para cada parte, monte `dom-quixote/audio/teatro/parte-N/roteiro.json`, dividindo cada frase em trechos de **narradora** e de **personagem** a partir do campo `texto`, que mantém os travessões. Use o contexto da página para saber quem fala:
   ```json
   { "p7-s5": [ { "falante": "SANCHO", "texto": "Que gigantes, meu senhor?" }, { "falante": "NARRADORA", "texto": "avisou Sancho." } ] }
   ```
   Frases sem fala de personagem têm um único trecho `NARRADORA`. **Não mude palavras**: só divida.
   ⚠️ **Falas continuam em frases sem travessão.** Exemplo (Parte 1): `p7-s4` "— Veja, amigo Sancho!" abre a fala de Dom Quixote, e `p7-s5` "A sorte guia nossos passos!" e `p7-s6` continuam sendo **Dom Quixote**, embora não tenham travessão. A fala só termina quando volta a narração ("— disse...", "exclamou") ou outro personagem começa. Leia a página inteira antes de atribuir.
2. **Elenco** (vozes pré-prontas sugeridas; troque por equivalentes se não existirem, mas mantenha a mesma voz para o mesmo personagem em todos os livros):
   | Personagem | Voz sugerida | Direção |
   | :--- | :--- | :--- |
   | NARRADORA | a mesma da `narradora` | como na seção 2 |
   | DOM QUIXOTE | `Gacrux` (madura) | avô sonhador, nobre e solene, palavras floreadas ditas com convicção, nunca ridículo |
   | SANCHO PANÇA | `Achird` (amigável) | lavrador simples, bem-humorado e afetuoso, fala direta e prática |
   | DULCINEIA / DOROTEIA / MICOMICONA / DUQUESA | `Leda` (jovem) | doce e esperta; como princesa, um pouco mais solene |
   | ESTALAJADEIRO / PADRE / BARBEIRO / DUQUE / VELHINHOS / SANSÃO | `Algieba` ou `Charon` | adulto cordial; o velhinho da bengala, mais rouco e apressado |
   | PASTORES / CRIADOS / CRIANÇAS / SANCHICA | `Puck` (animado) | leve e alegre |
   | TERESA PANÇA / SOBRINHA / GOVERNANTA | `Vindemiatrix` | maternal e carinhosa |
3. Gere cada frase com **no máximo 2 falantes por pedido** (narradora + 1 personagem). Se uma frase tiver dois personagens, gere em dois pedidos e junte os WAV na ordem antes de converter (sem pausa extra).
4. A `amostra.mp3` do teatro: o diálogo dos gigantes, de Dom Quixote e Sancho (Parte 1, `p7-s4` a `p7-s8`), num só arquivo.

## 4. Palavras-chave (`palavras`)
- Texto: o campo `fala` da palavra (ex.: "es... tre... las... estrelas!").
- Instrução de estilo:
  > Pronuncie em português do Brasil como uma professora alfabetizadora: sílaba por sílaba, devagar e bem separado, com uma pausa curta entre as sílabas; depois diga a palavra inteira, com alegria e naturalidade.
- Voz: a da narradora. Um arquivo por `slug`. Palavras repetidas entre as partes (ex.: `imaginacao`) são gravadas **uma vez só**.

## 5. Pronúncia dos nomes (confira em toda gravação)
| Escrita | Como soa |
| :--- | :--- |
| Quixote | ki-**XÓ**-te (o "x" como em "xícara") |
| La Mancha | lá **MAN**-cha |
| Rocinante | ro-si-**NAN**-te |
| Dulcineia, Toboso | dul-si-**NÊI**-a, to-**BÔ**-zo |
| Sancho Pança | **SAN**-cho **PAN**-sa |
| Cervantes | ser-**VAN**-tes |
| Mambrino, Micomicona, Micomicão | mam-**BRI**-no, mi-ko-mi-**KÔ**-na, mi-ko-mi-**KÃO** |
| Alifanfarrão, Pentapolim, Trapobana | a-li-fan-fa-**RRÃO**, pen-ta-po-**LIM**, tra-po-**BA**-na |
| Pandafilando da Fosca Vista | pan-da-fi-**LAN**-do da **FOS**-ca **VIS**-ta |
| Clavilenho, Barataria | cla-vi-**LE**-nho, ba-ra-ta-**RI**-a |
| Aldonza Lorenzo, Sansão Carrasco | al-**DON**-sa lo-**REN**-zo, san-**SÃO** ca-**RRAS**-co |
| Amadis, Montiel, Campo de Criptana | a-ma-**DIS**, mon-ti-**ÉL**, crip-**TA**-na |

Se o modelo errar um nome, reescreva só aquele trecho foneticamente no pedido (ex.: "Kixóte"), sem mudar o arquivo de frases.

## 6. Controle de qualidade (obrigatório antes de cada entrega)
1. **Transcreva** cada áudio gerado (fala → texto, com o próprio Gemini) e compare com o campo `fala`: as palavras precisam bater (diferenças só de pontuação). Regrave o que divergir.
2. **Duração**: entre 0,5 s e 25 s por frase; palavras-chave entre 1 s e 8 s.
3. **Ouça** (ou analise) as frases com nomes da tabela da seção 5 e as frases de diálogo.
4. Grave `indice.json` em cada pasta (`{ "p2-s5": "<hash>" }`) com o `hash` da frase no momento da gravação. Quando o texto do livro mudar, o Claude regenera os JSON: compare os hashes e **regrave só o que mudou**.
5. Quando **todas** as frases de uma parte estiverem gravadas numa voz, acrescente o número da parte em `partes` daquela voz em `dom-quixote/audio/vozes.js`. A partir daí ela aparece como opção no painel "Voz" do livro.

## 7. Ordem de produção e entregas
Uma entrega (um commit + uma linha em `ENTREGAS.md`) por item:
1. `narradora/amostra` + **Parte 1** completa na `narradora` + palavras-chave da Parte 1.
2. Partes 2, 3 e 4 na `narradora`, cada uma com suas palavras-chave.
3. `teatro`: roteiro + áudios, uma parte por vez (1 → 4), + `teatro/amostra`.

Tamanho esperado: ~20–40 KB por frase, ~6–8 MB por voz para os 4 livros. O tablet só baixa a voz escolhida, na primeira vez que ela toca.
