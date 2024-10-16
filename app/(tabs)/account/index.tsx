import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'
import UserDetails from '~/components/account/user_details'
import { Profile } from '~/types/userStorage'
import { colorTokens } from '@tamagui/themes'

export default function Page() {
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setAddressRef = usePryceStore((set) => set.setAddressRef)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)
  const users = usePryceStore((state) => state.users)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const [userDetails, setUserDetails] = useState<Profile | undefined>()

  useEffect(() => {
    const findUser = users.find((e) => e.Account_Number__c === selectedUser)

    setUserDetails(findUser)
  }, [selectedUser])

  return (
    <View style={styles.container}>
      <UserDetails userDetails={userDetails} />
      <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
        <TouchableOpacity
          style={styles.logoutBtn}
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
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    // paddingHorizontal: 15,
  },
  logoutBtn: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colorTokens.light.gray.gray9,
    borderRadius: 10,
  },
})
