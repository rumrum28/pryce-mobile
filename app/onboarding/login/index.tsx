import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'

import { ToastViewport } from '@tamagui/toast'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'
import { colorTokens } from '@tamagui/themes'

export default function Page() {
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)
  const [loginType, setLoginType] = useState<'otp' | 'password' | null>(null)

  useEffect(() => {
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
      <ToastViewport
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      />

      {!loginType && (
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

          <View
            style={{ flex: 1, width: '100%', alignItems: 'center', gap: 20 }}
          >
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/onboarding/login/password',
                  params: { loginType: 'password' },
                })
              }
              style={{
                backgroundColor: colorTokens.light.orange.orange9,
                paddingVertical: 13,
                borderRadius: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>
                Sign in with Password
              </Text>
            </TouchableOpacity>
            <Text style={{ color: colorTokens.light.gray.gray9 }}>or</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/onboarding/login/otp',
                  params: { loginType: 'otp' },
                })
              }
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
              <Text style={{ color: 'black', fontSize: 16 }}>
                Sign in with OTP
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            <Text style={{ fontSize: 14, color: colorTokens.light.gray.gray9 }}>
              Dont have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/onboarding/register',
                })
              }
            >
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
      )}
    </SafeAreaView>
  )
}
