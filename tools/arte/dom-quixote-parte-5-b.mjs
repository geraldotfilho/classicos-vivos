// Pedidos de arte da Parte 5 de Dom Quixote, GRUPO B: págs. 2, 5, 6 e 7 (Sansão, o bosque, o duelo, o requeijão)
// + camadas p6-elmo e p6-narigao. Método: docs/ARTE-PELA-API.md (§4.3: recorte e "copie").
// Rodadas: (1) p2-real, p5-real; (2) p6-real e p7-real (com recortes de Sansão e Tomé), p2-imag, p5-imag; (3) p6-imag, camadas, refeitas.
import { P1, P2, REF, P3, P4, P5, estilo, estiloCamada, imaginacao, personagens, modelo } from './dom-quixote-parte-5-comum.mjs';

export default {
    modelo, estilo, estiloCamada, imaginacao,
    personagens: {
        ...personagens,
        LIVRO_ABERTO: "a big old open book with two pages of cream paper, with ONLY tiny abstract squiggles and little drawings and absolutely NO letters, NO words, NO readable text"
    },

    pedidos: [
        // ---------------- Pág. 2 · Cap. 35: o livro ----------------
        {
            id: 'p2-real', destino: `${P5}/p2-real.png`,
            refs: [`${P2}/p3-real.webp`, `${REF}/alonso-quixano-sem-armadura.png`],
            prompt: `Don Quixote's bedroom in the morning, simple and cosy (a wooden bed with a patchwork quilt, a small window with sunlight, a little night table). Camera at the foot of the bed.
- In the CENTRE (from about 30% to 60% of the width), [QUIXOTE_CASA] sits up in bed with a blanket over his legs, his mouth open in wonder, looking down at [LIVRO_ABERTO] lying open on his lap.
- On the LEFT of the bed (from about 8% to 32% of the width), [SANSAO] stands next to the bed leaning over, one hand holding the open book on the old man's lap and the other index finger pointing at a page, grinning cheekily.
- On the RIGHT of the bed (from about 62% to 90% of the width), [SANCHO] leans over the other side with his nose almost touching the page, squinting hard at the squiggles.
- A single slipper peeks out from under the bed.
Only these three people are in the picture (no priest, no barber, no animals). Warm, funny and tender.`
        },

        // ---------------- Pág. 5 · Cap. 38: o escudeiro narigudo ----------------
        {
            id: 'p5-real', destino: `${P5}/p5-real.png`,
            refs: [`${P4}/p5-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A forest clearing at dawn: tall trees, soft pink-gold morning light, mist on the grass.
- In the CENTRE-LEFT foreground (from about 15% to 40% of the width), [SANCHO] hugs the trunk of a big tree and clumsily tries to climb it, one foot on a low branch, looking back over his shoulder with wide frightened eyes.
- In the CENTRE-RIGHT foreground (from about 50% to 75% of the width), [TOME] stands holding half of a big pie, smiling kindly and puzzled, with [NARIGAO] tied around his head by a string (the fake nose is clearly visible in profile, purple with warts). He looks harmless and friendly.
- In the BACKGROUND, small (each no taller than a quarter of the picture height): on the far LEFT [QUIXOTE] stands next to [ROCINANTE], the brass basin on his head and his wooden lance in his hand; on the far RIGHT a young knight in [ESPELHOS] with a CLOSED helmet that hides the whole face, next to his own horse (a chestnut horse with a white blaze).
No donkey. Funny and gentle, not scary.`
        },

        // ---------------- Pág. 6 · Cap. 39: arte-base sem disfarce ----------------
        {
            id: 'p6-real', destino: `${P5}/p6-real.png`,
            refs: [`${P5}/p5-real.webp`, `${REF}/sansao-carrasco.png`, `${REF}/tome-cecial.png`],
            prompt: `The same forest clearing as in the FIRST reference image (same trees, same camera), now in bright morning light.
COMPOSITION (important: the book adds a helmet and a fake nose as separate layers, so the two faces must be CLEAN and fully visible, seen from the front or three-quarters, large and clear):
- In the LEFT-CENTRE (from about 25% to 48% of the width), [SANSAO] sits on the grass dazed and embarrassed, dressed in [ESPELHOS] but with his HEAD COMPLETELY BARE: his round moon face with the flat snub nose and short curly chestnut hair fully visible. NO helmet on his head and NO helmet anywhere in the picture. Copy his FACE and curly hair EXACTLY from the SECOND reference image (but NOT his black gown: he wears the mirror armour).
- In the RIGHT-CENTRE (from about 58% to 80% of the width), [TOME] stands anxiously with his hands clasped, with his NORMAL nose, NO fake nose, NO string around his head. Copy his face, blond stubble beard and ears EXACTLY from the THIRD reference image, BUT WITHOUT the purple fake nose (in the THIRD reference image he wears a fake nose: remove it, give him an ordinary medium-sized human nose); he also wears the brown felt cap and patched tunic of his description, hands empty, no pie.
- Next to Sansão, [QUIXOTE] with the brass basin on his head stands over him with his wooden lance, a kind concerned look; a little behind, [ROCINANTE] munches grass.
- On the far LEFT, [SANCHO] climbs down from the big tree, one foot on the ground, looking suspiciously at the two men.
- A chestnut horse with a white blaze eats grass at the back.
Funny, warm, bright.`
        },

        // Refeita (2ª tentativa): a 1ª veio com armadura de prata LISA (sem espelhinhos) e a bacia de Dom Quixote parecia um chapéu
        {
            id: 'p6-real-v2', destino: `${P5}/p6-real.png`,
            refs: [`.cache-arte/dom-quixote-parte-5-b/p6-real-v1.png`, `${P5}/p5-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same camera, trees, poses, faces, horses, positions), with ONLY TWO changes:
1. The seated knight's armour (and his shoulders, arms, chest, legs) must be COMPLETELY COVERED with dozens of small round shiny mirrors that sparkle like little moons, exactly like the armour of the knight in the SECOND reference image (copy it); his head stays COMPLETELY BARE with the same round face and curly hair, and there is no helmet anywhere.
2. The brass barber's basin on standing Don Quixote's head must look like a very shiny, rounded golden-brass BASIN with a little rim and a flat dent, not like a hat (copy the shiny brass basin look: a bright polished brass bowl worn upside down).
Do not change anything else; Tomé keeps his ordinary nose, no fake nose.`
        },

        // ---------------- Pág. 7 · Cap. 40: o requeijão ----------------
        {
            id: 'p7-real', destino: `${P5}/p7-real.png`,
            refs: [`${P4}/p4-real.webp`, `${P2}/p3-real.webp`],
            prompt: `A sunny country road between golden wheat fields in the afternoon, seen from the side, with a farm hill in the distance.
- In the CENTRE (from about 30% to 52% of the width), [QUIXOTE] on foot, tall and thin, holds the brass basin in one hand, pulled off his head, white cottage-cheese (requeijão) dripping in long creamy streams down his forehead, his ears and his white beard; he sniffs it with a puzzled grimace.
- On the LEFT (from about 8% to 28% of the width), [SANCHO] stands very straight with his hands behind his back, looking up at the clouds with an innocent whistling face, his cheeks bright red.
- On the RIGHT (from about 58% to 85% of the width), [DIEGO] sits on his dapple-grey mare, pressing his lips and holding his hand to his mouth to hold back a laugh, amused and kind. He wears a dark green coat and a green cap with a feather.
- Far away on the road in the BACKGROUND (tiny, no taller than one tenth of the picture height), an ox cart with colourful royal flags.
Rocinante and the donkey graze at the roadside, small. Funny and warm.`
        },

        // =============== Rodada 2: Imaginações ===============
        {
            id: 'p2-imag', destino: `${P5}/p2-imag.png`, imaginacao: true,
            refs: [`${P5}/p2-real.webp`, `${P1}/p7-imag.webp`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `The open book on the old man's lap becomes a MAGIC BOOK: golden light pours out of its pages and out of it come rising, small and friendly, a gentle giant made of grey stone and green moss with a kind bearded face and kind ordinary eyes (no glowing eyes), little armies of fluffy white sheep marching in tiny formation with golden banners, and a shining golden helmet floating above the page, with sparkles and swirls of golden light (only swirls, absolutely no letters or words). The bedroom becomes a fairytale chamber of violet and gold with a canopy bed like a throne. Don Quixote in the middle becomes the GOLDEN KNIGHT in golden armour sitting up on the throne-bed, amazed, in the same place and pose (his helmet with the open visor, his crimson cape over the blanket). Sansón becomes a cheerful young royal scholar in a midnight-blue starry gown (same round face, same place). Sancho becomes the proud squire in a sky-blue tunic, nose still almost touching the glowing page, in the same place. Magical, joyful, never scary.`
        },
        {
            id: 'p5-imag', destino: `${P5}/p5-imag.png`, imaginacao: true,
            refs: [`${P5}/p5-real.webp`, `${P2}/p3-imag.webp`],
            prompt: `EXCEPTION for this page: this is SANCHO's imagination, fed by his fear, and it is FUNNY, not scary. Keep Sancho in the same place and pose (clinging to the tree trunk), still recognisable in his brown cap and brown vest, his eyes huge. The squire's fake nose becomes a GIGANTIC nose as big as a tree trunk, still purple with warts, sticking out far in front of him so that he has to lean back; the squire himself becomes a big round good-natured OGRE with a friendly grin, still holding his half pie and wearing the brown cap, clearly bonachão and clumsy, in the same place. The trees become twisted storybook trees with big curious eyes-like knots and the mist becomes violet and rose, with soft sparkles. In the background the two knights stay small in the same place: Don Quixote becomes the golden knight with the white steed, the other knight's mirrors become shining little moons. Whimsical, comical, never frightening.`
        },

        // =============== Rodada 3 ===============
        {
            id: 'p6-imag', destino: `${P5}/p6-imag.png`, imaginacao: true,
            refs: [`${P5}/p6-real.webp`, `${P1}/p7-imag.webp`],
            prompt: `The defeated Knight of the Mirrors becomes the KNIGHT OF A THOUSAND MOONS: sitting in the same place and pose on the grass, his mirror armour turns into silver moons that glow softly, floating little crescent moons around him, a gentle smile, his face the same round moon face with the flat snub nose (head bare, same as the reality version); he raises his hand in a graceful greeting. Don Quixote becomes the golden knight, standing in the same place, saluting him with a bow and his golden lance with the red pennant. Tomé becomes a friendly squire in a rich green tunic, with a normal nose, in the same place. Sancho the squire (sky-blue tunic) climbs down the tree in the same place. Rocinante becomes the white steed. The forest becomes a fairytale glade with silver light, violet shadows and golden sparkles. Noble, joyful, never scary.`
        },
        // Refeita (2ª tentativa): a 1ª pôs um burrico que não está na Realidade, com Sancho em cima
        {
            id: 'p6-imag-v2', destino: `${P5}/p6-imag.png`, imaginacao: true,
            refs: [`.cache-arte/dom-quixote-parte-5-b/p6-imag-v1.png`, `${P5}/p6-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same fairytale colours, poses, faces, golden knight, moons, Tomé, white-blazed horse with the red caparison), with ONLY ONE change: REMOVE THE DONKEY completely. There is NO donkey and NO other animal except the single chestnut horse on the right. Sancho stands with one foot on the low branch of the big tree and one hand on the trunk, exactly like in the SECOND reference image (climbing down the tree), in his sky-blue squire's tunic; where the donkey was, show only grass and wildflowers.`
        },
        {
            id: 'p6-narigao-v2', destino: `${P5}/camadas/p6-narigao.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${REF}/tome-cecial.png`, `${P5}/p6-real.webp`],
            prompt: `ONLY the huge fake nose, copied from the squire's fake nose in the FIRST reference image: a long crooked nose made of purple-painted cardboard with warts, like a big purple eggplant, seen in three-quarter view turned slightly to the left as it is worn on a face, the wide base at the top where it would sit between the eyes, the tip hanging down and a little to the left. Two thin string loops come out of the upper left and upper right of the base. NO band, NO strip, NO forehead piece, NO face, NO eyes, NO head, just the nose and the two short strings. Paint only the nose.`
        },
        {
            id: 'p6-elmo', destino: `${P5}/camadas/p6-elmo.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P5}/p6-real.webp`],
            prompt: `ONE closed knight's helmet with a lowered visor, completely covered with small round shiny mirrors that sparkle like little moons, seen from the front (slightly three-quarters), sized to fit over the bare head of the seated knight in the reference illustration. Paint only the helmet. Hollow underneath, no head, no neck, no face.`
        },
        {
            id: 'p6-narigao', destino: `${P5}/camadas/p6-narigao.png`, camada: true,
            proporcao: '1:1', tamanho: '512', refs: [`${P5}/p6-real.webp`],
            prompt: `ONE huge fake nose made of purple-painted cardboard with warts, long and crooked, seen from the front-side as if worn on a face (the wide bridge on top, the tip hanging low), with a thin string loop on each side. Sized to fit over the normal nose of the standing squire in the reference illustration. Paint only the fake nose with its strings, no face.`
        }
    ]
};
