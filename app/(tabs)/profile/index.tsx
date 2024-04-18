import { View, Text, Button } from 'react-native'
import React from 'react'
import MainProfile from '~/components/profile/main-profile'
import Top from '~/components/profile/top'
import Middle from '~/components/profile/middle'
import { colorTokens } from '@tamagui/themes'
import Bottom from '~/components/profile/bottom'
import { ScrollView } from 'tamagui'
import Accordion from '~/components/profile/accordion'
import { profile } from '~/data/data'

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          backgroundColor: colorTokens.light.orange.orange9,
          height: '15%',
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 55,
          }}
        >
          <Top />
          <View style={{ marginTop: 30 }}>
            {profile.map((item, index) => (
              <Accordion
                key={index.toString()}
                name={item.name}
                title={item.title}
                subtitles={item.subtitles}
              />
            ))}
          </View>

          {/* <Middle />
          <Bottom /> */}
        </View>
      </View>
    </View>
  )
}
