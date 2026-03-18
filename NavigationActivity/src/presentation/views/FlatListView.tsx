import { View, Text } from 'react-native';
import { useCallback, useState } from 'react';
import { ListContainer } from '@/presentation/components/ListContainer';
import { Header } from '@/presentation/components/Header';
import { getUsers } from '@/infrastructure/storage';
import { User } from '@/domain/user';
import { useFocusEffect } from '@react-navigation/native';

export function FlatListView() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers])
  );

  return (
    <View className="w-full flex-1 bg-white">
      <Header isFlatList={true} />
      <View className="flex-1 p-4">
        <ListContainer data={users} />
      </View>
    </View>
  );
}
