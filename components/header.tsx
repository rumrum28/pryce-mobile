import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { TouchableOpacity } from 'react-native'
import { Link, useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native'
import { SearchBar } from '~/components/search_bar'
import usePryceStore from '~/hooks/pryceStore'
import useCartStore from '~/hooks/productsStore'
import useBasketStore from '~/utils/basketStore'

export default function Header() {
  const token = usePryceStore((state) => state.token)
  const users = usePryceStore((state) => state.users)
  const cart = useCartStore((state) => state.cart)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const { items, total } = useBasketStore()

  const [addressText, setAddressText] = useState<string>('Select Address')
  const navigation = useNavigation()
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const changeAddressTrigger = usePryceStore(
    (state) => state.changeAddressTrigger
  )

  // const onToggle = () => {
  //   navigation.dispatch(DrawerActions.openDrawer)
  // }

  useEffect(() => {
    const findUser = users.find((e) => e.Account_Number__c === selectedUser)
    if (findUser)
      setAddressText(
        `${findUser.Primary_Street__c} ${findUser.Primary_Barangay__c}`
      )

    // ${findUser.Primary_City2__c} ${findUser.Primary_State_Province__c}
  }, [selectedUser])

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorTokens.light.orange.orange9,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          backgroundColor: colorTokens.light.orange.orange9,
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
          <TouchableOpacity>
            <SimpleLineIcons name="location-pin" size={24} color="white" />
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
              color: 'white',
            }}
          >
            Home
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
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
            gap: 20,
            marginRight: 10,
          }}
        >
          <Link href="/(modal)/basket" asChild>
            <TouchableOpacity>
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
                  backgroundColor: 'white',
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    color: colorTokens.light.orange.orange9,
                    fontWeight: 'bold',
                  }}
                >
                  {items}
                </Text>
              </View>
              <Feather name="shopping-bag" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <SearchBar />
    </SafeAreaView>
  )
}
