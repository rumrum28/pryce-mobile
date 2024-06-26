import React, { useEffect, useState } from 'react'
import { ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'
import LogIn from '~/components/login/login'
import OtpLogin from '~/components/login/otp'
import { ToastViewport } from '@tamagui/toast'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'

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
    <View style={{ flex: 1 }}>
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
            justifyContent: 'center',
            flex: 1,
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setLoginType('password')}
            style={{
              height: 200,
              width: 200,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 20,
              shadowColor: 'black',
              shadowOpacity: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageBackground
              source={require('~/assets/images/lock.png')}
              style={{
                height: '95%',
                width: '95%',
              }}
            ></ImageBackground>
            <Text style={{ textAlign: 'center', paddingTop: 10 }}>
              Login via password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLoginType('otp')}
            style={{
              height: 200,
              width: 200,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 20,
              shadowColor: 'black',
              shadowOpacity: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageBackground
              source={require('~/assets/images/sms.png')}
              style={{
                height: '95%',
                width: '95%',
              }}
            ></ImageBackground>
            <Text style={{ textAlign: 'center', paddingTop: 10 }}>
              Login via OTP
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loginType === 'password' && <LogIn setLoginType={setLoginType} />}
      {loginType === 'otp' && <OtpLogin setLoginType={setLoginType} />}
    </View>
  )
}
