import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import useBasketStore, { AddOn, Product } from '~/utils/basketStore'
import { formatCurrency } from '~/utils/utils'
import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableRow from '~/components/swipeable_row'
import StyledButton from '~/components/styled_button'
import { ScrollView } from 'react-native-gesture-handler'
import usePryceStore from '~/hooks/pryceStore'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import { PaymentMethodComponent } from '~/components/payment_method'
import { FontAwesome6 } from '@expo/vector-icons'
import { Toast, useToastController } from '@tamagui/toast'
import { env } from '~/types/env'

type ProductProps = {
  ProductCode: string
  Id: string
  Product2Id: string
  RegularPrice: number
  Name: string
}

export default function Basket() {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()
  const { products, total, reduceProduct, updateProducts, clearCart } =
    useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

  const [loading, isLoading] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const toast = useToastController()
  const { width, height } = Dimensions.get('window')

  const token = usePryceStore((s) => s.token)

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    if (data && total > 1) {
      updateProducts(data)
    }
  }, [data, updateProducts])

  const renderItem = ({
    item,
  }: {
    item: Product & { quantity: number; addOns?: Array<AddOn> }
  }) => {
    const productPrice = data?.find((e) => e.ProductCode === item.ProductCode)
    let calculatedPrice = 0
    if (productPrice) {
      calculatedPrice =
        productPrice.UnitPrice < productPrice.RegularPrice
          ? productPrice.UnitPrice
          : productPrice.RegularPrice
    }
    const formattedPrice = formatCurrency(calculatedPrice * item.quantity)

    return (
      <View style={{ paddingVertical: 10, backgroundColor: '#fff' }}>
        <SwipeableRow onDelete={() => reduceProduct(item)}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
              gap: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colorTokens.light.orange.orange9,
                borderColor: colorTokens.light.gray.gray9,
                borderWidth: 1,
                padding: 7,
                fontWeight: 'bold',
                borderRadius: 5,
                // marginBottom: 9,
              }}
            >
              {item.quantity}x
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {item.Name}
              </Text>
            </View>
            <Text style={{ fontSize: 16 }}>{formattedPrice}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // paddingHorizontal: 15,
              // paddingTop: 5,
              paddingLeft: 28,
              gap: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {item.addOns && item.addOns.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                }}
              >
                {item.addOns.map((addOn, index) => {
                  const addOnPrice = data?.find(
                    (e) => e.ProductCode === addOn.ProductCode
                  )
                  let calculatedAddOnPrice = 0
                  if (addOnPrice) {
                    calculatedAddOnPrice =
                      addOnPrice.UnitPrice < addOnPrice.RegularPrice
                        ? addOnPrice.UnitPrice
                        : addOnPrice.RegularPrice
                  }
                  const formattedAddOnPrice = formatCurrency(
                    calculatedAddOnPrice * item.quantity
                  )

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',

                        // alignItems: 'center',
                        // justifyContent: 'center',
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          paddingLeft: 40,
                          maxWidth: 220,

                          // paddingHorizontal: 50,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            flexShrink: 1,
                            flexWrap: 'wrap',
                            fontWeight: '300',
                          }}
                        >
                          {addOn.Name}
                          {/* ({item.quantity}x) */}
                        </Text>
                      </View>
                      {/* <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
                            // fontWeight: 'bold',
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}
                        >
                          {formattedAddOnPrice}
                        </Text>
                      </View> */}
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        </SwipeableRow>
      </View>
    )
  }

  const placeOrder = async () => {
    isLoading(true)
    if (products.length < 1) {
      toast.show('Something is wrong with your order!', {
        message: 'Please check your orders.',
        native: false,
      })
      isLoading(false)
      return
    }

    if (!selectedPaymentMethod) {
      toast.show('Something is wrong with your order!', {
        message: 'Please select a payment method.',
        native: false,
      })
      isLoading(false)
      return
    }

    const orderData = {
      payment_method: selectedPaymentMethod,
      line_items: [],
      payment_amount: paymentAmount,
    } as any

    if (!isPending && data) {
      products.forEach((item) => {
        const productData = data.find(
          (e: ProductProps) => e.ProductCode === item.ProductCode
        )

        if (productData) {
          orderData.line_items.push({
            quantity: item.quantity,
            product_id: productData.Id,
            amount: productData.RegularPrice,
            currency: 'PHP',
            description: productData.Name,
            images: [
              `https://prycegas.com/images/product-thumbs/${item.ProductCode}.png`,
            ],
            name: productData.Name,
          })

          if (item.addOns && item.addOns.length > 0) {
            item.addOns.forEach((addOn) => {
              orderData.line_items.push({
                quantity: item.quantity,
                product_id: addOn.Id,
                amount: addOn.RegularPrice,
                currency: 'PHP',
                description: addOn.Name,
                images: [
                  `https://prycegas.com/images/product-thumbs/${addOn.ProductCode}.png`,
                ],
                name: addOn.Name,
              })
            })
          }
        }
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
            body: JSON.stringify(orderData),
          }
        )

        const responseText = await response.json()

        if (response.ok) {
          clearCart()

          if (selectedPaymentMethod === 'online-payment') {
            if (responseText?.success && responseText?.checkout_url) {
              toast.show('Pending payment!', {
                message: 'Your order has been created.',
                native: false,
              })

              router.push({
                pathname: '/checkout/paymongo_webview',
                params: {
                  url: responseText.checkout_url,
                },
              })
            } else {
              toast.show('Error!', {
                message: 'Something is wrong with your order.',
                native: false,
              })
            }
          } else {
            toast.show('Order placed successfully!', {
              message: 'Your order has been placed.',
              native: false,
            })

            router.push('/success')
          }
        } else {
          toast.show('Order placement failed!', {
            message: 'Please try again.',
            native: false,
          })
        }
      } catch (error) {
        console.error('Order Error:', error)
        toast.show('Order placement failed!', {
          message: 'Please try again.',
          native: false,
        })
      } finally {
        isLoading(false)
      }
    }
  }

  return (
    <View style={[styles.area, { minHeight: Math.round(height) }]}>
      {isPending ? (
        <View>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
          >
            <FlatList
              data={products}
              scrollEnabled={false}
              renderItem={renderItem}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colorTokens.light.gray.gray2,
                    marginHorizontal: 15,
                  }}
                />
              )}
              ListHeaderComponent={
                <View
                  style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      Order Summary
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colorTokens.light.orange.orange9,
                      }}
                    >
                      Add Items
                    </Text>
                  </View>
                </View>
              }
            />

            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 15,
                backgroundColor: '#fff',
              }}
            >
              <View
                style={{
                  height: 1,
                  backgroundColor: colorTokens.light.gray.gray2,
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
                <Text>{formatCurrency(total)}</Text>
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
                <Text>{formatCurrency(total)}</Text>
              </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
              <PaymentMethodComponent
                paymentMethod={selectedPaymentMethod}
                setPaymentMethod={setSelectedPaymentMethod}
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
              />
            </View>
          </ScrollView>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: '#fff',
              padding: 10,
              elevation: 10,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              paddingTop: 20,
              paddingBottom: 100,
            }}
          >
            <SafeAreaView
              style={{ backgroundColor: '#fff' }}
              edges={['bottom']}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
              </View>
              <StyledButton
                onPress={placeOrder}
                disabled={isPending || loading}
              >
                {isPending || loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      padding: 8,
                    }}
                  >
                    Place Order
                  </Text>
                )}
              </StyledButton>
            </SafeAreaView>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'center',
  },
})
