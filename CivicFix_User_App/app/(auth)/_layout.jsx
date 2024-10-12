import {Stack} from 'expo-router';
import 'react-native-reanimated';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" options={{headerShown: false}} />
      <Stack.Screen name="register" options={{headerShown: false}} />
      <Stack.Screen name="user_info" options={{headerShown: true , title: 'User Details'}} />
    </Stack>
  );
}
