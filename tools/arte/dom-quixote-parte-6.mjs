// Pedidos de arte da Parte 6 de Dom Quixote (caps. 43 a 51), para tools/gerar-imagens.mjs.
// As 9 cenas iniciais (p0-real, p1-real, p2-real, p3-real, p4-real, p6-real, p7-real, p7-imag, p8-real)
// foram geradas pelo image-generator sem API paga; este arquivo cobre as 9 restantes (com autorização do humano).
// Fonte: docs/cadernos/dom-quixote-parte-6.md §4 e o texto de dom-quixote/parte-6.html.
import { P1, P2, P3, P4, P5, REF, estilo, estiloCamada, imaginacao, personagens as base, modelo } from './dom-quixote-parte-5-comum.mjs';

export const P6 = 'dom-quixote/imagens/parte-6';
export const P4V1 = 'dom-quixote/imagens/acervo/parte-4-v1';

const personagens = {
    ...base,
    SANCHO: "Sancho Panza: a short, round, rosy-cheeked peasant with a round friendly CLEAN-SHAVEN face (NO beard, NO stubble), dark hair, a brown flat cap, a brown wool vest over a white shirt, a red sash and brown breeches",
    MESTRE_PEDRO: "Master Peter (Mestre Pedro): a rugged travelling puppeteer in a worn brown leather laced tunic over a cream shirt, wearing a green cloth eyepatch tied over his left eye, exactly as in the first reference image",
    MACACO: "Master Peter's large tailless monkey with warm brown fur and a serious, wise expression (NO tail)"
};

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // ================ LOTE 1 (independentes entre si) ================

        // Pág. 0 · Capa (Imaginação) — a partir da p0-real aprovada + Clavilenho voador antigo
        {
            id: 'p0-imag', destino: `${P6}/p0-imag.png`, imaginacao: true,
            refs: [`${P6}/p0-real.png`, `${P4V1}/p3-imag.webp`, `${REF}/dom-quixote-heroi-dourado.png`],
            prompt: `EXCEPTION FOR THE BACKGROUND AND CLAVILENHO: Keep the pose, camera angle and positions of the wooden horse and the two riders from the FIRST reference image, BUT replace the palace garden and background people completely with a luminous fairytale night-and-sunset sky above swirling pastel clouds, twinkling stars, a smiling golden sun and gentle crescent moon, and tiny storybook castles on green hills far below (matching the magical sky of the SECOND reference image).
- The wooden horse Clavilenho keeps its wooden jointed body and the peg on its forehead, AND grows magnificent golden feathered wings (like the SECOND reference image), soaring upward through the clouds with golden stardust trails.
- [QUIXOTE] on the horse becomes the GOLDEN KNIGHT (gleaming gold plate armour, golden plumed helmet with crimson plume, flowing crimson cape), wearing a neat black blindfold over his eyes, smiling bravely and holding the reins.
- [SANCHO] sitting behind him becomes the proud squire in a sky-blue tunic with gold trim and small crimson cape, clean-shaven round rosy face (NO beard), brown flat cap, also wearing a black blindfold over his eyes, grinning in wonder.
- Remove the Duke, Duchess and servants completely. No text, no letters anywhere.`
        },

        // Pág. 3 · Cap. 45: O Palácio de Cristal de Montesinos (Imaginação)
        {
            id: 'p3-imag', destino: `${P6}/p3-imag.png`, imaginacao: true,
            refs: [`${P6}/p3-real.png`, `${REF}/dom-quixote-heroi-dourado.png`],
            prompt: `EXCEPTION FOR THIS PAGE: Inside the cave there is ONLY Don Quixote's vision of the Underground Crystal Palace of Montesinos. Do NOT show Sancho Panza, do NOT show the Cousin, do NOT show the rope, do NOT show crows or bats.
Use the SECOND reference image for the Golden Knight's style.
- Transform the dark rocky cave into a breathtaking, luminous underground PALACE MADE ENTIRELY OF TRANSLUCENT CRYSTAL: towering faceted crystal arches, glowing pillars, crystal staircases and sparkling chandeliers bathed in magical turquoise, violet, rose and golden light.
- In the centre-left foreground, [QUIXOTE] as the GOLDEN KNIGHT (gleaming polished gold plate armour, open-visor golden helmet with tall red plume, crimson cape, golden lance held upright) stands proudly inside the crystal palace doorway, bowing politely.
- Welcoming him at the doorway in the centre-right is the kindly ancient sage MONTESINOS: a gentle, dignified old man in rich turquoise-and-gold velvet robes with an extraordinarily LONG snow-white beard reaching all the way down to the crystal floor.
- Further inside the luminous crystal hall behind Montesinos, a few enchanted knights and graceful ladies rest peacefully on crystal benches in soft golden light.
Magical, serene, joyful, never scary. No text.`
        },

        // Pág. 5 · Cap. 47: O Teatrinho de Mestre Pedro (Realidade) — mesma pousada da p4-real
        {
            id: 'p5-real', destino: `${P6}/p5-real.png`,
            refs: [`${P6}/p4-real.png`, `${P5}/p0-real.webp`],
            prompt: `The SAME warm, candlelit Spanish inn interior at night as in the FIRST reference image (same stone walls, wooden ceiling rafters, hanging lanterns).
COMPOSITION (important: the interactive book will place 3 repaired puppet layers on the open wooden puppet stage shelf in the middle, so leave the central stage shelf clear!):
- In the CENTRE (from about 33% to 67% of the width, stage floor around 60% height): a small wooden puppet theater stage decorated with warm glowing candles along its edge, knocked slightly askew with velvet curtains parted, and its central wooden stage platform CLEAR and empty except for a few tiny scattered cloth-and-cardboard scraps on the floor below.
- On the LEFT (from about 8% to 32% of the width): [QUIXOTE] stands in his worn silver armour and shiny brass basin helmet, holding a steel sword lowered in one hand while scratching his white goatee with the other, looking sheepish and apologetic.
- Kneeling/crawling out from behind the side of the puppet stage (around 58% to 75% width, low down): [MESTRE_PEDRO] (exact same face, brown leather laced tunic and green eyepatch over his left eye as the FIRST reference image), looking dismayed as he picks up a tiny wooden puppet scrap from the floor.
- High up on the wooden ceiling beams above the stage: [MACACO] (exact same tailless brown monkey as the FIRST reference image) perches safely looking down with wide eyes.
- On the RIGHT (from about 74% to 95% of the width): [SANCHO] (clean-shaven round rosy face, NO beard, brown cap, brown vest, red sash) stands holding his leather coin pouch in both hands with a comical sighing expression.
Warm, funny, safe for children, no text.`
        },

        // Pág. 6 · Cap. 48: O Barco Encantado (Imaginação)
        {
            id: 'p6-imag', destino: `${P6}/p6-imag.png`, imaginacao: true,
            refs: [`${P6}/p6-real.png`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION AND CAMERA ANGLE OF THE FIRST REFERENCE IMAGE (the wide river, the boat in the foreground-left, the distant tree on the far bank, the structures on the right).
Transform into a luminous fairytale adventure:
- The wooden fishing boat becomes an ornate enchanted GOLDEN BARGE with carved swirls, glowing softly on sparkling turquoise-and-gold water.
- [QUIXOTE] standing in the boat becomes the GOLDEN KNIGHT (gleaming gold plate armour, golden helmet with tall red plume, flowing crimson cape, raised glowing golden sword), heroic and triumphant.
- [SANCHO] in the boat keeps his exact pose clinging to the side, wearing his sky-blue squire's tunic with gold trim (clean-shaven round rosy face, NO beard, brown flat cap).
- In the far left background under the tree, Rocinante becomes a gleaming white steed and the donkey wears a red-and-gold saddle blanket, tiny.
- On the RIGHT across the river, the wooden watermills transform into a grand fairytale RIVER CASTLE with glowing turrets, banners, stone bridge and swirling violet-and-turquoise magical mist; the two millers on the bridge become friendly, glowing translucent fairytale castle spirits/phantoms in shimmering robes waving their staves playfully (whimsical and gentle, NEVER scary).
Dreamy, colourful, joyful, no text.`
        },

        // Pág. 8 · Cap. 50: As Damas Barbudas (Imaginação)
        {
            id: 'p8-imag', destino: `${P6}/p8-imag.png`, imaginacao: true,
            refs: [`${P6}/p8-real.png`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE (the palace garden courtyard, tall Countess Trifaldi and veiled ladies on the left, Don Quixote and Sancho on the right, Duke and Duchess behind).
Transform into a luminous, starry fairytale twilight (magical deep violet, turquoise and gold sky with twinkling stars and floating fairy sparkles):
- [QUIXOTE] on the right becomes the GOLDEN KNIGHT (gleaming gold plate armour, open-visor golden helmet with tall red plume, crimson cape), hand on his chest in a noble vow.
- [SANCHO] beside him wears his sky-blue squire's tunic with gold trim (clean-shaven round rosy face, NO beard, brown flat cap).
- On the left, Countess Trifaldi and the veiled ladies become radiant storybook noblewomen in jewel-toned enchanted gowns (emerald, sapphire, gold, crimson) with luminous, shimmering fairytale beards glowing softly with fairy-spell sparkles; hide the men's leather boots beneath flowing enchanted hems (pure magic enchantment, not a prank here). The two little pages wear royal velvet tunics.
- Behind on the right, the Duke and Duchess appear in splendid royal fairytale velvet.
Magical, tender, whimsical, never scary, no text.`
        },

        // ================ LOTE 2 (dependem da p5-real aprovada) ================

        // Pág. 5 · Cap. 47: O Teatrinho de Mestre Pedro (Imaginação) — usa a p5-real gerada como ref de layout
        {
            id: 'p5-imag', destino: `${P6}/p5-imag.png`, imaginacao: true,
            refs: [`.cache-arte/dom-quixote-parte-6/p5-real/2026-11-13T23-38-14.png`, `${REF}/dom-quixote-heroi-dourado.png`],
            prompt: `KEEP THE GENERAL LAYOUT OF THE FIRST REFERENCE IMAGE (Don Quixote on the left, action in the centre, Sancho watching on the right), BUT transform the inn and puppet stage into a dramatic, colourful fairytale adventure at moonlit midnight!
- On the LEFT, [QUIXOTE] becomes the GOLDEN KNIGHT (gleaming gold armour, golden helmet with tall red plume, crimson cape, raised glowing GOLDEN SWORD — ONLY ONE sword, no second sword at his belt), charging heroically forward.
- In the CENTRE, the puppet theater becomes a towering moonlit medieval stone castle tower and fortress courtyard with glowing lanterns: escaping across the foreground on a dashing white horse are the brave knight Dom Gaiferos and Princess Melisendra in a flowing gown, waving joyfully as they ride to freedom!
- Around the castle gate, tiny comical tin-armoured castle soldiers scatter in surprise and a pompous little crowned king tumbles harmlessly onto soft cushions/bushes (playful storybook action, NOT violent, no injuries).
- On the RIGHT, [SANCHO] in his sky-blue squire's tunic (clean-shaven, NO beard) watches wide-eyed.
Magical, epic, joyful, safe for children, no text.`
        },

        // Edições de correção do Lote 1:
        // p3-imag-v3: Palácio de Cristal subterrâneo (gerado limpo sem Sancho/Primo da Realidade)
        {
            id: 'p3-imag-v3', destino: `${P6}/p3-imag.png`, imaginacao: true,
            refs: [`${REF}/dom-quixote-heroi-dourado.png`, `${P6}/p3-real.png`],
            prompt: `EXCEPTION FOR THIS PAGE: Paint the magical UNDERGROUND CRYSTAL PALACE OF MONTESINOS deep inside the earth (ignore the exterior cliff, rope, Sancho and the Cousin from the second reference — ONLY the Golden Knight is inside the crystal palace). Use the FIRST reference image for the Golden Knight's design.
- The entire scene is inside a breathtaking, luminous underground PALACE MADE OF TRANSLUCENT FACETED CRYSTAL: towering crystal arches, glowing turquoise, violet, rose and golden crystal pillars, crystal chandeliers and shimmering crystal floor.
- On the LEFT-CENTRE foreground, [QUIXOTE] as the GOLDEN KNIGHT (gleaming polished gold plate armour, open-visor golden helmet with tall red plume, crimson cape, golden lance with red pennant) stands proudly on foot, bowing politely.
- On the RIGHT-CENTRE foreground, welcoming him warmly at the palace doorway is the kindly ancient sage MONTESINOS: a gentle, dignified old man in rich turquoise-and-gold velvet robes with an extraordinarily LONG snow-white beard reaching all the way down to the crystal floor.
- Further inside the crystal hall behind them, a few peaceful enchanted knights and noble ladies in fairytale clothes rest serenely in soft magical light.
ONLY Don Quixote, Montesinos and the distant enchanted court appear. Magical, serene, joyful, never scary. No text.`
        },
        // p5-real-v2: tira a segunda espada do cinto de Dom Quixote e o rabo do macaco
        {
            id: 'p5-real-v2', destino: `${P6}/p5-real.png`,
            refs: [`.cache-arte/dom-quixote-parte-6/p5-real/2026-11-13T23-38-14.png`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (keep the exact room, puppet theater stage, empty stage floor, candles, poses, Master Peter with green eyepatch, Sancho with coin pouch, Don Quixote), making ONLY TWO small fixes:
1. REMOVE the extra sword hilt/handle sticking out of Don Quixote's belt on his right hip! He holds ONLY ONE sword in his right hand (there must be NO second sword or hilt at his belt).
2. REMOVE the monkey's tail completely! The monkey sitting on top of the puppet theater roof has NO tail at all (completely tailless).
Do not change anything else. Keep the central wooden stage platform empty and clear.`
        },

        // Camadas da Pág. 5 (sobre #FF00FF puro para recorte limpo com tools/recortar-camada.py)
        {
            id: 'p5-rei', destino: `${P6}/camadas/p5-rei.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`.cache-arte/dom-quixote-parte-6/p5-real/2026-11-13T23-38-14.png`],
            prompt: `ONE single handcrafted children's puppet-theater KING PUPPET, freshly mended and standing upright, facing forward. Made of stitched colourful cloth, painted wood and cardboard in the exact warm storybook watercolor style of the reference image: wearing a bright golden cardboard crown, a deep crimson-red royal cloak (NO pink, NO magenta anywhere in the cloak or outfit!), blue tunic, white cotton beard, and little wooden puppet rod/strings neatly tucked. Full figure from crown to hem, isolated on pure flat #FF00FF magenta background.`
        },
        {
            id: 'p5-cavalo', destino: `${P6}/camadas/p5-cavalo.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`.cache-arte/dom-quixote-parte-6/p5-real/2026-11-13T23-38-14.png`],
            prompt: `ONE single handcrafted children's puppet-theater KNIGHT'S HORSE PUPPET, freshly mended and standing upright in a playful three-quarter profile. Made of carved painted warm brown wood, stitched felt saddle in crimson and gold, tiny cord reins and stitched cloth mane/tail, in the exact warm storybook watercolor style of the reference image. Full figure from ears to hooves, isolated on pure flat #FF00FF magenta background. NO pink or magenta anywhere on the horse.`
        },
        {
            id: 'p5-torre', destino: `${P6}/camadas/p5-torre.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`.cache-arte/dom-quixote-parte-6/p5-real/2026-11-13T23-38-14.png`],
            prompt: `ONE single handcrafted children's puppet-theater MINIATURE CASTLE TOWER prop, freshly mended and upright, front view. Made of painted cardboard and thin wood with painted stone bricks, crenellated battlements, a small arched window and wooden door, in the exact warm storybook watercolor style of the reference image. Full prop from battlements to flat wooden base, isolated on pure flat #FF00FF magenta background. NO pink or magenta anywhere on the tower, NO text.`
        }
    ]
};
