import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { View } from 'react-native'

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
