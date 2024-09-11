import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
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
import DropdownComponent from '~/components/register/dropdown'

export default function CheckoutItem() {
  const cart = useCartStore((state) => state.cart)
  const addressRef = usePryceStore((set) => set.addressRef)
  const toast = useToastController()
  const [subTotal, setSubTotal] = useState<number>(0)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [paymentMethod, setPaymentMethod] = useState<string>('cash-on-delivery')
  const [loading, isLoading] = useState<boolean>(false)
  const token = usePryceStore((s) => s.token)

  const fetchProducts = useMutation({
    mutationFn: fetchProductsQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })
    },
  })

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
    if (addressRef) {
      fetchProducts.mutate(addressRef)
    }
  }, [addressRef])

  useEffect(() => {
    if (!fetchProducts.isPending && fetchProducts.data) {
      const subtotal = calculateSubtotal(cart, fetchProducts.data)
      setSubTotal(subtotal)
    }
  }, [fetchProducts.isPending, fetchProducts.data, cart])

  const placeOrder = async () => {
    router.push({
      pathname: '/checkout/paymongo_webview',
      params: {
        url: 'https://checkout.paymongo.com/cs_pMgbf16mpWG3vxD35cSMtpop_client_fLj6NNvyiYVCJzXDGc1fLwX2#cGtfdGVzdF9Zc3Y0ZWJXcm5mcHk0dkJjSjdmRXdaZTg=',
      },
    })
    // isLoading(true)
    // if (cart.length < 1)
    //   return toast.show('Something is wrong with your order!', {
    //     message: 'Please check your orders.',
    //     native: false,
    //   })

    // if (!paymentMethod)
    //   return toast.show('Something is wrong with your order!', {
    //     message: 'Please select a payment method.',
    //     native: false,
    //   })

    // const data = {
    //   payment_method: paymentMethod,
    //   line_items: [],
    // } as any

    // if (!fetchProducts.isPending && fetchProducts.data) {
    //   cart.forEach((item) => {
    //     data.line_items.push({
    //       product_id: fetchProducts.data.find(
    //         (e) => e.ProductCode === item.productCode
    //       )?.Id,
    //       product_area_code: fetchProducts.data.find(
    //         (e) => e.ProductCode === item.productCode
    //       )?.Product2Id,
    //       amount: fetchProducts.data.find(
    //         (e) => e.ProductCode === item.productCode
    //       )?.RegularPrice,
    //       currency: 'PHP',
    //       description: fetchProducts.data.find(
    //         (e) => e.ProductCode === item.productCode
    //       )?.Name,
    //       images: [
    //         `https://prycegas.com/images/product-thumbs/${item.productCode}.png`,
    //       ],
    //       name: fetchProducts.data.find(
    //         (e) => e.ProductCode === item.productCode
    //       )?.Name,
    //       quantity: item.quantity,
    //     })
    //   })

    //   try {
    //     const response = await fetch(
    //       `${env.EXPO_PUBLIC_LOCAL_URL}/api/order/create`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(data),
    //       }
    //     )

    //     const placeOrderResponse: {
    //       success: boolean
    //       checkout_url: string
    //     } = await response.json()

    //     if (placeOrderResponse.success) {
    //       router.push({
    //         pathname: '/checkout/paymongo_webview',
    //         params: {
    //           url: placeOrderResponse.checkout_url,
    //         },
    //       })
    //     } else {
    //       return toast.show('Something is wrong with your order!', {
    //         message: 'Please check your orders.',
    //         native: false,
    //       })
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   } finally {
    //     isLoading(false)
    //   }
    // }
  }

  //moviestart://(drawer)/shop

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
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

      <YStack paddingHorizontal={10}>
        <XStack>
          {/* <Label
            htmlFor="select-payment-method"
            f={1}
            fs={16}
            fontWeight={'800'}
          >
            Payment Method
          </Label> */}

          <View style={{ width: '100%', paddingHorizontal: 10 }}>
            <DropdownComponent
              data={[
                { value: 'cash-on-delivery', label: 'Cash on Delivery' },
                { value: 'online-payment', label: 'Online Payment' },
              ]}
              onChange={setPaymentMethod}
              placeholder="Payment Method"
            />
          </View>
        </XStack>
      </YStack>

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
                    {fetchProducts.isPending ? (
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
                              fontSize: 16,
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
                          padding: 8,
                          justifyContent: 'space-between',
                        }}
                      >
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                          }}
                        >
                          <Text
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: 12,
                              color: colorTokens.light.orange.orange9,
                              fontWeight: '600',
                            }}
                          >
                            {item.quantity}x{' '}
                          </Text>

                          <Text style={{ fontSize: 12 }}>
                            {fetchProducts.data &&
                              fetchProducts.data.find(
                                (e) => e.ProductCode === item.productCode
                              )?.Name}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 12,
                            color: colorTokens.light.orange.orange9,
                            fontWeight: '600',
                          }}
                        >
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
                          fontSize: 12,
                        }}
                      >
                        Subtotal
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {formatCurrency(subTotal)}
                      </Text>
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
                          fontSize: 12,
                        }}
                      >
                        Delivery Fee
                      </Text>
                      <Text style={{ fontSize: 12 }}>Free</Text>
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
                          fontSize: 12,
                        }}
                      >
                        Order Total
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {formatCurrency(subTotal)}
                      </Text>
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
                      <Text>{formatCurrency(subTotal)}</Text>
                    </Text>
                  </View>

                  <StyledButton
                    style={{
                      marginBottom: 30,
                      backgroundColor: loading
                        ? colorTokens.light.gray.gray4
                        : colorTokens.light.orange.orange9,
                    }}
                    onPress={placeOrder}
                    loading={loading}
                  >
                    {loading ? (
                      <YStack padding="$3" gap="$4" alignItems="flex-end">
                        <Spinner size="large" color="$orange10" />
                      </YStack>
                    ) : (
                      <Text
                        style={{
                          color: loading ? 'black' : 'white',
                          fontSize: 14,
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
      ) : null}
    </SafeAreaView>
  )
}
