import { Text, View } from 'react-native';
import { LoginCard } from '@/presentation/components/LoginCard';

export function LoginView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LoginCard/>
    </View>
  );
}