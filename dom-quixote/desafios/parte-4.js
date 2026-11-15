/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 4. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 4,
  paginas: {
    // Capítulo 23 — O Reino Está Salvo!
    1: {
      titulo: 'A princesa de mentirinha',
      selo: '💐',
      convite: 'Todo mundo na pousada está fingindo alguma coisa. Será que você percebe o quê, e por quê?',
      etapas: [
        {
          tipo: 'erro',
          pergunta: 'Este reconto da manhã na pousada tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'O sol da [[noite|manhã]] encheu o pátio de luz dourada. Sancho cochichou que o gigante vencido tinha deixado a pousada cheirando a [[leite|vinho]]. Dom Quixote sentia o coração bater forte para a próxima [[festa|batalha]].',
          dica: 'Releia o começo da página e as falas de Sancho e de Dom Quixote.',
          porque: 'Cheirando a vinho... e ninguém teve coragem de abrir uma janela!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que o padre e mestre Nicolau acharam que era hora de levar Dom Quixote para casa?',
          opcoes: [
            'Ele estava cansado e magrinho de tanto andar pelo mundo',
            'Doroteia mandou os dois cuidarem dele',
            'A pousada ia fechar naquele dia',
            'Sancho já tinha pedido para voltar'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo da página.',
          porque: 'Quem gosta de verdade cuida, mesmo que seja às escondidas!'
        }
      ],
      sabia: 'A palavra "reverência" vem do latim e está ligada a "respeito". Quem faz uma reverência, como Doroteia, está mostrando respeito.'
    },

    // Capítulo 24 — Bacia ou Elmo?
    2: {
      titulo: 'Bacia, elmo ou bacielmo?',
      selo: '👑',
      convite: 'O mesmo objeto, três nomes e uma briga na porta da pousada. Quem tem razão?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada pessoa ao que ela faz nesta cena.',
          pares: [
            ['O barbeiro', 'Quer a bacia de latão de volta'],
            ['Dom Quixote', 'Jura que é o elmo de Mambrino'],
            ['Mestre Nicolau', 'Faz todos votarem: "É um elmo!"'],
            ['Sancho', 'Inventa a palavra "bacielmo"']
          ],
          dica: 'Releia os parágrafos da briga, do voto e da invenção de Sancho.',
          porque: 'Cada um puxava para um lado, e Sancho achou um jeito de puxar para o meio.'
        },
        {
          tipo: 'classificar',
          pergunta: 'Como cada um chama o objeto? Mande cada frase para o dono da ideia.',
          grupos: ['🥣 Para o barbeiro é...', '👑 Para Dom Quixote é...', '✨ Para Sancho é...'],
          itens: [
            { texto: 'Uma bacia de latão', grupo: 0 },
            { texto: 'A ferramenta de fazer barba dele', grupo: 0 },
            { texto: 'O famoso elmo de Mambrino', grupo: 1 },
            { texto: 'Um prêmio conquistado debaixo de chuva', grupo: 1 },
            { texto: 'Um pouco bacia, um pouco elmo', grupo: 2 },
            { texto: 'Um bacielmo', grupo: 2 }
          ],
          dica: 'Releia o que cada um grita antes de Sancho pular no meio.',
          porque: 'Nem bacia, nem elmo: um sanduíche de palavras!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que a ideia de Sancho acalmou a briga?',
          opcoes: [
            'Os dois puderam ficar um pouco certos, sem ninguém perder',
            'O barbeiro percebeu que a bacia era mesmo um elmo',
            'Dom Quixote reconheceu que era só uma bacia',
            'Todos votaram de novo e escolheram "bacia"'
          ],
          certa: 0,
          dica: 'Releia a fala de Sancho: "Não é só bacia nem só elmo..."',
          porque: 'Para fazer as pazes, às vezes basta inventar uma palavra nova.'
        }
      ],
      sabia: 'Cervantes inventou essa palavra-sanduíche no original: em espanhol, ela é "baciyelmo", feita de "bacía" (bacia) e "yelmo" (elmo).'
    },

    // Capítulo 25 — A Jaula Encantada
    3: {
      titulo: 'Os magos de lençol',
      selo: '🧙',
      convite: 'Os "magos" têm lençóis, bigodes de mentira e um segredo. Por que nada pode ser contado a Sancho?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que os amigos não contaram o plano a Sancho?',
          opcoes: [
            'Tinham medo de que ele, com pena, avisasse o amo',
            'Sancho nunca sabia guardar segredos de ninguém',
            'Sancho estava viajando longe naquele dia',
            'O plano era uma surpresa também para os bois'
          ],
          certa: 0,
          dica: 'Releia o segundo parágrafo, logo no começo.',
          porque: 'Sancho gostava tanto do amo que não ia aguentar ver ele preso, nem de mentirinha.'
        },
        {
          tipo: 'enigma',
          pergunta: 'Lençóis brancos, chapéus de estrelas e máscaras com bigodes: tudo para parecerem magos. Decifre o código e descubra o nome disso.',
          resposta: 'DISFARCE',
          extras: 'MO',
          cifra: {
            mensagem: '🎩🔦⭐🎈🍎🌙🔔🐘',
            chave: [['🎩', 'D'], ['🔦', 'I'], ['⭐', 'S'], ['🎈', 'F'], ['🍎', 'A'], ['🌙', 'R'], ['🔔', 'C'], ['🐘', 'E']]
          },
          dica: 'Releia o primeiro parágrafo: os amigos se vestiram para não ser reconhecidos.',
          porque: 'Só não enganou Sancho, que reconheceu o jeitinho dos magos.'
        }
      ],
      sabia: 'No livro de Cervantes, Dom Quixote também é levado para casa numa jaula, em cima de uma carroça puxada por bois, e os "magos" são o padre e o barbeiro disfarçados.'
    },

    // Capítulo 26 — Encantado Sente Fome?
    4: {
      titulo: 'A esperteza de Sancho',
      selo: '🤔',
      convite: 'Sancho montou um raciocínio, passo a passo. Dá para você seguir a lógica dele?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o raciocínio de Sancho, do começo ao fim.',
          itens: [
            'Sancho disse que os magos tinham a voz de mestre Nicolau',
            'Dom Quixote respondeu que magos mudam de voz para testar',
            'Sancho perguntou se o amo sentia fome, sede e vontade de xixi',
            'Dom Quixote confessou que sentia as três coisas',
            'Sancho concluiu que gente encantada não come, não bebe e nem faz xixi'
          ],
          dica: 'Releia os parágrafos da conversa, um depois do outro.',
          porque: 'Sancho não sabia de feitiços, mas sabia o que é uma barriga roncando!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que a palavra de honra de Dom Quixote bastou para abrir a porta?',
          opcoes: [
            'Porque ele cumpre o que promete, e o padre sabia disso',
            'Porque a fechadura estava quebrada',
            'Porque Sancho já tinha aberto às escondidas',
            'Porque o padre pagou para ele ficar quieto'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo: quanto valia a palavra dele?',
          porque: 'Palavra de cavaleiro vale mais que mil trancas de ferro!'
        }
      ],
      sabia: 'Cervantes escreveu o livro em espanhol, língua em que "fome" é "hambre" e "sede" é "sed". Sancho, claro, falava dos dois com a barriga.'
    },

    // Capítulo 27 — O Piquenique no Prado
    5: {
      titulo: 'Quase iguais, bem diferentes',
      selo: '🧺',
      convite: 'No piquenique, uma letra a mais ou a menos muda tudo. Você lê com atenção?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Toque nas palavras que fazem sentido. Cuidado: algumas são parecidíssimas!',
          texto: 'Se o ___ rodar na toalha, o lanche cai. O ___ de ovelha estava no alforje. Lá no alto, uma ___ dava voltas no céu.',
          respostas: ['pião', 'queijo', 'águia'],
          distratores: ['pão', 'queixo', 'água'],
          dica: 'Releia o terceiro parágrafo, o do alforje bagunçado.',
          porque: 'Uma letrinha diferente e o lanche vira brinquedo, rosto ou passarinho!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote lembrou dos pastores ao repartir o pão com Sancho?',
          opcoes: [
            'Os pastores já tinham dividido o jantar com eles',
            'Os pastores eram donos daquele pão',
            'Ele queria chamar os pastores para o lanche',
            'Sancho tinha esquecido o pão dos pastores'
          ],
          certa: 0,
          dica: 'Releia a última fala de Dom Quixote.',
          porque: 'Pão dividido com amigos é mais gostoso que o banquete de um rei!'
        }
      ],
      sabia: 'A palavra "companheiro" vem do latim "cum" (com) e "panis" (pão): companheiro é, bem ao pé da letra, quem come o pão com você.'
    },

    // Capítulo 28 — O Cavaleiro do Lago
    6: {
      titulo: 'O que parecia e o que era',
      selo: '🏰',
      convite: 'Dom Quixote conta uma história em que o medo engana, até alguém olhar de pertinho.',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar certo: o que parecia assustador ou o que era de verdade?',
          grupos: ['😨 O que parecia', '🔍 O que era de verdade'],
          itens: [
            { texto: 'Cobras de cara amarrada', grupo: 0 },
            { texto: 'Raízes balançando', grupo: 1 },
            { texto: 'Lagartos no fundo da água', grupo: 0 },
            { texto: 'Sombras de nuvens', grupo: 1 },
            { texto: 'Água fervendo no lago', grupo: 0 },
            { texto: 'Uma fonte morninha borbulhando', grupo: 1 }
          ],
          dica: 'Releia o terceiro parágrafo, quando o cavaleiro olha de pertinho.',
          porque: 'Quem olha com calma descobre que o monstro era só um galho.'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a aventura do cavaleiro do lago.',
          itens: [
            'Uma voz fraquinha pediu ajuda do fundo do lago',
            'O cavaleiro sentiu medo e não pulou de olhos fechados',
            'Ele olhou de pertinho e viu que era um encanto para assustar',
            'Ele entrou na água e o lago virou um campo de flores',
            'As sete fadas saíram livres, cantando e jogando flores'
          ],
          dica: 'Siga a história de Dom Quixote do 2º ao 4º parágrafo.',
          porque: 'Primeiro o medo, depois o olhar calmo, só então o mergulho!'
        }
      ],
      sabia: 'A palavra "fada" vem do latim "fata", plural de "fatum", que quer dizer "destino".'
    },

    // Capítulo 29 — A Cabra Fujona
    7: {
      titulo: 'A cabrinha e o cavaleiro calmo',
      selo: '🐐',
      convite: 'Todo mundo correu atrás da cabra, menos um. Por que ele foi o único que conseguiu?',
      etapas: [
        {
          tipo: 'enigma',
          pergunta: 'Charada: sou uma vara comprida e o pastor me levantou no ar quando corria atrás da cabra. Quem sou eu?',
          resposta: 'CAJADO',
          extras: 'MT',
          dica: 'Releia o segundo parágrafo, quando chega o pastor Eugênio.',
          porque: 'O cajado não serviu para nada: a cabra se rendeu foi ao pão!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote disse: "Eu sei bem o que é querer sair de uma jaula"?',
          opcoes: [
            'Ele mesmo tinha acabado de passar uns dias numa jaula',
            'Ele tinha uma cabra presa no seu castelo',
            'Ele era pastor antes de ser cavaleiro',
            'Ele ouviu a cabra reclamar da jaula'
          ],
          certa: 0,
          dica: 'Lembre da jaula nas páginas anteriores desta parte.',
          porque: 'Quem já foi preso, mesmo por carinho, entende a vontade de correr!'
        }
      ],
      sabia: 'Em espanhol, "cabra" se escreve igualzinho e "pastor" também. O português e o espanhol são línguas irmãs, filhas do latim.'
    },

    // Capítulo 30 — A Romaria na Estrada
    8: {
      titulo: 'Uma dama num manto azul?',
      selo: '🎶',
      convite: 'Da estrada, Dom Quixote e Sancho viram a mesma fila de gente, mas contam histórias bem diferentes.',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada frase para o lugar certo: o que Dom Quixote imaginou ou o que realmente estava na estrada?',
          grupos: ['✨ O que Dom Quixote imaginou', '👓 O que estava lá'],
          itens: [
            { texto: 'Uma princesa levada embora', grupo: 0 },
            { texto: 'Vilões carregando uma dama', grupo: 0 },
            { texto: 'Uma fila de gente do campo cantando', grupo: 1 },
            { texto: 'Gente tocando pandeiro', grupo: 1 },
            { texto: 'Quatro homens com um andor de flores', grupo: 1 },
            { texto: 'Uma missão para salvar a dama', grupo: 0 }
          ],
          dica: 'Releia o segundo e o terceiro parágrafos.',
          porque: 'Sancho viu uma procissão, e Dom Quixote viu uma aventura.'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto da corrida de Rocinante tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'A terra estava [[molhada|rachada]] como um biscoito quebrado. A fila cantava ao som de um [[violão|pandeiro]]. Dom Quixote apontou a [[espada|lança]] e gritou: "Avante, Rocinante!"',
          dica: 'Releia o primeiro parágrafo, o segundo e o quarto.',
          porque: 'Rocinante, que cochilava em pé, não estava nem um pouco a fim de aventura.'
        }
      ],
      sabia: 'A palavra "romaria" tem a ver com Roma, e "romeiro" era quem ia em peregrinação até Roma. Hoje, uma romaria pode ir a qualquer lugar santo.'
    },

    // Capítulo 31 — Os Vizinhos da Estrada
    9: {
      titulo: 'Quem tem coragem de esperar',
      selo: '🙏',
      convite: 'Os vizinhos pedem chuva com paciência. Dom Quixote reconhece uma coragem que não usa lança.',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada palavra ao que ela quer dizer neste capítulo.',
          pares: [
            ['romaria', 'Fila de gente que caminha cantando e rezando'],
            ['andor', 'Caminha enfeitada levada nos ombros'],
            ['lavradores', 'Gente que cuida da terra e planta'],
            ['ramalhete', 'Pequeno buquê de flores']
          ],
          dica: 'Cada palavra vem explicada na própria frase onde aparece. Releia os parágrafos 3 e 4.',
          porque: 'Agora você já sabe falar de procissão como um romeiro!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Os vizinhos pedem chuva com paciência. Complete o ditado que fala de teimosia boa.',
          texto: 'Água mole em ___ dura, tanto ___ até que ___.',
          respostas: ['pedra', 'bate', 'fura'],
          distratores: ['areia', 'corre'],
          dica: 'Pense em quem insiste, devagar, sem desistir, como quem espera a chuva.',
          porque: 'A gota é fraquinha, mas a paciência é forte!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Dom Quixote diz: "Não existe coragem maior que essa." A que coragem ele se refere?',
          opcoes: [
            'A de quem cuida da terra com paciência e esperança',
            'A de quem enfrenta vilões de lança na mão',
            'A de quem mergulha num lago encantado',
            'A de quem sai de casa sem avisar'
          ],
          certa: 0,
          dica: 'Releia a fala dele, logo depois de tirar o bacielmo.',
          porque: 'Plantar e esperar a chuva também é coisa de herói!'
        }
      ],
      sabia: 'A palavra "lavrador" vem de "lavrar", que quer dizer trabalhar a terra, arando e preparando o chão para a semente.'
    },

    // Capítulo 32 — De Volta para Casa
    10: {
      titulo: 'A ilha que não cabe no bolso',
      selo: '🏡',
      convite: 'Sancho chegou em casa de braços abertos e foi abraçado... pelo burrico. E a ilha, onde está?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a chegada de Sancho à aldeia.',
          itens: [
            'Os sinos tocaram e os vizinhos correram para as janelas',
            'A sobrinha e a governanta abraçaram Dom Quixote',
            'Teresa e Sanchica passaram direto por Sancho e abraçaram o burrico',
            'Teresa quis saber da ilha e dos vestidos prometidos',
            'Sancho tirou as moedas e o pião para a filha'
          ],
          dica: 'Releia a página de cima para baixo: cada parágrafo traz um momento.',
          porque: 'Entre o burrico e o amo, o escudeiro ficou em último lugar... por pouco tempo.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Quando Sancho diz "Ilha não cabe no bolso, minha Teresinha!", o que ele quer dizer?',
          opcoes: [
            'Que governar a ilha é um sonho grande, que ainda vai chegar',
            'Que ele já tinha perdido a ilha na estrada',
            'Que a ilha era pequena demais para a família',
            'Que Teresa não precisava de nenhuma ilha'
          ],
          certa: 0,
          dica: 'Releia o que ele diz logo depois: "Mas ela ainda vai chegar".',
          porque: 'Sancho nunca desiste do sonho dele, nem de bolso vazio.'
        }
      ],
      sabia: 'Cervantes deu vários nomes à mulher de Sancho no livro, como Teresa Pança e Juana Gutiérrez.'
    },

    // Capítulo 33 — Sonhos à Janela (recapitulação da Parte 4 e do primeiro volume)
    11: {
      titulo: 'Do bacielmo ao sono do cavaleiro',
      selo: '🌙',
      convite: 'O primeiro livro termina com Dom Quixote dormindo. Quanto da viagem você guardou?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue o que realmente existia ao que Dom Quixote enxergou.',
          pares: [
            ['A bacia do barbeiro', 'O elmo de Mambrino'],
            ['A jaula de madeira', 'A carruagem dos magos'],
            ['Os moinhos de vento', 'Gigantes de braços girando'],
            ['Uma romaria na estrada', 'Uma princesa levada por vilões']
          ],
          dica: 'Releia os parágrafos 1 e 4 desta página, e as lentes de cada capítulo.',
          porque: 'Esses quatro enganos viraram a fama do cavaleiro da bacia na cabeça!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem estes momentos da Parte 4.',
          itens: [
            'Sancho inventou a palavra "bacielmo"',
            'Dom Quixote viajou na jaula do carro de bois',
            'Dom Quixote prometeu não fugir e a porta se abriu',
            'Rocinante galopou atrás de uma romaria na estrada',
            'A sobrinha e a governanta abraçaram Dom Quixote na aldeia'
          ],
          dica: 'Siga os capítulos: bacielmo, jaula, palavra de honra, romaria, chegada em casa.',
          porque: 'Da pousada até a aldeia, uma viagem e tanto!'
        },
        {
          tipo: 'enigma',
          pergunta: 'A última frase da página diz: um cavaleiro andante descansa, sim, mas nunca, nunca para de... Monte o verbo.',
          resposta: 'SONHAR',
          extras: 'ML',
          dica: 'É a última palavra do último parágrafo desta página.',
          porque: 'E é por isso que o segundo livro ainda vai começar!'
        }
      ],
      sabia: 'Cervantes escreveu "Quijote", com J. Em português ficou "Quixote", com X, mas o som é o mesmo.'
    }
  }
};
