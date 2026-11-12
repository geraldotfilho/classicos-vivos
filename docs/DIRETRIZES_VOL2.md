# DIRETRIZES_VOL2 — guia de uma página para escrever e revisar as Partes 5 a 8 de Dom Quixote

Resumo operacional para agentes e subagentes (2026-11-10). Condensa `AGENTS.md`, a receita geral, a receita de Dom Quixote e as notas de revisão do humano na Parte 4. **Com este arquivo, o plano ([`PLANO-DOM-QUIXOTE-VOLUME-2.md`](PLANO-DOM-QUIXOTE-VOLUME-2.md)) e o caderno da parte, não é preciso reler os outros documentos.** Em conflito, valem os originais.

## 1. Orçamento e método (pedido do humano)
- **Sem API paga** (imagens e narração) até o humano autorizar no prompt. Só texto e estrutura.
- **Não baixar nem ler o original de Cervantes**: use o conhecimento interno.
- Trabalho **em fila**, uma parte por vez, commit a cada entrega. Subagentes só quando compensam: o orquestrador escreve e decide; um **crítico de contexto limpo** audita o rascunho; tarefas mecânicas vão para o modelo mais barato.
- Ciclo de uma parte nesta fase: ler o fim da parte anterior → escaleta no caderno → texto em `dom-quixote/parte-N.html` (`rascunho: true`) → atividades e visual no caderno → crítica adversarial → polimento → `npm run build` + teste nos dois tamanhos de tablet → commit → 🛑 parar para o humano.

## 2. Leitor e voz
- Uma criança de **6 anos** ouvindo um adulto ler. Narrador caloroso, humor gentil, falas com travessão.
- **Frases curtas, ordem direta, uma ideia por frase.** Palavras do dia a dia do Brasil ("o senhor", "meu amo", "pertinho", "que nem gelatina"). Diminutivos e onomatopeias cabem (TÓIM!, PUF!).
- **Proibido**: vossa mercê, donzela, estalagem, aposento, desventurada, ênclise e mesóclise ("fê-lo"), adjetivos empilhados, "hão de", palavras de livro antigo. Sem abreviações com ponto (Sr.). Sem asteriscos. Sem quebrar a ficção ("lá na Parte 2").
- Palavra difícil que faz parte da história fica, **explicada na própria frase** ("os odres: grandes sacos de couro"). Nomes divertidos de Cervantes ficam.
- **Não explique o óbvio** nem pendure **lição de moral** no fim da página: termine com uma imagem ou uma piada. Uma piada boa por cena.
- **Todo evento tem motivo e consequência**; ninguém aparece sem ser apresentado; quem viaja junto não some.
- Tratamento carinhoso entre quem se gosta ("minha Teresinha"); nunca "mulher!".
- Bordões e fatos fixos: mestre Nicolau (o barbeiro amigo), o padre, a sobrinha Antônia, a governanta, Teresa e Sanchica, o **bacielmo**, a "janelinha" de dois dentes, "Lá vai ele de novo!", "Boa noite, Dulcineia". Sancho **não sabe ler**. O texto nunca muda com a lente.
- **A segunda metade merece o cuidado da primeira** (foi onde a Parte 4 cansou).
- **Humor de fazer rir e mistério que prende** (nota do humano na Parte 5, 2026-11-12): texto "bom" não basta. Cada página precisa de **uma cena de riso** de verdade (corpo, bicho, comida, resposta esperta de Sancho; quase sempre já está em Cervantes) e a parte precisa de **um mistério que atravessa as páginas**: uma pergunta plantada cedo, pistas pequenas no fim de algumas páginas (um barulho, uma sombra, uma voz conhecida) e a resposta mais adiante. Termine páginas com uma pergunta ou um "tlim... tlim...", não com um resumo.

## 3. Tamanho e forma
- Parte = capa + **8 a 11 capítulos**; cada página = **um episódio**, **3 a 5 parágrafos** (6 é sinal de que são duas páginas). 1 a 3 capítulos de Cervantes por página; nunca mais de 25 por parte.
- Capa: "Nesta parte…" em 3 parágrafos, sem estragar surpresas. Primeira página: ponte com o fim da parte anterior. Última: gancho leve (o teaser fica no `fim.mensagem`).
- **Palavras-chave**: 25 a 30 por parte, 2 a 4 por página: `{{PALAVRA|SÍ • LA • BAS|emoji}}`, só no texto; repetir de propósito algumas já ensinadas.
- Título do capítulo: `'🦁 Capítulo 41 • Nome'` + `titulo` (os dois são lidos em voz alta).

## 4. Proteção da infância
Sem violência como eixo, humilhação como piada, medo gratuito, castigo físico, conteúdo adulto ou preconceito. Sem morte em cena. Mentira que engana Dom Quixote só quando é **por carinho** (os amigos) e o texto deixa isso claro. **O medo protege**: perigo real (um leão!) nunca é "coragem bonita"; alguém sensato diz isso na cena, sem sermão.

## 5. Atividades (3 por parte, nunca em páginas seguidas demais)
Crivo, tudo "sim": nasce da página · a criança **ajuda um personagem** · a cena **muda** · treina leitura/sílabas/letras/ordem · até 5 toques, erro = dica gentil · **só acerta quem lê** (cartões de leitura com o **mesmo emoji**, para ele não entregar a resposta).
- O convite vai em `comandoAtividade` (quadro separado, nunca no texto) e **não dá a resposta**.
- A Lente da Imaginação é a **recompensa** (o motor tranca sozinho).
- Tipos prontos no motor: `ordem` (palavras, sílabas ou letras), `pedido` (figura + palavras com pegadinhas quase iguais), `progressivo` (etapas em ordem fixa), `camadas`, `contagem` (só se contar for necessidade da história), `acao`. Variar dentro da parte; não repetir a mesma brincadeira de outra parte. Banido: cartão que só enfeita.
- Padrão ouro: a assinatura da carta (Parte 3): problema da história + palavras de verdade + algo que a criança já conhece.

## 6. Lentes (recurso de Dom Quixote)
- Realidade = o mundo como é; Imaginação = como Dom Quixote vê, **transformando tudo** (cavaleiro dourado, corcel branco, mundo de conto de fadas), só com os personagens que estão na Realidade.
- **Nem toda página tem lente**: página da vida real ou história contada fica sem `imag`. No volume 2, quem engana é o mundo (gente fantasiada): a Realidade mostra o disfarce/bastidor; a Imaginação, o que os heróis acreditam ver. Se quem imagina não é Dom Quixote (ex.: o medo de Sancho), a legenda diz.
- Legendas: `'👓 Lente da Realidade: …'` e `'✨ Lente da Imaginação: …!'`; sem lente: `'🐐 Legenda simples'`.

## 7. Estrutura do arquivo
Copie o esqueleto de `dom-quixote/parte-5.html` (só `window.LIVRO`; motor em `assets/js/livro.js`, nunca copiado). Campos por página: `capitulo`, `corCapitulo`, `titulo`, `comandoAtividade?`, `texto`, `cena { real, imag?, emoji, alt, legendaReal, legendaImag?, hotspots?, camadas?, cartoes? }`. Imagens `pN-real.webp`/`pN-imag.webp` em `imagens/parte-N/` (N = índice da página); sem o arquivo, o motor mostra "Ilustração a caminho". Hotspots de página sem arte são provisórios (posição real só com a arte). Rascunho: `rascunho: true` + entrada `situacao: 'rascunho'` em `assets/js/acervo.js`. Depois: `npm run build`.

## 8. Teste (grátis)
`python3 -m http.server 8765` e Playwright/Chromium em 800×1280 e 1280×800: `…/dom-quixote/parte-N.html?page=P&adulto=1` (`&imag=1` abre a Imaginação). Clicar cartões com `locator.click()`. Conferir: texto inteiro, palavras-chave, cada atividade até o fim, 🔄 Recomeçar, sem erros no console.

## 9. Papel do crítico adversarial (subagente de contexto limpo)
Simula o humano: pai exigente que lê com o filho de 6 anos. Procura, página por página: palavra ou construção rebuscada; frase longa; evento sem motivo ("por que ele fez isso?", "quem é esse?"); piada fraca ou repetida; moral pendurada; página cansativa (sobretudo na segunda metade); quebra de continuidade com a parte anterior; atividade que não passa no crivo; qualquer coisa que um pai vetaria. Entrega: nota por página (0–10), **os 10 problemas mais graves com a correção sugerida** e o que está bom e não deve ser mexido. Não reescreve o livro.
