import {
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  SafeAreaView,
  View,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useRef } from 'react'
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

  const injectedJavaScript = `
    document.getElementById('backButton').addEventListener('click', function() {
      window.ReactNativeWebView.postMessage('backButton');
    });
  `

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'backButton') {
      // Trigger back navigation or other action
      console.log('test')
      router.back()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
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

      {url && (
        <WebView
          style={{
            flex: 1,
            height,
            width,
          }}
          source={{ uri: url }}
          originWhitelist={['*']}
          ref={webViewRef}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccessFromFileURLs={true}
          removeClippedSubviews={true}
          // scrollEnabled={false}
          nestedScrollEnabled
          // limitsNavigationsToAppBoundDomains={true}
          injectedJavaScript={injectedJavaScript}
          onMessage={handleMessage}
        />
      )}
    </SafeAreaView>
  )
}
