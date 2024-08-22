import { WebView } from 'react-native-webview'
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Text } from 'tamagui'
import { useRef, useState } from 'react'
import { colorTokens } from '@tamagui/themes'
import { Ionicons } from '@expo/vector-icons'

/* <button class="button full-width button--secondary" type="button"><div class="button__content"><span>Back</span></div></button> */

export default function PaymongoWebview() {
  const { url } = useLocalSearchParams() as any
  const [webViewVisible, setWebViewVisible] = useState(true)
  const webViewRef = useRef(null)
  const { width, height } = useWindowDimensions()

  const handleNavigationChange = (navState: any) => {
    if (navState.url.includes('button full-width button--secondary')) {
      setWebViewVisible(false)
      router.back()
    }
  }

  return (
    <>
      {Platform.OS !== 'android' && (
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

      {webViewVisible && (
        <WebView
          style={{
            flex: 1,
            height,
            width,
          }}
          source={{ uri: url }}
          originWhitelist={['*']}
          ref={webViewRef}
          onNavigationStateChange={handleNavigationChange}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState={true}
          renderError={(errorName) => (
            <View
              style={{
                flex: 1,
              }}
            />
          )}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
              }}
            />
          )}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccessFromFileURLs={true}
          // overScrollMode={'never'}
          removeClippedSubviews={true}
          // scrollEnabled={false}
          nestedScrollEnabled
          limitsNavigationsToAppBoundDomains={true}
        />
      )}
    </>
  )
}
