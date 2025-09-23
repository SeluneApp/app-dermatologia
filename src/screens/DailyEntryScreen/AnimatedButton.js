import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated';

const AnimatedButton = ({onPress}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    opacity.value = 0;
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 2000 });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textBox, animatedOpacityStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.btn}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          <Animated.View style={[styles.btnInner, animatedStyle]}>
            <Text style={styles.btnText}>Salvar</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {},
  btn: {},
  btnInner: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AnimatedButton;