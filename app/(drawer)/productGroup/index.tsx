import { router } from 'expo-router'
import { FlatList } from 'react-native'
import { ScrollView } from 'tamagui'
import { ProductGroupItems } from '~/components/product_group_items'
import usePryceStore from '~/hooks/pryceStore'
import { ProductSingle, ProductsProps } from '~/types/product'
import { productDisplay } from '~/utils/products'

export default function ProductGroup({
  products,
}: {
  products: ProductsProps | undefined
}) {
  const favorites = usePryceStore((set) => set.favorites)
  const setFavorites = usePryceStore((set) => set.setFavorites)

  const addToFavoritesHandler = async (f: ProductSingle) => {
    setFavorites(f.ProductCode)
  }

  const productOnClickHandler = (product: ProductSingle) => {
    router.push({
      pathname: '/(drawer)/shop/details',
      params: {
        productCode: product.ProductCode,
      },
    })
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <FlatList
        data={productDisplay}
        renderItem={ProductGroupItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
