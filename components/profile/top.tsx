import { View, Text } from 'tamagui'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Top() {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <View>
        <Text style={{ color: 'white', fontSize: 20 }}>Juan Dela Cruz</Text>
      </View>
      <View>
        <Text style={{ color: 'white' }}>09123654789</Text>
      </View>
    </View>
  )
}
