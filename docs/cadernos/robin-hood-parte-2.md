# Caderno — Robin Hood, Parte 2: A Flecha de Ouro e o Resgate na Torre

Arquivo: `robin-hood/parte-2.html` (`rascunho: true` até aprovação) · Trecho de referência: Howard Pyle (1883), caps. 3–4 (adaptados com Clara Escarlate e investigação por pistas) · Nossos capítulos: **12–25 (capa + 14 capítulos = 15 páginas)**; o Cap. 17 (desempate) entrou em 2026-11-28, Issues #80 e #81, e os seguintes andaram um número
Plano: [`../PLANO-ROBIN-HOOD.md`](../PLANO-ROBIN-HOOD.md) · Receita: [`../receitas/ROBIN-HOOD.md`](../receitas/ROBIN-HOOD.md) · Diretrizes: [`../DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) · Pesquisa: [`../pesquisa/ROBIN-HOOD.md`](../pesquisa/ROBIN-HOOD.md) · Parte anterior: [`robin-hood-parte-1.md`](robin-hood-parte-1.md)

| Fase | Situação | Data | Commit/PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 0 Concepção, elenco diverso e escaleta (com `@diversidade-compliance`) | ✅ aprovada pelo humano | 2026-11-26 | — | US$ 0,00 |
| 1 Adaptação e texto (`@escritor-hydrogen` → `@revisor-opus` → `@diversidade-compliance`) | ✅ **100% concluído e lapidado** (Capa + Caps. 12–24, com comédia e ajustes de diversidade) | 2026-11-27 | `main` | US$ 0,00 |
| 2 Interações e visual (Opção C — Diorama de Papel + `@diretor-animacao`) | ✅ concluído (3 atividades progressivas + 6 páginas animadas / 2 sprites) | 2026-11-27 | `main` | US$ 0,00 |
| 3 Revisão humana 🛑 | 🟡 **pronto para revisão do humano (texto + 24 WebPs + animações)** | 2026-11-27 | `main` | — |
| 4 Ilustrações e animações integradas | ✅ **100% concluído (24 cenas/etapas WebP + 2 sprites animados)** | 2026-11-27 | `main` | US$ 0,6901 |
| 5 Revisão final em família 🛑 | ⬜ | | | — |
| Publicação (estante principal, PT) | ✅ **publicada na prateleira principal** (`index.html`, link P1→P2) | 2026-11-27 | `0f794fb` | — |
| 6 Narração (pt) — P1 e P2 | ✅ **14/14 págs. + 39/39 palavras + falas gravadas (0 rajadas, `vozes.js` ativo)** · escuta em `qa-robin-hood-parte-2.md` | 2026-11-27 | `main` | US$ 0,18 |
| Revisões do autor #80 e #81 (empate + Cap. 17 novo, sincronia com a narração) | ✅ texto, arte (panorâmica 4:1), animação e motor (`narracaoAcoes`); 🛑 **a Parte 2 inteira precisa ser regravada** (§4.5) | 2026-11-28 | branch do subagente | US$ 0,2062 (arte) |

---

## 1. Escaleta aprovada (Capa + 14 capítulos, caps. 12–25; atualizada em 2026-11-28)

| Pág. | Cap. | Título provisório | O que acontece | Atividade / Destaque |
| :--- | :--- | :--- | :--- | :--- |
| 0 | — | **Capa** — *Parte 2: A Flecha de Ouro e o Resgate na Torre* | Apresentação calorosa sem spoilers | — |
| 1 | 12 | **O Cartaz da Flecha de Ouro** *(Ponte com a P1)* | No Grande Carvalho, o bando conhecido (Robin, Mariana, João Pequeno, Grilo e Mestre Tomé) discute o cartaz da Flecha de Ouro; decidem ir para transformar o ouro em comida e cobertores, mas Robin precisa de um disfarce sem nada de verde — Mariana lembra da amiga Clara | Ponte natural com P1 |
| 2 | 13 | **A Oficina das Cores** | Introdução com respiro de **Clara Escarlate** (*mulher branca*, tintureira/costureira de Nortigão), sua oficina vibrante, seu senso de justiça e amizade com Mariana | Estreia orgânica de Clara |
| 3 | 14 | **Um Viajante Sem Nada de Verde** | Clara ajuda Robin a montar um disfarce de viajante/artesão (chapéu largo, manto marrom, barba de lã — sem caricatura de mendigo nem deficiência) | **Atividade 1** (`pedido` + gravuras progressivas) |
| 4 | 15 | **A Praça das Bandeiras** | Feira e plateia plurais em Nortigão (mulheres arqueiras na fila, feirantes diversas); o Xerife exibe a Flecha de Ouro e vigia qualquer pano verde | Cuidado de diversidade na multidão |
| 5 | 16 | **Duas Flechas no Meio do Alvo** *(era "A Flecha que Partiu a Flecha")* | Disputa no alvo: o capitão acerta o meio, Robin crava coladinho e dá **empate**; o juiz anuncia o desempate de mais longe | Clímax do torneio (1); flecha disparada pela narração no "ZUP!" |
| 6 | 17 | **O Desempate de Mais Longe** *(novo, Issues #80 e #81)* | O alvo vai para o fim da praça; o capitão acerta pertinho; o Xerife: "Daquela distância, é impossível fazer melhor!"; Robin acerta o centro e recebe a Flecha de Ouro; a aba do chapéu sobe e um guarda arregala os olhos | **Atividade** (`ordem`: PUXA, MIRA, SOLTA) + panorâmica com câmera que acompanha a flecha |
| 7 | 18 | **Chuva de Fitas Escarlates** | Um guarda reconhece o arco de Robin e grita; Clara, Mariana, João Pequeno e Grilo jogam rolos de fitas vermelho-escarlate e farinha para fugir sem violência | Fuga em equipe |
| 8 | 19 | **A Cor que Entregou a Oficina** | Na praça, o Xerife pisa furioso nas fitas vermelho-escarlate — só existe uma tintureira em Nortigão que faz aquela cor! Ele manda prender Clara em segredo numa torre afastada | Causalidade lógica |
| 9 | 20 | **A Oficina Vazia** | Mariana e Grilo voltam à oficina e a encontram revirada, com um tacho de tinta tombado e vizinhos assustados sem saber para onde os guardas levaram Clara | Início do mistério |
| 10 | 21 | **Os Sinais no Caminho** | Mariana e Grilo usam o **olhar de perito** para investigar o que aconteceu e o paradeiro de Clara (pegadas com tinta vermelha, fios escarlates deixados de propósito por Clara até a Torre Velha) | **Atividade 2** (`ordem` + gravuras progressivas) |
| 11 | 22 | **O Lenço na Janela Alta** | Ao entardecer, o bando chega perto da Torre Velha; **Clara** (ativa!) já observou a troca de guarda e sinaliza da fresta com um retalho escarlate mostrando por onde lançar a corda | Clara proativa |
| 12 | 23 | **Corda, Vento e Liberdade** | Resgate noturno silencioso na Torre Velha com João Pequeno, Robin, Mariana, Grilo e Clara atuando juntos, sem violência | **Atividade 3** (`pedido` + gravuras progressivas) |
| 13 | 24 | **O Ouro que Virou Cobertor** | O prêmio da Flecha de Ouro vira pães, mantimentos e cobertores entregues às famílias da vila; celebração coletiva | Recompensa concreta |
| 14 | 25 | **Verde com Lenço Escarlate** | **Clara Escarlate** veste o verde da floresta com seu lenço vermelho-escarlate e entra oficialmente para o bando. Gancho para a **Parte 3**: o Xerife tenta controlar a feira de comida e Robin tem a ideia de virar açougueiro por um dia | Gancho P2 → P3 |

---

## 2. Cuidados de Diversidade e Compliance (definidos com `@diversidade-compliance`)
1. **Multidão e competidores plurais** na praça do torneio (mulheres arqueiras, feirantes e plateia diversas em raça, gênero e idade).
2. **Sem "Donzela na Torre" nem "Salvador Branco"**: Clara age ativamente deixando rastros intencionais e observando a troca de guarda; Mariana e Grilo lideram a investigação das pistas.
3. **Disfarce sem caricatura**: Robin se disfarça de viajante/artesão comum (nada de fingir deficiência nem ridicularizar pobreza).
4. **Figuras femininas cotidianas** presentes naturalmente em Nortigão (feirantes, arqueiras, vizinhas).
5. **Linguagem limpa e zero rotulagem racial assimétrica** no texto; vilões sem piada baseada em corpo/aparência.

---

## 3. Notas de produção (2026-11-26 — produção noturna contínua)
- **Texto**:
  - **Capa + Caps. 12–24 (14/14 páginas)**: ✅ **100% lapidados pelo `@revisor-opus` (`Claude Opus 5.5`)** na retomada automática das 04:05 BRT de 2026-11-27, incorporando todos os ajustes de diversidade de `#55` (zero associação com sangue no Cap. 19, inclusão de famílias inteiras no Cap. 23, continuidade do lenço curtinho de Clara nos Caps. 21–24) e elementos de comédia leve em toda a obra.
- **Animações (`@diretor-animacao`, `Gemini 4 Neon`)**:
  - **Correção (2026-11-27, relato do humano no tablet: só as flâmulas mexiam)**: os véus pintados em CSS (`fundo: 'transparent'`) recebem do `livro.js` um `background` inline, que apagava o gradiente do brilho da capa (`c-brilho-p0`) e da farinha (`c-farinha-p6`) em qualquer aparelho; e os raios/poeira do sol (Caps. 12 e 24) dependiam de `mix-blend-mode: screen` sobre cena clara, com partículas de 3 px, invisíveis no tablet. Agora todo efeito pintado mora em `::before`/`::after`, sem blend, mais forte e com partículas maiores.
  - Vapor/bolhas do tacho no Cap. 13 **removidos** (feedback humano: parecia tinta fervendo).
  - Livro fechado com **6 páginas animadas em 14** (Capa, Caps. 12, 15, 17, 21 e 24) e apenas **2 sprites recortados** (`p4-flamula.webp` pronto + `p11-lenco.webp`, antes `p10-lenco`).
- **Ilustrações (100% concluídas — 24 cenas/etapas WebP + 2 sprites animados)**:
  - **Gerador nativo (`US$ 0,00`)**: `p1-real`, `p2-real`, `p3-real`, `p4-real`, `camadas/p4-flamula`.
  - **API paga Batch autorizada (`tools/arte/robin-hood-parte-2.mjs`, lote `batches/jz3e2knf0cdcakd91kf8cqty9yhja4mbvqns`, 20/20 aceitas, `US$ 0,6901` registrados em `docs/arte/gastos.csv`)**: `p0-real`, retoques `p3-stage-1..3`, `p5-real`, `p6-real`, `p7-real`, `p8-real`, `p9-real`, `p9-stage-1..3`, `p10-real`, `camadas/p10-lenco`, `p11-real`, `p11-stage-1..3`, `p12-real`, `p13-real` (nomes da época; desde 2026-11-28 as págs. 6 a 13 são 7 a 14, §4.4).
  - Recorte de `p10-lenco` (removida cornija superior, 0 pixels magenta/halo) e calibração de coordenadas (`c-brilho-p0`, `c-farinha-p7`, `c-lenco-p11`, `c-sol-p14` (nomes de 2026-11-28; eram p6, p10 e p13)) concluídos pelo `@diretor-animacao`.

---

## 4. Revisões do autor: Issues #80 e #81 (2026-11-28) — o empate e o desempate de mais longe

**Pedido** (`revisao-autor`, pág. índice 5, Cap. 16): (#80.1) Robin empatou com o guarda, não ganhou: um capítulo extra para o desempate, de mais longe; o guarda atira primeiro e acerta bem perto, o Xerife diz que daquela distância é impossível fazer melhor, e Robin acerta o meio. (#80.2) A animação deveria disparar sincronizada com a narração. (#80.3) A narração da página ficou quase toda na voz de Robin. (#81) O capítulo novo numa imagem ainda mais comprida na horizontal, com a flecha viajando por um bom tempo (API paga autorizada só para essa arte, ou colagem panorâmica).

### 4.1 Texto
- **Cap. 16 (pág. 5) → "Duas Flechas no Meio do Alvo" / "Um Empate de Cair o Queixo"**: o espirro e a barba de lã ficam; o `"— Aaa… aaa…"` virou narração ("Aaa… aaa… lá vinha um espirro!"). O CRAC da flecha partida virou **TOC**: a flecha de Robin crava **coladinha** na do capitão, "juntinhas feito irmãs gêmeas"; o juiz do campeonato rufa o tambor e anuncia o **EMPATE** (fala indireta, para não pedir voz nova no elenco) e o desempate de mais longe; os guardas carregam o alvo até o fim da praça. Palavras-chave: DISPUTA, CORDA, **EMPATE** (no lugar de PALMAS; o hotspot foi para o alvo). A ilustração `p5-panoramico` (alvo sem flechas pintadas) serve sem mudança: só a animação mudou.
- **Cap. 17 novo (pág. 6) → "O Desempate de Mais Longe" / "Impossível Fazer Melhor?"**: o alvo fincado no fim da praça ("a bolinha dourada do meio parecia um botãozinho de camisa"); o capitão molha o dedo para sentir o VENTO e acerta "a um dedinho só" do meio; o Xerife: "— Daquela distância, é impossível fazer melhor!"; Grilo, no meio do povo, cochicha o segredo dos arqueiros de Xervedo, "— Puxa, mira, solta!"; ZUP!, a flecha passa por cima dos chapéus, das barracas e das bandeiras, "e foi, e foi, e foi… TUC!", no CENTRO. O 4º parágrafo é o **final antigo do Cap. 16** (Flecha de Ouro, reverência, aba do chapéu, guarda que arregala os olhos), que costura direto com o começo do Cap. 18 ("O guarda apontou para o rosto debaixo do chapéu e berrou…"). Palavras-chave: **DISTÂNCIA**, **VENTO**, **CENTRO** (nenhuma usada antes em P1 e P2).
- **Atividade (§3.3)**: `ordem` com PUXA, MIRA, SOLTA, os três com o mesmo emoji 🏹 (só acerta quem lê), na ordem em que Grilo cochicha. Cada acerto muda a cena: PUXA estica a corda (a flecha recua no arco), MIRA aproxima a câmera do olho de Robin, SOLTA dispara a flecha (a viagem inteira). Nasce da história (a criança ajuda Robin a lembrar o segredo, como na assinatura da carta de Dom Quixote) e não tem placar.
- A Parte 2 tem agora **15 páginas** (capa + Caps. 12–25). A Parte 3 começa no Cap. 26.

### 4.2 Arte (API paga, autorizada na Issue #81, teto US$ 0,60)
- Lista: `tools/arte/robin-hood-parte-2-desempate.mjs` (estilo C da P2 sem o "16:9"; fichas `ROBIN_DISF` e `XERIFE`; refs `p5-real`, `p4-real`/`p5-panoramico`, `p3-stage-3`).
- **Rodada 1** (2 pedidos 4:1, 2K, Batch): o modelo aceitou o **4:1** e entregou 4128 × 1024. A "a" saiu com céu creme e o capitão no meio da fila; a **"b"** foi a escolhida (céu azul com nuvens de papel como a p5, praça bem aberta com o poço, plateia diversa olhando para a direita, alvo vazio lá no fim), mas com uma flecha pintada no arco de Robin e um retalho solto de pedras no chão. US$ 0,1037.
- **Rodada 2** (2 edições da "b", ARTE-PELA-API §4.3 item 3: "Repaint EXACTLY… Only TWO changes"): a **"b2"** veio certa (arco sem flecha, chão liso, tudo o mais igual); a "b3" veio com personagens fantasmas. US$ 0,1025.
- **Sem colagem.** Aceita: `robin-hood/imagens/parte-2/p6-panorama.webp` (4128 × 1024, 182 KB; `otimizar-imagens.py` agora limita a altura das panorâmicas, não a largura). **Total: US$ 0,2062** (`docs/arte/gastos.csv`).
- Crivo: Robin de chapéu marrom, barba de lã e manto marrom, sem verde; o capitão de armadura cinza e pluma vermelha; o Xerife de roxo com a Flecha de Ouro; alvo bem distante e vazio; praça e torneio de Nortigão no traço de papel recortado. Ponto para o autor olhar: o **juiz** é um rapazinho de túnica marrom parado ao lado do alvo (o modelo o fez jovem); as flechas cravadas são desenhadas como "toquinhos" vistos de frente para nunca passarem por cima dele.
- Medidas (pixels da imagem): centro do alvo (3915, 620); acerto do capitão (3905, 578); ponta da flecha no arco de Robin (690, 532); arco do capitão (1310, 505).

### 4.3 Animação e sincronia com a narração
- **Pág. 5**: a mesma câmera panorâmica de antes (`rh2-p5-palco`); a flecha de Robin agora crava 9 px acima da do capitão, as duas tremem juntas e o brilho dourado "TOC!" aparece entre elas (legenda "TOC! Coladinha na Flecha do Capitão: Empate!").
- **Pág. 6** (`RH2P6`, no começo do script da página): o "mundo" (imagem + SVG) tem o tamanho da panorâmica e é deslocado/escalado por JS; câmera `{ cx, cy, z }` presa às bordas, `ResizeObserver` para retrato/paisagem. Flecha do capitão: 3,4 s, a câmera acompanha, mostra o acerto e volta para a fila dos arqueiros (onde o Xerife fala). Flecha de Robin: **5,6 s**, sobe num arco por cima da praça, encolhe com a distância, rastro de vento, e no fim a câmera fecha no alvo (zoom 1,9) com tremor, brilho, faíscas e fanfarra. Repetir: a câmera volta para Robin e ele atira de novo. 🔄 Recomeçar (`aoReiniciar`) devolve tudo. `prefers-reduced-motion`: sem viagem (flecha cravada e corte seco para o alvo).
- **Narração** (`narracaoAcoes`, motor): pág. 5 no "ZUP!" (§3); pág. 6 no "fiuuu!" do capitão (§2) e no "ZUP!" de Robin (§3). Durante a leitura os cartões esperam ("🎧 Ouvindo a história…"); depois, a criança pode atirar de novo. Na voz do aparelho, o voo de 5,6 s termina perto do "TUC!" (a frase do meio leva ~6 s).

### 4.4 Renumeração (inserir uma página desloca tudo)
- Capítulos 17–24 → 18–25; páginas 6–13 → 7–14.
- Imagens (de trás para a frente): `p13-real`→`p14-real`, `p12-real`→`p13-real`, `p11-real`/`p11-stage-1..3`→`p12-*`, `p10-real`→`p11-real`, `p9-real`/`p9-stage-1..3`→`p10-*`, `p8-real`→`p9-real`, `p7-real`→`p8-real`, `p6-real`→`p7-real`, `camadas/p10-lenco`→`camadas/p11-lenco`; camadas CSS `c-farinha-p6`→`p7`, `c-lenco-p10`→`p11`, `c-sol-p13`→`p14`; `narracaoEtapas` `p9-s*`→`p10-s*` e `p11-s*`→`p12-s*`; destinos de `tools/arte/robin-hood-parte-2.mjs`.
- Narração: `p13.mp3`→`p14.mp3` … `p8.mp3`→`p9.mp3`, `p6.mp3`→`p7.mp3` (a antiga pág. 7 já estava sem áudio desde a Issue #82); `p5.mp3` apagado. `paginas.json`: chaves, `arquivo` e ids das frases deslocados; `p5` fora (e não há `p6`). `roteiro.json`: chaves deslocadas, falas da pág. 5 retiradas, pág. 6 com o Xerife (`p6-s9`) e o Grilo (`p6-s11`).

### 4.5 🛑 Pendências
- **Regravar a Parte 2 inteira** (com autorização da API): as págs. 5 e 6 estão na voz do aparelho; as 7 a 14 tocam a gravação certa, mas o título falado diz o capítulo **antigo** (a pág. 7 diz "Capítulo 17"…), e há fins de página cortados pelo gate antigo (`TODO-NARRACAO.md` §10). O `conferir-narracao` mostra 5/15 páginas em dia e 4 palavras novas (EMPATE, DISTÂNCIA, VENTO, CENTRO) sem gravação: é o esperado. Na regravação, passar "Cof, cof, cof!" (`p7-s11`) e "Atchinf!" (`p12-s4`) para a narradora (`TODO-NARRACAO.md` §11). Falas novas das atividades (comando da pág. 6, PUXA/MIRA/SOLTA) também saem na voz do aparelho.
- O autor confere no tablet: o empate, a viagem da flecha, o tempo do disparo na narração e o juiz ao lado do alvo.
