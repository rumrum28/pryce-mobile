import { router } from 'expo-router'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { categories } from '~/data/mock'

export default function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
    >
      {categories.map((category, index) => (
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
                  id: category.id,
                },
              })
            }
          >
            <Image
              source={category.img}
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
