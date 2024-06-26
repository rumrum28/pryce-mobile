import { SafeAreaView, ScrollView, Text } from 'react-native'
import React, { useEffect } from 'react'
import Products from '~/components/shop/products/products'
import Categories from '~/components/shop/category/categories'
import { ToastViewport, useToastController } from '@tamagui/toast'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'
import { useMutation } from '@tanstack/react-query'
import { changeAddressOnLoad } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { SelectAddressModal } from '~/components/selectAddress'
import usePryceStore from '~/hooks/pryceStore'
import { Spinner, YStack } from 'tamagui'

export default function Page() {
  const toast = useToastController()
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)

  const fetchProducts = useMutation({
    mutationFn: changeAddressOnLoad,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['changeAddress'],
      })

      console.log(data)
    },
  })

  useEffect(() => {
    if (selectedUser) {
      console.log(selectedUser)
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts.mutate(userData)
    }
  }, [selectedUser])

  if (fetchProducts.isPending) {
    return (
      <YStack padding="$3" gap="$4" alignItems="center" marginTop={20}>
        <Spinner size="large" color="$orange10" />
      </YStack>
    )
  }

  return (
    <SafeAreaView
      style={{ top: 90, backgroundColor: colorTokens.light.gray.gray2 }}
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
      >
        {/* <Button onPress={() => setSelectedUser(null)}>offSlected</Button> */}
        {selectedUser && <SelectAddressModal modalTrigger={selectedUser} />}

        <Text
          style={{
            paddingHorizontal: 10,
            fontWeight: 'bold',
            marginTop: 16,
            fontSize: 18,
          }}
        >
          Your Favorite Products
        </Text>
        <Categories />
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
        <Products />
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
        <AllProducts />
      </ScrollView>
    </SafeAreaView>
  )
}
