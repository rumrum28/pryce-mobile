import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import StyledButton from '~/components/styled_button'
import useCartStore from '~/hooks/productsStore'
import usePryceStore from '~/hooks/pryceStore'
import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { useEffect, useState } from 'react'
import { useToastController } from '@tamagui/toast'
import SwipeableRow from '~/components/swipeable_row'
import { Image, Label, Spinner, XStack, YStack } from 'tamagui'
import { formatCurrency } from '~/utils/utils'
import NonePgcmCheckoutAlert from '~/components/none_pgcm_checkout_alert'
import { ProductSingle } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import { PaymentMethod } from '~/components/payment_method'
import { env } from '~/types/env'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import useBasketStore from '~/utils/basketStore'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Skeleton from '~/components/skeleton'

type ProductProps = {
  ProductCode: string
  Id: string
  Product2Id: string
  RegularPrice: number
  Name: string
}

export default function CheckoutItem() {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()
  const { products, total, updateProducts, calculateTotal, reduceProduct } =
    useBasketStore()

  const cart = useCartStore((state) => state.cart)
  const addressRef = usePryceStore((set) => set.addressRef)
  const toast = useToastController()
  const [subTotal, setSubTotal] = useState<number>(0)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [paymentMethod, setPaymentMethod] = useState<string>('cash-on-delivery')
  const [loading, isLoading] = useState<boolean>(false)
  const token = usePryceStore((s) => s.token)

  // function calculateSubtotal(
  //   cart: Array<{
  //     productCode: string
  //     quantity: number
  //   }>,
  //   products: ProductSingle[]
  // ) {
  //   return cart.reduce((total, item) => {
  //     const product = products.find((p) => p.ProductCode === item.productCode)
  //     if (product) {
  //       return total + product?.RegularPrice * item.quantity
  //     } else {
  //       console.warn(`Product with code ${item.productCode} not found.`)
  //       return total
  //     }
  //   }, 0)
  // }

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    if (data) {
      updateProducts(data)
      calculateTotal()
    }
  }, [data, updateProducts, calculateTotal])

  // console.log('products in cart:', products)
  // console.log('total products', total)

  // useEffect(() => {
  //   if (!isPending && data) {
  //     const subtotal = calculateSubtotal(cart, data)
  //     setSubTotal(subtotal)
  //   }
  // }, [isPending, data, cart])

  const placeOrder = async () => {
    isLoading(true)
    if (products.length < 1)
      return toast.show('Something is wrong with your order!', {
        message: 'Please check your orders.',
        native: false,
      })

    if (!paymentMethod)
      return toast.show('Something is wrong with your order!', {
        message: 'Please select a payment method.',
        native: false,
      })

    const data = {
      payment_method: paymentMethod,
      line_items: [],
    } as any

    if (!isPending && data) {
      products.forEach((item) => {
        data.line_items.push({
          product_id: data.find(
            (e: ProductProps) => e.ProductCode === item.ProductCode
          )?.Id,
          product_area_code: data.find(
            (e: ProductProps) => e.ProductCode === item.ProductCode
          )?.Product2Id,
          amount: data.find(
            (e: ProductProps) => e.ProductCode === item.ProductCode
          )?.RegularPrice,
          currency: 'PHP',
          description: data.find(
            (e: ProductProps) => e.ProductCode === item.ProductCode
          )?.Name,
          images: [
            `https://prycegas.com/images/product-thumbs/${item.ProductCode}.png`,
          ],
          name: data.find(
            (e: ProductProps) => e.ProductCode === item.ProductCode
          )?.Name,
          quantity: item.quantity,
        })
      })

      try {
        const response = await fetch(
          `${env.EXPO_PUBLIC_LOCAL_URL}/api/order/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        )

        const placeOrderResponse: {
          success: boolean
          checkout_url: string
        } = await response.json()

        // if (placeOrderResponse.success) {
        //   router.push({
        //     pathname: 'checkout/paymongo_webview',
        //     params: {
        //       url: placeOrderResponse.checkout_url,
        //     },
        //   })
        // } else {
        //   return toast.show('Something is wrong with your order!', {
        //     message: 'Please check your orders.',
        //     native: false,
        //   })
        // }
      } catch (error) {
        console.log(error)
      } finally {
        isLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Delivery Address
        </Text>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={24}
          color={colorTokens.light.orange.orange9}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderColor: colorTokens.light.gray.gray5,
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 30,
          margin: 10,
        }}
      >
        <Text>
          590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City, National
          Capital Region, National Capital Region
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <FlatList
          data={products}
          scrollEnabled={false}
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
                    // marginVertical: 8,
                  }}
                >
                  Order Summary
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                {isPending ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 15,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{}}>
                      <Skeleton width={120} height={20} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Skeleton width={90} height={20} />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 15,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 16,
                          color: colorTokens.light.orange.orange9,
                          fontWeight: '600',
                        }}
                      >
                        {item.quantity}x{' '}
                      </Text>

                      <Text style={{ fontSize: 16 }}>
                        {data &&
                          data.find((e) => e.ProductCode === item.ProductCode)
                            ?.Name}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        color: colorTokens.light.orange.orange9,
                        fontWeight: '600',
                      }}
                    >
                      {formatCurrency(item.quantity * item.UnitPrice)}
                    </Text>
                  </View>
                )}
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
              />

              {isPending ? (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}
                  >
                    <View>
                      <Skeleton width={90} height={20} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Skeleton width={80} height={20} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}
                  >
                    <View>
                      <Skeleton width={110} height={20} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Skeleton width={90} height={20} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Skeleton width={120} height={20} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Skeleton width={100} height={20} />
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: colorTokens.light.gray.gray9,
                      }}
                    >
                      Subtotal
                    </Text>
                    <Text>{formatCurrency(total)}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: colorTokens.light.gray.gray9,
                      }}
                    >
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
                    <Text
                      style={{
                        color: colorTokens.light.gray.gray9,
                      }}
                    >
                      Order Total
                    </Text>
                    <Text>{formatCurrency(total)}</Text>
                  </View>
                </>
              )}
            </View>
          }
        />
      </ScrollView>
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
        <SafeAreaView style={{ backgroundColor: 'white' }} edges={['bottom']}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                padding: 8,
              }}
            >
              Total
            </Text>
            {isPending ? (
              <View>
                <Skeleton width={90} height={20} />
              </View>
            ) : (
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 8,
                }}
              >
                <Text>{formatCurrency(total)}</Text>
              </Text>
            )}
          </View>

          <StyledButton onPress={placeOrder}>
            {isPending ? (
              <Spinner size="large" color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 8,
                }}
              >
                Place order
              </Text>
            )}
          </StyledButton>
        </SafeAreaView>
      </View>

      {/* <YStack gap="$4" p={10}>
        <XStack ai="center" gap="$4">
          <Label
            htmlFor="select-payment-method"
            f={1}
            miw={80}
            fs={16}
            fontWeight={'800'}
          >
            Payment Method
          </Label>

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </XStack>
      </YStack> */}

      {/* {products.length > 0 ? (
        <>
          {!isPending && (
            <>
              <FlatList
                data={products}
                scrollEnabled={false}
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
                    {isPending ? (
                      <YStack padding="$3" gap="$4" alignItems="flex-end">
                        <Spinner size="large" color="$orange10" />
                      </YStack>
                    ) : (
                      <>
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
                              marginVertical: 8,
                            }}
                          >
                            Order Summary
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: colorTokens.light.gray.gray5,
                          }}
                        ></View>
                      </>
                    )}
                  </View>
                }
                renderItem={({ item }) => {
                  // const perPrice =
                  //   data &&
                  //   data.find((e) => e.ProductCode === item.ProductCode)
                  //     ?.RegularPrice

                  return (
                    <SwipeableRow
                      onDelete={() => removeProduct(item.ProductCode)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 15,
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            // paddingHorizontal: 16,
                          }}
                        >
                          <Text
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: 16,
                              color: colorTokens.light.orange.orange9,
                              fontWeight: '600',
                            }}
                          >
                            {item.quantity}x{' '}
                          </Text>

                          <Text style={{ fontSize: 16 }}>
                            {data &&
                              data.find(
                                (e) => e.ProductCode === item.ProductCode
                              )?.Name}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 16,
                            color: colorTokens.light.orange.orange9,
                            fontWeight: '600',
                          }}
                        >
                          {formatCurrency(item.quantity * item.UnitPrice)}
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
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colorTokens.light.gray.gray9,
                        }}
                      >
                        Subtotal
                      </Text>
                      <Text>{formatCurrency(total)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colorTokens.light.gray.gray9,
                        }}
                      >
                        Delivery Fee
                      </Text>
                      <Text style={{}}>Free</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colorTokens.light.gray.gray9,
                        }}
                      >
                        Order Total
                      </Text>
                      <Text style={{}}>{formatCurrency(total)}</Text>
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
                      <Text>{formatCurrency(total)}</Text>
                    </Text>
                  </View>

                  <StyledButton
                    style={{
                      marginBottom: 30,
                      backgroundColor: loading
                        ? colorTokens.light.gray.gray4
                        : colorTokens.light.orange.orange9,
                    }}
                    // onPress={placeOrder}
                  >
                    {loading ? (
                      <YStack padding="$3" gap="$4" alignItems="flex-end">
                        <Spinner size="large" color="$orange10" />
                      </YStack>
                    ) : (
                      <Text
                        style={{
                          color: loading ? 'black' : 'white',
                          fontSize: 16,
                          fontWeight: 'bold',
                          padding: 8,
                        }}
                      >
                        Place order
                      </Text>
                    )}
                  </StyledButton>
                </SafeAreaView>
              </View>
            </>
          )}
        </>
      ) : null} */}
    </SafeAreaView>
  )
}
