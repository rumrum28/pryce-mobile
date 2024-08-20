import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Image, YStack, Text, Button } from 'tamagui'
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import usePryceStore from '~/hooks/pryceStore'
import { colorTokens } from '@tamagui/themes'
import LoginForm from '~/components/login/login-form'
import { fonts } from '~/utils/fonts'
import RegisterForm from '~/components/register/register-form'
import Register from '~/components/register/register'

export default function Page() {
  const setGetStarted = usePryceStore((state) => state.setGetStarted)
  const insets = useSafeAreaInsets()

  const { loginType } = useLocalSearchParams()

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Sign up</Text>
        <Text style={styles.subText}>Let&apos;s create your account</Text>
      </View>

      <View style={{ flex: 1, width: '100%', gap: 20 }}>
        {/* <RegisterForm /> */}
        <Register />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    marginTop: 30,
    padding: 20,
  },
  headingText: {
    fontSize: 36,
    color: colorTokens.light.gray.gray12,
    fontFamily: fonts.SemiBold,
  },
  subText: {
    fontSize: 20,
    color: colorTokens.light.gray.gray11,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

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
