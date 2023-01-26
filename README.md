# Projeto LabeCommerce


![LabeCommerce](./src/assets/LabeCommerce.png)

## Índice
> <a href="#tecnologias">Tecnologias utilizadas</a>

> <a href="#funcionalidades"> Funcionalidades do projeto</a>

> <a href="#endpoints"> Endpoints</a>

> <a href="#bd"> Banco de Dados</a>

> <a href="#documentacao"> Documentação da API</a>




<h2 id="tecnologias"> Tecnologias utilizadas</h2>

 - NodeJS
 - Typescript
 - Express
 - SQL e SQLite
 - Knex
 - Postman
 - Moment


<h2 id="funcionalidades"> Funcionalidades do projeto</h2>


USUARIOS
- <b>Listar usuários:</b> 
  - Lista todos os usuários cadastrados;
- <b>Criar usuário:</b> 
  - Possibilita criar novos usuários. Não é possível criar mais de uma conta com a mesma id e conta de e-mail.
- <b> Editar usuário:</b> 
  - Possibilita a edição do usuário existente no BD através de seu id. 
  - Não é possível editar uma conta com os dados "id e email" já existentes no BD.
- <b>Deletar usuário:</b> 
  - Permite deletar usuário através de um Id válido. 
  - Não é possivel deletar o usuário caso ele esteja cadastrado em uma purchase.


PRODUTOS
- <b>Listar produtos:</b> 
  - Lista todos os produtos cadastrados.
- <b>Criar Produto:</b> 
  - Possibilita criar novos produtos.
  -  Não é possível criar um produto com id já existente e com preço negativo.
- <b>Buscar produto por Id:</b> 
  - Possibilita buscar um produto através de seu id válido*.
- <b>Buscar produto por nome:</b> 
  - Possibilita buscar de produtos através de nomes válidos* .  
- <b>Editar produto:</b> 
  - Possibilita a edição do produto existente no BD através de seu id;
   - Não é possível editar um produto com "id" já existente no BD e o preço negativo.
- <b>Deletar produto:</b> 
  - Permite deletar produto através de um Id válido. 
  - Não é possivel deletar o produto caso ele esteja cadastrado em uma purchase.


COMPRAS
- <b>Listar compras:</b> 
  - Lista todos as compras cadastrados.
 - <b>Criar Compra:</b> 
   - Possibilita criar novas compras com dados válidos*  e um uma única id(user id e product id).
- <b>Pesquisar compras de usuário :</b> 
  - Possibilita buscar todas as compras realizadas de um usuário através do id do usuário válido*.
  - <b>Pesquisar compras de usuário :</b> 
  - Possibilita buscar todas as compras realizadas de um usuário através do id do usuário válido*.
 - <b>Pesquisar compras por Id :</b> 
   - Possibilita buscar compras através do id de compra válido*.


 válido*: corresponte algo que consta no BD. 
<h2 id="endpoints"> Endpoints</h2>

* USERS
  - Get All Users
  - Create User
  - Edite User By Id
  - Delete User By Id

* PRODUCTS
  - Get All Products
  - Create Product
  - Get Product By Id
  - Get Product By Name 
  - Edite Product By Id
  - Delete Product By Id

* PURCHASES
  - Get All Purchases
  - Create Purchase
  - Get Purchases By User Id 
  - Get Purchase By Id
 
  <h2 id="bd"> Banco de Dados</h2>
![LabeCommerce](./src/assets/diagrama.png)


<h2 id="documentacao"> Documentação da API</h2>

[Link da Documentação](https://documenter.getpostman.com/view/24460839/2s8ZDU64ZL)



