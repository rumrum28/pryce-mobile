import { ImageBackground } from 'react-native'
import { Main, Text, View } from 'tamagui'
import { Container, Title } from '~/tamagui.config'

export default function Shop() {
  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://prycegas.com/_next/image?url=%2Fimages%2Fapproved2.png&w=640&q=75',
        }}
        style={{
          width: '100%',
          height: 600,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container>
          <Title
            color={'#000'}
            enterStyle={{
              opacity: 0,
              scale: 1.5,
              y: -10,
            }}
            animation="quick"
          >
            test
          </Title>
        </Container>
      </ImageBackground>
    </Main>
  )
}
