import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
// import useBasketStore, { AddOn, Product } from '~/utils/basketStore'
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
import { env } from '~/types/env'
import { Toast } from 'toastify-react-native'
import useCartStore, { Product } from '~/hooks/productsStore'
import { ProductSingle } from '~/types/product'
import useBasketStore, { AddOn } from '~/utils/basketStore'
import Skeleton from '~/components/skeleton'
import AddOns from '~/components/shop/addOns/add_ons'
import { exemptedOnProducts } from '~/utils/products'
import { ShakingEmoticonArrow } from '~/components/shaking_animation_arrow'

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
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const cart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const [loading, isLoading] = useState<boolean>(false)
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const [selectedAddOns, setSelectedAddOns] = useState<Array<AddOn>>([])
  const [viewAddOns, isViewAddOns] = useState<boolean>(false)
  const { width, height } = Dimensions.get('window')

  const token = usePryceStore((s) => s.token)

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  // useEffect(() => {
  //   if (data && total > 1) {
  //     updateProducts(data)
  //   }
  // }, [data, updateProducts])

  const renderItem = ({ item }: { item: Product }) => {
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
            <Text style={{ fontSize: 16 }}>
              {/* {formatCurrency(price * item.quantity)} */}
              {formatCurrency(price)}
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
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
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 40,
                          maxWidth: 220,
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
                        </Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            )}
          </View> */}
        </SwipeableRow>
      </View>
    )
  }

  const placeOrder = async () => {
    isLoading(true)
    // if (products.length < 1) {
    //   Toast.error('Please check your orders')
    //   isLoading(false)
    //   return
    // }

    // if (!selectedPaymentMethod) {
    //   Toast.error('Please select a payment method')
    //   isLoading(false)
    //   return
    // }

    // const orderData = {
    //   payment_method: selectedPaymentMethod,
    //   line_items: [],
    //   payment_amount: paymentAmount,
    // } as any

    // if (!isPending && data) {
    //   products.forEach((item) => {
    //     const productData = data.find(
    //       (e: ProductProps) => e.ProductCode === item.ProductCode
    //     )

    //     if (productData) {
    //       orderData.line_items.push({
    //         quantity: item.quantity,
    //         product_id: productData.Id,
    //         amount: productData.RegularPrice,
    //         currency: 'PHP',
    //         description: productData.Name,
    //         images: [
    //           `https://prycegas.com/images/product-thumbs/${item.ProductCode}.png`,
    //         ],
    //         name: productData.Name,
    //       })

    //       if (item.addOns && item.addOns.length > 0) {
    //         item.addOns.forEach((addOn) => {
    //           orderData.line_items.push({
    //             quantity: item.quantity,
    //             product_id: addOn.Id,
    //             amount: addOn.RegularPrice,
    //             currency: 'PHP',
    //             description: addOn.Name,
    //             images: [
    //               `https://prycegas.com/images/product-thumbs/${addOn.ProductCode}.png`,
    //             ],
    //             name: addOn.Name,
    //           })
    //         })
    //       }
    //     }
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
    //         body: JSON.stringify(orderData),
    //       }
    //     )

    //     const responseText = await response.json()

    //     if (response.ok) {
    //       clearCart()

    //       if (selectedPaymentMethod === 'online-payment') {
    //         if (responseText?.success && responseText?.checkout_url) {
    //           Toast.success('Your order has been created')

    //           router.push({
    //             pathname: '/checkout/paymongo_webview',
    //             params: {
    //               url: responseText.checkout_url,
    //             },
    //           })
    //         } else {
    //           Toast.error('Something is wrong with your order')
    //         }
    //       } else {
    //         Toast.success('Your order has been placed')

    //         router.push('/success')
    //       }
    //     } else {
    //       Toast.error('Order placement failed')
    //     }
    //   } catch (error) {
    //     console.error('Order Error:', error)
    //     Toast.error('Order placement failed')
    //   } finally {
    //     isLoading(false)
    //   }
    // }
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

      setPaymentAmount(totalPrice)
    }
  }, [data, cart])

  const handleToggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const isSelected = prevSelectedAddOns.some((ao) => ao.Id === addOn.Id)
      if (isSelected) {
        return prevSelectedAddOns.filter((ao) => ao.Id !== addOn.Id)
      } else {
        return [...prevSelectedAddOns, addOn]
      }
    })
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
              data={cart}
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
                  style={{
                    color: colorTokens.light.orange.orange9,
                    flex: 1,
                  }}
                >
                  Manage Add Ons
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
              ) : cart.find(
                  (e) => e.productCode === 'PGCM' || e.productCode === 'PGCMV'
                ) ? null : (
                <>
                  {viewAddOns && (
                    <AddOns
                      productCodeMap={exemptedOnProducts}
                      realTimeProductData={data}
                      selectedAddOns={selectedAddOns}
                      onToggleAddOn={handleToggleAddOn}
                    />
                  )}
                </>
              )}
            </View>

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
                <Text>{formatCurrency(paymentAmount)}</Text>
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
                <Text>{formatCurrency(paymentAmount)}</Text>
              </View>
            </View>

            <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
              <PaymentMethodComponent
                paymentMethod={selectedPaymentMethod}
                setPaymentMethod={setSelectedPaymentMethod}
                paymentAmount={String(paymentAmount)}
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
                  <Text>{formatCurrency(paymentAmount)}</Text>
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
