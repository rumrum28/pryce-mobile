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
import { color, colorTokens } from '@tamagui/themes'
import { fonts } from '~/utils/fonts'
import { Form } from 'tamagui'
import { AntDesign } from '@expo/vector-icons'
import {
  formatOTP,
  formatPhoneNumber,
  mobileOrDigitSchema,
} from '~/utils/numberChecker'

export default function VerifyOtp() {
  const setToken = usePryceStore((set) => set.setToken)
  const setUsers = usePryceStore((set) => set.setUsers)
  const [otpNumber, setOtpNumber] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const toast = useToastController()
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width, height } = Dimensions.get('window')
  const [invalidNumber, setInvalidNumber] = useState<boolean>(true)
  const { id } = useLocalSearchParams() as any
  const [loading, isLoading] = useState<boolean>(false)

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data) {
        isLoading(false)
        setInvalidNumber(false)
        toast.show('Success', {
          message: data.loginResponse?.message,
          native: false,
        })
        if (data.loginResponse.success && data.profileResponse) {
          setToken(data.loginResponse?.access_token)
          setUsers(data.profileResponse)
          router.push('/(drawer)/shop')
        }
      } else {
        isLoading(false)
        setInvalidNumber(false)
        toast.show('Error', {
          message: 'Invalid phone number',
          native: false,
        })
      }
    },
  })

  const checkOtpHandler = async () => {
    isLoading(true)
    const userData: UserInputs = {
      phone_number: id,
      value: otp,
      type: 'otp',
    }

    loginResponse.mutate(userData)
    setInvalidNumber(true)
  }

  const handleNumberChange = (n: string) => {
    let result = true

    if (n.length === 7) {
      result = false
    }

    setInvalidNumber(result)
    const formatted = formatOTP(n)

    if (formatted.replace(/\s+/g, '').length > 6) return null

    setOtpNumber(formatted)
    setOtp(formatted.replace(/\s+/g, ''))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>OTP Verification</Text>
        <Text style={styles.subText}>
          We have sent SMS with code to{' '}
          <Text style={styles.subTextNumber}>09123627891</Text> Please write the
          code below and hit log in button
        </Text>
      </View>

      <Form onSubmit={checkOtpHandler}>
        <View>
          <Text>
            Enter one-time pin.{' '}
            {!loginResponse.isPending &&
            loginResponse.data?.loginResponse.success ? null : (
              <Text
                style={{
                  color: colorTokens.light.red.red9,
                }}
              >
                ({loginResponse.data?.loginResponse.message})
              </Text>
            )}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              borderColor:
                !loginResponse.isPending &&
                loginResponse.data?.loginResponse.success
                  ? colorTokens.light.gray.gray12
                  : colorTokens.light.red.red9,
              borderBottomWidth: 0.4,
              height: 58,
              alignItems: 'center',
              width: width - 32,
            }}
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
              placeholder="Enter 6 digit pin"
              placeholderTextColor={colorTokens.light.orange.orange7}
              keyboardType="number-pad"
              selectionColor={colorTokens.light.gray.gray12}
              value={otpNumber}
              onChangeText={handleNumberChange}
              numberOfLines={1}
              maxLength={7}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Form.Trigger asChild disabled={invalidNumber}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: invalidNumber
                    ? colorTokens.dark.gray.gray8
                    : colorTokens.light.orange.orange9,
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
                  CONFIRM
                </Text>
              </TouchableOpacity>
            </Form.Trigger>
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textContainer: {
    marginVertical: 50,
  },
  headingText: {
    fontSize: 36,
    color: colorTokens.light.gray.gray11,
    // fontFamily: fonts.SemiBold,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    left: 16,
    alignItems: 'center',
    paddingBottom: 20,
  },
})
