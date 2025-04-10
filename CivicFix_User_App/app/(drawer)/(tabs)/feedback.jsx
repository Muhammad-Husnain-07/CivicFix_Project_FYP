import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Pressable, RefreshControl, View} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedComplaintCard from '@/components/ThemedComplaintCard';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import Loader from '@/components/Loader';
import {getData} from '@/hooks/useLocalStorage';
import apiClient from '@/utils/axiosConfig';
import {useThemeColor} from '@/hooks/useThemeColor';
import ThemedBadge from '@/components/ThemedBadge';

export default function FeedbackScreen({lightColor, darkColor}) {
  const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'border');
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getComplaints = async () => {
    try {
      const res = await apiClient(`/complaints?user_id=${userId}`);
      if (res?.length > 0) {
        setComplaints(
          res
            ?.filter(
              item =>
                item?.status?.toLowerCase() !== 'pending' &&
                item?.status?.toLowerCase() !== 'in progress' &&
                item?.feedback_submitted === false,
            )
            ?.map(item => ({
              id: item?.complaint_id,
              title: `(Complaint ID: ${item?.complaint_id}) Feedback`,
            })),
        );
      } else {
        setComplaints([]);
      }
      setLoader(false);
      setRefreshing(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getData('user_data').then(data => {
      setUserId(JSON.parse(data)?.user_id);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      setLoader(true);
      getComplaints();
    }
  }, [userId]);

  const handleRefresh = () => {
    setRefreshing(true);
    setLoader(true);
    getComplaints();
  };

    useEffect(() => {
        const handleNavigation = (event) => {
          if (event?.type === 'focus' && event?.target.includes('feedback') && userId) {
            getComplaints();
          }
        }
        navigation.addListener('focus', handleNavigation);
        return () => navigation.removeListener('focus', handleNavigation);
      }, [navigation]);

  return loader ? (
    <Loader />
  ) : (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{height: '100%', width: '100%'}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {complaints?.length === 0 ? (
          <>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="default">No Pending Feedbacks</ThemedText>
            </ThemedView>
          </>
        ) : (
          complaints?.map(item => (
            <Pressable
              key={item?.id}
              onPress={() => {
                navigation.navigate('(complaint)', {
                  screen: 'feedback',
                  params: {complaint_id: item?.id},
                });
              }}
            >
              <ThemedView style={styles.subContainer}>
                <ThemedView style={[{borderColor}, styles.card]}>
                  <ThemedText style={styles.title}>{item?.title || 'No Title'}</ThemedText>
                  <ThemedView style={styles.rightSection}>
                    <ThemedBadge status="danger">Not Submitted</ThemedBadge>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </Pressable>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightSection: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
