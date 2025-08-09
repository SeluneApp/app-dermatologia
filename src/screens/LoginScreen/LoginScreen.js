import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

function LoginScreen({ navigation }) {
  // Estado e efeito para a animação das estrelas
  const starOpacity = useRef(new Animated.Value(1)).current;

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

  return (
    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />

      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('../../../assets/images/Logo_Lua.png')}
            style={globalStyles.logo}
            resizeMode="contain"
          />

          <View style={globalStyles.content}>
            <Text style={globalStyles.título}>Bem Vindo ao Selune</Text>
            <Text style={globalStyles.entrada}>Entrar</Text>
          </View>

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
              />
            </View>
            <Text style={globalStyles.atualizar} onPress={() => navigation.navigate('Atualizar')}>Esqueci minha senha</Text>
            <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('HomePageNoite')}>
              <Text style={globalStyles.buttonText}>Acessar</Text>
            </TouchableOpacity>
            <Text style={globalStyles.text}>ou</Text>

            <TouchableOpacity style={globalStyles.buttonGooble} onPress={() => console.log('Acessar com Google')}>
              <View style={globalStyles.googleContent}>
                <Image
                  source={require('../../../assets/images/Google.png')}
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#191970',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  animatedStars: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default LoginScreen;
