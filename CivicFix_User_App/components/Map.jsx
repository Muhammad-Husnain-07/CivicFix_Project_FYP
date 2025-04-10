import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, Alert, Platform, TouchableOpacity, ToastAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {Feather} from '@expo/vector-icons';
import {ThemedView} from './ThemedView';
import ThemedTextField from './ThemedTextField';

export default function Map({setLocation}) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [reverseGeoCodingResult, setReverseGeoCodingResult] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permissions are required to use this feature.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = location.coords;

      setCurrentLocation({latitude, longitude});
      setSelectedLocation({latitude, longitude});
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    })();
  }, []);

  const handleMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setSelectedLocation({latitude, longitude});
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  const handleSearch = async query => {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&accept-language=en&format=json&countrycodes=pk`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        const newLocation = {latitude: parseFloat(location.lat), longitude: parseFloat(location.lon)};
        setSelectedLocation(newLocation);
        mapRef.current?.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } else {
        ToastAndroid.show('Location Not Found', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Failed to fetch location data.', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      (async () => {
        const result = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${selectedLocation.latitude}&lon=${selectedLocation.longitude}&accept-language=en&format=json`);
        const data = await result.json();
        setReverseGeoCodingResult(data || null);
      })();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
    }
  }, [selectedLocation]);

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Fetching your current location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedView style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
        <ThemedTextField
          placeholder="Search location"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBarContainer}
        />
        <TouchableOpacity style={{opacity: 0.5}} onPress={() => handleSearch(searchQuery)}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </ThemedView>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Picked Location"
            description={reverseGeoCodingResult?.display_name || ''}
          />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Address: {reverseGeoCodingResult?.display_name || ''}</Text>
          <Text style={styles.infoText}>Latitude: {selectedLocation.latitude}</Text>
          <Text style={styles.infoText}>Longitude: {selectedLocation.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
  },
});


