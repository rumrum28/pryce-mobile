import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import MainProfile from '~/components/profile/main-profile'
import Top from '~/components/profile/top'
import { colorTokens } from '@tamagui/themes'
import { ScrollView } from 'tamagui'
import Accordion from '~/components/profile/accordion'
import { profile } from '~/data/data'
import { MaterialIcons } from '@expo/vector-icons'

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: colorTokens.light.orange.orange9,
          height: '18%',
        }}
      >
        <Top />
      </SafeAreaView>

      <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
        {profile.map((item) => (
          <View key={item.id}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 20,
                marginVertical: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                width: '90%',
              }}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <MaterialIcons
                  name={item.name.icon}
                  size={24}
                  color={colorTokens.light.gray.gray12}
                />
                <View
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      marginLeft: 10,
                      fontSize: 18,
                      color: colorTokens.light.gray.gray12,
                    }}
                  >
                    {item.title}
                  </Text>
                  {item?.subtitles && (
                    <Text
                      style={{
                        paddingTop: 10,
                        fontSize: 16,
                        marginLeft: 10,
                        color: colorTokens.light.gray.gray9,
                      }}
                    >
                      {item.subtitles}
                    </Text>
                  )}
                </View>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colorTokens.light.gray.gray9}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
