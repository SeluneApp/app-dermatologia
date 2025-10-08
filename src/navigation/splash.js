import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
//import { useRouter } from "expo-router";

export default function Splash({navigation}) {
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch {
      }
    })();

    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch {
      }
      navigation.replace("Produtos"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/aberturaapp.json")}
        autoPlay
        loop={false}
        onAnimationFinish={async () => {
          await SplashScreen.hideAsync();
          navigation.replace("HomeScreen");
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
    backgroundColor: "#191970", 
  },
});
