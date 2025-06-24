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



➜  funfy git:(main) ✗ cast wallet new
Successfully created new keypair.
Address:     0xC958499BE0B6AaD788218c4F4Feb940d83818671
Private key: 0xfc930abbfe9802fde53882827e8f0bff17deeb6af61460f8bf1eb81ea36b87be
➜  funfy git:(main) ✗ cast wallet new
Successfully created new keypair.
Address:     0xE0aE18453049bEa8435eEFb9f13D9f2d955280Ed
Private key: 0xb35111a782e80fdf17989e312911d9b48bdfdae232b2de9aeb45c14493ef0c78


# TASK

- [ ] deploy dos contratos
- [ ] integrar frontend com metamask
- [ ] frontend fazer stake
- [ ] frontend criar aposta
- [ ] frontend fazer claim de premio
- [ ] frontend fazer unstake
- [ ] backend salvar hype no oracle
- [ ] backend salvar resultado no oracle
