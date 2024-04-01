import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { OnboardingData } from '../../data/data'
import { StackNavigationProp } from '@react-navigation/stack'
import { router } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { AntDesign } from '@expo/vector-icons'
//   import {RootStackParamList} from '../../../navigator/RootNavigator';

type Props = {
  dataLength: number
  flatListIndex: SharedValue<number>
  flatListRef: AnimatedRef<FlatList<OnboardingData>>
  x: SharedValue<number>
}

const CustomButton = ({ flatListRef, flatListIndex, dataLength, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign)

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    }
  })

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    }
  })

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    }
  })

  const arrowColor = useAnimatedStyle(() => {
    const tintColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [
        colorTokens.light.orange.orange9,
        'white',
        colorTokens.light.orange.orange9,
      ]
    )

    return {
      tintColor: tintColor,
    }
  })

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['white', colorTokens.light.orange.orange9, 'white']
    )

    return {
      backgroundColor: backgroundColor,
    }
  })

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 })
        } else {
          router.push('/(onboarding)/home/login')
        }
      }}
    >
      <Animated.View
        style={[styles.container, buttonAnimationStyle, animatedColor]}
      >
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require('~/assets/ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle, arrowColor]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e2169',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    color: colorTokens.light.orange.orange9,
    fontSize: 16,
    position: 'absolute',
  },
})
