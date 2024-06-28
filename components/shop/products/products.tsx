import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { filteredProducts } from '~/data/mock'
import { ProductSingle, ProductsProps } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import { topPickProducts } from '~/utils/topPickProducts'

export default function Products({
  products,
}: {
  products: ProductsProps | undefined
}) {
  const [topPicks, setTopPicks] = useState<ProductsProps>([])

  const renderItem = ({ item }: { item: ProductSingle }) => {
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/(drawer)/shop/details',
            params: {
              id: item.ProductCode,
            },
          })
        }
        key={item.ProductCode}
      >
        <View
          style={{
            height: 230,
            width: 300,
            backgroundColor: 'white',
            marginEnd: 10,
            elevation: 2,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.06,
            borderRadius: 4,
          }}
        >
          <Image
            source={
              ProductsDetail.find((p) => p.id === item.ProductCode)?.image
            }
            style={{
              height: '100%',
              width: '100%',
              flex: 5,
            }}
            resizeMode="stretch"
          />

          <View style={{ flex: 2, padding: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                paddingVertical: 5,
              }}
            >
              {item.UnitPrice}
            </Text>
            <Text
              style={{
                color: colorTokens.light.gray.gray9,
              }}
            >
              {item.Name}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter((product) =>
        topPickProducts.includes(product.ProductCode)
      )
      setTopPicks(filteredProducts)
    }
  }, [products])

  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <FlatList
        data={topPicks}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
