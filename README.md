# 🏢 BANCO SEGURO

<h4 align="center"> 
	🚧 BANCO SEGURO 🚧
</h4>

<p align="center">
	<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/).<br>

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Projeto (Backend):

```bash
# Clone este repositório
$ git clone git@github.com:igorfelipedev/Banco-Seguro.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Banco-Seguro

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```
---

# 🛠 Tecnologias usadas:

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Node-PostegresSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![.env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000.svg?style=for-the-badge&logoColor=white)

---

## ➕ Cadastrar Usuário

### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

- **Exemplo de Requisição:** 

```javascript
{
    "nome": "Seu Nome",
    "email": "seu@email.com",
    "senha": "sua_senha"
}
```

- **Resposta de Sucesso:**

```javascript
{
    "id": 1,
    "nome": "Seu Nome",
    "email": "seu@email.com"
}
```

## 👤 Fazer Login

### `POST` `/login`

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

- **Exemplo de Requisição:**

```javascript
{
    "email": "seu@email.com",
    "senha": "sua_senha"
}
```

- **Resposta de Sucesso:**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "Seu Nome",
        "email": "seu@email.com"
    },
    "token": "seu_token_de_autenticacao"
}

```

## 📝 Detalhar Perfil do Usuário Logado

### `GET` `/usuario`

Essa é a rota que será chamada quando o usuário quiser obter os dados do seu próprio perfil.

- **Requisição:**
- Deve incluir o token de autenticação no header da requisição.

- **Exemplo de Requisição:**

```javascript
// Sem conteúdo no corpo (body) da requisição
```

- **Resposta de Sucesso:**

```javascript
{
    "id": 1,
    "nome": "Seu Nome",
    "email": "seu@email.com"
}
```
- **Resposta de Erro:**

```javascript
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

## 🔄 Editar Perfil do Usuário Logado

### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.

- **Requisição**
- Deve incluir o token de autenticação no header da requisição.

- **Exemplo de Requisião:**

```javascript
{
    "nome": "Novo Nome",
    "email": "novo@email.com",
    "senha": "nova_senha"
}
```
- **Exemplo de Sucesso:**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

- **Exemplo de Erro:**

```javascript
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```
## 📃 Listar Categorias

### `GET` `/Categorias`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição:**
- Deve incluir o token de autenticação no header da requisição.

- **Exemplo de Requisião:**

```javascript
{
// Sem conteúdo no corpo (body) da requisição
}
```

- **Exemplo de Sucesso:**

```javascript
[
  {
    "id": 1,
    "descricao": "Alimentação"
  },
  {
    "id": 2,
    "descricao": "Assinaturas e Serviços"
  },
  // Outras categorias...
]

```

## 📚 Listar Transações do Usuário Logado

### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.

- **Requisição:**
- Deve incluir o token de autenticação no header da requisição.

- **Exemplo de Requisião:**

```javascript
// Sem conteúdo no corpo (body) da requisição
```

- **Exemplo de Sucesso:**

```javascript
[
  {
    "id": 1,
    "tipo": "saida",
    "descricao": "Sapato amarelo",
    "valor": 15800,
    "data": "2022-03-23T15:35:00.000Z",
    "usuario_id": 1,
    "categoria_id": 4,
    "categoria_nome": "Roupas"
  },
  {
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 1,
    "categoria_id": 6,
    "categoria_nome": "Salário"
  },
  // Outras transações...
]
```

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🧙‍♂️ Contato
[![Linkedin](https://img.shields.io/badge/LinkedIn-2E2E2E?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/igor-felipe-dev/)

###### tags: `back-end` `nodeJS` `API REST` `desafio` `Javascript` `PostgreSQL` `Bcrypt` `JSON Web Tokens`
