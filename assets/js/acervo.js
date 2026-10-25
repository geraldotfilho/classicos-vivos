/* =====================================================================
   Clássicos Vivos — Obras em produção (lido por index.html e sobre.html)
   Fonte única do que ainda NÃO foi publicado. As obras publicadas ficam
   direto no index.html (capas fixas na estante).

   situacao: 'fila'     → planejada; ainda sem arquivo (vira rascunho em breve)
             'rascunho' → o arquivo existe com `rascunho: true` no window.LIVRO
   estante:  id da prateleira do index.html onde aparece a capa-teaser com
             cadeado (ao tocar, um aviso diz que o livro está em produção);
             null = não aparece na estante (ex.: a nova versão de uma parte
             que já está publicada e continua no ar até ser substituída).
   href:     o arquivo do rascunho (aberto pela lista para adultos em sobre.html)

   Ao publicar uma obra: tire a entrada daqui, ponha a capa fixa no index.html
   e a descrição no "Acervo" de sobre.html (ver docs/RECEITA-CLASSICO-VIVO.md).
   Regra do humano (2026-10-25): só entra aqui o que já é rascunho ou está
   na fila para virar rascunho em breve. Nada de "próximos clássicos" vagos.
   ===================================================================== */
window.ACERVO_PRODUCAO = [
    {
        id: 'dom-quixote-parte-4-nova',
        obra: 'Dom Quixote de La Mancha',
        parte: 4,
        titulo: 'Parte 4 (nova): O Elmo, a Bacia e a Jaula Encantada',
        nota: 'Substitui a Parte 4 atual e fecha o primeiro volume (1605).',
        situacao: 'fila',
        estante: null,
        href: './dom-quixote/parte-4-rascunho.html'
    },
    {
        id: 'dom-quixote-parte-5',
        obra: 'Dom Quixote de La Mancha',
        parte: 5,
        titulo: 'Parte 5: O Livro Famoso e o Cavaleiro dos Leões',
        nota: 'Segundo volume (1615), caps. 1–29.',
        situacao: 'fila',
        estante: 'shelf-quixote-2',
        emoji: '🦁',
        cor: 'from-amber-200 to-orange-300',
        href: './dom-quixote/parte-5.html'
    },
    {
        id: 'dom-quixote-parte-6',
        obra: 'Dom Quixote de La Mancha',
        parte: 6,
        titulo: 'Parte 6: O Palácio dos Duques e a Ilha de Sancho',
        nota: 'Segundo volume (1615), caps. 30–57.',
        situacao: 'fila',
        estante: 'shelf-quixote-2',
        emoji: '🏝️',
        cor: 'from-sky-200 to-indigo-300',
        href: './dom-quixote/parte-6.html'
    },
    {
        id: 'dom-quixote-parte-7',
        obra: 'Dom Quixote de La Mancha',
        parte: 7,
        titulo: 'Parte 7: O Cavaleiro da Branca Lua',
        nota: 'Segundo volume (1615), caps. 58–74.',
        situacao: 'fila',
        estante: 'shelf-quixote-2',
        emoji: '🌙',
        cor: 'from-slate-200 to-indigo-300',
        href: './dom-quixote/parte-7.html'
    }
];
