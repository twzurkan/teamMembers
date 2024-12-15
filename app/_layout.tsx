import { Stack, useRouter } from "expo-router";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function RootLayout() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push({ pathname: '/modal', params: { isNew: 'true', item: null } });
  };
  
  return <Stack>
    <Stack.Screen name="index" options={{ title:'Team members',
          // header: () => (
          // <View style={{ backgroundColor: 'white', height: 80, padding: 20 }}>
          //   <Text style={{ color: 'black', fontSize: 20 }}>Team members</Text>
          // </View>
          // ),
          headerRight: () => (
          <Pressable style={styles.plus} onPress={() => handleNavigation()}>
            <Text style={styles.text}>+</Text>
          </Pressable>
          ),}}/>
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
