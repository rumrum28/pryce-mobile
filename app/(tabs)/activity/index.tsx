import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DeliveryInfo from '~/components/activity/delivery_info'
import TrackOrder from '~/components/activity/track_order'
import usePryceStore from '~/hooks/pryceStore'
import { useFetchOrderDetails } from '~/hooks/fetchOrderDetails'

const orderStatuses = [
  'Order Created',
  'Order Confirmed',
  'Order Assigned',
  'Delivered',
]

export default function Page() {
  const { fetchOrdersDetails, isPending, error, data } = useFetchOrderDetails()
  const [orderStatus, setOrderStatus] = useState<string | null>(null)

  const selectedUser = usePryceStore((state) => state.selectedUser)
  const token = usePryceStore((state) => state.token)

  const fetchDynamicOrderStatus = () => {
    if (data && data?.compositeResponse?.[0]?.body?.records?.length > 0) {
      const latestOrder = data.compositeResponse[0].body.records[0]
      console.log('latestOrder:', latestOrder)
      const currentStatus = latestOrder.Status

      console.log('currentStatus:', currentStatus)

      if (orderStatuses.includes(currentStatus)) {
        console.log('currentStatus:', currentStatus)
        setOrderStatus(currentStatus)
      } else {
        setOrderStatus('Order Confirmed')
      }
    } else {
      setOrderStatus('Order Confirmed')
    }
  }

  useEffect(() => {
    if (token && orderStatus) {
      fetchOrdersDetails({ token, type: orderStatus })
      console.log('Fetching orders with status:', orderStatus)
    }
  }, [token, orderStatus, fetchOrdersDetails])

  useEffect(() => {
    fetchDynamicOrderStatus()
  }, [data])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <DeliveryInfo />
      {data && (
        <TrackOrder records={data?.compositeResponse?.[0]?.body?.records} />
      )}
    </View>
  )
}
