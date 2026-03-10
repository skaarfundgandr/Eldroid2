import { TextInput, View } from 'react-native';
import { Header } from '@/presentation/components/Header';
import { useState } from 'react';
import {ListContainer} from "@/presentation/components/ListContainer";

export function FlatListView() {
  const [searchText, setSearchText] = useState('');
  const list = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
  const filteredNames = list.filter(name =>
    name.toUpperCase().includes(searchText.toUpperCase().trim()),
  );

  return (
    <View className="bg-white p-4 flex-1">
      <Header />
      <TextInput
        className="mb-4 mt-4 h-20 w-full border-2 border-black p-4"
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}></TextInput>
      <ListContainer data={filteredNames} />
    </View>
  );
}
