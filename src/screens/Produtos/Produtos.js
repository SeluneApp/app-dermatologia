import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated, SafeAreaView, TextInput, Alert} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Produtos({ navigation }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [produtosIndicados, setProdutosIndicados] = useState([]);
  const [maisProdutos, setMaisProdutos] = useState([]);
  const starOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function carregarUsuario() {
      const id = await AsyncStorage.getItem('id_usuario');
      if (id) setUsuarioLogado({ id_usuario: Number(id) });
    }
    carregarUsuario();
  }, []);

  // Buscar produtos na API
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await fetch('https://4e5f2081274a.ngrok-free.app/produtos');
        const data = await res.json();

        setProdutosIndicados(data.slice(0, 3));
        setMaisProdutos(data.slice(3));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    buscarProdutos();
  }, []);

  // Animação das estrelas
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
        Animated.timing(starOpacity, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Render card de produto
  const renderItem = ({ item }, horizontal = false) => (
    <TouchableOpacity
      style={horizontal ? styles.horizontalCard : styles.card}
      onPress={() => {
        if (usuarioLogado) {
          navigation.navigate('Produto', { produto: item, id_usuario: usuarioLogado.id_usuario });
        } else {
          Alert.alert('Erro', 'Usuário não está logado.');
        }
      }}
    >
      <Image
        source={
          item.image = require('../../../assets/images/produto_CeraVe.png') // temporário
        }
        style={horizontal ? styles.horizontalImage : styles.image}
        resizeMode="contain"
      />
      <Text style={horizontal ? styles.horizontalNome : styles.nome}>{item.nome}</Text>
      <Text style={horizontal ? styles.horizontalRating : styles.rating}>⭐ {item.media_avaliacao}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainWrapper}>
      <Image source={require('../../../assets/images/StarryBackground.png')} style={styles.backgroundImage} />
      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <MaterialCommunityIcons name="feather" size={24} color="#fff" />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Produtos</Text>
              <View style={styles.titleLine} />
            </View>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
          </View>

          {/* Barra de Pesquisa */}
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#fff" style={styles.searchIcon} />
            <TextInput placeholder="Pesquisar..." placeholderTextColor="#ccc" style={styles.searchInput} />
            <MaterialCommunityIcons name="feather" size={16} color="#fff" style={styles.searchIconRight} />
          </View>

          {/* Produtos indicados */}
          <Text style={styles.sectionTitle}>Produtos indicados para sua pele</Text>
          <FlatList
            data={produtosIndicados}
            keyExtractor={(item) => String(item.id)}
            renderItem={(props) => renderItem(props, false)}
            contentContainerStyle={styles.list}
          />

          {/* Mais produtos */}
          <View style={styles.horizontalSectionHeader}>
            <Text style={styles.sectionTitle}>Mais produtos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProdutosMais')}>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={maisProdutos}
            keyExtractor={(item) => String(item.id)}
            renderItem={(props) => renderItem(props, true)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      </SafeAreaView>

      {/* Barra inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePageNoite')}>
          <MaterialCommunityIcons name="cloud-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ConteudoPage')}>
          <MaterialCommunityIcons name="weather-lightning" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButtonActive} onPress={() => navigation.navigate('Produtos')}>
          <MaterialCommunityIcons name="feather" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('configuração')}>
          <MaterialCommunityIcons name="cog-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#191970' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  animatedStars: { ...StyleSheet.absoluteFillObject },
  safeArea: { flex: 1 },
  content: { flex: 1, padding: 20, paddingTop: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, marginBottom: 20, marginTop: 20 },
  titleContainer: { alignItems: 'center' },
  title: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  titleLine: { width: 60, height: 2, backgroundColor: '#fff', marginTop: 5 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 25, paddingHorizontal: 15, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchIconRight: { marginLeft: 'auto' },
  searchInput: { flex: 1, height: 40, color: '#fff' },
  sectionTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  list: { paddingBottom: 20 },
  card: { backgroundColor: 'rgba(10, 14, 42, 0.5)', borderRadius: 10, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 30 },
  info: { flex: 1 },
  nome: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  rating: { color: '#FFD700', fontSize: 14, marginTop: 5 },
  horizontalSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  horizontalList: { paddingBottom: 20 },
  horizontalCard: { backgroundColor: 'rgba(10, 14, 42, 0.5)', borderRadius: 10, padding: 10, marginRight: 15, width: 150, alignItems: 'center' },
  horizontalImage: { width: 120, height: 120, borderRadius: 10, marginBottom: 10 },
  horizontalNome: { color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  horizontalRating: { color: '#FFD700', fontSize: 12, marginTop: 5 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    paddingBottom: 5,
    borderTopWidth: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
      borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButtonActive: { backgroundColor: '#fff', borderRadius: 50, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
});