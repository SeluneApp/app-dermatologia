import React from 'react';
import { View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import StarryBackground from '../../../components/StarryBackground/StarryBackground';
import globalStyles from '../../../styles/globalStyles';

function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <LinearGradient
        colors={['#0d1b2a', '#112864']}
        style={globalStyles.absoluteFill}
      />

      {/* <StarryBackground /> */}

      <Text style={globalStyles.title}>Bem-vindo ao Selune</Text>

      <Button
        title="Nova Entrada Diária"
        onPress={() => navigation.navigate('DailyEntry')}
      />

      <Button
        title="Ver Perfil"
        onPress={() => navigation.navigate('Profile')}
      />

      {/* Botão para voltar para a Home Noturna */}
      <Button
        title="Voltar para Home Noturna"
        onPress={() => navigation.navigate('HomePageNoite')}
      />
    </View>
  );
}

export default HomeScreen;
