import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';

// Imagens do produto e fundo
import CeraVeImage from '../../../assets/images/produto_CeraVe.png';
import StarryBackground from '../../../assets/images/StarryBackground.png';

export default function Produto({ route }) {
  const navigation = useNavigation();

  const produto = route.params?.produto || {
    nome: 'CeraVe - Creme Hidratante',
    rating: 4.5,
    descricaoCurta: 'Creme Hidratante Corporal, com textura Cremosa e Ácido Hialurônico',
    descricaoCompleta: 'Ela contém ceramidas, que são todos essenciais para a manutenção da barreira cutânea, e ácido hialurônico, que possui capacidade de reter a umidade na pele. Além disso, a fórmula é livre de fragrâncias e parabenos, o que a torna adequada para peles sensíveis, propensas a irritações, características comuns em pessoas com dermatite.',
    ingredientes: 'ÁGUA, GLICEROL, ÁLCOOL CETOESTEARÍLICO, TRIGLICERÍDEO CAPRÍLICO/CÁPRICO, ÁLCOOL CETÍLICO, CETOMACROGOL 1000, PETROLATO AMARELO, FOSFATO DE POTÁSSIO MONOBÁSICO, CERAMIDA NP, CERAMIDA AP, CERAMIDA EOP, CARBOMER, DIMETICONA, METOSSULFATO DE BEENTRIMÔNIO, LAUROIL LACTILATO DE SÓDIO, HIALURONATO DE SÓDIO, COLESTEROL, FENOXIETANOL, EDETATO DISSÓDICO, FOSFATO DE POTÁSSIO DIBÁSICO, TOCOFEROL, FITOESFINGOSINA, GOMA XANTANA',
    caracteristicas: ['Hipoalergênico', 'Para pele seca', 'Tecnologia MVE', 'Não comedogênico', 'Ácido hialurônico', 'Ceramidas'],
    imagem: CeraVeImage,
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      let iconName = 'star-o';
      if (i <= fullStars) {
        iconName = 'star';
      } else if (hasHalfStar && i === fullStars + 1) {
        iconName = 'star-half-empty';
      }

      stars.push(
        <FontAwesome
          key={i}
          name={iconName}
          size={18}
          color="#FFD700"
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <ImageBackground source={StarryBackground} style={styles.backgroundImage}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Header com imagem ao lado do nome */}
          <View style={styles.header}>
            <Image
              source={produto.imagem}
              style={styles.productImage}
            />
            <View style={styles.headerTextContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.productName}>{produto.nome}</Text>
                <Feather name="chevron-down" size={24} color="#aaa" />
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingValue}>{produto.rating}</Text>
                {renderStars(produto.rating)}
              </View>
              <Text style={styles.productDescription}>{produto.descricaoCurta}</Text>
            </View>
          </View>

          {/* Seção Sobre o Produto */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Sobre o produto:</Text>

            {/* Tags de características sem map */}
            <View style={styles.caracteristicasContainer}>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Hipoalergênico</Text></View>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Para pele seca</Text></View>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Tecnologia MVE</Text></View>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Não comedogênico</Text></View>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Ácido hialurônico</Text></View>
              <View style={styles.caracteristicaTag}><Text style={styles.caracteristicaText}>Ceramidas</Text></View>
            </View>

            <Text style={styles.sectionText}>{produto.descricaoCompleta}</Text>
            <Text style={[styles.sectionText, { marginTop: 10 }]}>
              Ela contém cerâmicas, que são todos essenciais para a manutenção da barreira cutânea, e ácido hialurônico, que possui capacidade de reter a umidade na pele. Além disso, a fórmula é livre de fragrâncias e parabenos, o que a torna adequada para peles sensíveis, propensas a irritações, características comuns em pessoas com dermatite.
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Ingredientes */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <Text style={styles.sectionText}>{produto.ingredientes}</Text>
            <Text style={[styles.sectionText, { marginTop: 10 }]}>
              ÁGUA, GLICEROL, ALCOOL CETOESTEARÍLICO, TRIGLICERIDEO CAPRÍLICO/CAPRICO, ÁLCOOL CETILICO, CETOMACROGOL 1000, PETROLATO AMARELO, FOSFATO DE POTÁSSIO MONOBÁSICO, CERAMIDA NP, CERAMIDA AP, CERAMIDA EOP, CARBOMER, DIMETICONA, METOSSULFATO DE BEENTRIMONIO, LAUROIL LACTILATO DE SODIO, HIALURONATO DE SÓDIO, COLESTEROL, FENOXIETANOL, EDETATO DISSÓDICO, FOSFATO DE POTÁSSIO DIBÁSICO, TOCOFEROL, FITOESFINGOSINA, GOMA XANTANA ETILEXILGLICERINA.
            </Text>
          </View>

          <View style={styles.divider} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  closeButton: { position: 'absolute', top: 60, left: 20, zIndex: 10 },
  container: { flexGrow: 1, paddingTop: 100, paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: 'rgba(20, 20, 40, 0.95)', borderRadius: 20, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  headerTextContainer: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  ratingValue: { fontSize: 16, color: '#fff', marginRight: 8, fontWeight: 'bold' },
  star: { marginHorizontal: 1 },
  productDescription: { fontSize: 14, color: '#aaa' },
  divider: { height: 1, backgroundColor: '#3a3a4c', marginVertical: 20 },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  sectionText: { fontSize: 14, color: '#ccc', lineHeight: 22 },
  caracteristicasContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  caracteristicaTag: { backgroundColor: '#4a4a5e', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15, marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#6a6a80' },
  caracteristicaText: { color: '#fff', fontSize: 12, fontWeight: '500' },
});
