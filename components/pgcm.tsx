import { Text, View } from 'tamagui'

export default function PGCM() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '800',
          paddingHorizontal: 5,
          color: 'black',
          marginBottom: 10,
        }}
      >
        Terms and Conditions
      </Text>
      <View
        style={{
          color: '#64748b',
          marginLeft: 16,
          textAlign: 'justify',
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Membership is valid only for twelve (12) months
          </Text>
        </View>

        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Likewise, membership benefits are valid only for twelve (12) months
            and are non-transferable.Benefits are as follows
          </Text>
          <Text
            style={{
              color: '#64748b',
              marginLeft: 5,
            }}
          >
            Benefits are as follows:
          </Text>
          <View style={{ marginLeft: 10 }}>
            <View style={{ gap: 10 }}>
              <Text
                className="ml-9 text-slate-800 dark:text-white"
                style={{
                  color: 'black',
                }}
              >
                Products with Price Protection: (Price protection is based on
                the current Hotline price upon payment of membership fee and
                choice of stated address.)
              </Text>
              <View style={{ gap: 5, marginLeft: 20 }}>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Fourteen (14) refills of 11kg cylinder
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS 11kg empty cylinders
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS double burner gas stoves
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Thirty (30) refills of 2.7kg cylinder
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS 2.7kg empty cylinders with
                  Powerkalan burner
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Eight (8) refills of 22kg cylinder
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS 22kg empty cylinders
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Six (6) refills of 50kg cylinder
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Three (3) brand new PRYCEGAS 50kg empty cylinders
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Thirty (30) refills of 20lbs flask-type medical oxygen
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Thirty (30) refills of 105lbs standard-type medical oxygen
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS 20lbs flask-type medical oxygen
                  cylinder with content
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Two (2) brand new PRYCEGAS 105lbs standard-type medical oxygen
                  cylinder with content
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Four (4) sets of Medical Regulator
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  color: 'black',
                }}
              >
                Services
              </Text>
              <View
                className="list-disc ml-20"
                style={{ gap: 5, marginTop: 10, marginLeft: 20 }}
              >
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Free delivery to your stated address
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Guaranteed under 1 hour delivery, excluding the 50kg orders,
                  which will be delivered within 2 hours
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  Free installation of medical oxygen regulator upon delivery;
                  and
                </Text>
                <Text
                  style={{
                    color: '#64748b',
                  }}
                >
                  24-hour &amp; 7 days a week delivery service
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Membership will only be honored at Official Prycegas Plants, Sales
            Centers, Official Facebook Page, Website, and Hotline
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            The membership fee is ₱1,000.00 and is non-refundable
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Virtual cards will be generated automatically after account creation
            in the Prycegas website ( www.prycegas.com ). Members with existing
            account may just log in to view their virtual card
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Members may own multiple memberships and each membership is entitled
            to a separate set of benefits
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Pryce Gases, Inc. will not be liable for unauthorized use of
            membership benefits
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            In case the current Hotline price is lower than the price subject to
            protection, the member will automatically get the lower price
          </Text>
        </View>
      </View>
    </View>
  )
}
