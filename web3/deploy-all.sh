#!/bin/bash

# Script master para deploy de todos os contratos usando forge create
# Executa os deploys em sequência e captura os endereços automaticamente

RPC_URL="https://x-api-key:t-6859e688783f495f8d570bd6-06901fcc8dfb494aada1194a@chiliz-testnet.gateway.tatum.io/"

echo "🚀 Iniciando deploy completo dos contratos..."
echo "================================================"

# Função para extrair endereço do output do forge create
extract_address() {
    local output="$1"
    echo "$output" | grep -o "Deployed to: 0x[a-fA-F0-9]\{40\}" | cut -d' ' -f3
}

# 1. Deploy HypeToken
echo ""
echo "📦 [1/3] Deployando HypeToken..."
HYPETOKEN_OUTPUT=$(forge create src/HypeToken.sol:HypeToken \
    --rpc-url "$RPC_URL" \
    --account sepolia \
    --broadcast \
    --gas-price 6000000000000 \
    --priority-gas-price 2000000000000 \
    --verifier blockscout \
    --verifier-url https://scan.chiliz.com/api/)

HYPETOKEN_ADDRESS=$(extract_address "$HYPETOKEN_OUTPUT")
echo "✅ HypeToken deployado em: $HYPETOKEN_ADDRESS"

# 2. Deploy Oracle
echo ""
echo "📦 [2/3] Deployando Oracle..."
ORACLE_OUTPUT=$(forge create src/Oracle.sol:Oracle \
    --rpc-url "$RPC_URL" \
    --account sepolia \
    --broadcast \
    --gas-price 6000000000000 \
    --priority-gas-price 2000000000000 \
    --verifier blockscout \
    --verifier-url https://scan.chiliz.com/api/)

ORACLE_ADDRESS=$(extract_address "$ORACLE_OUTPUT")
echo "✅ Oracle deployado em: $ORACLE_ADDRESS"

# 3. Deploy Funify
echo ""
echo "📦 [3/3] Deployando Funify..."
FUNIFY_OUTPUT=$(forge create src/funify/Funify.sol:Funify \
    --rpc-url "$RPC_URL" \
    --account sepolia \
    --broadcast \
    --gas-price 6000000000000 \
    --priority-gas-price 2000000000000 \
    --verifier blockscout \
    --verifier-url https://scan.chiliz.com/api/ \
    --constructor-args "$HYPETOKEN_ADDRESS" "$ORACLE_ADDRESS")

FUNIFY_ADDRESS=$(extract_address "$FUNIFY_OUTPUT")
echo "✅ Funify deployado em: $FUNIFY_ADDRESS"

echo ""
echo "🎉 Deploy completo finalizado!"
echo "================================================"
echo "📋 Endereços dos contratos:"
echo "HypeToken: $HYPETOKEN_ADDRESS"
echo "Oracle: $ORACLE_ADDRESS"
echo "Funify: $FUNIFY_ADDRESS"
echo ""
echo "💾 Salvando endereços em deployedContracts.txt..."
echo "HYPETOKEN_ADDRESS=$HYPETOKEN_ADDRESS" > deployedContracts.txt
echo "ORACLE_ADDRESS=$ORACLE_ADDRESS" >> deployedContracts.txt
echo "FUNIFY_ADDRESS=$FUNIFY_ADDRESS" >> deployedContracts.txt
echo "✅ Endereços salvos!" 