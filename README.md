<h1 align="center">Tap To Pay Mock with Stripe</h1>

<br>

<p align="center">
  <img src="https://github.com/ArlanBiati/tap-to-pay-rn/assets/43690080/c6c73db5-3fd6-4751-aa44-10fd1214ae72" alt="home" style="width: 35%;">
  <img src="https://github.com/ArlanBiati/tap-to-pay-rn/assets/43690080/892b1535-5351-4ec7-9714-ad6e3ef0a007" alt="home" style="width: 35%;">
</p>

## Description

An application created using React Native and Expo with the aim of creating a sample app with Tap to Pay functionality using stripe-terminal-react-native.

<br>

## Necessary Configurations

- Expo SDK 49+
- React Native 0.72+

<br>

## Prerequisites

- Stripe Account (Development) to use API tokens
- Expo Account to generate the build via EAS

<br>

## Getting Started

- To use the mock, you need to download this repository and build it via EAS using the command:

  ```bash
  ❯ eas build --profile development
  ```

After that, EAS will take care of creating the build and installing it on your emulator (Android/iOS).

- With the app installed on the simulator, you need to start the project with the command:

  ```bash
  ❯ npm run start
  ```

  and also the local server created with json-server

  ```bash
  ❯ npm run server
  ```

With these two commands running, our project is up and ready for testing.

<br>

## Variable Configuration

Stripe uses public keys to make the front-back connection, and it is necessary to change two of them for things to work:

- Public key to connect to the readers: `/src/db/db.json`
- LocationId to identify the physical company: `/src/stripe-page.tsx`

Both keys can be created or updated using the Stripe CLI. Below is the code used:

### Example commands:

- To create the location:

  <img width="1031" alt="Screenshot 2024-05-14 at 19 44 05" src="https://github.com/ArlanBiati/tap-to-pay-rn/assets/43690080/3d7472bc-6ad1-4024-b131-0dc19e5ef3a4">

  <br>

- To create the public token:

  <img width="1022" alt="Screenshot 2024-05-14 at 19 44 30" src="https://github.com/ArlanBiati/tap-to-pay-rn/assets/43690080/11843ff4-f646-45bb-b389-4d0b0892d66d">

<br>

## Understanding the Code

### Patterns

- As a standard for the mock here, I decided to wrap all requests inside trycatch and also add alerts for successful cases. For error cases, I will only return a console.log.

<br>

### 1. DiscoverReaders

```js
useEffect(() => {
  discoverReaders({
    discoveryMethod: 'localMobile',
    simulated: true,
  })
}, [discoverReaders])
```

This useEffect has a function from stripe-terminal itself that is responsible for locating available readers. After locating them, we move on to the second step.

<br>

### 2. ConnectReader

```js
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
```

Function used to connect to the reader found earlier. In it, we can destructure the reader and the error, which can be handled if it occurs. It is also at this step that we use LocationId to identify which establishment that reader belongs to.

<br>

### 3. PaymentIntent

```js
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
```

In this function, we create the payment intent responsible for capturing the amount, currency type, payment methods (card, virtual card, etc.), and so on. As in the previous function, we can destructure the request and get the payment intent data or error if it occurs.

<br>

### 4. CollectPayment

```js
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
```

In this function, we collect the payment intent created earlier. It is here that we open the Tap to Pay functionality for the user to touch the payment method and make the payment.

<br>

### 5. ConfirmPayment

```js
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
```

Here, we confirm all previous steps and finalize the sales process.

<br>

## See the app in action!

Now you can observe how the app behaves in real time!

<br>

<p align="center">
  <img src="https://github.com/ArlanBiati/tap-to-pay-rn/assets/43690080/e0ca56d5-b971-4baa-88ab-c982dacb1d4c" alt="home" style="width: 35%;">
</p>

<br>

## Documentations

Here are the documentations that helped me create the mock and my production app:

- [Stripe CLI Documentation](https://docs.stripe.com/stripe-cli)

- [Stripe Tap to Pay Documentation](https://docs.stripe.com/terminal/payments/setup-integration?terminal-sdk-platform=react-native)

<br>

## License

This project is licensed. Please see the license file for more details.

<br>

## Development by

Arlan Gustavo Biati

❯ [@ArlanBiati](https://www.linkedin.com/in/arlan-biati-2b3512115/) <img src="https://user-images.githubusercontent.com/43690080/84064413-f0e6c480-a998-11ea-8d87-fa7e45653884.png">

❯ arlan.gustavo.biati@gmail.com <img src="https://user-images.githubusercontent.com/43690080/84064502-1542a100-a999-11ea-8085-b751f54ea57a.png">

❯ [ArlanBiati](https://github.com/ArlanBiati/) <img src="https://user-images.githubusercontent.com/43690080/84064412-f04e2e00-a998-11ea-859c-50c4c05df79b.png">
