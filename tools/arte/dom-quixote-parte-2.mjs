// Pedidos de arte da Parte 2 de Dom Quixote para tools/gerar-imagens.mjs (Nano Banana 2 pela API, Batch).
// Fonte das cenas: docs/TODO-NANO-BANANA-PARTES-2-4.md (P2-4 a P2-8) e o texto de dom-quixote/parte-2.html.
// Regras: cena -real primeiro; a -imag é uma EDIÇÃO da -real (mesma câmera e posições). Camadas sobre magenta
// puro, recortadas depois por tools/recortar-camada.py.
const P2 = 'dom-quixote/imagens/parte-2';

export default {
    modelo: 'gemini-3.1-flash-image',

    estilo: "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Match the style, palette, line work and character designs of the reference illustrations exactly (they are earlier pages of the same book).",

    estiloCamada: "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, same style, palette and line work as the reference illustration (an earlier page of the same book). This is a separate cut-out element (a sprite) for an interactive book: paint ONLY the element, isolated on a perfectly flat, uniform, pure magenta background (#FF00FF, chroma key), with crisp clean edges against the magenta. No ground, no floor patch, no grass under it, no cast shadow on the background, no frame, no border, no text. Do not use magenta or pink anywhere inside the element.",

    personagens: {
        QUIXOTE: 'Don Quixote: a very tall, very thin elderly Spanish gentleman with a long narrow face, kind eyes, white swept-back hair, a long curled white mustache and a pointed white goatee; worn, scratched silver plate armour over a faded red tunic; a dented brass barber\'s basin worn as a helmet, visibly DENTED; his lance is a long dry gnarled oak branch',
        SANCHO: 'Sancho Panza: a short, round, rosy-cheeked peasant with a round friendly face and dark hair, a brown flat cap, a brown wool vest over a white shirt and brown breeches',
        ROCINANTE: 'Rocinante: Don Quixote\'s skinny, bony chestnut-brown horse with a long dark mane',
        BURRICO: 'Sancho\'s small grey donkey with a pale muzzle and long ears'
    },

    pedidos: [
        // ---------------- P2-4 · Os exércitos de poeira ----------------
        {
            id: 'p4-real', destino: `${P2}/p4-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P2}/p0-real.webp`],
            prompt: `A sunny clear morning over the wide, dry, golden plain of La Mancha, seen from slightly above.
COMPOSITION (important, the book places animated dust clouds over exact areas):
- On a small grassy hillock at the far LEFT edge of the picture (only the left 22% of the width), [QUIXOTE] sits on [ROCINANTE], three-quarter view, eagerly pointing his oak-branch lance toward the plain. Right beside him, [SANCHO] sits on [BURRICO], cupping one hand behind his ear and frowning, listening.
- The rest of the picture is the open plain. In the MIDDLE DISTANCE, two big flocks of fluffy white sheep walk toward each other from opposite sides: the first flock fills the area from about 28% to 56% of the width, the second from about 64% to 95% of the width; both flocks sit in a horizontal band between about 55% and 80% of the height. One or two small shepherds with crooks walk behind each flock. A little golden dust rises at their feet.
- Clear blue sky with a few soft clouds, distant blue-violet hills, dry grass and a few wild flowers in the foreground.
Peaceful pastoral mood. No soldiers, no weapons other than Don Quixote's branch.`
        },
        {
            id: 'p4-imag', destino: `${P2}/p4-imag.png`,
            refs: [`${P2}/p4-real.webp`, `${P2}/p0-imag.webp`],
            prompt: `Edit the FIRST reference image (this exact page). Keep the camera, the plain, the hillock, the sky, and Don Quixote and Sancho exactly where and how they are (Sancho still cupping his ear). This is how Don Quixote imagines the scene:
- the left flock of sheep becomes, in the very same place and size, the fairytale army of the emperor Alifanfarrón: knights on horseback with raised lances and many bright RED banners and pennants, and two small elephants far behind;
- the right flock becomes the army of King Pentapolín: knights with bright BLUE banners, led by a proud knight on a white horse whose right sleeve is rolled up to the elbow;
- glittering golden dust swirls around both armies, and Don Quixote's dented basin now gleams like a golden helmet.
Heroic, colorful and joyful like the second reference image; no fighting, no violence, no blood.`
        },
        {
            id: 'p4-poeira-esquerda', destino: `${P2}/camadas/p4-poeira-esquerda.png`, camada: true,
            refs: [`${P2}/p4-real.webp`],
            prompt: `ONE wide, huge billowing cloud of golden-grey dust, as if raised by a big flock of sheep trotting across the dry plain of the reference picture. The cloud is thick and FULLY OPAQUE in its center and lower half (nothing can be seen through it), with big soft rounded puffs on top and a few softly fading wisps at the edges; warm morning sunlight from the upper left lights the tops of the puffs, the bottom is a little darker and warmer. The cloud fills almost the whole wide canvas from the left edge to the right edge; its broad, fairly flat bottom runs along the lower edge. Paint only the cloud: no sheep, no ground, no sky.`
        },
        {
            id: 'p4-poeira-direita', destino: `${P2}/camadas/p4-poeira-direita.png`, camada: true,
            refs: [`${P2}/p4-real.webp`],
            prompt: `ONE wide, huge billowing cloud of golden-grey dust, as if raised by a big flock of sheep trotting across the dry plain of the reference picture, coming from the right and leaning toward the left. The cloud is thick and FULLY OPAQUE in its center and lower half (nothing can be seen through it), with big soft rounded puffs on top (a different shape from a symmetric blob) and a few softly fading wisps at the edges; warm morning sunlight from the upper left lights the tops of the puffs, the bottom is a little darker and warmer. The cloud fills almost the whole wide canvas from the left edge to the right edge; its broad, fairly flat bottom runs along the lower edge. Paint only the cloud: no sheep, no ground, no sky.`
        },

        // ---------------- P2-5 · O Cavaleiro da Triste Figura ----------------
        {
            id: 'p5-real', destino: `${P2}/p5-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Night on a calm roadside at the edge of a field, deep blue darkness with a few stars. Medium close-up of the two friends.
- On the LEFT (left third of the picture), [SANCHO] holds up high a small tin lantern with a candle inside, with a cheeky, affectionate smile. The lantern is around 30% of the width from the left and 40% of the height from the top, and its warm yellow light is the main light of the scene.
- On the RIGHT half, a close-up of [QUIXOTE] (face and shoulders): his long, thin, tired face with hollow cheeks and white stubble, the dented brass basin sitting crooked on his head, and a sad, tender smile that shows a funny little gap where two front teeth are missing.
- The lantern light draws soft warm shadows on his face.
Melancholic but tender and cozy, never scary.`
        },
        {
            id: 'p5-imag', destino: `${P2}/p5-imag.png`,
            refs: [`${P2}/p5-real.webp`],
            prompt: `Edit the reference image (this exact page): keep the camera, Sancho with his lantern and Don Quixote's face exactly as they are. This is how Don Quixote imagines the moment:
- behind Don Quixote's shoulder appears a large, noble, round knight's shield painted with a sad, dignified, gentle face (the emblem of the Knight of the Sorrowful Countenance), glowing softly with golden light;
- in the dark sky at the upper middle, a small kindly old sage-wizard with a long white beard floats on a little cloud, writing with a feather quill in a big glowing golden book; the open pages show only golden swirls and sparkles, absolutely no letters or words;
- tiny golden sparkles float in the night.`
        },

        // ---------------- P2-6 · As cabras que atravessam o rio ----------------
        {
            id: 'p6-real', destino: `${P2}/p6-real.png`,
            refs: [`${P2}/p2-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A very dark night beside a river, at the edge of a wood of tall dark trees, in deep navy blues; a thin crescent moon.
COMPOSITION (important):
- All the characters are in the LEFT HALF of the picture, in the lower two thirds: [SANCHO] stands gesturing with both hands while telling a long story, wide-eyed, a bit scared but sly; next to him [ROCINANTE] stands with its two front legs comically tied together by a little rope that goes to the halter of [BURRICO]; [QUIXOTE] sits on a rock, listening attentively, holding his oak-branch lance. A tiny lantern on the ground gives them a little warm light.
- The river runs across the lower right part of the picture.
- The upper RIGHT part of the picture (from the middle of the width to the right edge, and from the top down to a bit past the middle of the height) must be EMPTY, plain dark night sky with only a few faint stars, with the dark silhouettes of distant treetops along its bottom. Keep this area uncluttered (a thought balloon will appear there).
- Far away on the dark right, among the trees, a faint glow hints at where a mysterious rhythmic noise comes from (do not show what makes it).
Cozy and mysterious, not frightening.`
        },
        {
            id: 'p6-imag', destino: `${P2}/p6-imag.png`,
            refs: [`${P2}/p6-real.webp`, `${P2}/p1-imag.webp`],
            prompt: `Edit the FIRST reference image (this exact page): keep the camera, the river, the trees, and Sancho, Rocinante with its tied legs, the donkey, the little lantern and Don Quixote exactly where and how they are; Don Quixote still holds his single dry oak-branch lance (do not add any other lance or spear), now gripping it bravely. This is how Don Quixote imagines the noise in the dark: on the right side of the picture, half hidden among the trees, an enormous old blacksmith giant made of grey stone and green moss, like the friendly stone giant of the second reference image, hammers a huge anvil with a big stone hammer, sending golden-orange sparks flying that light up his face. He is calm and absorbed in his work, with a gentle bearded face and kind ordinary eyes (no glowing eyes, no frown, no lava cracks on his body). Mythological and majestic, a little comic, never scary for a five-year-old.`
        },
        {
            id: 'p6-balao-historia', destino: `${P2}/camadas/p6-balao-historia.png`, camada: true,
            refs: [`${P2}/p3-imag.webp`],
            prompt: `A big, soft, cloud-shaped THOUGHT BALLOON painted in pale watercolor, with a soft creamy-white rim, filling most of the canvas, and a little trail of three small round bubbles going down to the LOWER-LEFT corner of the canvas.
Inside the balloon, a bright, sunny daytime scene of Sancho's story:
- the wide river Guadiana flows from left to right across the upper half of the balloon, under a light blue sky;
- a tiny wooden rowing boat with a little shepherd in it floats on the river near the left;
- the lower part of the balloon is the near riverbank: a long, flat, EMPTY strip of green grass running across the whole width of the balloon (no goats, no animals, no people on it: goats will be added on top later).`
        },
        {
            id: 'p6-cabra', destino: `${P2}/camadas/p6-cabra.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P2}/p3-real.webp`],
            prompt: `ONE cute little white goat with light brown patches, small curved horns and a tiny beard, standing in FULL SIDE PROFILE facing RIGHT, all four legs visible, looking happy, like the goats in the background of the reference picture. The goat fills most of the canvas height.`
        },

        // ---------------- P2-7 · O segredo do amanhecer ----------------
        {
            id: 'p7-real', destino: `${P2}/p7-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P2}/p0-real.webp`],
            prompt: `Dawn by a sparkling river with tall trees: a pink and golden sunrise sky.
COMPOSITION (important):
- On the RIGHT side (from about 56% to 90% of the width, around the middle of the height), an old open wooden fulling-mill shed by the river, with a big wooden water wheel turning in the stream; inside the open shed, a long wooden trough full of folded woollen cloths, and above it a sturdy wooden beam frame. Do NOT paint the hammers: the space above the trough stays clear, showing the plain back wall of the shed (the big wooden hammers are a separate animated layer added by the book).
- On the LEFT, [SANCHO] on [BURRICO] laughs so hard that he holds his belly with both hands and almost falls off; next to him, [QUIXOTE] on [ROCINANTE] frowns, but the corner of his mouth is starting to smile.
Joyful morning light, dew sparkling on the grass.`
        },
        {
            id: 'p7-martelos', destino: `${P2}/camadas/p7-martelos.png`, camada: true,
            proporcao: '4:3', refs: [`${P2}/p7-real.webp`],
            prompt: `The six big wooden hammers of the fulling mill in the reference picture: heavy rectangular wooden mallet heads on long wooden arms, hanging side by side in one row from a single horizontal wooden axle, all LIFTED UP as if about to strike, seen from the same angle and in the same light as the shed in the reference picture. Paint only the axle and the six hammers: no shed, no wall, no trough, no water wheel, no water.`
        },
        {
            id: 'p7-imag', destino: `${P2}/p7-imag.png`,
            refs: [`${P2}/p7-real.webp`, `${P2}/p1-imag.webp`],
            prompt: `Edit the FIRST reference image (this exact page): keep the camera, the river, the sunrise, and Sancho and Don Quixote on their mounts exactly where and how they are (Sancho still laughing). This is the enchanted forge of the giants that Don Quixote had imagined during the night: the shed becomes a magical forge where a friendly, huge giant made of stone and moss (like the second reference image) swings colossal stone hammers, with golden sparks flying, glowing embers, and the river shining with golden light.`
        },

        // ---------------- P2-8 · O elmo de Mambrino ----------------
        {
            id: 'p8-real', destino: `${P2}/p8-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P2}/p0-real.webp`],
            prompt: `A gentle, fine, silvery rain on a country road between golden wheat fields, soft grey sky with a hint of light.
COMPOSITION (important):
- In the CENTER-LEFT, [QUIXOTE] (bare-headed, his white hair wet) sits on [ROCINANTE] and lifts high above his head, with both hands, a NEW shiny brass barber's shaving basin, wet and gleaming like a mirror, solemn and delighted. The basin is in the top third of the picture, between about 38% and 60% of the width.
- On the RIGHT, farther away, a thin, startled village barber in a grey cloak runs off across the wheat field holding his hat on his head, leaving his little grey donkey standing on the road.
- In the foreground at the bottom, [SANCHO] sits on the wet ground, laughing tenderly and holding his sides.
Puddles on the road reflect the light. Cheerful and funny.`
        },
        {
            id: 'p8-imag', destino: `${P2}/p8-imag.png`,
            refs: [`${P2}/p8-real.webp`],
            prompt: `Edit the reference image (this exact page): keep the camera, the road, the rain, the fleeing barber, the donkey, Sancho and Don Quixote exactly where and how they are. Keep Don Quixote's pose EXACTLY: both arms raised straight up, holding the object high above his head with both hands, in the same place at the top of the picture. This is how Don Quixote sees it: the basin he lifts becomes the legendary golden HELMET OF MAMBRINO, a magnificent gold helmet with colorful plumes and precious gems, glowing so brightly that the raindrops around it shine in rainbow colors and a soft rainbow arcs across the sky. Don Quixote looks like a king-knight.`
        }
    ]
};
