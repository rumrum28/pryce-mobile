import { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import StyledButton from '~/components/styled_button'
import StyledInput from '~/components/styled_input'
import { address, island } from '~/data/data'

interface DropdownOption {
  value: string
  label: string
}
export default function Address() {
  const [provinceArray, setProvinceArray] = useState<DropdownOption[]>([])
  const [cityArray, setCityArray] = useState<[] | DropdownOption[]>([])
  const [barangayArray, setBarangayArray] = useState<DropdownOption[]>([])
  const [matchingIsland, setMatchingIsland] = useState<any | null>(null)
  const [street, setStreet] = useState('')
  const [barangay, setBarangay] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState('')

  useEffect(() => {
    const uniqueProvinces = new Set<string>()
    address.forEach((item) => {
      uniqueProvinces.add(item.province)
    })
    const sortedProvinces = Array.from(uniqueProvinces).sort()
    const newProvinceArray: DropdownOption[] = sortedProvinces.map(
      (province) => ({
        value: province,
        label: province,
      })
    )
    setProvinceArray(newProvinceArray)
  }, [])

  const onChangeProvinceHandler = (value: string) => {
    const filteredCities: DropdownOption[] = address
      .filter((item) => item.province === value)
      .map((item) => ({ value: item.city, label: item.city }))
    setCityArray(filteredCities)
  }

  const onChangeCityHandler = (value: string) => {
    const provinceCity = value
    const foundIsland = island.find((island) => {
      return island.municipalities.some((municipality) => {
        return municipality.city === provinceCity
      })
    })
    setMatchingIsland(foundIsland)
    if (foundIsland) {
      const barangayArray =
        foundIsland.municipalities.find(
          (municipality) => municipality.city === provinceCity
        )?.barangay || []
      const barangayOptions = barangayArray.map((barangay) => ({
        value: barangay,
        label: barangay,
      }))
      setBarangayArray(barangayOptions)
    } else {
      setBarangayArray([])
    }
  }

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={provinceArray}
        autoScroll
        search
        maxHeight={300}
        minHeight={100}
        labelField="label"
        valueField="value"
        placeholder="Select province"
        searchPlaceholder="Search..."
        value={province}
        onChange={(item) => {
          setProvince(item.value)
          onChangeProvinceHandler(item.value)
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cityArray}
        autoScroll
        search
        maxHeight={300}
        minHeight={100}
        labelField="label"
        valueField="value"
        placeholder="Select city"
        searchPlaceholder="Search..."
        value={city}
        onChange={(item) => {
          setCity(item.value)
          onChangeCityHandler(item.value)
        }}
      />
      <StyledInput
        icon="map-outline"
        value={street}
        label="Street"
        onChangeText={setStreet}
        placeholder="Enter street address here..."
        style={{ marginBottom: 20 }}
      />

      {barangayArray.length > 0 ? (
        <>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={barangayArray}
            autoScroll
            search
            maxHeight={300}
            minHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select barangay"
            searchPlaceholder="Search..."
            value={barangay}
            onChange={(item) => {
              setBarangay(item.value)
            }}
          />
        </>
      ) : (
        <>
          {barangayArray.length === 0 && (
            <>
              <StyledInput
                icon="home-group"
                value={barangay}
                label="Barangay"
                onChangeText={setBarangay}
                placeholder="Enter street address here..."
                style={{ marginBottom: 20 }}
              />
            </>
          )}
        </>
      )}

      <StyledButton>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Confirm
        </Text>
      </StyledButton>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
