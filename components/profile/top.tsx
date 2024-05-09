import { View, Text } from 'tamagui'
import React from 'react'
import { Pressable } from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'

export default function Top() {
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingTop: 30,
        flexDirection: 'column',
      }}
    >
      <View>
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 5 }}>
          Juan Dela Cruz
        </Text>
      </View>
      <View>
        <Text style={{ color: 'white', fontSize: 18 }}>09123654789</Text>
      </View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/(tabs)/profile/user/[id]',
            params: { id: 1 },
          })
        }
      >
        <Text style={{ color: colorTokens.light.orange.orange11 }}>
          View Account
        </Text>
      </Pressable>
    </View>
  )
}
