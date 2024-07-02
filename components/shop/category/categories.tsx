import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import {
  CombinedArrayProps,
  FavoriteProps,
  FavoritesList,
  ProductSingle,
  ProductsProps,
} from '~/types/product'
import { ProductsDetail } from '~/utils/products'

export default function Categories({
  favorites,
  products,
}: {
  favorites: any
  products: any
}) {
  const [items, setItems] = useState<CombinedArrayProps>([])

  useEffect(() => {
    const filteredProducts = products.filter((e: ProductSingle) =>
      favorites.some((f: FavoritesList) => f.productCode === e.ProductCode)
    )

    console.log(filteredProducts)
    console.log(ProductsDetail)

    const combinedArray = filteredProducts.map((product: ProductSingle) => {
      const match = ProductsDetail.find(
        (info) => info.id === product.ProductCode
      )
      return match ? { ...product, ...match } : product
    })

    setItems(combinedArray)
  }, [favorites, products])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
    >
      {items.map((category, index) => (
        <View
          key={index}
          style={{
            height: 100,
            width: 150,
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
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(drawer)/shop/category/category',
                params: {
                  id: category.ProductCode,
                },
              })
            }
          >
            <Image
              source={category.image}
              style={{
                height: '80%',
                width: '100%',
              }}
            />
            <Text style={{ fontSize: 11, fontWeight: 'bold', padding: 3 }}>
              {category.name}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  )
}
