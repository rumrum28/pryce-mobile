import { View, Text } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { useRouter } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function CustomDrawer(props: any) {
  const router = useRouter()
  const { top, bottom } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Juan Dela Cruz
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colorTokens.light.gray.gray11,
              marginVertical: 2,
            }}
          >
            PGC Id: MHQ1-12345-1231245
          </Text>
          <Text style={{ color: colorTokens.light.red.red9 }}>
            Expiration 2025-02-05
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label={'Logout'} onPress={() => router.replace('/')} />
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: colorTokens.light.gray.gray5,
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
        }}
      >
        <Text>Footer</Text>
      </View>
    </View>
  )
}
