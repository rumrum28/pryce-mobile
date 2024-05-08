import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  ActivityIndicator,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated'
import { OnboardingData, data } from '~/data/data'
import { useEffect, useState } from 'react'
import { loadDatabase } from '~/hooks/SQLite'
import { Text } from 'tamagui'
import RenderOnboardingItem from '~/components/onboarding/render-onboarding'
import Pagination from '~/components/onboarding/pagination'
import CustomButton from '~/components/onboarding/custom-button'
import { PryceSettings } from '~/types/user'
import { router } from 'expo-router'
import pryceStore from '~/hooks/pryceStore'

const OnboardingScreen = () => {
  const { pryceSettings, testGetAllFromPryceSettingsTable } = pryceStore(
    (state) => ({
      pryceSettings: state.pryceSettings,
      testGetAllFromPryceSettingsTable: state.testGetAllFromPryceSettingsTable,
    })
  )
  const [dbLoaded, setDbLoaded] = useState<boolean>(false)

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

  const getFromPryce = async () => {
    testGetAllFromPryceSettingsTable()
  }

  useEffect(() => {
    if (
      Array.isArray(pryceSettings) &&
      pryceSettings.length > 0 &&
      pryceSettings[0].value === 'false'
    ) {
      router.push('/onboarding/login')
    }
  }, [pryceSettings])

  useEffect(() => {
    loadDatabase()
      .then(() => {
        setDbLoaded(true)
        getFromPryce()
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (!dbLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Database...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
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
