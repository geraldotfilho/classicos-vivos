// Pedidos de arte das revisões do autor de 2026-11-19 (Issues #52 e #54), para tools/gerar-imagens.mjs.
// - #52: P6 p.3 (cap. 44) — tirar o animal inteiro assando no espeto (perturbador para crianças).
// - #54: P7 p.5 (cap. 55) — a bengala nas mãos do aldeão enquanto o vizinho jura (como em Cervantes, II-45);
//        e a cena da página nova (cap. 56, o caso da ponte, II-51).
import { REF, estilo, estiloCamada, imaginacao, personagens as base, modelo } from './dom-quixote-parte-5-comum.mjs';

export const P6 = 'dom-quixote/imagens/parte-6';
export const P7 = 'dom-quixote/imagens/parte-7';

const personagens = {
    ...base,
    SANCHO_GOV: "Sancho Panza as governor: a short, round, rosy-cheeked man with a round friendly CLEAN-SHAVEN face (NO beard), a brown hat, a long blue-grey governor's robe with a red sash and a golden chain medallion on his chest, exactly as in the first reference image",
    MORDOMO: "the steward (mordomo): a tall slim man with a short black beard and moustache, dressed in a black doublet, black breeches and tall boots, holding a small notebook and a pencil, exactly like the man with the notebook on the right of the reference image of the banquet"
};

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // #52 · P6 p.3 · Cap. 44: A Festa das Panelas (Realidade) — edição da arte aprovada
        {
            id: 'p6-p2-real', destino: `${P6}/p2-real.png`,
            refs: [`${P6}/p2-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same camera, same layout, same trees, bunting, dancers, the cook, Sancho, Don Quixote, the young student, the cheeses, the breads and the big cauldron in the foreground), with ONLY ONE CHANGE:
- In the background, REMOVE COMPLETELY the whole roasted animal hanging on the spit over the campfire. NO animal, NO carcass, NO spit with meat anywhere in the picture.
- In its place, over the same small campfire, put a row of three big round copper cooking pots on an iron tripod, with cheerful white steam curling up from them, and a long wooden table nearby piled with round loaves of bread and baskets of red apples and grapes.
The only cooked food visible stays the golden chickens in the pot the cook is handing to Sancho. Warm, festive, friendly for small children. No text.`
        },

        // #54 · P7 p.5 · Cap. 55: O Julgamento Mais Esperto (Realidade) — edição da arte aprovada
        {
            id: 'p7-p4-real', destino: `${P7}/p4-real.png`,
            refs: [`${P7}/p4-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is (same courtroom, same wooden floor and benches, same villagers sitting on both sides, Sancho the governor on his carved wooden chair in the centre, the same two old men), with ONLY THESE CHANGES:
1. The bald old man with the white beard on the LEFT is no longer pointing: he now holds, with BOTH hands, a THICK, sturdy, straight WOODEN WALKING CANE (a heavy brown wooden stick with a rounded knob handle, as tall as his chest), standing it upright on the floor in front of him. His hands clearly grip the cane (it does not float). He looks at it a little puzzled, as if someone has just handed it to him.
2. The old man with long grey hair on the RIGHT keeps his hand on his chest, swearing solemnly, with a slightly sly little smile; his other hand is empty and open, as if he has just handed over the cane.
3. The floor in the centre, in front of Sancho's platform, stays clear (no objects on it).
Only ONE cane in the whole picture. Warm, funny, safe for children. No text.`
        },

        // #54 · P7 p.6 (nova) · Cap. 56: A Ponte da Pergunta Difícil (Realidade) — mesmo tribunal
        {
            id: 'p7-p5-real', destino: `${P7}/p5-real.png`,
            refs: [`${P7}/p4-real.webp`, `${P7}/p3-real.webp`],
            prompt: `The SAME village courtroom as in the FIRST reference image (same white walls, wooden ceiling beams, windows and wooden floor), late afternoon golden light coming through the windows.
- In the CENTRE: [SANCHO_GOV] sitting on the same carved wooden chair on the low platform, both arms stretched out to the sides with the palms open and facing up, like the two pans of a weighing scale, his head tilted, eyes half closed, thinking hard with a gentle, wise smile.
- On the LEFT: a cheerful young traveller with a dusty wide-brimmed hat, a travelling cloak and a walking staff, standing and pointing to a big hand-drawn picture pinned on the wall behind him.
- The big picture on the wall (a large sheet of paper, simple childlike drawing in ink and colour): a blue river, a little stone bridge over it, two puzzled guards on the bridge, and at one end of the bridge a tiny jail house with barred window. NO letters or words on it.
- On the RIGHT: [MORDOMO] (copy him from the SECOND reference image), scratching his head with his pencil, his little notebook open in the other hand, looking completely confused.
- A few villagers on the benches at the sides, leaning forward with their mouths open, curious.
Warm, funny, calm, safe for children. No text, no letters anywhere.`
        }
    ]
};
