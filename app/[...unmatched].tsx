import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'
// import { YStack } from 'tamagui'

// import { Container, Main, Subtitle, Title } from '../tamagui.config'

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn't exist.</Text>
      </View>
    </View>
  )
}
