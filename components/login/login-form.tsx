import { Form, View, Text } from 'tamagui'
import { useState } from 'react'
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { useMutation } from '@tanstack/react-query'
import { UserInputs } from '~/types/apiresults'
import { useRouter } from 'expo-router'
import { queryClient } from '~/hooks/queryClient'
import { login } from '~/server/api'
import { useToastController } from '@tamagui/toast'
import usePryceStore from '~/hooks/pryceStore'
import { fonts } from '~/utils/fonts'
import { formatPhoneNumber, mobileOrDigitSchema } from '~/utils/numberChecker'

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [invalidNumber, setInvalidNumber] = useState<boolean>(false)
  const setToken = usePryceStore((state) => state.setToken)
  const setUsers = usePryceStore((state) => state.setUsers)
  const toast = useToastController()
  const router = useRouter()

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['login'],
      })

      if (data && data.loginResponse?.success) {
        toast.show('Succesfully Login', {
          message: 'Welcome to PRYCEGAS!',
          native: false,
        })

        if (data.profileResponse) {
          setToken(data.loginResponse?.access_token)
          setUsers(data.profileResponse)
          router.push('/(tabs)/home')
        }
      } else {
        toast.show('Error', {
          message: 'Invalid phone number or password',
          native: false,
        })
      }
    },
  })

  const loginHandler = async () => {
    const userData: UserInputs = {
      phone_number: phoneNumber.replace(/\s+/g, ''),
      value: password,
      type: 'password',
    }

    loginResponse.mutate(userData)
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

  return (
    <View style={styles.formContainer}>
      <Form onSubmit={loginHandler}>
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
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
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
              <Text style={styles.loginText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </Form.Trigger>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colorTokens.light.orange.orange9,
    padding: 10,
    marginVertical: 10,
  },
  textInvalidNum: {
    borderColor: colorTokens.light.red.red9,
    borderWidth: 2,
  },
  textValidNum: {
    borderColor: colorTokens.light.orange.orange9,
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colorTokens.light.gray.gray9,
    fontWeight: 'regular',
    fontSize: 16,
  },
  signupText: {
    color: colorTokens.light.orange.orange9,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
