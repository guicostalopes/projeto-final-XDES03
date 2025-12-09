## Integrantes: Guilherme Costa Lopes
## Perfil github: https://github.com/guicostalopes

# Sistema de Gerenciamento de Supermercado

## Descrição do Projeto

O projeto consiste em um sistema completo de cadastro e gerenciamento de produtos para supermercado, desenvolvido com uma arquitetura moderna que separa Frontend e Backend.

Temos dois fluxos principais de navegação:

### 1. Fluxo de Usuário
* **Login:** Os usuários podem realizar login na plataforma digitando e-mail e senha. O sistema retorna feedback visual caso a senha ou e-mail estejam incorretos.
* **Cadastro:** O usuário pode se cadastrar preenchendo nome, senha e cargo (Role).
    * **Validação:** O sistema exige o uso de e-mail institucional (`@unifei.edu.br`) e verifica duplicidade de cadastro.
    * **Feature Star Wars:** No cadastro, o sistema integra com uma API externa para atribuir aleatoriamente um personagem de Star Wars ao usuário.

### 2. Fluxo de Produtos
Após o login, o usuário é direcionado para a página de produtos:
* **Identificação:** No canto superior, é exibido o nome do usuário e seu personagem de Star Wars.
* **Gerenciamento (CRUD):** É possível visualizar a tabela de produtos.
    * **Adicionar/Editar:** Ao clicar nos ícones, abre-se um modal para preencher ou alterar as informações do produto.
    * **Estoque:** Botões rápidos para adicionar ou remover a quantidade de itens.
    * **Excluir:** Opção de deletar um produto existente na tabela.

---

## Tecnologias Utilizadas

* **Backend:**
  
   **Spring Boot (Java):** Framework para a API REST e regras de negócio.
  
   **MySQL:** Banco de dados relacional para persistência dos dados.
  
   **Spring Security:** Gerenciamento de autenticação e segurança.

* **Frontend:**
  
   **React (JavaScript):** Biblioteca para construção da interface do usuário.
  
   **Material UI:** Biblioteca de componentes (botões, inputs, modais) para design responsivo.
  
   **Axios:** Cliente HTTP para realizar as requisições ao Backend.

# Como rodar o projeto

  Entrar na pasta backend no terminal e digitar 
   
     .\mvnw.cmd spring-boot:run

  Entrar na pasta frontend no terminal e digitar
    
     npm run dev

## FEATURES

### LOGIN

   * **Padrão** 
  
<img width="1914" height="986" alt="image" src="https://github.com/user-attachments/assets/2867e894-9d49-434c-ab9a-c7a31d22cc09" />

   * **User ou password errado** 
  
<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/ef33be2e-8d80-4c17-90fc-d46244e8aaff" />


### CADASTRO

  * **Padrão**
  
<img width="1918" height="988" alt="image" src="https://github.com/user-attachments/assets/edb7c61b-b92c-41dd-847c-27014b812842" />

  * **Opções**
  
<img width="1918" height="990" alt="image" src="https://github.com/user-attachments/assets/ac784b7c-304c-444d-90c8-4ec1578a9d8d" />

  * **Erro email fora do padrão**
  
<img width="1918" height="978" alt="image" src="https://github.com/user-attachments/assets/0356eaa8-3b79-4ccd-a55e-1e08ab69ac1a" />

  * **Sucesso**
  
<img width="1914" height="982" alt="image" src="https://github.com/user-attachments/assets/5377bfae-c02a-4d44-9e39-ac55468ab5f4" />

  * **Usuário já cadastrado**
  
<img width="1918" height="987" alt="image" src="https://github.com/user-attachments/assets/37ba99e3-d863-4efb-9433-1495db7a0914" />

  * **Usuário já cadastrado**
  
<img width="1917" height="983" alt="image" src="https://github.com/user-attachments/assets/afe5a0c4-0db1-461c-b5c9-f8f39afa1e97" />

### PRODUTOS

  * **Padrão**
  
<img width="1913" height="982" alt="image" src="https://github.com/user-attachments/assets/0ae2f741-17c8-4101-839e-6e4d2971588d" />

  * **Deletar**
  
<img width="1909" height="988" alt="image" src="https://github.com/user-attachments/assets/87ac759e-ba53-479b-80d2-5c36335250ea" />

  * **Editar produto**
  
<img width="1911" height="988" alt="image" src="https://github.com/user-attachments/assets/f4df0c4b-c7c9-4557-b804-e2ad592a432a" />
  
  * **Adicionar produto**
  
<img width="1916" height="983" alt="image" src="https://github.com/user-attachments/assets/b9811851-fcbd-46cc-9965-65f9832aa766" />

  * **Criado com sucesso**
  
<img width="1896" height="985" alt="image" src="https://github.com/user-attachments/assets/4fde8a8e-812a-4800-a1ec-0ac135b19279" />
