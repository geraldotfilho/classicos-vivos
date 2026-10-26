// Converte a narração entregue pelo Gemini (WAV, ou PCM bruto .pcm 24 kHz 16 bits mono, que é a
// saída do modelo de voz) em MP3 leve para o tablet, e apaga o original.
// - Corta o silêncio do começo e do fim (deixa 80 ms), para as frases emendarem com ritmo natural.
// - Mono, 48 kbps: ~6 KB por segundo de fala.
// - Aplica gate de ruído nas pausas (audio_gate.py) para silêncio cristalino.
// Uso: npm run build:audio            (todos os livros: <livro>/audio/**/*.wav|.pcm)
//      node tools/otimizar-audio.mjs arquivo.wav ...
import { readFileSync, writeFileSync, unlinkSync, globSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Mp3Encoder } from '@breezystack/lamejs';

const KBPS = 48;
const MARGEM_MS = 80;
const LIMIAR = 500; // amplitude (de 32767) abaixo da qual consideramos silêncio
const FADE_MS = 10; // rampa suave de 10 ms nas pontas para eliminar cliques e ruído de corte

function aplicarFade(amostras, taxa, duracaoMs = FADE_MS) {
    const n = Math.min(Math.round(taxa * duracaoMs / 1000), Math.floor(amostras.length / 2));
    if (n <= 0) return amostras;
    const resultado = new Int16Array(amostras);
    for (let i = 0; i < n; i++) {
        const fator = 0.5 * (1 - Math.cos(Math.PI * i / n));
        resultado[i] = Math.round(resultado[i] * fator);
        resultado[resultado.length - 1 - i] = Math.round(resultado[resultado.length - 1 - i] * fator);
    }
    return resultado;
}

function lerWav(buf) {
    if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') throw new Error('não é WAV');
    let pos = 12, fmt = null, dados = null;
    while (pos + 8 <= buf.length) {
        const id = buf.toString('ascii', pos, pos + 4);
        const tam = buf.readUInt32LE(pos + 4);
        if (id === 'fmt ') fmt = { canais: buf.readUInt16LE(pos + 10), taxa: buf.readUInt32LE(pos + 12), bits: buf.readUInt16LE(pos + 22), formato: buf.readUInt16LE(pos + 8) };
        if (id === 'data') dados = buf.subarray(pos + 8, pos + 8 + tam);
        pos += 8 + tam + (tam % 2);
    }
    if (!fmt || !dados) throw new Error('WAV sem fmt/data');
    if (fmt.formato !== 1 || fmt.bits !== 16) throw new Error(`WAV precisa ser PCM 16 bits (veio formato ${fmt.formato}, ${fmt.bits} bits)`);
    const total = dados.length / 2;
    const amostras = new Int16Array(dados.buffer.slice(dados.byteOffset, dados.byteOffset + total * 2));
    // Mistura para mono se vier estéreo
    if (fmt.canais === 1) return { taxa: fmt.taxa, mono: amostras };
    const mono = new Int16Array(total / fmt.canais);
    for (let i = 0; i < mono.length; i++) {
        let soma = 0;
        for (let c = 0; c < fmt.canais; c++) soma += amostras[i * fmt.canais + c];
        mono[i] = soma / fmt.canais;
    }
    return { taxa: fmt.taxa, mono };
}

function lerPcm(buf) {
    return { taxa: 24000, mono: new Int16Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + (buf.length & ~1))) };
}

function aparar({ taxa, mono }) {
    let ini = 0, fim = mono.length - 1;
    while (ini < fim && Math.abs(mono[ini]) < LIMIAR) ini++;
    while (fim > ini && Math.abs(mono[fim]) < LIMIAR) fim--;
    const margem = Math.round(taxa * MARGEM_MS / 1000);
    const cortado = mono.subarray(Math.max(0, ini - margem), Math.min(mono.length, fim + margem));
    return aplicarFade(cortado, taxa);
}

function paraMp3(taxa, mono) {
    const enc = new Mp3Encoder(1, taxa, KBPS);
    const partes = [];
    for (let i = 0; i < mono.length; i += 1152) partes.push(enc.encodeBuffer(mono.subarray(i, i + 1152)));
    partes.push(enc.flush());
    return Buffer.concat(partes.map(p => Buffer.from(p.buffer, p.byteOffset, p.length)));
}

const alvos = process.argv.slice(2).length ? process.argv.slice(2) : globSync('*/audio/**/*.{wav,pcm}');
let ok = 0;
for (const arq of alvos) {
    try {
        const buf = readFileSync(arq);
        const audio = arq.endsWith('.pcm') ? lerPcm(buf) : lerWav(buf);
        const mono = aparar(audio);
        const mp3 = paraMp3(audio.taxa, mono);
        const destino = arq.replace(/\.(wav|pcm)$/, '.mp3');
        writeFileSync(destino, mp3);
        unlinkSync(arq);
        try {
            const gateScript = join(dirname(fileURLToPath(import.meta.url)), 'audio_gate.py');
            execFileSync('python', [gateScript, destino], { stdio: 'ignore' });
        } catch (e) {}
        ok++;
        console.log(`${arq} → ${destino} (${(mono.length / audio.taxa).toFixed(1)} s, ${Math.round(mp3.length / 1024)} KB)`);
    } catch (e) {
        console.error(`ERRO em ${arq}: ${e.message}`);
        process.exitCode = 1;
    }
}
console.log(`${ok} arquivo(s) convertido(s).`);
