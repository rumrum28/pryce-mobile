import {
  View,
  Text,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colorTokens } from '@tamagui/themes'

type Nullable<T> = T | null

export default function OtpInput({
  value,
  disabled,
  onChange,
}: {
  value: string[]
  disabled: boolean
  onChange: (value: string[]) => void
}) {
  const length = 6
  const inputRefs = useRef<Array<Nullable<TextInput>>>([])

  const onChangeValue = (text: string, index: number) => {
    const newValue = value.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text
      }

      return item
    })

    onChange(newValue)
  }

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index)

    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus()
    }

    return inputRefs?.current[index - 1]?.focus()
  }

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = event

    if (nativeEvent.key === 'Backspace') {
      handleChange('', index)
    }
  }

  return (
    <View style={styles.container}>
      {[...new Array(length)].map((item, index) => (
        <TextInput
          ref={(ref) => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref]
            }
          }}
          key={index}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          style={styles.input}
          keyboardType="decimal-pad"
          testID={`OTPInput-${index}`}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleBackspace(event, index)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 50,
  },
  input: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: colorTokens.light.orange.orange9,
    backgroundColor: 'white',
    borderRadius: 10,
  },
})
