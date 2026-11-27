# 🎬 Receita do coordenador no Claude — o método do Swarm com os meios do Claude Code

Para **um futuro coordenador que viva no Claude** (Claude Code, na nuvem ou no app) e seja chamado pelo humano para tocar uma parte de um livro **com a mesma metodologia do Swarm do Antigravity**. Registrada em 2026-11-27, a partir do estudo do plugin Swarm instalado na máquina do humano e de como as Partes 1 e 2 de *Robin Hood* foram produzidas.

> **Quando usar**: só quando o humano pedir. O trabalho pesado do projeto roda no Swarm do Antigravity (decisão do humano, 2026-11-27); o Claude fica, no dia a dia, com bugs e Issues. Esta receita é a reserva para quando o humano quiser o método aqui.
>
> **Leia antes**: `docs/RETOMADA.md`, `AGENTS.md` (§0, §2.7, §6), a receita geral (`docs/RECEITA-CLASSICO-VIVO.md`), a receita e as diretrizes da obra (para Robin Hood, `docs/receitas/ROBIN-HOOD.md` e `docs/DIRETRIZES_ROBIN_HOOD.md`, sobretudo §10–12) e o caderno da parte. **Esta receita não substitui nenhum deles**: ela só traduz o *como* do Swarm para as ferramentas do Claude. Em conflito, valem aqueles.

---

## 1. Como o Swarm funciona no Antigravity (o que estamos imitando)

- O **coordenador** é a conversa em que o swarm nasce. Ele conversa com o humano, divide o trabalho e **não faz o trabalho técnico**: lê o que volta, julga e decide o próximo passo.
- Os **trabalhadores** são outras conversas completas, cada uma com **um papel, um modelo e um briefing**. O briefing é tudo o que o trabalhador sabe: ele não viu a conversa com o humano.
- Todos escrevem num **mural** comum e se acordam por `@menção` (o escritor posta e chama o `@revisor-opus`; o revisor devolve com `@coordinator [done]`). Quem espera dorme sem gastar nada.
- Regras de ouro do próprio Swarm: **um dono por arquivo**; **time enxuto** (todo membro custa cota, todo post é lido por todos); **um verificador** para cada 2–4 trabalhadores; o verificador aponta, o autor corrige.
- O time de Robin Hood (`DIRETRIZES_ROBIN_HOOD.md` §12): coordenador (Neon), diversidade e compliance (Neon), escritor (Hydrogen, barato), lapidador (Claude Opus), ilustrador de prompts (Hydrogen), diretor de animação (Neon) e crítico de arte (Hydrogen). A arte saía do gerador gratuito do Antigravity e, quando autorizado, da API em Batch.

## 2. O que muda no Claude

| No Swarm do Antigravity | No Claude Code |
| :--- | :--- |
| Trabalhador = outra conversa | **Subagente** (ferramenta `Agent`), com `model` próprio (`opus`, `sonnet`, `haiku`) e o briefing como `prompt` |
| Mural compartilhado e `@menção` | **Não há mural**: tudo passa pelo coordenador. O que um subagente entrega, o coordenador lê, julga e repassa ao próximo. O registro durável é o **caderno da parte** (`docs/cadernos/`) |
| `swarm_wait` (dormir de graça) | Subagentes **em segundo plano** avisam quando terminam; não faça *polling*. Para continuar um subagente com o contexto dele, `SendMessage` com o id dele |
| Conversas em paralelo | Subagentes em paralelo **só para arquivos diferentes**; com `isolation: "worktree"` quando forem escrever arquivos |
| Cota separada por modelo | **Tudo divide a cota do plano Claude Pro do humano**: a conversa do coordenador, todos os subagentes e as sessões na nuvem. O Opus é o recurso mais escasso |
| Gerador de imagens nativo e gratuito | **Não existe no Claude.** Imagens só pela API do Gemini (`npm run gerar:imagens`, Batch), com autorização expressa e teto (`AGENTS.md` §2.7). O Claude **vê** imagens (`Read` num `.webp`/`.png`), então critica e confere a arte |
| Narração pela API | Igual: `npm run gravar:narracao`, só com autorização |

**Nunca** tente comandar o Antigravity a partir do Claude (abrir conversas, mandar mensagens, `agentapi`, `agy -p`): os termos do plano de consumidor do Google proíbem e a conta do humano pode ser suspensa (estudo em `docs/estudos/EDITORA-CLASSICOS-VIVOS.md` §2).

## 3. O time no Claude

O coordenador é a própria sessão. Os papéis viram subagentes chamados com estes modelos (os nomes de modelo mudam com o tempo: use o mais forte disponível para o lapidador e o mais barato que dê conta para o resto):

| Papel no Antigravity | No Claude | Modelo | Recebe | Devolve |
| :--- | :--- | :--- | :--- | :--- |
| `@coordinator` | **a sessão principal** | o da sessão | o humano, os cadernos, as entregas | briefings, decisões, `parte-N.html` editado, build, commits, entrega na `main` |
| `@escritor-hydrogen` | subagente **escritor** | `haiku` ou `sonnet` | briefing de **um** capítulo (§5.1) | só o texto do capítulo (cabeçalho, título, 4 parágrafos, palavras-chave, `comandoAtividade`, `voceSabia`). **Não edita arquivos** |
| `@revisor-opus` | subagente **lapidador** | `opus` | rascunho + briefing + regras do §10.3 das diretrizes | texto lapidado + 3 a 5 notas curtas. **Não edita arquivos** |
| `@diversidade-compliance` | subagente **diversidade** | `sonnet` (ou `opus` em decisões de elenco) | escaleta ou bloco de capítulos lapidados, regras de diversidade da obra | lista de pontos, cada um com trecho, motivo e proposta que mantém o espírito da obra |
| crítico adversarial (receita geral) | subagente **crítico**, contexto limpo | `sonnet` | a parte inteira em rascunho | notas por página e correções críticas |
| `@ilustrador-hydrogen` | subagente **ilustrador** | `sonnet` | caderno (pedidos de arte), estilo da obra, fichas de personagem | a lista de pedidos `tools/arte/<obra>-parte-N.mjs` (pode escrever esse arquivo) |
| geração das imagens | **o coordenador** | — | autorização do humano com teto | `npm run gerar:imagens -- --lista ... --seco`, depois a rodada real, `npm run build:images` |
| `@diretor-animacao` | subagente **animação** (worktree) | `sonnet` | cenas prontas, regras de camadas e véus (diretrizes §11) | camadas calibradas e capturas em 1280×800 e 800×1280 (Playwright, `AGENTS.md` §5) |
| `@critico-arte-hydrogen` | subagente **crítico de arte**, contexto limpo | `sonnet` | os `.webp` e as capturas (ele os abre com `Read`) | checklist do §11.1 das diretrizes, item a item, com aprovado ou refazer |

Escritor e lapidador **devolvem texto**; quem aplica no `parte-N.html` é o coordenador. Assim um único dono mexe no arquivo do livro, e nada fica pela metade se um subagente falhar.

## 4. O ciclo de uma parte (mesmas fases da receita geral)

1. **Ler** (fase 1.0): o fim da parte anterior, o caderno, a escaleta aprovada. Sem escaleta aprovada pelo humano 🛑, a primeira entrega é a escaleta.
2. **Concepção com diversidade**: subagente de diversidade sobre a escaleta e o elenco, antes de escrever.
3. **Texto, capítulo a capítulo**: briefing → escritor → lapidador → o coordenador confere fatos, extensão (4 parágrafos, ~170–195 palavras), palavras-chave e continuidade → aplica no arquivo. Em blocos de 3 ou 4 capítulos, uma passada de diversidade sobre o bloco.
   - **Paralelismo**: capítulos de um mesmo bloco podem ir ao escritor ao mesmo tempo **se** os briefings já fixarem quem sabe o quê e quem veste o quê; a lapidação pode seguir em paralelo. A aplicação no arquivo é sempre sequencial, pelo coordenador.
4. **Crítica adversarial** da parte inteira (contexto limpo) → polimento pelo coordenador → `npm run build` → teste nos dois tamanhos → commit → entrega na `main` → 🛑 **parar para o humano** ler.
5. **Arte** (só com autorização e teto no prompt da sessão): ilustrador escreve a lista → coordenador roda `--seco`, mostra o custo previsto e roda a geração → crítico de arte → refazer só o reprovado (no máximo 2 tentativas) → animação → crítico de arte de novo nas capturas → registro em `docs/arte/gastos.csv` → entrega → 🛑.
6. **Caderno e retomada**: a cada entrega, o caderno da parte (fase, data, commit, gasto) e a `docs/RETOMADA.md`.

## 5. Modelos de briefing

### 5.1 Para o escritor (um capítulo)
Use o template do §10.2 de `DIRETRIZES_ROBIN_HOOD.md` (ou o equivalente da obra) e acrescente no topo:
```text
Você é o redator inicial de um livro infantil (leitor de 6 anos). Não edite nenhum arquivo: devolva só o texto do capítulo,
no formato do window.LIVRO (capitulo, titulo, texto com {{PALAVRA|SÍ • LA • BAS|emoji}}, e comandoAtividade/voceSabia se pedidos).
Respeite o teto de 4 parágrafos curtos. Não invente fatos fora do briefing. Não antecipe o próximo capítulo.
```

### 5.2 Para o lapidador
```text
Você é o lapidador literário. Missão única: beleza, som de leitura em voz alta e imagens sensoriais para uma criança de 6 anos,
sem mudar nenhum fato do roteiro e sem passar de 4 parágrafos curtos (~180–195 palavras). Regras: [colar o §10.3 das diretrizes].
Não edite arquivos. Devolva o capítulo lapidado no mesmo formato e, depois, de 3 a 5 notas curtas sobre as escolhas e dúvidas.
[briefing do capítulo] [rascunho do escritor] [fim do capítulo anterior, para a continuidade]
```

### 5.3 Para os críticos (contexto limpo)
Diga só o que avaliar, contra qual checklist e em que formato devolver. Não conte o que você acha que está errado: o valor do crítico é não ter o seu viés.

## 6. Economia (plano Claude Pro)

- **O coordenador não lapida nem escreve rascunho**: ele gasta a cota com o que só ele pode fazer (decidir, conferir, aplicar). O texto grande vai para o escritor barato; o Opus entra só na lapidação.
- **Briefings enxutos**: mande ao subagente o trecho das regras de que ele precisa, não o projeto inteiro.
- **Cota acabando**: pare num ponto limpo (commit do que está pronto), registre no caderno e na `RETOMADA.md` onde parou e qual é o próximo capítulo. **Não troque o modelo do lapidador sem o sim do humano**. Agendar retomada só se o humano pedir.
- API paga do Gemini: as regras do `AGENTS.md` §2.7 valem integralmente (autorização no prompt, modo mais barato, `--seco` primeiro, gasto registrado e informado ao fim).

## 7. Como o humano chama o coordenador

> Coordenador Claude: leia docs/RECEITA-COORDENADOR-CLAUDE.md e siga o método para a fase N da Parte M de <obra> (caderno docs/cadernos/<obra>-parte-M.md). [Autorizo a API paga do Gemini para as ilustrações da Parte M, até US$ X.]

Ao terminar: build, testes, caderno, `RETOMADA.md`, entrega na `main` (`AGENTS.md` §6) e um resumo com o que mudou, o que espera o humano 🛑 e quanto foi gasto.
