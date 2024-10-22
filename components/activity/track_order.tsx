import { View, Text, Image } from 'react-native'
import { useState } from 'react'
import { UserOrderResponse } from '~/types/userStorage'
import { colorTokens } from '@tamagui/themes'
import { Octicons } from '@expo/vector-icons'

const getStatusStep = (status: string) => {
  switch (status) {
    case 'Order Created':
      return 1
    case 'Order Confirmed':
      return 2
    case 'Order Assigned':
      return 3
    case 'Delivered':
      return 4
    default:
      return 0
  }
}

const TrackOrder: React.FC<UserOrderResponse> = ({ records = [] }) => {
  const statuses = [
    {
      status: 'Order Created',
      subtitle: 'Your order has been received.',
    },
    { status: 'Order Confirmed', subtitle: 'Your order has been confirmed.' },
    {
      status: 'Order Assigned',
      subtitle: 'Your order has been assigned.',
    },
    { status: 'Delivered', subtitle: 'Thank you for ordering!' },
  ]

  const maxStep =
    records.length > 0
      ? Math.max(...records.map((item) => getStatusStep(item.Status)))
      : 0

  function formatDateUTC(dateString: string): string {
    const date = new Date(dateString)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Manila',
    }

    return date.toLocaleString('en-PH', options)
  }

  const formattedDate = formatDateUTC(records[0].Phone_Order_Deadline__c)

  console.log('records:', records)

  return (
    <>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        {records.length > 0 && (
          <>
            <Text style={{ color: colorTokens.light.gray.gray9 }}>
              Estimated Delivery
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              {formattedDate}
            </Text>
          </>
        )}
      </View>

      <View
        style={{
          marginTop: 30,
          paddingVertical: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colorTokens.light.gray.gray2,
          backgroundColor: '#fff',
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Order Number</Text>
          {records.length > 0 && (
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: colorTokens.light.orange.orange9,
              }}
            >
              {records[0].OrderNumber}
            </Text>
          )}
        </View>
        <View
          style={{ height: 2, backgroundColor: colorTokens.light.gray.gray2 }}
        ></View>
        {/* Order Steps */}
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          {statuses.map((item, index) => {
            const isCompleted = getStatusStep(item.status) <= maxStep

            return (
              <View key={item.status}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -10,
                  }}
                >
                  <Octicons
                    name="check-circle-fill"
                    size={24}
                    color={
                      isCompleted
                        ? colorTokens.light.orange.orange9
                        : colorTokens.light.gray.gray9
                    }
                  />
                  {/* <FontAwesome5
                    name="check-circle"
                    size={24}
                    color={
                      isCompleted
                        ? colorTokens.light.orange.orange9
                        : colorTokens.light.gray.gray9
                    }
                  /> */}
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      {item.status}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colorTokens.light.gray.gray8,
                      }}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>

                {index < statuses.length - 1 && (
                  <View>
                    {isCompleted ? (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 10,
                          backgroundColor: colorTokens.light.orange.orange9,
                          zIndex: -1,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('~/assets/images/dotted.png')}
                        style={{
                          marginLeft: 10,
                          height: 50,
                          width: 4,
                          tintColor: colorTokens.light.gray.gray9,
                        }}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </View>
    </>
  )
}

export default TrackOrder
