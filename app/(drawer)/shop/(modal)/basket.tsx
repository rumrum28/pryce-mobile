import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useBasketStore from '~/utils/basketStore'
import { formatCurrency } from '~/utils/utils'
import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableRow from '~/components/swipeable_row'
import StyledButton from '~/components/styled_button'

export default function Basket() {
  const { products, total, clearCart, reduceProduct } = useBasketStore()
  const [order, setOrder] = useState(false)

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {!order && (
        <>
          <FlatList
            data={products}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colorTokens.light.gray.gray5,
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
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    gap: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item.quantity}x</Text>
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ fontSize: 16 }}>
                    {formatCurrency(item.quantity * item.unit_price)}
                  </Text>
                </View>
              </SwipeableRow>
            )}
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
                  <Text>{total}</Text>
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
                  <Text>{total}</Text>
                </View>
              </View>
            }
          />
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
        </>
      )}
    </View>
  )
}
