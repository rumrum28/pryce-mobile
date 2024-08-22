import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  Linking,
  Text,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated'
import { data, OnboardingData } from '~/data/data'
import RenderOnboardingItem from '~/components/onboarding/render-onboarding'
import Pagination from '~/components/onboarding/pagination'
import CustomButton from '~/components/onboarding/custom-button'
import { useEffect, useState } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import { router } from 'expo-router'
import { ToastViewport } from '@tamagui/toast'

const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl)
        setProcessing(false)
      }, 1000)
    }

    getUrlAsync()
  }, [])

  return { url, processing }
}

const OnboardingScreen = () => {
  const getStarted = usePryceStore((state) => state.getStarted)
  const email = usePryceStore((state) => state.email)
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>()
  const x = useSharedValue(0)
  const flatListIndex = useSharedValue(0)

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[]
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index
    }
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x
    },
  })

  useEffect(() => {
    if (!getStarted) {
      router.push('/onboarding/login')
    }

    if (token && users.length > 0) {
      router.push('/(drawer)/shop')
    }
  }, [getStarted, email, token, users])

  const { url: initialUrl, processing } = useInitialURL()

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>

      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderOnboardingItem item={item} index={index} x={x} />
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
})
