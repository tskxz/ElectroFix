### Tabela: Cliente

| id_cliente | nome          | email             | telefone    | password |
|------------|---------------|-------------------|-------------|----------|
| 1          | João Silva    | joao@example.com  | 123456789    | ******   |
| 2          | Maria Oliveira | maria@example.com | 987654321    | ******   |

### Tabela: Agendamento

| id_agendamento | endereco        | data_horario         | estado     | id_cliente |
|----------------|-----------------|----------------------|------------|-----------|
| 1              | Rua A, 123      | 2024-09-15 10:00:00  | Agendado   | 1         |
| 2              | Rua B, 456      | 2024-09-16 14:00:00  | Concluído  | 2         |

### Tabela: Reparação

| id_reparacao | descricao_problema | valor_orcamento | status    | id_agendamento |
|--------------|---------------------|-----------------|-----------|---------------|
| 1            | Lavadora não liga   | 50.00           | Pendende  | 1             |
| 2            | Frigorífico barulho  | 75.00           | Concluído | 2             |

### Tabela: Eletrodoméstico

| id_eletrodomestico | nome_produto | descricao       | preco | quantidade_stock |
|--------------------|--------------|-----------------|-------|------------------|
| 1                  | Frigideira    | Frigideira antiaderente | 25.00 | 10               |
| 2                  | Aspirador     | Aspirador potente | 120.00 | 5                |

### Tabela: Encomenda

| id_encomenda | valor_total | data_encomenda   | status    | id_cliente |
|--------------|-------------|------------------|-----------|-----------|
| 1            | 150.00      | 2024-09-14       | Confirmada | 1         |
| 2            | 240.00      | 2024-09-15       | Pendente  | 2         |

### Tabela: ItemEncomenda

| id_itemencomenda | quantidade | preco_unitario | id_encomenda | id_eletrodomestico |
|------------------|------------|----------------|--------------|--------------------|
| 1                | 2          | 25.00          | 1            | 1                  |
| 2                | 1          | 120.00         | 1            | 2                  |
| 3                | 3          | 25.00          | 2            | 1                  |
