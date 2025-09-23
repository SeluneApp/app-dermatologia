import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Animated, StyleSheet, SafeAreaView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../../styles/globalStyles';
import useLoginGoogle from './LoginGoogle';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const starOpacity = useRef(new Animated.Value(1)).current;
  const { request, promptAsync } = useLoginGoogle();

  // Animação das estrelas
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(starOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Salvar dados e vai para home
  async function handleLoginSuccess(token, id_usuario, email_usuario) {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('id_usuario', id_usuario.toString());
      await AsyncStorage.setItem('email_usuario', email_usuario);
      navigation.replace('HomePageNoite');
    } catch (error) {
      console.error('Erro ao salvar token', error);
    }
  }

  // Função de login com API
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Filtro de email permitido
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Erro', 'Use apenas um email @gmail.com');
      return;
    }

    try {
      const response = await fetch('https://63c0b903e2e7.ngrok-free.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_usuario: email,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (data.sucesso) {
        await handleLoginSuccess(
          data.token,
          data.usuario.id_usuario,
          data.usuario.email_usuario
        );
        Alert.alert('Sucesso', data.mensagem);
      } else {
        Alert.alert('Erro', data.mensagem);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.mainWrapper}>
      {/* Fundo estrelado */}
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />

      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          {/* Logo */}
          <Image
            source={require('../../../assets/images/Logo_Lua.png')}
            style={globalStyles.logo}
            resizeMode="contain"
          />

          {/* Títulos */}
          <View style={globalStyles.content}>
            <Text style={globalStyles.título}>Bem Vindo ao Selune</Text>
            <Text style={globalStyles.entrada}>Entrar</Text>
          </View>

          {/* Inputs */}
          <View style={globalStyles.content}>
            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/envelope.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Digite seu email"
                placeholderTextColor="#ccc"
                style={globalStyles.inputWithIcon}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/cadeado.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={globalStyles.inputWithIcon}
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            {/* Esqueci senha */}
            <Text
              style={globalStyles.atualizar}
              onPress={() => navigation.navigate('DelSenha')}
            >
              Esqueci minha senha
            </Text>

            {/* Botão login */}
            <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
              <Text style={globalStyles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <Text style={globalStyles.text}>ou</Text>

            {/* Botão Google (ainda precisa rever lógica OAuth) */}
            <TouchableOpacity
              style={globalStyles.buttonGooble}
              disabled={!request}
              onPress={() => promptAsync()}
            >
              <View style={globalStyles.googleContent}>
                <Image
                  source={require('../../../assets/images/Google.png')}
                  style={globalStyles.googleIcon}
                />
                <Text style={globalStyles.TextGoole}>Acessar com o Google</Text>
              </View>
            </TouchableOpacity>

            {/* Cadastro */}
            <View style={globalStyles.registerPrompt}>
              <Text style={globalStyles.label}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={globalStyles.atualizar} onPress={() => navigation.navigate('cadastrar')}>
              Cadastre-se
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#191970' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  animatedStars: { ...StyleSheet.absoluteFillObject },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default LoginScreen;
