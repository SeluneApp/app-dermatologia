import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const NavigationButton = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    <Text>{icon}</Text>
  </TouchableOpacity>
);

const DailyTip = ({ color }) => (
  <View style={[styles.dailyTip, { backgroundColor: color }]} />
);

const ProductTip = ({ name, rating }) => (
  <TouchableOpacity style={styles.productTip}>
    <View style={styles.productImagePlaceholder} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStar}>⭐</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomePageNoite = ({ navigation }) => {
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

  const goToCalendar = () => {
    navigation.navigate('CalendarioNoite');
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegistroNoite');
  };

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

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overlayContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Hoje</Text>
            <TouchableOpacity onPress={goToCalendar}>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={[
              { id: '1', color: '#00FF00' },
              { id: '2', color: '#FF4500' },
              { id: '3', color: '#3CB371' },
              { id: '4', color: '#1E90FF' },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DailyTip color={item.color} />}
            contentContainerStyle={styles.dailyTipsScrollContent}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.registerText}>Registre sua pele:</Text>
            <View style={styles.registerInput}>
              <Text style={{ color: '#888' }}>Sintomas e aparência</Text>
            </View>
            <View style={styles.plusButton}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.productTipsSection}>
            <Text style={styles.sectionTitle}>Dicas de Produtos</Text>
            <FlatList
              data={[
                { id: '1', name: 'CeraVe - Creme Hidratante', rating: '4.5' },
                { id: '2', name: 'Creme facial - Natura', rating: '4.0' },
                { id: '3', name: 'LightSkin - Boticário', rating: '4.5' },
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductTip name={item.name} rating={item.rating} />
              )}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.navigationBar}>
        <NavigationButton icon="☁️" onPress={() => handleNavigationPress('Nuvem')} />
        <NavigationButton icon="⚡" onPress={() => handleNavigationPress('Raio')} />
        <NavigationButton icon="🌿" onPress={() => handleNavigationPress('Folha')} />
        <NavigationButton icon="🌡️" onPress={() => handleNavigationPress('Termômetro')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#191970',
  },
  container: {
    flex: 1,
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
  overlayContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  calendarIcon: {
    fontSize: 24,
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerInput: {
    backgroundColor: '#D8BFD8',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    flex: 1,
  },
  plusButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  dailyTipsScrollContent: {
    marginBottom: 10,
  },
  dailyTip: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginRight: 15,
  },
  productTipsSection: {
    marginTop: 20,
  },
  productTip: {
    backgroundColor: '#483D8B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  productImagePlaceholder: {
    backgroundColor: '#6A5ACD',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  productInfo: {
    alignItems: 'flex-start',
  },
  productName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    color: 'gold',
    marginRight: 5,
  },
  rating: {
    color: '#fff',
    fontSize: 12,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2F4F4F',
    paddingVertical: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navButton: {
    padding: 5,
  },
});

export default HomePageNoite;
