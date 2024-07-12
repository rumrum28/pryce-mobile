import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import StyledButton from '~/components/styled_button'
import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import usePryceStore from '~/hooks/pryceStore'
import { Button, Spinner, YStack } from 'tamagui'
import { ProductsDetail } from '~/utils/products'

export default function ItemDetails() {
  const { productCode } = useLocalSearchParams()
  const [quantity, setQuantity] = useState(1)
  const addressRef = usePryceStore((set) => set.addressRef)
  const favorites = usePryceStore((set) => set.favorites)
  const setFavorites = usePryceStore((set) => set.setFavorites)

  const addToFavoritesHandler = async (f: string) => {
    setFavorites(f)
  }

  const fetchProducts = useMutation({
    mutationFn: fetchProductsQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchProductsOnLoad'],
      })
    },
  })

  useEffect(() => {
    if (addressRef) {
      fetchProducts.mutate(addressRef)
    }
  }, [addressRef])

  const addToCart = () => {
    // const selectedProduct = { ...data }
    // const unitPrice = selectedProduct.unit_price
    // const numQuantity = quantity ?? 1
    // addProduct(selectedProduct, numQuantity)
    // const priceToAdd = unitPrice * numQuantity
    // setTotalPriceNumber((prevTotal) => prevTotal + priceToAdd)
    // setItems((prevItems) => prevItems + numQuantity)
    // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    // router.back()
  }

  const formatCurrency = (value: number): string => {
    const formattedValue = value.toFixed(2)
    return formattedValue
  }
  // const formattedPrice = formatCurrency(Number(item?.unit_price))
  // const totalPrice = quantity * parseFloat(formattedPrice)

  const removeFromCart = () => {
    // if (quantity > 1) {
    //   setQuantity(quantity - 1)
    //   reduceProduct(item)
    // }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom']}
    >
      {fetchProducts.isPending ? (
        <>
          <YStack padding="$3" gap="$4" alignItems="flex-end" marginTop={20}>
            <Spinner size="large" color="$orange10" />
          </YStack>
        </>
      ) : (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Animated.Image
            source={ProductsDetail.find((e) => e.id === productCode)?.image}
            style={{ width: '100%', height: 300 }}
            entering={FadeIn.duration(400).delay(200)}
          />

          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Animated.Text
                entering={FadeInLeft.duration(400).delay(200)}
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}
              >
                {fetchProducts.data &&
                  fetchProducts.data.find((e) => e.ProductCode === productCode)
                    ?.Name}
              </Animated.Text>

              {favorites &&
              favorites.find((fav) => fav.productCode === productCode) ? (
                <Button
                  onPress={() => addToFavoritesHandler(String(productCode))}
                >
                  <Ionicons name="star" size={26} color="orangered" />
                </Button>
              ) : (
                <Button
                  onPress={() => addToFavoritesHandler(String(productCode))}
                >
                  <Ionicons name="star-outline" size={26} color="orange" />
                </Button>
              )}
            </View>

            <Animated.Text
              entering={FadeInLeft.duration(400).delay(400)}
              style={{
                fontSize: 16,
                marginBottom: 8,
                color: colorTokens.light.gray.gray11,
              }}
            >
              {ProductsDetail.find((e) => e.id === productCode)?.description}
            </Animated.Text>
          </View>

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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}
              >
                <TouchableOpacity
                  onPress={removeFromCart}
                  style={{
                    backgroundColor: colorTokens.light.orange.orange9,
                    borderRadius: 20,
                    padding: 3,
                  }}
                >
                  <AntDesign name="minus" size={24} color="white" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={{
                    backgroundColor: colorTokens.light.orange.orange9,
                    borderRadius: 20,
                    padding: 3,
                  }}
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <StyledButton
                style={{
                  flex: 1,
                }}
                onPress={addToCart}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  Add for
                  {/* {totalPrice} */}
                </Text>
              </StyledButton>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
