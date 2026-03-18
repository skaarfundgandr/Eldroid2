import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginView } from '@/presentation/views/LoginView';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatListView } from '@/presentation/views/FlatListView';
import { AddUserView } from '@/presentation/views/AddUserView';
import { initializeStorage } from '@/infrastructure/storage';

import { useEffect } from 'react';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: true,
  },
  screens: {
    Login: {
      screen: LoginView,
    },
    FlatList: {
      screen: FlatListView,
    },
    AddUser: {
      screen: AddUserView,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
