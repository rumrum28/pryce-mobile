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
import { PaymentMethod } from '~/components/payment_method'
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
  const { products, total, items, reduceProduct, updateProducts, clearCart } =
    useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)
  const [paymentMethod, setPaymentMethod] = useState<string>('cash-on-delivery')
  const [loading, isLoading] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState('')
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
      <View style={{ paddingVertical: 10 }}>
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
                padding: 5,
                fontWeight: 'bold',
                borderRadius: 5,
                // marginBottom: 9,
              }}
            >
              {item.quantity}x
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{item.Name}</Text>
            </View>
            <Text style={{ fontSize: 16 }}>{formattedPrice}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingTop: 5,
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
                      }}
                      key={index}
                    >
                      <View>
                        <Text style={{ fontSize: 12, color: '#666' }}>
                          {addOn.Name} ({item.quantity}x)
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#666',
                            fontWeight: 'bold',
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}
                        >
                          {formattedAddOnPrice}
                        </Text>
                      </View>
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
      return
    }

    if (!paymentMethod) {
      toast.show('Something is wrong with your order!', {
        message: 'Please select a payment method.',
        native: false,
      })
      return
    }

    const orderData = {
      payment_method: paymentMethod,
      line_items: [],
      payment_amount: parseFloat(paymentAmount),
    } as any

    if (!isPending && data) {
      products.forEach((item) => {
        const productData = data.find(
          (e: ProductProps) => e.ProductCode === item.ProductCode
        )

        if (productData) {
          orderData.line_items.push({
            product_id: productData.Id,
            product_area_code: productData.Product2Id,
            amount: productData.RegularPrice,
            currency: 'PHP',
            description: productData.Name,
            images: [
              `https://prycegas.com/images/product-thumbs/${item.ProductCode}.png`,
            ],
            name: productData.Name,
            quantity: item.quantity,
          })

          if (item.addOns && item.addOns.length > 0) {
            item.addOns.forEach((addOn) => {
              orderData.line_items.push({
                product_id: addOn.Id,
                product_area_code: addOn.Product2Id,
                amount: addOn.RegularPrice,
                currency: 'PHP',
                description: addOn.Name,
                images: [
                  `https://prycegas.com/images/product-thumbs/${addOn.ProductCode}.png`,
                ],
                name: addOn.Name,
                quantity: item.quantity,
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

        // const responseText = await response.text()
        // console.log('Response Text:', responseText)
        if (response.ok) {
          toast.show('Order placed successfully!', {
            message: 'Your order has been placed.',
            native: false,
          })
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
      }
    }
    isLoading(false)
    clearCart()
    router.push('/success')
  }

  return (
    <SafeAreaView style={[styles.area, { minHeight: Math.round(height) }]}>
      {isPending ? (
        <View>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView
            scrollEventThrottle={16}
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
                      marginVertical: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
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
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colorTokens.light.gray.gray5,
                    }}
                  ></View>
                </View>
              }
            />

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
            <View>
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: colorTokens.light.orange.orange9,
                // borderBottomWidth: 0.5,
                borderWidth: 1,
                borderRadius: 5,
                height: 50,
                alignItems: 'center',
                marginHorizontal: 15,
                marginBottom: 150,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  marginRight: 10,
                  padding: 10,
                }}
              >
                <FontAwesome6
                  name={'money-bill-wave'}
                  size={20}
                  color={colorTokens.light.gray.gray8}
                />
              </View>
              <TextInput
                placeholder="Change For"
                placeholderTextColor={colorTokens.light.gray.gray8}
                keyboardType="default"
                style={{
                  flex: 1,
                  height: 40,
                  fontSize: 14,
                  color: colorTokens.light.gray.gray12,
                  fontWeight: 'regular',
                }}
                value={paymentAmount}
                onChangeText={(value) => setPaymentAmount(value)}
              />
            </View>
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
              paddingBottom: 100,
            }}
          >
            <SafeAreaView
              style={{ backgroundColor: 'white' }}
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
              {/* <Link href="/(modal)/checkout" asChild> */}
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
              {/* </Link> */}
            </SafeAreaView>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})
