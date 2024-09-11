import React from 'react'
import { Text, View } from 'react-native'

export default function OrdersPage({ id }: { id: string }) {
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}
