import { aplicarCors, ehAutorValido, ipHash, lerJson, responderJson } from '../lib/http.js';
import { verificarRateLimit } from '../lib/supabase.js';

function limparTexto(val, max = 3000) {
    return String(val || '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

function montarArquivoTraducao(arquivoHtml, idioma) {
    if (!arquivoHtml || !idioma || idioma === 'pt-BR') return null;
    const m = arquivoHtml.match(/^([^/]+)\/parte-(\d+)\.html$/);
    if (!m) return null;
    return `${m[1]}/traducoes/parte-${m[2]}.${idioma}.js`;
}

function montarCorpoIssue(dados, ehAutor) {
    const origem = ehAutor ? '🔑 **Revisão do Autor** (pedido direto)' : '💬 **Sugestão de Leitor** (terceiro)';
    const arqTrad = montarArquivoTraducao(dados.arquivo, dados.idioma);
    const query = `?page=${dados.pagina}${dados.lente === 'imag' ? '&imag=1' : ''}`;
    const linhas = [
        origem,
        '',
        '| Campo | Referência |',
        '| :--- | :--- |',
        `| **Obra** | ${dados.obra} |`,
        `| **Parte** | Parte ${dados.parte}${dados.rascunho ? ' *(rascunho)*' : ''} |`,
        `| **Página** | Página ${dados.pagina + 1} de ${dados.paginaTotal} (\`${query}\`, índice \`${dados.pagina}\`) |`,
        `| **Capítulo / Título** | ${dados.capitulo ? `${dados.capitulo} — ` : ''}${dados.tituloPagina || 'Capa'} |`,
        `| **Lente ativa** | ${dados.lente === 'imag' ? '✨ Imaginação (\`imag\`)' : '👓 Realidade (\`real\`)'} |`,
        `| **Idioma** | \`${dados.idioma}\` |`,
        `| **Arquivo no repo** | \`${dados.arquivo}\`${arqTrad ? ` (tradução: \`${arqTrad}\`)` : ''} |`
    ];
    if (dados.urlPagina) {
        linhas.push(`| **Abrir direto** | ${dados.urlPagina.split('?')[0]}${query} |`);
    }
    linhas.push('', '### Observação', '', dados.texto);
    return linhas.join('\n');
}

export default async function handler(req, res) {
    if (aplicarCors(req, res)) return;
    if (req.method !== 'POST') {
        return responderJson(res, 405, { erro: 'Método não permitido.' });
    }

    let body;
    try {
        body = await lerJson(req);
    } catch {
        return responderJson(res, 400, { erro: 'JSON inválido.' });
    }

    const chave = typeof body.chaveAutor === 'string' ? body.chaveAutor.trim() : '';

    // Endpoint usado pela tela de ativação do Modo Autor para validar a chave sem abrir Issue
    if (body.verificar === true) {
        return responderJson(res, ehAutorValido(chave) ? 200 : 401, {
            ok: ehAutorValido(chave),
            erro: ehAutorValido(chave) ? undefined : 'Chave do autor inválida.'
        });
    }

    if (chave && !ehAutorValido(chave)) {
        return responderJson(res, 401, { erro: 'Chave do autor inválida. Confira a chave nas configurações.' });
    }
    const ehAutor = ehAutorValido(chave);

    const texto = limparTexto(body.texto, 3000);
    if (texto.length < 3) {
        return responderJson(res, 400, { erro: 'Escreva uma observação com pelo menos 3 caracteres.' });
    }

    const obra = limparTexto(body.obra || 'Clássicos Vivos', 120);
    const parte = Number.isFinite(Number(body.parte)) ? Number(body.parte) : 1;
    const pagina = Number.isFinite(Number(body.pagina)) ? Math.max(0, Number(body.pagina)) : 0;
    const paginaTotal = Number.isFinite(Number(body.paginaTotal)) ? Math.max(1, Number(body.paginaTotal)) : 1;
    const capitulo = limparTexto(body.capitulo, 120);
    const tituloPagina = limparTexto(body.tituloPagina, 140);
    const lente = body.lente === 'imag' ? 'imag' : 'real';
    const idioma = limparTexto(body.idioma || 'pt-BR', 16);
    const arquivo = limparTexto(body.arquivo || '', 180);
    const urlPagina = limparTexto(body.urlPagina || '', 300);
    const rascunho = Boolean(body.rascunho);

    // Anti-spam apenas para leitores anônimos (autor autenticado nunca é barrado)
    if (!ehAutor) {
        try {
            const permitido = await verificarRateLimit(`rev:${ipHash(req)}`, 12);
            if (!permitido) {
                return responderJson(res, 429, { erro: 'Muitas sugestões enviadas recentemente. Tente novamente mais tarde.' });
            }
        } catch (err) {
            // Se o rate limit falhar por configuração parcial, não bloqueia mas registra no log
            console.warn('Falha ao checar rate_limits:', err.message);
        }
    }

    const token = process.env.GITHUB_TOKEN || '';
    const owner = process.env.GITHUB_OWNER || 'geraldotfilho';
    const repo = process.env.GITHUB_REPO || 'classicos-vivos';
    if (!token) {
        return responderJson(res, 500, { erro: 'GITHUB_TOKEN não configurado na Vercel.' });
    }

    const resumo = texto.replace(/\s+/g, ' ').slice(0, 65) + (texto.length > 65 ? '…' : '');
    const prefixo = ehAutor ? '[Revisão do Autor]' : '[Sugestão de Leitor]';
    const titulo = `${prefixo} ${obra} · P${parte} p.${pagina + 1}: ${resumo}`;
    const labels = [ehAutor ? 'revisao-autor' : 'sugestao-leitor'];
    if (rascunho) labels.push('rascunho');

    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json',
            'User-Agent': 'classicos-vivos-api'
        },
        body: JSON.stringify({
            title: titulo,
            body: montarCorpoIssue({
                obra, parte, pagina, paginaTotal, capitulo, tituloPagina, lente, idioma, arquivo, urlPagina, rascunho, texto
            }, ehAutor),
            labels
        })
    });

    if (!ghRes.ok) {
        const detalhe = await ghRes.text();
        console.error('Erro GitHub API:', ghRes.status, detalhe);
        return responderJson(res, 502, { erro: 'Não foi possível registrar no GitHub agora.' });
    }

    const issue = await ghRes.json();
    return responderJson(res, 201, {
        ok: true,
        ehAutor,
        issueNumber: issue.number,
        issueUrl: issue.html_url
    });
}
