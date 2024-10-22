import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function UserPerks() {
  return (
    <View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => router.push('/(tabs)/account/membership')}
      >
        <LinearGradient
          colors={['#FFA500', '#FF4500']}
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 1]}
        />
        <Text style={styles.title}>Subscribe to</Text>
        <View style={styles.imageCon}>
          <Image source={require('~/assets/club.png')} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    // marginBottom: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    opacity: 0.4,
  },
  touchable: {
    borderRadius: 15,
    overflow: 'hidden',
    padding: 25,
    position: 'relative',
  },
  imageCon: {
    position: 'absolute',
    right: 20,
    bottom: -20,
    width: 120,
    height: 120,
  },
  image: {
    width: '100%', // Make the image fill the container
    height: '100%', // Make the image fill the container
    resizeMode: 'contain',
  },
})
