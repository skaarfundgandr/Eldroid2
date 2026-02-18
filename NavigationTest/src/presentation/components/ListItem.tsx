import { Text, View } from 'react-native';

export function ListItem({ name }: { name: string }) {
  return (
    <View className="mb-2 h-20 w-full justify-center bg-green-500 p-4">
      <Text className="select-none text-xl text-white">{name}</Text>
    </View>
  );
}
