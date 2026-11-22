// Sprites independentes de camadas para Robin Hood — Parte 1 (Pág. 11), para tools/gerar-imagens.mjs.
// Opção C: Diorama de Papel Recortado sobre fundo magenta puro #FF00FF.
export const P1C = 'robin-hood/imagens/parte-1/camadas';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo: '',
    estiloCamada: `Handcrafted 3D paper cut-out diorama illustration for a children's book, made of layered textured matte craft paper, construction paper and cotton paper fibers, visible paper thickness on cut edges, NO black ink outlines, NO comic book line art, tactile paper-craft aesthetic. Paper cut-out craft isolated on pure solid flat magenta background #FF00FF (no floor shadow outside the object, no white sticker border, STRICTLY NO text, NO letters, NO numbers).`,
    personagens: {},
    pedidos: [
        {
            id: 'p11-lanterna',
            camada: true,
            proporcao: '3:4',
            destino: `${P1C}/p11-lanterna.png`,
            prompt: `A cozy medieval hanging paper lantern suspended straight down from a short dark-brown paper cord at the very top edge, featuring a dark-brown paper frame and glowing warm golden-yellow craft paper panes, isolated on pure solid flat magenta background #FF00FF.`
        },
        {
            id: 'p11-fumaca-pao',
            camada: true,
            proporcao: '1:1',
            destino: `${P1C}/p11-fumaca-pao.png`,
            prompt: `Two gentle, whimsical rising curls of warm bread steam made of soft layered cream-white and pale-ivory cut paper ribbons swirling softly upward, completely isolated on pure solid flat magenta background #FF00FF.`
        }
    ]
};
