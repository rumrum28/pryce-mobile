import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import usePryceStore from '~/hooks/pryceStore'
import FavoritesList from '~/components/favourites/favorites_list'
import { useFetchProductsDetails } from '~/hooks/fetchProductDetails'
import Skeleton from '~/components/skeleton'

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
                  <Text>No favourites saved</Text>
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
      {/* <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: 30,
          marginHorizontal: 15,
        }}
        showsVerticalScrollIndicator={false}
      > */}
      {/* <FavoritesList favorites={favorites} /> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}
