import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddOn, ProductSingle } from '~/types/product'
import { Image } from 'tamagui'
import { ProductsDetail } from '~/utils/products'
import { colorTokens } from '@tamagui/themes'
import { formatCurrency } from '~/utils/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import AddOnsQuantityButtons from './add_ons_quantity_buttons'
import useCartStore from '~/hooks/productsStore'

type AddOnsProps = {
  productCodeMap: string[]
  realTimeProductData: ProductSingle[] | undefined
}

const AddOns = ({ productCodeMap, realTimeProductData }: AddOnsProps) => {
  const [filteredData, setFilteredData] = useState<ProductSingle[]>([])
  const addProduct = useCartStore((s) => s.addProduct)
  const cart = useCartStore((s) => s.cart)
  const removeProduct = useCartStore((s) => s.removeProduct)

  useEffect(() => {
    if (realTimeProductData) {
      const filtered = realTimeProductData.filter((fp) =>
        productCodeMap.includes(fp.ProductCode)
      )
      setFilteredData(filtered)
    }
  }, [productCodeMap, realTimeProductData])

  const handleToggle = (addOn: AddOn) => {
    const checkProduct = cart.some((c) => c.productCode === addOn.ProductCode)
    if (checkProduct) return removeProduct(addOn.ProductCode)
    const singleProductDataInfo = {
      productCode: addOn.ProductCode,
      quantity: 1,
    }

    addProduct(singleProductDataInfo)
  }

  const renderSingleItemBody = (item: ProductSingle) => {
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
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            paddingVertical: 10,
            height: 60,
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
            isChecked={cart.some((e) => e.productCode === item.ProductCode)}
            style={{
              width: 28,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: 10,
            }}
          >
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

            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '75%',
                rowGap: 10,
              }}
            >
              <Text
                style={{
                  paddingLeft: 8,
                  fontSize: 13,
                  width: '90%',
                }}
                numberOfLines={1}
              >
                {item.Name}
              </Text>

              {cart.some((e) => e.productCode === item.ProductCode) ? (
                <AddOnsQuantityButtons
                  productCode={item.ProductCode}
                  quantity={Number(
                    cart.find((c) => c.productCode === item.ProductCode)
                      ?.quantity
                  )}
                />
              ) : null}
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 13,
            color: colorTokens.light.orange.orange9,
          }}
        >
          {formattedPrice}
        </Text>
      </View>
    )
  }

  const renderSingleItemHeader = () => {
    return (
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
    )
  }

  const renderSingleItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: colorTokens.light.gray.gray5,
          marginHorizontal: 16,
        }}
      />
    )
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
        ItemSeparatorComponent={renderSingleItemSeparator}
        ListHeaderComponent={renderSingleItemHeader}
        renderItem={({ item }) => renderSingleItemBody(item)}
      />
    </View>
  )
}

export default AddOns
