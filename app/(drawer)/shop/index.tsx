import { SafeAreaView, ScrollView, Text } from 'react-native'
import React from 'react'
import Products from '~/components/shop/products/products'
import Categories from '~/components/shop/category/categories'
import Carousel from '~/components/shop/carousel'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'

export default function Page() {
  return (
    <SafeAreaView
      style={{ top: 90, backgroundColor: colorTokens.light.gray.gray2 }}
    >
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Carousel />
        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          Your Favorite Products
        </Text>
        <Categories />
        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          Top picks in your neighborhood
        </Text>
        <Products />
        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          All products
        </Text>
        <AllProducts />
      </ScrollView>
    </SafeAreaView>
  )
}
