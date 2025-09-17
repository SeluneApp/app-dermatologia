import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Dados do questionário
const skinQuestions = [
  {
    question: '1. Logo que você acorda, antes de lavar o rosto, como sente a sua pele?',
    options: [
      { key: 'A', text: 'Brilhante e com sensação de oleosidade' },
      { key: 'B', text: 'Sem brilho excessivo, equilibrada' },
      { key: 'C', text: 'Levemente áspera ou repuxada' },
      { key: 'D', text: 'Brilho apenas na testa, nariz e queixo (zona T)' },
    ],
  },
  {
    question: '2. Ao longo do dia sua pele geralmente fica:',
    options: [
      { key: 'A', text: 'Muito oleosa e brilhante' },
      { key: 'B', text: 'Equilibrada, sem grandes alterações' },
      { 'key': 'C', text: 'Ressecada, podendo descamar' },
      { key: 'D', text: 'Oleosa somente na zona T (testa, nariz e queixo) e normal nas bochechas' },
    ],
  },
  {
    question: '3. Após lavar o rosto com sabonete neutro, como a pele reage?',
    options: [
      { key: 'A', text: 'Pouco tempo depois já volta a brilhar' },
      { key: 'B', text: 'Permanece confortável, sem incômodo' },
      { key: 'C', text: 'Fica repuxada e áspera' },
      { key: 'D', text: 'Algumas áreas ficam oleosas e outras ressecadas' },
    ],
  },
  {
    question: '4. Com que frequência você sente necessidade de reaplicar hidratante facial?',
    options: [
      { key: 'A', text: 'Quase nunca, sinto a pele já hidratada naturalmente' },
      { key: 'B', text: 'Apenas uma vez ao dia é suficiente' },
      { key: 'C', text: 'Várias vezes ao dia, sinto ressecamento constante' },
      { key: 'D', text: 'Somente em algumas regiões (ex.: bochechas)' },
    ],
  },
  {
    question: '5. Você sente que tem espinhas e cravos?',
    options: [
      { key: 'A', text: 'Sim, sempre tenho espinhas ou cravos no rosto' },
      { key: 'B', text: 'Muito difícil, mas as vezes aparece' },
      { key: 'C', text: 'Nunca tenho espinhas e raramente tem cravos' },
      { key: 'D', text: 'As vezes aparece cravo ou espinha na zona T (testa, nariz e queixo), nunca na bochecha' },
    ],
  },
  {
    question: '6. Qual a sensação mais frequente em sua pele durante o dia?',
    options: [
      { key: 'A', text: 'Pegajosa ou oleosa' },
      { key: 'B', text: 'Confortável e equilibrada' },
      { key: 'C', text: 'Repuxada, sensível e áspera' },
      { key: 'D', text: 'Variável entre oleosa em algumas partes e seca em outras' },
    ],
  },
  {
    question: '7. Ao observar sua pele de perto no espelho, o que percebe?',
    options: [
      { key: 'A', text: 'Poros dilatados e visíveis em quase todo o rosto' },
      { key: 'B', text: 'Poros discretos e regulares' },
      { key: 'C', text: 'Pele opaca, sem brilho, poros pouco visíveis' },
      { key: 'D', text: 'Poros visíveis apenas na zona T, bochechas normais' },
    ],
  },
  {
    question: '8. Sua pele costuma apresentar:',
    options: [
      { key: 'A', text: 'Cravos e espinhas com frequência e algumas vezes ficam inflamadas' },
      { key: 'B', text: 'Raramente cravos ou espinhas' },
      { key: 'C', text: 'Descamação e vermelhidão' },
      { key: 'D', text: 'Cravos na zona T e ressecamento nas bochechas' },
    ],
  },
  {
    question: '9. Em dias frios ou secos, como sua pele reage?',
    options: [
      { key: 'A', text: 'Continua oleosa' },
      { key: 'B', text: 'Permanece equilibrada' },
      { key: 'C', text: 'Fica ainda mais seca e desconfortável' },
      { key: 'D', text: 'Algumas áreas ficam secas, outras permanecem oleosas' },
    ],
  },
  {
    question: '10. Como você classificaria a sensação geral da sua pele?',
    options: [
      { key: 'A', text: 'Sempre oleosa' },
      { key: 'B', text: 'Normal, equilibrada' },
      { key: 'C', text: 'Ressecada e sensível' },
      { key: 'D', text: 'Mista: oleosa na zona T, normal ou seca nas bochechas' },
    ],
  },
];

const SkinQuizPage = ({ navigation }) => {
  const [answers, setAnswers] = useState({});

  const handleSelectOption = (questionIndex, optionKey) => {
    setAnswers({ ...answers, [questionIndex]: optionKey });
  };

  const calculateResult = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach(key => {
      counts[key]++;
    });

    let maxCount = 0;
    let resultKey = '';
    for (const key in counts) {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        resultKey = key;
      }
    }

    if (Object.keys(answers).length !== skinQuestions.length) {
      Alert.alert('Questionário Incompleto', 'Por favor, responda a todas as perguntas para ver o resultado.');
      return;
    }

    let skinType = '';
    switch (resultKey) {
      case 'A':
        skinType = 'Pele Oleosa';
        break;
      case 'B':
        skinType = 'Pele Normal';
        break;
      case 'C':
        skinType = 'Pele Seca';
        break;
      case 'D':
        skinType = 'Pele Mista';
        break;
      default:
        skinType = 'Tipo de Pele Indefinido';
    }

    Alert.alert(
      'Resultado',
      `Seu tipo de pele provável é: ${skinType}.`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LoginScreen');
          }
        }
      ]
    );
  };

  const renderQuestion = (item, index) => {
    const isSelected = (optionKey) => answers[index] === optionKey;

    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.question}</Text>
        {item.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[
              styles.optionButton,
              isSelected(option.key) && styles.optionButtonSelected
            ]}
            onPress={() => handleSelectOption(index, option.key)}
          >
            <Text style={[
              styles.optionText,
              isSelected(option.key) && styles.optionTextSelected
            ]}>
              <Text style={styles.optionLetter}>{option.key}) </Text>{option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
            <Text style={styles.headerTitle}>Avaliação da Pele</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {skinQuestions.map((item, index) => renderQuestion(item, index))}
            
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={calculateResult}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

// A definição do StyleSheet deve estar no final do arquivo, após o componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: '#8A2BE2', 
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
  },
  optionText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionLetter: {
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SkinQuizPage;