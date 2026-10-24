// Estilo, fichas de personagens e bíblia da Imaginação comuns às Partes 3 e 4 de Dom Quixote
// (tools/gerar-imagens.mjs). Lições da Parte 2: docs/ARTE-PELA-API.md §4.
export const P1 = 'dom-quixote/imagens';
export const P2 = 'dom-quixote/imagens/parte-2';
export const REF = 'dom-quixote/biblioteca/referencias/personagens';

export const estilo = "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, rich storybook textures, 16:9 landscape aspect ratio, no text, letters or words anywhere in the image. Match the style, line work and character designs of the reference illustrations exactly (they are earlier pages of the same book).";

export const estiloCamada = "Warm, whimsical children's picture book watercolor and soft gouache illustration with gentle colored-pencil outlines, same style, palette and line work as the reference illustration (an earlier page of the same book). This is a separate cut-out element (a sprite) for an interactive book: paint ONLY the element, isolated on a perfectly flat, uniform, pure magenta background (#FF00FF, chroma key), with crisp clean edges directly against the magenta: NO white outline, NO sticker border, no glow around the element. No ground, no floor patch, no grass under it, no cast shadow on the background, no frame, no border, no text. Do not use magenta or pink anywhere inside the element.";

// Bíblia da Imaginação (vale para todo pedido com `imaginacao: true`). Exceções vêm no prompt da página.
export const imaginacao = `THIS IS AN IMAGINATION PAGE. The FIRST reference image is the REALITY version of this very page. Repaint the same page as it is seen in the imagination (Don Quixote's, unless the page says otherwise), like the earlier imagination pages of this book (the other reference images).
KEEP from the reality version ONLY: the camera angle, the overall layout, the place, size and pose of each character.
TRANSFORM EVERYTHING ELSE. Mandatory character transformations (whenever the character is in the page):
- DON QUIXOTE becomes the GOLDEN KNIGHT of the reference images: gleaming polished gold plate armour with engraved filigree, a golden knight's helmet with an open visor and a tall red plume, a long flowing crimson cape, and a golden lance with a red pennant (or a golden sword when the page says so). His face stays the same (long thin face, curled white mustache, pointed white goatee). Nothing of his real look may remain: NO rusty grey armour, NO brass barber's basin, NO nightshirt, NO wooden pole.
- ROCINANTE becomes a noble WHITE STEED with a flowing silvery-white mane and tail, a crimson and gold caparison with tassels and a red bridle with gold studs. NO skinny brown horse.
- SANCHO PANZA stays recognisable (same round rosy face, dark hair, brown flat cap, round body) but is the knight's proud faithful squire: a sky-blue squire's tunic with gold trim over his white shirt and a small round shield on his back. His grey donkey wears a festive red-and-gold saddle blanket with tassels.
- Ordinary people become storybook characters, as described below.
- Only the characters and animals that are in the reality version appear: do NOT add Sancho's donkey, the white steed, the golden knight or anyone else who is not there (unless the page asks for it).
The world becomes a fairytale: richer, more luminous colours (gold, violet, rose, turquoise), soft sparkles of magic light, and the specific transformations described below. Same watercolour style. Heroic, joyful and tender, never scary.`;

// Fichas da Realidade (inseridas quando o prompt cita [NOME])
export const personagens = {
    QUIXOTE: "Don Quixote: a very tall, very thin elderly Spanish gentleman with a long narrow face, kind eyes, white swept-back hair, a long curled white mustache and a pointed white goatee, a funny little gap of two missing front teeth when he smiles; worn, scratched silver plate armour over a faded red tunic; on his head the barber's big, very shiny brass shaving basin worn as a helmet, a little crooked (as in the reference); his lance is a long dry wooden pole",
    QUIXOTE_CAMISOLAO: "Don Quixote without armour, in a long white cotton nightshirt down to his knees, skinny bare legs and bare feet, the same long thin face, white hair, curled white mustache and pointed white goatee",
    SANCHO: "Sancho Panza: a short, round, rosy-cheeked peasant with a round friendly face and dark hair, a brown flat cap, a brown wool vest over a white shirt, a red sash and brown breeches",
    ROCINANTE: "Rocinante: Don Quixote's skinny, bony chestnut-brown horse with a long dark mane",
    BURRICO: "Sancho's small grey donkey with a pale muzzle and long ears",
    PADRE: "Father Pero Pérez: a kind round-faced village priest in his fifties with a black cassock, small round spectacles and a warm smile",
    BARBEIRO: "Master Nicholas, the village barber: a lanky cheerful man with a thin black mustache, in a simple grey doublet",
    DOROTEIA: "Dorothea: a clever, brave young Andalusian woman with long dark braided hair and bright eyes",
    ESTALAJADEIRO: "the innkeeper: a stout bald man with bushy eyebrows, a white apron and a red sash",
    SOBRINHA: "Antonia, Don Quixote's niece: a sweet twenty-year-old with chestnut hair in a bun and an apron",
    GOVERNANTA: "the housekeeper: a plump motherly woman of forty with a white cap",
    TERESA: "Teresa Panza, Sancho's wife: warm-hearted, sturdy and rosy, with a headscarf",
    SANCHICA: "Sanchica, their lively little daughter of about eight, with two braids",
    DUQUES: "the Duke and Duchess: an elegant, playful Spanish duke and duchess in rich velvet clothes of the early 1600s, smiling mischievously",
    ALONSO: "Alonso Quixano (Don Quixote at home, without armour): the same long thin face, white hair, curled white mustache and white goatee, in a comfortable brown house robe, serene and kind"
};
