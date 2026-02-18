import { FlatList, View } from 'react-native';
import { ListItem } from '@/presentation/components/ListItem';

export function ListContainer({ data }: { data: string[] }) {
  return (
    <View className="mt-4 h-full w-full flex-1 border-2 border-black p-2">
      <FlatList data={data} renderItem={({ item }) => <ListItem name={item} />} />
    </View>
  );
}
