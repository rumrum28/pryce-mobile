import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { formatCurrency } from '~/utils/utils'

export default function Products() {
  const { products, uri } = useLocalSearchParams<{
    products: string
    uri: string
    // price: string
  }>()

  // const formattedPrice = formatCurrency(Number(price))

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        source={{
          uri: uri,
        }}
        style={{ width: '100%', height: 250 }}
        resizeMode="contain"
      />
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{products}</Text>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {formattedPrice}
        </Text> */}
      </View>
    </View>
  )
}
