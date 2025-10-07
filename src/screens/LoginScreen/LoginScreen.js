import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../../styles/globalStyles';
import useLoginGoogle from './LoginGoogle';

const TERMS_STORAGE_KEY = '@TermsAccepted';

const PrivacyTermsModal = ({ isVisible, onClose, onAccept }) => {
  const TERMS_TEXT = `===== POLÍTICA DE PRIVACIDADE =====

BEM-VINDO AO SELUNE

Última atualização: Outubro de 2025

O Selune é um aplicativo de caráter educativo e informativo voltado ao bem-estar e ao acompanhamento da saúde da pele. Esta Política de Privacidade descreve como coletamos, utilizamos e protegemos os dados pessoais dos usuários, em conformidade com a Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD).

O Selune tem como objetivo auxiliar os usuários a registrarem informações sobre seus hábitos e cuidados com a pele, promovendo autoconhecimento e educação sobre saúde dermatológica. O aplicativo não realiza diagnósticos médicos e não substitui a orientação de profissionais da saúde.

A aplicação pode coletar e tratar os seguintes dados pessoais, fornecidos voluntariamente pelo usuário: nome e/ou apelido; e-mail (quando utilizado para cadastro ou login); registros diários sobre a pele (como tipo de pele, sintomas, observações e fotos, se o usuário optar por enviá-las); e informações de uso do aplicativo (como tempo de uso e frequência de acesso). Essas informações são utilizadas exclusivamente para o funcionamento do aplicativo e para fins educacionais, respeitando os princípios da finalidade, necessidade e transparência previstos na LGPD.

O tratamento de dados pessoais pelo Selune ocorre com base nas seguintes hipóteses legais previstas na LGPD: consentimento do titular (art. 7º, inciso I); cumprimento de obrigação legal ou regulatória (art. 7º, inciso II); e interesse legítimo, quando aplicável. O consentimento é obtido de forma clara, destacada e pode ser revogado a qualquer momento pelo usuário.

Os dados coletados são utilizados para permitir o funcionamento correto do aplicativo e dos registros diários, personalizar a experiência do usuário, garantir segurança e integridade do sistema e melhorar as funcionalidades do aplicativo. O Selune não utiliza os dados para fins comerciais, publicitários ou de compartilhamento com terceiros.

O Selune não vende, aluga ou compartilha dados pessoais com terceiros, exceto quando houver exigência legal ou decisão judicial, quando necessário para proteger direitos, propriedade ou segurança do usuário ou de terceiros, ou para garantir o cumprimento desta Política e das leis aplicáveis. Quando necessário, o compartilhamento ocorrerá de forma segura e minimizada, respeitando os princípios da Lei Geral de Proteção de Dados Pessoais.

Os dados pessoais são armazenados em ambientes seguros, com medidas técnicas e administrativas adequadas para proteger contra acesso não autorizado, perda, alteração ou divulgação indevida. O Selune adota práticas de criptografia, autenticação e controle de acesso para proteger as informações. Os dados serão mantidos apenas pelo tempo necessário para atingir as finalidades descritas nesta política.

De acordo com a Lei, o usuário (titular dos dados) tem direito a confirmar a existência de tratamento de dados, acessar seus dados pessoais, corrigir dados incompletos, inexatos ou desatualizados, solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, revogar o consentimento a qualquer momento e solicitar a portabilidade dos dados para outro serviço, quando aplicável. Essas solicitações podem ser feitas a qualquer momento através do e-mail: seluneapp@gmail.com.

Os dados pessoais serão mantidos apenas pelo tempo necessário para o cumprimento das finalidades informadas nesta política ou conforme exigido por lei. Após esse período, os dados poderão ser excluídos, anonimizados ou arquivados com segurança.

Podemos atualizar esta Política de Privacidade sempre que necessário para refletir melhorias ou exigências legais. A data da última atualização estará sempre disponível nesta página. Recomendamos que o usuário revise periodicamente este documento.

Em caso de dúvidas, reclamações ou solicitações relacionadas à privacidade e proteção de dados, o titular pode entrar em contato com o Encarregado de Dados (DPO) do Selune: Pedro Henrique – Equipe Selune | E-mail: seluneapp@gmail.com.

O Selune reafirma seu compromisso com a transparência, privacidade e segurança das informações dos usuários. Este aplicativo tem caráter exclusivamente informativo e educativo, e não substitui o acompanhamento médico profissional.

Selune — Aplicativo educativo sobre cuidados com a pele. Desenvolvido como parte de um Trabalho de Conclusão de Curso pelos alunos da FITO (Fundação Instituto Tecnológico de Osasco), com foco em promover o bem-estar e o autoconhecimento.
`;

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>Termos de Privacidade e Uso</Text>
          <ScrollView style={modalStyles.scrollView}>
            <Text style={modalStyles.modalText}>{TERMS_TEXT}</Text>
          </ScrollView>
          <TouchableOpacity style={modalStyles.acceptButton} onPress={onAccept}>
            <Text style={modalStyles.textStyle}>Aceitar e Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.declineButton} onPress={onClose}>
            <Text style={modalStyles.declineText}>Sair do Aplicativo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const starOpacity = useRef(new Animated.Value(1)).current;
  const { request, promptAsync } = useLoginGoogle();

  useEffect(() => {
    async function checkTerms() {
      try {
        const accepted = await AsyncStorage.getItem(TERMS_STORAGE_KEY);
        if (accepted === 'true') setTermsAccepted(true);
        else {
          setTermsAccepted(false);
          setModalVisible(true);
        }
      } catch (e) {
        setTermsAccepted(false);
        setModalVisible(true);
      }
    }
    checkTerms();

    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity, { toValue: 0.3, duration: 2000, useNativeDriver: true }),
        Animated.timing(starOpacity, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleAcceptTerms = async () => {
    try {
      await AsyncStorage.setItem(TERMS_STORAGE_KEY, 'true');
      setTermsAccepted(true);
      setModalVisible(false);
    } catch (e) {
      console.warn('Erro ao salvar termos', e);
    }
  };

  const handleDeclineTerms = () => Alert.alert('Aviso', 'Você precisa aceitar os Termos para usar o aplicativo.');

  const handleLoginSuccess = async (token, id_usuario, email_usuario) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('id_usuario', id_usuario.toString());
      await AsyncStorage.setItem('email_usuario', email_usuario);
      navigation.replace('HomePageNoite');
    } catch (error) {
      console.error('Erro ao salvar token', error);
    }
  };

  const handleLogin = async () => {
    if (!termsAccepted) {
      setModalVisible(true);
      Alert.alert('Atenção', 'Você precisa aceitar os Termos de Privacidade para acessar.');
      return;
    }
    if (!email || !senha) return Alert.alert('Erro', 'Preencha todos os campos.');
    if (!email.endsWith('@gmail.com')) return Alert.alert('Erro', 'Use apenas um email @gmail.com');

    try {
      const response = await fetch('https://3a6f5c41385e.ngrok-free.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_usuario: email, senha }),
      });
      const data = await response.json();
      if (data.sucesso) {
        await handleLoginSuccess(data.token, data.usuario.id_usuario, data.usuario.email_usuario);
        Alert.alert('Sucesso', data.mensagem);
      } else Alert.alert('Erro', data.mensagem);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <PrivacyTermsModal isVisible={modalVisible} onClose={handleDeclineTerms} onAccept={handleAcceptTerms} />
      <Image source={require('../../../assets/images/StarryBackground.png')} style={styles.backgroundImage} />
      <Animated.View style={[styles.animatedStars, { opacity: starOpacity }]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          <Image source={require('../../../assets/images/Logo_Lua.png')} style={globalStyles.logo} resizeMode="contain" />

          <View style={globalStyles.content}>
            <Text style={globalStyles.entrada}>Entrar</Text>
          </View>

          <View style={globalStyles.content}>
            <View style={globalStyles.inputContainer}>
              <Image source={require('../../../assets/images/envelope.png')} style={globalStyles.icon} />
              <TextInput placeholder="Digite seu email" placeholderTextColor="#ccc" style={globalStyles.inputWithIcon} value={email} onChangeText={setEmail} autoCapitalize="none" editable={termsAccepted} />
            </View>

            <View style={globalStyles.inputContainer}>
              <Image source={require('../../../assets/images/cadeado.png')} style={globalStyles.icon} />
              <TextInput placeholder="Digite sua senha" placeholderTextColor="#ccc" secureTextEntry style={globalStyles.inputWithIcon} value={senha} onChangeText={setSenha} editable={termsAccepted} />
            </View>

            <Text style={globalStyles.atualizar} onPress={() => navigation.navigate('DelSenha')}>Esqueci minha senha</Text>

            <TouchableOpacity style={[globalStyles.button, !termsAccepted && globalStyles.buttonDisabled]} onPress={handleLogin} disabled={!termsAccepted}>
              <Text style={globalStyles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <Text style={globalStyles.text}>ou</Text>

            <TouchableOpacity style={[globalStyles.buttonGooble, !termsAccepted && globalStyles.buttonDisabled]} disabled={!request || !termsAccepted} onPress={() => promptAsync()}>
              <View style={globalStyles.googleContent}>
                <Image source={require('../../../assets/images/Google.png')} style={globalStyles.googleIcon} />
                <Text style={globalStyles.TextGoole}>Acessar com o Google</Text>
              </View>
            </TouchableOpacity>

            {termsAccepted && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.viewTermsText}>Revisar Termos de Privacidade</Text>
              </TouchableOpacity>
            )}

            <View style={globalStyles.registerPrompt}>
              <Text style={globalStyles.label}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('cadastrar')}>
                <Text style={globalStyles.atualizar}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#191970' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  animatedStars: { ...StyleSheet.absoluteFillObject, backgroundColor: 'transparent' },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerContainer: {
    alignItems: 'center', 
    position: 'absolute', 
    top: 50, 
    width: '100%',
  },
  contentWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, width: '100%', paddingBottom: '5%' },
  viewTermsText: { color: '#00FFFF', textAlign: 'center', marginTop: 15, fontSize: 14, textDecorationLine: 'underline' },
});

const modalStyles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { backgroundColor: '#fff', borderRadius: 10, padding: 20, width: '90%', maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  scrollView: { marginBottom: 10 },
  modalText: { fontSize: 14, color: '#333' },
  acceptButton: { backgroundColor: '#8A2BE2', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  textStyle: { color: '#fff', fontWeight: 'bold' },
  declineButton: { backgroundColor: '#ccc', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  declineText: { color: '#333' },
});