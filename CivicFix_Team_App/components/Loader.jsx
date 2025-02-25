import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Assuming you're using a theme hook

const Loader = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Theme Colors
  const spinnerColor = useThemeColor({ light: '#007bff', dark: '#00d4ff' }, 'primary');
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1e1e1e' }, 'background');
  const pulseColor = useThemeColor({ light: '#e0f7fa', dark: '#006064' }, 'accent');

  // Rotate Animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  // Fade-In Animation
  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeValue]);

  // Pulsing Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 2.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleValue]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeValue, backgroundColor }]}>
      {/* Rotating Outer Circle */}
      <Animated.View
        style={[
          styles.outerCircle,
          { transform: [{ rotate: rotateInterpolation }] },
        ]}
      >
        <View
          style={[
            styles.circle,
            { borderColor: spinnerColor, borderTopColor: 'transparent' },
          ]}
        />
      </Animated.View>

      {/* Pulsing Inner Circle */}
      <Animated.View
        style={[
          styles.innerCircle,
          { backgroundColor: pulseColor, transform: [{ scale: scaleValue }] },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
  },
  innerCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Loader;

