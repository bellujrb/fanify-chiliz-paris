## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## Save wallet on `cast`

```
cast wallet import ff80 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

# TASK

- [ ] deploy dos contratos
- [ ] integrar frontend com metamask
- [ ] frontend fazer stake
- [ ] frontend criar aposta
- [ ] frontend fazer claim de premio
- [ ] frontend fazer unstake
- [ ] backend salvar hype no oracle
- [ ] backend salvar resultado no oracle


[26/06/25, 17:18:37] Bellu hackadev: icionar no smart contract:
•⁠  ⁠quem (eu usuario) apostou em x jogo
•⁠  ⁠⁠quantos (eu usuario) apostou de hype em x jogo
[26/06/25, 17:19:45] Bellu hackadev: pegar e atualizar oraculo com back end
[26/06/25, 18:22:03] Bellu hackadev: deploy na rede da chiliz e atualizar rede no front
[26/06/25, 18:30:13] Bellu hackadev: Fazer uma tela de ilustração do mercado segundario
[26/06/25, 18:34:05] Lucas Bispo de Oliveira: •⁠  ⁠servir hype atual
•⁠  ⁠⁠servir serie temporal de hype
•⁠  ⁠⁠adicionar um twiter via post
•⁠  ⁠⁠busca post do twitter
•⁠  ⁠⁠analise de sentimento do post
•⁠  ⁠⁠salvar periodico no oracle