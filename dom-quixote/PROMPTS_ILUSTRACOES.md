# 🎨 Guia de Estilo Visual e Prompts — Dom Quixote de La Mancha

Este documento registra a **identidade visual padronizada (Character & Style Bible)** e os **prompts exatos** utilizados para gerar as ilustrações em aquarela infantil da **Parte 1**, garantindo continuidade visual nas **Partes 2, 3 e 4**.

---

## 🖌️ 1. Âncora de Estilo Artístico (Master Style Prompt)

Sempre incluir na abertura de todos os prompts das próximas partes:

> `Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image.`

---

## 👥 2. Descrição Padronizada dos Personagens (Character Bible)

Para manter a consistência entre cenas e capítulos, use sempre estas descrições físicas ao citar os personagens no prompt:

- **Alonso Quixano / Dom Quixote (Físico Base):**
  > `a kindly 60-year-old thin, lanky Spanish grandfather with warm tan skin, rosy cheeks, expressive joyful eyes, a long curving white mustache, and a small white goatee`
- **Dom Quixote na Lente da Realidade (Armadura Improvisada):**
  > `wearing mismatched rusty gray metal armor with small rust spots, a shiny brass barber's shaving basin upside down on his head like a helmet, holding a round metal pot lid shield and a wooden lance`
- **Dom Quixote na Lente da Imaginação (Herói Dourado):**
  > `wearing gleaming solid gold royal knight armor with a golden lion crest, a magnificent golden helmet with a flowing red feather plume, and a billowing crimson velvet cape`
- **Rocinante na Lente da Realidade:**
  > `a very skinny, bony, gangly light-brown farm horse with visible ribs, a sweet gentle face, and slightly messy mane`
- **Rocinante na Lente da Imaginação:**
  > `a majestic, muscular snow-white royal warhorse with a flowing golden-white mane and red-and-gold royal velvet saddle`
- **Sancho Pança:**
  > `a short, round, chubby, rosy-cheeked friendly Spanish peasant with a warm wide smile, wearing a brown tunic and straw hat, riding his cute little grey donkey (Ruço)`
- **Aldonza Lorenzo (Realidade) vs. Princesa Dulcineia (Imaginação):**
  - *Realidade:* `a cheerful young peasant woman wearing a simple brown peasant dress and orange headscarf`
  - *Imaginação:* `a beautiful fairytale princess wearing a sparkling pink and gold royal gown and a golden crown`

---

## 🖼️ 3. Prompts Utilizados na Parte 1 (`./imagens/p0` a `p7`)

> Convenção de nomes: `pN` = índice da página no livro (`?page=N`). Os arquivos finais ficam em `./imagens/` no formato **WebP** (convertidos por `tools/otimizar-imagens.py`). Prompts de novas ilustrações pendentes estão em [`../docs/TODO-NANO-BANANA.md`](../docs/TODO-NANO-BANANA.md).

### Página 1 (Capa) — O Fidalgo Sonhador de La Mancha
- **Lente da Realidade (`./imagens/p0-real.webp`):**
  > Warm whimsical children's picture book watercolor and gouache illustration, 16:9 landscape, no text. Sunny golden hills of La Mancha, Spain with a white traditional windmill in the distance. In the foreground, a kindly thin elderly Spanish grandfather with a long white mustache (Alonso Quixano) wearing mismatched rusty gray armor and a shiny brass barber's shaving basin on his head, happily riding a very skinny, bony light-brown horse (Rocinante). Beside him walks his short, chubby, smiling peasant friend (Sancho Panza) in a brown tunic waving cheerfully. Cute storybook aesthetic for 6-year-olds.
- **Lente da Imaginação (`./imagens/p0-imag.webp`):**
  > Magical epic children's picture book watercolor and gouache illustration, 16:9 landscape, no text. Starry indigo night sky with a giant glowing golden full moon. The same kindly thin elderly grandfather with a white mustache (Don Quixote) now transformed in his imagination: wearing dazzling solid gold royal knight armor, a golden helmet with a flowing red feather plume, and a billowing crimson cape, heroically riding a majestic muscular snow-white warhorse rearing up on a purple hill. In the magical sky float a cute friendly golden dragon and a fairytale castle on a cloud.

### Página 2 (Capítulo 1) — O Vovô que Lia Dia e Noite
- **Lente da Realidade (`./imagens/p1-real.webp`):**
  > Cozy warm children's picture book watercolor and gouache illustration, 16:9 landscape, no text. Inside a charming Spanish study room with tall wooden bookshelves on the left and right filled with colorful adventure storybooks. In the center, the kindly thin elderly grandfather with a long white mustache and round reading glasses sits in a plush green armchair, delightedly reading a large open illustrated book. On a round red and yellow rug on the floor, a cute small orange tabby kitten sleeps peacefully. Warm sunlit atmosphere.
- **Lente da Realidade — Livro dos Castelos (`./imagens/p1-real-livro-castelos.webp`, NB-3):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit the reference image keeping the cozy Spanish study room, wooden bookshelves, plush green armchair, round red-and-yellow rug, sleeping orange kitten, and Alonso Quixano's face, spectacles, and white mustache IDENTICAL. Alonso now holds open a big storybook with a sapphire BLUE cover; from its open pages rises a soft, translucent watercolor wisp in which the faint, magical silhouette of a fairytale castle with pointed towers appears, as if the story were coming alive before his eyes. His eyes sparkle with delight and wonder. Keep it subtle, cozy and whimsical: the room itself stays in realistic warm daylight.
- **Lente da Realidade — Livro dos Dragões (`./imagens/p1-real-livro-dragoes.webp`, NB-3):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit the reference image keeping the cozy study, bookshelves, green armchair, rug and sleeping orange kitten identical. The kindly elderly grandfather with round reading glasses now holds open a big emerald-green-covered storybook; from its pages rises a soft, translucent watercolor wisp in which the faint silhouette of a small friendly golden dragon appears, as if the story were coming alive. His eyes sparkle with wonder. Keep it subtle and dreamy: the room itself stays realistic.
- **Lente da Realidade — Livro dos Cavaleiros (`./imagens/p1-real-livro-cavaleiros.webp`, NB-3):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit the reference image keeping the cozy study, bookshelves, green armchair, rug and sleeping orange kitten identical. The kindly elderly grandfather with round reading glasses now holds open a big ruby-red-covered storybook; from its pages rises a soft, translucent watercolor wisp in which the faint silhouette of two gallant mounted knights with lances and tiny banners appears, as if the story were coming alive. His eyes sparkle with wonder. Keep it subtle and dreamy: the room itself stays realistic.
- **Lente da Imaginação (`./imagens/p1-imag.webp`):**
  > Magical children's picture book watercolor and gouache illustration, 16:9 landscape, no text. The cozy reading room transforms into an enchanted fantasy kingdom! In the center, the kindly thin elderly grandfather with a long white mustache wears a royal purple and red velvet cloak and a golden crown, sitting on a royal throne reading a glowing golden scroll. On the left, the sleeping kitten has transformed into a friendly, noble golden guardian lion with a fluffy mane. Swirling in the starry magical room are a friendly golden dragon on the left and a floating fairytale castle on a cloud on the right.

### Página 3 (Capítulo 2) — A Armadura do Bisavô
- **Lente da Realidade (`./imagens/p2-real-stage-4.webp`, armadura completa; etapas 0–4 em `p2-real-stage-N.webp`):**
  > Funny, endearing children's picture book watercolor and gouache illustration, 16:9 landscape, no text. Inside a sunlit rustic wooden attic with a dusty trunk, the kindly thin elderly Spanish grandfather with a long white mustache stands proudly in the center wearing mismatched rusty gray metal armor with small rust spots, a shiny brass barber's shaving basin upside down on his head like a helmet, holding a round metal pot lid as a shield on his left arm and a wooden lance with a red cloth pennant in his right hand, with a simple patched red curtain as a cape.
- **Lente da Realidade — Etapa 1 Peitoral (`./imagens/p2-real-stage-1.webp`, NB-4):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit stage-2 reference image: remove ONLY the brass barber basin from his head, revealing the same full fluffy white hair, long curving white mustache and small white goatee as in stage-0 reference. Everything else identical: the rusty gray breastplate over his simple rustic clothes, proud pose, dusty wooden trunk, and rustic attic room.
- **Lente da Imaginação (`./imagens/p2-imag.webp`, NB-4):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Same rustic wooden attic, same camera, and the character at EXACTLY the same position, size and proud pose as the reference stage-4 image, but seen through his imagination: a kindly thin lanky elderly grandfather with a long white mustache wearing gleaming solid gold royal knight armor with a golden lion crest, a magnificent golden helmet with a flowing red feather plume, and a billowing crimson velvet cape, holding a radiant golden royal shield and a shining golden lance, with soft golden sparkles and a warm glowing aura. The attic stays recognizable but bathed in magical golden light.

### Página 4 (Capítulo 3) — Rocinante e a Bela Dulcineia
- **Lente da Realidade — Estado Inicial / Cocho Vazio (`./imagens/p3-real.webp`, NB-5):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit stage-1 reference image keeping the rustic sunny wooden stable, open window, wooden trough, and Aldonza identical, but Rocinante is a little sad and hungry: head slightly lowered, mane messy and tangled, and the wooden trough is completely EMPTY (no apples, no carrots, no food).
- **Lente da Realidade — Etapa 3 Crina Escovada (`./imagens/p3-real-stage-3.webp`, NB-5):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit stage-2 reference image: Rocinante now stands proud and happy, head held high, his mane and tail freshly brushed, smooth and shiny with a soft clean gleam, a wooden horse brush resting on the trough edge. Framed through the window, cheerful young peasant woman Aldonza claps her hands, delighted.
- **Lente da Imaginação (`./imagens/p3-imag.webp`):**
  > Enchanted fairytale children's picture book watercolor and gouache illustration, 16:9 landscape, no text. The stable transforms into a royal palace courtyard! On the left stands a magnificent, muscular snow-white royal warhorse (Rocinante) with a shimmering golden mane and red-and-gold royal saddle blanket, surrounded by sparkles. On the right, framed inside a giant ornate golden royal arch, stands a beautiful fairytale princess (Dulcineia) wearing a sparkling pink and gold royal gown and a golden crown, smiling warmly.

### Página 5 (Capítulo 4) — Pousada ou Castelo Real?
- **Lente da Realidade (`./imagens/p4-real.webp`):**
  > Warm children's picture book watercolor and gouache illustration, 16:9 landscape, no text. At sunset on a dusty Spanish country road, a simple rustic yellow-ochre roadside inn with a terracotta tile roof stands in the center. On the left, a young shepherd boy blows a small reed flute while two cute pink piglets play happily near him. On the right, a chubby, friendly innkeeper wearing a white apron over his clothes holds a wooden soup ladle and waves welcomingly at the door.
- **Lente da Imaginação (`./imagens/p4-imag.webp`):**
  > Grand fairytale children's picture book watercolor and gouache illustration, 16:9 landscape, no text. The roadside inn transformed by imagination! In the center stands a magnificent silver and lavender medieval castle with four tall silver towers, pink conical roofs, and a golden drawbridge under a magical rainbow arch. On the left, a royal herald in purple and gold attire blows a long golden trumpet with a royal banner. On the right, a noble castle lord wearing a golden crown and purple velvet royal robes welcomes the knight with open arms.

### Página 6 (Capítulo 5) — Cavaleiro sob a Lua Cheia
- **Lente da Realidade (`./imagens/p5-real.webp`):**
  > Charming children's picture book watercolor and gouache night scene, 16:9 landscape, no text. In the moonlit courtyard of the rustic inn under a bright full moon: on the left is a simple gray stone horse water trough filled with water. In the center, the kindly thin elderly grandfather with a white mustache (Don Quixote) in his rusty gray armor and brass basin helmet kneels earnestly on the ground. On the right, the chubby friendly innkeeper holds a small ledger book of hay accounts in one hand and gently taps Don Quixote's shoulder with a sword, smiling kindly.
- **Lente da Imaginação (`./imagens/p5-imag.webp`):**
  > Magical children's picture book watercolor and gouache night scene, 16:9 landscape, no text. Under a giant glowing golden full moon and falling golden stars: on the left, the stone trough has become a dazzling sacred altar made of gold and sparkling crystals. In the center, Don Quixote kneels in gleaming solid gold royal armor and a flowing red cape with a glowing golden crown aura above his head. On the right, a majestic wise King wearing a golden crown and royal purple robes holds an illuminated golden scroll and dubs Don Quixote a knight with a shining golden sword.

### Página 7 (Capítulo 6) — O Fiel Amigo Sancho Pança
- **Lente da Realidade (`./imagens/p6-real.webp`):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. On a sunny country road winding through rolling golden hills of La Mancha, elderly Don Quixote in his rusty armor rides skinny Rocinante, smiling warmly as he talks to chubby, cheerful Sancho Panza riding his cute grey donkey.
- **Lente da Imaginação (`./imagens/p6-imag.webp`, NB-6):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Same road, same camera and the same two riders at exactly the same positions as the reference, transformed by imagination and bathed in warm magical golden morning light: Don Quixote in gleaming gold armor on a majestic white warhorse; Sancho Panza, still on his cute grey donkey, now wears a small golden governor's crown and a proud sash. Leave the upper-right sky open and clear.
- **Camada — Nuvem do Sonho da Ilha (`./imagens/camadas/p6-nuvem-ilha.webp`, NB-6):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, isolated on pure white background, no text or words anywhere in the image. A big dreamy watercolor thought-cloud with soft fluffy edges, showing Sancho Panza's sunny island dream: tropical palm trees, a tiny fairytale castle, baskets of fresh bread and round cheeses, and happy smiling villagers. Same warm golden palette and storybook lighting as the reference scene.

### Página 8 (Capítulo 7) — O Duelo dos Moinhos
- **Lente da Realidade (`./imagens/p7-real.webp`):**
  > Classic children's picture book watercolor and gouache illustration, 16:9 landscape, no text. On a sunny green hill in La Mancha under a warm orange-gold sky: on the left, chubby smiling Sancho Panza rides his cute little grey donkey beside thin elderly Don Quixote on his skinny brown horse, pointing ahead in surprise. On the right side of the hill stand two large traditional white Spanish windmills with brown conical roofs and wooden lattice sails spinning in the breeze.
- **Lente da Realidade — Moinhos sem pás (`./imagens/p7-real-sem-pas.webp`, NB-1):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Edit the reference image keeping EVERYTHING identical (camera, hill, sky, Sancho Panza on his grey donkey, Don Quixote on his skinny brown horse, flowers, path). Only change: remove the wooden lattice sails from both white windmills, leaving each windmill's round wooden hub/axle clearly visible at the top of the tower, under the brown conical roof. No sails, no shadows of sails.
- **Camada de pás do moinho em aquarela (`./imagens/camadas/p7-pas-moinho.webp`, NB-1):**
  > Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, square 1:1 aspect ratio, no text or words anywhere in the image. A single set of four traditional La Mancha windmill sails, wooden lattice frames with off-white canvas, arranged as a symmetrical X cross seen straight from the front, round wooden hub exactly in the center of the canvas, isolated on a transparent background, square 1:1, same watercolor and colored-pencil style, light direction and warm palette as the reference windmills.
- **Lente da Imaginação (`./imagens/p7-imag.webp`):**
  > Epic whimsical children's picture book watercolor and gouache illustration, 16:9 landscape, no text. The windmill hill transformed by imagination! On the left, inside a glowing golden thought-cloud, chubby Sancho Panza wears a golden crown as Governor of a sunny tropical island surrounded by grapes, pies, and palm trees. On the right, standing on the purple hill where the windmills were, are two colossal, funny fairytale giants (one red, one purple) with grumpy cartoon faces, swinging four spinning windmill-sail arms in the wind!
  >
  > ⚠️ *Prompt histórico, já substituído:* a versão atual (`p7-imag.webp`) traz titãs mitológicos de pedra, terra e musgo, conforme a regra 4.4 do `AGENTS.md`. A ilha de Sancho foi movida para a página 7 (`p6-imag.webp`).
