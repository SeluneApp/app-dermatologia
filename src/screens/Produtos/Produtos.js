import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const produtosIndicados = [
  {
    id: '1',
    nome: 'CeraVe - Creme Hidratante',
    rating: 4.5,
    marca: 'CeraVe',
    image: '../../../assets/images/produto_CeraVe.png', // Placeholder para imagem de exemplo
  },
  {
    id: '2',
    nome: 'Creme facial - Natura',
    rating: 4.0,
    marca: 'Natura',
    image: '../../../assets/images/produto_CeraVe.png', // Placeholder para imagem de exemplo
  },
];

const maisProdutos = [
  {
    id: '3',
    nome: 'Produto LightSkin - Boticário',
    rating: 4.5,
    marca: 'Boticário',
    image: '../../../assets/images/produto_CeraVe.png', // Placeholder para imagem de exemplo
  },
  {
    id: '4',
    nome: 'Serum Vitamina C - Skinceuticals',
    rating: 4.8,
    marca: 'Skinceuticals',
    image: '../../../assets/images/produto_CeraVe.png', // Placeholder para imagem de exemplo
  },
  {
    id: '5',
    nome: 'Hidratante Neutrogena Hydro Boost',
    rating: 4.7,
    marca: 'Neutrogena',
    image: '../../../assets/images/produto_CeraVe.png', // Placeholder para imagem de exemplo
  },
];

export default function Produtos({ navigation }) {
  // Efeito para a animação de opacidade das estrelas
  const starOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(starOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderItemProdutosIndicados = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <View style={styles.imagePlaceholder}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItemMaisProdutos = ({ item }) => (
    <TouchableOpacity
      style={styles.horizontalCard}
      onPress={() => navigation.navigate('Produto', { produto: item })}
    >
      <Image source={{ uri: item.image }} style={styles.horizontalImage} resizeMode="cover" />
      <Text style={styles.horizontalNome}>{item.nome}</Text>
      <Text style={styles.horizontalRating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );

  const handleNavigationPress = (screenName) => {
    console.log(`Navegar para ${screenName}`);
  };

  return (
    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />

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
            <TextInput
              placeholder="Pesquisar..."
              placeholderTextColor="#ccc"
              style={styles.searchInput}
            />
            <MaterialCommunityIcons name="feather" size={16} color="#fff" style={styles.searchIconRight} />
          </View>

          {/* Seção "Produtos indicados para sua pele" */}
          <Text style={styles.sectionTitle}>Produtos indicados para sua pele</Text>
          <FlatList
            data={produtosIndicados}
            keyExtractor={(item) => item.id}
            renderItem={renderItemProdutosIndicados}
            contentContainerStyle={styles.list}
          />

          {/* Seção "Mais produtos" */}
          <View style={styles.horizontalSectionHeader}>
            <Text style={styles.sectionTitle}>Mais produtos</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
          </View>
          <FlatList
            data={maisProdutos}
            keyExtractor={(item) => item.id}
            renderItem={renderItemMaisProdutos}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      </SafeAreaView>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomePageNoite')}>
    <MaterialCommunityIcons name="cloud-outline" size={24} color="#fff" />
  </TouchableOpacity>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ConteudoPage')}>
    <MaterialCommunityIcons name="weather-lightning" size={24} color="#fff" />
  </TouchableOpacity>
  <TouchableOpacity style={styles.navButtonActive} onPress={() => navigation.navigate('Produtos')}>
    <MaterialCommunityIcons name="feather" size={32} color="#000" />
  </TouchableOpacity>
  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('configuração')}>
    <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#191970',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  animatedStars: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleLine: {
    width: 60,
    height: 2,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchIconRight: {
    marginLeft: 'auto',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(10, 14, 42, 0.5)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginTop: 5,
  },
  horizontalSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalList: {
    paddingBottom: 20,
  },
  horizontalCard: {
    backgroundColor: 'rgba(10, 14, 42, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
  },
  horizontalImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  horizontalNome: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horizontalRating: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A1E3B',
    backgroundColor: 'rgba(10, 14, 42, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    padding: 10,
  },
  navButtonActive: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
