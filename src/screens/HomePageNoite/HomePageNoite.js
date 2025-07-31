import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
              <Text style={styles.arrowIcon}>→</Text>
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
              <Text style={styles.arrowIcon}>→</Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.productTipsScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <ProductTip name="CeraVe - Creme Hidratante" rating="4.5" />
              <ProductTip name="Creme facial - Natura" rating="4.0" />
            </ScrollView>
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
  arrowIcon: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 'auto',
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
    marginBottom: 30,
    maxHeight: 250,
    overflow: 'hidden',
  },
  productTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productTipsScrollContent: {
    paddingBottom: 10,
  },
  productTip: {
    backgroundColor: '#483D8B',
    borderRadius: 10,
    width: '100%',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
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
    width: '100%',
  },
  productName: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navButton: {
    padding: 5,
  },
});

export default HomePageNoite;
