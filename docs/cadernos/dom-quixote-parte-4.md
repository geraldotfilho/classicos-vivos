# Caderno — Dom Quixote de La Mancha, Parte 4: O Elmo, a Bacia e a Jaula Encantada

Arquivo: `dom-quixote/parte-4.html` (**publicada em 2026-10-26**; a antiga está em `docs/arquivo/dom-quixote-parte-4-v1/`) · Trecho do original: 1605, caps. 39 a 52 · Nossos capítulos: 23 a 33 (11 capítulos + capa = 12 páginas; o cap. 30 virou dois na fase 5)

| Fase | Situação | Data | Commit/PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 0 Terreno | ✅ feito | 2026-10-25 | branch `gemini/dom-quixote-parte-4` | — |
| 1 Adaptação e texto | 🟡 em andamento | 2026-10-25 | escaleta expandida (10 caps) pronta para aprovação humana | — |
| 2 Interações e visual | 🟡 planejadas | 2026-10-25 | 4 atividades alfabetizadoras + plano visual completo | — |
| 3 Revisão humana 🛑 | ✅ aprovado pelo humano | 2026-10-25 | branch `ccr-0c6dd8bf-k3upnk` → `main` | — |
| 4 Ilustrações e atividades | ✅ feito (Claude, API Batch) | 2026-10-25 | branch `claude/elegant-hawking-hmc85x` → `main` | US$ 0,90 |
| 5 Revisão final 🛑 | ✅ **aprovada** pelo humano (2026-10-26), com os dois últimos ajustes de texto (§5); **texto congelado** | 2026-10-25/26 | branch `claude/clever-pascal-t84t5f` → `main` | US$ 0,38 |
| 6 Narração (pt) + escuta 🛑 | ✅ gravada e **aprovada** pelo humano (`docs/narracao/qa-parte-4.md`) | 2026-10-26 | branch `claude/eloquent-franklin-rq1wgn` → `main` | US$ 0,20 |
| Publicação | ✅ no lugar da antiga; nos outros idiomas, aviso de "ainda só em português" (escolha do humano) | 2026-10-26 | branch `claude/eloquent-franklin-rq1wgn` → `main` | — |
| 7 Idiomas (en, fr, es) | ✅ concluído (en, es, fr validados; 0 erros, 0 avisos) | 2026-10-26 | commit | US$ 0,00 |
| 8 Retrospectiva | ⬜ a fazer | | | — |

---

## 0. Onde a parte anterior termina (leitura obrigatória da fase 1.0)

- **Partes lidas**: Partes 1, 2 e 3 (`dom-quixote/parte-1.html` a `parte-3.html` e exports de `docs/traducao/fonte-dom-quixote-parte-*.json`).
- **Como a Parte 3 termina**:
  - No capítulo 20 (pág. 5), Doroteia se disfarçou de **Princesa Micomicona** para convencer Dom Quixote a voltar com a missão de salvar seu reino invadido pelo gigante Pandafilando da Fosca Vista.
  - No capítulo 21 (pág. 6), de volta à pousada, Dom Quixote dormindo travou a **Batalha dos Odres**, acreditando que os odres de vinho tinto eram o gigante. O padre pagou o estrago ao dono da pousada e Dom Quixote voltou a dormir com a doce convicção de que salvou o reino.
  - No capítulo 22 (pág. 7), reunido com os viajantes ao redor da mesa da pousada, Dom Quixote fez o belo discurso sobre as **Armas e as Letras**: *"A coragem dos cavaleiros protege a paz e defende os mais fracos. E os livros, meus amigos, fazem crescer no coração a justiça, a verdade e a beleza!"*. O capítulo termina com o padre e o barbeiro sorrindo emocionados: *"estava na hora de levar o querido amigo de volta para o aconchego da sua casa!"*.
- **Notas de estilo e continuidade para a Parte 4**:
  - **Ponte imediata (Cap. 23)**: Amanhece na pousada. Doroteia agradece a Dom Quixote pela vitória e se despede; o reino de Micomicão está a salvo! O fio é colhido sem pontas soltas.
  - **O retorno do Elmo de Mambrino (Cap. 24)**: O barbeiro que perdeu a bacia na chuva (Parte 2, cap. 15) volta à pousada exigindo sua bacia de latão. Dom Quixote insiste que é o elmo de Mambrino. Sancho concilia genial e inventa a palavra aportuguesada **bacielmo**! O padre paga o barbeiro e todos comemoram.
  - **A Jaula Encantada e a Profecia (Cap. 25)**: Os amigos montam a jaula de madeira num carro de bois, vestem lençóis e máscaras e recitam uma profecia solene para honrar o cavaleiro em sua viagem.
  - **A Lógica de Sancho e a Saída da Jaula (Cap. 26)**: Pelo caminho, Sancho aplica sua lógica infantil: quem tem fome, sono e sede não pode estar sob encanto! Provado que não há feitiço, os amigos abrem a jaula para um descanso.
  - **O Piquenique no Prado (Cap. 27)**: Sob a sombra de um carvalho, estendem uma toalha e dividem um lanche delicioso.
  - **O Cavaleiro do Lago de Cristal (Cap. 28)**: Durante o descanso, Dom Quixote conta aos amigos uma história fascinante de cavalaria: o cavaleiro que mergulhou num lago encantado e encontrou um palácio submarino de cristal e ouro.
  - **A Cabra Fujona (Cap. 29)**: Um pastor corre atrás de sua cabrinha travessa (Manchadinha) que adora saltar livre pelas colinas; senta-se com os viajantes e divide queijo e leite fresco.
  - **A Romaria na Estrada (Cap. 30)**: Cruzam com uma alegre romaria de camponeses cantando com pandeiros e fitas; todos acenam para o fidalgo na carruagem de madeira.
  - **Chegada à Aldeia e a Família de Sancho (Cap. 31)**: Chegada num domingo alegre. A sobrinha e a governanta acolhem o tio; Teresa Pança e Sanchica correm para ver Sancho e perguntam pela ilha; Sancho reafirma a promessa com orgulho.
  - **Fim do Primeiro Livro (Cap. 32)**: Dom Quixote descansa em seu quarto arrumadinho, olhando a lua e as estrelas de La Mancha, pronto para sonhar com o segundo volume.
- **Proteção da infância**: sem violência, sem humilhação de Maritornes, sem quadrilheiros armados, sem flagelações na romaria. A jaula é uma carinhosa encenação mágica dos amigos para cuidar de Alonso Quixano.

---

## 1. Escaleta (11 capítulos: 23 a 33 + capa; o cap. 30 virou dois na fase 5)

| Pág. | Capítulo | Episódio | Cervantes | O que acontece | Fio da história (Planta / Colhe) | Atividade |
| :---: | :--- | :--- | :---: | :--- | :--- | :---: |
| **0** | — | **Capa** | — | Apresentação da Parte 4: a despedida da princesa, a bacia-elmo, a carruagem mágica e a volta para casa. | Fechamento do 1º volume (1605). | — |
| **1** | 🪞 **Cap. 23** • O Reino Está Salvo! | A despedida da Princesa Micomicona | I-37, 46 | De manhã na pousada, Doroteia agradece: o gigante dos odres foi vencido! Dom Quixote já quer novas batalhas; padre e barbeiro decidem que é hora de levá-lo ao lar. | **Colhe**: o arco de Micomicona e dos odres da Parte 3 (caps. 20–21). | *Página calma* |
| **2** | 👑 **Cap. 24** • Bacia ou Elmo? | A disputa do elmo de Mambrino | I-44–46 | O barbeiro da chuva reaparece e cobra a bacia. Dom Quixote insiste que é o elmo de Mambrino; Sancho inventa a palavra **bacielmo**! O padre paga a bacia e todos riem em paz. | **Colhe**: a bacia ganha na chuva na Parte 2 (cap. 15). | ⭐ **Atividade 1** (`ordem`): Juntar as sílabas `BA • CI • EL • MO`. |
| **3** | 🪄 **Cap. 25** • A Jaula Encantada | A profecia dos magos e o carro de bois | I-46–47 | Amigos vestem lençóis e máscaras e colocam Dom Quixote na jaula num carro de bois, profetizando com vozes solenes a sua grande jornada. | **Planta**: a jaula (ecoada na Parte 5 com a jaula do leão). Reaproveita arte `p1` antiga. | ⭐ **Atividade 2** (`ordem`): Decifrar a profecia dos magos: `A` `GRANDE` `VIAGEM` `DO` `CAVALEIRO`. |
| **4** | 🤔 **Cap. 26** • Encantado Sente Fome? | O teste de Sancho na estrada | I-48–49 | Sancho desconfia do feitiço: *"Quem tem fome e sono não está encantado!"*. Dom Quixote confirma que está faminto. Sancho convence os amigos a abrirem a jaula. | **Colhe**: o raciocínio afetuoso e perspicaz de Sancho. | *Página calma* |
| **5** | 🧺 **Cap. 27** • O Piquenique no Prado | O lanche à sombra do carvalho | I-48–49 | Sob o carvalho, Sancho abre o alforje bagunçado (pão, queijo, moringa, o pião da filha) enquanto uma águia ronda o céu; Dom Quixote reparte o pão. | **Planta**: o pião (presente da Sanchica, colhido no cap. 32). **Ressonância**: os pastores (Parte 2). | ⭐ **Atividade 3** (`pedido`): Sancho mostra a figura do que quer; a criança acha `PÃO`, `QUEIJO`, `ÁGUA` entre as pegadinhas `PIÃO`, `QUEIXO`, `ÁGUIA`. |
| **6** | 🏰 **Cap. 28** • O Cavaleiro do Lago | A história de cavalaria contada por Dom Quixote | I-50 | Dom Quixote conta a história do Cavaleiro do Lago de Cervantes: o lago preto que borbulha, as "cobras e lagartos", a voz das sete fadas presas num encanto; o cavaleiro sente medo, olha com calma e vê que era encanto para assustar; entra, e o lago vira campo de flores, riacho de cristal e castelo de ouro, e as fadas saem livres. Sancho: "Que nem os gigantes que eram moinhos, meu amo?" | O medo protege quando o perigo é real; quando exagera, olhar com calma mostra o que é de verdade. | *Página calma* (a contagem dos tesouros saiu na fase 5). Sem lente: a história fica no balão. |
| **7** | 🐐 **Cap. 29** • A Cabra Fujona | O pastor e a cabrinha travessa | I-50–51 | A cabra Manchadinha invade o piquenique; Sancho e Nicolau trombam; Eugênio conversa com a cabra como se fosse gente (ela responde "Méé!") e Sancho tenta o mesmo com o burrico. "Eu sei bem o que é querer sair de uma jaula." | **Ressonância**: a jaula; "é muito bom ter para onde voltar" prepara a chegada. | *Página calma* (sem lente) |
| **8** | 🎶 **Cap. 30** • A Romaria na Estrada | O que Dom Quixote vê de longe | I-52 | Seca. Lá longe, uma romaria com um andor e uma figura de manto azul; Dom Quixote acha que é uma dama raptada e parte a galope; Rocinante acorda assustado, o padre perde o chapéu, Sancho corre atrás. | Prepara o encontro de perto (cap. 31). | *Página calma* (lentes: romaria × vilões levando uma princesa) |
| **9** | 🙏 **Cap. 31** • Os Vizinhos da Estrada | O encontro de perto | I-52 | Sancho para Rocinante de olhos fechados ("Já parou?"); é uma imagem de santa e são os lavradores vizinhos, rezando pela chuva; Dom Quixote se desculpa, recebe água e flores; "Seu Alonso, já está pertinho de casa!". | **Ponte** para a chegada. | *Página calma* (sem lente) |
| **10** | 🏡 **Cap. 32** • De Volta para Casa | Chegada à aldeia num domingo | I-52 | Sobrinha e governanta abraçam o tio; Teresa e Sanchica passam direto por Sancho e abraçam o burrico ("E eu?"); a ilha que "não cabe no bolso"; as moedas da mala e o pião para a Sanchica. | **Colhe**: a ilha (Parte 1), as moedas da mala (Parte 3), o pião (cap. 27). | ⭐ **Atividade 5** (`ordem`): `SANCHO` `GOVERNADOR` `DA` `ILHA`. |
| **11** | 🌙 **Cap. 33** • Sonhos à Janela | O repouso e o fim do 1º volume | I-52 | Dom Quixote descansa, o gatinho aos pés, "Boa noite, Dulcineia"; as aventuras correm de boca em boca até as cidades grandes, e o bom velhinho já vira um cavaleiro famoso de verdade. | **Fecha o volume de 1605**. Sem teaser do segundo livro no texto (só no quadro do fim). | *Página calma e poética* |
---

## 2. O que ficou de fora e por quê

- **História do Cativo (caps. 39–41)**: Cortada. Romance secundário longo de memórias de guerra.
- **Dom Luís e Clara (cap. 43)**: Cortada. Trama amorosa paralela dispensável para crianças de 6 anos.
- **Pegadinha de Maritornes (cap. 43)**: Cortada por humilhação física (proteção da infância).
- **Quadrilheiros armados da Santa Irmandade (cap. 45)**: Cortados (violência policial sem motivo na trama adaptada).
- **Flagelação religiosa da procissão (cap. 52)**: Substituída por uma romaria campestre festiva e alegre, com canções e flores.

---

## 3. Atividades Alfabetizadoras Planejadas (Crivo do §6.2)

Variedade rica de 5 mecânicas pedagógicas sem repetição:

1. **Atividade 1 (Cap. 24, pág. 2) — Sílabas / Formação de Palavra (`ordem` silábica)**:
   - *Treina*: Consciência silábica.
   - *Mecânica*: A criança toca nas sílabas na ordem para montar a palavra inventada por Sancho: `BA` • `CI` • `EL` • `MO` (**bacielmo**, sem "y"). Ao concluir, a discussão se pacifica e o barbeiro recebe o pagamento.
2. **Atividade 2 (Cap. 25, pág. 3) — Forca Adaptada / Chave de Letras (`letras`)**:
   - *Treina*: Consciência fonêmica (letra e som) e soletração.
   - *Mecânica*: A criança descobre as letras da palavra secreta gravada no fecho da jaula dos magos: `A` `M` `I` `G` `O`. Em vez de boneco enforcado, cada acerto preenche a casinha com brilho sonoro; toques em outras letras tremem suavemente e a voz pronuncia o som da letra com dica gentil. (No rascunho da Fase 1, já jogável via seleção ordenada de letras).
3. **Atividade 3 (Cap. 27, pág. 5) — Pedido com pegadinhas (`pedido`, tipo novo da fase 5)**:
   - *Treina*: leitura de palavras quase iguais (consciência fonêmica): PÃO × PIÃO, QUEIJO × QUEIXO, ÁGUA × ÁGUIA.
   - *Mecânica*: a faixa "🧺 Sancho pede:" mostra a **figura** do que ele quer (pão, depois queijo, depois a moringa); os cartões têm **só a palavra**, sem emoji. Acerto: a comida aparece na toalha e a palavra é lida. Comida certa fora da vez: dica gentil. **Pegadinha**: uma fala engraçada (o pião espalha tudo, a águia leva o lanche, "queixo não se come!") e a brincadeira **recomeça** (pedido do humano). As três pegadinhas estão plantadas no texto (o pião da filha, a águia no céu).
   - 1ª versão (reprovada): `camadas` com PÃO, QUEIJO, ÁGUA: "a criança só precisa clicar nas palavras e já funciona, não há aprendizado nenhum".
4. ~~**Atividade 4 (Cap. 28, pág. 6) — Contagem Poética de Tesouros (`contagem`)**~~ — **removida na fase 5** pelo humano: "não faz o menor sentido, muito bestinha", e a arte mostrava 4 peixes onde a voz contava 3. A página ficou calma; a parte tem 4 atividades (sílabas, letras, pedido, frase).
   - *Treina*: Numeração e leitura ritmada.
   - *Mecânica*: A cada toque, um tesouro do lago de cristal surge na água e a voz narra: 1 (`Uma concha de ouro!`), 2 (`Duas pérolas que brilham!`), 3 (`Três peixinhos de cristal!`), culminando na fanfarra mágica.
5. **Atividade 5 (Cap. 31, pág. 9) — Frase Completa Estruturada (`ordem` frasal)**:
   - *Treina*: Sintaxe e leitura de palavras de alto valor afetivo.
   - *Mecânica*: Sancho estufa o peito e a criança o ajuda a proclamar o título prometido desde a Parte 1: `SANCHO` `GOVERNADOR` `DA` `ILHA`.

---

## 4. Visual de cada página (Lentes Realidade × Imaginação)

| Pág. | Lente da Realidade | Lente da Imaginação (§3.2: transformação profunda) | Legenda Real | Legenda Imag |
| :---: | :--- | :--- | :--- | :--- |
| **0** | A pousada espanhola iluminada pelo sol da manhã | O castelo imperial em dia de festa e vitória | 👓 A Pousada sob a Luz da Manhã | ✨ A Despedida do Castelo Encantado! |
| **1** | Doroteia despedindo-se com um sorriso no pátio da pousada | A Princesa Micomicona na sala do trono dourada entregando um ramo de louros ao cavaleiro | 👓 Doroteia Agradece na Pousada | ✨ A Princesa Coroa o Vencedor de Gigantes! |
| **2** | O barbeiro da bacia, Dom Quixote segurando a bacia de latão e Sancho gesticulando no meio | Dom Quixote com o esplêndido Elmo Dourado de Mambrino emitindo raios mágicos de luz | 👓 Bacia de Latão ou Elmo? | ✨ O Brilho Lendário do Elmo de Mambrino! |
| **3** | Carro de bois rústico com a jaula de madeira; padre e mestre Nicolau de lençóis brancos e máscaras; Rocinante e o burrico amarrados atrás | Uma carruagem mágica de madrepérola e cristal conduzida por magos com mantos celestes | 👓 A Jaula de Madeira no Carro de Bois | ✨ A Carruagem Encantada dos Magos Protetores! |
| **4** | Sancho apontando para o cavaleiro e rindo na estrada ensolarada | Sancho discursando como um sábio filósofo diante de uma corte de amigos | 👓 A Esperteza de Sancho na Estrada | ✨ O Raciocínio de um Grande Sábio! |
| **5** | Toalha xadrez vazia na grama sob o carvalho (pão, queijo e moringa são camadas); Rocinante e o burrico bebendo no riacho | Um banquete real servido em toalhas de seda sob árvores de frutos dourados | 👓 Piquenique de Amigos no Prado | ✨ O Banquete dos Nobres Cavaleiros! |
| **6** | Dom Quixote contando a história sob o carvalho; no balão, o cavaleiro chega ao castelo de ouro e diamantes, as fadas na porta e o riacho de cristal com areia de ouro | — (a história já é imaginação, desenhada no balão) | 📖 A História do Cavaleiro do Lago | — |
| **7** | Dom Quixote ajoelhado dá pão à Manchadinha; Eugênio ri; Sancho e Nicolau caídos; o padre rindo junto ao carvalho | — (página da vida real) | 🐐 O Pastor e a Cabrinha Manchadinha | — |
| **8** | Paisagem seca e larga: Dom Quixote em Rocinante aponta a lança; Sancho coça a cabeça; o padre e Nicolau nos seus cavalos ao lado da carroça; a romaria pequena lá longe, com a figura de manto azul | Cavaleiro dourado no corcel branco; lá longe, vilões cômicos de capa e chapéu levando uma princesa de manto azul num palanquim; castelo no morro | 👓 Uma Romaria Lá Longe na Estrada | ✨ Uma Princesa Levada por Vilões! |
| **9** | De perto: a imagem de Nossa Senhora no andor florido, os lavradores, o velhinho oferecendo água e flores, Dom Quixote de cabeça baixa; o padre e Nicolau chegando a cavalo | — (a página desfaz o engano) | 🙏 Os Vizinhos Pedem Chuva | — |
| **10** | Chegada à aldeia: sobrinha e governanta abraçam Dom Quixote; Teresa e Sanchica abraçam o burrico, e Sancho de braços abertos para o vento | Recepção triunfal com arcos de flores e pétalas; o burrico com manta de festa | 👓 Abraços na Chegada à Aldeia | ✨ A Recepção Triunfal dos Grandes Heróis! |
| **11** | Dom Quixote descansando na cama, a lua cheia na janela, o gatinho aos pés | O cavaleiro dourado cavalgando entre as estrelas; o gatinho vira o **leão guardião** | 👓 Descanso Sereno à Luz da Lua | ✨ Os Sonhos Eternos de Novas Aventuras! |
---

## 5. Notas do humano e o que mudou

- **2026-10-25 (Revisão da Fase 1/2)**: Humano revisou o rascunho e definiu:
  1. **Comando de Atividades em Quadro Separado (Regra Mandatória para todas as produções)**:
     - O texto da narrativa não deve conter instruções de atividade.
     - O comando fica num campo `comandoAtividade` e é renderizado em um `<aside class="quadro-atividade">` separado, com destaque visual e leitura opcional.
     - Botão de alto-falante exclusivo (🔊) que só fala quando clicado (`falar(comando)`). A narração automática ("Ouvir Página") nunca lê esse quadro.
  2. **Aportuguesamento**: **bacielmo** (com "i", sem "y").
  3. **Ampliação para 10 Capítulos (11 páginas com a capa)**: Para dar respiro à viagem de volta e fechar com dignidade o volume de 1605.
  4. **Diversificação de Atividades**: 5 atividades distintas sem repetição (sílabas, forca adaptada/chave de letras, vocabulário em camadas, contagem poética e frase estruturada).
  5. **Cap. 25 (A Jaula)**: Palavra secreta `AMIGO` explicada na fala dos magos como o segredo da amizade que sela a carruagem.
  6. **Cap. 26 (Lógica e Segurança)**:
     - Sancho tem pena do amo e percebe a farsa dos magos (voz do barbeiro e cheiro do padre).
     - Dom Quixote é solto porque dá a sua solene **palavra de honra de cavaleiro** de que não fugirá e seguirá em paz até a aldeia (fidelidade a Cervantes I, cap. 49).
  7. **Cap. 27 (Piquenique)**: Associação e desafio de ligar a palavra escrita ao alimento correto.
  8. **Cap. 28 (O Cavaleiro do Lago)**: Aprofundada a lenda poética de cavalaria contada por Dom Quixote (o mergulho no lago fervente, o palácio submarino de cristal e a coragem que vence o medo).
  9. **Cap. 29 (A Cabra Fujona)**: Desenvolvido o humor slapstick (cabeçada no bacielmo, tombo de Sancho na grama) e a ternura da conversa do pastor Eugenio com a cabrinha livre.
  10. **Cap. 30 (A Romaria)**: Construído o drama da estiagem, a tensão de Dom Quixote com a lança, Sancho esclarecendo a cantiga de chuva e a celebração alegre com a chuva fresca e as crianças.
  11. **Cap. 31 (Teresa e Sancho)**: Resgate fiel de Cervantes (I, cap. 52): o alívio pelo burrico ("veio melhor que o dono!"), a cobrança bem-humorada dos vestidos e da ilha prometida na Parte 1, e Sancho reafirmando com orgulho sua honra de escudeiro.
  12. **Cap. 32 (O Fim do Volume 1)**: Fechamento clássico e emocionante de Cervantes: o repouso sereno do fidalgo em seu quarto arrumadinho, a palavra de honra cumprida, a lua cheia e as histórias que começam a nascer nos livros do mundo.

- **2026-10-25 (Refinamentos Literários e Pedagógicos)**: Humano orientou:
  1. **Cap. 25 (Exploração sem Spoilers)**: Não dar a resposta pronta da palavra mágica `AMIGO` na instrução nem na faixa vazia; deixar a criança explorar e descobrir sozinha o segredo de 5 letras.
  2. **Cap. 25 & 26 (Ponto de Vista de Sancho)**: A explicação de que Sancho não participou da farsa dos lençóis foi antecipada para o Cap. 25, quando o plano é montado em segredo, tornando a abordagem no Cap. 26 fluida e natural.
  3. **Cap. 28 (História do Lago de Cristal)**:
     - Referência corrigida para "velhos livros de cavalaria que ele tanto amava ler" (pois ainda não existia livro sobre Dom Quixote publicado na história).
     - Remoção de asteriscos na narração.
     - Motivação do cavaleiro clarified: mergulhar para salvar uma luz dourada pedindo socorro no fundo das águas (a coragem de ajudar quem precisa).
     - Adequação à infância: substituição das donzelas por criaturas marinhas encantadas, conchas e peixinhos prateados.
  4. **Cap. 30 (Fidelidade a Cervantes e Realismo vs Imaginação)**:
     - Eliminação da chuva mágica instantânea (que soava artificial e quebrava o contraste realista de Cervantes).
     - Retomada do episódio canônico de Cervantes (I, cap. 52): procissão real de preces contra a seca; Sancho intervém com amor para evitar o ataque; Dom Quixote reconhece os lavradores vizinhos e se curva com profunda humildade diante da labuta do campo, sendo acolhido com água e flores.

- **2026-10-25 (Revisão de coautoria, Claude)**: o humano pediu um olhar de coautor sobre enredo, estilo, humor e poesia, e aprovou as sugestões, **menos a de encurtar as páginas** (o enredo está bom e o tamanho fica; o cap. 30 também não foi cortado). O que mudou:
  1. **Dois barbeiros**: o amigo da aldeia passou a ser sempre **mestre Nicolau** (como na Parte 3); o outro é **o barbeiro da bacia**.
  2. **Rocinante de volta à história**: amarrado atrás da carroça (cap. 25); depois da palavra de honra, Dom Quixote segue **montado nele** e a jaula viaja vazia, só com as malas (cap. 26); pastando com o burrico (27); na romaria (30); na chegada (31); no estábulo (32).
  3. **Linguagem (§3.5) sem encurtar**: saíram empertigando, disparate, farsa, receio, valoroso, dádiva, ressequida, murmúrio, repique, entoando, comitiva, labuta, apeando, "hão de", "o fizera", farto, salpicado, caiadas, aos prantos; "andor" ficou, explicado no texto. Saíram as falas que quebravam a ficção ("lá na Parte 2", "na Parte 1") e as repetições ("solene" ×3, as pistas de Sancho dobradas nos caps. 25 e 26).
  4. **Cap. 23**: Doroteia continua no papel de princesa (dito no texto); piscadela de Sancho: o gigante "deixou a pousada inteira cheirando a vinho".
  5. **Cap. 24**: o barbeiro reclama a **bacia** (não o "cavalo"); a **votação da pousada** de Cervantes (I-45), puxada por mestre Nicolau: "Então eu passei a vida inteira fazendo barba com o elmo de um rei?"; o padre paga "umas moedinhas" (não oito de ouro) e o bacielmo fica com o cavaleiro.
  6. **Cap. 25**: profecia **em versos** (valente/frente/contente, terra/guerra), que já planta a terceira saída do segundo volume; a palavra secreta **abre a porta** da carruagem (antes, ambíguo entre abrir e trancar).
  7. **Cap. 26**: as pistas de Sancho ficam só aqui; o teste de Cervantes (I-48–49) inteiro, com o "xixi atrás da moita" (humor leve, fiel ao original; o humano pode vetar); a resposta de Dom Quixote: "Os encantamentos de hoje são modernos: agora os encantados comem!"; o padre abre a jaula sussurrando **AMIGO**, a palavra da atividade do cap. 25, "a mais verdadeira de todo aquele teatro" (fio plantado e colhido na mesma parte). A palavra-chave VENTO, que não cabia, virou HONRA.
  8. **Cap. 27**: quadro da atividade corrigido ("toque", não "conecte") e com Sancho como quem a criança ajuda; Dom Quixote reparte o pão e lembra os pastores da Parte 2 (cap. 10).
  9. **Cap. 28**: a luzinha dourada que pedia socorro ganhou explicação (uma **estrelinha-do-mar** presa nas algas, que depois ilumina o palácio); falas da contagem casadas com o texto (peixinhos **prateados**); fecho com Sancho: "E lá no palácio... serviam almoço?".
  10. **Cap. 29**: o pastor **Eugênio** apresentado logo que entra; Dom Quixote liga a cabra à jaula: "Eu sei bem o que é querer sair de uma jaula".
  11. **Cap. 30**: a "dama cativa" agora é o que Dom Quixote vê de verdade (a figura coberta no andor), e não "vilões de branco"; o lavrador o chama de **"Seu Alonso"** e avisa que a casa está perto (ponte para o cap. 31).
  12. **Cap. 31**: sobrinha e governanta apresentadas; Teresa não sabe o que é ilha ("Ilha se come?"), e Sancho explica (Cervantes, I-52); **as moedas da mala da Parte 3 (cap. 16)** voltam como presente do amo para os sapatinhos da Sanchica (fio solto colhido).
  13. **Cap. 32**: saiu "os primeiros livros começavam a ser impressos" (estragava a surpresa do "Viramos livro!" da Parte 5); no lugar, "alguém molhava a pena na tinta e começava a escrever...". Entraram o **gatinho** da Parte 1 aos pés da cama, o Rocinante no estábulo e o "Boa noite, Dulcineia" à lua; o fim troca o resumo moral por uma imagem e um gancho ("um cavaleiro andante descansa, sim. Mas nunca, nunca para de sonhar"). A mensagem do fim avisa que ele vai sair de novo no segundo livro.

- **2026-10-25 (Parada 3)**: o humano aprovou o rascunho sem novas notas de texto e autorizou a API paga para as imagens da fase 4.

- **2026-10-25 (Fase 5, 1ª leitura do livro ilustrado com o filho)**: "a leitura começou muito bem, prendendo atenção e com bom nível cômico", mas a qualidade literária caía a partir do meio do livro e ficava cansativa. Notas e o que mudou (Claude, com a API autorizada para as imagens):
  1. **Qualidade da segunda metade**: os caps. 27 a 33 foram reescritos com o cuidado dos primeiros: parágrafos curtos, uma piada por cena (a barriga que "conversa", o "Já parou? Já posso abrir?", a cabra que responde, "Ninguém abraça o escudeiro?"), menos explicação e menos lição de moral, e fios plantados e colhidos dentro da parte (o pião da Sanchica, a águia, "é bom ter para onde voltar").
  2. **Gravura do cap. 26** (pág. 4): os "magos" vinham com outra fantasia, e mestre Nicolau montava o cavalo de Dom Quixote enquanto o padre andava. Refeita como **edição** da versão anterior, com o **recorte dos dois magos da pág. 3** como referência ("EXACTLY as in the second reference image (copy them)"): agora cada um tem o seu cavalo (o padre num tordilho, Nicolau num preto) e Rocinante vem amarrado na carroça, de sela vazia. A Imaginação também (os magos celestes recortados da p3-imag). O método foi para a receita (`ARTE-PELA-API.md` §4.3, receita geral §6.3).
  3. **Atividade do cap. 27**: virou o tipo novo `pedido` (§3, atividade 3), com pegadinhas que recomeçam o jogo. E a **regra nova para todas as páginas com atividade, em todos os livros**: a chave da Imaginação fica trancada (🔒) até a criança acertar; é a recompensa (motor, `AGENTS.md` §2.5).
  4. **Cap. 28**: a história é a de Cervantes (I-50, o Cavaleiro do Lago: o lago de piche fervente com cobras e lagartos, a voz que desafia, o mergulho, o campo de flores, o castelo de ouro e as fadas), sem as explicações "reais" (a estrelinha-do-mar). A página **não tem mais lente**: é tudo imaginação, desenhada dentro do balão. Ilustração refeita (só o miolo do balão).
  5. **Cap. 29**: texto melhorado (a cabra que responde, Sancho e o burrico, o padre rindo); o **padre voltou** à ilustração (edição que só o acrescenta); **sem lente**.
  6. **Cap. 30**: era o mais longo (6 parágrafos). Virou **dois capítulos**: o 30 (a romaria vista **de longe**, com ilustração nova e as duas lentes: Dom Quixote vê vilões levando uma princesa) e o 31 (o encontro de perto, sem lente, com a ilustração antiga do cap. 30 e a **santa refeita** como imagem de Nossa Senhora com rosto, coroa e manto, em vez do "manequim coberto"), com mais alívio cômico. A estrutura passou a 12 páginas (caps. 23 a 33); a noite foi para a pág. 11 (`p11-*`).
  7. **Cap. 32** (antigo 31): Sancho não chama mais a esposa de "mulher": "minha Teresinha", "meu bem", "minhas queridas". Ilustração nova: a família de Dom Quixote o abraça e a de Sancho **abraça o burrico** (Cervantes, I-52: a primeira pergunta de Teresa foi pelo burro).
  8b. **Contagem do cap. 28 removida** (nota posterior do humano, mesma noite): "não faz o menor sentido, muito bestinha", e a camada dos peixinhos tinha 4 peixes para a fala "três peixinhos". Saíram o cartão, o quadro da atividade e as 3 camadas (concha, pérolas, peixinhos); o riacho do texto agora tem "pedrinhas brancas que pareciam pérolas", como em Cervantes.
  9. **2026-10-26 (aprovação da fase 5)**: dois ajustes, e o humano deu a fase como aprovada confiando na edição:
     - **Cap. 28, a lição do medo**: o cavaleiro não pula mais "de cabeça" atrás de maravilhas (e saiu o banquete). Ele vai porque **sete fadas presas num encanto pedem ajuda**; sente medo, **não pula de olhos fechados**: olha com calma e vê que as cobras eram raízes, os lagartos eram sombras e a fervura era uma fonte morninha, um encanto para assustar. A moral de Dom Quixote: o medo é um amigo que protege e deve ser escutado quando o perigo é real; quando exagera, inventa monstros, e quem para e olha com calma descobre o que é de verdade. E a piada de Sancho: "Que nem os gigantes que eram moinhos, meu amo?".
     - **Cap. 32, a ilha**: saiu o "Ilha se come?" e a explicação do que é ilha (a palavra é banal, e as crianças sabem o que é). Agora Teresa pergunta "Trouxe no bolso?", e Sancho: "Ilha não cabe no bolso, minha Teresinha! Mas ela ainda vai chegar, você vai ver!".
  8. **Cap. 33** (o fim): saiu do texto qualquer teaser do segundo livro (fica só no quadro do fim) e saiu o "alguém molhava a pena"; no lugar, as aventuras correm **de boca em boca** até as cidades grandes, e "o nosso bom velhinho, cheio de imaginação, já começava a ser um cavaleiro famoso de verdade".

---

## 6. Arte (lista, rodadas, refeitas, gasto)

Lista: `tools/arte/dom-quixote-parte-4.mjs` (a da Parte 4 antiga ficou em `dom-quixote-parte-4-v1.mjs`). Nano Banana 2, Batch, cada lote voltou em ~3 minutos.

| Rodada | Pedidos | Aceitas | Gasto |
| :--- | :--- | :--- | :--- |
| 1: Realidades (p0, p1, p2, p3, p4, p5, p7, p8, p10) + camadas (pão, queijo, água, concha, pérolas, peixinhos) | 15 | 14 | US$ 0,45 |
| 2: p3-real refeita, p6-real (usa a p5-real como cenário) e 8 Imaginações | 10 | 9 | US$ 0,35 |
| 3: p0-imag refeita, p3-imag e p6-imag | 3 | 3 | US$ 0,10 |
| **Total da fase 4** | **28** | **26** (+2 refeitas) | **US$ 0,90** |
| 4 (fase 5): p4-real, p6-real, p7-real, p8-real (nova), p9-real (antiga p8 com a santa), p10-real (nova) | 6 | 6 | US$ 0,21 |
| 5 (fase 5): p4-imag, p8-imag, p10-imag | 3 | 1 | US$ 0,10 |
| 6 (fase 5): p8-imag e p10-imag refeitas | 2 | 2 | US$ 0,07 |
| **Total da fase 5** | **11** | **9** | **US$ 0,38** |

- **Reaproveitada da Parte 4 antiga**: a chegada à aldeia (cap. 31, pág. 9) usa `imagens/acervo/parte-4-v1/p2-real` e `p2-imag` por caminho, sem cópia. A jaula da v1 (`p1-*`) não casava com o texto novo (os amigos fantasiados, Sancho cochichando nas grades): as páginas 3 e 4 foram geradas de novo, com a v1 como referência (a carruagem de cristal da pág. 4 continua a da v1).
- **Refeitas**: (1) a **p3-real** veio com os "magos" de lençol branco e **capuz branco pontudo com furos nos olhos**, uma imagem que lembra o capuz da Ku Klux Klan: inaceitável. Refeita com lençol só dos ombros para baixo, **chapéu de mago de papelão com estrelas** e meia-máscara de papelão; (2) a **p0-imag** repetia a princesa (na porta e na sacada) e a jaula não virava carruagem.
- **Aceitas com ressalva**: na p2-real, Dom Quixote segura a mão de Sancho em vez de puxar a bacia (o momento em que Sancho pula no meio, serve); na p4-imag, o padre e mestre Nicolau aparecem a cavalo (como na v1); a p6-imag é a história inteira dentro de um balão, com os cantos claros, como uma vinheta.
- **Atividades**: pão, queijo e moringa são camadas sobre a toalha vazia (pág. 5); a concha, as duas pérolas e os três peixinhos aparecem no chão de areia do **balão da história** pintado na p6-real (pág. 6, `contagem`), e a Imaginação mostra o palácio inteiro. As áreas de toque de todas as páginas foram medidas na arte; na pág. 10 o gatinho (Realidade) e o leão (Imaginação) têm cada um a sua.
- **Testes**: Playwright (Chromium), 800 × 1280 e 1280 × 800, as 11 páginas nas duas lentes, sem erro de script nem arquivo faltando; piquenique e contagem jogados até o fim.
- **Fase 5 (revisão)**: refeitas na rodada 6 a p8-imag (o Sancho saiu duas vezes e a romaria veio para perto: corrigido com "only ONE Sancho" e a altura máxima das figuras de longe) e a p10-imag (a Imaginação antiga da chegada, passada como referência, impôs a composição dela e a piada do burrico sumiu: tirada a referência e descrita a piada no começo do prompt). Aceitas com ressalva: na p8-real, Rocinante saiu com manchas; na p9-real, os cavalos do padre e de Nicolau, pequenos ao fundo, saíram marrons. Testado de novo no Playwright (12 páginas, duas orientações, piquenique com pegadinha e recomeço, trava da lente, contagem, Parte 1 com o VENTO e `?imag=1`), sem erros.
- **Arte aposentada** (no histórico do Git): p6-imag, p7-imag e a p8-imag antiga (guardiões da terra); a p10 da noite virou p11.

---

## 7. Narração (elenco, QA, gasto)

- **2026-10-26 (fase 6, Claude, API autorizada pelo humano)**: 12 páginas inteiras (220 frases, ~24 min) e 34 palavras-chave novas, Flex, conferidas no Whisper local. **US$ 0,20** (63 pedidos). QA e o que ouvir: [`docs/narracao/qa-parte-4.md`](../narracao/qa-parte-4.md).
- **Pasta própria** durante a produção: `narracao/parte-4-rascunho/` (`pastaAudio`), para não sobrescrever a da Parte 4 antiga. **Publicação (2026-10-26)**: escuta aprovada pelo humano; a pasta virou `narracao/parte-4/`, o rascunho virou `parte-4.html` (sem `rascunho` e `pastaAudio`); a Parte 4 antiga (HTML, traduções, roteiro e QA da narração) foi para `docs/arquivo/dom-quixote-parte-4-v1/` (os MP3 antigos e a arte de `imagens/acervo/` ficam no histórico do Git e no acervo, fora do service worker). A estante, o `sobre.html` (4 idiomas) e o fim da Parte 3 ("Na Parte 4: …", com as traduções) foram atualizados.
- **Roteiro**: `dom-quixote/audio/narracao/parte-4-rascunho/roteiro.json` (119 frases com fala de personagem). Toda a história do Cavaleiro do Lago (cap. 28) é contada na voz de Dom Quixote; o "méééé" da cabra é da narradora.
- **Elenco novo**: mestre Nicolau `storyteller-4` (e `NICOLAU_MAGO`, a mesma voz fantasiada), barbeiro da bacia `techagent-4` (a voz da Parte 2), Eugênio `storyteller-6`, velhinho da romaria `tutor-8`, sobrinha `podcaster-4`, povo `csagent-8`.
- **Lições**: (1) esta parte tem 3× o texto da antiga (220 frases, ~50 blocos): a cota de 100 pedidos por dia acabou no meio (a produção da véspera já tinha usado parte dela), e o cache de blocos salvou o que foi pago; numa parte grande, conte os blocos no `--seco` e veja se cabem na cota do dia. (2) Num bloco longo (13 frases), a voz pulou frases na 1ª tentativa; a conferência local pegou e a 2ª veio certa. (3) Palavras curtas (fome, sede, lanche) se cortam mal em grupo: grave uma por pedido (`--agrupar 1`).

