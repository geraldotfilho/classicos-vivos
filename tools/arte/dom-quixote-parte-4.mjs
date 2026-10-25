// Pedidos de arte da NOVA Parte 4 de Dom Quixote (rascunho, caps. 23 a 32) para tools/gerar-imagens.mjs
// (Nano Banana 2 pela API, Batch). Fonte: docs/cadernos/dom-quixote-parte-4.md §4 e o texto de
// dom-quixote/parte-4-rascunho.html. A lista da Parte 4 antiga ficou em dom-quixote-parte-4-v1.mjs.
// Rodadas: (1) Realidades + camadas soltas; (2) Imaginações (edição da Realidade aceita) e a p6-real
// (que usa a p5-real como cenário); (3) a p6-imag e o que falhar.
// Revisão da fase 5 (2026-10-25, notas do humano): o cap. 30 virou dois (págs. 8 e 9), a estrutura passou a
// 12 páginas (caps. 23 a 33) e a noite foi para a pág. 11 (p11-*). As págs. 6, 7 e 9 não têm Imaginação.
// Continuidade das fantasias e dos cavalos: recortes da arte aprovada em biblioteca/referencias/personagens/
// (magos-de-mentira-*, magos-celestes-*), passados como referência e citados no prompt (ARTE-PELA-API §4.3).
import { P1, P2, REF, estilo, estiloCamada, imaginacao, personagens } from './dom-quixote-comum.mjs';

const P3 = 'dom-quixote/imagens/parte-3';
const P4 = 'dom-quixote/imagens/parte-4';
const V1 = 'dom-quixote/imagens/acervo/parte-4-v1';
const PERS = 'dom-quixote/biblioteca/referencias/personagens';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo, estiloCamada, imaginacao,
    personagens: {
        ...personagens,
        BARBEIRO_BACIA: "the barber of the basin (from the rain episode of the second reference): a small, wiry village barber with a brown felt hat, a short grey travelling cape over a brown doublet and a long nose, comically indignant but harmless",
        EUGENIO: "Eugenio, a young goatherd of about twenty with curly brown hair, a sheepskin vest over a cream shirt, brown breeches and a wooden shepherd's crook",
        MANCHADINHA: "Manchadinha, a small, lively nanny goat with a white coat covered in big black patches, little curved horns and a tiny beard",
        GATO: "the little orange tabby cat of Don Quixote's house (as in the reference)",
        CAVALO_PADRE: "the priest's own horse: a plump, calm dapple-grey horse with a dark grey mane",
        CAVALO_NICOLAU: "the barber's own horse: a black horse with a white blaze on its face and white socks"
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
        // ---------------- Pág. 4 · Cap. 26: encantado sente fome? (refeita na revisão da fase 5) ----------------
        // 1ª versão: os "magos" saíram sem a fantasia da pág. 3 e mestre Nicolau montado em Rocinante.
        {
            id: 'p4-real', destino: `${P4}/p4-real.png`,
            refs: [`${P4}/p4-real.webp`, `${PERS}/magos-de-mentira-padre-e-nicolau.png`, `${P4}/p3-real.webp`],
            prompt: `Repaint the FIRST reference image (an earlier version of this very page): keep the same country road through golden wheat fields at midday, the same camera, the two white oxen pulling the wooden ox cart from left to right, the cage of wooden slats with [QUIXOTE] (without his helmet) sitting calmly inside, one thin hand on his belly, and [SANCHO] on [BURRICO] right next to the bars, whispering to his master with one finger raised. Keep all of them exactly.
CHANGE ONLY THE RIGHT PART OF THE PICTURE (from about 62% to 100% of the width):
- [ROCINANTE] walks tied by a rope to the back of the cart, with an EMPTY saddle: NOBODY rides Rocinante.
- Behind him, side by side, the two pretend wizards ride their OWN horses: [PADRE] on [CAVALO_PADRE] and [BARBEIRO] on [CAVALO_NICOLAU]. The two horses must look clearly different from Rocinante (a grey one and a black one).
- The two riders wear EXACTLY the same costumes as in the SECOND reference image (copy them): an old white bed sheet hanging from the shoulders like a long robe, a wide-brimmed brown cardboard wizard hat painted with big yellow stars and a crescent moon, and the painted curly cardboard moustache; the priest keeps his small round spectacles. Same faces as in the second and third reference images. They try not to laugh.
IMPORTANT: NO white pointed hoods, NO hoods covering the head, NO masks pushed up on the head: the sheets hang from the shoulders and the heads wear the cardboard star hats.
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

        // ---------------- Pág. 6 · Cap. 28: o Cavaleiro do Lago (página calma: a contagem dos tesouros saiu na fase 5) ----------------
        // Refeito na revisão da fase 5: a história é a de Cervantes (I-50), e a imaginação fica só no balão.
        {
            id: 'p6-real', destino: `${P4}/p6-real.png`,
            refs: [`${P4}/p6-real.webp`, `${P1}/p7-imag.webp`],
            prompt: `Repaint the FIRST reference image (an earlier version of this very page): keep EVERYTHING outside the big story balloon exactly as it is (the meadow, the oak tree, the stream, [QUIXOTE] telling the story with one hand raised, [SANCHO], [PADRE] and [BARBEIRO] listening, the same places and poses), and keep the balloon's shape, place and size and its trail of little round bubbles going down toward Don Quixote.
REPAINT ONLY THE INSIDE OF THE STORY BALLOON: the tale of the Knight of the Lake from the old books of chivalry, after he has jumped into the enchanted lake. Inside the balloon:
- a sunny field full of colourful flowers under a clear blue sky, with little birds flying;
- on the right side of the balloon, a fairytale CASTLE with walls of gleaming gold and towers and battlements of sparkling diamonds, its gate wide open; three smiling FAIRIES (long pastel dresses, little translucent wings, crowns of flowers) come out of the gate to welcome the knight with flowers;
- on the left side of the balloon, a young KNIGHT in shining silver armour with a blue plume walks toward the castle, amazed, a few water drops still glittering on him;
- the LOWER THIRD of the balloon is a crystal-clear brook running across the whole balloon over a bed of GOLDEN SAND. (The shells, pearls and fish of the old counting activity are gone: the sand may have little white pebbles.)
Dreamy, luminous and enchanting, never dark or scary.`
        },

        // ---------------- Pág. 7 · Cap. 29: a cabra fujona ----------------
        // ---------------- Pág. 7 · Cap. 29: a cabra fujona ----------------
        // Revisão da fase 5: a 1ª versão (a 1ª referência) esqueceu o padre; esta edição só o acrescenta.
        {
            id: 'p7-real', destino: `${P4}/p7-real.png`,
            refs: [`${P4}/p7-real.webp`, `${P4}/p6-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same meadow, oak tree, rocky slope, goats in the background, checkered tablecloth, the young goatherd laughing on the LEFT, Don Quixote kneeling and giving bread to the spotted goat in the CENTRE, Sancho and the barber laughing on the grass on the far RIGHT, same places, poses, colours and line work).
ADD ONLY ONE CHARACTER: [PADRE] (exactly as in the second reference image: black cassock, small round spectacles, round kind face) standing by the oak trunk on the RIGHT, just behind Sancho and the barber, laughing with one hand on his belly. Do not change or add anything else.`
        },

        // ---------------- Pág. 8 · Cap. 30: a romaria ----------------
        // ---------------- Pág. 8 · Cap. 30: a romaria lá longe (o que Dom Quixote vê) ----------------
        {
            id: 'p8-real', destino: `${P4}/p8-real.png`,
            refs: [`${P4}/p9-real.webp`, `${P4}/p6-real.webp`, `${P2}/p8-real.webp`],
            prompt: `A wide view of a dry country landscape of La Mancha under a hot afternoon sun: cracked dry fields, thirsty olive trees, a windmill on a far hill, a long dusty road winding into the distance.
COMPOSITION (important):
- In the LEFT FOREGROUND (from about 5% to 40% of the width, big and close), [QUIXOTE] rides [ROCINANTE], seen from three-quarter back so that we look where he looks: he leans forward in the saddle, eyes wide with excitement, pointing his long wooden lance toward the far road. Rocinante, startled, lifts a front leg.
- Next to them, [SANCHO] on [BURRICO] scratches his head, puzzled.
- Behind them, small: [PADRE] on [CAVALO_PADRE] and [BARBEIRO] on [CAVALO_NICOLAU] (in their ordinary clothes, as in the second reference image), next to the slow ox cart with the empty wooden cage loaded with travel bags.
- FAR AWAY in the RIGHT half (from about 55% to 95% of the width, in the upper middle of the picture, SMALL), on the dusty road, a procession of farming families walking slowly (the same people as in the first reference image): four tiny men carry on their shoulders a wooden litter decorated with flowers, and on it stands a small figure wrapped in a BLUE MANTLE, like a lady; tiny people with a tambourine and coloured ribbons follow. It must clearly be far away and small.
Bright, comic and adventurous.`
        },

        // ---------------- Pág. 9 · Cap. 31: os vizinhos da estrada (a 1ª referência é a antiga pág. 8) ----------------
        {
            id: 'p9-real', destino: `${P4}/p9-real.png`,
            refs: [`${P4}/p9-real.webp`, `${P4}/p6-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same dry country road, the procession of farming families with the tambourine, the flute and the flowers on the LEFT, the old farmer offering a clay cup and wild flowers in the CENTRE, Don Quixote with bowed head holding the brass basin beside Rocinante and Sancho on the RIGHT; same places, poses, colours and line work). Only TWO changes:
1. The figure on the flowered litter must be a STATUE OF A SAINT, the Virgin Mary as in old Spanish village churches: a carved and painted wooden statue with a gentle, serene painted FACE clearly visible (rosy cheeks, kind eyes looking down), a small golden crown and a thin golden halo, a blue mantle with little golden stars over her head and shoulders, a white and pink dress, her hands joined in prayer. NOT a faceless hooded figure, NOT a mannequin, nothing covering her face.
2. In the BACKGROUND, under the far windmill, small: [PADRE] and [BARBEIRO] (as in the second reference image) arrive on their horses, smiling.
Warm, respectful, gentle.`
        },

        // ---------------- Pág. 10 · Cap. 32: de volta para casa (Teresa e Sanchica abraçam o burrico) ----------------
        {
            id: 'p10-real', destino: `${P4}/p10-real.png`,
            refs: [`${V1}/p2-real.webp`, `${P4}/p6-real.webp`],
            prompt: `The same sunny village square as the FIRST reference image (whitewashed houses with red tile roofs, a stone fountain, neighbours smiling at the windows), with the same characters' designs.
COMPOSITION (important):
- On the LEFT (from about 12% to 42% of the width), [QUIXOTE] (in his armour, without the basin) is hugged by [SOBRINHA] and [GOVERNANTA], both crying with joy, exactly as in the first reference image.
- On the RIGHT (from about 58% to 95% of the width): [TERESA] (colourful headscarf) and [SANCHICA] (two braids) both hug the neck of [BURRICO] with their eyes closed, full of love. Right next to them, [SANCHO] stands with his arms wide open for a hug that nobody gives him, with a comically puzzled, disappointed face.
- In the BACKGROUND, small: the ox cart with the empty wooden cage loaded with bags, [ROCINANTE], and [PADRE] and [BARBEIRO] standing next to their horses (a grey one and a black one), laughing.
Joyful, warm and funny.`
        },

        // ---------------- Pág. 11 · Cap. 33: sonhos à janela ----------------
        {
            id: 'p11-real', destino: `${P4}/p11-real.png`,
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
            refs: [`${P4}/p4-real.webp`, `${PERS}/magos-celestes-padre-e-nicolau.png`, `${V1}/p1-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `Don Quixote still believes he is enchanted: the wooden cage becomes the enchanted CRYSTAL CARRIAGE of the third reference image, glittering with light, pulled by the two white bulls with golden horns and flower garlands. Inside, the golden knight sits serenely. The wheat fields become a meadow of golden flowers with sparkles. Sancho the squire, on his festive donkey in the same place, whispers to his master like a wise little counsellor, a small golden sparkle of wisdom above his raised finger.
The two riders on the right become the two CELESTIAL WIZARDS EXACTLY as in the SECOND reference image (copy them: long sky-blue cloaks embroidered with silver stars and moons, tall pointed starry wizard hats, long white beards, kind faces), each riding his OWN horse in the same place and pose: the grey horse becomes a silver horse with a starry blue blanket, the black horse becomes a midnight-black horse with a starry blanket. The skinny horse tied behind the cart becomes the white steed, tied with ribbons and with an empty saddle.`
        },
        {
            id: 'p5-imag', destino: `${P4}/p5-imag.png`, imaginacao: true,
            refs: [`${P4}/p5-real.webp`, `${P3}/p7-imag.webp`, `${P1}/p7-imag.webp`],
            prompt: `The picnic becomes a royal BANQUET of noble knights: the checkered cloth becomes a silk tablecloth embroidered with gold, covered with golden plates, a big golden loaf, a wheel of cheese, a crystal pitcher of sparkling water and baskets of fruit. The oak becomes a magnificent tree with golden fruits and little lanterns; the stream becomes a shimmering silver river. The priest and the barber become noble lords in velvet. The golden knight sits cross-legged in the same place, his golden helmet with the red plume resting on the grass next to him (his face uncovered). The white steed and the festive donkey graze by the river.`
        },
        {
            id: 'p8-imag', destino: `${P4}/p8-imag.png`, imaginacao: true,
            refs: [`${P4}/p8-real.webp`, `${P1}/p7-imag.webp`, `${P4}/p0-imag.webp`],
            // 1ª tentativa: o Sancho saiu duas vezes e a romaria veio para perto; refeita com as regras abaixo
            prompt: `KEEP THE COMPOSITION OF THE FIRST REFERENCE IMAGE EXACTLY: the knight and his horse big in the left foreground, Sancho ONCE (only one Sancho in the whole picture) on his donkey just right of the horse, the priest and the barber on their two horses and the cart in the middle distance, and the procession FAR AWAY on the road on the right, as SMALL as in the reality version (the figures no taller than one tenth of the picture height).
This is what Don Quixote believes he sees. The dry landscape becomes a dramatic fairytale valley under a violet and golden sky, with a castle on the far hill instead of the windmill. The golden knight on the white steed charges heroically in the same place and pose, pointing his golden lance toward the far road; Sancho the squire on his festive donkey scratches his head in the same place.
FAR AWAY on the road, in the same place and as small as in the reality version, the procession becomes a band of comic storybook VILLAINS in dark purple capes and big floppy black hats with feathers, with twirled moustaches, looking more silly than scary (NO hoods, NO masks, NO weapons), carrying away on a dark wooden palanquin a captive PRINCESS in a blue mantle with a little golden crown, who reaches out her hand for help.
The priest and the barber behind become two courtiers in velvet on their festive horses; the ox cart becomes the crystal carriage.`
        },
        {
            id: 'p11-imag', destino: `${P4}/p11-imag.png`, imaginacao: true,
            refs: [`${P4}/p11-real.webp`, `${P1}/p7-imag.webp`, `${REF}/leao-guardiao.png`],
            prompt: `EXCEPTION for this page: this is Don Quixote's DREAM. The sleeper in the bed stays exactly as he is (the old man in his white nightshirt, eyes closed, smiling, in the same place), NOT the golden knight. The walls and ceiling of the room dissolve into a deep blue night sky full of constellations, comets and stardust. Above the bed, as a glowing dream vision, the golden knight rides his white steed galloping among the stars, his crimson cape flying, with Sancho the squire on his festive donkey following him. At the foot of the bed, in the same place, the little cat has become the gentle GUARDIAN LION with a golden crown (like the third reference image), lying down peacefully, watching over the sleeper. Through the window on the right, the full moon smiles and the windmills shine softly. Tender, magical, never scary.`
        },
        {
            id: 'p10-imag', destino: `${P4}/p10-imag.png`, imaginacao: true,
            // 1ª tentativa (com a imaginação da v1 como referência): copiou a composição antiga e perdeu a piada do burrico
            refs: [`${P4}/p10-real.webp`, `${P1}/p7-imag.webp`],
            prompt: `KEEP THE COMPOSITION OF THE FIRST REFERENCE IMAGE EXACTLY, especially the joke on the right: Teresa and Sanchica hug the DONKEY (NOT Sancho), and Sancho stands ALONE next to them with his arms wide open for a hug nobody gives him, with a comically puzzled face.
The village square becomes a TRIUMPHAL RECEPTION for great heroes: arches of flowers, carpets of petals on the ground, banners and garlands between the houses, golden confetti in the air, the fountain sparkling. The golden knight is hugged by his niece and the housekeeper (now in festive dresses with flower crowns) in the same place and pose. On the right, Teresa and Sanchica (in festive dresses) hug the neck of the donkey, which wears a magnificent red-and-gold festive blanket with tassels and a garland of flowers, in the same place and pose; Sancho the squire stands next to them with his arms wide open, in the same comically puzzled pose. The cart in the background becomes the crystal carriage; the priest and the barber become smiling courtiers in velvet.`
        }
    ]
};
