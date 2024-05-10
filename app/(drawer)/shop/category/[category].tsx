import { View, Text } from 'tamagui'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { allProducts } from '~/data/mock'
import Products from '~/components/shop/products/products'
import { ScrollView } from 'react-native'

export default function Page() {
  const { category } = useLocalSearchParams<{ category: string }>()

  const filteredItems = allProducts.filter((item) => item.category === category)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 10,
      }}
    >
      <Stack.Screen
        options={{
          title: category,
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ProductDetails products={filteredItems} /> */}
      </ScrollView>
    </View>
  )
}
