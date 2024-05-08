import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { Suspense, useEffect } from 'react'
import { TamaguiProvider, View } from 'tamagui'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { config } from '~/tamagui.config'
import { ToastProvider } from '@tamagui/toast'
import { CurrentToast } from '~/components/toast'
import { ActivityIndicator } from 'react-native'
// import { SQLiteProvider } from 'expo-sqlite/next'

export default function Layout() {
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
          <Suspense
            fallback={
              <View style={{ flex: 1 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            }
          >
            {/* <SQLiteProvider databaseName="PryceDB" useSuspense> */}
            <ToastProvider>
              <CurrentToast />

              <Slot />
            </ToastProvider>
            {/* </SQLiteProvider> */}
          </Suspense>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  )
}
