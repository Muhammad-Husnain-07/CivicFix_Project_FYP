import {Stack} from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" options={{headerShown: false}} />
    </Stack>
  );
}
