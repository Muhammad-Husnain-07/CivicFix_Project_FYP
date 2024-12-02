import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {Link, useNavigation} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';

export default LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{display: 'flex', flexDirection: 'row'}}>
        <ThemedText type="title">CivicFix</ThemedText>
        <ThemedText type="smallItalic">Team</ThemedText>
      </ThemedView>
      <ThemedView style={styles.subContainer}>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField placeholder="User Name" style={styles.fieldStyling} />
        </ThemedView>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField placeholder="Password" style={styles.fieldStyling} />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            type="outlined"
            title="Login"
            onPress={() => {
              navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
            }}
            style={styles.buttonStyling}
          />
        </ThemedView>
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
  fieldContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: 5,
  },
  fieldStyling: {
    width: '100%',
    minWidth: 300,
    maxWidth: 400,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonStyling: {
    width: 150,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
