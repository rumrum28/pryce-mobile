import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Text, View } from 'tamagui'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import usePryceStore from '~/hooks/pryceStore'
import { FavoriteProps } from '~/types/product' // Ensure this type is correct
import {
  exemptedOnProducts,
  productDisplay,
  ProductsDetail,
} from '~/utils/products'
import { formatCurrency } from '~/utils/utils'
import Skeleton from '../skeleton'

export default function FavoritesList({
  favorites,
}: {
  favorites: FavoriteProps
}) {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()
  const addressRef = usePryceStore((set) => set.addressRef)
  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [])

  const renderItem = ({ item }: { item: any }) => {
    const matchedDisplay = productDisplay.find((displayItem) =>
      displayItem.productCode.includes(item.ProductCode)
    )
    return (
      <TouchableOpacity style={{ marginBottom: 10, marginTop: 20 }}>
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
            // onPress={() => addToFavoritesHandler(String(item.productCode))}
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
    <View>
      {isPending ? (
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View>
              <Skeleton width={300} height={180} />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Skeleton width={150} height={20} />
            </View>
            <View style={{ marginRight: 10 }}>
              <Skeleton width={120} height={20} />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          {data && data.length > 0 ? (
            (() => {
              const filteredData = data.filter((product) =>
                favorites.some((fav) => fav.productCode === product.ProductCode)
              )
              return filteredData.length > 0 ? (
                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => `${item.ProductCode}`}
                  renderItem={renderItem}
                  scrollEnabled={false}
                />
              ) : (
                <View>
                  <Text>No favourites</Text>
                </View>
              )
            })()
          ) : (
            <View>
              <Text>No data available</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}
