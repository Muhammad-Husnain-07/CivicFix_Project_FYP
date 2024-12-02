import {Stack} from 'expo-router';
import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedButton} from '@/components/ThemedButton';
import {useNavigation} from 'expo-router';

export default function MainScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Stack.Screen options={{title: 'Welcome'}} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">CivicFix</ThemedText>
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            title="Login"
            style={styles.buttonStyling}
            onPress={() => {
              navigation.navigate('(auth)', {
                screen: 'login',
              });
            }}
          />
        </ThemedView>
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            title="Register"
            style={styles.buttonStyling}
            onPress={() =>
              navigation.navigate('(auth)', {
                screen: 'register',
              })
            }
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: 5,
  },
  buttonStyling: {
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
