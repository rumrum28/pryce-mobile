import { Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']

export default function DialPad({
  onPress,
  pinLength,
}: {
  onPress: (value: (typeof dialPad)[number]) => void
  pinLength: number
}) {
  const { width } = Dimensions.get('window')


  const _gap = 14

  const dialPadSize = width * 0.2
  const dialPadFontSize = dialPadSize * 0.4

  return (
    <FlatList
      data={dialPad}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      columnWrapperStyle={{ gap: _gap * 2 }}
      contentContainerStyle={{ gap: _gap * 2 }}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(item)}
            disabled={item === ''}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize / 2,
                borderWidth: typeof item === 'number' ? 1 : 0,
                borderColor: colorTokens.light.orange.orange6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item === 'del' ? (
                <Ionicons
                  name="backspace-outline"
                  size={dialPadFontSize}
                  color={colorTokens.light.orange.orange9}
                />
              ) : (
                <Text
                  style={{
                    fontSize: dialPadFontSize,
                    color: colorTokens.light.orange.orange9,
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonContainer: {
    borderRadius: 100,
    paddingHorizontal: 70,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: colorTokens.light.orange.orange9,
  },
})
