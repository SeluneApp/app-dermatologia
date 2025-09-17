import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomePage = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com Data */}
      <View style={styles.header}>
        <Text style={styles.title}>Hoje</Text>
        <Ionicons name="calendar-outline" size={24} color="white" />
      </View>

      {/* Dias da semana */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
          <View
            key={index}
            style={[
              styles.day,
              index === 6 && styles.selectedDay, // Supondo que domingo (último) é o atual
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dayNumber}>{17 + index}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Registro da pele */}
      <TouchableOpacity style={styles.registerBox}>
        <Text style={styles.registerText}>Registre sua pele:</Text>
        <Text style={styles.registerSubtitle}>sintomas e aparência</Text>
        <View style={styles.plusButton}>
          <Ionicons name="add" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Dicas Diárias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas Diárias - Hoje</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </View>
      <View style={styles.tipsContainer}>
        {['green', 'red', 'lightgreen'].map((color, i) => (
          <View key={i} style={[styles.tipCard, { backgroundColor: color }]} />
        ))}
      </View>

      {/* Dicas de Produtos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas de Produtos</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </View>
      <View style={styles.productList}>
        <View style={styles.productItem}>
          <View style={styles.productCircle} />
          <View>
            <Text style={styles.productName}>CeraVe - Creme Hidratante</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </View>
        <View style={styles.productItem}>
          <View style={styles.productCircle} />
          <View>
            <Text style={styles.productName}>Creme Facial - Natura</Text>
            <Text style={styles.rating}>⭐ 4.0</Text>
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Ionicons name="home" size={24} color="white" />
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <MaterialCommunityIcons name="face-woman-outline" size={24} color="white" />
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1B34',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },

  daysContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexGrow: 0,
  },
  day: {
    width: 40,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#1E2D47',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: '#8C52FF',
  },
  dayText: { color: 'white', fontSize: 14 },
  dayNumber: { color: 'white', fontWeight: 'bold' },

  registerBox: {
    backgroundColor: '#3B3F77',
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  registerText: { color: 'white', fontSize: 16, marginBottom: 4 },
  registerSubtitle: { color: '#CCC' },
  plusButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: '#8C52FF',
    padding: 6,
    borderRadius: 20,
  },

  section: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  tipCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  productList: {
    marginTop: 10,
    gap: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#777',
  },
  productName: {
    color: 'white',
    fontWeight: 'bold',
  },
  rating: {
    color: '#FEE440',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopColor: '#444',
    borderTopWidth: 1,
    marginTop: 20,
  },
});
