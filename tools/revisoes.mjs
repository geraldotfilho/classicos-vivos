// Lista pedidos de revisão do autor (`revisao-autor`) e sugestões de leitores (`sugestao-leitor`)
// abertos nas Issues do GitHub. Funciona com ou sem `npm install` e atrás de proxy (HTTP(S)_PROXY).
// Uso:
//   npm run revisoes                      (mostra revisao-autor e resumo de sugestao-leitor)
//   npm run revisoes -- --todas           (mostra o corpo completo de ambos os tipos)
//   npm run revisoes -- --leitores        (mostra apenas sugestao-leitor)

import { execFileSync } from 'node:child_process';

const OWNER = process.env.GITHUB_OWNER || 'geraldotfilho';
const REPO = process.env.GITHUB_REPO || 'classicos-vivos';
const args = new Set(process.argv.slice(2));
const mostrarTodas = args.has('--todas');
const soLeitores = args.has('--leitores');

async function configurarProxy() {
    if (!process.env.HTTPS_PROXY && !process.env.HTTP_PROXY && !process.env.https_proxy && !process.env.http_proxy) {
        return undefined;
    }
    try {
        const { EnvHttpProxyAgent } = await import('undici');
        return new EnvHttpProxyAgent();
    } catch {
        return undefined;
    }
}

async function fetchJsonComFallback(url, headers, dispatcher) {
    try {
        const res = await fetch(url, { headers, ...(dispatcher ? { dispatcher } : {}) });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
        return await res.json();
    } catch (err) {
        // Fallback para curl (respeita HTTP_PROXY/HTTPS_PROXY nativamente mesmo sem undici instalado)
        const curlArgs = ['-fsSL', '-H', 'Accept: application/vnd.github+json', '-H', 'User-Agent: classicos-vivos-tools'];
        if (process.env.GITHUB_TOKEN) curlArgs.push('-H', `Authorization: Bearer ${process.env.GITHUB_TOKEN}`);
        curlArgs.push(url);
        try {
            const out = execFileSync('curl', curlArgs, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
            return JSON.parse(out);
        } catch {
            throw err;
        }
    }
}

async function buscarIssues(label, dispatcher) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=100`;
    const headers = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'classicos-vivos-tools'
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const lista = await fetchJsonComFallback(url, headers, dispatcher);
    return Array.isArray(lista) ? lista.filter(i => !i.pull_request) : [];
}

function imprimirIssues(titulo, issues, comCorpo) {
    console.log(`\n=== ${titulo} (${issues.length}) ===`);
    if (!issues.length) {
        console.log('Nenhuma issue aberta.');
        return;
    }
    for (const iss of issues) {
        const labels = (iss.labels || []).map(l => l.name).join(', ');
        console.log(`\n#${iss.number} · ${iss.title}`);
        console.log(`Labels: ${labels} | Data: ${iss.created_at} | ${iss.html_url}`);
        if (comCorpo && iss.body) {
            console.log('---');
            console.log(iss.body.trim());
        }
    }
}

try {
    const dispatcher = await configurarProxy();
    if (!soLeitores) {
        const autor = await buscarIssues('revisao-autor', dispatcher);
        imprimirIssues('🔑 REVISÕES DO AUTOR (prioritárias)', autor, true);
    }
    const leitores = await buscarIssues('sugestao-leitor', dispatcher);
    imprimirIssues('💬 SUGESTÕES DE LEITORES (terceiros)', leitores, soLeitores || mostrarTodas);
} catch (err) {
    console.error('Erro ao consultar revisões no GitHub:', err.message);
    process.exit(1);
}
