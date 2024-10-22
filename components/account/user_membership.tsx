import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function UserMembership() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subTitle}
        onPress={() => router.push('/(tabs)/account/pgc-membership')}
      >
        <View style={styles.subTitleContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>PGC</Text>
          </View>
          <Text>Your membership</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  subTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  badgeContainer: {
    backgroundColor: colorTokens.light.orange.orange9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
})
