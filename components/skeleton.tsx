import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

interface SkeletonProps {
  variant?: 'box' | 'circle'
  width: number | string
  height: number
}

export default function Skeleton({ width, height, variant }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.2))

  let borderRadius = 0

  if (variant === 'circle') {
    borderRadius =
      typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start()
  }, [])

  // Ensuring `width` is a number or handled correctly
  const widthStyle = typeof width === 'number' ? width : undefined

  return (
    <Animated.View
      style={[
        { opacity: opacity.current, height, width: widthStyle, borderRadius },
        styles.skeleton,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#9e9e9e',
  },
})
