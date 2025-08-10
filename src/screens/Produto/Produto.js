import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Importe FontAwesome aqui

// Importe a imagem local. Certifique-se de que o caminho está correto.
import CeraVeImage from '../../../assets/images/produto_CeraVe.png';

export default function Produto({ route }) {
  const navigation = useNavigation();
  const [avaliacao, setAvaliacao] = useState(0); // Novo estado para a avaliação do cliente

  // Objeto de fallback para caso nenhuma informação seja passada
  const { produto } = route.params || {
    nome: 'CeraVe - Creme Hidratante',
    rating: 4.5,
    descricaoCurta: 'Creme Hidratante Corporal, com textura Cremosa e Ácido Hialurônico',
    ingredientes: 'ÁGUA, GLICEROL, ÁLCOOL CETOESTEARÍLICO, TRIGLICERÍDEO CAPRÍLICO/CÁPRICO, ÁLCOOL CETÍLICO, CETOMACROGOL 1000, PETROLATO AMARELO, FOSFATO DE POTÁSSIO MONOBÁSICO, CERAMIDA NP, CERAMIDA AP, CERAMIDA EOP, CARBOMER, DIMETICONA, METOSSULFATO DE BEENTRIMÔNIO, LAUROIL LACTILATO DE SÓDIO, HIALURONATO DE SÓDIO, COLESTEROL, FENOXIETANOL, EDETATO DISSÓDICO, FOSFATO DE POTÁSSIO DIBÁSICO, TOCOFEROL, FITOESFINGOSINA, GOMA XANTANA',
    caracteristicas: ['Hipoalergênico', 'Para pele seca', 'Tecnologia MVE', 'Não comedogênico', 'Ácido hialurônico', 'Ceramidas'],
    // Usa a imagem importada como fallback
    imagem: CeraVeImage,
  };

  // Função para renderizar as estrelas de avaliação do cliente (clicáveis)
  const renderAvaliacaoStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setAvaliacao(i)}>
          <AntDesign 
            name={i <= avaliacao ? 'star' : 'staro'}
            size={30}
            color={i <= avaliacao ? '#FFD700' : '#fff'} // Altera a cor se a estrela estiver selecionada
            style={styles.avaliacaoStar}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Função para renderizar as estrelas de nota do produto (não clicáveis)
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let iconName = 'star-o'; // Estrela vazia por padrão (FontAwesome)
      if (i <= Math.floor(rating)) {
        iconName = 'star'; // Estrela cheia
      } else if (i - 0.5 === rating) {
        iconName = 'star-half-empty'; // Estrela meia cheia
      }

      stars.push(
        <FontAwesome
          key={i}
          name={iconName}
          size={24}
          color="#fff"
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Image
          source={typeof produto.imagem === 'string' ? { uri: produto.imagem } : produto.imagem}
          style={styles.productImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.productName}>{produto.nome}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingValue}>{produto.rating}</Text>
            {renderStars(produto.rating)}
          </View>
          <Text style={styles.productDescription}>{produto.descricaoCurta}</Text>
        </View>
      </View>

      <View style={styles.avaliacaoContainer}>
        <Text style={styles.avaliacaoTitle}>Avalie o produto</Text>
        <View style={styles.avaliacaoStars}>
          {renderAvaliacaoStars()}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sobre o produto:</Text>
        <View style={styles.caracteristicasContainer}>
          {produto.caracteristicas?.map((caracteristica, index) => (
            <View key={index} style={styles.caracteristicaTag}>
              <Text style={styles.caracteristicaText}>{caracteristica}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionText}>
          Ela contém ceramidas, que são lipídios essenciais para a restauração da barreira cutânea, e ácido hialurônico, que possui a capacidade de reter a umidade na pele. Além disso, a fórmula é livre de fragrância e parabenos, o que a torna adequada para peles sensíveis, propensas a irritações, características comuns em pessoas com dermatite.
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <Text style={styles.sectionText}>{produto.ingredientes}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#05031a',
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#3a3a4c',
  },
  headerTextContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 16,
    color: '#fff',
    marginRight: 5,
  },
  star: {
    marginHorizontal: 1,
  },
  productDescription: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#3a3a4c',
    marginVertical: 20,
  },
  avaliacaoContainer: {
    alignItems: 'center',
  },
  avaliacaoTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  avaliacaoStars: {
    flexDirection: 'row',
  },
  avaliacaoStar: {
    marginHorizontal: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  caracteristicasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  caracteristicaTag: {
    backgroundColor: '#2a2a3e',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4a4a5e',
  },
  caracteristicaText: {
    color: '#fff',
    fontSize: 12,
  },
});