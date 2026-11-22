# Auditoria da narração gravada: palavras-chave e atividades (Dom Quixote, Partes 1 a 8)

> **Data**: 2026-11-21, sobre a `main` em `2c18767` (revisões #55 a #67 das Partes 7 e 8 já incluídas).
> **Método**: leitura do motor (`assets/js/livro.js`, `assets/js/desafios.js`), do `vozes.js` e das ferramentas, mais `node tools/exportar-frases.mjs` (não mudou nenhum arquivo: as listas `docs/narracao/frases-*.json` estão em dia com o texto) e `node tools/conferir-narracao.mjs --partes 1,2,3,4,5,6,7,8`. As atividades foram contadas por um script local sobre o `window.LIVRO` de cada parte e as traduções. **Nada foi gravado e a API paga não foi chamada.**
> **Em andamento hoje**: a narração em português das **Partes 7 e 8** (páginas e palavras-chave) está sendo gravada por outro agente; os números delas abaixo são o retrato de agora e vão mudar. As **traduções das Partes 5 a 8 ainda não existem** (en/fr/es): sem elas não há o que gravar nesses idiomas, e o livro abre em português com o aviso `semTraducao` (aí valem as gravações em português).

---

## 1. O que o motor toca de gravação e o que é sempre voz do aparelho

| Fala | Onde no motor | Gravação? | Arquivo procurado | Reserva |
| :--- | :--- | :--- | :--- | :--- |
| Texto da página (Ouvir Página, toque numa frase, 🔊 do parágrafo) | `lerPagina` → `lerPaginaInteira` | **Sim** | `narracao<-idioma>/parte-N/pN.mp3` + tempos em `paginas.json`; sem a página no `paginas.json`, frase a frase em `parte-N/<id>.mp3` | voz do aparelho, frase a frase |
| Título (`pN-s0`) e 🔊 do título | `comandarTitulo` → `lerPagina` | **Sim** (é a frase 0 da página) | o mesmo `pN.mp3` (ou `pN-s0.mp3`) | idem |
| Palavra-chave do texto `{{PALAVRA\|SÍ • LA • BAS\|emoji}}` e o toque no cartão de alfabetização (repetir) | `speakWord` → `pronounceWord` | **Sim** | `palavras<-idioma>/<slug>.mp3` (sílabas pausadas + palavra inteira) | voz do aparelho, **só a palavra inteira** (sem as sílabas; ver `BACKLOG.md` M-1) |
| Amostra do painel 🗣️ Voz | `testarVoz` | Sim (vozes gravadas) | `<voz>/amostra.mp3` | voz do aparelho com `ui('amostra')` |
| Palavra do cartão acertado no tipo **`ordem`** (lida a cada acerto, a "faixa") | `handleOrdemPalavra` → `falar()` | **Não, por desenho** | — | sempre voz do aparelho |
| Palavra do cartão certo no tipo **`pedido`** | `handlePedido` → `falar()` | **Não, por desenho** | — | sempre voz do aparelho |
| **`pegadinha`** do tipo `pedido` | `handlePedido` → `falar(t(item.pegadinha))` | **Não, por desenho** | — | sempre voz do aparelho |
| Falas da **`contagem`** (`cartoes.falas[n]`, Parte 2) | `handleContagem` → `falar()` | **Não, por desenho** | — | sempre voz do aparelho |
| **`comandoAtividade`** (🔊 do quadro 🎮) | `data-ouvir-comando` → `falar()` | **Não, por desenho** | — | sempre voz do aparelho |
| Pergunta do **desafio 🧩** (🔊 `dz-ouvir`) | `desafios.js` → `falar(etapa.pergunta)` | **Não, por desenho** | — | sempre voz do aparelho (os desafios só existem em português) |
| Cartões dos tipos `progressivo`, `variante`, `camadas`, `acao` | `handleProgressiveDrop` etc. | — | — | **mudos** (só efeitos sonoros do Web Audio) |
| Legendas da lente, `fim.mensagem`, textos da interface (`IDIOMAS`) | — | — | — | **nunca são falados** (só texto na tela), salvo a amostra do painel |

O comentário do próprio motor confirma o desenho: `falar()` é "texto livre (contagens, palavras ordenadas): sempre com a voz do aparelho" (`livro.js`, perto da linha 1305).

### 1.1 Duas condições que pesam na conta
1. **A palavra-chave só procura a gravação se a parte estiver no `vozes.js`.** `pronounceWord` testa `vozesGravadas().some(gravadaDisponivel)`, isto é, a parte em `partes` ou `previa` de alguma voz do idioma. Hoje o português tem `partes: [1, 2, 3, 4, 5, 6]`: nas Partes 7 e 8, **as 21 palavras-chave que já têm MP3** (de partes anteriores, mesmo slug: 13 na P7 e 8 na P8) **tocam com a voz do aparelho** até a parte entrar no `vozes.js` (em `previa` durante a gravação, ou em `partes` no fim).
2. **Sem tradução, o idioma volta para o português** (`prepararIdioma`/`carregarTraducao`): nas Partes 5 a 8, quem escolheu en/fr/es ouve a narração em português. Não há falta de arquivo "no idioma" enquanto a tradução não existir.

---

## 2. Páginas e palavras-chave gravadas (parte × idioma)

Contagem do `conferir-narracao.mjs` (mesmo hash do texto atual), com a correção da P1 (ver §4.1).

| Parte | pt páginas | pt palavras-chave | en páginas | en palavras | fr páginas | fr palavras | es páginas | es palavras |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **8/8** (p0 e p1 frase a frase¹) | 30/30 | 8/8 | 31/31 | 8/8 | 30/30 | 8/8 | 30/30 |
| 2 | 9/9 | 31/31 | 9/9 | 31/31 | 9/9 | 31/31 | 9/9 | 31/31 |
| 3 | 8/8 | 24/24 | 8/8 | 24/24 | 8/8 | 24/24 | 8/8 | 24/24 |
| 4 | 12/12 | 43/43 | 12/12 | 43/43 | 12/12 | 43/43 | 12/12 | 43/43 |
| 5 | 10/10 | 36/36 | aguarda tradução | — | aguarda tradução | — | aguarda tradução | — |
| 6 | 10/10 | 29/29 | aguarda tradução | — | aguarda tradução | — | aguarda tradução | — |
| 7 | 0/11 🔄 *em andamento* | 13/35 🔄 *em andamento* (MP3 existem, mas não tocam: §1.1) | aguarda tradução | — | aguarda tradução | — | aguarda tradução | — |
| 8 | 0/11 🔄 *em andamento* | 8/29 🔄 *em andamento* (idem) | aguarda tradução | — | aguarda tradução | — | aguarda tradução | — |
| **Total** | **57/79** | **214/257** | 37/37 | 129/129 | 37/37 | 128/128 | 37/37 | 128/128 |

¹ O `conferir-narracao.mjs` diz "páginas 6/8 (faltam p0, p1)", mas é **falso alarme**: essas duas páginas foram gravadas frase a frase (`parte-1/p0-s0.mp3` … `p1-s4.mp3`), e os 9 hashes do `indice.json` batem com o texto atual. O motor toca esses arquivos (reserva frase a frase de `lerPagina`). Regravá-las inteiras é o item `BACKLOG.md` M-10 (opcional, pela entonação contínua).

Todas as 166 páginas gravadas passaram na conferência de rajadas ("✅ Sem rajadas de ruído").

**Palavras-chave que faltam (português, em andamento pelo outro agente)**:
- **Parte 7 (22)**: governar, ditados, barataria, alfaiate, dedo, varinha, doutor, vergonha, ponte, cadeia, balanca, pajem, colar, pena, assinar, tartaruga, buraco, fantasma, zurro, chaves, portao, barcelona.
- **Parte 8 (21)**: mar, fim, redes, borboletas, campo, boiada, juizo, fama, mentiroso, onda, navios, papel, cabeca, cano, desconfio, chumbo, miguel-de-cervantes, escritor, palavra, nome, ler.

---

## 3. Falas das atividades

Legenda: **G** = tem gravação; **P** = poderia ter (o motor já procura) e não tem; **A** = só voz do aparelho por desenho do motor. Cada célula conta itens distintos falados.

| Parte · idioma | Tipos de cartão | Cartões falados (`ordem`/`pedido`) | Pegadinhas | Falas de contagem | Comandos 🎮🔊 | Perguntas 🧩 | Cartões mudos |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 · pt | variante, progressivo ×2, camadas, acao | 0 | 0 | 0 | 5 A | 16 A | 13 |
| 1 · en/fr/es | idem | 0 | 0 | 0 | 5 A cada | — | 13 |
| 2 · pt | camadas ×3, contagem | 0 | 0 | 5 A | 4 A | 17 A | 6 |
| 2 · en/fr/es | idem | 0 | 0 | 5 A cada | 4 A cada | — | 6 |
| 3 · pt | camadas ×2, ordem, contagem | 5 A | 0 | 0 | 4 A | 16 A | 4 |
| 3 · en / fr / es | idem | 5 / 6 / 6 A | 0 | 0 | 4 A cada | — | 4 |
| 4 · pt | ordem ×3, pedido | 16 A | 3 A | 0 | 4 A | 25 A | 0 |
| 4 · en / fr / es | idem | 17 / 13 / 16 A | 3 A cada | 0 | 4 A cada | — | 0 |
| 5 · pt | ordem ×2, pedido | 10 A | 2 A | 0 | 3 A | 22 A | 0 |
| 6 · pt | pedido ×2, ordem | 9 A | 5 A | 0 | 3 A | 22 A | 0 |
| 7 · pt | ordem ×3, pedido | 15 A | 2 A | 0 | 4 A | 29 A | 0 |
| 8 · pt | ordem ×2, pedido | 11 A | 2 A | 0 | 3 A | 27 A | 0 |
| 5–8 · en/fr/es | aguarda tradução | — | — | — | — | — | — |
| **Total pt** | | **66 A** | **14 A** | **5 A** | **30 A** | **174 A** | 23 |
| **Total en+fr+es (P1–4)** | | **63 A** | **9 A** | **15 A** | **51 A** | — | 69 |

**Não há nenhuma fala de atividade com G nem P**: todas são A. Hoje não existe caminho para gravá-las sem mexer no motor e na exportação.

Observações que pesam na prioridade:
- **Os cartões das assinaturas soletradas falam letras e sílabas soltas**: P4 `EL, BA, MO, CI` e `M, A, O, G, I`; P5 `PAN, CHO, ÇA, SAN`; P7 `N, O, S, H, A, C`; P8 `R, O, L, V, I`. A voz do aparelho lê isso em minúsculas (`falar(palavra.toLocaleLowerCase())`), e letra ou sílaba isolada é justamente onde ela mais erra ("ça" sozinha, "h", "c"). É o caso em que a gravação mais ajudaria a alfabetização.
- **Dos 66 cartões falados em português, 17 já têm um MP3 de palavra-chave com o mesmo slug** (en 4, fr 2, es 3), mas esses MP3 são a versão **silabada** ("ilha… i… lha… ilha!"), não a palavra simples que o cartão fala. Reaproveitá-los mudaria o ritmo da atividade; é decisão do humano, não economia automática.
- O **comando 🎮** é o caso mais visível: tem 🔊 próprio ao lado do texto narrado (que é gravado), e a criança ouve outra voz, robótica, logo depois da narradora.
- As **pegadinhas** são as falas engraçadas ("Balança? A balança do tribunal pesou, pesou…"): ganham muito com a entonação da narradora.
- Os **desafios 🧩** são para leitores de 8 a 10 anos, que já leem sozinhos; o 🔊 é apoio. São as falas mais longas (12,1 mil letras) e ainda podem mudar (o humano não experimentou; Partes 7 e 8 em revisão).

---

## 4. Recomendações, por prioridade

### 4.1 Já dá para fazer, sem mudar o motor (só com autorização da API, `AGENTS.md` §2.7)
1. **Partes 7 e 8 em português** 🔄 *em andamento (outro agente)*. Para referência, os comandos com o suporte atual:
   ```bash
   npm run gravar:narracao -- --voz narracao --parte 7 --pagina-inteira --seco          # planejar, de graça
   npm run gravar:narracao -- --voz narracao --parte 7 --pagina-inteira --autorizado
   npm run gravar:narracao -- --voz narracao --parte 8 --pagina-inteira --autorizado
   npm run gravar:narracao -- --voz palavras --parte 7,8 --agrupar 25 --autorizado      # as 43 que faltam, ~2 pedidos
   npm run gravar:narracao -- --voz palavras --parte 7,8 --agrupar 1 --autorizado       # só as que o Whisper recusar no grupo
   node tools/conferir-narracao.mjs --partes 7,8 --idiomas pt                             # tem de dar 11/11, 35/35, 29/29 e "Sem rajadas"
   ```
   Depois, **acrescentar 7 e 8 em `partes` da voz `narracao` no `vozes.js`** (ou em `previa` já durante a gravação): sem isso, nem as 21 palavras-chave já gravadas tocam nessas partes (§1.1). Custo de referência (P5 e P6 reais no `gastos.csv`): ~75 pedidos e ~US$ 0,20 por parte no Flex, incluindo as retentativas.
2. **Partes 5 a 8 em en/fr/es**: *aguarda as traduções* (fase 7). Quando existirem: `npm run exportar:frases`, roteiros por `tools/derivar-roteiro.mjs` e, por idioma, `npm run gravar:narracao -- --voz narracao --idioma en --parte 5 --pagina-inteira --autorizado` (idem 6, 7, 8 e `fr`, `es`) e `--voz palavras --idioma en --parte 5,6,7,8 --agrupar 25 --autorizado`. Estimativa pela Parte 4 traduzida (229 pedidos e US$ 0,70 para os três idiomas): **~12 partes-idioma × ~75 pedidos ≈ 900 pedidos e ~US$ 2,40 no Flex em 2026 (~US$ 4,80 a partir de 1/1/2027)**. O gargalo é o limite de 100 pedidos por dia: cerca de 9 dias de fila (ou metade com a chave reserva).
3. **Opcional**: regravar inteiras as páginas p0 e p1 da Parte 1 em português (`BACKLOG.md` M-10): `npm run gravar:narracao -- --voz narracao --parte 1 --paginas 0,1 --pagina-inteira --autorizado` (~2 a 4 pedidos, < US$ 0,01). Só se o humano quiser a entonação contínua: hoje elas já tocam gravadas.

### 4.2 Exigiria mudança no motor e na exportação (não feita; `livro.js` não foi alterado)
Proposta de desenho, igual ao das palavras-chave: `falar(texto)` tenta primeiro `falas<-idioma>/<hash do texto>.mp3` (só se o idioma tiver narração gravada para a parte) e cai na voz do aparelho como hoje; o `exportar-frases.mjs` ganha uma seção `falas` (comandos, pegadinhas, contagens, cartões falados e, se quiser, perguntas dos desafios), com o texto já traduzido por `t()`; o `gravar-narracao.mjs` ganha `--voz falas`, reaproveitando o agrupamento e o corte pelo Whisper das palavras-chave. O cartão continua falando a palavra simples (estilo próprio: palavra clara, sem silabar; letra isolada pelo nome).

Estimativa (taxa medida nas páginas gravadas: ~11,5 letras por segundo de fala, 25 tokens por segundo ≈ 2,2 tokens por letra; Flex do `gemini-3.8-flash-tts` a US$ 4,50/M até 31/12/2026 e US$ 9,00/M depois, `TODO-NARRACAO.md` §8.4):

| Prioridade | O quê | Itens (pt + en/fr/es das P1–4) | Letras | Pedidos (até 25 itens ou 3.500 letras) | US$ Flex 2026 | US$ 2027 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Comandos 🎮** | 30 + 51 | 3.190 + 4.953 | ~5 | ~0,08 | ~0,16 |
| 2 | **Cartões falados** (palavras, sílabas e letras das assinaturas) | 66 + 63 | ~1,3 s cada | ~6 | ~0,02 | ~0,04 |
| 3 | **Pegadinhas** + **falas da contagem** | 19 + 24 | 1.381 + 1.250 | ~4 (podem ir junto com os comandos do idioma) | ~0,03 | ~0,05 |
| 4 | Perguntas dos desafios 🧩 (só pt) | 174 | 12.103 | ~8 | ~0,12 | ~0,24 |
| | **Total** | 427 | | **~23 (~35 com retentativas)** | **~0,25** | **~0,50** |

Com folga de 50% para retentativas, o pacote inteiro fica abaixo de **US$ 0,40** e cabe num dia de cota. As Partes 5–8 traduzidas somariam depois ~3 a 4 pedidos por idioma. Sugestão: fazer só as prioridades 1 a 3 (~US$ 0,13) e deixar os desafios para quando o humano tiver testado o modo 🧩 e o texto estiver estável (cada mudança numa pergunta muda o hash e pede regravação). A mudança no motor, por ser em `livro.js`, precisa da aprovação do humano e de teste no tablet antes.

Alternativa sem API para os cartões de letras e sílabas: o motor poderia, nas atividades de assinatura, ler as letras isoladas pelo nome (ex.: "agá", "cê"), o que já corrigiria os piores erros da voz do aparelho. Também é mudança no motor.

### 4.3 Gargalos simples nas ferramentas de conferência (propostos, não aplicados)
Não alterei nenhuma ferramenta (fora do escopo desta entrega, que mexe só neste arquivo). As três melhorias são em `tools/conferir-narracao.mjs`, sem tocar no leitor:
1. **Aceitar páginas gravadas frase a frase** (acaba o falso alarme da P1 p0/p1). No filtro `pendentesPag`, antes do teste do `paginas.json`:
   ```js
   const indiceFrases = lerJson(join(pasta, 'indice.json'), { frases: {} }).frases || {};
   // ...dentro do filter, depois de `const frases = ...`:
   if (frases.every(f => indiceFrases[f.id] === f.hash && existsSync(join(pasta, `${f.id}.mp3`)))) return false;
   ```
2. **Descobrir as partes sozinho**: o padrão é `--partes 1,2,3,4`, então quem roda sem argumento não vê as Partes 5 a 8. Trocar o padrão por todas as `docs/narracao/frases-<livro>-parte-*.json` existentes.
3. **Mostrar o estado no `vozes.js`** em cada linha (ex.: "no vozes.js: completa / prévia / fora"), e avisar nos dois desencontros: parte completa que ainda não está em `partes` (o caso das P7/P8 ao fim da gravação: as palavras-chave não tocariam) e parte em `partes` com algo pendente.
