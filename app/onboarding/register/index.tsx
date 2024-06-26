import { AntDesign, Feather, Fontisto } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import {
  Button,
  Form,
  H4,
  Input,
  Spinner,
  XGroup,
  XStack,
  View,
  Image,
  YStack,
  Text,
  Main,
  Label,
} from 'tamagui'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import usePryceStore from '~/hooks/pryceStore'

export default function Page() {
  const [focused, setFocused] = useState(false)
  const [focusedPassword, setFocusedPassword] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)

  useEffect(() => {
    if (token && users.length > 0) {
      router.push('/(drawer)/shop')
    }
  }, [token, users])

  return (
    <Main
      style={{
        flex: 1,
        backgroundColor: colorTokens.light.orange.orange9,
      }}
    >
      <SafeAreaView style={{ display: 'flex' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
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
          Create New Account
        </Text>
        <Form gap="$6" onSubmit={() => {}}>
          <XStack alignItems="center" gap="$3">
            <Input
              style={{
                flex: 1,
                fontSize: 16,
                position: 'relative',
                paddingLeft: 40,
              }}
              placeholder="Email"
            />
            <Fontisto
              name="email"
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
              placeholder="+639 000 000 000"
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
          {/* <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text
              style={{
                color: colorTokens.light.orange.orange9,
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity> */}
          <Form.Trigger asChild>
            <Button
              style={{
                backgroundColor: colorTokens.light.orange.orange9,
                width: '100%',
                borderRadius: 50,
                marginTop: 20,
                color: 'white',
              }}
              onPress={() => router.push('/')}
            >
              Sign up
            </Button>
          </Form.Trigger>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
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
          </View> */}
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </Form>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 16, color: '#7C808D' }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/onboarding/login')}>
            <Text
              style={{
                fontSize: 16,
                color: colorTokens.light.orange.orange9,
                fontWeight: '500',
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </YStack>
    </Main>
  )
}
