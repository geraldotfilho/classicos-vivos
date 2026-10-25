# 📖 Receita de um Clássico Vivo (receita geral)

Como transformar uma obra-prima da literatura num livro interativo para crianças de 5 a 8 anos. Esta é a **receita geral**: vale para **qualquer** clássico, **qualquer** tipo de adaptação e **qualquer** agente (Claude, Gemini, Codex ou uma pessoa).

> **Receita geral × receitas específicas.** Cada obra exige decisões próprias. O que serve só para um tipo de adaptação ou para uma obra fica numa **receita específica** em `docs/receitas/`. Exemplo: *Dom Quixote* é uma obra enorme que precisou ser **muito resumida**, e tem um recurso visual próprio (as lentes da Realidade e da Imaginação). Essas regras estão em [`receitas/DOM-QUIXOTE.md`](receitas/DOM-QUIXOTE.md), **não** aqui. Na dúvida, a regra só entra nesta receita se valer para um conto de fadas de 10 páginas tanto quanto para um romance de 1.000.
>
> **Documento vivo.** Toda parte entregue termina com uma retrospectiva (fase 8). Cada lição nova entra no **Diário de lições** (§8) desta receita, se for geral, ou no da receita específica, se não for. Arquitetura e regras técnicas ficam no `AGENTS.md`; aqui fica o **processo**.

---

## 1. Princípios (valem para toda obra)

1. **Leitor de referência: uma criança de 6 anos ouvindo, ou lendo junto com um adulto** (`AGENTS.md` §3.5). Frases curtas, ordem direta, palavras do dia a dia, sem perder a beleza e o humor do original.
2. **Proteção da infância.** Muitos clássicos foram escritos quando a ideia de proteger a criança não existia como hoje. Adaptar é também trazer a obra para os valores de agora: sem violência como eixo, sem humilhação como piada, sem conteúdo adulto, sem medo gratuito, sem preconceito de raça, gênero, origem, religião ou deficiência, sem castigo cruel apresentado como justo. Mantenha o conflito, o perigo e a emoção que a história precisa; mude a forma. Registre cada decisão e o motivo.
3. **Fiel ao espírito, não à letra.** Cortar, fundir, simplificar e (em obras curtas) **acrescentar** cenas é permitido. Deixar a história sem pé nem cabeça, não: cada evento precisa de **motivo** e de **consequência** que a criança entenda.
4. **A interação nasce da história**, transforma a cena e, sempre que der, **alfabetiza**. Nada de placar, estrela, tempo-limite ou "errou" em vermelho (`AGENTS.md` §3.3).
5. **Ler vem primeiro.** Páginas calmas (só texto e toques na cena) são parte do ritmo, não falta de ideia.
6. **Uma parte por vez, do começo ao fim**, com paradas para o humano ler e aprovar.
7. **Economia**: a API paga só é usada com autorização do humano no prompt da sessão, no modo mais barato, com o gasto registrado (`AGENTS.md` §2.7). Vale para qualquer agente.
8. **Nunca quebrar o que está publicado.** O livro novo nasce como rascunho e só substitui o antigo depois de aprovado (§4).

---

## 2. Tipos de adaptação

Antes de tudo, diga **que tipo de adaptação** a obra pede. O tipo muda a fase 0 e boa parte da fase 1.

| Tipo | Quando | O desafio principal | Receita específica |
| :--- | :--- | :--- | :--- |
| **Condensação** | A obra é muito maior que um livro infantil (romances, epopeias) | **Escolher e resumir** sem perder o fio: o que entra, o que sai, como dividir em partes | [`receitas/DOM-QUIXOTE.md`](receitas/DOM-QUIXOTE.md) (o primeiro caso; serve de ponto de partida para outras obras longas) |
| **Adequação / ampliação** | A obra é curta (fábulas, contos de fadas, poemas) e a adaptação pode ficar **maior que o original** | **Atualizar** a obra para hoje e para a idade (§1.2) e, quando preciso, **desenvolver** cenas que o original só sugere, sem trair a moral, o tom e a estrutura | ainda não existe: escrever quando o primeiro livro desse tipo começar |

Uma obra pode misturar os dois tipos (resumir uma parte, desenvolver outra). O que for decidido entra na receita específica dela.

---

## 3. Fase 0: o Mapa da Obra (uma vez por livro ou volume)

Antes da primeira página, escreva o mapa da obra (na receita específica ou no plano do livro, `docs/PLANO-<livro>.md`). Ele tem sempre:

1. **Fonte e tipo**: edição ou tradução de referência, domínio público, tipo de adaptação (§2).
2. **Mapa do original**: os capítulos, cenas ou estrofes, cada um com o episódio em uma linha e a decisão (**usar**, **fundir**, **cortar**, **desenvolver**) e o motivo.
3. **Divisão em partes**:
   - **7 a 9 páginas por parte** (capa + 6 a 8 capítulos nossos); **cada página conta um episódio**;
   - **uma parte = um arco**, com começo, meio e fim, de preferência num lugar ou numa situação;
   - as regras de **proporção** (quanto do original cabe numa página) dependem do tipo e ficam na receita específica.
4. **Fios da história (plantar e colher)**: cada personagem, promessa, objeto ou apelido que atravessa as partes, com **onde é plantado** e **onde é colhido**.
   - Ninguém resolve a história sem ter sido apresentado antes.
   - Nenhum fio fica solto.
   - A última página de uma parte e a primeira da seguinte precisam conversar (onde estão, por que estão ali, o que querem agora).
   - Fios bons rendem as melhores páginas e atividades: a criança se reconhece quando algo volta.
5. **Proteção da infância**: lista do que a obra traz de problemático (§1.2) e como cada ponto será tratado.
6. **Bíblias, antes da primeira imagem**: estilo da coleção (aquarela, guache, lápis de cor), fichas dos personagens e, se a obra tiver, o **recurso visual próprio** (em *Dom Quixote*, as lentes) com as regras dele.

🛑 O humano aprova o mapa antes da fase 1 da primeira parte.

---

## 4. Rascunho e publicação

- **Toda obra em produção** tem uma entrada em `assets/js/acervo.js` (`situacao: 'fila'` → `'rascunho'`). Na estante (`index.html`) ela aparece só como **capa-teaser com cadeado**; ao tocar, um aviso diz que o livro está sendo feito. Só entra no acervo o que já é rascunho ou vai virar rascunho em breve: nada de "próximos clássicos" vagos (regra do humano, 2026-10-25).
- **O rascunho é o próprio arquivo do livro** com `rascunho: true` no `window.LIVRO`: mostra o selo "Rascunho", lê só com a voz do aparelho em português (`?narracao=1` libera a narração gravada para a escuta da fase 6), não carrega traduções e guarda o progresso à parte.
- **O humano abre os rascunhos** em `sobre.html` (Para adultos → Livros em produção → chave "Mostrar os rascunhos", lembrada no aparelho).
- **Uma versão nova de uma parte já publicada** nasce num arquivo à parte (ex.: `parte-4-rascunho.html`, com `estante: null` no acervo) e a publicada continua no ar até a troca.
- **Publicar** = tirar o `rascunho`, tirar a entrada do `acervo.js`, pôr a capa fixa na estante do `index.html` e a descrição no "Acervo" de `sobre.html`, e (com a narração pronta) pôr a parte em `partes` no `vozes.js`.

---

## 5. As fases de cada parte

```text
 1 Adaptação e texto ─► 2 Interações e visual ─► 🛑 3 Revisão humana ─► 4 Ilustrações e atividades
   (1a escaleta ✋)                                   (congela a estrutura)
 ─► 🛑 5 Revisão final ─► 6 Narração (API) 🛑 escuta ─► publicação ─► 7 Idiomas (API) ─► 8 Retrospectiva
    (congela o texto)
```
🛑 = parada: o trabalho só continua com o "aprovado" do humano. ✋ = pergunta rápida na mesma sessão.

Cada parte tem um **caderno** (`docs/cadernos/<livro>-parte-N.md`, modelo no §7.1) com o quadro das fases, as decisões e as notas do humano. **Comece toda sessão lendo o caderno da parte** e termine atualizando-o.

### Fase 1: Adaptação e texto em português
**1.0. Leitura obrigatória das partes já publicadas** (quando a obra já tem alguma parte publicada). Antes da escaleta, leia o **texto final** de todas as partes publicadas da obra (o português do `window.LIVRO` em `<livro>/parte-N.html`, ou o export limpo em `docs/traducao/fonte-<livro>-parte-N.json`), com **atenção especial ao final da parte imediatamente anterior**. O objetivo é que a parte nova continue a obra sem quebras, saltos, repetições ou incoerências:
- **estilo**: o tom do narrador, o tamanho das frases, o jeito de abrir capítulos e de convidar a criança para as atividades, as falas e os bordões dos personagens;
- **continuidade**: onde, quando e com quem a parte anterior termina; o que cada personagem sabe, quer e carrega; o que já foi explicado (não explique de novo) e o que ficou prometido (não esqueça);
- **repetições a evitar**: episódios, piadas, imagens e atividades já usados (a mesma mecânica de atividade pode voltar, mas não a mesma brincadeira);
- **palavras-chave já ensinadas**: quais repetir de propósito e quais seriam repetição sem motivo.
Registre no caderno, em poucas linhas, onde a parte anterior termina e as notas de estilo e continuidade que a parte nova precisa seguir. Na fase 3, o humano confere essa ponte.

**1a. Escaleta** (uma linha por página): página → episódio → trecho do original → o que acontece → que fio planta ou colhe. Mais a lista do que fica de fora (ou do que foi acrescentado) e por quê.
✋ **Mostre a escaleta ao humano na própria sessão antes de escrever o texto.** Mudar a escaleta custa um minuto; mudar um texto pronto custa uma reescrita e, se já houver, tradução e narração de novo.

**1b. Texto**, direto no arquivo do livro, em rascunho (§4), e a entrada no `acervo.js` passa a `situacao: 'rascunho'`. O motor funciona sem arte ("Ilustração a caminho" e emojis nas camadas), então o humano já pode ler no tablet.
- **Capa**: obra + título da parte e um "Nesta parte da história…" de 3 parágrafos curtos, sem estragar surpresas.
- **Primeira página**: ponte com a parte anterior.
- **Cada página**: 2 a 4 parágrafos curtos; o título do capítulo também é lido (a "frase 0").
- **Palavras-chave**: 25 a 30 por parte, `{{PALAVRA|SÍ • LA • BAS|emoji}}`, sempre no texto (nunca na cena). Repita de propósito algumas das partes anteriores.
- **Palavras difíceis que fazem parte da história** ficam, explicadas no próprio texto ("os odres: grandes sacos de couro, cheios de vinho"). Nomes divertidos do autor ficam.
- **Falas** com travessão; evite abreviações com ponto (Sr., Mr.), que cortam a frase na leitura guiada.
- Se a página tem atividade, o texto **convida** a criança no ponto certo ("Ajude o bom Sancho a lembrar…").
- `npm run build` e conferência no Chromium (retrato e paisagem): texto inteiro visível, frases e palavras-chave funcionando.

### Fase 2: Interações e visual
**Atividades** (crivo no §6.2): 3 ou 4 por parte, alternadas com páginas calmas (evite três páginas de atividade seguidas). Para cada uma: o que a criança faz, por que nasce da história, o que treina, o tipo no motor e como a cena muda. Um tipo de cartão novo é descrito aqui e programado na fase 4.

**Visual de cada página**: o que a ilustração mostra, os toques na cena (hotspots) e o que é **camada** × **ilustração inteira** (`AGENTS.md` §4.2). Se a obra tem um recurso visual próprio, planeje-o aqui seguindo a receita específica (em *Dom Quixote*, a tabela Realidade × Imaginação).

**Lista de arte**: cenas e camadas, referências e o que cada cena deve deixar livre para as camadas. Para a API, já escreva a lista `tools/arte/<livro>-parte-N.mjs` e rode `--seco` para saber o custo.

### 🛑 Fase 3: Revisão humana do texto e do plano
O humano lê o rascunho **no tablet, com a criança**, na voz do aparelho, com o plano da fase 2 ao lado (no caderno). Roteiro de observação no §7.3. As notas vêm no prompt da sessão seguinte (ou no chat), e o agente as registra no caderno.
- Depois dos ajustes, **a estrutura fica congelada**: número de páginas, ordem, numeração dos capítulos e nomes de arquivo. Mudar isso depois da arte gera renomeações em cadeia.

### Fase 4: Ilustrações e atividades
1. **Quem faz e com qual verba** (`AGENTS.md` §0.3): o humano escolhe o agente. Pela API paga (o único caminho do Claude; para o Gemini, quando a cota do plano Pro acabar), só com autorização expressa no prompt da sessão; antes, some o gasto do mês (`docs/arte/gastos.csv` + `docs/narracao/gastos.csv`) e confira o teto. O Gemini no Antigravity pode gerar direto, sem custo extra, enquanto a cota permitir. A lista de arte da fase 2, no caderno, serve para qualquer um dos caminhos.
2. **Rodadas** (`ARTE-PELA-API.md` §3 e §5):
   - rodada 1: as cenas sem dependência e as camadas soltas;
   - rodada 2: as variações (no caso de *Dom Quixote*, as Imaginações) e as camadas que usam a cena como referência;
   - rodada 3: só o que falhou, com o prompt corrigido.
   Olhe **cada** imagem antes de aceitar.
3. **Integração**: posicione as camadas **pela arte entregue**, não pelo plano; personagens em escala proporcional à perspectiva; camadas sempre em `.webp`.
4. **Programe** as atividades e os tipos de cartão novos.
5. **Teste** no Chromium/Playwright em 800 × 1280 e 1280 × 800, cada atividade até o fim (clique com `locator.click()`), o botão 🔄 Recomeçar e a virada de página. Mande ao humano capturas das páginas com atividade.

### 🛑 Fase 5: Revisão final
O humano lê o livro ilustrado (ainda rascunho) com a criança. Ajustes pequenos entram na mesma sessão.
- Depois do "aprovado", **o texto fica congelado**: qualquer mudança custa regravar a narração e refazer as traduções.

### Fase 6: Narração em português (API)
Só com autorização no prompt da sessão (`TODO-NARRACAO.md`):
1. `npm run exportar:frases`, o **roteiro** (quem fala cada trecho) e o **elenco** (as mesmas vozes para os mesmos personagens em todo o livro).
2. Planeje com `--seco`. Grave com `--pagina-inteira` no Flex, as palavras-chave em grupos, e confira tudo no Whisper local (no máximo 2 tentativas).
3. Escreva `docs/narracao/qa-parte-N.md` com o que vale o humano ouvir (no rascunho, com `?narracao=1`).

🛑 **Escuta do humano.** Depois, a **publicação** (§4) e o `fim.proxima` da parte anterior apontando para esta.

### Fase 7: Outros idiomas (só com o português aprovado e autorização do humano)
1. **Traduções** (`AGENTS.md` §2.8): um agente por idioma, cada um no dia a dia de uma criança daquele idioma, com as palavras-chave silabadas no idioma e os cartões do tipo `ordem` adaptados. `npm run conferir:traducoes` sem avisos.
2. **Narração** de cada idioma, depois do "ok" do humano às traduções, com o mesmo fluxo da fase 6 (`--idioma`).
3. Sempre que der, a revisão de um leitor nativo (BACKLOG M-12).

### Fase 8: Fechamento e retrospectiva
- `npm run build`, os testes e a entrega na `main`: antes, **mescle a `main` do remoto na sua branch** (outro agente pode ter entregado algo em paralelo) e resolva os conflitos; se algum não tiver solução que preserve o trabalho dos dois lados, pergunte ao humano (`AGENTS.md` §6).
- Atualize o `docs/BACKLOG.md`, o `docs/HISTORICO.md`, o `docs/RETOMADA.md`, o caderno e o quadro do plano do livro.
- Some o que foi gasto na parte e informe ao humano.
- **Pergunte: o que aprendemos?** Toda lição nova entra no §8 (geral) ou no diário da receita específica.

---

## 6. Regras de ouro por área

### 6.1 Texto
- Uma ideia por frase. Verbos concretos, imagens vivas ("como um rio vermelho"), diminutivos e humor cabem.
- Evite arcaísmos e palavras de livro antigo (vossa mercê, donzela, estalagem, desventurada, carmesim), ênclises e mesóclises rebuscadas e adjetivos empilhados.
- Todo evento responde a três perguntas da criança: **por que** aconteceu, **o que** aconteceu e **o que mudou** depois.
- Histórias dentro da história quase sempre saem; quando ficam, saem resumidas numa fala curta e **com o conteúdo do autor** (se no original ela é fantasia, continua fantasia: nada de explicações "realistas" inventadas).
- **A segunda metade da parte merece o mesmo cuidado da primeira.** Na nova Parte 4 de Dom Quixote, o humano sentiu a qualidade cair do meio para o fim ("cansativa"). Antes de entregar, releia as últimas páginas como se fossem as primeiras: cada uma com uma graça própria, sem lição de moral pendurada no fim, sem explicar o que a cena já mostra. Uma página que passa de 5 parágrafos provavelmente são **duas** (e ganha uma ilustração a mais).
- **Tratamentos carinhosos**: personagens que se gostam se chamam com carinho ("minha Teresinha", "meu bem"). Um vocativo seco repetido ("mulher!") soa ríspido ou machista para o leitor de hoje.
- **Comando da atividade em quadro separado (regra mandatória, 2026-10-25)**: o convite ou instrução da atividade (ex.: "Descubra as letras...") **nunca** deve entrar no meio dos parágrafos da narrativa. Ele fica num campo próprio da página (`comandoAtividade: '...'`), exibido num quadro destacado (`.quadro-atividade`), de leitura opcional, com um botão de alto-falante (🔊) exclusivo que só fala ao ser tocado. A narração automática da página ("Ouvir Página") **nunca** lê o comando da atividade.

### 6.2 Atividades: o crivo e o padrão ouro
**O crivo** (todas as respostas precisam ser "sim"):
1. Nasce de algo que **acontece na história** naquela página?
2. A criança **ajuda um personagem** a fazer algo que a história precisa?
3. A cena **muda de verdade** quando ela termina?
4. Treina alguma coisa: **leitura, sílabas, letras, contagem** ou, no mínimo, observação de causa e efeito?
5. É **curta** (até 5 toques, cerca de 1 minuto) e o erro gera só uma **dica gentil**? (Exceção decidida pelo humano: as **pegadinhas** do tipo `pedido` recomeçam a brincadeira, sempre com uma fala engraçada que explica o porquê.)
6. **A criança precisa ler (ou contar, ou observar) para acertar?** Se tocar em qualquer cartão já funciona, não há aprendizado (o 1º piquenique da nova Parte 4 de Dom Quixote foi reprovado por isso). Cartões de leitura vão **sem emoji**, que entregaria a resposta.

**A recompensa**: nas páginas com atividade, a variação mágica da cena (em Dom Quixote, a Lente da Imaginação) fica **trancada até a criança acertar** (regra do humano, 2026-10-25; o motor faz sozinho, `AGENTS.md` §2.5).

**Padrão ouro: a assinatura da carta** (*Dom Quixote*, Parte 3, cap. 18, nota 10 do humano). Sancho esqueceu a carta e não lembra como Dom Quixote assina; a criança toca nas palavras na ordem certa: O CAVALEIRO DA TRISTE FIGURA.
- O problema vem da história; a criança ajuda um personagem.
- O que ela manipula são palavras de verdade, que ela lê.
- Retoma algo que ela já conhece (o apelido de uma parte anterior): reconhecimento e orgulho.
- Cada palavra é falada ao ser colocada (ouvir + ver = ler).
- Ao completar, a cena muda ("Sancho lembrou!") e a história segue.
- Funciona em todos os idiomas (a tradução pode ter outra quantidade de palavras).

**Cardápio de mecânicas**:
| Mecânica | O que treina | Tipo no motor | Exemplo |
| :--- | :--- | :--- | :--- |
| Ordenar as palavras de uma frase curta (até 5) | leitura de palavras, ordem da frase | `ordem` | assinatura da carta ⭐ |
| Juntar sílabas para formar uma palavra | consciência silábica | `ordem` com sílabas (testar) | (ideia) uma palavra que um personagem inventa |
| Contar com a voz | números | `contagem` | as cabras no barco |
| Revelar o que está escondido | observação, causa e efeito | `camadas` com `ate` | o sopro na poeira, o sol na noite, a bengala |
| Montar a cena com as palavras do texto | vocabulário (palavra ↔ coisa) | `camadas` | a mesa dos pastores, a mala |
| Achar a palavra da figura entre pegadinhas quase iguais | leitura atenta (PÃO × PIÃO, QUEIJO × QUEIXO) | `pedido` | o lanche de Sancho (Dom Quixote, Parte 4) |
| Montar uma palavra letra por letra | letra e som | **tipo novo** (a criar) | (ideia) uma gráfica, um bilhete |
| Disparar um efeito físico da história | causa e efeito | `acao` / `camadas` + efeito | o VENTO nos moinhos, a cambalhota |

Varie as mecânicas dentro da parte.
- **Banido**: cartões que só fazem a cena tremer e celebrações soltas (tipo `livre`).
- **Ilustrações cumulativas** pedem ordem fixa (`progressivo`). Escolher a etapa pela **quantidade** de itens usados troca a cena errada. Se a ordem for livre, use camadas independentes.

### 6.3 Ilustração
- O estilo da coleção é o mesmo em todos os livros: aquarela e guache infantil com contornos suaves de lápis de cor, pelo Nano Banana (`AGENTS.md` §4.1).
- Gere primeiro a cena-base e depois as variações como edição dela, com as fichas e as cenas aprovadas como referência.
- **Camadas sobre magenta puro `#FF00FF`**, nunca sobre branco; recorte com `tools/recortar-camada.py` (`--sem-rosa`, `--sem-contorno`). No código, a camada aponta para o **`.webp`**.
- Diga o que **não** pintar onde vai uma camada; peça objetos **seguros nas mãos** (senão flutuam); diga quais animais e pessoas estão na cena (o modelo acrescenta personagens recorrentes).
- Sem texto legível na imagem. Nunca achatar recortes numa cena pronta.
- Personagens novos nascem numa página e servem de referência para as seguintes; isso define a ordem das rodadas.
- **Continuidade (fantasias, montarias, objetos)**: recorte o personagem da arte aprovada, passe o recorte como referência e mande **copiar** ("EXACTLY as in the second reference image (copy them)"); para consertar uma imagem quase boa, peça uma **edição** dela ("Repaint the first reference image EXACTLY ... ADD ONLY ..."). Detalhes e o que deu errado: `ARTE-PELA-API.md` §4.3.
- **Quem está na cena da história está na ilustração** (o padre que acompanha a viagem não pode sumir de uma página), e cada um com a sua montaria.
- **Olhe cada imagem também como um adulto atento**: nada que lembre símbolo de ódio, violência ou grupo real (o lençol branco com capuz pontudo dos "magos" da Parte 4 de Dom Quixote veio parecendo a Ku Klux Klan e foi refeito). Fantasia caseira = chapéu de papelão e cabeça descoberta.
- Monstros e seres mágicos com a atmosfera da obra; descreva o rosto ("gentle face, kind ordinary eyes"), nunca assustador para a idade.

### 6.4 Narração
- **Página inteira** num pedido só, com a narradora e uma voz por personagem, a mesma em todas as partes do livro.
- **Voz de criança por descrição é bloqueada** pela API: use a voz mais jovem da biblioteca. Não tente contornar.
- Limite de 100 pedidos por dia: cache de blocos e palavras-chave em grupos de até 10.
- A conferência é **local** (Whisper). A API paga só produz vozes.
- Nomes estrangeiros com pronúncia anotada (`TODO-NARRACAO.md` §5).

### 6.5 Traduções
- Só depois do português aprovado.
- O `hash` de cada página mostra o que ficou desatualizado (`npm run conferir:traducoes`).

### 6.6 Engenharia
- Um motor só (`assets/js/livro.js`); cada parte é só configuração. Melhoria no motor vale para todos os livros.
- `npm run build` depois de mudar HTML, classes, ícones ou imagens; nunca edite `sw.js` à mão.
- Conteúdo antigo é arquivado (`docs/arquivo/`, `imagens/acervo/` ou o histórico do Git), nunca apagado sem substituto.

### 6.7 Custos de referência (out/2026)
| Item | Custo real | Observação |
| :--- | :--- | :--- |
| Arte de uma parte pela API (~22 imagens, Batch) | ~US$ 0,80 | ~US$ 0,037 por imagem aceita, já com as refeitas |
| Narração em português de uma parte (Flex) | ~US$ 0,08 | páginas inteiras + palavras-chave |
| Narração de uma parte em outro idioma | ~US$ 0,08 por idioma | |
| Traduções (agentes) | US$ 0 | sem API paga |
| **Parte completa em 4 idiomas** | **~US$ 1,20** (≈ R$ 7) | teto do humano: R$ 30/mês |

---

## 7. Modelos

### 7.1 Caderno da parte (`docs/cadernos/<livro>-parte-N.md`)
```markdown
# Caderno — <Livro>, Parte N: <título>
Arquivo: <livro>/parte-N.html (rascunho: sim/não) · Trecho do original: … · Nossos capítulos: …

| Fase | Situação | Data | Commit/PR | Gasto |
| :--- | :--- | :--- | :--- | :--- |
| 1 Adaptação e texto | ⬜ / 🟡 / ✅ | | | — |
| 2 Interações e visual | | | | — |
| 3 Revisão humana 🛑 | | | | — |
| 4 Ilustrações e atividades | | | | US$ |
| 5 Revisão final 🛑 | | | | — |
| 6 Narração (pt) + escuta 🛑 | | | | US$ |
| Publicação | | | | — |
| 7 Idiomas (en, fr, es) | | | | US$ |
| 8 Retrospectiva | | | | — |

## 0. Onde a parte anterior termina (leitura obrigatória da fase 1.0)
Partes lidas: … · Como a anterior termina: … · Notas de estilo e continuidade: … · O que não repetir: …
## 1. Escaleta
| Pág. | Capítulo nosso | Episódio | Original | O que acontece | Fio (planta/colhe) |
## 2. O que ficou de fora (ou foi acrescentado) e por quê
## 3. Atividades (crivo do §6.2)
## 4. Visual de cada página (e o recurso próprio da obra, se houver)
## 5. Notas do humano e o que mudou
## 6. Arte (lista, rodadas, refeitas, gasto)
## 7. Narração (elenco, QA, gasto)
## 8. Traduções
## 9. Lições (para a receita geral ou a específica)
```

### 7.2 Prompt para abrir uma sessão (qualquer agente)
```text
Leia AGENTS.md, docs/RETOMADA.md e o caderno docs/cadernos/<livro>-parte-N.md.
Faça a(s) fase(s) <X> da Parte N, seguindo docs/RECEITA-CLASSICO-VIVO.md, a receita específica
docs/receitas/<LIVRO>.md e o plano docs/PLANO-<…>.md.
Minhas notas da revisão: <…>            (quando houver)
Autorizo a API paga do Gemini para <produzir X da Parte N>, até US$ <teto>.   (só se for usar a API: fases 4, 6 e 7)
Ao terminar, mescle a main do remoto, resolva os conflitos e entregue na main.
Pare na próxima parada 🛑 e me diga o que ler.
```

### 7.3 Roteiro de observação para o humano (fases 3 e 5)
- Ao fim de cada página, peça à criança para **recontar** com as palavras dela. Onde ela travou?
- Alguma pergunta do tipo **"por que ele fez isso?"** ou **"quem é esse?"** Isso indica evento sem motivo ou personagem não apresentado.
- Alguma **palavra** fez a leitura parar? Algo assustou ou incomodou a criança (ou você)?
- Alguma página **longa demais** (a criança se dispersou)?
- Na atividade: ela **quis** fazer? Entendeu **sem ajuda**? Ficou **frustrada**? Pediu para **repetir**?
- A ligação com a parte anterior faz sentido? O estilo é o mesmo das partes já lidas? Algo se repetiu ou ficou incoerente? O fim dá vontade de ler a próxima?
- Fase 5: as ilustrações **surpreendem**? Alguma imagem contradiz o texto?

---

## 8. Diário de lições gerais (mais recente primeiro)

As lições que só valem para *Dom Quixote* ou para a condensação de obras longas estão no diário de [`receitas/DOM-QUIXOTE.md`](receitas/DOM-QUIXOTE.md).

| Data | Lição | Origem | Virou regra em |
| :--- | :--- | :--- | :--- |
| 2026-10-25 | A qualidade do texto caiu na segunda metade da parte e uma página longa cansou: revisar o fim com o cuidado do começo e dividir páginas longas | humano (Dom Quixote, Parte 4 nova, fase 5) | §6.1 |
| 2026-10-25 | Atividade em que qualquer toque funciona não ensina: a criança precisa ler para acertar; a variação mágica da cena vira recompensa, trancada até o acerto | humano | §6.2, `AGENTS.md` §2.5 |
| 2026-10-25 | Continuidade de personagens entre páginas: recortar da arte aprovada e mandar copiar; consertar por edição | arte (Parte 4 nova, fase 5) | §6.3, `ARTE-PELA-API.md` §4.3 |
| 2026-10-25 | "Mulher!" como vocativo soou ríspido: tratamentos carinhosos entre quem se gosta | humano | §6.1 |
| 2026-10-25 | Lençol branco + capuz pontudo saiu com cara de Ku Klux Klan: toda imagem é olhada também atrás de símbolos de ódio e violência | Dom Quixote, Parte 4 nova (arte) | §6.3 |
| 2026-10-25 | O comando das atividades não deve poluir a narrativa nem ser lido automaticamente; fica num quadro destacado de leitura opcional com botão 🔊 próprio | humano | §6.1, §6.2, AGENTS §2.5 |
| 2026-10-25 | Quem escreve a parte seguinte precisa ler o texto final das partes publicadas, sobretudo o final da anterior, para não quebrar estilo nem continuidade (a Parte 4 antiga começava contradizendo o fim da Parte 3) | humano | §5 fase 1.0 |
| 2026-10-25 | A receita precisa separar o que é geral do que é próprio de uma obra ou de um tipo de adaptação | humano | §2, `receitas/` |
| 2026-10-25 | Obras em produção aparecem na estante só como teaser com cadeado; o adulto abre os rascunhos pela página "Para adultos". Nada de "próximos clássicos" vagos | humano | §4 |
| 2026-10-25 | A atividade nota 10 ajuda um personagem com palavras do próprio texto e retoma algo já conhecido | humano | §6.2 |
| 2026-10-25 | Texto rebuscado demais para 6 anos obrigou a reescrever três partes e a refazer traduções e narração | humano | §1, §5 fase 1, `AGENTS.md` §3.5 |
| 2026-10-25 | Traduzir e narrar antes de o português estar aprovado gera retrabalho em cascata | histórico | §5 fases 5 a 7 |
| 2026-10-24 | Acrescentar uma página depois da arte começada obrigou a renomear arquivos em cadeia | Dom Quixote, Parte 2 (P-007) | §5 fase 3 |
| 2026-10-24 | Camadas apontando para `.png` não carregavam | Dom Quixote, Partes 2 a 4 | §6.3 |
| 2026-10-24 | Página inteira num pedido só soa muito melhor que frase por frase | escuta do humano | §6.4 |
| 2026-10-24 | Voz de criança por descrição é bloqueada pela API; limite de 100 pedidos por dia | narração | §6.4 |
| 2026-10-24 | O modelo de imagem acrescenta personagens recorrentes onde não estão | arte | §6.3 |
| 2026-10-23 | Camadas recortadas de fundo branco perdem as partes claras e ficam com "chão" e halo; magenta resolve | P-003/P-005 | §6.3 |
| 2026-10-23 | Camadas pequenas demais parecem coladas: escala proporcional à perspectiva | humano | §5 fase 4 |
| 2026-10 | Etapas cumulativas escolhidas pela quantidade de itens trocavam a cena errada | sprint 1 | §6.2 |
| 2026-10 | Cartões que só fazem a cena tremer são ruído | sprint 1 | §6.2 |
