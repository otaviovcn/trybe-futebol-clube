# Trybe Futebol Clube

A [Trybe](https://www.betrybe.com/) é uma escola de tecnologia com foco em formação de Desenvolvedores Web e o projeto Trybe Futebol Clube foi proposto como atividade de aprimoramento dos estudos sobre desenvolvimento back-end com foco em Programação Orientada a Objetos (POO), SOLID e TypeScript. 

## Objetivo

Trybe Futebol Clube é uma aplicação Full Stack que permite ao usuário ter acesso a um informativo sobre partidas e classificações de futebol. Ao realizar login na aplicação, o usuário, além de visualizar as informações, também poderá alterar resultados das partidas e inserir partidas que estão em andamento.

![Exemplo app front](assets/front-example.png)

## Tecnologias e Ferramentas
<div>
   <img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='HTML' />
    <img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='CSS3' />
    <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' alt='JavaScript' />
    <img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='ReactJS' />
    <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' alt='React-router' />
    <img src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white' alt='ESlint' />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="Mysql"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS"/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize"/>
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="jwt"/>
    <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha"/>
</div>

<br>

Na elaboração deste projeto utilizou-se as seguintes ferramentas:

### Front-end
- HTML
- CSS
- [ReactJS](https://pt-br.reactjs.org/)
- [React router](https://reactrouter.com/en/main)

### Back-end
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- Arquitetura Model-Service-Controller

### Testes em Back-end
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

### Alinhamento de código
- [ESlint](https://eslint.org/)

**Obs.:** Os arquivos presentes na pasta front-end foram disponibilizados pela [Trybe](https://www.betrybe.com/) para a realização deste projeto.

## ⚙️ Execução

Para executar a aplicação inicie realizando o clone deste repositório com o comando abaixo.

    git clone git@github.com:otaviovcn/trybe-futebol-clube.git
    
Navegue até a raíz do projeto.

    cd trybe-futebol-clube/

<details>
   <summary><strong>Rodando a aplicação com o Docker</strong></summary> 
  </br>
  
  <strong>Obs:</strong> Para rodar a aplicação dessa forma você deve ter o [Docker](https://www.docker.com/) instalado na sua máquina.
  
  </br>
    Após clonar o projeto, instale as dependências na pasta back-end e front-end rodando o comando abaixo em cada pasta.
    
      npm install
  
  Na pasta app do projeto, suba os containers <strong>app_backend</strong>, <strong>app_frontend</strong> e <strong>db</strong> utilizando o docker-compose.dev.yalm. Utilize o comando abaixo.

      npm run compose:up:dev
    
  Abra o terminal do container <strong>app_backend</strong> para verificar o servidor através dos logs do container.

      docker-compose logs backend -f
  
  Para executar os testes do back-end, abra um terminal local na pasta back-end e rode o comando abaixo.
  
     npm test

    
</details>


---
 
Desenvolvido por [Otávio Vinícius](https://www.linkedin.com/in/otavio-vinicius/), © 2023.