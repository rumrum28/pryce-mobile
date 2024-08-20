import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { OtpInput } from 'react-native-otp-entry'
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useToastController } from '@tamagui/toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { getOtp, login } from '~/server/api'
import { Container } from '~/tamagui.config'
import { UserInputs } from '~/types/apiresults'
import usePryceStore from '~/hooks/pryceStore'
import { router, useLocalSearchParams } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { fonts } from '~/utils/fonts'
import { Form, Spinner, YStack } from 'tamagui'
import { AntDesign } from '@expo/vector-icons'
import { z } from 'zod'
import { formatPhoneNumber, mobileOrDigitSchema } from '~/utils/numberChecker'

export default function OtpVerification() {
  const setUsers = usePryceStore((s) => s.setUsers)
  const setToken = usePryceStore((s) => s.setToken)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [otpNumber, setOtpNumber] = useState<string>('')
  const [type, setType] = useState<'otp' | 'password'>('otp')
  const toast = useToastController()
  const [type, setType] = useState<'password' | 'otp'>('otp')
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width, height } = Dimensions.get('window')
  const { loginType } = useLocalSearchParams()
  const [loading, isLoading] = useState<boolean>(false)
  const [invalidNumber, setInvalidNumber] = useState<boolean>(true)
  const [verifyCountDown, isVerifyCountDown] = useState<boolean>(false)
  const [otpCountDown, setOTPCountDown] = useState<number>(300)

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
      } else {
        toast.show('Error', {
          message: 'Invalid phone number',
          native: false,
        })
      }
    },
  })

  const sendOtpHandler = async () => {
    isLoading(true)
    const send = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
    }

    getOtpResponse.mutate(send)
    isVerifyCountDown(true)
    router.push({
      pathname: '/onboarding/login/otp/verify-otp',
      params: {
        id: phoneNumber.replace(/\s+/g, ''),
      },
    })
  }

  const handleNumberChange = (n: string) => {
    let result = true

    if (n[0] === '0' && n[1] === '9') {
      if (n.length === 13) {
        result = !mobileOrDigitSchema.safeParse(n).success
      }
    }
    // else {
    //   result = !mobileOrDigitSchema.safeParse(n).success
    // }

    setInvalidNumber(result)
    const formatted = formatPhoneNumber(n)

    if (formatted.replace(/\s+/g, '').length > 11) return null

    setPhoneNumber(formatted)
  }

  useEffect(() => {
    if (otpCountDown <= 0) {
      isVerifyCountDown(false)
      isLoading(false)
      return
    }

    if (verifyCountDown) {
      const timerId = setTimeout(() => {
        setOTPCountDown(otpCountDown - 1)
      }, 1000)

      return () => clearTimeout(timerId)
    }
  }, [verifyCountDown, otpCountDown])

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Verify your</Text>
        <Text style={styles.headingText}>phone number</Text>
        <Text style={styles.subText}>We will send you a verification code</Text>
      </View>
      <View>
        {getOtpResponse.isSuccess && (
          <Container>
            <Text>OTP has been sent to your mobile number.</Text>
          </Container>
        )}
      </View>

      <Form onSubmit={sendOtpHandler}>
        <View>
          <Text>Enter mobile no.*</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.inputContainer, { width: width - 32 }]}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <AntDesign
                name={'mobile1'}
                size={24}
                color={colorTokens.light.orange.orange7}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="09"
              placeholderTextColor={colorTokens.light.orange.orange7}
              keyboardType="number-pad"
              selectionColor={colorTokens.light.gray.gray12}
              value={phoneNumber}
              onChangeText={handleNumberChange}
              numberOfLines={1}
              maxLength={13}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            {verifyCountDown ? (
              <>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorTokens.light.gray.gray9,
                    width: width - 32,
                  }}
                  onPress={() =>
                    router.push('/onboarding/login/otp/verify-otp')
                  }
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: fonts.SemiBold,
                      color: 'white',
                    }}
                  >
                    Resend OTP in: {otpCountDown} secs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push('/onboarding/login/otp/verify-otp')
                  }
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingTop: 10,
                      textDecorationLine: 'underline',
                      textDecorationColor: colorTokens.dark.orange.orange8,
                    }}
                  >
                    Back to OTP
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Form.Trigger
                asChild
                disabled={loading || invalidNumber ? true : false}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      loading || invalidNumber
                        ? colorTokens.light.gray.gray9
                        : colorTokens.light.orange.orange9,
                    width: width - 32,
                  }}
                >
                  {loading ? (
                    <YStack padding="$1" gap="$1" alignItems="center">
                      <Spinner size="small" color="white" />
                    </YStack>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: fonts.SemiBold,
                        color: 'white',
                      }}
                    >
                      VERIFY
                    </Text>
                  )}
                </TouchableOpacity>
              </Form.Trigger>
            )}
          </View>
        </View>
      </Form>

      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>
          By continuing you agree with the
        </Text>
        <Text
          style={{
            fontSize: 14,
            textDecorationColor: colorTokens.light.gray.gray12,
            textDecorationLine: 'underline',
          }}
        >
          Terms and Conditions and Data Privacy.
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    marginVertical: 30,
    padding: 20,
  },
  headingText: {
    fontSize: 36,
    color: colorTokens.light.gray.gray11,
    fontFamily: fonts.SemiBold,
  },
  subText: {
    fontSize: 16,
    paddingVertical: 5,
    color: colorTokens.light.gray.gray12,
    fontFamily: fonts.Light,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',

    borderBottomWidth: 0.4,
    height: 58,
    alignItems: 'center',
  },
  textInvalidNum: {
    borderColor: colorTokens.light.red.red9,

    borderBottomWidth: 0.8,
  },
  textValidNum: {
    borderColor: colorTokens.light.gray.gray11,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: colorTokens.light.gray.gray12,
    fontFamily: fonts.Regular,
  },
  otpBtn: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: 'white',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    left: 16,
    alignItems: 'center',
    paddingBottom: 20,
  },
})
