import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { CarouselType } from '~/data/mock'
import { SharedValue } from 'react-native-reanimated'
// import { Image } from 'tamagui'

type CarouselImageProps = {
  item: CarouselType
}

const RenderItem = ({ item }: CarouselImageProps) => {
  const { width } = useWindowDimensions()

  return (
    <View>
      <Image
        source={item.image}
        style={{
          width: width,
          height: 100,
        }}
        resizeMode="contain"
      />
    </View>
  )
}

export default RenderItem
