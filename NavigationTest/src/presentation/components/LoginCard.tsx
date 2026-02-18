import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function LoginCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLoginClicked = () => {
    if (username === "admin" && password === "admin") {
      navigation.navigate('FlatList')
    } else {
      Alert.alert("message", "Invalid credentials")
    }
  }

  return (
    <View className="justify-center rounded shadow-md w-full p-4">
      <Text className="text-xl font-bold pt-2">
        Username
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      ></TextInput>
      <Text className="text-xl font-bold">
        Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      ></TextInput>
      <TouchableOpacity
        className="h-20 items-center justify-center w-full bg-blue-500 rounded"
        onPress={handleLoginClicked}
      >
        <Text className="text-white text-xl font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 4,
    borderWidth: 1,
    height: 40
  }
})