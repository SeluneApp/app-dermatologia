import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componente para o cartão de conteúdo
const ContentCard = ({ title, subtitle, color, onPress, highlight }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.contentCard,
      { backgroundColor: color },
      highlight && styles.highlightCard,
    ]}
  >
    <Text style={[styles.cardSubtitle, highlight && styles.highlightCardText]}>
      {subtitle}
    </Text>
    {title && <Text style={[styles.cardTitle, highlight && styles.highlightCardText]}>{title}</Text>}
  </TouchableOpacity>
);

const ConteudoPage = ({ navigation }) => {
  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
  };

  const handleNavigationPress = (screenName) => {
    console.log(`Navegar para ${screenName}`);
    // Implemente a navegação para as outras telas aqui
    // Exemplo: navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            {/* Ícone de raio no lugar do ponto de interrogação */}
            {/* O tamanho foi alterado para 32 */}
            <MaterialCommunityIcons name="weather-lightning" size={32} color="#fff" style={styles.headerIconLightning} />
            <Text style={styles.headerTitle}>Conteúdo</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Sobre o Tom da sua pele</Text>
            <View style={styles.row}>
              <ContentCard
                subtitle="Cuidados especiais da pele albina"
                color="#4B0082" // Roxo
                onPress={() => handleCardPress('DermatiteDetalhe')}
              />
              <ContentCard
                subtitle="Cuidados especiais da pele albina"
                color="#4B0082"
                onPress={() => handleCardPress('DermatiteDetalhe')}
              />
            </View>

            <Text style={styles.sectionTitle}>Dermatite</Text>
            <View style={styles.row}>
              <ContentCard
                subtitle="Mentiras sobre Dermatite"
                color="#4B0082"
                onPress={() => handleCardPress('DermatiteDetalhe')}
              />
              <ContentCard
                subtitle="O que é dermatite?"
                color="#ADFF2F" // Verde-limão
                onPress={() => handleCardPress('DermatiteDetalhePage')}
                highlight={true}
              />
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Barra de navegação inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('Nuvem')}>
            <MaterialCommunityIcons name="cloud-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButtonActive} onPress={() => handleNavigationPress('Raio')}>
            <MaterialCommunityIcons name="weather-lightning" size={32} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('Folha')}>
            <MaterialCommunityIcons name="feather" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('Configuracoes')}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIconLightning: {
    marginTop: 5, // Margem para mover o ícone para baixo
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contentCard: {
    width: '48%',
    height: 150,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#fff',
  },
  highlightCard: {
    backgroundColor: '#ADFF2F',
  },
  highlightCardText: {
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A1E3B',
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

export default ConteudoPage;
