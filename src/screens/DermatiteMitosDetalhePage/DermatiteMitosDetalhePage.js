

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

const DermatiteMitosDetalhePage = ({ navigation }) => {
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
              source={require('../../../assets/images/Mentiras sobre a Dermatite.jpg')}
              style={styles.mainImage}
            />
            <View style={styles.contentOverlay}>
              <Text style={styles.contentTitle}>Mitos sobre a Dermatite</Text>
              <View style={styles.analystInfo}>
                <Image
                  source={require('../../../assets/images/Dra. Iris Montenegro.png')}
                  style={styles.analystAvatar}
                />
                <View>
                  <Text style={styles.analystName}>Analisado por:</Text>
                  <Text style={styles.analystNameBold}>Dra. Iris Montenegro</Text>
                  <Text style={styles.analystDescription}>
                    Dermatologista renomada, PHD por Harvard, com 20 anos de experiência no tratamento de doenças de pele. Referência.
                  </Text>
                </View>
              </View>
              <Text style={styles.contentParagraph}>
                A dermatite, uma inflamação comum da pele, é cercada por muitos mitos que podem confundir e até mesmo prejudicar o tratamento. É fundamental desvendar essas crenças para entender a condição e buscar os cuidados corretos.
              </Text>
              
              <Text style={styles.contentSubtitle}>Mito 1: Dermatite é contagiosa</Text>
              <Text style={styles.contentParagraph}>
                **Falso.** A dermatite não é uma doença contagiosa. Você não a pega ou a transmite para outras pessoas através do contato. A dermatite atópica, o tipo mais comum, é uma condição genética e autoimune, ligada a uma sensibilidade da pele e do sistema imunológico.
              </Text>

              <Text style={styles.contentSubtitle}>Mito 2: A dermatite é causada apenas por falta de higiene</Text>
              <Text style={styles.contentParagraph}>
                **Falso.** Embora a má higiene possa agravar certas condições de pele, a dermatite não é causada por isso. Na verdade, lavar demais a pele, usar produtos muito agressivos ou sabonetes perfumados pode retirar a proteção natural da pele e piorar os sintomas.
              </Text>

              <Text style={styles.contentSubtitle}>Mito 3: Pessoas com dermatite devem evitar banhos</Text>
              <Text style={styles.contentParagraph}>
                **Falso.** A higiene é importante. O ideal é tomar banhos curtos e com água morna, não quente, usando sabonetes suaves e sem fragrância. Secar a pele delicadamente e aplicar um hidratante logo em seguida ajuda a reter a umidade e a manter a barreira protetora da pele.
              </Text>

              <Text style={styles.contentSubtitle}>Mito 4: É uma doença de pele "simples"</Text>
              <Text style={styles.contentParagraph}>
                **Falso.** A dermatite é uma condição crônica que pode ter um impacto significativo na qualidade de vida. Ela pode causar coceira intensa, dificuldade para dormir e constrangimento, afetando o bem-estar físico e emocional. O tratamento adequado e a orientação de um dermatologista são essenciais para gerenciar os sintomas.
              </Text>

              <Text style={styles.contentParagraph}>
                Conhecer a verdade por trás desses mitos ajuda a buscar o diagnóstico correto e a tratar a condição de forma eficaz, sem estigmas ou preconceitos.
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

export default DermatiteMitosDetalhePage;