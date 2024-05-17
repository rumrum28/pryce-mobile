import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { View, Image, YStack, Text, Button } from 'tamagui'
import {
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { z } from 'zod'
import { login } from '~/server/api'
import { env } from '~/types/env'
import { UserInputs } from '~/types/apiresults'
import { CurrentToast } from '~/components/toast'
import LoginForm from './login-form'
import usePryceStore from '~/hooks/pryceStore'

export default function LogIn() {
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width, height } = useWindowDimensions()
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<'password' | 'otp'>('password')

  const checkPryceDB = async () => {
    // const checkUser = await getFromPryce()
    // if (!checkUser)
    //   return toast.show('Error', {
    //     message: 'Something is wrong in the server',
    //     native: false,
    //   })
    // console.log(checkUser)
  }

  const backHandler = () => {
    setGetStarted(true)
    router.push('/onboarding')
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        height: '100%',
      }}
    >
      <SafeAreaView style={{ width, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <TouchableOpacity onPress={backHandler} style={{ paddingTop: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('~/assets/98000.png')}
            style={{ height: height * 0.2, width: width * 0.9 }}
            resizeMode="contain"
          />
        </View>
        <YStack style={{}} gap="$5">
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              paddingVertical: 10,
              textAlign: 'center',
            }}
          >
            Login to Your Account
          </Text>
          <Button
            style={{
              width: '100%',
              borderRadius: 50,
              color: 'black',
            }}
            onPress={() => router.push('/(drawer)/shop')}
            // onPress={() => router.push('/(tabs)/shop/')}
            // icon={loginResponse.isPending ? () => <Spinner /> : undefined}
          >
            Test button
          </Button>
          <LoginForm />
        </YStack>
      </SafeAreaView>
    </View>
  )
}
