import {
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useEffect } from 'react'

type PaymentMethodType = 'cash-on-delivery' | 'online-payment'

type PaymentDataProps = {
  paymentMethod: PaymentMethodType
  image: string
  name: string
}
const paymentData: PaymentDataProps[] = [
  {
    paymentMethod: 'cash-on-delivery',
    image: require('~/assets/images/cod.png'),
    name: 'Cash On Delivery',
  },
  {
    paymentMethod: 'online-payment',
    image: require('~/assets/images/cc.png'),
    name: 'Online Payment',
  },
]

export function PaymentMethodComponent({
  paymentMethod,
  setPaymentMethod,
  paymentAmount,
  setPaymentAmount,
  totalAmount,
}: {
  paymentMethod: string
  setPaymentMethod: (paymentMethod: string) => void
  paymentAmount: string
  setPaymentAmount: (amount: number) => void
  totalAmount: number
}) {
  useEffect(() => {
    if (totalAmount > 0) {
      setPaymentAmount(totalAmount)
    }
  }, [])

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Select Payment Method
        </Text>
      </View>

      <View style={{ marginBottom: 30 }}>
        {paymentData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setPaymentMethod(item.paymentMethod)}
            style={{
              flexDirection: 'row',
              height: 60,
              alignItems: 'center',
              // marginTop: 10,
              paddingHorizontal: 20,
              borderWidth: 2,
              borderRadius: 10,
              borderColor:
                paymentMethod === item.paymentMethod
                  ? colorTokens.light.orange.orange6
                  : colorTokens.light.gray.gray1,
            }}
          >
            <View
              style={{
                width: 60,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colorTokens.light.gray.gray2,
              }}
            >
              <Image
                source={item.image as ImageSourcePropType}
                resizeMode="center"
                style={{ width: 35, height: 35 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text style={{ flex: 1, marginLeft: 15, fontWeight: '600' }}>
                {item.name}
              </Text>
              <View style={{}}>
                <MaterialIcons
                  name={
                    paymentMethod === item.paymentMethod
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={24}
                  color={
                    paymentMethod === item.paymentMethod
                      ? colorTokens.light.orange.orange9
                      : colorTokens.light.gray.gray2
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 150,
            marginTop: 16,
          }}
        >
          <Text style={{ paddingRight: 16 }}>Change For:</Text>

          <View
            style={{
              flexDirection: 'row',
              borderColor:
                paymentMethod === 'cash-on-delivery'
                  ? colorTokens.dark.gray.gray11
                  : colorTokens.light.gray.gray4,
              borderWidth: 1,
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                marginRight: 10,
                padding: 10,
              }}
            >
              <FontAwesome6
                name={'money-bill-wave'}
                size={20}
                color={
                  paymentMethod === 'cash-on-delivery'
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.gray.gray7
                }
              />
            </View>

            <TextInput
              keyboardType="numeric"
              style={{
                flex: 1,
                height: 40,
                fontSize: 14,
                color:
                  paymentMethod === 'cash-on-delivery'
                    ? colorTokens.dark.red.red1
                    : colorTokens.light.gray.gray7,
                fontWeight: 'regular',
              }}
              value={paymentAmount}
              onChangeText={(amount) => setPaymentAmount(Number(amount))}
              editable={paymentMethod === 'cash-on-delivery'}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
