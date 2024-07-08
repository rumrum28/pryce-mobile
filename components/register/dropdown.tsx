import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'

type OptionItem = {
  value: string
  label: string
}

interface DropDownProps {
  // data: OptionItem[]
  // onChange: (item: OptionItem) => void
  // placeholder: string
  containerTop: number
}

export default function Dropdown() {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded])

  const [value, setValue] = useState('')

  const buttonRef = useRef<View>(null)

  const [top, setTop] = useState(0)

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout
        const topOffset = layout.y
        const heightOfComponent = layout.height

        const finalValue =
          topOffset +
          heightOfComponent +
          (Platform.OS === 'android' ? -30 : 180)

        console.log(finalValue)
        setTop(finalValue)
      }}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name={'map-marker-outline'}
            size={24}
            color={colorTokens.light.gray.gray8}
          />
          <Text style={styles.text}>Select Province</Text>
        </View>
        <Entypo name={expanded ? 'chevron-thin-up' : 'chevron-thin-down'} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={[
                    { value: 'Caloocan', label: 'NCR' },
                    { value: 'Malabon', label: 'NCR' },
                  ]}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colorTokens.light.orange.orange9,
    marginBottom: 20,
  },
  backdrop: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  optionItem: {
    height: 40,
    justifyContent: 'center',
  },
  separator: {
    height: 4,
  },
  options: {
    position: 'absolute',
    // top: 53,
    backgroundColor: 'gray',
    width: '100%',
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
    marginLeft: 10,
    color: colorTokens.light.gray.gray8,
  },
  button: {
    height: 50,
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',

    // paddingHorizontal: 15,

    borderRadius: 8,
  },
})
