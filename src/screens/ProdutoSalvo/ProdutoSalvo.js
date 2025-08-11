import React, { useEffect, useState }from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProdutoSalvo( {navigation} ) {
  const [produtosSalvos, setProdutosSalvos] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);

useEffect(() => {
    async function carregarUsuario() {
      const id = await AsyncStorage.getItem('id_usuario');
      if (id) {
        setIdUsuario(Number(id));
      }
    }
    carregarUsuario();
  }, []);

  useEffect(() => {
    async function buscarProdutosSalvos() {
      if (!idUsuario) return;

      try {
        const response = await fetch(`https://faea7fd1fc66.ngrok-free.app/produtos_salvos/${idUsuario}`);
        if (!response.ok) {
          Alert.alert('Erro', 'Não foi possível carregar os produtos salvos.');
          return;
        }
        const data = await response.json(); 
        setProdutosSalvos(data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar produtos salvos.');
        console.error(error);
      }
    }
    buscarProdutosSalvos();
  }, [idUsuario]);

  const renderProduto = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <Image
        source={item.image ? { uri: item.image } : require('../../../assets/images/produto_CeraVe.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  if (produtosSalvos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Produtos Salvos</Text>
        <Text style={styles.text}>Você ainda não salvou nenhum produto.</Text>
      </View>
    );
  }

   return (
 <View style={{ flex: 1, backgroundColor: '#191970' }}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.goBackIconContainer}
    >
      <Text style={styles.headerIcon}>X</Text>
    </TouchableOpacity>

    <FlatList
      data={produtosSalvos}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderProduto}
      contentContainerStyle={{ padding: 20,  paddingTop: 80}}
      ListEmptyComponent={
        <View style={styles.container}>
          <Text style={styles.title}>Produtos Salvos</Text>
          <Text style={styles.text}>Você ainda não salvou nenhum produto.</Text>
        </View>
      }
    />
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
  },list: { padding:20 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 14, 42, 0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  goBackIconContainer: {
    position: 'absolute',
    top: 40, // distância do topo (ajuste se quiser)
    left: 20, // distância da esquerda
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  nome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
  },
});