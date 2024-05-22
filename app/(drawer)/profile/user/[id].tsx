import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import MainProfile from '~/components/profile/main-profile'
import Details from '~/components/profile/details'
import { ScrollView } from 'tamagui'
import { useLocalSearchParams } from 'expo-router'

export default function Page() {
  const { id } = useLocalSearchParams<{
    id: string
    subtitles: string
  }>()
  const { width } = useWindowDimensions()
  return (
    <View
      style={{
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ScrollView style={{ width: width * 1 }}>
        <MainProfile />
        <Details id={id} />
      </ScrollView>
    </View>
  )
}
