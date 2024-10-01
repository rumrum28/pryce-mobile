import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colorTokens } from '@tamagui/themes'
import { Profile } from '~/types/userStorage'
import UserCard from './user_card'

export default function UserDetails({
  userDetails,
}: {
  userDetails: Profile | undefined
}) {
  return (
    <View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{userDetails?.FirstName}</Text>
        {userDetails?.Prycegas_Club_Member__c ? (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>PGC</Text>
          </View>
        ) : null}
      </View>
      <TouchableOpacity>
        <Text style={styles.profileButton}>View profile</Text>
      </TouchableOpacity>
      <UserCard />
    </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
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
  profileButton: {
    marginTop: 10,
  },
})
