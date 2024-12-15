import { Stack, useRouter } from "expo-router";
import { Pressable, Text, StyleSheet, View } from "react-native";

export default function RootLayout() {
  
  return <Stack>
    <Stack.Screen name="index"
    />
    <Stack.Screen
      name="modal"
      options={{
        presentation: 'modal',
        headerShown: false
      }}
    />
  </Stack>
}

const styles = StyleSheet.create({
  plus: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'blue',
    fontSize: 55,
  },
});
