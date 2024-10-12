import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import {ThemedView} from '@/components/ThemedView';
import ThemedIcon from '@/components/ThemedIcon';
import {ThemedText} from '@/components/ThemedText';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme.web';
import {useNavigation} from 'expo-router';
import {DrawerActions} from '@react-navigation/native';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer
        screenOptions={{
          headerTintColor: Colors[colorScheme ?? 'light'].tint,
          header: () => <Header />,
        }}
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
      <ThemedIcon name={'add'} onPress={() => {}} style={{marginRight: 10}} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 16,
  },
});
