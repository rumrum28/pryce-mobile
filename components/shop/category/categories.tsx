import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native'
import {
  FavoriteProps,
  FavoritesList,
  ProductSingle,
  ProductsProps,
  ProductDisplayProps,
} from '~/types/product'
import { ProductsDetail } from '~/utils/products'

export default function Categories({
  favorites,
  products,
}: {
  favorites: any
  products: any
}) {
  const [items, setItems] = useState<ProductSingle[] | null>(null)

  useEffect(() => {
    const filteredProducts = products.filter((e: ProductSingle) =>
      favorites.some((f: FavoritesList) => f.productCode === e.ProductCode)
    )

    const combinedArray = filteredProducts.map((product: ProductSingle) => {
      const match = ProductsDetail.find(
        (info) => info.id === product.ProductCode
      )
      return match ? { ...product, ...match } : product
    })

    setItems(combinedArray)
  }, [favorites, products])

  const productOnClickHandler = (product: ProductSingle) => {
    router.push({
      pathname: '/(drawer)/shop/(modal)/item_details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
    >
      {items &&
        items.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => productOnClickHandler(category)}
            style={{ paddingHorizontal: 16 }}
          >
            <View
              style={{
                height: 100,
                width: 150,
                backgroundColor: 'white',
                elevation: 2,
                shadowColor: 'black',
                shadowOffset: {
                  width: 4,
                  height: 8,
                },
                shadowOpacity: 0.06,
                borderRadius: 20,
                // padding: 20,
                overflow: 'hidden',
              }}
            >
              <ImageBackground
                source={
                  ProductsDetail.find((e) => e.id === category.ProductCode)
                    ?.image
                }
                style={{
                  height: '100%',
                  width: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: '#FF5F0A',
                    borderWidth: 1,
                    borderColor: '#FFD1A5',
                    paddingHorizontal: 5,
                    backgroundColor: '#FFF6EC',
                  }}
                >
                  {
                    ProductsDetail.find((e) => e.id === category.ProductCode)
                      ?.name
                  }
                </Text>
              </ImageBackground>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  )
}
