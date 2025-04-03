import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Pressable, RefreshControl, View} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedComplaintCard from '@/components/ThemedComplaintCard';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import Loader from '@/components/Loader';
import {getData} from '@/hooks/useLocalStorage';
import apiClient from '@/utils/axiosConfig';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const getComplaints = async () => {
    try {
      setLoader(true);
      const res = await apiClient(`/complaints?user_id=${userId}`);
      if (res?.length > 0) {
        setComplaints(
          res
            ?.filter(
              item =>
                item?.status?.toLowerCase() !== 'pending' &&
                item?.status?.toLowerCase() !== 'in progress',
            )
            ?.map(item => ({
              id: item?.complaint_id,
              title: `${item?.department} - ${item?.complaint_type} (ID: ${item?.complaint_id})`,
              ...item,
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
      getComplaints();
    }
  }, [userId]);

  const handleRefresh = () => {
    setRefreshing(true);
    getComplaints();
  };

  const handleFilter = value => {
    setFilter(value);
    if (value === 'all') {
      setComplaints(complaints);
    } else {
      setComplaints(complaints?.filter(item => item?.status?.toLowerCase() === value));
    }
  };

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
              <ThemedText type="default">No Complaint History</ThemedText>
            </ThemedView>
          </>
        ) : (
          complaints?.map(item => (
            <Pressable
              key={item?.id}
              onPress={() => {
                navigation.navigate('(complaint)', {
                  screen: 'view_complaint',
                  params: {...item},
                });
              }}
            >
              <ThemedView style={styles.subContainer}>
                <ThemedComplaintCard key={item?.id} data={item} />
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
});
