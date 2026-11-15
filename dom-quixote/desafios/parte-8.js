/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 8. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 8,
  paginas: {
    // Capítulo 61 — Pastores de Brincadeira
    1: {
      titulo: 'Pastores de mentirinha',
      selo: '🕸️',
      convite: 'Redes verdes no bosque e pastores que não são pastores. O que é de verdade e o que é faz de conta?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada item para o lugar certo: faz de conta ou de verdade?',
          grupos: ['✨ Faz de conta', '👓 De verdade'],
          itens: [
            { texto: 'A armadilha dos magos contra Dom Quixote', grupo: 0 },
            { texto: 'Os pastores com roupas bonitas demais', grupo: 0 },
            { texto: 'As redes de pegar passarinho', grupo: 1 },
            { texto: 'Cavaleiro e cavalo enrolados na rede', grupo: 1 },
            { texto: 'A moça que leu as aventuras em voz alta', grupo: 1 }
          ],
          dica: 'Releia os dois primeiros parágrafos: quem estava brincando, e quem estava vendo magos em tudo?',
          porque: 'Os pastores brincavam de pastor. Dom Quixote, de mago. Cada um com a sua brincadeira!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote franziu a testa quando a moça falou de "outro livro"?',
          opcoes: [
            'Ele só conhecia um livro sobre os dois e não entendeu',
            'Ele não gosta de livros de pastores',
            'Ele achou que a moça estava de brincadeira',
            'Ele queria ir para outra cidade'
          ],
          certa: 0,
          dica: 'Releia a última frase do que Dom Quixote responde: "Que outro livro?"',
          porque: 'Pista deixada no caminho: logo, logo, ele vai descobrir que outro livro é esse!'
        }
      ],
      sabia: 'Antes de escrever Dom Quixote, Cervantes publicou um romance de pastores que cantam e fazem versos, chamado La Galatea. Ele conhecia bem essa moda!'
    },

    // Capítulo 62 — Esse Não Sou Eu!
    2: {
      titulo: 'O livro de mentirinha',
      selo: '📕',
      convite: 'Alguém escreveu um livro falso sobre os dois. Dom Quixote vai deixar barato?',
      etapas: [
        {
          tipo: 'erro',
          pergunta: 'Este reconto da pousada tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Pela parede, Dom Quixote ouviu que, no livro novo, ele já não gostava de [[Teresa|Dulcineia]]. Sancho, com uma coxa de [[porco|frango]] no ar, ficou vermelho: o livro dizia que ele era um [[magrelo|comilão]] sem graça.',
          dica: 'Releia os dois primeiros parágrafos, o da parede fininha.',
          porque: 'Chamar Sancho de sem graça? Ele faz graça até dormindo!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote decidiu não passar por Saragoça?',
          opcoes: [
            'Para mostrar ao mundo que o livro novo mentia',
            'Porque Saragoça ficava longe demais',
            'Porque tinha medo dos cavaleiros da festa',
            'Porque Sancho pediu para não ir'
          ],
          certa: 0,
          dica: 'Releia o quarto parágrafo: o que o livro dizia sobre Saragoça?',
          porque: 'Se o livro falso mandava os dois para lá, o jeito era ir para outro lugar!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Decifre o código de figurinhas e descubra como Dom Quixote chamou o livro novo.',
          resposta: 'MENTIROSO',
          extras: 'AL',
          cifra: {
            mensagem: '🌞🌳🐟🎩🍎🚲🏠⭐🏠',
            chave: [['🌞', 'M'], ['🌳', 'E'], ['🐟', 'N'], ['🎩', 'T'], ['🍎', 'I'], ['🚲', 'R'], ['🏠', 'O'], ['⭐', 'S']]
          },
          dica: 'Releia o quarto parágrafo: é a palavra em letras grandes.',
          porque: 'Livro mentiroso: nem Sancho nem Dom Quixote assinam embaixo!'
        }
      ],
      sabia: 'No livro de Cervantes é assim mesmo: ao saber que o livro falso mandava Dom Quixote para Saragoça, ele muda de rumo e vai para Barcelona, só para provar que o outro autor errou.'
    },

    // Capítulo 63 — A Água que Não Acaba
    3: {
      titulo: 'Sancho e o mar',
      selo: '🌊',
      convite: 'Sancho nunca tinha visto o mar. Dá para entender as ideias engraçadas que ele teve?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada ideia de Sancho ao que ela era de verdade.',
          pares: [
            ['"Alguém derrubou o saleiro"', 'A água do mar é salgada'],
            ['Os "pés" dos bichos', 'Os remos dos navios'],
            ['"Burricos do mar"', 'Navios'],
            ['"Ela está brincando comigo"', 'Uma onda']
          ],
          dica: 'Releia o segundo e o terceiro parágrafos.',
          porque: 'Para quem nunca viu o mar, até a onda parece cachorrinho!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Dom Antônio disse "o verdadeiro Dom Quixote". Por que insistiu tanto no "verdadeiro"?',
          opcoes: [
            'Porque a cidade já tinha ouvido falar do livro mentiroso',
            'Porque Dom Antônio não tinha certeza de quem era',
            'Porque havia muitos cavaleiros na praia',
            'Porque queria apostar uma corrida com ele'
          ],
          certa: 0,
          dica: 'Releia a fala de Dom Antônio: ele diz "não o falso, o do...". Do quê?',
          porque: 'A fama do livro falso chegou antes de Dom Quixote!'
        }
      ],
      sabia: 'No livro de Cervantes, Dom Quixote chega a Barcelona e vê o mar pela primeira vez, como na história que você acabou de ler.'
    },

    // Capítulo 64 — O Papel nas Costas
    4: {
      titulo: 'O truque da cabeça de bronze',
      selo: '🗿',
      convite: 'Todo mundo conhece Dom Quixote, e uma cabeça de bronze sabe tudo. Será mesmo?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem como Sancho descobriu o truque da cabeça.',
          itens: [
            'Sancho deu a volta na mesa, desconfiado',
            'Olhou por cima e por baixo e viu um cano fininho',
            'Encostou a boca na orelha de bronze e perguntou quem estava lá embaixo',
            'A voz respondeu "Não!" e o sobrinho de Dom Antônio foi descoberto'
          ],
          dica: 'Releia o quarto e o quinto parágrafos, um depois do outro.',
          porque: 'Quem está embaixo não deveria responder "Não!". Foi o que entregou o segredo!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada item para o lugar certo: o que diziam da cabeça ou o que ela era de verdade?',
          grupos: ['🗿 O que diziam', '🔎 O que era de verdade'],
          itens: [
            { texto: 'Foi feita por um grande mago', grupo: 0 },
            { texto: 'Responde a qualquer pergunta', grupo: 0 },
            { texto: 'Não fala às sextas-feiras', grupo: 0 },
            { texto: 'Tinha um cano escondido na mesa', grupo: 1 },
            { texto: 'Quem falava era um rapaz no quarto de baixo', grupo: 1 }
          ],
          dica: 'Releia o segundo parágrafo, e depois o quarto e o quinto.',
          porque: 'Sexta-feira ninguém ouvia a cabeça. Quem sabe o sobrinho tinha folga?'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que todo mundo cumprimentava Dom Quixote na rua, mesmo sem conhecê-lo?',
          opcoes: [
            'Havia um papel com o nome dele preso nas costas',
            'Todos já tinham visto a cabeça de bronze',
            'Dom Antônio avisou a cidade de porta em porta',
            'Rocinante era famoso em Barcelona'
          ],
          certa: 0,
          dica: 'Releia o primeiro parágrafo: o que Sancho viu atrás do amo?',
          porque: 'A fama de Dom Quixote tinha um cartaz! Que sorte o papel não dizer "Cuidado, cavaleiro!".'
        }
      ],
      sabia: 'A palavra "fama" vem do latim fama, que quer dizer "o que se fala por aí". Ou seja: fama é conversa que corre de boca em boca!'
    },

    // Capítulo 65 — O Nome do Mago
    5: {
      titulo: 'Onde nascem os livros',
      selo: '🔤',
      convite: 'Tem uma oficina cheia de letrinhas de chumbo e um nome escondido na primeira página. Dá para descobrir?',
      etapas: [
        {
          tipo: 'lacunas',
          pergunta: 'Complete como o homem de avental faz um livro, passo a passo.',
          texto: 'Ele junta as ___ para fazer as palavras, as palavras para fazer as ___ e as linhas para fazer a ___.',
          respostas: ['letras', 'linhas', 'página'],
          distratores: ['tintas', 'folhas'],
          dica: 'Releia o que o homem explica, no segundo parágrafo.',
          porque: 'Letra a letra, o livro vai crescendo, que nem castelo de areia, só que mais firme.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que o autor, agora, faz questão de que todo mundo saiba o nome dele?',
          opcoes: [
            'Por causa do livro mentiroso, que enganou muita gente',
            'Porque tinha vergonha de ficar escondido',
            'Porque o dono da oficina pediu',
            'Porque Sancho quis conhecê-lo'
          ],
          certa: 0,
          dica: 'Releia a fala do homem de avental, logo depois de "o nome dele já estava no primeiro livro".',
          porque: 'Quem faz uma cópia falsa dá ao verdadeiro autor um bom motivo para assinar bem grande!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Sancho achava que o autor era mago. Dom Quixote disse: "É melhor!" Monte a palavra que ele usou.',
          resposta: 'ESCRITOR',
          extras: 'AM',
          dica: 'Releia a conversa de Sancho e Dom Quixote no quarto parágrafo, perto do final.',
          porque: 'Mago faz mágica com varinha. Escritor, com palavras!'
        }
      ],
      sabia: 'No livro de Cervantes, Dom Quixote visita mesmo uma gráfica em Barcelona e vê como se imprimem livros. A impressão com letras de metal, inventada por Gutenberg, já existia havia mais de cem anos.'
    },

    // Capítulo 66 — O Trato na Praia
    6: {
      titulo: 'Trato é trato',
      selo: '🏖️',
      convite: 'Um trato foi feito na areia. Quem ganha, quem perde, e quem será que está dentro daquela armadura?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada frase para o lado certo do trato.',
          grupos: ['🏆 Se Dom Quixote vencesse', '🌙 Se o cavaleiro vencesse'],
          itens: [
            { texto: 'O desconhecido faria o que Dom Quixote mandasse', grupo: 0 },
            { texto: 'Dom Quixote guardaria a lança e voltaria para casa', grupo: 1 },
            { texto: 'Dom Quixote ficaria um ano inteiro sem aventuras', grupo: 1 },
            { texto: 'Dom Quixote escolheria a ordem a ser cumprida', grupo: 0 }
          ],
          dica: 'Releia o segundo parágrafo, a fala do cavaleiro.',
          porque: 'Quem perde obedece. E Dom Quixote sabe muito bem o que é obedecer à palavra dada.'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que aconteceu no encontro dos cavalos.',
          itens: [
            'Os dois se afastaram e viraram os cavalos',
            'O cavalo da lua branca veio galopando de verdade',
            'O cavaleiro levantou a lança bem alto, de propósito',
            'Rocinante sentou na areia, feito cachorro esperando biscoito',
            'Dom Quixote escorregou para o lado, devagar'
          ],
          dica: 'Releia o quarto parágrafo, do começo ao fim.',
          porque: 'O cavaleiro erguer a lança foi um jeito de dizer: "não quero machucar o senhor".'
        },
        {
          tipo: 'quiz',
          pergunta: 'No fim, Sancho pensa no "jeito de montar" e no cavalo que "não parava para comer". O que isso mostra?',
          opcoes: [
            'Que ele desconfia de quem está dentro da armadura',
            'Que ele quer comprar aquele cavalo',
            'Que ele tem medo de cavalos fortes',
            'Que ele achou o cavalo parecido com Rocinante'
          ],
          certa: 0,
          dica: 'Releia a última frase da página e lembre-se de que Sancho já tinha visto esse tipo de trato antes.',
          porque: 'Sancho desconfia primeiro e acredita depois. Detetive de burrico!'
        }
      ],
      sabia: 'A palavra "cavaleiro" vem do latim caballarius, que vem de caballus, "cavalo". Faz sentido: cavaleiro é quem anda a cavalo!'
    },

    // Capítulo 67 — O Pastor Quixotiz
    7: {
      titulo: 'Nomes de pastor',
      selo: '🏷️',
      convite: 'Dom Quixote inventou nomes de pastor para todo mundo. Dá para ver quem é quem?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada nome de pastor à pessoa que vai ganhá-lo.',
          pares: [
            ['Pastor Quixotiz', 'Dom Quixote'],
            ['Pastor Curiambro', 'O padre'],
            ['Pastor Miculoso', 'Mestre Nicolau'],
            ['Pastora Teresona', 'Teresa, mulher de Sancho']
          ],
          dica: 'Releia o quarto e o quinto parágrafos.',
          porque: 'Nomes de pastor são nomes de aldeia com um enfeitezinho!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado de Sancho e a pergunta de Dom Quixote.',
          texto: 'Sancho disse: "Quem ___ hoje ___ amanhã." Mas o amo perguntou o que faz um cavaleiro que não pode ser ___.',
          respostas: ['cai', 'levanta', 'cavaleiro'],
          distratores: ['dorme', 'chora'],
          dica: 'Releia o terceiro parágrafo, a conversa na estrada de volta.',
          porque: 'Ditado de Sancho serve até para tombo de cavaleiro.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que a ideia de virar pastor agrada tanto a Dom Quixote?',
          opcoes: [
            'Ele poderia passar o ano sem aventuras, mas com música e versos',
            'Ele queria esquecer o trato com o cavaleiro',
            'Ele estava cansado de ter amigos',
            'Ele queria arrumar uma lança nova'
          ],
          certa: 0,
          dica: 'Releia o quarto parágrafo: o que ele diz logo depois de "Já sei!"?',
          porque: 'Cantar e fazer versos é aventura sem tombo. Rocinante também concordaria!'
        }
      ],
      sabia: 'A palavra "pastor" vem do latim pastor, de pascere, "alimentar, fazer pastar". "Pasto" e "pastar" são da mesma família!'
    },

    // Capítulo 68 — O Segredo de Sansão
    8: {
      titulo: 'O cavaleiro que era amigo',
      selo: '🤗',
      convite: 'O segredo veio à tona. Por que Sansão fez tudo aquilo, e como Dom Quixote reagiu?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote disse "Melhor ainda!" quando soube que foi Sansão quem o venceu?',
          opcoes: [
            'Porque foi um amigo, e não um inimigo, que o venceu',
            'Porque Sansão era um grande cavaleiro',
            'Porque assim ele não precisava cumprir o trato',
            'Porque Sansão prometeu devolver a lança'
          ],
          certa: 0,
          dica: 'Releia o quinto parágrafo: o que Dom Quixote diz sobre como Sansão lutou?',
          porque: 'Perder para um amigo que levanta a lança para não machucar até que dá para perdoar.'
        },
        {
          tipo: 'enigma',
          pergunta: 'Sansão contou que foi também outro cavaleiro. Monte a palavra que falta: o Cavaleiro dos ____.',
          resposta: 'ESPELHOS',
          extras: 'AM',
          dica: 'Releia o quarto parágrafo, na confissão de Sansão.',
          porque: 'Duas armaduras, um só Sansão. Faltou só um espelho para ele se enxergar!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto da chegada tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Teresa veio correndo com um colar de pedrinhas [[azuis|vermelhas]]. Na porta, Sansão confessou que era o Cavaleiro da [[Lua Cheia|Branca Lua]]. Dom Quixote disse que ele seria o pastor Sansonino e tocaria [[violino|flauta]] o ano inteiro.',
          dica: 'Releia o segundo parágrafo, o quarto e o quinto.',
          porque: 'Um ano de flauta! As ovelhas vão pedir mudança de pasto.'
        }
      ],
      sabia: 'A palavra "segredo" vem do latim secretum, que quer dizer "separado, posto de lado". Segredo é aquilo que a gente guarda separado dos outros.'
    },

    // Capítulo 69 — Era uma Vez...
    9: {
      titulo: 'Recapitulando a Parte 8',
      selo: '🌟',
      convite: 'Chegamos ao fim da viagem. Quanto você guardou da última parte, e de toda a história?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem estes momentos da Parte 8.',
          itens: [
            'Dom Quixote e Sancho se enroscaram nas redes dos pastores de brincadeira',
            'Numa pousada, descobriram o livro mentiroso sobre os dois',
            'Em Barcelona, viram o mar e a oficina onde nascem os livros',
            'Na praia, Dom Quixote perdeu a luta e prometeu voltar para casa',
            'Em casa, Sansão confessou o segredo e foi perdoado'
          ],
          dica: 'Siga os capítulos: redes, livro mentiroso, mar, praia e, por último, a chegada.',
          porque: 'Do bosque das redes até a porta de casa: que viagem!'
        },
        {
          tipo: 'quiz',
          pergunta: 'O que Alonso quis dizer com "as aventuras só mudaram de casa"?',
          opcoes: [
            'Que elas continuam vivas nos livros, que se abrem quando se quer',
            'Que as aventuras acabaram para sempre',
            'Que Dom Quixote vendeu a casa para viajar',
            'Que os livros ficaram sem histórias'
          ],
          certa: 0,
          dica: 'Releia o segundo parágrafo: onde as aventuras passaram a morar?',
          porque: 'E é por isso que, quando você fechar o livro, ele continua aqui, esperando para ser aberto de novo.'
        },
        {
          tipo: 'ligar',
          pergunta: 'Olhe para a história toda: ligue cada nome ao que ele lembra.',
          pares: [
            ['Moinhos de vento', 'Gigantes, para Dom Quixote'],
            ['Bacia do barbeiro', 'Virou o bacielmo'],
            ['Cavaleiro da Triste Figura', 'Apelido do primeiro volume'],
            ['Cavaleiro dos Leões', 'Apelido do segundo volume']
          ],
          dica: 'O apelido novo veio depois do encontro com o leão; o antigo, bem antes.',
          porque: 'Moinhos, bacia, apelidos... e até o fim, tudo isso virou uma boa história para contar.'
        }
      ],
      sabia: 'A palavra "livro" vem do latim liber, que também queria dizer a casca fina de dentro das árvores, onde antigamente se escrevia. E "biblioteca" vem do grego e quer dizer "lugar onde se guardam livros".'
    }
  }
};
