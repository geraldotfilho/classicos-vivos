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
  1. **Impostos desiguais**: a mesma cobrança que não pesa para o rico tira o pão do pobre; o bando devolve tributos cobrados injustamente dos pobres.
  2. **Presos injustos e provas**: o bando solta quem foi trancado sem provas e aprende a checar pistas e vestígios antes de julgar.
  3. **Pressão social e Estado justo**: ao longo das 5 partes o povo perde o medo e se une até conquistar impostos justos e um corpo independente de investigadores das provas (peritos, referência discreta à autonomia constitucional da Polícia Científica no Brasil, na Parte 5).
- **Nomes fixos**: só **Robin Hood** não é aportuguesado; **Dama Mariana de Sherwood** (variando entre *Dama Mariana*, *Mariana* e *Mariana de Sherwood*), **João Pequeno**, **Grilo** (*Much* em inglês), **Rei Ricardo**, **Rainha Leonor**, **Xerife de Nottingham**; nas partes seguintes, ajustes mínimos e espertos (*Frei Tuco*, *Gui Escarlate*, *Alan do Vale*, *Dom Ricardo do Vale*).
- **Diversidade**: elenco diverso em toda a obra (incluindo Mariana, jovem negra, e diversidade nas aldeias e no bando) — prioridade sobre a distribuição étnica medieval.
- **Personagem novo e causalidade**: antes de agir, todo personagem é anunciado; todo plano do Xerife nasce de um conflito prévio já mostrado (ex.: primeiro o bando verde age, depois o Xerife caça quem usa verde).

## 3. Tamanho e forma
- Parte = capa + **8 a 9 capítulos** (9 a 10 páginas); cada página = **um episódio**, **3 a 5 parágrafos** (6 é sinal de que são duas páginas). Numeração contínua de capítulos entre as 5 partes.
- Capa: "Nesta parte…" em 3 parágrafos curtos, sem estragar surpresas. Primeira página (partes 2+): ponte com o fim da parte anterior. Última: gancho leve para a próxima (`fim.mensagem`).
- **Palavras-chave**: 25 a 30 por parte, 2 a 4 por página: `{{PALAVRA|SÍ • LA • BAS|emoji}}`, só no texto; repetir de propósito algumas já ensinadas.
- Título do capítulo: `'🏹 Capítulo N • Nome'` + `titulo` (os dois são lidos em voz alta).
- **"Você sabia?" (`voceSabia`)**: incluir 3 a 4 curiosidades curtas (para 6 anos) no campo `voceSabia` das páginas indicadas, deixando o conteúdo pronto para o futuro botão no modo tradicional (além do modo Desafio 🧩).

## 4. Proteção da infância
- **Zero sangue e zero mortes em cena**: sem morte do guarda florestal (Pyle cap. 1), sem forca (resgate na torre), sem morte de Guy of Guisborne, sem o epílogo triste de Kirklees.
- **Sem romantizar roubo**: os bens devolvidos são sempre impostos injustos cobrados de quem pouco tem.
- **Duelos de bastão** são disputas cômicas de equilíbrio que terminam em banho no riacho e amizade. **Arco e flecha** são para alvos e torneios de pontaria, nunca apontados para ferir alguém.

## 5. Atividades (3 por parte, nunca em páginas seguidas demais)
- Crivo, tudo "sim": nasce da página · a criança **ajuda um personagem** · a cena **muda** · treina leitura/sílabas/letras/ordem · até 5 toques, erro = dica gentil · **só acerta quem lê** (cartões de leitura com o **mesmo emoji**, para ele não entregar a resposta).
- O convite vai em `comandoAtividade` (quadro separado, nunca no texto) e **não dá a resposta**.
- Tipos prontos no motor: `ordem` (palavras, sílabas ou letras), `pedido` (figura + palavras com pegadinhas quase iguais), `progressivo` (etapas em ordem fixa), `camadas`, `contagem` (só se contar for necessidade da história), `acao`. Variar dentro da parte; nunca criar cartão que só enfeita.

## 6. Visual de cena e direção de arte (Opção A + Opção 1)
- **Estilo artístico (Opção A)**: **Gouache estilizado de floresta** (inspirado em *Wolfwalkers* / Cartoon Saloon), traço suave de carvão/tinta, copas geométricas luminosas, atmosfera acolhedora.
- **Recurso visual (Opção 1)**: **cena única + camadas (`camadas`) e `realCena`** — sem `imag` e sem chave da 2ª lente.

## 7. Estrutura do arquivo (`robin-hood/parte-N.html`)
- Copiar o esqueleto HTML de `dom-quixote/parte-5.html` (só `window.LIVRO`; motor em `../assets/js/livro.js`, nunca copiado).
- Campos principais: `obra: 'Robin Hood'`, `autor: 'Howard Pyle e lendas tradicionais'`, `parte`, `totalPartes: 5`, `rascunho: true`, `imagens: './imagens/parte-N/'`.
- Sem arquivo de imagem ainda pronto, o motor mostra "Ilustração a caminho" e os emojis das camadas. Ao criar `robin-hood/parte-1.html`, mudar `situacao` de `'fila'` para `'rascunho'` em `assets/js/acervo.js` e rodar `npm run build` na entrega.

## 8. Teste (grátis)
- `python -m http.server 8765` e Playwright/Chromium em 800×1280 e 1280×800: `http://localhost:8765/robin-hood/parte-1.html?page=P&adulto=1`. Clicar cartões com `locator.click()`. Conferir: texto inteiro, palavras-chave, cada atividade até o fim, 🔄 Recomeçar, virada de página, sem erros no console.

## 9. Papel do crítico adversarial (subagente de contexto limpo)
- Simula o humano: pai exigente que lê com o filho de 6 anos. Procura, página por página: palavra ou construção rebuscada; frase longa; evento sem motivo ("por que ele fez isso?", "quem é esse?"); piada fraca ou repetida; moral pendurada; página cansativa (sobretudo na segunda metade); quebra de continuidade; atividade que não passa no crivo; qualquer coisa que um pai vetaria (violência ou furto romantizado). Entrega: nota por página (0–10), **os 10 problemas mais graves com a correção sugerida** e o que está bom e não deve ser mexido. Não reescreve o livro.
