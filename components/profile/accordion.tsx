import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Entypo } from '@expo/vector-icons'
import { PGCMembershipProps } from '~/data/data'
import { colorTokens } from '@tamagui/themes'

export default function Accordion({ title, subtitles }: PGCMembershipProps) {
  const [opened, setOpened] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  function toggleAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeIn', property: 'opacity' },
      update: { type: 'linear', springDamping: 0.3, duration: 250 },
    })

    Animated.timing(rotateAnim, {
      toValue: opened ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()

    setOpened(!opened)
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  })

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Entypo
              name="chevron-down"
              size={24}
              color={colorTokens.light.orange.orange9}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {opened && (
        <View style={styles.content}>
          <Text style={styles.details}>{subtitles}</Text>
        </View>
      )}
    </View>
  )
}

// Helper function to get a responsive font size based on screen width
const { width } = Dimensions.get('window')
const getResponsiveFontSize = (baseFontSize: any) => {
  const scaleFactor = width / 375 // 375 is a standard width (e.g., iPhone 11)
  return Math.round(baseFontSize * scaleFactor)
}

const styles = StyleSheet.create({
  details: {
    opacity: 0.65,
    marginTop: 10,
  },
  title: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '600',
  },
  content: {},
  container: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 6,
    borderColor: colorTokens.light.gray.gray3,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
