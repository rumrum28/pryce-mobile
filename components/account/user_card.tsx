import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { Entypo, SimpleLineIcons, Ionicons } from '@expo/vector-icons'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Ionicons name="clipboard-outline" size={24} color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Orders
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Entypo name="heart-outlined" size={24} color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Favourites
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <SimpleLineIcons name="location-pin" size={24} color="black" />
        <Text style={styles.cardTitle} numberOfLines={1}>
          Addresses
        </Text>
      </View>
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
    borderRadius: 5,
    borderColor: colorTokens.light.gray.gray9,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    // fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 12,
    width: '100%',
  },
})
