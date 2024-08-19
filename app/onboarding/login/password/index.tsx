import { View, Text } from 'tamagui'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colorTokens } from '@tamagui/themes'
import LoginForm from '~/components/login/login-form'
import { fonts } from '~/utils/fonts'

export default function LogIn() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <LoginForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textContainer: {
    marginVertical: 50,
  },
  headingText: {
    fontSize: 36,
    color: colorTokens.light.gray.gray11,
    fontFamily: fonts.SemiBold,
  },
})
