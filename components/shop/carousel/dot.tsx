import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'

type DotProps = {
  index: number
  paginationIndex: number
}

const Dot = ({ index, paginationIndex }: DotProps) => {
  return (
    <View style={paginationIndex === index ? styles.dot : styles.dotOpacity} />
  )
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colorTokens.light.orange.orange9,
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  dotOpacity: {
    backgroundColor: colorTokens.light.orange.orange9,
    height: 7,
    width: 7,
    marginHorizontal: 2,
    borderRadius: 8,
    opacity: 0.5,
  },
})

export default Dot
