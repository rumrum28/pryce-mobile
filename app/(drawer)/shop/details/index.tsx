import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  ListRenderItem,
  Image,
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
import { formatCurrency } from '~/utils/utils'
import useBasketStore from '~/utils/basketStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import StyledButton from '~/components/styled_button'
import { useEffect, useState } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { ProductDisplayProps } from '~/types/product'
import { productDisplay, ProductsDetail } from '~/utils/products'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import Skeleton from '~/components/skeleton'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

let paddingTop

if (Platform.OS === 'ios') {
  paddingTop = 45
} else {
  paddingTop = 0
}

const Details = () => {
  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const { items, total } = useBasketStore()
  const addressRef = usePryceStore((set) => set.addressRef)
  const { id } = useLocalSearchParams()
  const [itemProducts, setItemProducts] = useState<ProductDisplayProps | null>(
    null
  )

  const formattedPrice = formatCurrency(Number(total))

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [addressRef, fetchProductsDetails])

  useEffect(() => {
    if (id) {
      const getSingleData = productDisplay.filter((e) => e.id === Number(id))
      setItemProducts(getSingleData[0])
    }
  }, [id])

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

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const productCode = item
    return (
      <Link
        href={{
          pathname: '/(drawer)/shop/(modal)/item_details',
          params: { productCode },
        }}
        asChild
      >
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {data?.find((e) => e.ProductCode === item)?.Name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colorTokens.light.gray.gray9,
                paddingVertical: 4,
              }}
            >
              {data?.find((e) => e.ProductCode === item)?.ProductCode}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colorTokens.light.gray.gray11,
              }}
            >
              {formatCurrency(
                data?.find((e) => e.ProductCode === item)?.UnitPrice || 0
              )}
            </Text>
          </View>
          <Image
            source={ProductsDetail.find((e) => e.id === item)?.image}
            style={{ height: 80, width: 80, borderRadius: 4 }}
          />
        </TouchableOpacity>
      </Link>
    )
  }

  return (
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
                {itemProducts?.name}
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
              marginHorizontal: 16,
              lineHeight: 22,
              color: colorTokens.light.gray.gray9,
              textAlign: 'justify',
            }}
          >
            {itemProducts?.description}
          </Text>
        </View>
        {isPending && itemProducts ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              padding: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Skeleton width={200} height={20} />
              </View>
              <View
                style={{
                  paddingVertical: 4,
                }}
              >
                <Skeleton width={100} height={20} />
              </View>
              <View>
                <Skeleton width={100} height={20} />
              </View>
            </View>
            <View>
              <Skeleton width={90} height={100} />
            </View>
          </View>
        ) : (
          <FlatList
            data={itemProducts?.productCode || []}
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
          />
        )}
      </Animated.ScrollView>
      {items > 0 && (
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
            style={{ flex: 1, backgroundColor: 'white' }}
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
                    {items}
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
                    {formattedPrice}
                  </Text>
                </View>
              </StyledButton>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </View>
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
