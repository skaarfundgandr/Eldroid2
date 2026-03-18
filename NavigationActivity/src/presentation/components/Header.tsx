import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Header({ isFlatList }: { isFlatList?: boolean }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 80,
        backgroundColor: '#3b82f6',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
      className="shadow-md">
      <View className="flex-1" />
      <Text className="select-none text-center text-2xl font-bold tracking-wide text-white">
        Junmarc P. Manos
      </Text>
      <View className="flex-1 items-end">
        {isFlatList && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddUser' as never);
            }}
            className="rounded bg-white/20 p-2">
            <Text className="font-bold text-white text-xl tracking-wide">Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
