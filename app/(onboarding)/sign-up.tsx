import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

export default function SignUp() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>SignUp Page</Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <Button onPress={() => router.back()} title="Cancel" />
        <Link href={'/(drawer)/(tabs)/shop'} asChild>
          <Button title="Login" />
        </Link>
      </View>
    </View>
  )
}
