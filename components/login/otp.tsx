import { Pressable, SafeAreaView } from 'react-native'
import { Button, Form, Input, Main, Text } from 'tamagui'
import { OtpInput } from 'react-native-otp-entry'
import { Dimensions } from 'react-native'
import { useState } from 'react'
import { useToastController } from '@tamagui/toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { getOtp, login } from '~/server/api'
import { Container } from '~/tamagui.config'
import { UserInputs } from '~/types/apiresults'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'

export default function OtpLogin({
  setLoginType,
}: {
  setLoginType: (t: 'otp' | 'password' | null) => void
}) {
  const setToken = usePryceStore((set) => set.setToken)
  const setUsers = usePryceStore((set) => set.setUsers)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpNumber, setOtpNumber] = useState('')
  const [isOtp, setIsOtp] = useState<boolean>(false)
  const toast = useToastController()
  const [type, setType] = useState<'password' | 'otp'>('otp')

  const getOtpResponse = useMutation({
    mutationFn: getOtp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['otp'],
      })

      if (data) {
        toast.show('Success', {
          message: data.message,
          native: false,
        })
        setIsOtp(true)
      } else {
        toast.show('Error', {
          message: 'Invalid phone number',
          native: false,
        })
      }
    },
  })

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data && data.loginResponse?.success) {
        toast.show('Success', {
          message: data.loginResponse?.message,
          native: false,
        })
        setToken(data.loginResponse?.access_token)
        setUsers(data.profileResponse)
        router.push('/(drawer)/shop')
      } else {
        toast.show('Error', {
          message: 'Invalid phone number',
          native: false,
        })
      }
    },
  })

  const checkOtpHandler = async () => {
    const userData: UserInputs = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
      value: otpNumber,
      type: type,
    }

    loginResponse.mutate(userData)
  }

  const sendOtpHandler = async () => {
    const send = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
    }

    getOtpResponse.mutate(send)
  }

  return (
    <Main
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SafeAreaView style={{ width: 300, gap: 20 }}>
        {getOtpResponse.isSuccess && (
          <Container>
            <Text>OTP has been sent to your mobile number.</Text>
          </Container>
        )}

        <Button
          style={{
            width: '100%',
            borderRadius: 50,
          }}
          onPress={() => setLoginType(null)}
        >
          <Text>back</Text>
        </Button>

        {!isOtp && (
          <Form onSubmit={sendOtpHandler}>
            <Text>Enter Number</Text>
            <Input
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(e) => setPhoneNumber(e)}
              numberOfLines={4}
              maxLength={40}
              style={{ padding: 10, height: 46 }}
            />

            <Form.Trigger asChild>
              <Button>Submit</Button>
            </Form.Trigger>
          </Form>
        )}

        {isOtp && (
          <>
            <Button onPress={() => setIsOtp(false)}>retry</Button>

            <Form onSubmit={checkOtpHandler}>
              <Text>Enter OTP</Text>
              <OtpInput
                numberOfDigits={6}
                focusColor="orangered"
                focusStickBlinkingDuration={500}
                // onTextChange={(text) => console.log(text)}
                onFilled={(text) => setOtpNumber(text)}
              />

              <Form.Trigger asChild>
                <Button>Submit</Button>
              </Form.Trigger>
            </Form>
          </>
        )}
      </SafeAreaView>
    </Main>
  )
}
