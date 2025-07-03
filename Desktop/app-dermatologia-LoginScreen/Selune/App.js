import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Easing } from 'react-native';
import { TouchableOpacity } from 'react-native';




enableScreens();

const Stack = createStackNavigator();

// Componente das estrelinhas
const Star = ({ top, left }) => {
  const opacity = React.useRef(new Animated.Value(Math.random())).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.star, { top, left, opacity }]} />;
};

const StarryBackground = () => {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    top: `${Math.random() * 100}%`,   
    left: `${Math.random() * 100}%`,  
    key: i,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map(({ top, left, key }) => (
        <Star key={key} top={top} left={left} />
      ))}
    </View>
  );
};

// Telas

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={StyleSheet.absoluteFill} />
      <StarryBackground />

      {/* Lua fixa no topo */}
      <Image
        source={require('./assets/images/Logo_Lua.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.título}>Bem Vindo ao Selune</Text>
        <Text style={styles.entrada}>Entrar</Text>
      </View>
      

      {/* Bloco principal centralizado */}
      <View style={styles.content}>
        
        <View style={styles.inputContainer}>
  <Image
    source={require('./assets/images/envelope.png')}
    style={styles.icon}
  />
  <TextInput
    placeholder="Digite seu email"
    placeholderTextColor="#ccc"
    style={styles.inputWithIcon}
  />
</View>

<View style={styles.inputContainer}>
  <Image
    source={require('./assets/images/cadeado.png')}
    style={styles.icon}
  />
  <TextInput
    placeholder="Digite sua senha"
    placeholderTextColor="#ccc"
    secureTextEntry
    style={styles.inputWithIcon}
  />
</View>
        <Text style={styles.atualizar} onPress={() => navigation.navigate('Atualizar')}>Esqueci minha senha</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
  <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>ou</Text>
      
        <TouchableOpacity style={styles.buttonGooble} onPress={() => navigation.navigate('google')}>
  <View style={styles.googleContent}>
    <Image
      source={require('./assets/images/Google.png')}
      style={styles.googleIcon}
    />
    <Text style={styles.TextGoole}>Acessar com o Google</Text>
  </View>
</TouchableOpacity>


        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Criar conta
        </Text>
      </View>
    </View>
  );
}

// tela login
function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={StyleSheet.absoluteFill} />
      <StarryBackground />
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput placeholder="Nome" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={StyleSheet.absoluteFill} />
      <StarryBackground />
      <Text style={styles.title}>Bem-vindo ao Selune</Text>
      <Button title="Nova Entrada Diária" onPress={() => navigation.navigate('DailyEntry')} />
      <Button title="Ver Perfil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function DailyEntryScreen() {
  const [entry, setEntry] = useState('');
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={StyleSheet.absoluteFill} />
      <StarryBackground />
      <Text style={styles.title}>Entrada Diária</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descreva como está sua pele hoje..."
        multiline
        numberOfLines={5}
        value={entry}
        onChangeText={setEntry}
      />
      <Button title="Salvar" onPress={() => alert('Entrada salva!')} />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d1b2a', '#112864']} style={StyleSheet.absoluteFill} />
      <StarryBackground />
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={{ color: 'white' }}>Email: usuario@exemplo.com</Text>
      <Text style={{ color: 'white' }}>Nome: João da Silva</Text>
    </View>
  );
}

// Estilos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112864',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 40, // distância do topo
    width: 100,
    height: 100,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120, // empurra o conteúdo para baixo da logo
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#9A8C98',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  link: {
    color: '#ffffff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'white',
    opacity: 0.9,
  },
  título: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'absolute',
    top: -100,
  },
  entrada: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: 'bold',
    position: 'absolute',
    top: 70,
    left: 9,
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#9A8C98',
  borderRadius: 8,
  backgroundColor: '#FFF',
  paddingHorizontal: 10,
  marginBottom: 10,
},

icon: {
  width: 20,
  height: 20,
  marginRight: 10,
},

inputWithIcon: {
  flex: 1,
  fontSize: 16,
  color: '#000',
  paddingVertical: 10,
},
atualizar: {
  color: '#ffffff',
  fontWeight: 'bold',
  marginBottom: 10,
  alignSelf: 'flex-end',
  textDecorationLine: 'underline',
},
button: {
  backgroundColor: '#01024b',
  paddingVertical: 14,
  paddingHorizontal: 60,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 20,
},
buttonGooble: {
  backgroundColor: 'white',
  paddingVertical: 14,
  paddingHorizontal: 60,
  borderRadius: 12,
  alignItems: 'center',
  marginTop: 20,
},
acessarButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
buttonText: {
  color: 'white',
},
TextGoole: {
  color: 'black'
},
text: {
  fontWeight: 'bold',
  color: '#ffffff',
  marginVertical: 10, // adiciona espaço acima e abaixo
},
googleContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

googleIcon: {
  width: 20,
  height: 20,
  marginRight: 10,
},



});

// App principal

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="DailyEntry" component={DailyEntryScreen} options={{ title: 'Entrada Diária' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
