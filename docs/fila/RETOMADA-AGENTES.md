# Retomada dos agentes de Dom Quixote (fila combinada em 2026-11-22)

Plano para reiniciar a fila de agentes. Os subagentes pararam por limite de uso: o do assistente zera de tempos em tempos, e o da API de voz do Gemini (100 pedidos por dia) zera às 07:00 UTC (04:00 em Brasília).

## Situação em 2026-11-22, 19:50 (Brasília)

| Frente | Situação | Próximo passo |
| :--- | :--- | :--- |
| Narração pt, Parte 7 | ✅ completa e ativada | — |
| Narração pt, Parte 8 | 7/11 páginas (0–6) e 29/29 palavras; `previa: [8]` | gravar págs. 7–10 (~27 pedidos), conferir, trocar `previa: [8]` por `8` em `partes`, completar `docs/narracao/qa-parte-8.md` (**precisa da cota do Gemini**) |
| Tradução Parte 5 (en/es/fr) | ✅ no ar; **narração completa e ativada nos três idiomas (2026-11-23, modo lote)** | escuta: `docs/narracao/qa-parte-5-{en,es,fr}.md` |
| Tradução Parte 6 (en/es/fr) | ✅ no ar; **narração completa e ativada nos três idiomas (2026-11-23, modo lote)** | escuta: `docs/narracao/qa-parte-6-{en,es,fr}.md` |
| Tradução Parte 7 (en/es/fr) | ✅ no ar (2026-11-23; §11 do caderno da Parte 7) | narração: roteiros (`tools/derivar-roteiro.mjs --parte 7`), elenco novo, palavras (en 26, es 26, fr 25) e páginas; depois `7` em `partes` de cada idioma (**cota do Gemini**) |
| Tradução Parte 8 (en/es/fr) | ✅ no ar (2026-11-23; §9 do caderno da Parte 8) | narração: roteiros (`tools/derivar-roteiro.mjs --parte 8`), elenco novo, palavras e páginas; depois `8` em `partes` de cada idioma (**cota do Gemini**) |
| Narração en/es/fr das Partes 7 e 8 | elenco novo, roteiros e palavras-chave prontos; páginas em gravação (2026-11-23, modo lote) | conferir, ativar `7`/`8` em `partes`, escrever os QA |

## Ordem de retomada

1. **21:20 (Brasília)**: retomar as traduções das Partes 7 e 8 (texto, sem API). Se os subagentes antigos não puderem ser retomados, abrir agentes novos com o mesmo roteiro: ler `docs/RETOMADA.md`, os cadernos das partes, o §8 do caderno da Parte 5 e o §11 do da Parte 6; copiar o rascunho de `docs/fila/wip-traducoes/` para `dom-quixote/traducoes/parte-N.en.js` e continuar.
2. **04:15 (Brasília) / 07:15 UTC**: retomar as narrações pela API de voz (autorizada pelo humano em 2026-11-21, Flex). Ordem: (a) fim da Parte 8 em pt; (b) Partes 5 e 6 em en/es/fr; (c) Partes 7 e 8 em en/es/fr, quando as traduções estiverem na `main`.

## Regras que valem para todos

- **Nas atividades traduzidas, manter os ids do português** (`id`, `pedidos`, `ordem`) quando acionam camada, figura ou `realCena`. Um bug na Parte 4 vinha disso e foi corrigido em 2026-11-22.
- **A divisão em sílabas de uma palavra-chave já gravada nunca muda**: o áudio é um arquivo só por idioma, para todas as partes.
- **Teto de gasto**: US$ 8,50 em novembro, somando `docs/arte/gastos.csv` e `docs/narracao/gastos.csv` (≈ US$ 3,40 em 22/11). Diante de 429 persistente, registrar onde parou e encerrar.
- **O Antigravity avança a `main` em paralelo** (Robin Hood):
  - fetch e merge da `main` antes de cada commit e de cada push;
  - em conflito, manter as entradas dos dois lados nos documentos;
  - nos arquivos gerados, aceitar a versão da `main` e rodar `npm run build`;
  - nunca usar force-push.
- Entrega na `main` por merge, a cada marco.
- **Decisões pendentes do humano**:
  - gravar as falas das atividades (exige mudar o motor; ≈ US$ 0,13 na primeira etapa);
  - aplicar as 3 melhorias no `conferir-narracao.mjs` (`docs/narracao/AUDITORIA-ATIVIDADES-E-PALAVRAS.md`);
  - unificar os nomes da estante (`i18n-site.js`: "Chevillard" × "Clavilègne"; "baciyelmo"/"bassin-heaume" × "bacielmo");
  - voz do mordomo (`docs/narracao/qa-parte-7.md`).

Quando a fila terminar, os rascunhos de `docs/fila/wip-traducoes/` podem ser apagados.
