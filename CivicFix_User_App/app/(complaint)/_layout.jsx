import {Stack} from 'expo-router';
import 'react-native-reanimated';

export default function ComplaintLayout() {
  return (
    <Stack initialRouteName="camera" screenOptions={{headerShown: false}}>
      <Stack.Screen name="camera" options={{headerShown: false}} />
      <Stack.Screen name="complaint_details" options={{headerShown: true , title: 'Complaint Details'}} />
    </Stack>
  );
}
