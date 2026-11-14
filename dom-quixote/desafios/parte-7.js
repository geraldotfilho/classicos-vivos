/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 7 (RASCUNHO).
   AMOSTRA para testar o motor (assets/js/desafios.js): cobre os 7 tipos de etapa.
   Ainda não passou pelo crivo do humano. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
    livro: 'dom-quixote',
    parte: 7,
    paginas: {
        1: {
            titulo: 'Os conselhos do cavaleiro',
            selo: '💡',
            convite: 'Dom Quixote deu muitos conselhos. Será que Sancho escutou todos?',
            etapas: [
                {
                    tipo: 'quiz',
                    pergunta: 'Por que Dom Quixote estava "feliz e preocupado ao mesmo tempo"?',
                    opcoes: [
                        'Porque Sancho ia governar, mas talvez não soubesse como',
                        'Porque ele queria ser governador no lugar de Sancho',
                        'Porque o jantar do palácio estava atrasado',
                        'Porque o mordomo tinha voz de condessa'
                    ],
                    certa: 0,
                    dica: 'Releia o começo da página: ele se sente como um pai no primeiro dia de escola do filho.',
                    porque: 'Como um pai na porta da escola: orgulhoso, e com o coração apertadinho.'
                },
                {
                    tipo: 'lacunas',
                    pergunta: 'Sancho soltou três ditados de uma vez! Complete um deles com as palavras certas.',
                    texto: 'Em boca ___ não entra ___.',
                    respostas: ['fechada', 'mosca'],
                    distratores: ['aberta', 'abelha', 'comida'],
                    dica: 'Procure os ditados no quarto parágrafo, logo depois de "Deixe comigo, meu amo".',
                    porque: 'Quer dizer: quem fica quieto não se mete em encrenca.'
                },
                {
                    tipo: 'ligar',
                    pergunta: 'Ligue cada conselho de Dom Quixote ao motivo dele.',
                    pares: [
                        ['Não comer alho nem cebola', 'para ninguém sentir o cheiro'],
                        ['Tratar igual rico e pobre', 'para ser justo com todos'],
                        ['Não arrotar na mesa', 'para ter bons modos'],
                        ['Não ter vergonha da família', 'porque ser lavrador é honrado']
                    ],
                    dica: 'Os conselhos estão no segundo e no terceiro parágrafos. Releia com calma.'
                }
            ],
            sabia: 'Os conselhos de Dom Quixote a Sancho estão nos capítulos 42 e 43 da Segunda Parte do livro de Cervantes, publicada em 1615.'
        },
        2: {
            titulo: 'O tribunal de Barataria',
            selo: '🎩',
            convite: 'Cinco chapéus num pano só? Ajude o governador a pensar como um juiz.',
            etapas: [
                {
                    tipo: 'ordenar',
                    pergunta: 'Ponha o caso dos chapéus na ordem em que aconteceu.',
                    itens: [
                        'O lavrador leva um pedaço de pano ao alfaiate.',
                        'Ele pergunta se dá para um, dois, três, quatro, cinco chapéus.',
                        'O alfaiate mostra cinco chapeuzinhos, um em cada dedo.',
                        'Sancho decide: nenhum dos dois ganha nada.'
                    ],
                    dica: 'Releia o quarto e o quinto parágrafos: a história vai do pano até a decisão.',
                    porque: 'Primeiro o pedido, depois a esperteza, a surpresa e, por fim, a decisão do juiz.'
                },
                {
                    tipo: 'classificar',
                    pergunta: 'Na ilha de Barataria, o que é de verdade e o que é de faz de conta?',
                    grupos: ['✅ De verdade', '🎭 Faz de conta'],
                    itens: [
                        { texto: 'Os sinos tocando e o povo na rua', grupo: 0 },
                        { texto: 'O mar que "está de folga"', grupo: 1 },
                        { texto: 'Os cinco chapeuzinhos nos dedos', grupo: 0 },
                        { texto: 'Barataria ser uma ilha', grupo: 1 },
                        { texto: 'O caderninho do mordomo', grupo: 0 }
                    ],
                    dica: 'Sancho subiu num banquinho e olhou por cima do muro. O que ele viu (e o que não viu)?'
                },
                {
                    tipo: 'enigma',
                    pergunta: 'O mordomo escreveu no caderninho uma palavra em código. Use a chave e descubra!',
                    resposta: 'ESPERTO',
                    extras: 'AB',
                    cifra: {
                        mensagem: '🌙🔔⭐🌙🍀🌳🐟',
                        chave: [['🌙', 'E'], ['🔔', 'S'], ['⭐', 'P'], ['🍀', 'R'], ['🌳', 'T'], ['🐟', 'O']]
                    },
                    dica: 'Troque cada desenho pela letra da chave, um por um, da esquerda para a direita.',
                    porque: '"Este governador não é bobo, não": é esperto!'
                }
            ],
            sabia: 'Cervantes conta que a ilha se chamava Barataria porque o governo saiu "barato" para Sancho: ele ganhou de presente, sem pagar nada.'
        },
        3: {
            titulo: 'O doutor Tira-Prato',
            selo: '🧀',
            convite: 'A varinha do doutor sumiu com o jantar. Você lembra de tudo o que aconteceu?',
            etapas: [
                {
                    tipo: 'erro',
                    pergunta: 'O mordomo anotou a história errado! Toque nas 3 palavras trocadas.',
                    texto: 'O doutor tocava os pratos com uma [[colher|varinha]], e um criado levava a comida. Sancho expulsou o doutor e jantou pão, queijo, [[alface|cebola]] e um cacho de [[bananas|uvas]].',
                    dica: 'Releia o primeiro e o último parágrafos da página.',
                    porque: 'Varinha, cebola e uvas: agora o caderninho está certo!'
                },
                {
                    tipo: 'quiz',
                    pergunta: 'Quando Sancho diz que vai pegar a cadeira e "se sentar nela muito bravo", o que ele faz?',
                    opcoes: [
                        'Uma brincadeira: parece uma ameaça, mas ele só vai se sentar',
                        'Uma ameaça de verdade de bater no doutor',
                        'Um pedido de cadeira nova',
                        'Um ditado antigo de cavaleiro'
                    ],
                    certa: 0,
                    dica: 'Leia a frase até o fim: o que ele faria com a cadeira?',
                    porque: 'O doutor levou um susto à toa: Sancho é bravo, mas é de paz.'
                }
            ],
            sabia: 'No livro de Cervantes, o doutor se chama Pedro Recio de Tirteafuera. Tirteafuera é uma aldeia de verdade, na Espanha, e o nome soa como "tire-se para fora"!'
        },
        9: {
            titulo: 'O governador volta à estrada',
            selo: '🕊️',
            convite: 'Recapitule a Parte 7 e ganhe o último selo.',
            etapas: [
                {
                    tipo: 'quiz',
                    pergunta: 'O que a duquesa quis dizer com "a ilha era de faz de conta, mas a sua sabedoria era de verdade"?',
                    opcoes: [
                        'Que a ilha foi inventada, mas Sancho governou bem de verdade',
                        'Que Sancho também era de faz de conta',
                        'Que a ilha ia virar de verdade no ano seguinte',
                        'Que o mar ia voltar da folga'
                    ],
                    certa: 0,
                    dica: 'Pense no caderninho do mordomo: o que estava anotado nele?'
                }
            ],
            sabia: 'A fala de Dom Quixote sobre a liberdade abre o capítulo 58 da Segunda Parte e é um dos trechos mais famosos do livro.'
        }
    }
};
