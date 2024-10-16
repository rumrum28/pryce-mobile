import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native'
import React from 'react'
import usePryceStore from '~/hooks/pryceStore'
import FavoritesList from '~/components/favourites/favorites_list'

export default function Page() {
  const favorites = usePryceStore((state) => state.favorites || [])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: 30,
          marginHorizontal: 15,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FavoritesList favorites={favorites} />
      </ScrollView>
    </SafeAreaView>
  )
}
