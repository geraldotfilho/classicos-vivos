/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 6. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 6,
  paginas: {
    // 1 — A Casa do Silêncio
    1: {
      titulo: 'O Silêncio de Dom Diego',
      selo: '🧀',
      convite: 'Na casa sossegada, uma coisa deixa o dono da casa muito intrigado. Você descobre qual?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha os acontecimentos na ordem em que aparecem na página.',
          itens: [
            'Lourenço cochicha que o cavaleiro é muito diferente',
            'Dom Quixote aplaude de pé os poemas de Lourenço',
            'No quarto dia, Dom Quixote quer ir à Gruta de Montesinos',
            'Dom Diego dá o último conselho: cuidado com os leões'
          ],
          dica: 'Siga os parágrafos de cima para baixo, um por um.',
          porque: 'Quatro dias de requeijão e muito silêncio... até o cavaleiro enjoar do sossego!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Diego coçava a cabeça?',
          opcoes: [
            'Achava estranho: falar tão bonito de poesia e enfrentar um leão',
            'Tinha achado os poemas de Lourenço muito ruins',
            'Queria que Sancho dormisse mais um dia',
            'Tinha medo de que os leões chegassem à casa dele'
          ],
          certa: 0,
          dica: 'Releia o fim do terceiro parágrafo.',
          porque: 'Poeta e Cavaleiro dos Leões na mesma pessoa: haja cabeça para coçar!'
        }
      ],
      sabia: 'O segundo volume de Dom Quixote saiu em 1615, dez anos depois do primeiro. Nele, o próprio Dom Quixote já sabe que existe um livro contando as aventuras dele.'
    },

    // 2 — A Festa das Panelas
    2: {
      titulo: 'A Panela Mais Generosa',
      selo: '🥘',
      convite: 'Tem festa, tem panelão e tem um estudante curioso. Será que você sabe quem disse o quê?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada fala a quem a disse.',
          pares: [
            ['Sancho', '“...mas vi a panela. E gostei muito!”'],
            ['O cozinheiro', '“Hoje ninguém passa fome, meu amigo!”'],
            ['O Primo', '“Vai ficar linda no meu livro!”'],
            ['Dom Quixote', '“Sancho, você nem viu a noiva.”']
          ],
          dica: 'Releia as conversas dos parágrafos 2 a 5.',
          porque: 'Sancho tem um jeito só de ver casamento: pelo cheiro!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado que combina com Sancho diante do panelão.',
          texto: 'Diz o ditado: "A ___ é o melhor ___." Com a barriga roncando, até pão seco parece banquete!',
          respostas: ['fome', 'tempero'],
          distratores: ['sede', 'sal', 'pressa'],
          dica: 'Pense em quem chegou à festa com o nariz no vento e a barriga vazia.',
          porque: 'É por isso que, para Sancho, a espuma da panela virou festa.'
        }
      ],
      sabia: 'No livro de Cervantes, Sancho Pança é famoso por falar em ditados populares, um atrás do outro, o que deixa Dom Quixote sem paciência.'
    },

    // 3 — A Gruta de Montesinos
    3: {
      titulo: 'O Mistério da Gruta',
      selo: '💎',
      convite: 'Um cavaleiro, uma corda e duas versões da mesma história. Quem viu o quê?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha a descida à gruta na ordem em que aconteceu.',
          itens: [
            'Corvos e morcegos voam para fora da gruta',
            'Dom Quixote desce amarrado pela corda',
            'A corda acaba e a voz dele some',
            'A corda vem leve, como se não tivesse ninguém',
            'A corda fica pesada e ele sobe roncando'
          ],
          dica: 'Releia os três primeiros parágrafos.',
          porque: 'Corda leve, corda pesada: Sancho já estava de unhas roídas.'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada item para quem contou ou para quem viu.',
          grupos: ['🗣️ Dom Quixote contou', '👀 Sancho e o Primo viram'],
          itens: [
            { texto: 'Passou três dias com os cavaleiros encantados', grupo: 0 },
            { texto: 'Viu um palácio de cristal', grupo: 0 },
            { texto: 'Foi recebido por Montesinos, de barba branca', grupo: 0 },
            { texto: 'A corda ficou leve e depois pesada', grupo: 1 },
            { texto: 'O cavaleiro ficou só uma hora lá embaixo', grupo: 1 },
            { texto: 'Dom Quixote subiu de olhos fechados, roncando', grupo: 1 }
          ],
          dica: 'Quem estava lá embaixo e quem esperava lá em cima? Releia os dois últimos parágrafos.',
          porque: 'Três dias para ele, uma hora para eles. Nem Dom Quixote sabia dizer!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Qual pista da página faz pensar que Dom Quixote pode ter sonhado?',
          opcoes: [
            'Ele subiu de olhos fechados e roncando',
            'Os corvos e os morcegos saíram voando',
            'A corda era muito comprida',
            'O Primo anotava tudo o que ouvia'
          ],
          certa: 0,
          dica: 'Releia o parágrafo em que a corda fica pesada.',
          porque: 'Quem volta roncando talvez tenha passado a hora... dormindo.'
        }
      ],
      sabia: 'A Gruta de Montesinos existe de verdade, na região de La Mancha, na Espanha, e dá nome a este episódio do livro de Cervantes.'
    },

    // 4 — O Macaco que Adivinha
    4: {
      titulo: 'O Macaco que Cochicha',
      selo: '🐒',
      convite: 'Um macaco que adivinha tudo? Hum... Será que ele adivinha mesmo? Hora de ser detetive.',
      etapas: [
        {
          tipo: 'erro',
          pergunta: 'Este reconto tem erros. Toque nas palavras que não combinam com a página.',
          texto: 'Mestre Pedro entrou na pousada com um pano [[azul|verde]] tapando um [[ouvido|olho]]. Disse que o macaco adivinha o que [[vai acontecer|já aconteceu]] e que cada pergunta custa [[cinco|duas]] moedas.',
          dica: 'Releia o começo do primeiro e do segundo parágrafos.',
          porque: 'Repare: o macaco nunca fala do futuro. Esperto, o Mestre Pedro!'
        },
        {
          tipo: 'enigma',
          pergunta: 'O macaco usa um código! Use a chave para descobrir o que Sancho também fez ao dizer "Isso é coisa de mago".',
          resposta: 'COCHICHOU',
          extras: 'XZ',
          cifra: {
            mensagem: '🐒🍌🐒🎩🍓🐒🎩🍌🥕',
            chave: [['🐒', 'C'], ['🍌', 'O'], ['🎩', 'H'], ['🍓', 'I'], ['🥕', 'U']]
          },
          dica: 'Sancho falou baixinho, no ouvido de Dom Quixote. Procure o verbo no terceiro ou quarto parágrafo.',
          porque: 'Cochicho de macaco, cochicho de Sancho: segredo bom é o que se conta baixinho.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Como Mestre Pedro pode ter descoberto o nome e o apelido novo de Dom Quixote?',
          opcoes: [
            'Ouviu o dono da pousada, que vivia repetindo o apelido',
            'O macaco entende a língua dos magos',
            'Sancho gritou o nome do amo na porta da pousada',
            'Dom Quixote contou tudo no meio da conversa'
          ],
          certa: 0,
          dica: 'Releia o primeiro parágrafo: o que o dono da pousada fazia e com quem Mestre Pedro conversou?',
          porque: 'Mágica? Não: foi uma conversinha baixa no canto. Isso Sancho ainda ia perceber!'
        }
      ],
      sabia: 'Mestre Pedro e o seu macaco adivinho são personagens do livro de Cervantes. O truque deles é parecido com o de muitos mágicos de hoje: parecer saber o que ninguém contou.'
    },

    // 5 — O Teatrinho de Mestre Pedro
    5: {
      titulo: 'Quando o Teatro Parece Verdade',
      selo: '🎭',
      convite: 'Dom Quixote entrou de cabeça na história do teatrinho. E você, entendeu o que aconteceu?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada palavra do capítulo ao seu significado.',
          pares: [
            ['a galope', 'correndo bem depressa, como cavalo'],
            ['engatinhando', 'andando de joelhos e mãos no chão'],
            ['a salvo', 'protegido, longe do perigo'],
            ['choramingar', 'reclamar com voz de choro']
          ],
          dica: 'Releia as frases em que cada uma aparece e pense no que está acontecendo.',
          porque: 'Palavra nova entendida pelo jeito da cena: detetive de vocabulário!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete a explicação do engano de Dom Quixote.',
          texto: 'Dom Quixote achou que os soldados do teatrinho eram de ___. Mas eram bonecos de ___ e papelão. Ele disse, então, que os ___ o tinham enganado outra vez.',
          respostas: ['verdade', 'pano', 'magos'],
          distratores: ['mentira', 'ferro', 'leões'],
          dica: 'Releia os dois últimos parágrafos.',
          porque: 'Para quem vive entre livros, até um boneco pode virar soldado.'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha a história do capítulo na ordem certa.',
          itens: [
            'O menino conta que a princesa está presa na torre',
            'Dom Gaiferos chega e a princesa pula na garupa',
            'O menino diz que os soldados vão alcançar os dois',
            'Dom Quixote pega a espada e avança no palquinho',
            'Dom Quixote promete pagar tudo a Mestre Pedro'
          ],
          dica: 'Os cinco acontecimentos seguem os parágrafos, do primeiro ao último.',
          porque: 'Uma vitória que acaba em conta para pagar: Sancho tinha razão!'
        }
      ],
      sabia: 'O teatro de bonecos de Mestre Pedro é um episódio do livro de Cervantes. Teatrinhos de bonecos ambulantes eram comuns nas feiras da época.'
    },

    // 6 — O Barco Encantado
    6: {
      titulo: 'O Barco Sem Remos',
      selo: '⛵',
      convite: 'Dom Quixote vê um castelo e fantasmas. Sancho vê moinhos. Quem está certo?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'O que existia de verdade e o que só Dom Quixote imaginou?',
          grupos: ['👓 Era assim de verdade', '✨ Dom Quixote imaginou'],
          itens: [
            { texto: 'Um barquinho de pescador amarrado na árvore', grupo: 0 },
            { texto: 'Moinhos de água, de moer trigo', grupo: 0 },
            { texto: 'Moleiros brancos de farinha, com varas', grupo: 0 },
            { texto: 'Um castelo com um prisioneiro lá dentro', grupo: 1 },
            { texto: 'Fantasmas feios sacudindo varas', grupo: 1 },
            { texto: 'Um barco encantado esperando o cavaleiro', grupo: 1 }
          ],
          dica: 'Releia o segundo, o quarto e o quinto parágrafos.',
          porque: 'Os "fantasmas" eram só gente trabalhando, coberta de farinha!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Pelo teste de Dom Quixote, o que os piolhos vivos de Sancho mostram?',
          opcoes: [
            'Que eles ainda não passaram a linha do meio do mundo',
            'Que o barco é mesmo encantado',
            'Que o rio está gelado',
            'Que Sancho está com muito medo'
          ],
          certa: 0,
          dica: 'Releia o terceiro parágrafo: o que acontece com os piolhos, segundo Dom Quixote, depois da linha?',
          porque: 'O teste era de Dom Quixote, mas quem tirou a conclusão certa foi Sancho!'
        }
      ],
      sabia: 'No livro de Cervantes, o barco encantado navega pelo rio Ebro, um dos maiores rios da Espanha.'
    },

    // 7 — A Duquesa Caçadora
    7: {
      titulo: 'A Duquesa que Leu o Livro',
      selo: '🦅',
      convite: 'A duquesa sabe nomes que ninguém contou a ela. Será mais um macaco adivinho?',
      etapas: [
        {
          tipo: 'enigma',
          pergunta: 'Charada: Sancho correu para segurar esta peça da sela, onde se apoia o pé para descer. Qual é?',
          resposta: 'ESTRIBO',
          extras: 'MF',
          dica: 'Releia o quarto parágrafo, logo antes da queda de Dom Quixote.',
          porque: 'Quem segurava o estribo acabou de cabeça para baixo!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Qual pista mostra que a duquesa já conhecia os dois antes de eles chegarem?',
          opcoes: [
            'Ela perguntou: “O Dom Quixote do livro?”',
            'Ela estava vestida de verde',
            'Ela caçava com um falcão na luva',
            'Ela montava um cavalo branco como leite'
          ],
          certa: 0,
          dica: 'Releia a conversa de Sancho com a senhora no terceiro parágrafo.',
          porque: 'Desta vez, ninguém adivinhou nada: ela só tinha lido o livro!'
        }
      ],
      sabia: 'O "Cavaleiro dos Leões" é o novo nome de Dom Quixote no segundo volume do livro. No primeiro volume, ele era chamado de "Cavaleiro da Triste Figura".'
    },

    // 8 — As Damas Barbudas
    8: {
      titulo: 'Barbas e Pistas',
      selo: '🧔',
      convite: 'Treze damas barbudas e uma voz que Sancho jura já ter ouvido. Hora de bancar o detetive!',
      etapas: [
        {
          tipo: 'erro',
          pergunta: 'Este reconto tem erros. Toque nas palavras que não combinam com a página.',
          texto: 'A condessa Trifaldi chegou com [[quatro|doze]] damas, todas com [[chapéu|véu]]. O gigante que lançou o feitiço se chamava [[Merlim|Malambruno]], e o cavalo voador era de [[ferro|madeira]].',
          dica: 'Releia o segundo e o quinto parágrafos.',
          porque: 'Doze damas mais a condessa: treze barbas ao todo!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Separe o que a condessa dizia das pistas que o resto da página deixa escapar.',
          grupos: ['🕵️ Pista de mentirinha', '📣 O que a condessa dizia'],
          itens: [
            { texto: 'Calçava botas de homem', grupo: 0 },
            { texto: 'Tinha uma voz grossa e esquisita', grupo: 0 },
            { texto: 'O duque piscou para a duquesa', grupo: 0 },
            { texto: 'O gigante Malambruno lançou um feitiço nelas', grupo: 1 },
            { texto: 'Só Clavilenho podia levá-los a Candaia', grupo: 1 },
            { texto: 'As barbas cairiam quando eles chegassem', grupo: 1 }
          ],
          dica: 'Reveja o que Sancho cochicha e o que acontece no fim da página.',
          porque: 'Quando o feitiço tem bota de homem, convém pôr as barbas de molho!'
        }
      ],
      sabia: 'Em português existe a expressão "pôr as barbas de molho", que quer dizer ficar atento e se precaver. Sancho, nesta página, bem que ficou de barbas de molho.'
    },

    // 9 — Clavilenho (recapitulação da parte)
    9: {
      titulo: 'Recapitulando a Viagem',
      selo: '🎠',
      convite: 'Fim de parte! Mostre que você viajou junto, do requeijão até a ilha.',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada aventura da Parte 6 ao que havia por trás dela.',
          pares: [
            ['A Gruta de Montesinos', 'Um cavaleiro que voltou roncando'],
            ['O macaco adivinho', 'Um livro e um papo com o dono da pousada'],
            ['O teatrinho de bonecos', 'Bonecos de pano e papelão'],
            ['O barco encantado', 'Moinhos de água e moleiros enfarinhados'],
            ['Clavilenho, o cavalo voador', 'Um cavalo de madeira, um fole e uma tocha']
          ],
          dica: 'Lembre de cada episódio. Se precisar, volte uma página por vez e releia o fim.',
          porque: 'Em quase toda aventura desta parte, havia uma explicação bem simples escondida.'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado e o que Sancho contou no jantar.',
          texto: 'Diz o ditado: "Quem ___ um conto ___ um ponto." Sancho aumentou muito: disse que a Terra parecia um grão de ___, mas Clavilenho nunca saiu do ___.',
          respostas: ['conta', 'aumenta', 'mostarda', 'jardim'],
          distratores: ['esconde', 'tira', 'feijão'],
          dica: 'O ditado é bem conhecido. A outra parte está no último parágrafo da página.',
          porque: 'Sancho aumentou tanto o conto que até as cabritinhas do céu entraram na história.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Que trato Dom Quixote e Sancho fizeram sobre as histórias da gruta e do céu?',
          opcoes: [
            'Cada um acredita na história do outro',
            'Os dois admitem que inventaram tudo',
            'Nunca mais contar histórias a ninguém',
            'Esquecer a gruta e as cabritinhas'
          ],
          certa: 0,
          dica: 'Releia o fim do último parágrafo, quando Sancho pensa e pisca.',
          porque: 'As cabritinhas e o palácio ficam lá, brincando juntos.'
        }
      ],
      sabia: 'O nome Clavilenho é uma palavra-sanduíche de Cervantes: em espanhol, "clavija" é o pino e "leño" é um pedaço de madeira. Ou seja: o cavalo de madeira com um pino na testa!'
    }
  }
};
