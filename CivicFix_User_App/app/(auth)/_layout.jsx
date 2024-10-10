import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';


export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack>
        <Stack.Screen name="login" options={{headerShown: false}} />
      </Stack>
  );
}
