import React, {useState} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {ThemedButton} from '@/components/ThemedButton';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import apiClient from '@/utils/axiosConfig';

export default UserInfoScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [user, setUser] = useState({
    name: '',
    father_name: '',
    cnic: params.cnic,
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const showError = error => {
    if (error) {
      ToastAndroid.show(Object.values(error)[0], ToastAndroid.SHORT);
    }
  };

  const validate = () => {
    if (
      !user.name ||
      !user.father_name ||
      !user.cnic ||
      !user.address ||
      !user.phone ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setError({allFields: 'All fields are required'});
      return false;
    } else if (!user.name) {
      setError({name: 'Name is required'});
      return false;
    } else if (!/^[a-zA-Z\s]+$/i.test(user.name)) {
      setError({name: 'Name must contain alphabets only'});
      return false;
    }

    if (!user.father_name) {
      setError({father_name: 'Father Name is required'});
      return false;
    } else if (!/^[a-zA-Z\s]+$/i.test(user.father_name)) {
      setError({father_name: 'Father Name must contain alphabets only'});
      return false;
    }

    if (!user.address) {
      setError({address: 'Address is required'});
      return false;
    }

    if (!user.phone) {
      setError({phone: 'Contact Number is required'});
      return false;
    } else if (!/^[0-9]{11}$/.test(user.phone)) {
      setError({phone: 'Invalid Contact Number'});
      return false;
    }

    if (!user.email) {
      setError({email: 'Email is required'});
      return false;
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(user.email)) {
      setError({email: 'Invalid Email'});
      return false;
    }

    if (!user.password) {
      setError({password: 'Password is required'});
      return false;
    }

    if (user.password !== user.confirmPassword) {
      setError({confirmPassword: 'Passwords do not match'});
      return false;
    }

    setError(null);
    return true;
  };

  const registerUser = async () => {
    if (!validate()) {
      showError(error);
      return;
    }
    const body = {
      data: {
        name: user.name,
        father_name: user.father_name,
        cnic: params.cnic,
        address: user.address,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
    };
    try {
      const res = await apiClient.post('/users/register', body);
      if (res?.data?.status === 200) {
        ToastAndroid.show('User registered successfully', ToastAndroid.SHORT);
        navigation.reset({index: 0, routes: [{name: 'login'}]});
      }
    } catch (err) {
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.SHORT);
      console.log(err);
    }
  };
  return (
    <ThemedView enableScroll={true}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Name"
              style={styles.fieldStyling}
              value={user.name}
              onChangeText={text => setUser({...user, name: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Father Name"
              style={styles.fieldStyling}
              value={user.father_name}
              onChangeText={text => setUser({...user, father_name: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Email"
              style={styles.fieldStyling}
              value={user.email}
              onChangeText={text => setUser({...user, email: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Contact Number"
              style={styles.fieldStyling}
              value={user.phone}
              onChangeText={text => setUser({...user, phone: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Address"
              style={styles.fieldStyling}
              value={user.address}
              onChangeText={text => setUser({...user, address: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Password"
              style={styles.fieldStyling}
              value={user.password}
              onChangeText={text => setUser({...user, password: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Confirm Password"
              style={styles.fieldStyling}
              value={user.confirmPassword}
              onChangeText={text => setUser({...user, confirmPassword: text})}
            />
          </ThemedView>
          <ThemedView style={styles.buttonContainer}>
            <ThemedButton
              type="outlined"
              title="Submit"
              onPress={() => registerUser()}
              style={styles.buttonStyling}
            />
          </ThemedView>
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
