// Base comum das listas de arte da Parte 5 de Dom Quixote (caps. 34 a 42), para tools/gerar-imagens.mjs.
// A arte da Parte 5 foi produzida em paralelo, em três listas (uma por subagente, 2026-11-12):
//   dom-quixote-parte-5-a.mjs  → págs. 0, 1, 3, 4 (capa, quarto, partida, carroça dos atores)
//   dom-quixote-parte-5-b.mjs  → págs. 2, 5, 6, 7 (Sansão, o bosque, o duelo, o requeijão; camadas p6-elmo e p6-narigao)
//   dom-quixote-parte-5-c.mjs  → págs. 8, 9 (o leão e as 4 etapas)
// Fonte: docs/cadernos/dom-quixote-parte-5.md §4 e o texto de dom-quixote/parte-5.html.
import { P1, P2, REF, estilo, estiloCamada, imaginacao, personagens as base } from './dom-quixote-comum.mjs';

export { P1, P2, REF, estilo, estiloCamada, imaginacao };
export const P3 = 'dom-quixote/imagens/parte-3';
export const P4 = 'dom-quixote/imagens/parte-4';
export const P5 = 'dom-quixote/imagens/parte-5';

// Fichas: as do volume 1 + os personagens novos do segundo volume.
// Sansão e Dom Diego voltam nas Partes 6 a 8: depois de aprovados, recorte-os para
// dom-quixote/biblioteca/referencias/personagens/ (ARTE-PELA-API §4.3).
export const personagens = {
    ...base,
    QUIXOTE_CASA: "Don Quixote at home in bed, without armour: the same long thin face, white hair, long curled white mustache and pointed white goatee, wearing a green wool waistcoat over a white nightshirt and a little red knitted night cap",
    SANSAO: "Sansón Carrasco: a young village student of about twenty-four, SHORT and stocky, with a ROUND moon face, a small FLAT snub nose, rosy cheeks, short curly chestnut hair and a cheeky, mischievous grin; he wears a black university student's gown over a dark doublet with a small white collar",
    TOME: "Tomé Cecial, Sancho's neighbour from the village: a lanky peasant with a long friendly face, big ears, a straw-coloured beard stubble, a brown felt cap and a patched green tunic",
    NARIGAO: "a HUGE fake nose made of purple-painted cardboard with warts, as big as a cucumber, tied behind the head with a string",
    ESPELHOS: "a knight's armour completely covered with dozens of small round shiny mirrors that sparkle like little moons",
    DIEGO: "Don Diego de Miranda, the Knight of the Green Coat: a calm, kind Spanish gentleman of about fifty with a short grey beard, a dark green coat with velvet trim, a green cap with a feather, riding a dapple-grey mare",
    TRATADOR: "the lion keeper: a sturdy, sunburnt man with a big black moustache, a red cap and a leather apron, worried but brave",
    LEAO: "a big, real, sleepy African lion with a thick tawny-golden mane, heavy-lidded drowsy eyes and enormous soft paws: impressive but calm and almost lazy, never snarling",
    GATO: "the little orange tabby cat of Don Quixote's house"
};

export const modelo = 'gemini-3.1-flash-image';
