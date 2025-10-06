import React, { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          router.replace('/(intro)/Welcome');
        }
      } catch (error) {
        console.warn('Erro ao verificar primeiro acesso:', error);
      } finally {
        setLoading(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8C77EC" />
      </View>
    );
  }

  return <Slot />;
}
