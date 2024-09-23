import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import { FlatList, Pressable } from 'react-native'
import { Image, ScrollView, Text, View } from 'tamagui'
import { ProductDisplayProps } from '~/types/product'
import { exemptedOnProducts, productDisplay } from '~/utils/products'

export default function ProductGroup() {
  const productOnClickHandler = (i: number) => {
    router.push({
      pathname: '/details',
      params: {
        idParam: i,
      },
    })
  }

  const productGroupItems = ({ item }: { item: ProductDisplayProps }) => {
    return (
      <Pressable
        onPress={() => productOnClickHandler(item.id)}
        key={item.id}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            height: 200,
            width: 200,
            backgroundColor: 'white',
            elevation: 2,
            shadowColor: 'black',
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowOpacity: 0.06,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          <Image
            source={item.image}
            style={{ height: '100%', width: '100%', flex: 1 }}
            // resizeMode="fit"
          />

          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: colorTokens.light.gray.gray9,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </Pressable>
    )
    // }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
      <FlatList
        data={productDisplay}
        renderItem={productGroupItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
