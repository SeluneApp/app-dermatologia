import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import "moment/locale/pt-br";
import { Calendar, LocaleConfig } from 'react-native-calendars';

moment.locale("pt-br");
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const { width } = Dimensions.get('window');

// imagens
const images = { 
  'Albinismo.jpg': require('../../../assets/images/Albinismo.jpg'), 
  'criança-albina.jpeg': require('../../../assets/images/criança-albina.jpeg'), 
  'Mentiras sobre a Dermatite.jpg': require('../../../assets/images/Mentiras sobre a Dermatite.jpg'), 
  'O que é dermatite.jpg': require('../../../assets/images/O que é dermatite.jpg'), 
  'CeraVe - Creme Hidratante.png': require('../../../assets/images/CeraVe - Creme Hidratante.png'), 
  'Balm Redutor de Rugas para Olhos Chronos.png': require('../../../assets/images/Balm Redutor de Rugas para Olhos Chronos.png'), 
  'Creme Facial Firmador Ácido Hialurônico Botik.png': require('../../../assets/images/Creme Facial Firmador Ácido Hialurônico Botik.png'), 
};

const productImageKeys = {
  "Loção Hidratante Pele Seca": "CeraVe - Creme Hidratante.png",
  "Nivea Milk Nutritivo": "Balm Redutor de Rugas para Olhos Chronos.png",
  "Neutrogena Hydro Boost Water Gel": "Creme Facial Firmador Ácido Hialurônico Botik.png",
};

// componente de produto
const ProductTip = ({ name, rating, image, onPress }) => (
  <TouchableOpacity style={styles.productTip} onPress={onPress}>
    <Image source={image} style={styles.productImage} resizeMode="cover" />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStar}>⭐</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// componente de dica diária
const DailyTipCard = ({ title, subtitle, image }) => (
  <View style={styles.dailyCard}>
    <Image source={image} style={styles.dailyCardImage} resizeMode="cover" />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.7)']}
      style={styles.dailyGradient}
    >
      {subtitle && <Text style={styles.dailyCardSubtitle}>{subtitle}</Text>}
      {title && <Text style={styles.dailyCardTitle}>{title}</Text>}
    </LinearGradient>
  </View>
);

const HomePageNoite = () => {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const starOpacity = useRef(new Animated.Value(1)).current;
  const [produtosIndicados, setProdutosIndicados] = useState([]);

  // animação estrelas
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

  // produtos
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await fetch('https://3a6f5c41385e.ngrok-free.app/produtos');
        const data = await res.json();
        setProdutosIndicados(data.slice(0, 3));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    buscarProdutos();
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = moment().startOf("week").add(i, "days");
    return {
      label: day.format("ddd").charAt(0).toUpperCase(),
      date: day.format("YYYY-MM-DD"),
      dayNumber: day.date(),
    }
  });

  const toggleCalendar = () => setCalendarVisible(!isCalendarVisible);
  const handleRegisterPress = () => navigation.navigate('DailyEntryScreen', { selectedDay });
  const handleDailyTipsPress = () => navigation.navigate('ConteudoPage');
  const handleProductTipsPress = () => navigation.navigate('Produtos');

  return (

    <View style={styles.mainWrapper}>
      <Image
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
      />
      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />
      <View style={styles.roundedElement} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.overlayContent}>
          {/* cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>Hoje</Text>
            <TouchableOpacity onPress={toggleCalendar}>
              <Image
        source={require('../../../assets/images/calendario.png' )}
        style={{ width: 34, height: 34 }}
         />
            </TouchableOpacity>
          </View>

          {/* dias da semana */}
          <View style={styles.weekDaysContainer}>
            {weekDays.map((d, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDay(d.date)}
                style={[
                  styles.dayColumn,
                  selectedDay === d.date && styles.selectedDayColumn,
                ]}
              >
                <Text style={styles.dayText}>{d.label}</Text>
                <Text style={styles.dateText}>{d.dayNumber}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* calendário */}
          {isCalendarVisible && (
            <Calendar
              onDayPress={(day) => setSelectedDay(day.dateString)}
              markedDates={{
                [selectedDay]: {
                  selected: true,
                  selectedColor: '#892be2a9',
                  selectedTextColor: '#fff',
                },
              }}
              style={styles.calendar}
              theme={{
                calendarBackground: '#9278c9de',
                dayTextColor: '#fff',
                monthTextColor: '#fff',
                arrowColor: '#fff',
                todayTextColor: '#4dd5ffd5',
                selectedDayBackgroundColor: '#af98dfff',
                selectedDayTextColor: '#ffffff',
                textDisabledColor: '#ccc',
              }}
            />
          )}

          {/* registrar sintomas */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterPress}
          ><View style={styles.registerTextContainer}>
            <Text style={styles.registerTitle}>Registre sua pele:</Text>
            <Text style={styles.registerSubtitle}>Sintomas e aparência</Text>
          </View>
            <View style={styles.registerInput}>
            </View>
            <View style={styles.plusButton}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>

          {/* dicas diárias */}
          <View style={styles.dailyTipsSection}>
            <View style={styles.dailyTipsHeader}>
              <Text style={styles.sectionTitle}>Dicas Diárias</Text>
              <Text style={styles.todayText}>Hoje</Text>
              <TouchableOpacity
                onPress={handleDailyTipsPress}
                style={styles.arrowIconContainer}
              >
                <Text style={styles.arrowIcon}>→</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                { title: 'Albinismo', subtitle: 'Cuidado diário', image: images['Albinismo.jpg'] },
                { title: 'Mitos sobre a Dermatite', subtitle: 'Informação útil', image: images['Mentiras sobre a Dermatite.jpg'], route: 'DermatiteMitosDetalhePage' },
                { title: 'Cuidados especiais com a pele albina', subtitle: 'Saúde e inclusão', image: images['criança-albina.jpeg'], route: 'CuidadosEspeciaisAlbinismoDetalhe' },
                { title: 'O que é dermatite?', subtitle: 'Entenda a condição', image: images['O que é dermatite.jpg'], route: 'DermatiteDetalhePage' },
              ]}
              keyExtractor={(item, index) => item.title + index}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: width * 0.05, paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ width: width * 0.6, alignItems: 'center', marginRight: 10 }}
                  onPress={() => {
                    if (item.route) navigation.navigate(item.route);
                  }}
                >
                  <DailyTipCard
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* dicas de produtos */}
          <View style={styles.productTipsSection}>
            <View style={styles.productTipsHeader}>
              <Text style={styles.sectionTitle}>Dicas de Produtos</Text>
              <TouchableOpacity
                onPress={handleProductTipsPress}
                style={styles.arrowIconContainer}
              >
                <Text style={styles.arrowIcon}>→</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={produtosIndicados}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <ProductTip
                  name={item.nome}
                  rating={item.media_avaliacao}
                  image={images[productImageKeys[item.nome]]}
                  onPress={() => navigation.navigate('Produto', { produto: item })}
                />
              )}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButtonActive}
          onPress={() => navigation.navigate('HomePageNoite')}
        >
          <MaterialCommunityIcons name="cloud-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ConteudoPage')}
        >
          <MaterialCommunityIcons name="weather-lightning" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Produtos')}
        >
          <MaterialCommunityIcons name="feather" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('configuracao')}
        >
          <MaterialCommunityIcons name="cog-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#191970' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 100 },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  animatedStars: { ...StyleSheet.absoluteFillObject },
   roundedElement: { //elemento do fundo
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '60%', 
    backgroundColor: '#11132b65', 
    borderBottomLeftRadius: 200, 
    borderBottomRightRadius: 200, 
  },
  overlayContent: {
    position: 'relative',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  overlayContent: { flex: 1, paddingTop: 40, paddingHorizontal: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  calendarIcon: { fontSize: 24, color: '#fff' },
  weekDaysContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  dayColumn: { alignItems: 'center' },
  dayText: { fontSize: 14, color: '#ccc' },
  dateText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  selectedDayColumn: { backgroundColor: '#af98dfff', borderRadius: 20, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: -5 },
  calendar: { marginBottom: 20, borderRadius: 10, overflow: 'hidden' },
  registerButton: { backgroundColor: '#A983BFA6', borderRadius: 18, padding: 15, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  registerTextContainer: {flex:1, backgroundColor: '#af98dfff', borderRadius: 14, paddingVertical: 8, paddingHorizontal: 10, marginLeft: 10,},
  registerTitle:{
    color:"#fff",
    fontWeight:'bold',
    fontSize:16,
  },
  registerSubtitle:{
   color:"#fff",
    fontWeight:'300',
    fontSize:12,
  },
  plusButton: { backgroundColor: '#24e7f1ff', borderRadius: 16,paddingHorizontal:14, paddingVertical:5, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  plusIcon: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dailyTipsSection: { marginBottom: 3 },
  dailyTipsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  todayText: { color: '#fff', marginRight: 5, opacity: 0.8 },
  dailyCard: { width: 200, height: 120, borderRadius: 15, marginRight: 15, overflow: 'hidden' },
  dailyCardImage: { width: '100%', height: '100%', position: 'absolute' },
  dailyGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 },
  dailyCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  dailyCardSubtitle: { fontSize: 14, color: '#fff' },
  productTipsSection: { marginTop: 20 },
  productTipsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 5 },
  arrowIconContainer: { marginLeft: 'auto', padding: 10 },
  arrowIcon: { fontSize: 16, color: '#fff' },
  productTip: { backgroundColor: 'rgba(72,61,139,0.25)', borderRadius: 10, padding: 15, marginBottom: 15 },
  productImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  productInfo: { alignItems: 'flex-start' },
  productName: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingStar: { color: 'gold', marginRight: 5 },
  rating: { color: '#fff', fontSize: 12 },
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
  navButton: { padding: 10 },
  navButtonActive: { backgroundColor: '#fff', borderRadius: 50, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
});

export default HomePageNoite;