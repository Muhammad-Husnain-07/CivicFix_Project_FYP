import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import {ThemedView} from '@/components/ThemedView';
import ThemedIcon from '@/components/ThemedIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme.web';
import {useNavigation} from 'expo-router';
import {DrawerActions} from '@react-navigation/native';
import {ThemedText} from '@/components/ThemedText';
import {getData, removeData} from '@/hooks/useLocalStorage';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer
        screenOptions={{
          headerTintColor: Colors[colorScheme ?? 'light'].tint,
          header: () => <Header />,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Overview',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const Header = () => {
  const navigation = useNavigation();
  return (
    <ThemedView style={styles.header}>
      <ThemedIcon
        name={'menu'}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{marginRight: 10}}
      />
    </ThemedView>
  );
};

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  const Logout = async () => {
    removeData();
    navigation.reset({index: 0, routes: [{name: 'index'}]});
  };

  useEffect(() => {
    getData('user_data').then(res => setUser(JSON.parse(res)));
  }, []);
  return (
    <ThemedView style={styles.drawerContent}>
      {/* User Info */}
      {user && (
        <ThemedView style={styles.userInfo}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=random&size=256`,
            }} // Replace with the user's DP URL
            style={styles.profileImage}
            alt="Profile Image"
          />
          <ThemedText style={styles.userName}>{user?.name}</ThemedText>
        </ThemedView>
      )}

      {/* Drawer Items */}
      <ThemedView style={styles.drawerItems}>{props.children}</ThemedView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => Logout()}>
        <ThemedIcon name="log-out-outline" style={styles.logoutIcon} />
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  drawerContent: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItems: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 0.4,
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  logoutText: {
    fontSize: 16,
  },
});
