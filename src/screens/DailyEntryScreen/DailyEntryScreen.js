import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DailyEntryScreen = ({ navigation }) => {
  const [selectedTexture, setSelectedTexture] = useState(null);
  const [selectedExposure, setSelectedExposure] = useState(null);
  const [hasRedness, setHasRedness] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState([]);

  const textureOptions = [
    { label: 'áspera', color: '#FF0000' }, // Vermelho
    { label: 'seca', color: '#8A2BE2' },   // Roxo
    { label: 'oleosa', color: '#FFFF00' }, // Amarelo
    { label: 'e-carnosa', color: '#ADFF2F' }, // Verde Lima
  ];

  const exposureOptions = ['15-30 min', '2-3 horas', '+ 3 horas'];
  const feelingOptions = ['coceira', 'ardencia', 'dor'];

  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling((prev) =>
      prev.includes(feeling)
        ? prev.filter((item) => item !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    // ScrollView principal para a tela de registro
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false} // Deixa o scroll vertical invisível
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>✕</Text> {/* Ícone "X" para voltar */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hoje</Text>
        <Text style={styles.dateText}>23 Fev, 2025</Text>
        <TouchableOpacity style={styles.arrowButton}>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Qual a textura da sua pele? */}
      <View style={styles.section}>
        <Text style={styles.sectionQuestion}>Qual a textura da sua pele?</Text>
        <View style={styles.optionsContainer}>
          {textureOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.textureOption,
                { backgroundColor: option.color },
                selectedTexture === option.label && styles.selectedTextureOption,
              ]}
              onPress={() => setSelectedTexture(option.label)}
            >
              <Text style={styles.textureOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Exposição ao sol: */}
      <View style={styles.section}>
        <Text style={styles.sectionQuestion}>Exposição ao sol:</Text>
        <View style={styles.optionsContainer}>
          {exposureOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.exposureOption,
                selectedExposure === option && styles.selectedExposureOption,
              ]}
              onPress={() => setSelectedExposure(option)}
            >
              <Text style={styles.exposureOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sua pele apresenta vermelhidões? */}
      <View style={styles.section}>
        <Text style={styles.sectionQuestion}>Sua pele apresenta vermelhidões?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.yesNoOption,
              hasRedness === true && styles.selectedYesNoOption,
            ]}
            onPress={() => setHasRedness(true)}
          >
            <Text style={styles.yesNoText}>sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.yesNoOption,
              hasRedness === false && styles.selectedYesNoOption,
            ]}
            onPress={() => setHasRedness(false)}
          >
            <Text style={styles.yesNoText}>não</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Está sentindo: */}
      <View style={styles.section}>
        <Text style={styles.sectionQuestion}>Está sentindo:</Text>
        <View style={styles.optionsContainer}>
          {feelingOptions.map((feeling) => (
            <TouchableOpacity
              key={feeling}
              style={[
                styles.feelingOption,
                selectedFeeling.includes(feeling) && styles.selectedFeelingOption,
              ]}
              onPress={() => handleFeelingSelect(feeling)}
            >
              <Text style={styles.feelingOptionText}>{feeling}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botão Salvar (ou outro conteúdo para preencher e forçar scroll) */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Registro</Text>
      </TouchableOpacity>
      {/* Adicione mais conteúdo ou View de espaço para forçar a rolagem */}
      <View style={{ height: 50 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970', // Cor de fundo da tela de registro
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  contentContainer: {
    paddingBottom: 20, // Espaço no final para que o último item não fique colado na borda
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Para que o título ocupe o espaço e empurre a data/seta
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
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
    backgroundColor: '#333355', // Cor de fundo dos blocos
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionQuestion: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Para que as opções quebrem a linha se não couberem
    justifyContent: 'flex-start', // Alinha ao início
  },
  // Estilos para as opções de textura
  textureOption: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  textureOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedTextureOption: {
    borderWidth: 2,
    borderColor: '#fff', // Borda branca quando selecionado
  },
  // Estilos para as opções de exposição
  exposureOption: {
    backgroundColor: '#8A2BE2', // Roxo
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  exposureOptionText: {
    color: '#fff',
  },
  selectedExposureOption: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  // Estilos para as opções Sim/Não
  yesNoOption: {
    backgroundColor: '#8A2BE2', // Roxo
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  yesNoText: {
    color: '#fff',
  },
  selectedYesNoOption: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  // Estilos para as opções de "Está sentindo"
  feelingOption: {
    backgroundColor: '#8A2BE2', // Roxo
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  feelingOptionText: {
    color: '#fff',
  },
  selectedFeelingOption: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#1E90FF', // Azul vibrante
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20, // Espaçamento antes do botão
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DailyEntryScreen;