import React, { forwardRef, useCallback, useEffect, useMemo } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { address } from '~/data/mock'
import usePryceStore from '~/hooks/pryceStore'
import { Profile, ProfileProps } from '~/types/userStorage'

export type Ref = BottomSheetModal

interface BottomSheetProps {
  setChangeAddressTrigger: (value: boolean) => void
  changeAddressTrigger: boolean
}

const BottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
  const { setChangeAddressTrigger, changeAddressTrigger } = props
  const users = usePryceStore((state) => state.users)
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const token = usePryceStore((state) => state.token)

  const selectUserHandler = (user: Profile) => {
    setSelectedUser(user.Account_Number__c)
    setChangeAddressTrigger(false)
  }

  useEffect(() => {
    if (!token) {
      setChangeAddressTrigger(false)
    }
    if (token && !selectedUser) {
      setChangeAddressTrigger(true)
    }
  }, [selectedUser, changeAddressTrigger, token])

  const snapPoints = useMemo(() => ['50%'], [])
  const { dismiss } = useBottomSheetModal()
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        // enablePanDownToClose={changeAddressTrigger}
        // enableTouchOutsideToClose={changeAddressTrigger}
        pressBehavior={'none'}
        {...props}
      />
    ),
    []
  )

  const renderItem: ListRenderItem<Profile> = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        selectUserHandler(item)
        dismiss()
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <View>
          <MaterialIcons
            name={
              selectedUser === item.Account_Number__c
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={30}
            color={
              selectedUser === item.Account_Number__c
                ? colorTokens.light.orange.orange9
                : colorTokens.light.gray.gray4
            }
          />
        </View>
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              paddingBottom: 3,
            }}
          >
            {item.Primary_Street__c}
          </Text>
          <Text>
            {item.Primary_City2__c}, {item.Primary_State_Province__c}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: colorTokens.light.gray.gray2,
        borderRadius: 0,
      }}
      handleIndicatorStyle={{ display: 'none' }}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      ref={ref}
      snapPoints={snapPoints}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}>
          Where should we deliver your order?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            padding: 10,
          }}
        >
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.Account_Number__c}
          />
        </View>
        <Link href={'/(drawer)/shop/(modal)/address'} asChild>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <Ionicons
              name="add-outline"
              size={24}
              color={colorTokens.light.orange.orange9}
            />
            <Text
              style={{
                margin: 10,
                fontSize: 16,
                fontWeight: 'bold',
                color: colorTokens.light.orange.orange9,
              }}
            >
              Add a new address
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </BottomSheetModal>
  )
})

export default BottomSheet
