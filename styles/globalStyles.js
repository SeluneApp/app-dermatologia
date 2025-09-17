import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = width > 600;

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112864',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isLargeScreen ? 100 : 20,
  },
  logo: {
    position: 'absolute',
    top: isWeb ? 20 : 40,
    width: isLargeScreen ? 150 : 100,
    height: isLargeScreen ? 150 : 100,
  },
  content: {
    width: isLargeScreen ? '60%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  title: {
    fontSize: isLargeScreen ? 34 : 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: isLargeScreen ? 14 : 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#9A8C98',
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: isLargeScreen ? 18 : 16,
  },
  link: {
    color: '#ffffff',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: isLargeScreen ? 16 : 14,
  },
  título: {
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: 'bold',
    color: '#ffffff',
    position: 'absolute',
    top: isWeb ? -60 : -100,
  },
  entrada: {
    fontSize: isLargeScreen ? 28 : 25,
    color: '#ffffff',
    fontWeight: 'bold',
    position: isWeb ? 'relative' : 'absolute',
    top: isWeb ? 0 : 70,
    left: isWeb ? 0 : 9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9A8C98',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: isLargeScreen ? 28 : 20,
    height: isLargeScreen ? 28 : 20,
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: isLargeScreen ? 18 : 16,
    color: '#000',
    paddingVertical: isLargeScreen ? 12 : 10,
  },
  atualizar: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    fontSize: isLargeScreen ? 16 : 14,
  },
  button: {
    backgroundColor: '#01024b',
    paddingVertical: isLargeScreen ? 16 : 14,
    paddingHorizontal: isLargeScreen ? 80 : 60,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonGooble: {
    backgroundColor: 'white',
    paddingVertical: isLargeScreen ? 16 : 14,
    paddingHorizontal: isLargeScreen ? 80 : 60,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 10,
    fontSize: isLargeScreen ? 16 : 14,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: isLargeScreen ? 36 : 32,
    height: isLargeScreen ? 36 : 32,
    marginRight: 10,
  },
  TextGoole: {
    color: 'black',
    fontSize: isLargeScreen ? 18 : 16,
  },
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default globalStyles;