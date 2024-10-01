import { View, Text } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'

export default function DeliveryInfo() {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ color: colorTokens.light.gray.gray9 }}>
        Estimated Delivery
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        21 Sept 2024 / 13:30PM
      </Text>
    </View>
  )
}
