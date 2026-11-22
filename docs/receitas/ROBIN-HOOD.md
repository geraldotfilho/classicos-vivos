# 🏹 Receita específica — Robin Hood

O que vale **só para Robin Hood**, complementando a [receita geral](../RECEITA-CLASSICO-VIVO.md). Leia a receita geral primeiro: esta só acrescenta ou especializa.

> **Situação: ✅ Fase 0 aprovada pelo humano (2026-11-21). Parte 1 em produção.**
> Plano: [`PLANO-ROBIN-HOOD.md`](../PLANO-ROBIN-HOOD.md) · Diretrizes operacionais: [`DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) · Pesquisa com fontes: [`pesquisa/ROBIN-HOOD.md`](../pesquisa/ROBIN-HOOD.md).

- **As obras-fonte**: *The Merry Adventures of Robin Hood*, de **Howard Pyle** (1883, Prefácio + 22 capítulos, domínio público), combinada com as baladas medievais (*A Gest of Robyn Hode*) e o folclore posterior (Grande Carvalho, Lady Mariana).
- **Tipo de adaptação**: **condensação** episódica em **5 partes** (receita geral §2), para evitar pressa e dar espaço ao desenvolvimento dos personagens, da trama e dos temas sociais.
- **Público**: **5 a 8 anos** (leitor de referência: criança de **6 anos**, `AGENTS.md` §3.5), mais camada *"Você sabia?"* nos dois modos (tradicional 5–8 anos e Desafio 🧩 8–10 anos).

---

## 1. Os 3 pilares temáticos (decisão do humano, 2026-11-21)

1. **Justiça tributária (impostos desiguais)**:
   - Mostrar de forma concreta para uma criança de 6 anos que cobrar a *mesma quantia* de todos é injusto: para o rico de celeiro ou carroça cheia, dois sacos de farinha não fazem diferença alguma; para quem só tem três sacos, quase não sobra pão. O bando recupera e devolve impostos injustos cobrados dos pobres.
2. **Libertação de presos injustos e valor das provas**:
   - Além da devolução de impostos, Robin e seu bando atuam para **libertar pessoas pobres presas injustamente** sem provas. Ao longo das 5 partes, o bando passa a observar vestígios reais (marcas, recibos, pistas) para provar a inocência dos acusados.
3. **Pressão social e transformação do Estado no desfecho**:
   - Os atos do bando despertam a coragem das aldeias. No final da série (Parte 5), a pressão popular unida diante do **Rei Ricardo** transforma as leis do reino: cria-se um sistema de **imposto mais justo** e um **corpo independente de investigadores das provas (peritos)** — que não obedece ao Xerife e averigua se existem provas reais para condenar alguém e quem são os verdadeiros culpados (referência discreta à autonomia constitucional da Polícia Científica no Brasil).

---

## 2. Condensação: divisão em 5 partes

1. **Proporção**: **5 partes**, cada uma com **capa + 8 a 9 capítulos nossos** (9 a 10 páginas), numeração contínua de capítulos entre as partes (1–9, 10–18…).
2. **Cada parte tem arco, conflito prévio e gancho**:
   - Nenhum plano do Xerife nasce do nada: primeiro ocorre o conflito e a identificação visual do bando (as roupas verdes de Sherwood), depois o Xerife elabora armadilhas.
   - **P1**: *O Bando do Grande Carvalho* (imposto desigual, prisão do moleiro, roupas verdes, João Pequeno, 1º resgate/conflito com o Xerife, torneio da flecha de ouro, banquete e prisão de Gui).
   - **P2**: *O Resgate da Torre e o Açougueiro* (resgate na torre, disfarce na feira e jantar na casa do Xerife, João Pequeno na cozinha).
   - **P3**: *O Frade do Rio e a Canção da Floresta* (Frei Tuco no riacho, Alan do Vale, Gui Escarlate, o povo perdendo o medo nas feiras).
   - **P4**: *O Cavaleiro Triste e a Flecha da Rainha* (Dom Ricardo do Vale × Abade isento de impostos, pressão social crescendo, torneio diante da Rainha Leonor).
   - **P5**: *O Hóspede Encapuzado e as Novas Leis* (armação do Xerife desmascarada por provas, mobilização popular, Rei Ricardo, imposto justo e criação dos peritos das provas).

---

## 3. Proteção da infância e ética da adaptação

1. **Devolução de impostos injustos, nunca furto glorificado**: deixa claro que o ouro recuperado veio de cobranças abusivas sobre o povo pobre, nunca de viajantes inocentes.
2. **Duelos como esporte e amizade (zero sangue)**: sai a morte do guarda florestal (cap. 1 de Pyle); duelos de bastão são disputas de equilíbrio que terminam em banho no riacho e gargalhada.
3. **Sem forca e sem mortes em cena**: resgates pela janela/corda e esperteza; Guy of Guisborne cai na própria armadilha sem ferimentos; **final sereno** com festa e novas leis (sem a morte em Kirklees).
4. **Arco e flecha**: exclusivamente como arte e pontaria em alvos de torneio, nunca apontados contra pessoas.

---

## 4. Direção de arte, diversidade e recurso visual (atualizados pelo humano em 2026-11-21)

- **Estilo artístico — Opção C (Diorama de Papel Recortado / *Paper Cut-Out Craft*)**: planos com textura tátil de papel artesanal e sombras de profundidade entre as camadas, totalmente distinto da aquarela/guache de *Dom Quixote* e alinhado à estética de camadas animadas do motor.
  - **✅ Método Híbrido validado por Teste de Conceito (2026-11-21)**: geração de **Palcos-Base Reaproveitáveis** em diorama de papel + **Camadas Animadas em `.webp` transparente** recortadas de fundo `#FF00FF`, operado por uma linha de montagem de 3 agentes em Hydrogen (`@ilustrador-hydrogen` → `@animador-hydrogen` → `@critico-arte-hydrogen`), com verificação obrigatória de geometria 2D/3D (superfícies 100% frontais para camadas com rotação 2D) e porte etário de Grilo (~11–12 anos, altura no peito do pai). Receita completa em [`DIRETRIZES_ROBIN_HOOD.md`](../DIRETRIZES_ROBIN_HOOD.md) §11.
- **Diversidade editorial declarada**: **Lady Mariana** (jovem negra de cabelo trançado, mentora da floresta), **Mestre Tomé** (o moleiro, homem negro) e seu filho **Grilo** (menino pardo), além de elenco diverso em toda a obra — **a representatividade infantil prevalece sobre a distribuição étnica da Europa medieval**. Registrar essa escolha também no texto para adultos em `sobre.html`.
- **Recurso visual — Opção 1 (Cena única + camadas e gravuras progressivas reais)**: sem a chave da 2ª lente (*Realidade × Imaginação* é própria de Dom Quixote). **Proibido usar apenas emojis soltos como resultado de atividade**: toda atividade deve mudar a gravura de verdade (`progressivo` com 4 etapas ilustradas ou `camadas` ilustradas em estilo papel recortado).
- **"Você sabia?" nos dois modos**: caixas curtas e curiosas no modo tradicional (5–8 anos, `voceSabia` na página) e versão mais completa no Modo Desafio 🧩 (8–10 anos).

---

## 5. Nomes e aportuguesamento (regra do humano)

- **Lugares aportuguesados com sonoridade portuguesa e eco do original**:
  - **Floresta de Xervedo** (*Sherwood* em inglês — une o som inicial de *Sher-* ao sufixo português de arvoredo/bosque *-edo*).
  - **Nortigão** / **Xerife de Nortigão** (*Nottingham* em inglês).
  - **Vila do Moinho** (a aldeia onde vivem Robin, Mestre Tomé e Grilo).
- **Personagens (só *Robin Hood* não é aportuguesado; variações mínimas e naturais nos demais)**:
  - **Lady Mariana** — variando entre *Lady Mariana* e *Mariana* conforme o contexto (*Lady Marian* em inglês).
  - **Mestre Tomé**, o moleiro (pai de Grilo, homem negro) e **Grilo**, o filho do moleiro (*Much* em inglês, menino pardo).
  - **João Pequeno** (*Little John* em inglês).
  - **Rei Ricardo**, **Rainha Leonor**, **Xerife de Nortigão**.
  - **Frei Tuco**, **Gui Escarlate**, **Alan do Vale**, **Dom Ricardo do Vale** (quando entrarem nas partes seguintes).
