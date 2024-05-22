import { View, Text, Avatar } from 'tamagui'
import { Image } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function MainProfile() {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
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
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 16.0,
          }}
        >
          <Image
            source={require('~/assets/card-background.png')}
            style={{
              width: 300,
              height: 200,
              position: 'relative',

              borderRadius: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{ position: 'absolute', whiteSpace: 'nowrap', bottom: 35 }}
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
            marginTop: 20,
          }}
        >
          Juan Dela Cruz
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'white',
            backgroundColor: colorTokens.light.orange.orange9,
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
