// Arte do capítulo novo da Parte 2 de Robin Hood (Cap. 17, pág. índice 6: o desempate de mais longe),
// pedido do autor nas Issues #80 e #81 (2026-11-28). API paga autorizada SÓ para esta arte, teto US$ 0,60, Batch.
// Uma ilustração PANORÂMICA bem comprida (4:1) para a câmera "andar" acompanhando a flecha da esquerda até o
// alvo distante, na direita. As flechas NÃO são pintadas: o livro desenha por cima (SVG) a do capitão e a de Robin.
// Estilo C (Diorama de Papel Recortado), o mesmo de tools/arte/robin-hood-parte-2.mjs, mas sem o "16:9" do estilo.
import base, { P2 } from './robin-hood-parte-2.mjs';

const estilo = base.estilo.replace('16:9 widescreen aspect ratio', 'ultra-wide panoramic 4:1 aspect ratio (a very long horizontal strip, like a theatre backdrop seen from the side)');

const comum = `ONE single continuous ultra-wide panoramic paper-diorama scene of the festive Nottingham medieval town square on archery tournament day, seen from the side like a long theatre stage, read from LEFT to RIGHT. Same paper-craft style, palette, characters and light as the reference images (full-bleed, NO outer frame border, NO panels, NO split screen, NO repeated characters).
- FAR LEFT (the first fifth of the picture), the shooting line: [ROBIN_DISF] standing in side view facing RIGHT, holding his simple wooden bow drawn and aiming far away to the RIGHT, but with NO arrow painted on the bow or the string (the arrow is added later by the book). Just in front of him, slightly to the right, the captain of the guards: a tall grey-armored guard with a short dark beard and a small red plume on his helmet, holding his longbow still raised toward the right right after a shot (string relaxed, no arrow on it), proudly watching the far right. Behind them, the raised wooden dais with [XERIFE] holding up the shiny Golden Arrow, flanked by two grey-armored guards, all peering to the right.
- MIDDLE (from one fifth to four fifths of the width): the long, long festive market square stretching into the distance: strings of red and golden pennant bunting, market stalls with striped awnings, baskets of fruit and bread, timber-framed houses with thatched roofs, a round stone well, banners on wooden poles. Genuinely plural and diverse townsfolk (women archers holding bows, women vendors, Black, brown/pardo, Indigenous, white, elderly people and children) stand in the lower part of the picture on both sides of a wide empty cobbled lane, all turning their heads to the RIGHT, shading their eyes, amazed. Their heads stay in the LOWER HALF of the picture. The middle horizontal band of the picture (from about 30% to 50% of the height, measured from the top) is open air with pale sky and soft distant hills, completely free of poles, banners or bunting, so a flying arrow drawn later stays clearly visible all the way across.
- FAR RIGHT (the last eighth of the picture), very far from the shooting line: ONE round woven straw archery target on a wooden stand, with coloured rings (golden yellow bullseye in the centre, then red, blue, white) facing the viewer, its centre at about 45% of the picture height, a bit smaller than the target in the reference to feel far away. CRITICAL: the target is EMPTY, with ABSOLUTELY NO arrows stuck in it and NO arrows anywhere in the air. A small judge in a brown tunic waits at a safe distance beside the target.
- STRICTLY ZERO green clothing on Robin. NO weapons pointed at people. NO text, NO letters, NO numbers.`;

export default {
    ...base,
    estilo,
    pedidos: [
        {
            id: 'p6-panorama-a',
            destino: `${P2}/p6-panorama.png`,
            refs: [`${P2}/p5-real.webp`, `${P2}/p4-real.webp`, `${P2}/p3-stage-3.webp`],
            proporcao: '4:1',
            tamanho: '2K',
            prompt: comum
        },
        {
            id: 'p6-panorama-b',
            destino: `${P2}/p6-panorama.png`,
            refs: [`${P2}/p5-panoramico.webp`, `${P2}/p5-real.webp`, `${P2}/p3-stage-3.webp`],
            proporcao: '4:1',
            tamanho: '2K',
            prompt: `${comum}
- Keep the same warm afternoon light and blue sky with soft paper clouds as the first reference image; the characters at the far left look exactly like the ones in the first and second reference images.`
        },
        // Rodada 2: a "b" foi a escolhida (céu azul como a p5, praça bem aberta, alvo vazio), mas veio com uma flecha
        // pintada no arco de Robin (o livro desenha a flecha que voa) e um retalho solto de pedras no chão.
        // Edição da própria "b" (ARTE-PELA-API §4.3, item 3), duas tentativas no mesmo lote.
        ...['p6-panorama-b2', 'p6-panorama-b3'].map(id => ({
            id,
            destino: `${P2}/p6-panorama.png`,
            refs: ['.cache-arte/robin-hood-parte-2-desempate/p6-panorama-b/2026-11-28T17-13-27.png'],
            proporcao: '4:1',
            tamanho: '2K',
            prompt: `Repaint the reference image EXACTLY as it is: the same ultra-wide 4:1 panorama, the same camera, the same layout, the same characters in the same places and poses, the same colours, sky, houses, stalls, crowd, well and archery target. Only TWO changes:
1. Robin Hood at the far left (brown traveller hat, wool beard, brown cloak) keeps holding his wooden bow raised and aimed to the right with his hands in the same place, but there is NO arrow at all on his bow or string: remove the arrow he is holding (the shaft, the golden arrowhead and the fletching between his hands). The arrows in his back quiver stay. The Sheriff keeps his own Golden Arrow.
2. Remove the loose patch of grey paving stones on the ground in front of the armored captain: the ground there is the same plain smooth sandy ground as the rest of the square.
Everything else stays identical. The archery target stays EMPTY, with NO arrows. NO text.`
        }))
    ]
};
