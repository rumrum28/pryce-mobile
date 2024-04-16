import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '~/components/shop/header'
import Search from '~/components/shop/search'
import { SelectDemo, SelectDemoItem } from '~/components/shop/select'

export default function Page() {
  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: 'white' }}>
      <Header />
      <Search size="$4" />

      <SelectDemoItem />
    </View>
  )
}
