import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Button,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { ToastViewport, useToastController } from '@tamagui/toast'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/hooks/queryClient'
import { getOtp, login } from '~/server/api'
import { UserInputs } from '~/types/apiresults'
import usePryceStore from '~/hooks/pryceStore'
import { router, useLocalSearchParams } from 'expo-router'
import { color, colorTokens } from '@tamagui/themes'
import { fonts } from '~/utils/fonts'
// import { Form } from 'tamagui'
import OtpInput from '~/components/login/otp-input'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import {
  formatOTP,
  formatPhoneNumber,
  mobileOrDigitSchema,
} from '~/utils/numberChecker'

export default function VerifyOtp() {
  const setToken = usePryceStore((set) => set.setToken)
  const setUsers = usePryceStore((set) => set.setUsers)
  const [otp, setOtp] = useState<string[]>([])
  const toast = useToastController()
  const { width } = Dimensions.get('window')
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false)
  const { id } = useLocalSearchParams() as any
  const [loading, isLoading] = useState<boolean>(false)

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data) {
        toast.show(`${data.loginResponse.success ? 'Success' : 'Failed'}`, {
          message: data.loginResponse?.message,
          native: false,
        })
        if (data.loginResponse.success && data.profileResponse) {
          setToken(data.loginResponse?.access_token)
          setUsers(data.profileResponse)
          router.push('/(tabs)/index')
        }
      } else {
        isLoading(false)
        setInvalidNumber(false)
        toast.show('Error', {
          message: 'Invalid OTP',
          native: false,
        })
      }
    },
  })

  const checkOtpHandler = async () => {
    //check otp if not missing
    let finalOTP = ''
    for (let i = 0; i < otp.length; i++) {
      finalOTP += otp[i]
    }

    // check if otp is 6 digits
    if (finalOTP.length < 6) {
      return toast.show('Error', {
        message: 'Please enter a valid OTP',
        native: false,
      })
    }

    isLoading(true)
    const userData: UserInputs = {
      phone_number: id,
      value: finalOTP,
      type: 'otp',
    }

    loginResponse.mutate(userData)
    setInvalidNumber(true)
  }

  const handleOtpChange = (newValue: string[]) => {
    setOtp(newValue)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ToastViewport
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 65 : 20,
        }}
      />

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>OTP Verification</Text>
        <Text style={styles.subText}>
          We have sent SMS with code to{' '}
          <Text style={styles.subTextNumber}>{id}</Text> Please write the code
          below and hit log in button.
        </Text>
      </View>
      {/* <View style={styles.timerContainer}></View> */}
      <View>
        <View style={[styles.inputContainer, { width: width }]}>
          <OtpInput value={otp} disabled={false} onChange={handleOtpChange} />
        </View>

        {/* <View style={styles.textBtnContainer}>
          <Text style={{ fontSize: 16, fontWeight: '300', marginRight: 3 }}>
            Don&apos;t receive the code?
          </Text>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={sendOtpHandler}
            style={styles.newCodeContainer}
          >
            <Text
              style={[
                styles.newCodeBtn,
                isDisabled ? styles.newCodeDisabled : styles.newCodeEnabled,
              ]}
            >
              Get new code
            </Text>
            {minutes === 0 && seconds === 0 ? null : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: colorTokens.light.orange.orange9,
                }}
              >
                in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            )}
          </TouchableOpacity>
        </View> */}

        <View style={{ marginTop: 50, alignItems: 'center' }}>
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
            onPress={checkOtpHandler}
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
        </View>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  newCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  newCodeBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 3,
    color: colorTokens.light.gray.gray9,
  },
  newCodeDisabled: {
    opacity: 0.5,
  },
  newCodeEnabled: {
    opacity: 1,
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
