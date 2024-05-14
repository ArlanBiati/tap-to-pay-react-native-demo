import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading: boolean
  disabled: boolean
}

export function Button({ title, loading, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      style={{
        backgroundColor: '#635AFF',
        padding: 15,
        borderRadius: 8,
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {title}
        </Text>
        {loading && <ActivityIndicator color="white" />}
      </View>
    </TouchableOpacity>
  )
}
