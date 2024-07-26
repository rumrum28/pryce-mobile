import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import { FlatList, Pressable } from 'react-native'
import { Image, ScrollView, Text, View } from 'tamagui'
import { ProductDisplayProps } from '~/types/product'
import { exemptedOnProducts, productDisplay } from '~/utils/products'

export default function ProductGroup() {
  const productOnClickHandler = (i: number) => {
    router.push({
      pathname: '/(drawer)/shop/details',
      params: {
        idParam: i,
      },
    })
  }

  const productGroupItems = ({ item }: { item: ProductDisplayProps }) => {
    return (
      <Pressable onPress={() => productOnClickHandler(item.id)} key={item.id}>
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
            source={item.image}
            style={{ height: '100%', width: '100%', flex: 5 }}
            objectFit="cover"
          />

          <View style={{ flex: 2, padding: 10 }}>
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
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <FlatList
        data={productDisplay}
        renderItem={productGroupItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
