import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { PGCProps } from '~/data/data'

export default function Membership({ image, title, subtitles }: PGCProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={image as ImageSourcePropType} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textSub}>{subtitles}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  textSub: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
})
