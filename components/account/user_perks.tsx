import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Profile } from '~/types/userStorage'
import { router } from 'expo-router'

export default function UserPerks() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subTitle}
        onPress={() => router.push('/(tabs)/account/membership')}
      >
        <View style={styles.subTitleContainer}>
          <Text>Become a</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>PGC</Text>
          </View>
          <Text>member </Text>
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
    gap: 5,
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
