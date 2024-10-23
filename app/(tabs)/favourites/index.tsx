import {
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  Pressable,
} from 'react-native'
import React, { useEffect } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import FavoritesList from '~/components/favourites/favorites_list'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import Skeleton from '~/components/skeleton'
import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Page() {
  const favorites = usePryceStore((state) => state.favorites || [])
  const addressRef = usePryceStore((set) => set.addressRef)

  const {
    mutate: fetchProductsDetails,
    data,
    isPending,
  } = useFetchProductsDetails()

  useEffect(() => {
    if (addressRef) {
      fetchProductsDetails(addressRef)
    }
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      {/* <StatusBar style={Platform.OS === 'ios' ? 'auto' : 'light'} /> */}

      {isPending ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View>
              <Skeleton width="100%" height={180} />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Skeleton width={150} height={20} />
            </View>
            <View style={{ marginRight: 10 }}>
              <Skeleton width={120} height={20} />
            </View>
          </View>
        </View>
      ) : (
        <>
          {data && data.length > 0 ? (
            (() => {
              const filteredData = data.filter((product) =>
                favorites.some((fav) => fav.productCode === product.ProductCode)
              )
              return filteredData.length > 0 ? (
                <FavoritesList data={filteredData} favorites={favorites} />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ width: 200, height: 200 }}>
                    <Image
                      source={require('~/assets/rider.png')}
                      style={{
                        height: '100%',
                        width: 'auto',
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: '700',
                      marginTop: 20,
                    }}
                  >
                    No favourites saved
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      textAlign: 'center',
                      marginHorizontal: 30,
                      marginVertical: 10,
                    }}
                  >
                    To make ordering even faster, you'll find all your faves
                    here. Juse look for the heart icon!
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: colorTokens.light.orange.orange9,
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}
                    onPress={() => router.push('/(tabs)/home')}
                  >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>
                      Let's find some favourites
                    </Text>
                  </Pressable>
                </View>
              )
            })()
          ) : (
            <View>
              <Text>No data available</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  )
}
