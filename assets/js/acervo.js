/* =====================================================================
   Clássicos Vivos — Obras em produção (lido por index.html e sobre.html)
   Fonte única do que ainda NÃO foi publicado. As obras publicadas ficam
   direto no index.html (capas fixas na estante).

   situacao: 'fila'     → planejada; ainda sem arquivo (vira rascunho em breve)
             'rascunho' → o arquivo existe com `rascunho: true` no window.LIVRO
   estante:  id de uma prateleira do index.html com `data-estante-producao`, onde
             apareceria a capa-teaser com cadeado; null = não aparece como capa própria
             (as Partes 5–7 aparecem juntas no boxset trancado do Volume 2, fixo no index.html;
             vale também para a nova versão de uma parte já publicada).
   href:     o arquivo do rascunho (aberto pela lista para adultos em sobre.html)

   Ao publicar uma obra: tire a entrada daqui, ponha a capa fixa no index.html
   e a descrição no "Acervo" de sobre.html (ver docs/RECEITA-CLASSICO-VIVO.md).
   Regra do humano (2026-10-25): só entra aqui o que já é rascunho ou está
   na fila para virar rascunho em breve. Nada de "próximos clássicos" vagos.
   ===================================================================== */
window.ACERVO_PRODUCAO = [
    {
        id: 'dom-quixote-parte-5',
        obra: 'Dom Quixote de La Mancha',
        parte: 5,
        titulo: 'Parte 5: O Livro Famoso e o Cavaleiro dos Leões',
        nota: 'Segundo volume (1615), caps. 1–29.',
        situacao: 'fila',
        estante: null,
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
        estante: null,
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
        estante: null,
        emoji: '🌙',
        cor: 'from-slate-200 to-indigo-300',
        href: './dom-quixote/parte-7.html'
    },
    {
        id: 'robin-hood',
        obra: 'Robin Hood',
        parte: 1,
        titulo: 'Robin Hood: O Herói da Floresta de Sherwood',
        nota: 'Próxima adaptação na fila. Lendas clássicas e Howard Pyle.',
        situacao: 'fila',
        estante: null,
        emoji: '🏹',
        cor: 'from-emerald-300 to-teal-500',
        href: './robin-hood/parte-1.html'
    },
    {
        id: 'viagem-ao-centro-da-terra',
        obra: 'Viagem ao Centro da Terra',
        parte: 1,
        titulo: 'Viagem ao Centro da Terra: A Descida ao Vulcão',
        nota: 'Próxima adaptação na fila. Obra de Júlio Verne.',
        situacao: 'fila',
        estante: null,
        emoji: '🌋',
        cor: 'from-amber-400 to-orange-600',
        href: './viagem-ao-centro-da-terra/parte-1.html'
    }
];
