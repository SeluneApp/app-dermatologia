import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const produtos = [
  {
    id: '1',
    nome: 'CeraVe - Creme Hidratante',
    rating: 4.5,
    marca: 'CeraVe',
  },
  {
    id: '2',
    nome: 'Creme facial - Natura',
    rating: 4.0,
    marca: 'Natura',
  },
  {
    id: '3',
    nome: 'Produto LightSkin - Boticário',
    rating: 4.5,
    marca: 'Boticário',
  },
];

export default function Produtos({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <View style={styles.imagePlaceholder}>
        {/* Aqui pode usar <Image source={require(...)} /> */}
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.marca}>{item.marca}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Indicados</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#4B0082',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    backgroundColor: '#6A5ACD',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marca: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 5,
  },
});
