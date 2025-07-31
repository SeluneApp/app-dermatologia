import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../../../components/StarryBackground/StarryBackground'; // Caminho corrigido
import globalStyles from '../../../styles/globalStyles';

function RegisterScreen({ navigation }) {
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
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={globalStyles.input}
        />

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={globalStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Frase com link */}
        <View style={globalStyles.registerPrompt}>
          <Text style={globalStyles.label}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={globalStyles.linkText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;