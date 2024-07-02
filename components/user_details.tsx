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
  StatusBar,
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
import { allProducts, getFilteredProductById } from '~/data/mock'
import { formatCurrency } from '~/utils/utils'
import useBasketStore from '~/utils/basketStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import StyledButton from '~/components/styled_button'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

const UserDetails = ({ productCode }: { productCode: string }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)
  const { items, total } = useBasketStore()
  const item = getFilteredProductById(String(productCode))

  const filteredProducts = allProducts.filter(
    (product) => item?.name && product.name.includes(item.name)
  )

  const formattedPrice = formatCurrency(Number(total))

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

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link
      href={{
        pathname: '/(drawer)/shop/(modal)/item_details',
        params: {
          id: item.id,
        },
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
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
          <Text
            style={{
              fontSize: 14,
              color: colorTokens.light.gray.gray9,
              paddingVertical: 4,
            }}
          >
            {item.category}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: colorTokens.light.gray.gray11,
            }}
          >
            {formatCurrency(item.unit_price)}
          </Text>
        </View>
        <Image
          source={item.img}
          style={{ height: 80, width: 80, borderRadius: 4 }}
        />
      </TouchableOpacity>
    </Link>
  )

  return (
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item?.name}
              </Text>
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={item?.image}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View
          style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              margin: 16,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              margin: 16,
              lineHeight: 22,
              color: colorTokens.light.gray.gray9,
            }}
          >
            {item?.description}
          </Text>
        </View>
        <FlatList
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
        />
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
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

export default UserDetails
