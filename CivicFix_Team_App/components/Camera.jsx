import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import {ThemedView} from './ThemedView';
import {ThemedText} from './ThemedText';

export default function Camera() {
  const [photo, setPhoto] = useState(null); // To store the selected/taken photo
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  if (!status) {
    // Permissions are still loading.
    return <View />;
  }

  if (!status.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to access the camera and gallery
        </ThemedText>
        <TouchableOpacity onPress={requestPermission}>
          <ThemedText>Grant Permission</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const openImagePicker = async () => {
    // Open Image Picker to allow selecting from the gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Store the selected photo
    }
  };

  const takePhoto = async () => {
    // Open the camera to take a new photo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Store the taken photo
    }
  };

  const handleRetake = () => {
    setPhoto(null); // Clear the photo to allow retaking or picking again
  };

  const handleSubmit = () => {
    console.log('Photo submitted:', photo);
    // Add logic to handle submission of the photo
  };

  return (
    <ThemedView style={styles.container}>
      {photo ? (
        // If a photo is selected/taken, display it and the buttons below
        <>
          <Image source={{uri: photo}} style={styles.photoPreview} />

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleRetake}>
              <ThemedText style={styles.text}>Retake</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
              <ThemedText style={styles.text}>Submit</ThemedText>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // If no photo is selected/taken, show the options to take or pick one
        <>
          {/* Take Photo Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.centerButton} onPress={takePhoto}>
              <ThemedText style={styles.text}>Take Photo</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.centerButton} onPress={openImagePicker}>
              <ThemedText style={styles.text}>Choose from Gallery</ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPreview: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  centerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
  },
});
