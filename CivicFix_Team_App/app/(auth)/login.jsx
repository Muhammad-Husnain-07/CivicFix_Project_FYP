import {Feather} from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet, ToastAndroid,  TouchableOpacity} from 'react-native';
import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {storeData} from '@/hooks/useLocalStorage';
import Loader from '@/components/Loader';
import {URL} from '@/utils/baseURL';

const BASE_URL = URL;

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async values => {
    if (!values.email || !values.password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    const isValidEmail = email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(values.email)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT);
      return;
    }

    const body = {
      data: {
        email: values.email,
        password: values.password,
      },
    };
    try {
      setLoader(true);
      await axios
        .post(BASE_URL + '/team/login', body, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
          const user = res.data.data;
          storeData('access_token', user.access_token);
          storeData('refresh_token', user.refresh_token);
          storeData('user_data', user);
          navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
          ToastAndroid.show('Login successful', ToastAndroid.SHORT);
          setLoader(false);
        });
    } catch (err) {
      setLoader(false);
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
      console.log(err);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <ThemedView style={styles.container}>
      <ThemedView style={{display: 'flex', flexDirection: 'row'}}>
        <ThemedText type="title">CivicFix</ThemedText>
        <ThemedText type="smallItalic">Team</ThemedText>
      </ThemedView>
      <ThemedView style={styles.subContainer}>
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="Email"
            style={styles.fieldStyling}
            onChangeText={text =>
              setCredentials(prevState => {
                return {...prevState, email: text};
              })
            }
          />
        </ThemedView>
        <ThemedView style={[styles.fieldContainer, {alignItems: 'center'}]}>
          <ThemedTextField
            placeholder="Password"
            style={styles.fieldStyling}
            secureTextEntry={!showPassword}
            onChangeText={text =>
              setCredentials(prevState => {
                return {...prevState, password: text};
              })
            }
          />
        </ThemedView>
        <ThemedView style={{display: 'flex'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 5, marginRight: '50%'}}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Feather
              name={showPassword ? 'check-square' : 'square'}
              size={24}
              color={showPassword ? 'green' : 'white'}
            />
            <ThemedText style={{textAlign: 'left'}}>
              {showPassword ? 'Hide' : 'Show'} Password
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            type="outlined"
            title="Login"
            onPress={() => handleLogin(credentials)}
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
    marginTop: 10,
  },
  fieldStyling: {
    width: '100%',
    minWidth: 300,
    maxWidth: 400,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  buttonStyling: {
    width: 150,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showPasswordText: {
    marginTop: 5,
    color: '#1E90FF',
  },
});
