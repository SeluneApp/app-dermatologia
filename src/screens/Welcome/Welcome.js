import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';


export default function WelcomeScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startSequence = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Tempo de exibição da tela antes de navegar
      setTimeout(() => {
        if (navigation && typeof navigation.replace === 'function') {
          navigation.replace('FormScreen');
        }
      }, 5000);
    };
    startSequence();
  }, [navigation]);

  return (
    <View style={styles.wrapper}>

      <Image source={require('../../../assets/images/StarryBackground.png')} style={styles.backgroundImage} />
      
      <Animated.View style={[styles.container, { opacity }]}> 
        
        <Image 
          source={require('../../../assets/images/Logo_Lua.png')} 
          style={styles.mainIcon} 
        />
        <Text style={styles.title}>Bem-vindo ao Selune</Text>
        <Text style={styles.disclaimer}>
            O app não faz diagnósticos; as informações são apenas educativas. 
            Para diagnóstico ou tratamento, procure um profissional de saúde.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: '#00001A', 
  },
  backgroundImage: { 
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28, 

    justifyContent: 'center', 
    width: '100%', 
  },
  
  mainIcon: {
    width: 150, 
    height: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  
  title: {
    color: 'white',
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 15, 
    textAlign: 'center',
  },

  disclaimer: {
    color: 'white',
    fontSize: 18, 
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 340, 
    marginTop: 10, 
  },
});