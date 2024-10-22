import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Text, View } from 'tamagui'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import usePryceStore from '~/hooks/pryceStore'
import { FavoriteProps, ProductSingle } from '~/types/product' // Ensure this type is correct
import {
  exemptedOnProducts,
  productDisplay,
  ProductsDetail,
} from '~/utils/products'
import { formatCurrency } from '~/utils/utils'
import Skeleton from '../skeleton'
import * as Haptics from 'expo-haptics'

export default function FavoritesList({
  favorites,
  data,
}: {
  favorites: FavoriteProps
  data: ProductSingle[]
}) {
  const { width } = Dimensions.get('window')

  const addToFavoritesHandler = async (productCode: string) => {
    const favorites = usePryceStore.getState().favorites
    const isFavorite = favorites.some((fav) => fav.productCode === productCode)

    usePryceStore.getState().setFavorites(productCode)

    const productName = data?.find((e) => e.ProductCode === productCode)?.Name

    if (isFavorite) {
      Alert.alert(
        'Removed from Favorites',
        `You have removed product ${productName || 'Unknown Product'} from your favourites.`
      )
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    } else {
      Alert.alert(
        'Added to Favorites',
        `You have added product ${productName || 'Unknown Product'} to your favourites.`
      )
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    const matchedDisplay = productDisplay.find((displayItem) =>
      displayItem.productCode.includes(item.ProductCode)
    )
    return (
      <TouchableOpacity
        style={{ marginBottom: 10, marginTop: 20, marginHorizontal: 15 }}
      >
        <View style={{ marginBottom: 15 }}>
          <Image
            source={
              ProductsDetail.find((p) => p.id === item.ProductCode)?.image
            }
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
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.ProductCode}`}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  )
}
