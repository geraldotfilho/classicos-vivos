/* =====================================================================
   Clássicos Vivos — Internacionalização e Interações do Portal (index e sobre)
   Sincronizado com o cv-idioma e cv-ultimo-livro dos livros interativos.
   Idiomas: Português (pt-BR), English (en), Français (fr), Español (es).
   ===================================================================== */
(function() {
    'use strict';

    const PREF_IDIOMA = 'cv-idioma';
    const PREF_ULTIMO_LIVRO = 'cv-ultimo-livro';
    const PT = 'pt-BR';

    const DICIONARIO = {
        'pt-BR': {
            lang: 'pt-BR',
            nome: 'Português',
            bandeira: 'br',
            lerNesteIdioma: 'Ler em português',
            nomeApp: 'Clássicos Vivos',
            tituloIndex: 'Clássicos Vivos — Biblioteca',
            tituloSobre: 'Sobre — Clássicos Vivos',
            telaCheia: 'Tela cheia',
            paraAdultos: 'Para adultos',
            sobreTitulo: 'Sobre o projeto (para adultos)',
            sobreAria: 'Sobre o projeto, para adultos',
            domQuixote: 'Dom Quixote',
            shelfQuixote: 'Dom Quixote de La Mancha',
            parte: (n) => `Parte ${n}`,
            lerParte: (n) => `Ler Dom Quixote, parte ${n}`,
            emBreve: 'Em breve',
            shelfQuixote2: 'Dom Quixote, segundo volume',
            emProducaoAria: (n) => `Dom Quixote, parte ${n}: em produção`,
            emProducaoTitulo: 'Este livro ainda está sendo feito!',
            emProducaoTexto: 'Estamos escrevendo, desenhando e gravando esta parte da história. Ela vai ser liberada em breve!',
            emProducaoOk: 'Combinado!',
            rascunhosTitulo: 'Livros em produção',
            rascunhosIntro: 'Na estante, os livros em produção aparecem com um cadeado. Para ler os rascunhos (por exemplo, para revisar o texto antes da publicação), ligue a chave abaixo. Rascunhos podem ter texto provisório e ilustrações a caminho.',
            rascunhosToggle: 'Mostrar os rascunhos',
            rascunhosVazio: 'Nenhum livro em produção no momento.',
            situacaoRascunho: '📝 Rascunho',
            situacaoFila: '⏳ Na fila',
            abrirRascunho: 'Abrir',
            continuarLendo: 'Continuar lendo',
            continuarSubtitulo: (parte, pag) => `Dom Quixote · Parte ${parte} (Página ${pag})`,
            voltarBiblioteca: 'Voltar para a biblioteca',
            paraPais: 'Para pais, mães e educadores',
            sobreTituloPrincipal: 'Sobre o Clássicos Vivos',
            introSobre: 'Uma biblioteca aberta de livros digitais interativos que aproxima crianças em fase de alfabetização e letramento (<strong>5 a 8 anos</strong>) das grandes obras da literatura universal, com ilustrações em aquarela, narração e interações pensadas para o toque no tablet.',
            comoAjudam: 'Como os livros ajudam a ler',
            beneficios: [
                { titulo: '🗣️ Palavras em destaque', desc: 'Tocar numa PALAVRA MAIÚSCULA abre um cartão com a palavra separada em sílabas e a pronúncia em voz alta.' },
                { titulo: '🔊 Leitura guiada', desc: '"Ouvir Página" narra o texto frase por frase, destacando a frase lida para a criança acompanhar.' },
                { titulo: '👓 Duas lentes', desc: 'Cada cena pode ser vista como ela é (Realidade) ou como Dom Quixote a imagina (Imaginação). O texto não muda: muda o olhar.' },
                { titulo: '👆 Interações com sentido', desc: 'Vestir o cavaleiro, alimentar o Rocinante, soprar o vento: cada toque transforma a ilustração, sem competir com a leitura.' }
            ],
            acervoTitulo: 'Acervo',
            autorQuixote: '· Miguel de Cervantes',
            p1Desc: '<strong>Parte 1: O Cavaleiro da Super Imaginação</strong> (8 páginas): o fidalgo leitor, a armadura do bisavô, Rocinante e Dulcineia, a pousada-castelo, a sagração sob a lua cheia, o escudeiro Sancho Pança e o duelo contra os moinhos-gigantes.',
            p2Desc: '<strong>Parte 2: Exércitos de Lã e o Elmo Encantado</strong>: a carga contra os gigantes e o tombo nos moinhos, a lança de carvalho, os pastores e a Idade de Ouro, a batalha das ovelhas, o Cavaleiro da Triste Figura, as cabras que atravessam o rio e o elmo de Mambrino.',
            p3Desc: '<strong>Parte 3: Serra Morena e a Princesa Micomicona</strong>: a mala perdida, as cambalhotas, a carta para Dulcineia, os amigos disfarçados, a princesa Micomicona, a batalha dos odres e a volta à pousada.',
            p4Desc: '<strong>Parte 4: O Elmo, a Bacia e a Jaula Encantada</strong>: o bacielmo, a jaula que vira carruagem de magos, o piquenique de Sancho, o Cavaleiro do Lago, a cabra fujona, a romaria e a volta para casa.',
            todasIlustradas: 'O primeiro volume de Dom Quixote (Partes 1 a 4) está todo ilustrado e interativo. O segundo volume está em produção.',
            comoUsarTitulo: 'Como usar no tablet',
            comoUsarItens: [
                'Funciona <strong>sem internet</strong>: depois da primeira visita, o navegador guarda os livros. No Chrome Android, use <em>"Adicionar à tela inicial"</em> para abrir como aplicativo, em tela cheia.',
                'Toque em <strong>🗣️ Voz</strong>, no topo do livro, para escolher quem lê: a <strong>narração gravada</strong> (quando disponível) ou uma das vozes do aparelho, e a velocidade (normal ou devagar). A escolha fica guardada no tablet.',
                '<strong>Toque numa frase</strong> do texto para a narração começar por ela. O botão <strong>Aa</strong> mostra o texto todo em <strong>LETRAS MAIÚSCULAS</strong> (as letras de forma ajudam quem está começando a ler sozinho).',
                'As <strong>bandeirinhas</strong> no topo trocam o idioma do texto: português (original), inglês, francês e espanhol. O idioma escolhido fica gravado e vale para toda a biblioteca.',
                'Botão <strong>🔄 Recomeçar</strong>: cada página tem um botão para reiniciar as interações e brincadeiras daquela página específica.',
                'Melhor experiência em tablets (retrato ou paisagem). Também funciona no celular e no computador.'
            ],
            licenca1: 'Projeto aberto e gratuito. Código sob licença MIT; textos adaptados e ilustrações sob CC BY 4.0, livres para uso em escolas mantendo o crédito ao <strong>Clássicos Vivos</strong>.',
            licenca2: 'Sugestões e contribuições: <a class="text-indigo-700 underline" href="https://github.com/geraldotfilho/classicos-vivos/issues">github.com/geraldotfilho/classicos-vivos</a>',
            swNovaVersao: 'Nova versão disponível! ✨',
            swAtualizar: 'Atualizar',

            // Coleção / Boxset (index.html)
            colecaoCompletaBadge: 'Coleção Completa · 4 Partes',
            colecaoPrimeiroVolume: 'Primeiro Volume (1605)',
            toqueParaAbrir: 'Toque para abrir a coleção',
            fecharColecao: 'Fechar coleção',
            fecharColecaoAria: 'Fechar coleção e recolher livros',
            escolhaParte: 'Escolha uma das 4 partes para começar a ler:',
            boxsetAria: 'Coleção Dom Quixote: Primeiro Volume (1605) com 4 partes. Toque para abrir.',
            p1TituloCurto: 'O Cavaleiro da Super Imaginação',
            p2TituloCurto: 'Exércitos de Lã e o Elmo Encantado',
            p3TituloCurto: 'Serra Morena e a Princesa Micomicona',
            p4TituloCurto: 'O Elmo, a Bacia e a Jaula Encantada',

            // Abas (sobre.html)
            abaProposta: 'Proposta & Como Funciona',
            abaReceita: 'A Nossa Receita',
            abaAcervo: 'Acervo & Produção',
            abaQuemFaz: 'Quem Faz & Contato',

            // Aba 2: Receita de adaptação
            receitaTitulo: 'A Nossa Receita de Adaptação',
            receitaIntro: 'Como transformar as maiores obras-primas da literatura universal em livros digitais interativos, acolhedores e formativos para crianças de 5 a 8 anos (com leitor de referência de 6 anos). Nossa receita geral vale para qualquer clássico:',
            pilares: [
                {
                    titulo: '🏛️ Fidelidade ao espírito e essência do clássico',
                    desc: 'Não descaracterizamos a força poética, os arcos narrativos fundamentais ou os dilemas morais do autor original. Resumimos e selecionamos episódios com cuidado para que o fio da história nunca se perca.'
                },
                {
                    titulo: '🛡️ Proteção da infância',
                    desc: 'Removemos violência explícita, crueldade física ou moral, humilhação usada como piada, preconceitos e medo gratuito. Preservamos o conflito ético e o perigo simbólico necessários ao amadurecimento, mas de forma segura e saudável.'
                },
                {
                    titulo: '📏 Adequação de ritmo e linguagem (leitor de 6 anos)',
                    desc: 'Frases em ordem direta, ritmo leve e parágrafos curtos. Vocabulário acolhedor com palavras-chave destacadas para apoiar a alfabetização fonética e o letramento.'
                },
                {
                    titulo: '🎯 Gamificação literária com propósito',
                    desc: 'Toda interação nasce do enredo e transforma a cena. Sem placares, cronômetros, vidas perdidas ou advertências em vermelho: a brincadeira ensina, engaja e alfabetiza sem dispersar.'
                },
                {
                    titulo: '🛑 Paradas de aprovação e escuta real',
                    desc: 'Cada capítulo e cada atividade são lidos e experimentados no tablet por um pai com seu filho antes de qualquer publicação definitiva.'
                }
            ],
            transparenciaTitulo: 'Transparência de Idiomas & Convite aos Leitores Nativos',
            transparenciaTexto: '<p class="leading-relaxed">Todos os textos da biblioteca são <strong>criados e lapidados originalmente em língua portuguesa</strong> pelo criador do projeto, passando por minuciosa revisão artesanal até chegarem à versão final definitiva.</p><p class="leading-relaxed">Apenas após essa consolidação em português, os livros são traduzidos com o suporte de agentes avançados de inteligência artificial para os demais idiomas (inglês, espanhol e francês).</p><p class="leading-relaxed bg-amber-100/90 border border-amber-300 rounded-xl p-3 text-amber-950 font-semibold">Convidamos carinhosamente pais, mães e educadores nativos desses idiomas a <strong>lerem as histórias antes de apresentá-las às crianças</strong> e colaborarem reportando qualquer detalhe, sutileza cultural ou inconsistência de tradução!</p>',

            // Aba 4: Quem Faz & Contato
            quemFazTitulo: 'Quem Faz o Clássicos Vivos',
            geraldoCitacao: '“Geraldo Travassos — pernambucano orgulhoso, pai apaixonado, faminto por conhecimento, amante dos livros, fã da ciência, defensor de uma educação respeitosa e entusiasta da tecnologia.”',
            geraldoBio: 'O Clássicos Vivos nasceu de forma afetiva e artesanal: do desejo de um pai em aproximar seu filho dos maiores tesouros da literatura mundial de um jeito vivo, acolhedor e contemporâneo. Ao notar que os clássicos costumam ficar distantes dos pequenos pela linguagem arcaica ou pela violência desnecessária, Geraldo uniu o amor pelos livros e pela tecnologia para criar uma biblioteca viva, acolhedora e acessível a qualquer família.',
            contatoTitulo: 'Canais de Contato e Contribuição',
            contatoGithubTexto: 'O canal preferencial para dúvidas, sugestões, colaborações e reporte de traduções é direto pelo repositório no GitHub, abrindo uma Issue ou Discussão:',
            contatoGithubBtn: 'Abrir uma Issue no GitHub',
            contatoEmailTexto: 'Para contato pessoal, parcerias pedagógicas ou conversas sobre literatura e educação:',
            contatoEmail: 'geraldotfilho@gmail.com'
        },
        'en': {
            lang: 'en-GB',
            nome: 'English',
            bandeira: 'gb',
            lerNesteIdioma: 'Read in English',
            nomeApp: 'Living Classics',
            tituloIndex: 'Living Classics — Library',
            tituloSobre: 'About — Living Classics',
            telaCheia: 'Full screen',
            paraAdultos: 'For grown-ups',
            sobreTitulo: 'About the project (for grown-ups)',
            sobreAria: 'About the project, for grown-ups',
            domQuixote: 'Don Quixote',
            shelfQuixote: 'Don Quixote of La Mancha',
            parte: (n) => `Part ${n}`,
            lerParte: (n) => `Read Don Quixote, part ${n}`,
            emBreve: 'Coming soon',
            shelfQuixote2: 'Don Quixote, second volume',
            emProducaoAria: (n) => `Don Quixote, part ${n}: being made`,
            emProducaoTitulo: 'This book is still being made!',
            emProducaoTexto: 'We are writing, drawing and recording this part of the story. It will be ready soon!',
            emProducaoOk: 'OK!',
            rascunhosTitulo: 'Books in progress',
            rascunhosIntro: 'On the shelf, books in progress show a padlock. To read the drafts (for example, to review the text before it is published), turn on the switch below. Drafts may have provisional text and illustrations still on their way.',
            rascunhosToggle: 'Show the drafts',
            rascunhosVazio: 'No books in progress right now.',
            situacaoRascunho: '📝 Draft',
            situacaoFila: '⏳ Queued',
            abrirRascunho: 'Open',
            continuarLendo: 'Continue reading',
            continuarSubtitulo: (parte, pag) => `Don Quixote · Part ${parte} (Page ${pag})`,
            voltarBiblioteca: 'Back to the library',
            paraPais: 'For parents and educators',
            sobreTituloPrincipal: 'About Living Classics',
            introSobre: 'An open library of interactive digital books that brings children learning to read (<strong>ages 5 to 8</strong>) closer to masterpieces of world literature, featuring watercolour illustrations, narration, and touch-first interactions for tablets.',
            comoAjudam: 'How the books support reading',
            beneficios: [
                { titulo: '🗣️ Highlighted words', desc: 'Tapping a CAPITAL WORD opens a card with the word split into syllables and read aloud.' },
                { titulo: '🔊 Guided reading', desc: '"Listen" narrates the text sentence by sentence, highlighting each sentence for the child to follow along.' },
                { titulo: '👓 Two lenses', desc: 'Each scene can be viewed as it is (Reality) or as Don Quixote imagines it (Imagination). The story stays the same: only the vision changes.' },
                { titulo: '👆 Meaningful interactions', desc: 'Dressing the knight, feeding Rocinante, blowing the wind: every gesture transforms the artwork without competing with reading.' }
            ],
            acervoTitulo: 'Collection',
            autorQuixote: '· Miguel de Cervantes',
            p1Desc: '<strong>Part 1: The Knight of Super Imagination</strong> (8 pages): the book-loving gentleman, the great-grandfather\'s armour, Rocinante and Dulcinea, the castle-inn, knighthood under the full moon, squire Sancho Panza, and the duel against the giant windmills.',
            p2Desc: '<strong>Part 2: Armies of Wool and the Enchanted Helmet</strong>: the charge against giants, the oak branch lance, the goatherds and the Golden Age, the battle of the sheep, the Knight of the Rueful Countenance, and the helmet of Mambrino.',
            p3Desc: '<strong>Part 3: Sierra Morena and Princess Micomicona</strong>: the lost suitcase, the acrobatics, the letter to Dulcinea, disguised friends, Princess Micomicona, and the battle of the wine skins.',
            p4Desc: '<strong>Part 4: The Helmet, the Basin and the Enchanted Cage</strong>: the basin-helmet, the cage that becomes a wizards\' carriage, Sancho\'s picnic, the Knight of the Lake, the runaway goat, the procession and the journey home.',
            todasIlustradas: 'The first volume of Don Quixote (Parts 1 to 4) is fully illustrated and interactive. The second volume is in progress.',
            comoUsarTitulo: 'How to use on a tablet',
            comoUsarItens: [
                'Works <strong>offline</strong>: after the first visit, the browser saves the books. In Chrome Android, tap <em>"Add to Home Screen"</em> to open as a full-screen app.',
                'Tap <strong>🗣️ Voice</strong> at the top of the book to choose the narrator or device voices, and speech speed. Settings are remembered on your device.',
                '<strong>Tap any sentence</strong> to start guided reading right from there. The <strong>Aa</strong> button displays all text in <strong>CAPITAL LETTERS</strong> for emerging readers.',
                'The <strong>flags</strong> at the top switch language: Portuguese (original), English, French, and Spanish. Your chosen language is remembered across the library.',
                '<strong>🔄 Restart button</strong>: each page has a dedicated button to reset that page\'s interactive activities.',
                'Optimised for tablets (portrait or landscape). Also works on smartphones and computers.'
            ],
            licenca1: 'Open and free project. Code under MIT licence; adapted texts and illustrations under CC BY 4.0, free for educational use with attribution to <strong>Living Classics</strong>.',
            licenca2: 'Suggestions and contributions: <a class="text-indigo-700 underline" href="https://github.com/geraldotfilho/classicos-vivos/issues">github.com/geraldotfilho/classicos-vivos</a>',
            swNovaVersao: 'New version available! ✨',
            swAtualizar: 'Update',

            // Coleção / Boxset (index.html)
            colecaoCompletaBadge: 'Complete Collection · 4 Parts',
            colecaoPrimeiroVolume: 'First Volume (1605)',
            toqueParaAbrir: 'Tap to open the collection',
            fecharColecao: 'Close collection',
            fecharColecaoAria: 'Close collection and collapse books',
            escolhaParte: 'Choose one of the 4 parts to start reading:',
            boxsetAria: 'Don Quixote Collection: First Volume (1605) with 4 parts. Tap to open.',
            p1TituloCurto: 'The Knight of Super Imagination',
            p2TituloCurto: 'Armies of Wool & Enchanted Helmet',
            p3TituloCurto: 'Sierra Morena & Princess Micomicona',
            p4TituloCurto: 'The Helmet, Basin & Enchanted Cage',

            // Abas (sobre.html)
            abaProposta: 'Vision & How It Works',
            abaReceita: 'Our Adaptation Recipe',
            abaAcervo: 'Collection & In Progress',
            abaQuemFaz: 'Creator & Contact',

            // Aba 2: Receita de adaptação
            receitaTitulo: 'Our Adaptation Recipe',
            receitaIntro: 'How we adapt the greatest masterpieces of world literature into warm, formative interactive books for children aged 5 to 8 (with a reference reader aged 6). Our general recipe applies to any classic:',
            pilares: [
                {
                    titulo: '🏛️ Faithful to the spirit of the classic',
                    desc: 'We preserve the poetic essence, core story arcs, and moral dilemmas of the original author without distorting the story. Episodes are carefully selected and summarized so the narrative thread is never lost.'
                },
                {
                    titulo: '🛡️ Protecting childhood',
                    desc: 'We remove explicit violence, cruelty, humiliation, and gratuitous fear, keeping conflicts healthy and age-appropriate.'
                },
                {
                    titulo: '📏 Rhythm and language for age 6',
                    desc: 'Direct sentences, gentle rhythm, and concise paragraphs. Welcoming vocabulary with highlighted keywords to support phonics and early literacy.'
                },
                {
                    titulo: '🎯 Meaningful literary gamification',
                    desc: 'Every interaction springs from the plot and transforms the artwork. No scoreboards, timers, or penalties: technology enchants and teaches without distraction.'
                },
                {
                    titulo: '🛑 Human review checkpoints',
                    desc: 'Every chapter and activity is read and tested on a tablet by a father with his child before publication.'
                }
            ],
            transparenciaTitulo: 'Language Transparency & Call for Native Readers',
            transparenciaTexto: '<p class="leading-relaxed">All texts in the library are <strong>originally created and refined in Portuguese</strong> by the project creator, undergoing thorough human revision before publication.</p><p class="leading-relaxed">Only after full consolidation in Portuguese are the stories translated into English, Spanish, and French with advanced AI assistance.</p><p class="leading-relaxed bg-amber-100/90 border border-amber-300 rounded-xl p-3 text-amber-950 font-semibold">We warmly invite native-speaking parents and educators to <strong>read the stories before sharing them with children</strong> and help us by reporting any subtleties, cultural nuances, or translation suggestions!</p>',

            // Aba 4: Quem Faz & Contato
            quemFazTitulo: 'Who Makes Clássicos Vivos',
            geraldoCitacao: '“Geraldo Travassos — proud native of Pernambuco (Brazil), passionate father, hungry for knowledge, lover of books, fan of science, advocate of respectful education, and technology enthusiast.”',
            geraldoBio: 'Clássicos Vivos was born from a father\'s loving wish to bring the treasures of world literature to his child in a living, gentle, and modern format. Realising that classics often feel distant to young children due to archaic vocabulary or needless violence, Geraldo combined his love for books and technology to craft an interactive library accessible to every family.',
            contatoTitulo: 'Contact & Collaboration',
            contatoGithubTexto: 'The preferred channel for questions, suggestions, collaborations, and translation feedback is GitHub, by opening an Issue or Discussion:',
            contatoGithubBtn: 'Open an Issue on GitHub',
            contatoEmailTexto: 'For personal contact, pedagogical partnerships, or educational dialogue:',
            contatoEmail: 'geraldotfilho@gmail.com'
        },
        'fr': {
            lang: 'fr-FR',
            nome: 'Français',
            bandeira: 'fr',
            lerNesteIdioma: 'Lire en français',
            nomeApp: 'Classiques Vivants',
            tituloIndex: 'Classiques Vivants — Bibliothèque',
            tituloSobre: 'À propos — Classiques Vivants',
            telaCheia: 'Plein écran',
            paraAdultos: 'Pour les adultes',
            sobreTitulo: 'À propos du projet (pour adultes)',
            sobreAria: 'À propos du projet, pour adultes',
            domQuixote: 'Don Quichotte',
            shelfQuixote: 'Don Quichotte de la Manche',
            parte: (n) => `Partie ${n}`,
            lerParte: (n) => `Lire Don Quichotte, partie ${n}`,
            emBreve: 'Bientôt',
            shelfQuixote2: 'Don Quichotte, second volume',
            emProducaoAria: (n) => `Don Quichotte, partie ${n} : en préparation`,
            emProducaoTitulo: 'Ce livre est encore en préparation !',
            emProducaoTexto: 'Nous écrivons, dessinons et enregistrons cette partie de l\'histoire. Elle sera bientôt prête !',
            emProducaoOk: 'D\'accord !',
            rascunhosTitulo: 'Livres en préparation',
            rascunhosIntro: 'Sur l\'étagère, les livres en préparation ont un cadenas. Pour lire les brouillons (par exemple, pour relire le texte avant la publication), activez l\'interrupteur ci-dessous. Les brouillons peuvent avoir un texte provisoire et des illustrations à venir.',
            rascunhosToggle: 'Afficher les brouillons',
            rascunhosVazio: 'Aucun livre en préparation pour le moment.',
            situacaoRascunho: '📝 Brouillon',
            situacaoFila: '⏳ En attente',
            abrirRascunho: 'Ouvrir',
            continuarLendo: 'Continuer la lecture',
            continuarSubtitulo: (parte, pag) => `Don Quichotte · Partie ${parte} (Page ${pag})`,
            voltarBiblioteca: 'Retour à la bibliothèque',
            paraPais: 'Pour parents et éducateurs',
            sobreTituloPrincipal: 'À propos de Classiques Vivants',
            introSobre: 'Une bibliothèque ouverte de livres numériques interactifs qui fait découvrir aux enfants en apprentissage de la lecture (<strong>5 à 8 ans</strong>) les chefs-d\'œuvre de la littérature universelle, avec des illustrations à l\'aquarelle, narration et interactions pensées pour tablette tactile.',
            comoAjudam: 'Comment les livres aident à lire',
            beneficios: [
                { titulo: '🗣️ Mots en valeur', desc: 'Toucher un MOT EN MAJUSCULES ouvre une carte avec le mot découpé en syllabes et lu à voix haute.' },
                { titulo: '🔊 Lecture guidée', desc: '« Écouter » lit le texte phrase par phrase, en surlignant chaque phrase pour aider l\'enfant à suivre.' },
                { titulo: '👓 Deux lentilles', desc: 'Chaque scène peut être vue telle quelle (Réalité) ou telle que Don Quichotte l\'imagine (Imagination). Le texte ne change pas : le regard change.' },
                { titulo: '👆 Interactions signifiantes', desc: 'Habiller le chevalier, nourrir Rossinante, souffler le vent : chaque geste transforme l\'illustration sans gêner la lecture.' }
            ],
            acervoTitulo: 'Catalogue',
            autorQuixote: '· Miguel de Cervantes',
            p1Desc: '<strong>Partie 1 : Le Chevalier à la Super Imagination</strong> (8 pages) : le gentilhomme lecteur, l\'armure de l\'arrière-grand-père, Rossinante et Dulcinée, l\'auberge-château, l\'adoubement sous la pleine lune, l\'écuyer Sancho Panza et les moulins à vent.',
            p2Desc: '<strong>Partie 2 : Armées de Laine et le Casque Enchanté</strong> : la charge contre les géants, la lance de chêne, les chevriers et l\'Âge d\'or, la bataille des moutons, le Chevalier à la Triste Figure et le casque de Mambrin.',
            p3Desc: '<strong>Partie 3 : Sierra Morena et la Princesse Micomicona</strong> : la valise perdue, les cabrioles, la lettre à Dulcinée, les amis déguisés, la princesse Micomicona et la bataille des outres.',
            p4Desc: '<strong>Partie 4 : Le Heaume, la Bassine et la Cage Enchantée</strong> : le bassin-heaume, la cage qui devient le carrosse des magiciens, le pique-nique de Sancho, le Chevalier du Lac, la chèvre fugueuse, la procession et le retour à la maison.',
            todasIlustradas: 'Le premier volume de Don Quichotte (parties 1 à 4) est entièrement illustré et interactif. Le second volume est en préparation.',
            comoUsarTitulo: 'Comment utiliser sur tablette',
            comoUsarItens: [
                'Fonctionne <strong>hors ligne</strong> : après la première visite, le navigateur enregistre les livres. Sur Chrome Android, touchez <em>« Ajouter à l\'écran d\'accueil »</em> pour ouvrir en plein écran.',
                'Touchez <strong>🗣️ Voix</strong> en haut du livre pour choisir le narrateur ou les voix de l\'appareil, ainsi que la vitesse de lecture.',
                '<strong>Touchez une phrase</strong> pour démarrer la lecture guidée à partir de celle-ci. Le bouton <strong>Aa</strong> affiche tout le texte en <strong>LETTRES MAJUSCULES</strong>.',
                'Les <strong>drapeaux</strong> en haut changent la langue : portugais (original), anglais, français et espagnol. Votre choix est mémorisé sur toute la bibliothèque.',
                'Bouton <strong>🔄 Recommencer</strong> : chaque page dispose d\'un bouton pour réinitialiser les activités de cette page.',
                'Expérience optimale sur tablette (portrait ou paysage). Fonctionne également sur mobile et ordinateur.'
            ],
            licenca1: 'Projet ouvert et gratuit. Code sous licence MIT ; textes et illustrations sous licence CC BY 4.0, libres d\'utilisation avec mention de <strong>Classiques Vivants</strong>.',
            licenca2: 'Suggestions et contributions : <a class="text-indigo-700 underline" href="https://github.com/geraldotfilho/classicos-vivos/issues">github.com/geraldotfilho/classicos-vivos</a>',
            swNovaVersao: 'Nouvelle version disponible ! ✨',
            swAtualizar: 'Mettre à jour',

            // Coleção / Boxset (index.html)
            colecaoCompletaBadge: 'Collection Complète · 4 Parties',
            colecaoPrimeiroVolume: 'Premier Volume (1605)',
            toqueParaAbrir: 'Toucher pour ouvrir la collection',
            fecharColecao: 'Fermer la collection',
            fecharColecaoAria: 'Fermer la collection et replier les livres',
            escolhaParte: 'Choisissez l\'une des 4 parties pour commencer la lecture :',
            boxsetAria: 'Collection Don Quichotte : Premier Volume (1605) en 4 parties. Toucher pour ouvrir.',
            p1TituloCurto: 'Le Chevalier à la Super Imagination',
            p2TituloCurto: 'Armées de Laine et Casque Enchanté',
            p3TituloCurto: 'Sierra Morena et la Princesse Micomicona',
            p4TituloCurto: 'Le Heaume, la Bassine et la Cage',

            // Abas (sobre.html)
            abaProposta: 'Projet & Fonctionnement',
            abaReceita: 'Notre Recette d\'Adaptation',
            abaAcervo: 'Catalogue & En Préparation',
            abaQuemFaz: 'Créateur & Contact',

            // Aba 2: Receita de adaptação
            receitaTitulo: 'Notre Recette d\'Adaptation',
            receitaIntro: 'Comment adapter les chefs-d\'œuvre de la littérature universelle en livres numériques interactifs, chaleureux et formateurs pour enfants de 5 à 8 ans (lecteur de référence de 6 ans). Notre recette générale vaut pour tous les classiques :',
            pilares: [
                {
                    titulo: '🏛️ Fidélité à l\'esprit du classique',
                    desc: 'Nous préservons l\'essence poétique, les arcs narratifs majeurs et les dilemmes moraux de l\'auteur original. Les épisodes sont résumés avec soin pour ne jamais rompre le fil du récit.'
                },
                {
                    titulo: '🛡️ Protection de l\'enfance',
                    desc: 'Nous écartons la violence explicite, la cruauté, l\'humiliation et la peur gratuite, tout en maintenant des conflits sains et adaptés.'
                },
                {
                    titulo: '📏 Rythme et langage pour 6 ans',
                    desc: 'Phrases directes, rythme fluide et courts paragraphes. Vocabulaire accessible avec mots-clés mis en valeur pour soutenir l\'apprentissage de la lecture.'
                },
                {
                    titulo: '🎯 Gamification littéraire signifiante',
                    desc: 'Chaque geste tactile naît du récit et transforme la scène, sans compteurs, vies perdues ou distractions inutiles.'
                },
                {
                    titulo: '🛑 Étapes d\'approbation et écoute réelle',
                    desc: 'Chaque chapitre et chaque activité sont lus et testés sur tablette par un père avec son enfant avant toute publication définitive.'
                }
            ],
            transparenciaTitulo: 'Transparence Linguistique & Appel aux Locuteurs Natifs',
            transparenciaTexto: '<p class="leading-relaxed">Tous les textes de la bibliothèque sont <strong>créés et polis originellement en langue portugaise</strong> par le créateur du projet, avec une relecture artisanale rigoureuse.</p><p class="leading-relaxed">Ce n\'est qu\'après cette consolidation en portugais que les récits sont traduits vers le français, l\'anglais et l\'espagnol avec l\'appui d\'une IA avancée.</p><p class="leading-relaxed bg-amber-100/90 border border-amber-300 rounded-xl p-3 text-amber-950 font-semibold">Nous invitons chaleureusement les parents et enseignants francophones à <strong>lire les histoires avant de les faire découvrir aux enfants</strong> et à nous signaler toute nuance culturelle ou suggestion de traduction !</p>',

            // Aba 4: Quem Faz & Contato
            quemFazTitulo: 'Qui Crée Clássicos Vivos',
            geraldoCitacao: '« Geraldo Travassos — fier habitant du Pernambouc (Brésil), père passionné, assoiffé de savoir, amoureux des livres, féru de science, défenseur d\'une éducation bienveillante et enthousiaste des nouvelles technologies. »',
            geraldoBio: 'Clássicos Vivos est né de l\'élan affectueux d\'un père désireux d\'initier son enfant aux plus grands chefs-d\'œuvre de la littérature sous une forme vivante, sensible et moderne. Constatant que les classiques intimident souvent les plus jeunes par leur vocabulaire ancien ou leur violence inutile, Geraldo a allié son amour des livres et de la technologie pour bâtir une bibliothèque interactive ouverte à chaque foyer.',
            contatoTitulo: 'Contact & Contribution',
            contatoGithubTexto: 'Le canal privilégié pour vos questions, suggestions, contributions et retours linguistiques est GitHub, en ouvrant une Issue ou une Discussion :',
            contatoGithubBtn: 'Ouvrir une Issue sur GitHub',
            contatoEmailTexto: 'Pour contact direct, partenariats éducatifs ou échanges littéraires :',
            contatoEmail: 'geraldotfilho@gmail.com'
        },
        'es': {
            lang: 'es-ES',
            nome: 'Español',
            bandeira: 'es',
            lerNesteIdioma: 'Leer en español',
            nomeApp: 'Clásicos Vivos',
            tituloIndex: 'Clásicos Vivos — Biblioteca',
            tituloSobre: 'Acerca de — Clásicos Vivos',
            telaCheia: 'Pantalla completa',
            paraAdultos: 'Para adultos',
            sobreTitulo: 'Sobre el proyecto (para adultos)',
            sobreAria: 'Sobre el proyecto, para adultos',
            domQuixote: 'Don Quijote',
            shelfQuixote: 'Don Quijote de la Mancha',
            parte: (n) => `Parte ${n}`,
            lerParte: (n) => `Leer Don Quijote, parte ${n}`,
            emBreve: 'Pronto',
            shelfQuixote2: 'Don Quijote, segundo volumen',
            emProducaoAria: (n) => `Don Quijote, parte ${n}: en preparación`,
            emProducaoTitulo: '¡Este libro todavía se está haciendo!',
            emProducaoTexto: 'Estamos escribiendo, dibujando y grabando esta parte de la historia. ¡Muy pronto estará lista!',
            emProducaoOk: '¡Vale!',
            rascunhosTitulo: 'Libros en preparación',
            rascunhosIntro: 'En la estantería, los libros en preparación tienen un candado. Para leer los borradores (por ejemplo, para revisar el texto antes de publicarlo), activa el interruptor de abajo. Los borradores pueden tener texto provisional e ilustraciones en camino.',
            rascunhosToggle: 'Mostrar los borradores',
            rascunhosVazio: 'Ningún libro en preparación por ahora.',
            situacaoRascunho: '📝 Borrador',
            situacaoFila: '⏳ En cola',
            abrirRascunho: 'Abrir',
            continuarLendo: 'Continuar leyendo',
            continuarSubtitulo: (parte, pag) => `Don Quijote · Parte ${parte} (Pág. ${pag})`,
            voltarBiblioteca: 'Volver a la biblioteca',
            paraPais: 'Para madres, padres y educadores',
            sobreTituloPrincipal: 'Acerca de Clásicos Vivos',
            introSobre: 'Una biblioteca abierta de libros digitales interactivos que acerca a los niños en fase de alfabetización (<strong>5 a 8 años</strong>) a las grandes obras de la literatura universal, con ilustraciones en acuarela, narración e interacciones táctiles pensadas para tabletas.',
            comoAjudam: 'Cómo ayudan los libros a leer',
            beneficios: [
                { titulo: '🗣️ Palabras destacadas', desc: 'Tocar una PALABRA EN MAYÚSCULAS abre una tarjeta con la palabra dividida en sílabas y leída en voz alta.' },
                { titulo: '🔊 Lectura guiada', desc: '«Escuchar» lee el texto frase por frase, resaltando la frase leída para que el niño la siga.' },
                { titulo: '👓 Dos lentes', desc: 'Cada escena puede verse como es (Realidad) o como Don Quijote la imagina (Imaginación). El texto no cambia: cambia la mirada.' },
                { titulo: '👆 Interacciones con sentido', desc: 'Vestir al caballero, alimentar a Rocinante, soplar el viento: cada toque transforma la ilustración sin distraer de la lectura.' }
            ],
            acervoTitulo: 'Colección',
            autorQuixote: '· Miguel de Cervantes',
            p1Desc: '<strong>Parte 1: El Caballero de la Super Imaginación</strong> (8 páginas): el hidalgo lector, la armadura del bisabuelo, Rocinante y Dulcinea, la venta-castillo, la vela de las armas, el escudero Sancho Panza y el duelo con los molinos.',
            p2Desc: '<strong>Parte 2: Ejércitos de Lana y el Yelmo Encantado</strong>: la carga contra los gigantes, el ramo de encina, los cabreros y la Edad de Oro, la batalla de las ovejas, el Caballero de la Triste Figura y el yelmo de Mambrino.',
            p3Desc: '<strong>Parte 3: Sierra Morena y la Princesa Micomicona</strong>: la maleta perdida, las zapatetas, la carta a Dulcinea, los amigos disfrazados, la princesa Micomicona y la batalla de los cueros de vino.',
            p4Desc: '<strong>Parte 4: El Yelmo, la Bacía y la Jaula Encantada</strong>: el baciyelmo, la jaula que se vuelve carroza de magos, la merienda de Sancho, el Caballero del Lago, la cabra fujona, la romería y la vuelta a casa.',
            todasIlustradas: 'El primer volumen de Don Quijote (partes 1 a 4) está totalmente ilustrado e interactivo. El segundo volumen está en preparación.',
            comoUsarTitulo: 'Cómo usar en la tableta',
            comoUsarItens: [
                'Funciona <strong>sin internet</strong>: tras la primera visita, el navegador guarda los libros. En Chrome Android, usa <em>«Añadir a pantalla de inicio»</em> para abrir como aplicación a pantalla completa.',
                'Toca en <strong>🗣️ Voz</strong> arriba en el libro para elegir quién lee (narración grabada o voces del dispositivo) y la velocidad.',
                '<strong>Toca una frase</strong> para comenzar la narración desde ella. El botón <strong>Aa</strong> muestra todo el texto en <strong>LETRAS MAYÚSCULAS</strong>.',
                'Las <strong>banderitas</strong> cambian el idioma: portugués (original), inglés, francés y español. El idioma se recuerda en toda la biblioteca.',
                'Botón <strong>🔄 Reiniciar</strong>: cada página tiene un botón para reiniciar las interacciones de esa página.',
                'Mejor experiencia en tableta (vertical u horizontal). También funciona en móvil y ordenador.'
            ],
            licenca1: 'Proyecto abierto y gratuito. Código bajo licencia MIT; textos e ilustraciones bajo CC BY 4.0, libres para uso educativo citando a <strong>Clássicos Vivos</strong>.',
            licenca2: 'Sugerencias y contribuciones: <a class="text-indigo-700 underline" href="https://github.com/geraldotfilho/classicos-vivos/issues">github.com/geraldotfilho/classicos-vivos</a>',
            swNovaVersao: '¡Nueva versión disponible! ✨',
            swAtualizar: 'Actualizar',

            // Coleção / Boxset (index.html)
            colecaoCompletaBadge: 'Colección Completa · 4 Partes',
            colecaoPrimeiroVolume: 'Primer Volumen (1605)',
            toqueParaAbrir: 'Toca para abrir la colección',
            fecharColecao: 'Cerrar colección',
            fecharColecaoAria: 'Cerrar colección y recoger libros',
            escolhaParte: 'Elige una de las 4 partes para comenzar a leer:',
            boxsetAria: 'Colección Don Quijote: Primer Volumen (1605) con 4 partes. Toca para abrir.',
            p1TituloCurto: 'El Caballero de la Super Imaginación',
            p2TituloCurto: 'Ejércitos de Lana y Yelmo Encantado',
            p3TituloCurto: 'Sierra Morena y la Princesa Micomicona',
            p4TituloCurto: 'El Yelmo, la Bacía y la Jaula',

            // Abas (sobre.html)
            abaProposta: 'Propuesta y Cómo Funciona',
            abaReceita: 'Nuestra Receta de Adaptación',
            abaAcervo: 'Colección y Producción',
            abaQuemFaz: 'Quién lo Hace y Contacto',

            // Aba 2: Receita de adaptação
            receitaTitulo: 'Nuestra Receta de Adaptación',
            receitaIntro: 'Cómo transformamos las grandes obras maestras de la literatura universal en libros digitales interactivos, acogedores y formativos para niños de 5 a 8 años (lector de referencia de 6 años). Nuestra receta general vale para cualquier clásico:',
            pilares: [
                {
                    titulo: '🏛️ Fidelidad al espíritu del clásico',
                    desc: 'Preservamos la fuerza poética, los arcos narrativos principales y los dilemas morales del autor original sin desvirtuar la obra. Resumimos y seleccionamos episodios con cuidado para no perder el hilo.'
                },
                {
                    titulo: '🛡️ Protección de la infancia',
                    desc: 'Eliminamos violencia explícita, crueldad física o moral, humillación y miedo gratuito, manteniendo conflictos constructivos y adecuados a la edad.'
                },
                {
                    titulo: '📏 Ritmo y lenguaje para 6 años',
                    desc: 'Frases en orden directo, ritmo ágil y párrafos breves. Vocabulario acogedor con palabras clave destacadas para apoyar el aprendizaje de la lectura.'
                },
                {
                    titulo: '🎯 Gamificación literaria con sentido',
                    desc: 'Toda interacción nace del argumento y transforma la ilustración, sin puntuaciones, vidas perdidas ni distracciones vacías.'
                },
                {
                    titulo: '🛑 Paradas de aprobación y lectura real',
                    desc: 'Cada capítulo y actividad se lee y prueba en tableta por un padre con su hijo antes de ser publicado definitivamente.'
                }
            ],
            transparenciaTitulo: 'Transparencia de Idiomas y Llamada a Lectores Nativos',
            transparenciaTexto: '<p class="leading-relaxed">Todos los textos de la biblioteca se <strong>crean y pulen originalmente en lengua portuguesa</strong> por el autor del proyecto, pasando por una esmerada revisión humana.</p><p class="leading-relaxed">Solo tras consolidarse en portugués, los textos se traducen al español, inglés y francés con apoyo de inteligencia artificial avanzada.</p><p class="leading-relaxed bg-amber-100/90 border border-amber-300 rounded-xl p-3 text-amber-950 font-semibold">¡Invitamos cordialmente a madres, padres y docentes hispanohablantes a <strong>leer las historias antes de compartirlas con los pequeños</strong> y colaborar avisándonos de cualquier detalle o sutileza cultural!</p>',

            // Aba 4: Quem Faz & Contato
            quemFazTitulo: 'Quién Hace Clássicos Vivos',
            geraldoCitacao: '“Geraldo Travassos — pernambucano orgulloso, padre apasionado, hambriento de conocimiento, amante de los libros, seguidor de la ciencia, defensor de una educación respetuosa y entusiasta de la tecnología.”',
            geraldoBio: 'Clássicos Vivos nació del deseo afectuoso de un padre de acercar a su hijo a los grandes tesoros de la literatura universal de un modo vivo, tierno y contemporáneo. Al ver que los clásicos suelen quedar lejos de los niños por un lenguaje arcaico o una violencia innecesaria, Geraldo unió su amor por los libros y la tecnología para crear una biblioteca viva y accesible a cualquier familia.',
            contatoTitulo: 'Canales de Contacto y Colaboración',
            contatoGithubTexto: 'El canal preferente para dudas, sugerencias, colaboraciones y reporte de traducciones es GitHub, abriendo una Incidencia o Discusión:',
            contatoGithubBtn: 'Abrir una Incidencia en GitHub',
            contatoEmailTexto: 'Para contacto directo, colaboraciones pedagógicas o diálogo educativo:',
            contatoEmail: 'geraldotfilho@gmail.com'
        }
    };

    function obterIdiomaAtual() {
        try {
            const p = new URLSearchParams(window.location.search).get('lang');
            if (p && DICIONARIO[p]) return p;
            const salvo = localStorage.getItem(PREF_IDIOMA);
            if (salvo && DICIONARIO[salvo]) return salvo;
        } catch (e) {}
        return PT;
    }

    let idiomaAtual = obterIdiomaAtual();

    function salvarIdioma(cod) {
        if (!DICIONARIO[cod]) return;
        idiomaAtual = cod;
        try { localStorage.setItem(PREF_IDIOMA, cod); } catch (e) {}
        aplicarIdiomaNaPagina();
    }

    function montarSeletorBandeiras(container) {
        if (!container) return;
        const iconPath = container.dataset.iconPath || './assets/icones/';
        const codigos = Object.keys(DICIONARIO);
        container.innerHTML = `
            <div class="grupo-idiomas flex items-center gap-0.5 bg-white/90 rounded-2xl border-2 border-amber-300 p-0.5 shadow shrink-0" role="group">
                ${codigos.map(c => {
                    const def = DICIONARIO[c];
                    const ativo = c === idiomaAtual;
                    return `
                        <button type="button" class="btn-idioma ${ativo ? 'idioma-ativo' : ''}" data-idioma-btn="${c}" lang="${def.lang}" title="${def.lerNesteIdioma}" aria-label="${def.lerNesteIdioma}" aria-pressed="${ativo}">
                            <img src="${iconPath}bandeiras/${def.bandeira}.svg" alt="" draggable="false">
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        container.querySelectorAll('[data-idioma-btn]').forEach(btn => {
            btn.addEventListener('click', () => salvarIdioma(btn.dataset.idiomaBtn));
        });
    }

    function aplicarIdiomaNaPagina() {
        const d = DICIONARIO[idiomaAtual] || DICIONARIO[PT];
        document.documentElement.lang = d.lang;

        // Atualiza estado visual das bandeiras
        document.querySelectorAll('[data-idioma-btn]').forEach(btn => {
            const ativo = btn.dataset.idiomaBtn === idiomaAtual;
            btn.classList.toggle('idioma-ativo', ativo);
            btn.setAttribute('aria-pressed', String(ativo));
        });

        // Atualiza títulos de página
        if (document.body.dataset.pagina === 'index') {
            document.title = d.tituloIndex;
        } else if (document.body.dataset.pagina === 'sobre') {
            document.title = d.tituloSobre;
        }

        // Elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const k = el.dataset.i18n;
            if (typeof d[k] === 'string') el.textContent = d[k];
            else if (typeof d[k] === 'function') el.textContent = d[k]();
        });

        // Elementos com data-i18n-html
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const k = el.dataset.i18nHtml;
            if (d[k]) el.innerHTML = d[k];
        });

        // Elementos com data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const k = el.dataset.i18nTitle;
            if (d[k]) el.title = d[k];
        });

        // Elementos com data-i18n-aria
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const k = el.dataset.i18nAria;
            if (d[k]) el.setAttribute('aria-label', d[k]);
        });

        // Atualizações específicas da biblioteca (index.html)
        if (document.body.dataset.pagina === 'index') {
            // Badges, links e títulos curtos das partes
            [1, 2, 3, 4].forEach(n => {
                const badge = document.getElementById(`badge-parte-${n}`);
                if (badge) badge.textContent = d.parte(n);
                const link = document.getElementById(`link-parte-${n}`);
                if (link) link.setAttribute('aria-label', d.lerParte(n));
                const tituloCurto = document.getElementById(`titulo-parte-${n}`);
                if (tituloCurto && d[`p${n}TituloCurto`]) tituloCurto.textContent = d[`p${n}TituloCurto`];
            });
            const shelfQ = document.getElementById('shelf-quixote');
            if (shelfQ) shelfQ.setAttribute('aria-label', d.shelfQuixote);
            const boxset = document.getElementById('boxset-quixote');
            if (boxset && d.boxsetAria) boxset.setAttribute('aria-label', d.boxsetAria);
            renderEstanteEmProducao(d);
            renderBannerContinuar(d);
        }

        // Atualizações específicas da página sobre (sobre.html)
        if (document.body.dataset.pagina === 'sobre') {
            const listaBen = document.getElementById('lista-beneficios');
            if (listaBen && d.beneficios) {
                listaBen.innerHTML = d.beneficios.map(b => `
                    <li class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3">
                        <h3 class="font-display font-bold text-amber-900">${b.titulo}</h3>
                        <p class="text-sm font-semibold">${b.desc}</p>
                    </li>
                `).join('');
            }
            const listaPil = document.getElementById('lista-pilares');
            if (listaPil && d.pilares) {
                listaPil.innerHTML = d.pilares.map(p => `
                    <li class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 space-y-1">
                        <h3 class="font-display font-bold text-amber-950 text-base sm:text-lg">${escapar(p.titulo)}</h3>
                        <p class="text-sm font-semibold text-slate-700 leading-relaxed">${escapar(p.desc)}</p>
                    </li>
                `).join('');
            }
            const listaUso = document.getElementById('lista-como-usar');
            if (listaUso && d.comoUsarItens) {
                listaUso.innerHTML = d.comoUsarItens.map(item => `<li>${item}</li>`).join('');
            }
            renderRascunhos(d);
        }
    }

    /* Obras em produção (assets/js/acervo.js): na estante, só capas-teaser com cadeado */
    function obrasEmProducao() {
        return Array.isArray(window.ACERVO_PRODUCAO) ? window.ACERVO_PRODUCAO : [];
    }

    function escapar(texto) {
        return String(texto ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function renderEstanteEmProducao(d) {
        document.querySelectorAll('[data-estante-producao]').forEach(estante => {
            const obras = obrasEmProducao().filter(o => o.estante === estante.id);
            estante.classList.toggle('hidden', !obras.length);
            if (estante.id === 'shelf-quixote-2') estante.setAttribute('aria-label', d.shelfQuixote2);
            const fila = estante.querySelector('.fila-capas');
            if (!fila) return;
            fila.innerHTML = obras.map(o => `
                <button type="button" class="book-teaser w-24 sm:w-32 text-left" data-em-producao="${escapar(o.id)}" aria-label="${escapar(d.emProducaoAria(o.parte))}">
                    <span class="book-cover relative block aspect-[3/4] rounded-r-2xl rounded-l-md overflow-hidden border-4 border-amber-500/70 bg-gradient-to-b ${escapar(o.cor || 'from-amber-200 to-orange-300')}">
                        <span class="absolute inset-x-0 bottom-3 flex justify-center text-4xl opacity-60" aria-hidden="true">${escapar(o.emoji || '📖')}</span>
                        <span class="absolute top-2 right-2 bg-rose-500/80 text-white font-display font-bold text-sm px-2.5 py-0.5 rounded-full border-2 border-white shadow">${escapar(d.parte(o.parte))}</span>
                        <span class="absolute inset-0 bg-indigo-950/45"></span>
                        <span class="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-indigo-900 border-4 border-indigo-300 text-2xl flex items-center justify-center shadow" aria-hidden="true">🔒</span>
                    </span>
                </button>`).join('');
        });
    }

    /* Toque numa capa-teaser: aviso gentil de que o livro ainda está em produção */
    function avisarEmProducao() {
        const d = DICIONARIO[idiomaAtual] || DICIONARIO[PT];
        let aviso = document.getElementById('aviso-em-producao');
        if (!aviso) {
            aviso = document.createElement('div');
            aviso.id = 'aviso-em-producao';
            aviso.className = 'fixed inset-0 z-50 bg-indigo-950/70 flex items-center justify-center p-4';
            aviso.setAttribute('role', 'dialog');
            aviso.setAttribute('aria-modal', 'true');
            aviso.addEventListener('click', (e) => {
                if (e.target === aviso || e.target.closest('[data-fechar-aviso]')) aviso.classList.add('hidden');
            });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') aviso.classList.add('hidden'); });
            document.body.appendChild(aviso);
        }
        aviso.innerHTML = `
            <div class="w-full max-w-sm bg-amber-50 border-4 border-amber-400 rounded-3xl p-6 text-center shadow-2xl">
                <p class="text-6xl" aria-hidden="true">🎨</p>
                <h2 class="font-display font-bold text-2xl text-amber-950 mt-3">${escapar(d.emProducaoTitulo)}</h2>
                <p class="font-semibold text-amber-900 mt-2">${escapar(d.emProducaoTexto)}</p>
                <button type="button" data-fechar-aviso class="btn-round mt-5 bg-amber-400 border-2 border-amber-600 text-amber-950 font-display font-bold text-lg px-6 py-2.5 rounded-2xl">${escapar(d.emProducaoOk)}</button>
            </div>`;
        aviso.classList.remove('hidden');
        const ok = aviso.querySelector('[data-fechar-aviso]');
        if (ok) ok.focus();
    }

    /* sobre.html: a chave "Mostrar os rascunhos" (lembrada no aparelho) e a lista das obras em produção */
    const PREF_RASCUNHOS = 'cv-rascunhos';
    function rascunhosVisiveis() {
        try { return localStorage.getItem(PREF_RASCUNHOS) === '1'; } catch (e) { return false; }
    }

    function renderRascunhos(d) {
        const chave = document.getElementById('chave-rascunhos');
        const lista = document.getElementById('lista-rascunhos');
        if (!chave || !lista) return;
        const visiveis = rascunhosVisiveis();
        chave.checked = visiveis;
        lista.classList.toggle('hidden', !visiveis);
        const obras = obrasEmProducao();
        lista.innerHTML = obras.length ? obras.map(o => `
            <li class="bg-white border-2 border-amber-300 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
                <div class="min-w-0">
                    <p class="font-display font-bold text-amber-950">${escapar(o.titulo)}</p>
                    <p class="text-xs font-semibold text-slate-600">${escapar(o.obra)}${o.nota ? ` · ${escapar(o.nota)}` : ''}</p>
                </div>
                ${o.situacao === 'rascunho'
                    ? `<a href="${escapar(o.href)}" class="btn-round shrink-0 bg-rose-500 border-2 border-rose-700 text-white font-display font-bold text-sm px-4 py-2 rounded-2xl">${escapar(d.situacaoRascunho)} · ${escapar(d.abrirRascunho)}</a>`
                    : `<span class="shrink-0 bg-slate-100 border-2 border-slate-300 text-slate-600 font-display font-semibold text-sm px-3 py-1.5 rounded-2xl">${escapar(d.situacaoFila)}</span>`}
            </li>`).join('') : `<li class="text-sm font-semibold text-slate-600">${escapar(d.rascunhosVazio)}</li>`;
    }

    function ligarInteracoes() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-em-producao]')) avisarEmProducao();
        });
        const chave = document.getElementById('chave-rascunhos');
        if (chave) chave.addEventListener('change', () => {
            try { localStorage.setItem(PREF_RASCUNHOS, chave.checked ? '1' : '0'); } catch (e) {}
            const lista = document.getElementById('lista-rascunhos');
            if (lista) lista.classList.toggle('hidden', !chave.checked);
        });
    }

    /* M-6: Oferecer "Continuar de onde parou" na biblioteca */
    function renderBannerContinuar(d) {
        const container = document.getElementById('container-continuar');
        if (!container) return;
        let salvo = null;
        try {
            const raw = localStorage.getItem(PREF_ULTIMO_LIVRO);
            if (raw) salvo = JSON.parse(raw);
        } catch (e) {}

        if (!salvo || !salvo.pagina || salvo.pagina <= 0 || !salvo.parte) {
            container.innerHTML = '';
            container.classList.add('hidden');
            return;
        }

        const url = `./dom-quixote/parte-${salvo.parte}.html?page=${salvo.pagina}`;
        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="w-full max-w-xl mx-auto bg-amber-400/95 border-3 border-amber-600 rounded-3xl p-3 sm:p-4 shadow-xl flex items-center justify-between gap-3 text-amber-950 backdrop-blur-sm animate-bounce-subtle">
                <div class="flex items-center gap-3">
                    <span class="text-3xl sm:text-4xl" aria-hidden="true">📖</span>
                    <div>
                        <p class="font-display font-bold text-base sm:text-lg text-amber-950 leading-tight">${d.continuarLendo}</p>
                        <p class="text-xs sm:text-sm font-semibold text-amber-900">${d.continuarSubtitulo(salvo.parte, salvo.pagina + 1)}</p>
                    </div>
                </div>
                <a href="${url}" class="btn-round bg-rose-500 hover:bg-rose-600 text-white font-display font-bold text-sm sm:text-base px-4 py-2.5 rounded-2xl border-2 border-rose-700 flex items-center gap-2 shadow shrink-0">
                    <span>▶</span>
                    <span>${d.continuarLendo}</span>
                </a>
            </div>
        `;
    }

    /* M-9: Notificar sutilmente quando uma versão nova estiver disponível no cache do Service Worker */
    function monitorarServiceWorker(reg) {
        if (!reg) return;
        const d = DICIONARIO[idiomaAtual] || DICIONARIO[PT];

        function exibirAviso() {
            if (document.getElementById('sw-update-toast')) return;
            const toast = document.createElement('div');
            toast.id = 'sw-update-toast';
            toast.className = 'fixed bottom-4 right-4 z-50 bg-amber-950/95 text-amber-100 border-2 border-amber-400 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 backdrop-blur-sm';
            toast.innerHTML = `
                <span class="font-display font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                    <span class="text-base">✨</span>
                    <span>${d.swNovaVersao}</span>
                </span>
                <button type="button" class="btn-round bg-amber-400 hover:bg-amber-300 text-amber-950 font-display font-bold text-xs sm:text-sm px-3 py-1 rounded-xl border border-amber-600 flex items-center gap-1">
                    <i class="ph-bold ph-arrow-counter-clockwise"></i>
                    <span>${d.swAtualizar}</span>
                </button>
                <button type="button" class="text-amber-300 hover:text-white p-1 text-sm leading-none" aria-label="Fechar">✕</button>
            `;
            const btnAtualizar = toast.querySelector('button');
            btnAtualizar.addEventListener('click', () => {
                if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            });
            const btnFechar = toast.querySelectorAll('button')[1];
            btnFechar.addEventListener('click', () => toast.remove());
            document.body.appendChild(toast);
        }

        if (reg.waiting && navigator.serviceWorker.controller) {
            exibirAviso();
        }

        reg.addEventListener('updatefound', () => {
            const novo = reg.installing;
            if (!novo) return;
            novo.addEventListener('statechange', () => {
                if (novo.state === 'installed' && navigator.serviceWorker.controller) {
                    exibirAviso();
                }
            });
        });
    }

    // Inicialização
    function iniciar() {
        const seletor = document.getElementById('seletor-idiomas');
        if (seletor) montarSeletorBandeiras(seletor);
        aplicarIdiomaNaPagina();
        ligarInteracoes();

        if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => monitorarServiceWorker(reg))
                    .catch(() => {});
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
