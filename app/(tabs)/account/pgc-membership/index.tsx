import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import React from 'react'
import { Separator } from 'tamagui'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="default"
        translucent
        // backgroundColor={colorTokens.light.orange.orange9}
      />
      {/* <Separator
        height={StatusBar.currentHeight}
        style={{ height: 0, width: 0 }}
      /> */}
      <View style={styles.backgroundCurvedContainer} />
      {/* <View style={styles.headerContainer}></View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundCurvedContainer: {
    backgroundColor: colorTokens.light.orange.orange9,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 250),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
})
