# DIRETRIZES_ROBIN_HOOD — guia de uma página para escrever e revisar *Robin Hood*

Resumo operacional para agentes e subagentes (criado em 2026-11-21 no molde de [`DIRETRIZES_VOL2.md`](DIRETRIZES_VOL2.md)). Condensa `AGENTS.md`, a receita geral ([`RECEITA-CLASSICO-VIVO.md`](RECEITA-CLASSICO-VIVO.md)) e a receita específica ([`receitas/ROBIN-HOOD.md`](receitas/ROBIN-HOOD.md)). **Com este arquivo, o plano ([`PLANO-ROBIN-HOOD.md`](PLANO-ROBIN-HOOD.md)), a pesquisa ([`pesquisa/ROBIN-HOOD.md`](pesquisa/ROBIN-HOOD.md)) e o caderno da parte, não é preciso reler outros documentos.** Em conflito, valem os originais.

## 1. Orçamento, isolamento e método
- **Sem API paga** (imagens e narração) até o humano autorizar no prompt. Nas Fases 0–3, só texto, pesquisa e estrutura (custo US$ 0,00).
- **Isolamento paralelo com Dom Quixote**: não mexer em `dom-quixote/`, `assets/js/livro.js`, `assets/css/livro.css` nem em `tools/`. Trabalhar sempre em branch própria e, na entrega, trazer a `main` do remoto antes de rodar `npm run build` (`AGENTS.md` §6).
- **Fatos conferidos**: nenhum fato histórico/folclórico entra no texto sem estar como ✅ em [`pesquisa/ROBIN-HOOD.md`](pesquisa/ROBIN-HOOD.md).
- **Trabalho em fila**, uma parte por vez, commit a cada entrega. Subagentes só quando compensam: o orquestrador escreve e decide; um **crítico de contexto limpo** audita o rascunho; tarefas mecânicas vão para o modelo mais barato.
- **Ciclo de uma parte**: (em partes 2+) ler o fim da parte anterior (`fase 1.0`) → escaleta no caderno (✋) → texto em `robin-hood/parte-N.html` (`rascunho: true`) → atividades e visual no caderno → crítica adversarial → polimento → `npm run build` + teste nos dois tamanhos de tablet → commit → entrega na `main` → 🛑 parar para o humano.

## 2. Leitor e voz
- Uma criança de **6 anos** ouvindo um adulto ler. Narrador caloroso, ritmo ágil e alegre, falas com travessão.
- **Frases curtas, ordem direta, uma ideia por frase.** Palavras do dia a dia do Brasil ("o senhor", "compadre", "no meio da mata", "de ponta a ponta"). Diminutivos e onomatopeias cabem (ZUP!, PLOF!, TÁ-DÁ!).
- **Proibido**: arcaísmos pesados ("vossa mercê", "outrossim", "estalagem", "aposento", "fê-lo", "hão de"), adjetivos empilhados, abreviações com ponto (`Sr.`), asteriscos e quebras de ficção ("lá na Parte 2").
- Palavras da época que fazem parte da história (xerife, aljava, escudo, tributo, capuz) ficam, **explicadas na própria frase** ("a aljava: a bolsa de couro onde iam as flechas").
- **Não explique o óbvio** nem pendure **lição de moral** no fim da página: termine com uma imagem, uma risada ou um gancho leve.
- **Humor de fazer rir e mistério que prende**: cada página precisa de uma cena gostosa de rir (a queda no riacho, a cara azeda do Xerife, o capuz escorregando, a barriga de Frei Tuck) e de pistas que ligam as páginas (um bilhete pregado no carvalho, o som da corneta, passos atrás das árvores).
- **Personagem novo não entra de supetão**: antes de agir, é anunciado ou apresentado com um traço físico, um jeito e um motivo claro.
- **Verossimilhança**: o plano funciona por **esperteza, trabalho em equipe e pontaria**, não porque o herói vence todo mundo na força bruta.

## 3. Tamanho e forma
- Parte = capa + **8 a 9 capítulos** (9 a 10 páginas); cada página = **um episódio**, **3 a 5 parágrafos** (6 é sinal de que são duas páginas). Numeração contínua dos capítulos entre as 4 partes.
- Capa: "Nesta parte…" em 3 parágrafos curtos, sem estragar surpresas. Primeira página (partes 2+): ponte com o fim da parte anterior. Última: gancho leve para a próxima (teaser em `fim.mensagem`).
- **Palavras-chave**: 25 a 30 por parte, 2 a 4 por página: `{{PALAVRA|SÍ • LA • BAS|emoji}}`, só no texto; repetir de propósito algumas já ensinadas.
- Título do capítulo: `'🏹 Capítulo N • Nome'` + `titulo` (os dois são lidos em voz alta).

## 4. Proteção da infância
- **Zero sangue e zero mortes em cena**: sem morte do guarda florestal (Pyle cap. 1), sem forca (resgate de Will Stutely na torre), sem morte de Guy of Guisborne, sem o epílogo triste de Kirklees.
- **Sem romantizar roubo**: os tesouros retomados são sempre **impostos injustos cobrados pelo Xerife**, devolvidos a quem trabalhou para ganhar.
- **Duelos de bastão** são disputas de equilíbrio e amizade que terminam em banho no riacho e gargalhada. **Arco e flecha** são para alvos de palha e torneios de pontaria, nunca apontados para ferir alguém.

## 5. Atividades (3 por parte, nunca em páginas seguidas demais)
- Crivo, tudo "sim": nasce da página · a criança **ajuda um personagem** · a cena **muda** · treina leitura/sílabas/letras/ordem · até 5 toques, erro = dica gentil · **só acerta quem lê** (cartões de leitura com o **mesmo emoji**, para ele não entregar a resposta).
- O convite vai em `comandoAtividade` (quadro separado, nunca no texto) e **não dá a resposta**.
- Tipos prontos no motor: `ordem` (palavras, sílabas ou letras), `pedido` (figura + palavras com pegadinhas quase iguais), `progressivo` (etapas em ordem fixa), `camadas`, `contagem` (só se contar for necessidade da história), `acao`. Variar dentro da parte; nunca criar cartão que só enfeita.

## 6. Visual de cena (sem copiar Realidade × Imaginação sem necessidade)
- Por padrão, *Robin Hood* usa **cena única por página + camadas (`camadas`) e variações de progresso (`realCena`)**, deixando `imag` ausente (sem a chave da lente).
- Caso o humano aprove a "Lente do Disfarce" pontual em páginas de disfarce, o uso será registrado na receita específica antes da Fase 2.

## 7. Estrutura do arquivo (`robin-hood/parte-N.html`)
- Copiar o esqueleto HTML de `dom-quixote/parte-5.html` (só `window.LIVRO`; motor em `../assets/js/livro.js`, nunca copiado).
- Campos principais: `obra: 'Robin Hood'`, `autor: 'Howard Pyle e lendas tradicionais'`, `parte`, `totalPartes: 4`, `rascunho: true`, `imagens: './imagens/parte-N/'`.
- Sem arquivo de imagem ainda pronto, o motor mostra "Ilustração a caminho" e os emojis das camadas. Ao criar `robin-hood/parte-1.html` na Fase 1b, mudar `situacao` de `'fila'` para `'rascunho'` em `assets/js/acervo.js` e rodar `npm run build` na entrega.

## 8. Teste (grátis)
- `python3 -m http.server 8765` e Playwright/Chromium em 800×1280 e 1280×800: `http://localhost:8765/robin-hood/parte-N.html?page=P&adulto=1`. Clicar cartões com `locator.click()`. Conferir: texto inteiro, palavras-chave, cada atividade até o fim, 🔄 Recomeçar, virada de página, sem erros no console.

## 9. Papel do crítico adversarial (subagente de contexto limpo)
- Simula o humano: pai exigente que lê com o filho de 6 anos. Procura, página por página: palavra ou construção rebuscada; frase longa; evento sem motivo ("por que ele fez isso?", "quem é esse?"); piada fraca ou repetida; moral pendurada; página cansativa (sobretudo na segunda metade); quebra de continuidade; atividade que não passa no crivo; qualquer coisa que um pai vetaria (violência ou furto romantizado). Entrega: nota por página (0–10), **os 10 problemas mais graves com a correção sugerida** e o que está bom e não deve ser mexido. Não reescreve o livro.
