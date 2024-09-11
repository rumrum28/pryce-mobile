import { Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Dimensions, TextInput } from 'react-native'
import { View } from 'tamagui'

const { width } = Dimensions.get('window')

export const SearchBar = () => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'white',
        width,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flex: 1,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colorTokens.light.gray.gray2,
            flex: 1,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Feather
            name="search"
            size={20}
            color={colorTokens.light.gray.gray9}
            style={{ paddingLeft: 10 }}
          />
          <TextInput
            style={{
              padding: 10,
              color: colorTokens.light.gray.gray11,
            }}
            placeholder="LPG, Accessories, Medical and Industrial Gases"
          />
        </View>
      </View>
    </View>
  )
}
