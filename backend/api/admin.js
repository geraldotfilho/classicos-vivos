import { aplicarCors, ehAutorValido, lerJson, responderJson } from '../lib/http.js';
import { supabaseFetch } from '../lib/supabase.js';

function extrairChave(req) {
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) return auth.slice(7).trim();
    const header = req.headers['x-autor-chave'];
    return typeof header === 'string' ? header.trim() : '';
}

export default async function handler(req, res) {
    if (aplicarCors(req, res)) return;

    if (!ehAutorValido(extrairChave(req))) {
        return responderJson(res, 401, { erro: 'Acesso restrito ao autor.' });
    }

    if (req.method === 'GET') {
        const url = new URL(req.url, 'http://localhost');
        const status = url.searchParams.get('status') || 'pendente';
        const filtro = ['pendente', 'aprovado', 'rejeitado'].includes(status)
            ? `status=eq.${status}&`
            : '';

        try {
            const [lista, todosStatus] = await Promise.all([
                supabaseFetch(`cv_comentarios?${filtro}order=criado_em.desc&limit=200&select=id,slug,obra,parte,estrelas,nome,email,comentario,status,criado_em,moderado_em`),
                supabaseFetch('cv_comentarios?select=status')
            ]);

            const contadores = { pendente: 0, aprovado: 0, rejeitado: 0 };
            for (const row of Array.isArray(todosStatus) ? todosStatus : []) {
                if (row.status in contadores) contadores[row.status] += 1;
            }

            return responderJson(res, 200, {
                comentarios: Array.isArray(lista) ? lista : [],
                contadores
            });
        } catch (err) {
            console.error('Erro GET /api/admin:', err.message);
            return responderJson(res, 500, { erro: 'Erro ao consultar comentários.' });
        }
    }

    if (req.method === 'POST') {
        let body;
        try {
            body = await lerJson(req);
        } catch {
            return responderJson(res, 400, { erro: 'JSON inválido.' });
        }

        const id = String(body.id || '').trim();
        const acao = String(body.acao || '').trim();
        if (!/^[0-9a-f-]{36}$/i.test(id)) {
            return responderJson(res, 400, { erro: 'ID de comentário inválido.' });
        }
        if (!['aprovar', 'rejeitar', 'excluir'].includes(acao)) {
            return responderJson(res, 400, { erro: 'Ação inválida.' });
        }

        try {
            if (acao === 'excluir') {
                await supabaseFetch(`cv_comentarios?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' });
            } else {
                const novoStatus = acao === 'aprovar' ? 'aprovado' : 'rejeitado';
                await supabaseFetch(`cv_comentarios?id=eq.${encodeURIComponent(id)}`, {
                    method: 'PATCH',
                    body: { status: novoStatus, moderado_em: new Date().toISOString() }
                });
            }
            return responderJson(res, 200, { ok: true });
        } catch (err) {
            console.error('Erro POST /api/admin:', err.message);
            return responderJson(res, 500, { erro: 'Erro ao atualizar comentário.' });
        }
    }

    return responderJson(res, 405, { erro: 'Método não permitido.' });
}
