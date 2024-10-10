import {ThemedText} from '@/components/ThemedText';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import React from 'react';
import {StyleSheet} from 'react-native';

export default LoginScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">CivicFix</ThemedText>
      <ThemedView style={styles.subContainer}>
        <ThemedTextField placeholder="Email" />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
