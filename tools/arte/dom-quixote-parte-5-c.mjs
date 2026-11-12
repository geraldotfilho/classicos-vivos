// Pedidos de arte do GRUPO C da Parte 5 de Dom Quixote (págs. 8 e 9: o leão), para tools/gerar-imagens.mjs.
// Fonte: docs/cadernos/dom-quixote-parte-5.md §4 e o texto de dom-quixote/parte-5.html.
// Rodadas: (1) p8-real + p9-real; (2) p8-imag, as 4 etapas (edições da p9-real aceita) e p9-imag; (3) só as refeitas.
import { P1, P4, P5, REF, estilo, estiloCamada, imaginacao, personagens, modelo } from './dom-quixote-parte-5-comum.mjs';

export default {
    modelo, estilo, estiloCamada, imaginacao, personagens,
    pedidos: [
        // ---------------- Pág. 8 · Cap. 41: um leão de verdade ----------------
        {
            id: 'p8-real', destino: `${P5}/p8-real.png`,
            refs: [`${P4}/p0-real.webp`],
            prompt: `A dusty country road in the late afternoon, golden light. The reference image is only for the style and for how [QUIXOTE] looks: he is the tall thin gentleman in worn silver armour with the shiny brass basin on his head.
COMPOSITION (important):
- On the RIGHT (from about 50% to 95% of the width), a wooden cart with colourful red-and-yellow royal flags on poles (a gift for the king). On the cart, a BIG strong cage made of thick wooden bars, with a small hinged door in its front, facing the LEFT, toward the middle of the road. Two patient oxen are harnessed to the cart. Inside the cage, [LEAO] lies sleepily, the door still closed.
- On TOP of the cart, above the cage (high up, safe from the lion), [TRATADOR] stands holding the wooden latch of the cage door with both hands, looking down nervously but bravely.
- In the CENTRE-LEFT of the road (from about 22% to 38% of the width), [QUIXOTE] stands ON FOOT (he is NOT on a horse, there is NO horse near him), tall and straight, brass basin on his head, a sword raised in his right hand, his chin up, a big proud determined look.
- Very small and far away in the LEFT background (no taller than one eighth of the picture height, running away along the road, with a little cloud of dust): [SANCHO] on [BURRICO], and behind them [DIEGO] on his dapple-grey mare (green coat) leading a skinny chestnut horse by the rein.
Funny and a little tense, but gentle and not scary. No text.`
        },
        {
            id: 'p8-imag', destino: `${P5}/p8-imag.png`, imaginacao: true,
            refs: [`${P5}/p8-real.webp`, `${REF}/dom-quixote-heroi-dourado.png`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `KEEP THE COMPOSITION OF THE FIRST REFERENCE IMAGE EXACTLY (the cart on the right, the cage, the keeper high on top of the cart, Don Quixote on foot in the middle of the road, the small figures far away on the left). The second and third reference images show ONLY the golden knight style (do not copy anything else from them).
Transformations:
- [QUIXOTE] on foot becomes the GOLDEN KNIGHT (gold armour, plumed helmet with open visor, crimson cape), standing in the same place and the same size, a golden sword raised, heroic. He is NOT on a horse.
- The cart becomes a golden royal carriage-wagon with silk banners; the cage becomes an ornate golden cage with swirling bars.
- The lion inside becomes a MAJESTIC fantasy beast: a huge lion with a MANE OF FLAMES (soft orange-and-gold fire that swirls like silk ribbons) and glowing amber eyes, noble and IMPOSING but NOT terrifying: mouth CLOSED, NO teeth showing, calm proud head held high, like a heraldic king of beasts.
- The keeper on top becomes a proud herald in a golden tunic, still holding the latch.
- The far-away figures stay EXACTLY TWO groups, tiny and in the same place as in the first reference (no taller than one eighth of the picture height): Sancho on his donkey and Don Diego in his green coat on his dapple-grey mare, both just in festive colours, in a soft glow of dust. NO carriage, NO king, NO crown, NO people in costume, NO other riders, and NO castle with people: only hills and a tiny distant castle at most; the road becomes sparkling gold, the sky violet and rose.
Fairytale, heroic, joyful, never scary.`
        },

        // ---------------- Pág. 9 · Cap. 42: o leão que bocejou ----------------
        {
            id: 'p9-real', destino: `${P5}/p9-real.png`,
            refs: [`${P5}/p8-real.webp`],
            prompt: `Repaint the FIRST reference image as the NEXT MOMENT of the same scene. KEEP EXACTLY: the camera, the road, the trees and hills, the cart with the cage and its royal shields, the two oxen, the keeper standing on top of the cart (but now holding the cage door's rope, wide-eyed), and [QUIXOTE] on foot at the same place and size, brass basin on his head, the same silver armour, a sword raised in his right hand (he holds ONLY the sword: no lance, no second weapon in his other hand, which hangs by his side).
CHANGES ONLY: (1) the small cage door on the front of the cage (the left side, facing Don Quixote) is now OPEN, swung wide; (2) [LEAO] has woken up: it stands in the open doorway of the cage, eyes OPEN, a sleepy, curious, lazy face, looking at Don Quixote; (3) REMOVE the small far-away figures on the left (no Sancho, no donkey, no Don Diego, no horses): the road behind is empty, only a little dust.
Funny and tense but gentle, not scary. No text.`
        },
        // As 4 etapas são EDIÇÕES da p9-real aceita (a câmera, a jaula, Dom Quixote e o tratador não mudam)
        ...[
            ['stage-1', 'the lion STRETCHES like a cat after a nap: front paws stretched far forward on the ground, chest low, rear end and tail up in the air, eyes half closed in pleasure, standing in the open doorway of the cage'],
            ['stage-2', 'the lion YAWNS an enormous, funny yawn: head tilted back, mouth wide open in a big round YAWN, eyes squeezed shut, tongue curled, a cartoonish sleepy face (comic and harmless, not a roar, not threatening), standing in the open doorway'],
            ['stage-3', 'the lion WASHES ITS FACE like a cat: it sits in the open doorway, one big paw licked and rubbed over its cheek and ear, its tongue out, eyes closed, adorable'],
            ['stage-4', 'the lion has TURNED AROUND to face the INSIDE of the cage: its head now points to the RIGHT, into the back of the cage, and its big furry rump and tail point toward Don Quixote (toward the LEFT, at the open door). It lies down curled up in the doorway with its back to Don Quixote, asleep and peaceful, we see its round furry back, its tail and a hind paw, and only a bit of its mane from behind. It must NOT face Don Quixote']
        ].map(([sufixo, pose]) => ({
            id: `p9-real-${sufixo}`, destino: `${P5}/p9-real-${sufixo}.png`,
            refs: [`${P5}/p9-real.webp`],
            prompt: `Repaint the FIRST reference image EXACTLY as it is: keep the camera, the cart, the cage, the flags, Don Quixote (same pose, same size, same place, sword raised), the keeper on top of the cart and the whole background EXACTLY the same. Change ONLY the lion's pose: ${pose}. The lion stays in the same place and about the same size. Do not add anyone or anything. Same style, no text.`
        })),
        {
            id: 'p9-imag', destino: `${P5}/p9-imag.png`, imaginacao: true,
            refs: [`${P5}/p9-real.webp`, `${REF}/leao-guardiao.png`, `${REF}/don-quixote-cavaleiro-dourado.png`],
            prompt: `KEEP THE COMPOSITION OF THE FIRST REFERENCE IMAGE (the cart and the open cage on the right, the keeper on top, Don Quixote on foot at centre-left). The second reference image is the GUARDIAN LION of this book (a golden, gentle lion with a small golden crown): copy its face and style.
Transformations:
- [QUIXOTE] becomes the GOLDEN KNIGHT (gold armour, red plume, crimson cape), on foot, standing in the same place, golden sword now held pointing upward in a salute, proud: the Knight of the Lions.
- The lion in the cage doorway becomes the GUARDIAN LION of the second reference, with its little golden crown, calm and noble, making a deep respectful BOW to the golden knight (front legs stretched, head lowered, eyes closed, smiling).
- The cart becomes a golden royal wagon with silk banners and the cage a golden ornate arch; golden confetti-like sparkles and petals float in the air; the keeper on top becomes a proud herald in a golden tunic, clapping.
- The road sparkles gold, the sky is violet and rose.
Fairytale, tender, joyful, never scary.`
        }
    ]
};
