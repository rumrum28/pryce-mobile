import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { UserOrderResponse } from '~/types/userStorage'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'

const UserOrder: React.FC<UserOrderResponse> = ({ records = [] }) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Orders</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {records.map((item, index) => {
          const formattedDate = formatDateUTC(item.Order_Delivered_Date_Time__c)

          return (
            <View key={index} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>{item.OrderNumber}</Text>
                <Text style={{ color: colorTokens.light.orange.orange9 }}>
                  Completed
                </Text>
              </View>
              <Text style={styles.orderDate}>Delivered on {formattedDate}</Text>

              {item.OrderItems.records.map((orderItem, orderIndex) => {
                return (
                  <View key={`${index}-${orderIndex}`}>
                    <View style={styles.orderName}>
                      <Text>{orderItem.Product2.Name}</Text>
                      <Text>x{orderItem?.Quantity}</Text>
                    </View>
                    <Text style={styles.orderPrice}>
                      {formatCurrency(orderItem?.UnitPrice)}
                    </Text>
                  </View>
                )
              })}
              <Text style={styles.orderTotal}>
                Total {item.Total_Items__c} items:
                <Text style={{ fontWeight: 'bold' }}>
                  {formatCurrency(item.Total_Amount_Due__c)}
                </Text>
              </Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Pressable style={styles.orderBtn}>
                  <Text style={{ color: colorTokens.light.orange.orange9 }}>
                    Buy Again
                  </Text>
                </Pressable>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default UserOrder

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  orderCard: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colorTokens.light.gray.gray3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTitle: {
    // color: colorTokens.light.orange.orange9,
    fontWeight: 'bold',
  },
  orderName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  orderDate: {
    fontSize: 12,
    color: colorTokens.light.gray.gray9,
  },
  orderPrice: {
    fontWeight: '400',
    textAlign: 'right',
  },
  orderTotal: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  orderBtn: {
    borderWidth: 1,
    borderColor: colorTokens.light.orange.orange9,
    padding: 5,
    borderRadius: 5,
  },
})
