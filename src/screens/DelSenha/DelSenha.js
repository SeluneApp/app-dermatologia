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
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../../styles/globalStyles';

function UpdatePasswordScreen({ navigation }) {
  const [idUsuario, setIdUsuario] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  useEffect(() => {
    async function loadUserData() {
      const id = await AsyncStorage.getItem('id_usuario');
      const email = await AsyncStorage.getItem('email_usuario');
      setIdUsuario(id);
      setEmailUsuario(email);
    }
    loadUserData();
  }, []);

  // Animação para as estrelas
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

  // Função para lidar com o clique no botão "Atualizar Senha"
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
    alert('As novas senhas não coincidem!');
    return;
  }
  if (!idUsuario || !emailUsuario) {
    alert('Usuário não autenticado');
    return;
  }

  try {
    // Verificar senha atual
    const loginResponse = await fetch('https://faea7fd1fc66.ngrok-free.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_usuario: emailUsuario, senha: currentPassword }),
    });

    const loginData = await loginResponse.json();

    if (!loginData.sucesso) {
      alert('Senha atual incorreta!');
      return;
    }
    // Buscar dados atuais do usuário (para enviar junto no PATCH)
    const usuarioResponse = await fetch(`https://faea7fd1fc66.ngrok-free.app/usuario/${idUsuario}`);
    if (!usuarioResponse.ok) {
      alert('Erro ao buscar dados do usuário.');
      return;
    }
    const usuarioAtual = await usuarioResponse.json();
    // Atualizar senha
    const updateResponse = await fetch(`https://faea7fd1fc66.ngrok-free.app/usuarios/${idUsuario}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome_usuario: usuarioAtual.nome_usuario, email_usuario: usuarioAtual.email_usuario, senha: newPassword, }),
    });

    if (updateResponse.ok) {
      alert('Senha atualizada com sucesso!');
      navigation.goBack();
    } else {
      alert('Erro ao atualizar senha.');
    }
  } catch (error) {
    console.error(error);
    alert('Erro ao conectar com o servidor.');
  }    // Exemplo: navigation.goBack(); para voltar à tela anterior
  };

  return (
    <View style={styles.mainWrapper}>
      {/* Imagem de fundo estrelada */}
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />
      {/* Animação das estrelas */}
      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          {/* Logo */}
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
            {/* Campo para a senha atual */}
            <View style={globalStyles.inputContainer}>
              <Image
                source={require('../../../assets/images/cadeado.png')}
                style={globalStyles.icon}
              />
              <TextInput
                placeholder="Senha atual"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={globalStyles.inputWithIcon}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
            </View>

            {/* Campo para a nova senha */}
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
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>

            {/* Campo para confirmar a nova senha */}
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
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
            </View>

            {/* Botão de atualização de senha */}
            <TouchableOpacity style={globalStyles.button} onPress={handleUpdatePassword}>
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

export default UpdatePasswordScreen;
