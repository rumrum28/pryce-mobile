import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'

import { Button, View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import {
  ProductDisplayProps,
  ProductSingle,
  ProductsProps,
} from '~/types/product'

import {
  exemptedOnProducts,
  productDisplay,
  ProductsDetail,
} from '~/utils/products'
import { formatCurrency } from '~/utils/utils'

export default function AllProducts({
  products,
}: {
  products: ProductsProps | undefined
}) {
  const favorites = usePryceStore((set) => set.favorites)
  const setFavorites = usePryceStore((set) => set.setFavorites)
  const { width, height } = Dimensions.get('window')
  const addToFavoritesHandler = async (f: ProductSingle) => {
    setFavorites(f.ProductCode)
  }

  const productOnClickHandler = (product: ProductSingle) => {
    router.push({
      pathname: '/(modal)/item_details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  const renderItem = ({ item }: { item: any }) => {
    const matchedDisplay = productDisplay.find((displayItem) =>
      displayItem.productCode.includes(item.ProductCode)
    )

    return (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => productOnClickHandler(item)}
      >
        <View style={{ marginBottom: 15 }}>
          <Image
            source={
              ProductsDetail.find((p) => p.id === item.ProductCode)?.image
            }
            // source={item.image}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 30,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: width * 0.3,
              backgroundColor: '#fff',
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,

              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              shadowColor: 'black',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.06,
            }}
          >
            <View>
              <View style={{}}>
                {item.UnitPrice < item.RegularPrice ? (
                  <>
                    <Text
                      style={{
                        color: colorTokens.light.gray.gray10,
                        paddingVertical: 2,
                        textDecorationLine: 'line-through',
                        fontSize: 12,
                      }}
                    >
                      {formatCurrency(item.RegularPrice)}
                    </Text>
                    <Text
                      style={{
                        color: '#FF4500',
                        paddingVertical: 2,
                      }}
                    >
                      {formatCurrency(item.UnitPrice)}
                    </Text>
                  </>
                ) : (
                  <Text
                    style={{
                      color: '#FF4500',
                      paddingVertical: 2,
                    }}
                  >
                    {formatCurrency(item.RegularPrice)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', marginRight: 10 }}>
          {item.Name}
        </Text>

        <View
          style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}
        >
          <Feather
            name="star"
            size={18}
            color={colorTokens.light.orange.orange9}
            style={{
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 14, fontWeight: '400' }}>4.8</Text>
          <Entypo
            name="dot-single"
            size={18}
            color={colorTokens.light.gray.gray11}
          />

          {matchedDisplay ? (
            <Text key={item.Id}>{matchedDisplay.name}</Text>
          ) : null}
          {/* <Entypo
            name="dot-single"
            size={18}
            color={colorTokens.light.gray.gray11}
          /> */}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={
        products && products.length > 0
          ? products.filter(
              (product) =>
                !exemptedOnProducts.some((e) => e === product.ProductCode)
            )
          : []
      }
      keyExtractor={(item) => `${item.Id}`}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  )
}
