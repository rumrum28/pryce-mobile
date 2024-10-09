import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Products from '~/components/shop/products/products'
import Categories from '~/components/shop/category/categories'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'
import usePryceStore from '~/hooks/pryceStore'
import { useMutation } from '@tanstack/react-query'
import { changeAddressOnLoad } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { Button, Spinner, View, YStack } from 'tamagui'
import { router } from 'expo-router'
import ProductGroup from '~/components/productGroup'
import { useFetchProducts } from '~/hooks/fetchProducts'
import { logout } from '~/components/logout'
import BottomSheet from '~/components/bottom_sheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import useBasketStore from '~/utils/basketStore'

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
  const setAddressRef = usePryceStore((state) => state.setAddressRef)
  const [refreshing, setRefreshing] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const changeAddressTrigger = usePryceStore(
    (state) => state.changeAddressTrigger
  )
  const { products, total, updateProducts, clearCart } = useBasketStore()

  useEffect(() => {
    if (selectedUser) {
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts(userData)
    }
  }, [selectedUser, fetchProducts])

  //useEffecttestonly
  useEffect(() => {
    console.log(products)
    console.log(total)
  }, [])

  useEffect(() => {
    if (!isPending) {
      setRefreshing(false)
    }
  }, [isPending])

  useEffect(() => {
    if (changeAddressTrigger) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [changeAddressTrigger])

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <BottomSheet ref={bottomSheetRef} />

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshPage()}
            />
          }
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
