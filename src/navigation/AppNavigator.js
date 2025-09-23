import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomePageNoite from "../screens/HomePageNoite/HomePageNoite";
import CalendarioNoite from "../screens/CalendarioNoite/CalendarioNoite";
import RegistroNoite from "../screens/RegistroNoite/RegistroNoite";
import Produtos from "../screens/Produtos/Produtos";
import Produto from "../screens/Produto/Produto";
import ProdutoSalvo from "../screens/ProdutoSalvo/ProdutoSalvo";
import ProdutosMais from "../screens/ProdutosMais/ProdutosMais";
import DailyEntryScreen from "../screens/DailyEntryScreen/DailyEntryScreen";
import ConteudoPage from "../screens/ConteudoPage/ConteudoPage";
import DermatiteDetalhePage from "../screens/DermatiteDetalhePage/DermatiteDetalhePage";
import Configuracao from "../screens/configuração/configuração"; 
import DelSenha from "../screens/DelSenha/DelSenha";
import ConfiguracaoNoite from "../screens/ConfiguraçãoNoite/ConfiguracaoNoite";
import Form from "../screens/Form/Form.Noite.js";
import CuidadosEspeciaisAlbinismoDetalhe from "../screens/CuidadosEspeciaisAlbinismoDetalhe/CuidadosEspeciaisAlbinismoDetalhe";
import DermatiteMitosDetalhePage from "../screens/DermatiteMitosDetalhePage/DermatiteMitosDetalhePage";
import CadastrarScreen from '../screens/cadastrar/CadastrarScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="cadastrar"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="FormScreen" component={Form} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={LoginScreen} />
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
        <Stack.Screen name="configuração" component={Configuracao} />
        <Stack.Screen name="DelSenha" component={DelSenha} />
        <Stack.Screen name="ConfiguracaoNoite" component={ConfiguracaoNoite} />
        <Stack.Screen name="CuidadosEspeciaisAlbinismoDetalhe"component={CuidadosEspeciaisAlbinismoDetalhe}/>
        <Stack.Screen name="DermatiteMitosDetalhePage" component={DermatiteMitosDetalhePage}/>
        <Stack.Screen name="cadastrar" component={CadastrarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
