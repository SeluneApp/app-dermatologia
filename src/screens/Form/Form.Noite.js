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


// Perguntas 1 a 10: Tipo de Pele
// Perguntas 11 a 15: Fototipo de Fitzpatrick
// Pergunta 16: Diagnóstico de Pele 


// A = Oleosa, B = Normal, C = Seca, D = Mista
const TIPO_PELE_PONTOS = {
    'A': 1, 
    'B': 2, 
    'C': 3, 
    'D': 4, 
};

const skinquestaos = [
    {
      questao: '1. Logo que você acorda, antes de lavar o rosto, como sente a sua pele?',
      opcao: [
        { key: 'A', text: 'Brilhante e com sensação de oleosidade', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Sem brilho excessivo, equilibrada', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Levemente áspera ou repuxada', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Brilho apenas na zona T (testa, nariz e queixo)', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '2. Ao longo do dia sua pele geralmente fica:',
      opcao: [
        { key: 'A', text: 'Muito oleosa e brilhante', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Equilibrada, sem grandes alterações', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Ressecada, podendo descamar', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Oleosa na zona T e normal nas bochechas', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '3. Após lavar o rosto com sabonete neutro, como a pele reage?',
      opcao: [
        { key: 'A', text: 'Pouco tempo depois já volta a brilhar', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Permanece confortável, sem incômodo', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Fica repuxada e áspera', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Algumas áreas ficam oleosas e outras ressecadas', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '4. Com que frequência você sente necessidade de reaplicar hidratante facial?',
      opcao: [
        { key: 'A', text: 'Quase nunca, sinto a pele já hidratada naturalmente', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Apenas uma vez ao dia é suficiente', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Várias vezes ao dia, sinto ressecamento constante', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Somente em algumas regiões (ex.: bochechas)', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '5. Você sente que tem espinhas e cravos?',
      opcao: [
        { key: 'A', text: 'Sim, sempre tenho espinhas ou cravos no rosto', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Muito difícil, mas às vezes aparece', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Nunca tenho espinhas e raramente tem cravos', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Às vezes aparece cravo ou espinha na zona T (testa, nariz e queixo), nunca na bochecha', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '6. Qual a sensação mais frequente em sua pele durante o dia?',
      opcao: [
        { key: 'A', text: 'Pegajosa ou oleosa', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Confortável e equilibrada', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Repuxada, sensível e áspera', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Variável entre oleosa em algumas partes e seca em outras', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '7. Ao observar sua pele de perto no espelho, o que percebe?',
      opcao: [
        { key: 'A', text: 'Poros dilatados e visíveis em quase todo o rosto', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Poros discretos e regulares', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Pele opaca, sem brilho, poros pouco visíveis', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Poros visíveis apenas na zona T, bochechas normais', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '8. Sua pele costuma apresentar:',
      opcao: [
        { key: 'A', text: 'Cravos e espinhas com frequência e algumas vezes ficam inflamadas', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Raramente cravos ou espinhas', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Descamação e vermelhidão', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Cravos na zona T e ressecamento nas bochechas', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '9. Em dias frios ou secos, como sua pele reage?',
      opcao: [
        { key: 'A', text: 'Continua oleosa', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Permanece equilibrada', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Fica ainda mais seca e desconfortável', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Algumas áreas ficam secas, outras permanecem oleosas', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },
    {
      questao: '10. Como você classificaria a sensação geral da sua pele?',
      opcao: [
        { key: 'A', text: 'Sempre oleosa', typePoint: TIPO_PELE_PONTOS.A },
        { key: 'B', text: 'Normal, equilibrada', typePoint: TIPO_PELE_PONTOS.B },
        { key: 'C', text: 'Ressecada e sensível', typePoint: TIPO_PELE_PONTOS.C },
        { key: 'D', text: 'Mista: oleosa na zona T, normal ou seca nas bochechas', typePoint: TIPO_PELE_PONTOS.D },
      ],
    },

    {
        questao: '11. Qual é a cor natural da sua pele (sem exposição solar)?', 
        opcao: [
          { key: 'A', text: 'Muito clara, branca como leite', points: 0 }, 
          { key: 'B', text: 'Clara', points: 1 }, 
          { key: 'C', text: 'Morena clara (bege)', points: 2 }, 
          { key: 'D', text: 'Morena média', points: 3 }, 
          { key: 'E', text: 'Morena escura', points: 4 }, 
          { key: 'F', text: 'Negra', points: 5 }, 
        ],
    },
    {
        questao: '12. O que acontece com a sua pele quando você se expõe ao sol pela primeira vez, sem protetor solar, por cerca de 30 minutos?', 
        opcao: [
          { key: 'A', text: 'Sempre queima, nunca bronzeia', points: 0 }, 
          { key: 'B', text: 'Queima facilmente, bronzeia muito pouco', points: 1 }, 
          { key: 'C', text: 'Queima moderadamente, bronzeia gradualmente', points: 2 }, 
          { key: 'D', text: 'Raramente queima, sempre bronzeia bem', points: 3 }, 
          { key: 'E', text: 'Nunca queima, sempre bronzeia', points: 4 }, 
          { key: 'F', text: 'Nunca queima, a pele é naturalmente escura', points: 5 }, 
        ],
    },
    {
        questao: '13. Qual é a cor dos seus olhos?', 
        opcao: [
          { key: 'A', text: 'Azul ou cinza claro', points: 0 }, 
          { key: 'B', text: 'Verde ou castanho-claro', points: 1 }, 
          { key: 'C', text: 'Castanho médio', points: 2 }, 
          { key: 'D', text: 'Castanho-escuro', points: 3 }, 
          { key: 'E', text: 'Preto', points: 4 }, 
        ],
    },
    {
        questao: '14. Qual é a cor natural do seu cabelo?', 
        opcao: [
          { key: 'A', text: 'Loiro claro ou ruivo', points: 0 }, 
          { key: 'B', text: 'Loiro escuro ou castanho-claro', points: 1 }, 
          { key: 'C', text: 'Castanho médio', points: 2 }, 
          { key: 'D', text: 'Castanho-escuro', points: 3 }, 
          { key: 'E', text: 'Preto', points: 4 }, 
        ],
    },
    {
        questao: '15. Você se bronzeia com facilidade?', 
        opcao: [
          { key: 'A', text: 'Nunca, apenas queimo', points: 0 }, 
          { key: 'B', text: 'Pouco', points: 1 }, 
          { key: 'C', text: 'Às vezes, levemente', points: 2 }, 
          { key: 'D', text: 'Sim, com facilidade', points: 3 }, 
          { key: 'E', text: 'Sempre fico bem bronzeado(a)', points: 4 }, 
          { key: 'F', text: 'Sou naturalmente bronzeado(a)', points: 5 }, 
        ],
    },
    
    {
        questao: '16. Qual doença de pele facial diagnosticada você possui?', 
        opcao: [
          { key: 'A', text: 'Acne' }, 
          { key: 'B', text: 'Rosácea' }, 
          { key: 'C', text: 'Melasma' }, 
          { key: 'D', text: 'Dermatite Atópica' }, 
          { key: 'E', text: 'Dermatite de Contato' }, 
          { key: 'F', text: 'Dermatite Seborreica' }, 
          { key: 'G', text: 'Vitiligo' }, 
          { key: 'H', text: 'Micoses' }, 
          { key: 'I', text: 'Psoríase' }, 
          { key: 'J', text: 'Não possuo diagnóstico' }, 
        ],
    },
];


const SkinQuizPage = ({ navigation }) => {
  const [perguntas, setperguntas] = useState({});
  const [resultDone, setResultDone] = useState(false);
  const [step, setStep] = useState(0);
  const [erro, setErro] = useState(false); 

  const totalquestaos = skinquestaos.length; 

  const handleSelectOption = (questaoIndex, optionKey) => {
    setperguntas({ ...perguntas, [questaoIndex]: optionKey });
    setErro(false); 
  };

  const calculateResult = () => {
    let totalPhototypeScore = 0;
    let totalSkinTypeScore = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
    
    // --- 1. CÁLCULO DO TIPO DE PELE (Perguntas 1 a 10) ---
    const skinTypequestaos = skinquestaos.slice(0, 10); 
    
    skinTypequestaos.forEach((questaoData, questaoIndex) => {
        const selectedKey = perguntas[questaoIndex]; 
        
        if (totalSkinTypeScore.hasOwnProperty(selectedKey)) {
             totalSkinTypeScore[selectedKey]++;
        }
    });

    let maxCount = -1;
    let skinTypeKey = '';
    for (const key in totalSkinTypeScore) {
        if (totalSkinTypeScore[key] > maxCount) {
            maxCount = totalSkinTypeScore[key];
            skinTypeKey = key;
        }
    }

    let tipoPele = 'Tipo de Pele Indefinido';
    switch (skinTypeKey) {
        case 'A': tipoPele = 'Pele Oleosa'; break;
        case 'B': tipoPele = 'Pele Normal'; break;
        case 'C': tipoPele = 'Pele Seca'; break;
        case 'D': tipoPele = 'Pele Mista'; break;
    }


    //  2. CÁLCULO DO FOTOTIPO (Perguntas 11 a 15) 
    const phototypequestaos = skinquestaos.slice(10, 15); 
    
    phototypequestaos.forEach((questaoData, relativeIndex) => {
      const questaoIndex = 10 + relativeIndex; 
      const selectedKey = perguntas[questaoIndex]; 
      
      const selectedOption = questaoData.opcao.find(opt => opt.key === selectedKey);

      if (selectedOption && selectedOption.points !== undefined) {
        totalPhototypeScore += selectedOption.points;
      }
    });

    let phototype = '';
    if (totalPhototypeScore >= 0 && totalPhototypeScore <= 6) { phototype = 'Fototipo I'; } 
    else if (totalPhototypeScore >= 7 && totalPhototypeScore <= 12) { phototype = 'Fototipo II'; } 
    else if (totalPhototypeScore >= 13 && totalPhototypeScore <= 18) { phototype = 'Fototipo III'; } 
    else if (totalPhototypeScore >= 19 && totalPhototypeScore <= 24) { phototype = 'Fototipo IV'; } 
    else if (totalPhototypeScore >= 25 && totalPhototypeScore <= 30) { phototype = 'Fototipo V'; } 
    else if (totalPhototypeScore >= 31 && totalPhototypeScore <= 35) { phototype = 'Fototipo VI'; } 
    else { phototype = 'Fototipo Indefinido'; }
    
    //  3. VARIÁVEL DA PERGUNTA 16 (DIAGNÓSTICO) 
    const diagnosisquestaoIndex = 15; // A última pergunta (índice 15)
    const diagnosisKey = perguntas[diagnosisquestaoIndex];
    const diagnosisOption = skinquestaos[diagnosisquestaoIndex].opcao.find(opt => opt.key === diagnosisKey);
    const diagnosisText = diagnosisOption ? diagnosisOption.text : 'Não Informado';

    //  4. SALVA OS RESULTADOS (Tipo de Pele como resultado principal) 
    setResultDone(true);
    try {
      AsyncStorage.setItem('skinProfile', tipoPele); 
      AsyncStorage.setItem('skinProfile_Type', tipoPele);
      AsyncStorage.setItem('skinProfile_Phototype', phototype);
      AsyncStorage.setItem('skinProfile_PhototypeScore', String(totalPhototypeScore));
      AsyncStorage.setItem('skinProfile_Diagnosis', diagnosisText); 

    } catch (e) {
      console.warn('Não foi possível salvar o perfil:', e);
    }
  };

  const handleNext = () => {
    if (!perguntas[step]) {
      setErro(true); 
      return;
    }
    if (step < totalquestaos - 1) {
      setStep(step + 1);
    } 
    else {
      calculateResult();
    }
  };

  const currentquestao = skinquestaos[step];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/StarryBackground.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >

          {resultDone ? (
            <View style={styles.congratsWrapper}>
              <Text style={styles.congratsTitle}>Parabéns</Text>
              <Text style={styles.congratsText}>O seu perfil foi realizado com sucesso</Text>

              <TouchableOpacity 
                style={[styles.finishButton, { marginTop: 30, width: '60%' }]}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={styles.finishButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.quizContainer}>
              <Text style={styles.questaoText}>{currentquestao.questao}</Text> 
              {currentquestao.opcao.map((option, optionIndex) => {
                const isSelected = perguntas[step] === option.key;
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

              {erro && (
                <Text style={styles.errorText}>
                  Por favor selecione uma opção para continuar.
                </Text>
              )}

              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleNext}
              >
                <Text style={styles.confirmButtonText}>
                  {step === totalquestaos - 1 ? "Finalizar" : "Próxima"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>
                Pergunta {step + 1} de {totalquestaos}
              </Text>
            </View>
          )}

      </ImageBackground>
    </View>
  );
};

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
  questaoText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
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
    fontSize: 26, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 40, 
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
  resultHighlight: { fontSize: 22, fontWeight: 'bold', color: '#00FFFF', marginTop: 10, marginBottom: 30, textAlign: 'center' }, 
finishButton: {
  backgroundColor:'#8f61fab7', 
  borderRadius: 20,
  alignItems: 'center',
  marginTop: 20,
  borderWidth: 4,               
      
},
  finishButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  congratsWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  congratsTitle: { fontSize: 42, color: '#fff', fontWeight: '800', marginBottom: 10 },
  congratsText: { fontSize: 20, color: '#E0E0E0', textAlign: 'center', lineHeight: 28 },
});

export default SkinQuizPage;