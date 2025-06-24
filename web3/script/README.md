# Scripts de Deploy - Funify

Este diretório contém os scripts de deploy para o projeto Funify.

## Arquivos

- `Deploy.s.sol` - Script principal de deploy que faz o deploy de todos os contratos
- `DeployLocal.s.sol` - Script de deploy simplificado para desenvolvimento local
- `SetupExample.s.sol` - Script de exemplo que demonstra como configurar e usar os contratos após o deploy
- `Counter.s.sol` - Script de exemplo (pode ser removido)

## Como usar

### 1. Configurar variáveis de ambiente (opcional)

Para deploy em redes de teste/produção, você pode criar um arquivo `.env`:

```bash
# RPC URL da rede onde você quer fazer deploy
RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key

# Etherscan API key para verificação de contratos (opcional)
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### 2. Executar o deploy

#### Deploy Local (Desenvolvimento)
```bash
# Deploy na rede local (Anvil) usando a primeira conta
forge script script/DeployLocal.s.sol --rpc-url http://localhost:8545 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --broadcast

# Ou usando --account com índice
forge script script/DeployLocal.s.sol --rpc-url http://localhost:8545 --account 0 --broadcast
```

#### Deploy em Redes de Teste/Produção
```bash
# Deploy na rede de teste (Sepolia) usando --account
forge script script/Deploy.s.sol --rpc-url $RPC_URL --account <ACCOUNT_ADDRESS> --broadcast --verify

# Deploy na mainnet
forge script script/Deploy.s.sol --rpc-url $RPC_URL --account <ACCOUNT_ADDRESS> --broadcast --verify --slow
```

### 3. Configurar exemplo após deploy

Após fazer o deploy, você pode executar o script de exemplo para configurar o sistema:

```bash
# Primeiro, atualize os endereços no script SetupExample.s.sol com os endereços reais
# Depois execute:
forge script script/SetupExample.s.sol --rpc-url http://localhost:8545 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --broadcast
```

### 4. Verificar o deploy

Os scripts irão mostrar:
- Endereços dos contratos deployados
- Estado inicial dos contratos
- Saldo do deployer
- Configurações dos contratos

## Contratos que serão deployados

1. **HypeToken** - Token ERC20 usado para apostas
   - Supply inicial: 1.000.000 tokens
   - Deployer recebe todos os tokens inicialmente

2. **Oracle** - Contrato que gerencia dados das partidas
   - Gerencia status das partidas (Open, Closed, Finished)
   - Armazena dados de hype e resultados

3. **Funify** - Contrato principal do sistema de apostas
   - Gerencia apostas e distribuição de prêmios
   - Taxa da casa: 5%
   - Owner pode sacar lucros da casa

## Ordem de deploy

1. HypeToken (não tem dependências)
2. Oracle (não tem dependências)
3. Funify (depende do HypeToken e Oracle)

## Funcionalidades demonstradas no SetupExample

O script `SetupExample.s.sol` demonstra:

1. **Transferência de tokens** - Distribui tokens para usuários de teste
2. **Criação de partida** - Abre uma nova partida no Oracle
3. **Verificação de odds** - Calcula as odds baseadas no hype
4. **Colocação de apostas** - Simula usuários fazendo apostas
5. **Verificação de pools** - Mostra os pools de prêmios e taxa da casa

## Verificação de contratos

Para verificar os contratos no Etherscan após o deploy:

```bash
forge verify-contract <CONTRACT_ADDRESS> src/HypeToken.sol:HypeToken --chain-id 1 --etherscan-api-key $ETHERSCAN_API_KEY
forge verify-contract <CONTRACT_ADDRESS> src/Oracle.sol:Oracle --chain-id 1 --etherscan-api-key $ETHERSCAN_API_KEY
forge verify-contract <CONTRACT_ADDRESS> src/funify/Funify.sol:Funify --constructor-args $(cast abi-encode "constructor(address,address)" <HYPETOKEN_ADDRESS> <ORACLE_ADDRESS>) --chain-id 1 --etherscan-api-key $ETHERSCAN_API_KEY
```

## Endereços do Deploy

O script `DeployLocal.s.sol` exibe os endereços dos contratos no console para cópia manual:

```
=== COPY THESE ADDRESSES ===
HypeToken: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Oracle: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Funify: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
============================
```

## Usando --account

O Foundry permite especificar a conta a ser usada de várias formas:

```bash
# Por endereço
--account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# Por índice (0 = primeira conta do Anvil)
--account 0

# Por nome (se configurado no foundry.toml)
--account deployer
```

## Notas importantes

- Certifique-se de ter ETH suficiente na conta para gas
- O deployer se torna o owner do contrato Funify
- O HypeToken é mintado com 1.000.000 tokens para o deployer
- Todos os contratos são verificados e logados durante o deploy
- Use `--account` em vez de variáveis de ambiente para maior segurança
- Copie os endereços exibidos no console para usar em outros scripts 