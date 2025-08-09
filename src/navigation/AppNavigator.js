import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import HomePageNoite from '../screens/HomePageNoite/HomePageNoite';
import CalendarioNoite from '../screens/CalendarioNoite/CalendarioNoite';
import RegistroNoite from '../screens/RegistroNoite/RegistroNoite';
import Produtos from '../screens/Produtos/Produtos';
import Produto from '../screens/Produto/Produto';
import ProdutoSalvo from '../screens/ProdutoSalvo/ProdutoSalvo';
import ProdutosMais from '../screens/ProdutosMais/ProdutosMais';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DailyEntryScreen from '../screens/DailyEntryScreen/DailyEntryScreen';
import ConteudoPage from '../screens/ConteudoPage/ConteudoPage';
import DermatiteDetalhePage from '../screens/DermatiteDetalhePage/DermatiteDetalhePage';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DailyEntryScreen" component={DailyEntryScreen} />
        <Stack.Screen name="HomePageNoite" component={HomePageNoite} />
        <Stack.Screen name="CalendarioNoite" component={CalendarioNoite} />
        <Stack.Screen name="RegistroNoite" component={RegistroNoite} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="Produto" component={Produto} />
        <Stack.Screen name="ProdutoSalvo" component={ProdutoSalvo} />
        <Stack.Screen name="ProdutosMais" component={ProdutosMais} />
        <Stack.Screen name="ConteudoPage" component={ConteudoPage} />
        <Stack.Screen name="DermatiteDetalhePage" component={DermatiteDetalhePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
