/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 2. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 2,
  paginas: {
    // Capítulo 8 — O Voo e o Tombo dos Moinhos
    1: {
      titulo: 'Gigantes ou moinhos?',
      selo: '🌪️',
      convite: 'Dom Quixote caiu feio, mas tem uma explicação para tudo. Será que ela convence você?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote diz que o mago Frestón transformou os gigantes em moinhos?',
          opcoes: [
            'Assim ele não precisa admitir que eram só moinhos',
            'Porque viu o mago fugindo pelo campo',
            'Porque a lança dele tinha sido enfeitiçada',
            'Porque Sancho pediu uma explicação'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo: o que Sancho tinha dito antes, e o que o cavaleiro respondeu?',
          porque: 'Quando a gente não quer perder, até um mago invisível serve de desculpa!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto do tombo tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Dom Quixote atacou o [[último|primeiro]] moinho do campo. A pá girou, quebrou a ponta da [[espada|lança]] e jogou cavalo e cavaleiro no [[rio|chão]], em cima da grama macia.',
          dica: 'Releia o primeiro e o segundo parágrafos.',
          porque: 'Pelo menos a grama era macia!'
        }
      ],
      sabia: 'A palavra "moinho" vem do latim molinum, que vem de "mola", a pedra redonda que esmaga o grão. No começo, moinho era simplesmente uma máquina de moer.'
    },

    // Capítulo 9 — Uma Lança Nova sob as Estrelas
    2: {
      titulo: 'Uma noite, dois jeitos',
      selo: '🌳',
      convite: 'Um galho, uma noite fria e dois amigos bem diferentes. Quem faz o quê?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para quem fez ou pensou nela: Dom Quixote ou Sancho.',
          grupos: ['🛡️ Dom Quixote', '🧺 Sancho'],
          itens: [
            { texto: 'Fez uma lança nova com um galho de carvalho', grupo: 0 },
            { texto: 'Ficou acordado pensando em Dulcineia', grupo: 0 },
            { texto: 'Contou a história do herói que lutou com um tronco', grupo: 0 },
            { texto: 'Forrou o chão com palha para dormir', grupo: 1 },
            { texto: 'Comeu o seu queijinho antes de dormir', grupo: 1 },
            { texto: 'Dormiu tão fundo que os roncos pareciam sinos', grupo: 1 }
          ],
          dica: 'Releia o segundo e o terceiro parágrafos.',
          porque: 'Um fazia planos de herói; o outro, planos de dormir. Os dois estavam felizes!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Decifre o código e descubra o que Dom Quixote olhava lá no alto, enquanto Sancho roncava.',
          resposta: 'ESTRELAS',
          extras: 'OM',
          cifra: {
            mensagem: '🌙⭐🔔🍀🌙🌸🎈⭐',
            chave: [['🌙', 'E'], ['⭐', 'S'], ['🔔', 'T'], ['🍀', 'R'], ['🌸', 'L'], ['🎈', 'A']]
          },
          dica: 'Releia o último parágrafo: o brilho de quê?',
          porque: 'Repare que o código usa o mesmo símbolo para as letras repetidas!'
        }
      ],
      sabia: 'A palavra "cavaleiro" vem de "cavalo": cavaleiro era quem andava a cavalo. Em espanhol, a palavra é "caballero", que vem de "caballo".'
    },

    // Capítulo 10 — Um Jantar para Dividir
    3: {
      titulo: 'O jantar da Idade de Ouro',
      selo: '🌰',
      convite: 'Dom Quixote faz um discurso que os pastores não entendem direito. E você, entende?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada palavra ao que ela quer dizer nesta página.',
          pares: [
            ['bolotas', 'os frutinhos do carvalho'],
            ['Idade de Ouro', 'tempo feliz em que tudo era de todos'],
            ['dividir', 'dar uma parte do que se tem'],
            ['pastor', 'quem cuida de um rebanho']
          ],
          dica: 'Releia o segundo e o terceiro parágrafos: o texto explica cada palavra.',
          porque: 'Na Idade de Ouro, ninguém precisava de cerca!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Os pastores não entendiam todas as palavras do cavaleiro. Por que o ouviram com carinho mesmo assim?',
          opcoes: [
            'Sentiram o calor do coração generoso dele',
            'Acharam a armadura enferrujada muito bonita',
            'Queriam que ele fosse embora logo',
            'Tinham medo das bolotas dele'
          ],
          certa: 0,
          dica: 'Releia a frase que fala dos pastores, logo depois do discurso.',
          porque: 'Às vezes a gente entende o jeito, mesmo sem entender as palavras!'
        }
      ],
      sabia: 'A "Idade de Ouro" é uma ideia muito antiga, dos poetas da Grécia e de Roma: um tempo feliz do começo do mundo. Na versão de Cervantes, Dom Quixote faz esse discurso segurando bolotas, como nesta página.'
    },

    // Capítulo 11 — A Grande Batalha das Ovelhas
    4: {
      titulo: 'Ovelhas ou exércitos?',
      selo: '🐑',
      convite: 'Poeira, cornetas imaginadas e muitos "méééé". Quem tem razão: o olho ou o ouvido?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que aconteceu na planície.',
          itens: [
            'Dom Quixote viu duas nuvens de poeira no horizonte',
            'Ele disse a Sancho que eram dois exércitos',
            'Sancho só escutava um monte de méééé',
            'Os pastores atiraram pedrinhas com os estilingues',
            'Dom Quixote caiu do cavalo e ficou sem dois dentes'
          ],
          dica: 'Siga os parágrafos um depois do outro, do primeiro ao último.',
          porque: 'Quem sabe se o ouvido de Sancho não valia mais que a lança do amo?'
        },
        {
          tipo: 'erro',
          pergunta: 'O reconto trocou alguns nomes e sons. Toque nas 3 palavras erradas para corrigir!',
          texto: 'Do lado esquerdo vinha o terrível [[Pentapolim|Alifanfarrão]] da Trapobana; do lado direito, o valente [[Alifanfarrão|Pentapolim]] do Braço Arregaçado. Sancho não escutava [[trovões|espadas]] nem cornetas.',
          dica: 'Releia o segundo e o terceiro parágrafos.',
          porque: 'Dois nomes difíceis e nenhum soldado de verdade!'
        }
      ],
      sabia: 'Os geógrafos antigos chamavam de Taprobana uma grande ilha distante do Oriente, geralmente identificada com o atual Sri Lanka. Cervantes só inventou o gigante Alifanfarrão para morar lá.'
    },

    // Capítulo 12 — Um Apelido Inesquecível
    5: {
      titulo: 'O apelido que pegou',
      selo: '🏮',
      convite: 'Sancho inventa um apelido para o amo. Em vez de brigar, ele adora. Por quê?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Toque nas palavras certas para completar o trecho.',
          texto: 'Sancho viu um rosto que ___ pena. Dom Quixote ___ o apelido e quis pintar no escudo um rosto ___ e pensativo.',
          respostas: ['dava', 'adorou', 'nobre'],
          distratores: ['tinha', 'detestou'],
          dica: 'Releia o terceiro e o último parágrafos, onde estão a fala de Sancho e a resposta do cavaleiro.',
          porque: 'Um rosto que dá pena e, ao mesmo tempo, nobre. Só mesmo Dom Quixote!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote gostou tanto de ser chamado de Cavaleiro da Triste Figura?',
          opcoes: [
            'Achou que todo grande cavaleiro tem um nome poético',
            'Achou que Sancho estava elogiando o rosto dele',
            'Porque Sancho prometeu pintar o escudo',
            'Porque o nome fazia as pessoas rirem'
          ],
          certa: 0,
          dica: 'Releia o que ele responde a Sancho, no último parágrafo.',
          porque: 'Para Dom Quixote, o que vinha dos livros de cavalaria era sempre bonito.'
        }
      ],
      sabia: 'A palavra "poético" vem de "poeta", que vem de uma palavra grega que quer dizer "aquele que faz, que cria".'
    },

    // Capítulo 13 — A História que Nunca Acaba
    6: {
      titulo: 'A história que nunca acaba',
      selo: '🐐',
      convite: 'Sancho conta uma história bem comprida, de propósito. Qual será o plano dele?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Nesta noite escura, o que existe de verdade e o que só está na cabeça de Dom Quixote?',
          grupos: ['👓 Existe de verdade', '✨ Só na imaginação'],
          itens: [
            { texto: 'Um barulho de TAC-TAC no meio das folhas', grupo: 0 },
            { texto: 'Rocinante com as patas amarradas', grupo: 0 },
            { texto: 'Uma noite escura como breu', grupo: 0 },
            { texto: 'Um gigante martelando ferro no coração da mata', grupo: 1 },
            { texto: 'Um gigante da escuridão escondido na mata', grupo: 1 }
          ],
          dica: 'Releia o primeiro e o segundo parágrafos. O que o narrador conta e o que o cavaleiro grita?',
          porque: 'O barulho era real. O gigante, só Dom Quixote via!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho amarrou as patas de Rocinante e começou uma história que não acabava nunca?',
          opcoes: [
            'Para segurar Dom Quixote ali até o sol nascer',
            'Para Rocinante descansar um pouco',
            'Para esquecer a fome que sentia',
            'Para Dom Quixote dormir mais depressa'
          ],
          certa: 0,
          dica: 'Releia o segundo parágrafo: o que Sancho queria evitar que o amo fizesse?',
          porque: 'Sancho tremia que nem gelatina, mas teve uma ideia esperta!'
        }
      ],
      sabia: 'TAC-TAC é uma onomatopeia: uma palavra que imita um som. Em português existem muitas, como "tique-taque", "miau" e "plof".'
    },

    // Capítulo 14 — Quem Fazia TAC-TAC?
    7: {
      titulo: 'O mistério dos martelos',
      selo: '🌅',
      convite: 'A luz da manhã explica a noite inteira. Mas como é que um rio faz barulho de gigante?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada coisa ao que ela fazia no mistério do TAC-TAC.',
          pares: [
            ['A água do rio', 'fazia os martelos bater'],
            ['Os martelos', 'batiam em pedaços de pano'],
            ['As batidas', 'deixavam o pano fofinho'],
            ['A luz da manhã', 'mostrou a verdade']
          ],
          dica: 'Releia o segundo e o último parágrafos.',
          porque: 'Do rio ao pano, tudo explicadinho. E o medo ficou sem emprego!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Charada: tenho cabeça, mas não penso; bato, mas não tenho mãos. Seis de mim batiam o pano, movidos pelo rio. Quem somos?',
          resposta: 'MARTELOS',
          extras: 'IC',
          dica: 'Olhe o título da página e releia o segundo parágrafo.',
          porque: 'Com cabeça e tudo, eles nem precisam de cérebro para bater!'
        }
      ],
      sabia: 'Esses martelos movidos pela água existiram de verdade: eram máquinas usadas para tratar tecidos de lã. Em espanhol, chamavam-se "batanes".'
    },

    // Capítulo 15 — Um Elmo que Brilha na Chuva (recapitulação)
    8: {
      titulo: 'Recapitulando a Parte 2',
      selo: '👑',
      convite: 'De moinhos a uma bacia: três desafios para provar que você viajou junto com os dois amigos.',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem estes momentos da Parte 2.',
          itens: [
            'Dom Quixote atacou um moinho e levou um tombo',
            'Dom Quixote confundiu dois rebanhos com dois exércitos',
            'Sancho inventou o apelido Cavaleiro da Triste Figura',
            'Sancho riu ao descobrir que o barulho era de martelos',
            'Dom Quixote tomou a bacia do barbeiro por um elmo'
          ],
          dica: 'Siga os capítulos: moinhos, ovelhas, apelido, martelos e, por último, o barbeiro.',
          porque: 'Quanta coisa, em tão pouco caminho!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado. Ele combina bem com a bacia que brilhava na chuva.',
          texto: 'Nem tudo que ___ é ___.',
          respostas: ['reluz', 'ouro'],
          distratores: ['voa', 'pano'],
          dica: 'É um ditado muito conhecido. Pense no que brilhava como ouro na cabeça de Dom Quixote.',
          porque: 'A bacia reluzia tanto que parecia ouro, mas era só latão!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Nos moinhos, nas ovelhas e na bacia, o que Dom Quixote tem em comum?',
          opcoes: [
            'Ele vê coisas extraordinárias onde só existem coisas comuns',
            'Ele sempre vence sem a ajuda de ninguém',
            'Ele sempre escuta os conselhos de Sancho',
            'Ele nunca explica o que está vendo'
          ],
          certa: 0,
          dica: 'Pense no que ele viu e no que de fato estava lá, nas três cenas.',
          porque: 'É por isso que o livro tem duas lentes: a Realidade e a Imaginação!'
        }
      ],
      sabia: 'A palavra "elmo" vem de uma palavra germânica antiga, "helm". É da mesma família do inglês "helmet", que quer dizer capacete.'
    }
  }
};
