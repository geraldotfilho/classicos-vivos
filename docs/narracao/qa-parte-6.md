# Narração da Parte 6 (2026-11-14): pontos para escuta do humano

Gravada pela API (Flex), página inteira: páginas 0–3 na sessão anterior (25 pedidos, 14.413 tokens, ~US$ 0,0658) e páginas 4–9 na retomada local (46 pedidos, 25.056 tokens, ~US$ 0,1144), mais as 19 palavras-chave novas da parte (1 pedido em lote + 3 avulsos para `rio`, `rei`, `torre`: 6 pedidos, 3.137 tokens, ~US$ 0,0143). Total estimado da Parte 6: ~US$ 0,1945 (77 pedidos, 42.606 tokens). Conferência local (Whisper `large-v3-turbo`).

Elenco novo (escolhido no catálogo `VOZES-PT-BR.md`): Mestre Pedro `advisor-6`; dono da pousada `techagent-1`; Duque `podcaster-1`; Duquesa `concierge-5`; Condessa Trifaldi `training-8`; Arauto `storyteller-8`; Primo Estudante `tutor-7`; Lourenço `commercial-5`; Cozinheiro `csagent-9`; Menino do teatrinho `training-6`; mais Dom Diego `podcaster-7` (da Parte 5) e o coro do povo `csagent-8` (da Parte 4).

Ouvir (avisos do Whisper nas páginas 4–9):
- `p4-s14` ("...bateu os dentes bem depressa: tatatatatá!"): o Whisper não transcreveu a onomatopeia `tatatatatá` no fim da frase.
- `p4-s22` ("Isso é coisa de mago, cochichou Sancho."): o Whisper ouviu `"coxuchou o sancho"` — conferir a dicção de `"cochichou"`.
- **`p4-s25`** (`"Tatatatatá!"`): o Whisper devolveu string vazia `""` — conferir se a onomatopeia foi dita e não ficou muda.
- `p5-s29` e `p5-s30` (`"Olhe a minha torre!"` / `"Eram bonecos, senhor!"`): o Whisper alinhou `"era"` na fronteira de `p5-s29` e ouviu `"um boneco senhor"` em `p5-s30` — conferir a transição entre as duas falas.
- `p8-s30` ("Sancho tapou os ouvidos: Está bem, está bem, eu vou!"): o Whisper ouviu `"ta bem ta bem"` (2 palavras diferentes).
