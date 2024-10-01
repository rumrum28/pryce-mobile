import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { useFetchProducts } from '~/hooks/fetchProducts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '~/components/bottom_sheet'
import Entypo from '@expo/vector-icons/Entypo'

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
    isPending: isFetchingDetails,
  } = useFetchProductsDetails()

  const {
    mutate: fetchProducts,
    data: allProductsData,
    isPending: isFetchingProducts,
  } = useFetchProducts()

  const { products, total, items, reduceProduct, updateProducts, clearCart } =
    useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)
  const [paymentMethod, setPaymentMethod] = useState<string>('cash-on-delivery')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const users = usePryceStore((state) => state.users)
  const [loading, isLoading] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const toast = useToastController()
  const { width, height } = Dimensions.get('window')
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [checkoutAddress, setCheckoutAddress] =
    useState<string>('Select Address')
  const [checkoutName, setCheckoutName] = useState<string>('')
  const [checkoutNumber, setCheckoutNumber] = useState<string>('')
  const token = usePryceStore((s) => s.token)

  const handleFetchProducts = useCallback(() => {
    if (selectedUser) {
      const userData = {
        token: token,
        accountNumber: selectedUser,
      }
      fetchProducts(userData)
    }
  }, [selectedUser, token, fetchProducts])

  const handleFetchProductDetails = useCallback(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    handleFetchProducts()
    const findUser = users.find((e) => e.Account_Number__c === selectedUser)

    if (findUser) {
      setCheckoutAddress(
        `${findUser.Primary_Street__c} ${findUser.Primary_Barangay__c}  ${findUser.Primary_State_Province__c}`
      )

      setCheckoutName(`${findUser?.Name}`)
      setCheckoutNumber(` ${findUser?.Mobile_Number__c}`)
    }
  }, [handleFetchProducts])

  useEffect(() => {
    handleFetchProductDetails()
  }, [handleFetchProductDetails])

  useEffect(() => {
    if (data && total > 1) {
      updateProducts(data)
    }
  }, [data, total, updateProducts])

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

    if (!isFetchingDetails && data) {
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

      console.log('orderData:', JSON.stringify(orderData, null, 2))

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

        const responseText = await response.text()
        console.log('Response Text:', responseText)
        if (response.ok) {
          toast.show('Order placed successfully!', {
            message: 'Your order has been placed.',
            native: false,
          })
          isLoading(false)
          clearCart()
          router.push('/success')
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
  }

  const openModal = () => {
    bottomSheetRef.current?.present()
  }

  const RenderAddress = () => {
    return (
      <Pressable
        onPress={openModal}
        style={{
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          marginBottom: 10,
        }}
      >
        {/* <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Delivery Address
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ height: 30, width: 30 }}>
              <Image
                source={require('~/assets/images/maps.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 5,
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                paddingLeft: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  paddingBottom: 5,
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                >
                  {checkoutName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: colorTokens.light.gray.gray9,
                  }}
                >
                  {checkoutNumber}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: '300',
                }}
              >
                {checkoutAddress}
              </Text>
            </View>
          </View>
          <View>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={[styles.area, { minHeight: Math.round(height) }]}>
      {isFetchingProducts || isFetchingDetails ? (
        <View>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <BottomSheet ref={bottomSheetRef} />
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130 }}
          >
            <RenderAddress />
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
              <PaymentMethod
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
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
              {/* <Link href="/(modal)/checkout" asChild> */}
              <StyledButton
                onPress={placeOrder}
                disabled={isFetchingDetails || loading}
              >
                {isFetchingDetails || loading ? (
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
    </View>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
  },
})
