import * as FileSystem from 'expo-file-system';
import {StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import ThemedTextField from '@/components/ThemedTextField';
import {ThemedButton} from '@/components/ThemedButton';
import {useNavigation, useLocalSearchParams} from 'expo-router';
import {LESCO_COMPLAINT_OPTIONS, SNGPL_COMPLAINT_OPTIONS} from '@/constants/ComplaintOptions';
import apiClient from '@/utils/axiosConfig';
import {ThemedView} from '@/components/ThemedView';
import {ThemedDropdown} from '@/components/ThemedDropdown';
import {getData} from '@/hooks/useLocalStorage';
import Loader from '@/components/Loader';
import Map from '@/components/Map';

const ViewMap = ({setLocation, onSubmit}) => {
  const [pickedLocation, setPickedLocation] = useState(null);

  const handleSubmit = () => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onSubmit();
    } else {
      alert('Please pick a location on the map');
    }
  };
  return (
    <ThemedView style={{flex: 1}}>
      <Map style={{flex: 1}} setLocation={setPickedLocation} />
      <ThemedView style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedButton title="Done" onPress={handleSubmit} />
      </ThemedView>
    </ThemedView>
  );
};

export default ComplaintDetailScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [loader, setLoader] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [complaintType, setComplaintType] = useState(null);
  const [complaintCategory, setComplaintCategory] = useState(null);
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSubmitComplaint = async () => {
    let uploadImage = null;
    // Check if image exists and convert it to base64 before submitting
    if (params?.localImagePath) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(params?.localImagePath, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Replace the image with the base64 version in the request body
        uploadImage = base64Image;
      } catch (error) {
        console.error('Error reading image file:', error);
      }
    }
    const user = await getData('user_data');
    const user_id = JSON.parse(user).user_id;
    const body = {
      data: {
        user_id: user_id,
        department: params?.complaint_class,
        complaint_category: categoryOptions?.find(item => item.value === complaintCategory)?.label,
        complaint_type: typeOptions?.find(item => item.value === complaintType)?.label,
        complaint_details: complaintDetails,
        ref_number: params?.ocr_text,
        status: 'PENDING',
        upload_image: 'data:image/jpeg;base64,' + uploadImage,
        assigned_team_id: null,
      },
    };

    try {
      setLoader(true);
      const res = await apiClient.post('/users/create-complaint', body);
      // After submitting the complaint, delete the image from local file system
      if (params?.localImagePath) {
        await FileSystem.deleteAsync(params?.localImagePath, {idempotent: true});
      }

      // Reset the navigation stack or handle post-submit behavior
      navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.complaint_class === 'SNGPL') {
      setCategoryOptions(
        SNGPL_COMPLAINT_OPTIONS?.map(item => {
          return {
            label: item.label,
            value: item.value,
          };
        }) || [],
      );
    } else if (params?.complaint_class === 'LESCO') {
      setCategoryOptions(
        LESCO_COMPLAINT_OPTIONS?.map(item => {
          return {
            label: item.label,
            value: item.value,
          };
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (params?.complaint_class === 'SNGPL' && complaintCategory) {
      setTypeOptions(
        SNGPL_COMPLAINT_OPTIONS?.find(item => item.value === complaintCategory)?.types?.map(
          item => {
            return {
              label: item.label,
              value: item.value,
            };
          },
        ) || [],
      );
    } else if (params?.complaint_class === 'LESCO' && complaintCategory) {
      setTypeOptions(
        LESCO_COMPLAINT_OPTIONS?.find(item => item.value === complaintCategory)?.types?.map(
          item => {
            return {
              label: item.label,
              value: item.value,
            };
          },
        ),
      );
    }
  }, [complaintCategory]);

  return loader ? (
    <Loader />
  ) : showMap ? (
    <ViewMap setLocation={setLocation} onSubmit={handleSubmitComplaint} />
  ) : (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.fieldContainer}>
        <ThemedDropdown
          data={categoryOptions}
          placeholder="Select Complaint Category"
          value={complaintCategory}
          setValue={setComplaintCategory}
        />
      </ThemedView>
      {typeOptions?.length > 0 && (
        <ThemedView style={styles.fieldContainer}>
          <ThemedDropdown
            data={typeOptions}
            placeholder="Select Complaint Type"
            value={complaintType}
            setValue={setComplaintType}
          />
        </ThemedView>
      )}
      {params?.complaint_class === 'SNGPL' && (
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="Enter Meter Number"
            style={styles.fieldStyling}
            value={params?.ocr_text}
            disabled
          />
        </ThemedView>
      )}
      {params?.complaint_class === 'LESCO' && (
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="Enter Reference Number"
            style={styles.fieldStyling}
            value={params?.ocr_text}
            disabled
          />
        </ThemedView>
      )}
      <ThemedView style={styles.fieldContainer}>
        <ThemedTextField
          placeholder="Write your complaint here"
          multiline
          value={complaintDetails}
          onChangeText={text => setComplaintDetails(text)}
          style={styles.fieldStyling}
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton title="Submit" onPress={() => setShowMap(true)} />
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
