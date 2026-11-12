// Pedidos de arte da Parte 5 de Dom Quixote, GRUPO A: págs. 0 (capa), 1, 3 e 4 (2026-11-12).
// Rodada 1: as quatro Realidades; rodada 2: p0-imag como edição da p0-real aceita.
// Fonte: docs/cadernos/dom-quixote-parte-5.md §4 e o texto de dom-quixote/parte-5.html.
import { P1, P2, P3, P4, P5, REF, estilo, estiloCamada, imaginacao, personagens, modelo } from './dom-quixote-parte-5-comum.mjs';

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // ---------------- Pág. 0 · Capa ----------------
        {
            id: 'p0-real', destino: `${P5}/p0-real.png`,
            refs: [`${P1}/p0-real.webp`, `${P4}/p10-real.webp`],
            prompt: `Book cover, sunny day on a dirt country road through golden wheat fields with a few red poppies, a white windmill far away on a hill (same warm style as the references).
COMPOSITION (important, it must read well even as a small thumbnail: big characters, simple shapes):
- On the LEFT half (from about 8% to 50% of the width), [QUIXOTE] on [ROCINANTE], in his worn silver armour with the brass basin on his head, both seen from the front-side, large (taller than half of the picture height), leaning forward with wide, amazed eyes and mouth open in surprise.
- On the RIGHT (from about 52% to 78% of the width), [SANCHO] stands on foot next to [BURRICO], also amazed, eyebrows up.
- In the CENTRE-RIGHT, between the knight's and the squire's faces and in front of them, floating in the air at the height of their eyes and glowing softly, a BIG OPEN BOOK (about 25% of the picture width) with the pages turned towards the viewer. On the two open pages there are only two simple small painted pictures, WITHOUT ANY LETTERS, WORDS OR WRITING: on the left page a little drawing of the thin knight on his skinny horse, on the right page a little drawing of the round squire with his donkey. Cream-coloured paper with soft golden light rising from it.
- Nobody else, no other animals.
Warm, bright, funny and full of wonder.`
        },

        // ---------------- Pág. 1 · Cap. 34: a vassoura da governanta ----------------
        {
            id: 'p1-real', destino: `${P5}/p1-real.png`,
            refs: [`${P4}/p11-real.webp`, `${P4}/p10-real.webp`, `${P3}/p5-real.webp`],
            prompt: `Don Quixote's bedroom in his house in the daytime (same room and style as the FIRST reference image: wooden bed with patchwork quilt, bookshelves, window), warm morning light. The comic moment of the broom.
COMPOSITION (important):
- In the LEFT-CENTRE (from about 8% to 45% of the width), the wooden bed: [QUIXOTE_CASA] sits up in the bed with pillows behind his back, hands folded on the quilt, listening calmly with a gentle smile, looking towards the door.
- On the bed, near his feet, [GATO] sits and covers its eyes with one paw.
- In the CENTRE-FOREGROUND (from about 40% to 62% of the width), two chairs: [PADRE] and [BARBEIRO] sit on them, in the clothes of the second reference image, turned to the door, trying not to laugh, one hand over the mouth.
- On the RIGHT (from about 66% to 98% of the width), in the open doorway of the room: [GOVERNANTA] (white cap, apron) stands firmly in the door, arms stretched, holding a long straw BROOM horizontally across the doorway like a barrier with BOTH hands, stern but funny; and in front of the broom, on the other side, [SANCHO] (brown cap) is stuck trying to squeeze under the broom, his round belly jammed against it, his face scrunched up about to sneeze, the broom bristles tickling his nose. Both are clearly visible in full.
- Nobody else.
Cosy, bright and very funny.`
        },

        // ---------------- Pág. 4 · Cap. 37: a carroça dos atores ----------------
        {
            id: 'p4-real', destino: `${P5}/p4-real.png`,
            refs: [`${P1}/p0-real.webp`, `${P4}/p10-real.webp`],
            prompt: `A dirt country road through green fields on a sunny day, a bend with some trees. A comic moment.
COMPOSITION (important):
- On the RIGHT (from about 48% to 98% of the width), an OPEN wooden cart pulled by two mules, standing still, full of travelling actors in clearly HOME-MADE, cheerful paper-and-cloth costumes: in front, a smiling little DEVIL holding the reins (red clothes, red face paint, little horns made of red cardboard, a cardboard pitchfork; cute, polite and friendly, NOT scary at all); behind him an ANGEL with white wings made of painted cloth and a cardboard halo; a KING with a crown of painted tin and a velvet cape; a QUEEN with a paper crown; a WARRIOR in cardboard armour with a toy sword. Everybody is smiling. NO skeleton, NO figure of Death, nothing frightening.
- Leaping down from behind the cart in the CENTRE (from about 38% to 55% of the width): the CLOWN, in a patchwork suit covered with small jingling bells, a pointed hat with a bell, shaking a stick with THREE round balloons tied to its end (inflated bladders, like party balloons).
- On the LEFT (from about 3% to 38% of the width): [ROCINANTE] startled by the clown, rearing up with eyes wide, the saddle empty; [QUIXOTE] has just slipped off and sits on the grass beside him, rubbing his back, brass basin crooked, lance on the ground, more surprised than hurt; and, peeking out from behind [BURRICO] at the far left edge (from about 0% to 14%), only [SANCHO]'s round frightened face and cap, hiding.
Joyful, funny, colourful and safe for little children.`
        },

        // =============== Rodada 2 ===============
        // p3-real: 1ª e 2ª/3ª (edições) saíram com Sancho a pé (a ref. p0-real e a p10-real da Parte 4 o mostram a pé, o modelo copiou).
        // 4ª, do zero, com ref. em que Sancho vai no burrico (Parte 4 p3-real) e a regra "só montados".
        {
            id: 'p3-real', destino: `${P5}/p3-real.png`,
            refs: [`${P4}/p3-real.webp`, `${P1}/p0-real.webp`],
            prompt: `The edge of a small Spanish village at dusk: whitewashed houses with red tile roofs on the left, a dirt road leading out into golden fields and rolling hills on the right, the sky orange and pink fading to deep blue, the FIRST EVENING STAR twinkling above the horizon. Same warm storybook style as the references.
COMPOSITION (important): exactly TWO heroes in the foreground and BOTH ARE RIDING, nobody walks on foot, and there is only ONE Sancho and ONE Don Quixote.
- In the CENTRE-RIGHT (from about 45% to 80% of the width), seen from the side, riding to the right away from the village: [QUIXOTE] sitting high on [ROCINANTE] (the skinny chestnut horse of the second reference image), armour, the brass basin on his head, long wooden lance held upright, happy and hopeful.
- Right beside him, at the RIGHT edge (from about 78% to 98% of the width), [SANCHO] sitting ON [BURRICO] (like Sancho on the donkey in the first reference image), a bulging travel sack hanging on the donkey, smiling.
- At the LEFT, high in an open upper window of a house (about 10% to 24% of the width), [GOVERNANTA] leans out with her hand on her cheek, sighing.
- The road in front of the animals is empty: no person walks on the road.
- VERY FAR away on the road behind them near the horizon (from about 30% to 42% of the width, tiny, no taller than one tenth of the picture height), TWO small dark silhouettes of horse riders following, one with a tiny sparkle like a mirror glint. Only silhouettes, mysterious but not scary.`
        },
        {
            id: 'p0-imag', destino: `${P5}/p0-imag.png`, imaginacao: true,
            refs: [`${P5}/p0-real.webp`, `${P1}/p7-imag.webp`, `${REF}/rocinante-corcel-branco.png`],
            prompt: `KEEP THE COMPOSITION OF THE FIRST REFERENCE IMAGE EXACTLY: the same road, the same size and place of the two heroes, the big open book floating between them, facing the viewer.
The adventures LEAP OUT of the open book in streams of golden light: from the book's pages rise, small and magical, stone-and-moss GIANT windmills with swirling vanes (gentle bearded faces, kind eyes), a flock of fluffy sheep turning into a gleaming army of tiny knights with banners, and a majestic tawny lion with a golden mane, all swirling upwards in a golden spiral with sparkles, hearts of light and little stars. Still ONLY the two heroes (and the donkey and horse) are the main characters; no letters or words anywhere, even in the book.
The road and fields become a luminous fairytale landscape.`
        }
    ]
};
