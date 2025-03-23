import ThemedBadge from '@/components/ThemedBadge';
import {ThemedButton} from '@/components/ThemedButton';
import ThemedDetailCard from '@/components/ThemedDetailCard';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import apiClient from '@/utils/axiosConfig';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Loader from '@/components/Loader';
import {Ionicons} from '@expo/vector-icons';

const ViewComplaintScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [complaint, setComplaint] = React.useState({});
  const complaintId = params?.id;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loader, setLoader] = React.useState(true);

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

  const handleInProgress = async () => {
    Alert.alert('Confirm', 'Are you sure you want to change this complaint to IN PROGRESS?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await apiClient.put('/complaints/' + complaint.complaint_id + '/update', {
              assigned_team_id: complaint.assigned_team_id,
              status: 'IN PROGRESS',
              resolved_status: null,
            });
            navigation.reset({index: 0, routes: [{name: '(drawer)'}]});
          } catch (err) {
            console.error('Error updating complaint status:', err.message);
          }
        },
      },
    ]);
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
  }, []);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${complaint.latitude},${complaint.longitude}`;
    Linking.openURL(url).catch(err => console.error('Failed to open Google Maps', err));
  };

  const callUser = () => {
    Linking.openURL(`tel:${complaint?.user_phone_number}`).catch(err =>
      console.error('Failed to open phone app', err),
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loader ? (
        <ThemedView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Loader />
        </ThemedView>
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
          <ThemedView style={styles.mapContainer}>
            <TouchableOpacity onPress={openGoogleMaps}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: parseFloat(complaint?.latitude) || 0,
                  longitude: parseFloat(complaint?.longitude) || 0,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                pointerEvents="none"
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(complaint.latitude) || 0,
                    longitude: parseFloat(complaint.longitude) || 0,
                  }}
                />
              </MapView>
            </TouchableOpacity>
          </ThemedView>

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
                Contact User
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
      <ThemedView style={styles.buttonContainer}>
        {complaint?.status?.toLowerCase() === 'in progress' && (
          <ThemedButton
            title="Close Complaint"
            onPress={() =>
              navigation.navigate('(complaint)', {
                screen: 'complaint_form',
                params: {complaint_id: complaint.complaint_id},
              })
            }
            style={styles.actionButton}
          />
        )}
        {complaint?.status?.toLowerCase() === 'pending' && (
          <ThemedButton
            title="Mark In Progress"
            onPress={handleInProgress}
            style={styles.actionButton}
          />
        )}
      </ThemedView>
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
