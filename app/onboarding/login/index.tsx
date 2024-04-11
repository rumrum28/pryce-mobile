import { AntDesign, Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import {
  Button,
  Form,
  Input,
  XStack,
  View,
  Image,
  YStack,
  Text,
  Main,
  Spinner,
} from 'tamagui'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { useMMKVObject } from 'react-native-mmkv'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { login } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { env } from '~/types/env'
import { UserInputs } from '~/types/apiresults'
import { zustandStorage } from '~/hooks/userController'
import { UseUser } from '~/types/userStorage'
import { ToastDemo } from '~/components/toast'
import { ToastViewport } from '@tamagui/toast'

// tell zod to only accept number that start with 09
const mobileOrDigitSchema = z.string().refine((data) => data.startsWith('09'), {
  message: 'Invalid phone number',
})

export default function LogIn() {
  const [isGetStarted, setIsGetStarted] = useMMKVObject<any>('getStarted')
  const [focused, setFocused] = useState(false)
  const [focusedPassword, setFocusedPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [type, setType] = useState<'password' | 'otp'>('password')
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false)
  const [passwordIsVisible, setPasswordIsVisible] =
    React.useState<boolean>(false)

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })
      console.log(data)
    },
  })

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '')
    const match = numbers.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/)

    if (match) {
      return `${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}`
    }

    return numbers
  }

  const handleNumberChange = (n: string) => {
    let result = false

    if (n[0] === '0' && n[1] === '9') {
      result = mobileOrDigitSchema.safeParse(n).success
    } else {
      result = mobileOrDigitSchema.safeParse(n).success
    }

    setInvalidNumber(!result)
    const formatted = formatPhoneNumber(n)

    if (formatted.replace(/\s+/g, '').length > 11) return null

    setPhoneNumber(formatted)
  }

  const loginHandler = async () => {
    const userData: UserInputs = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
      value: value,
    }

    loginResponse.mutate(userData)
  }

  const backHandler = () => {
    setIsGetStarted([
      {
        isGetStarted: false,
      },
    ])
    router.push('/onboarding')
  }

  const checkTest = async () => {
    const checkUsers: UseUser | any = await zustandStorage.getItem('users')
    const parseUsers: UseUser = JSON.parse(checkUsers)
    console.log(parseUsers.totalSize)
  }

  return (
    <Main
      style={{
        flex: 1,
        backgroundColor: colorTokens.light.orange.orange9,
      }}
    >
      <SafeAreaView style={{ display: 'flex' }}>
        <View>
          <ToastViewport
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={backHandler}
            style={{ marginLeft: 10, padding: 10 }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Image
        source={require('~/assets/98000.png')}
        style={{
          height: 250,
          width: '100%',
        }}
        resizeMode="contain"
      />

      <YStack
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 50,
          paddingTop: 20,
          marginTop: 20,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
        gap="$5"
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',

            textAlign: 'center',
          }}
        >
          Login to Your Account
        </Text>

        <ToastDemo />

        <Form gap="$3" onSubmit={loginHandler}>
          <XStack alignItems="center" gap="$3">
            <Input
              style={{
                flex: 1,
                fontSize: 16,
                position: 'relative',
                paddingLeft: 40,
                borderColor: invalidNumber
                  ? colorTokens.light.red.red10
                  : '#eee',
              }}
              placeholder="09"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={handleNumberChange}
            />

            <AntDesign
              name="mobile1"
              size={24}
              color="gray"
              style={{ position: 'absolute', left: 10 }}
            />
          </XStack>
          <XStack alignItems="center" gap="$3">
            <Input
              style={{
                flex: 1,
                fontSize: 16,
                position: 'relative',
                paddingLeft: 40,
              }}
              placeholder="Password"
              secureTextEntry={!passwordIsVisible}
              value={value}
              onChangeText={(e) => setValue(e)}
            />

            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={{ position: 'absolute', left: 10 }}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 12 }}
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <Feather
                name={passwordIsVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#7C808D"
              />
            </TouchableOpacity>
          </XStack>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text
              style={{
                color: colorTokens.light.orange.orange9,
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          <Form.Trigger
            asChild
            disabled={
              invalidNumber ||
              phoneNumber.replace(/\s+/g, '').length < 11 ||
              loginResponse.isPending
            }
          >
            <Button
              style={{
                backgroundColor:
                  invalidNumber ||
                  phoneNumber.replace(/\s+/g, '').length < 11 ||
                  loginResponse.isPending
                    ? '#ccc'
                    : colorTokens.light.orange.orange9,
                width: '100%',
                borderRadius: 50,
                marginTop: 20,
                color: 'white',
              }}
              icon={loginResponse.isPending ? () => <Spinner /> : undefined}
            >
              Sign in
            </Button>
          </Form.Trigger>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 14,
              marginBottom: 14,
            }}
          >
            <View style={{ height: 1, backgroundColor: '#eee', flex: 1 }} />
            <Text
              style={{
                color: '#7C808D',
                marginRight: 10,
                marginLeft: 10,
                fontSize: 14,
              }}
            >
              or continue with
            </Text>
            <View style={{ height: 1, backgroundColor: '#eee', flex: 1 }} />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#F2F6F2',
              padding: 14,
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Text
              style={{
                color: '#4E5867',
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              Sign in with Phone Number
            </Text>
          </TouchableOpacity>
        </Form>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: '#7C808D' }}>
            Dont have an account yet?{' '}
          </Text>
          <TouchableOpacity
            // onPress={() => router.push('/onboarding/register')}
            onPress={checkTest}
          >
            <Text
              style={{
                fontSize: 16,
                color: colorTokens.light.orange.orange9,
                fontWeight: '500',
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </Main>
  )
}
