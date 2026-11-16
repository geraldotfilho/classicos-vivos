import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Configura cabeçalhos CORS permitindo o site oficial no GitHub Pages,
 * a própria origem Vercel e ambientes locais de desenvolvimento.
 */
export function aplicarCors(req, res) {
    const origin = req.headers.origin || '';
    const extras = (process.env.ALLOWED_ORIGINS || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const permitida =
        origin === 'https://geraldotfilho.github.io' ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) ||
        extras.includes(origin);

    if (permitida && origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', 'https://geraldotfilho.github.io');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Autor-Chave');
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return true;
    }
    return false;
}

/** Envia resposta JSON padronizada. */
export function responderJson(res, status, dados) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(dados));
}

/** Lê e faz parse do corpo JSON com limite de 64 KB. */
export async function lerJson(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    const chunks = [];
    let total = 0;
    for await (const chunk of req) {
        total += chunk.length;
        if (total > 65536) throw new Error('PAYLOAD_GRANDE');
        chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString('utf8').trim();
    if (!raw) return {};
    return JSON.parse(raw);
}

/** Compara em tempo constante a chave enviada com AUTHOR_KEY do ambiente. */
export function ehAutorValido(chaveRecebida) {
    const esperada = process.env.AUTHOR_KEY || '';
    if (!esperada || typeof chaveRecebida !== 'string' || !chaveRecebida) return false;
    const a = createHash('sha256').update(chaveRecebida).digest();
    const b = createHash('sha256').update(esperada).digest();
    return timingSafeEqual(a, b);
}

/** Gera hash anônimo do IP do requisitante para controle de taxa sem armazenar IPs brutos. */
export function ipHash(req) {
    const fwd = req.headers['x-forwarded-for'];
    const ip = (Array.isArray(fwd) ? fwd[0] : (fwd || '')).split(',')[0].trim() || req.socket?.remoteAddress || 'anon';
    const sal = process.env.AUTHOR_KEY || 'classicos-vivos';
    return createHash('sha256').update(`${ip}:${sal}`).digest('hex').slice(0, 24);
}
