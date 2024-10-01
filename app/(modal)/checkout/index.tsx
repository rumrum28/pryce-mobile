import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ViewBase,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import StyledButton from '~/components/styled_button'
import useCartStore from '~/hooks/productsStore'
import usePryceStore from '~/hooks/pryceStore'
import { useEffect, useState } from 'react'
import { useToastController } from '@tamagui/toast'
import SwipeableRow from '~/components/swipeable_row'
import { formatCurrency } from '~/utils/utils'
import NonePgcmCheckoutAlert from '~/components/none_pgcm_checkout_alert'
import { ProductSingle } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import { PaymentMethod } from '~/components/payment_method'
import { env } from '~/types/env'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import useBasketStore, { AddOn, Product } from '~/utils/basketStore'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Skeleton from '~/components/skeleton'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { router } from 'expo-router'

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
  const { products, total, updateProducts, reduceProduct, clearCart } =
    useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)
  const toast = useToastController()
  const [paymentMethod, setPaymentMethod] = useState<string>('cash-on-delivery')
  const [loading, isLoading] = useState<boolean>(false)
  const { width, height } = Dimensions.get('window')
  const [paymentAmount, setPaymentAmount] = useState('')

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
    router.push('/(tabs)/')
  }

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
              fontSize: 16,
              color: colorTokens.light.orange.orange9,

              fontWeight: 'bold',
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
                    <View>
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
                    </View>
                  </View>
                )
              })}
            </View>
          )}
        </View>
        {/* </SwipeableRow> */}
      </View>
    )
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
        <>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 130 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 15,
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

                margin: 10,
              }}
            >
              <Text>
                590 Int. Tandang Sora Ave.,, Barangay Culiat, Quezon City,
                National Capital Region, National Capital Region
              </Text>
            </View>

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
                  </View>
                </View>
              }
              ListFooterComponent={
                <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
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
                </View>
              }
            />
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
        </>
      )}

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

          <StyledButton onPress={placeOrder} disabled={isPending || loading}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})
