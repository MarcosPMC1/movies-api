
# Movies API &middot; ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?logo=redis&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?logo=nestjs&logoColor=white)



Este projeto BackEnd se trata de um cadastro de catálogo de filmes, onde possui rotas que são protegidas e somente acessadas com o token adquirido no login, além de travas como a não duplicidade do titulo do filme.

Ele foi arquiteado com containers, sendo assim possivel ser executado em qualquer ambiente, possuindo 3 aplicações, a API totalmente desenvolvida em NestJS, um banco de dados relacional PostgreSQL, além de um serviço de cache no Redis.



## Features

- Autenticação com JWT
- Rotas públicas e privadas
- Cache
- CRUD com relacionamento
- Infraestrutura em Docker
- Ambiente de produção e desenvolvimento


## Tech Stack

**API:** TypeScript, NestJS, TypeORM

**Database** PostgreSQL

**Cache** Redis


## API Reference

#### Autenticação

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Body Parameter |
| `password` | `string` | **Required**. Body Parameter |

#### Listar Catálogo

```http
  Get /movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |


#### Mostrar apenas um flme

```http
  GET /movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Inserir um filme

```http
  POST /movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Body Parameter |
| `year`      | `string` | **Required**. Body Parameter |
| `gender`      | `string` | **Required**. Body Parameter |




## Deployment

Para executar este projeto localmente preencha as variaveis de ambientes na seção abaixo e execute o seguinte comando

```bash
    docker compose up --build
```


## Environment Variables

Para você fazer este projeto funcionar é necessario informar estes valores no .env

`NODE_ENV` = 'prod' | 'dev' | 'test'

`POSTGRES_PASSWORD`

`POSTGRES_USER`

`POSTGRES_DB`

`POSTGRES_HOST`

`REDIS_HOST`

`REDIS_PORT`

## Feedback

Para entrar em contato, este é meu email marcospmcdev@hotmail.com


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://marcoscardoso-dev.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcoscardosodeveloper)

