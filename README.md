# Fazendia

Uma API para auxiliar o fazendario a administrar a sua fazenda.

## Modo de intalação:
``` 
git clone
```
Inicie o projeto em sua IDE favorida :D

## Video Pitch 
https://www.youtube.com/watch?v=DpzPcGdfuBs
## Video Usando o Produto
https://www.youtube.com/watch?v=gqo2eFkBveM
## Endpoints

- Colheitas
  - [Criar Colheita](#criar-colheita-com-planta)
  - [Listar Colheita pelo ID](#listar-colheita-pelo-id)
  - [Listar Varias Colheitas](#listar-varias-colheitas-de-uma-fazenda)
- Distribuição
  - [Criar Distribuicao](#cadastrar-distribuição)
  - [Listar Varias Distribuicoes](#listar-varias-distribuicoes)
- Fazenda
  - [Listar Varias Fazendas](#listar-fazendas-próximas)
- Usuario
  - [Login](#login-do-usuário)
  - [Listar Ids de Fazenda e Colheitas de um usuario](#listar-ids-de-colheitas-e-fazendas)

### Criar Colheita com Planta

`POST` /api/colheitas/criarColheita/{idFazenda}`

**Parâmetros de URL**

| parâmetro  | tipo | obrigatório | descrição                     |
|------------|------|:-----------:|-------------------------------|
| idFazenda  | long |     sim     | O ID da fazenda para associação com a colheita. |

**Campos de requisição**

| campo            | tipo   | obrigatório | descrição                                  |
|------------------|--------|:-----------:|--------------------------------------------|
| colheita         | objeto |     sim     | Objeto contendo dados da colheita.         |
| colheita.quantidade      | int    |     sim     | A quantidade da colheita.                           |
| colheita.dataColheita     | string |     sim     | A data da colheita no formato "YYYY-MM-DD". |
| planta           | objeto |     sim     | Objeto contendo dados da planta.            |
| planta.nome            | string |     sim     | O nome da planta.                          |
| planta.tipo            | string |     sim     | O tipo da planta.                          |
| planta.requisitosCrescimento       | string |     sim     | Os requisitos de crescimento da planta.     |

**Exemplo de requisição**

```json
{
  "colheita": {
    "quantidade": 10,
    "dataColheita": "2023-06-06"
  },
  "planta": {
    "nome": "Tomate",
    "tipo": "Hortaliça",
    "requisitosCrescimento": "Soleira alta e rega diária"
  }
}

```

**Resposta**

A resposta será um objeto contendo os dados da colheita e da planta criadas:

| campo  | tipo | descrição                     |
|------------|:-----------:|-------------------------------|
|id|	long|	O ID da colheita criada.|
|colheita|	objeto	|Objeto contendo os dados da colheita criada.|
|planta|	objeto|	Objeto contendo os dados da planta criada.|

```JSON
{
  "id": 1,
  "colheita": {
    "id": 1,
    "planta": {
      "id": 1,
      "nome": "Tomate",
      "tipo": "Hortaliça",
      "requisitosCrescimento": "Soleira alta e rega diária"
    },
    "fazenda": {
      "id": 1,
      "nome": "Nome da Fazenda",
      "endereco": "Endereço da Fazenda"
    },
    "quantidade": 10,
    "dataColheita": "2023-06-06"
  },
  "planta": {
    "id": 1,
    "nome": "Tomate",
    "tipo": "Hortaliça",
    "requisitosCrescimento": "Soleira alta e rega diária"
  }
}
```

### Listar Colheita pelo ID
`GET`/api/colheitas/{idColheita}

Exemplo de respota
```JSON
{
    "id": 1,
    "planta": {
        "id": 1,
        "nome": "Tomate",
        "tipo": "Vegetal",
        "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
    },
    "fazenda": {
        "id": 1,
        "nome": "Fazenda da Maria",
        "localizacao": "São Paulo",
        "capacidade": 100
    },
    "quantidade": 50,
    "dataColheita": "2023-06-06T14:06:30.361+00:00"
}
```
*Resposta*

| código | descrição 
|--------|----------
|200| os dados foram retornados
|404| não foi encontrada colheita com esse ID


### Listar Varias Colheitas de uma Fazenda
`GET`/api/colheitas/?fazendaId={fazendaId}

Exemplo de respota
```JSON
{
    "_embedded": {
        "entityModelList": [
            {
                "planta": {
                    "tipo": "Vegetal",
                    "nome": "Tomate",
                    "id": 1,
                    "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                },
                "id": 1,
                "dataColheita": "2023-06-06T10:23:33.211+00:00",
                "fazenda": {
                    "localizacao": "São Paulo",
                    "capacidade": 100,
                    "nome": "Fazenda da Maria",
                    "id": 1
                },
                "quantidade": 50
            },
            {
                "planta": {
                    "tipo": "Vegetal",
                    "nome": "Tomate",
                    "id": 1,
                    "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                },
                "id": 2,
                "dataColheita": "2023-06-06T10:23:33.252+00:00",
                "fazenda": {
                    "localizacao": "São Paulo",
                    "capacidade": 100,
                    "nome": "Fazenda da Maria",
                    "id": 1
                },
                "quantidade": 60
            },
            {
                "planta": {
                    "tipo": "Vegetal",
                    "nome": "Tomate",
                    "id": 1,
                    "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                },
                "id": 3,
                "dataColheita": "2023-06-06T10:23:33.283+00:00",
                "fazenda": {
                    "localizacao": "São Paulo",
                    "capacidade": 100,
                    "nome": "Fazenda da Maria",
                    "id": 1
                },
                "quantidade": 70
            },
            {
                "planta": {
                    "tipo": "Vegetal",
                    "nome": "Tomate",
                    "id": 1,
                    "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                },
                "id": 4,
                "dataColheita": "2023-06-06T10:23:33.316+00:00",
                "fazenda": {
                    "localizacao": "São Paulo",
                    "capacidade": 100,
                    "nome": "Fazenda da Maria",
                    "id": 1
                },
                "quantidade": 80
            },
            {
                "planta": {
                    "tipo": "Vegetal",
                    "nome": "Tomate",
                    "id": 1,
                    "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                },
                "id": 5,
                "dataColheita": "2023-06-06T10:23:33.345+00:00",
                "fazenda": {
                    "localizacao": "São Paulo",
                    "capacidade": 100,
                    "nome": "Fazenda da Maria",
                    "id": 1
                },
                "quantidade": 90
            }
        ]
    },
    "_links": {
        "first": {
            "href": "http://localhost:8080/api/colheitas/?fazendaId=1&page=0&size=5"
        },
        "self": {
            "href": "http://localhost:8080/api/colheitas/?fazendaId=1&page=0&size=5"
        },
        "next": {
            "href": "http://localhost:8080/api/colheitas/?fazendaId=1&page=1&size=5"
        },
        "last": {
            "href": "http://localhost:8080/api/colheitas/?fazendaId=1&page=1&size=5"
        }
    },
    "page": {
        "size": 5,
        "totalElements": 6,
        "totalPages": 2,
        "number": 0
    }
}
```
*Resposta*

| código | descrição 
|--------|----------
|200| os dados foram retornados
|404| não foi encontrada colheita com esse ID

### Cadastrar Distribuição

`POST` /api/colheitas/{idColheita}/distribuicoes

**Campos de requisição**

| campo       | tipo   | obrigatório | descrição                                                                      |
|-------------|--------|:-----------:|--------------------------------------------------------------------------------|
| destino     | string |     sim     | o destino da distribuição                                                      |
| quantidade  | number |     sim     | a quantidade de itens a serem distribuídos                                      |
| dataEntrega | string |     sim     | a data de entrega da distribuição                                               |

*Exemplo de requisição*

```json
{
  "destino": "Supermercado XYZ",
  "quantidade": 100,
  "dataEntrega": "2023-06-06"
}
```

**Resposta**

Resposta do Exemplo

```json
{
    "id": 2,
    "distribuicao": {
        "colheita": {
            "planta": {
                "tipo": "Vegetal",
                "nome": "Tomate",
                "id": 1,
                "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
            },
            "id": 1,
            "dataColheita": "2023-06-06T11:19:22.499+00:00",
            "fazenda": {
                "localizacao": "São Paulo",
                "capacidade": 100,
                "nome": "Fazenda da Maria",
                "id": 1
            },
            "quantidade": 50
        },
        "dataEntrega": "2023-06-06T00:00:00.000+00:00",
        "id": 2,
        "destino": "Supermercado XYZ",
        "quantidade": 100
    }
}
```

| código |	descrição |
|-------------|--------|
|200|	resposta exemplo|
|400|	campos inválidos|
|500|	erro interno do servidor|

### Listar Varias Distribuicoes

`GET` /api/distribuicao/?colheitaId=1

*Exemplo de resposta*

```json
{
    "_embedded": {
        "entityModelList": [
            {
                "colheita": {
                    "planta": {
                        "tipo": "Vegetal",
                        "nome": "Tomate",
                        "id": 1,
                        "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                    },
                    "id": 1,
                    "dataColheita": "2023-06-06T11:19:22.499+00:00",
                    "fazenda": {
                        "localizacao": "São Paulo",
                        "capacidade": 100,
                        "nome": "Fazenda da Maria",
                        "id": 1
                    },
                    "quantidade": 50
                },
                "dataEntrega": "2023-06-06T11:19:22.731+00:00",
                "id": 1,
                "destino": "São Paulo",
                "quantidade": 50
            },
            {
                "colheita": {
                    "planta": {
                        "tipo": "Vegetal",
                        "nome": "Tomate",
                        "id": 1,
                        "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
                    },
                    "id": 1,
                    "dataColheita": "2023-06-06T11:19:22.499+00:00",
                    "fazenda": {
                        "localizacao": "São Paulo",
                        "capacidade": 100,
                        "nome": "Fazenda da Maria",
                        "id": 1
                    },
                    "quantidade": 50
                },
                "dataEntrega": "2023-06-06T00:00:00.000+00:00",
                "id": 2,
                "destino": "Supermercado XYZ",
                "quantidade": 100
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/distribuicao/?colheitaId=1&page=0&size=5"
        }
    },
    "page": {
        "size": 5,
        "totalElements": 2,
        "totalPages": 1,
        "number": 0
    }
}
```

*Resposta*

| código | descrição 
|--------|----------
|200| os dados foram retornados
|404| não foi encontrada colheita com esse ID

### Listar uma unica Colheita

`GET` /api/colheitas/1

*Exemplo de resposta*

```json
{
    "id": 1,
    "planta": {
        "id": 1,
        "nome": "Tomate",
        "tipo": "Vegetal",
        "requisitosCrescimento": "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento"
    },
    "fazenda": {
        "id": 1,
        "nome": "Fazenda da Maria",
        "localizacao": "São Paulo",
        "capacidade": 100
    },
    "quantidade": 50,
    "dataColheita": "2023-06-06T14:06:30.361+00:00"
}
```

*Resposta*

| código | descrição 
|--------|----------
|200| os dados foram retornados
|404| não foi encontrada colheita com esse ID

### Listar Fazendas Próximas

`GET`/api/fazendas/fazendasProximas?localizacao={localizacao}

*Exemplo de resposta*

```json
{
    "_embedded": {
        "entityModelList": [
            {
                "localizacao": "São Paulo",
                "capacidade": 100,
                "nome": "Fazenda da Maria",
                "id": 1
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/fazendas/fazendasProximas?localizacao=S%C3%A3o%20Paulo&page=0&size=5"
        }
    },
    "page": {
        "size": 5,
        "totalElements": 1,
        "totalPages": 1,
        "number": 0
    }
}
```

*Resposta*

| código | descrição 
|--------|----------
|200| os dados foram retornados
|404| não foi encontrada Fazendas

### Login do Usuário

`POST` /api/usuarios/login

**Campos de requisição**

| campo  | tipo   | obrigatório | descrição                  |
|--------|--------|:-----------:|----------------------------|
| email  | string |     sim     | o email do usuário         |
| senha  | string |     sim     | a senha do usuário         |

*Exemplo de requisição*

```json
{
    "email": "maria@gmail.com",
    "senha": "P@$$w0rd!123"
}
````
**Resposta**

Resposta Exemplo
```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJpYUBnbWFpbC5jb20iLCJpc3MiOiJGYXplbmRpYSIsImV4cCI6MTY4NjA0NTE0Mn0.KdCEjUytFmjueFCYHy5Vxu1pyLZ3fv6Oun-b3OzwG04",
    "type": "JWT",
    "prefix": "Bearer"
}
```

| código |	descrição |
|-------------|--------|
|200|	resposta exemplo|
|400|	campos inválidos|
|500|	erro interno do servidor|



### Listar Ids de Colheitas e Fazendas

`GET` /api/usuarios/{userId}/fazenda-colheitas

*Exemplo de resposta*

```json
{
    "fazendaIds": [
        1
    ],
    "colheitaIds": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
    ]
}
```

*Resposta*

| código |	descrição |
|-------------|--------|
|200|	resposta exemplo|
|400|	campos inválidos|
|500|	erro interno do servidor|