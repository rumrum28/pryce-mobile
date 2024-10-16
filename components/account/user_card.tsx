import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { Octicons, SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push('/profile')}
        style={styles.cardContainer}
      >
        <Octicons size={24} name="person" color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Profile
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/orders')}
        style={styles.cardContainer}
      >
        <Ionicons name="clipboard-outline" size={24} color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Orders
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/addresses')}
        style={styles.cardContainer}
      >
        <SimpleLineIcons name="location-pin" size={24} color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Addresses
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    marginVertical: 20,
  },
  cardContainer: {
    flex: 1, // Ensures equal width for all cards
    borderRadius: 10,
    borderColor: colorTokens.light.gray.gray9,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardTitle: {
    // fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
  },
})
