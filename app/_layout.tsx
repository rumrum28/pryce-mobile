import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect, useState } from 'react'
import { TamaguiProvider } from 'tamagui'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { config } from '~/tamagui.config'
import { ToastProvider } from '@tamagui/toast'
import { CurrentToast } from '~/components/toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Platform, StatusBar } from 'react-native'
import type { StatusBarStyle } from 'react-native'
import { View } from 'tamagui'

const STYLES = ['default', 'dark-content', 'light-content'] as const
const TRANSITIONS = ['fade', 'slide', 'none'] as const

export default function Layout() {
  const [hidden, setHidden] = useState(false)
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0]
  )
  const [statusBarTransition, setStatusBarTransition] = useState<
    'fade' | 'slide' | 'none'
  >(TRANSITIONS[0])

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <ToastProvider>
              <CurrentToast />
              <StatusBar
                animated={true}
                barStyle={statusBarStyle}
                showHideTransition={statusBarTransition}
                hidden={hidden}
                backgroundColor="#61dafb"
              />
              <View
                style={{
                  paddingTop:
                    Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
              />
              <Slot />
            </ToastProvider>
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  )
}
