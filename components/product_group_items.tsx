import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { Image, Text, View } from 'tamagui'
import { ProductDisplayProps } from '~/types/product'

export const ProductGroupItems = ({ item }: { item: ProductDisplayProps }) => {
  console.log(item)

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/(drawer)/shop/details',
          params: {
            productCode: item.productCode,
          },
        })
      }
      key={item.id}
    >
      <View
        style={{
          height: 230,
          width: 300,
          backgroundColor: 'white',
          marginEnd: 10,
          elevation: 2,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.06,
          borderRadius: 4,
        }}
      >
        {/* <Image
          source={item.image}
          style={{ height: '100%', width: '100%', flex: 5 }}
          resizeMode="stretch"
        /> */}

        <View style={{ flex: 2, padding: 10 }}>
          <Text
            style={{
              color: colorTokens.light.gray.gray9,
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
