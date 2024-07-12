import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Button } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import { ProductSingle, ProductsProps } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import { formatCurrency } from '~/utils/utils'

export default function AllProducts({
  products,
}: {
  products: ProductsProps | undefined
}) {
  const favorites = usePryceStore((set) => set.favorites)
  const setFavorites = usePryceStore((set) => set.setFavorites)

  const addToFavoritesHandler = async (f: ProductSingle) => {
    setFavorites(f.ProductCode)
  }

  useEffect(() => {
    //remove after verifying
    // console.log(favorites)
  }, [favorites])

  const productOnClickHandler = (product: ProductSingle) => {
    // router.push({
    //   pathname: '/(drawer)/shop/details',
    //   params: {
    //     productCode: product.ProductCode,
    //   },
    // })
    router.push({
      pathname: '/(drawer)/shop/(modal)/item_details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  return (
    <View style={{ flex: 1, padding: 15 }}>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <View
            key={index}
            style={{
              height: 300,
              width: 'auto',
              backgroundColor: 'white',
              marginVertical: 10,
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
            <TouchableOpacity
              style={{ flex: 1, width: '100%', height: '100%' }}
              onPress={() => productOnClickHandler(product)}
            >
              <Image
                source={
                  ProductsDetail.find((p) => p.id === product.ProductCode)
                    ?.image
                }
                style={{
                  height: 200,
                  width: 200,

                  flex: 1,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={{ flex: 2, padding: 10 }}>
              <Text
                onPress={() => productOnClickHandler(product)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingVertical: 5,
                }}
              >
                {product.Name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    color: colorTokens.light.gray.gray12,
                    paddingVertical: 2,
                  }}
                >
                  {formatCurrency(product.RegularPrice)}
                </Text>

                {favorites &&
                favorites.find(
                  (fav) => fav.productCode === product.ProductCode
                ) ? (
                  <Button onPress={() => addToFavoritesHandler(product)}>
                    <Ionicons name="star" size={26} color="orangered" />
                  </Button>
                ) : (
                  <Button onPress={() => addToFavoritesHandler(product)}>
                    <Ionicons name="star-outline" size={26} color="orange" />
                  </Button>
                )}
              </View>
            </View>
          </View>
        ))}
    </View>
  )
}
