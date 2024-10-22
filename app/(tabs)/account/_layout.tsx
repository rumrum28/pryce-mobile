import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router, Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import Header from '~/components/header'
import { Ionicons, Octicons } from '@expo/vector-icons'

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
          title: 'Account',
        }}
      />
      <Stack.Screen
        name="membership/index"
        options={{
          title: 'Prycegas Club',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 3,
              }}
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

      {/* <Stack.Screen
        name="pgc-membership/index"
        options={{
          title: '',
          presentation: 'fullScreenModal',
          headerShown: true,
          headerShadowVisible: false,
          headerTintColor: '#fff',
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
          headerTransparent: true,
        }}
      /> */}
    </Stack>
  )
}
