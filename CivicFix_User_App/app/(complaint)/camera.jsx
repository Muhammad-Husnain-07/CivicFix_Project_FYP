import Camera from '@/components/Camera';
import {useNavigation} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';

export default CameraScreen = () => {
  const navigation = useNavigation();
  return (
    <Camera navigation={() => navigation.navigate('(complaint)', {screen: 'complaint_details'})} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
