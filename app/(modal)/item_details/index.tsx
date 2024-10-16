import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
  FadeIn,
  FadeInLeft,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useBasketStore, { AddOn } from '~/utils/basketStore'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import StyledButton from '~/components/styled_button'
import { useMutation } from '@tanstack/react-query'
import { fetchProductsQuery, getProductById } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import usePryceStore from '~/hooks/pryceStore'
import { exemptedOnProducts, ProductsDetail } from '~/utils/products'
import { Spinner, YStack } from 'tamagui'
import { ProductSingle } from '~/types/product'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import Skeleton from '~/components/skeleton'
import AddOns from '~/components/shop/addOns/add_ons'
import { ScrollView } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

let paddingTop

if (Platform.OS === 'ios') {
  paddingTop = 45
} else {
  paddingTop = 25
}

export default function ItemDetails() {
  const { productCode } = useLocalSearchParams()
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()

  const [quantity, setQuantity] = useState(1)
  const [totalPriceNumber, setTotalPriceNumber] = useState(0)
  const [items, setItems] = useState(0)
  const addressRef = usePryceStore((set) => set.addressRef)
  const [item, setItem] = useState<ProductSingle | null>(null)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const [selectedAddOns, setSelectedAddOns] = useState<Array<AddOn>>([])
  const productPrice = data?.find((e) => e.ProductCode === productCode)
  const [loading, isLoading] = useState<boolean>(false)
  const favorites = usePryceStore((set) => set.favorites)

  const { addProduct, reduceProduct, clearCart } = useBasketStore()

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    const productDetails = async () => {
      if (addressRef && productCode) {
        const productCodeString = Array.isArray(productCode)
          ? productCode[0]
          : productCode

        const item = await getProductById(addressRef, productCodeString)
        if (item) {
          setItem(item)
        } else {
          console.error('Product not found for code:', productCodeString)
        }
      }
    }

    productDetails()
  }, [addressRef, productCode, data])

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

  const addToCart = async () => {
    isLoading(true)
    if (addressRef && productCode) {
      const productCodeString = Array.isArray(productCode)
        ? productCode[0]
        : productCode

      const selectedProduct = await getProductById(
        addressRef,
        productCodeString
      )

      if (selectedProduct) {
        const unitPrice = selectedProduct.UnitPrice ?? 0
        const regularPrice = selectedProduct.RegularPrice ?? 0
        const numQuantity = quantity ?? 1

        const calculatedPrice =
          unitPrice < regularPrice ? unitPrice : regularPrice

        const totalProductPrice = calculatedPrice * numQuantity

        const totalAddOnsPrice = selectedAddOns.reduce((sum, addOn) => {
          const addOnUnitPrice = addOn.UnitPrice ?? 0
          const addOnRegularPrice = addOn.RegularPrice ?? 0

          const effectiveAddOnPrice =
            addOnUnitPrice < addOnRegularPrice
              ? addOnUnitPrice
              : addOnRegularPrice

          return sum + effectiveAddOnPrice * numQuantity
        }, 0)

        const priceToAdd = totalProductPrice + totalAddOnsPrice

        addProduct(selectedProduct, numQuantity, selectedAddOns)

        setTotalPriceNumber((prevTotal) => prevTotal + priceToAdd)
        setItems((prevItems) => prevItems + numQuantity)

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        router.back()
      } else {
        console.error('Product not found for code:', productCodeString)
      }
    }
    isLoading(false)
  }

  const removeFromCart = () => {
    if (item) {
      if (quantity > 1) {
        setQuantity(quantity - 1)
        reduceProduct(item)
      } else if (quantity === 1) {
        reduceProduct(item)
      }
    } else {
      console.error('Cannot remove item from cart: item is null')
    }
  }

  let calculatedPrice = 0

  if (productPrice) {
    calculatedPrice =
      productPrice.UnitPrice < productPrice.RegularPrice
        ? productPrice.UnitPrice
        : productPrice.RegularPrice
  }

  const totalPrice = quantity * (calculatedPrice || 0)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  })

  const addToFavoritesHandler = async (f: string) => {
    const favorites = usePryceStore.getState().favorites
    const isFavorite = favorites.some((fav) => fav.productCode === f)

    usePryceStore.getState().setFavorites(f)

    if (isFavorite) {
      Alert.alert(
        'Removed from Favorites',
        `You have removed product ${data && data.find((e) => e.ProductCode === productCode)?.Name} from your favourites.`
      )
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    } else {
      Alert.alert(
        'Added to Favorites',
        `You have added product ${data && data.find((e) => e.ProductCode === productCode)?.Name} to your favourites.`
      )
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 3,
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color={colorTokens.light.orange.orange9}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => addToFavoritesHandler(String(productCode))}
            >
              {favorites &&
              favorites.find((fav) => fav.productCode === productCode) ? (
                <AntDesign name="heart" size={24} color="#fff" />
              ) : (
                <AntDesign name="hearto" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {data && data.find((e) => e.ProductCode === productCode)?.Name}
              </Text>
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Image
          source={ProductsDetail.find((e) => e.id === productCode)?.image}
          style={[styles.image, imageAnimatedStyle]}
          entering={FadeIn.duration(400).delay(200)}
        />

        <View style={styles.animatedHeader}>
          <Animated.Text
            style={styles.animatedText}
            entering={FadeInLeft.duration(400).delay(200)}
          >
            {data && data.find((e) => e.ProductCode === productCode)?.Name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(400)}
            style={styles.animatedDesc}
          >
            {ProductsDetail.find((e) => e.id === productCode)?.description}
          </Animated.Text>
        </View>

        {/* <TouchableOpacity onPress={clearCart}>
          <Text>Clear</Text>
        </TouchableOpacity> */}

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
        ) : productCode === 'PGCM' || productCode === 'PGCMV' ? null : (
          <>
            <AddOns
              productCodeMap={exemptedOnProducts}
              realTimeProductData={data}
              selectedAddOns={selectedAddOns}
              onToggleAddOn={handleToggleAddOn}
            />
          </>
        )}
      </Animated.ScrollView>
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
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPending || loading ? (
            <ActivityIndicator
              size="large"
              color={colorTokens.light.orange.orange9}
            />
          ) : (
            <>
              <TouchableOpacity
                onPress={removeFromCart}
                style={{
                  backgroundColor: colorTokens.light.orange.orange9,
                  borderRadius: 20,
                  padding: 3,
                }}
              >
                <AntDesign name="minus" size={20} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  // flex: 1,
                  textAlign: 'center',
                  marginHorizontal: 15,
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
                  marginRight: 10,
                }}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
              <StyledButton
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={addToCart}
                disabled={isPending || loading}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  Add for {formatCurrency(totalPrice)}
                </Text>
              </StyledButton>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    width,
    height: IMG_HEIGHT,
  },
  header: {
    backgroundColor: 'white',
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animatedHeader: { height: 130, backgroundColor: 'white' },
  animatedText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  animatedDesc: {
    fontSize: 16,
    marginHorizontal: 16,
    lineHeight: 22,
    textAlign: 'justify',
    color: colorTokens.light.gray.gray11,
  },
})
