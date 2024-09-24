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

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const users = usePryceStore((state) => state.users)
  //   const changeAddressTrigger = usePryceStore(
  //     (state) => state.changeAddressTrigger
  //   )
  //   const setChangeAddressTrigger = usePryceStore(
  //     (state) => state.setChangeAddressTrigger
  //   )
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const token = usePryceStore((state) => state.token)

  const selectUserHandler = (user: Profile) => {
    setSelectedUser(user.Account_Number__c)
    // setChangeAddressTrigger(false)
  }

  //   useEffect(() => {
  //     if (!token) {
  //       setChangeAddressTrigger(false)
  //     }
  //     if (token && !selectedUser) {
  //       setChangeAddressTrigger(true)
  //     }
  //   }, [selectedUser, changeAddressTrigger, token])

  const snapPoints = useMemo(() => ['50%'], [])
  const { dismiss } = useBottomSheetModal()
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
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
        {/* <BouncyCheckBox
          size={25}
          fillColor={colorTokens.light.orange.orange9}
          unFillColor="#FFFFFF"
          iconStyle={{ borderColor: 'red' }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
          onPress={(isChecked: boolean) => {
            console.log(isChecked)
          }}
        /> */}
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
        {/* <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            padding: 10,
            elevation: 10,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: -10,
            },
          }}
        >
          <TouchableOpacity
            onPress={() => dismiss()}
            style={{
              backgroundColor: colorTokens.light.orange.orange9,
              padding: 16,
              margin: 16,
              borderRadius: 4,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </BottomSheetModal>
  )
})

export default BottomSheet
