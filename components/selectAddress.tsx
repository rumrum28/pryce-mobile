import { Sheet } from '@tamagui/sheet'
import { useEffect, useState } from 'react'
import {
  Button,
  H2,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
} from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import { Profile } from '~/types/userStorage'
import CyberButton from 'react-native-cyberpunk-button'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colorTokens } from '@tamagui/themes'

function PGCBadge({
  pgc,
  name,
  color,
}: {
  pgc: boolean
  name: string
  color: string
}) {
  return (
    <XStack height={20} alignItems="center">
      {pgc && (
        <>
          <CyberButton
            buttonHeight={20}
            mainColor="#ff4500"
            repeatDelay={5000}
            label="PGC"
          />
          <View marginHorizontal={5} />
        </>
      )}

      <Paragraph
        style={{
          color,
        }}
      >
        {name}
      </Paragraph>
    </XStack>
  )
}

export const SelectAddressModal = ({
  modalTrigger,
}: {
  modalTrigger: string | null
}) => {
  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)
  const users = usePryceStore((state) => state.users)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const screenWidth = Dimensions.get('window').width

  const selectUserHandler = (user: Profile) => {
    setSelectedUser(user.Account_Number__c)
    setOpen(false)
  }

  useEffect(() => {
    if (!modalTrigger || modalTrigger === null) {
      setOpen(true)
    }
  }, [modalTrigger, open])

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text
          style={{
            fontSize: 14,
            color: colorTokens.light.gray.gray9,
            fontWeight: 'bold',
          }}
          numberOfLines={1}
        >
          change Address
        </Text>
      </TouchableOpacity>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85]}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="quick"
      >
        <Sheet.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />

        <Sheet.Frame
          padding="$4"
          justifyContent="flex-start"
          alignItems="center"
        >
          <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4">
            <View paddingBottom={'$5'}>
              <H2 fontWeight={'bold'}>Select Address</H2>
              <Paragraph theme="alt2">
                Please select an address to continue.
              </Paragraph>
            </View>

            <ScrollView>
              <YGroup
                alignSelf="center"
                bordered
                style={{
                  width: screenWidth * 0.9,
                }}
                size="$4"
                gap="$2"
              >
                {users.length > 0 &&
                  users.map((user) => (
                    <View
                      key={user.Id}
                      onPress={() => selectUserHandler(user)}
                      backgroundColor={
                        modalTrigger === user.Account_Number__c
                          ? '#ff4500'
                          : 'white'
                      }
                      paddingVertical={10}
                      paddingHorizontal={15}
                      style={{}}
                    >
                      <YGroup.Item>
                        <Text
                          style={{
                            width: '95%',
                            marginVertical: 6,
                            fontWeight: '800',
                            fontSize: 18,
                            color:
                              modalTrigger === user.Account_Number__c
                                ? 'white'
                                : 'black',
                          }}
                          numberOfLines={1}
                        >
                          {`${user?.Primary_Street__c}, ${user?.Primary_Barangay__c}, ${user?.Primary_City2__c}, ${user?.Primary_State_Province__c}`}
                        </Text>

                        <PGCBadge
                          pgc={user?.Prycegas_Club_Member__c}
                          name={user?.Name}
                          color={
                            modalTrigger === user.Account_Number__c
                              ? '#d7d7d7'
                              : '#838383'
                          }
                        />
                      </YGroup.Item>
                      <Separator paddingVertical={8} />
                    </View>
                  ))}
              </YGroup>
            </ScrollView>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
