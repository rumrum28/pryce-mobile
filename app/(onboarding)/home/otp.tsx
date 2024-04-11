import { SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Main, View, Text, Input } from 'tamagui'
import { colorTokens } from '@tamagui/themes'
import { Dimensions } from 'react-native'
import { useRouter } from 'expo-router'

export default function Page() {
  const { height } = Dimensions.get('window')
  const router = useRouter()

  return (
    <Main
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ display: 'flex' }}>
        <Text
          style={{
            fontSize: 15,
            marginTop: 100,
            marginBottom: 50,
            marginHorizontal: 10,
            textAlign: 'center',
          }}
        >
          Code has been sent to +639*******03
        </Text>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 50,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              borderRadius: 9,
              borderWidth: 1,
              borderColor: colorTokens.light.orange.orange9,
            }}
          >
            <Input
              style={{
                fontSize: 25,
                color: 'black',
                padding: 0,
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: 55,
              }}
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>
          <View
            style={{
              borderRadius: 9,
              borderWidth: 1,
              borderColor: colorTokens.light.orange.orange9,
            }}
          >
            <Input
              style={{
                fontSize: 25,
                padding: 0,
                color: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: 55,
              }}
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>
          <View
            style={{
              borderRadius: 9,
              borderWidth: 1,
              borderColor: colorTokens.light.orange.orange9,
            }}
          >
            <Input
              style={{
                fontSize: 25,
                padding: 0,
                color: 'black',
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: 55,
              }}
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>
          <View
            style={{
              borderRadius: 9,
              borderWidth: 1,
              borderColor: colorTokens.light.orange.orange9,
            }}
          >
            <Input
              style={{
                fontSize: 25,
                padding: 0,
                color: 'black',
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: 55,
              }}
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 15,
            marginBottom: 50,
            marginHorizontal: 10,
            textAlign: 'center',
          }}
        >
          Resend code in{' '}
          <Text color={colorTokens.light.orange.orange9}>55</Text>s
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/home/fill-profile')}
          style={{
            backgroundColor: colorTokens.light.orange.orange9,
            borderRadius: 50,
            marginHorizontal: 20,
            height: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 18 * 1.4,
              color: 'white',
            }}
          >
            Verify
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Main>
  )
}
