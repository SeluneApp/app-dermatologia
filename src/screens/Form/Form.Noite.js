import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Dados do questionário
const skinQuestions = [
  {
    question: '1. Logo que você acorda, antes de lavar o rosto, como sente a sua pele?',
    options: [
      { key: 'A', text: 'Brilhante e com sensação de oleosidade' },
      { key: 'B', text: 'Sem brilho excessivo, equilibrada' },
      { key: 'C', text: 'Levemente áspera ou repuxada' },
      { key: 'D', text: 'Brilho apenas na zona T (testa, nariz e queixo)' },
    ],
  },
  {
    question: '2. Ao longo do dia sua pele geralmente fica:',
    options: [
      { key: 'A', text: 'Muito oleosa e brilhante' },
      { key: 'B', text: 'Equilibrada, sem grandes alterações' },
      { key: 'C', text: 'Ressecada, podendo descamar' },
      { key: 'D', text: 'Oleosa na zona T e normal nas bochechas' },
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
      { key: 'B', text: 'Muito difícil, mas às vezes aparece' },
      { key: 'C', text: 'Nunca tenho espinhas e raramente tem cravos' },
      { key: 'D', text: 'Às vezes aparece cravo ou espinha na zona T (testa, nariz e queixo), nunca na bochecha' },
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
  const [resultDone, setResultDone] = useState(false);
  const [profileResult, setProfileResult] = useState(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false); // controla se mensagem de erro deve aparecer

  const handleSelectOption = (questionIndex, optionKey) => {
    setAnswers({ ...answers, [questionIndex]: optionKey });
    setError(false); // remove a mensagem de erro ao selecionar
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

    let skinType = '';
    switch (resultKey) {
      case 'A': skinType = 'Pele Oleosa'; break;
      case 'B': skinType = 'Pele Normal'; break;
      case 'C': skinType = 'Pele Seca'; break;
      case 'D': skinType = 'Pele Mista'; break;
      default: skinType = 'Tipo de Pele Indefinido';
    }

    setProfileResult(skinType);
    setResultDone(true);
    try {
      AsyncStorage.setItem('skinProfile', skinType);
    } catch (e) {
      console.warn('Não foi possível salvar o perfil:', e);
    }
  };

  const handleNext = () => {
    if (!answers[step]) {
      setError(true); // exibe mensagem de erro
      return;
    }
    if (step < skinQuestions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
    }
  };

  const currentQuestion = skinQuestions[step];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >

          {resultDone ? (
            <View style={styles.resultWrapper}>
              <Image
                source={require('../../../assets/images/Logo_Lua.png')}
                style={styles.mainIcon}
              />
              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Seu perfil foi realizado!</Text>

                <TouchableOpacity 
                  style={styles.finishButton}
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  <Text style={styles.finishButtonText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.quizContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = answers[step] === option.key;
                return (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected
                    ]}
                    onPress={() => handleSelectOption(step, option.key)}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected
                    ]}>
                      <Text style={styles.optionLetter}>{option.key}) </Text>
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {error && (
                <Text style={styles.errorText}>
                  Por favor selecione uma opção para continuar.
                </Text>
              )}

              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleNext}
              >
                <Text style={styles.confirmButtonText}>
                  {step === skinQuestions.length - 1 ? "Finalizar" : "Próxima"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>
                Pergunta {step + 1} de {skinQuestions.length}
              </Text>
            </View>
          )}

      </ImageBackground>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  quizContainer: { flex: 1, padding: 20, justifyContent: 'center' },
  questionText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  resultTitle: { 
  fontSize: 26, // Um pouco maior
  fontWeight: 'bold', 
  color: 'white', // Cor branca para o título (igual à tela anterior)
  marginBottom: 40, // Espaçamento maior antes do botão
  textAlign: 'center' 
},

finishButton: {
  backgroundColor: '#00FFFF', 
  width: '80%', 
  paddingVertical: 15, 
  borderRadius: 30, 
  alignItems: 'center',
  marginTop: 20, 
  
  shadowColor: '#00FFFF',
  shadowOpacity: 0.5,
  shadowRadius: 10,
  elevation: 5,
},

finishButtonText: { 
  fontSize: 18, 
  fontWeight: 'bold', 
  color: '#00001A', 
},
  optionButtonSelected: {
    borderColor: '#8A2BE2', 
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
  },
  optionText: { fontSize: 16, color: '#E0E0E0' },
  optionTextSelected: { color: '#fff', fontWeight: 'bold' },
  optionLetter: { fontWeight: 'bold', color: '#8A2BE2' },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  progressText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 14,
  },
  errorText: {
    color: '#FF6347',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    margin: 20,
    borderRadius: 15,
  },
  resultWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainIcon: { width: 120, height: 120, marginBottom: 20, resizeMode: 'contain' },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  resultText: { fontSize: 16, color: '#E0E0E0', textAlign: 'center' },
  resultHighlight: { fontSize: 22, fontWeight: 'bold', color: '#8A2BE2', marginTop: 10, textAlign: 'center' },
  finishButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  finishButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});

export default SkinQuizPage;
