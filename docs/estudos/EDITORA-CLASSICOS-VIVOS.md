# Estudo — "Editora Clássicos Vivos": um swarm próprio, fora do Antigravity

> 🧊 **Na geladeira (decisão do humano, 2026-11-27)**: a ideia fica guardada; o trabalho pesado segue no Swarm do Antigravity e o Claude segue na nuvem, para bugs e Issues. Para um coordenador no Claude repetir o método com os meios dele, veja [`../RECEITA-COORDENADOR-CLAUDE.md`](../RECEITA-COORDENADOR-CLAUDE.md).
>
> Estudo de viabilidade feito pelo Claude em 2026-11-27, a pedido do humano. **Nada foi construído ainda.** Fontes no fim. Pontos marcados com ⚠️ precisam ser conferidos num protótipo antes de virar decisão.

## 0. Resumo em cinco linhas

1. **É viável**, mas não do jeito "o programa emprega qualquer agente": do lado do Claude há mecanismos documentados (MCP, `claude -p`, caixa de entrada entre sessões); do lado do Antigravity, **automatizar o app por fora é proibido nos termos do plano de consumidor** e pode suspender a conta.
2. Por isso o desenho certo é **inverter a mão**: o programa nunca comanda o Antigravity; é **a conversa do Antigravity que você abre** que se conecta ao programa por MCP e **busca** as tarefas do papel dela (como o `atelie-pericial` que você já tem ligado ao Antigravity).
3. **A cota do Opus se resolve** mandando os papéis de Opus (o lapidador) para o Claude Code, que usa o seu plano Claude. Não fica infinita: passa a ser a **soma** de duas cotas.
4. **A falta do Gemini no Claude se resolve melhor pela chave da API** (que o Google recomenda justamente para agentes de terceiros) do que pelo Antigravity: a arte da Parte 2 inteira custou US$ 0,69 em Batch. O gerador gratuito do Antigravity continua possível, mas só por um trabalhador do Antigravity aberto por você.
5. O ganho maior não é técnico, é **de domínio**: um painel que já conhece obras, partes, fases da receita, paradas 🛑, gastos e Issues de revisão. O escritório gamificado é a cara disso, e deve vir **por último**.

---

## 1. O que existe hoje (e o que eu verifiquei na sua máquina)

### 1.1 O Swarm do Antigravity, por dentro
Plugin nativo (`~/.gemini/antigravity/builtin/plugins/swarm` e a skill `native_swarm`):
- **coordenador** = a conversa onde o swarm nasce; **trabalhadores** = outras conversas completas, cada uma com modelo e papel;
- **mural** append-only (`board.jsonl`), **lista** de membros (`members.json`), acordar por `@menção`;
- `swarm_wait`: o membro dorme **sem gastar nada** até alguém postar. Essa é a grande vantagem do nativo, difícil de imitar por fora;
- a própria skill avisa: "(Preview & Quota Heavy)" e "every post is read by all the others", ou seja, swarm consome muita cota;
- quando a cota de um modelo acaba, o membro para, e nada recomeça sozinho.

### 1.2 Peças que você já tem
- **Um servidor MCP local seu**, `atelie-pericial` em `http://127.0.0.1:9333/mcp`, já ligado ao Antigravity (`~/.gemini/config/mcp_config.json`). É exatamente o tipo de ponte que a Editora usaria.
- Node 24, o repositório inteiro em Node, scripts de API prontos (`tools/gerar-imagens.mjs`, `tools/gravar-narracao.mjs`) com registro de gasto.
- Chaves `GEMINI_API_KEY` e `GEMINI_API_KEY_RESERVA` nas variáveis do Windows.
- Antigravity tem `agentapi` (`new-conversation`, `send-message`) e a CLI `agy -p`. **Existem, mas usar por fora é o problema da §2.**
- O Claude Code **CLI não está instalado** (só o embutido no app). Para trabalhadores sem janela (`claude -p`), seria preciso instalá-lo.

### 1.3 Ferramentas prontas parecidas
Já existem servidores MCP abertos de "mural para agentes" que dizem funcionar com Claude Code e Gemini CLI: talking-stick (SQLite), Agent Board (quadro de tarefas com trava de arquivo), Agent Room, Neohive, agent-comm, mcp-coordinator, all-agents-mcp. **Nenhum conhece o seu domínio** (fases, paradas, gastos, livros), e nenhum resolve o Antigravity de consumidor. Servem de referência, não de base.

Existe também um **padrão aberto para agente↔agente**, o **A2A** (Linux Foundation, v1.0, ciclo de tarefa: enviada → trabalhando → precisa de entrada → concluída/falhou). Nem o Antigravity nem o Claude Code falam A2A como cliente hoje, então ele é exagero agora; vale **copiar o ciclo de estados** para não fechar a porta.

---

## 2. O ponto mais importante: o que cada fornecedor permite

### Google (Antigravity, plano Pro de consumidor)
- Termos, seção 6: usar o serviço "in connection with products not provided by us" ou "third party software, tools, or services to access the Service" é quebra de contrato e pode suspender a conta do Antigravity **e** do Gemini CLI.
- FAQ: `agy -p` é "para scripts diretos e CI"; **"Wrapping `agy` inside third-party coding agents or applications … is not supported under consumer plans."**
- FAQ: para usar um agente de terceiros com Gemini, o Google **recomenda a chave do AI Studio ou do Gemini Enterprise**.
- Um fórum do Google (out/2026) diz ainda que automação por GUI/computer-use para injetar tarefas numa conversa do Antigravity não é suportada. Não ficou claro se quem respondeu é funcionário.
- **Não está escrito** se um agente do Antigravity, aberto por você, chamar ferramentas de um servidor MCP seu é permitido. MCP é recurso oficial do produto, e você já faz isso com o Ateliê. É o caminho de **menor risco**, mas ⚠️ é área cinzenta; vale perguntar no fórum antes de investir.

**Conclusão**: a Editora **não pode** abrir conversas do Antigravity, mandar mensagens para elas, nem embrulhar o `agy`. Pode **ser chamada** por um agente do Antigravity que você abriu.

### Anthropic (Claude Code, plano Claude)
- O login do plano serve "exclusivamente" a quem assina, para uso próprio; é proibido oferecer o login do Claude a terceiros num produto. Uma ferramenta **sua, no seu computador, para o seu projeto** está dentro disso. Os limites anunciados "assumem uso individual comum".
- `claude -p` e o Agent SDK **contam no limite do plano** (a separação num crédito mensal próprio, anunciada para junho/2026, está **pausada**).
- Mecanismos documentados: MCP (stdio e HTTP); **caixa de entrada entre sessões** (no Windows, um *named pipe* por sessão com token; um processo que não é o Claude pode postar nela; sessões `-p` também recebem; sessões do app Desktop participam, mas não mostram o diálogo de aprovação); **channels** (MCP que empurra eventos para uma sessão aberta; *research preview*, canal próprio exige uma flag de desenvolvimento que só vale em modo interativo).

**Conclusão**: do lado do Claude, a Editora pode **acordar e empregar** trabalhadores de verdade.

---

## 3. Arquitetura recomendada

```
                    ┌──────────────────────────────────────────────┐
                    │   EDITORA CLÁSSICOS VIVOS (app local, Node)    │
                    │  127.0.0.1 · estado em arquivos no repositório  │
                    │                                                │
  você ────────────▶│  Escritório (UI web)   Mural   Fila de tarefas  │
  (aprova 🛑)       │  Obras/Partes/Fases    Gastos  Paradas 🛑        │
                    │  Servidor MCP (HTTP)   Despachante              │
                    └───┬───────────────┬───────────────┬───────────┘
          MCP (puxa)    │               │ lança/acorda  │ chama direto
                        │               │               │
       ┌────────────────▼───┐  ┌────────▼─────────┐  ┌──▼─────────────────┐
       │ Antigravity        │  │ Claude Code      │  │ "Máquinas" da API   │
       │ conversas abertas  │  │ • claude -p por  │  │ Gemini (chave):     │
       │ POR VOCÊ, cada uma │  │   tarefa (Opus)  │  │ imagens Batch, voz, │
       │ num papel; pegam   │  │ • sessões do app │  │ com teto e registro │
       │ tarefa e entregam  │  │   acordadas pela │  │ de gasto            │
       │ (Neon, Hydrogen,   │  │   caixa de       │  │                     │
       │  gerador de imagem │  │   entrada        │  │                     │
       │  gratuito)         │  │                  │  │                     │
       └────────────────────┘  └──────────────────┘  └─────────────────────┘
```

### 3.1 O núcleo
- **Node + servidor MCP em Streamable HTTP** só em `127.0.0.1`, com token (o mesmo formato do Ateliê). UI web servida pelo próprio núcleo; empacotar depois com Tauri ou Electron se quiser ícone e janela.
- **Estado em arquivos versionáveis** (por exemplo `.editora/` com JSONL e YAML, ou SQLite com exportação), para qualquer agente e o git lerem. No Swarm do Antigravity o estado mora na pasta da conversa do coordenador e morre com ela.
- **Papéis em YAML**, derivados do §12 das `DIRETRIZES_ROBIN_HOOD.md`: nome, instruções, ferramentas permitidas, **onde roda** (Claude/Antigravity/API), **modelo preferido** e **modelo reserva**.

### 3.2 O modelo de domínio (o que nenhum swarm genérico tem)
Obra → Parte → **Fases 0–8 da receita** → Tarefas (capítulo N: rascunho → lapidação → diversidade; arte pN: prompt → geração → crítica; etc.) → **Paradas 🛑**, que só você destrava no painel → Entregas (arquivos, branch, commit) → **Gastos** (lidos de `docs/arte/gastos.csv` e `docs/narracao/gastos.csv`, com o teto de R$ 50/mês) → **Issues `revisao-autor`** (`npm run revisoes`).

Estados de tarefa no ciclo do A2A: `enviada → designada → trabalhando → precisa_de_você → entregue → aprovada | refazer`.

### 3.3 Ferramentas MCP (esboço)
- Trabalhador: `bater_ponto(papel, agente, modelo)`, `pegar_tarefa(papel, esperar_segundos)`, `ler_briefing(tarefa)`, `postar_no_mural(texto)`, `entregar(tarefa, arquivos, notas)`, `pedir_ajuda(tarefa, pergunta)`, `avisar_cota(modelo, renova_em)`.
- Coordenador: `criar_tarefa`, `designar`, `ver_equipe`, `ver_fila`, `revisar_entrega`, `abrir_parada`.
- Máquinas (só com autorização registrada): `gerar_imagens(lista, ids, teto_usd)`, `gravar_narracao(...)`. Por baixo, os scripts que já existem.

### 3.4 Três tipos de trabalhador
| Tipo | Como recebe trabalho | Bom para | Custo de espera |
| :--- | :--- | :--- | :--- |
| **Claude sem janela** (`claude -p --model opus`, um processo por tarefa) | o despachante lança com o briefing e lê a resposta | lapidação Opus, revisões, crítica de contexto limpo, traduções | zero: nasce e morre com a tarefa |
| **Sessão do Claude no app** | caixa de entrada (named pipe) ou você | coordenador, trabalho longo com você junto | zero enquanto espera |
| **Conversa do Antigravity aberta por você** | chama `pegar_tarefa` em laço | modelos Gemini, **gerador de imagem gratuito**, visão | ⚠️ cada volta do laço é um passo do modelo e gasta cota; não existe `swarm_wait` por fora |

O tipo sem janela é o mais barato e previsível: o briefing já é tudo o que o trabalhador precisa, como o seu método de briefings parágrafo a parágrafo já pressupõe. Ele combina com o fluxo `@escritor-hydrogen → @revisor-opus`.

### 3.5 O coordenador
Pode ser uma sessão do Claude ou uma conversa do Antigravity, como você quer, porque ele também é só um cliente MCP. Sugestão: **a máquina de estados da receita fica no núcleo**, de forma determinística (qual é a próxima tarefa, quem pode pegar, o que está bloqueado por 🛑), e o coordenador-LLM só entra para **julgar** (briefings, revisar entregas, falar com você). Isso corta o maior consumo de um swarm: o coordenador relendo o mural inteiro.

---

## 4. Veredito: vantagens sobre o Swarm do Antigravity

1. **Duas cotas somadas e o modelo certo para cada papel**: Opus no plano Claude, Neon/Hydrogen e imagens no plano do Google. Hoje o `@revisor-opus` disputa a cota de terceiros do Antigravity e para a produção quando ela acaba.
2. **Troca automática por cota**: quando um modelo avisa que esgotou, o núcleo passa a tarefa para o modelo reserva do papel ou agenda para a hora em que a cota renova (hoje isso é feito à mão, ver §10.3 das diretrizes).
3. **Feito para a receita**: fases, paradas 🛑, crivo das atividades, teto de gasto e Issues de revisão no mesmo lugar, em vez de espalhados em caderno, RETOMADA e CSV.
4. **Estado durável e auditável** no repositório, legível por qualquer agente de qualquer fornecedor.
5. **Coordenador portátil**: pode trocar de Antigravity para Claude no meio da obra sem perder o andamento.
6. **Gasto visível antes de acontecer**: a máquina mostra a previsão (`--seco`) e pede o seu "sim" no painel, cumprindo o §2.7 do AGENTS.md por desenho.

## 5. Veredito: desvantagens e riscos

1. **Risco de conta Google** se a fronteira da §2 for cruzada. O desenho "o Antigravity puxa" reduz o risco, mas não o zera (⚠️ área cinzenta).
2. **Trabalhador do Antigravity não dorme de graça**: o laço de `pegar_tarefa` gasta passos de modelo. É preciso medir quanto (⚠️ protótipo) e talvez aceitar que esses trabalhadores só fiquem abertos quando houver fila para eles.
3. **Janelas abertas e aprovações**: conversas do Antigravity e sessões do Claude podem parar em pedido de permissão. Sem janela (`claude -p`) é preciso uma lista de permissões bem fechada, sem "pular permissões".
4. **Peças em *preview***: channels e caixa de entrada entre sessões podem mudar. O núcleo deve depender o mínimo possível delas (o `claude -p` é o mais estável).
5. **Manutenção**: é um segundo produto para cuidar. Atualizações do Antigravity ou do Claude Code podem quebrar a integração.
6. **Contexto frio**: cada trabalhador começa do zero. A qualidade depende dos briefings, o que você já faz bem, mas o custo em tokens de reler diretrizes a cada tarefa existe (mitigar com briefings enxutos e um "pacote de contexto" por papel).
7. **Dois agentes no mesmo repositório**: precisa de branch ou worktree por tarefa e de dono por arquivo (o mesmo cuidado que o Swarm já pede).
8. **Segurança**: só em `127.0.0.1`, com token; o mural é dado, nunca ordem (um texto no mural não pode aprovar gasto nem parada); chaves nunca passam pelo mural.

---

## 6. Sugestões sobre a sua ideia inicial

1. **Troque "empregar agentes" por "abrir vagas"**: o escritório anuncia as vagas (tarefas por papel), e quem estiver de ponto batido pega. Do lado do Claude, o próprio escritório pode "contratar" (lançar `claude -p`); do lado do Antigravity, você abre a conversa e ela bate o ponto.
2. **Imagens: API primeiro, Antigravity como bônus**. A API em Batch é barata, sancionada e roda sem janela. O gerador gratuito vira uma "mesa do ilustrador do Antigravity" para quando ele estiver aberto.
3. **O núcleo decide o fluxo, os LLMs decidem o conteúdo** (§3.5). Menos tokens, menos travamentos.
4. **A mesa do autor é o centro do escritório**: as paradas 🛑, as entregas para ler, os gastos a autorizar, as Issues. O resto é ambiente.
5. **Gamificação com a mesma régua da §3.3 do AGENTS.md**: cada elemento do escritório tem que mostrar um estado real (quem trabalha, o que espera você, quanto da cota sobra). Nada de animação que não informa.
6. **Arte do escritório pelo próprio pipeline**: o escritório desenhado em diorama de papel, com os personagens-funcionários como sprites em camadas, gerados como as cenas dos livros. É um bom teste do método e dá identidade.
7. **Vale para Viagem ao Centro da Terra e para as próximas obras**: os papéis e as fases vêm da receita geral, e a obra só acrescenta os seus.

### Ideia do escritório (primeira versão)
- **Recepção**: estante das obras, com a fase atual de cada parte.
- **Mesa do autor** (você): pilha de paradas 🛑, entregas para ler, botão "autorizo até US$ X".
- **Redação**: mesa do escritor, do lapidador (com a cota do Opus como uma xícara de café que esvazia), da diversidade.
- **Ateliê**: ilustrador, diretor de animação, crítico; a parede mostra as últimas gravuras.
- **Estúdio de som**: narração e escuta.
- **Contabilidade**: o cofre com o teto de R$ 50/mês e o gasto do mês.
- **Mural** no corredor: o board, legível.
- Cada funcionário mostra: quem é (Claude ou Antigravity, e qual modelo), o que está fazendo, se está esperando você ou sem cota.

---

## 7. Plano de construção sugerido (cada etapa entrega algo usável)

| Etapa | O que fica pronto | Risco que ela tira |
| :--- | :--- | :--- |
| 1. Núcleo + MCP + mural + fila, com painel simples em texto | coordenador Claude cria tarefas; você vê e aprova | o desenho do domínio |
| 2. Trabalhador `claude -p` (lapidador Opus) | um capítulo passa de rascunho a lapidado sem a cota do Antigravity | a cota do Opus |
| 3. Máquina de imagens pela API com teto e registro | o coordenador Claude produz arte | a falta do Gemini no Claude |
| 4. Trabalhador do Antigravity aberto por você, ligado por MCP | medir o custo do laço de espera e o tempo limite das ferramentas MCP no Antigravity; perguntar ao Google sobre a área cinzenta | o lado Antigravity e a conta |
| 5. Escritório gamificado | a interface final | — |
| 6. Empacotar (Tauri/Electron), atalho no Windows | o "programa" | — |

### 7.1 O plano Claude do humano é o **Pro** (informado em 2026-11-27)
- O Pro tem limite por janela de 5 horas e limite semanal, e **tudo o que roda no Claude divide a mesma cota**: esta conversa, um coordenador no Claude, os trabalhadores `claude -p`. Com o Pro, o Opus é o recurso mais escasso do escritório.
- **Consequência para o desenho**: o **coordenador fica no Antigravity** (Gemini Neon, cota do Google), e o Claude Pro é reservado ao que só ele faz melhor, que é a **lapidação Opus** em processos curtos e de contexto limpo (briefing + rascunho + regras do §10.3 das diretrizes, sem reler o projeto inteiro).
- **Medir antes de prometer**: na etapa 2, lapidar 2 ou 3 capítulos e ver quanto da janela de 5 h e da semana cada um consome. Daí sai quantos capítulos por semana cabem.
- **Quando a cota acabar**, o papel tem três saídas, nesta ordem, e o painel pergunta qual usar: (1) esperar a renovação (o núcleo agenda); (2) o Opus pela cota do Antigravity, como hoje; (3) a API paga da Anthropic, só com autorização e teto, como a do Gemini. Trocar o modelo da lapidação (por exemplo, para o Sonnet) **só com o seu sim**, como já dizem as diretrizes.
- Se a produção crescer, o Max é a alavanca mais simples; não é necessário para começar.

---

## Fontes
- Plugin e skill do Swarm, lidos em `~/.gemini/antigravity/builtin/` (README do `swarm_board`, `native_swarm/SKILL.md`, `automation/SKILL.md`, `agentapi --help`).
- Antigravity: [Termos](https://antigravity.google/terms/), [FAQ](https://antigravity.google/docs/faq/), [CLI headless](https://antigravity.google/docs/cli/headless/), [referência da CLI](https://antigravity.google/docs/cli/reference/), [planos](https://antigravity.google/docs/plans/), [fórum sobre automação no plano de consumidor](https://discuss.ai.google.dev/t/supported-automation-into-an-existing-antigravity-conversation-on-a-consumer-plan/188220).
- Claude Code: [channels](https://code.claude.com/docs/en/channels), [referência de channels](https://code.claude.com/docs/en/channels-reference), [mensagens entre sessões](https://code.claude.com/docs/en/cross-session-messaging), [legal e conformidade](https://code.claude.com/docs/en/legal-and-compliance), [Agent SDK com o plano](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-plan).
- A2A: [Linux Foundation, um ano do A2A](https://linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year).
- Murais MCP abertos: [talking-stick](https://awesome.ecosyste.ms/projects/github.com%2Fmostlydev%2Ftalking-stick), [Agent Board](https://glama.ai/mcp/servers/DL4P1N/agent-board), [mcp-coordinator](https://swoofer.github.io/mcp-coordinator), [all-agents-mcp](https://awesome.ecosyste.ms/projects/github.com%2Fdokkabei97%2Fall-agents-mcp).
- Gemini e imagens: [extensão Nano Banana do Gemini CLI](https://github.com/gemini-cli-extensions/nanobanana), [geração de imagens na API](https://ai.google.dev/gemini-api/docs/image-generation.md.txt).
