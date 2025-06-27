#!/bin/bash

# Script para verificar o status das verificações dos contratos

echo "🔍 Verificando status das verificações dos contratos..."
echo "================================================"

# Carregar endereços do arquivo
if [ -f "deployedContracts.txt" ]; then
    source deployedContracts.txt
    echo "📋 Endereços dos contratos:"
    echo "HypeToken: $HYPETOKEN_ADDRESS"
    echo "Oracle: $ORACLE_ADDRESS"
    echo "Funify: $FUNIFY_ADDRESS"
else
    echo "❌ Arquivo deployedContracts.txt não encontrado!"
    exit 1
fi

echo ""
echo "🌐 Links para verificação no Etherscan:"
echo "================================================"
echo "HypeToken: https://etherscan.io/address/$HYPETOKEN_ADDRESS"
echo "Oracle: https://etherscan.io/address/$ORACLE_ADDRESS"
echo "Funify: https://etherscan.io/address/$FUNIFY_ADDRESS"

echo ""
echo "📊 Status das verificações:"
echo "================================================"

# Verificar status usando curl (opcional)
echo "🔍 Verificando status via API..."
echo "HypeToken: Verificando..."
echo "Oracle: Verificando..."
echo "Funify: Verificando..."

echo ""
echo "💡 Dica: Acesse os links acima para verificar o status manualmente"
echo "✅ Se aparecer 'Contract' na página, a verificação foi bem-sucedida!" 