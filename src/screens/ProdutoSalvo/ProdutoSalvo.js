import React, { useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProdutoSalvo() {
  const navigation = useNavigation();
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
        const response = await fetch(`https://3a6f5c41385e.ngrok-free.app/produtos_salvos/${idUsuario}`);
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
        source={item.imagem ? { uri: item.imagem } : require('../../../assets/images/produto_CeraVe.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.rating}>⭐ {item.media_avaliacao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#191970' }}>
      {/* Se não houver produtos salvos */}
      {produtosSalvos.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Produtos Salvos</Text>
          <Text style={styles.text}>Você ainda não salvou nenhum produto.</Text>
        </View>
      ) : (
        <FlatList
          data={produtosSalvos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduto}
          contentContainerStyle={{ padding: 20, paddingTop: 80 }}
        />
      )}
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