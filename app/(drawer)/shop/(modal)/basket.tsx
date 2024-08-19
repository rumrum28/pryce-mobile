import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native'
import { useEffect, useState } from 'react'
import { formatCurrency } from '~/utils/utils'
import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableRow from '~/components/swipeable_row'
import StyledButton from '~/components/styled_button'
import useCartStore from '~/hooks/productsStore'
import usePryceStore from '~/hooks/pryceStore'
import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { Image, Spinner, YStack } from 'tamagui'
import { ProductSingle } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import NonePgcmCheckoutAlert from '~/components/none_pgcm_checkout_alert'

export default function Basket() {
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const addressRef = usePryceStore((set) => set.addressRef)
  const [subTotal, setSubTotal] = useState<number>(0)
  const { width } = useWindowDimensions()

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

  function calculateSubtotal(
    cart: Array<{
      productCode: string
      quantity: number
    }>,
    products: ProductSingle[]
  ) {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.ProductCode === item.productCode)
      if (product) {
        return total + product?.RegularPrice * item.quantity
      } else {
        console.warn(`Product with code ${item.productCode} not found.`)
        return total
      }
    }, 0)
  }

  useEffect(() => {
    if (!fetchProducts.isPending && fetchProducts.data) {
      const subtotal = calculateSubtotal(cart, fetchProducts.data)
      setSubTotal(subtotal)
    }
  }, [fetchProducts.isPending, fetchProducts.data, cart])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 150 }}>
      {fetchProducts.isPending && (
        <>
          <YStack padding="$3" gap="$4" alignItems="center" marginTop={20}>
            <Spinner size="large" color="$orange10" />
          </YStack>
        </>
      )}

      {cart.length > 0 ? (
        <>
          {!fetchProducts.isPending && (
            <>
              <FlatList
                data={cart}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colorTokens.light.gray.gray5,
                      marginHorizontal: 15,
                    }}
                  />
                )}
                ListHeaderComponent={
                  <View style={{ paddingHorizontal: 15 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginVertical: 16,
                        }}
                      >
                        Order Summary
                      </Text>
                      <Link href={'/'} asChild>
                        <TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: colorTokens.light.orange.orange9,
                            }}
                          >
                            Add Items
                          </Text>
                        </TouchableOpacity>
                      </Link>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colorTokens.light.gray.gray5,
                      }}
                    ></View>
                  </View>
                }
                renderItem={({ item }) => {
                  const perPrice =
                    fetchProducts.data &&
                    fetchProducts.data.find(
                      (e) => e.ProductCode === item.productCode
                    )?.RegularPrice

                  return (
                    <SwipeableRow
                      onDelete={() => removeProduct(item.productCode)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 15,
                          gap: 20,
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 10,
                          }}
                        >
                          <View
                            style={{
                              width: 50,
                              height: 50,
                            }}
                          >
                            <Image
                              source={
                                ProductsDetail.find(
                                  (pd) => pd.id === item.productCode
                                )?.image
                              }
                              style={{
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </View>

                          <View>
                            <Text style={{ fontSize: 16, paddingBottom: 8 }}>
                              {fetchProducts.data &&
                                fetchProducts.data.find(
                                  (e) => e.ProductCode === item.productCode
                                )?.Name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: colorTokens.light.orange.orange9,
                                fontWeight: '600',
                              }}
                            >
                              {item.quantity}x
                            </Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: 16 }}>
                          {formatCurrency(Number(perPrice))}
                        </Text>
                      </View>
                    </SwipeableRow>
                  )
                }}
                ListFooterComponent={
                  <View style={{ paddingHorizontal: 15 }}>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colorTokens.light.gray.gray5,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={{ color: colorTokens.light.gray.gray9 }}>
                        Subtotal
                      </Text>
                      <Text>{formatCurrency(subTotal)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={{ color: colorTokens.light.gray.gray9 }}>
                        Delivery Fee
                      </Text>
                      <Text>Free</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text style={{ color: colorTokens.light.gray.gray9 }}>
                        Order Total
                      </Text>
                      <Text>{formatCurrency(subTotal)}</Text>
                    </View>
                  </View>
                }
              />
              <NonePgcmCheckoutAlert />

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
                <SafeAreaView
                  style={{ backgroundColor: 'white', paddingHorizontal: 10 }}
                  edges={['bottom']}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      <Text>{formatCurrency(subTotal)}</Text>
                    </Text>
                  </View>
                  <Link href="/(drawer)/shop/(modal)/checkoutItem" asChild>
                    <StyledButton>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                      >
                        Review payment and address
                      </Text>
                    </StyledButton>
                  </Link>
                </SafeAreaView>
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <View>
            <Text>Please add item to your carts </Text>
          </View>
        </>
      )}
    </View>
  )
}
