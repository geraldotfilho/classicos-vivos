# 🎨 TODO — Ilustrações das Partes 2, 3 e 4 (agente Gemini + Nano-Banana)

Os textos e as interações das Partes 2–4 de **Dom Quixote** já estão prontos em `dom-quixote/parte-2.html`, `parte-3.html` e `parte-4.html`. O livro **já funciona sem a arte**: as cenas mostram "Ilustração a caminho" e as camadas aparecem como emojis provisórios. Cada arquivo entregue substitui automaticamente o provisório, **sem mexer no código**.

> As tarefas do arquivo [`TODO-NANO-BANANA.md`](TODO-NANO-BANANA.md) (Parte 1) continuam valendo e **têm prioridade**. Este arquivo vem depois delas.

---

## 0. Como trabalhar (leia antes de começar)

### 0.1 Regras gerais
Valem **todas as regras gerais do `TODO-NANO-BANANA.md` §0** (Master Style, Character Bible, referências, 16:9 a 1376 × 768, sem texto na imagem, camadas com alfa e sombra de contato, nunca achatar recortes, um commit por tarefa). Resumo do essencial:

1. Abra **todo** prompt com o *Master Style*:
   > `Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image.`
2. Para personagens, use as descrições da *Character Bible* de [`dom-quixote/PROMPTS_ILUSTRACOES.md`](../dom-quixote/PROMPTS_ILUSTRACOES.md) e as **novas** descrições da seção 0.3 abaixo.
3. Envie as **referências** listadas em cada tarefa como imagens de contexto.
4. **Lente da Realidade × Lente da Imaginação**: as duas versões de uma página têm **a mesma câmera, o mesmo enquadramento e os personagens nas mesmas posições**. Gere a `-real` primeiro e depois a `-imag` **editando a `-real`**. A Imaginação é como Dom Quixote enxerga: mágica, dourada, heroica, mas sempre com a atmosfera clássica de Cervantes (nada de aliens nem monstros genéricos de desenho animado, `AGENTS.md` §4.4).
5. **Cenários para camadas**: quando uma página tem camadas, o cenário `-real` precisa deixar **livre** a área onde a camada vai aparecer (descrita em cada tarefa). Gere depois cada camada **usando o cenário como referência** (luz, escala, perspectiva, paleta).

### 0.2 Onde salvar e como entregar
```text
dom-quixote/imagens/parte-2/          pN-real.png, pN-imag.png ...
dom-quixote/imagens/parte-2/camadas/  camadas com fundo transparente
dom-quixote/imagens/parte-3/ ...
dom-quixote/imagens/parte-4/ ...
```
- Salve o PNG com **o nome exato** da tarefa (o código já espera esse nome, **trocando `.png` por `.webp`**).
- Converta e atualize a lista offline:
  ```bash
  npm run build:images   # converte todos os PNG/JPG de imagens/ (inclusive camadas/) para WebP e apaga os originais
  npm run build:sw
  ```
- Abra o livro para conferir. Exemplo: `dom-quixote/parte-2.html?page=2` (e `&imag=1` para a Lente da Imaginação).
- Commit por página: `art(dom-quixote): parte 2, página 2 — pastores (cena + camadas)`.
- **Não edite os HTML.** Se uma posição de camada ficar visivelmente errada, anote na mensagem do commit ("camada X precisa subir ~3%"); o ajuste é feito no código depois.

### 0.3 Character Bible — personagens novos (acrescente ao `PROMPTS_ILUSTRACOES.md`)
- **Continuidade de Dom Quixote nas Partes 2–4**:
  - Parte 2, páginas 1 a 7: a bacia de latão na cabeça está **amassada** (depois do tombo nos moinhos) e a lança é um **galho seco de carvalho** (a partir da página 2).
  - A partir da Parte 2, página 4 (batalha das ovelhas): sorriso com uma **"janelinha"** de dois dentes faltando, de jeito simpático, nunca grotesco.
  - A partir da Parte 2, página 8: usa a **bacia nova do barbeiro**, maior, muito brilhante, um pouco torta.
  - "Camisolão": camisa de dormir branca e comprida até os joelhos, pernas finas à mostra (Parte 3, páginas 2 e 6).
- **Pastores de cabras** (Parte 2): `six friendly weathered Spanish goatherds of different ages in rough brown wool and sheepskin vests, with crooks, around a small campfire`.
- **Barbeiro de Mambrino** (Parte 2): `a startled thin village barber in a grey cloak riding a small grey donkey, wearing a shiny brass shaving basin upside down on his head to protect his new hat from the rain`.
- **Padre Pero Pérez** (Parte 3): `a kind round-faced village priest in his fifties with a black cassock, small round spectacles and a warm smile`.
- **Mestre Nicolau, o barbeiro da aldeia** (Parte 3): `a lanky cheerful village barber with a thin black mustache`. Disfarçado, usa `a huge fake ginger beard made from an ox tail, comically crooked`.
- **Doroteia / Princesa Micomicona** (Parte 3): `a clever brave young Andalusian woman with long dark braided hair and bright eyes, in a simple travelling dress` (Realidade). Como princesa (Imaginação): `a fairytale princess of a faraway kingdom in a flowing turquoise and gold gown with a delicate golden circlet`.
- **Estalajadeiro da Parte 3**: `a stout bald innkeeper with bushy eyebrows and a red sash`, diferente do estalajadeiro da Parte 1.
- **Sobrinha Antônia e a governanta** (Parte 4): `a sweet twenty-year-old niece with chestnut hair in a bun and an apron` / `a plump motherly housekeeper of forty with a white cap`.
- **Teresa Pança e Sanchica** (Parte 4): `Sancho's warm-hearted wife, sturdy and rosy, with a headscarf` / `their lively little daughter of about eight with braids`.
- **Duque e Duquesa** (Parte 4): `an elegant playful Spanish duke and duchess in rich velvet clothes of the early 1600s, smiling mischievously`.
- **Sansão Carrasco / Cavaleiro da Branca Lua** (Parte 4): `a young bachelor neighbour with curly hair`. Como cavaleiro: `in shining silver armour with a large white crescent moon painted on his round shield`.

### 0.4 Sistema de posições das camadas
As posições estão no código em **% do quadro 16:9**:
- `x` = centro horizontal da camada (0 = borda esquerda, 100 = borda direita);
- `y` = **base** da camada, onde ela "pisa" (0 = topo, 100 = rodapé);
- `w` = largura da camada em % da largura do quadro.

Exemplo: `x 51, y 88, w 12` = um objeto com 12% da largura da cena, centrado um pouco à direita do meio, apoiado a 88% da altura (perto do chão em primeiro plano). Gere as camadas com **recorte justo** (pouca margem transparente em volta do objeto) e já na **perspectiva** daquele ponto da cena.

---

## 📗 PARTE 2 — Exércitos de Lã e o Elmo Encantado (`imagens/parte-2/`)

> ✅ **Parte 2 completa (2026-10-24).** Páginas 0–3 pelo Gemini (Antigravity); páginas 4–8 pelo Claude, pela API (`tools/arte/dom-quixote-parte-2.mjs`, `docs/ARTE-PELA-API.md`). As posições finais das camadas estão no `parte-2.html` (mudaram em relação às tabelas abaixo, porque seguem a arte entregue).

> ⚠️ **Renumerada em 2026-10-24** (Claude): a revisão do texto abriu a Parte 2 com um capítulo novo (o tombo nos moinhos), e a parte passou a ter **9 páginas (0 a 8)**. As páginas antigas 1 a 7 viraram **2 a 8**, com os arquivos renomeados (cenas e camadas). Já entregues e renomeados: `p0-real`, `p0-imag`, `p2-real` (a lança de carvalho, antes `p1-real`) e `p3-real` (os pastores, antes `p2-real`). **Use os nomes desta seção.**

| Pág. | Cena | Arquivos | Interação |
| :--- | :--- | :--- | :--- |
| 0 | Capa | `p0-real`, `p0-imag` | — |
| 1 | A carga contra os gigantes e o tombo | `p1-real`, `p1-imag` | toque em Dom Quixote e em Sancho |
| 2 | A lança de carvalho | `p2-real`, `p2-imag` | toque em Sancho dormindo |
| 3 | Pastores e a Idade de Ouro | `p3-real`, `p3-imag` + 3 camadas | BOLOTAS, QUEIJO, LEITE aparecem na pele de ovelha |
| 4 | Os exércitos de poeira | `p4-real`, `p4-imag` + 2 camadas | SOPRO dissipa a poeira e revela as ovelhas |
| 5 | O Cavaleiro da Triste Figura | `p5-real`, `p5-imag` | toque na lanterna |
| 6 | As cabras que atravessam o rio | `p6-real`, `p6-imag` + 2 camadas | BARCO traz cada cabra (contagem até 5) |
| 7 | O segredo do amanhecer | `p7-real`, `p7-imag` + 1 camada | SOL tira o véu da noite; martelos balançam |
| 8 | O elmo de Mambrino | `p8-real`, `p8-imag` | toque no elmo |

### P2-0 · Capa
- **`p0-real.png`**: estrada de terra dourada de La Mancha ao fim da tarde. Dom Quixote no Rocinante magrinho (bacia **amassada**, galho de carvalho como lança) e Sancho no burrico cinza, de costas para o leitor, em três quartos, olhando o horizonte, onde se vê uma **nuvem de poeira** e, bem pequenino, um rebanho de ovelhas. Moinhos minúsculos ao fundo, à esquerda (lembrança da Parte 1).
- **`p0-imag.png`**: mesma composição. A nuvem de poeira vira **dois exércitos de cavaleiros com estandartes coloridos**, e a bacia de Dom Quixote brilha como um **elmo de ouro**, com raios de luz.
- **Referências**: `dom-quixote/imagens/p6-real.webp`, `p0-real.webp` e `p0-imag.webp` (Parte 1), `biblioteca/referencias/personagens/dom-quixote-rocinante-real.png`, `sancho-panca-acenando.png`.

### P2-1 · A carga contra os gigantes e o tombo *(página nova, 2026-10-24)*
- **`p1-real.png`**: a mesma planície de Campo de Criptana da Parte 1 (moinhos brancos de pás de madeira, céu claro com nuvens de vento), um instante **depois** do tombo. Em primeiro plano, à esquerda e no centro (zona x 15–50, y 40–95), **Dom Quixote e Rocinante caídos de lado na relva macia**, de pernas para o ar, de jeito engraçado e sem machucado à vista: a bacia **amassada** torta na cabeça, a **lança partida** em lascas espalhadas na grama e a ponta presa numa das pás do moinho mais próximo, ao fundo. À direita (zona x 60–90, y 30–90), **Sancho chegando aflito no burrico cinza**, com as duas mãos na cabeça. Poeira e folhas rodopiando no ar. Humor físico, **nunca dor**.
- **`p1-imag.png`**: a mesma cena como Dom Quixote a vê: o moinho mais próximo é um **gigante de pedra, terra e musgo** cujos braços são as próprias vigas girando (AGENTS.md §4.4), e, no céu, a silhueta de um **mago de manto escuro e chapéu pontudo (Frestón)** soprando o vento com as bochechas cheias, entre faíscas douradas. Dom Quixote, caído na grama, já ergue o braço com um sorriso nobre. Sancho continua no burrico, com as mãos na cabeça.
- **Referências**: `dom-quixote/imagens/p7-real-sem-pas.webp`, `camadas/p7-pas-moinho.webp` e `p7-imag.webp` (moinhos e gigantes da Parte 1), `biblioteca/referencias/personagens/dom-quixote-rocinante-real.png`, `sancho-panca-acenando.png`.
- **Aceite**: é o mesmo lugar e a mesma luz da página 8 da Parte 1; o tombo é cômico e acolhedor; a criança reconhece a lança partida.

### P2-2 · A lança de carvalho (noite estrelada)
- **`p2-real.png`**: noite azul-escura e estrelada no campo. À esquerda, um **velho carvalho** retorcido. Embaixo dele, Dom Quixote sentado, encostado no tronco, acordado, olhando as estrelas, com o galho seco de carvalho como lança apoiado no ombro. A bacia **amassada** está ao lado, na grama. À direita (zona x 66, y 55–95), **Sancho dormindo** de boca aberta sobre um saco, com um pedaço de pão na mão. Rocinante e o burrico cochilam ao fundo. Pequena fogueira quase apagada.
- **`p2-imag.png`**: mesma cena. O carvalho brilha com folhas douradas, o galho na mão de Dom Quixote vira uma **lança encantada de madeira dourada** com uma flâmula, e entre as estrelas aparece, em constelação, o **rosto sereno de Dulcineia**. Sancho continua dormindo (com estrelinhas em volta).
- **Referências**: `dom-quixote/imagens/p5-real.webp` (noite da Parte 1) e `p3-imag.webp` (Dulcineia).

### P2-3 · Os pastores e a Idade de Ouro *(com camadas)*
- **`p3-real.png`** (cenário com personagens): fim de tarde num campo com pedras e azinheiras. **Seis pastores de cabras** (Character Bible), Dom Quixote e Sancho sentados em semicírculo ao redor de uma fogueira, à esquerda e no fundo. Em primeiro plano, no centro, **uma pele de ovelha estendida no chão, VAZIA**, ocupando a zona horizontal **x 33–68**, com a borda inferior em **y ≈ 90**. Algumas cabras pastando ao fundo. Dom Quixote com o braço erguido, como quem discursa.
- **Camadas** (`camadas/`, fundo transparente, apoiadas sobre a pele de ovelha):
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p3-bolotas.png` | tigela de madeira cheia de bolotas (frutos do carvalho), algumas soltas | x 40, y 86, w 11 |
  | `p3-queijo.png` | meio queijo de cabra redondo, amarelado, com uma fatia cortada | x 51, y 88, w 12 |
  | `p3-leite.png` | jarra de barro com leite, com uma gotinha escorrendo | x 62, y 86, w 8 |
- **`p3-imag.png`**: a **Idade de Ouro** que Dom Quixote descreve. A mesma roda, agora num prado dourado e florido onde as pessoas e os animais vivem em harmonia: árvores carregadas de frutas que todos colhem, abelhas oferecendo mel em favos, um riacho cristalino, crianças e pastores dividindo comida. A pele de ovelha vira uma **toalha dourada farta**. Luz quente de entardecer mágico.
- **Referências**: personagens de `dom-quixote/imagens/p6-real.webp` (Parte 1).
- **Aceite**: com as três camadas sobre a pele de ovelha, parece uma única pintura, e cada comida se lê bem sozinha.

### P2-4 · Os exércitos de poeira *(com camadas)*
- **`p4-real.png`**: planície seca e larga sob céu claro. **Dois rebanhos de ovelhas** vêm de lados opostos: um à esquerda (zona x 10–50, base y ≈ 90) e outro à direita (x 55–95), com pastores ao fundo. Dom Quixote no Rocinante, num pequeno morro à esquerda, apontando com o galho-lança. Sancho no burrico, ao lado, com a mão em concha na orelha.
- **Camadas** (nuvens de poeira que **escondem** cada rebanho até a criança soprar):
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p4-poeira-esquerda.png` | nuvem densa de poeira dourada-acinzentada, ondulante, que cobre totalmente o rebanho da esquerda | x 30, y 92, w 46 |
  | `p4-poeira-direita.png` | nuvem semelhante, para o rebanho da direita (não espelhe exatamente) | x 74, y 92, w 46 |
- **`p4-imag.png`**: mesma planície, mas cada rebanho vira um **exército medieval de conto de fadas**: à esquerda, o exército de **Alifanfarrão da Trapobana** (estandartes vermelhos, elefantes ao longe); à direita, o de **Pentapolim do Braço Arregaçado** (estandartes azuis, o próprio Pentapolim com a manga direita dobrada). Poeira dourada e lanças erguidas, sem violência explícita.
- **Aceite**: com as camadas visíveis, **nenhuma ovelha aparece**. Sem elas, os dois rebanhos são o centro da cena.

### P2-5 · O Cavaleiro da Triste Figura
- **`p5-real.png`**: noite, close médio. À esquerda (zona x 20–45), **Sancho levanta uma lanterna** de lata com luz amarela. À direita, o **rosto comprido, magro e cansado de Dom Quixote**, barba por fazer, bacia amassada, com um sorriso triste que mostra a janelinha dos dois dentes. A luz da lanterna desenha sombras suaves.
- **`p5-imag.png`**: a mesma cena. Atrás de Dom Quixote aparece um **escudo nobre** pintado com um rosto triste e digno, e um velho sábio-mago escreve num livro dourado as palavras do novo nome (o livro **sem letras legíveis**).
- **Aceite**: o rosto é melancólico, mas **terno**, nunca assustador.

### P2-6 · As cabras que atravessam o rio *(com camadas)*
- **`p6-real.png`**: noite muito escura junto a um rio, com árvores altas. À esquerda, **Sancho** gesticula contando uma história, ao lado de **Rocinante com as patas dianteiras amarradas** por uma cordinha (de jeito engraçado). Dom Quixote está sentado e atento. Ao fundo, à direita, um vulto indistinto e silhuetas de onde vem o barulho (sem mostrar os martelos). **Deixe o terço direito superior (x 45–95, y 10–60) com céu escuro e liso**, porque ali aparece o balão da história.
- **Camadas**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p6-balao-historia.png` | grande **balão de pensamento** em aquarela clara saindo de Sancho, mostrando o rio Guadiana à luz do dia com um **barquinho** e a margem do outro lado (vazia, sem cabras) | x 70, y 62, w 52 |
  | `p6-cabra.png` | **uma cabrinha** simpática de perfil, olhando para a direita, pequena (cabe no balão); a mesma imagem é usada 5 vezes | x 56–84, y 44, w 6 |
- **`p6-imag.png`**: mesma noite, mas, na escuridão à direita, Dom Quixote imagina um **gigante ferreiro** de pedra e brasa martelando uma bigorna enorme, com faíscas. Mitológico, não monstruoso. O balão de Sancho fica de fora (é camada).
- **Aceite**: com as cinco cabrinhas lado a lado dentro do balão, todas cabem na margem de chegada.

### P2-7 · O segredo do amanhecer *(com camada)*
- **`p7-real.png`**: **amanhecer** rosado e dourado junto ao rio. À direita (zona x 58–86, y 35–65), um galpão de madeira aberto com **seis grandes martelos de madeira (pisões)** movidos por uma roda d'água, batendo em panos de lã. **Pinte os martelos em repouso** (a camada animada fica por cima). À esquerda, **Sancho segurando a barriga de tanto rir**, quase caindo do burrico, e Dom Quixote com expressão entre bravo e começando a rir.
- **Camada**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p7-martelos.png` | o conjunto dos martelos de madeira **levantados**, sem o galpão; o livro balança a camada para simular as batidas | x 72, y 62, w 26 |
- A **escuridão da noite** é um véu feito em código (CSS) que some quando a criança toca em SOL. **Não precisa de arte**.
- **`p7-imag.png`**: como Dom Quixote tinha imaginado à noite: a **forja encantada dos gigantes**, com martelos colossais de pedra, fagulhas douradas e o rio brilhando. Sancho continua rindo.

### P2-8 · O elmo de Mambrino
- **`p8-real.png`**: chuva fina e prateada numa estrada. No centro-esquerda, Dom Quixote no Rocinante **ergue com as duas mãos** a bacia de latão nova, molhada e brilhante (zona do elmo: x 38–60, y 8–38). À direita, o **barbeiro** corre para longe, segurando o chapéu, deixando o burrinho para trás. Em primeiro plano, Sancho sentado no chão, rindo.
- **`p8-imag.png`**: a bacia vira o **lendário Elmo de Mambrino**: um elmo de ouro com plumas e pedras preciosas, iluminando a chuva como um arco-íris. Dom Quixote parece um rei-cavaleiro.

---

## 📘 PARTE 3 — Serra Morena e a Princesa Micomicona (`imagens/parte-3/`)

| Pág. | Cena | Arquivos | Interação |
| :--- | :--- | :--- | :--- |
| 0 | Capa | `p0-real`, `p0-imag` | — |
| 1 | A mala perdida | `p1-real`, `p1-imag` + 2 camadas | MOEDAS e CADERNO saem da mala |
| 2 | As cambalhotas | `p2-real`, `p2-imag` + 1 camada | CAMBALHOTA gira Dom Quixote |
| 3 | A carta para Dulcineia | `p3-real`, `p3-real-lembrou`, `p3-imag` | palavras da assinatura em ordem |
| 4 | Amigos disfarçados | `p4-real`, `p4-imag` | toque na barba |
| 5 | A princesa Micomicona | `p5-real`, `p5-imag` | toque na princesa |
| 6 | A batalha dos odres | `p6-real`, `p6-imag` + 2 camadas | ESPADA estoura os 3 odres |
| 7 | Armas e letras | `p7-real`, `p7-imag` | toque em Dom Quixote |

### P3-0 · Capa
- **`p0-real.png`**: trilha estreita subindo montanhas rochosas, com azinheiras retorcidas e pedras avermelhadas. Dom Quixote (bacia nova, brilhante) e Sancho no burrico, vistos de trás, subindo. Águia no céu.
- **`p0-imag.png`**: as montanhas viram um **reino encantado**: castelos nos picos, cachoeiras de luz e um caminho dourado.

### P3-1 · A mala perdida *(com camadas)*
- **`p1-real.png`**: clareira pedregosa. No centro-baixo (zona x 38–64, y 70–92), uma **mala velha de couro, aberta, vazia por dentro**, molhada e meio rasgada. Sancho ajoelhado à esquerda, de olhos arregalados; Dom Quixote à direita, curioso, apoiado na lança.
- **Camadas**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p1-moedas.png` | punhado de moedas de ouro espalhadas e um saquinho de pano entreaberto | x 44, y 90, w 14 |
  | `p1-caderno.png` | caderno pequeno de capa de couro, **aberto**, com linhas de escrita ilegíveis (rabiscos, **nenhuma letra legível**) | x 58, y 90, w 13 |
- **`p1-imag.png`**: a mala vira um **baú de poeta encantado**: dele saem folhas que voam como pássaros e moedas que brilham como estrelas.

### P3-2 · As cambalhotas da saudade *(com camada)*
- **`p2-real.png`**: clareira na serra, manhã. À direita, **Sancho** tapando os olhos com uma mão e rindo, segurando as rédeas do burrico. **Deixe a zona x 30–50, y 55–95 livre** (chão de terra), onde fica a camada de Dom Quixote.
- **Camada**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p2-quixote-camisolao.png` | Dom Quixote **de camisolão** branco, em pé, braços para cima, pronto para a cambalhota, com um sorriso decidido; o livro gira a camada | x 40, y 92, w 18 |
- **`p2-imag.png`**: como Dom Quixote se vê: saltos heroicos de **cavaleiro acrobata** num anfiteatro de rochas, com plateia de águias e veados. Sancho continua rindo à direita. A zona da camada fica livre também.
- **Aceite**: a camada, girando 360° em torno do próprio centro, não deve "vazar" do quadro (deixe margem).

### P3-3 · A carta para Dulcineia
- **`p3-real.png`**: estrada no sopé da serra. Sancho no burrico, parado, **coçando a cabeça** com cara de esquecido, olhando para cima. Atrás dele, a serra; à frente, o caminho para o Toboso.
- **`p3-real-lembrou.png`**: **igual**, mas Sancho com expressão de "lembrei!": dedo levantado, olhos brilhando, uma lâmpada-ideia em aquarela suave sobre a cabeça.
- **`p3-imag.png`**: a **carta voando** como uma pomba branca de papel sobre os campos até um palácio distante no Toboso, onde Dulcineia acena de uma sacada. Sancho a cavalo, olhando-a ir.
- (As palavras da assinatura são cartões de texto. **Não ponha letras na imagem.**)

### P3-4 · Amigos disfarçados
- **`p4-real.png`**: quarto simples de uma pousada. À esquerda, o **padre** com um vestido de dama emprestado por cima da batina, uma touca, rindo; à direita (zona x 55–80, y 20–80), **mestre Nicolau** com a enorme **barba ruiva de rabo de boi** torta. Um espelho na parede reflete os dois. Sancho, na porta, gargalhando.
- **`p4-imag.png`**: como Dom Quixote os veria: uma **dama nobre** de chapéu de plumas e um **escudeiro fiel** com barba de fogo, num salão de castelo.

### P3-5 · A princesa Micomicona
- **`p5-real.png`**: clareira na serra. **Doroteia** (Realidade), com seu melhor vestido, ajoelhada diante de Dom Quixote (zona x 52–78). Atrás, escondidos atrás de uma pedra, o padre e o barbeiro (ainda de barba de boi), espiando e segurando o riso. Sancho, à esquerda, encantado.
- **`p5-imag.png`**: Doroteia como a **Princesa Micomicona** (Imaginação), com séquito real ao fundo e o **reino de Micomicão** distante (palmeiras, cúpulas douradas, rio azul). Uma sombra do gigante **Pandafilando** surge ao longe nas nuvens: mitológico, de pedra, não monstruoso.

### P3-6 · A batalha dos odres *(com camadas)*
- **`p6-real.png`**: quarto da pousada à noite, iluminado por velas. Dom Quixote, **de camisolão, dormindo em pé** (olhos fechados, sorriso sonhador), brande a espada contra o alto. Na parede da direita (zona x 48–88, y 25–58) há **ganchos de ferro vazios**, onde vão pender os odres. Na porta, o estalajadeiro de cabelo em pé e Sancho espiando.
- **Camadas**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p6-odre.png` | um **odre de couro** cheio, pendurado por uma corda (a mesma imagem é usada 3 vezes) | x 55 / 68 / 81, y 55, w 10 |
  | `p6-respingo.png` | uma **poça e respingo vermelho-arroxeado** no chão, de jeito cômico (como suco de uva derramado, nada de sangue) | x 55 / 68 / 81, y 92–94, w 16 |
- **`p6-imag.png`**: o sonho de Dom Quixote: ele enfrenta o **gigante Pandafilando da Fosca Vista**, titã de pedra e musgo, vesgo, num salão de castelo. Os odres viram as **bolsas mágicas de vinho** penduradas no cinto do gigante.

### P3-7 · Armas e letras
- **`p7-real.png`**: salão da pousada à noite, mesa comprida com velas, pão e jarras. Viajantes, Doroteia, o padre, o barbeiro (já sem a barba falsa) e Sancho escutam. Dom Quixote, de pé na cabeceira (zona x 35–60), discursa com o dedo erguido. Clima acolhedor.
- **`p7-imag.png`**: a **Grande Távola dos Contadores de Histórias**: a mesma mesa sob um teto que vira céu estrelado, com livros abertos dos quais saem pequenas cenas (cavaleiros, navios, castelos) flutuando sobre os ouvintes.

---

## 📙 PARTE 4 — A Jaula Encantada e a Ilha de Sancho (`imagens/parte-4/`)

| Pág. | Cena | Arquivos | Interação |
| :--- | :--- | :--- | :--- |
| 0 | Capa | `p0-real`, `p0-imag` | — |
| 1 | A jaula encantada | `p1-real`, `p1-imag` | toque nos bois |
| 2 | De volta para casa | `p2-real`, `p2-imag` | toque na família |
| 3 | Clavilenho | `p3-real`, `p3-imag` + 3 camadas | FOLE e TOCHA fazem a "viagem" |
| 4 | Conselhos para um governador | `p4-real`, `p4-imag` | toque em Sancho |
| 5 | O mistério da bengala | `p5-real`, `p5-imag` + 2 camadas | BENGALA quebra e revela as moedas |
| 6 | Sancho escolhe seu burrico | `p6-real`, `p6-imag` | toque em Sancho e no burrico |
| 7 | As aventuras moram nos livros | `p7-real`, `p7-imag` | toque em Alonso |

### P4-0 · Capa
- **`p0-real.png`**: Dom Quixote e Sancho no alto de uma colina, de frente para o leitor, ao nascer do sol, olhando o horizonte. Ao longe, a aldeia de La Mancha de um lado e o mar do outro.
- **`p0-imag.png`**: Sancho com **coroa de governador** e Dom Quixote com o elmo de ouro, diante de uma **ilha encantada** no horizonte, com um cavalo de madeira alado voando no céu.

### P4-1 · A jaula encantada
- **`p1-real.png`**: estrada no campo, tarde. Um **carro de bois** de madeira, com rodas grandes, puxado por dois bois lentos (à esquerda, zona x 12–38). Em cima, uma **jaula de varas de madeira**, e dentro dela Dom Quixote sentado, sereno e sorridente. Sancho caminha ao lado com o burrico; o padre e o barbeiro vão a cavalo atrás.
- **`p1-imag.png`**: a jaula vira uma **carruagem de cristal encantada**, puxada por dois touros brancos de chifres dourados, com um mago de manto estrelado conduzindo.

### P4-2 · De volta para casa
- **`p2-real.png`**: praça da aldeia de La Mancha num domingo, com casas brancas e vizinhos curiosos. À esquerda, a **sobrinha Antônia** e a **governanta** abraçam Dom Quixote. À direita (zona x 62–92), Sancho é recebido por **Teresa Pança** e a pequena **Sanchica**, que pula no colo dele.
- **`p2-imag.png`**: como Dom Quixote sente o retorno: um **desfile triunfal**, com bandeirinhas, pétalas no ar e a aldeia decorada como uma cidade real.

### P4-3 · Clavilenho, o cavalo voador *(com camadas)*
- **`p3-real.png`**: jardim do castelo dos duques, entardecer. Ao fundo, o **duque e a duquesa** e criados segurando o riso. **Deixe livre a zona central x 33–63, y 50–92** (onde fica o cavalo de madeira com os cavaleiros). À esquerda, um **criado com um grande fole**; à direita, outro com uma **tocha**.
- **Camadas**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p3-clavilenho.png` | **Clavilenho**: cavalo de madeira com uma cravelha (pino) na testa, montado por **Dom Quixote e Sancho de olhos vendados**, Sancho agarrado à cintura do amo | x 48, y 90, w 30 |
  | `p3-vento-fole.png` | lufadas de vento em aquarela (espirais e folhas voando) saindo do fole em direção ao cavalo | x 25, y 60, w 22 |
  | `p3-calor-tocha.png` | brilho quente e faíscas da tocha perto do rosto de Sancho | x 70, y 45, w 16 |
- **`p3-imag.png`**: o que eles imaginam: **voando entre as estrelas** num Clavilenho alado, atravessando nuvens e passando perto de um sol sorridente, com a terra pequenina lá embaixo. Esta é a ilustração inteira da lente: sem camadas.

### P4-4 · Conselhos para um governador
- **`p4-real.png`**: jardim do castelo, manhã. Dom Quixote, sentado num banco de pedra, fala com a mão no ombro de Sancho; Sancho, de pé (zona x 55–85), escuta com os olhos marejados, segurando o chapéu, com o burrico ao lado.
- **`p4-imag.png`**: Sancho imaginado como **governador sábio** num trono simples de madeira sob uma palmeira, com uma balança da justiça e o povo da ilha sorrindo ao redor.

### P4-5 · O mistério da bengala *(com camadas)*
- **`p5-real.png`**: sala de audiências da vila "Barataria". Sancho sentado numa grande cadeira de governador, pensativo, com a mão no queixo. À esquerda, o velhinho que reclama; à direita, o velhinho sério. No centro e em primeiro plano, **deixe o chão livre** (zona x 40–60, y 75–95) para a bengala.
- **Camadas**:
  | Arquivo | Conteúdo | Posição |
  | :--- | :--- | :--- |
  | `p5-bengala-inteira.png` | uma **bengala de madeira** grossa, inteira, caída no chão, levemente inclinada | x 50, y 92, w 7 |
  | `p5-bengala-quebrada.png` | a mesma bengala **partida ao meio**, oca por dentro, com **dez moedas de ouro** espalhadas e brilhando | x 50, y 94, w 18 |
- **`p5-imag.png`**: Sancho como **rei sábio** num trono, com uma coruja no ombro, e a sala vira um tribunal de conto de fadas.

### P4-6 · Sancho escolhe seu burrico
- **`p6-real.png`**: estábulo simples, luz da manhã entrando pelas frestas. Sancho, já sem as roupas de governador, **abraça o pescoço do burrico** de olhos fechados (zona x 30–75). Ao fundo, na porta, os moradores da vila olhando tristes a partida dele.
- **`p6-imag.png`**: Sancho e o burrico caminhando livres por um **campo florido sem fim**, com pombas brancas voando. A coroa de governador ficou pendurada num galho, para trás.

### P4-7 · As aventuras moram nos livros (final da coleção)
- **`p7-real.png`**: sala de Alonso Quixano à noite, com lareira acesa (a mesma sala da Parte 1, `dom-quixote/imagens/p1-real.webp`, com a poltrona verde). Alonso, idoso e sereno, sentado (zona x 20–50), **conta histórias** a um grupo de crianças da aldeia sentadas no tapete, de olhos brilhando. O gatinho laranja dorme no colo de uma das crianças.
- **`p7-imag.png`**: a mesma sala, mas, da fumaça da lareira e das palavras de Alonso, surgem **todas as aventuras da coleção**: os gigantes-moinhos, a princesa Dulcineia, o elmo de Mambrino, Sancho governador, as cabras atravessando o rio, Clavilenho voando. O leão guardião (Parte 1) deita aos pés das crianças.
- **Referências**: `dom-quixote/imagens/p1-real.webp` e `p1-imag.webp` (Parte 1), mais as ilustrações finais das Partes 2–4 que já existirem.

---

## ✅ Checklist de entrega por parte
- [ ] Parte 2: 16 cenas (`p0`–`p7`, real + imag) + 8 camadas (`p2-bolotas`, `p2-queijo`, `p2-leite`, `p3-poeira-esquerda`, `p3-poeira-direita`, `p5-balao-historia`, `p5-cabra`, `p6-martelos`)
- [ ] Parte 3: 17 cenas (inclui `p3-real-lembrou`) + 5 camadas (`p1-moedas`, `p1-caderno`, `p2-quixote-camisolao`, `p6-odre`, `p6-respingo`)
- [ ] Parte 4: 16 cenas + 5 camadas (`p3-clavilenho`, `p3-vento-fole`, `p3-calor-tocha`, `p5-bengala-inteira`, `p5-bengala-quebrada`)
- [ ] Capas da biblioteca: nenhum arquivo extra. A estante usa `p0-real` de cada parte.
- [ ] `npm run build:images` + `npm run build:sw` rodados; cada página conferida nas duas lentes, em retrato e paisagem.
