import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native'
import React, { useRef } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { TouchableOpacity } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Link, useNavigation } from 'expo-router'
import BottomSheet from './shop/bottom_sheet'
import { DrawerActions } from '@react-navigation/native'
import useBasketStore from '~/utils/basketStore'

export default function Header() {
  const navigation = useNavigation()
  const { items, total } = useBasketStore()

  const maxLength = 40
  const originalText =
    'Block 6 sawata st. barangay 35 Dagat-Dagatan Caloocan City'

  const shortenedText =
    originalText.length > maxLength
      ? originalText.slice(0, maxLength) + '...'
      : originalText
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const openModal = () => {
    bottomSheetRef.current?.present()
  }

  const SearchBar = () => {
    return (
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
          // flex: 1,
          // flexDirection: 'row',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            flex: 1,
            borderRadius: 5,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: colorTokens.light.gray.gray2,
              flex: 1,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Feather
              name="search"
              size={20}
              color={colorTokens.light.gray.gray9}
              style={{ paddingLeft: 10 }}
            />
            <TextInput
              style={{ padding: 10, color: colorTokens.light.gray.gray11 }}
              placeholder="Looking for LPG product?"
            />
          </View>
        </View>
      </View>
    )
  }

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <BottomSheet ref={bottomSheetRef} />
      <View
        style={{
          height: 60,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity onPress={onToggle}>
              <Feather
                name="menu"
                size={24}
                color={colorTokens.light.orange.orange9}
              />
            </TouchableOpacity>
          </View>
          {/* Address */}
          <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 5 }}>
            {/* <Link href={'/(tabs)/shop/(modal)/address'} asChild> */}
            <TouchableOpacity onPress={openModal}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Home
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  marginRight: 5,
                  color: colorTokens.light.gray.gray9,
                  fontWeight: 'bold',
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {shortenedText}
              </Text>
            </TouchableOpacity>
            {/* </Link> */}
          </View>
          {/* Notification and Cart icon */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginRight: 10,
            }}
          >
            <Link href="/(drawer)/shop/(modal)/basket" asChild>
              <TouchableOpacity>
                {items > 0 ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: 15,
                      top: 10,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colorTokens.light.orange.orange9,
                      zIndex: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      {items}
                    </Text>
                  </View>
                ) : null}
                <Feather
                  name="shopping-bag"
                  size={24}
                  color={colorTokens.light.orange.orange9}
                />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        {/* Search Bar */}
        <SearchBar />
      </View>
    </SafeAreaView>
  )
}
