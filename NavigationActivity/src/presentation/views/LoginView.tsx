import { View } from 'react-native';
import { LoginCard } from '@/presentation/components/LoginCard';
import { Header } from '@/presentation/components/Header';

export function LoginView() {
  return (
    <View className="flex-1 bg-white">
      <Header />
      <View className="flex-1 items-center justify-center">
        <LoginCard />
      </View>
    </View>
  );
}
