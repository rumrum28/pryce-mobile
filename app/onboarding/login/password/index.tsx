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

export default function LogIn() {
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
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>welcome</Text>
        <Text style={styles.headingText}>back!</Text>
      </View>

      <LoginForm />
    </View>
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
    fontFamily: fonts.SemiBold,
  },
})
