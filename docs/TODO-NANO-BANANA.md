# 🎨 TODO — Ilustrações para o Nano-Banana (agente Gemini)

Lista de ilustrações novas ou refeitas para **Dom Quixote — Parte 1**, levantadas na inspeção do sprint 1 (2026-10). Cada tarefa traz o arquivo exato, as referências visuais, o prompt e os critérios de aceite. Execute **na ordem de prioridade**.

---

## 0. Regras gerais (valem para TODAS as tarefas)

1. **Ferramenta**: gere toda arte exclusivamente com o Nano-Banana (`image-generator`), nunca com colagem SVG ou montagem manual (`AGENTS.md` §4.1).
2. **Âncora de estilo**: comece todo prompt com o *Master Style Prompt* e use as descrições de personagens da *Character Bible* em [`dom-quixote/PROMPTS_ILUSTRACOES.md`](../dom-quixote/PROMPTS_ILUSTRACOES.md):
   > `Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image.`
3. **Referências**: envie ao Nano-Banana, como imagens de contexto, os arquivos listados em cada tarefa. Elas garantem continuidade de rosto, proporção, roupas e paleta. Todos os caminhos são relativos à raiz do repositório.
4. **Formato das cenas**: 16:9, de preferência 1376 × 768 px. Personagens **sem texto, letras ou placas legíveis** (a cena antiga `p4-real-flauta` tem uma placa "Mesón del Sol", que deve ser evitada).
5. **Variações da mesma cena** (etapas, antes/depois): mantenha **câmera, enquadramento, cenário e posição dos personagens idênticos**. Só muda o que a tarefa pede. Gere a partir da imagem anterior (edição) em vez de gerar do zero sempre que possível.
6. **Camadas (sprites)**: o livro usa um modelo **híbrido** (`AGENTS.md` §4.1 e §4.2). Cenário limpo + personagens e adereços em camadas transparentes **sobrepostas no HTML** para tudo que se move ou aparece de forma independente; ilustração inteira para as grandes transformações da Lente da Imaginação.
   - PNG com canal alfa. Se a ferramenta não entregar transparência real, use fundo **branco puro `#FFFFFF`** e escreva "precisa recorte" na mensagem de commit.
   - Gere cada camada **usando o cenário como referência**: mesma luz, paleta, traço, escala e perspectiva. Pinte uma **sombra de contato** suave sob os pés no próprio sprite.
   - Variações de pose do mesmo elemento (parado × em ação) têm **o mesmo tamanho de tela e ponto de apoio**, para trocar sem "pular".
   - Camadas que o livro exibe vão para `dom-quixote/imagens/camadas/` (convertidas para WebP com alfa pelo script). Recortes só de referência vão para `dom-quixote/biblioteca/referencias/`.
   - **Nunca "achate"** um recorte dentro de uma cena pronta para salvar como nova ilustração: ou é camada no HTML, ou a cena é gerada de novo inteira.
7. **Entrega das cenas**:
   ```bash
   # salve o PNG/JPG com o nome indicado em dom-quixote/imagens/ e converta para WebP:
   python3 tools/otimizar-imagens.py dom-quixote/imagens/<arquivo>.png
   # depois regenere a lista offline (service worker):
   npm run build:sw
   ```
   O script gera `<arquivo>.webp` (qualidade 80, máx. 1376 px) e apaga o original. Sprites de referência vão para `dom-quixote/biblioteca/referencias/...` **sem** conversão (ficam em PNG).
8. **Não edite o HTML.** Quando a tarefa exigir integração no código, ela aponta o item correspondente em [`BACKLOG.md`](BACKLOG.md). Substituições com **o mesmo nome de arquivo** não precisam de código.
9. Atualize [`dom-quixote/biblioteca/CATALOGO.md`](../dom-quixote/biblioteca/CATALOGO.md) e acrescente o prompt usado em `PROMPTS_ILUSTRACOES.md`.
10. Faça um commit por tarefa: `art(dom-quixote): <descrição>`.

---

## 🔴 Prioridade alta

### NB-1 · Moinhos sem pás + pás giratórias em aquarela (página 8, `?page=7`) — *camadas*
**Problema:** a animação do VENTO sobrepõe pás vetoriais chapadas (`imagens/objetos/moinho-pas.svg`) às pás já pintadas na ilustração. Resultado: **pás duplicadas** e estilo destoante da aquarela. Caso típico de **camada**: as pás precisam girar, então não podem estar pintadas no fundo.

**Arquivos a gerar:**
| Arquivo | Tipo | Descrição |
| :--- | :--- | :--- |
| `dom-quixote/imagens/p7-real-sem-pas.png` | Cena 16:9 (fundo) | Cópia **idêntica** de `p7-real.webp`, mas os dois moinhos aparecem **sem as pás**: só a torre branca, o telhado cônico marrom e o **eixo/cubo de madeira** central visível onde as pás se encaixam |
| `dom-quixote/imagens/camadas/p7-pas-moinho.png` | Camada quadrada 1024 × 1024, fundo transparente | As **quatro pás de treliça de madeira com lona** do moinho, vistas de frente, em cruz (X), **com o cubo exatamente no centro da imagem** (a camada gira em torno do centro). Mesmo traço e paleta de `p7-real.webp`. A mesma camada serve para os dois moinhos, em tamanhos diferentes |

**Referências:** `dom-quixote/imagens/p7-real.webp` (obrigatória, base da edição), `dom-quixote/imagens/p0-real.webp` (moinho da capa).

**Prompt (cenário):**
> [Master Style] Edit the reference image keeping EVERYTHING identical (camera, hill, sky, Sancho Panza on his grey donkey, Don Quixote on his skinny brown horse, flowers, path). Only change: remove the wooden lattice sails from both white windmills, leaving each windmill's round wooden hub/axle clearly visible at the top of the tower, under the brown conical roof. No sails, no shadows of sails.

**Prompt (camada):**
> [Master Style] A single set of four traditional La Mancha windmill sails, wooden lattice frames with off-white canvas, arranged as a symmetrical X cross seen straight from the front, round wooden hub exactly in the center of the canvas, isolated on a transparent background, square 1:1, same watercolor and colored-pencil style, light direction and warm palette as the reference windmills.

**Aceite:** sobrepondo `p7-real-sem-pas` e `p7-real`, só as pás mudam. A camada é centralizada (o cubo no pixel 512,512) e não tem halo nem sombra no fundo. **Integração:** BACKLOG A-1.

---

### NB-2 · Pousada em camadas: flauta e sopa em qualquer ordem (página 5, `?page=4`) — *camadas*
**Problema:** as ilustrações atuais da realidade têm **composições diferentes** (`p4-real-flauta` muda câmera, pousada e personagens), e `p4-real-sopa` **não mostra sopa nenhuma**: o estalajadeiro só acena com a concha. Como TROMBETA e SOPA são interações **independentes** (qualquer ordem, ou as duas juntas), esta é a página ideal para estrear as camadas. Elas dispensam uma imagem por combinação e permitem animar os porquinhos e as notas musicais.

**Arquivos a gerar:**
| Arquivo | Tipo | Conteúdo |
| :--- | :--- | :--- |
| `dom-quixote/imagens/p4-real-fundo.png` | Cena 16:9 (cenário limpo) | Entardecer dourado, estrada de terra, pousada simples de adobe ocre e telhas de barro ao centro-direita, banco de madeira junto à porta, grama à esquerda. **Sem pastor, porquinhos e estalajadeiro.** Dom Quixote (armadura enferrujada, bacia na cabeça) montado no Rocinante magrinho, centro-esquerda, **pintado no fundo** (não se move nesta página) |
| `dom-quixote/imagens/camadas/p4-pastor-parado.png` | Camada | Pastorzinho sentado na grama, flauta de caniço **parada no colo** |
| `dom-quixote/imagens/camadas/p4-pastor-tocando.png` | Camada (mesmo tamanho e apoio) | O mesmo pastor **tocando** a flauta, olhos fechados, feliz |
| `dom-quixote/imagens/camadas/p4-porquinhos.png` | Camada | Dois porquinhos cor-de-rosa **em pé nas patinhas traseiras, dançando** (o livro anima o balanço) |
| `dom-quixote/imagens/camadas/p4-notas-musicais.png` | Camada | Três ou quatro notas musicais em aquarela dourada (o livro anima a subida) |
| `dom-quixote/imagens/camadas/p4-estalajadeiro-acenando.png` | Camada | Estalajadeiro gordinho e simpático, avental branco, acenando na porta |
| `dom-quixote/imagens/camadas/p4-estalajadeiro-sopa.png` | Camada (mesmo tamanho e apoio) | O mesmo estalajadeiro **oferecendo com as duas mãos uma tigela de barro com sopa de pão e alho fumegante** (vapor visível), voltado para Dom Quixote |

Cada camada traz uma sombra de contato pintada sob os pés. Os porquinhos fuçando no chão, no estado inicial, podem ser uma camada extra opcional (`p4-porquinhos-fucando.png`).

**Referências:** `dom-quixote/imagens/p4-real.webp` (cenário e estalajadeiro atuais), `dom-quixote/imagens/p5-real.webp` (rosto do estalajadeiro e armadura enferrujada), `dom-quixote/biblioteca/referencias/personagens/dom-quixote-rocinante-real.png`, `dom-quixote/biblioteca/referencias/personagens/rocinante-estabulo-real.png`. Gere todas as camadas usando o `p4-real-fundo` como referência de luz e escala.

**Prompt (cenário):**
> [Master Style] Golden sunset on a dusty Spanish country road. A simple rustic yellow-ochre adobe roadside inn with a terracotta tile roof stands center-right, with an empty wooden bench by its open door and an empty grassy patch on the left. [Character Bible: Don Quixote reality] has just arrived riding [Character Bible: Rocinante reality], center-left. No other people or animals. No signs, no text.

**Prompt (camada, exemplo):**
> [Master Style, isolated character on transparent background, same lighting and scale as the reference background] A chubby friendly innkeeper in a white apron, holding out with both hands a clay bowl of steaming bread-and-garlic soup with visible steam, warm smile, full body, soft contact shadow under his feet.

**Aceite:** com todas as camadas posicionadas sobre o fundo, a cena parece **uma única pintura** (luz, escala e traço coerentes, sem halos). A sopa é inconfundível (tigela + vapor). **Integração:** BACKLOG A-2 (depende do motor de camadas, A-6). As ilustrações antigas `p4-real*.webp` podem ser apagadas depois da integração.

---

### NB-3 · Os três livros que despertam a imaginação (página 2, `?page=1`)
**Problema:** os cartões DRAGÕES, CASTELOS e CAVALEIROS só fazem a imagem tremer, **sem transformação tangível**, exatamente o tipo de ruído que o `AGENTS.md` §3.3 manda banir. A proposta é que cada livro aberto mostre **um primeiro lampejo** do que Alonso imagina, ainda na Lente da Realidade, preparando a transformação completa da lente.

**Arquivos a gerar (independentes entre si, NÃO cumulativos, para a criança poder escolher qualquer ordem):**
| Arquivo | Conteúdo |
| :--- | :--- |
| `dom-quixote/imagens/p1-real-livro-dragoes.png` | Igual a `p1-real`, mas Alonso segura aberto um livro de capa verde. Das páginas sobe uma **fumacinha de aquarela translúcida** com a silhueta de um dragãozinho dourado amigável. Olhos do avô brilhando de encanto |
| `dom-quixote/imagens/p1-real-livro-castelos.png` | Igual, livro de capa azul. Da fumacinha surge a silhueta de um **castelo de torres pontudas** |
| `dom-quixote/imagens/p1-real-livro-cavaleiros.png` | Igual, livro de capa vermelha. Da fumacinha surgem **dois cavaleiros a cavalo com lanças e flâmulas** |

**Referências:** `dom-quixote/imagens/p1-real.webp` (obrigatória, base), `dom-quixote/imagens/p1-imag.webp` (dragão e castelo já estabelecidos), `dom-quixote/biblioteca/referencias/personagens/dragao-dourado.png`, `dom-quixote/imagens/objetos/livro-dragoes.svg`, `livro-castelos.svg` e `livro-cavaleiros.svg` (cores das capas).

**Prompt (exemplo, dragões):**
> [Master Style] Edit the reference image keeping the cozy study, bookshelves, green armchair, rug and sleeping orange kitten identical. The kindly elderly grandfather with round reading glasses now holds open a big green-covered storybook; from its pages rises a soft, translucent watercolor wisp in which the faint silhouette of a small friendly golden dragon appears, as if the story were coming alive. His eyes sparkle with wonder. Keep it subtle and dreamy: the room itself stays realistic.

**Aceite:** sala e gatinho idênticos à base; o lampejo é sutil (a transformação completa continua sendo da Lente da Imaginação). **Integração:** BACKLOG A-3.

---

## 🟡 Prioridade média

### NB-4 · Página 3 (`?page=2`): herói dourado na mesma escala + rosto consistente na etapa 1
**Problemas:**
- `p2-imag.webp` mostra Dom Quixote dourado **muito menor** e deslocado para a esquerda em relação às etapas reais (`p2-real-stage-4`). Ao trocar de lente, o personagem "encolhe".
- `p2-real-stage-1.webp` (peitoral) muda o rosto: cabelo ralo e penteado diferente das etapas 0, 2, 3 e 4.

**Arquivos a refazer:** `dom-quixote/imagens/p2-imag.png` e `dom-quixote/imagens/p2-real-stage-1.png`.

**Referências:** `dom-quixote/imagens/p2-real-stage-4.webp` (pose, escala e posição exatas), `dom-quixote/imagens/p2-real-stage-0.webp` e `p2-real-stage-2.webp` (rosto e cabelo), `dom-quixote/biblioteca/referencias/personagens/don-quixote-cavaleiro-dourado.png`, `dom-quixote/biblioteca/referencias/cenarios/sotao-fundo.jpg`.

**Prompts:**
> (p2-imag) [Master Style] Same attic, same camera, and the character at EXACTLY the same position, size and proud pose as the reference stage-4 image, but seen through his imagination: [Character Bible: Don Quixote imagination] holding a radiant golden royal shield and a shining golden lance, with soft golden sparkles and a warm glowing aura. The attic stays recognizable but bathed in magical golden light.

> (p2-real-stage-1) [Master Style] Edit stage-2 reference: remove ONLY the brass basin from his head, revealing the same full fluffy white hair, long curving white mustache and small goatee as in stage-0. Everything else identical (rusty breastplate, clothes, pose, attic).

**Aceite:** alternando `stage-4` ↔ `p2-imag`, o personagem não muda de lugar nem de tamanho; as etapas 0 → 4 parecem a mesma pessoa.

---

### NB-5 · Página 4 (`?page=3`): base do estábulo no mesmo enquadramento das etapas + crina penteada
**Problemas:** `p3-real.webp` (estado inicial) tem **outro enquadramento** (porta aberta, Aldonza de corpo inteiro) diferente das etapas 1–3 (janela, cocho no centro). A primeira troca "pula" de cenário. Na etapa 3 (ESCOVA), a crina não parece penteada: só há uma escova sobre o cocho.

**Arquivos a refazer:** `dom-quixote/imagens/p3-real.png` e `dom-quixote/imagens/p3-real-stage-3.png`.

**Referências:** `dom-quixote/imagens/p3-real-stage-1.webp` (enquadramento obrigatório), `p3-real-stage-2.webp`, `p3-real-stage-3.webp`, `dom-quixote/biblioteca/referencias/personagens/rocinante-estabulo-real.png`, `dom-quixote/biblioteca/referencias/personagens/aldonza-camponesa.png`.

**Prompts:**
> (p3-real) [Master Style] Edit stage-1 reference keeping the stable, window, trough and Aldonza identical, but Rocinante is a little sad and hungry: head lowered, mane messy and tangled, the wooden trough EMPTY (no apples, no carrots).

> (p3-real-stage-3) [Master Style] Edit stage-2 reference: Rocinante now stands proud and happy, head high, his mane and tail freshly brushed, smooth and shiny with a soft gleam, a wooden horse brush resting on the trough edge. Aldonza claps her hands, delighted.

**Aceite:** as quatro imagens da página têm a mesma câmera; a progressão faminto → maçã → cenoura → escovado fica legível para uma criança.

---

### NB-6 · Página 7: imaginação de Sancho gerada de verdade (`?page=6`)
**Problema:** `p6-imag.webp` é a ilustração **inteira da capa** (`p0-imag`: lua, Dom Quixote dourado, dragão, castelo) com o recorte de Sancho na ilha **achatado dentro do arquivo**. Não é o uso de recortes que está errado, mas sim que:
1. o recorte não é uma **camada** (não anima, não se reaproveita);
2. o fundo não é um cenário limpo, e sim outra cena pronta (o recorte cobre o castelo e espreme o dragão);
3. a cena não corresponde à Lente da Realidade da página (dia, estrada, Sancho no burrico).

**Arquivos a gerar (modelo híbrido):**
| Arquivo | Tipo | Conteúdo |
| :--- | :--- | :--- |
| `dom-quixote/imagens/p6-imag.png` | Ilustração inteira 16:9 | A grande transformação da lente: mesma estrada e mesma posição dos dois cavaleiros de `p6-real`, banhadas de luz dourada mágica. Dom Quixote em armadura dourada no corcel branco; Sancho **no seu burrico**, com pequena coroa de governador e faixa. **Céu livre no canto superior direito** para a camada abaixo |
| `dom-quixote/imagens/camadas/p6-nuvem-ilha.png` | Camada com alfa | Grande "nuvem de pensamento" em aquarela mostrando a ilha ensolarada de Sancho: palmeiras, castelinho, cestos de pão e queijo, aldeões felizes. O livro a faz surgir flutuando acima de Sancho |

**Referências:** `dom-quixote/imagens/p6-real.webp` (composição obrigatória), `dom-quixote/biblioteca/referencias/personagens/sancho-ilha-sonho.png`, `dom-quixote/biblioteca/referencias/personagens/dom-quixote-heroi-dourado.png`.

**Prompt (cena):**
> [Master Style] Same road, same camera and the same two riders at exactly the same positions as the reference, transformed by imagination and bathed in warm magical golden morning light: Don Quixote in gleaming gold armor on a majestic white warhorse; Sancho Panza, still on his cute grey donkey, now wears a small golden governor's crown and a proud sash. Leave the upper-right sky open and clear.

**Prompt (camada):**
> [Master Style, isolated on transparent background] A big dreamy watercolor thought-cloud with soft edges, showing Sancho Panza's sunny island: palm trees, a tiny castle, baskets of bread and cheese, happy villagers. Same palette and lighting as the reference scene.

**Aceite:** os dois personagens ocupam as mesmas posições da cena real; nenhuma parte da capa é reaproveitada. **Integração:** se o motor de camadas (A-6) ainda não existir, a cena inteira já substitui a atual sem código, e a nuvem entra depois.

---

## 🟢 Prioridade baixa

### NB-7 · Ícone do aplicativo (tela inicial do tablet)
Hoje o ícone é um recorte provisório de `p0-imag` (`assets/icones/icone-*.png`).

**Arquivo a gerar:** `assets/icones/icone-1024.png` (quadrado 1024 × 1024, sem transparência).

**Prompt:**
> [Master Style, square 1:1 instead of 16:9] App icon for a children's classic-books library: the friendly face and shoulders of Don Quixote in a shiny brass basin helmet, with his long white mustache, smiling, in front of an open storybook whose pages glow golden, against a warm parchment-orange circle. Simple, bold, readable at small sizes, all important content inside the central 80% (safe zone for rounded masks). No text.

**Entrega:** salve o PNG e gere os tamanhos com
`python3 -c "from PIL import Image; im=Image.open('assets/icones/icone-1024.png'); [im.resize((n,n), Image.LANCZOS).save(f'assets/icones/icone-{n}.png', optimize=True) for n in (512,192,180)]"`, depois rode `npm run build:sw`.

### NB-8 · Leão Guardião como sprite em aquarela
`dom-quixote/biblioteca/referencias/personagens/leao-guardiao.svg` é vetorial e destoa do banco de referências.

**Arquivo a gerar:** `dom-quixote/biblioteca/referencias/personagens/leao-guardiao.png` (sprite com alfa). Referência: o leão de `dom-quixote/imagens/p1-imag.webp`.

**Prompt:**
> [Master Style, isolated sprite on transparent background] The same noble, gentle golden guardian lion from the reference, lying down peacefully with a fluffy mane and a tiny golden crown, full body, no floor shadow.

Depois de entregue, apague o `.svg` e atualize o `CATALOGO.md`.
