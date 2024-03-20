import { Ionicons } from '@expo/vector-icons';
import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';

const _layout = () => {
  return (
    <Drawer
      screenOptions={{
        drawerActiveBackgroundColor: colorTokens.light.orange.orange9,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -20 },
        // drawerHideStatusBarOnOpen: true,
      }}>
      <Drawer.Screen
        name="shop"
        options={{
          title: 'Shop',
          headerShown: false,
          drawerIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="checkout"
        options={{
          title: 'Checkout',
          headerShown: false,
          drawerIcon: ({ size, color }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
};

export default _layout;
