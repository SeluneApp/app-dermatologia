import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, SafeAreaView, Dimensions, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ConfiguracoesScreen = ({ navigation }) => {
  const [emailUsuario, setEmailUsuario] = useState("Carregando...");

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const id = await AsyncStorage.getItem("id_usuario");
        if (id) {
          const response = await fetch(`https://30989c00a844.ngrok-free.app/usuario/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar usuário");
          }
          const data = await response.json();
          setEmailUsuario(data.email_usuario);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar o usuário.");
        setEmailUsuario("Erro ao carregar email");
      }
    }

    carregarUsuario();
  }, []);

  const handleNavigationPress = (screenName) => {
    navigation.navigate(screenName);
  };




  return (
    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header com botão de voltar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={[styles.backIcon]}>{'<'}</Text>
            </TouchableOpacity>
          </View>

          {/* Card de Perfil */}
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image
                source={require('../../../assets/images/Selune-Lune.png')}
                style={styles.profileImage}
              />
              <View style={styles.profileText}>
                <Text style={styles.profileEmail}>{emailUsuario}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Seja Premium</Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Opções */}
          <View style={styles.sectionCard}>
            <TouchableOpacity style={styles.optionItem} onPress={() => handleNavigationPress('Temas')}>
              <MaterialCommunityIcons name="moon-waxing-crescent" size={24} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Temas</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.optionItem} onPress={() => handleNavigationPress('Contato')}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Contato</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ConfiguracaoNoite')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Configurações</Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Redes Sociais */}
          <View style={styles.sectionCard}>
            <TouchableOpacity style={styles.optionItem} onPress={() => Linking.openURL('https://www.instagram.com/seluneapp?igsh=MWxjdmZ4a3FtbXYxeg==')}>
              <MaterialCommunityIcons name="instagram" size={24} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Instagram</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.optionItem} onPress={() => handleNavigationPress('Comentario')}>
              <MaterialCommunityIcons name="send" size={24} color="#fff" style={styles.optionIcon} />
              <Text style={styles.optionText}>Compartilhe seu comentário</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePageNoite')}>
          <MaterialCommunityIcons name="cloud-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ConteudoPage')}>
          <MaterialCommunityIcons name="weather-lightning" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Produtos')}>
          <MaterialCommunityIcons name="feather" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtonActive} onPress={() => navigation.navigate('configuracao')}>
          <MaterialCommunityIcons name="cog-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  profileCard: {
    backgroundColor: '#a983bfc0',
    borderRadius: 20, 
    padding: 20,
    marginBottom: 20,
    
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: 'transparent', 
  },
  profileText: {
    flex: 1,
  },
  profileEmail: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editInfo: {
    color: '#ccc',
    fontSize: 12,
  },
  premiumButton: {
    backgroundColor: '#00BFFF', 
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end', 
    marginTop: -30, 
  },
  premiumButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // --- Estilos Corrigidos para as Seções de Opções ---
  sectionCard: {
    backgroundColor: 'transparent', // Cor roxa escura sólida
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    // Removidas as bordas
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionIcon: {
    marginRight: 15,
    color: '#ccc', // Ícones em tom de cinza claro
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 5,
  },

  // --- Estilos da Barra de Navegação Inferior ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    paddingBottom: 5,
    borderTopWidth: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    padding: 10,
  },
  navButtonActive: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});


export default ConfiguracoesScreen;