// Gera assets/css/icons.css apenas com os ícones Phosphor realmente usados nos livros.
// Cada ícone vira uma máscara SVG embutida (sem fonte de ícones de ~150 KB).
// Mantém as classes originais (ex.: "ph-bold ph-arrow-left"), então o JS que troca
// className continua funcionando. Rode com: npm run build:icons
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { globSync } from 'node:fs';

const htmlFiles = [...globSync('*.html'), ...globSync('*/parte-*.html'), ...globSync('assets/js/*.js')];
const weights = ['bold', 'fill'];
const names = new Set();
for (const f of htmlFiles) {
    for (const [, name] of readFileSync(f, 'utf8').matchAll(/\bph-([a-z0-9-]+)/g)) {
        if (!weights.includes(name)) names.add(name);
    }
}

let css = '/* Gerado por tools/build-icons.mjs — não editar à mão. Ícones: Phosphor (MIT). */\n';
css += '.ph-bold,.ph-fill{display:inline-block;width:1em;height:1em;flex-shrink:0;vertical-align:-0.125em;background-color:currentColor;-webkit-mask:var(--ph) center/contain no-repeat;mask:var(--ph) center/contain no-repeat;}\n';
for (const name of [...names].sort()) {
    for (const w of weights) {
        const file = `node_modules/@phosphor-icons/core/assets/${w}/${name}-${w}.svg`;
        if (!existsSync(file)) continue;
        const svg = readFileSync(file, 'utf8').replace(/\s+/g, ' ').trim();
        css += `.ph-${w}.ph-${name}{--ph:url("data:image/svg+xml,${encodeURIComponent(svg)}");}\n`;
    }
}
writeFileSync('assets/css/icons.css', css);
console.log(`assets/css/icons.css gerado com ${names.size} ícones`);
