import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import Products from '~/components/shop/products/products'
import Categories from '~/components/shop/category/categories'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'
import { ToastViewport } from '@tamagui/toast'
import usePryceStore from '~/hooks/pryceStore'
import { useMutation } from '@tanstack/react-query'
import { changeAddressOnLoad } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { Button, Spinner, View, YStack } from 'tamagui'
import { router } from 'expo-router'
import ProductGroup from '~/components/productGroup'
import { useFetchProducts } from '~/hooks/fetchProducts'

export default function Page() {
  const { mutate: fetchProducts, data, error, isPending } = useFetchProducts()
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const addressRef = usePryceStore((state) => state.addressRef)
  const setAddressRef = usePryceStore((state) => state.setAddressRef)
  const favorites = usePryceStore((set) => set.favorites)
  const token = usePryceStore((state) => state.token)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)
  const [refreshing, setRefreshing] = useState(false)

  // const fetchProducts = useMutation({
  //   mutationFn: changeAddressOnLoad,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['fetchProductsOnLoad'],
  //     })

  //     setRefreshing(false)
  //     if (data?.addressRef) {
  //       setAddressRef(data.addressRef)
  //     }
  //   },
  // })

  useEffect(() => {
    if (data?.addressRef) {
      setRefreshing(false)
      setAddressRef(data.addressRef)
    }
  }, [data])

  useEffect(() => {
    setRefreshing(true)
    if (selectedUser) {
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts(userData)
    }
  }, [selectedUser, fetchProducts])

  const refreshPage = useCallback(() => {
    setRefreshing(true)
    if (selectedUser) {
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts(userData)
    }
  }, [])

  console.log(isPending)

  // useEffect(() => {
  //   if (
  //     !fetchProducts.isPending &&
  //     (fetchProducts.data === null || !fetchProducts.data)
  //   ) {
  //     setSelectedUser(null)
  //     setToken('')
  //     setUsers([])
  //     setEmail('')
  //     setChangeAddressTrigger(false)
  //     setAddressRef('')
  //     router.push('/onboarding/login')
  //   }

  if (isPending) {
    return (
      <YStack padding="$3" gap="$4" alignItems="center" marginTop={20}>
        <Spinner size="large" color="$orange10" />
      </YStack>
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorTokens.light.gray.gray2,
      }}
    >
      <ToastViewport
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      />

      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshPage()}
          />
        }
      >
        {/* {fetchProducts.data && favorites.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Your Favorite Products
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/(drawer)/favorites')}
              >
                <Text style={{ fontSize: 12 }}>See all</Text>
              </TouchableOpacity>
            </View>
            <Categories
              products={fetchProducts.data?.productsResponse}
              favorites={favorites}
            />
          </>
        ) : null} */}

        {/* <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          Top picks in your neighborhood 
        </Text>
        <Products products={fetchProducts.data?.productsResponse} /> */}

        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          Top picks in your neighborhood
        </Text>

        {/* <ProductGroup /> */}

        <Products products={data?.productsResponse} />

        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          All products
        </Text>

        <AllProducts products={data?.productsResponse} />
      </ScrollView>
    </SafeAreaView>
  )
}
