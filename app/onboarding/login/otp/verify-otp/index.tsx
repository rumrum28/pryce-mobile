import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useToastController } from '@tamagui/toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { getOtp, login } from '~/server/api'
import { UserInputs } from '~/types/apiresults'
import usePryceStore from '~/hooks/pryceStore'
import { router, useLocalSearchParams } from 'expo-router'
import { colorTokens } from '@tamagui/themes'
import { fonts } from '~/utils/fonts'
import { Form } from 'tamagui'
import OtpInput from '~/components/login/otp-input'

export default function VerifyOtp() {
  const setToken = usePryceStore((set) => set.setToken)
  const setUsers = usePryceStore((set) => set.setUsers)
  const [otpNumber, setOtpNumber] = useState<string[]>(Array(6).fill(''))
  const toast = useToastController()
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(1)
  const [isDisabled, setIsDisabled] = useState(true)

  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width } = Dimensions.get('window')

  const { phoneNumber, loginType } = useLocalSearchParams()

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
          setIsDisabled(false)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [seconds, minutes])

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data) {
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
    if (loginType !== 'otp' && loginType !== 'password') {
      throw new Error('Invalid login type')
    }
    const userData: UserInputs = {
      phone_number:
        typeof phoneNumber === 'string' ? phoneNumber.replace(/\s+/g, '') : '',
      value: otpNumber.join(''),
      type: loginType,
    }

    loginResponse.mutate(userData)
  }

  const handleOtpChange = (newValue: string[]) => {
    setOtpNumber(newValue)
  }

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
    const send = {
      phone_number:
        typeof phoneNumber === 'string' ? phoneNumber.replace(/\s+/g, '') : '',
    }
    getOtpResponse.mutate(send)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>OTP Verification</Text>
        <Text style={styles.subText}>
          We have sent SMS with code to{' '}
          <Text style={styles.subTextNumber}>{phoneNumber}</Text> Please write
          the code below and hit log in button.
        </Text>
      </View>
      <View style={styles.timerContainer}>
        {minutes === 0 && seconds === 0 ? null : (
          <Text style={{ color: colorTokens.light.orange.orange9 }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.inputContainer, { width: width }]}>
          <OtpInput
            value={otpNumber}
            disabled={false}
            onChange={handleOtpChange}
          />
        </View>
        <View style={styles.textBtnContainer}>
          <Text style={{ fontSize: 14, fontWeight: '300' }}>
            Don&apos;t receive the code?
          </Text>
          <TouchableOpacity disabled={isDisabled} onPress={sendOtpHandler}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: colorTokens.light.orange.orange9,
              }}
            >
              {' '}
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        <Form onSubmit={checkOtpHandler}>
          <View style={{ marginTop: 50 }}>
            <Form.Trigger asChild>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colorTokens.light.orange.orange9,
                  width: width - 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: fonts.SemiBold,
                    color: 'white',
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </Form.Trigger>
          </View>
        </Form>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
    fontWeight: '500',
  },
  subText: {
    fontSize: 16,
    paddingVertical: 5,
    color: colorTokens.light.gray.gray10,
    fontWeight: '300',
    marginTop: 10,
  },
  subTextNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colorTokens.light.gray.gray11,
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',

    height: 58,
    alignItems: 'center',
    marginVertical: 22,
  },
  textBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: colorTokens.light.gray.gray12,
    fontFamily: fonts.Regular,
  },
  verifyBtn: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorTokens.light.orange.orange9,
  },
})
