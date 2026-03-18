import { Text, View } from 'react-native';
import { User } from '@/domain/user';

export function ListItem({ user }: { user: User }) {
  return (
    <View className="mb-2 h-20 w-full justify-center rounded bg-green-500 p-4 shadow-sm">
      <Text className="select-none text-xl font-semibold text-white">{user.email}</Text>
    </View>
  );
}
