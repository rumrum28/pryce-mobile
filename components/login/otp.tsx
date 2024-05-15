import { SafeAreaView } from 'react-native'
import { Form, Input, Main, Text } from 'tamagui'
import { OtpInput } from 'react-native-otp-entry'
import { Dimensions } from 'react-native'
import { useState } from 'react'

export default function OtpLogin() {
  const [number, setPhoneNumber] = useState('')
  const [otpNumber, setOtpNumber] = useState('')

  const checkOtpHandler = async () => {}

  const sendOtpHandler = async () => {}

  return (
    <Main
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SafeAreaView style={{ width: 300 }}>
        <Form onSubmit={checkOtpHandler}>
          <Text>Enter Number</Text>
          <Input
            flex={1}
            keyboardType="numeric"
            value={number}
            onChangeText={(e) => setPhoneNumber(e)}
            numberOfLines={4}
            maxLength={40}
            style={{ padding: 10 }}
          />
        </Form>

        <Form onSubmit={checkOtpHandler}>
          <Text>Enter OTP</Text>
          <OtpInput
            numberOfDigits={6}
            focusColor="orangered"
            focusStickBlinkingDuration={500}
            onTextChange={(text) => console.log(text)}
            onFilled={(text) => console.log(`OTP is ${text}`)}
          />
        </Form>
      </SafeAreaView>
    </Main>
  )
}
