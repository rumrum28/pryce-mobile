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
import { colorTokens } from '@tamagui/themes'
import { fonts } from '~/utils/fonts'
import { Form } from 'tamagui'
import { AntDesign } from '@expo/vector-icons'

export default function OtpVerification() {
  const setToken = usePryceStore((set) => set.setToken)
  const setUsers = usePryceStore((set) => set.setUsers)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpNumber, setOtpNumber] = useState<string>('')
  const [isOtp, setIsOtp] = useState<boolean>(false)
  const toast = useToastController()
  const [type, setType] = useState<'password' | 'otp'>('otp')
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const { width, height } = Dimensions.get('window')
  const { loginType } = useLocalSearchParams()

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
    const userData: UserInputs = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
      value: otpNumber,
      type: type,
    }

    loginResponse.mutate(userData)
  }

  const sendOtpHandler = async () => {
    // const send = {
    //   phone_number: phoneNumber.replace(/\s+/g, ''),
    // }

    // getOtpResponse.mutate(send)
    setIsOtp(true)
    router.push('/onboarding/login/otp/verify-otp')
  }

  return (
    <SafeAreaView style={styles.container}>
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
      {!isOtp && (
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
                placeholder="Enter your phone number"
                placeholderTextColor={colorTokens.light.gray.gray12}
                selectionColor={colorTokens.light.gray.gray12}
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(e) => setPhoneNumber(e)}
                numberOfLines={4}
                maxLength={11}
              />
            </View>
            <View style={{ marginTop: 20 }}>
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
                    VERIFY
                  </Text>
                </TouchableOpacity>
              </Form.Trigger>
            </View>
          </View>
        </Form>
      )}
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
    borderColor: colorTokens.light.gray.gray11,
    borderBottomWidth: 0.4,
    height: 58,
    alignItems: 'center',
    // marginVertical: 32,
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
  },
})
