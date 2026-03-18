import { FlatList, View } from 'react-native';
import { ListItem } from '@/presentation/components/ListItem';
import { User } from '@/domain/user';

export function ListContainer({ data }: { data: User[] }) {
  return (
    <View className="mt-4 flex-1 rounded border-2 border-black p-2">
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem user={item} />}
        keyExtractor={(item) => item.email}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
