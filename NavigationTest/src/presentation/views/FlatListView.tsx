import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ListContainer } from '@/presentation/components/ListContainer';

export function FlatListView() {
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const handleAddNameClicked = () => {
    if (name.trim() === '' || names.find((item) => item === name)) {
      Alert.alert('message', 'Name cannot be empty');
      return;
    } else {
      setNames((prev) => [...prev, name]);
      setName('');
    }
  };

  return (
    <View className="flex-1 w-full bg-white">
      <TextInput
        className="mb-4 mt-4 h-20 w-full border-2 border-black p-4"
        placeholder="Enter Name"
        onChangeText={setName}></TextInput>
      <Pressable className={styles.button} onPress={handleAddNameClicked}>
        <Text className="text-xl font-bold text-white">+ Add</Text>
      </Pressable>
      <ListContainer data={names} />
    </View>
  );
}

const styles = {
  button:
    'select-none pointer-events-auto h-20 w-full items-center justify-center bg-blue-400 shadow-md  hover:bg-blue-400/80 active:bg-blue-400/50',
};
