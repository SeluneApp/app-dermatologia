import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importar todas as telas usadas no app
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DailyEntryScreen from '../screens/DailyEntryScreen/DailyEntryScreen';
import HomePageNoite from '../screens/HomePageNoite/HomePageNoite';
import TipDetailScreen from '../screens/HomePageNoite/TipDetailScreen';
import ConteudoPage from '../screens/ConteudoPage/ConteudoPage';
import DermatiteDetalhePage from '../screens/ConteudoPage/DermatiteDetalhePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DailyEntry" component={DailyEntryScreen} />
        <Stack.Screen name="HomePageNoite" component={HomePageNoite} />
        <Stack.Screen name="TipDetail" component={TipDetailScreen} />
        <Stack.Screen name="Conteudo" component={ConteudoPage} />
        <Stack.Screen name="DermatiteDetalhe" component={DermatiteDetalhePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
