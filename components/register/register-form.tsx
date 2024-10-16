import { Button, Form, Input, XStack, View, Text, Spinner } from 'tamagui'
import { useState } from 'react'
import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { useMutation } from '@tanstack/react-query'
import { UserInputs } from '~/types/apiresults'
import { useRouter } from 'expo-router'
import { queryClient } from '~/hooks/queryClient'
import { login } from '~/server/api'
import usePryceStore from '~/hooks/pryceStore'
import { z } from 'zod'
import { fonts } from '~/utils/fonts'
import Dropdown from './dropdown'
import { address } from '~/data/data'
import { Toast } from 'toastify-react-native'

// tell zod to only accept number that start with 09
const mobileOrDigitSchema = z.string().refine((data) => data.startsWith('09'), {
  message: 'Invalid phone number',
})

export default function RegisterForm() {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false)
  const [type, setType] = useState<'password' | 'otp'>('password')
  const setToken = usePryceStore((state) => state.setToken)
  const setUsers = usePryceStore((state) => state.setUsers)
  const router = useRouter()

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data && data.loginResponse?.success) {
        Toast.success('Welcome to PRYCEGAS')

        setToken(data.loginResponse?.access_token)
        setUsers(data.profileResponse!)
        router.push('/(drawer)/shop')
      } else {
        Toast.error('Invalid phone number or password')
      }
    },
  })

  const loginHandler = async () => {
    const userData: UserInputs = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
      value: password,
      type: type,
    }

    loginResponse.mutate(userData)
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

  const isPending =
    invalidNumber ||
    phoneNumber.replace(/\s+/g, '').length < 11 ||
    loginResponse?.isPending

  const formattedCountries = address.map((c) => ({
    province: c.province,
    city: c.city,

    // id: '1',
    // city: 'Alburquerque',
    // province: 'Bohol',
    // pgi_region: 'CVO',
    // status: 'included',
    // code: '2003',
  }))

  return (
    <View style={styles.formContainer}>
      {/* <ScrollView> */}
      <Form onSubmit={loginHandler}>
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <Ionicons
              name={'person'}
              size={24}
              color={colorTokens.light.orange.orange7}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="default"
            onChangeText={handleNumberChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <Ionicons
              name={'person'}
              size={24}
              color={colorTokens.light.orange.orange7}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="default"
            onChangeText={handleNumberChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={'lock'}
            size={24}
            color={colorTokens.light.orange.orange7}
          />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={colorTokens.light.orange.orange7}
            placeholder="Password"
            secureTextEntry={!passwordIsVisible}
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <TouchableOpacity
            onPress={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            <Feather
              name={passwordIsVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#7C808D"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <Ionicons
              name={'mail'}
              size={24}
              color={colorTokens.light.orange.orange7}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="email-address"
            onChangeText={handleNumberChange}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            invalidNumber ? styles.textInvalidNum : styles.textValidNum,
          ]}
        >
          <AntDesign
            name={'mobile1'}
            size={24}
            color={colorTokens.light.orange.orange7}
          />
          <TextInput
            style={styles.textInput}
            placeholder="09"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={handleNumberChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <DropdownComponent
            data={formattedCountries}
            onChange={console.log}
            placeholder="Select country"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <DropdownComponent />
        </View> */}
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <Ionicons
              name={'mail'}
              size={24}
              color={colorTokens.light.orange.orange7}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your street"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={{ justifyContent: 'center', marginRight: 10 }}>
            <Ionicons
              name={'mail'}
              size={24}
              color={colorTokens.light.orange.orange7}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your barangay"
            placeholderTextColor={colorTokens.light.orange.orange7}
            keyboardType="default"
          />
        </View>

        <Form.Trigger
          asChild
          disabled={
            invalidNumber ||
            phoneNumber.replace(/\s+/g, '').length < 11 ||
            loginResponse?.isPending
          }
        >
          <TouchableOpacity
            style={{
              borderRadius: 100,
              marginTop: 20,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isPending
                ? colorTokens.light.gray.gray9
                : colorTokens.light.orange.orange9,
            }}
          >
            {loginResponse?.isPending ? (
              <ActivityIndicator size={32} />
            ) : (
              <Text style={styles.loginText}>SIGN UP</Text>
            )}
          </TouchableOpacity>
        </Form.Trigger>
      </Form>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    height: 58,
    alignItems: 'center',
    marginBottom: 5,
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
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: 'light',
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colorTokens.light.orange.orange9,
    fontWeight: 'semibold',
    marginVertical: 10,
    fontSize: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'center',
    padding: 5,
  },
})
