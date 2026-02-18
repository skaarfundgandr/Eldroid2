import { Text, View } from 'react-native';

export function Header() {
  return (
    <View className="h-20 items-center justify-center bg-blue-500 w-full shadow-md">
      <Text className="text-2xl font-bold text-center text-white select-none tracking-wide">
        Junmarc P. Manos
      </Text>
    </View>
  )
}