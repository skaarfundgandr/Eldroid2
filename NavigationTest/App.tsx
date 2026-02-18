import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoginView } from '@/presentation/views/LoginView';
import { Header } from '@/presentation/components/Header';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatListView } from '@/presentation/views/FlatListView';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login: {
      screen: LoginView
    },
    FlatList: {
      screen: FlatListView
    }
  }
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {
  return (
    <SafeAreaProvider>
        <SafeAreaView className="flex-1 p-4 pt-0">
          <Header />
          <Navigation />
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
