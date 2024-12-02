import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {ThemedButton} from '@/components/ThemedButton';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedView} from '@/components/ThemedView';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import apiClient from '@/utils/axiosConfig';

export default UserInfoScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [user, setUser] = useState({});

  const registerUser = async () => {
    const body = {
      data: {
        name: user.name,
        father_name: user.father_name,
        cnic: params.cnic,
        address: user.address,
        phone: user.phone,
        email: user.email,
        password: user.password,
        role: 'User',
      },
    };
    try {
      await apiClient.post('/users/register', body).then(res => {
        if (res?.message?.status === 200) {
          navigation.reset({index: 0, routes: [{name: 'login'}]});
        }
      });
    } catch (err) {
      alert(err);
      console.log(err);
      navigation.reset({index: 0, routes: [{name: 'register'}]});
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
              value={user?.name}
              onChangeText={text => setUser({...user, name: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Father Name"
              style={styles.fieldStyling}
              value={user?.father_name}
              onChangeText={text => setUser({...user, father_name: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Email"
              style={styles.fieldStyling}
              value={user?.email}
              onChangeText={text => setUser({...user, email: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Contact Number"
              style={styles.fieldStyling}
              value={user?.phone}
              onChangeText={text => setUser({...user, phone: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Address"
              style={styles.fieldStyling}
              value={user?.address}
              onChangeText={text => setUser({...user, address: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Password"
              style={styles.fieldStyling}
              value={user?.password}
              onChangeText={text => setUser({...user, password: text})}
            />
          </ThemedView>
          <ThemedView style={styles.fieldContainer}>
            <ThemedTextField
              placeholder="Confirm Password"
              style={styles.fieldStyling}
              value={user?.password}
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
