import {Stack} from 'expo-router';
import 'react-native-reanimated';

export default function ComplaintLayout() {
  return (
    <Stack>
      <Stack.Screen name="camera" options={{headerShown: false}} />
      <Stack.Screen name="complaint_form" options={{headerShown: true, title: ''}} />
      <Stack.Screen name="view_complaint" options={{headerShown: true, title: 'View Complaint'}} />
    </Stack>
  );
}
