import { View, Text, StyleSheet, TextInputProps, TextInput } from 'react-native'
import React, {
  FunctionComponent,
  ReactNode,
  ComponentProps,
  useState,
} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import styled from 'styled-components/native'

type ExtraInputProps = {
  label: ReactNode
  icon: ComponentProps<typeof MaterialCommunityIcons>['name']
  isPassword?: Boolean
}

type InputProps = TextInputProps & ExtraInputProps

const InputWrapper = styled.View`
  width: 100%;
`

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  padding-right: 10px;
`
const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 15px;
  z-index: 1;
`

const LabelField = styled.Text`
  font-size: 16px;
`

const InputField = styled.TextInput`
  border-color: ${colorTokens.light.orange.orange9};
  height: 60px;
  background-color: white;
  border-width: 2px;
  border-radius: 10px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 55px;
  font-size: 16px;
  color: black;
`

const StyledInput: FunctionComponent<InputProps> = ({
  icon,
  label,
  isPassword,
  ...props
}) => {
  const [inputBorderColor, setInputBorderColor] = useState(
    colorTokens.light.orange.orange6
  )
  const [hidePassword, setHidePassword] = useState(true)

  const customOnFocus = () => {
    props?.onFocus
    setInputBorderColor(colorTokens.light.orange.orange9)
  }
  const customOnBlur = () => {
    props?.onBlur
    setInputBorderColor(colorTokens.light.orange.orange6)
  }

  return (
    <InputWrapper>
      <LeftIcon>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={colorTokens.light.orange.orange9}
        />
      </LeftIcon>
      <LabelField>{label}</LabelField>
      <InputField
        {...props}
        placeholderTextColor="gray"
        style={[{ borderColor: inputBorderColor }, props.style]}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword)
          }}
        >
          <MaterialCommunityIcons
            name={hidePassword ? 'eye-off' : 'eye'}
            size={30}
            color="black"
          />
        </RightIcon>
      )}
    </InputWrapper>
  )
}
export default StyledInput
