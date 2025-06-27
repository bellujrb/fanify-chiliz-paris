#!/bin/bash

# Script para consultar preços de gas
# Apenas mostra as informações, não executa transações

RPC_URL="https://x-api-key:t-6859e688783f495f8d570bd6-06901fcc8dfb494aada1194a@chiliz-testnet.gateway.tatum.io/"

echo "🔍 Consultando preços de gas na rede Chiliz Testnet..."
echo "================================================"

# Consultar gas price atual
CURRENT_GAS_PRICE=$(cast gas-price --rpc-url "$RPC_URL")
echo "💰 Gas Price atual: $CURRENT_GAS_PRICE wei ($(echo "scale=2; $CURRENT_GAS_PRICE / 1000000000" | bc) gwei)"

# Consultar base fee (EIP-1559)
BASE_FEE=$(cast base-fee --rpc-url "$RPC_URL")
echo "📊 Base Fee atual: $BASE_FEE wei ($(echo "scale=2; $BASE_FEE / 1000000000" | bc) gwei)"

# Calcular gas price recomendado para deploy (20% acima)
DEPLOY_GAS_PRICE=$(echo "$CURRENT_GAS_PRICE * 120 / 100" | bc)
echo "🚀 Gas Price recomendado para deploy: $DEPLOY_GAS_PRICE wei ($(echo "scale=2; $DEPLOY_GAS_PRICE / 1000000000" | bc) gwei)"

# Calcular gas price recomendado para schedule (15% acima)
SCHEDULE_GAS_PRICE=$(echo "$CURRENT_GAS_PRICE * 115 / 100" | bc)
echo "📅 Gas Price recomendado para schedule: $SCHEDULE_GAS_PRICE wei ($(echo "scale=2; $SCHEDULE_GAS_PRICE / 1000000000" | bc) gwei)"

# Calcular priority gas price recomendado
PRIORITY_GAS_PRICE=$(echo "$BASE_FEE * 150 / 100" | bc)
echo "⚡ Priority Gas Price recomendado: $PRIORITY_GAS_PRICE wei ($(echo "scale=2; $PRIORITY_GAS_PRICE / 1000000000" | bc) gwei)"

echo ""
echo "📋 Comandos recomendados:"
echo "================================================"
echo "Para deploy:"
echo "forge script script/Deploy.s.sol:DeployScript \\"
echo "  --rpc-url \"$RPC_URL\" \\"
echo "  --account sepolia \\"
echo "  --broadcast \\"
echo "  --legacy \\"
echo "  --gas-price $DEPLOY_GAS_PRICE \\"
echo "  --priority-gas-price $PRIORITY_GAS_PRICE"
echo ""
echo "Para schedule:"
echo "forge script script/ScheduleMatch.s.sol:ScheduleMatchScript \\"
echo "  --rpc-url \"$RPC_URL\" \\"
echo "  --account sepolia \\"
echo "  --broadcast \\"
echo "  --legacy \\"
echo "  --gas-price $SCHEDULE_GAS_PRICE \\"
echo "  --priority-gas-price $PRIORITY_GAS_PRICE" 