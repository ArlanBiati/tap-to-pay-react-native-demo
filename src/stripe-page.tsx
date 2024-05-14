import { useEffect, useState } from 'react'
import {
  Alert,
  ImageBackground,
  Linking,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native'

import { useLocation } from './hooks/location'
import { Button } from './components/button'

interface PaymentIntent {
  id: string
  amount: number
  created: string
  currency: string
  sdkUuid: string
  paymentMethodId: string
}

export function PageStripe() {
  const { location, accessDenied } = useLocation()

  const [reader, setReader] = useState()
  const [payment, setPayment] = useState<PaymentIntent>()
  const [loadingCreatePayment, setLoadingCreatePayment] = useState(false)
  const [loadingCollectPayment, setLoadingCollectPayment] = useState(false)
  const [loadingConfirmPayment, setLoadingConfirmPayment] = useState(false)
  const [loadingConnectingReader, setLoadingConnectingReader] = useState(false)

  const locationIdStripeMock = 'tml_FkABuwmve9oYHo'

  const {
    discoverReaders,
    connectLocalMobileReader,
    createPaymentIntent,
    collectPaymentMethod,
    confirmPaymentIntent,
    connectedReader,
  } = useStripeTerminal({
    onUpdateDiscoveredReaders: (readers: any) => {
      setReader(readers[0])
    },
  })

  useEffect(() => {
    discoverReaders({
      discoveryMethod: 'localMobile',
      simulated: true,
    })
  }, [discoverReaders])

  async function connectReader(selectedReader: any) {
    setLoadingConnectingReader(true)
    try {
      const { reader, error } = await connectLocalMobileReader({
        reader: selectedReader,
        locationId: locationIdStripeMock,
      })

      if (error) {
        console.log('connectLocalMobileReader error:', error)
        return
      }

      Alert.alert('Reader connected successfully')

      console.log('Reader connected successfully', reader)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingConnectingReader(false)
    }
  }

  async function paymentIntent() {
    setLoadingCreatePayment(true)
    try {
      const { error, paymentIntent } = await createPaymentIntent({
        amount: 100,
        currency: 'usd',
        paymentMethodTypes: ['card_present'],
        offlineBehavior: 'prefer_online',
      })

      if (error) {
        console.log('Error creating payment intent', error)
        return
      }

      setPayment(paymentIntent)

      Alert.alert('Payment intent created successfully')
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingCreatePayment(false)
    }
  }

  async function collectPayment() {
    setLoadingCollectPayment(true)
    try {
      const { error, paymentIntent } = await collectPaymentMethod({
        paymentIntent: payment,
      })

      if (error) {
        console.log('Error collecting payment', error)
        return
      }

      Alert.alert('Payment successfully collected', '', [
        {
          text: 'Ok',
          onPress: async () => {
            await confirmPayment(paymentIntent)
          },
        },
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingCollectPayment(false)
    }
  }

  async function confirmPayment(payment: any) {
    setLoadingConfirmPayment(true)
    try {
      const { error, paymentIntent } = await confirmPaymentIntent(payment)

      if (error) {
        console.log('Error confirm payment', error)
        return
      }

      Alert.alert('Payment successfully confirmed!', 'Congratulations')
      console.log('Payment confirmed', paymentIntent)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingConfirmPayment(false)
    }
  }

  async function handleRequestLocation() {
    await Linking.openSettings()
  }

  useEffect(() => {
    if (accessDenied) {
      Alert.alert(
        'Access to location',
        'To use the app, you need to allow the use of your device location.',
        [
          {
            text: 'Activate',
            onPress: handleRequestLocation,
          },
        ]
      )
    }
  }, [accessDenied])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ paddingTop: 10, gap: 10 }}>
          <ImageBackground
            source={require('./assets/payment.png')}
            style={{ width: 50, height: 50 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Stripe
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Button
            onPress={() => connectReader(reader)}
            title="Connecting with the reader"
            loading={loadingConnectingReader}
            disabled={!!connectedReader}
          />

          <Button
            onPress={paymentIntent}
            title="Create payment intent"
            loading={loadingCreatePayment}
            disabled={!connectedReader}
          />

          <Button
            onPress={collectPayment}
            title="Collect payment"
            loading={loadingCollectPayment}
            disabled={!connectedReader}
          />

          <Button
            onPress={confirmPayment}
            title="Confirm payment"
            loading={loadingConfirmPayment}
            disabled={!connectedReader}
          />
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  )
}
