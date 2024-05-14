import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'
import { useEffect } from 'react'
import {
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export function InitialPage() {
  const { initialize } = useStripeTerminal()

  useEffect(() => {
    initialize()
  }, [initialize])

  const navigateLinkedin = () => {
    const url = 'https://www.linkedin.com/in/arlanbiati/'
    Linking.openURL(url)
  }

  const navigateGithub = () => {
    const url = 'https://www.github.com/ArlanBiati'
    Linking.openURL(url)
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 20,
        padding: 20,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: 30,
        }}
      >
        <ImageBackground
          source={require('./assets/payment.png')}
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Welcome to the Tap to Pay Mock using Stripe
        </Text>

        <Text style={{ fontSize: 17 }}>
          {' '}
          Application created using React Native with Expo
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#635AFF',
            marginRight: 20,
          }}
        >
          By Arlan Biati
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={navigateLinkedin}>
            <FontAwesome name="linkedin-square" color="#635AFF" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateGithub}>
            <FontAwesome name="github-square" color="#635AFF" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
