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

const ContentCard = ({ title, subtitle, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.contentCard, { backgroundColor: color }]}>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
    {title && <Text style={styles.cardTitle}>{title}</Text>}
  </TouchableOpacity>
);

const ConteudoPage = ({ navigation }) => {
  // A função handleCardPress agora usa navigation.navigate para ir para a tela de destino.
  const handleCardPress = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')} // Verifique o caminho da imagem
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Conteúdo</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIconContainer}>
              <Text style={styles.headerIcon}>↓</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Sobre o Tom da sua pele</Text>
            <View style={styles.row}>
              <ContentCard
                subtitle="Cuidados especiais da pele albina"
                color="#4B0082" // Roxo
                onPress={() => handleCardPress('DermatiteDetalhe')} // Altere o nome da rota se necessário
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
                onPress={() => handleCardPress('DermatiteDetalhe')} // Este card agora navegará para a nova tela
              />
            </View>
          </ScrollView>
        </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  goBackIconContainer: {
    position: 'absolute',
    right: 20,
    padding: 10,
    transform: [{ rotate: '180deg' }], // Para inverter a seta '↓'
  },
  headerIcon: {
    fontSize: 24,
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
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
});

export default ConteudoPage;