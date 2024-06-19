import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { colorTokens } from '@tamagui/themes'
import { router } from 'expo-router'
import {
  Button,
  Form,
  H4,
  Input,
  Spinner,
  XGroup,
  XStack,
  View,
  Image,
  YStack,
  Text,
  Main,
  Label,
  Select,
  Adapt,
  Sheet,
  SelectProps,
} from 'tamagui'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { AddressProps, address, island } from '~/data/data'

export default function FillProfile(props: SelectProps) {
  const [focused, setFocused] = useState(false)
  const [focusedPassword, setFocusedPassword] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] =
    React.useState<boolean>(false)

  const [provinceArray, setProvinceArray] = useState<[] | AddressProps[]>([])
  const [cityArray, setCityArray] = useState<[] | AddressProps[]>([])
  const [barangayArray, setBarangayArray] = useState<string[]>([])
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [barangay, setBarangay] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [termsSelected, setTermsSelected] = useState<boolean>(false)
  const [province, setProvince] = useState('')

  const startSearchHandler = () => {
    const sortObject = (prop: any) => {
      const newLocal = function (a: any, b: any) {
        if (a[prop] > b[prop]) {
          return 1
        } else if (a[prop] < b[prop]) {
          return -1
        }
        return 0
      }
      return newLocal
    }

    address.sort(sortObject('province'))
    const filteredProvince = address.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.province).indexOf(obj.province) === pos
    })
    setProvinceArray(filteredProvince)
  }

  const onChangeProvinceHandler = (value: string) => {
    setProvince(value)

    const filteredCity = address.filter((city) => {
      return city.province === value
    })
    setCityArray(filteredCity)
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
      setBarangayArray(selectedCity.barangay)
    } else {
      setBarangayArray([])
    }
  }
  const onChangeBarangayHandler = (text: string) => {
    setBarangay(text)
  }

  const setTermsSelectedHandler = (value: boolean) => {
    setTermsSelected(value)
  }

  return (
    <Main
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <YStack
          style={{
            paddingHorizontal: 30,
            paddingTop: 30,
            marginTop: 40,
          }}
          gap="$5"
        >
          <Form gap="$6" onSubmit={() => {}}>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="Firstname"
              />
              <Fontisto
                name="email"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
            </XStack>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="Lastname"
              />
              <Fontisto
                name="email"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
            </XStack>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="Email"
              />
              <Fontisto
                name="email"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
            </XStack>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="+639 000 000 000"
              />

              <AntDesign
                name="mobile1"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
            </XStack>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="Password"
                secureTextEntry={!passwordIsVisible}
              />

              <AntDesign
                name="lock"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 12 }}
                onPress={() => setPasswordIsVisible(!passwordIsVisible)}
              >
                <Feather
                  name={passwordIsVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#7C808D"
                />
              </TouchableOpacity>
            </XStack>
            <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
              <XStack style={{ alignItems: 'center', width: '50%' }} gap="$3">
                <Select
                  value={province}
                  onValueChange={onChangeProvinceHandler}
                  onOpenChange={startSearchHandler}
                  disablePreventBodyScroll
                  {...props}
                >
                  <Select.Trigger
                    width={220}
                    iconAfter={
                      <Entypo name="chevron-down" size={24} color="gray" />
                    }
                  >
                    <Select.Value
                      style={{ color: 'gray', fontSize: 16 }}
                      placeholder="Province"
                    />
                  </Select.Trigger>
                  <Adapt when="sm" platform="touch">
                    <Sheet
                      native={!!props.native}
                      modal
                      dismissOnSnapToBottom
                      animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                      }}
                    >
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                      />
                    </Sheet>
                  </Adapt>
                  <Select.Content zIndex={200000}>
                    <Select.Viewport minWidth={200}>
                      <Select.Group>
                        {useMemo(
                          () =>
                            provinceArray.map((item, i) => {
                              return (
                                <Select.Item
                                  index={i}
                                  key={item.province}
                                  value={item.province}
                                >
                                  <Select.ItemText style={{ color: 'gray' }}>
                                    {item.province}
                                  </Select.ItemText>
                                  <Select.ItemIndicator marginLeft="auto">
                                    <AntDesign
                                      name="check"
                                      size={24}
                                      color="black"
                                    />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              )
                            }),
                          [provinceArray]
                        )}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select>
              </XStack>
              <XStack style={{ alignItems: 'center', width: '50%' }} gap="$3">
                <Select
                  value={city}
                  onValueChange={onChangeCityHandler}
                  disablePreventBodyScroll
                  {...props}
                >
                  <Select.Trigger
                    width={220}
                    iconAfter={
                      <Entypo name="chevron-down" size={24} color="gray" />
                    }
                  >
                    <Select.Value
                      style={{ color: 'gray', fontSize: 16 }}
                      placeholder="City"
                    />
                  </Select.Trigger>
                  <Adapt when="sm" platform="touch">
                    <Sheet
                      native={!!props.native}
                      modal
                      dismissOnSnapToBottom
                      animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                      }}
                    >
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                      />
                    </Sheet>
                  </Adapt>
                  <Select.Content zIndex={200000}>
                    <Select.Viewport minWidth={200}>
                      <Select.Group>
                        {useMemo(
                          () =>
                            provinceArray &&
                            cityArray.map((item, i) => {
                              return (
                                <Select.Item
                                  index={i}
                                  key={i}
                                  value={item.city}
                                >
                                  <Select.ItemText>{item.city}</Select.ItemText>
                                  <Select.ItemIndicator marginLeft="auto">
                                    <AntDesign
                                      name="check"
                                      size={24}
                                      color="black"
                                    />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              )
                            }),
                          [provinceArray, cityArray]
                        )}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select>
              </XStack>
            </View>
            <XStack alignItems="center" gap="$3">
              {barangayArray.length > 0 ? (
                <>
                  <Select value={barangay} disablePreventBodyScroll {...props}>
                    <Select.Trigger
                      width={220}
                      iconAfter={<Entypo name="chevron-down" size={24} />}
                    >
                      <Select.Value placeholder="Barangay" />
                    </Select.Trigger>
                    <Adapt when="sm" platform="touch">
                      <Sheet
                        native={!!props.native}
                        modal
                        dismissOnSnapToBottom
                        animationConfig={{
                          type: 'spring',
                          damping: 20,
                          mass: 1.2,
                          stiffness: 250,
                        }}
                      >
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                          animation="lazy"
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                        />
                      </Sheet>
                    </Adapt>
                    <Select.Content zIndex={200000}>
                      <Select.Viewport minWidth={200}>
                        <Select.Group>
                          {useMemo(
                            () =>
                              barangayArray.map((item, i) => {
                                return (
                                  <Select.Item index={i} key={i} value={item}>
                                    <Select.ItemText>{item}</Select.ItemText>
                                    <Select.ItemIndicator marginLeft="auto">
                                      <AntDesign
                                        name="check"
                                        size={24}
                                        color="black"
                                      />
                                    </Select.ItemIndicator>
                                  </Select.Item>
                                )
                              }),
                            [provinceArray]
                          )}
                        </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                  </Select>
                </>
              ) : (
                <>
                  {barangayArray.length === 0 && (
                    <>
                      <Input
                        style={{
                          flex: 1,
                          fontSize: 16,
                          position: 'relative',
                          paddingLeft: 40,
                        }}
                        placeholder="Barangay"
                        value={barangay}
                        onChangeText={onChangeBarangayHandler}
                      />

                      <AntDesign
                        name="idcard"
                        size={24}
                        color="gray"
                        style={{ position: 'absolute', left: 10 }}
                      />
                    </>
                  )}
                </>
              )}
            </XStack>
            <XStack alignItems="center" gap="$3">
              <Input
                style={{
                  flex: 1,
                  fontSize: 16,
                  position: 'relative',
                  paddingLeft: 40,
                }}
                placeholder="Region"
                value={region}
                onChangeText={(text) => setRegion(text)}
              />

              <Ionicons
                name="map-outline"
                size={24}
                color="gray"
                style={{ position: 'absolute', left: 10 }}
              />
            </XStack>

            <Form.Trigger asChild>
              <Button
                style={{
                  backgroundColor: colorTokens.light.orange.orange9,
                  width: '100%',
                  borderRadius: 50,
                  marginTop: 20,
                  color: 'white',
                }}
                onPress={() => router.push('/')}
              >
                Continuea
              </Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </SafeAreaView>
    </Main>
  )
}
