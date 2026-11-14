/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 1. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 1,
  paginas: {
    // Capítulo 1 — O Fidalgo Leitor
    1: {
      titulo: 'O leitor que viajava parado',
      selo: '🕯️',
      convite: 'Alonso quase nunca saía de casa, mas viajava por terras distantes. Como será que ele fazia isso?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'O texto diz que Alonso "viajava por terras distantes". O que ele fazia de verdade?',
          opcoes: [
            'Lia os seus livros de cavalaria sem sair de casa',
            'Montava num cavalo e cruzava a Espanha inteira',
            'Dormia a noite toda e sonhava com cavaleiros',
            'Pedia aos vizinhos que contassem aventuras'
          ],
          certa: 0,
          dica: 'Releia o segundo parágrafo: ele viajava acordado, e a companhia eram os livros.',
          porque: 'O meio de transporte mais barato do mundo: um livro!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'O senhor Alonso Quixano vivia em La Mancha, e o seu maior tesouro eram os livros de [[culinária|cavalaria]]. Ele lia tanto que passava [[tardes|noites]] inteiras acordado. Aos seus olhos, o manso [[cachorrinho|gatinho]] da sala virava um leão guardião.',
          dica: 'Releie o primeiro, o segundo e o terceiro parágrafos, um de cada vez.',
          porque: 'Imagine a bagunça se o bichinho da sala mesmo fosse um leão!'
        }
      ],
      sabia: 'Na época de Cervantes, os livros de cavalaria, cheios de cavaleiros, magos e dragões, eram a grande moda. Muita gente lia essas aventuras, como Alonso.'
    },

    // Capítulo 2 — O Novo Nome
    2: {
      titulo: 'Do baú à bacia',
      selo: '🥣',
      convite: 'Um nome novo, uma armadura velha e uma bacia na cabeça. Vamos ver se você acompanha a pressa de Alonso?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que Alonso fez neste capítulo.',
          itens: [
            'Pensou que o mundo precisava de mais bondade e justiça',
            'Escolheu o nome Dom Quixote de La Mancha',
            'Subiu ao sótão e abriu um velho baú',
            'Encontrou a armadura enferrujada do bisavô',
            'Pôs uma bacia de latão na cabeça, como capacete'
          ],
          dica: 'Siga os três parágrafos, um depois do outro. A bacia aparece só no último.',
          porque: 'Primeiro a ideia, depois o nome e só então a armadura!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Decifre o código e descubra o que Alonso achou no baú do sótão, coberto de ferrugem.',
          resposta: 'ARMADURA',
          extras: 'SE',
          cifra: {
            mensagem: '🌟🔥🌙🌟🔔🍀🔥🌟',
            chave: [['🌟', 'A'], ['🔥', 'R'], ['🌙', 'M'], ['🔔', 'D'], ['🍀', 'U']]
          },
          dica: 'Releia o segundo parágrafo: é o que repousava dentro do baú.',
          porque: 'Ferro velho, bacia e tampa de panela: nasce o cavaleiro mais caseiro do mundo!'
        }
      ],
      sabia: 'Miguel de Cervantes nasceu em Alcalá de Henares, na Espanha, em 1547.'
    },

    // Capítulo 3 — O Corcel e a Princesa
    3: {
      titulo: 'Nomes que Alonso inventou',
      selo: '🐴',
      convite: 'Para Dom Quixote, um nome bonito muda tudo: o cavalo, a camponesa, até ele mesmo. Você sabe quem é quem?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada nome a quem ou a quê ele pertence.',
          pares: [
            ['Dom Quixote', 'O nome novo do fidalgo Alonso Quixano'],
            ['Rocinante', 'O antigo cavalo de trabalho, magrinho'],
            ['Aldonza Lorenzo', 'A camponesa da aldeia vizinha'],
            ['Dulcineia del Toboso', 'O nome de princesa dado a Aldonza']
          ],
          dica: 'Releia o segundo e o último parágrafos.',
          porque: 'Com poucas palavras, Dom Quixote transforma gente comum em gente de lenda!'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Toque nas palavras certas para completar a frase.',
          texto: 'Rocinante era só um cavalo de ___, mas ganhou um nome tão nobre que virou o ___ e mais fiel de todos os cavalos.',
          respostas: ['trabalho', 'primeiro'],
          distratores: ['corrida', 'último'],
          dica: 'Leia o primeiro e o segundo parágrafos: um fala do que ele era; o outro, do que o nome promete.',
          porque: 'Um nome bonito não engorda o cavalo, mas levanta o astral!'
        }
      ],
      sabia: 'O nome Rocinante vem de "rocín", que em espanhol quer dizer cavalo de trabalho.'
    },

    // Capítulo 4 — A Primeira Saída
    4: {
      titulo: 'O que existe e o que ele vê',
      selo: '🏰',
      convite: 'A mesma estrada, a mesma pousada, e dois jeitos de olhar para ela. Qual é qual?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que Dom Quixote ouviu "trombetas reais" na estrada?',
          opcoes: [
            'Era a flauta do pastor, que ele ouviu do seu jeito',
            'O castelo tinha trombeteiros de verdade',
            'Os porquinhos faziam música ao chegar',
            'O dono da pousada o recebeu com uma fanfarra'
          ],
          certa: 0,
          dica: 'Releia o começo do terceiro parágrafo: o que o pastor soprou, e para quê?',
          porque: 'Uma flauta para chamar porquinhos virou fanfarra de rei!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar certo: está na estrada de verdade ou só na cabeça de Dom Quixote?',
          grupos: ['🏠 Existe de verdade', '✨ Só ele imagina'],
          itens: [
            { texto: 'Telhas de barro e paredes de adobe', grupo: 0 },
            { texto: 'Altas torres prateadas e pontes levadiças', grupo: 1 },
            { texto: 'Uma flauta rústica para chamar os porquinhos', grupo: 0 },
            { texto: 'Trombetas reais anunciando a sua chegada', grupo: 1 },
            { texto: 'Sopa de pão com alho servida pelo dono da pousada', grupo: 0 },
            { texto: 'Um banquete nobre, digno de reis', grupo: 1 }
          ],
          dica: 'Pergunte a cada item: isso aparece na estrada ou só no olhar do cavaleiro? Releia o texto inteiro.',
          porque: 'Sopa de pão com alho: tão boa que até parecia banquete de rei!'
        }
      ],
      sabia: 'Dom Quixote saiu em 1605 e é considerado o primeiro romance moderno. Também é um dos livros mais traduzidos do mundo.'
    },

    // Capítulo 5 — A Cerimônia Mágica
    5: {
      titulo: 'A noite da vigília',
      selo: '🌕',
      convite: 'Uma noite inteira de lua, um bebedouro e uma espada. Você acompanhou tudo com atenção?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a cerimônia que fez de Dom Quixote um cavaleiro.',
          itens: [
            'Dom Quixote começou a vigília à luz da lua cheia',
            'Pôs o peitoral, a bacia e a lança sobre o bebedouro',
            'O estalajadeiro recitou palavras de honra',
            'Tocou o ombro do fidalgo com a lâmina de uma espada'
          ],
          dica: 'A noite vem no primeiro parágrafo, e o amanhecer, no último.',
          porque: 'Cerimônia séria, com bebedouro de pedra no lugar do altar!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Dom Quixote fez a vigília das armas. Pôs a sua armadura sobre o [[fogão|bebedouro]] de pedra e sentiu que rezava diante de um altar de [[madeira|mármore]]. Ao amanhecer, o estalajadeiro tocou o ombro dele com a lâmina de uma [[colher|espada]].',
          dica: 'Releia o segundo e o terceiro parágrafos.',
          porque: 'Um fogão no lugar do altar teria dado outra cerimônia, bem mais quentinha!'
        }
      ],
      sabia: 'Antigamente, quem ia ser cavaleiro passava uma noite velando as armas, como Dom Quixote faz neste capítulo. A palavra "vigília" vem do latim e tem a ver com ficar acordado.'
    },

    // Capítulo 6 — A Nobre Amizade
    6: {
      titulo: 'Um escudeiro e uma ilha',
      selo: '🏝️',
      convite: 'Sancho deixa a vida tranquila na aldeia por causa de uma promessa. Será que valeu a pena?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho sorriu maravilhado e aceitou ser escudeiro?',
          opcoes: [
            'Dom Quixote prometeu que ele seria governador de uma ilha',
            'Queria aprender a lutar com a lança e a espada',
            'Estava cansado de viver na aldeia',
            'A sua família pediu que ele fosse embora'
          ],
          certa: 0,
          dica: 'Releia a fala do cavaleiro, no segundo parágrafo: o que ele promete?',
          porque: 'Quem diria não a uma ilha cheia de pão e justiça?'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Complete o ditado que combina com a promessa da ilha: vale mais o que se tem do que o que só se prometeu.',
          texto: 'Mais vale um ___ na ___ do que dois voando.',
          respostas: ['pássaro', 'mão'],
          distratores: ['gato', 'boca'],
          dica: 'Pense em algo que se pode agarrar e em algo que voa para longe.',
          porque: 'A ilha era um passarinho ainda voando, mas Sancho já tinha queijo e pão!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Charada: sou uma bolsa dupla, uma de cada lado do burrico. Sancho me encheu de queijo e pão. Quem sou eu?',
          resposta: 'ALFORJES',
          extras: 'TM',
          dica: 'Releia o último parágrafo: o que Sancho preparou para a viagem?',
          porque: 'Sancho nunca sai de casa sem lanche, e faz muito bem!'
        }
      ],
      sabia: 'O sobrenome Pança vem de "panza", que em espanhol quer dizer barriga. Em português, "pança" também é barriga.'
    },

    // Capítulo 7 — O Duelo dos Moinhos
    7: {
      titulo: 'Moinhos ou gigantes?',
      selo: '🌬️',
      convite: 'Da biblioteca de Alonso até o horizonte cheio de moinhos: o que será que você guardou da Parte 1?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada personagem ao que ele é ou fez na Parte 1.',
          pares: [
            ['Alonso Quixano', 'Fidalgo que lia livros de cavalaria'],
            ['Rocinante', 'Cavalo magrinho, de olhar manso e leal'],
            ['Sancho Pança', 'Lavrador que virou escudeiro'],
            ['Dulcineia', 'Camponesa que ganhou nome de princesa'],
            ['Estalajadeiro', 'Tocou o ombro do fidalgo com a espada']
          ],
          dica: 'Releia os capítulos: o primeiro, o terceiro, o quinto e o sexto.',
          porque: 'Cinco personagens, uma só aventura!'
        },
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem os grandes momentos da Parte 1.',
          itens: [
            'Alonso leu tantos livros de cavalaria que quis ser cavaleiro',
            'Ele escolheu o nome Dom Quixote e pôs a armadura do bisavô',
            'Numa pousada, viu um castelo e foi sagrado cavaleiro',
            'Sancho aceitou ser escudeiro, e os dois partiram juntos',
            'No campo, viram moinhos no horizonte e o cavaleiro quis lutar'
          ],
          dica: 'Siga os capítulos: livros, nome, pousada, Sancho e, por último, os moinhos.',
          porque: 'Do quarto do fidalgo ao campo de Criptana, que caminhada!'
        },
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar certo: é de verdade ou só Dom Quixote vê?',
          grupos: ['👓 É de verdade', '✨ Só ele vê'],
          itens: [
            { texto: 'Trinta ou quarenta moinhos de vento', grupo: 0 },
            { texto: 'Pás de madeira girando com a rajada', grupo: 0 },
            { texto: 'Máquinas que moem o trigo ao vento', grupo: 0 },
            { texto: 'Gigantes descomunais prontos para lutar', grupo: 1 },
            { texto: 'Braços enormes agitando-se no ar para atacar', grupo: 1 },
            { texto: 'Um feroz combate que dará fama ao cavaleiro', grupo: 1 }
          ],
          dica: 'Sancho explica o que é de verdade, e Dom Quixote diz o que enxerga. Releia as falas.',
          porque: 'Quando as pás giram, até um moinho pode parecer um gigante agitando os braços!'
        }
      ],
      sabia: 'Em La Mancha ainda existem moinhos de vento brancos, como os de Consuegra e de Campo de Criptana. Do livro vieram também a expressão "lutar contra moinhos de vento" e a palavra "quixotesco".'
    }
  }
};
