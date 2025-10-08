import React from 'react';
import {
  StyleSheet, 
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ConfiguracaoPage = ({ navigation }) => {
  const menuItems = [
    { title: 'Configurações de notificações', icon: 'bell-outline' },
    { title: 'Idioma', icon: 'web' },
    { title: 'Sobre', icon: 'help-circle-outline' },
    { title: 'Sair', icon: 'power' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Configurações</Text>
            <View style={{ width: 28 }} /> 
          </View>

          <ScrollView contentContainerStyle={styles.menuList}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={() => {}}>
                <MaterialCommunityIcons name={item.icon} size={24} color="#8A2BE2" />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuList: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
  },
});

export default ConfiguracaoPage;
