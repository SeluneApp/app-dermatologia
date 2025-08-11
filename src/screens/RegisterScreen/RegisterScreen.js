import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../../../components/StarryBackground/StarryBackground'; // Caminho corrigido
import globalStyles from '../../../styles/globalStyles';

function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("https://faea7fd1fc66.ngrok-free.app/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_usuario: nome, 
          email_usuario: email, 
          senha: senha
        })
      });

      const data = await response.json();

      if (data.sucesso) {
        Alert.alert("Sucesso", data.mensagem, [
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]);
      } else {
        Alert.alert("Erro", data.mensagem);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={['#0d1b2a', '#112864']}
        style={globalStyles.absoluteFill}
      />
      <StarryBackground />

      <View style={{ width: '100%', alignItems: 'center', marginTop: 80 }}>
        <Text style={globalStyles.title}>Criar Conta</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#ccc"
          style={globalStyles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={globalStyles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={globalStyles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={globalStyles.button}
          onPress={handleRegister}
        >
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Frase com link */}
        <View style={globalStyles.registerPrompt}>
          <Text style={globalStyles.label}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={globalStyles.linkText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;