import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import apiClient from '@/utils/axiosConfig';
import {useLocalSearchParams} from 'expo-router';
import ThemedDetailCard from '@/components/ThemedDetailCard';
import Loader from '@/components/Loader';
import {ThemedButton} from '@/components/ThemedButton';
import {useNavigation} from 'expo-router';

const ViewResolutionProofScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(true);

  const fetchProof = async () => {
    try {
      const res = await apiClient(`/get-proof-of-resolution?complaint_id=${params?.complaint_id}`);
      if (!res) return;
      setDetails(res);
      setLoader(false);
    } catch (err) {
      console.log(err.response?.data?.message?.description);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProof();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedDetailCard style={styles.card}>
        <ThemedView style={styles.imageContainer}>
          <TouchableOpacity>
            {details?.proof_image ? (
              <Image
                source={{uri: 'data:image/jpeg;base64,' + details?.proof_image}}
                style={styles.imagePreview}
              />
            ) : (
              <ThemedText>Image Preview</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.detailContainer}>
          <ThemedText type="heading6" style={styles.detailLabel} primaryColor>
            Team Remarks
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {details?.proof_description}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            title="Back"
            onPress={() => navigation.goBack()}
            style={{position: 'absolute'}}
          />
        </ThemedView>
      </ThemedDetailCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    marginTop: 20,
    padding: 16,
    height: "100%",
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 24,
    elevation: 6,
    height: Dimensions.get('window').height-100,
    backgroundColor: '#1F1F1F',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  detailContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderColor: '#3A3A3A',
    borderWidth: 1,
  },
  detailLabel: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ECEDEE',
  },
  detailValue: {
    color: '#ADB5BD',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,    
},
});

export default ViewResolutionProofScreen;

