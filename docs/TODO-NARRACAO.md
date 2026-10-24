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
6. **Página inteira num pedido só é o padrão** (`--pagina-inteira`, §8.5): aprovada de ouvido ("ficou muito melhor"). Frase por frase, só em gravações avulsas.
7. **O Claude escolhe o elenco** pelas descrições do catálogo e, se nenhuma voz servir, **cria uma por descrição** (voice design). Escolhidos na Parte 1: **Dom Quixote** `pt-br-concierge-3` (62 anos, grave, "ressonante e espirituosa") e **Sancho** `pt-br-storyteller-2` (49, grave, humorista, "envolvente e empática"). O elenco fica em `ELENCO`, no script; o roteiro de quem fala cada trecho, em `narracao/parte-N/roteiro.json` (escrito à mão a partir do texto: falas continuam em frases sem travessão).
8. **O título é lido**: capítulo + título no começo de cada página, a "frase 0" (`pN-s0`). Na capa: obra + título da parte.
9. **Economia (limite de R$ 30/mês no projeto; era R$ 10 até 2026-10-24)**: a API paga só faz **o que só ela faz, produzir as vozes**. A conferência é **local** (Whisper no ambiente, `tools/transcrever.py`), no máximo 2 tentativas, 1 palavra diferente não regrava (fica o aviso) e a comparação tolera nomes mal ouvidos, palavras juntas/separadas e números em algarismos. Cada rodada registra o gasto estimado em `docs/narracao/gastos.csv`. A Parte 1 inteira custou ~US$ 0,15 nesta fase (fora os testes).
10. **Clonar a voz do humano**: adiado ("preciso refletir mais").
11. **Regra da API paga (AGENTS.md §2.7)**: usar **sempre de forma econômica**, para sobrar verba para muitos livros e novas vozes; **só para produzir as vozes da leitura**, nada mais (nem teste, transcrição, avaliação, listagem ou criação de voz "para ver"); e **só com autorização do humano no prompt inicial da sessão**. O script exige `--autorizado`.
12. **Flex é o padrão** (aprovado pelo humano em 2026-10-24): metade do preço, mesma voz. Na prática, cada pedido levou de 1 a 3 minutos. Se o Flex falhar de vez, o script manda aquele pedido no Standard e avisa (`--standard` desliga o Flex).
13. **Limite do plano pago (Tier 1): 100 pedidos por dia** no `gemini-3.8-flash-tts` (o dia vira às 07:00 UTC). Por isso: (a) **cache de blocos** em `.cache-narracao/` (fora do git), e um bloco pago nunca é pedido de novo, mesmo que a página falhe depois; (b) **palavras-chave em grupos** de até 10 por pedido (`--agrupar`), uma por parágrafo, cortadas logo depois da **palavra inteira** de cada uma (âncora que o Whisper reconhece bem; as sílabas soltas ele escreve de jeitos imprevisíveis). A conferência só salva o trecho que tem a própria palavra e nenhuma outra; o que falhar fica pendente para um grupo menor. Onomatopeias (`tac-tac`) vão para o fim do grupo, porque não servem de âncora; (c) as páginas antes das palavras. A Parte 2 tem ~15 blocos; as Partes 3 e 4, ~13 e ~12.
14. **Elenco das Partes 2–4** (escolhido pelo Claude no catálogo): pastor `podcaster-5`, barbeiro de Mambrino `techagent-4`, padre `podcaster-9`, Doroteia/Micomicona `concierge-4`, estalajadeiro `csagent-10`, Teresa Pança `advisor-1`, Sanchica `concierge-6`, os dois velhos do tribunal `techagent-5` (o credor) e `concierge-10` (o devedor). **Voz de criança por descrição é bloqueada pela política de segurança da API** ("Voice prompt was blocked by safety policies"): a Sanchica usa a voz feminina mais jovem e aguda da biblioteca, com estilo de menininha animada. Não tente contornar.

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
- **Acesso**: testado em 2026-10-24 e funcionando. **Não repita o teste** (regra 11): com autorização, rode direto a produção; um `403 "unregistered callers"` nela quer dizer que a chave não chegou.
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

### 8.4 Custo e opções de modelo (pesquisado em 2026-10-24, página de preços do Gemini)
O áudio gerado custa por token: **25 tokens por segundo de fala**. O texto enviado é quase de graça. A Parte 1 inteira (8 páginas + 30 palavras-chave) teve ~17 mil tokens de áudio.

| Modelo / nível | US$ por milhão de tokens de áudio (até 31/12/2026) | A partir de 1/1/2027 | Parte 1 (~17 mil tokens) | Características |
| :--- | :--- | :--- | :--- | :--- |
| `gemini-3.8-flash-tts` Standard (**o atual**) | 9,00 | 18,00 | ~US$ 0,15 | GA em set/2026; o mais expressivo; biblioteca de 107 vozes pt-BR, voz por descrição e clonagem; resposta em segundos |
| `gemini-3.8-flash-tts` **Flex** | 4,50 | 9,00 | ~US$ 0,08 | **a mesma qualidade e as mesmas vozes**, metade do preço; resposta em minutos (meta de 1 a 15 min), "best-effort" (pode falhar sob carga e é preciso tentar de novo). Basta `service_tier: "flex"` no pedido (`--flex` no script; **ainda não testado**) |
| `gemini-3.8-flash-tts` Batch | 4,50 | 9,00 | ~US$ 0,08 | o mesmo desconto do Flex, mas assíncrono (até 24 h) e com outra API (`batchGenerateContent`): mais trabalho, sem vantagem sobre o Flex |
| `gemini-3.8-flash-lite-tts` Standard | 6,00 | 12,00 | ~US$ 0,10 | mesma API, vozes e recursos, feito para volume e agentes de voz; o Google recomenda o Flash para narração longa e máxima expressividade. As vozes B e C do primeiro teste saíram dele |
| `gemini-3.8-flash-lite-tts` Flex/Batch | 3,00 | 6,00 | ~US$ 0,05 | o mais barato de todos; qualidade a ouvir antes |
| `gemini-2.5-flash-preview-tts` | 10,00 (Batch 5,00) | — | ~US$ 0,17 | modelo antigo (prévia), só as 30 vozes multilíngues, sem biblioteca pt-BR |
| `gemini-3.1-flash-tts-preview`, `gemini-2.5-pro-preview-tts` | 20,00 (Batch 10,00) | — | ~US$ 0,34 | mais caros e antigos; sem biblioteca pt-BR |

- **Recomendação**: o **Flex do 3.8 Flash** corta o gasto pela metade sem mudar a voz nem o método. Só a espera aumenta, o que não importa para gravação. Antes de virar o padrão, precisa da aprovação do humano e de um primeiro uso numa produção autorizada (atenção: o `fetch` do Node desiste de esperar o cabeçalho em 300 s; se o Flex demorar mais, aumentar esse limite). Trocar de modelo (Lite) mudaria a voz: só com escuta do humano.
- **Os preços dobram em 1/1/2027**: produzir as Partes 2 a 4 ainda em 2026 sai mais barato.
- Com o plano gratuito eram só 10 pedidos por dia por modelo de voz, o que inviabiliza a produção. O plano pago está ativo desde 2026-10-24 (os textos enviados no pago não são usados pelo Google para treinar).

### 8.5 Página inteira (`--pagina-inteira`, o padrão)
- **Blocos**: a API aceita no máximo 2 vozes por pedido. Cada bloco tem a narradora + no máximo 1 personagem, e um bloco novo começa quando entra um segundo personagem (ex.: Parte 1, `p7`: [narradora + Quixote] [narradora + Sancho]). Só narradora: um texto com os parágrafos separados por linha em branco. Com personagem: um item de `content` por fala, cada um com `speaker` e o estilo daquela voz em `speech_metadata`, e `speech_config.speakers` com as duas vozes (**sem** `mode`: a API recusa esse campo). Os blocos são juntados com 0,3 s de pausa e viram um só `parte-N/pN.mp3`.
- **Marcação a posteriori**: o Whisper local devolve o tempo de cada palavra; as palavras esperadas são alinhadas às ouvidas (distância de edição) e cada frase começa no meio da pausa entre a última palavra da anterior e a primeira dela. Isso evita o erro do método antigo, só por pausas (que ainda é a reserva com `--qa api`/`--sem-qa`): cortar na pausa de dentro do título ("Capítulo 2. O Novo Nome. ‖ A Armadura…").
- **QA**: o texto ouvido em cada frase é comparado com o `fala`. Isso confere o texto **e** a marcação.
- **Gravação avulsa numa página já gravada** (`--ids pN-s0,pN-s1 --pagina-inteira`): sai em `parte-N/avulsas/`; depois, emenda-se com `ffmpeg -ss <corte> -i pN.mp3 -c copy` + `ffmpeg -f concat -c copy` (sem recodificar), e as marcas e o `hash` do `paginas.json` são atualizados. Foi assim que a página `p2` ganhou o título e a fala de Dom Quixote.
- **Conferência local**: `pip install faster-whisper` (uma vez por ambiente; o contêiner é efêmero) e o ffmpeg. O modelo `large-v3-turbo` (~800 MB) baixa do Hugging Face na primeira vez e leva ~20 s para carregar; depois cada página sai em segundos.
- **Saída**: `parte-N/paginas.json` = `{ "p2": { "arquivo": "p2.mp3", "hash", "frases": [{ "id", "ini", "fim" }] } }`, com os tempos em segundos. O `hash` junta os hashes das frases: mudou uma frase, regrava a página.
- **No livro**: se a página está em `paginas.json`, "Ouvir Página" toca o MP3 inteiro e destaca a frase pelo `currentTime` (funciona no 🐢, que só muda o `playbackRate`). Página sem gravação inteira: frase por frase, como antes.
- **Falas de personagem**: a página inteira com a narradora + 1 personagem cabe num pedido só no modo `conversational` (2 falantes). Com 2 ou mais personagens na página, divide-se a página em blocos. Decidir com o humano quando o elenco estiver escolhido.

### 8.6 Controle de qualidade
- **Sempre local** (regra 11): o Whisper transcreve e o script compara palavra por palavra (sem acento, pontuação nem caixa; nomes quase iguais, palavras juntas ou separadas e números em algarismos contam como certos).
- **Falso alarme conhecido**: o modelo de transcrição tende a "corrigir" nomes famosos (ex.: "Quijano" para "Quixano"). Na dúvida, só o ouvido do humano decide.
- **Pedir a um modelo para avaliar sotaque ou naturalidade não funciona** (no primeiro teste, deu 10/10 para todas as vozes) e é proibido pela regra 11. A escolha de voz e entonação é sempre de ouvido, pelo humano.
- O Claude **não escuta**: entonação e naturalidade são julgadas pelo humano. Registre em `docs/narracao/qa-parte-N.md` o que precisou de regravação ou merece ser ouvido.

---

## 9. Situação em 2026-10-24 (manhã)
**As quatro partes de Dom Quixote estão gravadas** (`partes: [1, 2, 3, 4]` no `vozes.js`): páginas inteiras com títulos, vozes dos personagens e todas as palavras-chave. QA em `docs/narracao/qa-parte-N.md`. Gasto da produção das Partes 2–4: ~US$ 0,42 (Flex), incluindo ~US$ 0,13 perdidos na madrugada antes do cache de blocos.
