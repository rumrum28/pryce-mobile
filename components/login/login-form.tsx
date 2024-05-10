import { Button, Form, Input, XStack, View, Text, Spinner } from 'tamagui'

import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { UseMutationResult } from '@tanstack/react-query'
import { UserInputs } from '~/types/apiresults'
import { useRouter } from 'expo-router'

type MyComponentProps = {
  loginResponse: UseMutationResult<boolean, Error, UserInputs, unknown>
  handleNumberChange: (n: string) => void
  loginHandler: () => Promise<void>
  checkPryceDB: () => Promise<boolean | undefined>
  phoneNumber: string
  invalidNumber: boolean
}

export default function LoginForm({
  loginResponse,
  handleNumberChange,
  loginHandler,
  checkPryceDB,
  phoneNumber,
  invalidNumber,
}: MyComponentProps) {
  const [value, setValue] = useState<string>('')
  const [passwordIsVisible, setPasswordIsVisible] =
    React.useState<boolean>(false)

  const router = useRouter()
  return (
    <View>
      <Form gap="$3" onSubmit={loginHandler}>
        <XStack alignItems="center" style={{ marginBottom: 10 }}>
          <Input
            style={{
              flex: 1,
              fontSize: 16,
              position: 'relative',
              paddingLeft: 40,
              borderColor: invalidNumber ? colorTokens.light.red.red10 : '#eee',
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
        <XStack alignItems="center" style={{ marginBottom: 10 }}>
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
              fontSize: 14,
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
            loginResponse?.isPending
          }
        >
          <Button
            style={{
              backgroundColor:
                invalidNumber ||
                phoneNumber.replace(/\s+/g, '').length < 11 ||
                loginResponse?.isPending
                  ? '#ccc'
                  : colorTokens.light.orange.orange9,
              width: '100%',
              borderRadius: 50,
              marginTop: 20,
              color: 'white',
            }}
            icon={loginResponse?.isPending ? () => <Spinner /> : undefined}
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
        <Button
          style={{
            borderRadius: 50,
            backgroundColor: 'transparent',
            borderColor: colorTokens.light.gray.gray6,
          }}
        >
          OTP Sign in
        </Button>
      </Form>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 15,
        }}
      >
        <Text style={{ fontSize: 14, color: '#7C808D' }}>
          Dont have an account yet?{' '}
        </Text>
        <TouchableOpacity onPress={checkPryceDB}>
          <Text
            style={{
              fontSize: 14,
              color: colorTokens.light.orange.orange9,
              fontWeight: '500',
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
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
      {/* <StyledInput
        icon="lock-open"
        value={password}
        label="Password"
        onChangeText={setPassword}
        placeholder="* * * * * * *"
        style={{ marginBottom: 20 }}
        isPassword={true}
      /> */}
    </View>
  )
}
