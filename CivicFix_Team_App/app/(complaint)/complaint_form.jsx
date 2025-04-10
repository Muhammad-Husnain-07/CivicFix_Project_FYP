import React, {useEffect, useState} from 'react';
import * as FileSystem from 'expo-file-system';
import {StyleSheet, Image, ToastAndroid} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import {ThemedDropdown} from '@/components/ThemedDropdown';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import apiClient from '@/utils/axiosConfig';
import Camera from '@/components/Camera';

const ComplaintForm = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const statusOptions = [
    {label: 'Closed', value: 'CLOSED'},
    {label: 'Resolved', value: 'COMPLETED'},
  ];
  const [openCamera, setOpenCamera] = useState(false);
  const params = useLocalSearchParams();

  const handleSubmit = async () => {
    if (!note) {
      setError('Please enter a note');
      return;
    }

    if (!status) {
      setError('Please select a status');
      return;
    }
    if (!image) {
      setError('Please upload proof image');
      return;
    }
    let uploadImage = null;
    if (image) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Replace the image with the base64 version in the request body
        uploadImage = base64Image;
      } catch (error) {
        setError('Error reading image file');
        console.log('Error reading image file:', error);
        return;
      }
    }

    try {
      await apiClient.post('proof-of-resolution', {
        proof_description: note,
        complaint_id: params?.complaint_id,
        resolved_status: status,
        status: status === 'COMPLETED' ? 'RESOLVED' : 'CLOSED',
        proof_image: uploadImage,
      });
      setSuccess(true);
      navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
    } catch (err) {
      setError('Error submitting proof of resolution');
      console.log(
        'Error submitting proof of resolution:',
        err.response.data?.message?.description || err.message || err,
      );
    }
  };

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      setError(null);
    }
    if (success) {
      ToastAndroid.show('Proof of resolution submitted successfully', ToastAndroid.LONG);
      setSuccess(false);
    }
  }, [error, success]);

  return openCamera ? (
    <Camera
      onSubmit={photo => {
        setImage(photo);
        setOpenCamera(false);
      }}
    />
  ) : (
    <ThemedView style={styles.container}>
      {image && <Image source={{uri: image}} style={styles.imagePreview} />}
      <ThemedView>
        <ThemedText style={styles.label}>Note</ThemedText>
        <ThemedTextField
          style={styles.noteInput}
          multiline
          placeholder="Enter complaint details here"
          value={note}
          onChangeText={setNote}
          keyboardType="default"
        />

        <ThemedText style={styles.label}>Status</ThemedText>
        <ThemedView style={styles.dropdownContainer}>
          <ThemedDropdown
            data={statusOptions}
            value={status}
            setValue={setStatus}
            placeholder="Select Status"
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ThemedButton title="Upload Resolved Issue Image" onPress={() => setOpenCamera(true)} />
        <ThemedButton title="Submit" onPress={handleSubmit} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 15,
  },
  noteInput: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 15,
    alignSelf: 'center',
  },
});

export default ComplaintForm;
