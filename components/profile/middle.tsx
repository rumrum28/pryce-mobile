import { View, Text, Avatar } from 'tamagui'
import { Image } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'

export default function Middle() {
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <View
          style={{
            elevation: 5,
            borderRadius: 20,
            top: 40,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          }}
        >
          <Image
            source={require('~/assets/card-background.png')}
            style={{
              width: 300,
              height: 200,
              borderRadius: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{ whiteSpace: 'nowrap', position: 'absolute', bottom: -15 }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>
            ABCD-1234-56789012
          </Text>
          <Text style={{ fontSize: 14, color: 'white' }}>Juan Dela Cruz</Text>
          <Text style={{ fontSize: 14, color: 'white', width: 270 }}>
            590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
            Capital
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 24,
            color: colorTokens.light.orange.orange9,
            fontWeight: 'bold',
            marginTop: 60,
          }}
        >
          Juan Dela Cruz
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'white',
            backgroundColor: colorTokens.light.orange.orange8,
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 50,
            marginTop: 10,
          }}
        >
          ABCD-1234-56789012
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: 'red',
            borderRadius: 50,
            marginTop: 5,
          }}
        >
          Expiration 2025-02-05
        </Text>
      </View>
    </View>
  )
}
