// Pedidos de arte das revisões do autor de 2026-11-21 (Issues #55, #56, #60, #61, #64, #65 e #66), para tools/gerar-imagens.mjs.
// Rodada 1: tudo o que não depende de arte nova. Rodada 2: as Imaginações das cenas novas e a etapa das chaves.
// - #55: P7 p.5 (cap. 55) — depois da atividade, o espanto de todos, a vergonha do velhinho e o orgulho de Sancho.
// - #56: P7 p.6 (cap. 56) — no desenho da parede, a cadeia e os guardas ficam na ENTRADA da ponte.
// - #60: P7 p.11 (cap. 61) — atividade nova (CHAVES → PORTÃO → ESTRADA) e a Imaginação da página.
// - #61: P8 p.2 (cap. 62) — redes de pegar borboleta.
// - #65: P8 p.3 (cap. 63, nova) — a boiada (Cervantes II-58), o motivo de Sansão querer o amigo em casa.
// - #64/#66: P8 p.8 (cap. 68) — Rocinante deitado (não sentado) e a Imaginação do duelo.
import { P5, REF, estilo, estiloCamada, imaginacao, personagens as base, modelo } from './dom-quixote-parte-5-comum.mjs';

export const P6 = 'dom-quixote/imagens/parte-6';
export const P7 = 'dom-quixote/imagens/parte-7';
export const P8 = 'dom-quixote/imagens/parte-8';

const personagens = {
    ...base,
    SANCHO: "Sancho Panza: a short, round, rosy-cheeked peasant with a round friendly CLEAN-SHAVEN face (NO beard, NO stubble), dark hair, a brown flat cap, a brown wool vest over a white shirt, a red sash and brown breeches",
    SANCHO_GOV: "Sancho Panza as governor: a short, round, rosy-cheeked man with a round friendly CLEAN-SHAVEN face (NO beard), a brown hat, a long blue-grey governor's robe with a red sash and a golden chain medallion on his chest, exactly as in the first reference image",
    MORDOMO: "the steward (mordomo): a tall slim man with a short black beard and moustache, dressed in a black doublet, black breeches and tall boots, holding a small notebook and a pencil",
    DUQUE: "the Duke: an elegant elderly Spanish nobleman with white hair and a short white beard, a white ruff collar and a rich burgundy-and-black velvet doublet of the early 1600s, exactly like the man in burgundy in the reference image of the palace garden",
    DUQUESA: "the Duchess: an elegant Spanish noblewoman with brown hair in a neat bun, a white ruff collar and a rich red-and-gold velvet gown of the early 1600s, exactly like the lady in red in the reference image of the palace garden",
    BRANCA_LUA: "the Knight of the White Moon: a mysterious knight in full gleaming silvery-white plate armour with a closed-visor helmet, riding a strong, well-fed dark horse, carrying a round shield painted with a bright white crescent moon"
};

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // ================ RODADA 1 ================

        // #55 · P7 p.5 · Cap. 55: depois de a bengala se abrir (Realidade, etapa final)
        {
            id: 'p7-p4-real-fim', destino: `${P7}/p4-real-fim.png`,
            refs: [`${P7}/p4-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same courtroom, same camera, same wooden floor, benches, windows and ceiling beams, the same villagers on both sides, the same three main characters in the same places), but at the moment JUST AFTER the trick has been discovered. ONLY THESE CHANGES:
1. The bald old villager with the white beard on the LEFT now has EMPTY HANDS (NO cane at all in his hands): both hands raised in front of his chest, palms open, mouth wide open in happy astonishment, eyebrows high.
2. The old man with long grey hair on the RIGHT is deeply ASHAMED: shoulders hunched, head bowed, cheeks bright red, one hand covering part of his face, looking down at his feet.
3. [SANCHO_GOV] on the carved chair in the centre sits up very PROUD: chest puffed out, chin up, a big satisfied smile, one hand resting on his belly and the other pointing down at the floor in front of the platform.
4. ALL the villagers on the benches are SURPRISED: mouths open in "oh!", eyes wide, some leaning forward and pointing at the floor in the centre.
5. The floor in the centre-bottom of the picture, in front of the platform, stays COMPLETELY CLEAR and empty (a cane and coins will be added there later): do NOT paint any cane, stick or coins anywhere.
Warm, funny, safe for children. No text.`
        },

        // #56 · P7 p.6 · Cap. 56: o desenho da ponte com a cadeia na entrada (Realidade)
        {
            id: 'p7-p5-real', destino: `${P7}/p5-real.png`,
            refs: [`${P7}/p5-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same courtroom, same people, same poses, same light), with ONLY ONE CHANGE: the big hand-drawn picture pinned on the wall on the left, which the young traveller points to, must be redrawn bigger and clearer, as a simple childlike drawing in ink and colour:
- a wide blue river crossing the picture from top to bottom;
- a little stone bridge going from the LEFT bank to the RIGHT bank;
- on the LEFT bank, right at the ENTRANCE of the bridge, BEFORE the bridge starts: a tiny jail house with a barred window AND two little guards standing in front of it, next to the first stone of the bridge;
- a little traveller with a stick arriving on the LEFT bank, talking to the guards;
- on the RIGHT bank, at the far end of the bridge: an open road with a tree, and NOTHING else (no jail, no guards on the right side).
NO letters or words anywhere on the drawing. Warm, funny, calm, safe for children. No text.`
        },

        // #60 · P7 p.11 · Cap. 61: Sancho devolve as chaves (Realidade, etapa 0)
        {
            id: 'p7-p10-real-palacio', destino: `${P7}/p10-real-palacio.png`,
            refs: [`${P6}/p9-real.webp`, `${P7}/p8-real.webp`, `${P7}/p5-real.webp`],
            prompt: `A bright, elegant hall in the Duke's palace with tall arched windows, red velvet curtains, a stone floor and sunlight pouring in.
- Centre-right: [DUQUE] and [DUQUESA] (copy them from the FIRST reference image) standing side by side, a little embarrassed, looking down kindly.
- Centre-left: [SANCHO] (exactly as in the SECOND reference image, in his simple old peasant clothes, NO governor's robe), kneeling on one knee on the stone floor, holding up with both hands a big iron ring with three large old-fashioned IRON KEYS, offering them to the Duke with a calm, honest face.
- Left: [QUIXOTE] standing tall behind Sancho, one hand resting on his friend's shoulder, proud and moved.
- Right background: [MORDOMO] (the man with the notebook on the right of the THIRD reference image) holding his little notebook against his chest, smiling.
Warm, gentle, dignified, safe for children. No text.`
        },

        // #60 · P7 p.11 · Cap. 61: o portão do palácio se abre (Realidade, etapa 2)
        {
            id: 'p7-p10-real-portao', destino: `${P7}/p10-real-portao.png`,
            refs: [`${P7}/p10-real.webp`, `${P6}/p9-real.webp`],
            prompt: `The great wooden double GATE of the Duke's stone palace (the castle seen on the hill in the FIRST reference image), seen from inside the palace courtyard: both heavy doors swinging wide open, and through them a bright view of the open countryside, golden fields, red poppies and a winding road under a big blue sky.
- Centre, passing through the open gate towards the road, seen from behind and a little from the side: [QUIXOTE] on [ROCINANTE] holding his lance, and [SANCHO] on [BURRICO] (both exactly as in the FIRST reference image), Sancho turning his head back to wave goodbye.
- In the courtyard on the left: [DUQUE] and [DUQUESA] (from the SECOND reference image) and a few servants waving goodbye.
- Two white doves flying out through the gate into the sky.
Bright, joyful feeling of freedom, safe for children. No text.`
        },

        // #60 · P7 p.11 · Cap. 61: a estrada da liberdade (Imaginação)
        {
            id: 'p7-p10-imag', destino: `${P7}/p10-imag.png`, imaginacao: true,
            refs: [`${P7}/p10-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE, ROAD AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- The dusty road becomes a shining GOLDEN ROAD of light winding through a fairytale meadow of glowing flowers, under a radiant turquoise-and-gold sky with soft rays of sunshine.
- [QUIXOTE] becomes the GOLDEN KNIGHT (like the second reference image) on his noble WHITE STEED, arm open wide to the sky; [SANCHO] becomes the proud squire in a sky-blue tunic with gold trim on his festively decorated donkey, still holding up his bread and cheese, which now glow like treasure.
- A flock of shining white DOVES flies up from the road into the sky around them, scattering sparkles: the gift of freedom.
- The castle on the hill becomes a small, far-away golden cage-shaped palace left behind.
- Far behind on the road, small and mysterious, the distant knight with the crescent-moon shield gleams in pearl-white light.
Joyful, luminous, magical, never scary. No text.`
        },

        // #61 · P8 p.2 · Cap. 62: redes de pegar borboleta (Realidade) — edição da arte aprovada
        {
            id: 'p8-p1-real', destino: `${P8}/p1-real.png`,
            refs: [`${P8}/p1-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same forest, same nets, same Don Quixote, horse, Sancho, donkey and the four young people dressed as shepherds, same positions), with ONLY ONE CHANGE: add many big, colourful BUTTERFLIES (orange, blue, yellow and white) fluttering all over the clearing around the green nets, and three or four butterflies gently resting on the fine green nets, wings open. One of the young shepherd girls holds up her open hand and a blue butterfly flies away from it. NO birds anywhere. Light, joyful, safe for children. No text.`
        },

        // #65 · P8 p.3 (nova) · Cap. 63: A Boiada (Realidade)
        {
            id: 'p8-p2-real', destino: `${P8}/p2-real.png`,
            refs: [`${P8}/p1-real.webp`, `${P8}/p0-real.webp`],
            prompt: `A dusty country road at the edge of the green woodland of the FIRST reference image, sunny afternoon.
- Centre-left, standing in the MIDDLE of the road: [QUIXOTE] on [ROCINANTE], lance raised high, chin up, proudly blocking the way, not moving an inch.
- Coming along the road from the right background, in a big golden-brown CLOUD OF DUST: a herd of big dark bulls trotting fast, seen mostly as a rumbling mass of horns, backs and dust (NOT aggressive faces, NO blood, NO one hurt), with two cowboys on horseback behind them waving their hats and shouting a warning.
- Left foreground, at the side of the road: [SANCHO] pulling [BURRICO] by the rope into the bushes, looking back at his master with wide worried eyes, one hand cupped to his mouth, shouting.
- Far left, at the edge of the trees: two of the young people dressed as shepherds (from the FIRST reference image) watching with hands on their cheeks.
- Tiny and far away on the top of a green hill in the background, half hidden among trees: [BRANCA_LUA] (exactly as the knight in the SECOND reference image), watching silently.
Comic tension, like a cartoon about to happen, never frightening, safe for children. No text.`
        },

        // #64 · P8 p.8 · Cap. 68: Rocinante deitado na areia (Realidade). A 1ª tentativa, como edição da arte antiga,
        // manteve o cavalo sentado; a 2ª é uma cena nova, com a Branca Lua copiada da capa
        {
            id: 'p8-p7-real', destino: `${P8}/p7-real.png`,
            refs: [`${P8}/p0-real.webp`, `${P5}/p6-real.webp`],
            prompt: `Sunny Mediterranean beach of Barcelona by a calm sparkling sea, soft morning light. COMPLETELY PEACEFUL AND SAFE: no violence, no injuries.
- Centre-left on the soft sand: skinny brown [ROCINANTE] LYING DOWN on the sand like a tired old horse resting in a meadow: belly on the sand, all four legs FOLDED UNDER HIS BODY, neck and head up, calm. (He is NOT sitting: a horse never sits like a dog.)
- Right next to the horse: [QUIXOTE] sitting on the sand, his lance lying on the sand beside him, unhurt, dignified, quietly gazing at the sky.
- Centre-right: [BRANCA_LUA] (exactly as the knight in the FIRST reference image) on his strong dark horse, holding his lance RAISED STRAIGHT UP TO THE SKY on purpose, bowing his helmeted head in quiet respect.
- Left, running across the sand with wide worried eyes: [SANCHO] and [BURRICO].
Tender, dignified, safe for children. No text.`
        },

        // ================ RODADA 2 (depende da rodada 1) ================

        // #60 · P7 p.11 · Cap. 61: as chaves voltam para o duque (Realidade, etapa 1)
        {
            id: 'p7-p10-real-chaves', destino: `${P7}/p10-real-chaves.png`,
            refs: [`${P7}/p10-real-palacio.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same palace hall, same windows and curtains, same camera, same characters), a moment later. ONLY THESE CHANGES:
- [SANCHO] is now STANDING UP, smiling happily and relieved, holding a small brown leather coin purse in one hand.
- The Duke now holds the iron ring with the three big keys in his hand, smiling kindly.
- The Duchess proudly lifts a little woven basket full of brown ACORNS (the present from Sancho's wife), showing it to everyone.
- Don Quixote smiles, his hand still on Sancho's shoulder; the steward with the notebook claps.
Warm, gentle, cheerful, safe for children. No text.`
        },

        // #65 · P8 p.3 (nova) · Cap. 63: A Boiada (Imaginação)
        {
            id: 'p8-p2-imag', destino: `${P8}/p2-imag.png`, imaginacao: true,
            refs: [`${P8}/p2-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P5}/p0-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- [QUIXOTE] becomes the GOLDEN KNIGHT on his noble WHITE STEED, lance raised high, standing heroically in the middle of a shining road.
- The herd of bulls in the dust becomes a grand fairytale PARADE OF ENCHANTED BULLS with GOLDEN HORNS and flower garlands, trotting inside a glittering golden cloud of stardust, with the two cowboys turned into storybook heralds blowing little trumpets (friendly, playful, NEVER scary).
- [SANCHO] in his sky-blue squire's tunic pulls his festively decorated donkey to the side, still shouting.
- The woodland becomes an emerald-and-violet fairytale forest; the distant knight on the hill gleams in pearl-white light.
Magical, funny, never scary. No text.`
        },

        // #66 · P8 p.8 · Cap. 68: o duelo ao luar (Imaginação)
        {
            id: 'p8-p7-imag', destino: `${P8}/p7-imag.png`, imaginacao: true,
            refs: [`${P8}/p7-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${P8}/p1-imag.webp`],
            prompt: `KEEP THE EXACT COMPOSITION, CAMERA ANGLE AND CHARACTER POSITIONS OF THE FIRST REFERENCE IMAGE.
- The beach becomes a magical moonlit fairytale shore: a deep violet-and-indigo sky full of stars, a huge glowing silver crescent moon above the sea, the waves shimmering silver and turquoise.
- [QUIXOTE] becomes the GOLDEN KNIGHT, sitting with dignity on the shining sand beside his noble WHITE STEED, who rests lying down beside him (NOT sitting like a dog), both unhurt and calm.
- The Knight of the White Moon becomes a radiant knight of pearl-white moonlight, his crescent-moon shield glowing softly, his lance raised high to the stars, bowing his head in deep respect.
- [SANCHO] in his sky-blue squire's tunic runs across the glittering sand with his festively decorated donkey.
Solemn, tender, magical, never scary, no violence. No text.`
        }
    ]
};
