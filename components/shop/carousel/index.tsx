import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  ViewToken,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CarouselType, carousel } from '~/data/mock'
import { colorTokens } from '@tamagui/themes'
import { Image } from 'tamagui'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import RenderItem from './render_Item'
import Pagination from './pagination'

export default function Carousel() {
  const x = useSharedValue(0)
  const [data, setData] = useState(carousel)
  const { width } = useWindowDimensions()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paginationIndex, setPaginationIndex] = useState(0)
  const ref = useAnimatedRef<Animated.FlatList<any>>()
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const interval = useRef<NodeJS.Timeout>()
  const offset = useSharedValue(0)

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[]
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setCurrentIndex(viewableItems[0].index)
      setPaginationIndex(viewableItems[0].index % carousel.length)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ])

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x
    },
  })

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true)
  })

  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width
      }, 4000)
    } else {
      clearInterval(interval.current)
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [isAutoPlay, offset, width])

  return (
    <View style={{}}>
      <Animated.FlatList
        data={data}
        ref={ref}
        style={{ flexGrow: 0 }}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false)
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true)
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data, ...carousel])}
        onEndReachedThreshold={0.5}
        keyExtractor={(_, index) => `list_item${index}`}
        renderItem={({ item }) => {
          return <RenderItem item={item} />
        }}
      />
      <Pagination paginationIndex={paginationIndex} />
    </View>
  )
}
