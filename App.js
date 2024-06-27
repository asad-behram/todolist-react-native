import { SafeAreaView, StyleSheet, View } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <TodoScreen/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
