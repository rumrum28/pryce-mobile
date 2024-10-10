import { FlatList, Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductSingle } from '~/types/product'
import { Image } from 'tamagui'
import { ProductsDetail } from '~/utils/products'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { AddOn } from '~/utils/basketStore'
import AddOnsQuantityButtons from './add_ons_quantity_buttons'

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
  const [buttonVisibility, setButtonVisibility] = useState<{
    [key: string]: boolean
  }>({})
  const timeouts: { [key: string]: NodeJS.Timeout } = {}

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

    setButtonVisibility((prevState) => ({
      ...prevState,
      [addOn.Id]: true,
    }))

    if (timeouts[addOn.Id]) {
      clearTimeout(timeouts[addOn.Id]) // Clear previous timeout to avoid premature hiding
    }

    timeouts[addOn.Id] = setTimeout(() => {
      setButtonVisibility((prevState) => ({
        ...prevState,
        [addOn.Id]: false,
      }))
    }, 5000)
  }

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
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
          <View
            style={{
              marginHorizontal: 16,
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: colorTokens.light.gray.gray5,
              }}
            ></View>
          </View>
        }
        renderItem={({ item }) => {
          const productPrice = filteredData?.find(
            (e) => e.ProductCode === item.ProductCode
          )
          let calculatedPrice = 0
          if (productPrice) {
            calculatedPrice =
              productPrice.UnitPrice < productPrice.RegularPrice
                ? productPrice.UnitPrice
                : productPrice.RegularPrice
          }
          const formattedPrice = formatCurrency(calculatedPrice)
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flex: 1,
                  paddingVertical: 10,
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
                  style={{
                    width: 28,
                  }}
                />
                <Image
                  source={{
                    uri: ProductsDetail.find((pd) => pd.id === item.ProductCode)
                      ?.image,
                  }}
                  style={{
                    width: 50,
                    height: 30,
                  }}
                />
                <Text
                  style={{
                    paddingLeft: 8,
                    fontSize: 13,
                    width: '80%',
                  }}
                  numberOfLines={1}
                >
                  {item.Name}
                </Text>
              </Pressable>

              {selectedAddOns.some((ao) => ao.Id === item.Id) &&
              buttonVisibility[item.Id] ? (
                <AddOnsQuantityButtons />
              ) : null}

              <Text
                style={{
                  fontSize: 13,
                  color: colorTokens.light.orange.orange9,
                }}
              >
                {formattedPrice}
              </Text>

              <Pressable
                style={{
                  backgroundColor: 'black',
                  padding: 2,
                  borderRadius: 50,
                  width: 23,
                  alignItems: 'center',
                  marginLeft: 5,
                }}
                onPress={() => handleToggle(item)}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                  }}
                >
                  1
                </Text>
              </Pressable>
            </View>
          )
        }}
      />
    </View>
  )
}
