/**
 * Cliente mínimo para a API REST do Supabase (PostgREST) usando fetch nativo.
 * Usa exclusivamente SUPABASE_SERVICE_ROLE_KEY no servidor Vercel.
 */
export async function supabaseFetch(caminho, { method = 'GET', body, prefer } = {}) {
    const base = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!base || !key) {
        throw new Error('SUPABASE_NAO_CONFIGURADO');
    }

    const headers = {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
    };
    if (prefer) headers.Prefer = prefer;

    const res = await fetch(`${base}/rest/v1/${caminho}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
    });

    const texto = await res.text();
    let dados = null;
    if (texto) {
        try { dados = JSON.parse(texto); } catch { dados = texto; }
    }
    if (!res.ok) {
        const err = new Error(`SUPABASE_${res.status}`);
        err.detalhe = dados;
        throw err;
    }
    return dados;
}

/**
 * Limite simples por janela de 1 hora na tabela rate_limits.
 * Retorna true se ainda estiver dentro do limite, false se excedeu.
 */
export async function verificarRateLimit(chave, maxPorHora = 15) {
    const q = encodeURIComponent(chave);
    const agora = Date.now();
    const umaHora = 60 * 60 * 1000;

    const existentes = await supabaseFetch(`rate_limits?chave=eq.${q}&select=chave,contagem,janela_inicio`);
    const atual = Array.isArray(existentes) ? existentes[0] : null;

    if (!atual) {
        await supabaseFetch('rate_limits', {
            method: 'POST',
            prefer: 'resolution=merge-duplicates',
            body: { chave, contagem: 1, janela_inicio: new Date(agora).toISOString() }
        });
        return true;
    }

    const inicio = new Date(atual.janela_inicio).getTime();
    if (agora - inicio > umaHora) {
        await supabaseFetch(`rate_limits?chave=eq.${q}`, {
            method: 'PATCH',
            body: { contagem: 1, janela_inicio: new Date(agora).toISOString() }
        });
        return true;
    }

    if (atual.contagem >= maxPorHora) return false;

    await supabaseFetch(`rate_limits?chave=eq.${q}`, {
        method: 'PATCH',
        body: { contagem: atual.contagem + 1 }
    });
    return true;
}
