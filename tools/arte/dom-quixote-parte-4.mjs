// Pedidos de arte da NOVA Parte 4 de Dom Quixote (rascunho, caps. 23 a 32) para tools/gerar-imagens.mjs
// (Nano Banana 2 pela API, Batch). Fonte: docs/cadernos/dom-quixote-parte-4.md §4 e o texto de
// dom-quixote/parte-4-rascunho.html. A lista da Parte 4 antiga ficou em dom-quixote-parte-4-v1.mjs.
// Rodadas: (1) Realidades + camadas soltas; (2) Imaginações (edição da Realidade aceita) e a p6-real
// (que usa a p5-real como cenário); (3) a p6-imag e o que falhar.
// A p9 (chegada à aldeia) reaproveita a arte da v1 (imagens/acervo/parte-4-v1/p2-*), sem pedido aqui.
import { P1, P2, REF, estilo, estiloCamada, imaginacao, personagens } from './dom-quixote-comum.mjs';

const P3 = 'dom-quixote/imagens/parte-3';
const P4 = 'dom-quixote/imagens/parte-4';
const V1 = 'dom-quixote/imagens/acervo/parte-4-v1';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo, estiloCamada, imaginacao,
    personagens: {
        ...personagens,
        BARBEIRO_BACIA: "the barber of the basin (from the rain episode of the second reference): a small, wiry village barber with a brown felt hat, a short grey travelling cape over a brown doublet and a long nose, comically indignant but harmless",
        EUGENIO: "Eugenio, a young goatherd of about twenty with curly brown hair, a sheepskin vest over a cream shirt, brown breeches and a wooden shepherd's crook",
        MANCHADINHA: "Manchadinha, a small, lively nanny goat with a white coat covered in big black patches, little curved horns and a tiny beard",
        GATO: "the little orange tabby cat of Don Quixote's house (as in the reference)"
    },

    pedidos: [
        // ---------------- Pág. 0 · Capa ----------------
        {
            id: 'p0-real', destino: `${P4}/p0-real.png`,
            refs: [`${P3}/p5-real.webp`, `${V1}/p1-real.webp`],
            prompt: `Book cover of a new part: the sunny courtyard of a simple Spanish country inn in the morning light (whitewashed walls, a wooden gallery, a well, flower pots).
- In the CENTRE, [QUIXOTE] sits proudly on [ROCINANTE], the shiny brass basin on his head, his wooden lance raised.
- Next to him, [SANCHO] on [BURRICO], smiling at the reader.
- On the RIGHT, an ox cart with a cage made of wooden slats waits by the gate, with two calm white oxen.
- On the LEFT, [PADRE] and [BARBEIRO] tie travel bags, exchanging a secret, kind smile; at the inn door, [DOROTEIA] (in her golden-yellow dress, as in the first reference) waves goodbye.
Warm, bright, adventurous and tender.`
        },

        // ---------------- Pág. 1 · Cap. 23: a despedida da princesa ----------------
        {
            id: 'p1-real', destino: `${P4}/p1-real.png`,
            refs: [`${P3}/p5-real.webp`, `${P3}/p7-real.webp`],
            prompt: `The courtyard of the same country inn at sunrise, golden light pouring in.
- In the LEFT half (from about 15% to 45% of the width), [DOROTEIA] (long dark braid, her golden-yellow dress with a crimson travelling cloak, as in the first reference) makes a graceful deep curtsy, smiling with shining eyes.
- In the RIGHT half (from about 52% to 75% of the width), [QUIXOTE] stands tall, the brass basin on his head, one hand proudly on his chest.
- On the far RIGHT, [SANCHO] whispers into the ear of [PADRE], his hand cupped to his mouth; the priest covers his mouth to hold back a laugh. Behind them, [BARBEIRO] watches with a tender, worried look.
Morning, gentle, a little funny.`
        },

        // ---------------- Pág. 2 · Cap. 24: bacia ou elmo? ----------------
        {
            id: 'p2-real', destino: `${P4}/p2-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P3}/p5-real.webp`],
            prompt: `The gate of the same country inn, in the morning; travellers with bags laugh in the background, some holding their bellies.
- On the LEFT (from about 15% to 40% of the width), [BARBEIRO_BACIA] tugs at the shiny brass basin with both hands, indignant.
- On the RIGHT (from about 60% to 85% of the width), [QUIXOTE] holds the other side of the same basin firmly with both hands, chin up, stubborn and proud. The basin is between them, both pulling (it does not float).
- In the CENTRE, just below the basin, [SANCHO] jumps between them with his arms wide open, laughing, calling for peace.
- In the background, [PADRE] holds a few coins in his hand, and [BARBEIRO] raises a hand as if counting votes.
Comic and joyful, nobody is angry for real.`
        },

        // ---------------- Pág. 3 · Cap. 25: a jaula encantada ----------------
        {
            id: 'p3-real', destino: `${P4}/p3-real.png`,
            refs: [`${V1}/p1-real.webp`, `${P3}/p4-real.webp`],
            prompt: `The yard of the country inn at dusk, lit by torches, the sky deep blue and orange.
COMPOSITION (important):
- On the LEFT (from about 5% to 30% of the width), two calm white oxen are harnessed to a wooden ox cart.
- In the CENTRE (from about 32% to 65% of the width), on the cart, a big cage made of wooden slats; inside it [QUIXOTE] (without his helmet) sits upright like a king on a throne, amazed and smiling.
- Next to the cage, two pretend "wizards" (the priest and the barber in costume): each wears an old white bed sheet draped like a long robe down to the feet, a funny wide-brimmed wizard hat made of brown cardboard painted with big yellow stars and a crescent moon, and a small brown cardboard face mask with a painted curly moustache tied over the eyes and nose (the mouth and chin visible, the priest's round spectacles peeking out). One holds a burning torch; the other reads a rolled parchment with a theatrical gesture. Clumsy home-made costumes, funny and harmless, like a children's theatre play. IMPORTANT: NO white pointed hoods, NO hoods covering the head, NO eye-hole hoods: the sheets hang from the shoulders only and the heads wear the cardboard star hats.
- On the RIGHT (from about 72% to 95% of the width), [SANCHO] sits on [BURRICO], watching from a distance with a frown and a suspicious, sceptical face.
- [ROCINANTE] is tied to the back of the cart.
Mysterious but gentle and funny.`
        },

        // ---------------- Pág. 4 · Cap. 26: encantado sente fome? ----------------
        {
            id: 'p4-real', destino: `${P4}/p4-real.png`,
            refs: [`${V1}/p1-real.webp`, `${P3}/p7-real.webp`],
            prompt: `A country road through golden wheat fields at midday.
COMPOSITION (important):
- Two white oxen pull a wooden ox cart from left to right, slowly; on the cart, a cage made of wooden slats, and inside it [QUIXOTE] (without his helmet) sits calmly, his thin hand on his belly.
- In the LEFT third, next to the cage (from about 15% to 40% of the width), [SANCHO] rides [BURRICO] right up to the bars and whispers to his master, one finger raised, clever and caring.
- Behind the cart, [PADRE] and [BARBEIRO] walk with the white bed sheets of their costume still over their shoulders and the pointed cardboard masks pushed up on top of their heads (faces visible), trying not to laugh.
- [ROCINANTE] walks tied behind the cart.
Sunny, tender and funny.`
        },

        // ---------------- Pág. 5 · Cap. 27: o piquenique (camadas pão, queijo, água) ----------------
        {
            id: 'p5-real', destino: `${P4}/p5-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P3}/p7-real.webp`],
            prompt: `A green meadow in spring, in the shade of a huge old oak tree; a little clear stream runs over white pebbles in the background.
COMPOSITION (important, the book adds the food as separate layers):
- In the CENTRE FOREGROUND (from about 35% to 65% of the width, from about 60% to 92% of the height), a red-and-white checkered tablecloth lies spread on the grass, COMPLETELY EMPTY: nothing on it, no food, no plates, no jug.
- On the LEFT of the cloth, [SANCHO] sits rubbing his hands, hungry and happy.
- On the RIGHT of the cloth, [QUIXOTE] sits cross-legged, WITHOUT the basin on his head (the shiny brass basin rests on the grass next to him).
- Behind the cloth, [PADRE] and [BARBEIRO] sit smiling.
- In the background, by the stream, [ROCINANTE] and [BURRICO] graze side by side like old friends.
Peaceful, sunny, friendly.`
        },
        {
            id: 'p5-pao', destino: `${P4}/camadas/p5-pao.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P3}/p7-real.webp`],
            prompt: `ONE round rustic country loaf of bread with a golden-brown crust, a few slices cut, seen slightly from above, with a small soft contact shadow under it. Paint only the bread.`
        },
        {
            id: 'p5-queijo', destino: `${P4}/camadas/p5-queijo.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P3}/p7-real.webp`],
            prompt: `ONE small round wheel of pale yellow sheep's cheese with a wedge cut out and two slices next to it, on a little wooden board, seen slightly from above, with a small soft contact shadow. Paint only the cheese and the board.`
        },
        {
            id: 'p5-agua', destino: `${P4}/camadas/p5-agua.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P3}/p7-real.webp`],
            prompt: `ONE terracotta clay water jug (a Spanish "botijo" with a handle and a little spout), with drops of fresh water on it, and a small clay cup next to it, seen slightly from above, with a small soft contact shadow. Paint only the jug and the cup.`
        },

        // ---------------- Pág. 6 · Cap. 28: o Lago de Cristal (contagem: concha, pérolas, peixinhos) ----------------
        {
            id: 'p6-real', destino: `${P4}/p6-real.png`,
            refs: [`${P4}/p5-real.webp`, `${P2}/camadas/p6-balao-historia.webp`],
            prompt: `The same meadow, oak tree and stream as the first reference image, in the afternoon (the tablecloth is folded away).
COMPOSITION (important):
- In the LEFT half, under the oak, [QUIXOTE] (without the basin) sits on a root, telling a story with one hand raised toward the sky, eyes shining. [SANCHO], [PADRE] and [BARBEIRO] sit around him on the grass, leaning against the trunk, listening open-mouthed.
- In the RIGHT half (from about 50% to 97% of the width, from about 5% to 80% of the height), a big soft cloud-shaped STORY BALLOON painted in pale watercolour (like the second reference image), with a small trail of round bubbles going down toward Don Quixote. Inside the balloon: the bottom of a crystal-clear blue lake, with a shining palace of crystal and gold in the background and a little glowing golden starfish above it; the lower part of the balloon is a flat floor of WHITE SAND that stays EMPTY (no shells, no pearls, no fish: the book adds them).
Dreamy and enchanting.`
        },
        {
            id: 'p6-concha', destino: `${P4}/camadas/p6-concha.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P2}/camadas/p6-balao-historia.webp`],
            prompt: `ONE golden scallop seashell, gleaming like gold, with a few tiny sparkles around it. Paint only the shell and the sparkles.`
        },
        {
            id: 'p6-perolas', destino: `${P4}/camadas/p6-perolas.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P2}/camadas/p6-balao-historia.webp`],
            prompt: `TWO round shining pearls side by side, creamy ivory white with soft golden and light blue highlights, each with a tiny white sparkle. Exactly two pearls. Paint only the two pearls and their sparkles.`
        },
        {
            id: 'p6-peixinhos', destino: `${P4}/camadas/p6-peixinhos.png`, camada: true,
            proporcao: '4:3', tamanho: '512', refs: [`${P2}/camadas/p6-balao-historia.webp`],
            prompt: `THREE cute little silver fish with shimmering silver-blue scales and friendly eyes, swimming together in a small happy group toward the RIGHT, with a few tiny air bubbles. Exactly three fish. Paint only the three fish and the bubbles.`
        },

        // ---------------- Pág. 7 · Cap. 29: a cabra fujona ----------------
        {
            id: 'p7-real', destino: `${P4}/p7-real.png`,
            refs: [`${P2}/p3-real.webp`, `${P3}/p7-real.webp`],
            prompt: `The same green meadow by an old oak tree, with a rocky slope in the background, afternoon light. A red-and-white checkered tablecloth lies a little messed up on the grass.
COMPOSITION (important):
- In the CENTRE-RIGHT (from about 50% to 75% of the width), [QUIXOTE] (in his armour, the brass basin a little crooked on his head) kneels on one knee and gently holds out a piece of bread crust; [MANCHADINHA] (from about 38% to 52% of the width) sniffs his fingers and rubs her muzzle on his armour, calm and cuddly.
- On the LEFT (from about 10% to 32% of the width), [EUGENIO] has just sat down on the grass, out of breath, his tongue out, his crook in his hand, laughing.
- On the far RIGHT, [SANCHO] and [BARBEIRO] sit on the grass where they fell, one against the other, roaring with laughter.
Funny, tender and lively.`
        },

        // ---------------- Pág. 8 · Cap. 30: a romaria ----------------
        {
            id: 'p8-real', destino: `${P4}/p8-real.png`,
            refs: [`${P2}/p8-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A dry country road in La Mancha under a hot afternoon sun: the fields are dry and cracked, dusty, a few thirsty olive trees, a windmill far away.
COMPOSITION (important):
- In the LEFT half (from about 5% to 50% of the width), a humble procession of farming families walks toward the right: four men carry on their shoulders a small wooden litter decorated with wildflowers, on which stands a small figure completely covered by a plain blue cloak (nothing of it is visible). Around them, a woman plays a tambourine, a boy plays a little flute, children carry flowers; sunburnt, calm, kind faces.
- In the RIGHT half (from about 58% to 85% of the width), [QUIXOTE] stands beside [ROCINANTE], his lance lowered to the ground, holding the brass basin against his chest, his head bowed with deep respect.
- Between them, an old farmer with a kind smile offers Don Quixote a clay cup of water and a little bunch of wildflowers.
- Next to Don Quixote, [SANCHO] smiles, relieved, one hand on Rocinante's neck.
Warm, respectful, gentle; no weapons raised.`
        },

        // ---------------- Pág. 10 · Cap. 32: sonhos à janela ----------------
        {
            id: 'p10-real', destino: `${P4}/p10-real.png`,
            refs: [`${P1}/p1-real.webp`, `${P3}/camadas/p2-quixote-camisolao.webp`],
            prompt: `Don Quixote's bedroom in his house (same style of house as the first reference), at night, cosy and tidy, lit by moonlight and a small candle.
COMPOSITION (important):
- From about 25% to 70% of the width, a simple wooden bed with a patchwork quilt; in it, [QUIXOTE_CAMISOLAO] lies on his back under the quilt, his head on a big white pillow, eyes closed, a little peaceful smile.
- At the foot of the bed, on the LEFT end of the quilt, [GATO] sleeps curled up like a ball.
- On the RIGHT (from about 72% to 95% of the width), an open window: a big full moon in a starry sky, and the hills of La Mancha with old windmills asleep in the moonlight.
- On a little bedside table, a bowl of soup and a candle; his old armour rests on a chair against the wall.
Peaceful, warm, poetic.`
        },

        // =============== Rodada 2: Imaginações (edição da Realidade aceita) ===============
        {
            id: 'p0-imag', destino: `${P4}/p0-imag.png`, imaginacao: true,
            refs: [`${P4}/p0-real.webp`, `${P1}/p7-imag.webp`, `${P3}/p5-imag.webp`],
            prompt: `The inn becomes an imperial fairytale CASTLE on a festival day of victory: marble walls and golden towers with banners, garlands and flower petals in the air, a fountain instead of the well. The ox cart and its wooden cage become a carriage of mother-of-pearl and crystal pulled by two white bulls with golden horns and flower garlands. The priest and the barber become two kind enchanters in starry midnight-blue cloaks; Dorothea becomes Princess Micomicona in a turquoise and gold gown with a little tiara (like the third reference image), waving goodbye at the door, in the same place as Dorothea. The princess appears only ONCE (nobody on the balcony). The carriage must clearly look magical: shimmering mother-of-pearl, crystal panels and golden wheels, no wooden slats.`
        },
        {
            id: 'p1-imag', destino: `${P4}/p1-imag.png`, imaginacao: true,
            refs: [`${P4}/p1-real.webp`, `${P3}/p5-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The inn courtyard becomes the golden throne hall of the kingdom of Micomicon: tall columns, red carpet, banners, sunbeams through high windows, rose petals in the air. Dorothea becomes Princess Micomicona (turquoise and gold gown, a little tiara, like the second reference image) curtsying in the same place and offering the knight a crown of green laurel leaves. The golden knight stands in the same place, hand on his chest. The priest and the barber become smiling courtiers in velvet; Sancho the squire whispers to the priest in the same pose.`
        },
        {
            id: 'p2-imag', destino: `${P4}/p2-imag.png`, imaginacao: true,
            refs: [`${P4}/p2-real.webp`, `${P2}/p8-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The brass basin becomes the legendary golden HELMET OF MAMBRINO (like the second reference image), radiating rays of magic light, held firmly in the same place by the hands that hold the basin in the reality version (it does not float). The barber of the basin becomes a comical little rival knight in a silver-grey cape and a feathered hat. The inn gate becomes the gate of a castle; the laughing travellers become courtiers and ladies in festive clothes; Sancho the squire jumps between them in the same pose. Golden sparkles everywhere.`
        },
        {
            id: 'p3-imag', destino: `${P4}/p3-imag.png`, imaginacao: true,
            refs: [`${P4}/p3-real.webp`, `${V1}/p1-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The inn yard becomes an enchanted moonlit courtyard under a sky full of stars and comets. The wooden cage becomes a magic CARRIAGE of mother-of-pearl and crystal with golden bars and little gems; the golden knight sits inside like a king, amazed and smiling. The two men in sheets become two majestic CELESTIAL WIZARDS in long sky-blue cloaks embroidered with silver stars and tall starry hats, with long white beards and kind faces: one holds a staff with a glowing star, the other reads a glowing scroll of prophecy (only golden swirls, no letters). The oxen become white bulls with golden horns and flower garlands (like the second reference image). Sancho the squire watches from his festive donkey in the same place, still a little suspicious. The white steed is tied behind the carriage with ribbons. Magical, gentle, never scary.`
        },
        {
            id: 'p4-imag', destino: `${P4}/p4-imag.png`, imaginacao: true,
            refs: [`${P4}/p4-real.webp`, `${V1}/p1-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `Don Quixote still believes he is enchanted: the wooden cage becomes the enchanted CRYSTAL CARRIAGE of the second reference image, glittering with light, pulled by the two white bulls with golden horns and flower garlands. Inside, the golden knight sits serenely. The wheat fields become a meadow of golden flowers with sparkles. The priest and the barber walking behind become two enchanters in starry cloaks with their starry masks pushed up on their heads. Sancho the squire, on his festive donkey in the same place, whispers to his master like a wise little counsellor, a small golden sparkle of wisdom above his raised finger.`
        },
        {
            id: 'p5-imag', destino: `${P4}/p5-imag.png`, imaginacao: true,
            refs: [`${P4}/p5-real.webp`, `${P3}/p7-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The picnic becomes a royal BANQUET of noble knights: the checkered cloth becomes a silk tablecloth embroidered with gold, covered with golden plates, a big golden loaf, a wheel of cheese, a crystal pitcher of sparkling water and baskets of fruit. The oak becomes a magnificent tree with golden fruits and little lanterns; the stream becomes a shimmering silver river. The priest and the barber become noble lords in velvet. The golden knight sits cross-legged in the same place, his golden helmet with the red plume resting on the grass next to him (his face uncovered). The white steed and the festive donkey graze by the river.`
        },
        {
            id: 'p7-imag', destino: `${P4}/p7-imag.png`, imaginacao: true,
            refs: [`${P4}/p7-real.webp`, `${P2}/p3-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The meadow becomes an enchanted FAIRY WOOD with giant flowers, glowing mushrooms and fireflies. The young goatherd becomes the GUARDIAN OF THE WOODS: a young shepherd of the Golden Age with a crown of leaves and flowers, a green tunic and a crook that sprouts leaves and little blossoms, laughing in the same place and pose. The spotted goat becomes a little magical creature: a snow-white goat with silver spots that sparkle like stars, small golden horns and a garland of flowers, in the same place and pose, nuzzling the knight's hand. The golden knight kneels in the same pose. Sancho the squire and the barber (now a jolly minstrel in colourful clothes) laugh on the grass in the same place.`
        },
        {
            id: 'p8-imag', destino: `${P4}/p8-imag.png`, imaginacao: true,
            refs: [`${P4}/p8-real.webp`, `${P2}/p3-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The dry fields become a land waiting for spring, with soft golden light and the first green shoots sparkling in the cracks. The procession of farmers becomes a solemn and joyful procession of the GUARDIANS OF THE EARTH: farmers in tunics of green, ochre and wheat-gold with crowns of wheat ears and flowers, carrying the litter in the same place; the litter becomes a little altar covered with luminous flowers, glowing softly, with the plain blue cloak now embroidered with silver stars (still nothing visible under it). The tambourine and flute ribbons float in the air with little golden musical notes. On the right, the golden knight bows his head with respect beside the white steed, in the same place and pose, holding his golden helmet against his chest; the old farmer offers him a crystal cup of water and a bouquet of glowing flowers. Sancho the squire stands in the same place.`
        },
        {
            id: 'p10-imag', destino: `${P4}/p10-imag.png`, imaginacao: true,
            refs: [`${P4}/p10-real.webp`, `${P1}/p7-imag.webp`, `${REF}/leao-guardiao.png`],
            prompt: `EXCEPTION for this page: this is Don Quixote's DREAM. The sleeper in the bed stays exactly as he is (the old man in his white nightshirt, eyes closed, smiling, in the same place), NOT the golden knight. The walls and ceiling of the room dissolve into a deep blue night sky full of constellations, comets and stardust. Above the bed, as a glowing dream vision, the golden knight rides his white steed galloping among the stars, his crimson cape flying, with Sancho the squire on his festive donkey following him. At the foot of the bed, in the same place, the little cat has become the gentle GUARDIAN LION with a golden crown (like the third reference image), lying down peacefully, watching over the sleeper. Through the window on the right, the full moon smiles and the windmills shine softly. Tender, magical, never scary.`
        },
        {
            id: 'p6-imag', destino: `${P4}/p6-imag.png`, imaginacao: true,
            refs: [`${P4}/p6-real.webp`, `${P1}/p7-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `EXCEPTION for this page: this is the story Don Quixote is telling, and the WHOLE page becomes the inside of the story balloon. At the bottom of a crystal-clear turquoise lake, on white sand, the golden knight stands where Don Quixote sits in the reality version, looking with wonder at a magnificent PALACE OF CRYSTAL AND GOLD rising on the right side of the picture, lit by a little glowing golden starfish shining above its tallest tower. Around him: a golden scallop shell on the sand, pearls glowing softly, and a happy school of little silver fish swimming by; seaweed, corals, sunbeams coming down through the water, a few bubbles. The other listeners are NOT in this picture. Luminous, peaceful, wondrous; never dark or scary.`
        }
    ]
};
