// Pedidos de arte da Parte 8 de Dom Quixote (caps. 61 a 69, fecha a obra), para tools/gerar-imagens.mjs.
// As 2 cenas da pág. 9 (p9-real, p9-imag) foram reaproveitadas de acervo/parte-4-v1/p7-*.webp.
// Fonte: docs/cadernos/dom-quixote-parte-8.md §4 e o texto de dom-quixote/parte-8.html.
import { P4, P5, REF, estilo, estiloCamada, imaginacao, personagens as base, modelo } from './dom-quixote-parte-5-comum.mjs';

export const P6 = 'dom-quixote/imagens/parte-6';
export const P7 = 'dom-quixote/imagens/parte-7';
export const P8 = 'dom-quixote/imagens/parte-8';

const personagens = {
    ...base,
    SANCHO: "Sancho Panza: a short, round, rosy-cheeked peasant with a round friendly CLEAN-SHAVEN face (NO beard, NO stubble), dark hair, a brown flat cap, a brown wool vest over a white shirt, a red sash and brown breeches",
    BRANCA_LUA: "the Knight of the White Moon: a mysterious knight in full gleaming silvery-white plate armour with a closed-visor helmet, riding a strong, well-fed dark horse, carrying a round shield painted with a bright white crescent moon",
    ALONSO_VIAGEM: "Don Quixote (Alonso Quixano) WITHOUT armour: the exact same very tall, thin elderly Spanish gentleman with a long narrow face, kind eyes, white swept-back hair, curled white mustache and pointed white goatee, wearing a comfortable simple dark brown travel tunic and cape (NO armour, NO helmet, NO lance)",
    SANSAO: "Sansón Carrasco: the exact young village student of about twenty-four from the second reference image — short and stocky, round moon face, small flat snub nose, rosy cheeks, short curly chestnut hair, wearing his black university student's gown with small white collar"
};

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // ================ LOTE 1: 8 cenas -real independentes ================

        // Pág. 0 · Capa (Realidade) — Dois Amigos Diante do Mar
        {
            id: 'p0-real', destino: `${P8}/p0-real.png`,
            refs: [`${P7}/p9-real.webp`, `${P5}/p0-real.webp`],
            prompt: `Sandy Mediterranean beach of Barcelona at golden rosy dawn, calm shimmering blue sea stretching all the way to the distant horizon.
- Left-center foreground on the sandy shore overlooking the ocean: [QUIXOTE] on [ROCINANTE] beside [SANCHO] on [BURRICO], both gazing out at the vast sea for the first time with joyful awe.
- Far back along the curving sandy beach on the right in the morning mist (small in the distance, mysterious): [BRANCA_LUA], exactly matching the knight on the road in the first reference image, watching silently from afar.
Warm, sunlit, full of wonder, no text anywhere.`
        },

        // Pág. 1 · Cap. 61: As Redes Verdes (Realidade)
        {
            id: 'p1-real', destino: `${P8}/p1-real.png`,
            refs: [`${P5}/p0-real.webp`, `${P4}/p10-real.webp`],
            prompt: `Sunlit green woodland clearing with fine, delicate translucent GREEN BIRD-CATCHING NETS stretched gently from tree trunk to tree trunk across the forest path.
- Left-center: [QUIXOTE] and [ROCINANTE] comically tangled up together inside a sheer green net between the trees (funny and safe, nobody hurt at all).
- Beside them: [SANCHO] laughing heartily with his hands on his knees next to [BURRICO].
- Running cheerfully out from among the trees on the right: two young women and two young men dressed as fancy, colourful "playtime shepherds" (spotless bright pastel pastoral dresses and vests decorated with festive ribbons, holding little wooden flutes, far too neat for real sheepherding; cosy picnic tents visible gently among the trees behind).
Lighthearted, funny, warm storybook scene, no text anywhere.`
        },

        // Pág. 2 · Cap. 62: O Livro Mentiroso (Realidade, sem lente)
        {
            id: 'p2-real', destino: `${P8}/p2-real.png`,
            refs: [`${P6}/p4-real.webp`, `${P5}/p0-real.webp`],
            prompt: `The SAME warm, candlelit wooden-beamed Spanish inn style as the first reference image, at night, looking into an open doorway between two adjacent guest rooms.
- Left-center: [QUIXOTE] frowning indignantly as he flips through a thick open bound book (the pages show ONLY tiny faint wavy ink squiggles — ABSOLUTELY NO readable letters, NO words, NO legible text anywhere!).
- Right beside Don Quixote: [SANCHO], rosy-cheeked and comically offended, holding a half-eaten ROASTED CHICKEN LEG (drumstick) raised mid-air!
- On the right in the open doorway: two well-dressed Spanish travellers with wide eyes and dropped jaws in amazement as they recognize the real Don Quixote and Sancho.
Warm, funny, lively storybook atmosphere, absolutely no text.`
        },

        // Pág. 3 · Cap. 63: O Mar (Realidade)
        {
            id: 'p3-real', destino: `${P8}/p3-real.png`,
            refs: [`${P7}/p9-real.webp`, `${P5}/p0-real.webp`],
            prompt: `Sunny sparkling Barcelona beach at bright golden sunrise.
- Left foreground at the shoreline: [SANCHO] leaping comically backward with wide eyes as a playful FOAMY OCEAN WAVE splashes his boots, while [BURRICO] watches curiously; beside him, [QUIXOTE] on [ROCINANTE] gazes in wonder out over the sea.
- Out on the sparkling blue sea: TWO grand festive 1600s wooden GALLEY SHIPS decorated with colourful fluttering flags and banners, with long rows of wooden oars dipping into the water and cheerful little puffs of celebratory salute smoke rising into the sky.
- Right foreground galloping onto the beach in welcome: joyful Spanish nobleman Don Antonio wearing an elegant plumed hat and noble velvet coat, accompanied by festive welcoming horsemen.
- Far back in the shadow of a large coastal rock at the end of the beach (tiny, distant): the quiet silhouette of [BRANCA_LUA] watching from afar.
Bright, joyful, full of celebration, no text anywhere.`
        },

        // Pág. 4 · Cap. 64: A Cabeça Encantada (Realidade)
        {
            id: 'p4-real', destino: `${P8}/p4-real.png`,
            refs: [`${P6}/p4-real.webp`, `${P5}/p0-real.webp`],
            prompt: `CLEVER TWO-STORY CUTAWAY ILLUSTRATION showing both an upstairs parlour and the basement room directly underneath:
- Upper story (top 65% of the image): a cozy candlelit parlour in Don Antonio's house. On a sturdy wooden table in the center sits a sculpted BRONZE BUST HEAD of a bald bearded classical man with open eyes.
  - Left of the table: [QUIXOTE] leaning respectfully close to listen to the bronze head.
  - Behind the table: cheerful nobleman Don Antonio in a velvet doublet hiding a mischievous smile.
  - Crouching low beside and peeking under the table: [SANCHO], pointing excitedly at a THIN METAL SPEAKING TUBE running straight down from the neck of the bronze head, hidden inside the hollow wooden table leg and passing down through the floorboards!
- Lower story (bottom 35% of the image, cutaway cross-section beneath the parlour floor): a cozy basement room where Don Antonio's young laughing nephew sits on a wooden stool, holding the lower end of that same metal speaking tube to his mouth and covering a giggle with his hand!
Warm, funny, crystal-clear visual mystery solved at a glance, no text anywhere.`
        },

        // Pág. 5 · Cap. 65: A Oficina dos Livros (Realidade)
        {
            id: 'p5-real', destino: `${P8}/p5-real.png`,
            refs: [`${P5}/p0-real.webp`, `${P6}/p4-real.webp`],
            prompt: `Bright, lively 1600s Spanish book printing workshop with a large wooden screw printing press in the background and freshly printed paper sheets hanging on drying lines above (ONLY faint wavy decorative lines on the papers — CRITICAL: ABSOLUTELY NO readable letters, NO words, NO legible text anywhere on any page, sign or metal block!).
- Center-left: a friendly aproned printer man with ink smudges on his apron stumbling slightly against a low wooden stool, tipping a small wooden tray of tiny silver METAL TYPE BLOCKS onto the floor (tiny plain metal pieces, NO legible letters!).
- Right side: [QUIXOTE] smiling with emotion as he holds a freshly printed sheet, with [SANCHO] happily peeking over his arm and pointing at the page.
Warm sunlit workshop atmosphere, absolutely no letters or words anywhere.`
        },

        // Pág. 7 · Cap. 67: O Caminho de Volta (Realidade)
        {
            id: 'p7-real', destino: `${P8}/p7-real.png`,
            refs: [`${P5}/p0-real.webp`, `${P4}/p10-real.webp`],
            prompt: `Warm late-afternoon return journey along a country road near a green woodland and gentle hills dotted with tiny distant white sheep.
- Left-center: [ALONSO_VIAGEM] riding calmly on [ROCINANTE], gesturing dreamily toward the peaceful green meadow with a gentle smile (CRITICAL: Don Quixote wears NO armour, NO helmet, NO lance!).
- Right-center: [SANCHO] walking cheerfully on foot beside [BURRICO], laughing heartily; strapped safely onto the donkey's wooden pack-saddle are Don Quixote's worn silver armour plates, shiny brass barber's basin helmet, and long wooden lance!
Tender, hopeful, sunlit storybook atmosphere, no text anywhere.`
        },

        // Pág. 8 · Cap. 68: O Abraço em Sansão (Realidade, sem lente)
        {
            id: 'p8-real', destino: `${P8}/p8-real.png`,
            refs: [`${P4}/p10-real.webp`, `${REF}/sansao-carrasco.png`],
            prompt: `The SAME sunlit whitewashed village courtyard in front of Alonso Quixano's house as the first reference image.
- Center: [ALONSO_VIAGEM] (WITHOUT armour, wearing a simple comfortable brown house robe/tunic, NO helmet, NO lance) opening his arms wide in a warm, forgiving hug toward [SANSAO] (EXACTLY matching the second reference image: short stocky young student in black university gown with small white collar, round face, snub nose), who looks both sheepish and deeply relieved.
- Left side watching happily: [SOBRINHA], [GOVERNANTA] wiping happy tears on her apron, [PADRE] with round spectacles, and [BARBEIRO].
- Right side welcoming home: [SANCHO] hugging [TERESA] (who wears her colourful headscarf AND a sparkling RED CORAL BEAD NECKLACE around her neck!) and lively [SANCHICA] with her two braids, with [BURRICO] waiting happily beside them.
Joyful, heartwarming homecoming, no text anywhere.`
        },

        // ================ LOTE 2: p6-real + 6 cenas -imag (dependem do Lote 1) ================

        // Pág. 6 · Cap. 66: O Trato na Praia (Realidade, sem lente) — usa p0-real aprovada para consistência da Branca Lua
        {
            id: 'p6-real', destino: `${P8}/p6-real.png`,
            refs: [`${P8}/p0-real.webp`, `${P5}/p6-real.webp`],
            prompt: `Sunny Mediterranean beach of Barcelona by calm sparkling sea — COMPLETELY PEACEFUL AND SAFE, ZERO violence, ZERO fighting, ZERO injuries!
- Center-left on the soft sand: skinny brown [ROCINANTE] SITTING DOWN ON HIS HINDQUARTERS JUST LIKE A DOG WAITING FOR A TREAT, and [QUIXOTE] sitting calmly beside him on the soft sand, unhurt, dignified and gentle, gazing quietly at the sky.
- Center-right: [BRANCA_LUA] (EXACT same silvery-white plate armour, closed-visor helmet, strong dark horse, and round shield with bright white crescent moon as in the first reference image), holding his lance RAISED STRAIGHT UP HIGH TOWARD THE SKY on purpose and bowing his helmeted head slightly in deep, quiet respect.
- Left side running hurriedly across the sand with wide worried eyes: [SANCHO] and [BURRICO].
Dignified, tender, comic yet respectful storybook moment, no text anywhere.`
        },

        // Pág. 0 · Capa (Imaginação)
        {
            id: 'p0-imag', destino: `${P8}/p0-imag.png`, imaginacao: true,
            refs: [`${P8}/p0-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE, SEA, BEACH AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- Transform the dawn sky and ocean into a radiant, luminous fairytale dawn in shimmering indigo, violet, gold and turquoise with twinkling stars and a magnificent glowing silver crescent moon shining softly in the sky.
- [QUIXOTE] becomes the GOLDEN KNIGHT on his noble WHITE STEED (like the second reference image); [SANCHO] becomes the proud squire in a sky-blue tunic with gold trim on his festively caparisoned donkey.
- Far along the beach curve on the right, the distant Knight of the White Moon gleams nobly in radiant pearl-white armour bathed in silver moonlight, holding his luminous crescent-moon shield. Heroic, magical, never scary, no text.`
        },

        // Pág. 1 · Cap. 61: As Redes Verdes (Imaginação)
        {
            id: 'p1-imag', destino: `${P8}/p1-imag.png`, imaginacao: true,
            refs: [`${P8}/p1-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- Transform the woodland clearing into an enchanted emerald-and-violet fairytale forest sparkling with magical firefly lights.
- The green bird nets become shimmering emerald-and-gold magical enchantress webs glowing softly between ancient fairytale trees, tangling [QUIXOTE] as the GOLDEN KNIGHT on his noble WHITE STEED.
- [SANCHO] in his sky-blue squire's tunic laughs beside his festively decorated donkey.
- On the right, the four young playful shepherds transform into whimsical, friendly smiling fairytale forest wizards and woodland enchanters in starry jewel-toned robes (playful and colourful, NEVER scary). No text anywhere.`
        },

        // Pág. 3 · Cap. 63: O Mar (Imaginação)
        {
            id: 'p3-imag', destino: `${P8}/p3-imag.png`, imaginacao: true,
            refs: [`${P8}/p3-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `EXCEPTION FOR THIS PAGE: This is SANCHO'S amazed imagination of the oared ships! Keep the exact beach layout and character positions of the FIRST reference image.
- Transform the sea into sparkling turquoise-and-gold fairytale water under a luminous storybook sunrise.
- [SANCHO] in his sky-blue squire's tunic leaps back in comical astonishment from a glittering fairytale wave; [QUIXOTE] becomes the GOLDEN KNIGHT on his WHITE STEED; Don Antonio and horsemen wear splendid fairytale royal velvet.
- Out on the water, the TWO wooden oared ships transform into TWO gigantic, goofy, friendly fairytale HUNDRED-LEGGED SEA CREATURES ("bichos de cem pés") — whimsical wooden-and-emerald storybook creatures with big kind gentle eyes (NO glowing eyes, NO sharp teeth, NEVER scary!), colourful flags fluttering on their backs, and dozens of comical little paddle-legs walking briskly across the top of the waves!
Joyful, funny, magical, no text anywhere.`
        },

        // Pág. 4 · Cap. 64: A Cabeça Encantada (Imaginação)
        {
            id: 'p4-imag', destino: `${P8}/p4-imag.png`, imaginacao: true,
            refs: [`${P8}/p4-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `EXCEPTION FOR THE BOTTOM OF THE IMAGE: Completely REMOVE the two-story cutaway, the basement room, the nephew, and the metal speaking tube! Replace the lower portion completely with a solid, grand enchanted parlour floor of gleaming starry marble.
- Keep the upper parlour layout and positions of Don Quixote, Sancho and Don Antonio from the FIRST reference image, transforming the room into a luminous violet-and-gold fairytale wizard chamber with twinkling stars and floating constellations.
- On the ornate central table, the bronze head floats serenely inches above a glowing golden-and-turquoise swirl of magic mist, wise and gentle (friendly calm eyes, never scary).
- [QUIXOTE] becomes the GOLDEN KNIGHT bowing respectfully (without lance); [SANCHO] in his sky-blue squire's tunic gazes up in wide-eyed wonder; Don Antonio stands in splendid royal velvet. No text anywhere.`
        },

        // Pág. 5 · Cap. 65: A Oficina dos Livros (Imaginação)
        {
            id: 'p5-imag', destino: `${P8}/p5-imag.png`, imaginacao: true,
            refs: [`${P8}/p5-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- Transform the printing workshop into a radiant fairytale storybook atelier bathed in warm golden, violet and turquoise magic light.
- [QUIXOTE] becomes the GOLDEN KNIGHT holding an open glowing book page; [SANCHO] becomes the proud squire in a sky-blue tunic laughing with wonder; the aproned printer wears a sparkling fairytale craftsman's vest.
- Soaring and swirling out into the air from the glowing open pages and hanging sheets come TINY LUMINOUS MINIATURE FAIRYTALE ADVENTURES: miniature turning windmills, a cute tiny friendly golden dragon, a tiny winged wooden horse, a sleepy little golden lion, and fluttering golden paper birds in trails of stardust!
- CRITICAL: ABSOLUTELY NO readable letters, NO words, NO legible text anywhere on any paper, type piece or sign.`
        },

        // Pág. 7 · Cap. 67: Os Pastores Quixotiz e Pancino (Imaginação)
        {
            id: 'p7-imag', destino: `${P8}/p7-imag.png`, imaginacao: true,
            refs: [`${P8}/p7-real.webp`, `${P5}/p0-imag.webp`],
            prompt: `CRITICAL EXCEPTION FOR THIS PAGE: NO GOLDEN ARMOUR, NO HELMET, NO SWORD, NO LANCE! Both heroes are dressed as gentle fairytale SHEPHERDS in an idyllic pastoral Arcadia!
- Keep the exact road, camera angle and character positions from the FIRST reference image, transforming the landscape into a sunlit golden-and-rose fairytale meadow blooming with colourful wildflowers, soft magic sparkles, floating golden musical notes, and fluffy white storybook sheep grazing happily on the green hills.
- [QUIXOTE] on the white steed becomes gentle SHEPHERD QUIXOTIZ: wearing a charming pastel-green and gold fairytale shepherd's tunic, a straw hat tucked with wildflowers, and holding a ribboned wooden shepherd's crook (same thin face, white hair, curled white mustache, pointed white goatee, serene happy smile).
- Walking beside his flower-garlanded donkey, [SANCHO] becomes cheerful SHEPHERD PANCINO: wearing a sky-blue and cream fairytale shepherd's vest and straw hat, happily playing a small wooden flute while golden musical notes float into the air (the armour remains neatly tied in a bundle on the donkey's back).
Warm, lyrical, joyful, no text anywhere.`
        }
    ]
};
