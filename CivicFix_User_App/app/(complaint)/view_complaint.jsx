import ThemedBadge from '@/components/ThemedBadge';
import {ThemedButton} from '@/components/ThemedButton';
import ThemedDetailCard from '@/components/ThemedDetailCard';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import apiClient from '@/utils/axiosConfig';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Loader from '@/components/Loader';

const ViewComplaintScreen = () => {
  const params = useLocalSearchParams();
  const [complaint, setComplaint] = React.useState({});
  const complaintId = params?.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loader, setLoader] = useState(true);

  const getStatusBadge = status => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case 'pending':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'in progress':
        return 'info';
      case 'closed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getTeam = async () => {
    try {
      const res = await apiClient(`/teams/list`);
      setTeams(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await apiClient(`/complaints/${complaintId}`);
        if (!res) return;
        setComplaint(res);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };
    fetchComplaint();
    getTeam();
  }, []);

  const callUser = () => {
    Linking.openURL(`tel:${complaint?.user_phone_number}`).catch(err =>
      console.error('Failed to open phone app', err),
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loader ? (
        <Loader />
      ) : (
        <ThemedDetailCard style={styles.card}>
          <ThemedView style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {complaint?.image_url ? (
                <Image
                  source={{uri: 'data:image/jpeg;base64,' + complaint.image_url}}
                  style={styles.imagePreview}
                />
              ) : (
                <ThemedText>Image Preview</ThemedText>
              )}
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.statusContainer}>
            <ThemedText type="heading5" style={styles.statusLabel} primaryColor>
              Status
            </ThemedText>
            <ThemedBadge status={getStatusBadge(complaint?.status)} style={styles.badge}>
              {complaint?.status}
            </ThemedBadge>
          </ThemedView>

          <DetailRow label="Reference Number" value={complaint?.ref_number ?? 'N/A'} />
          <DetailRow label="Complaint Category" value={complaint?.complaint_category ?? 'N/A'} />
          <DetailRow label="Complaint Type" value={complaint?.complaint_type ?? 'N/A'} />
          <DetailRow label="Complaint Details" value={complaint?.complaint_details ?? 'N/A'} />
          <DetailRow
            label="Assigned Team"
            value={teams.find(team => team.id === complaint?.assigned_team)?.name ?? 'N/A'}
          />
          <ThemedView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#333',
            }}
          >
            <Ionicons name="call" size={24} color="white" style={{marginRight: 10}} />
            <ThemedText type="default" style={{color: 'white', flex: 1}}>
              {complaint?.user_phone_number}
            </ThemedText>
            <TouchableOpacity
              onPress={callUser}
              style={{
                backgroundColor: '#007AFF',
                paddingVertical: 8,
                paddingHorizontal: 25,
                borderRadius: 5,
              }}
            >
              <ThemedText type="default" style={{color: 'white'}}>
                Contact Team
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <ThemedView style={styles.modalContainer}>
              <Image
                source={{uri: 'data:image/jpeg;base64,' + complaint.image_url}}
                style={styles.fullImage}
              />
              <ThemedButton
                title="Close"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </ThemedView>
          </Modal>
        </ThemedDetailCard>
      )}
    </ScrollView>
  );
};

const DetailRow = ({label, value}) => (
  <ThemedView style={styles.detailContainer}>
    <ThemedText type="heading6" style={styles.detailLabel} primaryColor>
      {label}
    </ThemedText>
    <ThemedText type="default" style={styles.detailValue}>
      {value}
    </ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 12, backgroundColor: '#121212'},
  mapContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 24,
    elevation: 6,
    backgroundColor: '#1E1E1E',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderColor: '#3A3A3A',
    borderWidth: 1,
  },
  statusLabel: {fontWeight: 'bold', fontSize: 16, color: '#ECEDEE'},
  badge: {paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12},
  detailContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderColor: '#3A3A3A',
    borderWidth: 1,
  },
  detailLabel: {marginBottom: 6, fontWeight: 'bold', fontSize: 14, color: '#ECEDEE'},
  detailValue: {color: '#ADB5BD', fontSize: 14},
  buttonContainer: {alignItems: 'center', marginTop: 10, marginBottom: 30, gap: 16},
  imageContainer: {alignItems: 'center', marginVertical: 20},
  imagePreview: {width: 200, height: 200, resizeMode: 'contain', borderRadius: 12},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 20,
  },
  closeButton: {marginTop: 20, backgroundColor: '#0a7ea4'},
  actionButton: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0a7ea4',
    color: '#FFFFFF',
  },
});

export default ViewComplaintScreen;

