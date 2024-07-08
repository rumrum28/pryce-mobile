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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colorTokens } from '@tamagui/themes'
import { Form } from 'tamagui'

export default function Register() {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <ScrollView>
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
          <Dropdown
          // containerTop={containerTop}
          // data={formattedCountries}
          // onChange={console.log}
          // placeholder="Select country"
          />
          <Dropdown
          // containerTop={containerTop}
          // data={formattedCountries}
          // onChange={console.log}
          // placeholder="Select country"
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 10,
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
    // marginVertical: 10,
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
