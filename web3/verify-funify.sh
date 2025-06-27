#!/bin/bash

# Script para verificar o contrato Funify
# Usa os endereços salvos em deployedContracts.txt

echo "🔍 Verificando contrato Funify..."

# Carregar endereços do arquivo
if [ -f "deployedContracts.txt" ]; then
    source deployedContracts.txt
    echo "📋 Endereço do Funify: $FUNIFY_ADDRESS"
    echo "📋 Endereço do HypeToken: $HYPETOKEN_ADDRESS"
    echo "📋 Endereço do Oracle: $ORACLE_ADDRESS"
else
    echo "❌ Arquivo deployedContracts.txt não encontrado!"
    echo "💡 Execute primeiro o deploy-all.sh"
    exit 1
fi

# Gerar constructor args
echo "🔧 Gerando constructor arguments..."
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(address,address)" "$HYPETOKEN_ADDRESS" "$ORACLE_ADDRESS")
echo "📝 Constructor args: $CONSTRUCTOR_ARGS"

# Verificar o contrato Funify
echo "🔧 Executando verificação..."
forge verify-contract "$FUNIFY_ADDRESS" "src/funify/Funify.sol:Funify" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20" \
    --constructor-args "$CONSTRUCTOR_ARGS"

echo ""
echo "✅ Verificação do Funify concluída!" 