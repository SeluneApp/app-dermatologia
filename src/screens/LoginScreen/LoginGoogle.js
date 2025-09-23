import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


WebBrowser.maybeCompleteAuthSession();

export default function useLoginGoogle() {
  const navigation = useNavigation();
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: "346772546333-hv1ivrskqtf6o3gaotj0p3esd8qna4nj.apps.googleusercontent.com",
    androidClientId: "346772546333-hv1ivrskqtf6o3gaotj0p3esd8qna4nj.apps.googleusercontent.com",
  },
    { useProxy: true, projectNameForProxy: "@julio12312/Selune" }
  );
  useEffect(() => {
     console.log("Google Auth request:", request);
    if (response?.type === "success") {
    const token = response.params.id_token;
    AsyncStorage.setItem('userToken', token)
        .then(() => {
          navigation.replace('HomePageNoite');
        }) 
    .catch(err => console.error("Erro ao salvar token Google", err));
    }
  }, [response]);

  return { request, promptAsync };
}
