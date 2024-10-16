import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Feather,
} from '@expo/vector-icons'
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs'

import { colorTokens } from '@tamagui/themes'
import { Tabs } from 'expo-router'
import Svg, { Path } from 'react-native-svg'
import {
  BottomTabBarButtonProps,
  BottomTabBar,
} from '@react-navigation/bottom-tabs'
import { TouchableOpacity, View } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const TabBarCustomButton = ({
  accessibilityState,
  children,
  onPress,
}: BottomTabBarButtonProps) => {
  const isSelected = accessibilityState?.selected
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-15.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill="white"
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: '#fff' }}></View>
        </View>
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#fff',
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        style={{ flex: 1, height: 60, backgroundColor: '#fff' }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

const CustomTabBar = (props: any) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: '#fff',
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    )
  } else {
    return <BottomTabBar {...props.props} />
  }
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTokens.light.orange.orange9,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      // tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={26}
              name="propane-tank-outline"
              color={color}
            />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={26} name="pending-actions" color={color} />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="hearto" size={26} color={color} />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons size={26} name="person" color={color} />
          ),
          // tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tabs>
  )
}
