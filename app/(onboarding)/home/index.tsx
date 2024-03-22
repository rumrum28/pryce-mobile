import { colorTokens } from '@tamagui/themes'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  Pressable,
  Dimensions,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native'

type OnboardingStep = {
  id: string
  image: string
  title: string
  description: string
}

const { width, height } = Dimensions.get('window')

const COLORS = { primary: '#282534', white: '#fff' }

const onboardingSteps: OnboardingStep[] = [
  {
    id: '0',
    image: require('~/assets/pgc-card-mascot.png'),
    title: 'PGC Membership',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utenim ad minim veniam. Utenim ad minim veniam. Utenim ad minim veniam.',
  },
  {
    id: '1',
    image: require('~/assets/hotline.png'),
    title: '#98000 Hotline',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utenim ad minim veniam. Utenim ad minim veniam. Utenim ad minim veniam.',
  },
  {
    id: '2',
    image: require('~/assets/rider.png'),
    title: 'On-Time Delivery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utenim ad minim veniam. Utenim ad minim veniam. Utenim ad minim veniam.',
  },
]

type SlideProps = {
  item: OnboardingStep
}

const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View
      style={{
        width: width,
        alignItems: 'center',
      }}
    >
      <Image
        source={item.image as ImageSourcePropType}
        style={{
          height: '60%',
          width,
          resizeMode: 'contain',
          marginTop: 30,
        }}
      />
      <View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          {item?.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: COLORS.white,
            marginTop: 10,
            maxWidth: '70%',
            textAlign: 'center',
            lineHeight: 23,
          }}
        >
          {item?.description}
        </Text>
      </View>
    </View>
  )
}

export default function Page() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef<FlatList<OnboardingStep>>(null)

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != onboardingSteps.length) {
      const offset = nextSlideIndex * width
      ref.current?.scrollToOffset({ offset })
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const skip = () => {
    const lastSlideIndex = onboardingSteps.length - 1
    const offset = lastSlideIndex * width
    ref.current?.scrollToOffset({ offset })
    setCurrentSlideIndex(lastSlideIndex)
  }
  const onLogIn = () => {
    router.push('/(onboarding)/login')
  }

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  height: 3,
                  width: 10,
                  backgroundColor: colorTokens.light.orange.orange9,
                  marginHorizontal: 3,
                  borderRadius: 2,
                },
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == onboardingSteps.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: colorTokens.light.orange.orange9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onLogIn}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}
                >
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: colorTokens.light.orange.orange9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 0,
          justifyContent: 'center',
          backgroundColor: colorTokens.light.orange.orange9,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colorTokens.light.orange.orange8,
        }}
      >
        <LinearGradient
          colors={[
            colorTokens.light.orange.orange9,
            colorTokens.light.orange.orange8,
          ]}
          style={{ flex: 1 }}
        >
          <StatusBar backgroundColor={COLORS.primary} />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <FlatList
              ref={ref}
              pagingEnabled
              onMomentumScrollEnd={updateCurrentSlideIndex}
              data={onboardingSteps}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <Slide item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Footer />
        </LinearGradient>
      </SafeAreaView>
    </>
  )
}
