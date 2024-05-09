import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'

export default function CheckoutItem() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Delivery Address
        </Text>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={24}
          color={colorTokens.light.orange.orange9}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderColor: colorTokens.light.gray.gray5,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 30,
        }}
      >
        <Text>
          590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
          Capital Region, National Capital Region
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Payment Method</Text>
        <Link href={'/(drawer)/shop/(modal)/paymentMethod'} asChild>
          {/* <TouchableOpacity> */}
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={colorTokens.light.orange.orange9}
          />
          {/* </TouchableOpacity> */}
        </Link>
      </View>
      <View
        style={{
          padding: 10,
          borderColor: colorTokens.light.gray.gray5,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 30,
        }}
      >
        <Text>
          590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
          Capital Region, National Capital Region
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Summary</Text>
      </View>
    </View>
  )
}
