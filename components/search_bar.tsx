import { Feather } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Dimensions, TextInput } from 'react-native'
import { View } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'

const { width } = Dimensions.get('window')

export const SearchBar = () => {
  const searchKeyword = usePryceStore((s) => s.searchKeyword)
  const setSearchKeyword = usePryceStore((s) => s.setSearchKeyword)

  const onChangeTextSearch = (value: string) => {
    setSearchKeyword(value)
  }

  return (
    <View
      style={{
        height: 60,
        backgroundColor: colorTokens.light.orange.orange9,
        width,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Feather
            name="search"
            size={20}
            color={colorTokens.light.gray.gray11}
            style={{ paddingLeft: 10 }}
          />
          <TextInput
            style={{
              padding: 10,
              color: colorTokens.light.gray.gray11,
              width: '100%',
            }}
            placeholder="LPG, Accessories, Medical and Industrial Gases"
            value={searchKeyword}
            onChangeText={onChangeTextSearch}
          />
        </View>
      </View>
    </View>
  )
}
