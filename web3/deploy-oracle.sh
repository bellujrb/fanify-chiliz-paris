#!/bin/bash

# Script para deploy do Oracle usando forge create
# Consulta o gas atual e ajusta os parâmetros automaticamente

RPC_URL="https://x-api-key:t-6859e688783f495f8d570bd6-06901fcc8dfb494aada1194a@chiliz-testnet.gateway.tatum.io/"

echo "🔍 Consultando preços de gas na rede Chiliz Testnet..."

# Consultar gas price atual
CURRENT_GAS_PRICE=$(cast gas-price --rpc-url "$RPC_URL")
echo "💰 Gas Price atual: $CURRENT_GAS_PRICE wei ($(echo "scale=2; $CURRENT_GAS_PRICE / 1000000000" | bc) gwei)"

# Consultar base fee (EIP-1559)
BASE_FEE=$(cast base-fee --rpc-url "$RPC_URL")
echo "📊 Base Fee atual: $BASE_FEE wei ($(echo "scale=2; $BASE_FEE / 1000000000" | bc) gwei)"

# Calcular gas price para deploy (20% acima do atual para garantir)
DEPLOY_GAS_PRICE=$(echo "$CURRENT_GAS_PRICE * 120 / 100" | bc)
echo "🚀 Gas Price para deploy: $DEPLOY_GAS_PRICE wei ($(echo "scale=2; $DEPLOY_GAS_PRICE / 1000000000" | bc) gwei)"

# Calcular priority gas price (base fee + 50%)
PRIORITY_GAS_PRICE=$(echo "$BASE_FEE * 150 / 100" | bc)
echo "⚡ Priority Gas Price: $PRIORITY_GAS_PRICE wei ($(echo "scale=2; $PRIORITY_GAS_PRICE / 1000000000" | bc) gwei)"

# Verificar se bc está instalado, se não, usar cálculo simples
if ! command -v bc &> /dev/null; then
    echo "⚠️  bc não encontrado, usando valores padrão..."
    DEPLOY_GAS_PRICE=6000000000000
    PRIORITY_GAS_PRICE=2000000000000
fi

echo ""
echo "🎯 Deployando Oracle com forge create..."
echo "================================================"

# Executar o deploy do Oracle com forge create
forge create src/Oracle.sol:Oracle \
    --rpc-url "$RPC_URL" \
    --account sepolia \
    --legacy \
    --gas-price "$DEPLOY_GAS_PRICE" \
    --priority-gas-price "$PRIORITY_GAS_PRICE" \
    --verifier blockscout \
    --verifier-url https://scan.chiliz.com/api/

echo ""
echo "✅ Oracle deployado!"
echo "📝 Guarde o endereço para usar no deploy do Funify" 