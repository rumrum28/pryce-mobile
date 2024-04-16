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
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 90,
          shadowColor: '#7F5DF0',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
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
                PROFILE
              </Text>
            </View>
          ),
          tabBarLabel: 'Profile',
          headerTitle: 'Profile',
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
    </Tabs>
  )
}
