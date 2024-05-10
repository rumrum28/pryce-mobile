import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTintColor: 'black',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: '' }}
      />
      <Stack.Screen
        name="user/[id]"
        options={{
          headerTitle: 'User Profile',
          headerStyle: {
            backgroundColor: colorTokens.light.gray.gray3,
          },
        }}
      />
    </Stack>
  )
}
