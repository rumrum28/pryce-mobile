import { View, Text, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import TrackOrder from '~/components/activity/track_order'
import usePryceStore from '~/hooks/pryceStore'
import { useFetchOrderDetails } from '~/hooks/fetchOrderDetails'
import { colorTokens } from '@tamagui/themes'

const orderStatuses = [
  'Order Created',
  'Order Confirmed',
  'Order Assigned',
  'Delivered',
]

export default function Page() {
  const { fetchOrdersDetails, isPending, error, data } = useFetchOrderDetails()
  const token = usePryceStore((state) => state.token)
  const type = 'current'

  useEffect(() => {
    if (token) {
      fetchOrdersDetails({ token, type })
    }
  }, [token])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
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
            <TrackOrder
              totalSize={data.totalSize}
              done={data.done}
              records={data.records}
            />
          ) : (
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
