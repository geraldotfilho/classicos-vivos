// Pedidos de arte da Parte 1 de Robin Hood (cenas restantes: p5-real, p8-real, p9-real), para tools/gerar-imagens.mjs.
// Estilo A: Gouache estilizado de floresta (inspiração Cartoon Saloon / Wolfwalkers).
export const P1 = 'robin-hood/imagens/parte-1';

export default {
    modelo: 'gemini-3.1-flash-image',
    estilo: `Expressive stylized forest gouache and soft charcoal/ink linework children's picture book illustration inspired by Cartoon Saloon / Wolfwalkers aesthetic: rhythmic geometric woodland shapes, layered emerald and moss greens, warm golden sunlight, rich approachable silhouettes, distinctly NOT loose watercolor. Warm, joyful, safe for 6-year-old children. STRICTLY NO text, NO letters, NO numbers, NO words, NO signatures anywhere in the image.`,
    estiloCamada: '',
    personagens: {
        ROBIN: 'Robin Hood: agile cheerful young man with tousled light-brown hair, moss-green woodland tunic, and pointed green cap with one bright red feather',
        MARIANA: 'Lady Mariana: diverse young Black woman with long braided dark hair, confident warm smile, emerald-green woodland outfit',
        JOAO: 'Little John (João Pequeno): very tall, broad-shouldered gentle bearded giant with short brown beard',
        GRILO: 'Grilo: short cheerful young boy with messy brown hair and a flour-dusted baker apron',
        MOLEIRO: 'the honest brown-skinned miller in a flour-dusted apron, father of Grilo, exactly as in the second reference image',
        XERIFE: 'the Sheriff of Nottingham: pompous middle-aged man in a heavy dark purple cloak, dark purple velvet cap, gold chain, sour expression, exactly as in the second reference image'
    },
    pedidos: [
        {
            id: 'p5-real',
            destino: `${P1}/p5-real.png`,
            refs: [`${P1}/p0-real.webp`, `${P1}/p1-real.webp`],
            prompt: `At dusk outside the open stone gate of a small village jailhouse beside Sherwood Forest:
- Heading joyfully toward the green woodland edge on the right, four figures dressed in leaf-green shirts run lightly: [ROBIN] (pointing red-feathered cap), [MARIANA], giant [JOAO] (wearing a green tunic and effortlessly carrying white flour sacks on one shoulder), and [GRILO] alongside his freed father [MOLEIRO] (smiling with relief while hugging a flour sack).
- At the open doorway on the left, [XERIFE] stamps his foot purple-red with anger while a guard next to him points toward Robin's red-feathered cap.
Warm twilight glow, safe and lively for children. No text.`
        },
        {
            id: 'p8-real',
            destino: `${P1}/p8-real.png`,
            refs: [`${P1}/p0-real.webp`, `${P1}/p1-real.webp`, `${P1}/p7-real.webp`],
            prompt: `Climax at the sunny Nottingham archery tournament field in front of cheering spectators in wooden stands!
- Prominent on one side stands a round straw archery target: right in its red center bullseye, a wooden arrow has been CLEANLY SPLIT DOWN THE MIDDLE from end to end by Robin's arrow!
- In the center, [ROBIN] (dressed in a plain brown traveler cloak with a RED HOOD pulled back from his grinning face, NO green clothes) holds a gleaming golden arrow prize in one hand and blows his golden hunting horn joyfully.
- Beside him, [MARIANA] (wearing a blue headscarf and plain dress as in the third reference image) tosses dozens of bright RED RIBBONS swirling high into the air, while [GRILO] blows a playful puff of white flour cloud making nearby guards sneeze in comical confusion, and giant [JOAO] (leather blacksmith apron) grins while clearing the path toward a low stone wall.
- On the side, [XERIFE] stands utterly slack-jawed in amazement.
Bright joyful action, safe for children. No text.`
        },
        {
            id: 'p9-real',
            destino: `${P1}/p9-real.png`,
            refs: [`${P1}/p0-real.webp`, `${P1}/p1-real.webp`],
            prompt: `Warm, glowing nighttime celebration beneath the massive Major Oak in Sherwood Forest, lit by dozens of golden lanterns hanging from the oak branches.
Around a long wooden feast table laden with warm loaves of bread, red apples, and a gleaming golden arrow resting in the center:
- [MOLEIRO] warmly hugs his happy little son [GRILO] tightly.
- [ROBIN], [MARIANA], and giant [JOAO] (all in green woodland outfits) smile joyfully around the table.
- On the forest path in the background on the left, a breathless villager runs quickly into the clearing waving urgently to bring news.
Warm lantern light, cozy storybook atmosphere. No text.`
        }
    ]
};
