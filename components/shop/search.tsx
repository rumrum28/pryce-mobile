import {
  View,
  Text,
  XStack,
  Input,
  Button,
  SizeTokens,
  TextArea,
} from 'tamagui'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'

export default function Search(props: { size: SizeTokens }) {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        borderColor: colorTokens.light.gray.gray5,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colorTokens.light.gray.gray2,
      }}
    >
      <Feather
        name="search"
        size={24}
        color="grey"
        style={{ marginLeft: 15 }}
      />
      <Input
        flex={1}
        size={props.size}
        placeholder="What are you looking?"
        style={{ borderColor: 'transparent', backgroundColor: 'transparent' }}
      />
    </View>
  )
}
