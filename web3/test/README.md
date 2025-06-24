# Cenários de Teste E2E para Contratos Oracle, HypeToken e Funify

## Premisas FASE 1

| premisa | descrição                                                                               |
| ------- | --------------------------------------------------------------------------------------- |
| 0       | Usuários fazem stake de ETH para obter hype token                                       |
| 1       | numero de apostadores fixo                                                              |
| 2       | apostadores do maior hype 10                                                            |
| 3       | valores das apostas para maior hype [100, 200, 100, 200, 200, 200, 200, 400, 800, 1000] |
| 4       | apostadores do menor hype 5                                                             |
| 5       | valores das apostas para menor hype [100, 200, 100, 800, 1000]                          |

## Cenário 1: Hype A => Time A

- Hype A > Hype B
- Salvar hype no oraculo abrindo para apostas
- Apostas no HYPE A
- Apostas no HYPE B
- fechar jogo para apostas
- salvar resultado: Time A vence e finalizar jogo
- Vencedores retiram o premio
- Casa faz o saque de 5% do total apostado

**Oque valida?**:

- se o oráculo atualiza corretamente
- se as odds são calculadas corretamente
- se os vencedores recebem prêmios corretamente
- se a casa lucrou 5% do prize pool total

## Cenário 2: Hype A => Time B

- Hype A > Hype B
- Salvar hype no oraculo abrindo para apostas
- Apostas no HYPE A
- Apostas no HYPE B
- fechar jogo para apostas
- salvar resultado: Time B vence e finalizar jogo
- Vencedores retiram o premio
- Casa faz o saque de 5% do total apostado

**Oque valida?**:

- se o oráculo atualiza corretamente
- se as odds são calculadas corretamente
- se os vencedores recebem prêmios corretamente
- se a casa lucrou 5% do prize pool total

## Cenário 3: Tentativa de Apostas Após o Início do Jogo

- status da partido em 'closed'
- user tenta apostar
- contrato revert

## Cenário 4: Reivindicação de Prêmio Antes do Fim do Jogo

- usuario aposta no hype A
- salvar no oracle time A vencendo
- status da partido em 'closed' ainda
- user com aposta vencedora tenta retirar premio
- contrato revert

## Premisas FASE 2

| premisa | descrição                                         |
| ------- | ------------------------------------------------- |
| 0       | Usuários fazem stake de ETH para obter hype token |
| 1       | numero de apostadores aleatórios                  |
| 2       | valor da aposta no intervalo [100-1000]           |
| 3       | valor da aposta sempre arredondado (x % 100 == 0) |

## Cenário 1: Hype A => Time A

- Hype A > Hype B
- Salvar hype no oraculo abrindo para apostas
- Apostas no HYPE A
- Apostas no HYPE B
- fechar jogo para apostas
- salvar resultado: Time A vence e finalizar jogo
- Vencedores retiram o premio
- Casa faz o saque de 5% do total apostado

**Oque valida?**:

- se o oráculo atualiza corretamente
- se as odds são calculadas corretamente
- se os vencedores recebem prêmios corretamente
- se a casa lucrou 5% do prize pool total

## Cenário 2: Hype A => Time B

- Hype A > Hype B
- Salvar hype no oraculo abrindo para apostas
- Apostas no HYPE A
- Apostas no HYPE B
- fechar jogo para apostas
- salvar resultado: Time B vence e finalizar jogo
- Vencedores retiram o premio
- Casa faz o saque de 5% do total apostado

**Oque valida?**:

- se o oráculo atualiza corretamente
- se as odds são calculadas corretamente
- se os vencedores recebem prêmios corretamente
- se a casa lucrou 5% do prize pool total
