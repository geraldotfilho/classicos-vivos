/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 5. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 5,
  paginas: {
    // Capítulo 34 — A Vassoura da Governanta
    1: {
      titulo: 'A vassoura e o segredo',
      selo: '🧹',
      convite: 'Um desconhecido sabe o nome do burrico de Sancho. Será que você descobre o que está acontecendo?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que o padre contou que "vem perigo pelo mar", como quem não quer nada?',
          opcoes: [
            'Para ver se Dom Quixote tinha mesmo sossegado',
            'Porque o rei pediu a ajuda dos dois amigos',
            'Porque ele morria de medo do mar',
            'Para assustar a sobrinha e a governanta'
          ],
          certa: 0,
          dica: 'Releia o começo do terceiro parágrafo: o que o padre queria descobrir?',
          porque: 'E Dom Quixote caiu direitinho: já foi chamando os cavaleiros andantes!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto da porta da casa tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Na porta, a governanta, de [[espada|vassoura]] na mão, não deixava Sancho entrar. Ele tentou passar pela direita, pela esquerda e [[por cima|por baixo]], até que a [[cabeça|barriga]] entalou.',
          dica: 'Releia o quarto parágrafo, o da barulheira na porta da rua.',
          porque: 'Com aquela vassoura fazendo cócegas no nariz, só podia dar ATCHIM!'
        }
      ],
      sabia: 'Dom Quixote tem dois volumes. O primeiro saiu em 1605, e o segundo, que começa neste capítulo, só em 1615. Cervantes fez os leitores esperarem dez anos!'
    },

    // Capítulo 35 — Viramos Livro!
    2: {
      titulo: 'Sancho entre as formiguinhas',
      selo: '📚',
      convite: 'Sancho não sabe ler, mas quer achar o próprio nome no livro. Dá para ajudá-lo?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada um ao que ele pensa ou faz nesta cena.',
          pares: [
            ['Sansão Carrasco', 'Conta que as aventuras viraram livro'],
            ['Dom Quixote', 'Culpa um mago invisível por saber de tudo'],
            ['Sancho', 'Acha o livro verdadeiro por causa do burrico'],
            ['Um chinelo', 'O que Sancho achou debaixo da cama']
          ],
          dica: 'Releia o terceiro e o quarto parágrafos.',
          porque: 'Sancho olhou até debaixo da cama, por via das dúvidas!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz: "Então o livro é verdadeiro." Qual é a razão dele?',
          opcoes: [
            'O burrico dele também está no livro',
            'O nome dele está escrito em letras grandes',
            'Sansão jurou que tudo era verdade',
            'Dom Quixote leu tudo em voz alta'
          ],
          certa: 0,
          dica: 'Releia a pergunta que Sancho faz logo antes dessa frase.',
          porque: 'Para Sancho, se o burrico está lá, a história só pode ser coisa séria!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Para Sancho, as letras parecem formiguinhas em fila. Decifre o código de bichinhos e descubra o que Sansão trouxe.',
          resposta: 'LIVRO',
          extras: 'AE',
          cifra: {
            mensagem: '🐜🐝🦋🐞🐌',
            chave: [['🐜', 'L'], ['🐝', 'I'], ['🦋', 'V'], ['🐞', 'R'], ['🐌', 'O']]
          },
          dica: 'Olhe o título desta página: é a coisa mais falada da Espanha.',
          porque: 'Quem sabe decifrar código já está quase aprendendo a ler!'
        }
      ],
      sabia: 'No segundo volume, Dom Quixote e Sancho sabem que o primeiro volume foi publicado e que as pessoas o leram. Cervantes pôs os personagens dentro de um livro que fala do próprio livro!'
    },

    // Capítulo 36 — A Terceira Saída
    3: {
      titulo: 'As pistas de Sansão',
      selo: '🤫',
      convite: 'Algo está sendo preparado na aldeia, e ninguém conta o quê. Vamos juntar as pistas?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho abriu um berreiro quando Sansão disse que podia ser o escudeiro?',
          opcoes: [
            'Tinha medo de perder o lugar de escudeiro',
            'Achava que Sansão era fraco demais para a estrada',
            'Queria que Dom Quixote ficasse em casa',
            'Não gostava de viajar à noite'
          ],
          certa: 0,
          dica: 'Releia o que Sancho gritou, no meio da página.',
          porque: 'Ele agarrou a perna do amo feito carrapato. Lugar de escudeiro não se empresta!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar certo: pista do mistério ou só a vida de todo dia?',
          grupos: ['🔎 Pista do mistério', '🏡 Rotina da aldeia'],
          itens: [
            { texto: 'Um saco que fazia tlim-tlim e brilhava', grupo: 0 },
            { texto: 'Tomé, rindo diante do espelho com uma coisa comprida', grupo: 0 },
            { texto: 'Duas sombras a cavalo seguindo os dois', grupo: 0 },
            { texto: 'A governanta suspirando na janela', grupo: 1 },
            { texto: 'Rocinante relinchando e o burrico zurrando', grupo: 1 },
            { texto: 'Teresa ajeitando a gola de Sancho', grupo: 1 }
          ],
          dica: 'Pista é o que é estranho e fica sem explicação. Releia o quarto e o último parágrafos.',
          porque: 'Tlim... tlim... Quem será que anda por aí fazendo esse barulho?'
        }
      ],
      sabia: 'Miguel de Cervantes e William Shakespeare, o grande autor inglês, morreram no mesmo ano: 1616.'
    },

    // Capítulo 37 — A Carroça dos Atores
    4: {
      titulo: 'Quem é de verdade, quem é teatro',
      selo: '🎭',
      convite: 'Um diabinho, um anjo e um rei na estrada! Será que Dom Quixote vai cair nessa?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Toque nas palavras certas para completar a frase sobre a carroça.',
          texto: 'Os ___ de teatro vestem ___ para fazer de conta. O palhaço trazia ___ na roupa, uns sininhos redondos.',
          respostas: ['atores', 'fantasias', 'guizos'],
          distratores: ['cavaleiros', 'armaduras'],
          dica: 'As três palavras estão nos parágrafos em que o diabinho se explica e o palhaço chega.',
          porque: 'Tlim, tlim! Com tantos sininhos, o palhaço nunca chegava de surpresa.'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a confusão que o palhaço começou.',
          itens: [
            'O palhaço sacudiu os guizos e as bolas: tlim, PÓ, PÓ!',
            'Rocinante levou um susto e saiu disparado pelo campo',
            'Dom Quixote escorregou da sela e caiu sentado no capim',
            'O palhaço pulou no burrico e saiu trotando',
            'O burrico parou de repente e o palhaço caiu sentado'
          ],
          dica: 'Releia o quarto e o quinto parágrafos, um depois do outro.',
          porque: 'No fim, o burrico foi o único que não perdeu a calma.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho quase caiu para trás quando Dom Quixote baixou a lança?',
          opcoes: [
            'Pela primeira vez, o amo viu as coisas como elas eram',
            'Dom Quixote tinha derrubado o diabinho',
            'O burrico empurrou Sancho sem querer',
            'O palhaço assustou Sancho com os guizos'
          ],
          certa: 0,
          dica: 'Releia o terceiro parágrafo: o que Dom Quixote reparou antes de baixar a lança?',
          porque: 'Chifres de papelão, asas de pano, coroa de lata: Dom Quixote olhou com atenção!'
        }
      ],
      sabia: 'A palavra "palhaço" vem do italiano pagliaccio, que vem de paglia, a palavra italiana para "palha".'
    },

    // Capítulo 38 — O Escudeiro Narigudo
    5: {
      titulo: 'O escudeiro de voz fanhosa',
      selo: '👃',
      convite: 'O novo amigo de Sancho tem uma voz que lembra alguém. Por que será?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada expressão ao que ela quer dizer neste capítulo.',
          pares: [
            ['voz fanhosa', 'voz de quem está com o nariz entupido'],
            ['suspiro comprido', 'jeito de quem sente muita saudade'],
            ['contar vantagem', 'se gabar do que já fez'],
            ['obedecer', 'fazer o que o vencedor mandar']
          ],
          dica: 'Cada expressão vem explicada na própria frase onde aparece. Releia os parágrafos 1, 2 e 4.',
          porque: 'No bosque, até os suspiros têm explicação!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho disse que a voz do escudeiro lembrava alguém. Por que ele respondeu "Deve ser a empada!"?',
          opcoes: [
            'Para distrair Sancho e não ser descoberto',
            'Porque a empada falava igual a ele',
            'Porque estava morrendo de rir da empada',
            'Porque a empada estava quentinha demais'
          ],
          certa: 0,
          dica: 'Veja o que ele fez logo depois de responder, no terceiro parágrafo.',
          porque: 'Boca cheia não faz perguntas! Sancho nem desconfiou.'
        }
      ],
      sabia: 'A palavra "escudeiro" vem de "escudo". Antigamente, o escudeiro era quem carregava o escudo do cavaleiro.'
    },

    // Capítulo 39 — O Cavaleiro dos Espelhos
    6: {
      titulo: 'O tombo do Cavaleiro dos Espelhos',
      selo: '✨',
      convite: 'Dom Quixote venceu, mas será que foi por causa da força? Descubra como tudo aconteceu.',
      etapas: [
        {
          tipo: 'enigma',
          pergunta: 'Charada: eu brilho tanto que dói olhar para mim. A armadura do cavaleiro estava coberta de mim. O que sou?',
          resposta: 'ESPELHO',
          extras: 'AX',
          dica: 'Olhe o nome do cavaleiro, no primeiro parágrafo.',
          porque: 'Sem espelho, ninguém saberia que ele estava chegando: tlim-tlim!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que levou o cavaleiro ao tombo.',
          itens: [
            'O cavaleiro parou para esperar Dom Quixote',
            'O cavalo dele baixou a cabeça e começou a comer capim',
            'A lança dele enroscou nos espelhinhos da armadura',
            'A lança de Dom Quixote só encostou no escudo dele',
            'O Cavaleiro dos Espelhos caiu sentado na grama: PLOFT!'
          ],
          dica: 'Releia o segundo e o terceiro parágrafos, com calma.',
          porque: 'Foi uma queda de lado a lado: o cavalo guloso e a lança enroscada.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Sancho diz que a vitória não veio da força de Dom Quixote. De onde ela veio?',
          opcoes: [
            'Da gula de um cavalo e da trapalhada do outro cavaleiro',
            'De uma lança mágica de Dom Quixote',
            'De um galope heroico de Rocinante',
            'Dos espelhinhos, que cegaram o cavaleiro'
          ],
          certa: 0,
          dica: 'Releia o quarto parágrafo: o que Sancho gritou lá de cima e o que o narrador explicou?',
          porque: 'Mas vitória é vitória! Ponto para o capim.'
        }
      ],
      sabia: 'A palavra "espelho" vem do latim speculum, que vem de specere: "olhar". Espelho é, bem ao pé da letra, uma coisa de olhar!'
    },

    // Capítulo 40 — Requeijão no Bacielmo
    7: {
      titulo: 'Magos ou requeijão?',
      selo: '🧀',
      convite: 'Tudo se explica, mas Dom Quixote tem as suas explicações. E Sancho também!',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada frase para o lugar certo: a explicação com magos ou o que realmente aconteceu.',
          grupos: ['🧙 Explicação com magos', '🔎 O que realmente houve'],
          itens: [
            { texto: 'Magos deram ao cavaleiro a cara do amigo', grupo: 0 },
            { texto: 'Os magos puseram o requeijão no bacielmo', grupo: 0 },
            { texto: 'O cavaleiro vencido era mesmo o Sansão', grupo: 1 },
            { texto: 'O narigão do escudeiro era de papelão', grupo: 1 },
            { texto: 'Sancho guardou o requeijão no bacielmo', grupo: 1 }
          ],
          dica: 'Releia o começo da página e o final, quando Dom Quixote cheira o bacielmo.',
          porque: 'Magos que compram requeijão? Até Dom Quixote desconfiou!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Dom Quixote mistura duas palavras num nome só: uma bacia e um elmo. Monte o nome que ele dá a esse elmo.',
          resposta: 'BACIELMO',
          extras: 'TR',
          dica: 'Está em letras grandes no parágrafo em que Dom Quixote pede a Sancho que lhe passe o elmo.',
          porque: 'Bacia + elmo = bacielmo. Uma palavra-sanduíche!'
        }
      ],
      sabia: 'La Mancha, a terra de Dom Quixote, fica no centro da Espanha e é famosa pelo queijo manchego.'
    },

    // Capítulo 41 — Um Leão de Verdade
    8: {
      titulo: 'O medo também sabe das coisas',
      selo: '🚩',
      convite: 'Dom Diego e Sancho tentam avisar o cavaleiro. O que um bom aviso quer dizer?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'O que Dom Diego quis dizer com "o medo avisa, e é bom escutar"?',
          opcoes: [
            'Diante de um perigo de verdade, o medo ajuda a se proteger',
            'Cavaleiros devem fugir de todos os bichos',
            'O medo só serve para os escudeiros',
            'Leões só atacam quem tem medo'
          ],
          certa: 0,
          dica: 'Releia o terceiro parágrafo: ele fala de perigo "de verdade".',
          porque: 'O medo é um alarme: bom escutar antes de tocar a jaula!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado que combina com o conselho de Dom Diego.',
          texto: 'Cautela e ___ de ___ não fazem mal a ninguém.',
          respostas: ['caldo', 'galinha'],
          distratores: ['pão', 'ovo'],
          dica: 'Pense no que a governanta deu a Dom Quixote durante o mês de descanso: algo quentinho.',
          porque: 'Ou seja: ter cuidado nunca atrapalha, nem tomar um bom caldinho.'
        }
      ],
      sabia: 'A palavra "coragem" vem de "cor", que em latim quer dizer "coração".'
    },

    // Capítulo 42 — O Leão que Bocejou
    9: {
      titulo: 'Recapitulando a Parte 5',
      selo: '🦁',
      convite: 'Do quarto de Dom Quixote até a jaula do leão: será que você guardou a viagem inteira?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada personagem ao que ele fez ou foi na história.',
          pares: [
            ['Sansão Carrasco', 'Era o Cavaleiro dos Espelhos'],
            ['Tomé', 'Escudeiro do nariz de papelão'],
            ['Dom Diego', 'Cavaleiro do Casaco Verde'],
            ['A governanta', 'Barrou Sancho com a vassoura'],
            ['O tratador', 'Abriu a jaula do leão']
          ],
          dica: 'Releia as páginas "O Plano Secreto de Sansão" e "Requeijão no Bacielmo".',
          porque: 'As duas sombras da estrada tinham nome, e um nariz de papelão!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem estes momentos da Parte 5.',
          itens: [
            'Sancho soube que os dois viraram personagens de um livro',
            'Os dois encontraram a carroça dos atores fantasiados',
            'Dom Quixote derrubou o Cavaleiro dos Espelhos',
            'O requeijão de Sancho foi parar dentro do bacielmo',
            'Dom Quixote esperou parado diante do leão'
          ],
          dica: 'Siga os capítulos: livro, carroça, espelhos, requeijão e, por último, a jaula.',
          porque: 'Em poucos dias, que viagem!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Qual era o plano secreto de Sansão, e como ele terminou?',
          opcoes: [
            'Vencer Dom Quixote e mandá-lo para casa; Sansão perdeu',
            'Roubar o livro dos dois; Sancho descobriu',
            'Dar a ilha a Sancho; o leão apareceu',
            'Enganar o padre; a governanta contou'
          ],
          certa: 0,
          dica: 'Releia o terceiro parágrafo de "Requeijão no Bacielmo".',
          porque: 'Sansão entende de livros, mas não entende de cavalos gulosos!'
        }
      ],
      sabia: 'Em 1614, antes de Cervantes terminar o seu segundo volume, saiu uma continuação falsa, assinada por "Avellaneda". Cervantes respondeu a ela dentro do seu próprio livro.'
    }
  }
};
