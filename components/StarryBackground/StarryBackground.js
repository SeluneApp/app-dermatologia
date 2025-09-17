import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Star = ({ top, left }) => {
  const opacity = React.useRef(new Animated.Value(Math.random())).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.star, { top, left, opacity }]} />;
};

const StarryBackground = () => {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    key: i,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {stars.map(({ top, left, key }) => (
        <Star key={key} top={top} left={left} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'white',
    opacity: 0.9,
  },
});

export default StarryBackground;