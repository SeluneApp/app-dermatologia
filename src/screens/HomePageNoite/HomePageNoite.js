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
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

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
  const [selectedDay, setSelectedDay] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
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

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleRegisterPress = () => {
    navigation.navigate('DailyEntry');
  };

  const handleDailyTipsPress = () => {
    navigation.navigate('ConteudoPage');
  };

  const handleProductTipsPress = () => {
    navigation.navigate('Produtos');
  };

  // Alteração importante: A função agora irá navegar para a tela correta.
  const handleNavigationPress = (screenName) => {
    if (screenName === 'Configuracoes') {
      navigation.navigate(screenName);
    } else {
      // Para as outras telas, você ainda pode manter o console.log
      // ou implementar a navegação se as rotas estiverem definidas.
      console.log(`Navegar para ${screenName}`);
    }
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
            <TouchableOpacity onPress={toggleCalendar}>
              <Text style={styles.calendarIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
              <View
                key={i}
                style={[
                  styles.dayColumn,
                  i === 6 && styles.selectedDayColumn,
                ]}
              >
                <Text style={styles.dayText}>{d}</Text>
                <Text style={styles.dateText}>{17 + i}</Text>
              </View>
            ))}
          </View>

          {isCalendarVisible && (
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                ...(selectedDay && {
                  [selectedDay]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'blue',
                  },
                }),
                '2024-07-23': {
                  marked: true,
                  dotColor: 'white',
                  selected: true,
                  selectedColor: '#8A2BE2',
                },
              }}
              style={styles.calendar}
              theme={{
                calendarBackground: '#333355',
                dayTextColor: '#fff',
                monthTextColor: '#fff',
                arrowColor: '#fff',
                todayTextColor: '#ADFF2F',
                selectedDayBackgroundColor: '#8A2BE2',
                selectedDayTextColor: '#ffffff',
                textDisabledColor: '#ccc',
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                },
              }}
            />
          )}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.registerText}>Registre sua pele:</Text>
            <View style={styles.registerInput}>
              <Text style={{ color: '#888' }}>Sintomas e aparência</Text>
            </View>
            <View style={styles.plusButton}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.dailyTipsSection}>
            <View style={styles.dailyTipsHeader}>
              <Text style={styles.sectionTitle}>Dicas Diárias</Text>
              <Text style={styles.todayText}>·Hoje</Text>
              <TouchableOpacity onPress={handleDailyTipsPress} style={styles.arrowIconContainer}>
                <Text style={styles.arrowIcon}>→</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.dailyTipsScrollContent}
              showsHorizontalScrollIndicator={false}
            >
              <DailyTip color="#00FF00" />
              <DailyTip color="#FF4500" />
              <DailyTip color="#3CB371" />
            </ScrollView>
          </View>

          <View style={styles.productTipsSection}>
            <View style={styles.productTipsHeader}>
              <Text style={styles.sectionTitle}>Dicas de Produtos</Text>
              <TouchableOpacity onPress={handleProductTipsPress} style={styles.arrowIconContainer}>
                <Text style={styles.arrowIcon}>→</Text>
              </TouchableOpacity>
            </View>
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

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButtonActive} onPress={() => handleNavigationPress('Nuvem')}>
          <MaterialCommunityIcons name="cloud-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('Raio')}>
          <MaterialCommunityIcons name="weather-lightning" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('Folha')}>
          <MaterialCommunityIcons name="feather" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigationPress('configuração')}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
        </TouchableOpacity>
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
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#ccc',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedDayColumn: {
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  registerButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  dailyTipsSection: {
    marginBottom: 30,
  },
  dailyTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  todayText: {
    color: '#fff',
    marginRight: 5,
    opacity: 0.8,
  },
  arrowIconContainer: {
    marginLeft: 'auto',
    padding: 10,
  },
  arrowIcon: {
    fontSize: 16,
    color: '#fff',
  },
  dailyTipsScrollContent: {
    paddingRight: 10,
  },
  dailyTip: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  productTipsSection: {
    marginTop: 20,
  },
  productTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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

export default HomePageNoite;
