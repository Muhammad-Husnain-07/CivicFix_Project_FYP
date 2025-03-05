import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Pressable, RefreshControl} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedComplaintCard from '@/components/ThemedComplaintCard';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
import Loader from '@/components/Loader';
import {getData} from '@/hooks/useLocalStorage';
import apiClient from '@/utils/axiosConfig';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getComplaints = async () => {
    try {
      setLoader(true);
      const res = await apiClient(`/complaints?team_id=${teamId}`);
      if (res?.length > 0) {
        setComplaints(
          res.map(item => ({
            id: item?.complaint_id,
            title: `${item?.department} - ${item?.complaint_type} (ID: ${item?.complaint_id})`,
            ...item,
          }))
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
      setTeamId(JSON.parse(data)?.team_id);
    });
  }, []);

  useEffect(() => {
    if (teamId) {
      getComplaints();
    }
  }, [teamId]);

  const handleRefresh = () => {
    setRefreshing(true);
    getComplaints();
  };

  return loader ? (
    <Loader />
  ) : (
    <ThemedView style={styles.container}>
      {complaints?.length === 0 ? (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <ThemedText type="default">No Complaints Assigned.</ThemedText>
          </ThemedView>
        </>
      ) : (
        <ScrollView
          style={{height: '100%', width: '100%'}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {complaints?.map(item => (
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
          ))}
        </ScrollView>
      )}
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

