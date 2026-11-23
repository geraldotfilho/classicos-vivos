# Narração da Parte 7 (2026-11-21): pontos para escuta do humano

Gravada pela API (Flex, chave principal), página inteira: 81 pedidos (79 blocos + 2 reparos cirúrgicos), 43.850 tokens de áudio, ~US$ 0,2003. Palavras-chave novas da parte (22, as outras 13 já existiam): 1 pedido em grupo + 4 avulsos (`ponte`, `zurro`, `chaves`), 3.234 tokens, ~US$ 0,0147. **Total da Parte 7: ~US$ 0,215** (86 pedidos). Conferência local (Whisper `large-v3-turbo`, CPU): 11/11 páginas e 35/35 palavras; `node tools/conferir-narracao.mjs --partes 7 --idiomas pt` terminou com "✅ Sem rajadas de ruído".

Elenco novo (escolhido no catálogo `VOZES-PT-BR.md`): mordomo `storyteller-10` (56, grave); lavrador `assistant-3`; alfaiate `csagent-7`; doutor Pedro Rezio `advisor-9`; viajante da ponte `storyteller-5`; pajem `csagent-2` (22). O aldeão e o velhinho da bengala reaproveitam as vozes dos dois velhos do tribunal da antiga Parte 4 (`techagent-5` e `concierge-10`). Teresa, Sanchica, Sansão, padre, mestre Nicolau, duque, duquesa e o coro do povo seguem com as vozes de antes.

Escolhas do roteiro para conferir:
- **O mordomo tem voz de homem**, diferente da voz grave feminina que fez a condessa Trifaldi na Parte 6. O texto diz que as vozes são "igualzinhas"; quem escuta as duas partes em seguida pode estranhar. Se preferir, dá para regravar só as falas do mordomo com a voz da condessa (`training-8`).
- A **carta de Sancho** (cap. 57) é lida na voz de Sansão (quem lê em voz alta), e a **carta de Dom Quixote** (cap. 58) sai na voz dele; os bilhetes do caderninho do mordomo ficam com a narradora.
- O viajante da ponte conta o caso inteiro, inclusive o raciocínio dos guardas (`p5-s18` a `p5-s22`), até "O tribunal inteiro ficou de boca aberta".
- `p6-s24` ("Governador? O nosso Sancho?"), dita pelo padre e por mestre Nicolau juntos, ficou com o PADRE.
- Os gritos do ataque de mentira (cap. 59) e o "Bem-vindo à Ilha Barataria" são do coro do povo.

Ouvir (avisos do Whisper):
- **`p3-s31`** ("doutor Pedro Rezio, nascido na aldeia de Tirafora"): o Whisper ouviu "Pedro Rezio" e "Tirafora" certos (escreveu "Dr." no lugar de "doutor"); conferir a sílaba forte de Re-zi-o, também em `p3-s32` e `p10-s18`, que passaram sem aviso.
- `p1-s15` ("Nem unzinho."): o Whisper ouviu "nenhumzinho".
- `p6-s16` ("...dois para a Sanchica"): o bloco saiu com "santica" e passou por reparo cirúrgico; conferir a emenda.
- `p9-s32` ("...que o bacielmo caiu no chão"): reparo cirúrgico; conferir a emenda.
- `p7-s19` e `p9-s25` (o zurro "IIIH-ÓÓÓ"): o Whisper não escreve a onomatopeia; conferir se o zurro foi dito. A palavra-chave `zurro` também ficou com aviso ("zoho"): ouvir o "rr".
- `p6-s30` ("o senhor Alonso"): o Whisper escreveu "Sr."; `p10-s2` ("e a fome também"): uma palavra a mais no fim do trecho, provavelmente da frase seguinte.
- As **atividades** (cartões de ordenar, contagens) usam a voz do aparelho por desenho do motor (`falar()` em `assets/js/livro.js`); só as palavras-chave do texto têm gravação.

## Mordomo com a voz da condessa (2026-11-23)
Decisão do humano: o MORDOMO passou a usar a voz da CONDESSA Trifaldi da Parte 6 (`pt-br-training-8`), já que é o mesmo homem disfarçado e o texto diz que as vozes são "igualzinhas". Págs. 2, 3, 7 e 8 regravadas pelo modo lote (~US$ 0,09). Pontos para escuta:
- As falas do mordomo nas págs. 2 ("O mar está de folga hoje"), 3, 7 e 8: conferir se a semelhança com a condessa aparece.
- `p7-s19` (o zurro "IIIH-ÓÓÓ" na carta de Sancho): o Whisper ouviu "e o o o"; ouvir se o zurro saiu.
- `p2-s13` ("anotava tudo", ouvido "anotava tido") e `p3-s31` ("Doutor" escrito "dr"): grafia do Whisper.
- A pág. 7 precisou de áudio novo num trecho da carta (a voz tinha parado depois da primeira frase); foi pedido de novo com `--relote`.
