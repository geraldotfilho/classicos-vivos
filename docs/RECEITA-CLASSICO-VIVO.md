# 📖 Receita de um Clássico Vivo

Como transformar uma obra-prima da literatura num livro interativo para crianças de 5 a 8 anos, do jeito que funcionou (e do jeito que não funcionou) em *Dom Quixote*. Vale para cada **parte** de um livro e para cada **livro novo** da coleção.

> **Documento vivo.** Toda parte entregue termina com uma retrospectiva (fase 8). Cada lição nova entra no **Diário de lições** (§7) com data e origem e, se mudar o jeito de trabalhar, também na regra da seção certa. Arquitetura e regras técnicas continuam no `AGENTS.md`; aqui fica o **processo**.

---

## 1. Princípios (não se negociam)

1. **Leitor de referência: uma criança de 6 anos ouvindo, ou lendo junto com um adulto** (`AGENTS.md` §3.5). Frases curtas, ordem direta, palavras do dia a dia do Brasil, sem perder a beleza e o humor do original.
2. **Fiel ao espírito, não à letra.** Cortar e fundir episódios é permitido. Deixar a história sem pé nem cabeça, não: cada evento precisa de **motivo** e de **consequência** que a criança entenda.
3. **A interação nasce da história**, transforma a cena e, sempre que der, **alfabetiza**. Nada de placar, estrela, tempo-limite ou "errou" em vermelho (`AGENTS.md` §3.3).
4. **Ler vem primeiro.** Páginas calmas (só texto, Lente e toques na cena) são parte do ritmo, não falta de ideia.
5. **Uma parte por vez, do começo ao fim**, com paradas para o humano ler e aprovar. Só se passa para a próxima parte com a anterior entregue.
6. **Economia**: a API paga só é usada com autorização do humano no prompt da sessão, sempre no modo mais barato, com o gasto registrado (`AGENTS.md` §2.7).
7. **Nunca quebrar o que está publicado.** O livro novo nasce em rascunho e só substitui o antigo quando estiver aprovado.

---

## 2. Antes da primeira parte: o Mapa da Obra (uma vez por livro ou volume)

O erro mais caro de *Dom Quixote* não foi de texto nem de arte: foi de **divisão**. A Parte 4 recebeu 81 capítulos de Cervantes (o fim do volume de 1605 e todo o de 1615) em 7 páginas, e ficou apressada, com eventos sem motivo e personagens surgindo do nada. As Partes 1 a 3 (8, 14 e 16 capítulos) ficaram boas. Por isso, antes de escrever qualquer página:

### 2.1 Mapa de capítulos
Uma tabela com **todos** os capítulos do original: número, episódio em uma linha e decisão (**usar**, **fundir** ou **cortar**, com o motivo). Ela mostra o que cabe em cada parte e evita esquecer um fio importante.

### 2.2 Regras de divisão em partes
- **7 a 9 páginas por parte** (capa + 6 a 8 capítulos). Cada página conta **um episódio**.
- **Proporção**: em média, **1 a 3 capítulos do original por página**. Uma parte nunca deve cobrir mais que **~25 capítulos** do original. Se passar disso, divida em mais partes.
- **Respeite a estrutura do autor** (volumes, livros, atos). Em *Dom Quixote*: volume de 1605 = Partes 1 a 4; volume de 1615 = Partes 5 em diante, na prateleira de baixo.
- **Uma parte = um arco**, com começo, meio e fim, de preferência num **lugar** (a estrada, a serra, a pousada, o palácio). Quatro arcos em sete páginas foi o defeito da Parte 4 antiga.
- **Numeração contínua dos capítulos** entre as partes, para a criança sentir que lê um único grande livro.

### 2.3 Fios da história (plantar e colher)
Uma tabela com cada fio que atravessa as partes (personagem, promessa, objeto, apelido): **onde é plantado** e **onde é colhido**.
- **Ninguém resolve a história sem ter sido apresentado antes.** Exemplo do defeito: Sansão Carrasco apareceu pela primeira vez já como o Cavaleiro da Branca Lua, na última página.
- **Nenhum fio fica solto.** Exemplo do defeito: a Princesa Micomicona e o gigante sumiram entre a Parte 3 e a Parte 4.
- **Pontes**: a última página de uma parte e a primeira da seguinte precisam conversar (onde estão, por que estão ali, o que querem agora).
- Os fios bons dão as **melhores atividades e as melhores páginas**: o apelido da Triste Figura (Parte 2) voltou na assinatura da carta (Parte 3), e a criança se reconheceu.

### 2.4 Bíblias, antes da primeira imagem
- **Estilo** (aquarela, guache, lápis de cor) e **fichas dos personagens** na Realidade.
- **Bíblia da Imaginação**: o que cada personagem fixo vira na Imaginação e o que **não pode sobrar** da Realidade (`ARTE-PELA-API.md` §4.1).
- **Cortes por idade**: violência como eixo, humilhação, conteúdo adulto, humor de vômito. Registre cada decisão e o motivo (exemplo: `PLANO-PARTES-2-4.md` §2).

---

## 3. As fases de cada parte

```text
 1 Adaptação e texto ─► 2 Interações e lentes ─► 🛑 3 Revisão humana ─► 4 Ilustrações e atividades
   (1a escaleta ✋)                                    (congela a estrutura)
 ─► 🛑 5 Revisão final ─► 6 Narração (API) 🛑 escuta ─► publicação ─► 7 Idiomas (API) ─► 8 Retrospectiva
    (congela o texto)
```
🛑 = parada: o trabalho só continua com o "aprovado" do humano. ✋ = pergunta rápida na mesma sessão.

Cada parte tem um **caderno** (`docs/cadernos/<livro>-parte-N.md`, modelo no §6.1) com o quadro das fases, as decisões e as notas do humano. **Comece toda sessão lendo o caderno da parte** e termine atualizando-o.

### Fase 1: Adaptação e texto em português
**1a. Escaleta** (o roteiro em uma linha por página): página → episódio → capítulos do original → o que acontece → que fio planta ou colhe. Mais a lista do que fica de fora e por quê.
✋ **Mostre a escaleta ao humano na própria sessão antes de escrever o texto.** Mudar a escaleta custa um minuto; mudar o texto pronto custa uma reescrita, a tradução e a narração de novo (aconteceu nas Partes 2 a 4).

**1b. Texto**, direto no arquivo do livro, em **modo rascunho** (`rascunho: true` no `window.LIVRO`: não aparece na estante e não usa narração gravada nem traduções; o recurso entra no motor na fase 0 do `PLANO-DOM-QUIXOTE-PARTES-4-7.md`). O motor funciona sem arte ("Ilustração a caminho" e emojis nas camadas), então o humano já pode ler no tablet.
- **Capa**: obra + título da parte e um "Nesta parte da história…" de 3 parágrafos curtos que conta o que vem pela frente, sem estragar surpresas.
- **Primeira página**: ponte com a parte anterior (onde estamos e por quê).
- **Cada página**: 2 a 4 parágrafos curtos; o título do capítulo também é lido (a "frase 0").
- **Palavras-chave**: 25 a 30 por parte, `{{PALAVRA|SÍ • LA • BAS|emoji}}`, sempre no texto (nunca na cena). Repita de propósito algumas das partes anteriores (IMAGINAÇÃO, ESCUDO, SAUDADE…).
- **Palavras difíceis que fazem parte da história** ficam, explicadas no próprio texto ("os odres: grandes sacos de couro, cheios de vinho"). Os nomes divertidos do autor ficam.
- **Falas** com travessão; evite abreviações com ponto (Sr., Mr.), que cortam a frase na leitura guiada.
- Se a página tem atividade, o texto **convida** a criança no ponto certo ("Ajude o bom Sancho a lembrar…").
- `npm run build` e conferência rápida no Chromium (retrato e paisagem): texto inteiro visível, frases e palavras-chave funcionando.

### Fase 2: Interações e lentes
**Atividades** (o crivo está no §4.2):
- **3 ou 4 por parte**, alternadas com páginas calmas. Evite três páginas de atividade seguidas.
- Para cada uma: o que a criança faz, por que nasce da história, o que treina (leitura, sílabas, contagem…), o tipo no motor e como a cena muda.
- Precisa de um tipo de cartão novo? Descreva-o aqui; ele é programado na fase 4.

**Lentes** (específico de *Dom Quixote*, mas a ideia serve para qualquer obra com um "olhar" próprio): uma tabela por página com a **Realidade**, a **Imaginação**, as duas legendas e os hotspots. Decida também **camada × ilustração inteira** (`AGENTS.md` §4.2).
- Quem imagina? Por padrão, Dom Quixote. Há **exceções** (a de Sancho governador; a das crianças no final). Escreva-as.
- **Episódios encenados por outros** (o teatro dos duques, Clavilenho, as Cortes da Morte): a Realidade mostra os bastidores (criados com foles e tochas), e a Imaginação, o que os heróis acreditam ver.

**Lista de arte**: cenas `-real`/`-imag` e camadas, com referências e o que cada cena deve deixar livre para as camadas. Para a API, já escreva a lista `tools/arte/<livro>-parte-N.mjs` e rode `--seco` para saber o custo.

### 🛑 Fase 3: Revisão humana do texto e do plano
O humano lê o rascunho **no tablet, com a criança**, na voz do aparelho, com o plano de interações e lentes ao lado (no caderno). Roteiro de observação no §6.3. As notas vêm no prompt da sessão seguinte (ou no chat), e o Claude as registra no caderno.
- Depois dos ajustes, **a estrutura fica congelada**: número de páginas, ordem, numeração dos capítulos e nomes de arquivo. Mudar isso depois da arte gera renomeações em cadeia (aconteceu com a Parte 2, P-007).

### Fase 4: Ilustrações e atividades
1. **Autorização e verba**: arte pela API só com autorização no prompt da sessão; antes, some o gasto do mês (`docs/arte/gastos.csv` + `docs/narracao/gastos.csv`) e confira o teto. Sem autorização, a arte vai para o Gemini no Antigravity (`docs/fila/PEDIDOS.md`).
2. **Rodadas** (`ARTE-PELA-API.md` §3 e §5):
   - rodada 1: as Realidades sem dependência e as camadas soltas;
   - rodada 2: as Imaginações como **edição** da Realidade aceita e as camadas que usam a cena como referência;
   - rodada 3: só o que falhou, com o prompt corrigido.
   Olhe **cada** imagem antes de aceitar.
3. **Integração**: posicione as camadas **pela arte entregue**, não pelo plano; personagens em **escala proporcional à perspectiva** (o humano achou pequenas as primeiras camadas da pousada); camadas sempre em `.webp`.
4. **Programe** as atividades e os tipos de cartão novos.
5. **Teste** no Chromium/Playwright em 800 × 1280 e 1280 × 800, nas duas lentes, cada atividade até o fim (clique com `locator.click()`), o botão 🔄 Recomeçar e a virada de página. Mande ao humano capturas das páginas com atividade.

### 🛑 Fase 5: Revisão final
O humano lê o livro ilustrado (ainda em rascunho) com a criança. Ajustes pequenos entram na mesma sessão.
- Depois do "aprovado", **o texto fica congelado**. Qualquer mudança daqui em diante custa regravar a narração e refazer as traduções.

### Fase 6: Narração em português (API)
Só com autorização no prompt da sessão (`TODO-NARRACAO.md`):
1. `npm run exportar:frases`, o **roteiro** (quem fala cada trecho) e o **elenco** (mesmas vozes para os mesmos personagens em todo o livro).
2. Planeje com `--seco`. Grave com `--pagina-inteira` no Flex, as palavras-chave em grupos, e confira tudo no Whisper local (no máximo 2 tentativas).
3. Escreva `docs/narracao/qa-parte-N.md` com o que vale o humano ouvir.

🛑 **Escuta do humano.** Depois, a **publicação**: tirar o `rascunho`, abrir a parte na estante, pôr a parte em `partes` no `vozes.js` e ajustar o `fim.proxima` da parte anterior.

### Fase 7: Outros idiomas (só com o português aprovado e autorização do humano)
1. **Traduções** (`AGENTS.md` §2.8): um agente por idioma, cada um no dia a dia de uma criança daquele idioma, com as palavras-chave silabadas no idioma e os cartões do tipo `ordem` adaptados. `npm run conferir:traducoes` sem avisos.
2. **Narração** de cada idioma, depois do "ok" do humano às traduções, com o mesmo fluxo da fase 6 (`--idioma`).
3. Sempre que der, a revisão de um leitor nativo (BACKLOG M-12).

### Fase 8: Fechamento e retrospectiva
- `npm run build`, o PR e o merge na `main`.
- Atualize o `docs/BACKLOG.md`, o `docs/RETOMADA.md` e o caderno da parte.
- Some o que foi gasto na parte e informe ao humano.
- **Pergunte: o que aprendemos?** Toda lição nova entra no §7 (e na regra certa desta receita).

---

## 4. Regras de ouro por área

### 4.1 Texto
- Uma ideia por frase. Verbos concretos, imagens vivas ("como um rio vermelho"), diminutivos e humor cabem.
- Evite arcaísmos e palavras de livro antigo (vossa mercê, donzela, estalagem, desventurada, carmesim), ênclises e mesóclises rebuscadas e adjetivos empilhados.
- Todo evento responde a três perguntas da criança: **por que** aconteceu, **o que** aconteceu e **o que mudou** depois.
- Episódios contados por outros personagens (histórias dentro da história) quase sempre saem; quando ficam, saem resumidos numa fala curta.

### 4.2 Atividades: o crivo e o padrão ouro
**O crivo** (todas as respostas precisam ser "sim"):
1. Nasce de algo que **acontece na história** naquela página?
2. A criança **ajuda um personagem** a fazer algo que a história precisa?
3. A cena **muda de verdade** quando ela termina?
4. Treina alguma coisa: **leitura, sílabas, letras, contagem** ou, no mínimo, observação de causa e efeito?
5. É **curta** (até 5 toques, cerca de 1 minuto) e o erro gera só uma **dica gentil**?

**Padrão ouro: a assinatura da carta** (Parte 3, cap. 18, nota 10 do humano). Sancho esqueceu a carta e não lembra como Dom Quixote assina; a criança toca nas palavras na ordem certa: O CAVALEIRO DA TRISTE FIGURA.
- O problema vem da história; a criança ajuda Sancho.
- O que ela manipula são palavras de verdade, que ela lê.
- Retoma algo que ela já conhece (o apelido da Parte 2): reconhecimento e orgulho.
- Cada palavra é falada ao ser colocada (ouvir + ver = ler).
- Ao completar, a cena muda ("Sancho lembrou!") e a história segue.
- Funciona em todos os idiomas (a tradução pode ter outra quantidade de palavras).

**Cardápio de mecânicas**:
| Mecânica | O que treina | Tipo no motor | Exemplo |
| :--- | :--- | :--- | :--- |
| Ordenar as palavras de uma frase curta (até 5) | leitura de palavras, ordem da frase | `ordem` | assinatura da carta ⭐ |
| Juntar sílabas para formar uma palavra | consciência silábica | `ordem` com sílabas (testar) | (ideia) a palavra que Sancho inventa |
| Contar com a voz | números | `contagem` | as cabras no barco |
| Revelar o que está escondido | observação, causa e efeito | `camadas` com `ate` | o sopro na poeira, o sol na noite, a bengala |
| Montar a cena com as palavras do texto | vocabulário (palavra ↔ coisa) | `camadas` | a mesa dos pastores, a mala |
| Montar uma palavra letra por letra | letra e som | **tipo novo** (a criar) | (ideia) a gráfica de Barcelona |
| Disparar um efeito físico da história | causa e efeito | `acao` / `camadas` + efeito | o VENTO nos moinhos, a cambalhota |

Varie as mecânicas dentro da parte; uma mecânica muito repetida perde a graça.
- **Banido**: cartões que só fazem a cena tremer (LUA CHEIA e ESPADA na sagração da Parte 1) e celebrações soltas (tipo `livre`).
- **Ilustrações cumulativas** pedem ordem fixa (`progressivo`). Escolher a etapa pela **quantidade** de itens usados foi o bug "toco na bacia e ele veste o peitoral". Se a ordem for livre, use camadas independentes.

### 4.3 Lentes e Imaginação
- A Imaginação **transforma** os personagens e o mundo (o cavaleiro dourado, o corcel branco, Sancho escudeiro, o conto de fadas). Mantém da Realidade **só** a câmera, o layout e o lugar, o tamanho e a pose de cada um. Imaginações que trocavam só um detalhe foram reprovadas (as 9 da Parte 2 foram refeitas).
- Só aparecem os personagens e animais que estão na Realidade.
- O texto **não muda** com a lente; só a cena muda.
- Nunca troque de lente sozinho: o botão só pulsa para convidar (`AGENTS.md` §4.2, tempo de contemplação).
- Monstros com a atmosfera clássica do livro, nunca alienígenas nem desenho genérico; descreva o rosto ("gentle bearded face, kind ordinary eyes").

### 4.4 Arte
- Gere sempre a Realidade primeiro e a Imaginação como edição dela, com as fichas e as cenas aprovadas como referência.
- **Camadas sobre magenta puro `#FF00FF`**, nunca sobre branco. Recorte com `tools/recortar-camada.py` (`--sem-rosa`, `--sem-contorno`).
- No código, a camada aponta para o **`.webp`** (um `.png` não carrega e cai no emoji).
- Diga o que **não** pintar onde vai uma camada; peça objetos **seguros nas duas mãos** (senão flutuam); diga "é o ÚNICO animal" quando o burrico não está na página.
- Sem texto legível na imagem. Nunca achatar recortes numa cena pronta (`AGENTS.md` §4.1).
- Personagens novos nascem numa página e servem de referência para as seguintes; isso define a ordem das rodadas.

### 4.5 Narração
- **Página inteira** num pedido só, com a narradora e uma voz por personagem, a mesma em todas as partes.
- **Voz de criança por descrição é bloqueada** pela API: use a voz mais jovem da biblioteca. Não tente contornar.
- Limite de 100 pedidos por dia: cache de blocos e palavras-chave em grupos de até 10.
- A conferência é **local** (Whisper). A API paga só produz vozes.
- O título do capítulo é lido. Nomes estrangeiros com pronúncia anotada (`TODO-NARRACAO.md` §5).

### 4.6 Traduções
- Só depois do português aprovado. As traduções da Parte 3 foram refeitas duas vezes porque o português mudou depois.
- O `hash` de cada página mostra o que ficou desatualizado (`npm run conferir:traducoes`).

### 4.7 Engenharia
- Um motor só (`assets/js/livro.js`); cada parte é só configuração. Melhoria no motor vale para todos os livros.
- `npm run build` depois de mudar HTML, classes, ícones ou imagens; nunca edite `sw.js` à mão.
- Nada publicado quebra: rascunho (`rascunho: true`) até a publicação; conteúdo antigo arquivado, nunca apagado sem substituto.

### 4.8 Custos de referência (Dom Quixote, out/2026)
| Item | Custo real | Observação |
| :--- | :--- | :--- |
| Arte de uma parte pela API (~22 imagens, Batch) | ~US$ 0,80 | ~US$ 0,037 por imagem aceita, já com as refeitas |
| Narração em português de uma parte (Flex) | ~US$ 0,08 | páginas inteiras + palavras-chave |
| Narração de uma parte em outro idioma | ~US$ 0,08 por idioma | |
| Traduções (agentes) | US$ 0 | sem API paga |
| **Parte completa em 4 idiomas** | **~US$ 1,20** (≈ R$ 7) | teto do humano: R$ 30/mês |

---

## 5. Papéis e canais
- **Humano**: editor-chefe e primeiro leitor (com o filho). Aprova as paradas 🛑, autoriza a API e define o teto.
- **Claude**: adaptação, texto, plano de interações e lentes, código, testes, narração e (com autorização) arte pela API. Escreve os documentos de plano, o caderno e a receita.
- **Gemini (Antigravity)**: arte na cota do plano Pro do humano, pela fila `docs/fila/` (cada arquivo tem um único dono).
- **Sessões**: o trabalho é feito em sessões do Claude, cada uma com uma ou duas fases, aberta com um prompt que diz a parte, a fase e as autorizações (modelos no plano do livro). Cada sessão termina com PR e merge na `main` e com o caderno e a `RETOMADA.md` atualizados.

---

## 6. Modelos

### 6.1 Caderno da parte (`docs/cadernos/<livro>-parte-N.md`)
```markdown
# Caderno — <Livro>, Parte N: <título>
Arquivo do livro: <livro>/parte-N.html (rascunho: sim/não) · Capítulos do original: … · Nossos capítulos: …

| Fase | Situação | Data | PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 1 Adaptação e texto | ⬜ / 🟡 / ✅ | | | — |
| 2 Interações e lentes | | | | — |
| 3 Revisão humana 🛑 | | | | — |
| 4 Ilustrações e atividades | | | | US$ |
| 5 Revisão final 🛑 | | | | — |
| 6 Narração (pt) + escuta 🛑 | | | | US$ |
| Publicação | | | | — |
| 7 Idiomas (en, fr, es) | | | | US$ |
| 8 Retrospectiva | | | | — |

## 1. Escaleta
| Pág. | Capítulo nosso | Episódio | Original | O que acontece | Fio (planta/colhe) |
## 2. O que ficou de fora e por quê
## 3. Atividades (crivo do §4.2)
## 4. Lentes (Realidade × Imaginação, legendas, hotspots, camadas)
## 5. Notas do humano e o que mudou
## 6. Arte (lista, rodadas, refeitas, gasto)
## 7. Narração (elenco, QA, gasto)
## 8. Traduções
## 9. Lições para a receita
```

### 6.2 Prompt para abrir uma sessão
```text
Leia docs/RETOMADA.md e o caderno docs/cadernos/<livro>-parte-N.md.
Faça a(s) fase(s) <X> da Parte N, seguindo docs/RECEITA-CLASSICO-VIVO.md e docs/PLANO-<…>.md.
Minhas notas da revisão: <…>            (quando houver)
Autorizo a API paga do Gemini para <produzir X da Parte N>, até US$ <teto>.   (só nas fases 4, 6 e 7)
Pare na próxima parada 🛑 e me diga o que ler.
```

### 6.3 Roteiro de observação para o humano (fases 3 e 5)
- Ao fim de cada página, peça à criança para **recontar** com as palavras dela. Onde ela travou?
- Alguma pergunta do tipo **"por que ele fez isso?"** ou **"quem é esse?"** Isso indica evento sem motivo ou personagem não apresentado.
- Alguma **palavra** fez a leitura parar? Anote.
- Alguma página **longa demais** (a criança se dispersou)?
- Na atividade: ela **quis** fazer? Entendeu **sem ajuda**? Ficou **frustrada**? Pediu para **repetir**?
- A ligação com a parte anterior faz sentido? O fim dá vontade de ler a próxima?
- Fase 5: as Imaginações **surpreendem**? Alguma imagem contradiz o texto?

---

## 7. Diário de lições (mais recente primeiro)

| Data | Lição | Origem | Virou regra em |
| :--- | :--- | :--- | :--- |
| 2026-10-25 | Divisão desproporcional estraga a história: 81 capítulos em 7 páginas deixaram a Parte 4 apressada e mal encadeada | leitura do humano com o filho | §2.2, §2.3 |
| 2026-10-25 | A atividade nota 10 é a que ajuda um personagem com palavras do próprio texto e retoma algo já conhecido (assinatura da carta) | humano | §4.2 |
| 2026-10-25 | Texto rebuscado demais para 6 anos: as Partes 2 a 4 foram reescritas, e as traduções e a narração refeitas (US$ 0,24 e muitas horas) | humano | §1, §3 fase 1, `AGENTS.md` §3.5 |
| 2026-10-25 | Traduzir e narrar antes de o português estar aprovado gera retrabalho em cascata (traduções da Parte 3 refeitas duas vezes) | histórico | §3 fases 5 a 7 |
| 2026-10-24 | Imaginação que muda só um detalhe não encanta; precisa transformar personagens e mundo | humano | §4.3, `ARTE-PELA-API.md` §4.1 |
| 2026-10-24 | Sem a regra "só os personagens da Realidade", o modelo acrescenta o burrico e o cavaleiro dourado onde não estão | arte das Partes 3 e 4 | §4.3 |
| 2026-10-24 | Acrescentar uma página depois da arte começada obrigou a renomear arquivos em cadeia (P-007) | Parte 2 | §3 fase 3 (congelar a estrutura) |
| 2026-10-24 | Camadas apontando para `.png` não carregavam | Partes 2 a 4 | §4.4 |
| 2026-10-24 | Página inteira num pedido só soa muito melhor que frase por frase | escuta do humano | §4.5 |
| 2026-10-24 | Voz de criança por descrição é bloqueada pela API; limite de 100 pedidos por dia | narração | §4.5 |
| 2026-10-23 | Camadas recortadas de fundo branco perdem as partes claras e ficam com "chão" e halo; magenta resolve | P-003/P-005 | §4.4 |
| 2026-10-23 | Camadas pequenas demais parecem coladas: escala proporcional à perspectiva | humano | §3 fase 4 |
| 2026-10 | Etapas cumulativas escolhidas pela quantidade de itens trocavam a roupa errada | sprint 1 | §4.2 |
| 2026-10 | Cartões que só fazem a cena tremer são ruído (LUA CHEIA, ESPADA) | sprint 1 | §4.2 |
