import React from 'react';
import {StyleSheet, ScrollView, Pressable} from 'react-native';
import {ThemedView} from '@/components/ThemedView';
import ThemedComplaintCard from '@/components/ThemedComplaintCard';
import {ThemedText} from '@/components/ThemedText';
import {useNavigation} from 'expo-router';
export default function HomeScreen() {
  const navigation = useNavigation();
  //Generate Random Objects Array
  const Complaints = [
    {id: 1, title: 'Complaint1', status: 'Pending'},
    {id: 2, title: 'Complaint2', status: 'Closed'},
    {id: 3, title: 'Complaint3', status: 'Pending'},
    {id: 4, title: 'Complaint4', status: 'Resolved'},
    {id: 5, title: 'Complaint5', status: 'Pending'},
    {id: 6, title: 'Complaint6', status: 'Resolved'},
    {id: 7, title: 'Complaint7', status: 'Pending'},
    {id: 8, title: 'Complaint8', status: 'In Progress'},
    {id: 9, title: 'Complaint9', status: 'Closed'},
  ];
  return (
    <ThemedView style={styles.container}>
      {Complaints?.length === 0 && (
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
        </ThemedView>
      )}
      <ScrollView style={{height: '100%', width: '100%'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('(complaint)', {screen: 'view_complaint'});
          }}
        >
          <ThemedView style={styles.subContainer}>
            {Complaints?.map(item => (
              <ThemedComplaintCard key={item?.id} data={item} />
            ))}
          </ThemedView>
        </Pressable>
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
