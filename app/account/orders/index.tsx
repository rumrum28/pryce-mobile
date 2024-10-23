import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useFetchOrderDetails } from '~/hooks/fetchOrderDetails'
import usePryceStore from '~/hooks/pryceStore'
import { colorTokens } from '@tamagui/themes'
import UserOrder from '~/components/account/user_order'

export default function Orders() {
  const { fetchOrdersDetails, isPending, error, data } = useFetchOrderDetails()
  const token = usePryceStore((state) => state.token)

  const type = 'delivered'

  useEffect(() => {
    if (token) {
      fetchOrdersDetails({ token, type })

      console.log(JSON.stringify(data), null, 2)
    }
  }, [token, fetchOrdersDetails])

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
      }}
    >
      {isPending ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator
            size="large"
            color={colorTokens.light.orange.orange9}
          />
        </View>
      ) : (
        <>
          {data && data.records && data.records.length > 0 ? (
            <UserOrder
              totalSize={data.totalSize}
              done={data.done}
              records={data.records}
            />
          ) : (
            // <View></View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colorTokens.light.gray.gray9,
                }}
              >
                No Activity
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}
