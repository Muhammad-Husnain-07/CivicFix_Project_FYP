import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useNavigation} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [token, setToken] = useState(null);
  const [isAppReady, setAppReady] = useState(false);

  // Load access token and mark app as ready
  useEffect(() => {
    const initializeApp = async () => {
      const token = await AsyncStorage.getItem('access_token');
      setToken(token);
      setAppReady(true);
    };
    initializeApp();
  }, []);

  // Hide splash screen once app is ready
  useEffect(() => {
    if (loaded && isAppReady) {
      SplashScreen.hideAsync();
      navigation.reset({index: 0, routes: [{name: token ? '(drawer)' : 'index'}]});
    }
  }, [loaded, isAppReady]);

  // Show nothing until app is fully ready
  if (!loaded || !isAppReady) {
    return null;
  }

  // Conditionally render navigators based on token presence
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(drawer)" options={{headerShown: false}} />
        <Stack.Screen name="(complaint)" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
