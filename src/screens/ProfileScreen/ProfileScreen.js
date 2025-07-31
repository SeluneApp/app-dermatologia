import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarryBackground from '../../../components/StarryBackground/StarryBackground';
import globalStyles from '../../../styles/globalStyles';

function ProfileScreen() {
  return (
    <View style={globalStyles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={globalStyles.absoluteFill} />
      <StarryBackground />
      <Text style={globalStyles.title}>Perfil do Usuário</Text>
      <Text style={{ color: 'white' }}>Email: usuario@exemplo.com</Text>
      <Text style={{ color: 'white' }}>Nome: João da Silva</Text>
    </View>
  );
}

export default ProfileScreen;