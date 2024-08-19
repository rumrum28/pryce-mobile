import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { Text, View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import { Profile } from '~/types/userStorage'

export default function NonePgcmCheckoutAlert() {
  const users = usePryceStore((state) => state.users)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const [user, setUsers] = useState<Profile | undefined>(undefined)
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (selectedUser) {
      const findUser = users.find((e) => e.Account_Number__c === selectedUser)
      setUsers(findUser)
    }
  }, [users, selectedUser])

  return (
    <View width={width} p={8} alignItems="center">
      {user && user.Prycegas_Club_Member__c ? (
        <></>
      ) : (
        <Text>
          <Text color="red" fontSize={16}>
            Delivery Notice:{' '}
          </Text>
          <Text>
            As part of our new policy, our delivery services are only available
            to Prycegas Club Members.
          </Text>
        </Text>
      )}
    </View>
  )
}
