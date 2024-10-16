import { Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Text, View } from 'tamagui'

export default function PGCM() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <View style={styles.textContainer}>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            Membership is valid only for twelve (12) months
          </Text>
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <View style={styles.textSection}>
            <Entypo name="dot-single" size={20} color="black" />
            <Text style={styles.textColor}>
              Likewise, membership benefits are valid only for twelve (12)
              months and are non-transferable.
            </Text>
          </View>
          <Text
            style={{
              color: '#64748b',
            }}
          >
            Benefits are as follows:
          </Text>
          <View>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  textAlign: 'justify',
                }}
              >
                Products with Price Protection: (Price protection is based on
                the current Hotline price upon payment of membership fee and
                choice of stated address.)
              </Text>

              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Fourteen (14) refills of 11kg cylinder
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS 11kg empty cylinders
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS double burner gas stoves
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Thirty (30) refills of 2.7kg cylinder
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS 2.7kg empty cylinders with
                  Powerkalan burner
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Eight (8) refills of 22kg cylinder
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS 22kg empty cylinders
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Six (6) refills of 50kg cylinder
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Three (3) brand new PRYCEGAS 50kg empty cylinders
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Thirty (30) refills of 20lbs flask-type medical oxygen
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Thirty (30) refills of 105lbs standard-type medical oxygen
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS 20lbs flask-type medical oxygen
                  cylinder with content
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
                  Two (2) brand new PRYCEGAS 105lbs standard-type medical oxygen
                  cylinder with content
                </Text>
              </View>
              <View style={styles.textSection}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text style={styles.textColor}>
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
                <View style={styles.textSection}>
                  <Entypo name="dot-single" size={20} color="black" />
                  <Text style={styles.textColor}>
                    Free delivery to your stated address
                  </Text>
                </View>
                <View style={styles.textSection}>
                  <Entypo name="dot-single" size={20} color="black" />
                  <Text style={styles.textColor}>
                    Guaranteed under 1 hour delivery, excluding the 50kg orders,
                    which will be delivered within 2 hours
                  </Text>
                </View>
                <View style={styles.textSection}>
                  <Entypo name="dot-single" size={20} color="black" />
                  <Text style={styles.textColor}>
                    Free installation of medical oxygen regulator upon delivery;
                    and
                  </Text>
                </View>
                <View style={styles.textSection}>
                  <Entypo name="dot-single" size={20} color="black" />
                  <Text style={styles.textColor}>
                    24-hour &amp; 7 days a week delivery service
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            Membership will only be honored at Official Prycegas Plants, Sales
            Centers, Official Facebook Page, Website, and Hotline
          </Text>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            The membership fee is ₱1,000.00 and is non-refundable
          </Text>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            Virtual cards will be generated automatically after account creation
            in the Prycegas website ( www.prycegas.com ). Members with existing
            account may just log in to view their virtual card
          </Text>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            Members may own multiple memberships and each membership is entitled
            to a separate set of benefits
          </Text>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            Pryce Gases, Inc. will not be liable for unauthorized use of
            membership benefits
          </Text>
        </View>
        <View style={styles.textSection}>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.textColor}>
            In case the current Hotline price is lower than the price subject to
            protection, the member will automatically get the lower price
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 15,
  },
  textContainer: {
    gap: 10,
  },
  textColor: {
    color: '#64748b',
    textAlign: 'justify',
    flex: 1,
    flexWrap: 'wrap',
  },
  textSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})
