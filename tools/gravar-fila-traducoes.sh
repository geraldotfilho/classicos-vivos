#!/usr/bin/env bash
# Fila de narração das traduções (en, fr, es) das Partes 2 a 4 de Dom Quixote.
# Só roda com autorização do humano (AGENTS.md §2.7): passe AUTORIZADO=1 no ambiente.
#
#   AUTORIZADO=1 bash tools/gravar-fila-traducoes.sh [partes] [idiomas]     # padrão: "2 3 4" e "en fr es"
#
# Ordem: primeiro as palavras-chave de todas as partes (poucos pedidos grandes), depois a narração, parte por
# parte (para entregar cada parte pronta nos três idiomas). Pode ser rodada de novo a qualquer hora: o que já
# foi gravado (hash igual) é pulado e os blocos pagos ficam no cache. Se a cota diária acabar (código 75),
# a fila para; volte depois das 07:00 UTC.
set -u
cd "$(dirname "$0")/.."
[ "${AUTORIZADO:-}" = "1" ] || { echo "Defina AUTORIZADO=1 (a API paga só pode ser usada com autorização do humano)"; exit 2; }
PARTES=${1:-"2 3 4"}
IDIOMAS=${2:-"en fr es"}
LISTA_PARTES=$(echo $PARTES | tr ' ' ',')

rodar() {
    npm run --silent gravar:narracao -- "$@" --autorizado
    local c=$?
    if [ $c -eq 75 ]; then echo "FILA_PARADA_POR_COTA"; exit 75; fi
    return $c
}

for l in $IDIOMAS; do
    echo "=== palavras $l (partes $LISTA_PARTES)"
    rodar --voz palavras --idioma "$l" --parte "$LISTA_PARTES"
done
for p in $PARTES; do
    for l in $IDIOMAS; do
        echo "=== narração $l parte $p"
        rodar --voz narracao --idioma "$l" --parte "$p" --pagina-inteira
    done
done
echo "FILA_CONCLUIDA"
