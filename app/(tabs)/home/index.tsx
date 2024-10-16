import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import Products from '~/components/shop/products/products'
import { colorTokens } from '@tamagui/themes'
import AllProducts from '~/components/shop/products/all_products'
import usePryceStore from '~/hooks/pryceStore'
import { View } from 'tamagui'
import { useFetchProducts } from '~/hooks/fetchProducts'
import BottomSheet from '~/components/bottom_sheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ProductSingle } from '~/types/product'

export default function Page() {
  const { mutate: fetchProducts, data, error, isPending } = useFetchProducts()
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const token = usePryceStore((state) => state.token)
  const [refreshing, setRefreshing] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const changeAddressTrigger = usePryceStore(
    (state) => state.changeAddressTrigger
  )
  // const searchData = usePryceStore((s) => s.searchData)
  // const setSearchData = usePryceStore((s) => s.setSearchData)
  const searchKeyword = usePryceStore((s) => s.searchKeyword)
  const [dataFiltered, setDataFiltered] = useState<ProductSingle[]>([])
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (selectedUser) {
      const userData: { token: string; accountNumber: string } = {
        token: token,
        accountNumber: selectedUser,
      }

      fetchProducts(userData)
    }
  }, [selectedUser])

  useEffect(() => {
    if (data && !isPending) {
      if (searchKeyword === '' || searchKeyword === null || !searchKeyword)
        return setDataFiltered(data.productsResponse)

      if (searchKeyword) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current)
        }

        debounceTimeoutRef.current = setTimeout(() => {
          const filteredData = data.productsResponse.filter((item) => {
            return (
              item.Name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
              item.ProductCode.toLowerCase().includes(
                searchKeyword.toLowerCase()
              )
            )
          })

          setDataFiltered(filteredData)
        }, 800)
      }
    }
  }, [searchKeyword, data])

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

          {/* <ProductGroup /> */}

          {!searchKeyword && (
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginVertical: 16,
                  fontSize: 18,
                }}
              >
                Top picks in your neighborhood
              </Text>

              <Products />
            </>
          )}

          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 25,
              marginBottom: 16,
              fontSize: 18,
            }}
          >
            All products
          </Text>

          <AllProducts products={dataFiltered} />

          {searchKeyword && dataFiltered.length < 1 && (
            <Text>No products found!</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
