import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ConfiguracoesScreen = ({ navigation }) => {
  const handleNavigationPress = (screenName) => {
    console.log(`Navegar para ${screenName}`);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.mainWrapper}>
      <LinearGradient
        colors={['#1F0E4D', '#3B176B']}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header com botão de voltar */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backIcon}>{'<'}</Text>
              </TouchableOpacity>
            </View>

            {/* Card de Perfil */}
            <View style={styles.profileCard}>
              <View style={styles.profileInfo}>
                <Image
                  source={require('../../../assets/images/Selune-Lune.png')} // Substitua pelo caminho do seu ícone de tartaruga
                  style={styles.profileImage}
                />
                <View style={styles.profileText}>
                  <Text style={styles.profileEmail}>SeuEmail@gmail.com</Text>
                  <Text style={styles.editInfo}>Editar Informações</Text>
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
              <TouchableOpacity style={styles.optionItem} onPress={() => handleNavigationPress('Configurações')}>
                <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" style={styles.optionIcon} />
                <Text style={styles.optionText}>Configurações</Text>
              </TouchableOpacity>
            </View>

            {/* Seção de Redes Sociais */}
            <View style={styles.sectionCard}>
              <TouchableOpacity style={styles.optionItem} onPress={() => handleNavigationPress('Instagram')}>
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
      </LinearGradient>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePageNoite')}>
          <MaterialCommunityIcons name="cloud-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ConteudoPage')}>
          <MaterialCommunityIcons name="weather-lightning" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Produtos')}>
          <MaterialCommunityIcons name="feather" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtonActive} onPress={() => navigation.navigate('configuração')}>
          <MaterialCommunityIcons name="cog-outline" size={32} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#1F0E4D',
  },
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 100, // Espaço para a barra de navegação inferior
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
  // Estilos para o card de perfil
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
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
    backgroundColor: '#5A3E8A', // Cor de fundo para o ícone
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
    backgroundColor: '#00BFFF', // Cor azul vibrante
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  premiumButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Estilos para as seções de opções
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionIcon: {
    marginRight: 15,
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
  // Estilos para a barra de navegação inferior
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(10, 14, 42, 0.8)',
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