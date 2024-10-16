import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import PGCM from '~/components/pgcm'

export default function Page() {
  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PGCM />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
})
