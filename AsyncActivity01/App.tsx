import './global.css';
import { FlatListView } from '@/presentation/views/FlatListView';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <FlatListView />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
