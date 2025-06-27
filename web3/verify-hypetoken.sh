#!/bin/bash

# Script para verificar o contrato HypeToken
# Usa os endereços salvos em deployedContracts.txt

echo "🔍 Verificando contrato HypeToken..."

# Carregar endereços do arquivo
if [ -f "deployedContracts.txt" ]; then
    source deployedContracts.txt
    echo "📋 Endereço do HypeToken: $HYPETOKEN_ADDRESS"
else
    echo "❌ Arquivo deployedContracts.txt não encontrado!"
    echo "💡 Execute primeiro o deploy-all.sh"
    exit 1
fi

# Verificar o contrato HypeToken
echo "🔧 Executando verificação..."
forge verify-contract "$HYPETOKEN_ADDRESS" "src/HypeToken.sol:HypeToken" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20"

echo ""
echo "✅ Verificação do HypeToken concluída!" 