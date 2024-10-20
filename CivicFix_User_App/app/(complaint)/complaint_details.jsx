import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedDropdown} from '@/components/ThemedDropdown';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedButton} from '@/components/ThemedButton';
import {useNavigation} from 'expo-router';

export default ComplaintDetailScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState(null);
  const options = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.fieldContainer}>
        <ThemedDropdown
          data={options}
          placeholder="Select Complaint Type"
          value={selectedValue}
          setValue={setSelectedValue}
        />
      </ThemedView>
      <ThemedView style={styles.fieldContainer}>
        <ThemedTextField placeholder="Enter Reference Number" style={styles.fieldStyling} />
      </ThemedView>
      <ThemedView style={styles.fieldContainer}>
        <ThemedTextField
          placeholder="Write your complaint here"
          multiline
          style={styles.fieldStyling}
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton
          title="Submit"
          onPress={() => {
            navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
          }}
        />
      </ThemedView>
    </ThemedView>
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
  fieldContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  fieldStyling: {
    width: '100%',
    minWidth: 300,
    maxWidth: 400,
  },
});
