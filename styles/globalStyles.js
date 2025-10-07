import { LinkingContext } from '@react-navigation/native';
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const globalStyles = StyleSheet.create({
  

  logo: {
    width: isLargeScreen ? 150 : 100,
    height: isLargeScreen ? 150 : 100,
  },
  content: {
    width: isLargeScreen ? '60%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  título: {
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  entrada: {
    // Subtítulo: "Entrar"
    fontSize: isLargeScreen ? 28 : 25,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 30, // Espaçamento para o bloco de inputs
    // POSIÇÃO ABSOLUTA REMOVIDA
  },
  text: {
    // Texto "ou"
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 15,
    fontSize: isLargeScreen ? 16 : 14,
    textAlign: 'center',
  },
  
  // ===================================
  // ESTILOS DE INPUT (Consolidado)
  // ===================================
  inputContainer: {
    // Container do Ícone + Input
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', // Underline sutil
    marginBottom: 20, 
    paddingBottom: 5,
    width: '100%',
  },
  inputWithIcon: {
    // Estilo do campo de texto
    flex: 1,
    color: '#FFFFFF', // Texto digitado branco
    paddingLeft: 10,
    fontSize: isLargeScreen ? 18 : 16,
    // Removido paddingVertical, pois o paddingBottom do Container já ajuda
  },
  icon: {
    // Ícones de envelope e cadeado
    width: isLargeScreen ? 28 : 20,
    height: isLargeScreen ? 28 : 20,
    marginRight: 10,
    tintColor: '#FFFFFF', // Ícones brancos
  },

  // ===================================
  // BOTÃO PADRÃO (Acessar) - (Consolidado)
  // ===================================
  button: {
    backgroundColor: '#303f9f', // Azul escuro
    paddingVertical: 12, // Consolidado para um valor fixo para coesão
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 25, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.5, // Para desabilitar botões
  },
  
  // ===================================
  // BOTÃO GOOGLE (Consolidado)
  // ===================================
  buttonGooble: {
    backgroundColor: '#FFFFFF', // Fundo branco
    paddingVertical: 12, // Consolidado
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    borderWidth: 1, 
    borderColor: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextGoole: {
    color: '#000000', // Texto preto
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  googleIcon: {
    width: isLargeScreen ? 36 : 32, // Mantendo o tamanho maior para o ícone do Google
    height: isLargeScreen ? 36 : 32,
    marginRight: 10,
  },

  // ===================================
  // LINKS E PROMPTS (Consolidado)
  // ===================================
  atualizar: {
   
    color: '#00ffff7e', // Cor Ciano Claro
    fontWeight: 'bold',
    alignSelf: 'flex-end', 
    marginBottom: 2, 
    textDecorationLine: 'underline', 
  },
  registerPrompt: { 
    // Container para "Não tem uma conta? Cadastre-se"
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    // Texto "Não tem uma conta?"
    color: '#ffffff', 
    fontSize: isLargeScreen ? 16 : 14,
  },
});

export default globalStyles;