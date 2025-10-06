import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

// Ícone simples de voltar e avançar para o cabeçalho
const ArrowIcon = ({ direction }) => <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{direction === 'left' ? '<' : '>'}</Text>;

moment.locale('pt-br');
export default function RegistroNoite({ navigation }) {
  const [textura, setTextura] = useState(''); // Estado para o input (usado no original)
  const [texturaSelecionada, setTexturaSelecionada] = useState('');
  const [exposicao, setExposicao] = useState('');
  const [vermelhidao, setVermelhidao] = useState(null);
  const [sensacoes, setSensacoes] = useState([]);

  const toggleSensacao = (s) => {
    setSensacoes((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };
  
  const texturas = [
    { label: 'áspera', color: '#fff' },
    { label: 'seca', color: '#ff0000' },
    { label: 'oleosa', color: '#5D006D' },
    { label: 'escamosa', color: '#FFB800' },
  ];

  return (
    <View style={styles.backgroundWrapper}> 
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* BLOCO: DATA/NAVEGAÇÃO (HEADER) */}
        <View style={[styles.contentBlock, styles.headerBlock]}>
          <TouchableOpacity style={styles.arrowButton}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}> 
            <Text style={styles.dateTitle}>Hoje</Text>
            <Text style={styles.dateSubtitle}>{moment().format('D MMM YYYY')}</Text>
          </View>
          <TouchableOpacity style={styles.arrowButton}>
            <ArrowIcon direction="right" />
          </TouchableOpacity>
        </View>

        {/* BLOCO 1: TEXTURA DA PELE (CÍRCULOS) */}
        <View style={styles.contentBlock}>
          <Text style={styles.label}>Qual a textura da sua pele?</Text>
          <View style={styles.circleRow}>
            {texturas.map((t) => (
              <TouchableOpacity
                key={t.label}
                onPress={() => setTexturaSelecionada(t.label)}
                style={[
                  styles.circleOption, 
                  { backgroundColor: t.color },
                  texturaSelecionada === t.label && styles.selectedCircle
                ]}
              />
            ))}
          </View>
          <Text style={styles.textureLabel}>{texturaSelecionada || 'Selecione a opção'}</Text>
        </View>

        {/* BLOCO 2: EXPOSIÇÃO AO SOL */}
        <View style={styles.contentBlock}>
          <Text style={styles.label}>Exposição ao sol :</Text>
          <View style={styles.row}>
            {['15-30 min', '1-2 horas', '2-3 horas', '+ 3 horas'].map((tempo) => (
              <TouchableOpacity
                key={tempo}
                style={[
                  styles.smallOption, 
                  exposicao === tempo && styles.selectedSmallOption
                ]}
                onPress={() => setExposicao(tempo)}
              >
                <Text style={styles.smallOptionText}>{tempo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BLOCO 3: VERMELHIDÕES */}
        <View style={styles.contentBlock}>
          <Text style={styles.label}>Sua pele apresenta vermelhidões?</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.smallOption, 
                vermelhidao === true && styles.selectedSmallOption
              ]}
              onPress={() => setVermelhidao(true)}
            >
              <Text style={styles.smallOptionText}>sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallOption, 
                vermelhidao === false && styles.selectedSmallOption
              ]}
              onPress={() => setVermelhidao(false)}
            >
              <Text style={styles.smallOptionText}>não</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BLOCO 4: SENSAÇÕES */}
        <View style={styles.contentBlock}>
          <Text style={styles.label}>Está sentindo:</Text>
          <View style={styles.row}>
            {['coceira', 'ardência', 'dor'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.smallOption, 
                  sensacoes.includes(s) && styles.selectedSmallOption
                ]}
                onPress={() => toggleSensacao(s)}
              >
                <Text style={styles.smallOptionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BLOCO 5: PRODUTO/MEDICAMENTO (INPUT) */}
        <View style={styles.contentBlock}>
          <Text style={styles.label}>Fez uso de qual produto/medicamento?</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Digite aqui o nome e marca do produto"
            placeholderTextColor="#8A2BE2" // Cor do placeholder
            value={textura}
            onChangeText={setTextura}
          />
        </View>

        {/* BLOCO 6: REGISTRO DE MANCHAS (ÁREA DE FOTO) */}
        <View style={[styles.contentBlock, styles.largePhotoBlock]}>
          <Text style={styles.label}>Adicione um registro das suas manchas</Text>
          <View style={styles.photoArea}>
            <Text style={styles.photoAreaText}>Foto</Text>
          </View>
        </View>
        
        {/* BOTÃO FLUTUANTE DE SALVAR (AZUL CLARO) */}
        <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- BACKGROUND E CONTAINER ---
  backgroundWrapper: {
    flex: 1,
    backgroundColor: '#00001A', // Fundo escuro para simular a imagem noturna (como a tela anterior)
  },
  container: {
    flexGrow: 1,
    // Cor de fundo principal do protótipo (lilás suave)
    backgroundColor: '#C7BFE6', 
    borderBottomLeftRadius: 30, // Curva suave na parte de baixo
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Importante para o borderRadius
    paddingTop: 50, // Espaço no topo
    paddingBottom: 100, // Espaço extra para o botão flutuante
    alignItems: 'center',
  },
  
  // --- BLOCOS DE CONTEÚDO GERAL ---
  contentBlock: {
    width: '90%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor de fundo dos cartões (branco transparente)
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  label: {
    color: '#5D006D', // Roxo escuro para o texto principal
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    marginTop: 5,
  },

  // --- 1. HEADER (DATA) ---
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent', // O header no protótipo é transparente
    paddingHorizontal: 0,
  },
  arrowButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  dateSubtitle: {
    fontSize: 16,
    color: 'white',
  },

  // --- 2. TEXTURA (CÍRCULOS) ---
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  circleOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedCircle: {
    borderColor: '#fff', // Borda branca quando selecionado
  },
  textureLabel: {
    textAlign: 'center',
    color: '#5D006D',
    fontWeight: 'bold',
    marginTop: 5,
  },

  // --- 3/4. OPÇÕES PEQUENAS (BOTÕES) ---
  smallOption: {
    backgroundColor: '#AD85E0', // Roxo claro dos botões
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 8,
  },
  selectedSmallOption: {
    backgroundColor: '#8A2BE2', // Roxo mais escuro (selecionado)
  },
  smallOptionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'lowercase',
  },

  // --- 5. INPUT DE PRODUTO ---
  textInputStyle: {
    backgroundColor: '#F5E6FF', // Rosa claro do input
    borderRadius: 10,
    padding: 10,
    color: '#5D006D',
    borderWidth: 1,
    borderColor: '#AD85E0',
  },

  // --- 6. ÁREA DE FOTO ---
  largePhotoBlock: {
    paddingBottom: 30, 
  },
  photoArea: {
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  photoAreaText: {
    color: '#5D006D',
    fontWeight: 'bold',
    fontSize: 16,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00FFFF', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, 
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});