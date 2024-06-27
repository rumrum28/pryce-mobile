import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
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

export default function Products() {
  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/(drawer)/shop/details',
          params: {
            id: item.id,
          },
        })
      }
      key={item.id}
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
              fontSize: 14,
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
        </View>
      </View>
    </Pressable>
  )

  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}
