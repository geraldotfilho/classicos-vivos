# 🧩 DESAFIOS — a segunda camada de atividades (leitores de ~8 a 10 anos)

Pedido do humano (2026-11-14): além das atividades de alfabetização (5 a 8 anos), cada livro ganha uma **segunda camada**, para crianças **já alfabetizadas**: mais complexa, mais desafiante e mais rica. Este arquivo é a especificação única: o que é, como aparece, o formato dos dados e as regras de conteúdo. Vale para todos os livros.

## 1. Princípios

1. **É opcional e fica fora do caminho de quem está aprendendo a ler.** A camada só aparece com o **modo Desafio** ligado (botão 🧩 no topo do livro, lembrado no aparelho em `cv-nivel`: `'1'` ou `'2'`; padrão `'1'`). Com ele desligado, o livro é exatamente o de antes.
2. **Não mexe no livro publicado.** Os desafios ficam em arquivos à parte (`<livro>/desafios/parte-N.js`), carregados só quando o modo é ligado. O `window.LIVRO`, o texto, a narração e as traduções não mudam (nenhum `hash` muda).
3. **A leitura vem primeiro** (`AGENTS.md` §3.3). O desafio fica **depois do texto** (um quadro no fim da folha de texto) e abre num **caderno** sobre o livro (como o cartão de alfabetização): nunca dentro do quadro da cena, nunca interrompendo a narração, sem relógio, sem pontos, sem ranking, sem "vidas". Errar gera só uma dica gentil.
4. **Só acerta quem leu e pensou.** Toda etapa se resolve com o que está **naquela página** (ou em páginas anteriores da mesma parte), relendo se for preciso. Reler é a estratégia que queremos ensinar.
5. **A recompensa é saber mais.** Ao terminar, a criança ganha o **selo** da página (um emoji) e um **"Você sabia?"**: uma curiosidade verdadeira sobre a obra, o autor, a época ou a língua. Na última página, o caderno mostra quantos selos da parte ela já tem.
6. **Sem arte nova e sem API paga.** Tudo é texto, emoji e CSS. As instruções têm um 🔊 (voz do aparelho), mas a criança lê sozinha.
7. **Por enquanto só em português.** Em outro idioma, o botão 🧩 avisa que os desafios ainda estão só em português (tradução futura: `desafios/parte-N.<idioma>.js`, mesmo formato).

## 2. Formato dos dados

Um arquivo por parte: `dom-quixote/desafios/parte-5.js` (o nome segue o do HTML: `parte-5.html` → `parte-5.js`).

```js
/* Desafios (segunda camada, leitores de 8 a 10 anos) — Dom Quixote, Parte 5. Formato: docs/DESAFIOS.md */
window.DESAFIOS = {
  livro: 'dom-quixote',
  parte: 5,
  paginas: {
    // a chave é o ÍNDICE da página (o mesmo de ?page=N); a capa (0) não tem desafio
    1: {
      titulo: 'O mistério do viajante',          // curto (até ~35 caracteres)
      selo: '🧹',                                 // emoji que a criança ganha
      convite: 'Um desconhecido sabe o nome de Sancho. Você reparou nas pistas?',  // 1 frase; aparece no quadro da página; não entrega resposta
      etapas: [ /* 2 ou 3 etapas, de tipos diferentes (ver §3) */ ],
      sabia: 'O primeiro livro de Dom Quixote saiu em 1605 e fez tanto sucesso que...'  // 1 a 3 frases, fato verdadeiro
    }
  }
};
```

Campos comuns a **toda etapa**: `tipo`, `pergunta` (o enunciado, até ~160 caracteres), `dica` (frase que aparece depois de 2 erros; aponta **onde reler**, não dá a resposta) e, opcional, `porque` (1 frase mostrada ao acertar, que explica ou diverte).

## 3. Os sete tipos de etapa

| `tipo` | O que a criança faz | O que treina | Campos próprios |
| :--- | :--- | :--- | :--- |
| `quiz` | escolhe 1 entre 3 ou 4 respostas | compreensão, **inferência** ("por que...?"), vocabulário pelo contexto | `opcoes: ['...','...','...']`, `certa: 0` (índice em `opcoes`; o motor embaralha) |
| `ordenar` | põe 3 a 5 frases ou palavras na ordem certa | sequência dos fatos, causa e consequência, ordem da frase | `itens: ['primeiro...','depois...','por fim...']` (**na ordem certa**; o motor embaralha) |
| `classificar` | manda cada item para um de 2 (ou 3) grupos | ponto de vista (realidade × imaginação), fato × invenção, quem disse o quê | `grupos: ['👓 Realidade','✨ Imaginação']`, `itens: [{ texto: '...', grupo: 0 }, ...]` (4 a 6 itens) |
| `lacunas` | completa a frase com as palavras do banco | vocabulário, gramática, rimas, **provérbios** | `texto: 'Quem tem ___ vai a ___.'` (cada `___` é uma lacuna), `respostas: ['boca','Roma']` (na ordem), `distratores: ['pressa','Paris']` |
| `ligar` | liga cada item da esquerda ao seu par | palavra ↔ significado, personagem ↔ fala, começo ↔ fim do ditado | `pares: [['odre','saco de couro para vinho'], ...]` (3 a 5 pares) |
| `enigma` | monta a resposta com letras embaralhadas | ortografia, charadas ("o que é, o que é?"), **mensagem em código** | `resposta: 'BACIELMO'` (maiúsculas; pode ter espaço), `extras: 'XR'` (letras a mais, opcional), `cifra: { mensagem: '🌙⭐🔔', chave: [['🌙','L'],['⭐','E'],['🔔','Ã']] }` (opcional: mostra o código e a chave) |
| `erro` | toca nas palavras erradas de um pequeno reconto | leitura atenta, memória do texto | `texto: 'Sancho entrou pela [[janela|porta]] e viu o [[cachorro|gatinho]].'` (`[[errado|certo]]`; 2 a 4 erros; ao tocar, a palavra se corrige) |

Limites de tamanho (tablet em retrato, 800 px): opção de `quiz` e item de `classificar` até ~70 caracteres; item de `ordenar` até ~80; lados de `ligar` até ~45; `texto` de `lacunas`/`erro` até ~260; `resposta` de `enigma` até 12 letras.

## 4. Regras de conteúdo (o crivo do desafio)

O leitor de referência desta camada é uma criança de **9 anos que lê sozinha**. Para cada página:

1. **Nasce da página.** O desafio trata do que acontece naquele capítulo, com as palavras dele. Nunca estraga uma surpresa de páginas seguintes; pode retomar páginas e partes anteriores.
2. **Pede pensamento, não memória de detalhe bobo.** Boas perguntas: *por que* alguém fez algo, o que uma palavra quer dizer **naquele trecho**, o que é verdade × o que alguém imagina ou finge, o que veio antes e depois, o que um ditado de Sancho quer dizer, qual é o plano escondido de um personagem. Ruins: "qual era a cor da touca?".
3. **Sobe um degrau em relação à atividade da primeira camada** e não a repete. Se a página já tem a assinatura para ordenar, o desafio vai além (ex.: por que ele assina assim; um anagrama; um código).
4. **2 ou 3 etapas por página, de tipos diferentes**, em dificuldade crescente; no total da parte, **use os sete tipos** e não repita a mesma dupla de tipos em páginas vizinhas. A última página da parte pode ter um desafio de **recapitulação** da parte inteira.
5. **Alternativas erradas plausíveis e gentis** (nada de pegadinha humilhante); só **uma** resposta certa, sem ambiguidade. Em `ordenar`, a ordem precisa ser a única defensável pelo texto.
6. **Linguagem**: português do Brasil, direto e vivo, com humor; frases curtas. Pode usar palavras um pouco mais difíceis que as do livro (a criança é maior), mas sem arcaísmo. Trate a criança por "você".
7. **Proteção da infância** (`AGENTS.md` §3.6): sem violência, humilhação, medo gratuito ou lição de moral pendurada.
8. **"Você sabia?" só com fato de que se tem certeza** (Cervantes, 1605 e 1615, La Mancha, moinhos, a imprensa, o livro falso de Avellaneda de 1614, a palavra "quixotesco", provérbios, costumes da época...). Na dúvida, prefira uma curiosidade sobre a língua ou sobre a própria adaptação. Nada de datas ou números "aproximados" inventados.
9. **Coerência com o texto final da parte**: nomes, bordões e fatos exatamente como estão no `parte-N.html` (leia o arquivo inteiro antes de escrever).

## 5. Como testar

- `?nivel=2` liga o modo Desafio (testes); `?desafio=1` abre o caderno da página pedida em `?page=N`.
  Ex.: `http://localhost:8765/dom-quixote/parte-5.html?page=3&adulto=1&nivel=2&desafio=1`
- `npm run conferir:desafios` valida o formato de todos os `desafios/parte-N.js` (campos, índices, limites).
- Playwright nos dois tamanhos de tablet (800 × 1280 e 1280 × 800), cada etapa até o fim, com `locator.click()`.

## 6. Andamento

| Obra | Parte | Desafios | Situação |
| :--- | :--- | :--- | :--- |
| Dom Quixote | 5 | — | em produção |
| Dom Quixote | 6 | — | em produção |
| Dom Quixote | 1 | — | na fila |
| Dom Quixote | 2, 3, 4 | — | na fila |
| Dom Quixote | 7, 8 (rascunhos) | — | na fila |
