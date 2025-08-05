import React from 'react';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScree';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageNoite from '../screens/HomePageNoite/HomePageNoite';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomePageNoite" component={HomePageNoite} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePageNoite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

