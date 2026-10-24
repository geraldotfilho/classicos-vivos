/* Narrações gravadas disponíveis (lido pelo motor, assets/js/livro.js).
   Acrescente o número da parte em `partes` quando TODAS as frases
   daquela parte estiverem gravadas naquela voz (ver docs/TODO-NARRACAO.md).
   `previa`: partes com só algumas frases gravadas, liberadas para o humano ouvir
   no livro (as demais frases usam a voz do aparelho). Não vira voz padrão.
   `amostra`: arquivo do botão ▶ do painel, relativo à pasta da voz (padrão: amostra.mp3).
   Enquanto a parte não está em `partes` nem em `previa`, a voz aparece como "em produção". */
window.VOZES_GRAVADAS = [
    // Candidatas a narradora (teste de ouvido na capa da Parte 1). A escolhida vira `narradora`.
    {
        id: 'narradora-a',
        nome: 'Teste A: contadora de histórias',
        descricao: 'Voz brasileira "storyteller 9" (50 anos, calorosa), modelo Flash. Capa: frases 2 e 3',
        partes: [],
        previa: [1],
        amostra: 'parte-1/p0-s2.mp3'
    },
    {
        id: 'narradora-b',
        nome: 'Teste B: professora',
        descricao: 'Voz brasileira "tutor 5" (62 anos, calorosa), modelo Flash-Lite. Capa: as 3 frases',
        partes: [],
        previa: [1],
        amostra: 'parte-1/p0-s2.mp3'
    },
    {
        id: 'narradora-c',
        nome: 'Teste C: mãe leitora',
        descricao: 'Voz brasileira "assistant 6" (38 anos, calorosa), modelo Flash-Lite. Capa: frase 1',
        partes: [],
        previa: [1],
        amostra: 'parte-1/p0-s1.mp3'
    },
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
