import { Text, View } from 'react-native';

export function ListItem({name}: {name: string}) {
    return (
      <View className='w-full p-4 h-20 bg-green-500 mb-2 justify-center'>
        <Text className='text-xl text-white'>{name}</Text>
      </View>
    )
}