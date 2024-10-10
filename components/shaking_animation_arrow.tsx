import { FontAwesome6 } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

export const ShakingEmoticonArrow = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const shake = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    )

    // Start the animation when the component mounts
    shake.start()

    // Optionally stop the animation on unmount
    return () => shake.stop()
  }, [shakeAnim])

  // Interpolate the animated value to shake left and right
  const shakeInterpolate = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-3, 3], // Shake distance
  })

  return (
    <Animated.Text
      style={[
        styles.emoticon,
        { transform: [{ translateX: shakeInterpolate }] },
      ]}
    >
      <FontAwesome6
        name="angles-right"
        size={18}
        color={colorTokens.light.orange.orange9}
      />
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  emoticon: {
    fontSize: 100,
  },
})
