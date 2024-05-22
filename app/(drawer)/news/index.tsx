import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function Page() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <Text>Page</Text>
    </SafeAreaView>
  )
}
