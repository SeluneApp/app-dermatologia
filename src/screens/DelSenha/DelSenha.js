import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../../styles/globalStyles';

function AtualizarSenha({ navigation }) {
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const opacidadeEstrelas = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function carregarDadosUsuario() {
      const email = await AsyncStorage.getItem('email_usuario');
      setEmailUsuario(email);
    }
    carregarDadosUsuario();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacidadeEstrelas, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacidadeEstrelas, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const atualizarSenha = async () => {
    if (novaSenha !== confirmarNovaSenha) {
      Alert.alert('Erro', 'As novas senhas não coincidem!');
      return;
    }
    if (!emailUsuario) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      // Confirma senha atual
      const respostaUpdate = await fetch(`https://3a6f5c41385e.ngrok-free.app/usuarios/email`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_usuario: emailUsuario,
          senha: novaSenha,
        }),
      });

      const data = await respostaUpdate.json();

      if (respostaUpdate.ok && data.sucesso) {
        Alert.alert('Sucesso', data.mensagem);
        navigation.goBack();
      } else {
        Alert.alert('Erro', data.mensagem || 'Não foi possível atualizar a senha.');
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />
      <Animated.View style={[styles.animatedStars, { opacity: opacidadeEstrelas }]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('../../../assets/images/Logo_Lua.png')}
            style={globalStyles.logo}
            resizeMode="contain"
          />

          <View style={globalStyles.content}>
            <Text style={globalStyles.título}>Atualizar Senha</Text>
            <Text style={globalStyles.entrada}>Por favor, insira suas senhas</Text>
          </View>

          <View style={globalStyles.content}>
            {/* Campo de e-mail */}
            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/envelope.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                style={globalStyles.inputWithIcon}
                value={emailUsuario || ''}
                onChangeText={setEmailUsuario}
              />
            </View>

            {/* Nova senha */}
            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/cadeado.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Nova senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={globalStyles.inputWithIcon}
                value={novaSenha}
                onChangeText={setNovaSenha}
              />
            </View>

            {/* Confirmar nova senha */}
            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/cadeado.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Confirme a nova senha"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={globalStyles.inputWithIcon}
                value={confirmarNovaSenha}
                onChangeText={setConfirmarNovaSenha}
              />
            </View>

            {/* Botão */}
            <TouchableOpacity style={globalStyles.button} onPress={atualizarSenha}>
              <Text style={globalStyles.buttonText}>Atualizar Senha</Text>
            </TouchableOpacity>
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

export default AtualizarSenha;