import { View, Text } from 'react-native'
import React from 'react'
import MainProfile from '~/components/profile/main-profile'

export default function Page() {
  return (
    <View
      style={{ alignItems: 'center', backgroundColor: 'white', height: '100%' }}
    >
      <MainProfile />
    </View>
  )
}
