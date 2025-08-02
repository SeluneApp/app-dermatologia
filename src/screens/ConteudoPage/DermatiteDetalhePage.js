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

const DermatiteDetalhePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')} // Verifique o caminho da sua imagem
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
              source={require('../../../assets/images/DermatiteImage.jpg')} // Verifique o caminho da imagem da dermatite
              style={styles.mainImage}
            />
            <View style={styles.contentOverlay}>
              <Text style={styles.contentTitle}>O que é a dermatite?</Text>
              <View style={styles.analystInfo}>
                <View style={styles.analystAvatar} />
                <View>
                  <Text style={styles.analystName}>Analisado por:</Text>
                  <Text style={styles.analystNameBold}>Dra. Iris Montenegro</Text>
                  <Text style={styles.analystDescription}>
                    Dermatologista renomada, PHD por Harvard, com 20 anos de experiência no tratamento de doenças de pele. Referência.
                  </Text>
                </View>
              </View>
              <Text style={styles.contentParagraph}>
                Também conhecida como eczema, a dermatite é uma inflamação nas camadas mais superficiais da pele. Ela acomete várias áreas do corpo, e não existe idade específica para se manifestar. A condição é considerada comum e não contagiosa.
              </Text>
              <Text style={styles.contentParagraph}>
                A dermatite se manifesta principalmente por meio de pequenas bolhas na região afetada, vermelhidão, descamação, inchaço, coceira, e até mesmo rachaduras e afinamento da pele, em casos um pouco mais graves.
              </Text>
              <Text style={styles.contentParagraph}>
                O termo "dermatite" se refere a um conjunto de doenças, com vários tipos diferentes.
              </Text>
              <Text style={styles.contentParagraph}>
                O tratamento para a dermatite vai depender do seu tipo e do local onde se manifesta. Na maior parte das vezes, a doença vai ser tratada com a utilização de pomadas e cremes com corticóides, medicamentos que reduzem a inflamação e a coceira.
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
    backgroundColor: '#ADFF2F',
    marginRight: 15,
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
});

export default DermatiteDetalhePage;