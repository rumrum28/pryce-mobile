import { Sheet } from '@tamagui/sheet'
import { useEffect, useState } from 'react'
import { H2, Paragraph, ScrollView, Text, View, XStack, YGroup } from 'tamagui'
import usePryceStore from '~/hooks/pryceStore'
import { Profile } from '~/types/userStorage'
import CyberButton from 'react-native-cyberpunk-button'

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

export const SelectAddressModal = () => {
  const [position, setPosition] = useState(0)
  const users = usePryceStore((state) => state.users)
  const changeAddressTrigger = usePryceStore(
    (state) => state.changeAddressTrigger
  )
  const setChangeAddressTrigger = usePryceStore(
    (state) => state.setChangeAddressTrigger
  )
  const selectedUser = usePryceStore((state) => state.selectedUser)
  const setSelectedUser = usePryceStore((state) => state.setSelectedUser)
  const token = usePryceStore((state) => state.token)

  const selectUserHandler = (user: Profile) => {
    setSelectedUser(user.Account_Number__c)
    setChangeAddressTrigger(false)
  }

  useEffect(() => {
    if (!token) {
      setChangeAddressTrigger(false)
    }

    console.log(token)
    console.log(selectedUser)

    if (token && !selectedUser) {
      setChangeAddressTrigger(true)
    }
  }, [selectedUser, changeAddressTrigger])

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={changeAddressTrigger}
        modal={true}
        open={changeAddressTrigger}
        onOpenChange={setChangeAddressTrigger}
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
                style={
                  {
                    // width: screenWidth * 0.9,
                  }
                }
                size="$4"
                gap="$2"
              >
                {users.length > 0 &&
                  users.map((user) => (
                    <View
                      key={user.Id}
                      onPress={() => selectUserHandler(user)}
                      backgroundColor={
                        selectedUser === user.Account_Number__c
                          ? '#ff4500'
                          : 'white'
                      }
                      paddingVertical={10}
                      paddingHorizontal={20}
                      style={{
                        padding: 10,
                      }}
                    >
                      <YGroup.Item>
                        <Text
                          style={{
                            paddingBottom: 10,
                            fontWeight: '800',
                            fontSize: 18,
                            color:
                              selectedUser === user.Account_Number__c
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
                            selectedUser === user.Account_Number__c
                              ? '#d7d7d7'
                              : '#838383'
                          }
                        />
                      </YGroup.Item>
                      <View paddingVertical={8} />
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
