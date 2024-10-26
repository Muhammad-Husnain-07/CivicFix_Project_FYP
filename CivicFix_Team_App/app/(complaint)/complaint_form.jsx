import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {ThemedView} from '@/components/ThemedView';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedButton} from '@/components/ThemedButton';
import {ThemedText} from '@/components/ThemedText';
import {ThemedDropdown} from '@/components/ThemedDropdown';
import { useNavigation } from 'expo-router';

const ComplaintForm = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const statusOptions = [
    {label: 'Closed', value: 'Closed'},
    {label: 'Resolved', value: 'Resolved'},
  ];
  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submitted:', {note, status, image});
    navigation.navigate('(drawer)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText style={styles.label}>Note</ThemedText>
        <ThemedTextField
          style={styles.noteInput}
          multiline
          placeholder="Enter complaint details here"
          value={note}
          onChangeText={setNote}
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
      {image && <Image source={{uri: image}} style={styles.imagePreview} />}
      <ThemedView style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ThemedButton title="Upload Resolved Issue Image" onPress={handleImagePick} />
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
