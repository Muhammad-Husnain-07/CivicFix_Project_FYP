import {useNavigation} from 'expo-router';
import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
import Camera from '@/components/Camera';
import apiClient from '@/utils/axiosConfig';
import Loader from '@/components/Loader';

export default CameraScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async value => {
    const base64 = await FileSystem.readAsStringAsync(value, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Create a unique file name for the image (e.g., using current timestamp)
    const imageName = `${FileSystem.documentDirectory}${new Date().getTime()}.png`;

    // Save image to the device file system
    await FileSystem.writeAsStringAsync(imageName, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const body = {
      data: {
        image: 'data:image/jpeg;base64,' + base64,
      },
    };

    try {
      setLoader(true);
      // Call your API and send the image data
      await apiClient.post('/users/detect-complaint-type', body).then(res => {
        // On successful API call, navigate to the complaint details screen
        if (res?.data?.complaint_class) {
          navigation.navigate('(complaint)', {
            screen: 'complaint_details',
            params: {
              complaint_class: res?.data?.complaint_class,
              ocr_text: res?.data?.ocr_text,
              localImagePath: imageName, // Pass the local image path to complaint details screen
            },
          });
        } else {
          Alert.alert('Error', 'Image not recognized. Please try again.');
        }
      });
      setLoader(false);
    } catch (err) {
      setLoader(false);
      if (err?.response?.data?.message?.description)
        Alert.alert('Error', err?.response?.data?.message?.description);
      else Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return loader ? <Loader /> : <Camera onSubmit={value => handleSubmit(value)} />;
};
