import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign } from '@expo/vector-icons'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { colorTokens } from '@tamagui/themes'

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopColor: colorTokens.light.orange.orange9,
          borderLeftColor: colorTokens.light.orange.orange9,
          borderRightColor: colorTokens.light.orange.orange9,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="list"
                size={24}
                color={
                  focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6
                }
              />
              <Text
                style={{
                  color: focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6,
                  fontSize: 12,
                }}
              >
                SHOP
              </Text>
            </View>
          ),
          tabBarLabel: 'Shop',
          headerTitle: 'Shop',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="shopping-cart"
                size={24}
                color={
                  focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6
                }
              />
              <Text
                style={{
                  color: focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6,
                  fontSize: 12,
                }}
              >
                ORDERS
              </Text>
            </View>
          ),
          tabBarLabel: 'Orders',
          headerTitle: 'Orders',
        }}
      />
      <Tabs.Screen
        name="pgc"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="credit-card"
                size={24}
                color={
                  focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6
                }
              />
              <Text
                style={{
                  color: focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6,
                  fontSize: 12,
                }}
              >
                PGC
              </Text>
            </View>
          ),
          tabBarLabel: 'PGC',
          headerTitle: 'PGC',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="user"
                size={24}
                color={
                  focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6
                }
              />
              <Text
                style={{
                  color: focused
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.orange.orange6,
                  fontSize: 12,
                }}
              >
                ACCOUNT
              </Text>
            </View>
          ),
          tabBarLabel: 'Profile',
          headerTitle: 'Profile',
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
