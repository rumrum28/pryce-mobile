import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { Ionicons, AntDesign } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: 'black',
        headerShadowVisible: false,
      }}
    >
      {/* <Stack.Screen
        name="(tabs)/home/details"
        options={{
          presentation: 'fullScreenModal',
          title: 'Add New Address',
          headerStyle: {
            backgroundColor: colorTokens.light.gray.gray3,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back()
              }}
            >
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      /> */}

      {/* <Stack.Screen
        name="(modal)/address"
        options={{
          presentation: 'fullScreenModal',
          title: 'Add New Address',
          headerStyle: {
            backgroundColor: colorTokens.light.gray.gray3,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back()
              }}
            >
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/basket"
        options={{
          title: 'My Cart',
          // presentation: 'fullScreenModal',
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
      <Stack.Screen
        name="(modal)/checkoutItem"
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
      <Stack.Screen
        name="(modal)/paymentMethod"
        options={{
          presentation: 'fullScreenModal',
          title: 'Select a payment method',
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
      /> */}
    </Stack>
  )
}
