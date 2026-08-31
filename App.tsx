import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.letrinhas}>Open up App.tsx to start working on your app!</Text>
      <Text>Já abri esse caralho de app.tsx </Text>
      <Text>Hello world caralho!1!!11</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color:'#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letrinhas:{
    color:'red',
  }
});
