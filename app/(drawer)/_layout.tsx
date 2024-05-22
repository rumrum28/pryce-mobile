import { View, Text } from 'react-native'
import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'
import CustomDrawer from '~/components/custom_drawer'

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawer}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: colorTokens.light.orange.orange5,
          drawerActiveTintColor: colorTokens.light.orange.orange9,
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="shop"
          options={{
            headerShown: false,
            drawerLabel: 'Shop',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="news/index"
          options={{
            drawerLabel: 'News',
            headerTitle: 'News',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            headerTitle: 'Profile',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
