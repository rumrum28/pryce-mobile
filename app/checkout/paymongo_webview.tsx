import { WebView } from 'react-native-webview'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Text } from 'tamagui'

export default function PaymongoWebview() {
  const { url } = useLocalSearchParams() as any

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />

      {url ? (
        <WebView
          style={styles.webView}
          originWhitelist={['*']}
          source={{ uri: url }}
        />
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
})
