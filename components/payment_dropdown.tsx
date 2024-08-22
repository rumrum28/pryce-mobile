import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { colorTokens } from '@tamagui/themes'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type OptionItem = {
  value: string
  label: string
}

interface DropDownProps {
  data: OptionItem[]
  placeholder: string
  onChange: (value: string) => void
}

export default function DropdownComponent({
  data,
  placeholder,
  onChange,
}: DropDownProps) {
  const [value, setValue] = useState('')

  const handleChange = (item: OptionItem) => {
    setValue(item.value)
    onChange(item.value)
  }

  return (
    <Dropdown
      style={styles.dropdown}
      backgroundColor={'rgba(0,0,0,0.2)'}
      data={data}
      value={value}
      inverted={false}
      labelField="label"
      valueField="value"
      placeholder={value || placeholder}
      placeholderStyle={{ color: colorTokens.light.gray.gray8 }}
      // maxHeight={250}
      onChange={handleChange}
      renderLeftIcon={() => (
        <MaterialCommunityIcons
          name={'cash-multiple'}
          size={24}
          color={colorTokens.light.gray.gray8}
          style={styles.icon}
        />
      )}
    />
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: colorTokens.light.orange.orange9,
    marginBottom: 20,
    backgroundColor: 'green',
  },
  icon: {
    marginRight: 10,
  },
})
