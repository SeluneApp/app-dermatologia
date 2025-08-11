import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const DailyEntryScreen = ({ navigation }) => {
  const [selectedExposure, setSelectedExposure] = useState(null);
  const [hasRedness, setHasRedness] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState([]);
  const [productName, setProductName] = useState('');

  const [idUsuario, setIdUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const exposureOptions = ['15-30 min', '1-2 horas', '2-3 horas', '+ 3 horas'];
  const feelingOptions = ['coceira', 'ardencia', 'dor'];

  
  // Função para buscar id do usuário logado (simular pegar do AsyncStorage, por ex)
  useEffect(() => {
    async function carregarUsuario() {
      // Aqui você busca o id do usuário (pode ser AsyncStorage ou contexto)
      // Exemplo AsyncStorage:
      const id = await AsyncStorage.getItem('id_usuario');
      if (id) {
        setIdUsuario(Number(id));
      }
    }
    carregarUsuario();
  }, []);

  // Ao carregar o usuário, buscar entradas anteriores e setar estado para marcar respostas
  useEffect(() => {
  async function buscarEntradas() {
    if (!idUsuario) return;

    try {
      const response = await fetch(`https://faea7fd1fc66.ngrok-free.app/usuario/${idUsuario}/entradas`);
      const data = await response.json();

      if (data.length > 0) {
        const ultimaEntrada = data[0];
        setSelectedExposure(ultimaEntrada.exposicao);
         setHasRedness(ultimaEntrada.vermelhidao);
         setSelectedFeeling(ultimaEntrada.sentimentos || []);
         setProductName(ultimaEntrada.medicamento || '');  // preenche o campo medicamento
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as entradas salvas.');
      setLoading(false);
    }
  }

  buscarEntradas();
}, [idUsuario]);


  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling((prev) =>
      prev.includes(feeling)
        ? prev.filter((item) => item !== feeling)
        : [...prev, feeling]
    );
  };

  // Função que envia os dados para o backend
  const salvarEntrada = async () => {
    if (!idUsuario) {
      Alert.alert('Erro', 'Usuário não identificado.');
      return;
    }


    const entrada = {
  id_usuario: idUsuario,
  exposicao: selectedExposure,
  vermelhidao: hasRedness,
  sentimentos: selectedFeeling,
  medicamento: productName,  
};
   console.log(entrada)

    try {
      const response = await fetch('https://seu-endereco-api/entrada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entrada),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Entrada salva com sucesso!');
        // Opcional: navegue para outra tela ou reset estados aqui
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a entrada.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao salvar a entrada.');
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <LinearGradient colors={['#1F0E4D', '#3B176B']} style={styles.backgroundImage}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backIcon}>✕</Text>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <TouchableOpacity style={styles.arrowButton}>
                <Text style={styles.arrowIcon}>{'<'}</Text>
              </TouchableOpacity>
              <View style={styles.dateInfo}>
                <Text style={styles.headerTitle}>Hoje</Text>
                <Text style={styles.dateText}>23 fev. 2025</Text>
              </View>
              <TouchableOpacity style={styles.arrowButton}>
                <Text style={styles.arrowIcon}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção Exposição ao sol */}
          <View style={styles.section}>
            <Text style={styles.sectionQuestion}>Exposição ao sol :</Text>
            <View style={styles.optionsContainer}>
              {exposureOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, selectedExposure === option && styles.selectedOption]}
                  onPress={() => setSelectedExposure(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Seção Sua pele apresenta vermelhidões? */}
          <View style={styles.section}>
            <Text style={styles.sectionQuestion}>Sua pele apresenta vermelhidões?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, hasRedness === true && styles.selectedOption]}
                onPress={() => setHasRedness(true)}
              >
                <Text style={styles.optionText}>sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, hasRedness === false && styles.selectedOption]}
                onPress={() => setHasRedness(false)}
              >
                <Text style={styles.optionText}>não</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção Está sentindo: */}
          <View style={styles.section}>
            <Text style={styles.sectionQuestion}>Está sentindo:</Text>
            <View style={styles.optionsContainer}>
              {feelingOptions.map((feeling) => (
                <TouchableOpacity
                  key={feeling}
                  style={[styles.optionButton, selectedFeeling.includes(feeling) && styles.selectedOption]}
                  onPress={() => handleFeelingSelect(feeling)}
                >
                  <Text style={styles.optionText}>{feeling}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Seção Fez uso de qual produto/medicamento? */}
          <View style={styles.section}>
            <Text style={styles.sectionQuestion}>Fez uso de qual produto/medicamento?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite aqui o nome e marca do produto"
              placeholderTextColor="#888"
              value={productName}
              onChangeText={setProductName}
            />
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Botão flutuante + com degradê */}
      <TouchableOpacity style={styles.plusButtonContainer} onPress={salvarEntrada}>
        <LinearGradient colors={['#8A2BE2', '#4B0082']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#1F0E4D',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
    justifyContent: 'space-between',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    zIndex: 1,
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dateInfo: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#E0E0FF',
  },
  arrowButton: {
    padding: 5,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  sectionQuestion: {
    color: '#E0E0FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#9370DB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: (width - 80) / 2,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#B19CD9',
    borderColor: '#fff',
    borderWidth: 2,
  },
  optionText: {
    color: '#fff',
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 5,
  },
  plusButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: (width / 2) - 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  plusButton: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 35,
  },
});

export default DailyEntryScreen;