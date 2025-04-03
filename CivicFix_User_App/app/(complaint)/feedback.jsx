import React, {useState} from 'react';
import {Pressable, StyleSheet, ToastAndroid, View} from 'react-native';
import apiClient from '@/utils/axiosConfig';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Loader from '@/components/Loader';
import { ThemedButton } from '@/components/ThemedButton';

const FeedbackScreen = () => {
  const {complaint_id} = useLocalSearchParams();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment) {
      setError('Please enter a comment');
      return;
    }

    const body = {
      complaint_id,
      rating,
      comment,
    };

    try {
      setLoader(true);
      await apiClient.post('/feedback', body);
      ToastAndroid.show('Feedback submitted successfully', ToastAndroid.SHORT);
      navigation.goBack();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      const errorMessage = err?.message || 'Something went wrong. Please try again later.';
      setError(errorMessage);
    }
  };

  const Rating = () => (
    <ThemedView style={styles.ratingContainer}>
      <ThemedText type="heading5" style={styles.ratingText}>
        How would you rate the service?
      </ThemedText>
      {error && <ThemedText type="body1" style={styles.errorText}>{error}</ThemedText>}
      <ThemedView style={styles.ratingButtonsContainer}>
        {[1, 2, 3, 4, 5].map(ratingValue => (
          <Pressable
            key={ratingValue}
            onPress={() => setRating(ratingValue)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 4,
              backgroundColor: rating === ratingValue ? '#0a7ea4' : '#ECEDEE',
            }}
          >
            <ThemedText
              type="heading6"
              style={{
                color: rating === ratingValue ? '#ECEDEE' : '#121212',
                fontSize: 16,
              }}
            >
              {ratingValue}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <ThemedText type="heading5" style={styles.heading}>
            Submit Feedback
          </ThemedText>
          <Rating />
          <ThemedTextField
            label="Enter Comment"
            value={comment}
            onChangeText={setComment}
            multiline
            style={styles.commentInput}
          />
          <ThemedButton title="Submit" onPress={handleSubmitFeedback} style={styles.submitButton} />
        </>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  heading: {
    marginBottom: 20,
    color: '#ECEDEE',
    textAlign: 'center',
  },
  commentInput: {
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#ECEDEE',
  },
  submitButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    borderRadius: 30,
  },
  ratingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingText: {
    color: '#ECEDEE',
    marginBottom: 10,
  },
  ratingButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FeedbackScreen;

