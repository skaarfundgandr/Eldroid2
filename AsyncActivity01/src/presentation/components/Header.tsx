import { View, Text } from 'react-native';

export function Header() {
  return (
    <View className='bg-blue-400 p-4 h-20 shadow-md justify-center'>
      <Text className='tracking-wide select-none text-center text-2xl text-white font-bold'>Junmarc P. Manos</Text>
    </View>
  );
}