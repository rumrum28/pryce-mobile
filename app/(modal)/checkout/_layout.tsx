import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: 'black',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          presentation: 'fullScreenModal',
          title: 'Checkout',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ backgroundColor: 'white', borderRadius: 20, padding: 3 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={colorTokens.light.orange.orange9}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}
