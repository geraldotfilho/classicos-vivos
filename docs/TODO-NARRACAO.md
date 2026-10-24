# 🎙️ TODO — Narração Gravada dos Livros (Claude + API de voz do Gemini)

O livro já sabe tocar narração gravada **frase por frase**, com o destaque da frase lida sincronizado e a **voz do aparelho como reserva** para qualquer frase ainda não gravada. Falta gravar. Este documento diz exatamente o quê, com qual voz e onde salvar.

> 👤 **Quem faz**: o **Claude**, chamando a API do Gemini (chave num segredo de rede do ambiente) numa sessão própria, **em paralelo** à arte, que segue com o agente Gemini. Decisão do responsável humano em 2026-10-23. Pedido **P-006**. A execução pela API está na seção 8; o ponto de partida, em [`RETOMADA.md`](RETOMADA.md).

---

## ⭐ Decisões do humano (2026-10-24), valem mais que o resto deste arquivo
1. **Uma voz por vez no livro.** Não há mais duas narrações (`narradora` e `teatro`): há **uma** narração, a pasta `dom-quixote/audio/narracao/`, com a **narradora** (`pt-br-storyteller-9`, a "Teste A") para o texto narrado e **vozes próprias para as falas dos personagens**.
2. **O elenco dos personagens é escolhido com o humano.** Ao chegar à primeira frase com fala de personagem (`p2-s1` da Parte 1, Dom Quixote), **pare** e converse com ele antes de gravar. A tabela da seção 3 é só sugestão. O catálogo traduzido das vozes está em `docs/narracao/VOZES-PT-BR.md`.
3. **Liberar aos poucos**, como `previa` no `vozes.js`, e pedir escuta a cada novidade (voz, estilo, entonação).
4. Ficaram para depois: outras vozes de narradora e uma voz com **sotaque pernambucano** (seria por voice design, já que a biblioteca não tem sotaque regional).
5. O plano pago da API foi ativado (fim do limite de 10 pedidos por dia).
6. **Em teste (2026-10-24): página inteira num pedido só** (`--pagina-inteira`), para a cadência e a entonação ficarem contínuas, com a **marcação das frases a posteriori**. Primeiro teste: Parte 1, página 3 (`p2`, Capítulo 2). Se o humano aprovar de ouvido, vira o padrão (ver 8.6).

## 0. Visão geral

| Narração | ID (pasta) | O que é |
| :--- | :--- | :--- |
| **Contadora de histórias** | `narradora` | Uma única voz feminina, calorosa, narra todo o texto (inclusive as falas dos personagens, com leve mudança de tom) |
| **Teatro de vozes** | `teatro` | A mesma narradora para a narração + **uma voz para cada personagem** nas falas com travessão |
| **Palavras-chave** | `palavras` | A pronúncia pausada de cada palavra em destaque (sílabas devagar e depois a palavra inteira), com a voz da narradora. Serve para as duas narrações |

**Entradas** (geradas por `npm run exportar:frases`, não edite à mão): `docs/narracao/frases-dom-quixote-parte-N.json`, uma por parte. Cada frase traz:
```json
{ "id": "p2-s5", "pagina": 2, "texto": "como aparece no livro", "fala": "texto já preparado para falar", "hash": "6b19fbdf98" }
```
e cada palavra-chave traz:
```json
{ "slug": "estrelas", "palavra": "ESTRELAS", "silabas": "ES • TRE • LAS", "fala": "es... tre... las... estrelas!", "hash": "..." }
```

**Saídas** (`dom-quixote/audio/**`, dono: Claude):
```text
dom-quixote/audio/
├── vozes.js                          # acrescente a parte em `partes` quando ela estiver completa
├── narradora/amostra.mp3             # amostra curta (FRASE DE AMOSTRA abaixo), usada no botão ▶ do painel
├── narradora/parte-N/<id>.mp3        # uma frase por arquivo: p0-s1.mp3, p0-s2.mp3, ...
├── narradora/parte-N/indice.json     # { "<id>": "<hash da frase gravada>" }
├── teatro/amostra.mp3
├── teatro/parte-N/<id>.mp3 + indice.json + roteiro.json
└── palavras/<slug>.mp3 + indice.json
```

---

## 1. Ferramenta e formato
- Use o **modelo de voz (TTS) mais recente do Gemini** com suporte a português do Brasil, a instruções de estilo e a **vários falantes** (até 2 por pedido). Registre o nome exato do modelo e das vozes usadas na seção Revisões de `docs/fila/PEDIDOS.md` e no `indice.json`.
- **Antes de produzir em massa, confirme** que os termos de uso permitem distribuir os áudios num projeto aberto (CC BY 4.0) e anote a conclusão em `docs/fila/PEDIDOS.md`. Se não permitirem, pare e registre o bloqueio.
- O modelo 3.8 devolve **WAV** (PCM 16 bits, 24 kHz, mono); os anteriores, PCM bruto. Salve como **`.wav`** (com cabeçalho) ou **`.pcm`** (bruto) **com o nome final** (`p2-s5.wav`). Depois rode:
  ```bash
  npm run build:audio   # converte para MP3 (48 kbps mono), corta o silêncio das pontas e apaga os originais
  npm run build:sw
  ```
- **Uma frase por pedido ao modelo**, mas envie junto, como contexto (não para ler), as frases vizinhas da mesma página, para a entoação acompanhar a cena.

## 2. Voz da narradora (`narradora` e a parte narrada do `teatro`)
- **Voz**: de preferência uma **voz nativa brasileira** da biblioteca estendida (seção 8.1), feminina e calorosa. Em teste (2026-10-24, capa da Parte 1, painel "Voz" do livro): **A** `pt-br-storyteller-9`, **B** `pt-br-tutor-5`, **C** `pt-br-assistant-6`; `Sulafat` (multilíngue) entra se nenhuma agradar. O humano escolhe de ouvido; depois, **use sempre a mesma** em tudo (a pasta da escolhida vira `narradora`).
- **Intenção de estilo** (a API recebe a versão curta, em inglês, que está em `tools/gravar-narracao.mjs`; ver 8.2):
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
- Voz: a da narradora. Um arquivo por `slug`. Duração aceita: 1 a 12 s de fala, medida sem o silêncio das pontas (as de 5 sílabas passam de 10 s). Palavras repetidas entre as partes (ex.: `imaginacao`) são gravadas **uma vez só**.

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
2. **Duração** (sem o silêncio das pontas): entre 0,5 s e 25 s por frase; palavras-chave entre 1 s e 12 s.
3. **Ouça** (ou analise) as frases com nomes da tabela da seção 5 e as frases de diálogo.
4. Grave `indice.json` em cada pasta (`{ "p2-s5": "<hash>" }`) com o `hash` da frase no momento da gravação. Quando o texto do livro mudar, o Claude regenera os JSON: compare os hashes e **regrave só o que mudou**.
5. Quando **todas** as frases de uma parte estiverem gravadas numa voz, acrescente o número da parte em `partes` daquela voz em `dom-quixote/audio/vozes.js`. A partir daí ela aparece como opção no painel "Voz" do livro.

## 7. Ordem de produção e entregas
Uma entrega (commit + merge na `main` + uma linha nas Revisões de `docs/fila/PEDIDOS.md`) por item. **Antes do item 1**, entregue as amostras de 2 ou 3 narradoras e espere o humano escolher a voz de ouvido:
1. `narradora/amostra` + **Parte 1** completa na `narradora` + palavras-chave da Parte 1.
2. Partes 2, 3 e 4 na `narradora`, cada uma com suas palavras-chave.
3. `teatro`: roteiro + áudios, uma parte por vez (1 → 4), + `teatro/amostra`.

Tamanho esperado: ~20–40 KB por frase, ~6–8 MB por voz para os 4 livros. O tablet só baixa a voz escolhida, na primeira vez que ela toca.

---

## 8. Execução pelo Claude via API (`tools/gravar-narracao.mjs`)

### 8.1 Chave, rede e modelo
- **Como a chave chega: segredo de rede do ambiente.** O proxy injeta `x-goog-api-key` em toda requisição a `generativelanguage.googleapis.com`: o Claude nunca vê a chave e o script **não manda cabeçalho de autenticação**. `$GEMINI_API_KEY` vazio é o esperado (se existir, o script a usa no cabeçalho; nunca na URL, nunca impressa).
- **Node atrás do proxy**: o `fetch` do Node só usa o proxy com `NODE_USE_ENV_PROXY=1` (o `npm run gravar:narracao` já põe).
- **Teste de acesso** (testado em 2026-10-24, funcionou):
  ```bash
  curl -s "https://generativelanguage.googleapis.com/v1beta/models?pageSize=200" | grep -o '"name": "models/[^"]*tts[^"]*"'
  ```
- **Modelos de voz disponíveis** (2026-10-24): `gemini-3.8-flash-tts` (GA desde 2026-09, o mais expressivo: **é o da produção**), `gemini-3.8-flash-lite-tts` (mais barato, mesma API), `gemini-3.1-flash-tts-preview`, `gemini-2.5-pro-preview-tts` (sem plano gratuito), `gemini-2.5-flash-preview-tts`. Só os 3.8 têm voz desenhada (voice design) e a biblioteca estendida.
- **Vozes nativas pt-BR**: a biblioteca estendida tem **107 vozes brasileiras** (`pt-br-storyteller-9`, `pt-br-tutor-5`...), com idade, persona e timbre descritos. Elas soam mais brasileiras que as 30 vozes multilíngues (Sulafat, Kore...). Lista: `curl -sG ".../v1beta/voices" --data-urlencode language_code=pt-BR --data-urlencode page_size=100` (paginado por `page_token`).

### 8.2 Pedido de uma frase (API `interactions`, a dos modelos 3.8)
```http
POST https://generativelanguage.googleapis.com/v1beta/interactions
{
  "model": "gemini-3.8-flash-tts",
  "input": [{ "type": "user_input", "content": [{ "type": "text", "text": "<campo fala, literal>",
      "annotations": [{ "type": "speech_metadata", "style": "<estilo curto>" }] }] }],
  "response_format": { "type": "audio" },
  "generation_config": { "speech_config": [{ "voice": "pt-br-storyteller-9" }] }
}
```
- A resposta traz `steps[type=model_output].content[type=audio].data`: base64 de um **WAV** (PCM 16 bits, 24 kHz, mono, com cabeçalho). O `npm run build:audio` converte.
- **O `text` é lido literalmente.** Instruções e contexto **não** vão no texto (seriam lidos em voz alta): o jeito de falar vai em `speech_metadata.style`, **curto** (a documentação avisa que instruções longas, tipo "notas do diretor", fazem a voz derivar). Por isso a instrução longa da seção 2 virou o estilo curto que está em `tools/gravar-narracao.mjs`, e o "contexto das frases vizinhas" (seção 1) não se aplica: no lugar dele, use um estilo por cena quando precisar ("com suspense", "com ternura").
- Marcas no meio do texto, em inglês e entre `< >`: `<short pause>`, `<long pause>`, `<laugh>`, `<sigh>`. Palavra em CAIXA ALTA ganha ênfase (por isso o `fala` vem em minúsculas).
- **Teatro**: até 2 falantes por pedido: `speech_config: { mode: "conversational", speakers: [{ speaker: "NARRADORA", voice: ... }, { speaker: "SANCHO", voice: ... }] }` e um item de `content` por trecho, com `speaker` no `speech_metadata`. Voz desenhada/clonada não entra em diálogo: gera-se cada trecho separado e junta-se.

### 8.3 Robustez do script
- **Retomável**: pule a frase cujo `.mp3` já existe com o mesmo `hash` no `indice.json`. Assim o script pode ser rodado de novo depois de uma queda ou do fim da cota.
- **Cota e erros**: em `429`, respeite o `retryDelay` da resposta (ou espere com recuo exponencial). Se a cota **diária** acabar, salve o progresso e registre em `PEDIDOS.md` quando retomar. Em `5xx`, faça até 4 tentativas.
- **Implementado** em `tools/gravar-narracao.mjs` (`npm run gravar:narracao -- ...`): `--voz <pasta>` (as vozes ficam na tabela `VOZES` do script, com modelo e estilo), `--parte N`, `--paginas 0,1`, `--ids p2-s5,p2-s6`, `--amostra`, `--forcar`, `--sem-qa`, `--seco`. Ele já transcreve, converte para MP3 e atualiza o `indice.json` (com modelo, voz e estilo usados).
- **Liberar aos poucos no livro**: ponha a parte em `previa` da voz no `vozes.js`. A voz aparece no painel como "prévia" e as frases sem gravação usam a voz do aparelho. O humano ouve no próprio livro (GitHub Pages) e dá o retorno. **Toda voz ou entonação nova passa por essa escuta antes de seguir** (pedido do humano, 2026-10-24).

### 8.4 Cota e custo (descoberto em 2026-10-24)
- **Plano gratuito: 10 pedidos por dia por modelo de voz** (o 3.8 e o 3.8-Lite contam separado) e **20 por dia** no modelo de transcrição. Uma voz completa são ~215 frases + ~105 palavras-chave (fora as regravações): **sem o plano pago, a produção é inviável** (~1 mês por voz).
- **Plano pago** (projeto do Google Cloud com faturamento ativo): `gemini-3.8-flash-tts` custa US$ 9 por milhão de tokens de áudio até 31/12/2026 (US$ 18 depois). A fala usa ~25 tokens/s e o livro inteiro tem ~30 min por voz: **~US$ 0,40 por voz**, ~US$ 2–3 com o teatro, as palavras-chave e as regravações. O Batch (`batchGenerateContent`) custa metade, mas não tem plano gratuito.
- No plano gratuito, o Google pode usar os textos e áudios enviados para melhorar os produtos (os textos do livro são públicos, sem problema).

### 8.5 Página inteira (`--pagina-inteira`)
- **Um pedido por página**: o `fala` de cada frase, os parágrafos separados por linha em branco. Sai `parte-N/pN.mp3`.
- **Marcação a posteriori**: o script acha as pausas do áudio (≥ 120 ms de energia baixa) e escolhe, por programação dinâmica, uma pausa por fronteira entre frases: a mais perto de onde a proporção de letras diz que a frase acaba, preferindo as pausas longas (fim de frase pausa mais que vírgula). O corte fica no meio da pausa.
- **QA**: cada trecho entre dois cortes é transcrito e comparado com a sua frase. Isso confere o texto **e** a marcação (um corte no lugar errado passa palavras de uma frase para a outra). Até 3 gerações; fica a melhor.
- **Saída**: `parte-N/paginas.json` = `{ "p2": { "arquivo": "p2.mp3", "hash", "frases": [{ "id", "ini", "fim" }] } }`, com os tempos em segundos. O `hash` junta os hashes das frases: mudou uma frase, regrava a página.
- **No livro**: se a página está em `paginas.json`, "Ouvir Página" toca o MP3 inteiro e destaca a frase pelo `currentTime` (funciona no 🐢, que só muda o `playbackRate`). Página sem gravação inteira: frase por frase, como antes.
- **Falas de personagem**: a página inteira com a narradora + 1 personagem cabe num pedido só no modo `conversational` (2 falantes). Com 2 ou mais personagens na página, divide-se a página em blocos. Decidir com o humano quando o elenco estiver escolhido.

### 8.6 Controle de qualidade pela API
- **Transcrição** (feita pelo script): o WAV vai ao `gemini-3.5-flash` com o pedido "Transcreva exatamente o que é falado, em português, com os números escritos por extenso." (sem isso, "quatrocentos" vira "400" e reprova uma frase boa). Compara palavra por palavra, sem acento, pontuação nem caixa. Divergência → regravar (até 3 tentativas). Se nenhuma bater, **guarda a mais próxima** (cada tentativa gasta cota) e avisa no fim, para o humano ouvir.
- **Falso alarme conhecido**: a transcrição escreve "Alonso **Quijano**" (a grafia espanhola) para "Quixano". Pode ser o modelo de transcrição "corrigindo" o nome famoso ou a voz dizendo "ki-RRA-no": só o ouvido do humano decide.
- **Pedir ao modelo para avaliar sotaque ou naturalidade não funciona**: ele deu 10/10 para todas as vozes. A escolha de voz e entonação é sempre de ouvido, pelo humano.
- O Claude **não escuta**: entonação e naturalidade são julgadas pelo humano nas amostras e por amostragem. Gere um `docs/narracao/qa-parte-N.md` com as frases que precisaram de regravação ou ficaram fora da faixa de duração.
