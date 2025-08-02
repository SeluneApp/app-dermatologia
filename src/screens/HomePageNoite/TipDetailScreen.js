import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const TipDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/7MCk2JD.jpg' }}
        style={styles.imageHeader}
        imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
      >
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>O que é a dermatite?</Text>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <View style={styles.author}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>Analisado por:</Text>
            <Text style={styles.authorHighlight}>Dra. Íris Montenegro</Text>
            <Text style={styles.authorDesc}>
              Dermatologista renomada, PhD por Harvard, com 20 anos de experiência.
            </Text>
          </View>
        </View>

        <Text style={styles.text}>
          Também conhecida como eczema, a dermatite é uma inflamação...
          {'\n\n'}
          A dermatite se manifesta por bolhas, vermelhidão, descamação...
          {'\n\n'}
          O tratamento depende do tipo e local afetado.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000026' },
  imageHeader: {
    height: 250,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  closeText: {
    fontSize: 22,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  author: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#bbb',
    borderRadius: 25,
    marginRight: 12,
  },
  authorName: {
    color: '#aaa',
    fontSize: 12,
  },
  authorHighlight: {
    color: '#bfff00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  authorDesc: {
    fontSize: 12,
    color: '#ccc',
    width: '90%',
  },
  text: {
    fontSize: 14,
    color: '#eee',
    lineHeight: 22,
  },
});

export default TipDetailScreen;
