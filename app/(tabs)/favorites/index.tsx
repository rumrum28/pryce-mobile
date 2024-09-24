import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import FavoritesList from '~/components/favorites_list'

export default function Page() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <FavoritesList />
    </SafeAreaView>
  )
}
