// Copia as fontes (subconjunto latin, que cobre todo o português) para assets/fonts
// e gera assets/css/fonts.css. Rode com: npm run build:fonts
import { copyFileSync, writeFileSync, mkdirSync } from 'node:fs';

const families = {
    Fredoka: { pkg: 'fredoka', weights: [400, 500, 600, 700] },
    Nunito: { pkg: 'nunito', weights: [400, 600, 700, 800, 900] }
};

mkdirSync('assets/fonts', { recursive: true });
let css = '/* Gerado por tools/build-fonts.mjs — não editar à mão. */\n';
for (const [family, { pkg, weights }] of Object.entries(families)) {
    for (const w of weights) {
        const file = `${pkg}-latin-${w}-normal.woff2`;
        copyFileSync(`node_modules/@fontsource/${pkg}/files/${file}`, `assets/fonts/${file}`);
        css += `@font-face{font-family:'${family}';font-style:normal;font-weight:${w};font-display:swap;src:url(../fonts/${file}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}\n`;
    }
}
writeFileSync('assets/css/fonts.css', css);
console.log('assets/css/fonts.css gerado');
