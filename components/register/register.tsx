import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { useRef, useState } from 'react'
import Dropdown from './dropdown'
import { island } from '../../utils/island'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Form } from 'tamagui'
import DropdownComponent from './dropdown'
import { address, AddressProps } from '~/data/data'

type OptionItem = {
  value: string
  label: string
}

export default function Register() {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [province, setProvince] = useState<string | null>(null)
  const [cityArray, setCityArray] = useState<OptionItem[]>([])
  const [region, setRegion] = useState<string | null>(null)
  const [barangayArray, setBarangayArray] = useState<OptionItem[]>([])
  const [barangay, setBarangay] = useState<string | null>(null)
  const [city, setCity] = useState('')

  const uniqueProvinces = Array.from(
    new Set(address.map((item) => item.province))
  )
    .sort()
    .map((province) => ({ value: province, label: province }))

  const onChangeProvinceHandler = (value: string) => {
    setProvince(value)

    const filteredCity = address.filter((city) => city.province === value)
    const formattedCityArray = filteredCity.map((city) => ({
      value: city.city,
      label: city.city,
    }))

    setCityArray(formattedCityArray)
    setRegion(filteredCity[0].pgi_region)
    setBarangayArray([])
    setBarangay('')
  }
  const onChangeCityHandler = (value: string) => {
    setCity(value)

    const selectedCity = island
      .flatMap((province) => province.municipalities)
      .find((city) => city.city === value)

    if (selectedCity && selectedCity.barangay) {
      const formattedBarangay = selectedCity.barangay.map((barangay) => ({
        value: barangay,
        label: barangay,
      }))

      setBarangayArray(formattedBarangay)
    } else {
      setBarangayArray([])
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form onSubmit={() => {}}>
          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Ionicons
                name={'person-circle-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={colorTokens.light.gray.gray8}
              keyboardType="default"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Ionicons
                name={'person-circle-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={colorTokens.light.gray.gray8}
              keyboardType="default"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Ionicons
                name={'lock-closed-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colorTokens.light.gray.gray8}
              secureTextEntry={!passwordIsVisible}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <Feather
                name={passwordIsVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#7C808D"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <MaterialCommunityIcons
                name={'email-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colorTokens.light.gray.gray8}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <Ionicons
                name={'keypad-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="09"
              placeholderTextColor={colorTokens.light.gray.gray8}
              keyboardType="number-pad"
            />
          </View>

          <DropdownComponent
            data={uniqueProvinces}
            onChange={onChangeProvinceHandler}
            placeholder="Select a province"
          />

          <DropdownComponent
            data={cityArray}
            onChange={onChangeCityHandler}
            placeholder="Select a city"
          />

          <View style={styles.inputContainer}>
            <View style={{ justifyContent: 'center', marginRight: 10 }}>
              <MaterialCommunityIcons
                name={'map-marker-outline'}
                size={24}
                color={colorTokens.light.gray.gray8}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Street"
              placeholderTextColor={colorTokens.light.gray.gray8}
              keyboardType="default"
            />
          </View>
          {barangayArray.length > 0 ? (
            <>
              <DropdownComponent
                data={cityArray}
                onChange={onChangeCityHandler}
                placeholder="Select a city"
              />
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                  <MaterialCommunityIcons
                    name={'map-marker-outline'}
                    size={24}
                    color={colorTokens.light.gray.gray8}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Barangay"
                  placeholderTextColor={colorTokens.light.gray.gray8}
                  keyboardType="default"
                />
              </View>
            </>
          )}
          <Form.Trigger asChild>
            <TouchableOpacity
              style={{
                borderRadius: 100,
                marginVertical: 20,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorTokens.light.orange.orange9,
              }}
            >
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </Form.Trigger>
        </Form>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: colorTokens.light.orange.orange9,
    borderBottomWidth: 0.5,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: colorTokens.light.gray.gray12,
    fontWeight: 'regular',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'center',
    padding: 5,
  },
  dropdownContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
