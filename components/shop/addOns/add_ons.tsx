import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductSingle } from '~/types/product'
import { Image } from 'tamagui'
import { ProductsDetail } from '~/utils/products'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import useCartStore from '~/hooks/productsStore'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { AddOn } from '~/utils/basketStore'

export default function AddOns({
  productCodeMap,
  realTimeProductData,
  selectedAddOns,
  onToggleAddOn,
}: {
  productCodeMap: string[]
  realTimeProductData: ProductSingle[] | undefined
  selectedAddOns: Array<AddOn>
  onToggleAddOn: (addOn: AddOn) => void
}) {
  const [filteredData, setFilteredData] = useState<ProductSingle[]>([])

  useEffect(() => {
    if (realTimeProductData) {
      const filtered = realTimeProductData.filter((fp) =>
        productCodeMap.includes(fp.ProductCode)
      )
      setFilteredData(filtered)
    }
  }, [productCodeMap, realTimeProductData])

  const handleToggle = (addOn: AddOn) => {
    onToggleAddOn(addOn)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: colorTokens.light.gray.gray5,
              marginHorizontal: 16,
            }}
          />
        )}
        ListHeaderComponent={
          <View style={{ marginHorizontal: 16 }}>
            <View
              style={{
                height: 1,
                backgroundColor: colorTokens.light.gray.gray5,
              }}
            ></View>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: 250,
              }}
            >
              <BouncyCheckbox
                fillColor={colorTokens.light.orange.orange9}
                unFillColor="#fff"
                iconStyle={{
                  borderColor: colorTokens.light.orange.orange9,
                  borderRadius: 4,
                  borderWidth: 2,
                }}
                innerIconStyle={{
                  borderColor: colorTokens.light.orange.orange9,
                  borderRadius: 4,
                }}
                onPress={() => handleToggle(item)}
                isChecked={selectedAddOns.some((ao) => ao.Id === item.Id)}
              />
              <Image
                source={{
                  uri: ProductsDetail.find((pd) => pd.id === item.ProductCode)
                    ?.image,
                  width: 60,
                  height: 60,
                }}
              />

              <Text
                style={{
                  fontSize: 13,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}
              >
                {item.Name}
              </Text>
            </View>
            <Text
              style={{ fontSize: 13, color: colorTokens.light.orange.orange9 }}
            >
              +{formatCurrency(item.UnitPrice)}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
