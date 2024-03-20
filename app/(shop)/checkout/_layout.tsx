import { DrawerToggleButton } from '@react-navigation/drawer'
import { Stack } from 'expo-router'

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
          title: 'Checkout',
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Stack>
  )
}
