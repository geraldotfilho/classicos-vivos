# DIRETRIZES_ROBIN_HOOD — guia de uma página para escrever e revisar *Robin Hood*

Resumo operacional para agentes e subagentes (atualizado em 2026-11-21 após aprovação da Fase 0). Condensa `AGENTS.md`, a receita geral ([`RECEITA-CLASSICO-VIVO.md`](RECEITA-CLASSICO-VIVO.md)) e a receita específica ([`receitas/ROBIN-HOOD.md`](receitas/ROBIN-HOOD.md)). **Com este arquivo, o plano ([`PLANO-ROBIN-HOOD.md`](PLANO-ROBIN-HOOD.md)), a pesquisa ([`pesquisa/ROBIN-HOOD.md`](pesquisa/ROBIN-HOOD.md)) e o caderno da parte, não é preciso reler outros documentos.** Em conflito, valem os originais.

## 1. Orçamento, isolamento e método
- **Sem API paga** (imagens e narração) até o humano autorizar no prompt. Nas Fases 0–3, só texto, pesquisa e estrutura (custo US$ 0,00).
- **Isolamento paralelo com Dom Quixote**: não mexer em `dom-quixote/`, `assets/js/livro.js`, `assets/css/livro.css` nem em `tools/`. Trabalhar sempre em branch própria e, na entrega, trazer a `main` do remoto antes de rodar `npm run build` (`AGENTS.md` §6).
- **Fatos conferidos**: nenhum fato histórico/folclórico entra no texto sem estar como ✅ em [`pesquisa/ROBIN-HOOD.md`](pesquisa/ROBIN-HOOD.md).
- **Trabalho em fila**, uma parte por vez (são **5 partes**), commit a cada entrega. Subagentes só quando compensam: o orquestrador escreve e decide; um **crítico de contexto limpo** audita o rascunho; tarefas mecânicas vão para o modelo mais barato.
- **Ciclo de uma parte**: (em partes 2+) ler o fim da parte anterior (`fase 1.0`) → escaleta no caderno (✋) → texto em `robin-hood/parte-N.html` (`rascunho: true`) → atividades e visual no caderno → crítica adversarial → polimento → `npm run build` + teste nos dois tamanhos de tablet → commit → entrega na `main` → 🛑 parar para o humano.

## 2. Leitor, voz e pilares da história
- Uma criança de **6 anos** ouvindo um adulto ler. Narrador caloroso, ritmo ágil e alegre, falas com travessão.
- **Frases curtas, ordem direta, uma ideia por frase.** Palavras do dia a dia do Brasil ("o senhor", "compadre", "no meio da mata", "de ponta a ponta"). Diminutivos e onomatopeias cabem (ZUP!, PLOF!, TÁ-DÁ!).
- **Proibido**: arcaísmos pesados ("vossa mercê", "outrossim", "estalagem", "aposento", "fê-lo", "hão de"), adjetivos empilhados, abreviações com ponto (`Sr.`), asteriscos e quebras de ficção ("lá na Parte 2").
- Palavras da época (xerife, aljava, tributo, capuz, barão) ficam, **explicadas na própria frase** ("a aljava: a bolsa de couro onde iam as flechas").
- **Não explique o óbvio** nem pendure **lição de moral** no fim da página: termine com uma imagem, uma risada ou um gancho leve.
- **3 pilares orgânicos (nunca viram sermão)**:
  1. **Impostos desiguais e o Rei alienado**: o **Rei Ricardo** não é um "salvador bondoso viajando"; ele vive encastelado entre almofadas e cortinas de veludo no palácio de Nortigão, achando-se muito bom, mas totalmente alheio à vida do povo, e aprova o imposto extra sugerido pelo **Xerife de Nortigão** para bancar suas festas. A cobrança igual ("dois sacos para todos") não pesa para o barão rico e tira o pão do moleiro pobre; o bando devolve o que foi tomado injustamente (enquanto o Xerife tenta rotulá-los de "ladrões").
  2. **Presos injustos e provas**: o bando solta quem foi trancado sem provas e aprende a checar pistas e vestígios antes de julgar.
  3. **Pressão social e Estado justo**: ao longo da série o povo perde o medo e se mobiliza até obrigar o Rei a sair do palácio e mudar as leis — conquistando impostos justos e um corpo independente de investigadores das provas (peritos, referência discreta à autonomia constitucional da Polícia Científica no Brasil).
- **Nomes fixos de lugares e personagens**:
  - **Lugares aportuguesados**: **Vila do Moinho** (aldeia de Robin e Mestre Tomé), **Nortigão** (*Nottingham*) e **Floresta de Xervedo** (*Sherwood*).
  - **Personagens**: só **Robin Hood** não é aportuguesado; **Mestre Tomé** (o moleiro, pai de Grilo, homem negro), **Grilo** (*Much* em inglês, menino pardo), **Lady Mariana** (variando entre *Lady Mariana* e *Mariana*, jovem negra, Mentora da Mata), **João Pequeno** (lenhador e ferreiro que teve as ferramentas tomadas pelo Xerife), **Rei Ricardo**, **Rainha Leonor**, **Xerife de Nortigão**; nas partes seguintes, *Frei Tuco*, *Gui Escarlate*, *Alan do Vale*, *Dom Ricardo do Vale*.
- **Diversidade sem rotulagem assimétrica no texto**: elenco diverso em toda a obra (incluindo Lady Mariana como jovem negra, Mestre Tomé negro e Grilo pardo). **Regra editorial**: a representatividade visual brilha nas ilustrações; no texto literário, **não** se rotula a cor da pele apenas dos personagens negros enquanto os brancos ficam sem descrição racial (descreva todos pelo estilo, presença, roupas e ações).
- **Jornada do Herói (Joseph Campbell) e causalidade**: toda etapa tem motivação e transição lógica (ex.: Mundo Comum na Vila do Moinho com roupas comuns → escalada verbal que irrita o Xerife → encontro com a Mentora Mariana na beira da mata e entrega das roupas verdes → Travessia do Limiar na Ponte do Riacho Fundo → encontro e identificação de dor com João Pequeno → chegada ao Grande Carvalho → Resgate e embate moral "Ladrões × Devolver o pão tomado").

## 3. Tamanho e forma
- Parte 1 = capa + **11 capítulos** (12 páginas); cada página = **um episódio**, **4 parágrafos curtos (~170 a 195 palavras)**. Numeração contínua de capítulos entre as partes.
- Capa: "Nesta parte…" em 3 parágrafos curtos, sem estragar surpresas. Primeira página (partes 2+): ponte com o fim da parte anterior. Última: gancho forte para a próxima (`fim.mensagem`).
- **Palavras-chave**: ~30 por parte, 3 por página: `{{PALAVRA|SÍ • LA • BAS|emoji}}`, só no texto; repetir de propósito algumas já ensinadas.
- Título do capítulo: `'🏹 Capítulo N • Nome'` + `titulo` (os dois são lidos em voz alta).
- **"Você sabia?" (`voceSabia`)**: incluir 3 a 4 curiosidades curtas (para 6 anos) no campo `voceSabia` das páginas indicadas.

## 4. Proteção da infância
- **Zero sangue e zero mortes em cena**: sem morte do guarda florestal (Pyle cap. 1), sem forca (resgate na torre), sem morte de Guy of Guisborne, sem o epílogo triste de Kirklees.
- **Sem romantizar roubo**: os bens devolvidos são sempre impostos injustos cobrados de quem pouco tem.
- **Duelos de bastão** são disputas cômicas de equilíbrio que terminam em banho no riacho e amizade. **Arco e flecha** são para alvos e torneios de pontaria, nunca apontados para ferir alguém.

## 5. Atividades (3 por parte, com transformação real da gravura)
- Crivo, tudo "sim": nasce da página · a criança **ajuda um personagem** · **a gravura muda de verdade** (**proibido usar apenas emojis soltos como resultado da atividade!** Use `progressivo` com 4 gravuras reais ou `camadas` ilustradas em estilo papel recortado) · treina leitura/sílabas/letras/ordem · até 5 toques, erro = dica gentil · **só acerta quem lê** (cartões de leitura com o **mesmo emoji**, para ele não entregar a resposta).
- O convite vai em `comandoAtividade` (quadro separado, nunca no texto) e **não dá a resposta**.

## 6. Visual de cena e direção de arte (Opção C + Opção 1)
- **Estilo artístico (Opção C — Diorama de Papel Recortado / *Paper Cut-Out Craft*)**: planos com textura tátil de papel artesanal e sombras de profundidade entre as camadas, totalmente distinto de *Dom Quixote*.
  - **📌 Pendência antes de produzir as gravuras**: desenhar com o humano o método de produção com **cenários-base reaproveitáveis** + **colagem posterior de personagens em camadas independentes e animáveis**.
- **Recurso visual (Opção 1)**: **cena única + camadas (`camadas`) e `realCena` / `etapas` progressivas** — sem `imag` e sem chave da 2ª lente.

---

## 10. Método de Produção Literária em Três Camadas (Humano → Diretor Estratégico → Redator Hydrogen → Lapidador Opus 5.5)

Para garantir alta qualidade literária sem decaimento ao longo dos capítulos e com economia de cota, a redação segue esta arquitetura de 3 agentes no Swarm, capítulo por capítulo:

### 10.1. Os Papéis
1. **Humano (Autor e Diretor Geral)**: define a visão filosófica, política e pedagógica, aprova as escaletas e revisa os blocos de capítulos, apontando ajustes de motivação, ritmo ou psicologia dos personagens.
2. **Agente Principal — Diretor Estratégico e Showrunner (ex.: Gemini Argon / Pro)**:
   - **Não redige nem revisa o texto final sozinho.** Atua como *showrunner*: conversa com o humano, traduz as ideias dele em arquitetura narrativa (Jornada do Herói de Joseph Campbell, causalidade física e geográfica, divisão de capítulos para nada ficar corrido) e escreve **briefings de direção cirúrgicos, parágrafo por parágrafo**, para um capítulo de cada vez.
   - Controla rigorosamente a **extensão** (trava de **4 parágrafos curtos, ~170 a 195 palavras por capítulo**) e a **continuidade** (quem veste o quê, quem sabe o quê, o que não antecipar).
3. **Subagente 1 — Redator Inicial (`@escritor-hydrogen`, modelo `gemini-4-hydrogen-medium` / `flash`)**:
   - Recebe o briefing de direção de **um único capítulo** por vez.
   - Faz a estruturação rápida dos 4 parágrafos (~165–185 palavras), posiciona as 3 palavras-chave `{{PALAVRA|SÍ • LA • BAS|emoji}}`, o `comandoAtividade` e o `voceSabia`, e posta no quadro do Swarm chamando diretamente o `@revisor-opus`.
4. **Subagente 2 — Lapidador Literário (`@revisor-opus`, modelo `claude-opus-5-5-high`)**:
   - Recebe o rascunho enxuto do `@escritor-hydrogen` e tem **uma única missão**: dar **beleza literária, sensorialidade, sonoridade de leitura em voz alta e poesia do cotidiano para uma criança de 6 anos** (padrão Monteiro Lobato / Ruth Rocha / Ana Maria Machado), mantendo o teto rígido de 4 parágrafos curtos (~180–195 palavras) e sem alterar os fatos do roteiro.
   - Devolve ao `@coordinator [done]` o texto lapidado + 3 a 5 notas curtas explicando as escolhas estilísticas e apontando qualquer dúvida de título ou continuidade.

### 10.2. Template de Prompt do Diretor para o `@escritor-hydrogen` (1 capítulo por vez)
```markdown
@escritor-hydrogen Vamos produzir o **Capítulo N** (`<emoji> Capítulo N • <Título>`).
Escreva o rascunho enxuto e passe direto ao `@revisor-opus` para lapidar e entregar ao `@coordinator [done]`.

### Diretrizes de Direção Estratégica para o Capítulo N (Página N)
- **Cabeçalho (`capitulo`)**: `<emoji> Capítulo N • <Nome>`
- **Subtítulo (`titulo`)**: `<Subtítulo vivo>`
- **Teto rigoroso de extensão**: **4 parágrafos curtos** (~165 a 190 palavras no total).
- **3 palavras-chave de alfabetização**: `{{PALAVRA1|SÍ • LA • BAS|emoji}}`, `{{PALAVRA2|...}}`, `{{PALAVRA3|...}}`.
- **O que deve acontecer em cada parágrafo**:
  1. **Parágrafo 1 (<foco da cena 1>)**: <ação concreta, onde estão, como estão vestidos, ligação com o fim do capítulo anterior>.
  2. **Parágrafo 2 (<foco da cena 2>)**: <desenvolvimento, reação sensorial, fala curta com travessão>.
  3. **Parágrafo 3 (<foco da cena 3>)**: <ponto de virada do capítulo>.
  4. **Parágrafo 4 (<gancho ou fechamento da cena>)**: <consequência concreta sem antecipar planos futuros e sem lição de moral pendurada>.
- **(Quando houver) `comandoAtividade` / `voceSabia`**: <instrução clara>.
```

### 10.3. Diretrizes Permanentes do `@revisor-opus` (Claude Opus 5.5)
- **Trocar explicações de dicionário por imagens sensoriais e sons**: a criança de 6 anos entende pela cena (*chuá, chuá, chuá* da roda d'água; farinha *"macia como talco"*; o rei *"afundado em almofadas macias, atrás de cortinas de veludo"*; o Xerife *"vermelho feito tomate"*).
- **Verbos e gestos no lugar de adjetivos abstratos**: o personagem bate palmas, esfrega as mãos, esvazia um riachinho de dentro da bota, fica parado feito estátua.
- **Ritmo de leitura em voz alta**: frases curtas, ordem direta, onomatopeias naturais em português (`toc, tac, toc!`, `plof!`, `tuuu, tuuu, tuuu!`, `tum, tum, tum`), zero arcaísmos, zero abreviações com ponto (`Sr.`) e zero rótulos raciais assimétricos no texto.
- **Respeito ao teto de cota do modelo**: quando a cota diária do Claude Opus 5.5 se aproxima do fim, o Diretor agenda (`schedule`) a retomada para o horário exato de renovação da cota, nunca trocando o modelo de lapidação literária sem autorização do humano.
