import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { useNavigation } from "expo-router";

export default function MainScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Stack.Screen options={{ title: "Welcome" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">CivicFix</ThemedText>
          <ThemedView style={styles.linkContainer}>
            <Link href="/" style={styles.link}>
              <ThemedButton title="Login" onPress={() => {
               navigation.navigate('(auth)')
                }} />
            </Link>
          </ThemedView>
          <ThemedView style={styles.linkContainer}>
            <Link href="/" style={styles.link}>
              <ThemedButton title="Register" />
            </Link>
          </ThemedView>
        </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  link: {
    width: "100%",
    marginTop: 15,
  },
});
