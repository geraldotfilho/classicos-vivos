# Páginas com o fim cortado pelo gate antigo (varredura de 2026-11-28)

Causa, correção e como consertar: `docs/TODO-NARRACAO.md` §10 (Issues #75, #76 e #79). Varredura com Whisper `small` local na última frase de cada `pN.mp3` (340 páginas): **CORTE?** = a última palavra esperada não apareceu no fim do áudio.

- **Falsos alarmes conhecidos**: nomes próprios (o Whisper escreve "Sherwood" para *Xervedo*, "Nottingham" para *Nortigão*, "Toborso" para *Toboso*) e onomatopeias (*tlim tlim*, *nheeec*, *hum hum*). Confira de ouvido antes de remontar.
- **Já recuperadas nesta sessão (sem API)**: Dom Quixote pt P1 p6, P3 p3 e P4 p4, a partir das versões do git anteriores ao gate de cauda (`9a54054`), com o fim limpo pelo gate corrigido.
- **Conserto do resto**: remontar a parte inteira do cache na máquina que gravou (`--remontar --so-cache`, sem custo) ou regravar pela API com autorização. Depois, `node tools/conferir-narracao.mjs --livro <livro> --partes N --idiomas <idioma> --fim`.

## robin-hood · pt (9 de 26 páginas)

| Parte | Página | Esperado (fim) | Ouvido (fim) | Situação |
| :--- | :--- | :--- | :--- | :--- |
| P1 | `p1` | …virar de cabeca para baixo | …a vida ia virar de cabeca | a remontar |
| P1 | `p4` | …em como ajudar mestre tome | …pensar em como ajudar a mestre | a remontar |
| P1 | `p7` | …tres atravessaram a ponte juntos | …os tres atravessaram a ponte jun | a remontar |
| P1 | `p10` | …sumido nas folhas de xervedo | …tinham sumido nas folhas de sherwood | falso alarme (nome próprio; o MP3 termina naturalmente) |
| P2 | `p3` | …ja chamava para o campeonato | …de nottingham ja chamava para o | a remontar |
| P2 | `p7` | …virado pista para o xerife | …vermelho mais bonito tinha virado pista | a remontar |
| P2 | `p8` | …procurar as pistas com calma | …primeiro vamos procurar as pistas com | a remontar |
| P2 | `p10` | …em tudo cochichou joao pequeno | …clara pensa em tudo consistou joao | a remontar |
| P2 | `p12` | …feito pasteizinhos rindo a toa | …enroladas nos cobertores feito pastazinhos rinda | a remontar |

## dom-quixote · en (37 de 79 páginas)

| Parte | Página | Esperado (fim) | Ouvido (fim) | Situação |
| :--- | :--- | :--- | :--- | :--- |
| P1 | `p3` | …princess dulcinea of el toboso | …beautiful princess dulcinea of el toborso | a remontar |
| P1 | `p4` | …the noblest banquet of kings | …at the noblest banquet of king | a remontar |
| P1 | `p6` | …chatting happily about the future | …road chatting happily about the feud | a remontar |
| P2 | `p2` | …the knights in his books | …just like the nights in his | a remontar |
| P2 | `p0` | …adventures are only just beginning | …the biggest adventures are only just | a remontar |
| P2 | `p1` | …magic can beat our courage | …but no magic can beat our | a remontar |
| P2 | `p7` | …light always brings the truth | …the morning light always brings them | a remontar |
| P2 | `p8` | …to get his breath back | …the grass to get his breath | a remontar |
| P3 | `p2` | …with his somersaults of longing | …help the knight with his somersault | a remontar |
| P3 | `p3` | …words in the right order | …tapping the word in the right | a remontar |
| P3 | `p4` | …almost ran out of breath | …laughing and almost ran out of | a remontar |
| P3 | `p5` | …took the road back home | …onto rossanante and took the road | a remontar |
| P3 | `p0` | …climb the mountains with them | …and climb the mountains with it | a remontar |
| P3 | `p6` | …saved princess micomicona s kingdom | …he had saved princess mico miconas | a remontar |
| P4 | `p2` | …out laughing together in peace | …and everyone burst out laughing together | a remontar |
| P4 | `p5` | …could only mumble mmm hmm | …cheeks stuffed full could only mumble | a remontar |
| P4 | `p6` | …and everyone burst out laughing | …and everyone burst out | a remontar |
| P4 | `p3` | …joins the most faithful hearts | …that joins the most faithful heart | a remontar |
| P5 | `p1` | …said he knows the secret | …and said he knows the sea | a remontar |
| P5 | `p2` | …those little ants was him | …know which of those little ants | a remontar |
| P5 | `p3` | …clink clink | …thank you | a remontar |
| P5 | `p4` | …t the clown s bells | …it wasn t the clown s | a remontar |
| P5 | `p8` | …slowly began to open creeeak | …door slowly began to open creep | a remontar |
| P6 | `p0` | …t take off your blindfold | …page and don t take off | a remontar |
| P6 | `p1` | …sancho gulped | …sancho | a remontar |
| P6 | `p6` | …purse and without our underpants | …a purse and without a runder | a remontar |
| P6 | `p7` | …what could they be planning | …what could they | a remontar |
| P7 | `p0` | …a simple man really govern | …out can a simple man really | a remontar |
| P7 | `p1` | …sancho and tell me afterwards | …eyes open sancho and tell me | a remontar |
| P7 | `p5` | …wiser than many a doctor | …handwriting wiser than many a day | a remontar |
| P8 | `p0` | …will it be a beginning | …oh will it be it | a remontar |
| P8 | `p2` | …someone making up his mind | …his head like someone making up | a remontar |
| P8 | `p3` | …more food in the chapters | …to put more food in the | a remontar |
| P8 | `p5` | …his doubts about that too | …he had his doubts about | a remontar |
| P8 | `p8` | …see if you can guess | …let s see if you can | a remontar |
| P8 | `p4` | …nobody noticed him | …nobody knows | a remontar |
| P8 | `p7` | …nobody called his master that | …the village nobody called his mask | a remontar |

## dom-quixote · es (25 de 79 páginas)

| Parte | Página | Esperado (fim) | Ouvido (fim) | Situação |
| :--- | :--- | :--- | :--- | :--- |
| P1 | `p1` | …en un magnifico leon guardian | …convertia en un magnifico leon guardado | a remontar |
| P1 | `p5` | …a su mas valiente protector | …ganaba a su mas valiente proteccion | a remontar |
| P2 | `p0` | …han hecho mas que empezar | …mayores aventuras no han hecho mas | a remontar |
| P2 | `p3` | …magico siempre que sabemos repartir | …se vuelve magico siempre que sabemos | a remontar |
| P2 | `p5` | …y pensativa en mi escudo | …noble y pensativa en mi escuro | a remontar |
| P3 | `p1` | …secretos mas bonitos del corazon | …guardan los secretos mas bonitos del | a remontar |
| P3 | `p3` | …palabras en el orden correcto | …tocando las palabras en el orden | a remontar |
| P3 | `p5` | …camino de vuelta a casa | …y tomo el camino de vuelta | a remontar |
| P3 | `p6` | …reino de la princesa micomicona | …el reino de la princesa mi | a remontar |
| P3 | `p7` | …al calorcito de su casa | …de vuelta al calorcito de su | a remontar |
| P4 | `p5` | …solo pudo responder hum hum | …los mofletes llenos solo pudo responder | a remontar |
| P5 | `p2` | …de aquellas hormiguitas era el | …ganas cual de aquellas hormiguitas era | a remontar |
| P5 | `p8` | …puerta se abrio despacito niiiic | …la puerta se abrio despacito | a remontar |
| P5 | `p9` | …una cosa alli hay requeson | …cosa alli hay re que son | a remontar |
| P5 | `p4` | …eran los cascabeles del payaso | …y no eran los cascabeles del | a remontar |
| P5 | `p3` | …tlin tlin | …bling | a remontar |
| P6 | `p5` | …victoria que costara tan cara | …he visto una victoria que costo | a remontar |
| P6 | `p9` | …cuchara dentro de la sopa | …cayo la cuchara dentro del azote | a remontar |
| P7 | `p0` | …sabra un hombre sencillo gobernar | …y descubrelo sabra un hombre sencillo | a remontar |
| P7 | `p1` | …y luego me lo cuentas | …ojo sancho y luego me lo | a remontar |
| P7 | `p2` | …tiene un pelo de tonto | …gobernador no tiene un pelo de | a remontar |
| P7 | `p4` | …hasta dentro de los bastones | …ve hasta dentro de los bastos | a remontar |
| P7 | `p5` | …mas sabio que muchos doctores | …temblorosa mas sabio que muchos do | a remontar |
| P8 | `p0` | …o sera un comienzo | …o sera un | a remontar |
| P8 | `p8` | …a ver si lo adivinas | …a ver si lo adivina | a remontar |

## dom-quixote · fr (44 de 79 páginas)

| Parte | Página | Esperado (fim) | Ouvido (fim) | Situação |
| :--- | :--- | :--- | :--- | :--- |
| P1 | `p2` | …que ce resplendissant casque dore | …brillait plus que ce resplandissant casque | a remontar |
| P1 | `p4` | …noble des banquets de rois | …plus noble des banquets de roi | a remontar |
| P2 | `p0` | …aventures ne font que commencer | …grandes aventures ne font que con | a remontar |
| P2 | `p1` | …ne peut vaincre notre courage | …aucune magie ne peut vaincre notre | a remontar |
| P2 | `p3` | …fois qu on sait partager | …chaque fois qu on s epreuve | a remontar |
| P3 | `p2` | …faire ses galipettes de chagrin | …le chevalier a faire ses galipses | a remontar |
| P3 | `p0` | …page et grimpe avec eux | …montagne tourne la page et grimp | a remontar |
| P3 | `p1` | …beaux secrets du c ur | …gardent les plus beaux secrets du | a remontar |
| P3 | `p4` | …en eurent le souffle coupe | …tellement qu ils enurent le souffle | a remontar |
| P3 | `p6` | …royaume de la princesse micomicona | …le royaume de la princesse mick | a remontar |
| P4 | `p2` | …eclat de rire en paix | …d un immense eclat de rire | a remontar |
| P4 | `p4` | …transportant plus que les bagages | …sa route vide ne transportant plus | a remontar |
| P4 | `p5` | …put repondre que miam miam | …puent repondre que mmmmmm nyam nyam | a remontar |
| P4 | `p7` | …un chez soi ou revenir | …avoir un chez soi ou revenu | a remontar |
| P4 | `p8` | …rapides et c est reparti | …jambes rapide mais c est rep | a remontar |
| P4 | `p9` | …mains au rythme du tambourin | …sancho battait des mains au rythme | a remontar |
| P5 | `p0` | …viens decouvrir tous ces secrets | …tourne la page et viens decouvrir | a remontar |
| P5 | `p2` | …petites fourmis c etait lui | …savoir laquelle de ces petites fourmis | a remontar |
| P5 | `p3` | …cling cling | … | a remontar |
| P5 | `p4` | …pas les grelots du clown | …n etait pas les grulots du | a remontar |
| P5 | `p6` | …comme s il allait tomber | …la main comme s il allait | a remontar |
| P5 | `p8` | …s ouvrit tout doucement crrrriiic | …la porte s ouvrit tout doucement | a remontar |
| P5 | `p7` | …levres pour ne pas rire | …a l elevre pour ne pas | a remontar |
| P5 | `p5` | …nez ne m attrape pas | …ce n ait ne m attrape | a remontar |
| P6 | `p0` | …n enleve pas ton bandeau | …tourne la page et n enleve | a remontar |
| P6 | `p2` | …ai une tres longue corde | …et j ai une tres longue | a remontar |
| P6 | `p6` | …sans bourse et sans calecon | …sans bourse et sans quels sont | a remontar |
| P6 | `p7` | …que pouvaient ils bien preparer | …que pouvait il bien | a remontar |
| P6 | `p8` | …enorme cheval tout en bois | …dans le jardin un enorme cheval | a remontar |
| P6 | `p3` | …un devait resoudre ce mystere | …quelqu un devait resoudre ce mis | a remontar |
| P6 | `p1` | …sancho avala sa salive | …choix va la ca s elive | a remontar |
| P7 | `p0` | …simple saura t il gouverner | …tout simple soir t il gouverne | a remontar |
| P7 | `p2` | …a rien d un nigaud | …n a rien d un ego | a remontar |
| P7 | `p4` | …a l interieur des batons | …meme a l interieur des bat | a remontar |
| P7 | `p5` | …sage que bien des docteurs | …plus sage que bien des dents | a remontar |
| P7 | `p6` | …secret | … | a remontar |
| P7 | `p8` | …le chemin de sa liberte | …sur le chemin de sa libre | a remontar |
| P8 | `p3` | …a manger dans les chapitres | …plus a manger dans les chaines | a remontar |
| P8 | `p4` | …personne ne le remarqua | …personne ne le remarque | a remontar |
| P8 | `p9` | …se garde un petit peu | …d un ami ca se garde | a remontar |
| P8 | `p0` | …bien sera ce un commencement | …ou bien je rassure | a remontar |
| P8 | `p6` | …on fabrique le plus ici | …mot qu on fabrique le plus | a remontar |
| P8 | `p5` | …ca aussi il se mefia | …ca aussi il se met fiat | a remontar |
| P8 | `p7` | …appelait son maitre comme ca | …personne n a plus laissons mettre | a remontar |

## dom-quixote · pt (14 de 77 páginas)

| Parte | Página | Esperado (fim) | Ouvido (fim) | Situação |
| :--- | :--- | :--- | :--- | :--- |
| P1 | `p3` | …formosa princesa dulcineia del toboso | …formosa princesa do cineia del toborco | falso alarme (nome próprio; o MP3 termina naturalmente) |
| P1 | `p6` | …conversando alegremente sobre o futuro | …pela estrada conversando alegremente sobre futura | ✅ recuperada |
| P3 | `p3` | …nas palavras na ordem certa | …tocando nas palavras na ordem certo | ✅ recuperada |
| P3 | `p4` | …o folego de tanto rir | …perderam o folego de tanto rio | a remontar |
| P3 | `p6` | …o reino da princesa micomicona | …o reino da princesa mykomi kona | falso alarme (nome próprio; o MP3 termina naturalmente) |
| P4 | `p4` | …vazia levando so as malas | …viajando vazia levando o so rasmalo | ✅ recuperada |
| P5 | `p3` | …tlim tlim | …tling | a remontar |
| P5 | `p4` | …eram os guizos do palhaco | …e nao eram os guisos do | a remontar |
| P5 | `p5` | …aquele nariz nao me alcancar | …que o nariz nao me alcanca | a remontar |
| P5 | `p6` | …como se ele fosse cair | …a mao como se ele fosse | a remontar |
| P5 | `p8` | …porta se abriu devagarinho nheeec | …a porta se abriu devagarinho nieeee | a remontar |
| P6 | `p5` | …uma vitoria custar tao caro | …suspirou nunca vi uma vitoria custar | a remontar |
| P7 | `p3` | …nao esta aqui para ouvir | …o meu amo nao ta aqui | a remontar |
| P7 | `p5` | …mais sabio que muito doutor | …tremida mas sabe o que muito | a remontar |
| P7 | `p6` | …segredo | …c | a remontar |
| P7 | `p9` | …a quem dizer um ditado | …e nao tinha quem dizer onde | a remontar |
| P8 | `p4` | …ninguem reparou nele | …ninguem rep | a remontar |
