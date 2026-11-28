# Caderno — Robin Hood, Parte 1: O Segredo da Floresta de Xervedo

Arquivo: `robin-hood/parte-1.html` (**publicada na estante principal**) · Trecho de referência: Howard Pyle (1883), cap. 1 + Grande Carvalho + Lady Mariana + Resgate do Moleiro · Nossos capítulos: **1–11 (capa + 11 capítulos = 12 páginas)**
Plano: [`../PLANO-ROBIN-HOOD.md`](../PLANO-ROBIN-HOOD.md) · Receita: [`../receitas/ROBIN-HOOD.md`](../receitas/ROBIN-HOOD.md) · Diretrizes: [`../DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) · Pesquisa: [`../pesquisa/ROBIN-HOOD.md`](../pesquisa/ROBIN-HOOD.md)

| Fase | Situação | Data | Commit/PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 0 Mapa da Obra (plano, pesquisa, receita) | ✅ aprovado pelo humano | 2026-11-21 | `ef3117d` + reengenharia | — |
| 1 Adaptação e texto v2 (Jornada do Herói, 11 caps., Hydrogen + Opus 5.5) | ✅ concluído (Capa + 11 caps.) | 2026-11-22 | `09b22f8` | US$ 0,00 |
| 2 Interações e visual v2 (Opção C — Diorama de Papel + Método Híbrido) | ✅ concluído | 2026-11-22 | `f5afd97` | US$ 0,00 |
| 3 Revisão humana 🛑 | ✅ **aprovada na reengenharia v2** (Issues #69–#73 fechadas em 2026-11-26) | 2026-11-22 | Issues #69–#73 | — |
| 4 Ilustrações e atividades v2 (Opção C — Diorama de Papel Recortado) | ✅ **22/22 gravuras + 8 sprites animados WebP** (100% no gerador nativo) | 2026-11-22 | `252cd86` | US$ 0,00 |
| Publicação (estante principal, PT) | ✅ **publicada na estante principal** (pontos de melhoria anotados para futura v2) | 2026-11-22 | `252cd86` | — |
| 5 Revisão final / pontos para v2 🛑 | 📝 **melhorias anotadas para futura v2** (ver §5) | 2026-11-26 | — | — |
| 6 Narração (pt) + escuta 🛑 | ✅ **12/12 págs. + 35/35 palavras + falas gravadas (0 rajadas, `vozes.js` ativo)** · escuta em `qa-robin-hood-parte-1.md` | 2026-11-27 | `main` | US$ 0,15 |
| 7 Idiomas (en, fr, es) + Desafios 🧩 | ⬜ aguardando | — | — | US$ |
| 8 Retrospectiva | ⬜ aguardando | — | — | — |

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

## 3. Atividades publicadas na Parte 1 (v2 — crivo da receita geral §6.2)

| # | Pág. | O que a criança faz | Nasce da história? Ajuda quem? | Treina | Tipo | Como a cena muda | Por que só acerta lendo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 4 | Ordena o que Lady Mariana entregou: `VERDE` · `CAPUZ` · `CORNETA` | Ajudar Robin e Grilo a sumir no meio das folhas antes dos guardas | leitura e sequência | `ordem` + `realCena` | 3 gravuras progressivas reais (`p4-stage-1..3.webp`) | todos os cartões usam o mesmo emoji `🍃` |
| 2 | 6 | Ordena a sequência do que aconteceu no riacho: `PONTE` · `TOMBO` · `RISADA` · `AMIGO` | Relembrar passo a passo como Robin e João Pequeno viraram amigos | compreensão da sequência e leitura | `ordem` + `realCena` | 4 gravuras progressivas reais (`p6-stage-1..4.webp`) | todos os 4 cartões têm o mesmo emoji `💧` |
| 3 | 9 | Escolhe o item certo para o resgate silencioso: `CHAVE` (× `CHUVA`), `CORDA` (× `COROA`), `FARINHA` (× `VARINHA`) | Ajudar Grilo, João Pequeno e Robin a libertar Mestre Tomé e resgatar a farinha | leitura atenta de palavras parecidas | `pedido` + `realCena` | 3 gravuras progressivas reais (`p9-stage-1..3.webp`); pegadinhas dão resposta bem-humorada e recomeçam | cartões da bandeja sem emoji (modo `pedido`) + pegadinhas quase iguais |

- Páginas calmas entre as atividades: 1, 2, 3, 5, 7, 8, 10, 11 (nenhuma atividade em páginas seguidas).

## 4. Visual publicado (Opção C — Diorama de Papel Recortado · 22 gravuras + 8 sprites animados)

- **12 cenas-base** (`p0-real.webp` a `p11-real.webp`) + **10 gravuras progressivas** (`p4-stage-1..3`, `p6-stage-1..4`, `p9-stage-1..3`) = **22 gravuras WebP** geradas no gerador nativo (US$ 0,00).
- **8 sprites sobrepostos animados** (`robin-hood/imagens/parte-1/camadas/`): `p0-passarinhos.webp` (`flutuar`), `p1-pergaminho.webp` (`flutuar`), `p2-roda.webp` (`girar`, usada em P2 e P3), `p5-libelula.webp` e `p5-samambaia.webp` (usadas em P5 e P7), `p8-borboleta.webp` (`flutuar`), `p11-lanterna.webp` (`pendulo`) e `p11-fumaca-pao.webp` (`flutuar`).

### Caixas "Você sabia?" publicadas na Parte 1 (`voceSabia`)
- **Pág. 2 (Cap. 2)**: como funcionava a roda d'água do moinho antigo.
- **Pág. 4 (Cap. 4)**: o *verde de Lincoln* usado pelos arqueiros na Inglaterra.
- **Pág. 8 (Cap. 8)**: o *Major Oak* (Carvalho Maior) de cerca de mil anos em Sherwood.
- **Pág. 11 (Cap. 11)**: o papel dos peritos que examinam provas e pistas antes de acusar alguém.

## 5. Notas do humano e pendências anotadas para futura v2
- **2026-11-21 — Issue #68 (`revisao-autor`)**: trocado `Dama Mariana` por **`Lady Mariana`** (variando com *Mariana*).
- **2026-11-26 — Issues #69 a #73 fechadas**: todas já endereçadas na reengenharia v2 publicada.
- **2026-11-26 — Avaliação do humano e pontos para futura v2**:
  - A Parte 1 publicada ficou boa e o filho pediu insistentemente a continuação (por isso a **Parte 2** tem prioridade e a **narração em português da Parte 1** foi adiada para depois do lançamento da Parte 2).
  - **Ponto editorial para v2 (e para o elenco das próximas partes)**: sensação de **"falsa diversidade"** — apesar de Lady Mariana, Mestre Tomé e Grilo, a maioria dos demais personagens ainda é masculina e branca (e figuras femininas cotidianas, como a mãe de Grilo, nem chegam a ser mencionadas). Não forçar remendos artificiais agora; amadurecer revisões para a v2 da Parte 1 e garantir diversidade orgânica real nas próximas partes com apoio de um novo agente de Antirracismo, Diversidade e Compliance no Swarm.
- **2026-11-28 — Issue #77 (`revisao-autor`): Grilo atrás da samambaia.** O filho do autor notou que o texto da Pág. 5 diz que Grilo "se escondeu atrás de uma samambaia", mas a ilustração mostrava o menino inteiro, espiando atrás de uma árvore. Solução sem mexer no texto nem na arte: uma **samambaia de papel recortado em SVG** (camadas `c-samambaia-p5` e `c-samambaia-p6`, `fundo: 'transparent'`, folhas de trás no `::before` e da frente no `::after`, balanço suave `rh1Samambaia` em fases opostas, parado com `prefers-reduced-motion`) posta na frente do Grilo, à direita da ponte, junto da árvore (caixa de 1010–1270 × 330–570 px da ilustração 1376×768). Na **Pág. 5** só o rosto (olhos, boca) aparece por cima das folhas. Na **Pág. 6**, onde o texto diz "Atrás da samambaia, Grilo tapou a boca", o Grilo está no mesmo lugar em `p6-real` e nas quatro etapas (`p6-stage-1..4`), e a mesma samambaia entra 16 px mais baixa, para as mãos na boca (etapa 2) e o polegar levantado (etapa 3) continuarem à mostra. Na **Pág. 7** ("Grilo saiu de trás da samambaia") a ilustração já mostra o Grilo fora do esconderijo, ao lado de João: nada a fazer. O desenho sai de `tools/arte/robin-hood-parte-1-samambaia.mjs` (geometria pura, sem API), que imprime os data-URIs e a caixa da camada em %. O sprite antigo `camadas/p5-samambaia.webp` (fora de uso desde a troca das animações da P1) não serviu: as pontas das folhas cobririam os olhos do Grilo, o vão entre elas é estreito demais para o rosto e o tom verde-azulado destoa do verde-oliva do cenário.

## 6. Histórico da v1 (arquivado como referência)
- A v1 inicial (Estilo A — Gouache, 10 páginas, com o Torneio da Flecha de Ouro ainda na Parte 1) teve 7 cenas no gerador nativo e 3 cenas pela API Batch (`tools/arte/robin-hood-parte-1.mjs`, `US$ 0,1036`, registradas em `docs/arte/gastos.csv`), sendo integralmente substituída pela reengenharia v2 em Diorama de Papel Recortado (US$ 0,00).

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
