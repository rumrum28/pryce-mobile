import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'User Profile',
        headerShadowVisible: false,
        headerTransparent: true,
        headerTintColor: 'black',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}
