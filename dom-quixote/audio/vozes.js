/* Narração gravada disponível (lido pelo motor, assets/js/livro.js).
   Regra do humano: UMA voz por vez nos livros. A narração é a narradora + vozes
   próprias para as falas dos personagens, tudo na mesma pasta (ver docs/TODO-NARRACAO.md).
   `partes`: partes com TODAS as frases gravadas (a voz vira a padrão na primeira visita).
   `previa`: partes com só algumas frases gravadas, liberadas para o humano ouvir no
   livro (as demais frases usam a voz do aparelho). Não vira voz padrão.
   `amostra`: arquivo do botão ▶ do painel, relativo à pasta da voz (padrão: amostra.mp3). */
window.VOZES_GRAVADAS = [
    {
        id: 'narracao',
        nome: 'Contadora de histórias',
        descricao: 'Narração gravada, com voz calorosa',
        partes: [],
        previa: [1]
    }
];
