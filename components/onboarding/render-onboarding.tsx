import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { OnboardingData } from '../../data/data'

type Props = {
  index: number
  x: SharedValue<number>
  item: OnboardingData
}

const RenderOnboardingItem = ({ index, x, item }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions()

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    )

    return {
      transform: [{ scale: scale }],
    }
  })

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Image
        source={item.image as ImageSourcePropType}
        style={{
          height: '60%',
          resizeMode: 'contain',
          marginTop: 30,
        }}
      />
      <Text style={[styles.itemText, { color: item.textColor }]}>
        {item.title}
      </Text>
      <Text style={[styles.itemDes, { color: item.textColor }]}>
        {item.description}
      </Text>
    </View>
  )
}

export default RenderOnboardingItem

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  itemDes: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
