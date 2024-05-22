declare module 'react-native-cyberpunk-button' {
  import { ComponentType } from 'react'
  interface CyberpunkButtonProps {
    onPress?: () => void
    text?: string
    buttonHeight?: number // Add this line if buttonHeight is a valid prop
    mainColor?: string // Ensure this prop is listed if it's valid
    repeatDelay?: number // Ensure this prop is listed if it's valid
    label?: string // Ensure this prop is listed if it's valid
  }
  const CyberpunkButton: ComponentType<CyberpunkButtonProps>
  export default CyberpunkButton
}
