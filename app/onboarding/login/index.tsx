import React, { useEffect, useState } from 'react'
import { ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'
import LogIn from '~/components/login/login'
import OtpLogin from '~/components/login/otp'

export default function Page() {
  const [loginType, setLoginType] = useState<'otp' | 'password' | null>(null)

  useEffect(() => {
    console.log(loginType)
  }, [loginType])

  return (
    <View style={{ flex: 1 }}>
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
              source={require('~/assets/png/lock.png')}
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
              source={require('~/assets/png/sms.png')}
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

      {loginType === 'password' && (
        <>
          <Pressable onPress={() => setLoginType(null)}>
            <Text>back</Text>
          </Pressable>
          <LogIn />
        </>
      )}

      {loginType === 'otp' && (
        <>
          <Pressable onPress={() => setLoginType(null)}>
            <Text>back</Text>
          </Pressable>
          <OtpLogin />
        </>
      )}
    </View>
  )
}
