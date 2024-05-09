import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import { AntDesign, MaterialIcons, Entypo, Feather } from '@expo/vector-icons'
import { ProfileProps } from '~/data/data'
import { colorTokens } from '@tamagui/themes'
import { Button } from 'tamagui'
import { Link, router } from 'expo-router'

export default function Accordion({
  id,
  name,
  title,
  subtitles,
}: ProfileProps) {
  const [opened, setOpened] = useState(false)

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  function toggleAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeIn', property: 'opacity' },
      update: { type: 'linear', springDamping: 0.3, duration: 250 },
    })
    setOpened(!opened)
  }

  return (
    <View
      style={{
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 6,
      }}
    >
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <MaterialIcons
              name={name.icon}
              size={24}
              color={colorTokens.light.orange.orange9}
            />
            <Text
              style={{
                textTransform: 'capitalize',
                marginLeft: 10,
                fontSize: 20,
                color: colorTokens.light.gray.gray12,
              }}
            >
              {title}
            </Text>
          </View>
          <AntDesign
            name={opened ? 'minus' : 'plus'}
            size={16}
            color={colorTokens.light.orange.orange9}
          />
        </View>
      </TouchableWithoutFeedback>

      {opened && (
        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
          }}
        >
          {/* {subtitles.map((subtitle) => (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 35,
                marginVertical: 3,
              }}
              key={subtitle}
            >
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/profile/',
                    params: { id: 1, subtitles: 'address' },
                  })
                }
              >
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 18,

                    color: colorTokens.light.gray.gray12,
                  }}
                >
                  {subtitle}
                </Text>
              </Pressable>
              <Feather
                name="chevron-right"
                size={22}
                color={colorTokens.light.orange.orange9}
                style={{ alignItems: 'center' }}
              />
            </View>
          ))} */}
        </View>
      )}
    </View>
  )
}
