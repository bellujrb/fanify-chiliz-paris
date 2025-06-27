#!/bin/bash

# Script para verificar o contrato Oracle
# Usa os endereços salvos em deployedContracts.txt

echo "🔍 Verificando contrato Oracle..."

# Carregar endereços do arquivo
if [ -f "deployedContracts.txt" ]; then
    source deployedContracts.txt
    echo "📋 Endereço do Oracle: $ORACLE_ADDRESS"
else
    echo "❌ Arquivo deployedContracts.txt não encontrado!"
    echo "💡 Execute primeiro o deploy-all.sh"
    exit 1
fi

# Verificar o contrato Oracle
echo "🔧 Executando verificação..."
forge verify-contract "$ORACLE_ADDRESS" "src/Oracle.sol:Oracle" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20"

echo ""
echo "✅ Verificação do Oracle concluída!" 