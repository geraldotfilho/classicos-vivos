// Pedidos de arte da Parte 2 de Robin Hood (16 novas + 3 retoques de p3-stage-1..3), para tools/gerar-imagens.mjs.
// Estilo C: Diorama de Papel Recortado (Paper Cut-Out Craft), 16:9, zero contorno preto, zero texto legível.
export const P1 = 'robin-hood/imagens/parte-1';
export const P2 = 'robin-hood/imagens/parte-2';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo: `Handcrafted 3D paper cut-out diorama illustration for a children's book, 16:9 widescreen aspect ratio, made of layered textured matte craft paper, construction paper and cotton paper fibers, visible paper thickness on cut edges, soft realistic drop shadows cast between paper layers creating deep theatrical stage depth, warm storybook lighting, NO black ink outlines, NO comic book line art, tactile paper-craft aesthetic. Warm, joyful, safe for 6-year-old children. STRICTLY NO text, NO letters, NO numbers, NO words, NO signatures anywhere in the image.`,
    estiloCamada: `Single isolated 3D paper cut-out craft object centered on a completely flat, solid, uniform pure magenta background (#FF00FF), NO background scenery, NO cast shadow on the magenta background, NO black ink outlines, NO comic book line art, tactile matte craft paper texture. STRICTLY NO text, NO letters, NO halos.`,
    personagens: {
        ROBIN: 'Robin Hood (exact look from first reference image): agile young man with light-medium skin, warm brown hair, green archer hood with a bright red feather, leaf-green tunic, quiver of red-fletched arrows, wooden bow, tall brown boots',
        ROBIN_DISF: 'Robin Hood disguised as an ordinary traveling artisan (exact look from reference): wide-brimmed brown traveler hat, long earthy-brown cloak fully closed covering his chest (strictly ZERO green clothing visible anywhere on him), bushy wool false beard, brown boots',
        MARIANA: 'Lady Mariana (exact look from first reference image): young Black woman with long dark braided hair, warm brown skin, emerald-green forest archer tunic and bow',
        JOAO: 'João Pequeno (exact look from first reference image): tall broad-shouldered gentle giant with brown beard and mustache, leaf-green shoulder capelets over brown/cream tunic, tall brown boots, wooden quarterstaff',
        GRILO: 'Grilo (exact look from first reference image): pre-teen pardo boy around 11–12 years old (chest-high to adults), short dark curly hair, wearing a leaf-green tunic',
        TOME: 'Mestre Tomé (exact look from first reference image): strong Black man with short dark hair and neat beard, wearing his flour-dusted white apron over a grey-cream shirt',
        CLARA: 'Clara Escarlate (exact look from second reference image): young white woman in her early twenties, fair skin with rosy cheeks, brown hair neatly tied back in a practical braided bun, cream linen blouse, earth-toned skirt, dye-splashed artisan apron, and her signature vivid scarlet-red cloth neckerchief tied around her neck',
        XERIFE: 'Sheriff of Nottingham (exact look from reference): ornate purple puffed-sleeve tunic, purple cloak, purple feathered hat'
    },
    pedidos: [
        // --- RETOQUES DA ATIVIDADE 1 (Cap. 14) ---
        {
            id: 'p3-stage-1',
            destino: `${P2}/p3-stage-1.png`,
            refs: [`${P2}/p2-real.webp`, `${P2}/p3-real.webp`],
            prompt: `EXACT SAME camera angle, lighting, and Clara Escarlate workshop interior as the reference images.
Progressive Activity Stage 1 (Hat added):
- Center-left behind the wooden worktable: ONLY ONE Robin Hood (clean-shaven, still wearing his bright leaf-green archer tunic, NO cloak on his shoulders) is now wearing the wide-brimmed brown traveler's hat on his head, smiling as he adjusts the brim. On the worktable remain the folded long earthy-brown cloak and the fluffy wool false beard.
- Right side: [CLARA], [MARIANA] (MUST be Lady Mariana, young Black woman with long dark braids—strictly DO NOT duplicate Robin Hood on the right!), and [GRILO] watching encouragingly.`
        },
        {
            id: 'p3-stage-2',
            destino: `${P2}/p3-stage-2.png`,
            refs: [`${P2}/p2-real.webp`, `${P2}/p3-real.webp`],
            prompt: `EXACT SAME camera angle, lighting, and Clara Escarlate workshop interior as the reference images.
Progressive Activity Stage 2 (Hat + Closed Brown Cloak, ZERO green on Robin):
- Center-left behind the wooden worktable: Robin Hood (clean-shaven, NO beard yet) is wearing BOTH the wide-brimmed brown traveler's hat AND the long earthy-brown traveler's cloak fastened completely closed across his chest and torso so STRICTLY ZERO green fabric is visible anywhere on him. On the worktable remains only the fluffy wool false beard.
- Right side: [CLARA], [MARIANA], and [GRILO] nodding with pleased smiles.`
        },
        {
            id: 'p3-stage-3',
            destino: `${P2}/p3-stage-3.png`,
            refs: [`${P2}/p2-real.webp`, `${P2}/p3-real.webp`],
            prompt: `EXACT SAME camera angle, lighting, and Clara Escarlate workshop interior as the reference images.
Progressive Activity Stage 3 (Complete Disguise: Hat + Closed Cloak + Wool Beard, ZERO green on Robin):
- Center-left behind the wooden worktable: [ROBIN_DISF] with his brown cloak fastened completely closed across his chest (strictly ZERO green clothing visible anywhere on him), grinning proudly like an ordinary traveling artisan. The worktable is now clear of disguise items.
- Right side: [CLARA], [MARIANA], and [GRILO] clapping their hands and laughing warmly in delight.`
        },

        // --- CAPA (Pág. 0) ---
        {
            id: 'p0-real',
            destino: `${P2}/p0-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Children's book cover composition framed by a lush layered arch of green paper oak leaves from Sherwood Forest.
- Upper-center beneath the leaf arch: a crisp, gleaming Golden Arrow crafted from metallic-gold matte paper. CRITICAL: keep the air directly around the Golden Arrow completely clean and sharp with NO painted sparkles or stars.
- Foreground characters smiling warmly together: [ROBIN], [MARIANA], [JOAO], [GRILO], and [CLARA].
- Background depth: soft layered paper silhouettes of the Old Stone Tower on a distant hill on one side and festive Nottingham tournament banners on the other, bathed in warm golden storybook light.`
        },

        // --- CAP. 16 (Pág. 5) ---
        {
            id: 'p5-real',
            destino: `${P2}/p5-real.png`,
            refs: [`${P2}/p4-real.webp`, `${P1}/p1-real.webp`],
            prompt: `Festive Nottingham medieval town square during the archery tournament climax (full-bleed diorama, NO outer beige frame border).
- Center-right focal point: round woven straw archery target on a wooden stand—one wooden arrow has struck dead center and cleanly split the captain's previous arrow right down the middle in two halves at the bullseye!
- Left: [ROBIN_DISF] lowering his simple wooden bow with a relieved, playful grin.
- On the raised wooden dais: [XERIFE] making a sour grumpy face as he holds out the Golden Arrow, flanked by wide-eyed grey-armored guards.
- Crowd: genuinely plural and diverse townsfolk—women archers holding bows, women vendors, Black, brown/pardo, Indigenous, white, and elderly spectators—clapping and cheering in amazement.`
        },

        // --- CAP. 17 (Pág. 6) ---
        {
            id: 'p6-real',
            destino: `${P2}/p6-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`, `${P2}/p4-real.webp`],
            prompt: `Playful, non-violent slapstick escape in the festive Nottingham town square (full-bleed diorama, NO outer frame border). Keep the upper third of the sky/air open under warm golden light for subtle CSS flour mist.
- Midground slapstick: long vivid scarlet-red paper ribbons swirl through the air and playfully wrap two clumsy grey-armored guards together like a funny gift parcel (harmless and comical).
- Near the wooden dais: a comical puff of white flour has dusted [XERIFE] from head to toe like a snowy snowman with his purple feathered hat peeking out! Diverse townsfolk laugh heartily in the background.
- Escaping toward Sherwood trees on one side: [ROBIN_DISF] clutching the gleaming Golden Arrow runs alongside [MARIANA], [JOAO], and [GRILO] (holding an empty flour pouch).
- Opposite side alley: [CLARA] carrying her open woven basket slips quickly into a quiet side alley toward her workshop.`
        },

        // --- CAP. 18 (Pág. 7) ---
        {
            id: 'p7-real',
            destino: `${P2}/p7-real.png`,
            refs: [`${P2}/p4-real.webp`, `${P1}/p1-real.webp`],
            prompt: `Quiet deserted Nottingham town square in warm late-afternoon amber shadows (full-bleed diorama, NO outer frame border), empty wooden market stalls and half-timbered cottages.
- Foreground: [XERIFE] (still with comical light dustings of white flour on his purple cloak) angrily holds up a long vivid scarlet-red paper ribbon in his hands, pointing down a side alley while leaning in to whisper secret orders to two grey-armored guards listening intently.`
        },

        // --- CAP. 19 (Pág. 8 — sem associação com sangue!) ---
        {
            id: 'p8-real',
            destino: `${P2}/p8-real.png`,
            refs: [`${P2}/p2-real.webp`, `${P2}/p1-real.webp`],
            prompt: `EXACT SAME interior of Clara Escarlate's workshop as the first reference image, now quiet, empty of Clara, and tumbled.
- The wooden front door stands ajar with calm daylight streaming in. The main wooden dye vat is tipped on its side, with vivid scarlet-red plant dye spilled onto the wooden floor right alongside colorful scattered rolls of blue, marigold-yellow, and cream fabrics (clearly a colorful artisan dyer's workshop spill, strictly NOT scary or blood-like).
- Entering cautiously through the ajar doorway: [MARIANA] and [GRILO], looking at the tumbled fabrics and tipped vat with worried, alert expressions.`
        },

        // --- CAP. 20 (Pág. 9 — Atividade 2: 4 etapas progressivas) ---
        {
            id: 'p9-real',
            destino: `${P2}/p9-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Cobblestone alley right outside Clara Escarlate's open workshop door in Nottingham, half-timbered walls and stone paving in crisp daytime light.
- Initial investigation state: [MARIANA] and [GRILO] crouched low near the workshop threshold, peering attentively at the grey cobblestone street to begin looking for clues (clean cobblestones, no highlighted trail yet).`
        },
        {
            id: 'p9-stage-1',
            destino: `${P2}/p9-stage-1.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Same Nottingham cobblestone alley outside Clara's workshop door in crisp daytime light.
- Activity Stage 1 (PEGADA — Scarlet Footprints): A clear, unmistakable trail of vivid scarlet-red guard boot footprints stamped across the grey cobblestones leading away from the workshop door down the alley. [MARIANA] and [GRILO] crouch beside the large scarlet boot prints—Grilo comparing his smaller foot beside one huge red boot print—pointing excitedly along the trail.`
        },
        {
            id: 'p9-stage-2',
            destino: `${P2}/p9-stage-2.png`,
            refs: [`${P2}/p1-real.webp`],
            prompt: `Just outside the stone Nottingham town gate in warm afternoon countryside light, where a wooden fence and green roadside bushes border a winding dirt path toward the hills.
- Activity Stage 2 (FIO — Scarlet Cloth Threads): Tied intentionally onto the wooden fence posts and green bush branches are bright vivid scarlet-red cloth threads and torn fabric strips left as a deliberate trail by Clara. [MARIANA] and [GRILO] examine and point triumphantly at the scarlet threads fluttering on the fence and bush.`
        },
        {
            id: 'p9-stage-3',
            destino: `${P2}/p9-stage-3.png`,
            refs: [`${P2}/p1-real.webp`],
            prompt: `From the crest of a winding dirt road outside town in warm golden-hour sunlight with layered cream-and-gold clouds (a final vivid scarlet-red thread tied to a roadside branch in the foreground).
- Activity Stage 3 (TORRE — The Old Tower): Ahead on a grassy hill rises the tall sturdy Old Stone Tower (Torre Velha) built of layered grey craft paper against warm clouds. [MARIANA] and [GRILO] stand in the foreground pointing eagerly up toward the distant Old Stone Tower, having discovered Clara's hiding place.`
        },

        // --- CAP. 21 (Pág. 10) + SPRITE LENÇO ---
        {
            id: 'p10-real',
            destino: `${P2}/p10-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Warm golden-blue dusk at the Old Stone Tower (Torre Velha) built of layered grey craft paper on a grassy hill bordered by Sherwood trees and boulders.
- At the tower's lower wooden door: a grey-armored guard sits slumped fast asleep on a bench with his helmet tilted down over his nose, snoring peacefully.
- CRITICAL ANIMATION CLEARANCE: Near the top of the tower, draw a 100%-frontal arched stone window with Clara Escarlate (brown braided bun, cream blouse) peeking out smiling warmly—and LEAVE the stone wall and air space directly below and beside the window sill completely EMPTY (DO NOT paint any red scarf or cloth hanging out of the window; the animated scarf sprite will attach there).
- Foreground hidden behind trees and rocks: [ROBIN], [MARIANA], [JOAO] (comically hiding behind two thick tree trunks because he is so big!), and [GRILO] looking up toward Clara's window with knowing smiles.`
        },
        {
            id: 'p10-lenco',
            camada: true,
            destino: `${P2}/camadas/p10-lenco.png`,
            refs: [`${P2}/p2-real.webp`],
            prompt: `One fluttering, slightly shortened vivid scarlet-red cloth handkerchief/scarf (lenço vermelho-escarlate, frayed lightly at the bottom tip) crafted from layered textured matte craft paper. Its top corner is shaped cleanly to anchor onto a frontal stone window sill, while the fabric waves gracefully downward in a gentle dusk breeze, lit with warm golden-hour dusk light. Isolated cleanly on solid #FF00FF magenta.`
        },

        // --- CAP. 22 (Pág. 11 — Atividade 3: 4 etapas noturnas) ---
        {
            id: 'p11-real',
            destino: `${P2}/p11-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Starry deep-blue moonlit night at the back stone wall of the Old Stone Tower under a glowing cream paper full moon. Far to the side near the front door, the grey-armored guard snores peacefully on his bench.
- Initial night rescue state: At the base of the lower back stone wall, [ROBIN], [JOAO] (holding a coiled brown paper rope), [MARIANA], and [GRILO] prepare quietly for the rescue while Clara Escarlate looks down eagerly from the high arched stone window above.`
        },
        {
            id: 'p11-stage-1',
            destino: `${P2}/p11-stage-1.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Same starry deep-blue moonlit night and back stone wall of the Old Stone Tower (guard still snoring peacefully on the distant bench).
- Activity Stage 1 (CORDA — Rope secured): [JOAO] has thrown a sturdy braided brown paper rope all the way up to the high stone window. Up in the window, Clara Escarlate ties the rope firmly and begins climbing safely down while [ROBIN], [MARIANA], and [GRILO] watch closely below.`
        },
        {
            id: 'p11-stage-2',
            destino: `${P2}/p11-stage-2.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Same starry deep-blue moonlit night and back stone wall of the Old Stone Tower (guard still snoring peacefully on the distant bench).
- Activity Stage 2 (CAPA — Green forest cloak): Clara Escarlate has safely climbed down to the grassy ground! [MARIANA] drapes a leaf-green forest cloak gently over Clara's shoulders, with Clara's shortened vivid scarlet-red neckerchief peeking proudly over the collar, while [ROBIN], [JOAO], and [GRILO] smile warmly beside them.`
        },
        {
            id: 'p11-stage-3',
            destino: `${P2}/p11-stage-3.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Same starry deep-blue moonlit night and back stone wall of the Old Stone Tower.
- Activity Stage 3 (FLORESTA — Silent escape): All five friends—[ROBIN], [MARIANA], Clara Escarlate (wearing the leaf-green forest cloak with her vivid scarlet-red neckerchief), [JOAO], and [GRILO]—tiptoe and run joyfully together into the moonlit Sherwood Forest trees at the edge of the clearing, while far behind them at the tower door the grey-armored guard keeps snoring peacefully on his bench.`
        },

        // --- CAP. 23 (Pág. 12) ---
        {
            id: 'p12-real',
            destino: `${P2}/p12-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `Radiant sunny morning in the cheerful medieval village of Vila do Moinho with half-timbered thatched-roof cottages and the stone watermill in the background.
- Action & Genuine Diversity: [ROBIN], [MARIANA], [CLARA], [JOAO], [TOME], and [GRILO] (comically carrying such a tall stack of colorful folded blankets that only his feet and eyes peek out!) are warmly handing out woven baskets of fresh bread, red apples, and cozy folded blankets to genuinely diverse village families—mothers, fathers, grandparents, Black, brown/pardo, Indigenous, and white families, and joyful children wrapped up in colorful blankets like little burritos laughing together.`
        },

        // --- CAP. 24 (Pág. 13) ---
        {
            id: 'p13-real',
            destino: `${P2}/p13-real.png`,
            refs: [`${P2}/p1-real.webp`, `${P2}/p2-real.webp`],
            prompt: `EXACT SAME Sherwood Great Oak clearing stage as the first reference image (massive gnarled brown-paper Great Oak tree with its dark hollow behind the rustic wooden log table, mossy floor, ferns, wildflowers).
CRITICAL ANIMATION CLEARANCE: Keep the upper-left quadrant beneath the sunlit oak canopy open and unobstructed for subtle golden sunbeams and luminous forest dust in CSS/SVG.
- Joyful celebration with all six friends raising wooden mugs around the table laden with warm bread:
  - Center-prominent: Clara Escarlate (young white woman, brown braided bun) now proudly wearing a LEAF-GREEN forest archer tunic paired with her signature vivid scarlet-red cloth neckerchief tied around her neck!
  - Around her: [ROBIN], [MARIANA], [JOAO] (laughing heartily with a playful splash of apple juice on his nose), [GRILO], and [TOME].`
        }
    ]
};
