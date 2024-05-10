import React, { forwardRef, useCallback, useMemo } from 'react'
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
import { Ionicons } from '@expo/vector-icons'
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { address } from '~/data/mock'

export type Ref = BottomSheetModal

const BottomSheet = forwardRef<Ref>((props, ref) => {
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

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
      <BouncyCheckBox fillColor={colorTokens.light.orange.orange9} />
      <View style={{ flexDirection: 'column' }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            paddingBottom: 3,
          }}
        >
          {item.street}
        </Text>
        <Text>
          {item.city} {item.province}
        </Text>
      </View>
    </View>
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
        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>
          Choose your location
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            padding: 10,
          }}
        >
          <FlatList data={address} renderItem={renderItem} />
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
        <View
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
        </View>
      </View>
    </BottomSheetModal>
  )
})

export default BottomSheet
