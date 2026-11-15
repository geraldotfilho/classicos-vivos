import { aplicarCors, responderJson } from '../lib/http.js';

export default async function handler(req, res) {
    if (aplicarCors(req, res)) return;
    responderJson(res, 200, { ok: true, servico: 'classicos-vivos-api' });
}
