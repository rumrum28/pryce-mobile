import { AntDesign, Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'

import { Button, View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import * as Haptics from 'expo-haptics'

import {
  FavoritesList,
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

  const productOnClickHandler = (product: ProductSingle) => {
    router.push({
      pathname: '/shop/item_details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  const addToFavoritesHandler = async (f: string) => {
    const favorites = usePryceStore.getState().favorites
    const isFavorite = favorites.some((fav) => fav.productCode === f)

    usePryceStore.getState().setFavorites(f)

    const product = products?.find((p) => p.ProductCode === f)

    if (products) {
      if (isFavorite) {
        Alert.alert(
          'Removed from Favorites',
          `You have removed product ${product?.Name} from your favourites.`
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
      } else {
        Alert.alert(
          'Added to Favorites',
          `You have added product ${product?.Name} to your favourites.`
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }
    } else {
      console.warn('Product information is undefined')
    }
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

          <TouchableOpacity
            style={{ position: 'absolute', top: 0, right: 0, padding: 15 }}
            onPress={() => addToFavoritesHandler(String(item.ProductCode))}
          >
            {favorites &&
            favorites.find((fav) => fav.productCode === item.ProductCode) ? (
              <AntDesign name="heart" size={24} color="#fff" />
            ) : (
              <AntDesign name="hearto" size={24} color="#fff" />
            )}
          </TouchableOpacity>
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
