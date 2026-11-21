/* =====================================================================
   Clássicos Vivos — Obras em produção (lido por index.html e sobre.html)
   Fonte única do que ainda NÃO foi publicado. As obras publicadas ficam
   direto no index.html (capas fixas na estante).

   situacao: 'fila'     → planejada; ainda sem arquivo (vira rascunho em breve)
             'rascunho' → o arquivo existe com `rascunho: true` no window.LIVRO
   estante:  id de uma prateleira do index.html com `data-estante-producao`, onde
             apareceria a capa-teaser com cadeado; null = não aparece como capa própria
             (os dois volumes de Dom Quixote já estão completos e publicados no index.html;
             use null também para a nova versão de uma parte já publicada).
   href:     o arquivo do rascunho (aberto pela lista para adultos em sobre.html)

   Ao publicar uma obra: tire a entrada daqui, ponha a capa fixa no index.html
   e a descrição no "Acervo" de sobre.html (ver docs/RECEITA-CLASSICO-VIVO.md).
   Regra do humano (2026-10-25): só entra aqui o que já é rascunho ou está
   na fila para virar rascunho em breve. Nada de "próximos clássicos" vagos.
   ===================================================================== */
window.ACERVO_PRODUCAO = [
    {
        id: 'robin-hood',
        obra: 'Robin Hood',
        parte: 1,
        titulo: 'Parte 1: O Bando do Grande Carvalho',
        nota: 'Rascunho de texto em revisão (Fase 3). 5 partes previstas.',
        situacao: 'rascunho',
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
