# Fanify Chiliz Paris - Back-end

## Visão Geral

Esta aplicação é uma API para análise de hype (engajamento) de times esportivos, baseada em dados do Twitter e interações manuais. Ela serve como backend para um sistema de gamificação, onde o hype de cada time pode ser consultado, acompanhado ao longo do tempo e influenciado por posts reais ou simulados.

A aplicação utiliza:
- Blockchain (para armazenar o hype atual de cada time)
- Banco de dados (para armazenar a série temporal do hype)
- Twitter (para coletar posts e analisar sentimento)
- Análise de sentimento (para classificar posts como positivos/negativos para cada time)

## Funcionalidades

- **Consulta do hype atual** de um confronto (direto da blockchain)
- **Consulta da série temporal** de hype (do banco de dados)
- **Coleta e análise de posts do Twitter** para atualizar o hype
- **Adição manual de posts** para simular ou influenciar o hype

## Rotas Disponíveis

### Buscar hype atual
`GET /hype/:hype-id`

**Retorna:**
```
{
    hypeA: 80.12,
    hypeB: 20.82,
    timeA: "PSG",
    timeB: "BOT"
}
```

### Buscar série temporal de hype
`GET /hype/series/:hype-id`

**Retorna:**
```
[
    {hypeA: 80.12, hypeB: 20.82, timestamp: 1723213003},
    ...
]
```

### Buscar posts do Twitter e análise de hype
`GET /collect-posts/:hype-id`

**Retorna:**
```
{
    new: 123,
    total: 1298,
    hashtag: "#xyz_123",
    timeA: { posts: 400, hype: 30.81, name: "PSG" },
    timeB: { posts: 898, hype: 69.19, name: "BOT" }
}
```

### Adicionar post manual e analisar sentimento
`POST /add-post/:hype-id`

**Payload:**
```
{
    text: "meu texto a favor do PSG"
}
```
**Output:**
```
{
    timeA: 0.90,
    timeB: 0.10
}
```

## Como funciona a análise de hype
- A cada coleta de posts, a aplicação busca tweets com a hashtag do confronto.
- Cada tweet é analisado por um algoritmo de sentimento.
- O texto é classificado como pró-timeA ou pró-timeB, e a pontuação de sentimento é somada para cada lado.
- O resultado é normalizado e atualizado na blockchain e no banco de dados.
- Posts manuais podem ser enviados para simular ou influenciar o hype, passando pelo mesmo processo de análise de sentimento.

## Observações
- As rotas retornam dados mockados por padrão, mas podem ser conectadas a serviços reais de Twitter, blockchain e banco de dados.
- A documentação completa das rotas e exemplos pode ser visualizada via Swagger em `/api` quando a aplicação está rodando.