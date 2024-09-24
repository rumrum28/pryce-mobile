import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '',
        headerTintColor: 'black',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: '' }} />
    </Stack>
  )
}
