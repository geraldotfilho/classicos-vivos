# Falas das atividades gravadas: pontos para escuta (Dom Quixote, Partes 1 a 8, pt/en/fr/es)

> **Gravadas em 2026-11-23** pelo modo lote (`AUTORIZADO=1 bash tools/gravar-lote.sh --voz falas [--idioma X] --parte 1,2,3,4,5,6,7,8`), com a narradora de cada idioma (pt `pt-br-storyteller-9`, en `en-gb-storyteller-2`, fr `fr-fr-tutor-4`, es `es-es-tutor-12`). Conferência local pelo Whisper (`tools/transcrever.py`). Como funciona no motor: `AGENTS.md` §2.6 ("Falas das atividades").
> **O que foi gravado**: os comandos 🎮 (🔊 do quadro), as palavras dos cartões falados (`ordem` e `pedido`), as sílabas e as letras das assinaturas, as pegadinhas e as falas da contagem. **Não** foram gravadas as perguntas dos desafios 🧩 (continuam na voz do aparelho, por decisão: o texto ainda pode mudar).
> **Onde ouvir**: abra a página da atividade (`?page=N`) no idioma, toque no 🔊 do quadro 🎮 e nos cartões. Nas traduções, as falas só tocam gravadas nas partes que já estão em `partes`/`previa` da narração do idioma no `vozes.js` (en/fr/es: Partes 1 a 6 hoje; 7 e 8 entram com a narração das páginas).

## Situação

| Idioma | Falas | Gravadas |
| :--- | :--- | :--- |
| pt | 107 | 107/107 |
| en | 107 | 107/107 |
| fr | 108 | 108/108 |
| es | 108 | 108/108 |

Gasto: ~US$ 0,22 no modo lote (linhas `--voz falas` de `docs/narracao/gastos.csv`), com as rodadas de reparo. Em francês e espanhol, os cartões das frases em ordem ("il / était / une / fois", "de los / leones") a voz emendava como uma frase só: foram regravados um por pedido (`--agrupar 1`), e o script agora embaralha os cartões em grupos de até 12.

## Pontos para escuta

O Whisper confere mal palavra solta, sílaba e nome de letra (escreve "Tchau" para "cho", "This" para "vez"), então esses itens foram salvos pelo corte nas pausas e pela duração, e pedem ouvido. Ordem de prioridade:

### Português
- **Letras das assinaturas** (P4 p3 M-A-G-O-I; P7 p7 S-A-N-C-H-O; P8 L-I-V-R-O): devem soar "eme", "á", "gê", "ó", "i", "esse", "ene", "cê", "agá", "ele", "vê", "erre".
- **Sílabas** (P4 p2 BA-CI-EL-MO; P5 SAN-CHO-PAN-ÇA): "el" não pode soar como a letra L; "ça" deve soar "sa"; "cho" (o Whisper ouviu "Tchau").
- **P4 p5, comando do piquenique**: o Whisper ouviu "Sancho **tá** com fome. **Olha** a figura…" (o texto é "está… Olhe"). Se a voz trocou mesmo, regravar (ver "Como regravar").
- **P6, pegadinha da TOUCA**: o Whisper ouviu "Toca? Puseram uma toca no cavalo…". Conferir se a voz disse "touca".
- **P2 p6, "Quatro cabras!"**: a primeira gravação saiu cortada (0,6 s) e foi regravada sozinha; conferir.
- **Cartões "vez" (P8) e "portão" (P7)**: o Whisper ouviu outra coisa no arquivo final; ouvir.
- **P4 p2, comando**: "…a nova palavra de Sancho: BA-CI-EL-MO!" (a voz precisa ler as sílabas, não "baciel").

### Inglês
- **P4 p2, comando BA-SIN-HEL-MET**: a frase teve defeito e foi emendada por reparo; conferir a emenda e a leitura das sílabas.
- **Sílabas** "pan" e "za" (P5 SAN-CHO-PAN-ZA; o Whisper ouviu "Panzer" e "BANG!").
- **Letras** (P4 F-R-I-E-N-D; P7 S-A-N-C-H-O; P8 B-O-O-K): nomes britânicos ("ar", "aitch", "ee"); o "A" foi gravado como letra maiúscula (o nome "ay" seria lido "eye").

### Francês
- **P3 p3, comando da assinatura** ("Aide Sancho à signer…": o Whisper ouviu "Ed Sancho").
- **P4 p2, comando das sílabas** (BA-SI-EL-MO): o reparo também saiu com defeito; ficou o original. Ouvir.
- **Sílabas** el, mo, san, cho (o Whisper ouviu "Elle", "Sans", "Show", "Pa") e **letras** "elle", "emme", "e" (P4 A-M-I, P7 S-A-N-C-H-O, P8 L-I-V-R-E).
- **Cartões regravados um por pedido** (P3, P5, P8): "était" ("Ette ?"), "sancho" ("Sans Chaud"), "roi" ("Au revoir"), "eau" ("Oh"), "heaume" ("Ohm"); conferir que a palavra está inteira e sem sobra.

### Espanhol
- **Sílaba "ba"** e **letra "i"** (o Whisper ouviu "1.").
- **Cartão "vez"** (P8, gravado sozinho; o Whisper ouviu "Beth") e os cartões "de los", "leones", "fuelle", "antorcha" (P5/P6, regravados num grupo novo).

## Como regravar uma fala
1. Apague a entrada dela em `dom-quixote/audio/falas<-idioma>/indice.json` (em `frases` e em `textos`) e o MP3.
2. `AUTORIZADO=1 bash tools/gravar-lote.sh --voz falas [--idioma X] --parte 1,2,3,4,5,6,7,8` (só o que falta é pedido; custa centavos).
3. Texto mudou no livro? `npm run exportar:frases` e o mesmo comando: o `hash` muda e a fala é regravada.
