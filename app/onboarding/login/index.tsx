import { useEffect } from 'react'
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'
import { ToastViewport } from '@tamagui/toast'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'
import { colorTokens } from '@tamagui/themes'

export default function Page() {
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)
  const setGetStarted = usePryceStore((state) => state.setGetStarted)

  useEffect(() => {
    // console.log(token)
    // console.log(users)
    if (token && users.length > 0) {
      router.push('/(drawer)/shop')
    }
  }, [token, users])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar hidden />
      <ToastViewport
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      />

      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 20,
          gap: 20,
        }}
      >
        <Image
          source={require('~/assets/lady.png')}
          style={{
            marginVertical: 20,
            height: 250,
            width: '100%',
          }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 40,
            fontWeight: 'semibold',
            paddingHorizontal: 20,
            textAlign: 'center',
            color: colorTokens.light.orange.orange9,
          }}
        >
          Let&apos;s you in
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/onboarding/login/password')}
          style={{
            backgroundColor: colorTokens.light.orange.orange9,
            paddingVertical: 13,
            borderRadius: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>Sign in with Password</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>or</Text>
        <TouchableOpacity
          onPress={() => router.push('/onboarding/login/otp')}
          style={{
            borderWidth: 1,
            borderColor: colorTokens.light.gray.gray6,
            paddingVertical: 13,
            borderRadius: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'black' }}>Sign in with OTP</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: colorTokens.light.gray.gray8 }}>
            Dont have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/onboarding/register')}>
            <Text
              style={{
                fontSize: 14,
                color: colorTokens.light.orange.orange9,
                fontWeight: '500',
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
