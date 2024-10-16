import { colorTokens } from '@tamagui/themes'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useCartStore from '~/hooks/productsStore'

export default function AddOnsQuantityButtons({
  productCode,
}: {
  productCode: string
}) {
  const increaseQuantity = useCartStore((s) => s.increaseQuantity)
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity)
  const cart = useCartStore((s) => s.cart)

  const incrementQuantity = () => {
    increaseQuantity(productCode)
  }

  const decrementQuantity = () => {
    decreaseQuantity(productCode)
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 120,
      backgroundColor: '#f0f0f0',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colorTokens.light.gray.gray7,
    },
    button: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', //colorTokens.light.orange.orange9
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colorTokens.light.gray.gray9,
    },
    buttonText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: 14,
      fontWeight: '500',
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>
        {cart.find((c) => c.productCode === productCode)?.quantity}
      </Text>

      <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
