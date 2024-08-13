import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'

import { Button, View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import { ProductSingle, ProductsProps } from '~/types/product'
import { exemptedOnProducts, ProductsDetail } from '~/utils/products'
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
    // console.log(products)
  }, [products])

  const productOnClickHandler = (product: ProductSingle) => {
    router.push({
      pathname: '/(drawer)/shop/(modal)/item_details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  return (
    <View style={{ flex: 1, padding: 30, gap: 28 }}>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <React.Fragment key={index + 28}>
            {exemptedOnProducts.some(
              (e) => e === product.ProductCode
            ) ? null : (
              <View
                style={{
                  height: 150,
                  width: '100%',
                  backgroundColor: 'white',
                  elevation: 0.3,
                  // shadowColor: 'black',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 4,
                  // },
                  // shadowOpacity: 0.06,
                  overflow: 'hidden',
                  borderRadius: 28,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor: 'white',
                    // elevation: 1,
                    // borderRadius: 10,
                  }}
                  onPress={() => productOnClickHandler(product)}
                >
                  <Image
                    source={
                      ProductsDetail.find((p) => p.id === product.ProductCode)
                        ?.image
                    }
                    style={{
                      height: '100%',
                      width: 'auto',
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flex: 1,
                    backgroundColor: 'white',
                    elevation: 1,
                    borderRadius: 14,
                  }}
                >
                  <Text
                    onPress={() => productOnClickHandler(product)}
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      paddingVertical: 5,
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {product.Name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{}}>
                      {product.UnitPrice < product.RegularPrice ? (
                        <>
                          <Text
                            style={{
                              color: colorTokens.light.gray.gray10,
                              paddingVertical: 2,
                              textDecorationLine: 'line-through',
                            }}
                          >
                            {formatCurrency(product.RegularPrice)}
                          </Text>
                          <Text
                            style={{
                              color: '#FF4500',
                              paddingVertical: 2,
                            }}
                          >
                            {formatCurrency(product.UnitPrice)}
                          </Text>
                        </>
                      ) : (
                        <Text
                          style={{
                            color: '#FF4500',
                            paddingVertical: 2,
                          }}
                        >
                          {formatCurrency(product.RegularPrice)}
                        </Text>
                      )}
                    </View>

                    {favorites &&
                    favorites.find(
                      (fav) => fav.productCode === product.ProductCode
                    ) ? (
                      <Button onPress={() => addToFavoritesHandler(product)}>
                        <Ionicons name="star" size={20} color="orangered" />
                      </Button>
                    ) : (
                      <Button onPress={() => addToFavoritesHandler(product)}>
                        <Ionicons
                          name="star-outline"
                          size={20}
                          color="orange"
                        />
                      </Button>
                    )}
                  </View>
                </View>
              </View>
            )}
          </React.Fragment>
        ))}
    </View>
  )
}
