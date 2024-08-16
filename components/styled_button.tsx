import React, { FunctionComponent, ReactNode, forwardRef, Ref } from 'react'
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacity,
  Text,
} from 'react-native'
import { colorTokens } from '@tamagui/themes'
import styled from 'styled-components/native'

type ButtonProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  loading?: boolean
}

const ButtonView = styled(TouchableOpacity)`
  background-color: ${colorTokens.light.orange.orange9};
  padding-horizontal: 16px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
`

type StyledButtonRef = TouchableOpacity

const StyledButton: FunctionComponent<ButtonProps> = forwardRef(
  (
    { children, style, textStyle, onPress, loading },
    ref: Ref<StyledButtonRef>
  ) => {
    return (
      <ButtonView ref={ref} onPress={onPress} style={style} disabled={loading}>
        {children}
      </ButtonView>
    )
  }
)

export default StyledButton
