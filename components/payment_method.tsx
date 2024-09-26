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
    name: 'Cash on Delivery',
  },
  {
    paymentMethod: 'online-payment',
    image: require('~/assets/images/cc.png'),
    name: 'Online Payment',
  },
]

export function PaymentMethod({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentAmount,
  setPaymentAmount,
}: {
  selectedPaymentMethod: string
  setSelectedPaymentMethod: (paymentMethod: string) => void
  paymentAmount: string
  setPaymentAmount: (amount: string) => void
}) {
  console.log(selectedPaymentMethod)
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
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
            onPress={() => setSelectedPaymentMethod(item.paymentMethod)}
            style={{
              flexDirection: 'row',
              height: 80,
              alignItems: 'center',
              marginTop: 20,
              paddingHorizontal: 20,
              borderWidth: 2,
              borderRadius: 10,
              borderColor:
                selectedPaymentMethod === item.paymentMethod
                  ? colorTokens.light.orange.orange9
                  : colorTokens.light.gray.gray2,
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
            <Text style={{ flex: 1, marginLeft: 15, fontWeight: '600' }}>
              {item.name}
            </Text>
            <View style={{ position: 'absolute', top: 23, right: 15 }}>
              <MaterialIcons
                name={
                  selectedPaymentMethod === item.paymentMethod
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={30}
                color={
                  selectedPaymentMethod === item.paymentMethod
                    ? colorTokens.light.orange.orange9
                    : colorTokens.light.gray.gray2
                }
              />
            </View>
          </TouchableOpacity>
        ))}

        <View
          style={{
            flexDirection: 'row',
            borderColor:
              selectedPaymentMethod === 'cash-on-delivery'
                ? colorTokens.light.orange.orange9
                : colorTokens.light.gray.gray2,
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            alignItems: 'center',
            marginBottom: 150,
            marginTop: 20,
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
                selectedPaymentMethod === 'cash-on-delivery'
                  ? colorTokens.light.orange.orange9
                  : colorTokens.light.gray.gray7
              }
            />
          </View>
          <TextInput
            placeholder="Change For"
            placeholderTextColor={colorTokens.light.gray.gray8}
            keyboardType="default"
            style={{
              flex: 1,
              height: 40,
              fontSize: 14,
              color: colorTokens.light.gray.gray12,
              fontWeight: 'regular',
            }}
            value={paymentAmount}
            onChangeText={(value) => setPaymentAmount(value)}
            editable={selectedPaymentMethod === 'cash-on-delivery'}
          />
        </View>
      </View>
    </View>
  )
}
