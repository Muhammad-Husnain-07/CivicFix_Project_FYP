import axios from 'axios';
import {Link, useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {storeData} from '@/hooks/useLocalStorage';
import Loader from '@/components/Loader';

const BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL;

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    cnic: '',
    password: '',
  });

  const handleLogin = async values => {
    const body = {
      data: {
        cnic: values.cnic,
        password: values.password,
      },
    };
    try {
      setLoader(true);
      await axios
        .post(BASE_URL + '/user/login', body, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
          const user = res.data.data;
          storeData('access_token', user.access_token);
          storeData('refresh_token', user.refresh_token);
          storeData('user_data', user);
          navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
          setLoader(false);
        });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <ThemedView style={styles.container}>
      <ThemedText type="title">CivicFix</ThemedText>
      <ThemedView style={styles.subContainer}>
        <ThemedText type="subtitle">Login</ThemedText>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="CNIC"
            style={styles.fieldStyling}
            onChangeText={text =>
              setCredentials(prevState => {
                return {...prevState, cnic: text};
              })
            }
          />
        </ThemedView>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="Password"
            style={styles.fieldStyling}
            onChangeText={text =>
              setCredentials(prevState => {
                return {...prevState, password: text};
              })
            }
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            type="outlined"
            title="Login"
            onPress={() => handleLogin(credentials)}
            style={styles.buttonStyling}
          />
        </ThemedView>
        <ThemedView style={styles.linkContainer}>
          <ThemedText type="default">
            Don't have an account?{' '}
            <ThemedText type="link">
              {' '}
              <Link href="/(auth)/register">Register</Link>{' '}
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
