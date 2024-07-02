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
import { useState } from 'react'
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
import { Form } from 'tamagui'
import { AntDesign } from '@expo/vector-icons'
import { z } from 'zod'

export default function OtpVerification() {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const toast = useToastController()
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width } = Dimensions.get('window')
  const { loginType } = useLocalSearchParams()
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false)

  const mobileOrDigitSchema = z
    .string()
    .refine((data) => data.startsWith('09'), {
      message: 'Invalid phone number',
    })

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
    // const send = {
    //   phone_number: phoneNumber.replace(/\s+/g, ''),
    // }
    // getOtpResponse.mutate(send)
    router.push({
      pathname: '/onboarding/login/otp/verify-otp',
      params: { phoneNumber: phoneNumber, loginType: loginType },
    })
  }

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

  const isPending = invalidNumber || phoneNumber.replace(/\s+/g, '').length < 11

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Verify your</Text>
        <Text style={styles.headingText}>phone number</Text>
        <Text style={styles.subText}>We will send you a verification code</Text>
      </View>

      <Form onSubmit={sendOtpHandler}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text>Enter mobile no.*</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={[
              styles.inputContainer,
              { width: width - 32 },
              invalidNumber ? styles.textInvalidNum : styles.textValidNum,
            ]}
          >
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
              value={phoneNumber}
              onChangeText={handleNumberChange}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Form.Trigger
              asChild
              disabled={
                invalidNumber || phoneNumber.replace(/\s+/g, '').length < 11
              }
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width - 32,
                  backgroundColor: isPending
                    ? colorTokens.light.gray.gray9
                    : colorTokens.light.orange.orange9,
                }}
              >
                {getOtpResponse?.isPending ? (
                  <ActivityIndicator size={32} />
                ) : (
                  <Text style={styles.otpBtn}>Get OTP</Text>
                )}
              </TouchableOpacity>
            </Form.Trigger>
          </View>
        </View>
      </Form>

      <SafeAreaView style={styles.bottomContainer}>
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
  },
})
