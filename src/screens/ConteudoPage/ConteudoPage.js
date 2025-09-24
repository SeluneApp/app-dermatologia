import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { contentCards } from '../shared/contentData';

// Mapeamento estático de imagens
const images = {
  'Albinismo.jpg': require('../../../assets/images/Albinismo.jpg'),
  'criança-albina.jpeg': require('../../../assets/images/criança-albina.jpeg'),
  'Mentiras sobre a Dermatite.jpg': require('../../../assets/images/Mentiras sobre a Dermatite.jpg'),
  'O que é dermatite.jpg': require('../../../assets/images/O que é dermatite.jpg'),
};

// Componente para o cartão de conteúdo
const ContentCard = ({ title, subtitle, color, onPress, highlight, image, subtitleColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.contentCard, { backgroundColor: color }, highlight && styles.highlightCard]}
  >
    {image ? (
      <View style={styles.cardImageContainer}>
        <Image
          source={image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        {/* Degradê no rodapé para contraste do texto */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        >
          {subtitle && (
            <Text style={[styles.cardSubtitle, { color: subtitleColor || '#fff' }]}>{subtitle}</Text>
          )}
          {title && (
            <Text style={[styles.cardTitle, highlight && styles.highlightCardText]}>{title}</Text>
          )}
        </LinearGradient>
      </View>
    ) : (
      <>
        <Text style={[styles.cardSubtitle, highlight && styles.highlightCardText]}>
          {subtitle}
        </Text>
        {title && (
          <Text style={[styles.cardTitle, highlight && styles.highlightCardText]}>{title}</Text>
        )}
      </>
    )}
  </TouchableOpacity>
);

const ConteudoPage = ({ navigation }) => {
  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
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
            <MaterialCommunityIcons
              name="weather-lightning"
              size={32}
              color="#fff"
              style={styles.headerIconLightning}
            />
            <Text style={styles.headerTitle}>Conteúdo</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {contentCards.map((section, idx) => (
              <React.Fragment key={section.section}>
                <Text style={styles.sectionTitle}>{section.section}</Text>
                <View style={styles.row}>
                  {section.cards.map((card, i) => (
                    <ContentCard
                      key={card.subtitle + i}
                      subtitle={card.subtitle}
                      image={images[card.image]}
                      onPress={() => handleCardPress(card.route)}
                      subtitleColor={card.subtitleColor}
                    />
                  ))}
                </View>
              </React.Fragment>
            ))}
          </ScrollView>
        </SafeAreaView>

        {/* Barra de navegação inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('HomePageNoite')}
          >
            <MaterialCommunityIcons name="cloud-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButtonActive}
            onPress={() => navigation.navigate('ConteudoPage')}
          >
            <MaterialCommunityIcons name="weather-lightning" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Produtos')}
          >
            <MaterialCommunityIcons name="feather" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('configuração')}
          >
            <MaterialCommunityIcons name="cog-outline" size={28} color="#fff" />
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
    marginTop: 5,
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
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: '#4B0082',
  },
  cardImageContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
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

export default ConteudoPage;
