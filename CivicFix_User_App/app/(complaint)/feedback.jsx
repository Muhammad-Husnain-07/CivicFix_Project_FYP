import React, {useState} from 'react';
import {Pressable, StyleSheet, ToastAndroid, View} from 'react-native';
import apiClient from '@/utils/axiosConfig';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import Loader from '@/components/Loader';
import {ThemedButton} from '@/components/ThemedButton';

const FeedbackScreen = () => {
  const {complaint_id} = useLocalSearchParams();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      ToastAndroid.show('Please select a rating', ToastAndroid.LONG);
      return;
    }

    if (!comment) {
      ToastAndroid.show('Please enter a comment', ToastAndroid.LONG);
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
      ToastAndroid.show('Thank you for your feedback', ToastAndroid.LONG);
      navigation.goBack();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      ToastAndroid.show(
        err?.response?.data?.message?.description ||
          'Something went wrong. Please try again later.',
        ToastAndroid.LONG,
      );
      const errorMessage =
        err?.response?.data?.message?.description ||
        'Something went wrong. Please try again later.';
      setError(errorMessage);
    }
  };

  const Rating = () => (
    <ThemedView style={styles.ratingContainer}>
      <ThemedText type="heading5" style={styles.ratingText}>
        How would you rate the service?
      </ThemedText>
      <ThemedView style={styles.ratingButtonsContainer}>
        {[1, 2, 3, 4, 5].map(ratingValue => (
          <Pressable
            key={ratingValue}
            onPress={() => setRating(ratingValue)}
            style={({pressed}) => [
              {
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 4,
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${ratingValue} stars`}
          >
            <ThemedText
              type="heading1"
              style={{
                color: rating >= ratingValue ? '#FFD700' : '#808080',
                fontSize:32,
              }}
            >
              {rating >= ratingValue ? '★' : '☆'}
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
          <ThemedButton title="Cancel" onPress={() => navigation.goBack()} style={styles.cancelButton} />
          
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
    marginHorizontal: 20,
  },
  submitButton: {
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    borderRadius: 30,
  },
  ratingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingText: {
    color: '#ECEDEE',
    marginBottom: 20,
  },
  ratingButtonsContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FeedbackScreen;
