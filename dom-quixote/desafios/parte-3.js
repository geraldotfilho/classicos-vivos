/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 3. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 3,
  paginas: {
    // Capítulo 16 — A Mala Perdida
    1: {
      titulo: 'O segredo da mala velha',
      selo: '🧳',
      convite: 'Sancho tropeçou numa mala esquecida na serra. O que ela guardava, e o que ela conta sobre o dono?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada palavra ao que ela quer dizer neste capítulo.',
          pares: [
            ['esquecida', 'deixada para trás sem querer'],
            ['arbusto', 'planta baixa, cheia de galhos e espinhos'],
            ['enferrujado', 'coberto de ferrugem, estragado pela umidade'],
            ['caprichada', 'feita com muito cuidado']
          ],
          dica: 'Releia o primeiro e o segundo parágrafos: cada palavra vem cercada de pistas.',
          porque: 'Letra caprichada, mala molhada e fecho enferrujado: a mala tinha uma história!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Pelos versos do caderno, o que Dom Quixote descobriu sobre o dono da mala?',
          opcoes: [
            'Era um moço apaixonado, triste e perdido na serra',
            'Era um comerciante rico que viajava distraído',
            'Era um cavaleiro andante, amigo dele',
            'Era um viajante que fugia de ladrões'
          ],
          certa: 0,
          dica: 'Releia o último parágrafo: quem escreveu os versos, segundo o narrador?',
          porque: 'Dom Quixote leu os versos e já enxergou o coração de quem os escreveu.'
        }
      ],
      sabia: 'A Serra Morena existe de verdade: é uma cadeia de montanhas no sul da Espanha. Em espanhol, o nome é Sierra Morena.'
    },

    // Capítulo 17 — As Cambalhotas da Saudade
    2: {
      titulo: 'Cambalhotas por um bom motivo',
      selo: '🤸',
      convite: 'Um cavaleiro de camisolão, de pernas para o ar! Qual é o pedido de Sancho que provoca tudo isso?',
      etapas: [
        {
          tipo: 'erro',
          pergunta: 'Este reconto da clareira tem 3 palavras erradas. Toque nelas para corrigir!',
          texto: 'Dom Quixote quis mostrar a sua [[alegria|saudade]] de Dulcineia, igualzinho a [[Rocinante|Amadis]] de Gaula. Tirou a armadura e, de camisolão branco, deu uma cambalhota com as pernas [[gordas|finas]] lá no alto.',
          dica: 'Releia a fala de Dom Quixote no primeiro parágrafo e a descrição da cambalhota no último.',
          porque: 'Saudade, Amadis e pernas finas: Sancho nunca mais esqueceria essa cena!'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que Sancho disse que precisava ver a maluquice de Dom Quixote com os próprios olhos?',
          opcoes: [
            'Para poder contar a Dulcineia o que viu de verdade',
            'Porque queria rir de Dom Quixote',
            'Porque não confiava em Dulcineia',
            'Porque tinha esquecido o caminho'
          ],
          certa: 0,
          dica: 'Releia a pergunta de Sancho no segundo parágrafo, até o fim da frase.',
          porque: 'Mensageiro honesto só conta o que viu. Sancho viu, e riu até chorar!'
        }
      ],
      sabia: 'Amadís de Gaula existe de verdade: é um romance de cavalaria que muita gente leu na Espanha antes de Cervantes escrever Dom Quixote.'
    },

    // Capítulo 18 — A Carta para Dulcineia
    3: {
      titulo: 'A carta que ficou na pedra',
      selo: '💌',
      convite: 'A carta ficou para trás e Sancho só tem a memória. Dá para pôr tudo em ordem e ainda decifrar um código?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem o que aconteceu com a carta.',
          itens: [
            'Dom Quixote escreveu a carta numa folha do caderno de poemas',
            'Sancho subiu no burrico e partiu pela estrada',
            'Na primeira descida, Sancho percebeu que estava sem a carta',
            'Ele tentou lembrar as palavras que guardara na memória'
          ],
          dica: 'Releia o primeiro e o segundo parágrafos, um depois do outro.',
          porque: 'Da escrita à descida, o caminho foi curto. Do esquecimento ao susto, ainda mais.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Por que era Sancho, e não Dom Quixote, quem ia levar a carta até Dulcineia?',
          opcoes: [
            'Dom Quixote ia ficar na clareira, mostrando a sua saudade',
            'Rocinante estava cansado demais para andar',
            'Dom Quixote não sabia o caminho da estrada',
            'Sancho conhecia Dulcineia melhor do que ninguém'
          ],
          certa: 0,
          dica: 'Volte à página anterior e releia o que Dom Quixote disse a Sancho no começo.',
          porque: 'O cavaleiro tinha uma saudade para exibir. Sobrou para Sancho o trabalho de carteiro!'
        },
        {
          tipo: 'enigma',
          pergunta: 'Dom Quixote escondeu em código o nome de quem vai receber a carta. Use a chave e decifre!',
          resposta: 'DULCINEIA',
          extras: 'MS',
          cifra: {
            mensagem: '🌙⭐🔔🌸🍎🐟🌼🍎🎈',
            chave: [['🌙', 'D'], ['⭐', 'U'], ['🔔', 'L'], ['🌸', 'C'], ['🍎', 'I'], ['🐟', 'N'], ['🌼', 'E'], ['🎈', 'A']]
          },
          dica: 'Olhe o título do capítulo: para quem é a carta? Confira se as letras batem com o código.',
          porque: 'Carta de amor com mensagem secreta: nem Sancho distraído estragaria essa!'
        }
      ],
      sabia: 'No livro de Cervantes, foi Sancho quem inventou o apelido "Cavaleiro da Triste Figura" para o seu amo. Depois, Dom Quixote gostou tanto que passou a usá-lo até para assinar a carta!'
    },

    // Capítulo 19 — Amigos Disfarçados
    4: {
      titulo: 'O plano da barba de boi',
      selo: '🧔',
      convite: 'Dois amigos querem levar Dom Quixote para casa sem briga nem susto. Qual é o truque deles?',
      etapas: [
        {
          tipo: 'quiz',
          pergunta: 'Por que o padre e o barbeiro resolveram inventar uma princesa em perigo?',
          opcoes: [
            'Porque Dom Quixote só voltaria se uma moça pedisse a sua ajuda',
            'Porque o padre sempre sonhou em ser princesa',
            'Porque a pousada estava vazia e sem graça',
            'Porque Sancho queria ganhar uma coroa'
          ],
          certa: 0,
          dica: 'Releia a fala de Sancho no segundo parágrafo, a que começa com "Ele nunca vai querer voltar".',
          porque: 'Um plano de amigo: sem briga, sem susto, só um teatrinho.'
        },
        {
          tipo: 'lacunas',
          pergunta: 'Toque nas palavras certas para completar o ditado que combina com os disfarces.',
          texto: 'O ___ não faz o ___.',
          respostas: ['hábito', 'monge'],
          distratores: ['sapato', 'queijo'],
          dica: 'Pense em quem vestiu saia e touca de flores e, por baixo, continuava sendo o padre.',
          porque: 'Hábito é a roupa do monge. O ditado diz que roupa não muda quem a pessoa é.'
        }
      ],
      sabia: 'Na época de Cervantes, em muitos lugares da Europa, os barbeiros não só cortavam cabelo e barba: também faziam pequenos curativos e arrancavam dentes.'
    },

    // Capítulo 20 — A Princesa Micomicona
    5: {
      titulo: 'Teatro ou verdade?',
      selo: '👑',
      convite: 'Doroteia entra em cena com vestido de seda. O que é fingimento e o que é de verdade?',
      etapas: [
        {
          tipo: 'classificar',
          pergunta: 'Mande cada coisa para o lugar certo: invenção do teatro dos amigos ou verdade da história.',
          grupos: ['🎭 Teatro dos amigos', '🌿 De verdade'],
          itens: [
            { texto: 'A princesa Micomicona', grupo: 0 },
            { texto: 'O reino de Micomicão', grupo: 0 },
            { texto: 'O gigante que invadiu o reino', grupo: 0 },
            { texto: 'Doroteia, moça esperta e ótima para fazer teatro', grupo: 1 },
            { texto: 'A promessa feita por Dom Quixote', grupo: 1 },
            { texto: 'O plano para levá-lo de volta para casa', grupo: 1 }
          ],
          dica: 'Pergunte a cada item: isso existe só na história que Doroteia conta?',
          porque: 'Doroteia fez de conta, mas o carinho dos amigos era de verdade.'
        },
        {
          tipo: 'quiz',
          pergunta: 'Qual era o verdadeiro objetivo do pedido de socorro da "princesa"?',
          opcoes: [
            'Fazer Dom Quixote voltar para casa sem brigas',
            'Conseguir moedas de ouro para os amigos',
            'Salvar de verdade um reino distante',
            'Vingar-se de Sancho'
          ],
          certa: 0,
          dica: 'Releia o primeiro parágrafo e o último: para onde Dom Quixote partiu no fim?',
          porque: 'O pedido era de mentirinha. O caminho de volta, esse sim, valia de verdade.'
        }
      ],
      sabia: 'A palavra "princesa" vem de "princeps", do latim, que quer dizer "o primeiro", "o principal".'
    },

    // Capítulo 21 — A Batalha dos Odres
    6: {
      titulo: 'O gigante que era um saco',
      selo: '🍷',
      convite: 'No meio da noite, um gigante invadiu a pousada. Ou será que era só um saco de vinho?',
      etapas: [
        {
          tipo: 'ordenar',
          pergunta: 'Ponha na ordem a confusão da noite.',
          itens: [
            'Gritos de guerra acordaram a pousada que dormia',
            'Dom Quixote, dormindo, atacou os odres com a espada',
            'O vinho escorreu pelo chão como um rio vermelho',
            'O padre prometeu pagar o prejuízo ao dono',
            'Dom Quixote voltou para a cama e dormiu em paz'
          ],
          dica: 'Siga os três parágrafos na ordem em que aparecem.',
          porque: 'A única coisa que ficou sem estrago foi o sono do cavaleiro.'
        },
        {
          tipo: 'enigma',
          pergunta: 'Em cada odre, Dom Quixote via um gigante com nome comprido. Monte o primeiro nome dele.',
          resposta: 'PANDAFILANDO',
          extras: 'XZ',
          dica: 'O nome do gigante aparece nesta página, no segundo parágrafo, e na página anterior.',
          porque: 'Pandafilando da Fosca Vista: nome de gigante que nem sacos de vinho enfrentariam!'
        }
      ],
      sabia: 'A palavra "odre" vem do latim "uter", que também quer dizer "saco de couro" para guardar líquidos.'
    },

    // Capítulo 22 — Armas e Letras
    7: {
      titulo: 'Recapitulando a Parte 3',
      selo: '⛰️',
      convite: 'Da Serra Morena até a mesa da pousada: o que você guardou da subida inteira?',
      etapas: [
        {
          tipo: 'ligar',
          pergunta: 'Ligue cada personagem ao que ele fez na Parte 3.',
          pares: [
            ['Sancho', 'Achou a mala com moedas e poemas'],
            ['Dom Quixote', 'Deu cambalhotas de saudade'],
            ['O padre', 'Vestiu saia e touca de flores'],
            ['Mestre Nicolau', 'Colou uma barba de rabo de boi'],
            ['Doroteia', 'Fingiu ser a princesa Micomicona']
          ],
          dica: 'Releia as páginas "Um Tesouro no Meio da Serra", "O Padre, o Barbeiro e uma Barba de Boi" e "Uma Princesa Pede Ajuda".',
          porque: 'Cada um fez a sua parte: uns tropeçaram, outros se fantasiaram!'
        },
        {
          tipo: 'erro',
          pergunta: 'Este reconto da Parte 3 tem 4 palavras erradas. Toque nelas para corrigir!',
          texto: 'Na Serra Morena, Sancho achou uma [[carteira|mala]] com moedas de [[prata|ouro]]. O padre e o barbeiro inventaram uma [[bruxa|princesa]] em perigo. De noite, Dom Quixote furou [[sacos de farinha|odres]] de vinho.',
          dica: 'Releia as páginas da mala, da princesa e da batalha dos odres.',
          porque: 'Reconto bom é o que não deixa escapar nem os odres!'
        },
        {
          tipo: 'quiz',
          pergunta: 'No discurso sobre armas e letras, o que Dom Quixote disse?',
          opcoes: [
            'Armas defendem os fracos; livros fazem crescer a verdade',
            'Armas valem muito mais do que os livros',
            'Livros são bons só para passar o tempo',
            'Só quem tem espada merece respeito'
          ],
          certa: 0,
          dica: 'Releia o discurso, no segundo parágrafo desta página.',
          porque: 'Para o cavaleiro, a coragem e os livros cuidam do mundo, cada um do seu jeito.'
        }
      ],
      sabia: 'Cervantes foi soldado antes de ser escritor e ficou com a mão esquerda sem movimento depois de uma batalha no mar. Quando fala de armas e letras, ele sabe do que está falando!'
    }
  }
};
