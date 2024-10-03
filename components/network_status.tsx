import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

const NetworkStatus = ({ customStyle }: { customStyle: number }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null) // Initialize as boolean | null

  useEffect(() => {
    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })

    // Unsubscribe on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      {customStyle === 1 ? (
        <View>
          {isConnected === null ? (
            'Checking connection...'
          ) : isConnected ? null : (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: 'orangered',
                  fontWeight: '800',
                  fontSize: 20,
                }}
              >
                You are offline
              </Text>
            </View>
          )}
        </View>
      ) : null}
    </>
  )
}

export default NetworkStatus
