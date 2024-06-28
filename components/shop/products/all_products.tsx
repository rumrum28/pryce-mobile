import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { View, Text, Image } from 'react-native'
import { ProductsProps } from '~/types/product'
import { ProductsDetail } from '~/utils/products'
import { formatCurrency } from '~/utils/utils'

export default function AllProducts({
  products,
}: {
  products: ProductsProps | undefined
}) {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <Link
            href={'/'}
            key={index}
            style={{
              height: 300,
              width: 'auto',
              backgroundColor: 'white',
              marginVertical: 10,
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
                ProductsDetail.find((p) => p.id === product.ProductCode)?.image
              }
              style={{
                height: 200,
                width: 200,

                flex: 1,
              }}
              resizeMode="contain"
            />

            <View style={{ flex: 2, padding: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingVertical: 5,
                }}
              >
                {product.Name}
              </Text>
              <Text
                style={{
                  color: colorTokens.light.gray.gray9,
                }}
              >
                test
              </Text>
              <Text
                style={{
                  color: colorTokens.light.gray.gray12,
                  paddingVertical: 2,
                }}
              >
                {formatCurrency(product.RegularPrice)}
              </Text>
            </View>
          </Link>
        ))}
    </View>
  )
}
