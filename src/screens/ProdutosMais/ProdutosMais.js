import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const sugestoes = [
  { id: '1', nome: 'Protetor Solar A', rating: 4.2 },
  { id: '2', nome: 'Sabonete Facial B', rating: 4.7 },
  { id: '3', nome: 'Tônico Calmante C', rating: 4.1 },
];

export default function ProdutosMais() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais Produtos</Text>
      <FlatList
        data={sugestoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#4B0082',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: '#FFD700',
    marginTop: 5,
  },
});
 