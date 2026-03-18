import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '@/application/security/auth';

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLoginClicked = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const success = await login({ email, password });

    if (success) {
      navigation.navigate('FlatList');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View className="w-full justify-center rounded p-4 shadow-md">
      <Text className="pt-2 text-xl font-bold">Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"></TextInput>
      <Text className="text-xl font-bold">Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"></TextInput>
      <TouchableOpacity
        className="h-20 w-full items-center justify-center rounded bg-blue-500"
        onPress={handleLoginClicked}>
        <Text className="text-xl font-bold text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
});
