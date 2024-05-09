import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { carousel } from '~/data/mock'

export default function Carousel() {
  const { width, height } = useWindowDimensions()

  return (
    <View style={{ marginBottom: 10 }}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        showPagination={false}
        autoplayLoop
        data={carousel}
        renderItem={({ item }) => (
          <Image
            style={{
              height: height * 0.1,
              width,
            }}
            resizeMode="contain"
            source={{ uri: item.uri }}
          />
        )}
      />
    </View>
  )
}
