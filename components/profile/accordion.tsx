import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
  StyleSheet,
  Animated, // Import Animated API
  Easing,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { PGCMembershipProps } from '~/data/data'
import { colorTokens } from '@tamagui/themes'

export default function Accordion({
  // name,
  title,
  subtitles,
}: PGCMembershipProps) {
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
            {/* <MaterialIcons
              // name={name.icon}
              size={24}
              color={colorTokens.light.orange.orange9}
            /> */}
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

const styles = StyleSheet.create({
  details: {
    opacity: 0.65,
    marginTop: 10,
    // marginLeft: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    // marginTop: 8,
  },
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    // backgroundColor: colorTokens.light.orange.orange3,
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
    // padding: 15,
    // gap: 10,
  },
})
