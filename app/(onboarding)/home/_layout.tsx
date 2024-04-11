import { AntDesign } from '@expo/vector-icons'
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
        headerTintColor: 'green',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: 'Login',
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          // headerLeft: () => (
          //   <AntDesign name="arrowleft" size={24} color="white" />
          // ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          headerTitle: 'Sign up',
          headerTintColor: 'white',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerShown: true,
          headerTitle: 'OTP Verification',
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="fill-profile"
        options={{
          headerShown: true,
          headerTitle: 'Fill Your Profile',
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  )
}
