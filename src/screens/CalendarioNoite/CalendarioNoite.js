import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarioNoite({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');

  const goToRegistro = () => {
    navigation.navigate('RegistroNoite');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário de Registros</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              selectedColor: '#8A2BE2',
              selectedTextColor: '#ffffff',
            },
          }),
          '2025-08-07': { marked: true, dotColor: 'gold' },
        }}
        style={styles.calendar}
        theme={{
          calendarBackground: '#191970',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          arrowColor: '#fff',
          todayTextColor: '#ADFF2F',
          selectedDayBackgroundColor: '#8A2BE2',
          selectedDayTextColor: '#ffffff',
          textDisabledColor: '#555',
        }}
      />
      <TouchableOpacity style={styles.plusButton} onPress={goToRegistro}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  plusButton: {
    backgroundColor: '#1E90FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  plusText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
