import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerTransparent: true,
        headerTintColor: 'white',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
