import { View, Text } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { ScrollView } from 'tamagui'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Details({ id }: { id: string }) {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', marginTop: 30, width: '100%' }}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: 'black',
          }}
        >
          Mobile Number
        </Text>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 16,
            color: colorTokens.light.gray.gray9,
          }}
        >
          09123456901
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>Address</Text>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 16,
            color: colorTokens.light.gray.gray9,
          }}
        >
          590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
          Capital
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Email</Text>
          <TouchableOpacity>
            <Feather
              name="edit"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 16,
            color: colorTokens.light.gray.gray9,
          }}
        >
          juandelacruz@gmail.com
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Password</Text>
          <TouchableOpacity>
            <Feather
              name="edit"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 16,
            color: colorTokens.light.gray.gray9,
          }}
        >
          ********
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>Save Addresses</Text>
          <TouchableOpacity>
            <Feather
              name="chevron-right"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>
            Transaction History
          </Text>
          <TouchableOpacity>
            <Feather
              name="chevron-right"
              size={20}
              color={colorTokens.light.orange.orange9}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          marginBottom: 20,
          marginTop: 90,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 50,
        }}
      >
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>
            Log Out
          </Text>
        </View>
      </View>
    </View>
  )
}
