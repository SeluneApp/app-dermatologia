import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';

const sugestoes = [
  { id: '1', nome: 'Protetor Solar A', rating: 4.2 },
  { id: '2', nome: 'Sabonete Facial B', rating: 4.7 },
  { id: '3', nome: 'Tônico Calmante C', rating: 4.1 },
];

export default function ProdutosMais({ navigation }) {
  
  const backgroundImage = require('../../../assets/images/StarryBackground.png'); 
  const produtos = sugestoes;

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Produtos')}>
          <Text style={{color: 'white', fontSize: 24}}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Produtos +</Text>
        <View style={styles.titleUnderline} />
      </View>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={[styles.imagemCirculo, { backgroundColor: item.imagemCor || '#222' }]} />
            <View style={styles.cardContent}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#00001A', 
    paddingTop: 40, 
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    height: 50,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  titleUnderline: {
    position: 'absolute',
    bottom: 0,
    width: 150, 
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1, 
    opacity: 0.6,
  },
backButton: {
  position: 'absolute',
  left: 20, 
  padding: 5,
  zIndex: 10, 
},

listItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
  borderBottomWidth: 1, 
  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
},
  imagemCirculo: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeProduto: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  rating: {
    color: '#FFD700', 
    fontSize: 16,
    marginTop: 3,
  },
});
