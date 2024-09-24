import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect } from 'react'
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
  const favorites = usePryceStore((set) => set.favorites)
  const token = usePryceStore((state) => state.token)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const setToken = usePryceStore((state) => state.setToken)
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const setUsers = usePryceStore((state) => state.setUsers)
  const setEmail = usePryceStore((state) => state.setEmail)

  useEffect(() => {
    if (selectedUser) {
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts(userData)
    }

    // console.log(data?.productsResponse)
    console.log(token)
  }, [selectedUser, fetchProducts])

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

  return (
    <SafeAreaView
      style={{
        // backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
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
      {isPending ? (
        <View>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 30, marginHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        >
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
              // paddingHorizontal: 10,
              fontWeight: 'bold',
              marginTop: 16,
              fontSize: 18,
            }}
          >
            Top picks in your neighborhood
          </Text>

          {/* <ProductGroup /> */}

          <Products />

          <Text
            style={{
              // paddingHorizontal: 10,
              fontWeight: 'bold',
              // marginVertical: 16,
              marginBottom: 10,
              fontSize: 18,
            }}
          >
            All products
          </Text>

          <AllProducts products={data?.productsResponse} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
