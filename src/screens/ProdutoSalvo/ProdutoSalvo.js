import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProdutoSalvo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos Salvos</Text>
      <Text style={styles.text}>Você ainda não salvou nenhum produto.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
  },
});
