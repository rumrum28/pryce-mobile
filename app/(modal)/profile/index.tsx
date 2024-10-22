import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import usePryceStore from '~/hooks/pryceStore'
import { Profile } from '~/types/userStorage'

export default function Favourites() {
  const users = usePryceStore((state) => state.users)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const [userDetails, setUserDetails] = useState<Profile | undefined>()

  useEffect(() => {
    const findUser = users.find((e) => e.Account_Number__c === selectedUser)

    if (findUser) {
      setUserDetails(findUser)
    } else {
      setUserDetails(undefined)
    }
  }, [selectedUser, users])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal details</Text>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text>Name</Text>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
          />
        </View>
        <Text>{userDetails?.Name}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text>Name</Text>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
          />
        </View>
        <Text>Name</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text>Name</Text>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
          />
        </View>
        <Text>Name</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text>Name</Text>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
          />
        </View>
        <Text>Name</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
