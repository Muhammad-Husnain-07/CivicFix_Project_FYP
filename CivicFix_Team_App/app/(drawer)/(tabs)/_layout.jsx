import {Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {SocketURL} from '@/utils/baseURL';
import * as Notifications from 'expo-notifications';
import {getData} from '@/hooks/useLocalStorage';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect( () => {
    let ws;

    const requestPermissionAndConnectWS = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        ws = new WebSocket(SocketURL);

        ws.onopen = () => {
          console.log('WebSocket connected');
        };

        ws.onmessage = async (event) => {
          try {
            const data = JSON.parse(event.data)?.message;

            const user = await getData('user_data')?.then(res => JSON.parse(res)); // Ensure this returns parsed JSON

            if (!data || !(data?.team_id === user?.team_id)) {
              return;
            }

            await Notifications.scheduleNotificationAsync({
              content: {
                title: data?.title ?? 'New Notification',
                body: data?.body ?? 'You have a new notification.',
              },
              trigger: null,
            });
          } catch (error) {
            console.log('Error processing WebSocket message:', error);
          }
        };

        ws.onerror = (err) => {
          console.log('WebSocket error:', err.message);
        };
      }
    };

    requestPermissionAndConnectWS();

    return () => {
      if (ws) {
        console.log('Closing WebSocket');
        ws.close();
      }
    };
  }, []);
 
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Complaints',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
