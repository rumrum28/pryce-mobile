import { View, Text } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { ScrollView } from 'tamagui'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Bottom() {
  return (
    <View style={{ alignItems: 'center', marginTop: 30 }}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colorTokens.light.gray.gray9,
          }}
        >
          Mobile Number
        </Text>
        <Text style={{ paddingTop: 5 }}>09123456901</Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: '90%',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: colorTokens.light.gray.gray9 }}>
          Address
        </Text>
        <Text style={{ paddingTop: 5 }}>
          590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
          Capital
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: '90%',
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, color: colorTokens.light.gray.gray9 }}>
            Email
          </Text>
          <TouchableOpacity>
            <Feather
              name="edit"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ paddingTop: 5 }}>juandelacruz@gmail.com</Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: '90%',
          marginBottom: 20,
          paddingBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, color: colorTokens.light.gray.gray9 }}>
            Password
          </Text>
          <TouchableOpacity>
            <Feather
              name="edit"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ paddingTop: 5 }}>********</Text>
      </View>
    </View>
  )
}
