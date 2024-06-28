import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { View, Image, YStack, Text, Button } from 'tamagui'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import LoginForm from './login-form'
import usePryceStore from '~/hooks/pryceStore'
import { colorTokens } from '@tamagui/themes'
import { fonts } from '../../utils/fonts'

export default function LogIn({
  setLoginType,
}: {
  setLoginType: (t: 'otp' | 'password' | null) => void
}) {
  const setGetStarted = usePryceStore((state) => state.setGetStarted)

  const backHandler = () => {
    setGetStarted(true)
    router.push('/onboarding/login')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={backHandler}>
        <Ionicons
          name={'arrow-back-outline'}
          color={colorTokens.light.orange.orange9}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      {/* form  */}
      <LoginForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colorTokens.light.gray.gray1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 36,
    color: colorTokens.light.gray.gray11,
    fontFamily: fonts.SemiBold,
  },
})
