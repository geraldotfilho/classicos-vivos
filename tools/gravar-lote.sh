#!/usr/bin/env bash
# Narração pelo modo LOTE da API (Batch: metade do preço e fora do limite de 100 pedidos por dia).
# Só roda com autorização do humano (AGENTS.md §2.7): passe AUTORIZADO=1 no ambiente.
#
#   AUTORIZADO=1 bash tools/gravar-lote.sh --voz narracao --idioma en --parte 6 --pagina-inteira
#   AUTORIZADO=1 bash tools/gravar-lote.sh --voz palavras --idioma fr --parte 5,6
#
# Repete o comando de tools/gravar-narracao.mjs com --lote até não sobrar pedido: cada rodada lê o que já
# voltou dos lotes, monta as páginas, junta o que falta (inclusive reparos) num lote novo e espera por ele
# (código 76 = "rode de novo"). No máximo 6 rodadas.
set -u
cd "$(dirname "$0")/.."
[ "${AUTORIZADO:-}" = "1" ] || { echo "Defina AUTORIZADO=1 (a API paga só pode ser usada com autorização do humano)"; exit 2; }
export NODE_USE_ENV_PROXY=1
for rodada in 1 2 3 4 5 6; do
    echo "=== rodada $rodada: $*"
    node --no-warnings tools/gravar-narracao.mjs "$@" --lote --autorizado
    c=$?
    [ $c -eq 76 ] || exit $c
done
echo "LOTE_SEM_CONVERGIR: ainda havia pedidos depois de 6 rodadas"
exit 1
