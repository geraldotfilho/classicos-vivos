# 🗂️ Catálogo de Ativos — Dom Quixote

Os ativos do livro ficam em **dois lugares, sem cópias duplicadas**:

| Pasta | O que guarda | Carregada pelo livro? |
| :--- | :--- | :--- |
| `../imagens/` | Ilustrações finais das cenas (`pN-*.webp`) e ícones das bandejas (`objetos/*.svg`) | ✅ Sim (e baixada pelo service worker para uso offline) |
| `../imagens/camadas/` | Camadas com alfa sobrepostas às cenas pelo livro (personagens e adereços animáveis, ver `AGENTS.md` §4.2). *Ainda vazia: chega com NB-1, NB-2 e NB-6.* | ✅ Sim |
| `./referencias/` | Banco de referências para o Nano-Banana: sprites de personagens, cenários vazios e adereços | ❌ Não, serve só de contexto para gerar arte nova |

> Toda ilustração **finalizada** em `../imagens/` também vale como referência de estilo e continuidade para novos prompts. Não copie esses arquivos para `referencias/`: aponte o caminho original.

---

## 🖼️ 1. Ilustrações das Cenas (`../imagens/`)

Convenção: `pN` = índice da página (`?page=N`), sufixo `-real` (Lente da Realidade) ou `-imag` (Lente da Imaginação). Formato **WebP**, 1376 × 768 (16:9).

| Página | Arquivos | Observação |
| :--- | :--- | :--- |
| 0 · Capa | `p0-real`, `p0-imag` | |
| 1 · O Fidalgo Leitor | `p1-real`, `p1-real-livro-castelos`, `p1-imag` | Livro dos Castelos entregue (NB-3); Dragões e Cavaleiros aguardando reset de cota |
| 2 · A Armadura do Bisavô | `p2-real-stage-0` … `p2-real-stage-4`, `p2-imag` | Etapas **cumulativas**: 1 peitoral → 2 +bacia → 3 +escudo → 4 +lança |
| 3 · Rocinante e Dulcineia | `p3-real`, `p3-real-stage-1` … `p3-real-stage-3`, `p3-imag` | Etapas: 1 maçã → 2 cenoura → 3 escova |
| 4 · Pousada ou Castelo | `p4-real`, `p4-real-fundo`, `p4-real-flauta`, `p4-real-sopa`, `p4-imag` | Camadas em aquarela: `p4-pastor-parado`, `p4-pastor-tocando`, `p4-porquinhos`, `p4-notas-musicais`, `p4-estalajadeiro-acenando`, `p4-estalajadeiro-sopa` (NB-2) |
| 5 · A Cerimônia | `p5-real`, `p5-imag` | |
| 6 · Sancho Pança | `p6-real`, `p6-imag` | |
| 7 · Os Moinhos | `p7-real`, `p7-real-sem-pas`, `p7-imag` | Camada de pás em aquarela: `camadas/p7-pas-moinho.webp` (NB-1) |

---

## 🎒 2. Ícones das Bandejas (`../imagens/objetos/`)

| Arquivo | Palavra | Página |
| :--- | :--- | :--- |
| `livro-dragoes.svg`, `livro-castelos.svg`, `livro-cavaleiros.svg` | **DRAGÕES**, **CASTELOS**, **CAVALEIROS** | 1 |
| `armadura-peitoral.svg`, `bacia-elmo.svg`, `escudo-panelao.svg`, `lanca-bandeirola.svg` | **ARMADURA**, **BACIA**, **ESCUDO**, **LANÇA** | 2 |
| `maca.svg`, `cenoura.svg`, `escova.svg` | **MAÇÃ**, **CENOURA**, **ESCOVA** | 3 |
| `trombeta-flauta.svg`, `sopa-banquete.svg` | **TROMBETA**, **SOPA** | 4 |
| `vento-sopro.svg` | **VENTO** | 7 |
| `moinho-pas.svg` | — (pás giratórias sobrepostas aos moinhos) | 7 |

---

## 🧍 3. Personagens de Referência (`./referencias/personagens/`)

| Arquivo | Descrição |
| :--- | :--- |
| `alonso-quixano-sem-armadura.png` | Alonso Quixano em roupas simples (base da página 2) |
| `alonso-quixano-etapa-1-armadura.png` | Etapa 1: peitoral enferrujado |
| `alonso-quixano-etapa-2-bacia.png` | Etapa 2: + bacia de barbeiro na cabeça |
| `alonso-quixano-etapa-3-escudo.png` | Etapa 3: + tampa de panela como escudo |
| `alonso-quixano-armadura-improvisada.png` | Etapa 4: armadura caseira completa com lança |
| `don-quixote-cavaleiro-dourado.png` | Dom Quixote em armadura dourada (Imaginação) |
| `dom-quixote-sotao-real.png` / `dom-quixote-sotao-ouro.png` | Versões em pé no sótão (Realidade / Imaginação) |
| `dom-quixote-rocinante-real.png` | Dom Quixote de bacia montado no Rocinante magrinho |
| `dom-quixote-heroi-dourado.png` | Dom Quixote dourado no corcel branco |
| `rocinante-estabulo-real.png` / `rocinante-corcel-branco.png` | Rocinante real / corcel branco imaginado |
| `aldonza-camponesa.png` / `princesa-dulcineia.png` | Aldonza Lorenzo / Princesa Dulcineia |
| `sancho-panca-acenando.png` / `sancho-ilha-sonho.png` | Sancho Pança / Sancho governador da ilha |
| `gatinho-dormindo.png` / `leao-guardiao.svg` | Gatinho da sala / Leão Guardião (o SVG é provisório: regerar no Nano-Banana) |
| `dragao-dourado.png` | Dragão dourado amigável |
| `gigantes-moinhos.png` | Gigantes com braços de pás de moinho |

## 🏞️ 4. Cenários Vazios (`./referencias/cenarios/`)

| Arquivo | Descrição |
| :--- | :--- |
| `sotao-fundo.jpg` | Sótão vazio da página 2 (palco para sprites em camadas) |

## 🧰 5. Adereços de Referência (`./referencias/itens/`)

`bacia-barbeiro.png`, `escudo-tampa.png`, `maca-cenoura-cocho.png` (rasters com transparência) e os SVGs fora de uso no livro: `espada-real.svg`, `lua-cheia.svg`, `medalhao-dulcineia.svg` (cartões removidos da página 5 por excesso de gamificação).
