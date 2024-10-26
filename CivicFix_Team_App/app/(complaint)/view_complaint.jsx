import ThemedBadge from '@/components/ThemedBadge';
import {ThemedButton} from '@/components/ThemedButton';
import ThemedDetailCard from '@/components/ThemedDetailCard';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useNavigation} from 'expo-router';
import React from 'react';
import {StyleSheet} from 'react-native';

const ViewComplaintScreen = () => {
  const navigation = useNavigation();
  return (
    <ThemedView style={styles.container}>
      {/* Complaint Details Card */}
      <ThemedDetailCard style={styles.card}>
        {/* Status Section */}
        <ThemedView style={styles.statusContainer}>
          <ThemedText type="heading5" style={styles.statusLabel} primaryColor>
            Status
          </ThemedText>
          <ThemedBadge status="warning" style={styles.badge}>
            Pending
          </ThemedBadge>
        </ThemedView>

        {/* Complaint Details */}
        <DetailRow label="Department" value="LESCO" />
        <DetailRow label="Complaint Category" value="Meter Issues" />
        <DetailRow label="Complaint Type" value="Non-functional Meter" />
        <DetailRow
          label="Complaint Detail"
          value="The meter stopped working 2 days ago and needs urgent replacement."
        />
        <DetailRow label="Assigned Team" value="Technician Team A" />
      </ThemedDetailCard>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton
          title="Close Complaint"
          onPress={() => {
            navigation.navigate('(complaint)', {screen: 'complaint_form'});
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

/**
 * A reusable component for rendering label and value pairs.
 */
const DetailRow = ({label, value}) => (
  <ThemedView style={styles.detailContainer}>
    <ThemedText type="heading6" style={styles.detailLabel} primaryColor>
      {label}
    </ThemedText>
    <ThemedText type="default">{value}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  detailContainer: {
    marginBottom: 12,
    paddingVertical: 10,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 12,
    borderRadius: 8,
    padding: 16,
  },
  detailLabel: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: 5,
  },
});

export default ViewComplaintScreen;
