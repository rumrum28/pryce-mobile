import React from 'react'
import { Text, View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'

function FavoritesList() {
  const favorites = usePryceStore((set) => set.favorites)

  return (
    <View>
      {favorites.length > 0 ? (
        favorites.map((fav, i) => <Text key={i}>{fav.productCode}</Text>)
      ) : (
        <Text>Search</Text>
      )}
    </View>
  )
}

export default FavoritesList
