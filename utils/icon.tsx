import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons'

export type IconKeys = 'home' | 'activity' | 'account'

export const icon: Record<
  IconKeys,
  (props: { color: string }) => React.JSX.Element
> = {
  home: (props: any) => <FontAwesome name="home" size={24} {...props} />,
  activity: (props: any) => (
    <MaterialIcons name="pending-actions" size={24} {...props} />
  ),
  account: (props: any) => <Octicons name="person" size={24} {...props} />,
}
