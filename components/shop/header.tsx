import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, Select, XStack, YStack } from 'tamagui'
import { Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'

export default function Header() {
  return (
    <XStack
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Avatar circular size="$5">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
      <YStack style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 16, color: colorTokens.light.gray.gray9 }}>
          Deliver to
        </Text>
        <XStack>
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}

          >
            Caloocan City
          </Text>
          <Feather
            name="chevron-down"
            size={24}
            color="grey"
            style={{ marginLeft: 15 }}
          /> */}
          <Select defaultValue="">
            <Select.Trigger>
              <Select.Value placeholder="Search..." />
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  <Select.Label />
                  {/* <Select.Item>
                    <Select.ItemText />
                  </Select.Item> */}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </XStack>
      </YStack>
      <XStack
        style={{
          alignItems: 'end',
          justifyContent: 'end',
          gap: 15,
        }}
      >
        <View
          style={{
            borderColor: colorTokens.light.gray.gray8,
            padding: 10,
            borderRadius: 40,
            borderWidth: 0.2,
          }}
        >
          <Feather name="bell" size={24} color="grey" />
        </View>
        <View
          style={{
            borderColor: colorTokens.light.gray.gray8,
            padding: 10,
            borderRadius: 40,
            borderWidth: 0.2,
          }}
        >
          <Feather name="shopping-bag" size={24} color="grey" />
        </View>
      </XStack>
    </XStack>
  )
}
