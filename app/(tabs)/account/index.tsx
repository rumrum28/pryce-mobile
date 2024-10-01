import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'
import UserDetails from '~/components/account/user_details'
import { Profile } from '~/types/userStorage'

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
    console.log('findUser:', findUser)
  }, [selectedUser])

  // console.log(users)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
      }}
    >
      <View>
        <UserDetails userDetails={userDetails} />
      </View>

      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  )
}
