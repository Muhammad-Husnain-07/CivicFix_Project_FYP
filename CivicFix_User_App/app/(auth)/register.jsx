import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {Link, useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

export default RegisterScreen = () => {
  const navigation = useNavigation();
  const [cnic, setCnic] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">CivicFix</ThemedText>
      <ThemedView style={styles.subContainer}>
        <ThemedText type="subtitle">Register</ThemedText>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="CNIC"
            style={styles.fieldStyling}
            onChangeText={text => setCnic(text)}
            value={cnic}
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            type="outlined"
            title="Register"
            onPress={() =>
              navigation.navigate('(auth)', {
                screen: 'user_info',
                params: {
                  cnic: cnic,
                },
              })
            }
            style={styles.buttonStyling}
          />
        </ThemedView>
        <ThemedView style={styles.linkContainer}>
          <ThemedText type="default">
            Already have an account?{' '}
            <ThemedText type="link">
              {' '}
              <Link href="/(auth)/login">Login</Link>{' '}
            </ThemedText>
          </ThemedText>
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
  linkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
