#!/usr/bin/env node
/* Samambaia de papel recortado (SVG) que esconde o Grilo nas Págs. 5 e 6 de Robin Hood, Parte 1
   (Issue #77, pedido do autor: o texto diz que Grilo se esconde atrás de uma samambaia e a
   ilustração não mostrava isso).

   Gera os dois data-URIs SVG usados nos ::before (folhas de trás, mais escuras) e ::after
   (folhas da frente, mais claras) das camadas `c-samambaia-p5` e `c-samambaia-p6` do
   `robin-hood/parte-1.html`. As coordenadas estão em pixels da ilustração (1376 × 768),
   dentro da caixa CAIXA abaixo; a camada no HTML ocupa exatamente essa caixa (x, y, w, h em %).

   Uso: node tools/arte/robin-hood-parte-1-samambaia.mjs   → imprime os dois url("data:...")
   Sem API, sem rede: é só geometria. */

// Caixa da camada em pixels da ilustração (a base das folhas fica perto do pé da caixa)
export const CAIXA = { x0: 1010, y0: 330, x1: 1270, y1: 570 };
const BASE = [1140, 556];
const ESCALA = 2; // viewBox em meios-pixels, para usar só inteiros sem perder precisão

// Cada folha: ponta, ponto de controle da curva (quadrática a partir da BASE), tamanho do folíolo e cor
const FUNDO = [
    { ponta: [1062, 392], ctrl: [1086, 470], folha: 30, cor: '#566B2B' },
    { ponta: [1128, 384], ctrl: [1116, 462], folha: 31, cor: '#4D6126' },
    { ponta: [1196, 378], ctrl: [1180, 462], folha: 31, cor: '#566B2B' },
    { ponta: [1254, 442], ctrl: [1214, 506], folha: 26, cor: '#4D6126' },
    { ponta: [1028, 472], ctrl: [1076, 530], folha: 24, cor: '#566B2B' },
    { ponta: [1164, 370], ctrl: [1152, 460], folha: 30, cor: '#5E7431' },
    { ponta: [1064, 512], ctrl: [1100, 546], folha: 20, cor: '#4D6126' },
    { ponta: [1226, 506], ctrl: [1188, 544], folha: 20, cor: '#4D6126' }
];
const FRENTE = [
    { ponta: [1046, 446], ctrl: [1090, 516], folha: 24, cor: '#8A9744' },
    { ponta: [1258, 482], ctrl: [1214, 530], folha: 22, cor: '#8A9744' },
    { ponta: [1092, 398], ctrl: [1112, 482], folha: 28, cor: '#97A34F' },
    { ponta: [1222, 412], ctrl: [1190, 486], folha: 28, cor: '#97A34F' },
    { ponta: [1170, 377], ctrl: [1150, 466], folha: 30, cor: '#99A550' },
    { ponta: [1118, 432], ctrl: [1126, 502], folha: 21, cor: '#8A9744' },
    { ponta: [1034, 526], ctrl: [1088, 552], folha: 19, cor: '#7F8D3D' },
    { ponta: [1252, 520], ctrl: [1198, 550], folha: 19, cor: '#7F8D3D' }
];

const q = (p0, c, p1, t) => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]
];
const dq = (p0, c, p1, t) => [
    2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]),
    2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])
];
const norm = (v) => { const m = Math.hypot(v[0], v[1]) || 1; return [v[0] / m, v[1] / m]; };
const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
// Pixels da ilustração → unidades do viewBox (inteiros)
const u = ([x, y]) => [Math.round((x - CAIXA.x0) * ESCALA), Math.round((y - CAIXA.y0) * ESCALA)];

function folha({ ponta, ctrl, folha: tam, cor }, veio) {
    const comp = Math.hypot(ponta[0] - BASE[0], ponta[1] - BASE[1]);
    const passos = Math.max(6, Math.round(comp / (tam * 0.34)));
    let d = '';
    for (let k = 0; k <= passos; k++) {
        const t = 0.16 + (0.975 - 0.16) * (k / passos);
        const p = q(BASE, ctrl, ponta, t);
        const tg = norm(dq(BASE, ctrl, ponta, t));
        // Folíolos maiores no meio, afinando para a ponta (como as samambaias do cenário)
        const L = tam * Math.pow(1 - t, 0.55) * (0.6 + 0.4 * Math.min(1, (t - 0.16) / 0.2)) * 1.15;
        const w = L * 0.3;
        for (const lado of [-1, 1]) {
            const dir = rot(tg, lado * (Math.PI / 180) * 58);
            const nn = [-dir[1], dir[0]];
            const pt = (a, b) => [p[0] + dir[0] * L * a + nn[0] * w * b, p[1] + dir[1] * L * a + nn[1] * w * b];
            const [a0, a1, a2, a3, a4, a5] = [pt(0.3, 1), pt(0.78, 0.55), pt(1, 0), pt(0.78, -0.55), pt(0.3, -1), p].map(u);
            d += `M${a5}C${a0} ${a1} ${a2}C${a3} ${a4} ${a5}Z`;
        }
    }
    const caule = [BASE, ctrl, ponta].map(u);
    const caminho = `<path d='${d.replace(/,/g, ' ').replace(/ -/g, '-')}' fill='${cor}'/>`;
    const haste = `<path d='M${caule[0]}Q${caule[1]} ${caule[2]}' fill='none' stroke='${cor}' stroke-width='6' stroke-linecap='round'/>`;
    const nervura = veio ? `<path d='M${caule[0]}Q${caule[1]} ${caule[2]}' fill='none' stroke='${veio}' stroke-width='2' stroke-linecap='round' opacity='0.7'/>` : '';
    return (haste + caminho + nervura).replace(/,/g, ' ');
}

function svg(folhas, veio) {
    const W = (CAIXA.x1 - CAIXA.x0) * ESCALA, H = (CAIXA.y1 - CAIXA.y0) * ESCALA;
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='none'>${folhas.map(f => folha(f, veio)).join('')}</svg>`;
}

const dataUri = (s) => `url("data:image/svg+xml,${s.replace(/%/g, '%25').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23').replace(/"/g, '%22')}")`;

export const fundo = dataUri(svg(FUNDO, '#3F5220'));
export const frente = dataUri(svg(FRENTE, '#6E7B33'));

if (import.meta.url === `file://${process.argv[1]}`) {
    const pct = {
        x: ((CAIXA.x0 + CAIXA.x1) / 2 / 1376 * 100).toFixed(2),
        // a ilustração 1376×768 fica em object-contain no quadro 16:9: sobra 0,39% em cima e embaixo
        y: (0.3876 + CAIXA.y1 / 768 * 99.225).toFixed(2),
        w: ((CAIXA.x1 - CAIXA.x0) / 1376 * 100).toFixed(2),
        h: ((CAIXA.y1 - CAIXA.y0) / 768 * 99.225).toFixed(2)
    };
    console.log(`/* camada: x ${pct.x}, y ${pct.y}, w ${pct.w}, h ${pct.h} */`);
    console.log(`/* fundo (${fundo.length} caracteres) */\n${fundo}`);
    console.log(`/* frente (${frente.length} caracteres) */\n${frente}`);
}
