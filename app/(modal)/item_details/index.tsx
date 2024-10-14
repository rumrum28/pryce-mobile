import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useEffect, useState } from 'react'
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
import { AntDesign, Ionicons } from '@expo/vector-icons'
import StyledButton from '~/components/styled_button'
import usePryceStore from '~/hooks/pryceStore'
import { exemptedOnProducts, ProductsDetail } from '~/utils/products'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import Skeleton from '~/components/skeleton'
import AddOns from '~/components/shop/addOns/add_ons'
import { Toast } from 'toastify-react-native'
import useCartStore from '~/hooks/productsStore'
import { AddOn } from '~/types/product'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

let paddingTop = 25 as number

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
  const addressRef = usePryceStore((set) => set.addressRef)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const [selectedAddOns, setSelectedAddOns] = useState<Array<AddOn>>([])
  const cart = useCartStore((state) => state.cart)
  const addProduct = useCartStore((state) => state.addProduct)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    if (data) {
      const singleProductData = data?.find((e) => e.ProductCode === productCode)

      if (singleProductData) {
        const activePrice =
          singleProductData.UnitPrice < singleProductData.RegularPrice
            ? singleProductData.UnitPrice
            : singleProductData.RegularPrice

        setTotalPrice(activePrice)
      }
    }
  }, [data])

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

  useEffect(() => {
    console.log(cart)
  }, [cart])

  const addToCart = async () => {
    if (productCode) {
      const singleDataInfo = {
        productCode: String(productCode),
        quantity,
      }

      addProduct(singleDataInfo)
      router.back()
    } else {
      Toast.error(`Missing product code`)
    }
  }

  const plusHandler = () => {
    if (productCode) {
      const singleProductData = data?.find((e) => e.ProductCode === productCode)
      if (singleProductData) {
        const activePrice =
          singleProductData.UnitPrice < singleProductData.RegularPrice
            ? singleProductData.UnitPrice
            : singleProductData.RegularPrice

        console.log(quantity)

        if (quantity > 0) {
          setQuantity(quantity + 1)
          setTotalPrice((quantity + 1) * activePrice)
        }
      }
    } else {
      Toast.error(`Cannot add item from cart`)
    }
  }

  const minusHandler = () => {
    if (productCode) {
      const singleProductData = data?.find((e) => e.ProductCode === productCode)
      if (singleProductData) {
        const activePrice =
          singleProductData.UnitPrice < singleProductData.RegularPrice
            ? singleProductData.UnitPrice
            : singleProductData.RegularPrice

        if (quantity > 1) {
          setQuantity(quantity - 1)
          setTotalPrice((quantity - 1) * activePrice)
        }
      }
    } else {
      Toast.error(`Cannot remove item from cart`)
    }
  }

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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom']}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
            headerTransparent: true,
            headerBackground: () => (
              <Animated.View style={[styles.header, headerAnimatedStyle]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {data &&
                    data.find((e) => e.ProductCode === productCode)?.Name}
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

          <View style={{ margin: 16 }}>
            <Animated.Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 10,
              }}
              entering={FadeInLeft.duration(400).delay(200)}
            >
              {data && data.find((e) => e.ProductCode === productCode)?.Name}
            </Animated.Text>
            <Animated.Text
              entering={FadeInLeft.duration(400).delay(400)}
              style={{
                fontSize: 16,
                // marginBottom: 8,
                color: colorTokens.light.gray.gray11,
              }}
            >
              {ProductsDetail.find((e) => e.id === productCode)?.description}
            </Animated.Text>
          </View>

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
              <Animated.Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  margin: 16,
                }}
                entering={FadeInLeft.duration(400).delay(200)}
              >
                Add-ons
              </Animated.Text>

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
            {isPending ? (
              <ActivityIndicator
                size="large"
                color={colorTokens.light.orange.orange9}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={minusHandler}
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
                  onPress={plusHandler}
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
                  disabled={isPending}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    Add for {totalPrice && formatCurrency(totalPrice)}
                  </Text>
                </StyledButton>
              </>
            )}
          </View>
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
})
