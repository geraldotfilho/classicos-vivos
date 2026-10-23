/* Narrações gravadas disponíveis (lido pelo motor, assets/js/livro.js).
   O Gemini acrescenta o número da parte em `partes` quando TODAS as frases
   daquela parte estiverem gravadas naquela voz (ver docs/TODO-NARRACAO.md).
   Enquanto `partes` não contém a parte, a voz aparece como "em produção". */
window.VOZES_GRAVADAS = [
    {
        id: 'narradora',
        nome: 'Contadora de histórias',
        descricao: 'Uma voz calorosa narra o livro todo',
        partes: []
    },
    {
        id: 'teatro',
        nome: 'Teatro de vozes',
        descricao: 'Narradora e uma voz para cada personagem',
        partes: []
    }
];
