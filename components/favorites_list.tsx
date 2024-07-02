import React from 'react'
import { Text, View } from 'tamagui'
import useCartStore from '~/hooks/productsStore'

function FavoritesList() {
  const favorites = useCartStore((set) => set.favorites)

  return (
    <View>
      {favorites.length > 0 ? (
        favorites.map((fav, i) => <Text key={i}>{fav.productCode}</Text>)
      ) : (
        <Text>Empty</Text>
      )}
    </View>
  )
}

export default FavoritesList
