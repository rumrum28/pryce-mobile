import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'

export default function Page() {
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setAddressRef = usePryceStore((set) => set.setAddressRef)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)

  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}
    >
      <Text style={{ marginBottom: 30 }}>Account</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedUser(null)
          setToken('')
          setUsers([])
          setEmail('')
          setChangeAddressTrigger(false)
          setAddressRef('')
          router.push('/onboarding/login')
        }}
      >
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}
