import { View, Text } from 'react-native';

export function Header({ className }: { className?: string }) {
  return (
    <View className={`${className}`}>
      <Text className="select-none text-center text-2xl font-bold tracking-wide text-white">
        Junmarc P. Manos
      </Text>
    </View>
  );
}