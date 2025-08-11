import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../../../components/StarryBackground/StarryBackground';
import globalStyles from '../../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
   try {
      const id_usuario = await AsyncStorage.getItem('id_usuario');

      if (!id_usuario) {
        Alert.alert('Erro', 'Usuário não autenticado');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://faea7fd1fc66.ngrok-free.app/usuario/${id_usuario}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      
      const textoResposta = await response.text();
      try {
        const usuario = JSON.parse(textoResposta);
        setUser(usuario);
      } catch (e) {
        console.error('Erro ao parsear JSON:', e);
        Alert.alert('Erro', 'Resposta inválida do servidor');
      }

    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('id_usuario');
      navigation.replace('LoginScreen'); // Ajuste para o nome correto da sua tela de login
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deslogar.');
    }
  };
  
  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

   if (!user) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white' }}>Não foi possível carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={globalStyles.absoluteFill} />
      <StarryBackground />
      <Text style={globalStyles.title}>Perfil do Usuário</Text>
      <Text style={{ color: 'white' }}>Email: {user.email_usuario}</Text>
      <Text style={{ color: 'white' }}>Nome: {user.nome_usuario}</Text>

      <TouchableOpacity 
        onPress={handleLogout} 
        style={{
          marginTop: 40,
          backgroundColor: 'red',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;