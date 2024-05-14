import { StatusBar } from 'expo-status-bar'
import { PermissionsAndroid, Platform, View } from 'react-native'
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native'
import { Routes } from './src/routes'
import { useEffect } from 'react'

export default function App() {
  const fetchTokenProvider = async () => {
    const response = await fetch(`http://localhost:3000/connectionTokens/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { secret } = await response.json()
    return secret
  }

  useEffect(() => {
    async function init() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Stripe Terminal needs access to your location',
            buttonPositive: 'Accept',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Location')
        } else {
          console.error(
            'Location services are required in order to connect to a reader.'
          )
        }
      } catch {}
    }
    if (Platform.OS === 'android') return init()
  }, [])

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}
    >
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Routes />
      </View>
    </StripeTerminalProvider>
  )
}
