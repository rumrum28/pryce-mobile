import { useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      {/* <StatusBar hidden /> */}

      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require('~/assets/98000.png')}
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
            marginBottom: 50,
          }}
        >
          Hello !
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
            marginBottom: 20,
          }}
        >
          <Text style={{ color: 'white' }}>Sign in with Password</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', marginBottom: 20 }}>or</Text>
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
            marginBottom: 20,
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
          <Text style={{ fontSize: 14, color: colorTokens.light.gray.gray9 }}>
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
