import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeInLeft,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import usePryceStore from '~/hooks/pryceStore'
import { Profile } from '~/types/userStorage'
import { colorTokens } from '@tamagui/themes'
import Accordion from '~/components/profile/accordion'
import { membership, pgc } from '~/data/data'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Membership from '~/components/membership'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const IMG_HEIGHT = 200

const getResponsiveFontSize = () => {
  const baseFontSize = 22
  const scaleFactor = width / 375
  const scaledFontSize = baseFontSize * scaleFactor

  if (Platform.OS === 'ios') {
    return Math.min(scaledFontSize, 30)
  } else {
    return Math.min(scaledFontSize, 28)
  }
}

export default function Page() {
  const { id } = useLocalSearchParams()
  const users = usePryceStore((state) => state.users)
  const [pgcUser, setPgcUser] = useState<Profile | undefined>()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef)

  useEffect(() => {
    if (users.length > 0 && id) {
      const findUser = users.find((e) => e.Id === id)
      setPgcUser(findUser)
    }
  }, [users, id])

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOfset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  })

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 3,
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color={colorTokens.light.orange.orange9}
              />
            </TouchableOpacity>
          ),

          headerTransparent: true,
          headerBackground: () => (
            <Animated.View style={[styles.header, headerAnimatedStyle]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                PRYCEGAS Club Member
              </Text>
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        // contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ position: 'relative' }}>
          <Animated.Image
            source={require('~/assets/card-background.png')}
            style={[styles.image, imageAnimatedStyle]}
            entering={FadeIn.duration(400).delay(200)}
          />
          <View style={styles.pgcLogo}>
            <Image source={require('~/assets/club.png')} style={styles.logo} />
          </View>
          <View style={styles.textOverlay}>
            <Text style={styles.text}>{pgcUser?.PGC_ID_Number__c}</Text>
            <View style={styles.textDetails}>
              <Text style={styles.textName}>
                {pgcUser?.FirstName} {pgcUser?.LastName}
              </Text>
              <Text style={styles.textAdd}>
                {pgcUser?.Primary_Street__c}, {pgcUser?.Primary_City2__c},{' '}
                {pgcUser?.Primary_State_Province__c}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.animatedHeader}>
          <Text style={styles.animatedText}>Benefits</Text>
        </View>
        {pgc.map((item, index) => {
          return (
            <Membership
              key={item.id}
              id={item.id}
              title={item.title}
              subtitles={item.subtitles}
              image={item.image}
            />
          )
        })}

        <View style={styles.faqContainer}>
          {/* <LinearGradient
            colors={['#FFA500', '#FF4500']}
            style={styles.gradient}
            start={[0, 0]}
            end={[1, 1]}
          /> */}
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          {membership.map((item, index) => {
            return (
              <Accordion
                key={index}
                // name={item.name}
                title={item.title}
                subtitles={item.subtitles}
              />
            )
          })}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    width,
    height: IMG_HEIGHT,
  },
  header: {
    backgroundColor: 'white',
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 45 : 25,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animatedHeader: { height: 100, backgroundColor: 'white' },
  animatedText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    paddingTop: 20,
  },
  animatedDesc: {
    fontSize: 16,
    marginHorizontal: 16,
    lineHeight: 22,
    textAlign: 'justify',
    color: colorTokens.light.gray.gray11,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 20,
  },
  text: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
  },
  textDetails: {
    marginTop: 10,
  },
  textAdd: {
    fontWeight: '400',
    color: '#fff',
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 30,
  },
  contentTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  pgcLogo: {
    position: 'absolute',
    right: 0,
    bottom: Platform.OS === 'ios' ? 20 : 35,
    marginRight: 15,
  },

  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },

  faqContainer: {
    marginVertical: 30,

    // backgroundColor: colorTokens.light.orange.orange3,
  },
  faqTitle: {
    textAlign: 'center',
    fontSize: getResponsiveFontSize(),

    fontWeight: '700',
    color: '#000',
    paddingVertical: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
})
