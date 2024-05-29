import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { View, Text, Image } from 'react-native'
import { ProductsProps } from '~/types/product'
import { formatCurrency } from '~/utils/utils'

const productCodesImages = [
  { id: 'MEDREG', image: require('~/assets/png/products/MEDREG.png') },
  { id: 'ACCPKB', image: require('~/assets/png/products/ACCPKB.png') },
  { id: 'ACCPGS', image: require('~/assets/png/products/ACCPGS.png') },
  { id: 'ACCHRCB', image: require('~/assets/png/products/ACCHRCB.png') },
  { id: 'PGCM', image: require('~/assets/png/products/PGCM.png') },
  { id: 'CYL11', image: require('~/assets/png/products/CYL11.png') },
  { id: 'CYL22', image: require('~/assets/png/products/CYL22.png') },
  { id: 'CYL50', image: require('~/assets/png/products/CYL50.png') },
  { id: 'MO2TST', image: require('~/assets/png/products/MO2TST.png') },
  { id: 'MO2TFT', image: require('~/assets/png/products/MO2TFT.png') },
  { id: 'MO220C', image: require('~/assets/png/products/MO220C.png') },
  { id: 'MO2105C', image: require('~/assets/png/products/MO2105C.png') },
  { id: 'LPG11C', image: require('~/assets/png/products/LPG11C.png') },
  { id: 'CYL2.7', image: require('~/assets/png/products/CYL2.7.png') },
  { id: 'LPG2.7C', image: require('~/assets/png/products/LPG2.7C.png') },
  { id: 'LPG2.7CCPK', image: require('~/assets/png/products/LPG2.7CCPK.png') },
  { id: 'LPG22C', image: require('~/assets/png/products/LPG22C.png') },
  { id: 'LPG50C', image: require('~/assets/png/products/LPG50C.png') },
]

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
                productCodesImages.find((p) => p.id === product.ProductCode)
                  ?.image
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
