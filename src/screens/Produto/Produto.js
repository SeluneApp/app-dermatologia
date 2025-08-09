import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Produto({ route }) {
  const { produto } = route.params || {
    nome: 'Produto Desconhecido',
    rating: 0,
    marca: 'Marca Genérica',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{produto.nome}</Text>
      <View style={styles.imagePlaceholder} />

      <Text style={styles.label}>Marca:</Text>
      <Text style={styles.text}>{produto.marca}</Text>

      <Text style={styles.label}>Avaliação:</Text>
      <Text style={styles.rating}>⭐ {produto.rating}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>
        Este é um ótimo produto indicado para o seu tipo de pele. Hipoalergênico, com ácido hialurônico e sem parabenos.
      </Text>

      <Text style={styles.label}>Ingredientes:</Text>
      <Text style={styles.text}>
        Água, Glicerol, Álcool Cetoestearílico, Ceramidas, Ácido Hialurônico, Petrolato, Dimeticona...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#6A5ACD',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    color: '#ADFF2F',
    marginTop: 15,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
  },
});
