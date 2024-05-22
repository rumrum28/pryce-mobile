import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getProductById } from '~/data/mock'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useBasketStore from '~/utils/basketStore'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import StyledButton from '~/components/styled_button'

export default function ItemDetails() {
  const { id } = useLocalSearchParams()
  const [quantity, setQuantity] = useState(1)
  const [totalPriceNumber, setTotalPriceNumber] = useState(0)
  const [items, setItems] = useState(0)

  const item = getProductById(+id!)!

  const { addProduct, reduceProduct } = useBasketStore()

  const addToCart = () => {
    const selectedProduct = { ...item }
    const unitPrice = selectedProduct.unit_price
    const numQuantity = quantity ?? 1
    addProduct(selectedProduct, numQuantity)
    const priceToAdd = unitPrice * numQuantity
    setTotalPriceNumber((prevTotal) => prevTotal + priceToAdd)
    setItems((prevItems) => prevItems + numQuantity)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    router.back()
  }

  const formatCurrency = (value: number): string => {
    const formattedValue = value.toFixed(2)
    return formattedValue
  }
  const formattedPrice = formatCurrency(Number(item?.unit_price))
  const totalPrice = quantity * parseFloat(formattedPrice)

  const removeFromCart = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      reduceProduct(item)
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom']}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.Image
          source={item?.img}
          style={{ width: '100%', height: 300 }}
          entering={FadeIn.duration(400).delay(200)}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(200)}
            style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(400)}
            style={{
              fontSize: 16,
              marginBottom: 8,
              color: colorTokens.light.gray.gray11,
            }}
          >
            {item?.description}
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
                Add for {totalPrice}
              </Text>
            </StyledButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
