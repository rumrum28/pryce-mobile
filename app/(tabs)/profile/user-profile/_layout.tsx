import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'User Profile',
        headerTransparent: true,
        headerTintColor: 'black',
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}
