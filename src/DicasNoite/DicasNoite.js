import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DicasNoite = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/images/background-noite.png')} // Caminho para a sua imagem de fundo
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons name="weather-night-partly-cloudy" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Conteúdo</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Sobre o Tom da sua pele</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Cuidados especiais da pele albina</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Cuidados especiais da pele albina</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Dermatite</Text>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>Mentiras sobre Dermatite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, styles.highlightCard]}>
              <Text style={[styles.cardText, styles.highlightCardText]}>O que é dermatite?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <MaterialCommunityIcons name="cloud" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
            <MaterialCommunityIcons name="weather-night-partly-cloudy" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <MaterialCommunityIcons name="feather" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#0A0E2A', // Fundo de fallback caso a imagem não carregue
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#33374D',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'flex-end',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  highlightCard: {
    backgroundColor: '#DFFF00',
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
    backgroundColor: 'rgba(10, 14, 42, 0.8)', // Fundo semi-transparente
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default DicasNoite;