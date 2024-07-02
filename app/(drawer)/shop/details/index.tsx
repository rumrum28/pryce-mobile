import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { Link, Stack, router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { SafeAreaView } from 'react-native-safe-area-context'
import StyledButton from '~/components/styled_button'
import { useMutation } from '@tanstack/react-query'
import { Suspense, useEffect, useState } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { queryClient } from '~/hooks/queryClient'
import { fetchProductsQuery } from '~/server/api'
import { Spinner, YStack } from 'tamagui'
import { ProductSingle } from '~/types/product'
import { ProductsDetail } from '~/utils/products'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

let paddingTop

if (Platform.OS === 'ios') {
  paddingTop = 45
} else {
  paddingTop = 0
}

const Details = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const { productCode } = useLocalSearchParams()
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const addressRef = usePryceStore((state) => state.addressRef)
  const [items, setItems] = useState<ProductSingle | null>(null)

  const fetchProducts = useMutation({
    mutationFn: fetchProductsQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['changeAddress'],
      })
    },
  })

  useEffect(() => {
    if (selectedUser && addressRef) {
      fetchProducts.mutate(addressRef)
    }
  }, [selectedUser, addressRef])

  useEffect(() => {
    if (fetchProducts.data) {
      const getSingleData = fetchProducts.data.filter((item) => {
        return item.ProductCode === productCode
      })
      setItems(getSingleData[0])
    }
  }, [fetchProducts])

  // const renderItem: ListRenderItem<any> = ({ item, index }) => (
  //   <Link
  //     href={{
  //       pathname: '/(drawer)/shop/(modal)/item_details',
  //       params: {
  //         id: item.id,
  //       },
  //     }}
  //     asChild
  //   >
  //     <TouchableOpacity
  //       key={index}
  //       style={{
  //         flexDirection: 'row',
  //         backgroundColor: 'white',
  //         padding: 16,
  //       }}
  //     >
  //       <View style={{ flex: 1 }}>
  //         <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
  //         <Text
  //           style={{
  //             fontSize: 14,
  //             color: colorTokens.light.gray.gray9,
  //             paddingVertical: 4,
  //           }}
  //         >
  //           {item.category}
  //         </Text>
  //         <Text
  //           style={{
  //             fontSize: 14,
  //             fontWeight: 'bold',
  //             color: colorTokens.light.gray.gray11,
  //           }}
  //         >
  //           {formatCurrency(item.unit_price)}
  //         </Text>
  //       </View>
  //       <Image
  //         source={item.img}
  //         style={{ height: 80, width: 80, borderRadius: 4 }}
  //       />
  //     </TouchableOpacity>
  //   </Link>
  // )

  // if (fetchProducts.isPending) {
  //   return (
  //     <YStack padding="$3" gap="$4" alignItems="center" marginTop={20}>
  //       <Spinner size="large" color="$orange10" />
  //     </YStack>
  //   )
  // }

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
    <Suspense
      fallback={
        <YStack padding="$3" gap="$4" alignItems="center" marginTop={20}>
          <Spinner size="large" color="$orange10" />
        </YStack>
      }
    >
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 30 }}>
        <Stack.Screen
          options={{
            title: '',
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
                  {items?.Name}
                </Text>
              </Animated.View>
            ),
          }}
        />

        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <Animated.Image
            source={ProductsDetail.find((e) => e.id === productCode)?.image}
            style={[styles.image, imageAnimatedStyle]}
          />
          <View style={{ height: 200, backgroundColor: 'white' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 16,
              }}
            >
              {items?.Name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                margin: 16,
                lineHeight: 22,
                color: colorTokens.light.gray.gray9,
              }}
            >
              {ProductsDetail.find((e) => e.id === productCode)?.description}
            </Text>
          </View>
          {/* <FlatList
          data={filteredProducts}
          scrollEnabled={false}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginHorizontal: 16,

                height: 1,
                backgroundColor: colorTokens.light.gray.gray4,
              }}
            />
          )}
        /> */}
        </Animated.ScrollView>

        {items && (
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
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 10,
              }}
              edges={['bottom']}
            >
              <Link href="/(drawer)/shop/(modal)/basket" asChild>
                <StyledButton>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: colorTokens.light.orange.orange9,
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 8,
                        backgroundColor: 'white',
                      }}
                    >
                      {items.Name}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      View Basket
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      1
                    </Text>
                  </View>
                </StyledButton>
              </Link>
            </SafeAreaView>
          </View>
        )}
      </View>
    </Suspense>
  )
}
export default Details

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
