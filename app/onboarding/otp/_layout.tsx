import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'OTP Code Verification',
        headerShadowVisible: false,
        headerTransparent: true,
        headerTintColor: 'black',
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}
