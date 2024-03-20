import { DrawerToggleButton } from '@react-navigation/drawer'
import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Shop',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Stack>
  )
}
