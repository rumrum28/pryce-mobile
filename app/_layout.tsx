import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { TamaguiProvider } from 'tamagui'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { config } from '~/tamagui.config'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import ToastManager from 'toastify-react-native'

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
          <BottomSheetModalProvider>
            <ToastManager />

            <Slot />
          </BottomSheetModalProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  )
}
