import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '~/utils/utils'
import { colorTokens } from '@tamagui/themes'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableRow from '~/components/swipeable_row'
import StyledButton from '~/components/styled_button'
import usePryceStore from '~/hooks/pryceStore'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import { PaymentMethodComponent } from '~/components/payment_method'
import { FontAwesome6 } from '@expo/vector-icons'
import useCartStore, { Product } from '~/hooks/productsStore'
import Skeleton from '~/components/skeleton'
import AddOns from '~/components/shop/addOns/add_ons'
import { exemptedOnProducts } from '~/utils/products'
import { ShakingEmoticonArrow } from '~/components/shaking_animation_arrow'
import { router } from 'expo-router'
import { Toast } from 'toastify-react-native'
import { env } from '~/types/env'

export default function Basket() {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()
  const addressRef = usePryceStore((set) => set.addressRef)
  const scrollViewRef = useRef<ScrollView>(null)
  const viewRef = useRef<Text>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [loading, isLoading] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [viewAddOns, isViewAddOns] = useState<boolean>(false)
  const { width, height } = Dimensions.get('window')
  const clearCart = useCartStore((s) => s.clearCart)

  const token = usePryceStore((s) => s.token)

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  const placeOrder = async () => {
    isLoading(true)
    if (cart.length < 1) {
      Toast.error('Please check your orders')
      isLoading(false)
      return
    }

    if (!selectedPaymentMethod) {
      Toast.error('Please select a payment method')
      isLoading(false)
      return
    }

    const orderData = {
      payment_method: selectedPaymentMethod,
      line_items: [],
      payment_amount: paymentAmount,
    } as any

    if (!isPending && data) {
      cart.forEach((item) => {
        const productData = data.find((e) => e.ProductCode === item.productCode)

        if (productData) {
          orderData.line_items.push({
            quantity: item.quantity,
            product_id: productData.Id,
            amount: productData.RegularPrice,
            currency: 'PHP',
            description: productData.Name,
            images: [
              `https://prycegas.com/images/product-thumbs/${item.productCode}.png`,
            ],
            name: productData.Name,
          })
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
              Toast.success('Your order has been created')

              router.push({
                pathname: '/checkout/paymongo_webview',
                params: {
                  url: responseText.checkout_url,
                },
              })
            } else {
              Toast.error('Something is wrong with your order')
            }
          } else {
            Toast.success('Your order has been placed')

            router.push('/success')
          }
        } else {
          Toast.error('Order placement failed')
        }
      } catch (error) {
        console.error('Order Error:', error)
        Toast.error('Order placement failed')
      } finally {
        isLoading(false)
      }
    }
  }

  useEffect(() => {
    if (data && cart.length > 0) {
      const totalPrice = cart.reduce((accumulator, product) => {
        const UnitPrice = data.find(
          (e) => e.ProductCode === product.productCode
        )?.UnitPrice

        const RegularPrice = data.find(
          (e) => e.ProductCode === product.productCode
        )?.RegularPrice

        if (UnitPrice && RegularPrice) {
          let price = UnitPrice < RegularPrice ? UnitPrice : RegularPrice

          return accumulator + price * product.quantity
        }

        return accumulator
      }, 0)

      setTotalAmount(totalPrice)
    }
  }, [data, cart])

  const renderSingleItemBody = ({ item }: { item: Product }) => {
    const singleProductData = data?.find(
      (e) => e.ProductCode === item.productCode
    )

    let price = 0

    if (singleProductData) {
      price =
        singleProductData.UnitPrice < singleProductData.RegularPrice
          ? singleProductData.UnitPrice
          : singleProductData.RegularPrice
    }

    return (
      <View style={{ paddingVertical: 10, backgroundColor: '#fff' }}>
        <SwipeableRow onDelete={() => removeProduct(item.productCode)}>
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
              }}
            >
              {item.quantity}x
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {singleProductData?.Name}
              </Text>
            </View>
            <Text style={{ fontSize: 16 }}>{formatCurrency(price)}</Text>
          </View>
        </SwipeableRow>
      </View>
    )
  }

  const renderSingleItemHeader = () => {
    return (
      <View style={{ paddingHorizontal: 15, backgroundColor: '#fff' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 25,
            marginBottom: 16,
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
          <Pressable onPress={() => router.push('/(tabs)/home')}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colorTokens.light.orange.orange9,
              }}
            >
              Add Items
            </Text>
          </Pressable>
        </View>
      </View>
    )
  }

  const renderSingleItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: colorTokens.light.gray.gray2,
          marginHorizontal: 15,
        }}
      />
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        minHeight: Math.round(height),
      }}
    >
      {isPending ? (
        <View>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
            style={{ flex: 1 }}
          >
            <FlatList
              data={cart}
              scrollEnabled={false}
              renderItem={renderSingleItemBody}
              ItemSeparatorComponent={renderSingleItemSeparator}
              ListHeaderComponent={renderSingleItemHeader}
            />
            {/* manage add-ons */}
            <View
              style={{
                backgroundColor: 'white',
              }}
            >
              <Pressable
                style={{
                  paddingVertical: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}
                onPress={() => isViewAddOns(!viewAddOns)}
              >
                <Text
                  ref={viewRef}
                  style={{
                    color: colorTokens.light.orange.orange9,
                    flex: 1,
                  }}
                >
                  Manage Add-ons
                </Text>

                <View
                  style={{
                    paddingHorizontal: 10,
                  }}
                >
                  {viewAddOns ? (
                    <FontAwesome6
                      name="angles-down"
                      size={18}
                      color={colorTokens.light.orange.orange9}
                    />
                  ) : (
                    <ShakingEmoticonArrow />
                  )}
                </View>
              </Pressable>

              {isPending ? (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginTop: 30,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <Skeleton width={30} height={30} />
                    </View>
                    <View style={{}}>
                      <Skeleton width={120} height={20} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                      <Skeleton width={90} height={20} />
                    </View>
                  </View>
                </View>
              ) : null}

              {cart.some(
                (e) => e.productCode === 'PGCM' || e.productCode === 'PGCMV'
              ) ? null : (
                <>
                  {viewAddOns && (
                    <AddOns
                      productCodeMap={exemptedOnProducts}
                      realTimeProductData={data}
                    />
                  )}
                </>
              )}
            </View>

            {/* order fees detail */}
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: colorTokens.light.gray.gray2,
              }}
            >
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
                <Text>{formatCurrency(totalAmount)}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: colorTokens.light.gray.gray9 }}>
                  Island Fee
                </Text>
                <Text>0</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: colorTokens.light.gray.gray9 }}>
                  PGC Discount
                </Text>
                <Text>0</Text>
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
                <Text>{formatCurrency(totalAmount)}</Text>
              </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
              <PaymentMethodComponent
                paymentMethod={selectedPaymentMethod}
                setPaymentMethod={setSelectedPaymentMethod}
                paymentAmount={String(paymentAmount)}
                setPaymentAmount={setPaymentAmount}
                totalAmount={totalAmount}
              />
            </View>
          </ScrollView>

          {/* footer */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width,
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
                  <Text>{formatCurrency(totalAmount)}</Text>
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
        </>
      )}
    </View>
  )
}
