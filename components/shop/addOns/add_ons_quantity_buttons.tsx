import { colorTokens } from '@tamagui/themes'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function AddOnsQuantityButtons() {
  const [quantity, setQuantity] = useState<number>(1)

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 120,
      // padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
    button: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorTokens.light.orange.orange9,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: 18,
      fontWeight: '500',
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
