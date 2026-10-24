// Pedidos de arte da Parte 3 de Dom Quixote para tools/gerar-imagens.mjs (Nano Banana 2 pela API, Batch).
// Fonte: docs/TODO-NANO-BANANA-PARTES-2-4.md (P3-0 a P3-7) e o texto de dom-quixote/parte-3.html.
// Rodadas: (1) Realidades sem dependência + camadas soltas; (2) Realidades com personagens já criados
// (padre, barbeiro, Doroteia), Imaginações e camadas da cena; (3) correções. Ver docs/ARTE-PELA-API.md.
import { P1, P2, REF, estilo, estiloCamada, imaginacao, personagens } from './dom-quixote-comum.mjs';

const P3 = 'dom-quixote/imagens/parte-3';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo, estiloCamada, imaginacao, personagens,

    pedidos: [
        // ---------------- P3-0 · Capa ----------------
        {
            id: 'p0-real', destino: `${P3}/p0-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p0-real.webp`],
            prompt: `Book cover of Part 3, "Sierra Morena and Princess Micomicona". A narrow stony trail climbs into the wild, majestic mountains of the Sierra Morena: reddish rocks, twisted holm oaks, pines, wild flowers and deep blue distant peaks. Seen from behind in three-quarter view, climbing the trail: [QUIXOTE] on [ROCINANTE] (the shiny basin catching the sunlight) and [SANCHO] on [BURRICO] a little behind. An eagle glides in the clear morning sky.`
        },
        {
            id: 'p0-imag', destino: `${P3}/p0-imag.png`, imaginacao: true,
            refs: [`${P3}/p0-real.webp`, `${P2}/p0-imag.webp`, `${REF}/dom-quixote-heroi-dourado.png`],
            prompt: `The Sierra Morena becomes the mountains of an enchanted kingdom: white castles with pennants on the peaks, waterfalls of golden light pouring down the cliffs, rainbows in the mist, and the stony trail turned into a glowing golden path. Seen from behind, climbing it as in the reality version: the golden knight on his white steed and Sancho the squire on his festive donkey. The eagle becomes a majestic golden eagle. Sky in gold, rose and violet.`
        },

        // ---------------- P3-1 · A mala perdida ----------------
        {
            id: 'p1-real', destino: `${P3}/p1-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A stony clearing high in the Sierra Morena, among rocks, thorny bushes and twisted holm oaks.
COMPOSITION (important, the book adds coins and a notebook as separate layers):
- In the centre-bottom of the picture (from about 38% to 64% of the width, lower part, from about 70% to 92% of the height), an old battered leather suitcase lies OPEN on the ground, EMPTY inside, wet and a little torn, with rusty clasps. The ground right in front of it (bottom centre) stays clear.
- On the LEFT, [SANCHO] kneels with wide, amazed eyes, hands on his knees.
- On the RIGHT, [QUIXOTE] stands, curious, leaning on his lance; [ROCINANTE] and [BURRICO] graze behind them.
Bright mountain light, an adventurous and cosy mood.`
        },
        {
            id: 'p1-moedas', destino: `${P3}/camadas/p1-moedas.png`, camada: true,
            proporcao: '4:3', refs: [`${P3}/p1-real.webp`],
            prompt: `A handful of shiny old gold coins scattered on the ground in a little heap, with a small cloth purse lying open beside them, seen from the same slightly-high angle and in the same light as the suitcase of the reference picture. Paint only the coins and the purse.`
        },
        {
            id: 'p1-caderno', destino: `${P3}/camadas/p1-caderno.png`, camada: true,
            proporcao: '4:3', refs: [`${P3}/p1-real.webp`],
            prompt: `A small notebook with a worn brown leather cover lying OPEN on the ground, seen from the same slightly-high angle and in the same light as the suitcase of the reference picture. Its pages are covered with elegant handwriting drawn only as wavy ink scribbles and little hearts and flowers in the margins: absolutely no readable letters. Paint only the notebook.`
        },
        {
            id: 'p1-imag', destino: `${P3}/p1-imag.png`, imaginacao: true,
            refs: [`${P3}/p1-real.webp`, `${P2}/p3-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `The old suitcase, in the same place, becomes the enchanted chest of a poet: a carved wooden chest with golden corners, open, from which pages of poems fly up like white birds, and gold coins float out shining like little stars. The stony clearing becomes a flowery mountain garden with sparkling rocks. On the left, Sancho the squire kneels in wonder (same pose); on the right, the golden knight stands leaning on his golden lance, gazing at the flying poems with emotion.`
        },

        // ---------------- P3-2 · As cambalhotas ----------------
        {
            id: 'p2-real', destino: `${P3}/p2-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A grassy clearing in the Sierra Morena on a fresh, sunny morning, with rocks, pines and mountains behind.
COMPOSITION (important, the book adds Don Quixote as a separate spinning layer):
- On the RIGHT third, [SANCHO] stands holding the reins of [BURRICO] with one hand and covering his eyes with the other hand, laughing so hard that tears run down his cheeks.
- The area from about 25% to 55% of the width, in the lower two thirds of the picture, must stay EMPTY: just soft green grass and earth (Don Quixote will be added there).
- On the far LEFT, Don Quixote's armour, the shiny basin and the lance lie in a little pile on a rock, and [ROCINANTE] grazes nearby.
Light, funny and tender mood.`
        },
        {
            id: 'p2-quixote-camisolao', destino: `${P3}/camadas/p2-quixote-camisolao.png`, camada: true,
            proporcao: '3:4', refs: [`${P2}/p5-real.webp`, `${P2}/p8-real.webp`],
            prompt: `[QUIXOTE_CAMISOLAO] standing full body, both arms raised high above his head, ready to do a somersault, with a determined, joyful smile (the little gap of two missing teeth showing). Full figure from the top of his hands to his bare feet, centred in the canvas with some empty margin all around. Same face and style as the reference pictures.`
        },
        {
            id: 'p2-imag', destino: `${P3}/p2-imag.png`, imaginacao: true,
            refs: [`${P3}/p2-real.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P1}/p7-imag.webp`],
            prompt: `How Don Quixote sees his somersaults: the clearing becomes a natural amphitheatre of glowing rocks and flowers, with an audience of eagles on the rocks and deer, rabbits and birds watching in awe. In the middle-left (from about 25% to 55% of the width), the golden knight is captured mid-air in a heroic acrobatic somersault, upside down with his crimson cape swirling, among trails of golden sparkles. On the right, in the same place and pose, Sancho the squire laughs covering his eyes, holding the reins of his festive donkey. On the far left, the white steed and the golden armour pieces shine on a rock.`
        },

        // ---------------- P3-3 · A carta para Dulcineia ----------------
        {
            id: 'p3-real', destino: `${P3}/p3-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p0-real.webp`],
            prompt: `A dirt road at the foot of the Sierra Morena, mountains behind, the road toward El Toboso winding ahead across the plain. In the centre, [SANCHO] sits on [BURRICO], stopped in the middle of the road, scratching his head with one hand and looking up with a funny, forgetful, worried face, his other hand searching an empty pocket. Late morning light.`
        },
        {
            id: 'p3-real-lembrou', destino: `${P3}/p3-real-lembrou.png`,
            refs: [`${P3}/p3-real.webp`],
            prompt: `Edit the reference image (this exact page): keep EVERYTHING identical (camera, road, mountains, light, the donkey, Sancho's place, size and clothes). Only Sancho changes: now he has just remembered! His index finger is raised high, his eyes shine, he smiles from ear to ear, and a little burst of soft golden sparkles twinkles above his head.`
        },
        {
            id: 'p3-imag', destino: `${P3}/p3-imag.png`, imaginacao: true,
            refs: [`${P3}/p3-real.webp`, `${P1}/p3-imag.webp`, `${P2}/p2-imag.webp`],
            prompt: `This page shows what Sancho imagines. ONLY Sancho is in this page: Don Quixote stayed in the mountains, so there is NO golden knight, NO white steed and no other rider. The love letter is a BIG white paper dove (a folded letter with wings, no writing visible) flying in the upper middle of the sky, leaving a trail of sparkles, toward a distant pink-and-white palace of El Toboso on the right horizon, where Princess Dulcinea (like the princess of the second reference image), small and far away, waves from a balcony. In the same place as in the reality version, Sancho the squire sits on his festive donkey, watching the letter-dove fly away with delight. Luminous sky with a soft rainbow.`
        },

        // ---------------- P3-4 · Amigos disfarçados ----------------
        {
            id: 'p4-real', destino: `${P3}/p4-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A simple whitewashed room in a roadside inn, wooden beams, a small window, a wooden chest, an old mirror on the back wall.
- On the LEFT, [PADRE] has put on a borrowed lady's wide flowery skirt over his black cassock and a flowery bonnet on his head, laughing at himself.
- On the RIGHT (from about 55% to 80% of the width, from about 20% to 80% of the height), [BARBEIRO] proudly wears an enormous, comically crooked fake ginger beard made from an ox tail, tied under his chin, reaching down to his belly.
- The mirror on the wall between them reflects the two disguised friends.
- In the open doorway at the back, [SANCHO] laughs, holding his belly.
Funny, warm and theatrical.`
        },

        // ---------------- P3-6 · A batalha dos odres ----------------
        {
            id: 'p6-real', destino: `${P3}/p6-real.png`,
            refs: [`${P2}/p6-real.webp`, `${P2}/p5-real.webp`],
            prompt: `An inn bedroom at night, lit by candles, warm golden light and soft blue shadows, wooden floor boards.
COMPOSITION (important, the book adds hanging wine skins and splashes as separate layers):
- On the LEFT (from about 12% to 42% of the width), [QUIXOTE_CAMISOLAO] is sleepwalking: standing with his eyes closed and a dreamy smile, bravely swinging an old sword high in the air.
- The RIGHT wall (from about 48% to 90% of the width) is a plain whitewashed wall with three EMPTY iron hooks fixed high on it (around 25% to 30% of the height), with nothing hanging from them; the wall below the hooks and the wooden floor below stay clear and empty.
- In the doorway at the back on the left, [ESTALAJADEIRO] in his nightcap, his hair standing on end, and [SANCHO] peeking in amazement, holding a candle.
Funny, never scary.`
        },
        {
            id: 'p6-odre', destino: `${P3}/camadas/p6-odre.png`, camada: true,
            proporcao: '3:4', refs: [`${P3}/p6-real.webp`],
            prompt: `ONE big, round, plump old leather wine skin (a goatskin bag full of wine, dark brown leather with stitched seams), hanging by a short rope from a black iron wall hook: the hook is at the very top of the canvas, the rope goes straight down from it to the neck of the wine skin. Seen in the warm candlelight of the reference picture. Paint only the iron hook, the rope and the wine skin.`
        },
        {
            id: 'p6-respingo', destino: `${P3}/camadas/p6-respingo.png`, camada: true,
            proporcao: '16:9', refs: [`${P3}/p6-real.webp`],
            prompt: `A comic splash of dark grape-juice red-purple wine on wooden floor boards seen from a low angle: a wide flat puddle with a few big round droplets jumping up from it, like spilled grape juice in a cartoon (nothing like blood), in the candlelight of the reference picture. Paint only the splash and the puddle, no floor boards.`
        },
        {
            id: 'p6-imag', destino: `${P3}/p6-imag.png`, imaginacao: true,
            refs: [`${P3}/p6-real.webp`, `${P2}/p1-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `Don Quixote's dream: the inn bedroom becomes a great castle hall with tall columns, banners and torches. On the left, in the same place and pose, the golden knight swings a gleaming golden sword high. On the right, filling the right half of the picture, the giant Pandafilando of the Squinting Look: a huge titan of stone and green moss like the giant of the second reference image, comically cross-eyed, with a bushy mossy beard and a surprised, clumsy expression (funny, never scary, no fangs, no claws); three round magic wine bags hang from his wide belt. We are indoors: NO donkey and NO horse in this page. The giant is comically CROSS-EYED: both of his eyes look inward at his own big nose, with a puzzled, funny smile. In the doorway on the left, the innkeeper (in the dream, a castle steward in a nightcap with a lantern) and Sancho the squire watch amazed.`
        },

        // ---------------- P3-7 · Armas e letras ----------------
        // (p5-real e p7-real usam o padre e o barbeiro de p4-real: rodada 2)
        {
            id: 'p5-real', destino: `${P3}/p5-real.png`,
            refs: [`${P3}/p4-real.webp`, `${P2}/p8-real.webp`],
            prompt: `A sunny clearing in the Sierra Morena with big rocks and pines.
COMPOSITION (important):
- In the CENTRE-RIGHT (from about 52% to 78% of the width), [DOROTEIA], dressed in her best shining silk dress and a velvet cloak, kneels gracefully before Don Quixote, hands clasped, with a dramatic pleading look.
- In the CENTRE-LEFT (from about 30% to 50% of the width), [QUIXOTE] stands moved and proud, holding out his hand to her.
- On the far LEFT, [SANCHO] watches, enchanted, hands clasped under his chin, with [BURRICO] behind him.
- On the far RIGHT, behind a big rock, [PADRE] (in his black cassock, as in the reference) and [BARBEIRO] (still wearing the huge crooked ginger ox-tail beard of the reference) peek out, holding back their laughter.`
        },
        {
            id: 'p7-real', destino: `${P3}/p7-real.png`,
            refs: [`${P3}/p5-real.webp`, `${P3}/p4-real.webp`],
            prompt: `The big hall of the inn at night: a long wooden table lit by candles and torches, with warm bread, cheese, olives and clay jugs. Around it, listening with shining eyes: travellers, merchants and a family, [DOROTEIA] (as in the first reference), [PADRE], [BARBEIRO] (WITHOUT the fake beard now, his thin black mustache only) and [SANCHO]. At the head of the table, in the CENTRE-LEFT (from about 35% to 60% of the width), [QUIXOTE] stands, without his helmet, one finger raised, giving a heartfelt speech. Cosy, warm and wise.`
        },
        {
            id: 'p4-imag', destino: `${P3}/p4-imag.png`, imaginacao: true,
            refs: [`${P3}/p4-real.webp`, `${P1}/p3-imag.webp`, `${P1}/p5-imag.webp`],
            prompt: `How Don Quixote would see the two disguised friends: the inn room becomes a castle hall with tapestries and stained-glass light, the mirror a golden magic mirror. On the left, in the same place and pose, the priest becomes a noble lady in an elegant gown with a wide hat full of feathers, laughing graciously. On the right, in the same place, the barber becomes a faithful squire in a green and gold tunic with a magnificent beard of glowing red-orange fire-like hair. In the doorway at the back, Sancho the squire laughs.`
        },
        {
            id: 'p5-imag', destino: `${P3}/p5-imag.png`, imaginacao: true,
            refs: [`${P3}/p5-real.webp`, `${P1}/p3-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`, `${P2}/p1-imag.webp`],
            prompt: `Same places and poses as the reality version. In the centre-right, Dorothea becomes Princess Micomicona: a fairytale princess of a faraway kingdom in a flowing turquoise and gold gown with a delicate golden circlet, kneeling gracefully. In the centre-left, the golden knight holds out his hand to her, solemn and moved. On the far left, Sancho the squire watches enchanted with his festive donkey. On the right, behind the rock, the priest and the barber become her royal retinue: a noble lady with a feathered hat and a squire with a fiery beard, holding a parasol and a banner. Behind them, the clearing opens onto a vision of the faraway kingdom of Micomicón: palm trees, golden domes and a blue river; far away in the clouds, the shadowy silhouette of the giant Pandafilando made of stone (mythological, not monstrous).`
        },
        {
            id: 'p7-imag', destino: `${P3}/p7-imag.png`, imaginacao: true,
            refs: [`${P3}/p7-real.webp`, `${P2}/p3-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `The Great Table of the Storytellers: the same long table with the same people in the same places, but the ceiling of the inn opens into a starry night sky, and from open books on the table rise little glowing scenes floating above the listeners: knights on horseback, sailing ships on waves, castles, a dragon-kite, a princess on a balcony (all small, made of golden light). At the head of the table, the golden knight stands with one finger raised (no helmet, his white hair shining); Dorothea is now the princess in turquoise and gold; Sancho the squire; the listeners wear rich storybook clothes. Candles glow like little stars.`
        }
    ]
};
