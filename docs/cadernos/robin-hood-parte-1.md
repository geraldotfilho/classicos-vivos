# Caderno — Robin Hood, Parte 1: O Bando do Grande Carvalho

Arquivo: `robin-hood/parte-1.html` (`rascunho: true`) · Trecho de referência: Howard Pyle (1883), caps. 1 e 3 + Grande Carvalho + Lady Mariana · Nossos capítulos: 1–9 (capa + 9 páginas)
Plano: [`../PLANO-ROBIN-HOOD.md`](../PLANO-ROBIN-HOOD.md) · Receita: [`../receitas/ROBIN-HOOD.md`](../receitas/ROBIN-HOOD.md) · Diretrizes: [`../DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) · Pesquisa: [`../pesquisa/ROBIN-HOOD.md`](../pesquisa/ROBIN-HOOD.md)

| Fase | Situação | Data | Commit/PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 0 Mapa da Obra (plano, pesquisa, receita) | ✅ aprovado pelo humano | 2026-11-21 | `ef3117d` + reengenharia | — |
| 1 Adaptação e texto v2 (Jornada do Herói, 11 caps., Hydrogen + Opus 5.5) | ✅ concluído (Capa + 11 caps.) | 2026-11-22 | `09b22f8` | US$ 0,00 |
| 2 Interações e visual v2 (Opção C — Diorama de Papel + Método Híbrido) | ✅ concluído | 2026-11-22 | `f5afd97` | US$ 0,00 |
| 3 Revisão humana 🛑 | ✅ **Capa + Caps. 1–7 revisados com o humano; Caps. 8–11 prontos** | 2026-11-22 | Issues #69 a #74 endereçadas na nova arquitetura | — |
| 4 Ilustrações e atividades v2 (Opção C — Diorama de Papel Recortado) | ✅ **22/22 gravuras + 2 camadas animadas WebP prontas** (100% no gerador nativo) | 2026-11-22 | `main` | US$ 0,00 |
| 5 Revisão final 🛑 | 🟡 **pronto para leitura em família** | 2026-11-22 | | — |
| 6 Narração (pt) + escuta 🛑 | ⬜ | | | US$ |
| Publicação | ⬜ | | | — |
| 7 Idiomas (en, fr, es) | ⬜ | | | US$ |
| 8 Retrospectiva | ⬜ | | | — |

---

## 0.1. Reformulação Estrutural e Artística (2026-11-21 — Revisão Global do Autor + Issues #69 a #74)

Após leitura em família da v1 do rascunho ilustrado, o humano determinou uma **reengenharia completa da Parte 1**:
1. **Estrutura pela Jornada do Herói (Joseph Campbell)** e **Caminho 1** para a Parte 1 (Capa + 9 capítulos focados na *Origem do Bando Verde e o Resgate do Moleiro*, movendo o *Torneio da Flecha de Ouro* para abrir a Parte 2; número total de partes da série aberto para crescer, ex.: 6 partes).
2. **Lugares aportuguesados**: **Vila do Moinho** (aldeia inicial), **Nortigão** (*Nottingham*) e **Floresta de Xervedo** (*Sherwood*).
3. **Correções de enredo e continuidade das Issues #69 a #74**:
   - **Mundo Comum e explicação do moleiro (#70)**: Cap. 1 apresenta a Vila do Moinho, explica com clareza o ofício do **moleiro** (**Mestre Tomé**, homem negro) e seu filho **Grilo** (menino pardo, **#69**), e mostra Robin Hood ainda em **roupas comuns de aldeão (sem roupa verde!)**.
   - **Escalada do conflito com o Xerife (#69)**: Cap. 2 dedicado à argumentação de Mestre Tomé e ao desafio lógico de Robin diante do povo, fazendo o Xerife de Nortigão se irritar gradualmente antes de apelar para a acusação sem provas e a prisão.
   - **Coerência geográfica e visual das roupas verdes (#71, #72)**: Cap. 3 ocorre na **borda da Floresta de Xervedo**, onde **Lady Mariana** atua como **Mentora** e entrega as roupas verdes e a corneta (**Atividade 1**: vestir o traje verde). Só depois disso (já de verde!) Robin e Grilo cruzam a **Ponte do Riacho Fundo** (Cap. 4, *Travessia do Limiar*), encontram **João Pequeno** (Cap. 5, **Atividade 2**: **4 gravuras progressivas reais** para `PONTE` → `TOMBO` → `RISADA` → `AMIGO`, **#73**) e chegam juntos ao **Grande Carvalho** (Cap. 6).
   - **Tensão moral ("Ladrões" × "Devolver o que foi tomado")**: em vez de o Xerife "proibir a cor verde", no Cap. 8 (após o resgate silencioso do Cap. 7, **Atividade 3** com mudança real de gravura, **#74**) o Xerife tenta rotular o bando de *"ladrões"*, e Robin rebate diante da vila que apenas devolveram o pão tomado injustamente. No Cap. 9, a festa sob o Grande Carvalho termina com a notícia de que o Xerife espalhou cartazes de "ladrões" e criou a armadilha do **Torneio da Flecha de Ouro** (gancho para a Parte 2).
4. **📌 Direção de Arte — Migração para a Opção C (Diorama de Papel Recortado) [CONVERSAR ANTES DE GERAR AS GRAVURAS]**:
   - O Estilo A (Gouache) ficou parecido demais com *Dom Quixote*. Adotada a **Opção C — Diorama de Papel Recortado** (planos com textura tátil de papel artesanal e sombras de profundidade).
   - **Método a desenhar com o humano após aprovar o texto**: geração prévia de **cenários-base reaproveitáveis** em diorama de papel + **colagem posterior dos personagens e adereços em camadas independentes**, permitindo animações e etapas progressivas reais.
5. **Método de redação do texto**: 1 capítulo por vez no chat, com o agente principal atuando como **Diretor** e lançando subagentes escritores no modelo **Hydrogen (`flash`)**, revisando antes de apresentar ao humano.
Primeira parte de *Robin Hood* (5 partes previstas). Estabelece:
- **Imposto desigual**: cobrar "igual" (2 sacos de farinha) zera o moleiro e não faz diferença para o barão de carroça lotada;
- **Injustiça sem prova**: o moleiro (pai de Grilo) é acusado sem provas e vai preso mesmo oferecendo busca;
- **Identidade do bando**: **Robin Hood**, **Lady Mariana** (jovem negra, ágil e estratégica), **Grilo** (*Much* em inglês) e **João Pequeno** adotam as **roupas verde-floresta**, o Grande Carvalho e a corneta de 3 toques;
- **Conflito prévio antes do torneio**: o bando age primeiro (solta o pai de Grilo e devolve só a farinha das famílias pobres), fazendo o Xerife jurar caçar "esse bando de roupa verde" com a armadilha da Flecha de Ouro.

## 1. Nova Escaleta em 11 Capítulos (Capa + 11 Capítulos — Jornada do Herói)

| Pág. | Cap. | Etapa de Campbell | Título | Situação do Texto (Hydrogen + Opus 5.5) |
| :--- | :--- | :--- | :--- | :--- |
| 0 | — | — | **Capa — Parte 1: O Segredo da Floresta de Xervedo** | ✅ Aprovado e aplicado em `parte-1.html` |
| 1 | 1 | 1. Mundo do Poder Alienado | **👑 Capítulo 1 • O Banquete do Rei Distante** (*Muito Pão para Uma Mesa Só*) | ✅ Aprovado e aplicado em `parte-1.html` |
| 2 | 2 | 1. Mundo Comum & 2. Chamado | **🌾 Capítulo 2 • O Moinho de Mestre Tomé** (*Três Sacos e uma Conta que Não Fecha*) | ✅ Aprovado e aplicado em `parte-1.html` |
| 3 | 3 | 3. Argumentação & Escalada | **⚖️ Capítulo 3 • Quem Desafia o Xerife?** (*Uma Mentira sem Prova Nenhuma*) | ✅ Aprovado e aplicado em `parte-1.html` |
| 4 | 4 | 4. Encontro com a Mentora e Talismãs | **🍃 Capítulo 4 • A Mentora da Mata** (*Como Sumir no Meio das Folhas* · **Atividade 1**) | ✅ Aprovado (sem rótulo racial assimétrico) e aplicado em `parte-1.html` |
| 5 | 5 | 5. Travessia do Limiar | **🪵 Capítulo 5 • A Ponte do Riacho Fundo** (*Pressa de um Lado, Teimosia do Outro*) | ✅ Aprovado e aplicado em `parte-1.html` |
| 6 | 6 | 6. O Teste na Ponte | **😂 Capítulo 6 • O Banho de Risadas** (*Quem Caiu no Riacho?* · **Atividade 2: 4 gravuras progressivas**) | ✅ Aprovado e aplicado em `parte-1.html` |
| 7 | 7 | 6. O Novo Aliado e Sua Dor | **🤝 Capítulo 7 • O Gigante Chamado Pequeno** (*Um Apelido ao Contrário*) | ✅ Aprovado e aplicado em `parte-1.html` |
| 8 | 8 | 7. O Esconderijo e o Plano | **🌳 Capítulo 8 • O Segredo do Grande Carvalho** (*Um Plano Debaixo das Folhas*) | ✅ Concluído (Hydrogen + Opus 5.5) e aplicado em `parte-1.html` |
| 9 | 9 | 8. A Provação (Resgate Silencioso) | **🗝️ Capítulo 9 • A Janela Alta e a Chave** (*Silêncio na Cadeia* · **Atividade 3**) | ✅ Concluído (Hydrogen + Opus 5.5) e aplicado em `parte-1.html` |
| 10 | 10 | 8. Confronto Moral com o Xerife | **🏹 Capítulo 10 • Ladrões ou Justiceiros?** (*Devolver Não É Roubar!*) | ✅ Concluído (Hydrogen + Opus 5.5) e aplicado em `parte-1.html` |
| 11 | 11 | 9. A Recompensa e Gancho para P2 | **🍞 Capítulo 11 • Pão Quentinho e uma Nova Armadilha** (*Ouro que Esconde o Perigo*) | ✅ Concluído (Hydrogen + Opus 5.5) e aplicado em `parte-1.html` |

## 2. O que ficou de fora nesta parte e por quê
- **A morte do guarda florestal** (Pyle cap. 1): cortada por proteção da infância; substituída pelo imposto desigual e prisão injusta do moleiro sem provas.
- **O funileiro (*Tinker*, Pyle cap. 2)**: deixado de fora na Parte 1 para dar espaço ao conflito prévio do Bando Verde com o Xerife (cap. 5) e construir bem os personagens antes do torneio.

## 3. Atividades (crivo da receita geral §6.2)

| # | Pág. | O que a criança faz | Nasce da história? Ajuda quem? | Treina | Tipo | Como a cena muda | Por que só acerta lendo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 4 | Ordena a sequência do que aconteceu no riacho: `PONTE` · `TOMBO` · `RISADA` · `AMIGO` | Grilo quer contar a Lady Mariana, na ordem certa, como conheceu João Pequeno | compreensão da sequência e leitura de palavras | `ordem` + `camadas` | a faixa escreve a sequência e cada acerto revela um elemento (`camadas`) na cena | todos os 4 cartões têm o mesmo emoji `💧` |
| 2 | 7 | Vê o pedido do disfarce de Robin (sem verde!) e acha a palavra certa: `CAPUZ` (× `CAPIM`), `MANTO` (× `MATO` / `BARCO` → 5 cartões: `CAPUZ`, `CAPIM`, `MANTO`, `BARCO`, `ARCO`) | Ajudar Robin a montar o disfarce antes de o capitão da guarda chegar | leitura atenta de palavras parecidas | `pedido` + `camadas` | cada acerto coloca um item do disfarce na cena (`c-capuz`, `c-manto`, `c-arco`); pegadinhas bagunçam e recomeçam | cartões da bandeja sem emoji (motor esconde em `pedido`); pegadinhas quase iguais (`CAPIM` × `CAPUZ`) |
| 3 | 9 | Separa o que a flecha de ouro vai comprar para as famílias: `TRIGO` (× `TREVO`), `LEITE` (× `LEQUE`), `MANTA` | Ajudar o bando a montar as cestas da partilha com o prêmio do torneio | leitura atenta com pegadinhas sonoras/visuais | `pedido` + `camadas` | cada acerto coloca o mantimento na mesa da festa (`c-trigo`, `c-leite`, `c-manta`) | cartões sem emoji; 5 itens na bandeja (`TRIGO`, `TREVO`, `LEITE`, `LEQUE`, `MANTA`) |

- Páginas calmas entre as atividades: 1, 2, 3, 5, 6, 8 (nenhuma atividade em páginas seguidas).

## 4. Visual de cada página (Estilo A — Gouache estilizado · Cena única + camadas)

| Pág. | Arquivo | Descrição da cena (Gouache estilizado, sem texto legível na arte) | Camadas / observações |
| :--- | :--- | :--- | :--- |
| 0 | `p0-real` | Clareira do Grande Carvalho em Sherwood iluminada por raios de sol dourados: Robin Hood (túnica verde-musgo, chapéu com pena vermelha), Lady Mariana (jovem negra de cabelo trançado, capa verde-esmeralda), João Pequeno (gigante gentil de bastão) e Grilo (menino baixinho de avental enfarinhado) | capa |
| 1 | `p1-real` | Estrada da feira perto do moinho: o Xerife de capa púrpura e cara azeda cobra dois sacos de farinha; carroça enorme do barão ao lado com dezenas de sacos; o moleiro triste com apenas três sacos e Grilo segurando o braço do pai; Robin ao fundo escondido atrás de um arbusto | — |
| 2 | `p2-real` | Sob os galhos imensos do Grande Carvalho oco: Robin, Mariana e Grilo experimentam camisas compridas verde-folha e observam a corneta de caça dourada | — |
| 3 | `p3-real` | Riacho transparente cortado por uma ponte estreita de tronco caído: Robin segurando um galho e um desconhecido altíssimo apoiado num bastão longo frente a frente; Grilo espiando de trás de uma samambaia | — |
| 4 | `p4-real` | Robin sentado dentro da água rasa do riacho rindo muito com água espirrando, enquanto o gigante na ponte estende a mão sorrindo; Grilo espiando alegre da margem | 4 camadas (`c-ponte`, `c-tombo`, `c-risada`, `c-amigo`) |
| 5 | `p5-real` | Portão da pequena cadeia ao entardecer: o pai de Grilo saindo feliz com sacos de farinha devolvidos enquanto quatro vultos de roupa verde somem entre as árvores e o Xerife aponta furioso com os guardas | — |
| 6 | `p6-real` | Praça de Nottingham com bandeiras festivas e um alvo de palha com flecha dourada no alto; Lady Mariana, de vestido simples de feira, observa os guardas apontando para um pano verde na parede | — |
| 7 | `p7-real` | Fundos das barracas do torneio em Nottingham: Robin espera ao lado de Mariana (lenço azul), João Pequeno (carvão no rosto) e Grilo (cesta de pães) enquanto guardas patrulham ao longe | 3 camadas (`c-capuz`, `c-manto`, `c-arco`) |
| 8 | `p8-real` | Alvo de palha em destaque com uma flecha partida exatamente ao meio por outra; Robin puxando o capuz vermelho enquanto fitas vermelhas e nuvem branca de farinha voam ao redor dos guardas confusos | — |
| 9 | `p9-real` | Mesa comprida de madeira sob o Grande Carvalho com lanternas acesas: o bando verde, o pai de Grilo abraçando o filho e vizinhos comemorando; ao fundo, um mensageiro chegando ofegante | 3 camadas (`c-trigo`, `c-leite`, `c-manta`) |

### Caixas "Você sabia?" da Parte 1 (campo `voceSabia` pronto para o modo tradicional + referência para o Desafio 🧩)
- **Pág. 1 (Cap. 1)**: *Na Idade Média existiam leis muito duras chamadas Leis da Floresta: os moradores comuns podiam ser castigados até por juntar lenha caída ou caçar comida perto de casa!*
- **Pág. 2 (Cap. 2)**: *Em Sherwood existe até hoje um carvalho gigante de verdade chamado Major Oak, com cerca de 800 a 1.000 anos. Muita gente conta que ele foi o esconderijo de Robin Hood!*
- **Pág. 5 (Cap. 5)**: *Prender alguém sem investigar as provas é uma grande injustiça. Hoje em dia, peritos independentes estudam pistas como pegadas e marcas para descobrir o que realmente aconteceu!*
- **Pág. 8 (Cap. 8)**: *Na Inglaterra medieval, treinar arco e flecha nos fins de semana e competir nos torneios das feiras era tão popular quanto jogar futebol hoje em dia!*

## 5. Notas do humano e crítica adversarial
- **2026-11-21 — Issue #68 (`revisao-autor`)**: trocado `Dama Mariana` / `Dama Mariana de Sherwood` / `Mariana de Sherwood` por **`Lady Mariana`** (variando com *Mariana*), para remeter melhor ao original e soar mais natural junto com *Robin Hood*. Atualizados `robin-hood/parte-1.html` e toda a documentação de *Robin Hood*.
- Autor pediu rascunho ilustrado para já realizar a revisão lendo com o filho.

## 6. Arte (10/10 cenas concluídas)
- **7/10 cenas no gerador nativo (`US$ 0,00`)**: `p0-real`, `p1-real`, `p2-real`, `p3-real`, `p4-real`, `p6-real` e `p7-real` (Estilo A — Gouache estilizado de floresta).
- **3/10 cenas pela API paga Batch (`tools/arte/robin-hood-parte-1.mjs`, `US$ 0,1036`)**: `p5-real`, `p8-real` e `p9-real` (`batches/ymffobzbvd3hgmrhru309wiyg9brekwx1r5j`, 3/3 aceitas de primeira, registradas em `docs/arte/gastos.csv`).
- Camadas das atividades nas págs. 7 e 9 seguem com o fallback limpo de emoji nesta etapa de revisão em família.

### 5.1 Crítica adversarial (subagente de contexto limpo, 2026-11-21)
Notas iniciais por página: de **4,0 a 8,0** (mais baixas na Pág. 7 e Pág. 9). Todas as 10 correções críticas apontadas pelo revisor foram aplicadas no polimento:
1. **Pág. 7 (atividade e cronologia)**: reduzida de 6 para **5 cartões** (`CAPUZ`, `CAPIM`, `MANTO`, `BARCO`, `ARCO`) com `camadas` visuais; texto reordenado para Robin montar o disfarce *nos fundos das barracas, antes* da vistoria do guarda (que passa a abrir a Pág. 8).
2. **Págs. 4 e 9 (atividades no crivo)**: todas as 3 atividades agora alteram visualmente a cena via `camadas`; Pág. 4 usa `ordem` sobre a sequência do riacho (`PONTE` → `TOMBO` → `RISADA` → `AMIGO`) sem quebrar `JO`+`ÃO`; Pág. 9 virou `pedido` (`TRIGO`, `LEITE`, `MANTA` × `TREVO`, `LEQUE`), tirando o slogan do título (`A Festa da Partilha`).
3. **Pág. 9 ("Gui")**: anunciado com traço visual e motivo explícito (casaco vermelho, emprestou a carroça para a farinha e comemorou na praça).
4. **Pág. 1 (contradição da prova e léxico)**: o Xerife acusa falsamente o moleiro de esconder farinha e prende sem buscar prova; explicados `moinho`, `barão` e a retirada dos sacos dos vizinhos pobres; mencionada a boa pontaria de Robin desde o início.
5. **Pág. 0 (Capa)**: removido spoiler da flecha partida e trocado "imposto" por "cobrança injusta".
6. **Pág. 6**: título `Pregão` → `Convite`; motivo solidário de Robin ir ao torneio (comprar comida e cobertores para o povo) já explícito na fala.
7. **Págs. 3–5 (continuidade física)**: Robin pega galho na trilha; Grilo se esconde na samambaia; ajustado o trecho do umbigo/joelho; camisa grande para João Pequeno fica para o Grande Carvalho (Mariana só levava três); João Pequeno ergue Grilo até a janela alta; Robin confere os sacos das famílias pobres; guarda reconhece Robin na fuga.
8. **Repetição intencional de palavras-chave**: `FARINHA` (P1, P5), `VERDE` (P2, P6), `ARCO` (P7, P8), `FLECHA` (P0, P8), `PROVA` (P1, P9).
9. **Vocabulário e ritmo**: removidas palavras como `túnica`, `fuligem`, `aldeã/aldeão`, ênclises (`apoiava-se`, `equilibrando-se`), título redundante na P8 (`Bem no Centro do Alvo!`), fuga da P8 reforçada (chuva de fitas vermelhas + nuvem de farinha) e frases longas quebradas em sentenças curtas.
