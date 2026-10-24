// Pedidos de arte da Parte 4 de Dom Quixote para tools/gerar-imagens.mjs (Nano Banana 2 pela API, Batch).
// Fonte: docs/TODO-NANO-BANANA-PARTES-2-4.md (P4-0 a P4-7) e o texto de dom-quixote/parte-4.html.
// Nas páginas do governo (4 a 6), a Imaginação é a de Sancho: ele vira o governador sábio, não o escudeiro.
import { P1, P2, REF, estilo, estiloCamada, imaginacao, personagens } from './dom-quixote-comum.mjs';

const P3 = 'dom-quixote/imagens/parte-3';
const P4 = 'dom-quixote/imagens/parte-4';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo, estiloCamada, imaginacao, personagens,

    pedidos: [
        // ---------------- P4-0 · Capa ----------------
        {
            id: 'p0-real', destino: `${P4}/p0-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p0-real.webp`],
            prompt: `Book cover of Part 4, "The Enchanted Cage and Sancho's Island". At sunrise, on top of a green hill, [QUIXOTE] on [ROCINANTE] and [SANCHO] on [BURRICO] face the reader, side by side, looking out at the horizon with hopeful faces. Far away on one side, the white village of La Mancha with its church tower; on the other side, the sparkling blue sea. Soft pink and golden dawn sky.`
        },
        {
            id: 'p0-imag', destino: `${P4}/p0-imag.png`, imaginacao: true,
            refs: [`${P4}/p0-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P1}/p6-imag.webp`],
            prompt: `EXCEPTION for this page: Sancho is the GOVERNOR of his island, wearing a simple golden governor's crown and a blue cloak with gold trim (like the crowned Sancho of the third reference image), still on his festive donkey. Same places and poses as the reality version: the golden knight on his white steed and Governor Sancho on the hilltop, facing the reader. On the horizon, the sea holds an enchanted island with palm trees, a little white castle and golden beaches; above it, a winged wooden horse flies across a magical dawn sky full of sparkles.`
        },

        // ---------------- P4-1 · A jaula encantada ----------------
        {
            id: 'p1-real', destino: `${P4}/p1-real.png`,
            refs: [`${P3}/p4-real.webp`, `${P2}/p8-real.webp`],
            prompt: `A country road through golden fields in the late afternoon.
COMPOSITION (important):
- On the LEFT (from about 12% to 38% of the width, lower half), two slow, gentle WHITE oxen pull a wooden ox cart with big creaking wheels.
- On the cart, a cage made of wooden oak slats, and inside it [QUIXOTE] (without his helmet) sits serene and smiling, waving happily through the bars.
- Beside the cart, [SANCHO] walks leading [BURRICO].
- Behind, [PADRE] and [BARBEIRO] (as in the references, without any fake beard) ride on horseback, smiling kindly; [ROCINANTE] is tied to the back of the cart.
Calm, tender and a little funny.`
        },
        {
            id: 'p1-imag', destino: `${P4}/p1-imag.png`, imaginacao: true,
            refs: [`${P4}/p1-real.webp`, `${P1}/p0-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `Don Quixote believes he is enchanted by a powerful wizard: the wooden cage becomes an enchanted CRYSTAL CARRIAGE glittering with light, pulled (on the left, in the same place) by two majestic white bulls with golden horns and flower garlands. Inside, the golden knight sits serene and smiling, waving. A wizard in a starry midnight-blue cloak and pointed hat drives the carriage, holding glowing reins. Sancho the squire walks beside with his festive donkey; behind, the priest and the barber become two mysterious enchanters in starry masks and cloaks on horseback; the white steed follows the carriage. The fields become a meadow of golden flowers under a violet and rose sunset with sparkles.`
        },

        // ---------------- P4-2 · De volta para casa ----------------
        {
            id: 'p2-real', destino: `${P4}/p2-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P1}/p4-real-fundo.webp`],
            prompt: `The sunny village square of La Mancha on a Sunday: white houses with red tile roofs, flower pots, a little fountain, curious neighbours at the windows and doors. The ox cart is parked at the back.
- On the LEFT, [SOBRINHA] and [GOVERNANTA] hug [QUIXOTE] (without his helmet, tired and happy) with tears of joy.
- On the RIGHT (from about 62% to 92% of the width), [SANCHO] is welcomed by [TERESA], who hugs him, while [SANCHICA] jumps into his arms; [BURRICO] stands beside them.
Warm, joyful and tender.`
        },
        {
            id: 'p2-imag', destino: `${P4}/p2-imag.png`, imaginacao: true,
            refs: [`${P4}/p2-real.webp`, `${P1}/p5-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `How Don Quixote feels his return: a triumphal parade. The village square becomes a royal city decorated for a festival: garlands, colourful bunting and banners on every balcony, rose petals and golden confetti floating in the air, trumpeters on the rooftops, cheering neighbours in festive clothes. On the left, in the same place and pose, the golden knight is embraced by his niece and the housekeeper, now dressed as elegant ladies of the court. On the right, in the same place, Sancho the squire is hugged by Teresa and Sanchica in festive dresses with flower crowns, and his festive donkey has flowers on its ears.`
        },

        // ---------------- P4-3 · Clavilenho ----------------
        {
            id: 'p3-real', destino: `${P4}/p3-real.png`,
            refs: [`${P1}/p5-real.webp`, `${P2}/p8-real.webp`],
            prompt: `The garden of the dukes' castle at sunset: neat hedges, a fountain, the castle walls behind.
COMPOSITION (important, the book adds the wooden horse with the riders and the wind and heat as separate layers):
- In the background, [DUQUES] and several servants watch, covering their mouths to hold back laughter.
- The CENTRE of the picture, from about 30% to 66% of the width and from about 45% to 95% of the height, must stay EMPTY: just the garden lawn and gravel path.
- On the LEFT, a servant holds a large blacksmith's bellows, pointed toward the centre.
- On the RIGHT, another servant holds a burning torch, pointed toward the centre.`
        },
        {
            id: 'p3-clavilenho', destino: `${P4}/camadas/p3-clavilenho.png`, camada: true,
            proporcao: '4:3', refs: [`${P2}/p8-real.webp`, `${P2}/p3-real.webp`],
            prompt: `Clavileño, a big wooden horse (painted wood, carved mane, a wooden peg on its forehead, standing on four stiff wooden legs), seen from the side facing right. Riding it, [QUIXOTE] (in his armour, without his helmet) in front and [SANCHO] behind him, hugging his master's waist tightly; both wear thick black blindfolds over their eyes; Don Quixote looks brave, Sancho terrified and amazed. Full figure, from the riders' heads to the horse's hooves, with a small soft contact shadow under the hooves.`
        },
        {
            id: 'p3-vento-fole', destino: `${P4}/camadas/p3-vento-fole.png`, camada: true,
            proporcao: '16:9', refs: [`${P4}/p3-real.webp`],
            prompt: `Gusts of wind painted in pale blue-white watercolour: curly swirls and streaks blowing from LEFT to RIGHT, with a few green leaves and petals flying in them. Light and airy. Paint only the wind swirls and the leaves.`
        },
        {
            id: 'p3-calor-tocha', destino: `${P4}/camadas/p3-calor-tocha.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P4}/p3-real.webp`],
            prompt: `A warm glow of heat with flickering orange and golden flames and little sparks flying up, like the heat of a torch, round and soft, in watercolour. Paint only the flames, the warm glow and the sparks.`
        },
        {
            id: 'p3-imag', destino: `${P4}/p3-imag.png`, imaginacao: true,
            refs: [`${P1}/p0-imag.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P4}/camadas/p3-clavilenho.webp`],
            prompt: `EXCEPTION for this page: it has no reality reference; this full illustration shows what the two friends imagine while blindfolded. Clavileño becomes a magnificent WINGED wooden horse with golden-feathered wings (keep the carved wooden mane and the peg on its forehead, like the third reference image), flying among the stars through soft clouds. Riding it, the golden knight (no blindfold, eyes wide with wonder, crimson cape flying) and behind him Sancho the squire hugging his waist, amazed and delighted. They pass close to a big smiling sun on one side, with a crescent moon and stars on the other; far below, the earth is tiny, with little fields, rivers and castles. Joyful and full of light.`
        },

        // ---------------- P4-4 · Conselhos para um governador ----------------
        {
            id: 'p4-real', destino: `${P4}/p4-real.png`,
            refs: [`${P4}/p3-real.webp`, `${P2}/p5-real.webp`],
            prompt: `The castle garden in the morning, with roses, a stone fountain and cypress trees.
- On the LEFT, [QUIXOTE] (without his helmet) sits on a stone bench, speaking kindly, one hand resting on Sancho's shoulder.
- On the RIGHT (from about 55% to 85% of the width), [SANCHO] stands listening with teary eyes, holding his cap against his chest; [BURRICO] stands beside him.
Gentle, wise and moving.`
        },
        {
            id: 'p4-imag', destino: `${P4}/p4-imag.png`, imaginacao: true,
            refs: [`${P4}/p4-real.webp`, `${P1}/p6-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `EXCEPTION for this page: this is Sancho's dream of his future, and Sancho is the WISE GOVERNOR of the island, not the squire: a simple golden governor's crown, a blue cloak with gold trim, sitting on a simple wooden throne under a palm tree, holding the scales of justice, kind and thoughtful (in the right part of the picture, from about 55% to 85% of the width, as in the reality version). Around him, the smiling people of the island (farmers, fishermen, children) bring flowers and fruit; the garden becomes an island with palm trees and a turquoise sea. On the left, in the same place, the golden knight sits on the stone bench, watching his friend with pride.`
        },

        // ---------------- P4-5 · O mistério da bengala ----------------
        {
            id: 'p5-real', destino: `${P4}/p5-real.png`,
            refs: [`${P3}/p4-real.webp`, `${P2}/p8-real.webp`],
            prompt: `The audience room of the village of "Barataria": a simple hall with wooden beams, a long bench, villagers watching from the sides.
COMPOSITION (important, the book adds the walking stick as a separate layer):
- At the back in the centre, [SANCHO], dressed as governor in a simple dark blue robe with a gold chain, sits in a large wooden governor's chair, thoughtful, his hand on his chin.
- On the LEFT, a little old man complaining, pointing indignantly.
- On the RIGHT, a serious little old man with his hand on his chest, looking innocent.
- The floor in the foreground centre (from about 38% to 62% of the width, lower 20% of the picture) stays EMPTY: just the wooden floor boards.`
        },
        {
            id: 'p5-bengala-inteira', destino: `${P4}/camadas/p5-bengala-inteira.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P4}/p5-real.webp`],
            prompt: `ONE thick old wooden walking stick with a curved handle, whole, lying on the floor slightly diagonally, seen from the same angle and in the same light as the floor of the reference picture, with a small soft contact shadow. Paint only the walking stick.`
        },
        {
            id: 'p5-bengala-quebrada', destino: `${P4}/camadas/p5-bengala-quebrada.png`, camada: true,
            proporcao: '16:9', refs: [`${P4}/camadas/p5-bengala-inteira.webp`, `${P4}/p5-real.webp`],
            prompt: `The SAME walking stick as the first reference image, now broken in two halves lying on the floor a little apart; the broken ends show that it is HOLLOW inside, and ten shiny gold coins have rolled out of it and lie scattered between the two halves, sparkling. Same angle and light as the floor of the second reference picture, small soft contact shadows. Paint only the two halves of the stick and the coins.`
        },
        {
            id: 'p5-imag', destino: `${P4}/p5-imag.png`, imaginacao: true,
            refs: [`${P4}/p5-real.webp`, `${P1}/p5-imag.webp`, `${P1}/p6-imag.webp`],
            prompt: `EXCEPTION for this page: Sancho is the WISE KING-GOVERNOR, not the squire: a simple golden crown, a royal blue and gold robe, a wise little owl perched on his shoulder, sitting on a carved golden throne at the back in the centre, in the same pose (hand on his chin, thinking). The audience room becomes a fairytale court of justice: tall arched windows with stained glass, banners, a golden scale of justice above the throne, courtiers in colourful clothes. On the left and on the right, in the same places and poses, the two old men become two storybook elders in rich velvet robes with long white beards. The floor in the foreground centre stays clear: polished marble with a golden star pattern.`
        },

        // ---------------- P4-6 · Sancho escolhe seu burrico ----------------
        {
            id: 'p6-real', destino: `${P4}/p6-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P1}/p3-real.webp`],
            prompt: `A simple stable in the morning: golden sunbeams come in through the gaps of the wooden walls, hay, a wooden trough.
- In the CENTRE (from about 30% to 75% of the width), [SANCHO], back in his old simple peasant clothes, hugs the neck of [BURRICO] tenderly with his eyes closed and a peaceful smile.
- At the back, in the open stable door, the villagers of the island watch him leave, sad and grateful, one wiping a tear.
Tender, simple and luminous.`
        },
        {
            id: 'p6-imag', destino: `${P4}/p6-imag.png`, imaginacao: true,
            refs: [`${P4}/p6-real.webp`, `${P1}/p6-imag.webp`, `${P2}/p3-imag.webp`],
            prompt: `EXCEPTION for this page: this is Sancho's freedom, he is himself (his own simple peasant clothes, NOT the squire's tunic) and his donkey has no blanket; and the SETTING CHANGES COMPLETELY: the stable and the villagers disappear, there are no walls and no roof. In the centre of the picture (from about 30% to 75% of the width), Sancho and his donkey walk side by side, free and happy, across an endless meadow of flowers toward a bright horizon, with white doves flying around them. Behind them, his golden governor's crown hangs forgotten on the branch of a small tree. Soft golden morning light, peaceful and luminous.`
        },

        // ---------------- P4-7 · As aventuras moram nos livros ----------------
        {
            id: 'p7-real', destino: `${P4}/p7-real.png`,
            refs: [`${P1}/p1-real.webp`, `${P2}/p5-real.webp`],
            prompt: `Exactly the same living room as the first reference image (the same fireplace, the same green armchair, the bookshelves), now at night with the fire burning warmly.
- On the LEFT (from about 20% to 50% of the width), [ALONSO], old and serene, sits in the green armchair telling stories with an open hand.
- On the rug in front of him, a group of village children (girls and boys of different ages, in simple 1600s clothes) sit listening with shining eyes; the little orange cat sleeps on one child's lap.
Cosy, warm and magical in its simplicity.`
        },
        {
            id: 'p7-imag', destino: `${P4}/p7-imag.png`, imaginacao: true,
            refs: [`${P4}/p7-real.webp`, `${P1}/p1-imag.webp`, `${P1}/p7-imag.webp`, `${REF}/leao-guardiao.png`],
            prompt: `EXCEPTION for this page: Alonso stays as he is (the old storyteller in his armchair, NOT the golden knight) and the children stay the same; this is the imagination of the children listening. Same room, same places and poses. From the smoke of the fireplace and from Alonso's words rise ALL the adventures of the collection, as soft glowing watercolour visions swirling across the ceiling: the stone giants of the windmills, Princess Dulcinea, the golden knight on his white steed, the golden Helmet of Mambrino, Sancho as governor with his crown, little goats crossing a river in a boat, and the winged wooden horse Clavileño flying among stars. At the children's feet lies the gentle Guardian Lion with a golden crown (like the fourth reference image). Warm, magical and joyful.`
        }
    ]
};
