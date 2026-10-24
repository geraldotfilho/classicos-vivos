// Pedidos de arte da Parte 2 de Dom Quixote para tools/gerar-imagens.mjs (Nano Banana 2 pela API, Batch).
// Fonte das cenas: docs/TODO-NANO-BANANA-PARTES-2-4.md (P2-4 a P2-8) e o texto de dom-quixote/parte-2.html.
// Regras: cena -real primeiro; a -imag é uma EDIÇÃO da -real (mesma câmera e posições). Camadas sobre magenta
// puro, recortadas depois por tools/recortar-camada.py.
const P2 = 'dom-quixote/imagens/parte-2';
const P1 = 'dom-quixote/imagens';
const REF = 'dom-quixote/biblioteca/referencias/personagens';

export default {
    modelo: 'gemini-3.1-flash-image',

    estilo: "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text or words anywhere in the image. Match the style, palette, line work and character designs of the reference illustrations exactly (they are earlier pages of the same book).",

    estiloCamada: "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, same style, palette and line work as the reference illustration (an earlier page of the same book). This is a separate cut-out element (a sprite) for an interactive book: paint ONLY the element, isolated on a perfectly flat, uniform, pure magenta background (#FF00FF, chroma key), with crisp clean edges against the magenta. No ground, no floor patch, no grass under it, no cast shadow on the background, no frame, no border, no text. Do not use magenta or pink anywhere inside the element.",

    // Bíblia da Imaginação: entra em todo pedido com `imaginacao: true` (tools/gerar-imagens.mjs).
    // Lição de 2026-10-24: "edite a Realidade mantendo tudo" fazia o modelo trocar só um detalhe; o humano pediu
    // a transformação de verdade da cena e dos personagens, como nas Imaginações da Parte 1.
    imaginacao: `THIS IS AN IMAGINATION PAGE. The FIRST reference image is the REALITY version of this very page. Repaint the same page as Don Quixote sees it in his imagination, like the earlier imagination pages of this book (the other reference images).
KEEP from the reality version ONLY: the camera angle, the overall layout, the place, size and pose of each character.
TRANSFORM EVERYTHING ELSE. Mandatory character transformations:
- DON QUIXOTE becomes the GOLDEN KNIGHT of the reference images: gleaming polished gold plate armour with engraved filigree, a golden knight's helmet with an open visor and a tall red plume, a long flowing crimson cape, and a golden lance with a red pennant. His face stays the same (long thin face, curled white mustache, pointed white goatee). Nothing of his real look may remain: NO rusty grey armour, NO brass barber's basin on his head, NO dry branch.
- ROCINANTE becomes a noble WHITE STEED with a flowing silvery-white mane and tail, a crimson and gold caparison with tassels and a red bridle with gold studs. NO skinny brown horse.
- SANCHO PANZA stays recognisable (same round rosy face, dark hair, brown flat cap, round body) but is now the knight's proud faithful squire: a sky-blue squire's tunic with gold trim over his white shirt and a small round shield on his back. His grey donkey wears a festive red-and-gold saddle blanket with tassels.
- Ordinary people become storybook characters, as described below.
The world becomes a fairytale: richer, more luminous colours (gold, violet, rose, turquoise), soft sparkles of magic light, and the specific transformations described below. Same watercolour style. Heroic, joyful and tender, never scary.`,

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
        // ---------------- Lente da Imaginação (refeitas em 2026-10-24 com a bíblia acima) ----------------
        {
            id: 'p0-imag', destino: `${P2}/p0-imag.png`, imaginacao: true,
            refs: [`${P2}/p0-real.webp`, `${P1}/p7-imag.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P2}/p0-imag.webp`],
            prompt: `Book cover of Part 2, "Armies of Wool and the Enchanted Helmet". Seen from behind in three-quarter view, as in the reality version: the golden knight on his white steed, his crimson cape flowing in the breeze, and Sancho the squire on his festive donkey, both looking at the horizon. The dusty road becomes a glowing golden road winding toward the horizon, where the cloud of dust has become two shining fairytale armies with colourful banners (like the last reference image). On a far hill, a white castle with pennants; the tiny windmills on the left horizon are now small stone giants waving their arms. Magical sunset sky in gold, rose and violet with a few early stars.`
        },
        {
            id: 'p1-imag', destino: `${P2}/p1-imag.png`, imaginacao: true,
            refs: [`${P2}/p1-real.webp`, `${P1}/p7-imag.webp`, `${REF}/rocinante-corcel-branco.png`, `${P2}/p1-imag.webp`],
            prompt: `The tumble after charging the giants. Same comic pose and place as the reality version: the golden knight and his white steed have tumbled on their backs in the soft flowery grass, legs in the air, funny and unhurt; the golden knight, still on the ground, lifts one arm with a proud noble smile; his golden lance lies broken in shining pieces with its red pennant. Behind them, the nearest windmill is a huge friendly-looking giant of stone, earth and moss whose arms are the turning sails (like the last reference image), and the other windmills are giants too. In the sky, the enchanter Frestón, an old wizard in a dark starry cloak and pointed hat, blows a magic whirlwind of golden sparks with puffed cheeks. On the right, Sancho the squire on his festive donkey holds his head with both hands.`
        },
        {
            id: 'p2-imag', destino: `${P2}/p2-imag.png`, imaginacao: true,
            refs: [`${P2}/p2-real.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P1}/p3-imag.webp`, `${P2}/p2-imag.webp`],
            prompt: `A starry night under the old oak, same place and poses as the reality version. The golden knight sits awake against the trunk, gazing at the stars, his golden lance with its red pennant resting on his shoulder (the oak branch has become an enchanted lance), and his golden plumed helmet lies on the grass beside him (instead of the basin). The old oak glows with golden leaves and tiny lights like fireflies. Among the stars, drawn in soft starlight, the serene smiling face of Princess Dulcinea with her little crown (like the princess of the third reference image). The campfire burns with golden-rose magic flames. On the right, Sancho the squire sleeps with his mouth open on a sack, a piece of bread in his hand, little dream-stars around him. In the background the white steed and the festive donkey sleep side by side.`
        },
        {
            id: 'p3-imag', destino: `${P2}/p3-imag.png`, imaginacao: true,
            refs: [`${P2}/p3-real.webp`, `${P1}/p7-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P2}/p3-imag.webp`],
            prompt: `The Golden Age that Don Quixote describes in his speech, with the same ring of people in the same places as the reality version. The golden knight stands in the middle with one arm raised, speaking with passion. The six goatherds become gentle shepherds of the Golden Age: flowing white and pastel linen tunics, crowns of flowers and laurel, kind smiles. Around them, people and animals live in harmony: lambs, a deer, rabbits and little birds rest peacefully among them. The rocky field becomes a golden flowery meadow with a crystal stream; the holm oaks are full of golden acorns and fruits that anyone can pick, and friendly bees offer honeycombs from a hollow trunk. The sheepskin in the foreground becomes a golden cloth with a generous feast (bread, cheese, honey, grapes, fruit, jugs of milk), as in the last reference image. Sancho the squire happily eats bread. Warm magical sunset light.`
        },
        {
            id: 'p4-imag', destino: `${P2}/p4-imag.png`, imaginacao: true,
            refs: [`${P2}/p4-real.webp`, `${P2}/p0-imag.webp`, `${P1}/p7-imag.webp`, `${P2}/p4-imag.webp`],
            prompt: `The two armies, same layout as the reality version. IMPORTANT: the golden knight and Sancho stay exactly where they are in the reality version, at the same small size, on the little hillock at the far LEFT edge (only the left quarter of the picture): the white steed is no taller than half the picture height, exactly the size of the brown horse in the reality version, and it stands still (not rearing); the plain in the middle and on the right belongs to the armies. On that hillock, the golden knight on his white steed, seen in three-quarter view as in the reality version, points his golden lance diagonally up toward the plain, crimson cape flying; just in front of him, Sancho the squire on his festive donkey still cups a hand behind his ear (he hears only "baa"). On the plain, in the same places and sizes as the two flocks, two fairytale armies march toward each other (like the last reference image): on the left the army of the emperor Alifanfarrón with bright RED banners and two small elephants far behind; on the right the army of King Pentapolín with bright BLUE banners, led by a knight on a white horse with his right sleeve rolled up to the elbow. Glittering golden dust swirls around them; castles with pennants on the distant hills; a luminous gold and rose morning sky. No fighting, no violence.`
        },
        {
            id: 'p5-imag', destino: `${P2}/p5-imag.png`, imaginacao: true,
            refs: [`${P2}/p5-real.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P1}/p7-imag.webp`, `${P2}/p5-imag.webp`],
            prompt: `Same medium close-up and same places as the reality version. On the right, the face and shoulders of the golden knight: the same long, thin, tender and melancholic face with the curled white mustache and the little gap of two missing teeth in his gentle smile, now framed by a golden helmet with an open visor and a tall red plume, golden shoulder plates with filigree and the crimson cape. Behind his shoulder, a large noble round shield painted with a sad, dignified, gentle face, glowing softly (the emblem of the Knight of the Sorrowful Countenance). On the left, Sancho the squire, in the same place and pose, lifts high a lantern that has become a golden lantern full of tiny dancing fairy lights (the lantern stays in the same spot). In the deep violet-blue night sky, a small kindly old sage with a long white beard floats on a little cloud writing in a big glowing golden book whose pages show only golden swirls, absolutely no letters (like the last reference image). Constellations sparkle.`
        },
        {
            id: 'p6-imag', destino: `${P2}/p6-imag.png`, imaginacao: true,
            refs: [`${P2}/p6-real.webp`, `${REF}/rocinante-corcel-branco.png`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P2}/p6-imag.webp`],
            prompt: `The mysterious noise in the night, same places and poses as the reality version. On the left, the white steed stands where Rocinante stands; instead of a rope, ribbons of glowing golden enchantment gently hold its front legs (Sancho says the horse is enchanted and cannot move). Next to it, Sancho the squire with his festive donkey, gesturing as he tells his endless story. The golden knight sits on the rock in the same place, gripping his golden lance bravely, ready for adventure. The dark wood becomes an enchanted forest with silver-blue trees, glowing mushrooms and fireflies; the river shines with moonlight. On the right side, half hidden among the trees, an enormous old blacksmith giant of grey stone and green moss (like the last reference image), calm and absorbed, with a gentle bearded face and kind ordinary eyes, hammers a huge anvil, sending golden-orange sparks into the night.`
        },
        {
            id: 'p7-imag', destino: `${P2}/p7-imag.png`, imaginacao: true,
            refs: [`${P2}/p7-real.webp`, `${P1}/p7-imag.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P2}/p7-imag.webp`],
            prompt: `The enchanted forge of the giants that Don Quixote had imagined during the night, same layout as the reality version. On the left, Sancho the squire on his festive donkey still laughs, holding his belly; beside him the golden knight on his white steed, head held high, looking at the forge with wonder. On the right, the wooden shed has become a magical forge carved into a mossy rock, where friendly stone-and-moss giants swing six colossal stone hammers onto a glowing anvil, with fountains of golden sparks (like the last reference image); the water wheel is a great golden wheel and the river flows with liquid golden light. Sunrise sky in rose, gold and violet with magical rays.`
        },
        {
            id: 'p8-imag', destino: `${P2}/p8-imag.png`, imaginacao: true,
            refs: [`${P2}/p8-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P1}/p7-imag.webp`, `${P2}/p8-imag.webp`],
            prompt: `The Helmet of Mambrino, same layout and poses as the reality version. In the centre-left, the golden knight (bare-headed in this page, his white hair shining) sits on his white steed and lifts high above his head the legendary golden HELMET OF MAMBRINO, gripping its rim firmly with BOTH hands (his hands touch the helmet; it does not float; he holds no lance): magnificent gold with colourful plumes and precious gems, radiating light (like the last reference image). The fine rain becomes a shower of silver and rainbow sparkles, and a bright rainbow arcs across the sky; the wheat fields shine like gold. On the right, the barber has become a fleeing enemy knight in dark blue armour with a grey cloak, running away across the golden field holding his own head; his little donkey on the road has become a dappled grey charger with a fancy saddle, left behind: it is the ONLY animal on the road (Sancho's donkey is not in this page, no other donkeys). In the foreground, Sancho the squire sits on the ground laughing tenderly.`
        }
    ]
};
