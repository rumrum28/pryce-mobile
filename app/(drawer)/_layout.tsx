import { View, Text } from 'react-native'
import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import CustomDrawer from '~/components/custom_drawer'

// function CustomDrawer(props: any) {
//   const router = useRouter()
//   const { top, bottom } = useSafeAreaInsets()
//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView {...props} scrollEnabled={false}>
//         <View style={{ padding: 20 }}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
//             Juan Dela Cruz
//           </Text>
//           <Text
//             style={{
//               fontSize: 16,
//               color: colorTokens.light.gray.gray11,
//               marginVertical: 2,
//             }}
//           >
//             PGC Id: MHQ1-12345-1231245
//           </Text>
//           <Text style={{ color: colorTokens.light.red.red9 }}>
//             Expiration 2025-02-05
//           </Text>
//         </View>
//         <DrawerItemList {...props} />
//         <DrawerItem label={'Logout'} onPress={() => router.replace('/')} />
//       </DrawerContentScrollView>
//       <View
//         style={{
//           borderTopColor: colorTokens.light.gray.gray5,
//           borderTopWidth: 1,
//           padding: 20,
//           paddingBottom: 20 + bottom,
//         }}
//       >
//         <Text>Footer</Text>
//       </View>
//     </View>
//   )
// }

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
