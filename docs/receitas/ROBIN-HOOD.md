# 🏹 Receita específica — Robin Hood

O que vale **só para Robin Hood**, complementando a [receita geral](../RECEITA-CLASSICO-VIVO.md). Leia a receita geral primeiro: esta só acrescenta ou especializa.

> **Situação: 🟡 Fase 0 (Mapa da Obra proposto para aprovação do humano).**
> Plano: [`PLANO-ROBIN-HOOD.md`](../PLANO-ROBIN-HOOD.md) · Diretrizes operacionais: [`DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) · Pesquisa com fontes: [`pesquisa/ROBIN-HOOD.md`](../pesquisa/ROBIN-HOOD.md).

- **As obras-fonte**: principalmente *The Merry Adventures of Robin Hood*, de **Howard Pyle** (1883, Prefácio + 22 capítulos, domínio público), combinada com elementos consagrados das baladas medievais (*A Gest of Robyn Hode*) e do folclore popular (como o Grande Carvalho e, se aprovado pelo humano, Lady Marian).
- **Tipo de adaptação**: **condensação** episódica (receita geral §2). Pyle já funciona como uma sequência de aventuras curtas e bem-humoradas ligadas pelos mesmos personagens — o trabalho é escolher os melhores episódios, encadear causas e consequências para um leitor de **6 anos** e suavizar violências de época.
- **Público**: **5 a 8 anos** (leitor de referência: criança de **6 anos**, `AGENTS.md` §3.5), no mesmo tom leve, acolhedor e visual de *Dom Quixote*.

---

## 1. Condensação: como dividir as lendas em partes

1. **Proporção**:
   - **4 partes** (fechando uma prateleira completa da coleção na estante), com **capa + 8 a 9 capítulos nossos por parte** (9 a 10 páginas).
   - Em média, **1 a 2 episódios/capítulos de Howard Pyle por página** (sem pressa; se um episódio tem dois momentos fortes — como o disfarce do açougueiro na feira e o jantar na casa do Xerife —, ele vira duas páginas).
2. **Cada parte tem um arco e um gancho**:
   - Parte 1: a formação do bando e a primeira vitória (o torneio da flecha de ouro).
   - Parte 2: os grandes disfarces, novos amigos e o Xerife enganado na própria mesa.
   - Parte 3: generosidade com Sir Ricardo e o desafio diante da Rainha.
   - Parte 4: a cartada final do Xerife, a chegada do cavaleiro encapuzado (Rei Ricardo) e a festa da paz em Sherwood.
3. **Numeração contínua dos nossos capítulos**: assim como em Dom Quixote, os capítulos seguem numerados em sequência pelas 4 partes (ex.: 1–8, 9–17, 18–25, 26–33), reforçando a sensação de livro único.

---

## 2. Proteção da infância e ética da adaptação (regras próprias de *Robin Hood*)

O maior risco pedagógico de *Robin Hood* para crianças de 6 anos é romantizar **briga de espada/arco** e **roubo**. Por isso:

1. **Devolução de impostos injustos, não "roubo por diversão"**:
   - O Xerife de Nottingham e o Abade cobram taxas abusivas e tomam a comida ou a casa de gente trabalhadora.
   - Quando Robin e o bando tomam bolsas de ouro de autoridades gananciosas, o texto deixa claro que é **dinheiro de impostos cobrados injustamente do povo**, e o foco das cenas está em **partilhar, ajudar quem precisa (como Sir Ricardo) e enganar a ganância com humor**, nunca em atacar viajantes inocentes.
2. **Duelos como esporte e brincadeira de equilíbrio (zero sangue)**:
   - O cap. 1 de Pyle (em que Robin mata um guarda florestal ao reagir a uma aposta cruel) **sai inteiro**; a ida para Sherwood nasce de **proteger um lavrador ou defender a floresta diante de uma lei injusta**, sem mortes.
   - As lutas de bastão (João Pequeno na ponte, Frei Tuck no riacho, o moleiro) viram **disputas cômicas de equilíbrio que terminam em tombo na água e gargalhada**, nascendo dali a amizade.
3. **Sem forca e sem mortes em cena**:
   - **Will Stutely** (Pyle cap. 4) é preso na torre/cadeia do castelo e resgatado por esperteza e corda — **nunca** vai para a forca.
   - **Guy of Guisborne** (Pyle cap. 20) **não morre** em duelo: perde o torneio/armadilha de esperteza, cai sentado na lama ou fica preso sem machucados enquanto o bando salva os amigos.
   - **Final sereno (sem Kirklees)**: a saga termina com o perdão do Rei Ricardo, o Xerife destituído dos abusos e uma festa acolhedora sob o Grande Carvalho (sem o epílogo triste da morte de Robin por traição).
4. **Arquearia lúdica, nunca arma contra pessoas**:
   - O arco e a flecha são mostrados como **arte e pontaria em alvos de palha, guirlandas e desafios esportivos** (partir o alvo, acertar o centro), jamais apontados para ferir alguém.

---

## 3. Recurso visual e interações (sem copiar as lentes de Dom Quixote)

- *Dom Quixote* usa **Realidade × Imaginação** porque a obra trata do choque entre o real e o imaginado. Em *Robin Hood*, **não há delírio** — portanto, **por padrão as páginas NÃO usam a chave Realidade × Imaginação**.
- **Como a cena ganha vida**:
  1. **Ilustrações principais limpas + camadas animadas/interativas (`camadas`)**: flechas chegando no alvo, bolsas ou moedas repartidas, instrumentos musicais de Alan-a-Dale, chapéu/capuz, corda do resgate, folhas de Sherwood ao vento.
  2. **Recurso pontual opcional ("Lente do Disfarce" / bastidores)**: apenas em páginas de disfarce (como o açougueiro, o frade ou o cavaleiro encapuzado), *se o humano aprovar*, podemos usar a segunda cena como **Por fora (o disfarce) ↔ Por dentro (quem realmente está ali)** — ou manter tudo com uma única cena + camadas que revelam o rosto. Esta decisão fica na parada da Fase 0.
- **Atividades alfabetizadoras** (receita geral §6.2): 3 por parte, intercaladas com páginas calmas, usando tipos do motor (`ordem`, `pedido`, `progressivo`, `camadas`, `acao`) sem alterar `assets/js/livro.js`.

---

## 4. Elenco fixo e continuidade entre partes

| Personagem | Traço visual e jeito | Papel nas partes |
| :--- | :--- | :--- |
| **Robin Hood** | Túnica verde-musgo, chapéu com pena vermelha, sorriso esperto, ágil | Líder alegre e justo; inventa os planos |
| **João Pequeno** | Gigante gentil, quase duas cabeças mais alto que todos, barba curta, bastão de carvalho | Braço direito de Robin; adora comer bem e rir alto |
| **Frei Tuck** | Baixinho e rechonchudo, hábito marrom, bochechas rosadas, amante de tortas e cães | Entra na P2; traz humor e coração |
| **Will Scarlet** | Primo elegante, chapéu estiloso de pena e roupas bordô/escarlate | Entra na P2; ajuda nos planos e disfarces |
| **Alan-a-Dale** | Jovem trovador com alaúde/harpa e sorriso tímido | Entra na P2; traz música e a história do casamento |
| **Midge (ou Much)** | Filho do moleiro, avental enfarinhado, rápido | Entra na P1/P2; ajuda na cozinha/logística |
| **Lady Marian** *(❓ opcional)* | Capa verde-esmeralda e cabelo trançado, ágil e corajosa no arco | Se aprovada: amiga de infância que avisa o bando sobre os planos do Xerife |
| **Xerife de Nottingham** | Capa pesada púrpura/preta, anéis dourados, cara azeda, sempre pensando em impostos | O antagonista cômico (sempre enganado pela própria ganância) |
| **Sir Ricardo do Vale** | Cavaleiro honesto de manto gasto, rosto cansado que volta a sorrir | Entra na P3; mostra o valor da gratidão e palavra cumprida |
| **Rei Ricardo** | Alto, manto de viagem com capuz escuro, depois coroa e leão no peito | Entra na P4; sela a paz e a justiça |
