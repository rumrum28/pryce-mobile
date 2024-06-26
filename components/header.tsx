import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { TouchableOpacity } from 'react-native'
import { Link, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import useBasketStore from '~/utils/basketStore'
import { SearchBar } from '~/components/search_bar'
import usePryceStore from '~/hooks/pryceStore'

export default function Header() {
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const [addressText, setAddressText] = useState<string>('Select Address')
  const navigation = useNavigation()
  const { items, total } = useBasketStore()
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const changeAddressTrigger = usePryceStore(
    (state) => state.changeAddressTrigger
  )

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer)
  }

  useEffect(() => {
    const findUser = users.find((e) => e.Account_Number__c === selectedUser)
    if (findUser)
      setAddressText(
        `${findUser.Primary_Street__c} ${findUser.Primary_Barangay__c} ${findUser.Primary_City2__c} ${findUser.Primary_State_Province__c}`
      )
  }, [selectedUser])

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

        <TouchableOpacity
          onPress={() => setChangeAddressTrigger(!changeAddressTrigger)}
          style={{ paddingHorizontal: 10, flex: 1 }}
        >
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
              color: colorTokens.light.gray.gray9,
              fontWeight: 'bold',
            }}
          >
            {addressText}
          </Text>
        </TouchableOpacity>

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

      <SearchBar />
    </SafeAreaView>
  )
}
