/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 7 (RASCUNHO). Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 7,
  paginas: {
    // Capítulo 52 — Conselhos para um Governador
    1: {
      titulo: 'Conselhos e ditados',
      selo: '💡',
      convite: 'Dom Quixote tem conselhos de sobra, e Sancho tem ditados de sobra. Quem tem mais?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada conselho de Dom Quixote para o lugar certo: o que cuida do coração e da cabeça, ou do corpo.',
          grupos: ['🧠 Coração e cabeça', '🧼 Corpo'],
          itens: [
            { texto: 'Não ter vergonha de ser filho de lavradores', grupo: 0 },
            { texto: 'Tratar do mesmo jeito o rico e o pobre', grupo: 0 },
            { texto: 'Deixar a justiça de mãos dadas com o perdão', grupo: 0 },
            { texto: 'Cortar as unhas', grupo: 1 },
            { texto: 'Não comer alho nem cebola antes das reuniões', grupo: 1 },
            { texto: 'Não arrotar na mesa', grupo: 1 }
          ],
          dica: 'Releia o segundo parágrafo e depois o terceiro, que começa com "conselhos para o corpo".',
          porque: 'Nem unzinho! Até o arroto entrou na lista.'
        },
        {
          tipo: 'ligar',
          pergunta: 'Ligue o começo ao fim de cada frase. Três são ditados de Sancho; uma é conselho de Dom Quixote.',
          pares: [
            ['Quem avisa', 'amigo é'],
            ['Em boca fechada', 'não entra mosca'],
            ['Devagar', 'se vai ao longe'],
            ['A justiça fica mais bonita', 'de mãos dadas com o perdão']
          ],
          dica: 'Os ditados estão no quarto parágrafo. O conselho está no segundo.',
          porque: 'Os ditados saíram todos juntos, feito galinha no galinheiro!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz que os ditados "moram na minha boca" e saem "feito galinha quando abrem o galinheiro". O que ele quer dizer?',
          opcoes: [
            'Que os ditados saem sem ele ter tempo de escolher',
            'Que ele guarda galinhas dentro da boca',
            'Que os ditados só aparecem de manhã cedo',
            'Que ele decorou todos para o governo'
          ],
          certa: 0,
          dica: 'Releia o quarto parágrafo: Dom Quixote reclamou de quantos ditados de uma vez?',
          porque: 'Abriu a porta, saiu tudo de uma vez, e ninguém segura!'
        }
      ],
      sabia: 'No livro de Cervantes, Dom Quixote dá estes conselhos a Sancho nos capítulos 42 e 43 do segundo volume, que saiu em 1615.'
    },

    // Capítulo 53 — A Ilha sem Mar
    2: {
      titulo: 'O juiz e os chapeuzinhos',
      selo: '🎩',
      convite: 'Cinco chapéus do tamanho de um dedo! Pense como um juiz: quem errou?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Complete o resumo do caso com as palavras certas.',
          texto: 'O lavrador foi pedindo um ___, depois dois, até ___ chapéus. O alfaiate fez todos do tamanho da ponta do ___.',
          respostas: ['chapéu', 'cinco', 'dedo'],
          distratores: ['casaco', 'dez', 'nariz'],
          dica: 'Releia o quarto parágrafo, a conversa do lavrador com o alfaiate.',
          porque: 'Cinco chapéus, e nenhum cabia em cabeça de gente!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz: "Um quis ser mais esperto que o outro, e os dois se deram mal." O que cada um perdeu?',
          opcoes: [
            'O lavrador perdeu o pano, e o alfaiate perdeu o pagamento',
            'O lavrador perdeu o chapéu, e o alfaiate perdeu a tesoura',
            'Os dois perderam a vaga de governador',
            'Os dois perderam a vergonha'
          ],
          certa: 0,
          dica: 'Releia a decisão de Sancho, no último parágrafo da página.',
          porque: 'E os chapeuzinhos foram parar nas bonecas das crianças. Ninguém saiu sem nada!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Sancho disse que um quis ser mais ___ que o outro. Troque os desenhos pelas letras da chave e descubra a palavra.',
          resposta: 'ESPERTO',
          extras: 'AB',
          cifra: {
            mensagem: '🌙🔔⭐🌙🍀🌳🐟',
            chave: [['🌙', 'E'], ['🔔', 'S'], ['⭐', 'P'], ['🍀', 'R'], ['🌳', 'T'], ['🐟', 'O']]
          },
          dica: 'Releia a decisão de Sancho: a palavra vem logo depois de "mais".',
          porque: 'Esperto demais acaba se enrolando na própria linha!'
        }
      ],
      sabia: 'No livro de Cervantes, Barataria é só uma vila, e fica em terra firme. O nome lembra a palavra "barato": o governo saiu de graça para Sancho.'
    },

    // Capítulo 54 — O Doutor Tira-Prato
    3: {
      titulo: 'As razões do doutor',
      selo: '🥄',
      convite: 'Torta some, torresmo some, frango some... mas uma maçã escapou. Você descobre por quê?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada comida ao que o doutor disse sobre ela.',
          pares: [
            ['Torta de creme e açúcar', 'tanto açúcar faz o dente chorar'],
            ['Torresmo', 'tanta gordura deixa a barriga pesada'],
            ['Frango', 'tem asa e pode querer sair voando'],
            ['Maçã', 'fruta pode, fruta faz bem']
          ],
          dica: 'Releia o segundo e o terceiro parágrafos: a varinha e a fala do doutor.',
          porque: 'Até o frango virou ave de fuga na barriga do governador!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz: "Comer bem não é comer quase nada." Qual é a ideia dele?',
          opcoes: [
            'Comer de tudo um pouco, com fruta e verdura no prato',
            'Comer só pão e queijo, todos os dias',
            'Comer muita torta, mas só em dia de festa',
            'Comer só bolachinhas bem fininhas'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo, logo depois do jantar do governador.',
          porque: 'Nem tudo nem nada: um pouco de cada coisa, e fruta sempre!'
        },
        {
          tipo: 'erro',
          pergunta: 'O mordomo anotou tudo trocado no caderninho! Toque nas 3 palavras erradas para corrigir.',
          texto: 'O doutor tocava os pratos com uma [[colher|varinha]]. Sancho escondeu uma [[pera|maçã]] atrás das costas. No jantar, comeu pão, queijo, cebola e sopa de [[carne|legumes]].',
          dica: 'Releia o primeiro parágrafo, o terceiro e o último.',
          porque: 'Varinha, maçã e sopa de legumes: o jantar foi bem melhor que as bolachinhas!'
        }
      ],
      sabia: 'No original, a terra do doutor se chama Tirteafuera, e Cervantes faz uma brincadeira com isso: o nome parece "tire-se para fora"!'
    },

    // Capítulo 55 — O Velhinho Espertinho
    4: {
      titulo: 'O caso da bengala',
      selo: '⚖️',
      convite: 'Dez moedas sumiram e ninguém viu nada. Que pista resolve o caso?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Que pista fez Sancho desconfiar do velhinho da bengala?',
          opcoes: [
            'Ele pediu ao vizinho que segurasse a bengala só na hora de jurar',
            'Ele jurou em voz muito alta',
            'Ele saiu de cabeça baixa',
            'A bengala dele era grossa e de madeira'
          ],
          certa: 0,
          dica: 'Releia o que Sancho pensa em voz alta, no quarto parágrafo.',
          porque: 'Quem segura a bengala na hora do juramento? Aí tem coisa!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a trapaça do velhinho, do começo até o CLEC!',
          itens: [
            'Ele pede ao vizinho que segure a bengala por um instante',
            'Com a mão no peito, jura que entregou as moedas nas mãos dele',
            'Ele pega a bengala de volta e sai bem tranquilo',
            'Sancho manda chamá-lo e pede a bengala',
            'A bengala se abre e as dez moedas rolam pelo chão'
          ],
          dica: 'Releia o segundo parágrafo e depois o quarto e o quinto.',
          porque: 'Quase deu certo. Sancho só precisava de uma bengala e de uma boa pergunta.'
        }
      ],
      sabia: 'Esse caso também está em Cervantes (Segunda Parte, cap. 45). Lá, Sancho manda o devedor entregar a bengala ao credor como pagamento e depois a quebra: as moedas estavam dentro.'
    },

    // Capítulo 56 — A Ponte da Pergunta Difícil
    5: {
      titulo: 'Passa ou não passa?',
      selo: '🌉',
      convite: 'Se ele passa, mentiu. Se vai preso, falou a verdade. Até os guardas ficaram tontos!',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Complete para ver por que o caso da ponte é um nó.',
          texto: 'O homem disse: "Eu vou para a ___". Se o deixassem passar, ele teria ___; se o prendessem, teria dito a ___.',
          respostas: ['cadeia', 'mentido', 'verdade'],
          distratores: ['feira', 'vencido'],
          dica: 'Releia o segundo parágrafo, com a lei da ponte, e o terceiro, com o raciocínio dos guardas.',
          porque: 'Passando ou preso, os guardas ficavam errados. Dá tontura!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada pensamento para o prato da balança em que ele pesa.',
          grupos: ['🔒 Razão para prender', '🕊️ Razão para soltar'],
          itens: [
            { texto: 'Quem mente vai para a cadeia', grupo: 0 },
            { texto: 'Se ele passar, não foi para a cadeia: então mentiu', grupo: 0 },
            { texto: 'Quem diz a verdade atravessa a ponte', grupo: 1 },
            { texto: 'Se for preso, foi mesmo para a cadeia: então disse a verdade', grupo: 1 }
          ],
          dica: 'Releia o terceiro parágrafo, o raciocínio dos guardas, e depois a fala de Sancho no último.',
          porque: 'Dois pratos com o mesmo peso: a balança ficou parada no meio.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho decidiu deixar o homem passar?',
          opcoes: [
            'As razões pesavam igual, e na dúvida é melhor perdoar',
            'Porque o homem prometeu nunca mais passar por lá',
            'Porque os guardas ficaram tontos e foram dormir',
            'Porque o viajante pediu com muita educação'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo: o que Sancho diz quando os dois lados pesam igual?',
          porque: 'O amo ensinou: a justiça fica mais bonita de mãos dadas com o perdão.'
        }
      ],
      sabia: 'Um problema em que qualquer resposta parece desmentir a si mesma se chama paradoxo. Este está em Cervantes, na Segunda Parte (cap. 51); no livro original a punição era bem mais dura, e aqui virou cadeia.'
    },

    // Capítulo 57 — O Colar de Corais
    6: {
      titulo: 'Notícias na aldeia',
      selo: '📿',
      convite: 'A carta chega com colar e tudo. Mas tem alguém que está prestando atenção demais...',
      etapas: [
        {
          tipo: 'enigma',
          pergunta: 'Quem sou eu? Sou o moço que leva recados do palácio e chega a cavalo, de chapéu na mão.',
          resposta: 'PAJEM',
          extras: 'LT',
          dica: 'A palavra vem em letras grandes e explicada no começo da página.',
          porque: 'Um entregador de recados com chapéu e cavalo!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar de onde ela veio.',
          grupos: ['🏰 Veio do palácio', '🏡 Saiu da aldeia'],
          itens: [
            { texto: 'O colar de corais', grupo: 0 },
            { texto: 'A carta para Teresa', grupo: 0 },
            { texto: 'O moço que trouxe os presentes', grupo: 0 },
            { texto: 'O queijo para a duquesa', grupo: 1 },
            { texto: 'As bolotas escolhidas uma por uma', grupo: 1 }
          ],
          dica: 'Releia o segundo parágrafo e depois o penúltimo.',
          porque: 'Cada lado mandou o melhor que tinha!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sansão puxou conversa com o pajem "como quem não quer nada"?',
          opcoes: [
            'Queria saber por onde Dom Quixote ia passar',
            'Queria entregar o queijo ao pajem',
            'Estava com saudade do palácio',
            'Teresa pediu para ele cuidar da carta'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo: o que Sansão perguntou e o que ele foi pedir emprestado depois?',
          porque: 'Quem faz uma pergunta "à toa" e depois pede tinta branca está planejando algo.'
        }
      ],
      sabia: 'Coral é, na verdade, formado por pequenos animais do mar. Por isso os colares de coral vermelho eram joias valiosas e raras.'
    },

    // Capítulo 58 — A Saudade de Dom Quixote
    7: {
      titulo: 'Cartas de amigo',
      selo: '✍️',
      convite: 'Um cavaleiro e um governador trocam cartas. Em qual delas cada coisa foi dita?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Complete a carta de Dom Quixote a Sancho.',
          texto: 'Seja bom com os ___. Visite a feira e a ___. E não esqueça de cortar as ___.',
          respostas: ['pobres', 'padaria', 'unhas'],
          distratores: ['ricos', 'igreja'],
          dica: 'Releia o segundo parágrafo, que começa com "Então pegou pena e papel".',
          porque: 'Até na carta o conselho das unhas apareceu!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que aconteceu com as cartas.',
          itens: [
            'A meia de Dom Quixote se desfiou e ele ficou sem ter a quem mostrar',
            'Dom Quixote escreveu a carta para Sancho',
            'O mordomo leu a carta em voz alta, porque Sancho não lia',
            'Sancho ditou a resposta, com três Ós no zurro do burrico',
            'O mordomo avisou que o governador precisava assinar'
          ],
          dica: 'Siga os parágrafos do primeiro até o último.',
          porque: 'Ditar não é fácil: o Ó faltando no zurro seria um desastre!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este resumo da resposta de Sancho tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Sancho mandou dizer que governar dá muito [[descanso|trabalho]] e pouca comida. Um [[padre|doutor]] não o deixava jantar. E a lei nova era que o [[queijo|pão]] da ilha fosse grande e barato.',
          dica: 'Releia o terceiro parágrafo, a resposta que Sancho ditou.',
          porque: 'Pão grande e barato: a primeira lei do governador Pança!'
        }
      ],
      sabia: 'A palavra "assinar" vem do latim "signum", que quer dizer "sinal": a assinatura é o sinal que cada pessoa deixa no papel.'
    },

    // Capítulo 59 — O Ataque de Mentira
    8: {
      titulo: 'A ilha de mentira',
      selo: '🐢',
      convite: 'Gritos, sinos e dois escudos! Sancho entendeu tudo, e agora você também vai entender.',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Sancho compara a vida de governador com a vida de antes. Mande cada frase para o lugar certo.',
          grupos: ['🫏 Andando com o burrico', '👑 Depois de governador'],
          itens: [
            { texto: 'Os dias eram felizes', grupo: 0 },
            { texto: 'Só pensava em remendar a sela e encher a barriga do burrico', grupo: 0 },
            { texto: 'Ganhou mil preocupações', grupo: 1 },
            { texto: 'Nem um jantar sossegado', grupo: 1 },
            { texto: 'Acordou no meio da noite com sinos e tambores', grupo: 1 }
          ],
          dica: 'Releia o quarto parágrafo, a conversa de Sancho com o burrico.',
          porque: 'Para Sancho, felicidade era um burrico de barriga cheia.'
        },
        {
          tipo: 'enigma',
          pergunta: 'Preso entre dois escudos, Sancho ficou balançando de barriga para cima, feito um bicho de casco. Que bicho?',
          resposta: 'TARTARUGA',
          extras: 'MS',
          dica: 'A palavra aparece em letras grandes no segundo parágrafo.',
          porque: 'Uma tartaruga de touca, imagine a cena!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho disse "Eu sabia!" ao olhar para os pés do mordomo?',
          opcoes: [
            'Reconheceu as botas da condessa barbuda, e a voz também combinava',
            'Viu que as botas do mordomo eram novas',
            'Percebeu que o mordomo estava com frio',
            'Achou que as botas eram do governador'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo e lembre da voz grossa de que Sancho já desconfiava na página dos conselhos.',
          porque: 'Botas de homem na condessa e voz grossa no mordomo: só podia ser a mesma pessoa!'
        }
      ],
      sabia: 'No livro de Cervantes, ao deixar o governo, Sancho diz que nasceu sem nada e sai sem nada: "nem perco nem ganho".'
    },

    // Capítulo 60 — A Voz no Buraco
    9: {
      titulo: 'Quem reconheceu quem',
      selo: '🕳️',
      convite: 'Um cheiro, um zurro e uma voz fraquinha. Quem foi o primeiro a reconhecer o amigo?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Complete a frase com as palavras certas.',
          texto: 'Dom Quixote achou que a voz era de um ___, porque Sancho devia estar governando uma ___. Só se convenceu ao ouvir o ___ do burrico.',
          respostas: ['fantasma', 'ilha', 'zurro'],
          distratores: ['gigante', 'floresta', 'relincho'],
          dica: 'Releia o terceiro e o quarto parágrafos.',
          porque: 'Fantasma nenhum zurra assim: IIIH-ÓÓÓ!'
        },
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada um ao que fez nesta página.',
          pares: [
            ['Rocinante', 'sentiu o cheiro do amigo'],
            ['Dom Quixote', 'reconheceu o zurro'],
            ['Sancho', 'repartiu o pão com o burrico'],
            ['Os criados', 'puxaram os dois com cordas']
          ],
          dica: 'Releia a página do começo ao fim, uma ação por parágrafo.',
          porque: 'Cada um fez a sua parte no resgate!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz: "Governei uma ilha inteirinha e não tinha a quem dizer um ditado." O que isso mostra?',
          opcoes: [
            'Que ele sentiu falta de Dom Quixote para conversar',
            'Que ele esqueceu todos os ditados',
            'Que a ilha não tinha ninguém para ouvir',
            'Que ele queria governar de novo'
          ],
          certa: 0,
          dica: 'Releia a última fala de Dom Quixote: ele também sentiu falta de contar algo. Do quê?',
          porque: 'Um com a meia rasgada, o outro com os ditados guardados: os dois sentiam saudade.'
        }
      ],
      sabia: 'No livro de Cervantes, o burrico de Sancho se chama Rucio, palavra que quer dizer de cor parda, entre cinza e marrom. Em português, "ruço" ainda quer dizer isso.'
    },

    // Capítulo 61 — A Despedida do Palácio (recapitulação da parte)
    10: {
      titulo: 'Recapitulando a Parte 7',
      selo: '🕊️',
      convite: 'Dos chapeuzinhos ao buraco, de Barataria à estrada: o que ficou na sua memória de juiz?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem estes momentos da Parte 7.',
          itens: [
            'Sancho julgou o caso dos cinco chapeuzinhos',
            'O doutor Rezio foi mandado embora da mesa',
            'Sancho descobriu a bengala com as moedas',
            'O ataque de mentira acordou a ilha no meio da noite',
            'Sancho e o burrico caíram num buraco fundo'
          ],
          dica: 'Siga a ordem das páginas: tribunal, mesa, bengala, ataque e buraco.',
          porque: 'Em dez dias, que governo!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa da Parte 7 para o lugar certo: era de faz de conta ou de verdade?',
          grupos: ['🎭 Faz de conta', '💛 De verdade'],
          itens: [
            { texto: 'Barataria ser uma ilha', grupo: 0 },
            { texto: 'O mar que estava "de folga"', grupo: 0 },
            { texto: 'O ataque dos inimigos', grupo: 0 },
            { texto: 'A sabedoria de Sancho', grupo: 1 },
            { texto: 'A saudade dos dois amigos', grupo: 1 },
            { texto: 'O zurro do burrico no buraco', grupo: 1 }
          ],
          dica: 'Releia o segundo parágrafo da última página, a conversa de Sancho com a duquesa.',
          porque: 'A ilha era de mentira, mas o amigo e o zurro eram de verdade.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Dom Quixote diz: "A ilha era de mentira. Mas o governador foi de verdade." O que ele quer dizer?',
          opcoes: [
            'Que Sancho governou com sabedoria, mesmo numa ilha inventada',
            'Que Sancho também era de faz de conta',
            'Que a ilha virou de verdade depois',
            'Que o duque não existia'
          ],
          certa: 0,
          dica: 'Releia a conversa com a duquesa: ela diz que algo "era de verdade".',
          porque: 'O que Sancho fez de bom foi de verdade, mesmo com o cenário de teatro.'
        }
      ],
      sabia: 'A fala de Dom Quixote sobre a liberdade é um dos trechos mais famosos do livro. Cervantes foi prisioneiro por vários anos em Argel, na África, e conhecia bem o valor de ser livre.'
    }
  }
};
