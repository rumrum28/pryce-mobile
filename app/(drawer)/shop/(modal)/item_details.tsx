import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import usePryceStore from '~/hooks/pryceStore'
import { Button, Image, Spinner, Text, YStack } from 'tamagui'
import { exemptedOnProducts, ProductsDetail } from '~/utils/products'
import AddToCartButton from '~/components/add_to_cart_button'
import { formatCurrency } from '~/utils/utils'
import { ProductSingle } from '~/types/product'
import useCartStore from '~/hooks/productsStore'
import { useToastController } from '@tamagui/toast'

const AddOnsProductsRender = ({
  productCodeMap,
  realTimeProductData,
}: {
  productCodeMap: string[]
  realTimeProductData: ProductSingle[] | undefined
}) => {
  const cart = useCartStore((state) => state.cart)
  const addProduct = useCartStore((state) => state.addProduct)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const addOnAddQuantity = (e: string) => {
    const addProductToCart = {
      productCode: e,
      quantity: 1,
    }
    addProduct(addProductToCart)
  }

  const addOnMinusQuantity = (e: string) => {
    decreaseQuantity(e)
  }

  const removeProductFromCart = (e: string) => {
    removeProduct(e)
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <>
      {productCodeMap.map((e, index) => {
        const regularPrice = realTimeProductData
          ? realTimeProductData.find((fp) => fp.ProductCode === e)?.RegularPrice
          : 0
        const unitPrice = realTimeProductData
          ? realTimeProductData.find((fp) => fp.ProductCode === e)?.RegularPrice
          : 0

        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Image
                source={{
                  uri: ProductsDetail.find((pd) => pd.id === e)?.image,
                  width: 60,
                  height: 60,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    paddingRight: 5,
                  }}
                  numberOfLines={1}
                >
                  {ProductsDetail.find((pd) => pd.id === e)?.name}
                </Text>

                <View style={{ marginRight: 5 }}>
                  {unitPrice && regularPrice ? (
                    unitPrice < regularPrice ? (
                      <View>
                        <Text
                          style={{
                            color: colorTokens.light.gray.gray10,
                            paddingVertical: 2,
                            textDecorationLine: 'line-through',
                          }}
                        >
                          {formatCurrency(regularPrice)}
                        </Text>

                        <Text
                          style={{
                            color: colorTokens.light.orange.orange10,
                            paddingVertical: 2,
                          }}
                        >
                          {formatCurrency(unitPrice)}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={{
                          color: colorTokens.light.gray.gray12,
                          paddingVertical: 2,
                        }}
                      >
                        {formatCurrency(regularPrice)}
                      </Text>
                    )
                  ) : null}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFEAD3',
                padding: 5,
                borderRadius: 5,
              }}
            >
              {cart.length > 0 ? (
                <>
                  {cart.map((cf, i) => {
                    if (cf.productCode === e) {
                      if (cf.quantity === 1) {
                        return (
                          <React.Fragment key={i}>
                            <TouchableOpacity
                              onPress={() => removeProductFromCart(e)}
                              style={{
                                borderWidth: 1,
                                borderColor: '#FF4500',
                                borderRadius: 5,
                              }}
                            >
                              <Ionicons
                                name="remove"
                                size={20}
                                color={'orangered'}
                              />
                            </TouchableOpacity>

                            <Text
                              style={{ marginHorizontal: 10, color: '#460D04' }}
                            >
                              {cf.quantity}
                            </Text>
                          </React.Fragment>
                        )
                      } else {
                        return (
                          <React.Fragment key={i}>
                            <TouchableOpacity
                              onPress={() => addOnMinusQuantity(e)}
                              style={{
                                borderWidth: 1,
                                borderColor: '#FF4500',
                                borderRadius: 5,
                              }}
                            >
                              <Ionicons
                                name="remove"
                                size={20}
                                color={'orangered'}
                              />
                            </TouchableOpacity>

                            <Text
                              style={{ marginHorizontal: 10, color: '#460D04' }}
                            >
                              {cf.quantity}
                            </Text>
                          </React.Fragment>
                        )
                      }
                    }
                  })}
                </>
              ) : null}

              <TouchableOpacity
                onPress={() => addOnAddQuantity(e)}
                style={{
                  borderWidth: 1,
                  borderColor: '#FF4500',
                  borderRadius: 5,
                }}
              >
                <Ionicons name="add" size={20} color={'orangered'} />
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
    </>
  )
}

export default function ItemDetails() {
  const { productCode } = useLocalSearchParams()
  const [quantity, setQuantity] = useState(1)
  const addressRef = usePryceStore((set) => set.addressRef)
  const favorites = usePryceStore((set) => set.favorites)
  const setFavorites = usePryceStore((set) => set.setFavorites)
  const addProduct = useCartStore((state) => state.addProduct)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const clearCart = useCartStore((state) => state.clearCart)
  const cart = useCartStore((state) => state.cart)
  const toast = useToastController()

  const addToFavoritesHandler = async (f: string) => {
    setFavorites(f)
  }

  const fetchProducts = useMutation({
    mutationFn: fetchProductsQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })
    },
  })

  useEffect(() => {
    if (addressRef) {
      fetchProducts.mutate(addressRef)
    }
  }, [addressRef])

  const addToCart = (e: string) => {
    const addProductToCart = {
      productCode: e,
      quantity,
    }

    if (e === 'PGCM' || e === 'PGCMV') {
      clearCart()
    }

    const checkForPGCMOrder = cart.some(
      (e) => e.productCode === 'PGCM' || e.productCode === 'PGCMV'
    )

    if (checkForPGCMOrder) {
      toast.show('PGCM Order Found!', {
        message: 'You must clear your cart first before you can continue.',
        native: false,
      })
    } else {
      addProduct(addProductToCart)
    }

    router.back()
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom']}
    >
      {fetchProducts.isPending ? (
        <YStack padding="$3" gap="$4" alignItems="flex-end" marginTop={20}>
          <Spinner size="large" color="$orange10" />
        </YStack>
      ) : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Animated.Image
            source={ProductsDetail.find((e) => e.id === productCode)?.image}
            style={{ width: '100%', height: 300 }}
            entering={FadeIn.duration(400).delay(200)}
          />

          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Animated.Text
                entering={FadeInLeft.duration(400).delay(200)}
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}
              >
                {fetchProducts.data &&
                  fetchProducts.data.find((e) => e.ProductCode === productCode)
                    ?.Name}
              </Animated.Text>

              {favorites &&
              favorites.find((fav) => fav.productCode === productCode) ? (
                <Button
                  onPress={() => addToFavoritesHandler(String(productCode))}
                >
                  <Ionicons name="star" size={26} color="orangered" />
                </Button>
              ) : (
                <Button
                  onPress={() => addToFavoritesHandler(String(productCode))}
                >
                  <Ionicons name="star-outline" size={26} color="orange" />
                </Button>
              )}
            </View>

            <Animated.Text
              entering={FadeInLeft.duration(400).delay(400)}
              style={{
                fontSize: 16,
                marginBottom: 8,
                color: colorTokens.light.gray.gray11,
              }}
            >
              {ProductsDetail.find((e) => e.id === productCode)?.description}
            </Animated.Text>

            {productCode === 'PGCM' || productCode === 'PGCMV' ? null : (
              <>
                <Text mt={10}>Add-ons</Text>
                <AddOnsProductsRender
                  productCodeMap={exemptedOnProducts}
                  realTimeProductData={fetchProducts.data}
                />
              </>
            )}
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'white',
              padding: 10,
              elevation: 10,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <TouchableOpacity
                  onPress={() =>
                    quantity > 1
                      ? setQuantity(quantity - 1)
                      : removeProduct(String(productCode))
                  }
                  style={{
                    backgroundColor: colorTokens.light.orange.orange9,
                    borderRadius: 20,
                    padding: 3,
                  }}
                >
                  <AntDesign name="minus" size={24} color="white" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={{
                    backgroundColor: colorTokens.light.orange.orange9,
                    borderRadius: 20,
                    padding: 3,
                  }}
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <AddToCartButton
                addToCart={() => addToCart(String(productCode))}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
