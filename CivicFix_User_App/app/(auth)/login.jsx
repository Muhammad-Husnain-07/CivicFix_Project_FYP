import {Feather} from '@expo/vector-icons';
import axios from 'axios';
import {Link, useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
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
    cnic: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async values => {
    if (!values.cnic || !values.password) {
      ToastAndroid.show('Please enter CNIC and Password', ToastAndroid.LONG);
      return;
    }

    const cnicRegex = /^[0-9]{13}$/;
    if (!cnicRegex.test(values.cnic)) {
      ToastAndroid.show('CNIC must be a 13 digit number', ToastAndroid.LONG);
      return;
    }
    const body = {
      data: {
        cnic: values.cnic,
        password: values.password,
      },
    };
    try {
      setLoader(true);
      const res = await axios
        .post(BASE_URL + '/user/login', body, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
          const user = res.data.data;
          storeData('access_token', user.access_token);
          storeData('refresh_token', user.refresh_token);
          storeData('user_data', user);
          navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
          setCredentials({cnic: '', password: ''});
          setLoader(false);
          ToastAndroid.show('Login successful', ToastAndroid.LONG);
        });
    } catch (err) {
      setLoader(false);
      ToastAndroid.show(err?.response?.data?.message?.description || 'Something went wrong. Please try again.', ToastAndroid.LONG);
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
            placeholder="CNIC (Without dashes)"
            style={styles.fieldStyling}
            onChangeText={text =>
              setCredentials(prevState => {
                return {...prevState, cnic: text};
              })
            }
            value={credentials.cnic}
            keyboardType="numeric"
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
            secureTextEntry={!showPassword}
            value={credentials.password}
            keyboardType="default"
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
            onPress={() =>{handleLogin(credentials)}}
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
    marginTop: 10,
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

