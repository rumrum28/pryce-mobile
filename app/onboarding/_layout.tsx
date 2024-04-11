import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

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
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  )
}
