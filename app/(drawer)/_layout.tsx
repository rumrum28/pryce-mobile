import React, { useEffect } from 'react'
import { Drawer } from 'expo-router/drawer'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Image, Text, View } from 'react-native'
import { colorTokens } from '@tamagui/themes'
import { router, usePathname } from 'expo-router'

function CustomDrawerContent(props: any) {
  const pathname = usePathname()

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: colorTokens.light.orange.orange9,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: 'https://ui-avatars.com/api/?background=c9fbfe&color=00a5b0&bold=true&name=Warren+Payot.webp',
          }}
          width={80}
          height={80}
          style={{ borderRadius: 40 }}
        />
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
            Warren Payot
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontStyle: 'italic',
              textDecorationLine: 'underline',
              color: '#fff',
            }}
          >
            warrenpayot@email.com
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#fff', paddingTop: 10 }}>
        <DrawerItem
          icon={({ color, size }) => (
            <Feather
              name="list"
              size={size}
              color={
                pathname == '/shop' ? '#fff' : colorTokens.light.orange.orange9
              }
            />
          )}
          label={'Shop'}
          labelStyle={{
            marginLeft: -20,
            fontSize: 18,
            color:
              pathname === '/shop' ? '#fff' : colorTokens.light.orange.orange9,
          }}
          style={{
            backgroundColor:
              pathname == '/shop' ? colorTokens.light.orange.orange9 : '#fff',
          }}
          onPress={() => {
            router.push('/(drawer)/(tabs)/shop')
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <AntDesign
              name="user"
              size={size}
              color={
                pathname == '/profile'
                  ? '#fff'
                  : colorTokens.light.orange.orange9
              }
            />
          )}
          label={'Profile'}
          labelStyle={{
            marginLeft: -20,
            fontSize: 18,
            color:
              pathname === '/profile'
                ? '#fff'
                : colorTokens.light.orange.orange9,
          }}
          style={{
            backgroundColor:
              pathname == '/profile'
                ? colorTokens.light.orange.orange9
                : '#fff',
          }}
          onPress={() => {
            router.push('/(drawer)/(tabs)/profile')
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons
              name="favorite-outline"
              size={size}
              color={
                pathname == '/favourites'
                  ? '#fff'
                  : colorTokens.light.orange.orange9
              }
            />
          )}
          label={'Favourites'}
          labelStyle={{
            marginLeft: -20,
            fontSize: 18,
            color:
              pathname === '/favourites'
                ? '#fff'
                : colorTokens.light.orange.orange9,
          }}
          style={{
            backgroundColor:
              pathname == '/favourites'
                ? colorTokens.light.orange.orange9
                : '#fff',
          }}
          onPress={() => {
            router.push('/favourites')
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={
                pathname == '/settings'
                  ? '#fff'
                  : colorTokens.light.orange.orange9
              }
            />
          )}
          label={'Settings'}
          labelStyle={{
            marginLeft: -20,
            fontSize: 18,
            color:
              pathname === '/settings'
                ? '#fff'
                : colorTokens.light.orange.orange9,
          }}
          style={{
            backgroundColor:
              pathname == '/settings'
                ? colorTokens.light.orange.orange9
                : '#fff',
          }}
          onPress={() => {
            router.push('/settings')
          }}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default function _layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="favourites" options={{ headerShown: true }} />
      <Drawer.Screen name="settings" options={{ headerShown: true }} />
    </Drawer>
  )
}
