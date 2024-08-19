import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import MainProfile from '~/components/profile/main-profile'
import { ScrollView } from 'tamagui'
import { router, useLocalSearchParams } from 'expo-router'
import UserDetails from '~/components/user_details'

export default function Page() {
  const { productCode } = useLocalSearchParams<{
    productCode: string
    subtitles: string
  }>()

  const { width } = useWindowDimensions()

  if (!productCode) return router.push('shop')

  return (
    <View
      style={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ScrollView style={{ width: width * 1 }}>
        <MainProfile />
        <UserDetails productCode={productCode} />
      </ScrollView>
    </View>
  )
}
