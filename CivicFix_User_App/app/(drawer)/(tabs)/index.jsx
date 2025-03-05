import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, ScrollView, Pressable, RefreshControl} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedComplaintCard from '@/components/ThemedComplaintCard';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import {getData} from '@/hooks/useLocalStorage';
import apiClient from '@/utils/axiosConfig';
import Loader from '@/components/Loader';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getComplaints = async () => {
    try {
      setLoader(true);
      const res = await apiClient(`/complaints?user_id=${userId}`);
      if (res?.length > 0) {
        setComplaints(
          res?.map((item) => ({
            id: item?.complaint_id,
            title: `${item?.department} - ${item?.complaint_type} (ID: ${item?.complaint_id})`,
            ...item,
          })) || [],
        );
      } else {
        setComplaints([]);
      }
      setLoader(false);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getComplaints().then(() => setRefreshing(false));
  }, [userId]);

  return loader ? (
    <Loader />
  ) : (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{height: '100%', width: '100%'}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {complaints?.length === 0 ? (
          <>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Welcome!</ThemedText>
            </ThemedView>
            <ThemedView style={styles.bodyContainer}>
              <ThemedText type="body">
                No Complaints Found. For Adding New Complaint Press + Icon on Top Right Corner.
              </ThemedText>
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
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
