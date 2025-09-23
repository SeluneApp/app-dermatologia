import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function RegistroNoite({ navigation }) {
  const [textura, setTextura] = useState('');
  const [vermelhidao, setVermelhidao] = useState(null);
  const [sensacoes, setSensacoes] = useState([]);

  const toggleSensacao = (s) => {
    setSensacoes((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registre sua pele</Text>

      <Text style={styles.label}>Qual a textura da sua pele?</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: seca, oleosa, áspera..."
        placeholderTextColor="#aaa"
        value={textura}
        onChangeText={setTextura}
      />

      <Text style={styles.label}>Sua pele apresenta vermelhidões?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, vermelhidao === true && styles.selected]}
          onPress={() => setVermelhidao(true)}
        >
          <Text style={styles.optionText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, vermelhidao === false && styles.selected]}
          onPress={() => setVermelhidao(false)}
        >
          <Text style={styles.optionText}>Não</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Está sentindo:</Text>
      <View style={styles.row}>
        {['coceira', 'ardência', 'dor'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.option, sensacoes.includes(s) && styles.selected]}
            onPress={() => toggleSensacao(s)}
          >
            <Text style={styles.optionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#191970',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#8A2BE2',
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
