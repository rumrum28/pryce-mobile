import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Header from '~/components/header'
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
          header: () => <Header />,
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colorTokens.light.orange.orange9,
          },
        }}
      />

      <Stack.Screen
        name="category/[category]"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="products/[products]"
        options={{ headerShown: true, headerTitle: '' }}
      />
      <Stack.Screen
        name="(modal)/address"
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Add New Address',
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
        name="(modal)/item_details"
        options={{
          presentation: 'modal',
          headerTitle: '',
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
      />
      <Stack.Screen
        name="(modal)/basket"
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Cart',
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
          headerTitle: 'Checkout',
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
          headerTitle: 'Select a payment method',
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
