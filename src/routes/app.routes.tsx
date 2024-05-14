import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { InitialPage } from '../initial-page'
import { PageStripe } from '../stripe-page'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

type AppRoutes = {
  page1: undefined
  page2: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#00D66F',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: '#635AFF',
          borderTopWidth: 0,
          height: 96,
          paddingVertical: 10,
        },
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
        name="page1"
        component={InitialPage}
      />
      <Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="contactless-payment"
              color={color}
              size={size}
            />
          ),
        }}
        name="page2"
        component={PageStripe}
      />
    </Navigator>
  )
}
