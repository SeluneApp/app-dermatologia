import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();
await SplashScreen.hideAsync();


export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    // Esconde o splash depois de 3s (ou quando a animação termina)
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      router.replace("/Produtos"); // troca pelo nome da sua tela inicial
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/aberturaapp.json")}
        autoPlay
        loop={false}
        onAnimationFinish={async () => {
          await SplashScreen.hideAsync();
          router.replace("/home");
        }}
        style={{ width: 250, height: 250 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191970", // fundo igual ao do app.json
  },
});
