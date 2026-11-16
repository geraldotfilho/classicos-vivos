// Lista pedidos de revisão do autor (`revisao-autor`) e sugestões de leitores (`sugestao-leitor`)
// abertos nas Issues do GitHub. Zero dependências externas.
// Uso:
//   npm run revisoes                      (mostra revisao-autor e resumo de sugestao-leitor)
//   npm run revisoes -- --todas           (mostra o corpo completo de ambos os tipos)
//   npm run revisoes -- --leitores        (mostra apenas sugestao-leitor)

const OWNER = process.env.GITHUB_OWNER || 'geraldotfilho';
const REPO = process.env.GITHUB_REPO || 'classicos-vivos';
const args = new Set(process.argv.slice(2));
const mostrarTodas = args.has('--todas');
const soLeitores = args.has('--leitores');

async function buscarIssues(label) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues?state=open&labels=${encodeURIComponent(label)}&per_page=100`;
    const headers = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'classicos-vivos-tools'
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
        throw new Error(`GitHub API retornou ${res.status}: ${await res.text()}`);
    }
    const lista = await res.json();
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
    if (!soLeitores) {
        const autor = await buscarIssues('revisao-autor');
        imprimirIssues('🔑 REVISÕES DO AUTOR (prioritárias)', autor, true);
    }
    const leitores = await buscarIssues('sugestao-leitor');
    imprimirIssues('💬 SUGESTÕES DE LEITORES (terceiros)', leitores, soLeitores || mostrarTodas);
} catch (err) {
    console.error('Erro ao consultar revisões no GitHub:', err.message);
    process.exit(1);
}
