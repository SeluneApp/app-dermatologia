import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import globalStyles from '../../../styles/globalStyles';

function CadastrarScreen({ navigation }) {
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
  }, [starOpacity]);

  return (
    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />
      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentWrapper}>
            <Image
              source={require('../../../assets/images/Logo_Lua.png')}
              style={globalStyles.logo}
              resizeMode="contain"
            />
            <View style={globalStyles.content}>
              <Text style={globalStyles.título}>Bem Vindo ao Selune</Text>
              <Text style={globalStyles.entrada}>Cadastre-se</Text>
            </View>

            <View style={globalStyles.content}>
              <View style={globalStyles.inputContainer}>
                <Image
                  source={require('../../../assets/images/user.icon.png')}
                  style={globalStyles.icon}
                />
                <TextInput
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#ccc"
                  style={globalStyles.inputWithIcon}
                />
              </View>
              <View style={globalStyles.inputContainer}>
                <Image
                  source={require('../../../assets/images/envelope.png')}
                  style={globalStyles.icon}
                />
                <TextInput
                  placeholder="Digite seu email"
                  placeholderTextColor="#ccc"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={globalStyles.inputWithIcon}
                />
              </View>

              <View style={globalStyles.inputContainer}>
                <Image
                  source={require('../../../assets/images/cadeado.png')}
                  style={globalStyles.icon}
                />
                <TextInput
                  placeholder="Digite uma senha"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                  style={globalStyles.inputWithIcon}
                />
              </View>

              <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('HomePageNoite')}>
                <Text style={globalStyles.buttonText}>Criar conta</Text>
              </TouchableOpacity>
              <Text style={globalStyles.text}>ou</Text>

              <TouchableOpacity style={globalStyles.buttonGooble} onPress={() => navigation.navigate('HomePageNoite')}>
                <View style={globalStyles.googleContent}>
                  <Image
                    source={require('../../../assets/images/Google.png')}
                    style={globalStyles.googleIcon}
                  />
                  <Text style={globalStyles.TextGoole}>Continue com o Google</Text>
                </View>
              </TouchableOpacity>

              <View style={globalStyles.registerPrompt}>
                <Text style={globalStyles.label}>Já possui uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={globalStyles.linkText}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
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

export default CadastrarScreen;