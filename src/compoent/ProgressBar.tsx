import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { color } from '../constant';

const CustomProgressBar = ({ progress }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: color.buttonColor,
  },
});

export default CustomProgressBar;
