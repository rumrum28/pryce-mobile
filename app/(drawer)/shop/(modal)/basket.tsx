import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useBasketStore, { AddOn, Product } from '~/utils/basketStore'
import { formatCurrency } from '~/utils/utils'
import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableRow from '~/components/swipeable_row'
import StyledButton from '~/components/styled_button'
import { ScrollView } from 'react-native-gesture-handler'
import usePryceStore from '~/hooks/pryceStore'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'

export default function Basket() {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()
  const { products, total, items, clearCart, reduceProduct, updateProducts } =
    useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    if (data && total > 1) {
      // console.log(data)
      updateProducts(data)
    }
  }, [data, updateProducts])

  const renderItem = ({
    item,
  }: {
    item: Product & { quantity: number; addOns?: Array<AddOn> }
  }) => {
    // console.log('item from basket:', item)
    // const addOnsCost =
    //   item.addOns?.map((addOn) => {
    //     return addOn.UnitPrice * item.quantity
    //   }) || []

    // const totalAddOnsPrice = addOnsCost.reduce((sum, cost) => sum + cost, 0)

    // console.log('Rendering Item:', item)

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
            <Text style={{ fontSize: 16 }}>
              {formatCurrency(item.UnitPrice * item.quantity)}
            </Text>
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
                {item.addOns.map((addOn, index) => (
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
                        {formatCurrency(addOn.UnitPrice * item.quantity)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </SwipeableRow>
      </View>
    )
  }

  return (
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 16,
                }}
              >
                Items
              </Text>
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
          <Link href="/(drawer)/shop/(modal)/checkoutItem" asChild>
            <StyledButton>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 8,
                }}
              >
                Review payment and address
              </Text>
            </StyledButton>
          </Link>
        </SafeAreaView>
      </View>
    </View>
  )
}
