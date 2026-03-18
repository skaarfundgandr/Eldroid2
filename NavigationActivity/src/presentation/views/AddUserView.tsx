import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { Header } from '@/presentation/components/Header';
import { register } from '@/application/security/auth';
import { useNavigation } from '@react-navigation/native';

export function AddUserView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleAddUserClicked = async () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Error', 'Fields cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const success = await register({ email, password });
      if (success) {
        Alert.alert('Success', 'User added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', 'Failed to add user');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <View className="w-full flex-1 bg-white">
      <Header />
      <View className="flex-1 p-4">
        <Text className="mb-2 text-xl font-bold">Email</Text>
        <TextInput
          className="mb-4 h-16 w-full rounded border-2 border-black p-4"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text className="mb-2 text-xl font-bold">Password</Text>
        <TextInput
          className="mb-4 h-16 w-full rounded border-2 border-black p-4"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text className="mb-2 text-xl font-bold">Confirm Password</Text>
        <TextInput
          className="mb-6 h-16 w-full rounded border-2 border-black p-4"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Pressable
          className="h-20 w-full items-center justify-center rounded bg-blue-400 shadow-md active:bg-blue-500"
          onPress={handleAddUserClicked}>
          <Text className="text-xl font-bold text-white">+ Add User</Text>
        </Pressable>
      </View>
    </View>
  );
}
