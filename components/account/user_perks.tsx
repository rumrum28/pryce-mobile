import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'

export default function UserPerks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perks for you</Text>

      <TouchableOpacity style={styles.subTitle}>
        <View style={styles.subTitleContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>PGC</Text>
          </View>
          <Text>Become a member</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>General</Text>
      <TouchableOpacity
        style={[
          {
            borderBottomWidth: 1,
            borderBottomColor: colorTokens.light.gray.gray3,
          },
          styles.subTitle,
        ]}
      >
        <View style={styles.subTitleContainer}>
          <AntDesign
            name="questioncircleo"
            size={20}
            color={colorTokens.light.gray.gray9}
          />
          <Text>Help center</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.subTitle}>
        <View style={styles.subTitleContainer}>
          <Entypo
            name="dots-three-horizontal"
            size={20}
            color={colorTokens.light.gray.gray9}
          />
          <Text>Terms & Policies</Text>
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
