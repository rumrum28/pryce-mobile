import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Stack, router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function _layout() {
  return (
    <SafeAreaProvider>
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
          name="register/index"
          options={{
            headerShown: true,
            headerTintColor: colorTokens.light.orange.orange9,
          }}
        />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login/otp/index"
          options={{
            headerShown: true,
            headerTintColor: colorTokens.light.orange.orange9,
          }}
        />
        <Stack.Screen
          name="login/otp/verify-otp/index"
          options={{
            headerShown: true,
            headerTintColor: colorTokens.light.orange.orange9,
          }}
        />
        <Stack.Screen
          name="login/password/index"
          options={{
            headerTintColor: colorTokens.light.orange.orange9,
            headerShown: true,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
