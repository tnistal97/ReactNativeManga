import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingComponent = () => {
  const spinValue = new Animated.Value(0);

  // Set up animation configuration
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Interpolate animation values for rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'dashed',
    borderTopColor: 'transparent',
    position: 'absolute',
  },
});

export default LoadingComponent;
