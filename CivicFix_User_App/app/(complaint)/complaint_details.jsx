import * as FileSystem from 'expo-file-system';
import {StyleSheet, ToastAndroid} from 'react-native';
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
import {ThemedText} from '@/components/ThemedText';

const getComplaintOptions = complaintClass => {
  switch (complaintClass) {
    case 'SNGPL':
      return SNGPL_COMPLAINT_OPTIONS;
    case 'LESCO':
      return LESCO_COMPLAINT_OPTIONS;
    default:
      return [];
  }
};

const ViewMap = ({setLocation, onSubmit}) => {
  const [pickedLocation, setPickedLocation] = useState(null);

  const handleSubmit = () => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onSubmit();
    } else {
      ToastAndroid.show('Please pick a location on the map', ToastAndroid.LONG);
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
  const [complaintOptions, setComplaintOptions] = useState([]);
  const [complaintCategory, setComplaintCategory] = useState(null);
  const [complaintType, setComplaintType] = useState(null);
  const [complaintDetails, setComplaintDetails] = useState('');
  const [location, setLocation] = useState(null);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [detectedText, setDetectedText] = useState(params?.ocr_text);

  useEffect(() => {
    setComplaintOptions(getComplaintOptions(params?.complaint_class));
  }, [params?.complaint_class]);

  useEffect(() => {
    if (complaintCategory) {
      const complaintTypeOptions =
        complaintOptions?.find(item => item.value === complaintCategory)?.types || [];
      setComplaintTypes(complaintTypeOptions);
    }
  }, [complaintCategory]);

  const handleSubmitComplaint = async () => {
    if (!location) {
      ToastAndroid.show('Please select a location', ToastAndroid.LONG);
      return;
    }

    let uploadImage = null;
    if (params?.localImagePath) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(params?.localImagePath, {
          encoding: FileSystem.EncodingType.Base64,
        });
        uploadImage = base64Image;
      } catch (error) {
        console.log('Error reading image file:', error);
      }
    }
    const user = await getData('user_data');
    const user_id = JSON.parse(user).user_id;
    const body = {
      data: {
        user_id: user_id,
        department: params?.complaint_class,
        complaint_category: complaintOptions?.find(item => item.value === complaintCategory)?.label,
        complaint_type: complaintTypes?.find(item => item.value === complaintType)?.label,
        complaint_details: complaintDetails,
        ref_number: RegExp(/.*(?=:)/).test(detectedText)
          ? detectedText?.replace(/.*(?=:)/, '')
          : detectedText,
        status: 'PENDING',
        upload_image: uploadImage,
        latitude: location?.latitude,
        longitude: location?.longitude,
        assigned_team_id: null,
      },
    };

    try {
      setLoader(true);
      const res = await apiClient.post('/users/create-complaint', body);
      if (params?.localImagePath) {
        await FileSystem.deleteAsync(params?.localImagePath, {idempotent: true});
      }
      ToastAndroid.show('Complaint submitted successfully', ToastAndroid.LONG);
      navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
      setLoader(false);
    } catch (err) {
      setLoader(false);
      ToastAndroid.show(
        err?.response?.data?.message?.description ||
          'Something went wrong. Please try again later.',
        ToastAndroid.LONG,
      );
    }
  };

  const validateDetectedText = text => {
    let regex;
    if (params?.complaint_class === 'SNGPL') {
      regex = /^[a-zA-Z0-9]+$/;
    } else if (params?.complaint_class === 'LESCO') {
      regex = /^[a-zA-Z0-9]+$/;
    }
    if (regex && !regex.test(text)) {
      const cleanText = text.replace(/[^a-zA-Z0-9]/g, '');
      setDetectedText(cleanText);
      ToastAndroid.show(
        `Please enter a valid ${params?.complaint_class === 'SNGPL' ? 'meter number' : 'reference number'}.
        Special characters have been removed.`,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  return loader ? (
    <Loader />
  ) : showMap ? (
    <ViewMap setLocation={setLocation} onSubmit={handleSubmitComplaint} />
  ) : (
    <ThemedView style={styles.container}>
      <ThemedView style={{padding: 10}}>
        <ThemedText type="heading5">
          Your complaint will be routed to the {params?.complaint_class} department. Please provide
          the necessary details.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.fieldContainer}>
        <ThemedDropdown
          data={complaintOptions}
          placeholder="Select Complaint Category"
          value={complaintCategory}
          setValue={setComplaintCategory}
        />
      </ThemedView>
      {complaintCategory && (
        <ThemedView style={styles.fieldContainer}>
          <ThemedDropdown
            data={complaintTypes}
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
            value={detectedText}
            onChangeText={text => {
              if (validateDetectedText(text)) {
                setDetectedText(text);
              }
            }}
          />
        </ThemedView>
      )}
      {params?.complaint_class === 'LESCO' && (
        <ThemedView style={styles.fieldContainer}>
          <ThemedTextField
            placeholder="Enter Reference Number"
            style={styles.fieldStyling}
            value={detectedText}
            onChangeText={text => {
              if (validateDetectedText(text)) {
                setDetectedText(text);
              }
            }}
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
        <ThemedButton
          title="Submit"
          onPress={() => {
            if (!complaintCategory) {
              ToastAndroid.show('Please select a complaint category', ToastAndroid.LONG);
              return;
            }
            if (!complaintType) {
              ToastAndroid.show('Please select a complaint type', ToastAndroid.LONG);
              return;
            }
            if (!complaintDetails) {
              ToastAndroid.show('Please enter complaint details', ToastAndroid.LONG);
              return;
            }
            if (!validateDetectedText(detectedText)) {
              return;
            }
            setShowMap(true);
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
