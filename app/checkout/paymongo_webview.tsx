import {
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  SafeAreaView,
  View,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useRef, useCallback } from 'react'
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'

type SearchParams = {
  url?: string
}

export default function PaymongoWebview() {
  const { url } = useLocalSearchParams<SearchParams>()
  const webViewRef = useRef<WebView>(null)
  const { width, height } = useWindowDimensions()

  // Improved injected JS with fallback to ensure postMessage works as expected
  const injectedJavaScript = `
    (function() {
      document.getElementById('backButton')?.addEventListener('click', function() {
        window.ReactNativeWebView.postMessage('backButton');
      });
    })();
  `

  // Using useCallback to prevent unnecessary re-renders
  const handleMessage = useCallback((event: any) => {
    const message = event?.nativeEvent?.data
    if (message === 'backButton') {
      router.back() // Navigate back
    } else {
      console.log('Message received from WebView:', message)
    }
  }, [])

  // Ensure url is valid
  if (!url) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              marginTop: 50,
              width: '100%',
              height: 40,
              backgroundColor: colorTokens.dark.orange.orange1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}
          >
            <Ionicons name="chevron-back" size={16} color={'white'} />
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>
              Return
            </Text>
          </TouchableOpacity>
        )}

        <Text>No URL provided</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 0,
            width: '100%',
            height: 40,
            backgroundColor: colorTokens.dark.orange.orange1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}
        >
          <Ionicons name="chevron-back" size={16} color={'white'} />
          <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>
            Return
          </Text>
        </TouchableOpacity>
      )}

      <WebView
        style={{
          flex: 1,
          height,
          width,
        }}
        source={{ uri: url }}
        originWhitelist={['*']}
        ref={webViewRef}
        allowFileAccess
        allowUniversalAccessFromFileURLs
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false} // Updated for better iOS compatibility
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        removeClippedSubviews
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage} // Correctly handle messages
      />
    </SafeAreaView>
  )
}
