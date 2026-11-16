import { aplicarCors, ipHash, lerJson, responderJson } from '../lib/http.js';
import { supabaseFetch, verificarRateLimit } from '../lib/supabase.js';

function limparTexto(val, max) {
    return String(val || '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

function ehEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function obterResumo(slug) {
    const q = encodeURIComponent(slug);
    const [notas, comentarios] = await Promise.all([
        supabaseFetch(`cv_avaliacoes?slug=eq.${q}&select=estrelas`),
        supabaseFetch(`cv_comentarios?slug=eq.${q}&status=eq.aprovado&order=criado_em.desc&limit=50&select=id,nome,estrelas,comentario,criado_em`)
    ]);

    const listaNotas = Array.isArray(notas) ? notas : [];
    const total = listaNotas.length;
    const soma = listaNotas.reduce((acc, r) => acc + Number(r.estrelas || 0), 0);
    const media = total > 0 ? Math.round((soma / total) * 10) / 10 : 0;

    return {
        media,
        total,
        comentarios: Array.isArray(comentarios) ? comentarios : []
    };
}

export default async function handler(req, res) {
    if (aplicarCors(req, res)) return;

    if (req.method === 'GET') {
        const url = new URL(req.url, 'http://localhost');
        const slug = limparTexto(url.searchParams.get('slug') || '', 120);
        if (!slug) return responderJson(res, 400, { erro: 'Parâmetro slug obrigatório.' });

        try {
            const dados = await obterResumo(slug);
            return responderJson(res, 200, dados);
        } catch (err) {
            console.error('Erro GET /api/avaliacoes:', err.message);
            return responderJson(res, 500, { erro: 'Erro ao carregar avaliações.' });
        }
    }

    if (req.method === 'POST') {
        let body;
        try {
            body = await lerJson(req);
        } catch {
            return responderJson(res, 400, { erro: 'JSON inválido.' });
        }

        const slug = limparTexto(body.slug, 120);
        const obra = limparTexto(body.obra || 'Clássicos Vivos', 120);
        const parte = Number.isFinite(Number(body.parte)) ? Number(body.parte) : 1;
        const deviceId = limparTexto(body.deviceId, 80);
        const estrelas = Number(body.estrelas);

        if (!slug || deviceId.length < 8) {
            return responderJson(res, 400, { erro: 'Identificação da parte ou do aparelho inválida.' });
        }
        if (!Number.isInteger(estrelas) || estrelas < 0 || estrelas > 5) {
            return responderJson(res, 400, { erro: 'A nota deve ser um número inteiro de 0 a 5 estrelas.' });
        }

        const comentario = limparTexto(body.comentario || '', 1500);
        const nome = limparTexto(body.nome || '', 60) || 'Leitor(a)';
        const email = limparTexto(body.email || '', 120);

        if (comentario && comentario.length < 3) {
            return responderJson(res, 400, { erro: 'O comentário deve ter pelo menos 3 caracteres.' });
        }
        if (email && !ehEmailValido(email)) {
            return responderJson(res, 400, { erro: 'Informe um e-mail válido ou deixe o campo em branco.' });
        }

        try {
            if (comentario) {
                const permitido = await verificarRateLimit(`com:${ipHash(req)}`, 10);
                if (!permitido) {
                    return responderJson(res, 429, { erro: 'Muitos comentários enviados recentemente. Tente mais tarde.' });
                }
            }

            await supabaseFetch('cv_avaliacoes?on_conflict=slug,device_id', {
                method: 'POST',
                prefer: 'resolution=merge-duplicates',
                body: {
                    slug,
                    obra,
                    parte,
                    device_id: deviceId,
                    estrelas,
                    atualizado_em: new Date().toISOString()
                }
            });

            if (comentario) {
                await supabaseFetch('cv_comentarios', {
                    method: 'POST',
                    body: {
                        slug,
                        obra,
                        parte,
                        device_id: deviceId,
                        estrelas,
                        nome,
                        email: email || null,
                        comentario,
                        status: 'pendente'
                    }
                });
            }

            const resumo = await obterResumo(slug);
            return responderJson(res, 201, {
                ok: true,
                ...resumo,
                comentarioPendente: Boolean(comentario)
            });
        } catch (err) {
            console.error('Erro POST /api/avaliacoes:', err.message);
            return responderJson(res, 500, { erro: 'Não foi possível salvar a avaliação agora.' });
        }
    }

    return responderJson(res, 405, { erro: 'Método não permitido.' });
}
