import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import Header from '~/components/header'
import { Octicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: 'black',
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Account',
          // header: () => <Header />,
          headerShown: true,
          // headerStyle: {
          //   backgroundColor: colorTokens.light.orange.orange9,
          // },

          headerRight: () => (
            <Link href="/(modal)/basket" asChild>
              <TouchableOpacity onPress={() => {}}>
                <Octicons name="gear" size={24} color="black" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}
