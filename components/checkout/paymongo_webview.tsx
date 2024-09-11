// import { WebView } from 'react-native-webview'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Text } from 'tamagui'
import { useRef, useState } from 'react'

/* <button class="button full-width button--secondary" type="button"><div class="button__content"><span>Back</span></div></button> */

export default function PaymongoWebview() {
  const { url } = useLocalSearchParams() as any
  const [webViewVisible, setWebViewVisible] = useState(true)
  const webViewRef = useRef(null)

  const handleNavigationChange = (navState: any) => {
    // Example: Detecting when a specific URL is hit or another condition met
    if (navState.url.includes('button full-width button--secondary')) {
      setWebViewVisible(false) // Close WebView
      // navigation.goBack() // Navigate back in the app
      router.back()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />

      {/* {url ? (
        <>
          {webViewVisible && (
            <WebView
              style={styles.webView}
              source={{ uri: url }}
              originWhitelist={['*']}
              ref={webViewRef}
              onNavigationStateChange={handleNavigationChange}
              // You can also handle hardware back button (Android) behavior here if needed
            />
          )}
        </>
      ) : null} */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
})
