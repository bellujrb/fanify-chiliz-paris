#!/bin/bash

# Script master para verificar todos os contratos
# Executa as verificações em sequência

echo "🔍 Iniciando verificação de todos os contratos..."
echo "================================================"

# Carregar endereços do arquivo
if [ -f "deployedContracts.txt" ]; then
    source deployedContracts.txt
    echo "📋 Endereços carregados:"
    echo "HypeToken: $HYPETOKEN_ADDRESS"
    echo "Oracle: $ORACLE_ADDRESS"
    echo "Funify: $FUNIFY_ADDRESS"
else
    echo "❌ Arquivo deployedContracts.txt não encontrado!"
    echo "💡 Execute primeiro o deploy-all.sh"
    exit 1
fi

echo ""
echo "🔧 [1/3] Verificando HypeToken..."
forge verify-contract "$HYPETOKEN_ADDRESS" "src/HypeToken.sol:HypeToken" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20"

echo ""
echo "🔧 [2/3] Verificando Oracle..."
forge verify-contract "$ORACLE_ADDRESS" "src/Oracle.sol:Oracle" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20"

echo ""
echo "🔧 [3/3] Verificando Funify..."
# Gerar constructor args
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(address,address)" "$HYPETOKEN_ADDRESS" "$ORACLE_ADDRESS")
echo "📝 Constructor args: $CONSTRUCTOR_ARGS"

forge verify-contract "$FUNIFY_ADDRESS" "src/funify/Funify.sol:Funify" \
    --verifier-url "https://api.routescan.io/v2/network/testnet/evm/88882/etherscan" \
    --etherscan-api-key "verifyContract" \
    --num-of-optimizations 200 \
    --compiler-version "0.8.20" \
    --constructor-args "$CONSTRUCTOR_ARGS"

echo ""
echo "🎉 Verificação de todos os contratos concluída!"
echo "================================================"
echo "✅ HypeToken: $HYPETOKEN_ADDRESS"
echo "✅ Oracle: $ORACLE_ADDRESS"
echo "✅ Funify: $FUNIFY_ADDRESS" 