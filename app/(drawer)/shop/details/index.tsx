import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
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
import { Suspense, useEffect, useState } from 'react'
import { Image, Spinner, YStack } from 'tamagui'
import { ProductDisplayProps } from '~/types/product'
import { productDisplay, ProductsDetail } from '~/utils/products'
import PGCM from '~/components/pgcm'
import usePryceStore from '~/hooks/pryceStore'
import { useMutation } from '@tanstack/react-query'
import { changeAddressOnLoad, fetchProductsQuery } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { formatCurrency } from '~/utils/utils'

const Details = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const { idParam } = useLocalSearchParams()
  const [itemProducts, setItemProducts] = useState<ProductDisplayProps | null>(
    null
  )
  const { width } = Dimensions.get('window')
  const IMG_HEIGHT = 300

  const selectedUser = usePryceStore((state) => state.selectedUser)
  const token = usePryceStore((state) => state.token)
  const addressRef = usePryceStore((set) => set.addressRef)

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

  // const fetchProducts = useMutation({
  //   mutationFn: changeAddressOnLoad,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['fetchProductsOnLoad'],
  //     })

  //     if (data?.addressRef) {
  //       setAddressRef(data.addressRef)
  //     }
  //   },
  // })

  // useEffect(() => {
  //   if (selectedUser) {
  //     const userData: { token: string; accountNumber: string } = {
  //       token: token,
  //       accountNumber: selectedUser,
  //     }

  //     fetchProducts.mutate(userData)
  //   }
  // }, [selectedUser])

  useEffect(() => {
    if (idParam) {
      const getSingleData = productDisplay.filter(
        (e) => e.id === Number(idParam)
      )
      setItemProducts(getSingleData[0])
    }
  }, [idParam])

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
      paddingTop: Platform.OS === 'ios' ? 45 : 0,
    },
  })

  const productOnClickHandler = (productCode: string) => {
    router.push({
      pathname: '/(drawer)/shop/(modal)/item_details',
      params: { productCode },
    })
  }

  const displayGroups = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => productOnClickHandler(item)} key={index}>
      {fetchProducts.isPending ? (
        <View>
          <Text>to be replace with skeleton</Text>
          <YStack padding="$3" gap="$4" alignItems="flex-end" marginTop={20}>
            <Spinner size="large" color="$orange10" />
          </YStack>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {fetchProducts?.data?.find((e) => e.ProductCode === item)?.Name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colorTokens.light.gray.gray9,
                paddingVertical: 4,
              }}
            >
              {
                fetchProducts?.data?.find((e) => e.ProductCode === item)
                  ?.ProductCode
              }
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colorTokens.light.gray.gray11,
              }}
            >
              {formatCurrency(
                fetchProducts?.data?.find((e) => e.ProductCode === item)
                  ?.RegularPrice || 0
              )}
            </Text>
          </View>
          <Image
            source={ProductsDetail.find((e) => e.id === item)?.image}
            style={{ height: 80, width: 80, borderRadius: 4 }}
          />
        </View>
      )}
    </TouchableOpacity>
  )

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
                  {itemProducts?.description}
                </Text>
              </Animated.View>
            ),
          }}
        />

        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <Animated.Image
            source={
              itemProducts?.image
                ? itemProducts?.image
                : require('~/assets/images/no-image.png')
            }
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
              {itemProducts?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                margin: 16,
                lineHeight: 22,
                color: colorTokens.light.gray.gray9,
              }}
            >
              {itemProducts?.description}
            </Text>
          </View>

          {itemProducts && (
            <FlatList
              data={itemProducts.productCode}
              scrollEnabled={false}
              renderItem={displayGroups}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    marginHorizontal: 16,
                    height: 1,
                    backgroundColor: colorTokens.light.gray.gray4,
                  }}
                />
              )}
            />
          )}

          {itemProducts?.productCode.some(
            (e) => e === 'PGCM' || e === 'PGCMV'
          ) ? (
            <PGCM />
          ) : null}

          <View style={{ marginVertical: 20 }} />
        </Animated.ScrollView>

        {itemProducts && (
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
                      {itemProducts.id}
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
