import { View, Text } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { colorTokens } from '@tamagui/themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'

export default function CustomDrawer(props: any) {
  const { bottom } = useSafeAreaInsets()
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setAddressRef = usePryceStore((set) => set.setAddressRef)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)

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
        <DrawerItem
          label={'Logout'}
          onPress={() => {
            setSelectedUser(null)
            setToken('')
            setUsers([])
            setEmail('')
            setChangeAddressTrigger(false)
            setAddressRef('')
            router.push('/onboarding/login')
          }}
        />
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
