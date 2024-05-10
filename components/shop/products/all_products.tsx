import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { allProducts } from '~/data/mock'
import { formatCurrency } from '~/utils/utils'

export default function AllProducts() {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      {allProducts.map((item, index) => (
        <Link href={'/'} key={index} asChild>
          <TouchableOpacity>
            <View
              style={{
                height: 300,
                width: '100%',
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
                source={item.img}
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
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingVertical: 5,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: colorTokens.light.gray.gray9,
                  }}
                >
                  {item.category}
                </Text>
                <Text
                  style={{
                    color: colorTokens.light.gray.gray12,
                    paddingVertical: 2,
                  }}
                >
                  {formatCurrency(item.unit_price)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  )
}
