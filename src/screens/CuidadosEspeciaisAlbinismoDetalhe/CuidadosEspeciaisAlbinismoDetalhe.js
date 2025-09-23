import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

const CuidadosEspeciaisAlbiismoDetalhe = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIconContainer}>
              <Text style={styles.headerIcon}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HomePageNoite')} style={styles.goHomeIconContainer}>
              <Text style={styles.headerIcon}>↓</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image
              source={require('../../../assets/images/criança-albina.jpeg')}
              style={styles.mainImage}
            />
            <View style={styles.contentOverlay}>
              <Text style={styles.contentTitle}>Cuidados especiais com a pele albina</Text>
              <View style={styles.analystInfo}>
                <Image
                  source={require('../../../assets/images/Dra. Carolina Reato Marçon.png')}
                  style={styles.analystAvatar}
                />
                <View>
                  <Text style={styles.analystName}>Analisado por:</Text>
                  <Text style={styles.analystNameBold}>Dra. Carolina Reato Marçon</Text>
                  <Text style={styles.analystDescription}>
                    Medical Doctor at Santa Casa de Misericórdia de São Paulo, São Paulo, Brazil
                  </Text>
                </View>
              </View>
              <Text style={styles.contentParagraph}>
                A pele albina exige cuidados especiais devido à ausência total ou parcial de melanina, o pigmento que protege a pele dos raios ultravioleta (UV) do sol. Essa falta de proteção natural a torna extremamente sensível e suscetível a danos, aumentando o risco de câncer de pele.
              </Text>
              <Text style={styles.contentParagraph}>
                O principal cuidado é a proteção rigorosa contra a radiação UV, pois a pele albina não consegue se proteger naturalmente do sol. Sem melanina, a pele fica altamente vulnerável a queimaduras e a danos que podem levar a tumores malignos.
              </Text>
              <Text style={styles.contentSubtitle}>Cuidados essenciais:</Text>
              <Text style={styles.contentParagraph}>
                - 1. Proteção Solar Extrema: Use protetor solar com FPS no mínimo 50 de amplo espectro, reaplicando a cada 2 horas. Use roupas de manga comprida, chapéus de abas largas e óculos de sol com proteção 100% contra raios UV.
              </Text>
              <Text style={styles.contentParagraph}>
                - 2. Evitar a Exposição Direta: Evite ficar ao sol nos horários de pico, geralmente entre 10h e 16h, quando os raios UV são mais fortes. Se precisar sair, procure a sombra.
              </Text>
              <Text style={styles.contentParagraph}>
                - 3. Monitoramento Constante: Faça check-ups periódicos com um dermatologista para examinar a pele e detectar precocemente qualquer alteração. Fique atento a novas pintas, manchas que não cicatrizam ou lesões de aspecto incomum.
              </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  goBackIconContainer: {
    padding: 10,
  },
  goHomeIconContainer: {
    padding: 10,
    transform: [{ rotate: '180deg' }],
  },
  headerIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    marginTop: -80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 100,
  },
  contentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  analystInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  analystAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    resizeMode: 'cover',
  },
  analystName: {
    fontSize: 14,
    color: '#fff',
  },
  analystNameBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  analystDescription: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
    maxWidth: '90%',
  },
  contentParagraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 15,
  },
  contentSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CuidadosEspeciaisAlbiismoDetalhe;