**Selune**

Este é um aplicativo móvel desenvolvido com Expo e React Native, focado em cuidados com a pele, registro diário e conteúdo educativo.  
O aplicativo oferece uma experiência noturna com temas escuros e animações de estrelas, tornando o uso agradável e visualmente envolvente.

--------------------------------------------------
**Tecnologias e Bibliotecas**
O projeto utiliza as seguintes bibliotecas principais:

- @expo/vector-icons → Conjunto de ícones prontos para uso, incluindo MaterialCommunityIcons, AntDesign e FontAwesome.
- expo-linear-gradient → Usado para criar fundos com gradientes de cores, conferindo um visual moderno.
- react-native-calendars → Para a visualização e interação com o calendário.
- react-navigation → Biblioteca de roteamento e navegação entre telas.

--------------------------------------------------
**Como Rodar o Projeto**

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

1. Pré-requisitos:
   Instale o Node.js e o Expo CLI globalmente em sua máquina.  
   Comando:
   npm install -g expo-cli

2. Instalação:
   - Clone o repositório:
     git clone <https://github.com/SeluneApp/app-dermatologia>
   - Navegue até a pasta do projeto:
     cd app-dermatologia-Produto
   - Instale as dependências listadas no package.json:
     npm install
   - Caso alguma biblioteca específica não seja instalada automaticamente:
     expo install react-native-calendars expo-linear-gradient @expo/vector-icons react-navigation

3. Executando o Aplicativo:
   - Inicie o servidor de desenvolvimento do Expo:
     expo start
   - Use o aplicativo Expo Go no celular para escanear o QR code exibido no terminal ou no navegador.  
     Alternativamente, use um emulador iOS ou Android.

--------------------------------------------------
**Estrutura de Arquivos**

- CalendarioNoite.js → Componente da tela de calendário.
- Configuracao.js → Componente da tela de configurações.
- ConteudoPage.js → Componente da tela de conteúdo informativo.
- DailyEntryScreen.js → Componente da tela de registro diário.
- DermatiteDetalhePage.js → Exibe informações detalhadas sobre a dermatite, com análise de especialista fictícia.
- HomePageNoite.js → Tela inicial noturna com calendário semanal, dicas diárias, sugestões de produtos e animação de estrelas.
- HomeScreen.js → Tela exemplo de navegação para outras partes do app.
- LoginScreen.js → Tela de login com animação de estrelas, campos de e-mail/senha e login via Google ou cadastro.
- Produto.js → Exibe detalhes de um produto de cuidado com a pele e permite avaliação.
