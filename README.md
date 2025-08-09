CEVICOMFlix - Catálogo de Filmes
CEVICOMFlix é uma aplicação web para a descoberta de filmes. Utilizando a API do The Movie Database (TMDb), o site exibe carrosséis dinâmicos com filmes populares, mais bem avaliados e próximos lançamentos. Os usuários também podem pesquisar por títulos específicos e visualizar seus detalhes.


✨ Funcionalidades
Conteúdo Dinâmico: Três carrosséis de filmes são carregados dinamicamente a partir da API do TMDb:

Só no CEVICOMFlix (Populares)

Mais Bem Avaliados

Próximos Lançamentos

Busca de Filmes: Uma barra de busca permite que o usuário encontre qualquer filme no banco de dados do TMDb pelo título.

Detalhes do Filme: Ao clicar no pôster de um filme ou realizar uma busca, uma janela modal exibe informações detalhadas, como sinopse, gênero, ano de lançamento e nota média.

Interface Intuitiva: Um design moderno com tema escuro, navegação suave nos carrosséis e uma experiência de usuário amigável.


🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica do projeto.

CSS3: Estilização, layout com Flexbox e animações.

JavaScript (ES6+): Manipulação do DOM, requisições à API com fetch e async/await.

The Movie Database (TMDb) API: Fonte de dados para todos os filmes e suas informações.


🚀 Como Executar o Projeto
Para executar este projeto em sua máquina local, siga os passos abaixo.

Pré-requisitos
Navegador Web Moderno: Google Chrome, Mozilla Firefox, Microsoft Edge, etc.

Editor de Código: Visual Studio Code (recomendado).

Servidor Local: A extensão Live Server para VS Code é a forma mais simples de criar um.

Chave de API do TMDb: Você precisará de uma chave de API gratuita para fazer as requisições.

Passos para Instalação
1. Clone ou Baixe os Arquivos
Você pode clonar este repositório usando Git:

Bash

git clone https://github.com/VictorPraca/Catalogo-De-Filmes
Ou simplesmente baixe os arquivos index.html, css/style.css e js/script.js e organize-os na seguinte estrutura de pastas:

projeto-cevixomflix/
├── css/
│   └── style.css
├── js/
│   └── script.js
└── index.html


2. Obtenha sua Chave de API (API Key)
Crie uma conta gratuita no site The Movie Database (TMDb).

Após fazer login, vá para as Configurações da sua conta.

No menu lateral, clique em API e solicite uma chave de desenvolvedor. O processo é gratuito e instantâneo.

Copie a sua Chave de API (v3 auth).


3. Adicione a Chave de API ao Projeto
Abra o arquivo js/script.js no seu editor de código.

Encontre a constante apiKey no início do arquivo.

Substitua a chave existente pela sua chave de API que você copiou no passo anterior.

JavaScript

// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    const apiKey = 'SUA_CHAVE_DE_API_VAI_AQUI'; // <-- COLE SUA CHAVE AQUI
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    // ... resto do código

    
4. Inicie o Servidor Local
Este projeto faz chamadas a uma API externa e, por isso, precisa ser executado a partir de um servidor web para evitar problemas de CORS (Cross-Origin Resource Sharing). Abrir o index.html diretamente no navegador (file:///...) não funcionará.

Método Recomendado (Live Server no VS Code):

No VS Code, vá até a aba de Extensões.

Procure por Live Server (de Ritwick Dey) e clique em Instalar.

Com a extensão instalada, abra a pasta do projeto no VS Code.

Clique com o botão direito no arquivo index.html e selecione "Open with Live Server".

Seu navegador abrirá automaticamente com o projeto em funcionamento! 
