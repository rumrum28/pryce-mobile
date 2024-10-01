import { colorTokens } from '@tamagui/themes'
import { Link, router } from 'expo-router'
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import { ProductDisplayProps } from '~/types/product'
import { productDisplay } from '~/utils/products'

export default function Products() {
  const renderItem = ({ item }: { item: ProductDisplayProps }) => {
    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/details',
            params: {
              id: item.id,
            },
          })
        }
        key={item.id}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            height: 230,
            width: 300,
            elevation: 2,
            shadowColor: 'transparent',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.06,
            // borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <Image
            source={item.image}
            style={{ height: '100%', width: '100%', flex: 7, borderRadius: 10 }}
            // resizeMode="fit"
          />

          <View style={{ flex: 2 }}>
            <View style={{ paddingTop: 15 }}>
              <Text
                style={{
                  color: colorTokens.light.gray.gray12,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
    // }
  }

  return (
    <ScrollView>
      <FlatList
        data={productDisplay}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
