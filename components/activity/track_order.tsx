import { View, Text, Image } from 'react-native'
import { useState } from 'react'
import { UserOrderProps } from '~/types/userStorage'
import { colorTokens } from '@tamagui/themes'
import { FontAwesome5 } from '@expo/vector-icons'

interface TrackOrderProps {
  records: UserOrderProps[]
}

// Function to map order status to a step number
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
      return 0 // Unknown status or pending
  }
}

const TrackOrder: React.FC<TrackOrderProps> = ({ records }) => {
  const [currentStep, setCurrentStep] = useState(1)

  // Create an array of statuses you want to show in your track order process
  const statuses = [
    'Order Created',
    'Order Confirmed',
    'Order Assigned',
    'Delivered',
  ]

  // Determine the maximum step achieved based on the current record statuses
  const maxStep = Math.max(...records.map((item) => getStatusStep(item.Status)))

  return (
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
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Track Order</Text>
        {records.length > 0 && (
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: colorTokens.light.orange.orange9,
            }}
          >
            {records[0].OrderNumber} {/* Display the first order number */}
          </Text>
        )}
      </View>

      {/* Order Steps */}
      <View style={{ marginTop: 30, paddingHorizontal: 15 }}>
        {statuses.map((status, index) => {
          const isCompleted = getStatusStep(status) <= maxStep // Check if this status step is completed

          return (
            <View key={status}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: -5,
                }}
              >
                {/* Display check icon with dynamic color based on completion */}
                <FontAwesome5
                  name="check-circle"
                  size={24}
                  color={
                    isCompleted
                      ? colorTokens.light.orange.orange9
                      : colorTokens.light.gray.gray9
                  }
                />
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    {status} {/* Display the current step's status */}
                  </Text>
                  {/* Display corresponding address details */}
                  {records[index] && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '300',
                        color: colorTokens.light.gray.gray9,
                      }}
                    >
                      {records[index].CreatedDateTime__c},
                      {/* {records[index].Deliver_To_City__c},{' '} */}
                      {/* {records[index].Deliver_To_Province__c} */}
                    </Text>
                  )}
                </View>
              </View>

              {/* Progress Line Between Steps */}
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
                      source={require('~/assets/images/dotted.png')} // Adjust image path
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
  )
}

export default TrackOrder
