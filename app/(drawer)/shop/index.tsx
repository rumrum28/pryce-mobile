import { SafeAreaView, ScrollView, Text } from 'react-native'
import React from 'react'
import Products from '~/components/shop/products/products'
import Categories from '~/components/shop/category/categories'
import { ToastViewport, useToastController } from '@tamagui/toast'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'
import { useMutation } from '@tanstack/react-query'
import { profile } from '~/server/api'
import { queryClient } from '~/hooks/queryClient'
import { router } from 'expo-router'

export default function Page() {
  const toast = useToastController()

  const getProfile = useMutation({
    mutationFn: profile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })

      if (data) {
        const firstTrueMember = data.find(
          (item) => item.Prycegas_Club_Member__c === true
        )
        console.log(firstTrueMember)
        // router.push('/(drawer)/shop')
      } else {
        toast.show('Error', {
          message: 'Something is wrong in profile fetch',
          native: false,
        })
      }
    },
  })

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
        {/* <Carousel /> */}
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
