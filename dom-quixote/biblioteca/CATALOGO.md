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
| 1 · O Fidalgo Leitor | `p1-real`, `p1-real-livro-castelos`, `p1-real-livro-dragoes`, `p1-real-livro-cavaleiros`, `p1-imag` | Livros dos Castelos, Dragões e Cavaleiros entregues (NB-3 completo) |
| 2 · A Armadura do Bisavô | `p2-real-stage-0` … `p2-real-stage-4`, `p2-imag` | Etapas **cumulativas**: 1 peitoral → 2 +bacia → 3 +escudo → 4 +lança. `p2-imag` alinhado em escala/posição com `stage-4` e `p2-real-stage-1` com cabelo/rosto consistente com `stage-0` (NB-4 completo) |
| 3 · Rocinante e Dulcineia | `p3-real`, `p3-real-stage-1` … `p3-real-stage-3`, `p3-imag` | Etapas: cocho vazio (`p3-real`) → 1 maçã → 2 cenoura → 3 crina escovada e brilhante (`p3-real-stage-3`). Mesmo enquadramento estável entre todas as etapas (NB-5 completo) |
| 4 · Pousada ou Castelo | `p4-real`, `p4-real-fundo`, `p4-real-flauta`, `p4-real-sopa`, `p4-imag` | Camadas em aquarela: `p4-pastor-parado`, `p4-pastor-tocando`, `p4-porquinhos`, `p4-notas-musicais`, `p4-estalajadeiro-acenando`, `p4-estalajadeiro-sopa` (NB-2) |
| 5 · A Cerimônia | `p5-real`, `p5-imag` | |
| 6 · Sancho Pança | `p6-real`, `p6-imag` | `p6-imag` na mesma estrada/câmera com Dom Quixote de ouro e Sancho governador, céu livre; camada `camadas/p6-nuvem-ilha.webp` com canal alfa limpo (NB-6 completo) |
| 7 · Os Moinhos | `p7-real`, `p7-real-sem-pas`, `p7-imag` | Camada de pás em aquarela: `camadas/p7-pas-moinho.webp` (NB-1) |

### Parte 2 — Exércitos de Lã e o Elmo Encantado (`../imagens/parte-2/`)

| Página | Arquivos | Observação |
| :--- | :--- | :--- |
| 0 · Capa | `p0-real`, `p0-imag` | Realidade: Gemini (Antigravity); Imaginação refeita pelo Claude (API) |
| 1 · O Tombo nos Moinhos | `p1-real`, `p1-imag` | idem |
| 2 · A Lança de Carvalho | `p2-real`, `p2-imag` | idem |
| 3 · Os Pastores | `p3-real`, `p3-imag` | idem. Camadas `p3-bolotas`, `p3-queijo`, `p3-leite` (Gemini) |
| 4 · Os Exércitos de Poeira | `p4-real`, `p4-imag` | Camadas `p4-poeira-esquerda`, `p4-poeira-direita` (somem com SOPRO). Claude pela API, 2026-10-24 |
| 5 · O Cavaleiro da Triste Figura | `p5-real`, `p5-imag` | Claude pela API, 2026-10-24 |
| 6 · As Cabras do Rio | `p6-real`, `p6-imag` | Camadas `p6-balao-historia` e `p6-cabra` (usada 5 vezes). Claude pela API, 2026-10-24 |
| 7 · O Segredo do Amanhecer | `p7-real` (galpão sem os martelos), `p7-imag` | Camada `p7-martelos` (anim `martelar`). Claude pela API, 2026-10-24 |
| 8 · O Elmo de Mambrino | `p8-real`, `p8-imag` | Claude pela API, 2026-10-24 |

**Todas as Imaginações da Parte 2 foram refeitas em 2026-10-24** com a bíblia da Imaginação (Dom Quixote cavaleiro dourado, Rocinante corcel branco, Sancho escudeiro). Prompts das páginas 4 a 8 e de todas as Imaginações: `tools/arte/dom-quixote-parte-2.mjs` (método em `docs/ARTE-PELA-API.md`).

### Parte 3 — Serra Morena e a Princesa Micomicona (`../imagens/parte-3/`)
Toda a parte pelo Claude, pela API (2026-10-24). Prompts: `tools/arte/dom-quixote-parte-3.mjs` (+ `dom-quixote-comum.mjs`).

| Página | Arquivos | Observação |
| :--- | :--- | :--- |
| 0 · Capa | `p0-real`, `p0-imag` | Serra Morena; na Imaginação, reino encantado com castelos nos picos |
| 1 · A Mala Perdida | `p1-real`, `p1-imag` | Camadas `p1-moedas`, `p1-caderno` (dentro da mala aberta) |
| 2 · As Cambalhotas | `p2-real`, `p2-imag` | Camada `p2-quixote-camisolao` (gira com CAMBALHOTA) |
| 3 · A Carta | `p3-real`, `p3-real-lembrou`, `p3-imag` | `p3-real-lembrou` quando a assinatura fica completa |
| 4 · Amigos Disfarçados | `p4-real`, `p4-imag` | Primeira cena do padre e do barbeiro (referência das seguintes) |
| 5 · A Princesa Micomicona | `p5-real`, `p5-imag` | Primeira cena de Doroteia |
| 6 · A Batalha dos Odres | `p6-real`, `p6-imag` | Camadas `p6-odre` (com o próprio gancho, usada 3 vezes) e `p6-respingo` |
| 7 · Armas e Letras | `p7-real`, `p7-imag` | |

### Parte 4 — A Jaula Encantada e a Ilha de Sancho (v1 arquivada: `../imagens/acervo/parte-4-v1/`)
Toda a parte pelo Claude, pela API (2026-10-24). Prompts: `tools/arte/dom-quixote-parte-4-v1.mjs`.

| Página | Arquivos | Observação |
| :--- | :--- | :--- |
| 0 · Capa | `p0-real`, `p0-imag` | Na Imaginação, Sancho governador e a ilha encantada |
| 1 · A Jaula Encantada | `p1-real`, `p1-imag` | Carruagem de cristal na Imaginação |
| 2 · De Volta para Casa | `p2-real`, `p2-imag` | Primeira cena da sobrinha, da governanta, de Teresa e Sanchica |
| 3 · Clavilenho | `p3-real` (centro livre), `p3-imag` | Camadas `p3-clavilenho`, `p3-vento-fole`, `p3-calor-tocha` |
| 4 · Conselhos | `p4-real`, `p4-imag` | Imaginação de Sancho: governador sob a palmeira |
| 5 · A Bengala | `p5-real`, `p5-imag` | Camadas `p5-bengala-inteira`, `p5-bengala-quebrada` |
| 6 · O Burrico | `p6-real`, `p6-imag` | Imaginação: liberdade no campo florido |
| 7 · As Aventuras Moram nos Livros | `p7-real`, `p7-imag` | A sala da Parte 1; as aventuras saem da lareira |

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
| `gatinho-dormindo.png` / `leao-guardiao.png` | Gatinho da sala / Leão Guardião (sprite em aquarela com canal alfa, NB-8) |
| `dragao-dourado.png` | Dragão dourado amigável |
| `gigantes-moinhos.png` | Gigantes com braços de pás de moinho |

## 🏞️ 4. Cenários Vazios (`./referencias/cenarios/`)

| Arquivo | Descrição |
| :--- | :--- |
| `sotao-fundo.jpg` | Sótão vazio da página 2 (palco para sprites em camadas) |

## 🧰 5. Adereços de Referência (`./referencias/itens/`)

`bacia-barbeiro.png`, `escudo-tampa.png`, `maca-cenoura-cocho.png` (rasters com transparência) e os SVGs fora de uso no livro: `espada-real.svg`, `lua-cheia.svg`, `medalhao-dulcineia.svg` (cartões removidos da página 5 por excesso de gamificação).
