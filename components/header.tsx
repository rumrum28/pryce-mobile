import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native'
import React, { useRef } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { TouchableOpacity } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Link, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import useBasketStore from '~/utils/basketStore'
import { SearchBar } from '~/components/search_bar'
import { SelectAddressModal } from './selectAddress'
import usePryceStore from '~/hooks/pryceStore'

const { width } = Dimensions.get('window')

export default function Header() {
  const token = usePryceStore((state) => state.token)
  const selectedUser = usePryceStore((state) => state.selectedUser)

  const navigation = useNavigation()
  const { items, total } = useBasketStore()

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer)
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          backgroundColor: 'white',
          paddingHorizontal: 20,
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

        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Home
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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

      {token ? <SelectAddressModal modalTrigger={selectedUser} /> : null}

      <SearchBar />
    </SafeAreaView>
  )
}
