#!/bin/bash

# Script para agendar matches com gas dinâmico
# Consulta o gas atual e ajusta os parâmetros automaticamente

RPC_URL="https://x-api-key:t-6859e688783f495f8d570bd6-06901fcc8dfb494aada1194a@chiliz-testnet.gateway.tatum.io/"

echo "🔍 Consultando preços de gas na rede Chiliz Testnet..."

# Consultar gas price atual
CURRENT_GAS_PRICE=$(cast gas-price --rpc-url "$RPC_URL")
echo "💰 Gas Price atual: $CURRENT_GAS_PRICE wei ($(echo "scale=2; $CURRENT_GAS_PRICE / 1000000000" | bc) gwei)"

# Consultar base fee (EIP-1559)
BASE_FEE=$(cast base-fee --rpc-url "$RPC_URL")
echo "📊 Base Fee atual: $BASE_FEE wei ($(echo "scale=2; $BASE_FEE / 1000000000" | bc) gwei)"

# Calcular gas price para schedule (15% acima do atual)
SCHEDULE_GAS_PRICE=$(echo "$CURRENT_GAS_PRICE * 115 / 100" | bc)
echo "🚀 Gas Price para schedule: $SCHEDULE_GAS_PRICE wei ($(echo "scale=2; $SCHEDULE_GAS_PRICE / 1000000000" | bc) gwei)"

# Calcular priority gas price (base fee + 40%)
PRIORITY_GAS_PRICE=$(echo "$BASE_FEE * 140 / 100" | bc)
echo "⚡ Priority Gas Price: $PRIORITY_GAS_PRICE wei ($(echo "scale=2; $PRIORITY_GAS_PRICE / 1000000000" | bc) gwei)"

# Verificar se bc está instalado, se não, usar cálculo simples
if ! command -v bc &> /dev/null; then
    echo "⚠️  bc não encontrado, usando valores padrão..."
    SCHEDULE_GAS_PRICE=6000000000000
    PRIORITY_GAS_PRICE=2000000000000
fi

echo ""
echo "🎯 Agendando matches com parâmetros dinâmicos..."
echo "================================================"

# Executar o schedule com os parâmetros calculados
forge script script/ScheduleMatch.s.sol:ScheduleMatchScript \
    --rpc-url "$RPC_URL" \
    --account sepolia \
    --broadcast \
    --legacy \
    --gas-price "$SCHEDULE_GAS_PRICE" \
    --priority-gas-price "$PRIORITY_GAS_PRICE"

echo ""
echo "✅ Agendamento concluído!" 