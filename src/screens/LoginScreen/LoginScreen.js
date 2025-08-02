import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../../../components/StarryBackground/StarryBackground'; // Caminho corrigido
import globalStyles from '../../../styles/globalStyles'; //Importa os estilos Globais

function LoginScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>

      <LinearGradient colors={['#0d1b2a', '#112864']} style={globalStyles.absoluteFill} />
      <StarryBackground />
       <Image
        source={require('../../../assets/images/Logo_Lua.png')} // **MANTER ASSIM** se assets está na raiz do projeto
        style={globalStyles.logo}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/envelope.png')} // **MANTER ASSIM**
        style={globalStyles.icon}
      />
       <Image
        source={require('../../../assets/images/cadeado.png')} // **MANTER ASSIM**
        style={globalStyles.icon}
      />
       <Image
        source={require('../../../assets/images/Google.png')} // **MANTER ASSIM**
        style={globalStyles.googleIcon}
      />

      <View style={globalStyles.content}>
        <Text style={globalStyles.título}>Bem Vindo ao Selune</Text>
        <Text style={globalStyles.entrada}>Entrar</Text>
      </View>

      {/* Bloco principal centralizado */}
      <View style={globalStyles.content}>
        <View style={globalStyles.inputContainer}>
          <Image
            source={require('../../../assets/images/envelope.png')} // Ajuste o caminho da imagem
            style={globalStyles.icon}
          />
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#ccc"
            style={globalStyles.inputWithIcon}
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Image
            source={require('../../../assets/images/cadeado.png')} // Ajuste o caminho da imagem
            style={globalStyles.icon}
          />
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={globalStyles.inputWithIcon}
          />
        </View>
        <Text style={globalStyles.atualizar} onPress={() => navigation.navigate('Atualizar')}>Esqueci minha senha</Text>
        <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('HomePageNoite')}>
          {/* Mudei para 'HomePageNoite' para ir para a tela que você criou */}
          <Text style={globalStyles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <Text style={globalStyles.text}>ou</Text>

        <TouchableOpacity style={globalStyles.buttonGooble} onPress={() => console.log('Acessar com Google')}>
          {/* Você pode adicionar navegação para uma tela de Google Login aqui */}
          <View style={globalStyles.googleContent}>
            <Image
              source={require('../../../assets/images/Google.png')} // Ajuste o caminho da imagem
              style={globalStyles.googleIcon}
            />
            <Text style={globalStyles.TextGoole}>Acessar com o Google</Text>
          </View>
        </TouchableOpacity>
        <View style={globalStyles.registerPrompt}>
          <Text style={globalStyles.label}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={globalStyles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;