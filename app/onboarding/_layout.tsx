import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Stack, router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

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
      <Stack.Screen
        name="login/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
